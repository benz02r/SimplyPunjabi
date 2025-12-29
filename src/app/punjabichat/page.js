"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { MessageCircle, Send, Loader2, Volume2, Copy, CheckCircle, Trash2, Menu, ArrowLeft, Lightbulb, X, BookOpen, Users, MessageSquare } from "lucide-react";
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null;

// COMPREHENSIVE SYSTEM PROMPT
const SYSTEM_PROMPT = `You are a specialized Punjabi language tutor for diaspora learners - second and third-generation Punjabis in the UK, US, Canada, and Australia who want to reconnect with their heritage through family conversations.

## YOUR CORE PURPOSE
Help users have meaningful conversations with their Punjabi-speaking family members. Focus on practical, everyday phrases used in households, not formal or literary Punjabi.

## RESPONSE FORMAT (ALWAYS USE THIS)
For every Punjabi phrase or sentence, provide:

GURMUKHI: [Punjabi script]
ROMANIZED: [Phonetic spelling with clear pronunciation]
ENGLISH: [Natural English translation]

Then add context when helpful:
CULTURAL NOTE: [Explain cultural context, formality levels, or when to use this]
GRAMMAR TIP: [Optional - only for complex structures]

## LANGUAGE RULES
1. Formality Levels - Always indicate whether a phrase is:
   - Formal/Respectful (for elders): Use ਤੁਸੀਂ (tuseen)
   - Informal (for peers/younger): Use ਤੂੰ (toon)

2. Regional Preferences: Default to conversational Punjabi common across diaspora families (Doabi/Majhi mix). Avoid overly rural or literary terms.

3. Family Context - Prioritize vocabulary for:
   - Talking with grandparents, parents, aunts/uncles
   - Family gatherings and celebrations
   - Food and meal conversations
   - Expressing affection and respect
   - Common household topics

4. Cultural Sensitivity - Explain cultural nuances like:
   - Respect terms (ji, bebe, baba)
   - Gender considerations in language
   - Generational communication styles

## TEACHING STYLE
- Patient and encouraging: Celebrate small wins
- Practical: Focus on what they'll actually say
- Relatable: Reference diaspora experiences (visiting Punjab, family weddings, learning from grandparents)
- Interactive: Ask if they want to practice variations
- Break down complex phrases: Show how sentences are built

## EXAMPLE RESPONSES

Example 1 - Basic Greeting:
User: "How do I greet my grandmother?"

GURMUKHI: ਸਤ ਸ੍ਰੀ ਅਕਾਲ, ਬੀਬੀ ਜੀ। ਤੁਸੀਂ ਕਿਵੇਂ ਹੋ?
ROMANIZED: Sat sri akaal, Bibi ji. Tuseen kivein ho?
ENGLISH: Hello, Grandmother. How are you?

CULTURAL NOTE: "Bibi ji" is a respectful term for elderly women. "Tuseen" is the formal "you" - always use this with elders. The response you'll likely hear is "ਠੀਕ ਹਾਂ" (theek haan - I'm fine).

Would you like to learn how to respond when she asks how you are?

Example 2 - Explaining Grammar:
User: "Why does 'you' change?"

Great question! Punjabi has two forms of "you":

Informal (ਤੂੰ - toon): 
- Use with: friends, younger siblings, children
- Example: ਤੂੰ ਕਿੱਥੇ ਜਾ ਰਿਹਾ ਹੈਂ? (Toon kitthe ja riha hain? - Where are you going?)

Formal/Respectful (ਤੁਸੀਂ - tuseen):
- Use with: parents, grandparents, elders, strangers, showing respect
- Example: ਤੁਸੀਂ ਕਿੱਥੇ ਜਾ ਰਹੇ ਹੋ? (Tuseen kitthe ja rahe ho? - Where are you going?)

CULTURAL NOTE: When in doubt, use "tuseen" - it's better to be overly respectful than accidentally disrespectful!

Example 3 - Family Conversation:
User: "How do I tell my dad I'm hungry?"

Informal (since it's your dad, but respectfully):
GURMUKHI: ਪਾਪਾ ਜੀ, ਮੈਨੂੰ ਭੁੱਖ ਲੱਗੀ ਹੈ।
ROMANIZED: Papa ji, mainoo bhukh laggi hai.
ENGLISH: Dad, I'm hungry.

More casual version:
GURMUKHI: ਪਾਪਾ, ਮੈਂ ਭੁੱਖਾ ਹਾਂ।
ROMANIZED: Papa, main bhukha haan.
ENGLISH: Dad, I'm hungry.

CULTURAL NOTE: Adding "ji" shows respect even to parents. The first version is more polite, the second is casual but still affectionate - both are fine!

## WHAT NOT TO DO
- Don't use overly formal/literary Punjabi unless specifically requested
- Don't overwhelm with grammar rules - keep it conversational
- Don't translate word-for-word - explain natural usage
- Don't assume knowledge - explain even basic concepts
- Don't skip the format (GURMUKHI/ROMANIZED/ENGLISH)

## ENCOURAGEMENT
Celebrate their progress! Recognize that learning heritage languages as adults is meaningful work. Remind them that even small phrases help connect with family and culture.

## ADDITIONAL CONTEXT - COMMON PATTERNS

Asking Questions:
- ਕੀ (kee) = what
- ਕਿਵੇਂ (kivein) = how
- ਕਿੱਥੇ (kitthe) = where
- ਕਦੋਂ (kadon) = when
- ਕਿਉਂ (kiun) = why

Common Responses:
- ਹਾਂ (haan) = yes
- ਨਹੀਂ (nahin) = no
- ਠੀਕ ਹੈ (theek hai) = okay/alright
- ਪਤਾ ਨਹੀਂ (pata nahin) = I don't know
- ਸ਼ਾਇਦ (shaaid) = maybe

Family Terms:
- ਬੀਬੀ/ਦਾਦੀ (Bibi/Dadi) = grandmother
- ਬਾਬਾ/ਦਾਦਾ (Baba/Dada) = grandfather
- ਮਾਤਾ ਜੀ/ਮੰਮੀ (Mata ji/Mammi) = mother
- ਪਿਤਾ ਜੀ/ਪਾਪਾ (Pita ji/Papa) = father
- ਭਰਾ/ਵੀਰ (Bhra/Veer) = brother
- ਭੈਣ (Bhain) = sister

Now, help this user with their Punjabi learning journey!`;

