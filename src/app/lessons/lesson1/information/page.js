"use client";

import { useRouter } from "next/navigation";

export default function Lesson1GurmukhiInfo() {
    const router = useRouter();

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-white to-blue-50 px-6 sm:px-10 pt-40 pb-16">
            {/* Back Button */}
            <div className="w-full max-w-4xl mb-12 sm:mb-14 px-4 sm:px-0">
                <button
                    onClick={() => router.push("/learning/essential-punjabi")}
                    className="bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:bg-blue-600 transition w-full sm:w-auto"
                >
                    ← Back to Lessons
                </button>
            </div>

            {/* Title */}
            <div className="text-center max-w-3xl mb-10 px-4 sm:px-0">
                <h1 className="text-3xl sm:text-4xl font-extrabold text-[var(--primary)] leading-tight">
                    History of Gurmukhi & Comparison with Hindi
                </h1>
                <p className="text-base sm:text-lg mt-3 text-gray-700">
                    Learn where Gurmukhi comes from, why it matters, and how it differs from Hindi.
                </p>
            </div>

            {/* Content */}
            <div className="max-w-4xl w-full bg-white rounded-lg shadow-md p-8 text-gray-800 space-y-6 text-lg">
                <div>
                    <h2 className="text-2xl font-bold mb-2">Origins of Gurmukhi</h2>
                    <p>
                        The Gurmukhi script was standardized by Guru Angad Dev Ji in the 16th century to faithfully document the teachings of Guru Nanak Dev Ji. Derived from ancient scripts like Laṁḍā, Gurmukhi was uniquely shaped to suit the phonetics of the Punjabi language. This script played a crucial role in spreading Sikh teachings and fostering literacy across Punjab.
                    </p>
                </div>

                <div>
                    <h2 className="text-2xl font-bold mb-2">Gurmukhi vs. Devanagari (Hindi Script)</h2>
                    <ul className="list-disc list-inside space-y-2">
                        <li><strong>Structural Design:</strong> Gurmukhi characters are distinct and they use a horizontal line a lot.</li>
                        <li><strong>Phonetic Fit:</strong> Gurmukhi was created to reflect Punjabi sounds, while Devanagari serves languages like Hindi, Sanskrit, and Marathi.</li>
                        <li><strong>Cultural Role:</strong> Gurmukhi is deeply connected to Sikhism and Punjabi identity. Devanagari is widely used in Hindu religious texts and across North India.</li>
                    </ul>
                </div>

                <div>
                    <h2 className="text-2xl font-bold mb-2">Why It Matters</h2>
                    <p>
                        Understanding Gurmukhi not only helps in reading Sikh scriptures but also unlocks authentic communication in Punjabi. It reflects cultural identity, history, and a unique phonetic structure that distinguishes it from other scripts used in India.
                    </p>
                </div>
            </div>

            {/* Next Button */}
            <div className="w-full max-w-4xl px-4 sm:px-0 text-center mt-10">
                <button
                    onClick={() => router.push("/lessons/lesson1/match")}
                    className="bg-green-500 text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:bg-green-600 transition"
                >
                    Continue to "Fill the missing gap" →
                </button>
            </div>
        </div>
    );
}
