"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function ReadingWriting() {
    const [user, setUser] = useState(null);
    const router = useRouter();

    // Dummy lesson names (2 Unlocked, 8 Locked)
    const lessons = [
        { title: "Lesson 1: Reading Gurmukhi Letters", link: "/gamified/lessons/alphabet", locked: false },
        { title: "Lesson 2: Writing Simple Words", link: "/lesson/writing-simple-words", locked: false },
        { title: "Lesson 3: Forming Sentences", link: "/lesson/forming-sentences", locked: true },
        { title: "Lesson 4: Understanding Word Order", link: "/lesson/word-order", locked: true },
        { title: "Lesson 5: Reading Short Paragraphs", link: "/lesson/reading-paragraphs", locked: true },
        { title: "Lesson 6: Writing Longer Sentences", link: "/lesson/writing-longer-sentences", locked: true },
        { title: "Lesson 7: Writing Common Phrases", link: "/lesson/writing-phrases", locked: true },
        { title: "Lesson 8: Reading & Writing Exercises", link: "/lesson/reading-writing-exercises", locked: true },
        { title: "Lesson 9: Comprehension Practice", link: "/lesson/comprehension-practice", locked: true },
        { title: "Lesson 10: Writing with Correct Grammar", link: "/lesson/writing-grammar", locked: true },
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
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-50 to-white px-6 pt-24 pb-12">

            {/* Back Button - Shows Home for Guests, Dashboard for Logged-in Users */}
            <div className="w-full max-w-5xl mb-6 flex justify-start">
                {user !== null ? (
                    <button
                        onClick={() => router.push("/dashboard")}
                        className="bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:bg-blue-600 transition"
                    >
                        ← Back to Dashboard
                    </button>
                ) : (
                    <button
                        onClick={() => router.push("/")}
                        className="bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:bg-blue-600 transition"
                    >
                        ← Back to Home
                    </button>
                )}
            </div>

            <div className="text-center max-w-3xl mb-8">
                <h1 className="text-4xl font-extrabold text-[var(--primary)] leading-tight">
                    Reading & Writing ✍️
                </h1>
                <p className="text-lg mt-3 text-gray-700">
                    Develop your reading and writing skills in Punjabi with structured lessons.
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl w-full">
                {lessons.map((lesson, index) => (
                    <LessonCard key={index} lesson={lesson} user={user} />
                ))}
            </div>

            {!user && (
                <div className="mt-8 text-center">
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

// ✅ Lesson Card Component (Handles Locking System)
function LessonCard({ lesson, user }) {
    return (
        <div className={`p-6 bg-white rounded-lg shadow-md border-2 border-gray-200 transition-all hover:border-[3px] ${lesson.locked && !user ? "hover:border-red-500" : "hover:border-green-500"} hover:shadow-xl transform hover:scale-105 cursor-pointer text-center`}>
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