export default function PunjabiChat() {
    const router = useRouter();
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [copiedId, setCopiedId] = useState(null);
    const [userId, setUserId] = useState(null);
    const [isHeaderCollapsed, setIsHeaderCollapsed] = useState(false);
    const messagesEndRef = useRef(null);
    const inputRef = useRef(null);

    useEffect(() => {
        const getUser = async () => {
            if (supabase) {
                const { data: { user } } = await supabase.auth.getUser();
                if (user) {
                    setUserId(user.id);
                }
            }
        };
        getUser();
    }, []);

    // Auto-collapse header after first message on mobile
    useEffect(() => {
        if (messages.length > 0 && window.innerWidth < 640) {
            setIsHeaderCollapsed(true);
        }
    }, [messages.length]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const speakPunjabi = (text) => {
        if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = 'pa-IN';
            window.speechSynthesis.speak(utterance);
        }
    };

    const copyToClipboard = (text, messageId) => {
        navigator.clipboard.writeText(text);
        setCopiedId(messageId);
        setTimeout(() => setCopiedId(null), 2000);
    };

    const parseResponse = (text) => {
        const gurmukhiMatch = text.match(/GURMUKHI:\s*(.+?)(?=\nROMANIZED:|$)/s);
        const romanizedMatch = text.match(/ROMANIZED:\s*(.+?)(?=\nENGLISH:|$)/s);
        const englishMatch = text.match(/ENGLISH:\s*(.+?)(?=\nCULTURAL NOTE:|GRAMMAR TIP:|$)/s);
        const culturalNoteMatch = text.match(/CULTURAL NOTE:\s*(.+?)(?=\nGRAMMAR TIP:|$)/s);
        const grammarTipMatch = text.match(/GRAMMAR TIP:\s*(.+?)$/s);

        let additionalContext = '';
        if (culturalNoteMatch || grammarTipMatch) {
            additionalContext = (culturalNoteMatch ? culturalNoteMatch[1].trim() : '') +
                (grammarTipMatch ? '\n\nGRAMMAR TIP: ' + grammarTipMatch[1].trim() : '');
        }

        return {
            gurmukhi: gurmukhiMatch ? gurmukhiMatch[1].trim() : 'ਜਵਾਬ ਉਪਲਬਧ ਨਹੀਂ',
            romanized: romanizedMatch ? romanizedMatch[1].trim() : 'Response not available',
            english: englishMatch ? englishMatch[1].trim() : text,
            context: additionalContext
        };
    };

    const sendMessage = async () => {
        if (!inputMessage.trim() || isLoading) return;

        const userMessage = {
            id: Date.now(),
            type: 'user',
            text: inputMessage,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        setMessages(prev => [...prev, userMessage]);
        const currentInput = inputMessage;
        setInputMessage('');
        setIsLoading(true);

        try {
            const API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

            if (!API_KEY) {
                throw new Error('API key not found. Please add NEXT_PUBLIC_GEMINI_API_KEY to your .env.local file');
            }

            const conversationHistory = messages
                .slice(-6)
                .map(msg => {
                    if (msg.type === 'user') return `User: ${msg.text}`;
                    if (msg.type === 'ai') {
                        return `Assistant: GURMUKHI: ${msg.gurmukhi}\nROMANIZED: ${msg.romanized}\nENGLISH: ${msg.english}${msg.context ? '\n' + msg.context : ''}`;
                    }
                    return '';
                })
                .filter(Boolean)
                .join('\n\n');

            const fullPrompt = `${SYSTEM_PROMPT}\n\n${conversationHistory ? '## CONVERSATION HISTORY:\n' + conversationHistory + '\n\n' : ''}## CURRENT USER MESSAGE:\n${currentInput}\n\nRemember to use the format (GURMUKHI/ROMANIZED/ENGLISH) and add cultural context when helpful!`;

            const response = await fetch(
                `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${API_KEY}`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        contents: [{
                            parts: [{
                                text: fullPrompt
                            }]
                        }],
                        generationConfig: {
                            temperature: 0.7,
                            maxOutputTokens: 800,
                        }
                    })
                }
            );

            if (!response.ok) {
                const errorData = await response.json();
                console.error('API Error:', errorData);
                throw new Error(`API Error: ${errorData.error?.message || response.statusText}`);
            }

            const data = await response.json();
            const aiText = data.candidates?.[0]?.content?.parts?.[0]?.text || 'No response received';
            const parsed = parseResponse(aiText);

            const aiMessage = {
                id: Date.now() + 1,
                type: 'ai',
                gurmukhi: parsed.gurmukhi,
                romanized: parsed.romanized,
                english: parsed.english,
                context: parsed.context,
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            };

            setMessages(prev => [...prev, aiMessage]);

            if (supabase && userId) {
                try {
                    await supabase.from('chat_history').insert({
                        user_id: userId,
                        user_message: currentInput,
                        ai_response_gurmukhi: aiMessage.gurmukhi,
                        ai_response_romanized: aiMessage.romanized,
                        ai_response_english: aiMessage.english,
                        created_at: new Date().toISOString()
                    });
                } catch (dbError) {
                    console.log('Database save skipped:', dbError.message);
                }
            }
        } catch (error) {
            console.error('Error:', error);

            const errorMessage = {
                id: Date.now() + 1,
                type: 'error',
                text: error.message || 'Sorry, something went wrong. Please try again.',
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            };

            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    const clearChat = () => {
        if (window.confirm('Are you sure you want to clear the chat history?')) {
            setMessages([]);
            setIsHeaderCollapsed(false);
        }
    };

    const sampleQuestions = [
        "How do I greet my grandmother?",
        "Introduce myself to my uncle",
        "Formal vs informal Punjabi?",
        "Ask dad if he's eaten?",
        "Family relationship terms",
        "Say 'I love you' to mom",
        "Common family phrases",
        "Ask about wellbeing"
    ];

    const handleSampleQuestion = (question) => {
        setInputMessage(question);
        setIsSidebarOpen(false);
        inputRef.current?.focus();
    };

    return (
        <div className="fixed inset-0 bg-gradient-to-br from-blue-50 via-white to-orange-50 overflow-hidden">
            {/* Mobile Sidebar Overlay */}
            {isSidebarOpen && (
                <>
                    <div
                        className="fixed inset-0 bg-black bg-opacity-50 z-40"
                        onClick={() => setIsSidebarOpen(false)}
                    />
                    <div className="fixed inset-y-0 left-0 w-[85%] max-w-sm bg-white z-50 shadow-2xl overflow-y-auto">
                        <div className="p-4">
                            <div className="flex items-center justify-between mb-4 sticky top-0 bg-white pb-2 border-b">
                                <div className="flex items-center gap-2">
                                    <Lightbulb size={18} className="text-orange-600" />
                                    <h3 className="text-base font-bold text-gray-900">Sample Questions</h3>
                                </div>
                                <button
                                    onClick={() => setIsSidebarOpen(false)}
                                    className="text-gray-400 hover:text-gray-600 transition-colors p-2"
                                >
                                    <X size={20} />
                                </button>
                            </div>
                            <div className="space-y-2">
                                {sampleQuestions.map((question, index) => (
                                    <button
                                        key={index}
                                        onClick={() => handleSampleQuestion(question)}
                                        className="w-full text-left p-3 bg-gradient-to-r from-blue-50 to-orange-50 border border-blue-100 rounded-lg text-sm text-gray-700 hover:from-blue-100 hover:to-orange-100 hover:border-blue-200 transition-all active:scale-95"
                                    >
                                        {question}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </>
            )}

            {/* Main Container */}
            <div className="h-full flex flex-col">
                {/* Collapsible Header */}
                <div className={`bg-gradient-to-r from-blue-600 to-blue-700 text-white transition-all duration-300 ${
                    isHeaderCollapsed && messages.length > 0 ? 'py-2 px-3' : 'py-3 px-3 sm:py-4 sm:px-6'
                }`}>
                    <div className="max-w-6xl mx-auto">
                        {isHeaderCollapsed && messages.length > 0 ? (
                            // Compact header
                            <div className="flex items-center justify-between">
                                <button
                                    onClick={() => router.push("/learning/essential-punjabi")}
                                    className="flex items-center gap-1.5 text-white/90 hover:text-white text-xs"
                                >
                                    <ArrowLeft size={14} />
                                    <span>Back</span>
                                </button>
                                <div className="flex items-center gap-1.5">
                                    <MessageCircle size={14} />
                                    <span className="text-xs font-semibold">Punjabi AI</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <button
                                        onClick={() => setIsSidebarOpen(true)}
                                        className="p-1.5 bg-white/20 rounded-lg hover:bg-white/30 transition-colors"
                                    >
                                        <Menu size={14} />
                                    </button>
                                    <button
                                        onClick={clearChat}
                                        className="p-1.5 bg-red-500/80 rounded-lg hover:bg-red-500 transition-colors"
                                    >
                                        <Trash2 size={14} />
                                    </button>
                                    <button
                                        onClick={() => setIsHeaderCollapsed(false)}
                                        className="text-xs underline ml-1"
                                    >
                                        Expand
                                    </button>
                                </div>
                            </div>
                        ) : (
                            // Full header
                            <>
                                <button
                                    onClick={() => router.push("/learning/essential-punjabi")}
                                    className="mb-3 flex items-center gap-2 text-white/90 hover:text-white font-semibold transition-colors text-xs sm:text-sm"
                                >
                                    <ArrowLeft size={16} />
                                    <span>Back to Lessons</span>
                                </button>
                                <div className="flex items-center gap-2 mb-2">
                                    <MessageCircle size={14} className="sm:w-4 sm:h-4" />
                                    <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-wide">Punjabi Language Assistant</span>
                                </div>
                                <h1 className="text-lg sm:text-2xl font-bold mb-1 sm:mb-2">
                                    Chat with Simply Punjabi AI
                                </h1>
                                <p className="text-xs sm:text-sm text-blue-100 mb-2">
                                    Ask in English, learn in Punjabi
                                </p>
                                {messages.length > 0 && (
                                    <button
                                        onClick={() => setIsHeaderCollapsed(true)}
                                        className="text-xs text-white/80 hover:text-white underline sm:hidden"
                                    >
                                        Minimize header for more space
                                    </button>
                                )}
                            </>
                        )}
                    </div>
                </div>

                {/* Chat Container - Takes remaining space */}
                <div className="flex-1 flex flex-col min-h-0 max-w-6xl w-full mx-auto">
                    {/* Messages Area */}
                    <div className="flex-1 overflow-y-auto px-2 py-3 sm:px-4 sm:py-4" style={{
                        WebkitOverflowScrolling: 'touch',
                        overscrollBehavior: 'contain'
                    }}>
                        {messages.length === 0 ? (
                            <div className="h-full flex flex-col items-center justify-center text-center px-4">
                                <div className="bg-gradient-to-br from-blue-100 to-orange-100 p-6 rounded-full mb-3">
                                    <MessageCircle size={40} className="text-blue-600" />
                                </div>
                                <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">
                                    Welcome! 👋
                                </h2>
                                <p className="text-xs sm:text-sm text-gray-600 max-w-md mb-4">
                                    Your personal tutor for family-focused Punjabi. Get Gurmukhi script, pronunciation, and cultural context.
                                </p>
                                <div className="flex flex-wrap justify-center gap-3 text-xs text-gray-600 mb-4">
                                    <div className="flex items-center gap-1.5">
                                        <BookOpen size={14} className="text-blue-600" />
                                        <span>Authentic</span>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <Users size={14} className="text-blue-600" />
                                        <span>Family-focused</span>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <MessageSquare size={14} className="text-blue-600" />
                                        <span>Cultural context</span>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setIsSidebarOpen(true)}
                                    className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all text-sm shadow-lg active:scale-95"
                                >
                                    <Lightbulb size={16} />
                                    View Sample Questions
                                </button>
                            </div>
                        ) : (
                            <div className="space-y-2.5 sm:space-y-3 pb-2">
                                {messages.map((message) => (
                                    <div
                                        key={message.id}
                                        className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                                    >
                                        {message.type === 'user' ? (
                                            <div className="max-w-[90%] sm:max-w-[80%]">
                                                <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-2.5 sm:p-3 rounded-2xl rounded-br-none shadow-md">
                                                    <p className="text-xs sm:text-sm leading-relaxed break-words">{message.text}</p>
                                                    <p className="text-[9px] sm:text-[10px] text-blue-100 mt-1.5 text-right">{message.timestamp}</p>
                                                </div>
                                            </div>
                                        ) : message.type === 'error' ? (
                                            <div className="max-w-[90%] sm:max-w-[80%]">
                                                <div className="bg-red-50 border-l-4 border-red-500 p-2.5 sm:p-3 rounded-lg">
                                                    <p className="text-xs sm:text-sm text-red-800 break-words">{message.text}</p>
                                                    <p className="text-[9px] sm:text-[10px] text-red-600 mt-1.5">{message.timestamp}</p>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="max-w-[90%] sm:max-w-[80%]">
                                                <div className="bg-gradient-to-br from-blue-50 to-orange-50 border border-blue-100 p-3 sm:p-4 rounded-2xl rounded-bl-none shadow-md">
                                                    {/* Gurmukhi */}
                                                    <div className="mb-2.5">
                                                        <div className="flex items-center justify-between mb-1.5">
                                                            <span className="text-[9px] sm:text-[10px] font-bold text-gray-500 uppercase tracking-wide">Gurmukhi</span>
                                                            <div className="flex gap-1.5">
                                                                <button
                                                                    onClick={() => speakPunjabi(message.gurmukhi)}
                                                                    className="text-blue-600 hover:text-blue-700 transition-colors p-1 active:scale-90"
                                                                    title="Listen"
                                                                >
                                                                    <Volume2 size={14} />
                                                                </button>
                                                                <button
                                                                    onClick={() => copyToClipboard(message.gurmukhi, `${message.id}-gurmukhi`)}
                                                                    className="text-blue-600 hover:text-blue-700 transition-colors p-1 active:scale-90"
                                                                    title="Copy"
                                                                >
                                                                    {copiedId === `${message.id}-gurmukhi` ? (
                                                                        <CheckCircle size={14} />
                                                                    ) : (
                                                                        <Copy size={14} />
                                                                    )}
                                                                </button>
                                                            </div>
                                                        </div>
                                                        <p className="text-xl sm:text-2xl font-semibold text-gray-900 leading-relaxed break-words">
                                                            {message.gurmukhi}
                                                        </p>
                                                    </div>

                                                    {/* Romanized */}
                                                    <div className="mb-2.5 pb-2.5 border-b border-gray-200">
                                                        <span className="text-[9px] sm:text-[10px] font-bold text-gray-500 uppercase tracking-wide mb-1 block">Romanised</span>
                                                        <p className="text-sm sm:text-base text-gray-700 italic break-words">{message.romanized}</p>
                                                    </div>

                                                    {/* English */}
                                                    <div className={message.context ? "mb-2.5 pb-2.5 border-b border-gray-200" : ""}>
                                                        <span className="text-[9px] sm:text-[10px] font-bold text-gray-500 uppercase tracking-wide mb-1 block">English</span>
                                                        <p className="text-xs sm:text-sm text-gray-600 break-words">{message.english}</p>
                                                    </div>

                                                    {/* Context */}
                                                    {message.context && (
                                                        <div className="bg-white/60 rounded-lg p-2 sm:p-2.5">
                                                            <p className="text-[10px] sm:text-xs text-gray-700 leading-relaxed whitespace-pre-line break-words">{message.context}</p>
                                                        </div>
                                                    )}

                                                    <p className="text-[9px] sm:text-[10px] text-gray-400 mt-2">{message.timestamp}</p>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ))}
                                {isLoading && (
                                    <div className="flex justify-start">
                                        <div className="bg-gradient-to-br from-blue-50 to-orange-50 border border-blue-100 p-2.5 sm:p-3 rounded-2xl rounded-bl-none shadow-md">
                                            <div className="flex items-center gap-2">
                                                <Loader2 size={16} className="animate-spin text-blue-600" />
                                                <span className="text-xs text-gray-600">Preparing...</span>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                <div ref={messagesEndRef} />
                            </div>
                        )}
                    </div>

                    {/* Input Area - Sticky Bottom */}
                    <div className="bg-white border-t border-gray-200 p-2 sm:p-3 safe-bottom">
                        <div className="flex gap-2 items-end max-w-4xl mx-auto">
                            <textarea
                                ref={inputRef}
                                value={inputMessage}
                                onChange={(e) => setInputMessage(e.target.value)}
                                onKeyPress={handleKeyPress}
                                placeholder="Ask anything..."
                                disabled={isLoading}
                                rows="1"
                                className="flex-1 px-3 py-2.5 border-2 border-gray-300 rounded-xl resize-none focus:outline-none focus:border-blue-500 transition-colors text-sm disabled:bg-gray-100 disabled:cursor-not-allowed"
                                style={{
                                    maxHeight: '80px',
                                    minHeight: '42px'
                                }}
                                onInput={(e) => {
                                    e.target.style.height = 'auto';
                                    e.target.style.height = Math.min(e.target.scrollHeight, 80) + 'px';
                                }}
                            />
                            <button
                                onClick={sendMessage}
                                disabled={!inputMessage.trim() || isLoading}
                                className={`px-3 sm:px-4 py-2.5 rounded-xl font-semibold transition-all text-sm flex items-center gap-1.5 flex-shrink-0 ${
                                    inputMessage.trim() && !isLoading
                                        ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 shadow-md active:scale-95'
                                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                }`}
                            >
                                {isLoading ? (
                                    <Loader2 size={18} className="animate-spin" />
                                ) : (
                                    <Send size={18} />
                                )}
                            </button>
                        </div>
                        {!isLoading && (
                            <div className="flex items-center justify-between mt-1.5 px-1 max-w-4xl mx-auto">
                                <p className="text-[10px] text-gray-500">
                                    Enter to send
                                </p>
                                {!isSidebarOpen && messages.length === 0 && (
                                    <button
                                        onClick={() => setIsSidebarOpen(true)}
                                        className="text-[10px] text-blue-600 font-medium flex items-center gap-1"
                                    >
                                        <Lightbulb size={12} />
                                        Examples
                                    </button>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <style jsx>{`
                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                .animate-spin {
                    animation: spin 1s linear infinite;
                }
                
                /* Safe area for iOS devices */
                .safe-bottom {
                    padding-bottom: max(0.75rem, env(safe-area-inset-bottom));
                }
                
                /* Smooth scrolling */
                * {
                    -webkit-overflow-scrolling: touch;
                }
                
                /* Prevent zoom on input focus (iOS) */
                @media screen and (max-width: 640px) {
                    input, textarea, select {
                        font-size: 16px !important;
                    }
                }
                
                /* Hide scrollbar but keep functionality */
                .overflow-y-auto::-webkit-scrollbar {
                    width: 0px;
                    background: transparent;
                }
            `}</style>
        </div>
    );
}