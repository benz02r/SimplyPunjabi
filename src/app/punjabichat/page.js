"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { MessageCircle, Send, Loader2, Volume2, Copy, CheckCircle, Trash2, Menu, ArrowLeft, Lightbulb, X, TrendingUp } from "lucide-react";
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
    const [isLoadingAudio, setIsLoadingAudio] = useState({});
    const [isCheckingAuth, setIsCheckingAuth] = useState(true);
    const messagesEndRef = useRef(null);
    const inputRef = useRef(null);

    const sampleQuestions = [
        "How do I greet my grandmother?",
        "How do I say I'm hungry?",
        "Teach me family relationship words",
        "How do I ask 'How are you?'",
        "What's the difference between formal and informal speech?",
        "How do I thank someone respectfully?",
    ];

    useEffect(() => {
        const checkAuth = async () => {
            if (!supabase) {
                setIsCheckingAuth(false);
                return;
            }

            try {
                const { data: { user }, error } = await supabase.auth.getUser();

                if (error || !user) {
                    // User not logged in - redirect to login page
                    router.push('/auth');
                    return;
                }

                // User is authenticated
                setUserId(user.id);
                setIsCheckingAuth(false);
            } catch (error) {
                console.error('Auth check error:', error);
                router.push('/login');
            }
        };

        checkAuth();
    }, [router]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

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
            const response = await fetch('/api/chat-gemini', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    message: inputMessage,
                    conversationHistory: messages.slice(-10),
                    responseFormat: 'structured',
                    userLevel: 'beginner'
                })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to get response');
            }

            const structured = data.structured;

            const aiMessage = {
                role: 'assistant',
                content: data.response,
                gurmukhi: structured?.gurmukhi || '',
                romanized: structured?.romanized || '',
                english: structured?.english || '',
                context: structured?.cultural_note || '',
                grammar_tip: structured?.grammar_tip || '',
                follow_up: structured?.follow_up_suggestion || '',
                timestamp: new Date().toLocaleTimeString('en-GB', {
                    hour: '2-digit',
                    minute: '2-digit'
                })
            };

            setMessages(prev => [...prev, aiMessage]);

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
    };

    const handleSampleQuestion = (question) => {
        setInputMessage(question);
        setIsSidebarOpen(false);
        setTimeout(() => inputRef.current?.focus(), 100);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-blue-50 pt-24 sm:pt-28">
            {/* Loading screen while checking auth */}
            {isCheckingAuth ? (
                <div className="flex items-center justify-center min-h-screen">
                    <div className="text-center">
                        <Loader2 size={48} className="animate-spin text-blue-600 mx-auto mb-4" />
                        <p className="text-gray-600">Checking authentication...</p>
                    </div>
                </div>
            ) : (
                <>
                    {/* Fixed Header - Clean & Minimal */}
                    <div className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-10">
                        <div className="max-w-6xl mx-auto px-4 py-3">
                            <div className="flex items-center justify-between">
                                {/* Left side - Back button & Title */}
                                <div className="flex items-center gap-3">
                                    <button
                                        onClick={() => router.push('/dashboard')}
                                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors active:scale-95"
                                        aria-label="Back to dashboard"
                                    >
                                        <ArrowLeft size={20} className="text-gray-700" />
                                    </button>
                                    <div>
                                        <h1 className="text-base sm:text-lg font-bold text-gray-900">AI Punjabi Tutor</h1>
                                        <p className="text-xs text-gray-500 hidden sm:block">Powered by Gemini 2.5</p>
                                    </div>
                                </div>

                                {/* Right side - Action buttons */}
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => setIsSidebarOpen(true)}
                                        className="flex items-center gap-1.5 px-3 py-2 bg-blue-500 text-white text-xs sm:text-sm font-medium rounded-lg hover:bg-blue-600 transition-all active:scale-95"
                                    >
                                        <Lightbulb size={16} />
                                        <span className="hidden sm:inline">Examples</span>
                                    </button>
                                    {messages.length > 0 && (
                                        <button
                                            onClick={clearChat}
                                            className="flex items-center gap-1.5 px-3 py-2 bg-red-500 text-white text-xs sm:text-sm font-medium rounded-lg hover:bg-red-600 transition-all active:scale-95"
                                        >
                                            <Trash2 size={16} />
                                            <span className="hidden sm:inline">Clear</span>
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sample Questions Sidebar */}
                    {isSidebarOpen && (
                        <>
                            <div
                                className="fixed inset-0 bg-black/50 z-40"
                                onClick={() => setIsSidebarOpen(false)}
                            />
                            <div className="fixed top-0 right-0 h-full w-full sm:w-96 bg-white shadow-2xl z-50 flex flex-col">
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
                                <div className="p-4 border-t border-gray-200 bg-gray-50">
                                    <button
                                        onClick={() => setIsSidebarOpen(false)}
                                        className="w-full py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all active:scale-98"
                                    >
                                        Close
                                    </button>
                                </div>
                            </div>
                        </>
                    )}

                    {/* Main Content */}
                    <div className="pb-4 px-3 sm:px-6 max-w-6xl mx-auto">
                        {/* Chat Container */}
                        <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden flex flex-col"
                             style={{ height: 'calc(100vh - 280px)', minHeight: '400px' }}>

                            {/* Messages Area */}
                            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                                {messages.length === 0 ? (
                                    <div className="flex flex-col items-center justify-center h-full text-center px-4">
                                        <div className="bg-gradient-to-br from-blue-100 to-orange-100 rounded-full p-6 mb-4">
                                            <MessageCircle size={48} className="text-blue-600" />
                                        </div>
                                        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Welcome!</h2>
                                        <p className="text-gray-600 max-w-md mb-6 text-sm sm:text-base">
                                            Ask me anything in English and I'll help you learn Punjabi with cultural context
                                        </p>
                                        <button
                                            onClick={() => setIsSidebarOpen(true)}
                                            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all active:scale-95 text-sm sm:text-base"
                                        >
                                            <Lightbulb size={20} />
                                            View Example Questions
                                        </button>
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        {messages.map((message, index) => (
                                            <div key={index} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                                {message.role === 'user' ? (
                                                    <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-3 sm:p-4 rounded-2xl rounded-br-none shadow-md max-w-[85%]">
                                                        <p className="text-sm break-words">{message.content}</p>
                                                        <p className="text-[10px] text-blue-100 mt-2">{message.timestamp}</p>
                                                    </div>
                                                ) : (
                                                    <div className="bg-gradient-to-br from-blue-50 to-orange-50 border border-blue-100 p-3 sm:p-4 rounded-2xl rounded-bl-none shadow-md max-w-[85%]">
                                                        {message.gurmukhi && message.romanized && message.english ? (
                                                            <div>
                                                                {/* Gurmukhi */}
                                                                <div className="mb-3 pb-3 border-b border-gray-200">
                                                                    <div className="flex items-center justify-between mb-2">
                                                                        <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wide">Gurmukhi</span>
                                                                        <div className="flex gap-2">
                                                                            <button
                                                                                onClick={() => speakPunjabi(message.gurmukhi, index)}
                                                                                disabled={isLoadingAudio[index]}
                                                                                className="p-1.5 bg-blue-100 hover:bg-blue-200 rounded-lg transition-colors text-blue-600 active:scale-95"
                                                                                title="Listen"
                                                                            >
                                                                                {isLoadingAudio[index] ? (
                                                                                    <Loader2 size={14} className="animate-spin" />
                                                                                ) : (
                                                                                    <Volume2 size={14} />
                                                                                )}
                                                                            </button>
                                                                            <button
                                                                                onClick={() => copyToClipboard(message.gurmukhi, `g-${index}`)}
                                                                                className="p-1.5 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors active:scale-95"
                                                                                title="Copy"
                                                                            >
                                                                                {copiedId === `g-${index}` ? (
                                                                                    <CheckCircle size={14} className="text-green-600" />
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

                                                                {/* Romanised */}
                                                                <div className="mb-3 pb-3 border-b border-gray-200">
                                                                    <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wide mb-2 block">Romanised</span>
                                                                    <p className="text-sm sm:text-base text-gray-700 italic break-words">{message.romanized}</p>
                                                                </div>

                                                                {/* English */}
                                                                <div className={message.context ? "mb-3 pb-3 border-b border-gray-200" : ""}>
                                                                    <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wide mb-2 block">English</span>
                                                                    <p className="text-xs sm:text-sm text-gray-600 break-words">{message.english}</p>
                                                                </div>

                                                                {/* Cultural Note */}
                                                                {message.context && (
                                                                    <div className="bg-white/60 rounded-lg p-3 mb-3">
                                                                        <div className="text-[10px] font-bold text-orange-600 uppercase tracking-wide mb-1">Cultural Note</div>
                                                                        <p className="text-xs text-gray-700 leading-relaxed whitespace-pre-line break-words">{message.context}</p>
                                                                    </div>
                                                                )}

                                                                {/* Follow-up */}
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
                    </div>

                    <style jsx>{`
                .safe-bottom {
                    padding-bottom: max(0.75rem, env(safe-area-inset-bottom));
                }
                * {
                    -webkit-overflow-scrolling: touch;
                }
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
                </>
            )}
        </div>
    );
}