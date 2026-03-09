import { createClient } from '@supabase/supabase-js';

// Uses Gemini REST API directly — avoids SDK version compatibility issues

// Supabase client is initialised inside the POST handler (not at module level)
// to prevent "supabaseKey is required" errors during Next.js build time

// Generate embedding using Gemini embedding API (replaces @xenova/transformers
// which requires native binaries unavailable on Vercel serverless)
async function generateEmbedding(text) {
    const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-embedding-001:embedContent?key=${process.env.GEMINI_API_KEY}`,
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                model: 'models/gemini-embedding-001',
                content: { parts: [{ text }] },
                outputDimensionality: 768
            })
        }
    );
    if (!response.ok) {
        throw new Error(`Embedding API error: ${response.status} ${await response.text()}`);
    }
    const data = await response.json();
    return data.embedding.values;
}

// -------------------------------------------------------------------
// HYBRID RAG RETRIEVAL
// Weights: 70% pedagogical/lesson context, 20% cultural scenarios, 10% comparative linguistics
// -------------------------------------------------------------------
async function retrieveRAGContext(userMessage, userLevel, supabase) {
    const results = {
        culturalScenarios: [],
        lessonContext: [],
        error: null
    };

    try {
        // Generate embedding for the user's message
        const queryEmbedding = await generateEmbedding(userMessage);

        // --- 20% weight: Semantic search through cultural_contexts table ---
        const { data: culturalData, error: culturalError } = await supabase.rpc(
            'match_cultural_contexts',
            {
                query_embedding: queryEmbedding,
                match_threshold: 0.2,
                match_count: 3
            }
        );

        if (culturalError) {
            console.error('Cultural context retrieval error:', culturalError);
        } else {
            results.culturalScenarios = culturalData || [];
        }

        // --- 70% weight: Lesson-based pedagogical context ---
        // Fetch lessons relevant to the user's query by keyword matching
        const { data: lessonData, error: lessonError } = await supabase
            .from('lessons')
            .select('title, description, vocabulary, key_phrases, cultural_notes')
            .textSearch('title', userMessage, { type: 'websearch' })
            .limit(2);

        if (lessonError) {
            // Fallback: fetch beginner-appropriate lessons if text search fails
            const { data: fallbackData } = await supabase
                .from('lessons')
                .select('title, description, vocabulary, key_phrases, cultural_notes')
                .eq('difficulty', userLevel || 'beginner')
                .limit(2);

            results.lessonContext = fallbackData || [];
        } else {
            results.lessonContext = lessonData || [];
        }

    } catch (err) {
        console.error('RAG retrieval failed:', err);
        results.error = err.message;
    }

    return results;
}

// -------------------------------------------------------------------
// Build the RAG context block to inject into the prompt
// -------------------------------------------------------------------
function buildRAGContextBlock(ragResults) {
    const lines = [];

    // 70% weight — Lesson/pedagogical context
    if (ragResults.lessonContext?.length > 0) {
        lines.push('## RETRIEVED LESSON CONTEXT (Primary — 70% weight)');
        lines.push('Use this pedagogical content to ground your response in the structured curriculum:\n');
        for (const lesson of ragResults.lessonContext) {
            lines.push(`### ${lesson.title}`);
            if (lesson.description) lines.push(`Overview: ${lesson.description}`);
            if (lesson.key_phrases) lines.push(`Key phrases: ${lesson.key_phrases}`);
            if (lesson.vocabulary) lines.push(`Vocabulary: ${lesson.vocabulary}`);
            if (lesson.cultural_notes) lines.push(`Cultural notes: ${lesson.cultural_notes}`);
            lines.push('');
        }
    }

    // 20% weight — Cultural scenarios from curated database
    if (ragResults.culturalScenarios?.length > 0) {
        lines.push('## RETRIEVED CULTURAL SCENARIOS (Secondary — 20% weight)');
        lines.push('These are curated, authentic diaspora scenarios. Reference them to add cultural depth:\n');
        for (const scenario of ragResults.culturalScenarios) {
            lines.push(`**Type:** ${scenario.scenario_type} | **Domain:** ${scenario.cultural_domain} | **Formality:** ${scenario.formality_level}`);
            if (scenario.scenario_text) lines.push(`Scenario: ${scenario.scenario_text}`);
            if (scenario.example_usage) lines.push(`Example usage: ${scenario.example_usage}`);
            if (scenario.keywords) lines.push(`Keywords: ${scenario.keywords}`);
            if (scenario.lesson_applicability) lines.push(`Lesson applicability: ${scenario.lesson_applicability}`);
            if (scenario.similarity) lines.push(`(Relevance score: ${(scenario.similarity * 100).toFixed(0)}%)`);
            lines.push('');
        }
    }

    // 10% weight — Comparative linguistics note (static, always included)
    lines.push('## COMPARATIVE LINGUISTICS CONTEXT (10% weight)');
    lines.push('Punjabi and Hindi share Indo-Aryan roots. Where helpful, note:');
    lines.push('- Shared vocabulary: ਪਾਣੀ (paani) = Hindi पानी = water');
    lines.push('- Key differences: Punjabi tonal system (3 tones) has no Hindi equivalent');
    lines.push('- Script: Gurmukhi (Punjabi) vs Devanagari (Hindi) — different but related phonemic systems');
    lines.push('- Only reference Hindi connections when it genuinely aids understanding for a diaspora learner');

    return lines.join('\n');
}

