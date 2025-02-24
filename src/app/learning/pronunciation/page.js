"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";

export default function Pronunciation() {
    const [user, setUser] = useState(null);

    // Dummy lesson names (2 Unlocked, 8 Locked)
    const lessons = [
        { title: "Lesson 1: Basic Punjabi Sounds", link: "/lesson/basic-sounds", locked: false },
        { title: "Lesson 2: Common Greetings & Phrases", link: "/lesson/common-greetings", locked: false },
        { title: "Lesson 3: Difficult Consonants", link: "/lesson/difficult-consonants", locked: true },
        { title: "Lesson 4: Vowel Sounds & Tones", link: "/lesson/vowel-tones", locked: true },
        { title: "Lesson 5: Speaking Fluency Drills", link: "/lesson/speaking-fluency", locked: true },
        { title: "Lesson 6: Sentence Intonation", link: "/lesson/sentence-intonation", locked: true },
        { title: "Lesson 7: Tongue Twisters", link: "/lesson/tongue-twisters", locked: true },
        { title: "Lesson 8: Pronouncing Difficult Words", link: "/lesson/difficult-words", locked: true },
        { title: "Lesson 9: Conversational Punjabi", link: "/lesson/conversational-punjabi", locked: true },
        { title: "Lesson 10: Mimic Native Speakers", link: "/lesson/mimic-native", locked: true },
    ];

    useEffect(() => {
        async function checkUser() {
            const { data: { user } } = await supabase.auth.getUser();
            setUser(user);
        }
        checkUser();
    }, []);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-50 to-white px-6 pt-24">
            <div className="text-center max-w-3xl mb-8">
                <h1 className="text-4xl font-extrabold text-[var(--primary)] leading-tight">
                    Pronunciation 🔊
                </h1>
                <p className="text-lg mt-3 text-gray-700">
                    Master Punjabi pronunciation and sound patterns through structured lessons.
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
