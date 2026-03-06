"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { FaArrowLeft, FaCheck, FaLock, FaBook, FaRocket, FaPlay, FaArrowRight } from "react-icons/fa";

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

export default function MasterPunjabiConversations() {
    const [user, setUser] = useState(null);
    const [completedLessons, setCompletedLessons] = useState([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    const lessons = [
        { id: "lesson1", title: "Fix the Top 3 Mistakes", description: "Common errors English speakers make", link: "/gamified/lessons/common-mistakes", locked: true },
        { id: "lesson2", title: "Think in Punjabi", description: "The secret to natural fluency", link: "/gamified/lessons/think-in-punjabi", locked: true },
        { id: "lesson3", title: "Tell Great Stories", description: "Master storytelling in Punjabi", link: "/lesson/storytelling-in-punjabi", locked: true },
        { id: "lesson4", title: "Deep Conversations", description: "Express complex thoughts and emotions", link: "/lesson/deep-conversations", locked: true },
        { id: "lesson5", title: "Idioms and Local Phrases", description: "Sound like a native speaker", link: "/lesson/punjabi-idioms", locked: true },
        { id: "lesson6", title: "Handle Disagreements", description: "Navigate arguments respectfully", link: "/lesson/arguing-politely", locked: true },
    ];

    useEffect(() => {
        let isMounted = true;

        async function checkUserAndProgress() {
            try {
                const { data: sessionData, error } = await supabase.auth.getSession();

                if (!isMounted) return;

                if (error) {
                    console.error("Supabase Auth Error:", error);
                    setLoading(false);
                    return;
                }

                const sessionUser = sessionData?.session?.user || null;
                setUser(sessionUser);

                if (sessionUser) {
                    const { data: progressData, error: progressError } = await supabase
                        .from("lesson_progress")
                        .select("lesson_id")
                        .eq("user_id", sessionUser.id)
                        .eq("completed", true);

                    if (!isMounted) return;

                    if (progressError) {
                        console.error("Progress fetch error:", progressError);
                        setCompletedLessons([]);
                    } else {
                        const completed = progressData?.map(entry => entry.lesson_id) || [];
                        setCompletedLessons(completed);
                    }
                }
            } catch (err) {
                console.error("Error in checkUserAndProgress:", err);
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        }

        checkUserAndProgress();

        return () => {
            isMounted = false;
        };
    }, []);

    const completedCount = lessons.filter(l => completedLessons.includes(l.id)).length;
    const progressPercent = Math.round((completedCount / lessons.length) * 100);

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
                        <p className="text-gray-500 font-medium text-sm">Loading course...</p>
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
                        onClick={() => router.push(user ? "/learning" : "/")}
                        className="mb-6 flex items-center gap-2 text-gray-400 hover:text-navy font-medium text-sm transition-colors group"
                    >
                        <FaArrowLeft className="text-xs group-hover:-translate-x-1 transition-transform" />
                        <span>Back to {user ? "Learning" : "Home"}</span>
                    </button>

                    {/* Resources Banner */}
                    <a href="/learning/resources" className="block mb-8 group">
                        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-200 hover:shadow-md hover:border-gray-300 transition-all duration-300">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 text-white"
                                     style={{ backgroundColor: 'var(--color-saffron)' }}>
                                    <FaBook className="text-lg" />
                                </div>
                                <div className="flex-1">
                                    <h2 className="text-base font-bold text-navy mb-0.5">Learning Resources</h2>
                                    <p className="text-sm text-gray-500">Access essential Punjabi learning materials and study guides</p>
                                </div>
                                <FaArrowRight className="text-gray-300 text-sm group-hover:text-saffron group-hover:translate-x-1 transition-all hidden sm:block" />
                            </div>
                        </div>
                    </a>

                    {/* Course Header */}
                    <div className="rounded-2xl mb-12 relative overflow-hidden" style={{ backgroundColor: 'var(--color-navy)' }}>
                        <div className="absolute top-0 right-0 w-72 h-72 rounded-full opacity-10"
                             style={{ background: 'radial-gradient(circle, rgba(230,126,34,0.6) 0%, transparent 70%)', transform: 'translate(30%, -30%)' }} />
                        <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full opacity-10"
                             style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%)', transform: 'translate(-20%, 20%)' }} />

                        {/* Gurmukhi watermark */}
                        <div className="absolute top-1/2 right-8 -translate-y-1/2 text-[8rem] font-bold opacity-[0.04] text-white select-none pointer-events-none leading-none"
                             style={{ fontFamily: 'serif' }}>
                            ੲ
                        </div>

                        <div className="relative z-10 px-8 sm:px-12 py-10 sm:py-14">
                            <p className="text-xs font-semibold uppercase tracking-[0.15em]" style={{ color: '#059669' }}>Advanced Course</p>
                            <h1 className="text-3xl sm:text-4xl font-display text-white mb-3 mt-3">
                                Master Punjabi<br />
                                <span className="text-saffron">Conversations with Ease</span>
                            </h1>
                            <p className="text-gray-400 text-base mb-8 max-w-2xl">
                                Achieve fluency, understand native speakers, and sound like a local. Perfect for learners ready to reach mastery.
                            </p>

                            {/* Progress stats */}
                            {user && (
                                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5 inline-block border border-white/10">
                                    <div className="flex items-center gap-6 flex-wrap">
                                        <div>
                                            <p className="text-xs text-gray-400 mb-1">Your Progress</p>
                                            <p className="text-xl font-bold text-white">{completedCount} / {lessons.length} <span className="text-sm font-normal text-gray-400">lessons</span></p>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div className="w-28 h-2 bg-white/20 rounded-full overflow-hidden">
                                                <div
                                                    className="h-full rounded-full transition-all duration-500"
                                                    style={{ width: `${progressPercent}%`, backgroundColor: '#059669' }}
                                                ></div>
                                            </div>
                                            <span className="text-lg font-bold" style={{ color: '#059669' }}>{progressPercent}%</span>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Lessons Grid */}
                    <div className="mb-12">
                        <div className="mb-8">
                            <p className="text-xs font-semibold uppercase tracking-[0.15em]" style={{ color: '#059669' }}>Lessons</p>
                            <h2 className="text-2xl font-display text-navy mt-1">Course Lessons</h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                            {lessons.map((lesson, index) => (
                                <FadeIn key={index} delay={index * 80}>
                                    <LessonCard
                                        lesson={{ ...lesson, completed: completedLessons.includes(lesson.id) }}
                                        user={user}
                                        lessonNumber={index + 1}
                                    />
                                </FadeIn>
                            ))}
                        </div>
                    </div>

                    {/* CTA for Non-Users */}
                    {!user && (
                        <FadeIn>
                            <div className="rounded-2xl py-16 px-8 text-white text-center relative overflow-hidden"
                                 style={{ backgroundColor: 'var(--color-navy)' }}>
                                <div className="absolute top-0 left-0 w-96 h-96 rounded-full opacity-10"
                                     style={{ background: 'radial-gradient(circle, rgba(230,126,34,0.5) 0%, transparent 70%)', transform: 'translate(-40%, -40%)' }} />

                                <div className="relative z-10">
                                    <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6"
                                         style={{ backgroundColor: 'rgba(230,126,34,0.15)' }}>
                                        <FaRocket className="text-2xl text-saffron" />
                                    </div>
                                    <h2 className="text-2xl sm:text-3xl font-display mb-3">
                                        Want Full Access to All Lessons?
                                    </h2>
                                    <p className="text-gray-400 mb-8 max-w-lg mx-auto">
                                        Sign up to unlock all content, track your progress, and accelerate your learning journey.
                                    </p>
                                    <a href="/key-functions/signup">
                                        <button className="group flex items-center justify-center gap-3 mx-auto text-white px-10 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5"
                                                style={{ backgroundColor: 'var(--color-saffron)' }}>
                                            Sign Up Free
                                            <FaArrowRight className="text-xs group-hover:translate-x-1 transition-transform" />
                                        </button>
                                    </a>
                                </div>
                            </div>
                        </FadeIn>
                    )}
                </div>
            </div>
        </>
    );
}

function LessonCard({ lesson, user, lessonNumber }) {
    const isLocked = lesson.locked && !user;
    const isCompleted = lesson.completed;

    return (
        <div className={`relative bg-white rounded-2xl border overflow-hidden transition-all duration-300 h-full ${
            isLocked
                ? "border-gray-200 opacity-70"
                : "border-gray-200 hover:shadow-lg hover:border-gray-300 hover:-translate-y-1"
        }`}>
            {isCompleted && (
                <div className="absolute top-4 right-4 z-10">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center shadow-sm"
                         style={{ backgroundColor: '#059669' }}>
                        <FaCheck className="text-white text-xs" />
                    </div>
                </div>
            )}

            {isLocked && (
                <div className="absolute top-4 right-4 z-10">
                    <div className="w-8 h-8 bg-gray-300 rounded-lg flex items-center justify-center">
                        <FaLock className="text-white text-xs" />
                    </div>
                </div>
            )}

            {isLocked ? (
                <div className="p-7 flex flex-col items-center justify-center min-h-[260px] text-center">
                    <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4" style={{ backgroundColor: 'var(--color-warm-gray)' }}>
                        <FaLock className="text-2xl text-gray-400" />
                    </div>
                    <h3 className="text-lg font-bold text-navy mb-1">
                        Lesson {lessonNumber}: {lesson.title}
                    </h3>
                    <p className="text-sm text-gray-500 mb-4">{lesson.description}</p>
                    <span className="text-xs font-semibold text-gray-400 px-3 py-1.5 rounded-full" style={{ backgroundColor: 'var(--color-warm-gray)' }}>
                        Sign up to unlock
                    </span>
                </div>
            ) : (
                <a href={lesson.link} className="block group">
                    <div className="p-7 min-h-[260px] flex flex-col">
                        <div className="mb-5">
                            <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-sm shadow-sm"
                                 style={{ backgroundColor: '#059669' }}>
                                {lessonNumber}
                            </div>
                        </div>

                        <h3 className="text-lg font-bold text-navy mb-1 group-hover:text-saffron transition-colors">
                            {lesson.title}
                        </h3>
                        <p className="text-sm text-gray-500 mb-6 flex-grow leading-relaxed">
                            {lesson.description}
                        </p>

                        <div className="flex items-center gap-2 font-semibold text-sm group-hover:gap-3 transition-all"
                             style={{ color: isCompleted ? '#059669' : 'var(--color-saffron)' }}>
                            <FaPlay className="text-[10px]" />
                            <span>{isCompleted ? "Review Lesson" : "Start Lesson"}</span>
                            <FaArrowRight className="text-xs group-hover:translate-x-1 transition-transform" />
                        </div>
                    </div>
                </a>
            )}
        </div>
    );
}