// SYSTEM PROMPT
const ENHANCED_SYSTEM_PROMPT = `You are a concise Punjabi language tutor for diaspora learners — second and third-generation Punjabis in the UK, US, Canada, and Australia reconnecting with their heritage through family conversations.

## CORE RULES

1. **Always respond in valid JSON** — no exceptions.
2. **Be brief** — every field should be 1-2 sentences maximum. No long explanations.
3. **Use retrieved context first** — RAG context provided is more accurate than your training data for Punjabi.
4. **Adapt to user level** — beginner: romanised focus, simple words only. Intermediate: balance all formats. Advanced: lead with Gurmukhi.

## RESPONSE FORMAT

Respond ONLY with this JSON object:

{
  "gurmukhi": "Phrase in Gurmukhi script",
  "romanized": "Phonetic pronunciation (stress key syllables)",
  "english": "Natural English translation",
  "cultural_note": "One sentence of cultural context — why this matters in a family setting",
  "grammar_tip": "One sentence grammar note if useful, otherwise empty string",
  "difficulty_level": "beginner | intermediate | advanced",
  "new_vocabulary": [{ "punjabi": "ਸ਼ਬਦ", "romanized": "shabad", "english": "word" }],
  "follow_up_suggestion": "One short follow-up question to continue learning",
  "rag_sources_used": "brief note on context used"
}

## LANGUAGE RULES

- Default to conversational Punjabi used in diaspora households (Doabi/Majhi mix)
- Always show both formal (ਤੁਸੀਂ / tusi) and informal (ਤੂੰ / tu) where relevant
- Keep new_vocabulary to 3-5 words maximum per response
- cultural_note: focus on practical family use, not lengthy history
- grammar_tip: only include if genuinely useful, keep it to one line
- follow_up_suggestion: one short, specific question — not a paragraph

## FORMALITY
- Formal/elders: ਤੁਸੀਂ (tusi) — always use with parents, grandparents, elders
- Informal/peers: ਤੂੰ (tu) — friends, younger siblings
- When in doubt: use formal

## KEY FAMILY TERMS
ਬੀਬੀ/ਦਾਦੀ (Bibi/Dadi) = paternal grandmother | ਨਾਨੀ (Nani) = maternal grandmother | ਬਾਬਾ/ਦਾਦਾ (Baba/Dada) = paternal grandfather | ਨਾਨਾ (Nana) = maternal grandfather | ਮੰਮੀ (Mammi) = mum | ਪਾਪਾ (Papa) = dad | ਵੀਰਜੀ (Veerji) = older brother | ਭੈਣਜੀ (Bhainji) = older sister | ਚਾਚਾ (Chacha) = dad's younger brother | ਤਾਇਆ (Taaya) = dad's older brother | ਮਾਸੀ (Masi) = mum's sister | ਮਾਮਾ (Mama) = mum's brother`;

