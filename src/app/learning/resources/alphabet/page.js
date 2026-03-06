"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { ArrowLeft, Volume2, Book, CheckCircle, Play, Sparkles, Info } from "lucide-react";

/* Fade-in-on-scroll */
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

export default function GurmukhiAlphabet() {
    const router = useRouter();
    const [selectedLetter, setSelectedLetter] = useState(null);
    const [playingAudio, setPlayingAudio] = useState(null);

    const alphabet = [
        { letter: "ੳ", transliteration: "Ou", english: "oorhaa", audio: "/audio/punjabi/oorhaa.mp3" },
        { letter: "ਅ", transliteration: "Aa", english: "airhaa", audio: "/audio/punjabi/airhaa.mp3" },
        { letter: "ੲ", transliteration: "Ie", english: "eerhee", audio: "/audio/punjabi/eerhee.mp3" },
        { letter: "ਸ", transliteration: "Sa", english: "sassaa", audio: "/audio/punjabi/sassaa.mp3" },
        { letter: "ਹ", transliteration: "Ha", english: "haahaa", audio: "/audio/punjabi/haahaa.mp3" },
        { letter: "ਕ", transliteration: "Ka", english: "kakkaa", audio: "/audio/punjabi/kakkaa.mp3" },
        { letter: "ਖ", transliteration: "Kha", english: "khakhkhaa", audio: "/audio/punjabi/khakhkhaa.mp3" },
        { letter: "ਗ", transliteration: "Ga", english: "gaggaa", audio: "/audio/punjabi/gaggaa.mp3" },
        { letter: "ਘ", transliteration: "Gha", english: "ghaggaa", audio: "/audio/punjabi/ghaggaa.mp3" },
        { letter: "ਙ", transliteration: "Nga", english: "nganngaa", audio: "/audio/punjabi/nganngaa.mp3" },
        { letter: "ਚ", transliteration: "Cha", english: "chachaa", audio: "/audio/punjabi/chachaa.mp3" },
        { letter: "ਛ", transliteration: "Chha", english: "chhachhaa", audio: "/audio/punjabi/chhachhaa.mp3" },
        { letter: "ਜ", transliteration: "Ja", english: "jajjaa", audio: "/audio/punjabi/jajjaa.mp3" },
        { letter: "ਝ", transliteration: "Jha", english: "jhajjaa", audio: "/audio/punjabi/jhajjaa.mp3" },
        { letter: "ਟ", transliteration: "Ta", english: "tainkaa", audio: "/audio/punjabi/tainkaa.mp3" },
        { letter: "ਠ", transliteration: "Tha", english: "thathaa", audio: "/audio/punjabi/thathaa.mp3" },
        { letter: "ਡ", transliteration: "Da", english: "daddaa", audio: "/audio/punjabi/daddaa.mp3" },
        { letter: "ਢ", transliteration: "Dha", english: "dhaddaa", audio: "/audio/punjabi/dhaddaa.mp3" },
        { letter: "ਣ", transliteration: "Na", english: "nhaanhaa", audio: "/audio/punjabi/nhaanhaa.mp3" },
        { letter: "ਤ", transliteration: "Ta", english: "tattaa", audio: "/audio/punjabi/tattaa.mp3" },
        { letter: "ਥ", transliteration: "Tha", english: "thaththaa", audio: "/audio/punjabi/thaththaa.mp3" },
        { letter: "ਦ", transliteration: "Da", english: "daddaa", audio: "/audio/punjabi/daddaa2.mp3" },
        { letter: "ਧ", transliteration: "Dha", english: "dhaddaa", audio: "/audio/punjabi/dhaddaa2.mp3" },
        { letter: "ਨ", transliteration: "Na", english: "nannaa", audio: "/audio/punjabi/nannaa.mp3" },
        { letter: "ਪ", transliteration: "Pa", english: "pappaa", audio: "/audio/punjabi/pappaa.mp3" },
        { letter: "ਫ", transliteration: "Pha", english: "phaphphaa", audio: "/audio/punjabi/phaphphaa.mp3" },
        { letter: "ਬ", transliteration: "Ba", english: "babbaa", audio: "/audio/punjabi/babbaa.mp3" },
        { letter: "ਭ", transliteration: "Bha", english: "bhabbaa", audio: "/audio/punjabi/bhabbaa.mp3" },
        { letter: "ਮ", transliteration: "Ma", english: "mammaa", audio: "/audio/punjabi/mammaa.mp3" },
        { letter: "ਯ", transliteration: "Ya", english: "yayyaa", audio: "/audio/punjabi/yayyaa.mp3" },
        { letter: "ਰ", transliteration: "Ra", english: "raaraa", audio: "/audio/punjabi/raaraa.mp3" },
        { letter: "ਲ", transliteration: "La", english: "lallaa", audio: "/audio/punjabi/lallaa.mp3" },
        { letter: "ਵ", transliteration: "Va", english: "vavvaa", audio: "/audio/punjabi/vavvaa.mp3" },
        { letter: "ੜ", transliteration: "Ra", english: "rhaarhaa", audio: "/audio/punjabi/rhaarhaa.mp3" }
    ];

    const playAudio = (char, index) => {
        setSelectedLetter(index);
        setPlayingAudio(index);

        const audio = new Audio(char.audio);
        audio.play().catch(err => {
            console.log("Audio playback failed:", err);
        });

        audio.onended = () => setPlayingAudio(null);
        audio.onerror = () => {
            setPlayingAudio(null);
            console.error("Error loading audio:", char.audio);
        };
    };

    return (
        <>
            <style jsx global>{`
                :root {
                    --color-saffron: #E67E22;
                    --color-navy: #1B2A4A;
                    --color-cream: #FDFBF7;
                    --color-warm-gray: #F7F5F2;
                    --font-display: 'DM Serif Display', Georgia, serif;
                    --font-body: 'DM Sans', system-ui, sans-serif;
                }
                body { font-family: var(--font-body); -webkit-font-smoothing: antialiased; }
                .font-display { font-family: var(--font-display); }
                .text-saffron { color: var(--color-saffron); }
                .text-navy { color: var(--color-navy); }
                .bg-navy { background-color: var(--color-navy); }
            `}</style>

            <div className="min-h-screen px-6 sm:px-10 pt-28 pb-16" style={{ backgroundColor: 'var(--color-cream)' }}>
                <div className="max-w-6xl mx-auto">

                    {/* Back Button */}
                    <button
                        onClick={() => router.push("/learning/resources")}
                        className="mb-6 flex items-center gap-2 text-gray-400 hover:text-navy font-medium text-sm transition-colors group"
                    >
                        <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                        <span>Back to Resources</span>
                    </button>

                    {/* Header */}
                    <div className="rounded-2xl mb-8 relative overflow-hidden" style={{ backgroundColor: 'var(--color-navy)' }}>
                        <div className="absolute top-0 right-0 w-72 h-72 rounded-full opacity-10"
                             style={{ background: 'radial-gradient(circle, rgba(230,126,34,0.6) 0%, transparent 70%)', transform: 'translate(30%, -30%)' }} />

                        <div className="absolute top-1/2 right-8 -translate-y-1/2 text-[8rem] font-bold opacity-[0.04] text-white select-none pointer-events-none leading-none"
                             style={{ fontFamily: 'serif' }}>
                            ੴ
                        </div>

                        <div className="relative z-10 px-8 sm:px-12 py-10">
                            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-saffron mb-3">Reference Guide</p>
                            <h1 className="text-3xl sm:text-4xl font-display text-white mb-2">
                                Gurmukhi Alphabet
                            </h1>
                            <p className="text-gray-400 text-base">
                                Click any letter to hear authentic Punjabi pronunciation.
                            </p>
                        </div>
                    </div>

                    {/* Quality Badge */}
                    <div className="bg-white border-l-4 p-4 rounded-r-xl mb-6 shadow-sm" style={{ borderColor: '#059669' }}>
                        <div className="flex items-center gap-3">
                            <CheckCircle size={18} className="flex-shrink-0" style={{ color: '#059669' }} />
                            <div>
                                <p className="text-sm font-semibold text-navy">Authentic Punjabi Pronunciation</p>
                                <p className="text-xs text-gray-400 mt-0.5">Powered by Google Cloud Text-to-Speech with native Punjabi voices</p>
                            </div>
                        </div>
                    </div>

                    {/* How to Use */}
                    <div className="bg-white rounded-2xl p-6 mb-8 border border-gray-200 shadow-sm">
                        <div className="flex items-start gap-4">
                            <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 text-white"
                                 style={{ backgroundColor: 'var(--color-saffron)' }}>
                                <Info size={18} />
                            </div>
                            <div>
                                <h3 className="font-bold text-navy mb-3 text-sm">How to Use This Guide</h3>
                                <div className="space-y-2">
                                    {[
                                        "Click on any letter card to hear its authentic pronunciation",
                                        "Pay attention to the transliteration (how it sounds in English)",
                                        "Practice writing each letter while saying it out loud"
                                    ].map((step, i) => (
                                        <div key={i} className="flex items-start gap-2.5">
                                            <span className="w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0 text-[10px] font-bold text-white mt-0.5"
                                                  style={{ backgroundColor: 'var(--color-saffron)' }}>
                                                {i + 1}
                                            </span>
                                            <p className="text-sm text-gray-500 leading-relaxed">{step}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Alphabet Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 mb-12">
                        {alphabet.map((char, index) => (
                            <button
                                key={index}
                                onClick={() => playAudio(char, index)}
                                className={`relative p-5 bg-white rounded-xl border transition-all duration-200 group ${
                                    playingAudio === index
                                        ? 'shadow-lg -translate-y-1'
                                        : selectedLetter === index
                                            ? 'shadow-md'
                                            : 'shadow-sm hover:shadow-md hover:-translate-y-0.5'
                                }`}
                                style={{
                                    borderColor: playingAudio === index
                                        ? 'var(--color-saffron)'
                                        : selectedLetter === index
                                            ? 'var(--color-navy)'
                                            : '#e5e7eb'
                                }}
                            >
                                {/* Audio Playing Indicator */}
                                {playingAudio === index && (
                                    <div className="absolute top-2 right-2">
                                        <div className="w-6 h-6 rounded-md flex items-center justify-center animate-pulse"
                                             style={{ backgroundColor: 'var(--color-saffron)' }}>
                                            <Volume2 size={12} className="text-white" />
                                        </div>
                                    </div>
                                )}

                                {/* Letter */}
                                <div className="text-4xl font-bold text-navy mb-2 text-center">
                                    {char.letter}
                                </div>

                                {/* Transliteration */}
                                <div className="text-center">
                                    <p className="text-sm font-bold text-saffron mb-0.5">
                                        {char.transliteration}
                                    </p>
                                    <p className="text-[10px] text-gray-400 capitalize">
                                        {char.english}
                                    </p>
                                </div>

                                {/* Hover Indicator */}
                                <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <div className="text-white text-[10px] px-2 py-0.5 rounded-md flex items-center gap-1"
                                         style={{ backgroundColor: 'var(--color-navy)' }}>
                                        <Play size={8} />
                                        <span>Play</span>
                                    </div>
                                </div>
                            </button>
                        ))}
                    </div>

                    {/* Practice Tips */}
                    <FadeIn>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                            {[
                                { icon: <Book size={20} />, title: "Daily Practice", description: "Review 5 to 10 letters each day to build familiarity", color: "#3B82F6" },
                                { icon: <Sparkles size={20} />, title: "Write It Down", description: "Practice writing each letter multiple times", color: "#059669" },
                                { icon: <Volume2 size={20} />, title: "Listen and Repeat", description: "Say each letter out loud as you hear it", color: "#E67E22" },
                            ].map((tip, i) => (
                                <div key={i} className="bg-white rounded-2xl shadow-sm border border-gray-200 p-7 hover:shadow-md hover:border-gray-300 transition-all duration-300 group">
                                    <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white mb-4 transition-transform group-hover:scale-105"
                                         style={{ backgroundColor: tip.color }}>
                                        {tip.icon}
                                    </div>
                                    <h3 className="text-base font-bold text-navy mb-1.5">{tip.title}</h3>
                                    <p className="text-sm text-gray-500 leading-relaxed">{tip.description}</p>
                                </div>
                            ))}
                        </div>
                    </FadeIn>
                </div>
            </div>
        </>
    );
}