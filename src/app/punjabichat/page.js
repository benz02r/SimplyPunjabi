"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { MessageCircle, Send, Loader2, Volume2, Copy, CheckCircle, Trash2, Menu, ArrowLeft, Lightbulb, X, BookOpen, Users, MessageSquare, TrendingUp, Award } from "lucide-react";
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null;

export default function PunjabiChat() {
    const router = useRouter();
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [copiedId, setCopiedId] = useState(null);
    const [userId, setUserId] = useState(null);
    const [sessionVocabulary, setSessionVocabulary] = useState([]);
    const [userLevel, setUserLevel] = useState('beginner');
    const [isLoadingAudio, setIsLoadingAudio] = useState({});
    const messagesEndRef = useRef(null);
    const inputRef = useRef(null);

    // Fetch user and their learning context on mount
    useEffect(() => {
        const getUser = async () => {
            if (supabase) {
                const { data: { user } } = await supabase.auth.getUser();
                if (user) {
                    setUserId(user.id);
                    await loadUserContext(user.id);
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

    // Load user's learning context from Supabase
    const loadUserContext = async (uid) => {
        try {
            const { data: progressData } = await supabase
                .from('user_progress')
                .select('completed_lessons, known_vocabulary, learning_level')
                .eq('user_id', uid)
                .single();

            if (progressData) {
                setUserLevel(progressData.learning_level || 'beginner');
            }
        } catch (error) {
            console.log('No existing progress data, starting fresh');
        }
    };

    // Build contextual prompt with user's learning history
    const buildContextualPrompt = async (uid, userMessage) => {
        if (!supabase) return userMessage;

        try {
            // Fetch user progress
            const { data: progressData } = await supabase
                .from('user_progress')
                .select('completed_lessons, known_vocabulary, learning_goals')
                .eq('user_id', uid)
                .single();

            // Fetch recent conversation topics
            const { data: recentChats } = await supabase
                .from('chat_history')
                .select('topic, key_vocabulary')
                .eq('user_id', uid)
                .order('created_at', { ascending: false })
                .limit(5);

            if (!progressData && !recentChats?.length) {
                return userMessage;
            }

            const contextualInfo = `
USER LEARNING CONTEXT:
${progressData?.completed_lessons?.length > 0 ? `- Completed Lessons: ${progressData.completed_lessons.slice(-5).join(', ')}` : '- Starting their Punjabi journey'}
${progressData?.known_vocabulary?.length > 0 ? `- Known Vocabulary: ${progressData.known_vocabulary.slice(-30).join(', ')}` : '- Building foundational vocabulary'}
${progressData?.learning_goals ? `- Learning Goals: ${progressData.learning_goals}` : '- Goal: Family conversations'}
${recentChats?.length > 0 ? `- Recent Topics: ${recentChats.map(c => c.topic).filter(Boolean).join(', ')}` : ''}

ADAPTATION INSTRUCTIONS:
- Build on vocabulary they already know - don't re-teach basics
- Reference their completed lessons when relevant
- Create continuity with recent conversation topics
- Adjust difficulty to match their progress
- Celebrate milestones they've reached

User Question: ${userMessage}`;

            return contextualInfo;
        } catch (error) {
            console.error('Error building context:', error);
            return userMessage;
        }
    };

    // Track new vocabulary learned in this session
    const trackVocabulary = async (uid, newVocab) => {
        if (!supabase || !newVocab?.length) return;

        try {
            const { data: existing } = await supabase
                .from('user_progress')
                .select('known_vocabulary')
                .eq('user_id', uid)
                .single();

            const currentVocab = existing?.known_vocabulary || [];
            const updatedVocab = [...new Set([...currentVocab, ...newVocab.map(v => v.romanized)])];

            await supabase
                .from('user_progress')
                .upsert({
                    user_id: uid,
                    known_vocabulary: updatedVocab,
                    updated_at: new Date().toISOString()
                });
        } catch (error) {
            console.error('Error tracking vocabulary:', error);
        }
    };

    // Save conversation to database with metadata
    const saveConversation = async (uid, userMsg, aiMsg) => {
        if (!supabase) return;

        try {
            await supabase.from('chat_history').insert({
                user_id: uid,
                user_message: userMsg,
                ai_response: aiMsg.content,
                gurmukhi: aiMsg.gurmukhi,
                romanized: aiMsg.romanized,
                english: aiMsg.english,
                vocabulary_taught: aiMsg.vocabulary_taught || [],
                difficulty_level: aiMsg.difficulty_level || userLevel,
                created_at: new Date().toISOString()
            });
        } catch (error) {
            console.error('Error saving conversation:', error);
        }
    };

    // Enhanced speak function using Google Cloud TTS
    const speakPunjabi = async (text, messageId) => {
        setIsLoadingAudio(prev => ({ ...prev, [messageId]: true }));

        try {
            const response = await fetch('/api/tts', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    text: text,
                    languageCode: 'pa-IN',
                    voiceName: 'pa-IN-Wavenet-A',
                    speakingRate: 0.85
                })
            });

            if (!response.ok) {
                throw new Error('TTS service unavailable');
            }

            const { audioContent } = await response.json();
            const audio = new Audio(`data:audio/mp3;base64,${audioContent}`);

            audio.onended = () => {
                setIsLoadingAudio(prev => ({ ...prev, [messageId]: false }));
            };

            await audio.play();
        } catch (error) {
            console.error('Audio error:', error);
            // Fallback to browser TTS
            if ('speechSynthesis' in window) {
                const utterance = new SpeechSynthesisUtterance(text);
                utterance.lang = 'pa-IN';
                utterance.rate = 0.8;
                speechSynthesis.speak(utterance);
            }
            setIsLoadingAudio(prev => ({ ...prev, [messageId]: false }));
        }
    };

    // Enhanced sendMessage with structured output
    const sendMessage = async () => {
        if (!inputMessage.trim()) return;

        const userMsg = {
            role: 'user',
            content: inputMessage,
            timestamp: new Date().toLocaleTimeString('en-GB', {
                hour: '2-digit',
                minute: '2-digit'
            })
        };

        setMessages(prev => [...prev, userMsg]);
        setInputMessage('');
        setIsLoading(true);

        try {
            const contextualPrompt = userId
                ? await buildContextualPrompt(userId, inputMessage)
                : inputMessage;

            const response = await fetch('/api/chat-gemini', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    message: contextualPrompt,
                    conversationHistory: messages.slice(-10),
                    responseFormat: 'structured',
                    userLevel: userLevel
                })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to get response');
            }

            // Parse structured response
            const structured = data.structured;

            const aiMessage = {
                role: 'assistant',
                content: data.response,
                gurmukhi: structured?.gurmukhi || '',
                romanized: structured?.romanized || '',
                english: structured?.english || '',
                context: structured?.cultural_note || '',
                grammar_tip: structured?.grammar_tip || '',
                difficulty_level: structured?.difficulty_level || userLevel,
                vocabulary_taught: structured?.new_vocabulary || [],
                follow_up: structured?.follow_up_suggestion || '',
                timestamp: new Date().toLocaleTimeString('en-GB', {
                    hour: '2-digit',
                    minute: '2-digit'
                })
            };

            setMessages(prev => [...prev, aiMessage]);

            // Track new vocabulary
            if (aiMessage.vocabulary_taught?.length > 0) {
                setSessionVocabulary(prev => {
                    const existing = new Set(prev.map(v => v.romanized));
                    const newWords = aiMessage.vocabulary_taught.filter(v => !existing.has(v.romanized));
                    return [...prev, ...newWords];
                });

                if (userId) {
                    await trackVocabulary(userId, aiMessage.vocabulary_taught);
                }
            }

            // Save conversation
            if (userId) {
                await saveConversation(userId, inputMessage, aiMessage);
            }

        } catch (error) {
            console.error('Error sending message:', error);
            const errorMsg = {
                role: 'assistant',
                content: 'Sorry, I encountered an error. Please try again.',
                timestamp: new Date().toLocaleTimeString('en-GB', {
                    hour: '2-digit',
                    minute: '2-digit'
                })
            };
            setMessages(prev => [...prev, errorMsg]);
        }

        setIsLoading(false);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    const copyToClipboard = (text, id) => {
        navigator.clipboard.writeText(text);
        setCopiedId(id);
        setTimeout(() => setCopiedId(null), 2000);
    };

    const clearChat = () => {
        setMessages([]);
        setSessionVocabulary([]);
    };

    const startNewConversation = () => {
        clearChat();
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-blue-50">
            {/* Header */}
            <div className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
                <div className="max-w-4xl mx-auto px-4 py-3">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => router.push('/dashboard')}
                                className="p-2 hover:bg-gray-100 rounded-lg transition-colors active:scale-95"
                            >
                                <ArrowLeft size={20} className="text-gray-700" />
                            </button>
                            <div>
                                <h1 className="text-lg font-bold text-gray-900">AI Punjabi Tutor</h1>
                                <p className="text-xs text-gray-600">Powered by Gemini 2.0</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                                className="p-2 hover:bg-gray-100 rounded-lg transition-colors lg:hidden active:scale-95"
                            >
                                <Menu size={20} className="text-gray-700" />
                            </button>
                            {messages.length > 0 && (
                                <button
                                    onClick={clearChat}
                                    className="hidden sm:flex items-center gap-2 px-3 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors text-sm font-medium active:scale-95"
                                >
                                    <Trash2 size={16} />
                                    <span className="hidden md:inline">Clear</span>
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Sidebar Overlay */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <div className={`fixed top-0 right-0 h-full w-80 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out lg:hidden ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                    <h2 className="font-bold text-gray-900">Learning Stats</h2>
                    <button
                        onClick={() => setIsSidebarOpen(false)}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                        <X size={20} />
                    </button>
                </div>
                <div className="p-4 space-y-4 overflow-y-auto h-[calc(100%-73px)]">
                    <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 border border-blue-200">
                        <div className="flex items-center gap-2 mb-2">
                            <Award size={18} className="text-blue-600" />
                            <h3 className="font-bold text-sm text-gray-900">Current Level</h3>
                        </div>
                        <p className="text-2xl font-bold text-blue-600 capitalize">{userLevel}</p>
                    </div>

                    {sessionVocabulary.length > 0 && (
                        <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-4 border border-orange-200">
                            <div className="flex items-center gap-2 mb-3">
                                <BookOpen size={18} className="text-orange-600" />
                                <h3 className="font-bold text-sm text-gray-900">Session Vocabulary</h3>
                            </div>
                            <div className="space-y-2 max-h-64 overflow-y-auto">
                                {sessionVocabulary.map((word, idx) => (
                                    <div key={idx} className="bg-white/60 rounded-lg p-2 text-xs">
                                        <div className="font-semibold text-gray-900">{word.romanized}</div>
                                        <div className="text-gray-600">{word.english}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4 border border-green-200">
                        <div className="flex items-center gap-2 mb-2">
                            <MessageSquare size={18} className="text-green-600" />
                            <h3 className="font-bold text-sm text-gray-900">Messages Today</h3>
                        </div>
                        <p className="text-2xl font-bold text-green-600">{messages.filter(m => m.role === 'user').length}</p>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-4xl mx-auto px-4 py-6">
                {/* Chat Container */}
                <div className="bg-white rounded-2xl shadow-xl border border-gray-200 mb-4 flex flex-col" style={{ height: 'calc(100vh - 200px)' }}>
                    {/* Messages Area */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4">
                        {messages.length === 0 ? (
                            <div className="flex flex-col items-center justify-center h-full text-center px-4">
                                <div className="bg-gradient-to-br from-blue-100 to-orange-100 rounded-full p-6 mb-4">
                                    <MessageCircle size={48} className="text-blue-600" />
                                </div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome to Your AI Punjabi Tutor!</h2>
                                <p className="text-gray-600 max-w-md mb-6">
                                    I'm here to help you reconnect with your heritage through family conversations. Ask me anything in English!
                                </p>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full max-w-2xl">
                                    <button
                                        onClick={() => setInputMessage("How do I greet my grandmother?")}
                                        className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl border-2 border-blue-200 hover:border-blue-300 transition-all text-left active:scale-98"
                                    >
                                        <div className="font-semibold text-gray-900 mb-1">Family Greetings</div>
                                        <div className="text-sm text-gray-600">"How do I greet my grandmother?"</div>
                                    </button>
                                    <button
                                        onClick={() => setInputMessage("How do I say I'm hungry?")}
                                        className="p-4 bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl border-2 border-orange-200 hover:border-orange-300 transition-all text-left active:scale-98"
                                    >
                                        <div className="font-semibold text-gray-900 mb-1">Daily Phrases</div>
                                        <div className="text-sm text-gray-600">"How do I say I'm hungry?"</div>
                                    </button>
                                    <button
                                        onClick={() => setInputMessage("Teach me family relationship words")}
                                        className="p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-xl border-2 border-green-200 hover:border-green-300 transition-all text-left active:scale-98"
                                    >
                                        <div className="font-semibold text-gray-900 mb-1">Family Terms</div>
                                        <div className="text-sm text-gray-600">"Teach me family relationship words"</div>
                                    </button>
                                    <button
                                        onClick={() => setInputMessage("Explain formality in Punjabi")}
                                        className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl border-2 border-purple-200 hover:border-purple-300 transition-all text-left active:scale-98"
                                    >
                                        <div className="font-semibold text-gray-900 mb-1">Cultural Tips</div>
                                        <div className="text-sm text-gray-600">"Explain formality in Punjabi"</div>
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {messages.map((message, index) => (
                                    <div key={index} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                        {message.role === 'user' ? (
                                            <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-4 rounded-2xl rounded-br-none shadow-md max-w-[85%]">
                                                <p className="text-sm break-words">{message.content}</p>
                                                <p className="text-[10px] text-blue-100 mt-2">{message.timestamp}</p>
                                            </div>
                                        ) : (
                                            <div className="bg-gradient-to-br from-blue-50 to-orange-50 border border-blue-100 p-4 rounded-2xl rounded-bl-none shadow-md max-w-[85%]">
                                                {message.gurmukhi && message.romanized && message.english ? (
                                                    <div>
                                                        {/* Gurmukhi with Audio */}
                                                        <div className="mb-3 pb-3 border-b border-gray-200">
                                                            <div className="flex items-center justify-between mb-2">
                                                                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wide">Gurmukhi</span>
                                                                <div className="flex gap-2">
                                                                    <button
                                                                        onClick={() => speakPunjabi(message.gurmukhi, index)}
                                                                        disabled={isLoadingAudio[index]}
                                                                        className="p-1.5 bg-blue-100 hover:bg-blue-200 rounded-lg transition-colors text-blue-600 active:scale-95"
                                                                        title="Listen to pronunciation"
                                                                    >
                                                                        {isLoadingAudio[index] ? (
                                                                            <Loader2 size={16} className="animate-spin" />
                                                                        ) : (
                                                                            <Volume2 size={16} />
                                                                        )}
                                                                    </button>
                                                                    <button
                                                                        onClick={() => copyToClipboard(message.gurmukhi, `gurmukhi-${index}`)}
                                                                        className="p-1.5 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors active:scale-95"
                                                                        title="Copy Gurmukhi"
                                                                    >
                                                                        {copiedId === `gurmukhi-${index}` ? (
                                                                            <CheckCircle size={16} className="text-green-600" />
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
                                                        <div className={message.context || message.grammar_tip ? "mb-3 pb-3 border-b border-gray-200" : ""}>
                                                            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wide mb-2 block">English</span>
                                                            <p className="text-sm text-gray-600 break-words">{message.english}</p>
                                                        </div>

                                                        {/* Cultural Note */}
                                                        {message.context && (
                                                            <div className={message.grammar_tip ? "mb-3 pb-3 border-b border-gray-200" : "mb-3"}>
                                                                <div className="bg-white/60 rounded-lg p-3">
                                                                    <div className="text-[10px] font-bold text-orange-600 uppercase tracking-wide mb-1">Cultural Note</div>
                                                                    <p className="text-xs text-gray-700 leading-relaxed whitespace-pre-line break-words">{message.context}</p>
                                                                </div>
                                                            </div>
                                                        )}

                                                        {/* Grammar Tip */}
                                                        {message.grammar_tip && (
                                                            <div className="mb-3">
                                                                <div className="bg-blue-50 rounded-lg p-3">
                                                                    <div className="text-[10px] font-bold text-blue-600 uppercase tracking-wide mb-1">Grammar Tip</div>
                                                                    <p className="text-xs text-gray-700 leading-relaxed whitespace-pre-line break-words">{message.grammar_tip}</p>
                                                                </div>
                                                            </div>
                                                        )}

                                                        {/* Follow-up Suggestion */}
                                                        {message.follow_up && (
                                                            <div className="mt-3 pt-3 border-t border-gray-200">
                                                                <button
                                                                    onClick={() => setInputMessage(message.follow_up)}
                                                                    className="text-xs text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
                                                                >
                                                                    <TrendingUp size={12} />
                                                                    {message.follow_up}
                                                                </button>
                                                            </div>
                                                        )}
                                                    </div>
                                                ) : (
                                                    <p className="text-sm text-gray-700 break-words whitespace-pre-line">{message.content}</p>
                                                )}
                                                <p className="text-[10px] text-gray-400 mt-2">{message.timestamp}</p>
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

                {/* Session Vocabulary Panel (Desktop Only) */}
                {sessionVocabulary.length > 0 && (
                    <div className="hidden lg:block bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-4 border border-orange-200 mb-4">
                        <div className="flex items-center gap-2 mb-3">
                            <BookOpen size={18} className="text-orange-600" />
                            <h3 className="font-bold text-sm text-gray-900">New Words This Session</h3>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                            {sessionVocabulary.map((word, idx) => (
                                <div key={idx} className="bg-white/60 rounded-lg p-2 text-xs">
                                    <div className="font-semibold text-gray-900">{word.romanized}</div>
                                    <div className="text-gray-600">{word.english}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Pro Tip */}
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 border border-blue-200">
                    <div className="flex items-start gap-3">
                        <Lightbulb size={20} className="text-blue-600 flex-shrink-0 mt-0.5" />
                        <div>
                            <h3 className="font-bold text-gray-900 mb-1 text-sm">Enhanced AI Tutor</h3>
                            <p className="text-sm text-gray-700">
                                I remember your progress and adapt lessons to your level. Each response includes authentic audio pronunciation using Google Cloud TTS.
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
                                Progress automatically saved • Building your vocabulary
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