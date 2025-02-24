"use client";

import Link from "next/link";

const lessons = [
    { id: "alphabet", title: "Punjabi Alphabet", description: "Learn the Gurmukhi script from scratch.", emoji: "🔠" },
    { id: "basic-phrases", title: "Basic Phrases", description: "Start speaking Punjabi with common expressions.", emoji: "🗣️" },
    { id: "numbers", title: "Numbers in Punjabi", description: "Learn to count and use numbers in Punjabi.", emoji: "🔢" },
    { id: "common-greetings", title: "Greetings", description: "Say hello and introduce yourself in Punjabi.", emoji: "👋" },
];

export default function ExploreLessonsPage() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-6 py-10">
            <div className="max-w-4xl w-full bg-white shadow-xl rounded-xl p-8 border border-gray-200">
                <h2 className="text-3xl font-bold text-center text-[var(--primary)] mb-6">
                    Explore Lessons 📚
                </h2>

                <p className="text-center text-gray-700 mb-6">
                    Choose a lesson to start learning Punjabi!
                </p>

                {/* Lessons Grid */}
                <div className="grid grid-cols-2 md:grid-cols-2 gap-6">
                    {lessons.map(({ id, title, description, emoji }) => (
                        <Link key={id} href={`/gamified/lessons/${id}`}>
                            <div className="flex flex-col items-center justify-center p-6 bg-gray-100 text-gray-800 rounded-xl shadow-md transition hover:bg-[var(--primary)] hover:text-white hover:scale-105 cursor-pointer">
                                <span className="text-4xl">{emoji}</span>
                                <h3 className="text-xl font-semibold mt-2">{title}</h3>
                                <p className="text-sm text-gray-600 mt-1">{description}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
