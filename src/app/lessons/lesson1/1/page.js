"use client";

import { useRouter } from "next/navigation";

export default function Lesson1GurmukhiInfo() {
    const router = useRouter();

    return (
        <div className="min-h-screen bg-gradient-to-b from-white to-blue-50 px-6 pt-36 pb-20 flex flex-col items-center">
            {/* Back Button */}
            <div className="w-full max-w-4xl mb-12 text-left">
                <button
                    onClick={() => router.push("/learning/essential-punjabi")}
                    className="bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:bg-blue-600 hover:scale-105 transition"
                >
                    ← Back to Lessons
                </button>
            </div>

            {/* Header */}
            <div className="text-center max-w-3xl mb-12">
                <h1 className="text-4xl font-bold text-[var(--primary)] leading-tight">
                    History of Gurmukhi & Comparison with Hindi
                </h1>
                <p className="text-lg text-gray-700 mt-4">
                    Discover the roots of Gurmukhi, its importance in Punjabi culture, and how it differs from Hindi.
                </p>
            </div>

            {/* Main Content */}
            <div className="max-w-4xl w-full bg-white p-8 rounded-xl shadow-lg space-y-10 text-left text-gray-800 text-[17px]">
                <section>
                    <h2 className="text-2xl font-semibold text-[var(--primary)] mb-2"> Origins of Gurmukhi</h2>
                    <p>
                        Gurmukhi was standardized in the 16th century by Guru Angad Dev Ji to record the teachings of Guru Nanak Dev Ji.
                        Derived from ancient scripts like Laṇḍā, it was adapted to suit Punjabi pronunciation and became the backbone
                        of literacy in Punjab and Sikhism.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold text-[var(--primary)] mb-2"> Gurmukhi vs. Devanagari (Hindi Script)</h2>
                    <ul className="list-disc list-inside space-y-2">
                        <li>
                            <strong>Structural Design:</strong> Gurmukhi uses unique, rounded characters with a consistent top line.
                        </li>
                        <li>
                            <strong>Phonetic Accuracy:</strong> Designed for Punjabi sounds, while Devanagari supports Hindi, Sanskrit, and Marathi.
                        </li>
                        <li>
                            <strong>Cultural Identity:</strong> Gurmukhi is deeply tied to Sikhism and Punjabi heritage; Devanagari has roots in Hinduism and North Indian languages.
                        </li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold text-[var(--primary)] mb-2"> Why It Matters</h2>
                    <p>
                        Learning Gurmukhi helps you access Sikh scriptures, understand cultural expression, and connect with Punjabi
                        on a deeper level. It carries not only language but also identity and history.
                    </p>
                </section>
            </div>

            {/* Next Button */}
            <div className="w-full max-w-4xl text-center mt-10">
                <button
                    onClick={() => router.push("/lessons/lesson1/2")}
                    className="bg-green-500 text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:bg-green-600 hover:scale-105 transition"
                >
                    Continue to “Fill the Missing Gap” →
                </button>
            </div>
        </div>
    );
}