export async function POST(req) {
    try {
        const { message, conversationHistory, responseFormat, userLevel } = await req.json();

        if (!process.env.GEMINI_API_KEY) {
            return Response.json(
                { error: 'GEMINI_API_KEY not configured' },
                { status: 500 }
            );
        }

        if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
            return Response.json(
                { error: 'Supabase environment variables not configured' },
                { status: 500 }
            );
        }

        // Supabase client created here (request time) not at module level (build time)
        const supabase = createClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL,
            process.env.SUPABASE_SERVICE_ROLE_KEY
        );

        // -----------------------------------------------------------
        // STEP 1: Run hybrid RAG retrieval against Supabase
        // -----------------------------------------------------------
        const ragResults = await retrieveRAGContext(message, userLevel, supabase);
        const ragContextBlock = buildRAGContextBlock(ragResults);

        // Log RAG retrieval summary for debugging/evaluation
        console.log('[RAG] Cultural scenarios retrieved:', ragResults.culturalScenarios.length);
        console.log('[RAG] Lesson contexts retrieved:', ragResults.lessonContext.length);
        if (ragResults.error) {
            console.warn('[RAG] Retrieval error (falling back to prompt-only):', ragResults.error);
        }

        // -----------------------------------------------------------
        // STEP 2: Configure Gemini with structured output schema
        // -----------------------------------------------------------
        const generationConfig = {
            temperature: userLevel === 'beginner' ? 0.3 : userLevel === 'intermediate' ? 0.5 : 0.7,
            topP: 0.8,
            topK: 40,
            maxOutputTokens: 2048,
        };

        if (responseFormat === 'structured') {
            generationConfig.responseMimeType = 'application/json';
            generationConfig.responseSchema = {
                type: "object",
                properties: {
                    gurmukhi: {
                        type: "string",
                        description: "The complete Punjabi phrase in Gurmukhi script"
                    },
                    romanized: {
                        type: "string",
                        description: "Phonetic pronunciation with stress on key syllables — keep it concise"
                    },
                    english: {
                        type: "string",
                        description: "Natural English translation capturing meaning"
                    },
                    cultural_note: {
                        type: "string",
                        description: "One sentence of cultural context — practical family use only, no lengthy explanations"
                    },
                    grammar_tip: {
                        type: "string",
                        description: "Optional grammar explanation for complex structures"
                    },
                    difficulty_level: {
                        type: "string",
                        enum: ["beginner", "intermediate", "advanced"],
                        description: "Assessed difficulty level of this response"
                    },
                    new_vocabulary: {
                        type: "array",
                        description: "Array of new vocabulary words taught in this response",
                        items: {
                            type: "object",
                            properties: {
                                punjabi: { type: "string", description: "Word in Gurmukhi script" },
                                romanized: { type: "string", description: "Romanised pronunciation" },
                                english: { type: "string", description: "English meaning" }
                            },
                            required: ["punjabi", "romanized", "english"]
                        }
                    },
                    follow_up_suggestion: {
                        type: "string",
                        description: "One short follow-up question — single sentence only"
                    },
                    rag_sources_used: {
                        type: "string",
                        description: "Which retrieved contexts were used to ground this response"
                    }
                },
                required: ["gurmukhi", "romanized", "english", "cultural_note", "difficulty_level", "new_vocabulary", "follow_up_suggestion"]
            };
        }

        // -----------------------------------------------------------
        // STEP 3: Build chat history for conversation continuity
        // -----------------------------------------------------------
        const chatHistory = conversationHistory?.map(msg => ({
            role: msg.role === 'assistant' ? 'model' : 'user',
            parts: [{ text: msg.content }]
        })) || [];

        // -----------------------------------------------------------
        // STEP 4: Inject RAG context + user message into prompt
        // -----------------------------------------------------------
        const enhancedMessage = `USER LEVEL: ${userLevel}

---
${ragContextBlock}
---

USER QUESTION: ${message}`;

        // -----------------------------------------------------------
        // STEP 5: Call Gemini via REST API
        // -----------------------------------------------------------
        const geminiPayload = {
            system_instruction: { parts: [{ text: ENHANCED_SYSTEM_PROMPT }] },
            contents: [
                ...chatHistory,
                { role: 'user', parts: [{ text: enhancedMessage }] }
            ],
            generationConfig: {
                temperature: generationConfig.temperature,
                topP: generationConfig.topP,
                topK: generationConfig.topK,
                maxOutputTokens: generationConfig.maxOutputTokens,
                ...(generationConfig.responseMimeType ? {
                    responseMimeType: generationConfig.responseMimeType,
                    responseSchema: generationConfig.responseSchema
                } : {})
            }
        };

        const geminiResponse = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(geminiPayload)
            }
        );

        if (!geminiResponse.ok) {
            const errText = await geminiResponse.text();
            throw new Error(`Gemini API error: ${geminiResponse.status} ${errText}`);
        }

        const geminiData = await geminiResponse.json();
        const parts = geminiData.candidates?.[0]?.content?.parts || [];

        // Gemini 2.5 Flash is a thinking model — it may return thought parts
        // before the actual JSON. Find the last non-thought text part.
        let responseText = '';
        for (const part of parts) {
            if (part.text && !part.thought) {
                responseText = part.text;
            }
        }
        // Fallback: if no non-thought text found, try any text part
        if (!responseText) {
            for (const part of parts) {
                if (part.text) {
                    responseText = part.text;
                }
            }
        }

        if (!responseText) {
            console.error('Empty response. Parts received:', JSON.stringify(parts, null, 2));
            throw new Error('Empty response from Gemini API');
        }

        let structuredData = null;
        if (responseFormat === 'structured') {
            // Strip markdown code fences if Gemini wraps the JSON
            let cleanedText = responseText.replace(/^```(?:json)?\s*\n?/i, '').replace(/\n?\s*```$/i, '').trim();

            // Attempt 1: Direct parse
            try {
                structuredData = JSON.parse(cleanedText);
            } catch (parseError) {
                console.error('Direct JSON parse failed:', parseError.message);
                console.error('Raw response (first 500 chars):', responseText.substring(0, 500));

                // Attempt 2: Repair truncated JSON
                // Gemini 2.5 Flash sometimes truncates output mid-JSON
                try {
                    let repaired = cleanedText;
                    // Check if it looks like truncated JSON (starts with { but doesn't end with })
                    if (repaired.startsWith('{') && !repaired.endsWith('}')) {
                        console.log('Attempting truncated JSON repair...');
                        // Remove any trailing incomplete key-value pair (cut off mid-string)
                        repaired = repaired.replace(/,?\s*"[^"]*"?\s*:?\s*"?[^"]*$/, '');
                        // Remove trailing incomplete array element
                        repaired = repaired.replace(/,?\s*\{[^}]*$/, '');
                        // Close any open arrays and objects
                        const openBrackets = (repaired.match(/\[/g) || []).length;
                        const closeBrackets = (repaired.match(/\]/g) || []).length;
                        const openBraces = (repaired.match(/\{/g) || []).length;
                        const closeBraces = (repaired.match(/\}/g) || []).length;
                        // Remove any trailing comma before we close
                        repaired = repaired.replace(/,\s*$/, '');
                        for (let i = 0; i < openBrackets - closeBrackets; i++) repaired += ']';
                        for (let i = 0; i < openBraces - closeBraces; i++) repaired += '}';
                        structuredData = JSON.parse(repaired);
                        console.log('Truncated JSON repair succeeded');
                    }
                } catch (repairError) {
                    console.error('JSON repair also failed:', repairError.message);
                }

                // Attempt 3: Extract JSON object from surrounding text
                if (!structuredData) {
                    try {
                        const jsonStart = responseText.indexOf('{');
                        const jsonEnd = responseText.lastIndexOf('}');
                        if (jsonStart !== -1 && jsonEnd > jsonStart) {
                            structuredData = JSON.parse(responseText.substring(jsonStart, jsonEnd + 1));
                            console.log('JSON extraction fallback succeeded');
                        }
                    } catch (extractError) {
                        console.error('JSON extraction also failed:', extractError.message);
                    }
                }

                // Final fallback: return raw text in structured format
                if (!structuredData) {
                    structuredData = {
                        gurmukhi: "",
                        romanized: "",
                        english: "",
                        cultural_note: responseText,
                        grammar_tip: "",
                        difficulty_level: userLevel,
                        new_vocabulary: [],
                        follow_up_suggestion: "",
                        rag_sources_used: "Parse error — raw response returned"
                    };
                }
            }
        }

        return Response.json({
            response: responseText,
            structured: structuredData,
            rawJson: structuredData ? JSON.stringify(structuredData) : responseText,
            // Expose RAG metadata for evaluation/debugging
            rag_metadata: {
                cultural_scenarios_retrieved: ragResults.culturalScenarios.length,
                lesson_contexts_retrieved: ragResults.lessonContext.length,
                retrieval_error: ragResults.error || null,
                top_scenario_similarity: ragResults.culturalScenarios[0]?.similarity || null
            }
        });

    } catch (error) {
        console.error('Gemini API Error:', error);
        return Response.json(
            {
                error: 'Failed to get response from AI',
                details: error.message
            },
            { status: 500 }
        );
    }
}