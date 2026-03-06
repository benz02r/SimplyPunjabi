"use client";

import Head from 'next/head';
import { useState, useEffect } from 'react';
import { FaComments, FaMicrophone, FaAward, FaBullseye, FaCheckCircle, FaGlobe, FaUsers, FaRocket, FaHeart, FaStar, FaPlay, FaClock, FaMobile, FaHeadphones, FaBook, FaLanguage, FaGraduationCap, FaRobot, FaBookOpen, FaLock, FaStar as FaStarSolid, FaArrowRight } from 'react-icons/fa';

// ─── Chat Spotlight Component ────────────────────────────────────────────────
function ChatSpotlight() {
    const [messages, setMessages] = useState([
        {
            role: 'assistant',
            text: 'ਸਤ ਸ੍ਰੀ ਅਕਾਲ! (Sat Sri Akal!) I\'m your Punjabi tutor. Ask me anything — greetings, family words, or how to say something to your relatives. What would you like to learn today?',
            structured: null
        }
    ]);
    const [input, setInput] = useState('');
    const [usesLeft, setUsesLeft] = useState(null);
    const [loading, setLoading] = useState(false);
    const [isTyping, setIsTyping] = useState(false);

    const MAX_FREE_USES = 3;
    const STORAGE_KEY = 'sp_chat_uses';

    useEffect(() => {
        try {
            const stored = parseInt(localStorage.getItem(STORAGE_KEY) || '0', 10);
            setUsesLeft(Math.max(0, MAX_FREE_USES - stored));
        } catch {
            setUsesLeft(MAX_FREE_USES);
        }
    }, []);

    const incrementUses = () => {
        try {
            const stored = parseInt(localStorage.getItem(STORAGE_KEY) || '0', 10);
            const next = stored + 1;
            localStorage.setItem(STORAGE_KEY, String(next));
            setUsesLeft(Math.max(0, MAX_FREE_USES - next));
        } catch { /* ignore */ }
    };

    const handleSend = async () => {
        const trimmed = input.trim();
        if (!trimmed || loading) return;

        if (usesLeft <= 0) return;

        // Build conversation history in the format the route expects
        const conversationHistory = messages.map(m => ({
            role: m.role,
            content: m.text
        }));

        const userMsg = { role: 'user', text: trimmed, structured: null };
        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setIsTyping(true);
        setLoading(true);
        incrementUses();

        try {
            const response = await fetch('/api/chat-gemini', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    message: trimmed,
                    conversationHistory,
                    responseFormat: 'structured',
                    userLevel: 'beginner'
                })
            });

            const data = await response.json();
            const structured = data.structured;

            // Build a readable fallback text from structured data
            let replyText = data.response || '';
            if (structured?.romanized && structured?.english) {
                replyText = structured.romanized + ' — ' + structured.english;
            }

            setMessages(prev => [...prev, {
                role: 'assistant',
                text: replyText,
                structured
            }]);
        } catch {
            setMessages(prev => [...prev, {
                role: 'assistant',
                text: 'Something went wrong — please try again in a moment.',
                structured: null
            }]);
        } finally {
            setIsTyping(false);
            setLoading(false);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <section className="py-24 px-6 bg-gradient-to-b from-white to-blue-50/40 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-100/30 to-orange-100/20 rounded-full blur-3xl -z-10"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-orange-100/20 to-blue-100/20 rounded-full blur-3xl -z-10"></div>

            <div className="max-w-6xl mx-auto">
                {/* Section header */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-orange-500 text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-6 shadow-lg">
                        <FaRobot className="text-xs" />
                        AI Punjabi Tutor
                    </div>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                        Chat with Your Personal<br />
                        <span className="bg-gradient-to-r from-blue-600 to-orange-500 bg-clip-text text-transparent">Punjabi Tutor</span>
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Ask anything in English! family phrases, pronunciations, cultural context. Get instant answers rooted in real Punjabi.
                    </p>
                </div>

                {/* Two-column layout: features + chat demo */}
                <div className="grid lg:grid-cols-2 gap-12 items-start">

                    {/* Left: Feature bullets */}
                    <div className="space-y-6 lg:pt-4">
                        {[
                            {
                                icon: <FaGlobe className="text-blue-600 text-xl" />,
                                title: "Culturally grounded answers",
                                desc: "Trained on diaspora scenarios; family gatherings, respect registers, and everyday conversations."
                            },
                            {
                                icon: <FaBookOpen className="text-orange-500 text-xl" />,
                                title: "English + Gurmukhi + Roman script",
                                desc: "Every response includes pronunciation guides so you can speak with confidence."
                            },
                            {
                                icon: <FaHeart className="text-red-500 text-xl" />,
                                title: "Built for heritage learners",
                                desc: "Not Duolingo. Not a textbook. Real phrases for real family moments."
                            },
                            {
                                icon: <FaGraduationCap className="text-green-600 text-xl" />,
                                title: "Curriculum-guided AI",
                                desc: "Responses are grounded in our lesson content not random internet data."
                            }
                        ].map((f, i) => (
                            <div key={i} className="flex items-start gap-4 bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                                <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                                    {f.icon}
                                </div>
                                <div>
                                    <p className="font-bold text-gray-900 mb-1">{f.title}</p>
                                    <p className="text-sm text-gray-600 leading-relaxed">{f.desc}</p>
                                </div>
                            </div>
                        ))}

                        <div className="mt-2">
                            <a href="/key-functions/signup">
                                <button className="group flex items-center gap-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-2xl font-bold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                                    <FaRocket className="text-sm" />
                                    Get Unlimited Access Free
                                    <FaArrowRight className="text-xs group-hover:translate-x-1 transition-transform" />
                                </button>
                            </a>
                        </div>
                    </div>

                    {/* Right: Live chat demo */}
                    <div className="relative">
                        {/* Usage indicator */}
                        {usesLeft !== null && (
                            <div className="mb-3 flex items-center justify-between">
                                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Try it now — no sign-up needed</p>
                                <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${usesLeft > 1 ? 'bg-green-100 text-green-700' : usesLeft === 1 ? 'bg-orange-100 text-orange-700' : 'bg-red-100 text-red-700'}`}>
                                    {usesLeft > 0 ? (
                                        <>
                                            <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                                            {usesLeft} free {usesLeft === 1 ? 'message' : 'messages'} left
                                        </>
                                    ) : (
                                        <>
                                            <FaLock className="text-xs" />
                                            Free limit reached
                                        </>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Chat window */}
                        <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
                            {/* Chat header */}
                            <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4 flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                                    <FaRobot className="text-white text-lg" />
                                </div>
                                <div>
                                    <p className="text-white font-bold text-sm">Simply Punjabi Tutor</p>
                                    <div className="flex items-center gap-1.5">
                                        <span className="w-1.5 h-1.5 rounded-full bg-green-400"></span>
                                        <p className="text-blue-200 text-xs">Online</p>
                                    </div>
                                </div>
                                {/* Free uses dots */}
                                {usesLeft !== null && (
                                    <div className="ml-auto flex items-center gap-1">
                                        {[...Array(MAX_FREE_USES)].map((_, i) => (
                                            <div
                                                key={i}
                                                className={`w-2 h-2 rounded-full transition-colors ${i < usesLeft ? 'bg-green-400' : 'bg-white/20'}`}
                                            />
                                        ))}
                                        <span className="text-xs text-blue-200 ml-1">free</span>
                                    </div>
                                )}
                            </div>

                            {/* Messages */}
                            <div className="h-72 overflow-y-auto p-5 space-y-4 bg-gray-50/50">
                                {messages.map((msg, i) => (
                                    <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                        {msg.role === 'assistant' && (
                                            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                                                <FaRobot className="text-white text-xs" />
                                            </div>
                                        )}
                                        <div className={`max-w-[78%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                                            msg.role === 'user'
                                                ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-tr-sm'
                                                : 'bg-white text-gray-800 shadow-sm border border-gray-100 rounded-tl-sm'
                                        }`}>
                                            {msg.role === 'assistant' && msg.structured?.gurmukhi ? (
                                                <div>
                                                    {/* Gurmukhi */}
                                                    <p className="text-lg font-bold text-gray-900 mb-1">{msg.structured.gurmukhi}</p>
                                                    {/* Romanised */}
                                                    <p className="text-sm italic text-gray-600 mb-1">{msg.structured.romanized}</p>
                                                    {/* English */}
                                                    <p className="text-xs text-gray-500 mb-2">{msg.structured.english}</p>
                                                    {/* Cultural note */}
                                                    {msg.structured.cultural_note && (
                                                        <div className="mt-2 pt-2 border-t border-gray-100">
                                                            <p className="text-[10px] font-bold text-orange-500 uppercase tracking-wide mb-0.5">Cultural Note</p>
                                                            <p className="text-xs text-gray-600 leading-relaxed">{msg.structured.cultural_note}</p>
                                                        </div>
                                                    )}
                                                    {/* Vocabulary pills */}
                                                    {msg.structured.new_vocabulary?.length > 0 && (
                                                        <div className="mt-2 pt-2 border-t border-gray-100">
                                                            <p className="text-[10px] font-bold text-green-600 uppercase tracking-wide mb-1">New Words</p>
                                                            <div className="flex flex-wrap gap-1">
                                                                {msg.structured.new_vocabulary.slice(0, 3).map((w, wi) => (
                                                                    <span key={wi} className="text-[10px] bg-green-50 border border-green-100 rounded px-1.5 py-0.5 text-gray-700">
                                                                        {w.romanized} · {w.english}
                                                                    </span>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    )}
                                                    {/* Follow-up suggestion */}
                                                    {msg.structured.follow_up_suggestion && (
                                                        <button
                                                            onClick={() => setInput(msg.structured.follow_up_suggestion)}
                                                            className="mt-2 text-[10px] text-blue-500 hover:text-blue-700 flex items-center gap-1 font-medium"
                                                        >
                                                            <FaArrowRight className="text-[8px]" />
                                                            {msg.structured.follow_up_suggestion}
                                                        </button>
                                                    )}
                                                </div>
                                            ) : (
                                                msg.text
                                            )}
                                        </div>
                                    </div>
                                ))}
                                {isTyping && (
                                    <div className="flex justify-start">
                                        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                                            <FaRobot className="text-white text-xs" />
                                        </div>
                                        <div className="bg-white rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm border border-gray-100">
                                            <div className="flex gap-1 items-center h-4">
                                                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                                                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                                                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Input area */}
                            <div className="p-4 bg-white border-t border-gray-100">
                                {usesLeft === 0 ? (
                                    /* Paywall input state */
                                    <div className="flex flex-col items-center gap-3 py-2">
                                        <p className="text-sm text-gray-600 font-medium text-center">
                                            You've used your 3 free messages — sign up to continue for free.
                                        </p>
                                        <a href="/key-functions/signup" className="w-full">
                                            <button className="w-full bg-gradient-to-r from-blue-600 to-orange-500 text-white py-3 rounded-xl font-bold text-sm shadow-md hover:shadow-lg transition-all hover:scale-[1.02]">
                                                Create Free Account — Unlimited Chat
                                            </button>
                                        </a>
                                    </div>
                                ) : (
                                    <div className="flex gap-2">
                                        <input
                                            type="text"
                                            value={input}
                                            onChange={e => setInput(e.target.value)}
                                            onKeyDown={handleKeyDown}
                                            placeholder="Ask e.g. 'How do I greet my nani?'"
                                            disabled={loading}
                                            className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-60 transition"
                                        />
                                        <button
                                            onClick={handleSend}
                                            disabled={loading || !input.trim()}
                                            className="bg-gradient-to-r from-blue-600 to-blue-700 text-white w-11 h-11 rounded-xl flex items-center justify-center shadow-md hover:shadow-lg transition-all hover:scale-105 disabled:opacity-50 disabled:hover:scale-100 flex-shrink-0"
                                        >
                                            {loading ? (
                                                <svg className="animate-spin w-4 h-4 text-white" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                                                </svg>
                                            ) : (
                                                <FaArrowRight className="text-sm" />
                                            )}
                                        </button>
                                    </div>
                                )}
                                {usesLeft !== null && usesLeft > 0 && (
                                    <p className="text-xs text-gray-400 text-center mt-2">
                                        {usesLeft} of {MAX_FREE_USES} free messages remaining · <a href="/key-functions/signup" className="text-blue-500 hover:underline">Sign up for unlimited</a>
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Floating "popular question" chips */}
                        {usesLeft !== null && usesLeft > 0 && messages.length <= 1 && (
                            <div className="mt-4">
                                <p className="text-xs text-gray-400 mb-2 font-medium">Try asking:</p>
                                <div className="flex flex-wrap gap-2">
                                    {[
                                        "How do I say 'I love you' to my mum?",
                                        "Teach me how to greet elders",
                                        "What does 'vadhāī hovey' mean?"
                                    ].map((q, i) => (
                                        <button
                                            key={i}
                                            onClick={() => setInput(q)}
                                            className="text-xs bg-white border border-gray-200 text-gray-600 px-3 py-1.5 rounded-full hover:border-blue-400 hover:text-blue-600 transition-colors shadow-sm"
                                        >
                                            {q}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function Home() {
    const punjabiDays = [
        { en: "Sunday", pa: "ਐਤਵਾਰ", pron: "Aitvaar" },
        { en: "Monday", pa: "ਸੋਮਵਾਰ", pron: "Somvaar" },
        { en: "Tuesday", pa: "ਮੰਗਲਵਾਰ", pron: "Mangalvaar" },
        { en: "Wednesday", pa: "ਬੁੱਧਵਾਰ", pron: "Budhvaar" },
        { en: "Thursday", pa: "ਵੀਰਵਾਰ", pron: "Veervaar" },
        { en: "Friday", pa: "ਸ਼ੁੱਕਰਵਾਰ", pron: "Shukravaar" },
        { en: "Saturday", pa: "ਸ਼ਨਿੱਚਰਵਾਰ", pron: "Shanicharvaar" },
    ];

    const today = new Date();
    const currentDayIndex = today.getDay();
    const currentDay = punjabiDays[currentDayIndex];

    return (
        <>
            <Head>
                <title>Learn Punjabi Online Free | How to Learn Punjabi from English - Simply Punjabi</title>
                <meta name="description" content="Learn Punjabi online free with Simply Punjabi. Best way to learn Punjabi from English for beginners. Interactive lessons, AI tutor, and dictionary help you speak Punjabi with your family in weeks, not years." />
                <meta name="keywords" content="learn punjabi, learn punjabi online, how to learn punjabi, learn punjabi from english, learn punjabi free, punjabi language learning, punjabi for beginners, learn to speak punjabi, punjabi lessons online, punjabi course, gurmukhi script, punjabi dictionary, punjabi language app, punjabi for diaspora" />
                <meta property="og:title" content="Learn Punjabi Online Free | Simply Punjabi" />
                <meta property="og:description" content="The easiest way to learn Punjabi from English. AI-powered lessons, interactive exercises, and instant translations help you speak Punjabi with your family." />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://simplypunjabi.com" />
                <meta property="og:image" content="https://simplypunjabi.com/og-image.png" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Learn Punjabi Online Free | Simply Punjabi" />
                <meta name="twitter:description" content="The easiest way to learn Punjabi from English. Start speaking Punjabi with your family today." />
                <script type="application/ld+json">
                    {JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "EducationalOrganization",
                        "name": "Simply Punjabi",
                        "description": "Learn Punjabi online free - Interactive lessons and AI tutor for English speakers",
                        "url": "https://simplypunjabi.com",
                        "logo": "https://simplypunjabi.com/logo.png",
                        "sameAs": ["https://www.instagram.com/learnsimplypunjabi"],
                        "courseMode": "online",
                        "teaches": "Punjabi Language",
                        "availableLanguage": ["English", "Punjabi"],
                        "offers": {
                            "@type": "Offer",
                            "category": "Language Learning",
                            "price": "0",
                            "priceCurrency": "GBP"
                        }
                    })}
                </script>
                <link rel="canonical" href="https://simplypunjabi.com" />
            </Head>

            <div className="min-h-screen bg-white">

                {/* ── Hero ──────────────────────────────────────────────── */}
                <section className="relative px-6 pt-32 pb-32 sm:pt-40 sm:pb-40 overflow-hidden bg-gradient-to-br from-blue-50 via-orange-50/30 to-white">
                    <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-blue-100/40 to-orange-100/40 rounded-full blur-3xl -z-10"></div>
                    <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-orange-100/30 to-blue-100/30 rounded-full blur-3xl -z-10"></div>

                    <div className="max-w-6xl mx-auto">
                        <div className="flex justify-center mb-6">
                            <img
                                src="/Website Banner(shadowing)- Simply Punjabi, Ryan.png"
                                alt="Simply Punjabi - Learn Punjabi Online"
                                className="w-full max-w-[520px] drop-shadow-xl"
                            />
                        </div>

                        <div className="text-center max-w-4xl mx-auto mb-8">
                            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                                Learn Punjabi Online Free from English
                            </h1>
                            <p className="text-lg sm:text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto">
                                The easiest way to learn Punjabi. Start speaking with your family in weeks with interactive lessons, AI tutor, and instant translations.
                            </p>
                        </div>

                        <div className="flex flex-col items-center gap-4 mb-12">
                            <a href="/key-functions/signup" className="w-full sm:w-auto">
                                <button className="w-full sm:w-auto group relative bg-gradient-to-r from-blue-600 to-blue-700 text-white px-12 py-5 rounded-2xl text-lg font-bold shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
                                    <span className="flex items-center justify-center gap-3">
                                        <FaRocket className="text-sm" />
                                        Get Started Free
                                    </span>
                                </button>
                            </a>
                            <p className="text-sm text-gray-500 flex items-center gap-2">
                                <FaClock className="text-blue-500" />
                                Start learning in under 2 minutes
                            </p>
                        </div>

                        <div className="flex flex-wrap items-center justify-center gap-8 text-sm text-gray-600">
                            <div className="flex items-center gap-2">
                                <FaUsers className="text-blue-600" />
                                <span className="font-medium">Trusted by western learners worldwide</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <FaGlobe className="text-orange-600" />
                                <span className="font-medium">Active in UK, US, Canada & Australia</span>
                            </div>
                        </div>

                        {/* Word of the Day */}
                        <div className="mt-16 flex justify-center">
                            <div className="bg-white rounded-3xl shadow-lg border border-gray-100 px-10 py-8 hover:shadow-xl transition-all duration-300 max-w-md">
                                <p className="text-xs uppercase tracking-widest text-gray-400 mb-3 text-center font-bold">Today's Word</p>
                                <p className="text-5xl font-bold text-center mb-2 bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
                                    {currentDay.pa}
                                </p>
                                <p className="text-center text-lg">
                                    <span className="font-semibold text-gray-900">{currentDay.pron}</span>
                                    <span className="text-gray-300 mx-3">•</span>
                                    <span className="text-gray-600">{currentDay.en}</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ── AI Chat Spotlight ─────────────────────────────────── */}
                <ChatSpotlight />

                {/* ── Course Paths ──────────────────────────────────────── */}
                <section className="py-24 px-6 bg-gradient-to-b from-gray-50 to-white">
                    <div className="max-w-6xl mx-auto">
                        <div className="text-center mb-20">
                            <p className="text-blue-600 font-bold uppercase tracking-wider text-sm mb-4">How to Learn Punjabi</p>
                            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                                Start Learning Punjabi from English
                            </h2>
                            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                                Structured Punjabi courses designed for English speakers. Go from complete beginner to confident speaker.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8">
                            <CourseCard
                                level="Beginner"
                                title="Essential Punjabi"
                                description="Perfect for complete beginners. Learn greetings, introductions, and basic family vocabulary."
                                lessons="5 lessons"
                                link="/learning/essential-punjabi"
                                gradient="from-blue-500 to-blue-600"
                                icon={<FaComments className="text-5xl text-blue-600" />}
                            />
                            <CourseCard
                                level="Intermediate"
                                title="Speak with Confidence"
                                description="Build vocabulary and express yourself in everyday conversations with family members."
                                lessons="6 lessons"
                                link="/learning/speak-with-confidence"
                                gradient="from-orange-500 to-orange-600"
                                icon={<FaMicrophone className="text-5xl text-orange-600" />}
                                featured={true}
                            />
                            <CourseCard
                                level="Advanced"
                                title="Master Punjabi"
                                description="Achieve fluency and understand cultural nuances for natural, confident conversations."
                                lessons="6 lessons"
                                link="/learning/master-punjabi"
                                gradient="from-green-500 to-green-600"
                                icon={<FaAward className="text-5xl text-green-600" />}
                            />
                        </div>
                    </div>
                </section>

                {/* ── Problem / Solution ────────────────────────────────── */}
                <section className="py-24 px-6 bg-gradient-to-b from-white to-gray-50">
                    <div className="max-w-6xl mx-auto">
                        <div className="text-center mb-20">
                            <p className="text-blue-600 font-bold uppercase tracking-wider text-sm mb-4">The Problem We're Solving</p>
                            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                                Learning Punjabi Shouldn't Feel Impossible
                            </h2>
                            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
                                Generic language apps don't understand real learners. They teach vocabulary you'll never use
                                and ignore the context that makes conversations meaningful.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                            <ProblemSolutionCard
                                problem="Generic apps teach textbook phrases"
                                solution="We teach real family conversations"
                                icon={<FaComments className="text-3xl" />}
                                accentColor="blue"
                            />
                            <ProblemSolutionCard
                                problem="No cultural context or connection"
                                solution="Every lesson includes cultural insights"
                                icon={<FaHeart className="text-3xl" />}
                                accentColor="orange"
                            />
                            <ProblemSolutionCard
                                problem="Pronunciation guides don't help"
                                solution="Native speaker audio on every word"
                                icon={<FaHeadphones className="text-3xl" />}
                                accentColor="green"
                            />
                            <ProblemSolutionCard
                                problem="Long, overwhelming lessons"
                                solution="10-minute lessons that fit your life"
                                icon={<FaClock className="text-3xl" />}
                                accentColor="purple"
                            />
                        </div>
                    </div>
                </section>

                {/* ── How It Works ──────────────────────────────────────── */}
                <section className="py-24 px-6 bg-white">
                    <div className="max-w-6xl mx-auto">
                        <div className="text-center mb-20">
                            <p className="text-orange-600 font-bold uppercase tracking-wider text-sm mb-4">Why Learn Punjabi with Us</p>
                            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                                The Best Way to Learn Punjabi Online
                            </h2>
                            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                                Three powerful tools that make learning Punjabi from English easy and effective
                            </p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-12 max-w-5xl mx-auto">
                            <ProcessStep
                                number="01"
                                title="AI Punjabi Tutor"
                                description="Get personalised lessons with our AI tutor. Ask questions in English, learn in Punjabi with cultural context and authentic pronunciation"
                                icon={<FaRobot className="text-4xl text-purple-600" />}
                            />
                            <ProcessStep
                                number="02"
                                title="Interactive Lessons"
                                description="Structured learning path with bite-sized lessons covering greetings, family conversations, and everyday phrases"
                                icon={<FaGraduationCap className="text-4xl text-blue-600" />}
                            />
                            <ProcessStep
                                number="03"
                                title="Punjabi Dictionary"
                                description="Instant Punjabi-English translations with Gurmukhi script, romanised pronunciation, and audio for every word"
                                icon={<FaBookOpen className="text-4xl text-orange-600" />}
                            />
                        </div>

                        <div className="text-center mt-16">
                            <a href="/key-functions/signup">
                                <button className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-10 py-4 rounded-2xl text-base font-bold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                                    Get Started Free
                                </button>
                            </a>
                        </div>
                    </div>
                </section>

                {/* ── Testimonials ──────────────────────────────────────── */}
                <section className="py-24 px-6 bg-white">
                    <div className="max-w-6xl mx-auto">
                        <div className="text-center mb-20">
                            <p className="text-orange-600 font-bold uppercase tracking-wider text-sm mb-4">Success Stories</p>
                            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                                Real People. Real Results.
                            </h2>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8">
                            <TestimonialCard
                                quote="I had my first full conversation with my grandmother in Punjabi last week. This platform gave me the tools to connect with her in a way I never thought possible."
                                name="Priya S."
                                location="Birmingham, UK"
                                avatar="from-blue-400 to-blue-600"
                            />
                            <TestimonialCard
                                quote="Six months ago, I couldn't say a single sentence. Now I'm translating for my younger cousins at family gatherings. The bite-sized lessons made it actually achievable."
                                name="Raj M."
                                location="Vancouver, Canada"
                                avatar="from-orange-400 to-orange-600"
                            />
                            <TestimonialCard
                                quote="Finally, a platform that gets it. The cultural context in each lesson helped me understand not just what to say, but why. It's helped me feel more connected to my roots."
                                name="Simran K."
                                location="Wolverhampton, UK"
                                avatar="from-green-400 to-green-600"
                            />
                        </div>
                    </div>
                </section>

                {/* ── FAQ ───────────────────────────────────────────────── */}
                <section className="py-24 px-6 bg-white">
                    <div className="max-w-4xl mx-auto">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                                Frequently Asked Questions
                            </h2>
                            <p className="text-lg text-gray-600">
                                Everything you need to know about learning Punjabi online
                            </p>
                        </div>

                        <div className="space-y-6">
                            <FAQItem
                                question="How to learn Punjabi from English?"
                                answer="Simply Punjabi makes it easy to learn Punjabi from English with three powerful tools: interactive lessons that break down concepts for English speakers, an AI tutor that answers your questions in English, and a comprehensive dictionary with romanised pronunciations. Start with our Essential Punjabi course designed specifically for English-speaking beginners."
                            />
                            <FAQItem
                                question="Is it possible to learn Punjabi online for free?"
                                answer="Yes! Simply Punjabi offers free access to interactive Punjabi lessons, AI tutor conversations, and our complete Punjabi-English dictionary. You can start learning Punjabi online today without any credit card or payment required."
                            />
                            <FAQItem
                                question="How long does it take to learn Punjabi?"
                                answer="With Simply Punjabi's structured approach, most learners can have basic conversations with family members within 4-8 weeks of consistent practice. Our bite-sized lessons take just 10-15 minutes per day, making it easy to fit Punjabi learning into your schedule."
                            />
                            <FAQItem
                                question="What is the best way to learn Punjabi for beginners?"
                                answer="The best way to learn Punjabi as a beginner is to start with practical family conversations rather than formal grammar. Simply Punjabi's Essential Punjabi course teaches you greetings, introductions, and common phrases you'll actually use with your family. Our AI tutor provides instant help when you're stuck, and audio pronunciations ensure you sound natural."
                            />
                            <FAQItem
                                question="Can I learn Punjabi if I don't know the Gurmukhi script?"
                                answer="Absolutely! Simply Punjabi uses romanized Punjabi (Punjabi written in English letters) alongside Gurmukhi script. You can start speaking Punjabi immediately using romanisation, and gradually learn to read Gurmukhi at your own pace. All our lessons include both formats."
                            />
                            <FAQItem
                                question="Is Simply Punjabi good for western learners?"
                                answer="Yes, Simply Punjabi is specifically designed for second and third-generation diaspora learners in the UK, US, Canada, and Australia. Our lessons focus on family conversations and cultural context that matter most to heritage learners reconnecting with their roots."
                            />
                        </div>
                    </div>
                </section>

                {/* ── Final CTA ─────────────────────────────────────────── */}
                <section className="py-32 px-6 bg-gradient-to-br from-blue-600 via-blue-700 to-orange-600 text-white relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-0 right-0 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl"></div>

                    <div className="max-w-4xl mx-auto text-center relative z-10">
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                            Start Speaking Punjabi with Your Family Today
                        </h2>
                        <p className="text-lg sm:text-xl text-blue-100 mb-10 leading-relaxed max-w-2xl mx-auto">
                            Join thousands of learners reconnecting with their heritage. Start your journey with full platform access at no cost.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
                            <a href="/key-functions/signup">
                                <button className="bg-white text-blue-600 px-12 py-5 rounded-2xl text-lg font-bold shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105">
                                    <span className="flex items-center gap-3">
                                        <FaRocket />
                                        Get Started Free
                                    </span>
                                </button>
                            </a>
                        </div>

                        <div className="mt-16 flex flex-wrap items-center justify-center gap-8 text-sm text-blue-100">
                            <div className="flex items-center gap-2">
                                <FaCheckCircle className="text-green-400" />
                                <span>Cancel anytime</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <FaCheckCircle className="text-green-400" />
                                <span>Learn at your own pace</span>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
}

// ─── Sub-components (unchanged from original) ────────────────────────────────

function ProblemSolutionCard({ problem, solution, icon, accentColor }) {
    const colorMap = {
        blue: 'from-blue-500 to-blue-600',
        orange: 'from-orange-500 to-orange-600',
        green: 'from-green-500 to-green-600',
        purple: 'from-purple-500 to-purple-600'
    };

    return (
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300">
            <div className={`inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br ${colorMap[accentColor]} text-white mb-6`}>
                {icon}
            </div>
            <div className="space-y-3">
                <p className="text-gray-500 line-through text-sm">{problem}</p>
                <p className="text-gray-900 font-semibold text-lg">{solution}</p>
            </div>
        </div>
    );
}

function ProcessStep({ number, title, description, icon }) {
    return (
        <div className="text-center">
            <div className="flex justify-center mb-6">
                <div className="relative">
                    <div className="w-20 h-20 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl flex items-center justify-center border-2 border-gray-200">
                        {icon}
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-blue-600 to-orange-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                        {number}
                    </div>
                </div>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
            <p className="text-gray-600 leading-relaxed">{description}</p>
        </div>
    );
}

function CourseCard({ level, title, description, lessons, link, gradient, icon, featured }) {
    return (
        <a href={link} className="block group">
            <div className={`relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border-2 ${featured ? 'border-orange-200 ring-4 ring-orange-100' : 'border-gray-100 hover:border-gray-200'} transform hover:-translate-y-2`}>
                {featured && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-4 py-1.5 rounded-full text-xs font-bold shadow-lg">
                        MOST POPULAR
                    </div>
                )}
                <div className="text-center">
                    <div className="flex justify-center mb-6 transform group-hover:scale-110 transition-transform duration-300">
                        {icon}
                    </div>
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">{level}</p>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">{title}</h3>
                    <p className="text-gray-600 mb-6 leading-relaxed">{description}</p>
                    <div className="flex items-center justify-center text-sm text-gray-500 mb-6">
                        <span className="flex items-center gap-1.5">
                            <FaBook className="text-xs" />
                            {lessons}
                        </span>
                    </div>
                    <button className={`w-full bg-gradient-to-r ${gradient} text-white px-6 py-4 rounded-xl font-bold shadow-md group-hover:shadow-lg transition-all duration-300`}>
                        <span className="flex items-center justify-center gap-2">
                            Start Course
                            <span className="transform group-hover:translate-x-1 transition-transform duration-300">→</span>
                        </span>
                    </button>
                </div>
            </div>
        </a>
    );
}

function TestimonialCard({ quote, name, location, avatar }) {
    return (
        <div className="bg-gray-50 rounded-2xl p-8 hover:bg-white hover:shadow-lg transition-all duration-300 border border-gray-100">
            <div className="flex gap-1 mb-5">
                {[...Array(5)].map((_, i) => (
                    <FaStar key={i} className="text-yellow-400 text-sm" />
                ))}
            </div>
            <p className="text-gray-700 mb-6 leading-relaxed italic">"{quote}"</p>
            <div className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${avatar}`}></div>
                <div>
                    <p className="font-bold text-gray-900">{name}</p>
                    <p className="text-sm text-gray-500">{location}</p>
                </div>
            </div>
        </div>
    );
}

function FAQItem({ question, answer }) {
    return (
        <details className="group bg-gradient-to-r from-blue-50 to-orange-50 rounded-xl p-6 border border-blue-100 hover:border-blue-200 transition-colors">
            <summary className="flex items-center justify-between cursor-pointer list-none">
                <h3 className="text-lg font-bold text-gray-900 pr-4">{question}</h3>
                <span className="text-blue-600 text-2xl group-open:rotate-45 transition-transform">+</span>
            </summary>
            <p className="mt-4 text-gray-700 leading-relaxed">{answer}</p>
        </details>
    );
}