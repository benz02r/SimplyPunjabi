"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { MessageCircle, Send, Loader2, Volume2, Copy, CheckCircle, Trash2, Menu, ArrowLeft, Lightbulb, X } from "lucide-react";
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null;

// API Configuration - Update these with your actual API details
const API_ENDPOINT = process.env.NEXT_PUBLIC_LLM_API_ENDPOINT || 'YOUR_API_ENDPOINT_HERE';
const API_KEY = process.env.NEXT_PUBLIC_LLM_API_KEY || 'YOUR_API_KEY_HERE';

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

    // Get user on mount
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
        // Integration with Google Cloud TTS or browser TTS
        if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = 'pa-IN'; // Punjabi
            window.speechSynthesis.speak(utterance);
        }
    };

    const copyToClipboard = (text, messageId) => {
        navigator.clipboard.writeText(text);
        setCopiedId(messageId);
        setTimeout(() => setCopiedId(null), 2000);
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
        setInputMessage('');
        setIsLoading(true);

        try {
            // API call to your custom LLM
            const response = await fetch(API_ENDPOINT, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${API_KEY}`
                },
                body: JSON.stringify({
                    message: inputMessage,
                    language: 'punjabi',
                    format: 'gurmukhi'
                })
            });

            if (!response.ok) {
                throw new Error('API request failed');
            }

            const data = await response.json();

            const aiMessage = {
                id: Date.now() + 1,
                type: 'ai',
                gurmukhi: data.gurmukhi || 'ਜਵਾਬ ਉਪਲਬਧ ਨਹੀਂ ਹੈ',
                romanized: data.romanized || 'Javāb uplabadh nahīṁ hai',
                english: data.english || 'Response not available',
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            };

            setMessages(prev => [...prev, aiMessage]);

            // Save conversation to Supabase if user is logged in
            if (supabase && userId) {
                await supabase.from('chat_history').insert({
                    user_id: userId,
                    user_message: inputMessage,
                    ai_response_gurmukhi: aiMessage.gurmukhi,
                    ai_response_romanized: aiMessage.romanized,
                    ai_response_english: aiMessage.english,
                    created_at: new Date().toISOString()
                });
            }
        } catch (error) {
            console.error('Error calling API:', error);

            const errorMessage = {
                id: Date.now() + 1,
                type: 'error',
                text: 'Sorry, I couldn\'t process your request. Please try again.',
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
        "How do I say 'Good morning' in Punjabi?",
        "How do I introduce myself in Punjabi?",
        "What is 'thank you' in Punjabi?",
        "How do I ask 'How are you?' in Punjabi?",
        "Teach me Punjabi numbers from 1 to 10",
        "How do I say 'I love you' in Punjabi?",
        "What are common Punjabi family terms?",
        "How do I order food in Punjabi?"
    ];

    const handleSampleQuestion = (question) => {
        setInputMessage(question);
        inputRef.current?.focus();
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50 px-4 sm:px-6 lg:px-8 pt-28 pb-12">
            <div className="max-w-6xl mx-auto">
                {/* Back Button */}
                <button
                    onClick={() => router.push("/learning/essential-punjabi")}
                    className="mb-6 flex items-center gap-2 text-gray-600 hover:text-blue-600 font-semibold transition-colors text-sm"
                >
                    <ArrowLeft size={18} />
                    <span>Back to Lessons</span>
                </button>

                {/* Header */}
                <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-6 text-white shadow-lg mb-6">
                    <div className="flex items-center gap-2 mb-2">
                        <MessageCircle size={18} />
                        <span className="text-xs font-semibold uppercase tracking-wide">Punjabi Language Assistant</span>
                    </div>
                    <h1 className="text-3xl font-bold mb-2">
                        Chat with Simply Punjabi AI
                    </h1>
                    <p className="text-base text-blue-100">
                        Ask me anything in English and I'll respond in Punjabi with Gurmukhi script, romanisation, and translations
                    </p>
                </div>

                {/* Main Container */}
                <div className="flex gap-4">
                    {/* Sidebar with Sample Questions */}
                    {isSidebarOpen && (
                        <div className="w-80 flex-shrink-0">
                            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 sticky top-28">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-lg font-bold text-gray-900">
                                        Sample Questions
                                    </h3>
                                    <button
                                        onClick={() => setIsSidebarOpen(false)}
                                        className="text-gray-400 hover:text-gray-600 transition-colors"
                                    >
                                        <X size={20} />
                                    </button>
                                </div>
                                <div className="space-y-2">
                                    {sampleQuestions.map((question, index) => (
                                        <button
                                            key={index}
                                            onClick={() => handleSampleQuestion(question)}
                                            className="w-full text-left p-3 bg-gradient-to-r from-blue-50 to-orange-50 border border-blue-100 rounded-lg text-sm text-gray-700 hover:from-blue-100 hover:to-orange-100 hover:border-blue-200 transition-all"
                                        >
                                            {question}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Chat Container */}
                    <div className="flex-1">
                        <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden" style={{ height: '70vh', display: 'flex', flexDirection: 'column' }}>
                            {/* Chat Header */}
                            <div className="bg-gradient-to-r from-blue-50 to-orange-50 p-4 border-b border-gray-200">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                                        <span className="text-sm font-semibold text-gray-700">AI Assistant Online</span>
                                    </div>
                                    <div className="flex gap-2">
                                        {!isSidebarOpen && (
                                            <button
                                                onClick={() => setIsSidebarOpen(true)}
                                                className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-xs font-semibold rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all"
                                            >
                                                <Menu size={14} />
                                                Sample Questions
                                            </button>
                                        )}
                                        {messages.length > 0 && (
                                            <button
                                                onClick={clearChat}
                                                className="flex items-center gap-1.5 px-3 py-1.5 bg-red-500 text-white text-xs font-semibold rounded-lg hover:bg-red-600 transition-colors"
                                            >
                                                <Trash2 size={14} />
                                                Clear
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Messages Area */}
                            <div className="flex-1 overflow-y-auto p-6" style={{ scrollBehavior: 'smooth' }}>
                                {messages.length === 0 ? (
                                    <div className="h-full flex flex-col items-center justify-center text-center">
                                        <div className="bg-gradient-to-br from-blue-100 to-orange-100 p-6 rounded-full mb-4">
                                            <MessageCircle size={48} className="text-blue-600" />
                                        </div>
                                        <h2 className="text-2xl font-bold text-gray-900 mb-2">
                                            Welcome to Simply Punjabi AI
                                        </h2>
                                        <p className="text-gray-600 max-w-md">
                                            Ask me anything in English and I'll respond in Punjabi with Gurmukhi script, romanisation, and English translation!
                                        </p>
                                        {!isSidebarOpen && (
                                            <button
                                                onClick={() => setIsSidebarOpen(true)}
                                                className="mt-6 flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all text-sm"
                                            >
                                                <Lightbulb size={16} />
                                                View Sample Questions
                                            </button>
                                        )}
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        {messages.map((message) => (
                                            <div
                                                key={message.id}
                                                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                                            >
                                                {message.type === 'user' ? (
                                                    // User Message
                                                    <div className="max-w-[75%]">
                                                        <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-4 rounded-2xl rounded-br-none shadow-md">
                                                            <p className="text-sm leading-relaxed">
                                                                {message.text}
                                                            </p>
                                                            <p className="text-xs text-blue-100 mt-2 text-right">
                                                                {message.timestamp}
                                                            </p>
                                                        </div>
                                                    </div>
                                                ) : message.type === 'error' ? (
                                                    // Error Message
                                                    <div className="max-w-[75%]">
                                                        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg">
                                                            <p className="text-sm text-red-800">
                                                                {message.text}
                                                            </p>
                                                            <p className="text-xs text-red-600 mt-2">
                                                                {message.timestamp}
                                                            </p>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    // AI Response
                                                    <div className="max-w-[75%]">
                                                        <div className="bg-gradient-to-br from-blue-50 to-orange-50 border border-blue-100 p-5 rounded-2xl rounded-bl-none shadow-md">
                                                            {/* Gurmukhi Script */}
                                                            <div className="mb-4">
                                                                <div className="flex items-center justify-between mb-2">
                                                                    <span className="text-xs font-bold text-gray-500 uppercase tracking-wide">
                                                                        Gurmukhi
                                                                    </span>
                                                                    <div className="flex gap-2">
                                                                        <button
                                                                            onClick={() => speakPunjabi(message.gurmukhi)}
                                                                            className="text-blue-600 hover:text-blue-700 transition-colors"
                                                                            title="Listen"
                                                                        >
                                                                            <Volume2 size={16} />
                                                                        </button>
                                                                        <button
                                                                            onClick={() => copyToClipboard(message.gurmukhi, `${message.id}-gurmukhi`)}
                                                                            className="text-blue-600 hover:text-blue-700 transition-colors"
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
                                                                <p className="text-2xl font-semibold text-gray-900 leading-relaxed">
                                                                    {message.gurmukhi}
                                                                </p>
                                                            </div>

                                                            {/* Romanisation */}
                                                            <div className="mb-4 pb-4 border-b border-gray-200">
                                                                <span className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2 block">
                                                                    Romanised
                                                                </span>
                                                                <p className="text-base text-gray-700 italic">
                                                                    {message.romanized}
                                                                </p>
                                                            </div>

                                                            {/* English Translation */}
                                                            <div>
                                                                <span className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2 block">
                                                                    English
                                                                </span>
                                                                <p className="text-sm text-gray-600">
                                                                    {message.english}
                                                                </p>
                                                            </div>

                                                            <p className="text-xs text-gray-400 mt-3">
                                                                {message.timestamp}
                                                            </p>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                        {isLoading && (
                                            <div className="flex justify-start">
                                                <div className="bg-gradient-to-br from-blue-50 to-orange-50 border border-blue-100 p-4 rounded-2xl rounded-bl-none shadow-md">
                                                    <div className="flex items-center gap-2">
                                                        <Loader2 size={18} className="animate-spin text-blue-600" />
                                                        <span className="text-sm text-gray-600">Processing your question...</span>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                        <div ref={messagesEndRef} />
                                    </div>
                                )}
                            </div>

                            {/* Input Area */}
                            <div className="p-4 bg-gray-50 border-t border-gray-200">
                                <div className="flex gap-3 items-end">
                                    <textarea
                                        ref={inputRef}
                                        value={inputMessage}
                                        onChange={(e) => setInputMessage(e.target.value)}
                                        onKeyPress={handleKeyPress}
                                        placeholder="Ask me anything in English... (e.g., 'How do I say hello in Punjabi?')"
                                        disabled={isLoading}
                                        rows="2"
                                        className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-xl resize-none focus:outline-none focus:border-blue-500 transition-colors text-sm disabled:bg-gray-100 disabled:cursor-not-allowed"
                                        style={{ maxHeight: '120px' }}
                                    />
                                    <button
                                        onClick={sendMessage}
                                        disabled={!inputMessage.trim() || isLoading}
                                        className={`px-6 py-3 rounded-xl font-semibold transition-all text-sm flex items-center gap-2 ${
                                            inputMessage.trim() && !isLoading
                                                ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 shadow-md'
                                                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                        }`}
                                    >
                                        {isLoading ? (
                                            <>
                                                <Loader2 size={18} className="animate-spin" />
                                                Sending
                                            </>
                                        ) : (
                                            <>
                                                <Send size={18} />
                                                Send
                                            </>
                                        )}
                                    </button>
                                </div>
                                <p className="text-xs text-gray-500 mt-2 text-center">
                                    Press Enter to send • Shift + Enter for new line
                                </p>
                            </div>
                        </div>

                        {/* Tip Section */}
                        <div className="mt-6 bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-4 border border-orange-200">
                            <div className="flex items-start gap-3">
                                <Lightbulb size={20} className="text-orange-600 flex-shrink-0 mt-0.5" />
                                <div>
                                    <h3 className="font-bold text-gray-900 mb-1 text-sm">Pro Tip</h3>
                                    <p className="text-sm text-gray-700">
                                        Practice pronunciation using the audio button () on each response. The more you listen and repeat, the better your Punjabi will become!
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Progress Saved Indicator */}
                        {supabase && userId && messages.length > 0 && (
                            <div className="mt-4 bg-green-50 border-l-4 border-green-500 p-3 rounded-r">
                                <div className="flex items-center gap-2">
                                    <CheckCircle size={18} className="text-green-600" />
                                    <p className="text-sm text-gray-800 font-medium">
                                        Conversation history saved to your profile
                                    </p>
                                </div>
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
                @keyframes pulse {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0.5; }
                }
                .animate-pulse {
                    animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
                }
            `}</style>
        </div>
    );
}