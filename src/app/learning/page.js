"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function LearningHub() {
    const [user, setUser] = useState(null);
    const router = useRouter();

    useEffect(() => {
        async function fetchUser() {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) {
                router.push("/login"); // Redirect if not logged in
            } else {
                setUser(user);
            }
        }
        fetchUser();
    }, [router]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-50 to-white px-6 pt-24">
            {/* Back to Dashboard Button */}
            <div className="absolute top-6 left-6">
                <button onClick={() => router.push("/dashboard")} className="bg-gray-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-gray-600 transition">
                    ← Back to Dashboard
                </button>
            </div>

            <div className="text-center max-w-3xl">
                <h1 className="text-4xl font-extrabold text-[var(--primary)] leading-tight">
                    Start Learning! 📚
                </h1>
                <p className="text-lg mt-3 text-gray-700">
                    Choose a learning path and improve your Punjabi skills!
                </p>
            </div>

            {/* Learning Paths */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-8 max-w-4xl w-full">
                <LearningCard
                    title="🔢 Alphabet & Numbers"
                    description="Master Gurmukhi letters and counting."
                    link="/learning/alphabet-numbers"
                    bgColor="bg-green-500"
                />
                <LearningCard
                    title="🔊 Pronunciation"
                    description="Improve your speaking and listening skills."
                    link="/learning/pronunciation"
                    bgColor="bg-blue-500"
                />
                <LearningCard
                    title="✍️ Reading & Writing"
                    description="Enhance your Punjabi reading and writing."
                    link="/learning/reading-writing"
                    bgColor="bg-purple-500"
                />
            </div>
        </div>
    );
}

// ✅ Reusable Learning Card Component
function LearningCard({ title, description, link, bgColor }) {
    return (
        <Link href={link} className="w-full">
            <div className={`p-6 ${bgColor} text-white rounded-lg shadow-md border-2 border-gray-200 transition-all hover:border-[3px] hover:border-orange-600 hover:shadow-xl transform hover:scale-105 cursor-pointer text-center`}>
                <h3 className="text-lg md:text-xl font-bold">{title}</h3>
                <p className="text-sm md:text-base">{description}</p>
            </div>
        </Link>
    );
}
