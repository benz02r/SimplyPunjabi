"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Lesson1Dashboard() {
    const router = useRouter();

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-50 to-white px-4 sm:px-6 pt-40 pb-16">
            <div className="w-full max-w-4xl mb-12 sm:mb-14 px-4 sm:px-0">
                <button
                    onClick={() => router.push("/learning/essential-punjabi")}
                    className="bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:bg-blue-600 transition w-full sm:w-auto"
                >
                    ← Back to Lessons
                </button>
            </div>

            <div className="text-center max-w-3xl mb-10 px-4 sm:px-0">
                <h1 className="text-3xl sm:text-4xl font-extrabold text-[var(--primary)] leading-tight">
                    Lesson 3: Basic Nouns
                </h1>
                <p className="text-base sm:text-lg mt-3 text-gray-700">
                    Learn some of the basic nouns in punjabi
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-10 max-w-4xl w-full px-4 sm:px-0">
                <Link href="/lessons/lesson3/information">
                    <div className="p-4 sm:p-6 bg-white rounded-lg shadow-md border border-gray-200 transition-all hover:border-green-500 hover:shadow-xl transform hover:scale-105 cursor-pointer text-center h-[180px] flex flex-col justify-between">
                        <h3 className="text-lg sm:text-xl font-bold text-[var(--primary)]">Information</h3>
                        <p className="text-xs sm:text-sm text-gray-600">Learn key concepts.</p>
                    </div>
                </Link>
                <Link href="/lessons/lesson3/match">
                    <div className="p-4 sm:p-6 bg-white rounded-lg shadow-md border border-gray-200 transition-all hover:border-green-500 hover:shadow-xl transform hover:scale-105 cursor-pointer text-center h-[180px] flex flex-col justify-between">
                        <h3 className="text-lg sm:text-xl font-bold text-[var(--primary)]">Match the Definition</h3>
                        <p className="text-xs sm:text-sm text-gray-600">Test your vocabulary skills.</p>
                    </div>
                </Link>
                <Link href="/lessons/lesson3/scenario">
                    <div className="p-4 sm:p-6 bg-white rounded-lg shadow-md border border-gray-200 transition-all hover:border-green-500 hover:shadow-xl transform hover:scale-105 cursor-pointer text-center h-[180px] flex flex-col justify-between">
                        <h3 className="text-lg sm:text-xl font-bold text-[var(--primary)]">Real-World Scenario</h3>
                        <p className="text-xs sm:text-sm text-gray-600">Practice conversations.</p>
                    </div>
                </Link>
                <Link href="/lessons/lesson3/quiz">
                    <div className="p-4 sm:p-6 bg-white rounded-lg shadow-md border border-gray-200 transition-all hover:border-green-500 hover:shadow-xl transform hover:scale-105 cursor-pointer text-center h-[180px] flex flex-col justify-between">
                        <h3 className="text-lg sm:text-xl font-bold text-[var(--primary)]">Quiz</h3>
                        <p className="text-xs sm:text-sm text-gray-600">Test your knowledge with questions.</p>
                    </div>
                </Link>
            </div>
        </div>
    );
}
