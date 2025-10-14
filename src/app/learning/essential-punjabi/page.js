"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { FaArrowLeft, FaCheck, FaLock, FaBook, FaRocket, FaPlay, FaStar } from "react-icons/fa";

export default function EssentialPunjabi() {
    const [user, setUser] = useState(null);
    const [completedLessons, setCompletedLessons] = useState([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    const lessons = [
        { id: "lesson1", title: "What Is Punjabi?", description: "Discover the language and its rich history", link: "/lessons/lesson1/1", locked: false, duration: "10 min" },
        { id: "lesson2", title: "Learn Punjabi Greetings", description: "Essential phrases for everyday interactions", link: "/lessons/lesson2/1", locked: false, duration: "15 min" },
        { id: "lesson3", title: "A Bit About Me", description: "Introduce yourself in Punjabi", link: "/lessons/lesson3/1", locked: false, duration: "12 min" },
        { id: "lesson4", title: "Family And Friends", description: "Talk about your loved ones", link: "/lessons/lesson4", locked: false, duration: "18 min" },
        { id: "lesson5", title: "Back To Basics", description: "Master fundamental concepts", link: "/lessons/lesson5", locked: false, duration: "20 min" },
        { id: "lesson6", title: "Making It Easy & Top Tips", description: "Pro strategies for learning success", link: "/lessons/lesson14/1", locked: true, duration: "15 min" },
    ];

    useEffect(() => {
        async function checkUserAndProgress() {
            const { data: sessionData, error } = await supabase.auth.getSession();
            if (error) {
                console.error("Supabase Auth Error:", error);
                setLoading(false);
                return;
            }

            const sessionUser = sessionData?.session?.user || null;
            setUser(sessionUser);

            if (sessionUser) {
                const { data: userData } = await supabase
                    .from("users")
                    .select("id")
                    .eq("email", sessionUser.email)
                    .single();

                const { data: progressData } = await supabase
                    .from("lesson_progress")
                    .select("lesson_id")
                    .eq("user_id", userData.id)
                    .eq("completed", true);

                const completed = progressData?.map(item => item.lesson_id) || [];
                setCompletedLessons(completed);
            }
            setLoading(false);
        }

        checkUserAndProgress();
    }, []);

    const completedCount = lessons.filter(l => completedLessons.includes(l.id)).length;
    const progressPercent = Math.round((completedCount / lessons.length) * 100);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
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
                    className="mb-6 flex items-center gap-2 text-gray-600 hover:text-blue-600 font-semibold transition-colors group"
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
                <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-3xl p-8 sm:p-12 text-white shadow-xl mb-12 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full blur-3xl"></div>

                    <div className="relative z-10">
                        <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-4">
                            <FaStar className="text-yellow-300" />
                            <span className="text-sm font-semibold">BEGINNER COURSE</span>
                        </div>
                        <h1 className="text-4xl sm:text-5xl font-bold mb-4">
                            Essential Punjabi for Real Conversations
                        </h1>
                        <p className="text-xl text-blue-50 mb-6 max-w-3xl">
                            Master the basics and start speaking Punjabi confidently from Day 1! Perfect for complete beginners.
                        </p>

                        {/* Course Stats */}
                        {user && (
                            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 inline-block">
                                <div className="flex items-center gap-6">
                                    <div>
                                        <p className="text-sm text-green-100 mb-1">Your Progress</p>
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
                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 text-white text-center shadow-xl">
                        <FaRocket className="text-6xl mx-auto mb-6" />
                        <h2 className="text-3xl font-bold mb-4">
                             Want Full Access to All Lessons?
                        </h2>
                        <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                            Subscribe to unlock premium content, track your progress, and accelerate your learning journey!
                        </p>
                        <a href="/key-functions/signup">
                            <button className="bg-white text-blue-600 px-10 py-4 rounded-xl text-xl font-bold shadow-lg hover:shadow-xl hover:bg-gray-50 transition-all duration-300 transform hover:scale-105">
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
                : "border-gray-200 hover:border-blue-400 hover:shadow-xl transform hover:-translate-y-1"
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
                            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-md">
                                {lessonNumber}
                            </div>
                            <div className="text-sm text-gray-500 flex items-center gap-1">
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                                </svg>
                                <span>{lesson.duration}</span>
                            </div>
                        </div>

                        <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                            {lesson.title}
                        </h3>
                        <p className="text-gray-600 mb-6 flex-grow">
                            {lesson.description}
                        </p>

                        <button className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 rounded-xl font-bold hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow-md flex items-center justify-center gap-2 group">
                            <FaPlay className="text-sm group-hover:scale-110 transition-transform" />
                            <span>{isCompleted ? "Review Lesson" : "Start Lesson"}</span>
                        </button>
                    </div>
                </a>
            )}
        </div>
    );
}