"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LearningResources() {
    const router = useRouter();

    const resources = [
        { title: "Gurmukhi Alphabet", link: "/resources/gurmukhi-alphabet" },
        { title: "Numbers in Punjabi", link: "/resources/numbers" }
    ];

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-white to-blue-50 px-6 sm:px-10 pt-20 pb-16">
            <div className="w-full max-w-4xl mb-10 flex justify-start">
                <button
                    onClick={() => router.push("/")}
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:bg-blue-700 transition"
                >
                    ← Back to Home
                </button>
            </div>

            <div className="text-center max-w-3xl mb-10">
                <h1 className="text-4xl font-extrabold text-gray-800 leading-tight">📚 Learning Resources</h1>
                <p className="text-lg mt-3 text-gray-700">
                    Find essential materials to strengthen your Punjabi learning journey.
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl w-full">
                {resources.map((resource, index) => (
                    <Link key={index} href={resource.link}>
                        <div className="p-6 bg-white rounded-lg shadow-md border-2 border-gray-200 transition-all hover:border-blue-500 hover:shadow-xl transform hover:scale-105 cursor-pointer text-center">
                            <h2 className="text-xl font-bold text-blue-800">{resource.title}</h2>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
