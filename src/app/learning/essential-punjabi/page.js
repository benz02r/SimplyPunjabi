"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function EssentialPunjabi() {
    const [user, setUser] = useState(null);
    const router = useRouter();

    // Updated Lessons for Essential Punjabi
    const lessons = [
        { title: "Lesson 1: How to Greet Like a Native!", link: "/lessons/lesson1", locked: false },
        { title: "Lesson 2: Crack the Punjabi Code – Gurmukhi Alphabet", link: "/gamified/lessons/gurmukhi-basics", locked: false },
        { title: "Lesson 3: Numbers 1-10 & Shopping Skills", link: "/lesson/numbers-and-shopping", locked: true },
        { title: "Lesson 4: Ordering Food & Restaurant Conversations", link: "/lesson/ordering-food", locked: true },
        { title: "Lesson 5: Asking for Directions in Punjabi", link: "/lesson/asking-directions", locked: true },
        { title: "Lesson 6: Must-Know Verbs for Everyday Speaking", link: "/lesson/everyday-verbs", locked: true },
        { title: "Lesson 7: Talking About Family & Making Connections", link: "/lesson/talking-about-family", locked: true },
        { title: "Lesson 8: Emergency Punjabi – Asking for Help", link: "/lesson/emergency-punjabi", locked: true },
        { title: "Lesson 9: Casual Chat & Punjabi Slang", link: "/lesson/punjabi-slang", locked: true },
        { title: "Lesson 10: Mastering Pronunciation & Sounding Fluent", link: "/lesson/speak-with-confidence-fluency", locked: true },
    ];

    useEffect(() => {
        async function checkUser() {
            const { data: sessionData, error } = await supabase.auth.getSession();
            if (error) {
                console.error("Supabase Auth Error:", error);
            } else {
                setUser(sessionData?.session?.user || null);
            }
        }
        checkUser();
    }, []);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-50 to-white px-6 pt-40 pb-16">

            {/* Back Button - More Space Below Navbar */}
            <div className="w-full max-w-5xl mb-10 flex justify-start">
                <button
                    onClick={() => router.push(user ? "/learning" : "/")}
                    className="bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:bg-blue-600 transition"
                >
                    ← Back to {user ? "Learning" : "Home"}
                </button>
            </div>

            {/* Title & Description */}
            <div className="text-center max-w-3xl mb-12">
                <h1 className="text-4xl font-extrabold text-[var(--primary)] leading-tight">
                    Essential Punjabi for Real Conversations 🗣️
                </h1>
                <p className="text-lg mt-3 text-gray-700">
                    Master the basics and start speaking Punjabi confidently from Day 1!
                </p>
            </div>

            {/* Lesson Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-5xl w-full">
                {lessons.map((lesson, index) => (
                    <LessonCard key={index} lesson={lesson} user={user} />
                ))}
            </div>

            {/* Subscription Prompt */}
            {!user && (
                <div className="mt-12 text-center">
                    <p className="text-lg font-semibold text-gray-700">🔒 Want full access to all lessons?</p>
                    <Link href="/signup">
                        <button className="mt-4 bg-[var(--primary)] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[var(--secondary)] transition transform hover:scale-105">
                            Subscribe to Unlock 🚀
                        </button>
                    </Link>
                </div>
            )}
        </div>
    );
}

// ✅ Lesson Card Component (Uniform Size & Styling)
function LessonCard({ lesson, user }) {
    return (
        <div className={`p-6 bg-white rounded-lg shadow-md border-2 border-gray-200 transition-all hover:border-[3px] ${lesson.locked && !user ? "hover:border-red-500" : "hover:border-green-500"} hover:shadow-xl transform hover:scale-105 cursor-pointer text-center h-[200px] flex flex-col justify-between`}>
            {lesson.locked && !user ? (
                <>
                    <div className="text-4xl">🔒</div>
                    <h3 className="text-lg md:text-xl font-bold text-gray-700 mt-2">{lesson.title}</h3>
                    <p className="text-sm text-gray-500">Subscribe to unlock</p>
                </>
            ) : (
                <Link href={lesson.link}>
                    <h3 className="text-lg md:text-xl font-bold text-[var(--primary)] mt-2">{lesson.title}</h3>
                </Link>
            )}
        </div>
    );
}
