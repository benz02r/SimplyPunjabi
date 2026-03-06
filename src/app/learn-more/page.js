"use client";

import { useState, useEffect, useRef } from 'react';
import { Heart, Users, Globe, Target, Headphones, MessageCircle, Shield, ArrowRight } from "lucide-react";

/* ═══════════════════════════════════════════════════════════════════
   Fade-in-on-scroll wrapper (same as landing page)
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
   ABOUT PAGE
   ═══════════════════════════════════════════════════════════════════ */
export default function About() {
    return (
        <>
            {/* Shared design-system fonts (same as landing page) */}
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
                body { font-family: var(--font-body); -webkit-font-smoothing: antialiased; }
                .font-display { font-family: var(--font-display); }
                .text-saffron { color: var(--color-saffron); }
                .bg-saffron { background-color: var(--color-saffron); }
                .bg-cream { background-color: var(--color-cream); }
                .bg-warm-gray { background-color: var(--color-warm-gray); }
                .text-navy { color: var(--color-navy); }
                .bg-navy { background-color: var(--color-navy); }
                @keyframes float {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-8px); }
                }
                .animate-float { animation: float 6s ease-in-out infinite; }
            `}</style>

            <div className="min-h-screen" style={{ backgroundColor: 'var(--color-cream)' }}>

                {/* ═══════════════════════════════════════════════════════
                    HERO
                   ═══════════════════════════════════════════════════════ */}
                <section className="relative px-6 sm:px-10 pt-32 pb-24 overflow-hidden" style={{ backgroundColor: 'var(--color-cream)' }}>
                    {/* Decorative elements */}
                    <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full opacity-30 -z-10"
                         style={{ background: 'radial-gradient(circle, rgba(230,126,34,0.12) 0%, transparent 70%)', transform: 'translate(30%, -30%)' }} />
                    <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full opacity-20 -z-10"
                         style={{ background: 'radial-gradient(circle, rgba(27,42,74,0.08) 0%, transparent 70%)', transform: 'translate(-30%, 30%)' }} />

                    {/* Gurmukhi watermark */}
                    <div className="absolute top-1/2 right-8 -translate-y-1/2 text-[14rem] lg:text-[18rem] font-bold opacity-[0.025] select-none pointer-events-none leading-none hidden lg:block"
                         style={{ fontFamily: 'serif', color: 'var(--color-navy)' }}>
                        ੴ
                    </div>

                    <div className="max-w-6xl mx-auto">
                        <div className="flex justify-center mb-10">
                            <img
                                src="/Website Banner(shadowing)- Simply Punjabi, Ryan.png"
                                alt="Simply Punjabi"
                                className="w-full max-w-[280px] drop-shadow-xl"
                            />
                        </div>

                        <FadeIn>
                            <div className="text-center max-w-3xl mx-auto">
                                <p className="text-xs font-semibold uppercase tracking-[0.15em] text-saffron mb-4">Our Story</p>
                                <h1 className="font-display text-navy leading-[1.1] mb-6" style={{ fontSize: 'clamp(2.25rem, 5vw, 3.75rem)' }}>
                                    Reconnect with<br />
                                    <span className="text-saffron">your roots</span>
                                </h1>
                                <p className="text-lg text-gray-500 leading-relaxed max-w-2xl mx-auto">
                                    The language platform built specifically for second and third-generation speakers who want to speak Punjabi with their families.
                                </p>
                            </div>
                        </FadeIn>
                    </div>
                </section>


                {/* ═══════════════════════════════════════════════════════
                    THE GAP — Why Simply Punjabi
                   ═══════════════════════════════════════════════════════ */}
                <section className="py-20 sm:py-28 px-6 sm:px-10 bg-white">
                    <div className="max-w-3xl mx-auto">
                        <FadeIn>
                            <div className="text-center">
                                <p className="text-xs font-semibold uppercase tracking-[0.15em] text-saffron mb-3">The Gap</p>
                                <h2 className="text-3xl sm:text-4xl font-display text-navy mb-8">Why Simply Punjabi?</h2>
                            </div>
                        </FadeIn>
                        <FadeIn delay={100}>
                            <p className="text-lg text-gray-500 leading-relaxed mb-6 text-center">
                                Most apps teach textbook vocabulary you will never use. They often mix Punjabi with Hindi or focus on travel scenarios like booking hotels.
                            </p>
                        </FadeIn>
                        <FadeIn delay={200}>
                            <div className="bg-warm-gray rounded-2xl p-8 border-l-4" style={{ borderColor: 'var(--color-saffron)' }}>
                                <p className="text-lg font-medium text-navy leading-relaxed">
                                    We focus on the conversations that matter: talking to your grandparents, understanding family gatherings, and preserving your heritage.
                                </p>
                            </div>
                        </FadeIn>
                    </div>
                </section>


                {/* ═══════════════════════════════════════════════════════
                    FEATURES — Three pillars
                   ═══════════════════════════════════════════════════════ */}
                <section className="py-20 sm:py-28 px-6 sm:px-10" style={{ backgroundColor: 'var(--color-cream)' }}>
                    <div className="max-w-6xl mx-auto">
                        <FadeIn>
                            <div className="text-center mb-14">
                                <p className="text-xs font-semibold uppercase tracking-[0.15em] text-saffron mb-3">What We Offer</p>
                                <h2 className="text-3xl sm:text-4xl font-display text-navy">Built for how you actually learn</h2>
                            </div>
                        </FadeIn>

                        <div className="grid md:grid-cols-3 gap-6">
                            {[
                                {
                                    icon: <MessageCircle className="w-6 h-6" />,
                                    title: "Family Conversations",
                                    description: "Learn phrases for real life from sharing meals to discussing traditions with elders.",
                                    color: "#3B82F6"
                                },
                                {
                                    icon: <Headphones className="w-6 h-6" />,
                                    title: "Authentic Audio",
                                    description: "Google Cloud powered native pronunciation so you sound like your family, not a textbook.",
                                    color: "#E67E22"
                                },
                                {
                                    icon: <Target className="w-6 h-6" />,
                                    title: "Structured Learning",
                                    description: "An organised path from total beginner to confident speaker, tailored for diaspora learners.",
                                    color: "#059669"
                                },
                            ].map((feature, i) => (
                                <FadeIn key={i} delay={i * 120}>
                                    <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 group h-full">
                                        <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-white mb-6 transition-transform group-hover:scale-105"
                                             style={{ backgroundColor: feature.color }}>
                                            {feature.icon}
                                        </div>
                                        <h3 className="text-xl font-bold text-navy mb-3">{feature.title}</h3>
                                        <p className="text-gray-500 text-sm leading-relaxed">{feature.description}</p>
                                    </div>
                                </FadeIn>
                            ))}
                        </div>
                    </div>
                </section>


                {/* ═══════════════════════════════════════════════════════
                    FOUNDER'S NOTE — Personal, editorial
                   ═══════════════════════════════════════════════════════ */}
                <section className="py-20 sm:py-28 px-6 sm:px-10 bg-white">
                    <div className="max-w-6xl mx-auto">
                        <FadeIn>
                            <div className="grid md:grid-cols-[1fr_2fr] gap-12 items-center max-w-4xl mx-auto">
                                {/* Left — decorative quote mark + label */}
                                <div className="text-center md:text-right">
                                    <div className="text-[8rem] leading-none font-display text-saffron opacity-20 select-none">&ldquo;</div>
                                    <p className="text-xs font-semibold uppercase tracking-[0.15em] text-saffron -mt-10">From the Founder</p>
                                </div>

                                {/* Right — note content */}
                                <div className="bg-warm-gray rounded-2xl p-10">
                                    <p className="text-navy leading-relaxed mb-6 text-base">
                                        As a second-generation speaker in the UK, I grew up understanding Punjabi but lacked the confidence to speak it. I built this platform because the tools I needed didn&apos;t exist.
                                    </p>
                                    <p className="text-navy leading-relaxed mb-8 text-base">
                                        Simply Punjabi is designed to ensure our language and connection to our roots stay alive for the next generation.
                                    </p>
                                    <div className="flex items-center gap-4 pt-6 border-t border-gray-200/70">
                                        <div className="w-11 h-11 rounded-full flex items-center justify-center text-white text-sm font-bold" style={{ backgroundColor: 'var(--color-navy)' }}>
                                            R
                                        </div>
                                        <div>
                                            <p className="font-bold text-navy">Ryan</p>
                                            <p className="text-xs text-gray-400">Founder, Simply Punjabi</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </FadeIn>
                    </div>
                </section>


                {/* ═══════════════════════════════════════════════════════
                    WHO THIS IS FOR — Clean grid
                   ═══════════════════════════════════════════════════════ */}
                <section className="py-20 sm:py-28 px-6 sm:px-10" style={{ backgroundColor: 'var(--color-cream)' }}>
                    <div className="max-w-4xl mx-auto">
                        <FadeIn>
                            <div className="text-center mb-14">
                                <p className="text-xs font-semibold uppercase tracking-[0.15em] text-saffron mb-3">Our Learners</p>
                                <h2 className="text-3xl sm:text-4xl font-display text-navy">Who this is for</h2>
                            </div>
                        </FadeIn>

                        <div className="grid md:grid-cols-2 gap-4">
                            {[
                                { icon: <Users className="w-5 h-5" />, text: "Punjabi diaspora in the UK, US, Canada, or Australia" },
                                { icon: <Heart className="w-5 h-5" />, text: "Those wanting better bonds with parents and grandparents" },
                                { icon: <Globe className="w-5 h-5" />, text: "Learners who understand the basics but struggle to speak" },
                                { icon: <Shield className="w-5 h-5" />, text: "Anyone committed to preserving their cultural identity" },
                            ].map((item, i) => (
                                <FadeIn key={i} delay={i * 80}>
                                    <div className="flex items-center gap-4 p-5 bg-white border border-gray-200 rounded-xl hover:shadow-md hover:border-gray-300 transition-all duration-300 group">
                                        <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 text-white transition-transform group-hover:scale-105"
                                             style={{ backgroundColor: 'var(--color-navy)' }}>
                                            {item.icon}
                                        </div>
                                        <p className="text-navy font-medium text-sm">{item.text}</p>
                                    </div>
                                </FadeIn>
                            ))}
                        </div>
                    </div>
                </section>


                {/* ═══════════════════════════════════════════════════════
                    FINAL CTA
                   ═══════════════════════════════════════════════════════ */}
                <section className="py-28 sm:py-36 px-6 sm:px-10 text-white relative overflow-hidden" style={{ backgroundColor: 'var(--color-navy)' }}>
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
                            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-saffron mb-4">Get Started</p>
                            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display leading-tight mb-6">
                                Start Your Journey<br />
                                <span className="text-saffron">Today</span>
                            </h2>
                            <p className="text-lg text-gray-300 mb-10 max-w-xl mx-auto leading-relaxed">
                                Join our Beta for free and start connecting with your family through language.
                            </p>
                            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
                                <a href="/key-functions/signup">
                                    <button className="group flex items-center justify-center gap-3 text-white px-10 py-4 rounded-xl text-lg font-semibold shadow-2xl hover:shadow-3xl transition-all duration-300 hover:-translate-y-0.5"
                                            style={{ backgroundColor: 'var(--color-saffron)' }}>
                                        Get Started Free
                                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </button>
                                </a>
                                <a href="/lessons/lesson2/1">
                                    <button className="flex items-center justify-center gap-3 border-2 border-white/30 text-white px-10 py-4 rounded-xl text-lg font-semibold hover:bg-white/10 transition-all duration-300">
                                        Try a Lesson
                                    </button>
                                </a>
                            </div>
                            <p className="text-sm text-gray-400">
                                Beta free · Then £4.99/month · Cancel anytime
                            </p>
                        </div>
                    </FadeIn>
                </section>


                {/* ── Minimal footer ──────────────────────────────────── */}
                <footer className="py-8 px-6 sm:px-10 border-t border-white/10" style={{ backgroundColor: 'var(--color-navy)' }}>
                    <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-500">
                        <span>&copy; {new Date().getFullYear()} Simply Punjabi</span>
                        <div className="flex items-center gap-6">
                            <a href="/key-functions/signup" className="hover:text-white transition-colors">Get Started</a>
                            <a href="/key-functions/auth" className="hover:text-white transition-colors">Log In</a>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}