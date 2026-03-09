// Landing page demo chat — lightweight, no RAG, sales-optimised


export async function POST(req) {
    try {
        const { message, conversationHistory } = await req.json();

        if (!process.env.GEMINI_API_KEY) {
            return Response.json(
                { error: 'GEMINI_API_KEY not configured' },
                { status: 500 }
            );
        }

        const chatHistory = conversationHistory?.map(msg => ({
            role: msg.role === 'assistant' ? 'model' : 'user',
            parts: [{ text: msg.content }]
        })) || [];

        const geminiPayload = {
            system_instruction: { parts: [{ text: LANDING_SYSTEM_PROMPT }] },
            contents: [
                ...chatHistory,
                { role: 'user', parts: [{ text: message }] }
            ],
            generationConfig: {
                temperature: 0.4,
                topP: 0.8,
                topK: 40,
                maxOutputTokens: 1024,
                responseMimeType: 'application/json',
                responseSchema: RESPONSE_SCHEMA
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
        // before the actual JSON. Find the last text part (skip thought parts).
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

        // Debug: log what we got
        console.log('Gemini parts count:', parts.length);
        console.log('Response text (first 200 chars):', responseText.substring(0, 200));

        let structured = null;
        let cleanedText = responseText;
        try {
            // Strip markdown code fences if Gemini wraps the JSON
            cleanedText = responseText.replace(/^```(?:json)?\s*\n?/i, '').replace(/\n?\s*```$/i, '').trim();
            structured = JSON.parse(cleanedText);
        } catch (parseError) {
            console.error('Failed to parse landing chat response:', parseError);
            console.error('Raw response text:', responseText);
            structured = {
                gurmukhi: '',
                romanized: '',
                english: responseText,
                cultural_note: '',
                new_vocabulary: [],
                follow_up_suggestion: ''
            };
        }

        return Response.json({
            response: structured.romanized && structured.english
                ? `${structured.romanized} · ${structured.english}`
                : responseText,
            structured,
            rawJson: cleanedText
        });

    } catch (error) {
        console.error('Landing chat error:', error);
        return Response.json(
            { error: 'Failed to get response', details: error.message },
            { status: 500 }
        );
    }
}

// -------------------------------------------------------------------
// LANDING PAGE SYSTEM PROMPT — concise, warm, sales-oriented
// -------------------------------------------------------------------
const LANDING_SYSTEM_PROMPT = `You are the Simply Punjabi demo tutor on a landing page. Your job is to impress visitors with a SHORT, accurate, and helpful Punjabi teaching response that makes them want to sign up.

## ABSOLUTE RULES

1. Respond ONLY in the JSON format specified. No exceptions.
2. KEEP EVERY FIELD SHORT. The entire response must feel quick and snappy.
3. Be warm and encouraging, like a friendly older cousin helping out.
4. Show the power of the platform: give real, accurate Punjabi that a learner could immediately use with family.

## FIELD GUIDELINES

- gurmukhi: The Punjabi phrase in Gurmukhi script. Keep to one short phrase or sentence.
- romanized: Phonetic pronunciation. Stress key syllables with CAPS (e.g. "sat-sri-KAAL"). One phrase only.
- english: Natural English meaning in under 10 words.
- cultural_note: ONE short sentence (max 15 words) about when/how to use this with family. Make it feel personal and relatable.
- new_vocabulary: 1-2 key words MAXIMUM. Only the most useful word(s) from your response.
- follow_up_suggestion: A short, natural follow-up question (under 10 words) to keep the conversation going.

## LANGUAGE ACCURACY

- Default to conversational diaspora Punjabi (Doabi/Majhi mix common in UK/Canada households).
- Always use formal ਤੁਸੀਂ (tusi) forms for elder-related phrases.
- Gurmukhi script MUST be accurate. Double-check spellings.
- Romanisation must match the Gurmukhi exactly.

## TONE

- Friendly, concise, confident.
- No filler phrases like "Great question!" or "That's a wonderful thing to learn!"
- Jump straight to the answer.
- Make the learner feel they just learned something real and useful in seconds.

## KEY FAMILY TERMS (use these accurately)
ਬੀਬੀ/ਦਾਦੀ (Bibi/Dadi) = paternal grandmother | ਨਾਨੀ (Nani) = maternal grandmother | ਬਾਬਾ/ਦਾਦਾ (Baba/Dada) = paternal grandfather | ਨਾਨਾ (Nana) = maternal grandfather | ਮੰਮੀ (Mammi) = mum | ਪਾਪਾ (Papa) = dad | ਵੀਰਜੀ (Veerji) = older brother | ਭੈਣਜੀ (Bhainji) = older sister | ਚਾਚਾ (Chacha) = dad's younger brother | ਤਾਇਆ (Taaya) = dad's older brother | ਮਾਸੀ (Masi) = mum's sister | ਮਾਮਾ (Mama) = mum's brother`;

// -------------------------------------------------------------------
// LEAN RESPONSE SCHEMA — fewer fields, tighter constraints
// -------------------------------------------------------------------
const RESPONSE_SCHEMA = {
    type: "object",
    properties: {
        gurmukhi: {
            type: "string",
            description: "Short Punjabi phrase in Gurmukhi script"
        },
        romanized: {
            type: "string",
            description: "Phonetic pronunciation, one phrase"
        },
        english: {
            type: "string",
            description: "English meaning in under 10 words"
        },
        cultural_note: {
            type: "string",
            description: "One sentence, max 15 words, about when to use this with family"
        },
        new_vocabulary: {
            type: "array",
            description: "1-2 key vocabulary words maximum",
            items: {
                type: "object",
                properties: {
                    punjabi: { type: "string" },
                    romanized: { type: "string" },
                    english: { type: "string" }
                },
                required: ["punjabi", "romanized", "english"]
            }
        },
        follow_up_suggestion: {
            type: "string",
            description: "Short follow-up question under 10 words"
        }
    },
    required: ["gurmukhi", "romanized", "english", "cultural_note", "new_vocabulary", "follow_up_suggestion"]
};