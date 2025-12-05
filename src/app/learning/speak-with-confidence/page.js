"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { FaArrowLeft, FaCheck, FaLock, FaBook, FaRocket, FaPlay, FaStar } from "react-icons/fa";

export default function SpeakWithConfidence() {
    const [user, setUser] = useState(null);
    const [completedLessons, setCompletedLessons] = useState([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    const lessons = [
        { id: "lesson1", title: "Telling The Time", description: "Master time expressions in Punjabi", link: "/gamified/lessons/conversation-flow", locked: true, },
        { id: "lesson2", title: "How To Get From A To B", description: "Navigate and give directions confidently", link: "/gamified/lessons/expressing-feelings", locked: true,  },
        { id: "lesson3", title: "Daily Routine", description: "Describe your everyday activities", link: "/gamified/lessons/healthy-living", locked: true, },
        { id: "lesson4", title: "Expressing Yourself", description: "Share your thoughts and feelings", link: "/gamified/lessons/daily-routine", locked: true, },
        { id: "lesson5", title: "Common Questions", description: "Ask and answer everyday questions", link: "/gamified/lessons/common-questions", locked: true,  },
        { id: "lesson6", title: "Making It Easy & Top Tips", description: "Advanced strategies for fluency", link: "/lessons/lesson6", locked: true, },
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
                    // Optimized: Direct query using session user ID
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
            <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-600 font-medium">Loading course...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50 px-4 sm:px-6 lg:px-8 pt-24 pb-16">
            <div className="max-w-7xl mx-auto">
                {/* Back Button */}
                <button
                    onClick={() => router.push(user ? "/learning" : "/")}
                    className="mb-6 flex items-center gap-2 text-gray-600 hover:text-orange-600 font-semibold transition-colors group"
                >
                    <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
                    <span>Back to {user ? "Learning" : "Home"}</span>
                </button>

                {/* Resources Banner */}
                <a href="/learning/resources" className="block mb-8">
                    <div className="bg-gradient-to-r from-yellow-400 to-orange-400 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02]">
                        <div className="flex items-center gap-4">
                            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center flex-shrink-0">
                                <FaBook className="text-3xl text-orange-500" />
                            </div>
                            <div className="flex-1">
                                <h2 className="text-2xl font-bold text-white mb-1"> Learning Resources</h2>
                                <p className="text-yellow-50">Access essential Punjabi learning materials and study guides</p>
                            </div>
                            <div className="hidden sm:block">
                                <span className="text-white text-2xl">→</span>
                            </div>
                        </div>
                    </div>
                </a>

                {/* Course Header */}
                <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-3xl p-8 sm:p-12 text-white shadow-xl mb-12 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full blur-3xl"></div>

                    <div className="relative z-10">
                        <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-4">
                            <FaStar className="text-yellow-300" />
                            <span className="text-sm font-semibold">INTERMEDIATE COURSE</span>
                        </div>
                        <h1 className="text-4xl sm:text-5xl font-bold mb-4">
                            Speak with Confidence – Beyond the Basics
                        </h1>
                        <p className="text-xl text-orange-50 mb-6 max-w-3xl">
                            Take your Punjabi speaking skills to the next level with real conversations! Perfect for learners ready to expand their vocabulary.
                        </p>

                        {/* Course Stats */}
                        {user && (
                            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 inline-block">
                                <div className="flex items-center gap-6">
                                    <div>
                                        <p className="text-sm text-orange-100 mb-1">Your Progress</p>
                                        <p className="text-2xl font-bold">{completedCount} / {lessons.length} Lessons</p>
                                    </div>
                                    <div className="w-32 h-2 bg-white/30 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-white transition-all duration-500"
                                            style={{ width: `${progressPercent}%` }}
                                        ></div>
                                    </div>
                                    <div>
                                        <p className="text-3xl font-bold">{progressPercent}%</p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Lessons Grid */}
                <div className="mb-12">
                    <h2 className="text-3xl font-bold text-gray-900 mb-8">Course Lessons</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {lessons.map((lesson, index) => (
                            <LessonCard
                                key={index}
                                lesson={{ ...lesson, completed: completedLessons.includes(lesson.id) }}
                                user={user}
                                lessonNumber={index + 1}
                            />
                        ))}
                    </div>
                </div>

                {/* CTA for Non-Users */}
                {!user && (
                    <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-3xl p-12 text-white text-center shadow-xl">
                        <FaRocket className="text-6xl mx-auto mb-6" />
                        <h2 className="text-3xl font-bold mb-4">
                            Want Full Access to All Lessons?
                        </h2>
                        <p className="text-xl text-orange-100 mb-8 max-w-2xl mx-auto">
                            Subscribe to unlock premium content, track your progress, and accelerate your learning journey!
                        </p>
                        <a href="/key-functions/signup">
                            <button className="bg-white text-orange-600 px-10 py-4 rounded-xl text-xl font-bold shadow-lg hover:shadow-xl hover:bg-gray-50 transition-all duration-300 transform hover:scale-105">
                                Subscribe Now
                            </button>
                        </a>
                    </div>
                )}
            </div>
        </div>
    );
}

function LessonCard({ lesson, user, lessonNumber }) {
    const isLocked = lesson.locked && !user;
    const isCompleted = lesson.completed;

    return (
        <div className={`relative bg-white rounded-2xl border-2 shadow-lg overflow-hidden transition-all duration-300 ${
            isLocked
                ? "border-gray-300 opacity-75"
                : "border-gray-200 hover:border-orange-400 hover:shadow-xl transform hover:-translate-y-1"
        }`}>
            {/* Completion Badge */}
            {isCompleted && (
                <div className="absolute top-4 right-4 z-10">
                    <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
                        <FaCheck className="text-white text-lg" />
                    </div>
                </div>
            )}

            {/* Lock Badge */}
            {isLocked && (
                <div className="absolute top-4 right-4 z-10">
                    <div className="w-10 h-10 bg-gray-400 rounded-full flex items-center justify-center shadow-lg">
                        <FaLock className="text-white text-sm" />
                    </div>
                </div>
            )}

            {isLocked ? (
                <div className="p-8 flex flex-col items-center justify-center min-h-[280px] text-center">
                    <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                        <FaLock className="text-4xl text-gray-400" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-700 mb-2">
                        Lesson {lessonNumber}: {lesson.title}
                    </h3>
                    <p className="text-sm text-gray-500 mb-4">{lesson.description}</p>
                    <div className="bg-gray-100 px-4 py-2 rounded-full">
                        <p className="text-sm font-semibold text-gray-600">Subscribe to unlock</p>
                    </div>
                </div>
            ) : (
                <a href={lesson.link} className="block">
                    <div className="p-8 min-h-[280px] flex flex-col">
                        <div className="flex items-start justify-between mb-4">
                            <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-md">
                                {lessonNumber}
                            </div>
                        </div>

                        <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors">
                            {lesson.title}
                        </h3>
                        <p className="text-gray-600 mb-6 flex-grow">
                            {lesson.description}
                        </p>

                        <button className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-3 rounded-xl font-bold hover:from-orange-600 hover:to-orange-700 transition-all duration-300 shadow-md flex items-center justify-center gap-2 group">
                            <FaPlay className="text-sm group-hover:scale-110 transition-transform" />
                            <span>{isCompleted ? "Review Lesson" : "Start Lesson"}</span>
                        </button>
                    </div>
                </a>
            )}
        </div>
    );
}