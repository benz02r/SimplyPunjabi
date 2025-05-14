"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Lesson3Intro() {
    const router = useRouter();

    const characters = [
        {
            name: "Aman",
            avatar: "/avatars/avatar6.png",
            punjabi: "ਸਤ ਸ੍ਰੀ ਅਕਾਲ! ਮੇਰਾ ਨਾਮ ਅਮਨ ਹੈ।",
            roman: "Sat Sri Akaal! Mera naam Aman hai.",
            english: "Hello! My name is Aman."
        },
        {
            name: "Priya",
            avatar: "/avatars/avatar5.png",
            punjabi: "ਸਤ ਸ੍ਰੀ ਅਕਾਲ! ਮੇਰਾ ਨਾਮ ਪ੍ਰੀਆ ਹੈ।",
            roman: "Sat Sri Akaal! Mera naam Priya hai.",
            english: "Hello! My name is Priya."
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-b from-white to-blue-50 px-6 pt-36 pb-16">
            {/* Back Button */}
            <div className="max-w-4xl mx-auto mb-12">
                <button
                    onClick={() => router.push("/lessons/lesson3")}
                    className="bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold shadow hover:bg-blue-600 transition"
                >
                    ← Back to Lesson 3
                </button>
            </div>

            {/* Title */}
            <div className="text-center max-w-3xl mx-auto mb-10">
                <h1 className="text-4xl font-bold text-[var(--primary)]">Introduction</h1>
                <p className="text-lg text-gray-700 mt-2">Meet Aman and Priya. Learn how to introduce yourself in Punjabi.</p>
            </div>

            {/* Characters Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 max-w-5xl mx-auto">
                {characters.map((person, index) => (
                    <div
                        key={index}
                        className="group flex flex-col items-center text-center bg-white rounded-xl shadow-md border p-6 transition-all transform hover:scale-105 hover:shadow-2xl hover:border-blue-400 cursor-pointer"
                    >
                        <div className="relative w-24 h-24 mb-4">
                            <Image
                                src={person.avatar}
                                alt={person.name}
                                fill
                                className="rounded-full border-2 border-blue-500 object-cover"
                            />
                        </div>
                        <h2 className="text-xl font-bold text-blue-600 group-hover:underline">{person.name}</h2>
                        <p className="text-lg text-gray-800 mt-2">{person.punjabi}</p>
                        <p className="text-sm italic text-gray-600">{person.roman}</p>
                        <p className="text-sm text-gray-500">{person.english}</p>
                    </div>
                ))}
            </div>

            {/* Next Button */}
            <div className="text-center mt-12">
                <button
                    onClick={() => router.push("/lessons/lesson3/match")}
                    className="bg-green-500 text-white px-6 py-3 rounded-lg font-semibold shadow hover:bg-green-600 transition"
                >
                    Continue to "Introducing yourself" →
                </button>
            </div>
        </div>
    );
}
