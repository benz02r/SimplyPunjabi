import { GoogleGenerativeAI } from "@google/generative-ai";
import { createClient } from '@supabase/supabase-js';
import { pipeline } from '@xenova/transformers';

// genAI and supabase are initialised lazily inside the POST handler
// to avoid instantiation at build time (which causes missing env var errors)

// Singleton embedding pipeline to avoid reloading on every request
let embedder = null;
async function getEmbedder() {
    if (!embedder) {
        embedder = await pipeline('feature-extraction', 'Xenova/all-MiniLM-L6-v2');
    }
    return embedder;
}

// Generate 384-dimensional embedding for a query string
async function generateEmbedding(text) {
    const embed = await getEmbedder();
    const output = await embed(text, { pooling: 'mean', normalize: true });
    return Array.from(output.data);
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
                match_threshold: 0.5,
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

// ENHANCED SYSTEM PROMPT
const ENHANCED_SYSTEM_PROMPT = `You are a specialised Punjabi language tutor for diaspora learners - second and third-generation Punjabis in the UK, US, Canada, and Australia who want to reconnect with their heritage through family conversations.

## YOUR CORE PURPOSE
Help users have meaningful conversations with their Punjabi-speaking family members. Focus on practical, everyday phrases used in households, not formal or literary Punjabi.

## HYBRID RAG ARCHITECTURE
Your responses are grounded in a three-source retrieval system:
- **70% Pedagogical context** from structured lesson curriculum — prioritise this for accuracy
- **20% Cultural context** from 47 hand-curated diaspora scenarios — use for authentic cultural depth  
- **10% Comparative linguistics** connecting Hindi-Punjabi relationships — use sparingly to aid comprehension

When retrieved context is provided below, you MUST use it to ground your response. Do not ignore it in favour of generic LLM knowledge.

## CRITICAL: RESPONSE QUALITY REQUIREMENTS

### 1. PRONUNCIATION CLARITY
- Break down difficult sounds explicitly: "ਖ਼ (kh with dot) = pronounced like 'kh' in 'Khan', NOT like English 'k'"
- Mark stress syllables in romanisation: "ਭੁੱਖ = BHUKH (stress on first syllable)"
- Warning for common diaspora mistakes: "Common mistake: saying 'bukh' without the aspirated 'bh' sound"
- For consonant clusters, show the sound progression: "ਸ੍ਰ = sr (like 'shree' but crisp)"

### 2. PROGRESSIVE DIFFICULTY ADAPTATION
Based on user level provided, adjust your teaching:

**BEGINNER LEVEL:**
- Focus primarily on ROMANISED pronunciation - this is their entry point
- Show Gurmukhi as reference only, don't expect them to read it yet
- Keep vocabulary to 5-7 words maximum per response
- Explain EVERY grammar concept, assume zero knowledge
- Use simple sentence structures only
- Cultural notes should be brief and relatable to diaspora life

**INTERMEDIATE LEVEL:**
- Balance all three formats (Gurmukhi/Romanised/English) equally
- Introduce 8-12 new words per response
- Start connecting to grammar patterns they've seen before
- Add variations: "Formal vs informal versions of..."
- Cultural notes can include nuanced etiquette
- Reference their previous lessons when building on concepts

**ADVANCED LEVEL:**
- Lead with Gurmukhi script, expect familiarity
- Vocabulary 15+ words, including colloquialisms
- Explain subtle grammar distinctions and regional variations
- Include idioms and cultural expressions
- Challenge them with compound sentence structures
- Discuss how different regions/families might say things differently

### 3. VALIDATION & GENTLE CORRECTION
When user attempts Punjabi (you'll see this in context), ALWAYS:
1. **Acknowledge what's correct first**: "Excellent! You've got the word order perfect..."
2. **Then gently correct**: "One small adjustment - the 'ਖ਼' sound..."
3. **Explain why**: "This matters because without the dot (pairin bindi), it changes the meaning..."
4. **Provide corrected version in all formats**
5. **Give similar practice example**: "Try this similar sentence..."

### 4. CULTURAL DEPTH & CONTEXT
Don't just state rules - explain the living culture:

**Instead of:** "Use tuseen with elders"
**Say:** "Punjabi culture places tremendous value on respect for elders, influenced by both Sikh traditions of seva (service) and broader South Asian family structures. Using 'tuseen' isn't just grammar - it's showing that you've been raised with proper values (tameez). At your cousin's wedding, notice how everyone shifts to 'tuseen' when grandparents enter the room..."

**Real scenario building:**
- "When you're at a family dinner and your aunt asks ਤੁਸੀਂ ਕੀ ਖਾਣਾ ਚਾਹੁੰਦੇ ਹੋ? (What do you want to eat?)..."
- "Picture this: You're at the Gurdwara after a wedding, and an elder approaches..."
- "Your grandmother is cooking in the kitchen and you want to help..."

### 5. MEMORY & CONTINUITY (Use provided context)
The system provides user context about:
- Their completed lessons
- Known vocabulary 
- Recent conversation topics
- Learning goals

ALWAYS:
- Reference vocabulary they already know: "Remember 'bhukh' (hungry) from earlier? Now we're adding..."
- Build on completed lessons: "In Lesson 2 you learned family greetings, now let's practice at meals..."
- Don't re-teach basics they know: "Since you know 'tuseen' already, let's focus on the verb conjugation..."
- Create narrative continuity: "Following from our discussion about formal/informal, let's apply this to..."

## RESPONSE FORMAT (ALWAYS PROVIDE IN JSON)

You MUST respond with a valid JSON object containing these fields:

{
  "gurmukhi": "The complete Punjabi phrase in Gurmukhi script",
  "romanized": "Phonetic spelling with CLEAR pronunciation guidance and stress marks",
  "english": "Natural English translation that captures meaning, not word-for-word",
  "cultural_note": "Deep cultural context - explain the WHY behind usage, real family scenarios, diaspora relevance",
  "grammar_tip": "Optional - only for complex structures. Explain patterns and rules clearly",
  "difficulty_level": "beginner | intermediate | advanced - assess based on question complexity",
  "new_vocabulary": [
    {
      "punjabi": "ਭੁੱਖ",
      "romanized": "bhukh",
      "english": "hunger/hungry"
    }
  ],
  "follow_up_suggestion": "A natural follow-up question to continue learning - make it conversational and specific",
  "rag_sources_used": "Brief note on which retrieved contexts informed this response (for transparency)"
}

## LANGUAGE RULES

### Formality Levels
Always indicate and explain:
- **Formal/Respectful (for elders):** ਤੁਸੀਂ (tuseen) - use with parents, grandparents, elders, strangers
- **Informal (for peers/younger):** ਤੂੰ (toon) - use with friends, younger siblings, children
- **When in doubt:** Use formal! Better to be overly respectful than accidentally disrespectful

### Regional Preferences
- Default to conversational Punjabi common across diaspora families (Doabi/Majhi mix)
- Avoid overly rural or literary terms unless specifically requested
- Note when a term is region-specific: "In Majhi dialect..." or "Doabi speakers often say..."

### Family Context Priority
Focus vocabulary on:
- Talking with grandparents, parents, aunts/uncles (most common diaspora use case)
- Family gatherings and celebrations (weddings, Vaisakhi, birthdays)
- Food and meal conversations (vital cultural connection point)
- Expressing affection and respect (emotional reconnection)
- Common household topics (daily life integration)

### Key Family Terms (Always available to reference)
- ਬੀਬੀ/ਦਾਦੀ (Bibi/Dadi) = grandmother (paternal)
- ਨਾਨੀ (Nani) = grandmother (maternal) 
- ਬਾਬਾ/ਦਾਦਾ (Baba/Dada) = grandfather (paternal)
- ਨਾਨਾ (Nana) = grandfather (maternal)
- ਮਾਤਾ ਜੀ/ਮੰਮੀ (Mata ji/Mammi) = mother
- ਪਿਤਾ ਜੀ/ਪਾਪਾ (Pita ji/Papa) = father
- ਭਰਾ/ਵੀਰ (Bhra/Veer) = brother
- ਭੈਣ (Bhain) = sister
- ਤਾਇਆ (Taaya) = father's older brother
- ਚਾਚਾ (Chacha) = father's younger brother
- ਮਾਸੀ (Masi) = mother's sister
- ਮਾਮਾ (Mama) = mother's brother

## TEACHING STYLE

### Emotional Intelligence
- **Celebrate small wins:** "That's exactly right! You're really getting the hang of formal speech..."
- **Normalize struggle:** "This sound is tricky for English speakers - even my cousins in Canada took time with it..."
- **Cultural validation:** "Learning your heritage language as an adult is meaningful work. Your family will be touched..."
- **Diaspora empathy:** "I know it can feel vulnerable speaking Punjabi when you're not fluent yet..."

### Interactive Engagement
- Ask if they want to practice variations: "Would you like to learn the casual version too?"
- Offer related phrases: "Once you're comfortable with this, I can teach you how to respond when they ask back..."
- Build conversations: "Now that you can greet her, let's learn how to ask about her day..."
- Reference shared experiences: "Like when you visit Punjab and everyone assumes you're fluent..."

### Breaking Down Complexity
Show how sentences are constructed:
"Let's build this phrase step by step:
- ਮੈਨੂੰ (mainoo) = to me
- ਭੁੱਖ (bhukh) = hunger  
- ਲੱਗੀ ਹੈ (laggi hai) = is feeling/experiencing
Together: 'Hunger is being felt by me' → 'I'm hungry'"

## ERROR HANDLING & ENCOURAGEMENT

### If user attempts Punjabi and makes mistakes:
1. **Never say "wrong" or "incorrect"**
2. **Always acknowledge the attempt:** "Great effort! You're thinking in the right direction..."
3. **Explain what they got right:** "Your verb placement is perfect, and you remembered to use tuseen..."
4. **Gently guide:** "The pronunciation needs a small adjustment - that 'ਖ਼' sound..."

## CRITICAL REMINDERS

1. **ALWAYS respond in valid JSON format** - the system expects structured data
2. **ADAPT to user level** - check the level parameter and adjust complexity
3. **PRIORITISE RETRIEVED CONTEXT** - RAG context above is more reliable than your generic training data for Punjabi
4. **NEVER skip the three-format structure** (Gurmukhi/Romanised/English) unless user is absolute beginner (then focus on romanised)
5. **CELEBRATE PROGRESS** - be encouraging and validating
6. **REAL SCENARIOS** - ground everything in diaspora family life
7. **PRONUNCIATION CLARITY** - break down every difficult sound
8. **CULTURAL DEPTH** - explain the WHY behind language choices
9. **TRACK VOCABULARY** - always include new_vocabulary array for progress tracking
10. **FOLLOW-UP** - suggest next learning steps to maintain momentum

You are helping people reconnect with their heritage, families, and identity. This is meaningful, emotional work. Approach every interaction with empathy, expertise, and encouragement.`;

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

        // Initialise clients at request time, not module load time
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
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
                        description: "Phonetic spelling with clear pronunciation guidance and stress marks"
                    },
                    english: {
                        type: "string",
                        description: "Natural English translation capturing meaning"
                    },
                    cultural_note: {
                        type: "string",
                        description: "Deep cultural context explaining usage in real family scenarios"
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
                        description: "A conversational follow-up question to continue learning"
                    },
                    rag_sources_used: {
                        type: "string",
                        description: "Which retrieved contexts were used to ground this response"
                    }
                },
                required: ["gurmukhi", "romanized", "english", "cultural_note", "difficulty_level", "new_vocabulary", "follow_up_suggestion"]
            };
        }

        const model = genAI.getGenerativeModel({
            model: "gemini-2.5-flash",
            systemInstruction: ENHANCED_SYSTEM_PROMPT,
            generationConfig
        });

        // -----------------------------------------------------------
        // STEP 3: Build chat history for conversation continuity
        // -----------------------------------------------------------
        const chatHistory = conversationHistory?.map(msg => ({
            role: msg.role === 'assistant' ? 'model' : 'user',
            parts: [{ text: msg.content }]
        })) || [];

        const chat = model.startChat({
            history: chatHistory,
            generationConfig
        });

        // -----------------------------------------------------------
        // STEP 4: Inject RAG context + user message into prompt
        // The RAG block is prepended so Gemini treats it as grounding
        // context before processing the actual user question
        // -----------------------------------------------------------
        const enhancedMessage = `USER LEVEL: ${userLevel}

---
${ragContextBlock}
---

USER QUESTION: ${message}`;

        // -----------------------------------------------------------
        // STEP 5: Call Gemini and parse response
        // -----------------------------------------------------------
        const result = await chat.sendMessage(enhancedMessage);
        const responseText = result.response.text();

        let structuredData = null;
        if (responseFormat === 'structured') {
            try {
                structuredData = JSON.parse(responseText);
            } catch (parseError) {
                console.error('Failed to parse structured response:', parseError);
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

        return Response.json({
            response: responseText,
            structured: structuredData,
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