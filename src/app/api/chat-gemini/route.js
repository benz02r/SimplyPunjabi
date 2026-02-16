import { GoogleGenerativeAI } from "@google/generative-ai";
import culturalRAG from "@/lib/culturalRAG";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// ENHANCED SYSTEM PROMPT (with RAG integration)
const ENHANCED_SYSTEM_PROMPT = `You are a specialised Punjabi language tutor for diaspora learners - second and third-generation Punjabis in the UK, US, Canada, and Australia who want to reconnect with their heritage through family conversations.

## YOUR CORE PURPOSE
Help users have meaningful conversations with their Punjabi-speaking family members. Focus on practical, everyday phrases used in households, not formal or literary Punjabi.

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
  "follow_up_suggestion": "A natural follow-up question to continue learning - make it conversational and specific"
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
5. **Model correctly:** Provide the correct version in all three formats
6. **Give context for why it matters:** "This distinction is important because..."
7. **Offer practice:** "Try saying it like this: [correct version]"

### If user seems frustrated or stuck:
- Acknowledge their feelings: "I hear you - this is challenging..."
- Reframe difficulty: "Actually, you're tackling one of the trickier aspects..."
- Break it down further: "Let's make this even simpler..."
- Celebrate what they DO know: "But look at how much you've already learned..."

## CRITICAL REMINDERS

1. **ALWAYS respond in valid JSON format** - the system expects structured data
2. **ADAPT to user level** - check the level parameter and adjust complexity
3. **USE PROVIDED CONTEXT** - reference their known vocabulary and completed lessons
4. **NEVER skip the three-format structure** (Gurmukhi/Romanised/English) unless user is absolute beginner (then focus on romanised)
5. **CELEBRATE PROGRESS** - be encouraging and validating
6. **REAL SCENARIOS** - ground everything in diaspora family life
7. **PRONUNCIATION CLARITY** - break down every difficult sound
8. **CULTURAL DEPTH** - explain the WHY behind language choices
9. **TRACK VOCABULARY** - always include new_vocabulary array for progress tracking
10. **FOLLOW-UP** - suggest next learning steps to maintain momentum

You are helping people reconnect with their heritage, families, and identity. This is meaningful, emotional work. Approach every interaction with empathy, expertise, and encouragement.`;

// Helper function to map lesson to topic
function getLessonTopic(lessonId) {
    const topicMap = {
        1: 'greetings',
        2: 'self_introduction',
        3: 'family_relationships',
        4: 'family_relationships',
        5: 'daily_routines',
        6: 'food_etiquette',
        7: 'daily_routines',
        8: 'social_customs',
        9: 'social_customs',
        10: 'celebrations'
    };
    return topicMap[lessonId] || 'general';
}

// Helper function to determine formality level
function getFormalityLevel(lessonId, message) {
    // Check if message mentions elders or formal situations
    const formalKeywords = ['grandmother', 'grandfather', 'parent', 'elder', 'uncle', 'aunt', 'formal'];
    const informalKeywords = ['friend', 'sibling', 'peer', 'casual'];

    const lowerMessage = message.toLowerCase();

    if (formalKeywords.some(keyword => lowerMessage.includes(keyword))) {
        return 'formal';
    }
    if (informalKeywords.some(keyword => lowerMessage.includes(keyword))) {
        return 'informal';
    }

    // Default to formal for lessons 1-3, informal for others
    return lessonId <= 3 ? 'formal' : 'informal';
}

