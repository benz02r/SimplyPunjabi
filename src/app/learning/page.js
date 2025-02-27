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
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-50 to-white px-6 pt-24 pb-12">

            {/* Back to Dashboard Button */}
            <div className="absolute top-6 left-6">
                <button onClick={() => router.push("/dashboard")} className="bg-gray-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-gray-600 transition">
                    ← Back to Dashboard
                </button>
            </div>

            {/* Title & Subtitle */}
            <div className="text-center max-w-3xl mb-10">
                <h1 className="text-4xl font-extrabold text-[var(--primary)] leading-tight">
                    Start Learning! 📚
                </h1>
                <p className="text-lg mt-3 text-gray-700">
                    Choose a learning path and improve your Punjabi skills!
                </p>
            </div>

            {/* Learning Paths */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-4xl w-full">
                <LearningCard
                    title="🟢 Essential Punjabi for Real Conversations"
                    description="Start speaking Punjabi from Day 1 with must-know words & phrases!"
                    link="/learning/essential-punjabi"
                    bgColor="bg-green-500"
                />
                <LearningCard
                    title="🟡 Speak with Confidence – Beyond the Basics"
                    description="Expand your vocabulary and engage in real-life conversations!"
                    link="/learning/speak-with-confidence"
                    bgColor="bg-blue-500"
                />
                <LearningCard
                    title="🔴 Master Punjabi Conversations with Ease"
                    description="Achieve fluency, understand native speakers, and sound natural!"
                    link="/learning/master-punjabi"
                    bgColor="bg-purple-500"
                />
            </div>
        </div>
    );
}

// ✅ Reusable Learning Card Component (Uniform Size)
function LearningCard({ title, description, link, bgColor }) {
    return (
        <Link href={link} className="w-full">
            <div className={`p-6 ${bgColor} text-white rounded-lg shadow-md border-2 border-gray-200 transition-all hover:border-[3px] hover:border-orange-600 hover:shadow-xl transform hover:scale-105 cursor-pointer h-[230px] flex flex-col justify-between items-center`}>
                <h3 className="text-lg md:text-xl font-bold">{title}</h3>
                <p className="text-sm md:text-base mt-2 text-center">{description}</p>
            </div>
        </Link>
    );
}
