"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Lesson4Hospital() {
    const router = useRouter();
    const [revealedIndex, setRevealedIndex] = useState(null);

    const phrases = [
        {
            punjabi: "ਮੇਰਾ ਅਪਰੇਸ਼ਨ ਹੋਇਆ।",
            translit: "Merā aparēśan hoiyā.",
            english: "I had an operation."
        },
        {
            punjabi: "ਮੇਰਾ ਐਕਸਰੇ ਹੋਇਆ ਸੀ।",
            translit: "Merā x-ray hoiyā sī.",
            english: "I had an x-ray."
        },
        {
            punjabi: "ਮੇਰਾ ਖੂਨ ਕੱਢਿਆ।",
            translit: "Merā khūn kaḍhiā.",
            english: "I had my blood taken."
        },
        {
            punjabi: "ਮੇਰੇ ਟਾਂਕੇ ਲਾਏ।",
            translit: "Merē ṭānke lāe.",
            english: "I got stitches."
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-b from-white to-blue-50 pt-32 pb-20 px-6 flex flex-col items-center">
            <div className="max-w-2xl w-full bg-white rounded-xl shadow-md p-8 text-center space-y-6 hover:shadow-xl transition-all">

                <h2 className="text-2xl font-bold text-gray-800">Hospital Visits & Procedures</h2>
                <p className="text-gray-600">Tap each card to reveal the English meaning of what happened.</p>

                {/* Flashcard Interaction */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
                    {phrases.map((item, i) => (
                        <div
                            key={i}
                            onClick={() => setRevealedIndex(i === revealedIndex ? null : i)}
                            className="bg-blue-50 hover:border-blue-400 border border-transparent rounded-lg p-4 shadow-sm cursor-pointer transition hover:shadow-md"
                        >
                            <p className="text-lg font-bold text-blue-800">{item.punjabi}</p>
                            {revealedIndex === i && (
                                <>
                                    <p className="italic text-gray-700">{item.translit}</p>
                                    <p className="text-sm text-gray-500">{item.english}</p>
                                </>
                            )}
                        </div>
                    ))}
                </div>

                <button
                    onClick={() => router.push("/lessons/lesson14/5")}
                    className="mt-8 bg-green-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-600 transition"
                >
                    Continue →
                </button>
            </div>
        </div>
    );
}
