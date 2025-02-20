"use client";

import { useEffect, useState } from "react";

// Complete Punjabi Gurmukhi alphabet with example words
const alphabet = [
    { gurmukhi: "ੳ", roman: "Ura", word: "ੳਲੂ (Alu)", meaning: "Potato", icon: "🥔", sound: "/sounds/ura.mp3" },
    { gurmukhi: "ਅ", roman: "Aira", word: "ਅੰਬ (Amb)", meaning: "Mango", icon: "🥭", sound: "/sounds/aira.mp3" },
    { gurmukhi: "ੲ", roman: "Iri", word: "ਇੱਕ (Ikk)", meaning: "One", icon: "1️⃣", sound: "/sounds/iri.mp3" },
    { gurmukhi: "ਸ", roman: "Sassa", word: "ਸੂਰਜ (Sooraj)", meaning: "Sun", icon: "☀️", sound: "/sounds/sassa.mp3" },
];

export default function AlphabetPage() {
    const [audio, setAudio] = useState(null);

    useEffect(() => {
        if (typeof window !== "undefined") {
            setAudio(new Audio()); // Create audio object only in the browser
        }
    }, []);

    const playSound = (sound) => {
        if (audio) {
            audio.src = sound;
            audio.play().catch(err => console.error("Error playing sound:", err));
        } else {
            console.warn("Audio object is not ready yet.");
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-6 py-10">
            <div className="max-w-4xl w-full bg-white shadow-xl rounded-xl p-8 border border-gray-200">
                <h2 className="text-3xl font-bold text-center text-[var(--primary)] mb-6">
                    Learn the Punjabi Alphabet
                </h2>

                {/* Alphabet Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {alphabet.map(({ gurmukhi, roman, word, meaning, icon, sound }, index) => (
                        <button
                            key={index}
                            onClick={() => playSound(sound)}
                            className="flex flex-col items-center justify-center p-4 bg-gray-100 text-gray-800 text-lg font-bold rounded-lg shadow-md transition hover:bg-[var(--primary)] hover:text-white"
                        >
                            <span className="text-4xl">{gurmukhi}</span>
                            <span className="text-sm mt-1">{roman}</span>
                            <span className="text-md mt-2 font-semibold">{word}</span>
                            <span className="text-sm text-gray-600">{meaning}</span>
                            <span className="text-2xl mt-2">{icon}</span>
                        </button>
                    ))}
                </div>

                {/* Extra Learning Notes */}
                <div className="mt-6 p-4 bg-gray-100 rounded-lg text-center text-gray-700">
                    <p className="text-lg font-semibold">
                        Click on any letter to hear its pronunciation 🎧
                    </p>
                    <p className="text-sm mt-2">
                        The Punjabi alphabet (Gurmukhi script) consists of **35 main letters**. This interactive tool will help you familiarize yourself with each character and its pronunciation.
                    </p>
                </div>
            </div>
        </div>
    );
}
