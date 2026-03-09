"use client";

import Head from 'next/head';
import { useState, useEffect, useRef } from 'react';
import {
    FaComments, FaMicrophone, FaAward, FaCheckCircle,
    FaUsers, FaRocket, FaHeart, FaStar, FaClock,
    FaHeadphones, FaBook, FaGraduationCap, FaRobot,
    FaBookOpen, FaArrowRight, FaVolumeUp, FaSpinner
} from 'react-icons/fa';

/* ═══════════════════════════════════════════════════════════════════
   Chat Spotlight Component (preserved from original — functional logic intact)
   ═══════════════════════════════════════════════════════════════════ */
function ChatSpotlight({ inPopup = false }) {
    const [messages, setMessages] = useState([
        {
            role: 'assistant',
            text: 'ਸਤ ਸ੍ਰੀ ਅਕਾਲ! Ask me anything in English: greetings, family phrases, cultural context.',
            structured: null,
            rawJson: null
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

        // Only include messages that have actual conversation content
        // Skip the initial hardcoded welcome message (no rawJson, not from Gemini)
        const conversationHistory = messages
            .filter(m => m.rawJson !== undefined || m.role === 'user')
            .filter(m => !(m.role === 'assistant' && !m.rawJson))
            .map(m => ({
                role: m.role,
                content: m.role === 'assistant' && m.rawJson ? m.rawJson : m.text
            }));
        const userMsg = { role: 'user', text: trimmed, structured: null, rawJson: null };
        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setIsTyping(true);
        setLoading(true);
        incrementUses();

        try {
            const response = await fetch('/api/chat-landing', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    message: trimmed,
                    conversationHistory
                })
            });
            const data = await response.json();
            let structured = data.structured || null;
            const rawJson = data.rawJson || null;

            // Defensive: if structured is missing but response looks like JSON, parse it client-side
            if (!structured?.gurmukhi && data.response) {
                try {
                    const cleaned = data.response.replace(/^```(?:json)?\s*\n?/i, '').replace(/\n?\s*```$/i, '').trim();
                    if (cleaned.startsWith('{')) {
                        const parsed = JSON.parse(cleaned);
                        if (parsed.gurmukhi) structured = parsed;
                    }
                } catch { /* not JSON, that's fine */ }
            }

            let replyText = '';
            if (structured?.romanized && structured?.english) {
                replyText = structured.romanized + ' · ' + structured.english;
            } else {
                replyText = data.response || 'Something went wrong. Please try again.';
            }
            setMessages(prev => [...prev, { role: 'assistant', text: replyText, structured, rawJson: rawJson || (structured ? JSON.stringify(structured) : null) }]);
        } catch {
            setMessages(prev => [...prev, { role: 'assistant', text: 'Something went wrong. Please try again.', structured: null, rawJson: null }]);
        } finally {
            setIsTyping(false);
            setLoading(false);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); }
    };

    return (
        <div className="flex flex-col h-full bg-white overflow-hidden">
            {!inPopup && usesLeft !== null && (
                <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-4 py-2 flex items-center justify-between flex-shrink-0">
                    <div className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-400"></span>
                        <p className="text-blue-200 text-xs font-medium">Simply Punjabi Tutor</p>
                    </div>
                    <div className="flex items-center gap-1">
                        {[...Array(MAX_FREE_USES)].map((_, i) => (
                            <div key={i} className={`w-2 h-2 rounded-full transition-colors ${i < usesLeft ? 'bg-green-400' : 'bg-white/20'}`} />
                        ))}
                        <span className="text-xs text-blue-200 ml-1">free</span>
                    </div>
                </div>
            )}

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

            <div className="p-3 bg-white border-t border-gray-100 flex-shrink-0">
                {usesLeft === 0 ? (
                    <div className="space-y-2">
                        <p className="text-xs text-gray-500 text-center">You've used your 3 free messages</p>
                        <a href="/key-functions/signup" className="block">
                            <button className="w-full bg-gradient-to-r from-blue-600 to-orange-500 text-white py-2.5 rounded-xl font-bold text-sm shadow-md hover:shadow-lg transition-all hover:scale-[1.02]">
                                Sign Up Free · Unlimited Chat
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


/* ═══════════════════════════════════════════════════════════════════
   Animated counter hook
   ═══════════════════════════════════════════════════════════════════ */
function useCountUp(end, duration = 2000, startOnView = true) {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const started = useRef(false);

    useEffect(() => {
        if (!startOnView) return;
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting && !started.current) {
                started.current = true;
                const startTime = performance.now();
                const animate = (now) => {
                    const elapsed = now - startTime;
                    const progress = Math.min(elapsed / duration, 1);
                    const eased = 1 - Math.pow(1 - progress, 3);
                    setCount(Math.round(eased * end));
                    if (progress < 1) requestAnimationFrame(animate);
                };
                requestAnimationFrame(animate);
            }
        }, { threshold: 0.3 });
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, [end, duration, startOnView]);

    return [count, ref];
}


/* ═══════════════════════════════════════════════════════════════════
   Fade-in-on-scroll wrapper
   ═══════════════════════════════════════════════════════════════════ */
function FadeIn({ children, className = '', delay = 0 }) {
    const ref = useRef(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) setVisible(true);
        }, { threshold: 0.15 });
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);

    return (
        <div
            ref={ref}
            className={className}
            style={{
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(24px)',
                transition: `opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
            }}
        >
            {children}
        </div>
    );
}


/* ═══════════════════════════════════════════════════════════════════
   MAIN PAGE
   ═══════════════════════════════════════════════════════════════════ */
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

    const [chatOpen, setChatOpen] = useState(false);
    const [chatDismissed, setChatDismissed] = useState(false);
    const [openFaq, setOpenFaq] = useState(null);

    useEffect(() => {
        try {
            if (sessionStorage.getItem('sp_chat_shown')) return;
        } catch { }
        const timer = setTimeout(() => {
            setChatOpen(true);
            try { sessionStorage.setItem('sp_chat_shown', '1'); } catch { }
        }, 3000);
        return () => clearTimeout(timer);
    }, []);

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
                {/* Google Fonts — refined pairing */}
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=DM+Sans:ital,wght@0,400;0,500;0,600;0,700&display=swap" rel="stylesheet" />
            </Head>

            {/* Global styles */}
            <style jsx global>{`
                :root {
                    --color-saffron: #E67E22;
                    --color-saffron-light: #FDF2E9;
                    --color-navy: #1B2A4A;
                    --color-navy-light: #2C3E6B;
                    --color-cream: #FDFBF7;
                    --color-warm-gray: #F7F5F2;
                    --font-display: 'DM Serif Display', Georgia, serif;
                    --font-body: 'DM Sans', system-ui, sans-serif;
                }
                body {
                    font-family: var(--font-body);
                    -webkit-font-smoothing: antialiased;
                }
                .font-display {
                    font-family: var(--font-display);
                }
                .text-saffron { color: var(--color-saffron); }
                .bg-saffron { background-color: var(--color-saffron); }
                .bg-cream { background-color: var(--color-cream); }
                .bg-warm-gray { background-color: var(--color-warm-gray); }
                .text-navy { color: var(--color-navy); }
                .bg-navy { background-color: var(--color-navy); }
                .border-saffron { border-color: var(--color-saffron); }

                @keyframes float {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-8px); }
                }
                .animate-float { animation: float 6s ease-in-out infinite; }

                @keyframes shimmer {
                    0% { background-position: -200% 0; }
                    100% { background-position: 200% 0; }
                }
                .animate-shimmer {
                    background: linear-gradient(90deg, transparent 0%, rgba(230,126,34,0.08) 50%, transparent 100%);
                    background-size: 200% 100%;
                    animation: shimmer 3s linear infinite;
                }
            `}</style>

            <div className="min-h-screen" style={{ backgroundColor: 'var(--color-cream)' }}>

                {/* ═══════════════════════════════════════════════════════
                    HERO SECTION — Clean, editorial, confident
                   ═══════════════════════════════════════════════════════ */}
                <section className="relative min-h-screen flex flex-col overflow-hidden">
                    {/* Subtle decorative elements */}
                    <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full opacity-30 -z-10"
                         style={{ background: 'radial-gradient(circle, rgba(230,126,34,0.12) 0%, transparent 70%)', transform: 'translate(30%, -30%)' }} />
                    <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full opacity-20 -z-10"
                         style={{ background: 'radial-gradient(circle, rgba(27,42,74,0.08) 0%, transparent 70%)', transform: 'translate(-30%, 30%)' }} />

                    {/* Gurmukhi watermark — large, faded decorative text */}
                    <div className="absolute top-1/2 right-8 -translate-y-1/2 text-[12rem] lg:text-[18rem] font-bold opacity-[0.025] text-navy select-none pointer-events-none leading-none hidden lg:block"
                         style={{ fontFamily: 'serif' }}>
                        ੴ
                    </div>

                    <div className="flex-1 flex flex-col max-w-7xl mx-auto w-full px-6 sm:px-10 pt-32 sm:pt-28 pb-12">

                        {/* Top bar — word of the day + login */}
                        <div className="flex items-center justify-between mb-16 sm:mb-20">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-1 rounded-full bg-saffron" />
                                <span className="text-xs font-semibold uppercase tracking-[0.15em] text-gray-400">Today's word</span>
                                <span className="text-saffron font-bold text-lg font-display">{currentDay.pa}</span>
                                <span className="text-gray-400 text-sm">({currentDay.pron}, {currentDay.en})</span>
                            </div>
                            <a href="/key-functions/auth" className="hidden sm:flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-navy transition-colors">
                                Log in <FaArrowRight className="text-[10px]" />
                            </a>
                        </div>

                        {/* Hero content — two-column */}
                        <div className="grid lg:grid-cols-2 gap-12 xl:gap-20 items-center flex-1">

                            {/* Logo image — shown first on mobile, right on desktop */}
                            <div className="relative flex items-center justify-center lg:order-last">
                                <img
                                    src="/Website Banner(shadowing)- Simply Punjabi, Ryan.png"
                                    alt="Simply Punjabi"
                                    className="w-full max-w-[520px] drop-shadow-xl relative z-10"
                                />
                                {/* Decorative floating Gurmukhi characters */}
                                <div className="absolute -top-4 -left-4 text-4xl text-saffron opacity-20 animate-float font-display select-none" style={{ animationDelay: '0s' }}>ੳ</div>
                                <div className="absolute -bottom-2 -right-2 text-5xl text-navy opacity-10 animate-float font-display select-none" style={{ animationDelay: '2s' }}>ਅ</div>
                                <div className="absolute top-1/4 -right-6 text-3xl text-saffron opacity-15 animate-float font-display select-none" style={{ animationDelay: '4s' }}>ੲ</div>
                            </div>

                            {/* Headline + CTA */}
                            <div className="max-w-xl lg:order-first">
                                <h1 className="font-display text-navy leading-[1.08] mb-6" style={{ fontSize: 'clamp(2.5rem, 5vw, 4.25rem)' }}>
                                    Learn the Punjabi<br />
                                    <span className="text-saffron">your family speaks</span>
                                </h1>

                                <p className="text-lg text-gray-500 leading-relaxed mb-10 max-w-md">
                                    The only language platform that teaches real family conversations, cultural context, and the respect registers that matter at home.
                                </p>

                                {/* CTA group */}
                                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                                    <a href="/key-functions/signup">
                                        <button className="group flex items-center justify-center gap-3 bg-navy text-white px-8 py-4 rounded-xl font-semibold text-base shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 w-full sm:w-auto">
                                            Start Learning Free
                                            <FaArrowRight className="text-xs group-hover:translate-x-1 transition-transform" />
                                        </button>
                                    </a>
                                    <button
                                        onClick={() => { setChatOpen(true); setChatDismissed(false); }}
                                        className="flex items-center justify-center gap-3 bg-white text-navy border-2 border-gray-200 px-8 py-4 rounded-xl font-semibold text-base hover:border-saffron hover:text-saffron transition-all duration-300 w-full sm:w-auto"
                                    >
                                        <FaRobot className="text-saffron" />
                                        Try AI Tutor
                                    </button>
                                </div>

                            </div>
                        </div>

                        {/* ── COURSE CARDS ────────────────────────────────────── */}
                        <div className="mt-16 pt-12 border-t border-gray-200/60">
                            <div className="flex items-end justify-between mb-8">
                                <div>
                                    <p className="text-xs font-semibold uppercase tracking-[0.15em] text-saffron mb-1">Learning Paths</p>
                                    <h2 className="text-2xl font-display text-navy">Choose where to begin</h2>
                                </div>
                                <span className="text-sm text-gray-400 hidden sm:block">3 courses · All free</span>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                                {[
                                    {
                                        level: "Beginner",
                                        title: "Essential Punjabi",
                                        desc: "Greetings, family vocabulary, basic introductions",
                                        lessons: "5 lessons",
                                        duration: "~2 hrs",
                                        link: "/learning/essential-punjabi",
                                        accent: "#3B82F6",
                                        icon: <FaComments />
                                    },
                                    {
                                        level: "Intermediate",
                                        title: "Speak with Confidence",
                                        desc: "Everyday conversations with family members",
                                        lessons: "6 lessons",
                                        duration: "~3 hrs",
                                        link: "/learning/speak-with-confidence",
                                        accent: "#E67E22",
                                        featured: true,
                                        icon: <FaMicrophone />
                                    },
                                    {
                                        level: "Advanced",
                                        title: "Master Punjabi",
                                        desc: "Fluency, cultural nuance, natural conversation",
                                        lessons: "6 lessons",
                                        duration: "~4 hrs",
                                        link: "/learning/master-punjabi",
                                        accent: "#059669",
                                        icon: <FaAward />
                                    }
                                ].map((course, i) => (
                                    <a key={i} href={course.link} className="block group">
                                        <div className={`relative bg-white rounded-2xl p-6 border ${course.featured ? 'border-2 shadow-lg' : 'border-gray-200 shadow-sm'} hover:shadow-xl transition-all duration-300 hover:-translate-y-1`}
                                             style={course.featured ? { borderColor: course.accent } : {}}>
                                            {course.featured && (
                                                <div className="absolute -top-3 left-5 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-md"
                                                     style={{ backgroundColor: course.accent }}>
                                                    Most Popular
                                                </div>
                                            )}
                                            <div className="flex items-start justify-between mb-4">
                                                <div className="w-11 h-11 rounded-xl flex items-center justify-center text-white text-base"
                                                     style={{ backgroundColor: course.accent }}>
                                                    {course.icon}
                                                </div>
                                                <FaArrowRight className="text-sm mt-1 opacity-0 group-hover:opacity-60 group-hover:translate-x-1 transition-all text-gray-400" />
                                            </div>
                                            <p className="text-[10px] font-bold uppercase tracking-wider mb-2" style={{ color: course.accent }}>{course.level}</p>
                                            <h3 className="font-bold text-navy text-base mb-1">{course.title}</h3>
                                            <p className="text-sm text-gray-500 leading-relaxed mb-4">{course.desc}</p>
                                            <div className="flex items-center gap-3 text-xs text-gray-400 border-t border-gray-100 pt-3">
                                                <span className="flex items-center gap-1"><FaBook className="text-[10px]" />{course.lessons}</span>
                                                <span>·</span>
                                                <span className="flex items-center gap-1"><FaClock className="text-[10px]" />{course.duration}</span>
                                            </div>
                                        </div>
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>


                {/* ═══════════════════════════════════════════════════════
                    PROBLEM / SOLUTION — Refined contrast cards
                   ═══════════════════════════════════════════════════════ */}
                <section className="py-24 sm:py-32 px-6 sm:px-10 bg-white">
                    <div className="max-w-6xl mx-auto">
                        <FadeIn>
                            <div className="max-w-2xl mb-16">
                                <p className="text-xs font-semibold uppercase tracking-[0.15em] text-saffron mb-3">The Problem</p>
                                <h2 className="text-3xl sm:text-4xl font-display text-navy mb-5 leading-tight">
                                    Generic language apps weren't built for you
                                </h2>
                                <p className="text-gray-500 text-lg leading-relaxed">
                                    They teach textbook phrases to tourists. You need to speak with your grandparents, understand cultural nuance, and feel at home in your own language.
                                </p>
                            </div>
                        </FadeIn>

                        <div className="grid md:grid-cols-2 gap-5 max-w-4xl">
                            {[
                                { problem: "Generic apps teach textbook phrases", solution: "We teach real family conversations", icon: <FaComments className="text-xl" />, color: "#3B82F6" },
                                { problem: "No cultural context or respect registers", solution: "Every lesson includes cultural insights", icon: <FaHeart className="text-xl" />, color: "#E67E22" },
                                { problem: "Pronunciation guides don't help", solution: "Native speaker audio on every word", icon: <FaHeadphones className="text-xl" />, color: "#059669" },
                                { problem: "Long, overwhelming lessons", solution: "10-minute lessons that fit your life", icon: <FaClock className="text-xl" />, color: "#8B5CF6" },
                            ].map((item, i) => (
                                <FadeIn key={i} delay={i * 100}>
                                    <div className="bg-warm-gray rounded-2xl p-7 hover:shadow-md transition-all duration-300 group">
                                        <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white mb-5 transition-transform group-hover:scale-105"
                                             style={{ backgroundColor: item.color }}>
                                            {item.icon}
                                        </div>
                                        <p className="text-gray-400 line-through text-sm mb-2">{item.problem}</p>
                                        <p className="text-navy font-semibold text-lg">{item.solution}</p>
                                    </div>
                                </FadeIn>
                            ))}
                        </div>
                    </div>
                </section>


                {/* ═══════════════════════════════════════════════════════
                    THREE TOOLS — Horizontal feature showcase
                   ═══════════════════════════════════════════════════════ */}
                <section className="py-24 sm:py-32 px-6 sm:px-10" style={{ backgroundColor: 'var(--color-cream)' }}>
                    <div className="max-w-6xl mx-auto">
                        <FadeIn>
                            <div className="text-center mb-16">
                                <p className="text-xs font-semibold uppercase tracking-[0.15em] text-saffron mb-3">Platform</p>
                                <h2 className="text-3xl sm:text-4xl font-display text-navy mb-4">Three tools, one goal</h2>
                                <p className="text-gray-500 text-lg max-w-lg mx-auto">Everything you need to go from silent at family dinners to speaking with confidence.</p>
                            </div>
                        </FadeIn>

                        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                            {[
                                {
                                    n: "01",
                                    title: "AI Punjabi Tutor",
                                    desc: "Ask anything in English. Get culturally grounded answers with pronunciation guides and family context.",
                                    icon: <FaRobot className="text-2xl" />,
                                    color: "#8B5CF6"
                                },
                                {
                                    n: "02",
                                    title: "Interactive Lessons",
                                    desc: "Structured bite-sized lessons covering greetings, family words, and everyday phrases with audio.",
                                    icon: <FaGraduationCap className="text-2xl" />,
                                    color: "#3B82F6"
                                },
                                {
                                    n: "03",
                                    title: "Punjabi Dictionary",
                                    desc: "Instant translations with Gurmukhi script, romanised pronunciation, and native speaker audio.",
                                    icon: <FaBookOpen className="text-2xl" />,
                                    color: "#E67E22"
                                },
                            ].map((step, i) => (
                                <FadeIn key={i} delay={i * 120}>
                                    <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 group h-full">
                                        <div className="flex items-center gap-4 mb-6">
                                            <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-white transition-transform group-hover:scale-105"
                                                 style={{ backgroundColor: step.color }}>
                                                {step.icon}
                                            </div>
                                            <span className="text-3xl font-display text-gray-200">{step.n}</span>
                                        </div>
                                        <h3 className="text-xl font-bold text-navy mb-3">{step.title}</h3>
                                        <p className="text-gray-500 leading-relaxed text-sm">{step.desc}</p>
                                    </div>
                                </FadeIn>
                            ))}
                        </div>

                        <FadeIn delay={400}>
                            <div className="text-center mt-14">
                                <a href="/key-functions/signup">
                                    <button className="bg-saffron text-white px-10 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5">
                                        Get Started Free
                                    </button>
                                </a>
                            </div>
                        </FadeIn>
                    </div>
                </section>


                {/* ═══════════════════════════════════════════════════════
                    TESTIMONIALS — Clean editorial cards
                   ═══════════════════════════════════════════════════════ */}
                <section className="py-24 sm:py-32 px-6 sm:px-10 bg-white">
                    <div className="max-w-6xl mx-auto">
                        <FadeIn>
                            <div className="text-center mb-16">
                                <p className="text-xs font-semibold uppercase tracking-[0.15em] text-saffron mb-3">Community</p>
                                <h2 className="text-3xl sm:text-4xl font-display text-navy">What learners are saying</h2>
                            </div>
                        </FadeIn>

                        <div className="grid md:grid-cols-3 gap-6">
                            {[
                                { quote: "I had my first full conversation with my grandmother in Punjabi last week. This platform gave me the tools to connect with her in a way I never thought possible.", name: "Priya S.", location: "Birmingham, UK" },
                                { quote: "Six months ago I couldn't say a single sentence. Now I'm translating for my younger cousins at family gatherings. The bite-sized lessons made it achievable.", name: "Raj M.", location: "Vancouver, Canada" },
                                { quote: "Finally a platform that gets it. The cultural context helped me understand not just what to say, but why. It's helped me feel more connected to my roots.", name: "Simran K.", location: "Wolverhampton, UK" },
                            ].map((t, i) => (
                                <FadeIn key={i} delay={i * 120}>
                                    <div className="bg-warm-gray rounded-2xl p-8 hover:shadow-md transition-all duration-300 h-full flex flex-col">
                                        {/* Star rating */}
                                        <div className="flex gap-1 mb-5">
                                            {[...Array(5)].map((_, j) => (
                                                <FaStar key={j} className="text-saffron text-xs" />
                                            ))}
                                        </div>
                                        <p className="text-navy leading-relaxed text-sm flex-1 mb-6">"{t.quote}"</p>
                                        <div className="flex items-center gap-3 pt-5 border-t border-gray-200/70">
                                            <div className="w-10 h-10 rounded-full bg-navy flex items-center justify-center text-white text-sm font-bold">
                                                {t.name.charAt(0)}
                                            </div>
                                            <div>
                                                <p className="font-bold text-navy text-sm">{t.name}</p>
                                                <p className="text-xs text-gray-400">{t.location}</p>
                                            </div>
                                        </div>
                                    </div>
                                </FadeIn>
                            ))}
                        </div>
                    </div>
                </section>


                {/* ═══════════════════════════════════════════════════════
                    FAQ — Accordion with controlled open state
                   ═══════════════════════════════════════════════════════ */}
                <section className="py-24 sm:py-32 px-6 sm:px-10" style={{ backgroundColor: 'var(--color-cream)' }}>
                    <div className="max-w-3xl mx-auto">
                        <FadeIn>
                            <div className="text-center mb-14">
                                <p className="text-xs font-semibold uppercase tracking-[0.15em] text-saffron mb-3">FAQ</p>
                                <h2 className="text-3xl sm:text-4xl font-display text-navy">Commonly asked questions</h2>
                            </div>
                        </FadeIn>

                        <div className="space-y-3">
                            {[
                                { q: "How to learn Punjabi from English?", a: "Simply Punjabi makes it easy with three tools: interactive lessons designed for English speakers, an AI tutor that answers in English, and a dictionary with romanised pronunciations. Start with Essential Punjabi for complete beginners." },
                                { q: "Is it possible to learn Punjabi online for free?", a: "Yes. Simply Punjabi offers free access to lessons, AI tutor conversations, and the full Punjabi-English dictionary. No credit card required." },
                                { q: "How long does it take to learn Punjabi?", a: "Most learners can have basic family conversations within 4–8 weeks of consistent practice. Our lessons take 10–15 minutes per day." },
                                { q: "Can I learn Punjabi without knowing Gurmukhi script?", a: "Absolutely. Simply Punjabi uses romanised Punjabi alongside Gurmukhi. You can speak immediately using romanisation and learn the script gradually." },
                                { q: "Is Simply Punjabi good for diaspora learners?", a: "Yes, it's specifically designed for second and third-generation learners in the UK, US, Canada, and Australia. Lessons focus on family conversations and cultural context that matter most to heritage learners." },
                            ].map((item, i) => (
                                <FadeIn key={i} delay={i * 60}>
                                    <button
                                        onClick={() => setOpenFaq(openFaq === i ? null : i)}
                                        className="w-full text-left bg-white rounded-xl p-5 border border-gray-200 hover:border-gray-300 transition-all duration-200 group"
                                    >
                                        <div className="flex items-center justify-between">
                                            <h3 className="font-semibold text-navy pr-4 text-sm sm:text-base">{item.q}</h3>
                                            <span className={`text-saffron text-lg flex-shrink-0 transition-transform duration-300 ${openFaq === i ? 'rotate-45' : ''}`}>+</span>
                                        </div>
                                        <div className={`overflow-hidden transition-all duration-300 ${openFaq === i ? 'max-h-40 mt-3 opacity-100' : 'max-h-0 opacity-0'}`}>
                                            <p className="text-gray-500 leading-relaxed text-sm">{item.a}</p>
                                        </div>
                                    </button>
                                </FadeIn>
                            ))}
                        </div>
                    </div>
                </section>


                {/* ═══════════════════════════════════════════════════════
                    FINAL CTA — Bold, clean, confident
                   ═══════════════════════════════════════════════════════ */}
                <section className="py-28 sm:py-36 px-6 sm:px-10 bg-navy text-white relative overflow-hidden">
                    {/* Decorative blobs */}
                    <div className="absolute top-0 left-0 w-96 h-96 rounded-full opacity-10"
                         style={{ background: 'radial-gradient(circle, rgba(230,126,34,0.5) 0%, transparent 70%)', transform: 'translate(-40%, -40%)' }} />
                    <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full opacity-10"
                         style={{ background: 'radial-gradient(circle, rgba(230,126,34,0.4) 0%, transparent 70%)', transform: 'translate(40%, 40%)' }} />

                    {/* Gurmukhi watermark */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[16rem] font-bold opacity-[0.03] text-white select-none pointer-events-none leading-none"
                         style={{ fontFamily: 'serif' }}>
                        ਪੰ
                    </div>

                    <FadeIn>
                        <div className="max-w-3xl mx-auto text-center relative z-10">
                            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display leading-tight mb-6">
                                Start Speaking Punjabi<br />
                                <span className="text-saffron">with Your Family Today</span>
                            </h2>
                            <p className="text-lg text-gray-300 mb-10 max-w-xl mx-auto leading-relaxed">
                                Join learners across the UK, US, Canada, and Australia who are reconnecting with their heritage through language.
                            </p>
                            <a href="/key-functions/signup">
                                <button className="group bg-saffron text-white px-12 py-5 rounded-xl text-lg font-semibold shadow-2xl hover:shadow-3xl transition-all duration-300 hover:-translate-y-0.5 mb-8">
                                    <span className="flex items-center gap-3">
                                        Get Started Free
                                        <FaArrowRight className="text-sm group-hover:translate-x-1 transition-transform" />
                                    </span>
                                </button>
                            </a>
                        </div>
                    </FadeIn>
                </section>

                {/* ── Minimal footer ──────────────────────────────────── */}
                <footer className="py-8 px-6 sm:px-10 bg-navy border-t border-white/10">
                    <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-500">
                        <span>&copy; {new Date().getFullYear()} Simply Punjabi</span>
                        <div className="flex items-center gap-6">
                            <a href="/key-functions/signup" className="hover:text-white transition-colors">Get Started</a>
                            <a href="/key-functions/auth" className="hover:text-white transition-colors">Log In</a>
                        </div>
                    </div>
                </footer>
            </div>


            {/* ═══════════════════════════════════════════════════════
                FLOATING CHAT POPUP (preserved from original)
               ═══════════════════════════════════════════════════════ */}
            <div
                className={`fixed bottom-6 right-6 z-50 w-[360px] max-w-[calc(100vw-2rem)] transition-all duration-500 ease-out ${
                    chatOpen && !chatDismissed
                        ? 'translate-y-0 opacity-100 pointer-events-auto'
                        : 'translate-y-8 opacity-0 pointer-events-none'
                }`}
            >
                <div className="rounded-2xl shadow-2xl overflow-hidden border border-gray-200" style={{ height: '480px', display: 'flex', flexDirection: 'column' }}>
                    <div className="px-4 py-3 flex items-center gap-3 flex-shrink-0 text-white" style={{ backgroundColor: 'var(--color-navy)' }}>
                        <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center">
                            <FaRobot className="text-white text-xs" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-white font-bold text-sm leading-tight">Simply Punjabi Tutor</p>
                            <div className="flex items-center gap-1.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-green-400"></span>
                                <p className="text-gray-300 text-xs">Online · 3 free messages</p>
                            </div>
                        </div>
                        <button
                            onClick={() => { setChatOpen(false); setChatDismissed(true); }}
                            className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/25 flex items-center justify-center text-white transition-colors flex-shrink-0"
                            aria-label="Close chat"
                        >
                            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                                <path d="M1 1l8 8M9 1L1 9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
                            </svg>
                        </button>
                    </div>
                    <div className="flex-1 min-h-0">
                        <ChatSpotlight inPopup />
                    </div>
                </div>
            </div>

            {/* Floating bubble */}
            <button
                onClick={() => { setChatOpen(true); setChatDismissed(false); }}
                className={`fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 ${
                    chatOpen && !chatDismissed ? 'opacity-0 pointer-events-none scale-75' : 'opacity-100 scale-100'
                }`}
                style={{ backgroundColor: 'var(--color-navy)' }}
                aria-label="Open AI tutor"
            >
                <FaComments className="text-white text-xl" />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white animate-pulse" />
            </button>
        </>
    );
}