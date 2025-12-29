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
const SYSTEM_PROMPT = `You are a specialised Punjabi language tutor for diaspora learners - second and third-generation Punjabis in the UK, US, Canada, and Australia who want to reconnect with their heritage through family conversations.

## YOUR CORE PURPOSE
Help users have meaningful conversations with their Punjabi-speaking family members. Focus on practical, everyday phrases used in households, not formal or literary Punjabi.

## RESPONSE FORMAT (ALWAYS USE THIS)
For every Punjabi phrase or sentence, provide:

GURMUKHI: [Punjabi script]
ROMANISED: [Phonetic spelling with clear pronunciation]
ENGLISH: [Natural English translation]

Then add context when helpful:
CULTURAL NOTE: [Explain cultural context, formality levels, or when to use this]
GRAMMAR TIP: [Optional - only for complex structures]

## LANGUAGE RULES
1. Formality Levels - Always indicate whether a phrase is:
   - Formal/Respectful (for elders): Use ਤੁਸੀਂ (tuseen)
   - Informal (for peers/younger): Use ਤੂੰ (toon)

2. Regional Preferences: Default to conversational Punjabi common across diaspora families (Doabi/Majhi mix). Avoid overly rural or literary terms.

3. Family Context - Prioritise vocabulary for:
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
- Interactive: Ask if they want to practise variations
- Break down complex phrases: Show how sentences are built

## EXAMPLE RESPONSES

Example 1 - Basic Greeting:
User: "How do I greet my grandmother?"

GURMUKHI: ਸਤ ਸ੍ਰੀ ਅਕਾਲ, ਬੀਬੀ ਜੀ। ਤੁਸੀਂ ਕਿਵੇਂ ਹੋ?
ROMANISED: Sat sri akaal, Bibi ji. Tuseen kivein ho?
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
ROMANISED: Papa ji, mainoo bhukh laggi hai.
ENGLISH: Dad, I'm hungry.

More casual version:
GURMUKHI: ਪਾਪਾ, ਮੈਂ ਭੁੱਖਾ ਹਾਂ।
ROMANISED: Papa, main bhukha haan.
ENGLISH: Dad, I'm hungry.

CULTURAL NOTE: Adding "ji" shows respect even to parents. The first version is more polite, the second is casual but still affectionate - both are fine!

## WHAT NOT TO DO
- Don't use overly formal/literary Punjabi unless specifically requested
- Don't overwhelm with grammar rules - keep it conversational
- Don't translate word-for-word - explain natural usage
- Don't assume knowledge - explain even basic concepts
- Don't skip the format (GURMUKHI/ROMANISED/ENGLISH)

## ENCOURAGEMENT
Celebrate their progress! Recognise that learning heritage languages as adults is meaningful work. Remind them that even small phrases help connect with family and culture.

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
        const gurmukhiMatch = text.match(/GURMUKHI:\s*(.+?)(?=\nROMANI[SZ]ED:|$)/s);
        const romanizedMatch = text.match(/ROMANI[SZ]ED:\s*(.+?)(?=\nENGLISH:|$)/s);
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
                        return `Assistant: GURMUKHI: ${msg.gurmukhi}\nROMANISED: ${msg.romanized}\nENGLISH: ${msg.english}${msg.context ? '\n' + msg.context : ''}`;
                    }
                    return '';
                })
                .filter(Boolean)
                .join('\n\n');

            const fullPrompt = `${SYSTEM_PROMPT}\n\n${conversationHistory ? '## CONVERSATION HISTORY:\n' + conversationHistory + '\n\n' : ''}## CURRENT USER MESSAGE:\n${currentInput}\n\nRemember to use the format (GURMUKHI/ROMANISED/ENGLISH) and add cultural context when helpful!`;

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
        }
    };

    const sampleQuestions = [
        "How do I greet my grandmother?",
        "Introduce myself to my uncle",
        "Formal vs informal Punjabi",
        "Ask dad if he's eaten",
        "Family relationship terms",
        "Say 'I love you' to mum",
        "Common family phrases",
        "Ask about wellbeing"
    ];

    const handleSampleQuestion = (question) => {
        setInputMessage(question);
        setIsSidebarOpen(false);
        inputRef.current?.focus();
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50">
            {/* Mobile Sidebar Overlay - Full Screen, Mobile Optimised */}
            {isSidebarOpen && (
                <>
                    <div
                        className="fixed inset-0 bg-black bg-opacity-50 z-50"
                        onClick={() => setIsSidebarOpen(false)}
                    />
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <div className="bg-white rounded-2xl w-full max-w-md max-h-[80vh] overflow-hidden shadow-2xl flex flex-col">
                            {/* Sidebar Header */}
                            <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-orange-50">
                                <div className="flex items-center gap-2">
                                    <Lightbulb size={20} className="text-orange-600" />
                                    <h3 className="text-lg font-bold text-gray-900">Sample Questions</h3>
                                </div>
                                <button
                                    onClick={() => setIsSidebarOpen(false)}
                                    className="text-gray-400 hover:text-gray-600 transition-colors p-2 hover:bg-gray-100 rounded-lg"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            {/* Sidebar Content - Scrollable */}
                            <div className="flex-1 overflow-y-auto p-4">
                                <div className="space-y-3">
                                    {sampleQuestions.map((question, index) => (
                                        <button
                                            key={index}
                                            onClick={() => handleSampleQuestion(question)}
                                            className="w-full text-left p-4 bg-gradient-to-r from-blue-50 to-orange-50 border border-blue-100 rounded-xl text-sm text-gray-700 hover:from-blue-100 hover:to-orange-100 hover:border-blue-200 transition-all active:scale-98 font-medium"
                                        >
                                            {question}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Sidebar Footer */}
                            <div className="p-4 border-t border-gray-200 bg-gray-50">
                                <button
                                    onClick={() => setIsSidebarOpen(false)}
                                    className="w-full py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all active:scale-98"
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </>
            )}

            {/* Main Container - Proper spacing for navbar */}
            <div className="pt-24 sm:pt-28 pb-4 px-3 sm:px-6 max-w-6xl mx-auto">
                {/* Back Button */}
                <button
                    onClick={() => router.push("/learning/essential-punjabi")}
                    className="mb-4 flex items-center gap-2 text-gray-600 hover:text-blue-600 font-semibold transition-colors text-sm"
                >
                    <ArrowLeft size={16} />
                    <span>Back to Lessons</span>
                </button>

                {/* Header */}
                <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl sm:rounded-2xl p-4 sm:p-6 text-white shadow-lg mb-4">
                    <div className="flex items-center gap-2 mb-2">
                        <MessageCircle size={16} className="sm:w-[18px] sm:h-[18px]" />
                        <span className="text-xs font-semibold uppercase tracking-wide">Punjabi Language Assistant</span>
                    </div>
                    <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-2">
                        Chat with Simply Punjabi AI
                    </h1>
                    <p className="text-sm sm:text-base text-blue-100">
                        Ask in English, learn in Punjabi with cultural context
                    </p>
                </div>

                {/* Chat Container */}
                <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden flex flex-col"
                     style={{ height: 'calc(100vh - 320px)', minHeight: '400px' }}>

                    {/* Chat Header Bar */}
                    <div className="bg-gradient-to-r from-blue-50 to-orange-50 p-3 border-b border-gray-200 flex-shrink-0">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                                <span className="text-xs sm:text-sm font-semibold text-gray-700">AI Tutor Online</span>
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => setIsSidebarOpen(true)}
                                    className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-xs font-semibold rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all active:scale-95"
                                >
                                    <Menu size={14} />
                                    <span className="hidden sm:inline">Examples</span>
                                </button>
                                {messages.length > 0 && (
                                    <button
                                        onClick={clearChat}
                                        className="flex items-center gap-1.5 px-3 py-1.5 bg-red-500 text-white text-xs font-semibold rounded-lg hover:bg-red-600 transition-all active:scale-95"
                                    >
                                        <Trash2 size={14} />
                                        <span className="hidden sm:inline">Clear</span>
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Messages Area - Scrollable */}
                    <div className="flex-1 overflow-y-auto p-3 sm:p-4" style={{
                        WebkitOverflowScrolling: 'touch',
                        overscrollBehavior: 'contain'
                    }}>
                        {messages.length === 0 ? (
                            <div className="h-full flex flex-col items-center justify-center text-center px-4">
                                <div className="bg-gradient-to-br from-blue-100 to-orange-100 p-6 rounded-full mb-4">
                                    <MessageCircle size={40} className="text-blue-600" />
                                </div>
                                <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">
                                    Welcome to Simply Punjabi AI
                                </h2>
                                <p className="text-sm text-gray-600 max-w-md mb-4">
                                    Your personal tutor for family-focused Punjabi. Get Gurmukhi script, pronunciation, and cultural context.
                                </p>
                                <div className="flex flex-wrap justify-center gap-4 text-xs text-gray-600 mb-6">
                                    <div className="flex items-center gap-2">
                                        <BookOpen size={16} className="text-blue-600" />
                                        <span>Authentic</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Users size={16} className="text-blue-600" />
                                        <span>Family-focused</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <MessageSquare size={16} className="text-blue-600" />
                                        <span>Cultural</span>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setIsSidebarOpen(true)}
                                    className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all shadow-lg active:scale-95"
                                >
                                    <Lightbulb size={18} />
                                    View Sample Questions
                                </button>
                            </div>
                        ) : (
                            <div className="space-y-3 pb-2">
                                {messages.map((message) => (
                                    <div
                                        key={message.id}
                                        className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                                    >
                                        {message.type === 'user' ? (
                                            <div className="max-w-[85%] sm:max-w-[75%]">
                                                <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-3 sm:p-4 rounded-2xl rounded-br-none shadow-md">
                                                    <p className="text-sm leading-relaxed break-words">{message.text}</p>
                                                    <p className="text-[10px] text-blue-100 mt-2 text-right">{message.timestamp}</p>
                                                </div>
                                            </div>
                                        ) : message.type === 'error' ? (
                                            <div className="max-w-[85%] sm:max-w-[75%]">
                                                <div className="bg-red-50 border-l-4 border-red-500 p-3 rounded-lg">
                                                    <p className="text-sm text-red-800 break-words">{message.text}</p>
                                                    <p className="text-[10px] text-red-600 mt-2">{message.timestamp}</p>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="max-w-[85%] sm:max-w-[75%]">
                                                <div className="bg-gradient-to-br from-blue-50 to-orange-50 border border-blue-100 p-4 rounded-2xl rounded-bl-none shadow-md">
                                                    {/* Gurmukhi */}
                                                    <div className="mb-3">
                                                        <div className="flex items-center justify-between mb-2">
                                                            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wide">Gurmukhi</span>
                                                            <div className="flex gap-2">
                                                                <button
                                                                    onClick={() => speakPunjabi(message.gurmukhi)}
                                                                    className="text-blue-600 hover:text-blue-700 transition-colors p-1 active:scale-90"
                                                                    title="Listen"
                                                                >
                                                                    <Volume2 size={16} />
                                                                </button>
                                                                <button
                                                                    onClick={() => copyToClipboard(message.gurmukhi, `${message.id}-gurmukhi`)}
                                                                    className="text-blue-600 hover:text-blue-700 transition-colors p-1 active:scale-90"
                                                                    title="Copy"
                                                                >
                                                                    {copiedId === `${message.id}-gurmukhi` ? (
                                                                        <CheckCircle size={16} />
                                                                    ) : (
                                                                        <Copy size={16} />
                                                                    )}
                                                                </button>
                                                            </div>
                                                        </div>
                                                        <p className="text-2xl font-semibold text-gray-900 leading-relaxed break-words">
                                                            {message.gurmukhi}
                                                        </p>
                                                    </div>

                                                    {/* Romanised */}
                                                    <div className="mb-3 pb-3 border-b border-gray-200">
                                                        <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wide mb-2 block">Romanised</span>
                                                        <p className="text-base text-gray-700 italic break-words">{message.romanized}</p>
                                                    </div>

                                                    {/* English */}
                                                    <div className={message.context ? "mb-3 pb-3 border-b border-gray-200" : ""}>
                                                        <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wide mb-2 block">English</span>
                                                        <p className="text-sm text-gray-600 break-words">{message.english}</p>
                                                    </div>

                                                    {/* Context */}
                                                    {message.context && (
                                                        <div className="bg-white/60 rounded-lg p-3">
                                                            <p className="text-xs text-gray-700 leading-relaxed whitespace-pre-line break-words">{message.context}</p>
                                                        </div>
                                                    )}

                                                    <p className="text-[10px] text-gray-400 mt-2">{message.timestamp}</p>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ))}
                                {isLoading && (
                                    <div className="flex justify-start">
                                        <div className="bg-gradient-to-br from-blue-50 to-orange-50 border border-blue-100 p-3 rounded-2xl rounded-bl-none shadow-md">
                                            <div className="flex items-center gap-2">
                                                <Loader2 size={16} className="animate-spin text-blue-600" />
                                                <span className="text-sm text-gray-600">Preparing your lesson...</span>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                <div ref={messagesEndRef} />
                            </div>
                        )}
                    </div>

                    {/* Input Area - Fixed at Bottom */}
                    <div className="p-3 bg-gray-50 border-t border-gray-200 flex-shrink-0 safe-bottom">
                        <div className="flex gap-2 items-end">
                            <textarea
                                ref={inputRef}
                                value={inputMessage}
                                onChange={(e) => setInputMessage(e.target.value)}
                                onKeyPress={handleKeyPress}
                                placeholder="Ask me anything in English..."
                                disabled={isLoading}
                                rows="1"
                                className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-xl resize-none focus:outline-none focus:border-blue-500 transition-colors text-sm disabled:bg-gray-100 disabled:cursor-not-allowed"
                                style={{ maxHeight: '100px' }}
                                onInput={(e) => {
                                    e.target.style.height = 'auto';
                                    e.target.style.height = Math.min(e.target.scrollHeight, 100) + 'px';
                                }}
                            />
                            <button
                                onClick={sendMessage}
                                disabled={!inputMessage.trim() || isLoading}
                                className={`px-4 py-3 rounded-xl font-semibold transition-all text-sm flex items-center gap-2 flex-shrink-0 ${
                                    inputMessage.trim() && !isLoading
                                        ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 shadow-md active:scale-95'
                                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                }`}
                            >
                                {isLoading ? (
                                    <>
                                        <Loader2 size={18} className="animate-spin" />
                                        <span className="hidden sm:inline">Sending</span>
                                    </>
                                ) : (
                                    <>
                                        <Send size={18} />
                                        <span className="hidden sm:inline">Send</span>
                                    </>
                                )}
                            </button>
                        </div>
                        <p className="text-[10px] text-gray-500 mt-2 text-center">
                            Press Enter to send • Shift + Enter for new line
                        </p>
                    </div>
                </div>

                {/* Pro Tip */}
                <div className="mt-4 bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-4 border border-orange-200">
                    <div className="flex items-start gap-3">
                        <Lightbulb size={20} className="text-orange-600 flex-shrink-0 mt-0.5" />
                        <div>
                            <h3 className="font-bold text-gray-900 mb-1 text-sm">Pro Tip</h3>
                            <p className="text-sm text-gray-700">
                                Use the audio button on each response to hear authentic Punjabi pronunciation. Our AI tutor provides cultural context for every phrase.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Save Confirmation */}
                {supabase && userId && messages.length > 0 && (
                    <div className="mt-3 bg-green-50 border-l-4 border-green-500 p-3 rounded-r">
                        <div className="flex items-center gap-2">
                            <CheckCircle size={16} className="text-green-600" />
                            <p className="text-sm text-gray-800 font-medium">
                                Conversation history saved to your profile
                            </p>
                        </div>
                    </div>
                )}
            </div>

            <style jsx>{`
                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                .animate-spin {
                    animation: spin 1s linear infinite;
                }
                @keyframes pulse {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0.5; }
                }
                .animate-pulse {
                    animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
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
                
                .active\:scale-95:active {
                    transform: scale(0.95);
                }
                
                .active\:scale-98:active {
                    transform: scale(0.98);
                }
            `}</style>
        </div>
    );
}