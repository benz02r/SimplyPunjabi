"use client";

import { useRouter } from "next/navigation";
import { Home, ArrowLeft, Compass, BookOpen, GraduationCap, MessageCircle, Search } from "lucide-react";
import { useEffect, useRef, useState } from "react";

/* ═══════════════════════════════════════════════════════════════════
   Fade-in-on-scroll wrapper (matches landing page)
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

export default function NotFound() {
    const router = useRouter();

    return (
        <>
            <style jsx global>{`
                :root {
                    --color-saffron: #E67E22;
                    --color-navy: #1B2A4A;
                    --color-cream: #FDFBF7;
                    --font-display: 'DM Serif Display', Georgia, serif;
                    --font-body: 'DM Sans', system-ui, sans-serif;
                }
                body { font-family: var(--font-body); -webkit-font-smoothing: antialiased; }
                .font-display { font-family: var(--font-display); }
                .text-saffron { color: var(--color-saffron); }
                .bg-saffron { background-color: var(--color-saffron); }
                .text-navy { color: var(--color-navy); }
                .bg-navy { background-color: var(--color-navy); }
                @keyframes float {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-8px); }
                }
                .animate-float { animation: float 6s ease-in-out infinite; }
            `}</style>

            <div className="min-h-screen flex flex-col items-center justify-center px-6 pt-32 pb-16 relative overflow-hidden" style={{ backgroundColor: 'var(--color-cream)' }}>

                {/* Decorative radial gradients */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full opacity-25 -z-10"
                     style={{ background: 'radial-gradient(circle, rgba(230,126,34,0.12) 0%, transparent 70%)', transform: 'translate(30%, -30%)' }} />
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full opacity-15 -z-10"
                     style={{ background: 'radial-gradient(circle, rgba(27,42,74,0.08) 0%, transparent 70%)', transform: 'translate(-30%, 30%)' }} />

                {/* Gurmukhi watermark */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[16rem] lg:text-[22rem] font-bold opacity-[0.025] text-navy select-none pointer-events-none leading-none"
                     style={{ fontFamily: 'serif' }}>
                    ਖੋਜ
                </div>

                {/* Floating Gurmukhi characters */}
                <div className="absolute top-20 left-10 text-4xl text-saffron opacity-15 animate-float font-display select-none hidden lg:block" style={{ animationDelay: '0s' }}>ੳ</div>
                <div className="absolute bottom-32 right-16 text-5xl text-navy opacity-10 animate-float font-display select-none hidden lg:block" style={{ animationDelay: '2s' }}>ਅ</div>
                <div className="absolute top-1/3 right-10 text-3xl text-saffron opacity-10 animate-float font-display select-none hidden lg:block" style={{ animationDelay: '4s' }}>ੲ</div>

                <div className="max-w-lg w-full relative z-10">
                    <FadeIn>
                        {/* 404 number */}
                        <div className="text-center mb-2">
                            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-saffron mb-4">Page Not Found</p>
                            <h1 className="font-display text-navy leading-none mb-3" style={{ fontSize: 'clamp(5rem, 12vw, 8rem)' }}>
                                4<span className="text-saffron">0</span>4
                            </h1>
                        </div>
                    </FadeIn>

                    <FadeIn delay={100}>
                        <div className="text-center mb-10">
                            <h2 className="text-xl sm:text-2xl font-display text-navy mb-3">
                                This page doesn't exist yet
                            </h2>
                            <p className="text-gray-500 leading-relaxed max-w-sm mx-auto">
                                The lesson or feature you're looking for is still being developed. In the meantime, explore what's already available.
                            </p>
                        </div>
                    </FadeIn>

                    {/* Action buttons */}
                    <FadeIn delay={200}>
                        <div className="space-y-3 mb-10">
                            <button
                                onClick={() => router.push('/learning/essential-punjabi')}
                                className="group w-full flex items-center justify-center gap-3 bg-navy text-white py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5"
                            >
                                <GraduationCap className="w-5 h-5" />
                                Go to Lessons
                            </button>

                            <button
                                onClick={() => router.back()}
                                className="w-full flex items-center justify-center gap-3 bg-white text-navy border-2 border-gray-200 py-4 rounded-xl font-semibold hover:border-saffron hover:text-saffron transition-all duration-300"
                            >
                                <ArrowLeft className="w-5 h-5" />
                                Go Back
                            </button>
                        </div>
                    </FadeIn>

                    {/* Quick links */}
                    <FadeIn delay={300}>
                        <div className="grid grid-cols-3 gap-3">
                            {[
                                { label: "Home", icon: <Home className="w-5 h-5" />, href: "/" },
                                { label: "AI Tutor", icon: <MessageCircle className="w-5 h-5" />, href: "/learning/punjabi-chat" },
                                { label: "Dictionary", icon: <Search className="w-5 h-5" />, href: "/learning/dictionary" },
                            ].map((link, i) => (
                                <button
                                    key={i}
                                    onClick={() => router.push(link.href)}
                                    className="bg-white rounded-2xl p-4 shadow-sm border border-gray-200 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 flex flex-col items-center gap-2 group"
                                >
                                    <div className="text-gray-400 group-hover:text-saffron transition-colors">
                                        {link.icon}
                                    </div>
                                    <span className="text-xs font-medium text-gray-500 group-hover:text-navy transition-colors">{link.label}</span>
                                </button>
                            ))}
                        </div>
                    </FadeIn>

                    {/* Fun fact */}
                    <FadeIn delay={400}>
                        <div className="mt-10 text-center">
                            <div className="inline-flex items-center gap-2 bg-white rounded-full px-5 py-2.5 shadow-sm border border-gray-100">
                                <BookOpen className="w-4 h-4 text-saffron" />
                                <p className="text-xs text-gray-400">
                                    <span className="font-display text-navy text-sm mr-1">ਖੋਜ</span>
                                    (khoj) means "search" in Punjabi
                                </p>
                            </div>
                        </div>
                    </FadeIn>
                </div>
            </div>
        </>
    );
}