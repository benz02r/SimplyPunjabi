"use client";

import Head from 'next/head';
import { useState, useEffect } from 'react';
import { FaComments, FaMicrophone, FaAward, FaCheckCircle, FaGlobe, FaUsers, FaRocket, FaHeart, FaStar, FaClock, FaHeadphones, FaBook, FaGraduationCap, FaRobot, FaBookOpen, FaLock, FaArrowRight, FaVolumeUp, FaSpinner } from 'react-icons/fa';

// ─── Chat Spotlight Component ─────────────────────────────────────────────────
function ChatSpotlight({ compact = false }) {
    const [messages, setMessages] = useState([
        {
            role: 'assistant',
            text: 'ਸਤ ਸ੍ਰੀ ਅਕਾਲ! Ask me anything in English — greetings, family phrases, cultural context.',
            structured: null
        }
    ]);
    const [input, setInput] = useState('');
    const [usesLeft, setUsesLeft] = useState(null);
    const [loading, setLoading] = useState(false);
    const [isTyping, setIsTyping] = useState(false);
    const [isLoadingAudio, setIsLoadingAudio] = useState({});

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
        } catch { }
    };

    const speakPunjabi = async (text, msgIndex) => {
        if (!text) return;
        setIsLoadingAudio(prev => ({ ...prev, [msgIndex]: true }));
        try {
            const response = await fetch('/api/tts', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ text, languageCode: 'pa-IN', voiceName: 'pa-IN-Wavenet-A', speakingRate: 0.85 })
            });
            if (!response.ok) throw new Error('TTS unavailable');
            const { audioContent } = await response.json();
            const audio = new Audio(`data:audio/mp3;base64,${audioContent}`);
            audio.onended = () => setIsLoadingAudio(prev => ({ ...prev, [msgIndex]: false }));
            await audio.play();
        } catch {
            if ('speechSynthesis' in window) {
                const u = new SpeechSynthesisUtterance(text);
                u.lang = 'pa-IN'; u.rate = 0.8;
                speechSynthesis.speak(u);
            }
            setIsLoadingAudio(prev => ({ ...prev, [msgIndex]: false }));
        }
    };

    const handleSend = async () => {
        const trimmed = input.trim();
        if (!trimmed || loading || usesLeft <= 0) return;

        const conversationHistory = messages.map(m => ({ role: m.role, content: m.text }));
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
            let replyText = data.response || '';
            if (structured?.romanized && structured?.english) {
                replyText = structured.romanized + ' — ' + structured.english;
            }
            setMessages(prev => [...prev, { role: 'assistant', text: replyText, structured }]);
        } catch {
            setMessages(prev => [...prev, { role: 'assistant', text: 'Something went wrong — please try again.', structured: null }]);
        } finally {
            setIsTyping(false);
            setLoading(false);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); }
    };

    return (
        <div className="flex flex-col h-full bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
            {/* Chat header */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-4 py-3 flex items-center gap-3 flex-shrink-0">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                    <FaRobot className="text-white text-sm" />
                </div>
                <div className="flex-1 min-w-0">
                    <p className="text-white font-bold text-sm leading-tight">Simply Punjabi Tutor</p>
                    <div className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-400"></span>
                        <p className="text-blue-200 text-xs">Online now</p>
                    </div>
                </div>
                {/* Uses dots */}
                {usesLeft !== null && (
                    <div className="flex items-center gap-1 flex-shrink-0">
                        {[...Array(MAX_FREE_USES)].map((_, i) => (
                            <div key={i} className={`w-2 h-2 rounded-full transition-colors ${i < usesLeft ? 'bg-green-400' : 'bg-white/20'}`} />
                        ))}
                        <span className="text-xs text-blue-200 ml-1">free</span>
                    </div>
                )}
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50/50 min-h-0">
                {messages.map((msg, i) => (
                    <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        {msg.role === 'assistant' && (
                            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center mr-2 mt-1 flex-shrink-0">
                                <FaRobot className="text-white text-[9px]" />
                            </div>
                        )}
                        <div className={`max-w-[82%] rounded-2xl px-3 py-2.5 text-sm ${
                            msg.role === 'user'
                                ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-tr-sm'
                                : 'bg-white text-gray-800 shadow-sm border border-gray-100 rounded-tl-sm'
                        }`}>
                            {msg.role === 'assistant' && msg.structured?.gurmukhi ? (
                                <div>
                                    <div className="flex items-start justify-between gap-2 mb-1">
                                        <p className="text-base font-bold text-gray-900 leading-tight">{msg.structured.gurmukhi}</p>
                                        <button
                                            onClick={() => speakPunjabi(msg.structured.gurmukhi, i)}
                                            disabled={isLoadingAudio[i]}
                                            className="flex-shrink-0 p-1 bg-blue-100 hover:bg-blue-200 rounded-lg transition-colors text-blue-600 disabled:opacity-50"
                                        >
                                            {isLoadingAudio[i] ? <FaSpinner className="text-[10px] animate-spin" /> : <FaVolumeUp className="text-[10px]" />}
                                        </button>
                                    </div>
                                    <p className="text-xs italic text-gray-500 mb-1">{msg.structured.romanized}</p>
                                    <p className="text-xs text-gray-500 mb-2">{msg.structured.english}</p>
                                    {msg.structured.cultural_note && (
                                        <div className="pt-2 border-t border-gray-100">
                                            <p className="text-[10px] font-bold text-orange-500 uppercase tracking-wide mb-0.5">Cultural Note</p>
                                            <p className="text-xs text-gray-600 leading-relaxed">{msg.structured.cultural_note}</p>
                                        </div>
                                    )}
                                    {msg.structured.new_vocabulary?.length > 0 && (
                                        <div className="mt-2 pt-2 border-t border-gray-100">
                                            <div className="flex flex-wrap gap-1">
                                                {msg.structured.new_vocabulary.slice(0, 3).map((w, wi) => (
                                                    <span key={wi} className="text-[10px] bg-green-50 border border-green-100 rounded px-1.5 py-0.5 text-gray-700">
                                                        {w.romanized} · {w.english}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                    {msg.structured.follow_up_suggestion && (
                                        <button onClick={() => setInput(msg.structured.follow_up_suggestion)}
                                                className="mt-2 text-[10px] text-blue-500 hover:text-blue-700 flex items-center gap-1 font-medium">
                                            <FaArrowRight className="text-[8px]" />{msg.structured.follow_up_suggestion}
                                        </button>
                                    )}
                                </div>
                            ) : (
                                <p className="leading-relaxed">{msg.text}</p>
                            )}
                        </div>
                    </div>
                ))}
                {isTyping && (
                    <div className="flex justify-start">
                        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center mr-2 mt-1 flex-shrink-0">
                            <FaRobot className="text-white text-[9px]" />
                        </div>
                        <div className="bg-white rounded-2xl rounded-tl-sm px-3 py-2.5 shadow-sm border border-gray-100">
                            <div className="flex gap-1 items-center h-4">
                                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Input */}
            <div className="p-3 bg-white border-t border-gray-100 flex-shrink-0">
                {usesLeft === 0 ? (
                    <div className="space-y-2">
                        <p className="text-xs text-gray-500 text-center">You've used your 3 free messages</p>
                        <a href="/key-functions/signup" className="block">
                            <button className="w-full bg-gradient-to-r from-blue-600 to-orange-500 text-white py-2.5 rounded-xl font-bold text-sm shadow-md hover:shadow-lg transition-all hover:scale-[1.02]">
                                Sign Up Free — Unlimited Chat
                            </button>
                        </a>
                    </div>
                ) : (
                    <>
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={input}
                                onChange={e => setInput(e.target.value)}
                                onKeyDown={handleKeyDown}
                                placeholder="Ask e.g. 'How do I greet my nani?'"
                                disabled={loading}
                                className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-60 transition"
                            />
                            <button
                                onClick={handleSend}
                                disabled={loading || !input.trim()}
                                className="bg-gradient-to-r from-blue-600 to-blue-700 text-white w-10 h-10 rounded-xl flex items-center justify-center shadow-md hover:shadow-lg transition-all hover:scale-105 disabled:opacity-50 disabled:hover:scale-100 flex-shrink-0"
                            >
                                {loading
                                    ? <svg className="animate-spin w-4 h-4 text-white" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>
                                    : <FaArrowRight className="text-sm" />
                                }
                            </button>
                        </div>
                        {usesLeft !== null && usesLeft > 0 && (
                            <p className="text-[10px] text-gray-400 text-center mt-1.5">
                                {usesLeft} of {MAX_FREE_USES} free messages · <a href="/key-functions/signup" className="text-blue-500 hover:underline">Sign up for unlimited</a>
                            </p>
                        )}
                        {/* Suggestion chips — only on first message */}
                        {messages.length <= 1 && (
                            <div className="flex flex-wrap gap-1.5 mt-2">
                                {["How do I greet my nani?", "What does Sat Sri Akal mean?", "Teach me family words"].map((q, i) => (
                                    <button key={i} onClick={() => setInput(q)}
                                            className="text-[10px] bg-gray-50 border border-gray-200 text-gray-600 px-2 py-1 rounded-full hover:border-blue-400 hover:text-blue-600 transition-colors">
                                        {q}
                                    </button>
                                ))}
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
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
    const currentDay = punjabiDays[today.getDay()];

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
                <script type="application/ld+json">{JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "EducationalOrganization",
                    "name": "Simply Punjabi",
                    "description": "Learn Punjabi online free - Interactive lessons and AI tutor for English speakers",
                    "url": "https://simplypunjabi.com",
                    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "GBP" }
                })}</script>
                <link rel="canonical" href="https://simplypunjabi.com" />
            </Head>

            <div className="min-h-screen bg-white">

                {/* ── ABOVE THE FOLD — Z-PATTERN HERO ──────────────────────────
                    Desktop: left col (Z-start) = headline + CTA
                             right col (Z-end)   = live chat demo
                             bottom strip        = course cards
                    Mobile:  stacks as title → chat → course cards
                ─────────────────────────────────────────────────────────────── */}
                <section className="relative min-h-screen flex flex-col overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50/40 to-orange-50/30">

                    {/* Decorative background blobs */}
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-blue-100/50 to-orange-100/30 rounded-full blur-3xl -z-10 translate-x-1/4 -translate-y-1/4" />
                    <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-orange-100/30 to-blue-100/20 rounded-full blur-3xl -z-10 -translate-x-1/4 translate-y-1/4" />
                    {/* Subtle grain texture overlay */}
                    <div className="absolute inset-0 opacity-[0.025] -z-10" style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
                        backgroundRepeat: 'repeat',
                        backgroundSize: '128px'
                    }} />

                    {/* Main content — flex-1 to fill screen */}
                    <div className="flex-1 flex flex-col max-w-7xl mx-auto w-full px-6 pt-28 pb-6 sm:pt-32">

                        {/* ── Z-START + Z-END: Two column grid ── */}
                        <div className="grid lg:grid-cols-2 gap-8 xl:gap-12 items-start">

                            {/* LEFT COL — Z-start: headline, subheading, CTA */}
                            <div className="flex flex-col justify-center">

                                {/* Logo */}
                                <div className="mb-6">
                                    <img
                                        src="/Website Banner(shadowing)- Simply Punjabi, Ryan.png"
                                        alt="Simply Punjabi"
                                        className="w-full max-w-[520px] drop-shadow-lg"
                                    />
                                </div>

                                {/* Word of the Day badge */}
                                <div className="inline-flex items-center gap-2.5 bg-white border border-orange-200 rounded-full px-4 py-2 shadow-sm mb-6 self-start">
                                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Today</span>
                                    <span className="text-orange-500 font-bold text-base">{currentDay.pa}</span>
                                    <span className="text-gray-300">·</span>
                                    <span className="text-gray-700 font-medium text-sm">{currentDay.pron}</span>
                                    <span className="text-gray-400 text-xs">({currentDay.en})</span>
                                </div>

                                {/* Headline */}
                                <h1 className="text-3xl sm:text-4xl xl:text-5xl font-bold text-gray-900 leading-[1.1] mb-4 tracking-tight">
                                    Learn Punjabi<br />
                                    <span className="bg-gradient-to-r from-blue-600 to-orange-500 bg-clip-text text-transparent">
                                        your family will notice
                                    </span>
                                </h1>

                                <p className="text-base text-gray-600 leading-relaxed mb-6 max-w-md">
                                    The only Punjabi platform built for diaspora learners. Real family phrases, cultural context, AI-powered tutor — try it free below.
                                </p>

                                {/* Scroll hint — CTA is at bottom-right of Z */}
                                <div className="flex items-center gap-2 mb-5 text-sm text-gray-500">
                                    <FaClock className="text-blue-500 text-xs" />
                                    Try the AI tutor free — no sign-up needed
                                </div>

                                {/* Social proof */}
                                <div className="flex flex-wrap gap-6 text-sm text-gray-500">
                                    <div className="flex items-center gap-2">
                                        <FaUsers className="text-blue-500 text-xs" />
                                        <span>Trusted by UK, US, Canada & Australia</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <FaCheckCircle className="text-green-500 text-xs" />
                                        <span>No credit card required</span>
                                    </div>
                                </div>
                            </div>

                            {/* RIGHT COL — Z-end: live chat demo */}
                            <div className="flex flex-col lg:py-4">
                                {/* Label */}
                                <div className="flex items-center justify-between mb-3">
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                                        <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Live AI Tutor — try it now</span>
                                    </div>
                                    <span className="text-xs text-gray-400">No sign-up needed</span>
                                </div>
                                <div className="h-[440px] lg:h-[420px]">
                                    <ChatSpotlight />
                                </div>
                            </div>
                        </div>

                        {/* ── BOTTOM STRIP: Course cards + Z-end CTA ── */}
                        <div className="mt-6 pt-5 border-t border-gray-200/60">
                            <div className="flex items-center justify-between mb-3">
                                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Choose your learning path</p>
                                <a href="/key-functions/signup" className="hidden sm:flex items-center gap-2 bg-gradient-to-r from-blue-600 to-orange-500 text-white px-5 py-2.5 rounded-xl font-bold text-sm shadow-lg hover:shadow-xl transition-all hover:scale-105">
                                    <FaRocket className="text-xs" />Get Started Free
                                </a>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                {[
                                    {
                                        level: "Beginner",
                                        title: "Essential Punjabi",
                                        desc: "Greetings, introductions, basic family vocabulary",
                                        lessons: "5 lessons",
                                        link: "/learning/essential-punjabi",
                                        gradient: "from-blue-500 to-blue-600",
                                        border: "border-blue-100",
                                        bg: "bg-blue-50",
                                        icon: <FaComments className="text-blue-500 text-lg" />
                                    },
                                    {
                                        level: "Intermediate",
                                        title: "Speak with Confidence",
                                        desc: "Everyday conversations with family members",
                                        lessons: "6 lessons",
                                        link: "/learning/speak-with-confidence",
                                        gradient: "from-orange-500 to-orange-600",
                                        border: "border-orange-200",
                                        bg: "bg-orange-50",
                                        featured: true,
                                        icon: <FaMicrophone className="text-orange-500 text-lg" />
                                    },
                                    {
                                        level: "Advanced",
                                        title: "Master Punjabi",
                                        desc: "Fluency, cultural nuance, natural conversation",
                                        lessons: "6 lessons",
                                        link: "/learning/master-punjabi",
                                        gradient: "from-green-500 to-green-600",
                                        border: "border-green-100",
                                        bg: "bg-green-50",
                                        icon: <FaAward className="text-green-500 text-lg" />
                                    }
                                ].map((course, i) => (
                                    <a key={i} href={course.link} className="block group">
                                        <div className={`relative flex items-center gap-4 bg-white rounded-2xl px-5 py-4 border-2 ${course.featured ? 'border-orange-200 shadow-lg' : course.border + ' shadow-sm'} hover:shadow-xl transition-all duration-300 hover:-translate-y-1`}>
                                            {course.featured && (
                                                <div className="absolute -top-2.5 left-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white text-[9px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow">
                                                    Popular
                                                </div>
                                            )}
                                            <div className={`w-10 h-10 rounded-xl ${course.bg} flex items-center justify-center flex-shrink-0`}>
                                                {course.icon}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center gap-2 mb-0.5">
                                                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{course.level}</span>
                                                    <span className="text-[10px] text-gray-300">·</span>
                                                    <span className="text-[10px] text-gray-400">{course.lessons}</span>
                                                </div>
                                                <p className="font-bold text-gray-900 text-sm truncate">{course.title}</p>
                                                <p className="text-xs text-gray-500 truncate">{course.desc}</p>
                                            </div>
                                            <FaArrowRight className="text-gray-300 group-hover:text-gray-500 text-xs flex-shrink-0 group-hover:translate-x-0.5 transition-transform" />
                                        </div>
                                    </a>
                                ))}
                            </div>
                            {/* Mobile Z-end CTA */}
                            <div className="sm:hidden mt-4">
                                <a href="/key-functions/signup">
                                    <button className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-orange-500 text-white py-3.5 rounded-xl font-bold text-sm shadow-lg">
                                        <FaRocket className="text-xs" />Get Started Free — No Sign-up Needed
                                    </button>
                                </a>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ── BELOW THE FOLD ────────────────────────────────────────── */}

                {/* Problem / Solution */}
                <section className="py-24 px-6 bg-gradient-to-b from-white to-gray-50">
                    <div className="max-w-6xl mx-auto">
                        <div className="text-center mb-16">
                            <p className="text-blue-600 font-bold uppercase tracking-wider text-sm mb-4">The Problem We're Solving</p>
                            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6 leading-tight">
                                Learning Punjabi Shouldn't Feel Impossible
                            </h2>
                            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                                Generic apps don't understand diaspora learners. They teach vocabulary you'll never use and ignore the cultural context that makes conversations meaningful.
                            </p>
                        </div>
                        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                            {[
                                { problem: "Generic apps teach textbook phrases", solution: "We teach real family conversations", icon: <FaComments className="text-2xl" />, color: "blue" },
                                { problem: "No cultural context or connection", solution: "Every lesson includes cultural insights", icon: <FaHeart className="text-2xl" />, color: "orange" },
                                { problem: "Pronunciation guides don't help", solution: "Native speaker audio on every word", icon: <FaHeadphones className="text-2xl" />, color: "green" },
                                { problem: "Long, overwhelming lessons", solution: "10-minute lessons that fit your life", icon: <FaClock className="text-2xl" />, color: "purple" },
                            ].map((item, i) => {
                                const colors = { blue: 'from-blue-500 to-blue-600', orange: 'from-orange-500 to-orange-600', green: 'from-green-500 to-green-600', purple: 'from-purple-500 to-purple-600' };
                                return (
                                    <div key={i} className="bg-white rounded-2xl p-7 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300">
                                        <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br ${colors[item.color]} text-white mb-5`}>
                                            {item.icon}
                                        </div>
                                        <p className="text-gray-400 line-through text-sm mb-2">{item.problem}</p>
                                        <p className="text-gray-900 font-semibold text-lg">{item.solution}</p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* How It Works */}
                <section className="py-24 px-6 bg-white">
                    <div className="max-w-6xl mx-auto">
                        <div className="text-center mb-16">
                            <p className="text-orange-600 font-bold uppercase tracking-wider text-sm mb-4">Why Simply Punjabi</p>
                            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">Three tools. One goal.</h2>
                            <p className="text-lg text-gray-600 max-w-xl mx-auto">Everything you need to go from silent at family dinners to speaking with confidence.</p>
                        </div>
                        <div className="grid md:grid-cols-3 gap-10 max-w-5xl mx-auto">
                            {[
                                { n: "01", title: "AI Punjabi Tutor", desc: "Ask anything in English. Get culturally grounded answers with pronunciation guides and family context.", icon: <FaRobot className="text-4xl text-purple-500" /> },
                                { n: "02", title: "Interactive Lessons", desc: "Structured bite-sized lessons covering greetings, family words, and everyday phrases.", icon: <FaGraduationCap className="text-4xl text-blue-500" /> },
                                { n: "03", title: "Punjabi Dictionary", desc: "Instant translations with Gurmukhi script, romanised pronunciation, and audio for every word.", icon: <FaBookOpen className="text-4xl text-orange-500" /> },
                            ].map((step, i) => (
                                <div key={i} className="text-center">
                                    <div className="flex justify-center mb-6">
                                        <div className="relative">
                                            <div className="w-20 h-20 bg-gray-50 rounded-2xl flex items-center justify-center border-2 border-gray-100">
                                                {step.icon}
                                            </div>
                                            <div className="absolute -top-2 -right-2 w-7 h-7 bg-gradient-to-br from-blue-600 to-orange-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                                                {step.n.replace('0', '')}
                                            </div>
                                        </div>
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                                    <p className="text-gray-600 leading-relaxed text-sm">{step.desc}</p>
                                </div>
                            ))}
                        </div>
                        <div className="text-center mt-14">
                            <a href="/key-functions/signup">
                                <button className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-10 py-4 rounded-2xl font-bold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                                    Get Started Free
                                </button>
                            </a>
                        </div>
                    </div>
                </section>

                {/* Testimonials */}
                <section className="py-24 px-6 bg-gray-50">
                    <div className="max-w-6xl mx-auto">
                        <div className="text-center mb-16">
                            <p className="text-orange-600 font-bold uppercase tracking-wider text-sm mb-4">Success Stories</p>
                            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">Real People. Real Results.</h2>
                        </div>
                        <div className="grid md:grid-cols-3 gap-6">
                            {[
                                { quote: "I had my first full conversation with my grandmother in Punjabi last week. This platform gave me the tools to connect with her in a way I never thought possible.", name: "Priya S.", location: "Birmingham, UK", avatar: "from-blue-400 to-blue-600" },
                                { quote: "Six months ago I couldn't say a single sentence. Now I'm translating for my younger cousins at family gatherings. The bite-sized lessons made it achievable.", name: "Raj M.", location: "Vancouver, Canada", avatar: "from-orange-400 to-orange-600" },
                                { quote: "Finally a platform that gets it. The cultural context helped me understand not just what to say, but why. It's helped me feel more connected to my roots.", name: "Simran K.", location: "Wolverhampton, UK", avatar: "from-green-400 to-green-600" },
                            ].map((t, i) => (
                                <div key={i} className="bg-white rounded-2xl p-7 border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300">
                                    <div className="flex gap-1 mb-4">
                                        {[...Array(5)].map((_, j) => <FaStar key={j} className="text-yellow-400 text-xs" />)}
                                    </div>
                                    <p className="text-gray-700 mb-5 leading-relaxed italic text-sm">"{t.quote}"</p>
                                    <div className="flex items-center gap-3">
                                        <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${t.avatar}`} />
                                        <div>
                                            <p className="font-bold text-gray-900 text-sm">{t.name}</p>
                                            <p className="text-xs text-gray-500">{t.location}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* FAQ */}
                <section className="py-24 px-6 bg-white">
                    <div className="max-w-3xl mx-auto">
                        <div className="text-center mb-14">
                            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
                            <p className="text-gray-600">Everything you need to know about learning Punjabi online</p>
                        </div>
                        <div className="space-y-4">
                            {[
                                { q: "How to learn Punjabi from English?", a: "Simply Punjabi makes it easy with three tools: interactive lessons designed for English speakers, an AI tutor that answers in English, and a dictionary with romanised pronunciations. Start with Essential Punjabi for complete beginners." },
                                { q: "Is it possible to learn Punjabi online for free?", a: "Yes — Simply Punjabi offers free access to lessons, AI tutor conversations, and the full Punjabi-English dictionary. No credit card required." },
                                { q: "How long does it take to learn Punjabi?", a: "Most learners can have basic family conversations within 4-8 weeks of consistent practice. Our lessons take 10-15 minutes per day." },
                                { q: "Can I learn Punjabi without knowing Gurmukhi script?", a: "Absolutely. Simply Punjabi uses romanised Punjabi alongside Gurmukhi. You can speak immediately using romanisation and learn the script gradually." },
                                { q: "Is Simply Punjabi good for western diaspora learners?", a: "Yes — it's specifically designed for second and third-generation learners in the UK, US, Canada, and Australia. Lessons focus on family conversations and cultural context that matter most to heritage learners." },
                            ].map((item, i) => (
                                <details key={i} className="group bg-gradient-to-r from-blue-50 to-orange-50 rounded-xl p-5 border border-blue-100 hover:border-blue-200 transition-colors">
                                    <summary className="flex items-center justify-between cursor-pointer list-none">
                                        <h3 className="font-bold text-gray-900 pr-4 text-sm sm:text-base">{item.q}</h3>
                                        <span className="text-blue-600 text-xl flex-shrink-0 group-open:rotate-45 transition-transform">+</span>
                                    </summary>
                                    <p className="mt-3 text-gray-700 leading-relaxed text-sm">{item.a}</p>
                                </details>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Final CTA */}
                <section className="py-28 px-6 bg-gradient-to-br from-blue-600 via-blue-700 to-orange-600 text-white relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
                    <div className="absolute bottom-0 right-0 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl" />
                    <div className="max-w-4xl mx-auto text-center relative z-10">
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                            Start Speaking Punjabi with Your Family Today
                        </h2>
                        <p className="text-lg text-blue-100 mb-10 max-w-2xl mx-auto leading-relaxed">
                            Join thousands of learners reconnecting with their heritage. Full platform access, no cost.
                        </p>
                        <a href="/key-functions/signup">
                            <button className="bg-white text-blue-600 px-12 py-5 rounded-2xl text-lg font-bold shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105">
                                <span className="flex items-center gap-3">
                                    <FaRocket />Get Started Free
                                </span>
                            </button>
                        </a>
                        <div className="mt-10 flex flex-wrap items-center justify-center gap-8 text-sm text-blue-100">
                            <div className="flex items-center gap-2"><FaCheckCircle className="text-green-400" /><span>No credit card required</span></div>
                            <div className="flex items-center gap-2"><FaCheckCircle className="text-green-400" /><span>Learn at your own pace</span></div>
                            <div className="flex items-center gap-2"><FaCheckCircle className="text-green-400" /><span>Cancel anytime</span></div>
                        </div>
                    </div>
                </section>

            </div>
        </>
    );
}