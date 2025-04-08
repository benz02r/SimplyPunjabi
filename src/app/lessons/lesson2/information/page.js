"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Lesson2GreetingsInfo() {
    const router = useRouter();
    const [revealed, setRevealed] = useState([false, false, false, false]);

    const toggleReveal = (index) => {
        setRevealed((prev) => prev.map((r, i) => (i === index ? !r : r)));
    };

    const greetings = [
        {
            title: "Sat Sri Akaal (ਸਤ ਸ੍ਰੀ ਅਕਾਲ)",
            meaning: "A respectful and spiritual greeting meaning 'God is the Eternal Truth'. Commonly used among Sikhs and Punjabi speakers."
        },
        {
            title: "Ki Haal Aa? (ਕੀ ਹਾਲ ਆ?)",
            meaning: "A casual way of asking 'How are you?' typically used among friends or people of the same age."
        },
        {
            title: "Kidan? (ਕਿੱਧਾਂ?)",
            meaning: "An informal and brief way of asking 'How are you?' similar to 'What's up?'."
        },
        {
            title: "Tusi Kidan Teekya? (ਤੁਸੀਂ ਕਿਵੇਂ ਟਿਕਿਆ?)",
            meaning: "A more formal or respectful way to ask someone how they are doing, often used when addressing elders or strangers."
        }
    ];

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-white to-blue-50 px-6 sm:px-10 pt-40 pb-16">
            {/* Back Button */}
            <div className="w-full max-w-4xl mb-12 sm:mb-14 px-4 sm:px-0">
                <button
                    onClick={() => router.push("/lessons/lesson2")}
                    className="bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:bg-blue-600 transition w-full sm:w-auto"
                >
                    ← Back to Lesson 2
                </button>
            </div>

            {/* Title & Instructions */}
            <div className="text-center max-w-3xl mb-10 px-4 sm:px-0">
                <h1 className="text-3xl sm:text-4xl font-extrabold text-[var(--primary)] leading-tight">
                    Common Punjabi Greetings
                </h1>
                <p className="text-base sm:text-lg mt-3 text-gray-700">
                    Tap a card to reveal the meaning and context behind each greeting.
                </p>
            </div>

            {/* Greeting Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-10 max-w-4xl w-full px-4 sm:px-0">
                {greetings.map((greeting, index) => (
                    <div
                        key={index}
                        className="p-6 bg-white rounded-lg shadow-md border border-gray-200 transition-all hover:border-green-500 hover:shadow-xl transform hover:scale-105 cursor-pointer text-center h-[200px] flex flex-col justify-center"
                        onClick={() => toggleReveal(index)}
                    >
                        <h3 className="text-lg sm:text-xl font-bold text-[var(--primary)]">
                            {greeting.title}
                        </h3>
                        {revealed[index] && (
                            <p className="text-sm text-gray-600 mt-2">{greeting.meaning}</p>
                        )}
                    </div>
                ))}
            </div>

            {/* Next Activity Button */}
            <div className="w-full max-w-4xl px-4 sm:px-0 text-center mt-10">
                <button
                    onClick={() => router.push("/lessons/lesson2/match")}
                    className="bg-green-500 text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:bg-green-600 transition"
                >
                    Continue to "Match the Definition" →
                </button>
            </div>
        </div>
    );
}
