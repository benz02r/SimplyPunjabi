"use client";

import { useRouter } from "next/navigation";

export default function Lesson1GreetingsInfo() {
    const router = useRouter();

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-white to-blue-50 px-6 sm:px-10 pt-40 pb-16">
            {/* Back Button */}
            <div className="w-full max-w-4xl mb-12 sm:mb-14 px-4 sm:px-0">
                <button
                    onClick={() => router.push("/lessons/lesson1")}
                    className="bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:bg-blue-600 transition w-full sm:w-auto"
                >
                    ← Back to Lesson 1
                </button>
            </div>

            {/* Title & Lesson Content */}
            <div className="text-center max-w-3xl mb-10 px-4 sm:px-0">
                <h1 className="text-3xl sm:text-4xl font-extrabold text-[var(--primary)] leading-tight">
                    Lesson 1: Punjabi Greetings & Their Meanings
                </h1>
                <p className="text-base sm:text-lg mt-3 text-gray-700">
                    Learn the meanings and pronunciation of common Punjabi greetings.
                </p>
            </div>

            {/* Key Greetings Section */}
            <div className="max-w-4xl w-full bg-white p-6 sm:p-8 rounded-lg shadow-md border border-gray-200 mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Punjabi Greetings with Meanings</h2>
                <ul className="text-lg text-gray-700 space-y-3">
                    <li><strong>ਸਤ ਸ੍ਰੀ ਅਕਾਲ (Sat Sri Akaal)</strong> – "God is the Eternal Truth" (A respectful Sikh greeting)</li>
                    <li><strong>ਤੁਸੀਂ ਕਿਵੇਂ ਹੋ? (Tusi Kiven Ho?)</strong> – "How are you?" (Used to ask about well-being)</li>
                    <li><strong>ਮੈਂ ਵਧੀਆ ਹਾਂ (Main Wadia Haan)</strong> – "I am good" (A common response to 'How are you?')</li>
                    <li><strong>ਆਓ ਜੀ (Aao Ji)</strong> – "Welcome!" (A warm way to greet someone arriving)</li>
                    <li><strong>ਫਿਰ ਮਿਲਾਂਗੇ (Phir Milange)</strong> – "We will meet again" (Used when parting ways)</li>
                </ul>
            </div>

            {/* Example Conversations */}
            <div className="max-w-4xl w-full bg-white p-6 sm:p-8 rounded-lg shadow-md border border-gray-200 mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Example Conversations</h2>
                <div className="text-lg text-gray-700">
                    <p><strong>Person 1:</strong> ਸਤ ਸ੍ਰੀ ਅਕਾਲ! (Sat Sri Akaal!)</p>
                    <p><strong>Person 2:</strong> ਸਤ ਸ੍ਰੀ ਅਕਾਲ! ਤੁਸੀਂ ਕਿਵੇਂ ਹੋ? (Sat Sri Akaal! Tusi Kiven Ho?)</p>
                    <p><strong>Person 1:</strong> ਮੈਂ ਵਧੀਆ ਹਾਂ, ਤੁਹਾਡਾ ਕੀ ਹਾਲ ਹੈ? (Main Wadia Haan, Tuhada Ki Haal Hai?)</p>
                    <p><strong>Person 2:</strong> ਮੈਂ ਵੀ ਵਧੀਆ ਹਾਂ! (Main Vi Wadia Haan!)</p>
                </div>
            </div>

            {/* Next Activity Button */}
            <div className="w-full max-w-4xl px-4 sm:px-0 text-center">
                <button
                    onClick={() => router.push("/lessons/lesson1/match")}
                    className="bg-green-500 text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:bg-green-600 transition"
                >
                    Continue to "Match the Definition" →
                </button>
            </div>
        </div>
    );
}
