"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Lesson2MatchGame() {
    const router = useRouter();

    const pairs = [
        { id: 1, punjabi: "Sat Sri Akaal (ਸਤ ਸ੍ਰੀ ਅਕਾਲ)", english: "God is the Eternal Truth" },
        { id: 2, punjabi: "Ki Haal Aa? (ਕੀ ਹਾਲ ਆ?)", english: "How are you?" },
        { id: 3, punjabi: "Kidan? (ਕਿੱਧਾਂ?)", english: "What's up?" },
        { id: 4, punjabi: "Tusi Kidan Teekya? (ਤੁਸੀਂ ਕਿਵੇਂ ਟਿਕਿਆ?)", english: "How have you been? (formal)" }
    ];

    const shuffledPunjabi = [...pairs].sort(() => 0.5 - Math.random());
    const shuffledEnglish = [...pairs].sort(() => 0.5 - Math.random());

    const [selectedPunjabi, setSelectedPunjabi] = useState(null);
    const [matchedPairs, setMatchedPairs] = useState([]);

    const handleMatch = (eng, punjabi) => {
        if (eng.id === punjabi.id) {
            setMatchedPairs([...matchedPairs, eng.id]);
            setSelectedPunjabi(null);
        } else {
            setTimeout(() => setSelectedPunjabi(null), 500);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-white to-blue-50 px-6 pt-40 pb-16">
            <div className="w-full max-w-4xl mb-8 text-center">
                <h1 className="text-3xl sm:text-4xl font-extrabold text-[var(--primary)] mb-4">Match the Punjabi Greeting</h1>
                <p className="text-lg text-gray-700">Click a Punjabi phrase and match it to its English meaning.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 w-full max-w-4xl">
                <div>
                    <h2 className="text-xl font-bold mb-4">Punjabi</h2>
                    {shuffledPunjabi.map((item) => (
                        <button
                            key={item.id}
                            className={`block w-full text-left p-4 mb-3 rounded-lg shadow-md border ${
                                matchedPairs.includes(item.id)
                                    ? "bg-green-200 text-green-900"
                                    : selectedPunjabi?.id === item.id
                                        ? "bg-blue-200"
                                        : "bg-white hover:bg-gray-100"
                            }`}
                            onClick={() => setSelectedPunjabi(item)}
                            disabled={matchedPairs.includes(item.id)}
                        >
                            {item.punjabi}
                        </button>
                    ))}
                </div>

                <div>
                    <h2 className="text-xl font-bold mb-4">English</h2>
                    {shuffledEnglish.map((item) => (
                        <button
                            key={item.id}
                            className={`block w-full text-left p-4 mb-3 rounded-lg shadow-md border ${
                                matchedPairs.includes(item.id)
                                    ? "bg-green-200 text-green-900"
                                    : "bg-white hover:bg-gray-100"
                            }`}
                            onClick={() => selectedPunjabi && handleMatch(item, selectedPunjabi)}
                            disabled={matchedPairs.includes(item.id)}
                        >
                            {item.english}
                        </button>
                    ))}
                </div>
            </div>

            {matchedPairs.length === pairs.length && (
                <div className="mt-10 text-center">
                    <h3 className="text-2xl font-bold text-green-600 mb-4">Well done! You matched all greetings correctly.</h3>
                    <button
                        onClick={() => router.push("/lessons/lesson2/quiz")}
                        className="bg-green-500 text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:bg-green-600 transition"
                    >
                        Continue to Quiz →
                    </button>
                </div>
            )}
        </div>
    );
}
