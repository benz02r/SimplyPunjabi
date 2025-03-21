"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Lesson3NounsInfo() {
    const router = useRouter();
    const [revealed, setRevealed] = useState([false, false, false, false]);

    const toggleReveal = (index) => {
        setRevealed((prev) => prev.map((r, i) => (i === index ? !r : r)));
    };

    const nouns = [
        {
            title: "ਕਿਤਾਬ (Kitaab) — Book",
            meaning: "Main kitaab padhi → I read a book"
        },
        {
            title: "ਘਰ (Ghar) — House",
            meaning: "Eh mera ghar hai → This is my house"
        },
        {
            title: "ਪਾਣੀ (Paani) — Water",
            meaning: "Paani piyo → Drink water"
        },
        {
            title: "ਕੁੱਤਾ (Kutta) — Dog",
            meaning: "Kutta bhonk riha hai → The dog is barking"
        }
    ];

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-white to-blue-50 px-6 sm:px-10 pt-40 pb-16">
            {/* Back Button */}
            <div className="w-full max-w-4xl mb-12 sm:mb-14 px-4 sm:px-0">
                <button
                    onClick={() => router.push("/lessons/lesson3")}
                    className="bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:bg-blue-600 transition w-full sm:w-auto"
                >
                    ← Back to Lesson 3
                </button>
            </div>

            {/* Title */}
            <div className="text-center max-w-3xl mb-10 px-4 sm:px-0">
                <h1 className="text-3xl sm:text-4xl font-extrabold text-[var(--primary)] leading-tight">
                    Learn Basic Punjabi Nouns
                </h1>
                <p className="text-base sm:text-lg mt-3 text-gray-700">
                    Tap a card to reveal pronunciation and usage.
                </p>
            </div>

            {/* Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-10 max-w-4xl w-full px-4 sm:px-0">
                {nouns.map((noun, index) => (
                    <div
                        key={index}
                        className="p-6 bg-white rounded-lg shadow-md border border-gray-200 transition-all hover:border-green-500 hover:shadow-xl transform hover:scale-105 cursor-pointer text-center h-[180px] flex flex-col justify-center"
                        onClick={() => toggleReveal(index)}
                    >
                        <h3 className="text-lg sm:text-xl font-bold text-[var(--primary)]">
                            {noun.title}
                        </h3>
                        {revealed[index] && (
                            <p className="text-sm text-gray-600 mt-2">{noun.meaning}</p>
                        )}
                    </div>
                ))}
            </div>

            {/* Next Button */}
            <div className="w-full max-w-4xl px-4 sm:px-0 text-center mt-10">
                <button
                    onClick={() => router.push("/lessons/lesson3/match")}
                    className="bg-green-500 text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:bg-green-600 transition"
                >
                    Continue to "Match the Definition" →
                </button>
            </div>
        </div>
    );
}
