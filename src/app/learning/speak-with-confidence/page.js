"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function SpeakWithConfidence() {
    const [user, setUser] = useState(null);
    const router = useRouter();

    // Updated Lessons for Speak with Confidence (Reduced to 6)
    const lessons = [
        { title: "Lesson 1: How to Start & Keep a Conversation Going", link: "/gamified/lessons/conversation-flow", locked: false },
        { title: "Lesson 2: Expressing Likes, Dislikes & Opinions", link: "/gamified/lessons/expressing-feelings", locked: false },
        { title: "Lesson 3: Punjabi Question Words – Never Run Out of Things to Say", link: "/lesson/question-words", locked: true },
        { title: "Lesson 4: Making Plans & Inviting Friends", link: "/lesson/making-plans", locked: true },
        { title: "Lesson 5: Describing People, Places & Things", link: "/lesson/describing-things", locked: true },
        { title: "Lesson 6: Handling Real-Life Situations (Doctor, Taxi, Hotel)", link: "/lesson/real-life-situations", locked: true },
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

            {/* Resources Box */}
            <div className="w-full max-w-5xl mb-12">
                <Link href="/learning/resources">
                    <div className="p-6 bg-yellow-100 rounded-lg shadow-md border-2 border-yellow-300 transition-all hover:border-yellow-500 hover:shadow-xl transform hover:scale-105 cursor-pointer text-center">
                        <h2 className="text-2xl font-bold text-yellow-800">📚 Learning Resources</h2>
                        <p className="text-lg text-yellow-700 mt-2">Click here to access essential Punjabi learning materials.</p>
                    </div>
                </Link>
            </div>

            {/* Title & Description */}
            <div className="text-center max-w-3xl mb-12">
                <h1 className="text-4xl font-extrabold text-[var(--primary)] leading-tight">
                    Speak with Confidence – Beyond the Basics 🎧
                </h1>
                <p className="text-lg mt-3 text-gray-700">
                    Take your Punjabi speaking skills to the next level with real conversations!
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
