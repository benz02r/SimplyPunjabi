"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Lesson3MatchGame() {
    const router = useRouter();
    const [cards, setCards] = useState(shuffleCards());
    const [flipped, setFlipped] = useState([]);
    const [matched, setMatched] = useState([]);

    const pairColors = {
        1: "bg-yellow-200",
        2: "bg-blue-200",
        3: "bg-purple-200",
        4: "bg-pink-200"
    };

    function shuffleCards() {
        const nouns = [
            { id: 1, text: "ਕਿਤਾਬ (Kitaab)", pairId: 101 },
            { id: 2, text: "ਘਰ (Ghar)", pairId: 102 },
            { id: 3, text: "ਪਾਣੀ (Paani)", pairId: 103 },
            { id: 4, text: "ਕੁੱਤਾ (Kutta)", pairId: 104 },
            { id: 101, text: "Book", pairId: 1 },
            { id: 102, text: "House", pairId: 2 },
            { id: 103, text: "Water", pairId: 3 },
            { id: 104, text: "Dog", pairId: 4 }
        ];
        return nouns.sort(() => Math.random() - 0.5);
    }

    const handleCardClick = (id) => {
        if (flipped.length === 2 || matched.includes(id)) return;
        setFlipped([...flipped, id]);
    };

    if (flipped.length === 2) {
        setTimeout(() => {
            const [first, second] = flipped;
            const firstCard = cards.find(card => card.id === first);
            const secondCard = cards.find(card => card.id === second);
            if (firstCard.pairId === secondCard.id) {
                setMatched([...matched, first, second]);
            }
            setFlipped([]);
        }, 800);
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-white to-blue-50 px-6 sm:px-10 pt-16 pb-10">
            <div className="w-full max-w-2xl mb-6 text-center">
                <button onClick={() => router.push("/lessons/lesson3")} className="bg-blue-500 text-white px-5 py-2 rounded-lg shadow-lg hover:bg-blue-600 transition">
                    ← Back to Lesson 3
                </button>
                <h1 className="text-3xl font-bold mt-6 text-gray-800">Match the Basic Nouns</h1>
                <p className="text-lg text-gray-700 mt-2">Match the Punjabi word with its English meaning.</p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl">
                {cards.map((card) => (
                    <button
                        key={card.id}
                        className={`p-4 w-32 h-36 sm:w-40 sm:h-44 rounded-xl shadow-lg border border-gray-300 flex items-center justify-center text-center text-sm sm:text-base font-semibold transition-all transform hover:scale-105 overflow-hidden 
                ${flipped.includes(card.id) || matched.includes(card.id) ? pairColors[card.pairId % 4 + 1] : 'bg-gray-200'}`}
                        onClick={() => handleCardClick(card.id)}
                    >
                        <span className="px-2 break-words leading-tight">
                            {flipped.includes(card.id) || matched.includes(card.id) ? card.text : "❓"}
                        </span>
                    </button>
                ))}
            </div>

            <div className="w-full max-w-2xl text-center mt-8">
                <button onClick={() => router.push("/lessons/lesson3/scenario")} className="bg-green-500 text-white px-5 py-2 rounded-lg shadow-lg hover:bg-green-600 transition">
                    Continue to "Real-World Scenario" →
                </button>
            </div>
        </div>
    );
}
