"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Lesson4Symptoms() {
    const router = useRouter();
    const [revealedIndex, setRevealedIndex] = useState(null);

    const symptoms = [
        {
            punjabi: "ਮੈਨੂੰ ਬੁਖ਼ਾਰ ਚੜਿਆ",
            translit: "Mainū bukhār chaṛiā",
            english: "I have a fever"
        },
        {
            punjabi: "ਮੈਨੂੰ ਜ਼ੁਕਾਮ ਹੋਇਆ",
            translit: "Mainū zukām hoiyā",
            english: "I have a cold/flu"
        },
        {
            punjabi: "ਮੇਰਾ ਸਿਰ ਦੁਖਦਾ",
            translit: "Merā sir dukhda",
            english: "My head hurts"
        },
        {
            punjabi: "ਮੇਰਾ ਪੇਟ ਦੁਖਦਾ",
            translit: "Merā pēṭ dukhda",
            english: "My stomach hurts"
        },
        {
            punjabi: "ਮੈਨੂੰ ਉਲਟੀ ਆਈ",
            translit: "Mainū ulṭī ā’ī",
            english: "I vomited / I feel sick"
        },
        {
            punjabi: "ਮੈਨੂੰ ਖੰਘ ਹੋਈ ਹੈ",
            translit: "Mainū khaṅgh hoī hai",
            english: "I have a cough"
        }
    ];

    const bodyParts = [
        { punjabi: "ਸਿਰ", translit: "sir", english: "head" },
        { punjabi: "ਅੱਖ", translit: "akh", english: "eye" },
        { punjabi: "ਕੰਨ", translit: "kan", english: "ear" },
        { punjabi: "ਨੱਕ", translit: "nakk", english: "nose" },
        { punjabi: "ਮੂੰਹ", translit: "mooh", english: "mouth" },
        { punjabi: "ਹੱਥ", translit: "hath", english: "hand" },
        { punjabi: "ਪੈਰ", translit: "pair", english: "foot" },
        { punjabi: "ਪੇਟ", translit: "pet", english: "stomach" },
        { punjabi: "ਲੱਤ", translit: "latt", english: "leg" },
        { punjabi: "ਉਂਗਲ", translit: "ungal", english: "finger" }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-b from-white to-blue-50 pt-32 pb-20 px-6 flex flex-col items-center">
            <div className="max-w-2xl w-full bg-white rounded-xl shadow-md p-8 space-y-6 text-center hover:shadow-xl transition-all">

                <h2 className="text-2xl font-bold text-gray-800">Describing Your Symptoms</h2>
                <p className="text-gray-600">Tap a card below to reveal what it means.</p>

                {/* Symptom Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {symptoms.map((symptom, i) => (
                        <div
                            key={i}
                            onClick={() => setRevealedIndex(i === revealedIndex ? null : i)}
                            className="bg-blue-50 border hover:border-blue-500 rounded-lg p-4 shadow-sm cursor-pointer transition hover:shadow-md"
                        >
                            <p className="text-lg font-bold text-blue-700">{symptom.punjabi}</p>
                            {revealedIndex === i && (
                                <>
                                    <p className="italic text-gray-600">{symptom.translit}</p>
                                    <p className="text-sm text-gray-500">{symptom.english}</p>
                                </>
                            )}
                        </div>
                    ))}
                </div>

                <h2 className="text-2xl font-bold text-gray-800 mt-10">Useful Body Parts</h2>
                <p className="text-gray-600">Here are some key words that will help you describe pain or symptoms.</p>

                {/* Body Part Cards */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-left mt-4">
                    {bodyParts.map((part, i) => (
                        <div key={i} className="bg-yellow-50 border rounded-lg p-3 shadow-sm">
                            <p className="text-lg font-semibold text-yellow-800">{part.punjabi}</p>
                            <p className="text-sm italic text-gray-600">{part.translit}</p>
                            <p className="text-sm text-gray-500">{part.english}</p>
                        </div>
                    ))}
                </div>

                {/* Continue */}
                <button
                    onClick={() => router.push("/lessons/lesson14/3")}
                    className="mt-6 bg-green-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-600 transition"
                >
                    Continue →
                </button>
            </div>
        </div>
    );
}
