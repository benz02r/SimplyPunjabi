"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { FaArrowLeft, FaBook, FaHashtag, FaClock, FaUsers, FaChartBar, FaLanguage, FaArrowRight } from "react-icons/fa";

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

export default function LearningResources() {
    const router = useRouter();

    const resources = [
        {
            title: "Gurmukhi Alphabet",
            description: "Master the foundation of Punjabi writing",
            icon: <FaLanguage className="text-2xl" />,
            link: "/learning/resources/alphabet",
            color: "#3B82F6"
        },
        {
            title: "Numbers in Punjabi",
            description: "Learn counting and numerical expressions",
            icon: <FaHashtag className="text-2xl" />,
            link: "/learning/resources/numbers",
            color: "#E67E22"
        },
        {
            title: "Common Phrases",
            description: "Essential everyday expressions",
            icon: <FaUsers className="text-2xl" />,
            link: "/learning/resources/phrases",
            color: "#059669"
        },
        {
            title: "Time and Days",
            description: "Tell time and discuss dates",
            icon: <FaClock className="text-2xl" />,
            link: "/learning/resources/time",
            color: "#8B5CF6"
        },
        {
            title: "Grammar Basics",
            description: "Understand sentence structure",
            icon: <FaChartBar className="text-2xl" />,
            link: "/learning/resources/grammar",
            color: "#EC4899"
        },
        {
            title: "Study Guide",
            description: "Tips and strategies for effective learning",
            icon: <FaBook className="text-2xl" />,
            link: "/learning/resources/study-guide",
            color: "#1B2A4A"
        }
    ];

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
                        onClick={() => router.push("/learning")}
                        className="mb-6 flex items-center gap-2 text-gray-400 hover:text-navy font-medium text-sm transition-colors group"
                    >
                        <FaArrowLeft className="text-xs group-hover:-translate-x-1 transition-transform" />
                        <span>Back to Learning Hub</span>
                    </button>

                    {/* Header */}
                    <div className="rounded-2xl mb-14 relative overflow-hidden" style={{ backgroundColor: 'var(--color-navy)' }}>
                        <div className="absolute top-0 right-0 w-72 h-72 rounded-full opacity-10"
                             style={{ background: 'radial-gradient(circle, rgba(230,126,34,0.6) 0%, transparent 70%)', transform: 'translate(30%, -30%)' }} />
                        <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full opacity-10"
                             style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%)', transform: 'translate(-20%, 20%)' }} />

                        <div className="absolute top-1/2 right-8 -translate-y-1/2 text-[8rem] font-bold opacity-[0.04] text-white select-none pointer-events-none leading-none"
                             style={{ fontFamily: 'serif' }}>
                            ੴ
                        </div>

                        <div className="relative z-10 px-8 sm:px-12 py-10 sm:py-14 text-center">
                            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-saffron mb-3">Reference Materials</p>
                            <h1 className="text-3xl sm:text-4xl font-display text-white mb-3">
                                Learning Resources
                            </h1>
                            <p className="text-gray-400 text-base max-w-xl mx-auto">
                                Essential materials and references to support your Punjabi learning journey.
                            </p>
                        </div>
                    </div>

                    {/* Resources Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-14">
                        {resources.map((resource, index) => (
                            <FadeIn key={index} delay={index * 80}>
                                <a href={resource.link} className="block group h-full">
                                    <div className="h-full bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-lg hover:border-gray-300 transition-all duration-300 hover:-translate-y-1 overflow-hidden p-7">
                                        <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-white mb-5 transition-transform group-hover:scale-105"
                                             style={{ backgroundColor: resource.color }}>
                                            {resource.icon}
                                        </div>
                                        <h3 className="text-lg font-bold text-navy mb-1.5 group-hover:text-saffron transition-colors">
                                            {resource.title}
                                        </h3>
                                        <p className="text-sm text-gray-500 leading-relaxed mb-5">
                                            {resource.description}
                                        </p>
                                        <div className="flex items-center gap-2 text-saffron font-semibold text-sm group-hover:gap-3 transition-all">
                                            <span>Explore</span>
                                            <FaArrowRight className="text-xs group-hover:translate-x-1 transition-transform" />
                                        </div>
                                    </div>
                                </a>
                            </FadeIn>
                        ))}
                    </div>

                    {/* Tips Section */}
                    <FadeIn>
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 sm:p-10">
                            <div className="max-w-3xl mx-auto">
                                <div className="text-center mb-8">
                                    <p className="text-xs font-semibold uppercase tracking-[0.15em] text-saffron mb-2">Tips</p>
                                    <h2 className="text-2xl font-display text-navy">Make the Most of These Resources</h2>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {[
                                        { title: "Quick Reference", description: "Look up words, phrases, and grammar rules on the go" },
                                        { title: "Review and Practice", description: "Reinforce what you've learned in your lessons" },
                                        { title: "Study Notes", description: "Create your own notes using these as a foundation" },
                                        { title: "Targeted Learning", description: "Focus on specific areas where you need more practice" },
                                    ].map((tip, i) => (
                                        <div key={i} className="flex items-start gap-4 p-5 rounded-xl border border-gray-200 hover:shadow-md hover:border-gray-300 transition-all duration-300">
                                            <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                                                 style={{ backgroundColor: 'rgba(230,126,34,0.1)' }}>
                                                <span className="text-saffron font-bold text-sm">{i + 1}</span>
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-navy text-sm mb-1">{tip.title}</h3>
                                                <p className="text-xs text-gray-500 leading-relaxed">{tip.description}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </FadeIn>
                </div>
            </div>
        </>
    );
}