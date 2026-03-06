"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { FaBookOpen, FaComments, FaMicrophone, FaAward, FaArrowLeft, FaStar, FaBook, FaArrowRight, FaCheckCircle } from "react-icons/fa";

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

export default function LearningHub() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        async function fetchUser() {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) {
                router.push("/key-functions/auth");
            } else {
                setUser(user);
            }
            setLoading(false);
        }
        fetchUser();
    }, [router]);

    if (loading) {
        return (
            <>
                <style jsx global>{`
                    :root {
                        --color-navy: #1B2A4A;
                        --color-cream: #FDFBF7;
                        --font-body: 'DM Sans', system-ui, sans-serif;
                    }
                    body { font-family: var(--font-body); -webkit-font-smoothing: antialiased; }
                `}</style>
                <div className="flex items-center justify-center min-h-screen" style={{ backgroundColor: 'var(--color-cream)' }}>
                    <div className="text-center">
                        <div className="w-14 h-14 rounded-full animate-spin mx-auto mb-4"
                             style={{ borderWidth: '3px', borderColor: '#1B2A4A', borderTopColor: 'transparent' }}></div>
                        <p className="text-gray-500 font-medium text-sm">Loading learning paths...</p>
                    </div>
                </div>
            </>
        );
    }

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
                        onClick={() => router.push("/dashboard")}
                        className="mb-6 flex items-center gap-2 text-gray-400 hover:text-navy font-medium text-sm transition-colors group"
                    >
                        <FaArrowLeft className="text-xs group-hover:-translate-x-1 transition-transform" />
                        <span>Back to Dashboard</span>
                    </button>

                    {/* Hero Banner */}
                    <div className="rounded-2xl mb-14 relative overflow-hidden" style={{ backgroundColor: 'var(--color-navy)' }}>
                        <div className="absolute top-0 right-0 w-72 h-72 rounded-full opacity-10"
                             style={{ background: 'radial-gradient(circle, rgba(230,126,34,0.6) 0%, transparent 70%)', transform: 'translate(30%, -30%)' }} />
                        <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full opacity-10"
                             style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%)', transform: 'translate(-20%, 20%)' }} />

                        {/* Gurmukhi watermark */}
                        <div className="absolute top-1/2 right-8 -translate-y-1/2 text-[8rem] font-bold opacity-[0.04] text-white select-none pointer-events-none leading-none"
                             style={{ fontFamily: 'serif' }}>
                            ਪੰ
                        </div>

                        <div className="relative z-10 px-8 sm:px-12 py-10 sm:py-14 text-center">
                            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-gray-400 mb-3">Your Learning Journey</p>
                            <h1 className="text-3xl sm:text-4xl font-display text-white mb-3">
                                Choose Your <span className="text-saffron">Path</span>
                            </h1>
                            <p className="text-gray-400 text-base max-w-xl mx-auto">
                                Select a learning path that matches your level and start building your Punjabi fluency today.
                            </p>
                        </div>
                    </div>

                    {/* Learning Paths */}
                    <div className="mb-16">
                        <FadeIn>
                            <div className="mb-8">
                                <p className="text-xs font-semibold uppercase tracking-[0.15em] text-saffron mb-2">Courses</p>
                                <h2 className="text-2xl font-display text-navy">Learning Paths</h2>
                            </div>
                        </FadeIn>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                            {[
                                {
                                    icon: <FaComments className="text-2xl" />,
                                    level: "Beginner",
                                    title: "Essential Punjabi",
                                    subtitle: "Real Conversations",
                                    description: "Start speaking Punjabi from day one with must-know words and phrases.",
                                    link: "/learning/essential-punjabi",
                                    color: "#3B82F6",
                                    lessons: "6"
                                },
                                {
                                    icon: <FaMicrophone className="text-2xl" />,
                                    level: "Intermediate",
                                    title: "Speak with Confidence",
                                    subtitle: "Beyond the Basics",
                                    description: "Expand your vocabulary and engage in real-life conversations.",
                                    link: "/learning/speak-with-confidence",
                                    color: "#E67E22",
                                    lessons: "6",
                                    featured: true
                                },
                                {
                                    icon: <FaAward className="text-2xl" />,
                                    level: "Advanced",
                                    title: "Master Punjabi",
                                    subtitle: "Conversations with Ease",
                                    description: "Achieve fluency, understand native speakers, and sound natural.",
                                    link: "/learning/master-punjabi",
                                    color: "#059669",
                                    lessons: "6"
                                }
                            ].map((course, i) => (
                                <FadeIn key={i} delay={i * 120}>
                                    <a href={course.link} className="block group h-full">
                                        <div className={`h-full bg-white rounded-2xl border ${course.featured ? 'border-2 shadow-lg' : 'border-gray-200 shadow-sm'} hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden`}
                                             style={course.featured ? { borderColor: course.color } : {}}>

                                            {course.featured && (
                                                <div className="text-white text-[10px] font-bold px-3 py-1 text-center uppercase tracking-wider"
                                                     style={{ backgroundColor: course.color }}>
                                                    Most Popular
                                                </div>
                                            )}

                                            <div className="p-7">
                                                {/* Icon + level */}
                                                <div className="flex items-start justify-between mb-5">
                                                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-white transition-transform group-hover:scale-105"
                                                         style={{ backgroundColor: course.color }}>
                                                        {course.icon}
                                                    </div>
                                                    <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full"
                                                          style={{ color: course.color, backgroundColor: `${course.color}15` }}>
                                                        {course.level}
                                                    </span>
                                                </div>

                                                {/* Content */}
                                                <h3 className="text-lg font-bold text-navy mb-0.5">{course.title}</h3>
                                                <p className="text-xs text-gray-400 mb-3">{course.subtitle}</p>
                                                <p className="text-sm text-gray-500 leading-relaxed mb-5">{course.description}</p>

                                                {/* Stats */}
                                                <div className="flex items-center text-xs text-gray-400 pb-5 mb-5 border-b border-gray-100">
                                                    <span className="flex items-center gap-1"><FaBook className="text-[10px]" /> {course.lessons} lessons</span>
                                                </div>

                                                {/* CTA */}
                                                <div className="flex items-center gap-2 font-semibold text-sm group-hover:gap-3 transition-all"
                                                     style={{ color: course.color }}>
                                                    <span>Start Learning</span>
                                                    <FaArrowRight className="text-xs group-hover:translate-x-1 transition-transform" />
                                                </div>
                                            </div>
                                        </div>
                                    </a>
                                </FadeIn>
                            ))}
                        </div>
                    </div>

                    {/* Dictionary Section */}
                    <FadeIn>
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden mb-10">
                            <div className="grid grid-cols-1 lg:grid-cols-2">
                                {/* Left */}
                                <div className="p-8 lg:p-10 flex flex-col justify-center">
                                    <p className="text-xs font-semibold uppercase tracking-[0.15em] text-saffron mb-3">Learning Tool</p>
                                    <h2 className="text-2xl sm:text-3xl font-display text-navy mb-4">
                                        English to Punjabi Dictionary
                                    </h2>
                                    <p className="text-gray-500 text-sm leading-relaxed mb-6">
                                        Look up any English word and discover its Punjabi translation instantly. Perfect for building vocabulary and understanding context.
                                    </p>
                                    <div className="space-y-3 mb-8">
                                        {["Instant translations", "Pronunciation guides", "Example sentences"].map((item, i) => (
                                            <div key={i} className="flex items-center gap-3">
                                                <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                                                     style={{ backgroundColor: '#059669' }}>
                                                    <span className="text-white text-[10px]">✓</span>
                                                </div>
                                                <span className="text-sm text-gray-600">{item}</span>
                                            </div>
                                        ))}
                                    </div>
                                    <a href="/dictionary">
                                        <button className="group flex items-center gap-2 text-white px-7 py-3.5 rounded-xl font-semibold text-sm shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 w-fit"
                                                style={{ backgroundColor: 'var(--color-navy)' }}>
                                            Explore Dictionary
                                            <FaArrowRight className="text-xs group-hover:translate-x-1 transition-transform" />
                                        </button>
                                    </a>
                                </div>

                                {/* Right */}
                                <div className="p-8 lg:p-10 flex items-center justify-center" style={{ backgroundColor: 'var(--color-navy)' }}>
                                    <div className="text-center text-white">
                                        <div className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-5"
                                             style={{ backgroundColor: 'rgba(230,126,34,0.15)' }}>
                                            <FaBookOpen className="text-3xl text-saffron" />
                                        </div>
                                        <p className="text-2xl font-display mb-1">10,000+ Words</p>
                                        <p className="text-gray-400 text-sm">Comprehensive vocabulary database</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </FadeIn>

                    {/* Learning Tips */}
                    <FadeIn>
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
                            <div className="flex items-start gap-5">
                                <div className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center text-white"
                                     style={{ backgroundColor: 'var(--color-saffron)' }}>
                                    <FaStar className="text-lg" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-navy mb-3">
                                        Learning Tips
                                    </h3>
                                    <div className="space-y-2.5">
                                        {[
                                            "Practice for at least 10 to 15 minutes daily for best results",
                                            "Complete lessons in order to build a strong foundation",
                                            "Use the dictionary to look up unfamiliar words while learning",
                                            "Review previous lessons regularly to reinforce your knowledge"
                                        ].map((tip, i) => (
                                            <div key={i} className="flex items-start gap-2.5">
                                                <span className="text-saffron mt-0.5 text-xs">●</span>
                                                <p className="text-sm text-gray-500 leading-relaxed">{tip}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </FadeIn>
                </div>
            </div>
        </>
    );
}