"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { FaBookOpen } from "react-icons/fa";

export default function LearningHub() {
    const [user, setUser] = useState(null);
    const router = useRouter();


    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-50 to-white px-6 pt-32 md:pt-24 pb-16">

            {/* Back to Dashboard Button */}
            <div className="absolute top-4 left-4 md:top-6 md:left-6">
                <button
                    onClick={() => router.push("/")}
                    className="bg-gray-500 text-white px-4 py-2 rounded-lg font-semibold shadow-md hover:bg-gray-600 transition"
                >
                    ← Back to Home
                </button>
            </div>

            {/* Title & Subtitle */}
            <div className="text-center max-w-3xl mb-12 md:mb-10">
                <h1 className="text-3xl md:text-4xl font-extrabold text-[var(--primary)] leading-tight">
                    Start Learning The Basics
                </h1>
                <p className="text-lg mt-3 text-gray-700">
                    Choose An Area To Master
                </p>
            </div>

            {/* Learning Paths */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4 max-w-4xl w-full">
                <LearningCard
                    title="Colours"
                    description="Learn The Colours Of Punjab"
                    link="/learning/essential-punjabi"
                    bgColor="bg-blue-500"
                />
                <LearningCard
                    title="Days Of The Week"
                    description="Learn The Days Of The Week In Punjabi"
                    link="/learning/speak-with-confidence"
                    bgColor="bg-orange-400"
                />
                <LearningCard
                    title="Weather And Seasons"
                    description="Learn The Weather And Seasons Of Punjab"
                    link="/learning/master-punjabi"
                    bgColor="bg-purple-500"
                />
                <LearningCard
                    title="Tell The Time"
                    description="Learn How To Tell The Time In Punjabi"
                    link="/learning/master-punjabi"
                    bgColor="bg-green-500"
                />
            </div>



        </div>
    );
}

// ✅ Reusable Learning Card Component (Uniform Size)
function LearningCard({ title, description, link, bgColor }) {
    return (
        <Link href={link} className="w-full">
            <div className={`p-6 ${bgColor} text-white rounded-lg shadow-md border-2 border-gray-200 transition-all hover:border-[3px] hover:border-orange-600 hover:shadow-xl transform hover:scale-105 cursor-pointer min-h-[230px] flex flex-col justify-between items-center text-center`}>
                <h3 className="text-lg md:text-xl font-bold">{title}</h3>
                <p className="text-sm md:text-base mt-2">{description}</p>
            </div>
        </Link>
    );
}
