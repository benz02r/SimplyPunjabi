"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function MasterPunjabiConversations() {
    const [user, setUser] = useState(null);
    const [completedLessons, setCompletedLessons] = useState([]);
    const router = useRouter();

    // Updated Lessons for Master Punjabi Conversations
    const lessons = [
        { id: "lesson1", title: "Lesson 1: Fix the Top 3 Mistakes English Speakers Make", link: "/gamified/lessons/common-mistakes", locked: false },
        { id: "lesson2", title: "Lesson 2: The Secret to Thinking in Punjabi", link: "/gamified/lessons/think-in-punjabi", locked: false },
        { id: "lesson3", title: "Lesson 3: How to Tell a Great Story in Punjabi", link: "/lesson/storytelling-in-punjabi", locked: true },
        { id: "lesson4", title: "Lesson 4: Deep Conversations – Express Your Thoughts & Emotions", link: "/lesson/deep-conversations", locked: true },
        { id: "lesson5", title: "Lesson 5: Mastering Punjabi Idioms & Sounding Like a Local", link: "/lesson/punjabi-idioms", locked: true },
        { id: "lesson6", title: "Lesson 6: Handling Arguments & Disagreements in Punjabi", link: "/lesson/arguing-politely", locked: true },
    ];

    useEffect(() => {
        async function checkUserAndProgress() {
            const { data: sessionData, error } = await supabase.auth.getSession();
            if (error) {
                console.error("Supabase Auth Error:", error);
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

                const completed = progressData?.map(entry => entry.lesson_id) || [];
                setCompletedLessons(completed);
            }
        }

        checkUserAndProgress();
    }, []);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-50 to-white px-6 pt-40 pb-16">
            <div className="w-full max-w-5xl mb-10 flex justify-start">
                <button
                    onClick={() => router.push(user ? "/learning" : "/")}
                    className="bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:bg-blue-600 transition"
                >
                    ← Back to {user ? "Learning" : "Home"}
                </button>
            </div>

            <div className="w-full max-w-5xl mb-12">
                <Link href="/learning/resources">
                    <div className="p-6 bg-yellow-100 rounded-lg shadow-md border-2 border-yellow-300 transition-all hover:border-yellow-500 hover:shadow-xl transform hover:scale-105 cursor-pointer text-center">
                        <h2 className="text-3xl font-bold text-yellow-800">📚 Learning Resources</h2>
                        <p className="text-xl text-yellow-700 mt-2">Click here to access essential Punjabi learning materials.</p>
                    </div>
                </Link>
            </div>

            <div className="text-center max-w-3xl mb-12">
                <h1 className="text-5xl font-extrabold text-[var(--primary)] leading-tight">
                    Master Punjabi Conversations with Ease
                </h1>
                <p className="text-xl mt-3 text-gray-700">
                    Achieve fluency, understand native speakers, and sound like a local!
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-5xl w-full">
                {lessons.map((lesson, index) => (
                    <LessonCard
                        key={index}
                        lesson={{ ...lesson, completed: completedLessons.includes(lesson.id) }}
                        user={user}
                    />
                ))}
            </div>

            {!user && (
                <div className="mt-12 text-center">
                    <p className="text-xl font-semibold text-gray-700">🔒 Want full access to all lessons?</p>
                    <Link href="/key-functions/signup">
                        <button className="mt-4 bg-[var(--primary)] text-white px-6 py-3 rounded-lg text-xl font-semibold hover:bg-[var(--secondary)] transition transform hover:scale-105">
                            Subscribe to Unlock 🚀
                        </button>
                    </Link>
                </div>
            )}
        </div>
    );
}

// ✅ Updated Lesson Card with Completion Checkmark
function LessonCard({ lesson, user }) {
    return (
        <div className="relative p-8 bg-white rounded-lg shadow-md border-2 border-gray-200 transition-all hover:border-[3px] hover:border-green-500 hover:shadow-xl transform hover:scale-105 cursor-pointer text-center h-[250px] flex flex-col justify-center items-center">
            {/* ✅ Completion Tick */}
            {lesson.completed && (
                <div className="absolute top-4 right-4 text-green-600 text-2xl">✅</div>
            )}

            {lesson.locked && !user ? (
                <>
                    <div className="text-5xl">🔒</div>
                    <h3 className="text-2xl font-bold text-gray-700 mt-4">{lesson.title}</h3>
                    <p className="text-lg text-gray-500">Subscribe to unlock</p>
                </>
            ) : (
                <Link href={lesson.link} className="w-full h-full flex flex-col justify-center items-center">
                    <h3 className="text-2xl font-bold text-[var(--primary)] text-center">{lesson.title}</h3>
                </Link>
            )}
        </div>
    );
}