export async function POST(req) {
    try {
        const {
            message,
            conversationHistory,
            responseFormat,
            userLevel,
            lessonId,
            completedLessons,
            knownVocabulary
        } = await req.json();

        if (!process.env.GEMINI_API_KEY) {
            return Response.json(
                { error: 'GEMINI_API_KEY not configured' },
                { status: 500 }
            );
        }

        // STEP 1: RETRIEVE CULTURAL CONTEXTS (20% weight in hybrid architecture)
        let culturalContexts = [];
        let culturalContextString = '';

        if (lessonId) {
            try {
                const lessonContext = {
                    lessonId: lessonId,
                    topic: getLessonTopic(lessonId),
                    formalityLevel: getFormalityLevel(lessonId, message)
                };

                culturalContexts = await culturalRAG.retrieveContext(
                    message,
                    lessonContext,
                    3 // Retrieve top 3 most relevant contexts
                );

                culturalContextString = culturalRAG.formatContextsForPrompt(culturalContexts);

                console.log(`RAG: Retrieved ${culturalContexts.length} cultural contexts for lesson ${lessonId}`);
            } catch (ragError) {
                console.error('RAG retrieval error (non-fatal):', ragError);
                culturalContextString = 'No specific cultural context available.';
            }
        } else {
            culturalContextString = 'No specific cultural context available.';
        }

        // STEP 2: BUILD PEDAGOGICAL CONTEXT (70% weight)
        const pedagogicalContext = `
CURRENT LESSON: ${lessonId || 'General conversation'}
LESSON TOPIC: ${lessonId ? getLessonTopic(lessonId) : 'General'}
USER LEVEL: ${userLevel}
COMPLETED LESSONS: ${completedLessons?.join(', ') || 'None'}
KNOWN VOCABULARY COUNT: ${knownVocabulary?.length || 0}

PEDAGOGICAL CONSTRAINTS:
- Maximum 2 new concepts per response (cognitive load management)
- Build on known vocabulary: ${knownVocabulary?.slice(0, 10).join(', ') || 'Starting fresh'}
- Difficulty calibrated to: ${userLevel}
`;

        // STEP 3: ADD CULTURAL CONTEXT (20% weight)
        const culturalContextSection = `
CULTURAL CONTEXT (retrieved from knowledge base):
${culturalContextString}

IMPORTANT: Use the cultural contexts above to inform your response when relevant. These provide authentic Punjabi cultural norms and family scenarios.
`;

        // STEP 4: COMPARATIVE LINGUISTICS (10% weight)
        const comparativeContext = `
COMPARATIVE LINGUISTICS:
- If helpful, mention Hindi-Punjabi cognates for diaspora learners who may have passive Hindi exposure
- Example: "This word is similar to Hindi..."
- Note phonological differences between Hindi and Punjabi when relevant
`;

        // Adjust model parameters based on user level
        const generationConfig = {
            temperature: userLevel === 'beginner' ? 0.3 : userLevel === 'intermediate' ? 0.5 : 0.7,
            topP: 0.8,
            topK: 40,
            maxOutputTokens: 2048,
        };

        // For structured responses, add schema
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

        // Build chat history for context
        const chatHistory = conversationHistory?.map(msg => ({
            role: msg.role === 'assistant' ? 'model' : 'user',
            parts: [{ text: msg.content }]
        })) || [];

        const chat = model.startChat({
            history: chatHistory,
            generationConfig
        });

        // STEP 5: CONSTRUCT HYBRID PROMPT (70-20-10 architecture)
        const enhancedMessage = `${pedagogicalContext}

${culturalContextSection}

${comparativeContext}

USER MESSAGE: ${message}`;

        const result = await chat.sendMessage(enhancedMessage);
        const responseText = result.response.text();

        let structuredData = null;
        if (responseFormat === 'structured') {
            try {
                structuredData = JSON.parse(responseText);
            } catch (parseError) {
                console.error('Failed to parse structured response:', parseError);
                console.error('Raw response:', responseText);
                // Fallback: extract what we can
                structuredData = {
                    gurmukhi: "",
                    romanized: "",
                    english: "",
                    cultural_note: responseText,
                    grammar_tip: "",
                    difficulty_level: userLevel,
                    new_vocabulary: [],
                    follow_up_suggestion: ""
                };
            }
        }

        // Return response with RAG metadata for analytics
        return Response.json({
            response: responseText,
            structured: structuredData,
            metadata: {
                culturalContextsUsed: culturalContexts.length,
                lessonTopic: lessonId ? getLessonTopic(lessonId) : null,
                ragSimilarityScores: culturalContexts.map(c => c.similarity)
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