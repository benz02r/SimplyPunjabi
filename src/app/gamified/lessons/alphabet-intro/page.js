"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

// First 4 letters of the Gurmukhi alphabet for the interactive introduction
const alphabet = [
    { gurmukhi: "ੳ", roman: "Ura", word: "ੳਲੂ (Alu)", meaning: "Potato", icon: "🥔", sound: "/sounds/ura.mp3" },
    { gurmukhi: "ਅ", roman: "Aira", word: "ਅੰਬ (Amb)", meaning: "Mango", icon: "🥭", sound: "/sounds/aira.mp3" },
    { gurmukhi: "ੲ", roman: "Iri", word: "ਇੱਕ (Ikk)", meaning: "One", icon: "1️⃣", sound: "/sounds/iri.mp3" },
    { gurmukhi: "ਸ", roman: "Sassa", word: "ਸੂਰਜ (Sooraj)", meaning: "Sun", icon: "☀️", sound: "/sounds/sassa.mp3" },
];

export default function AnimatedGurmukhiIntro() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const currentLetter = alphabet[currentIndex];
    const router = useRouter();

    const playSound = () => {
        const audio = new Audio(currentLetter.sound);
        audio.play().catch(err => console.error("Error playing sound:", err));
    };

    const nextLetter = () => {
        if (currentIndex < alphabet.length - 1) {
            setCurrentIndex(currentIndex + 1);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-6 pt-32 pb-20">

            {/* Back Button - Return to Alphabet Overview */}
            <div className="w-full max-w-4xl mb-8 flex justify-start">
                <button
                    onClick={() => router.push("/gamified/lessons/alphabet")}
                    className="bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:bg-blue-600 transition"
                >
                    ← Back to Alphabet Overview
                </button>
            </div>

            <motion.div
                key={currentLetter.gurmukhi}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.5 }}
                className="bg-white p-10 rounded-xl shadow-lg text-center border border-gray-300"
            >
                <motion.div
                    className="text-6xl font-extrabold text-[var(--primary)]"
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    {currentLetter.gurmukhi}
                </motion.div>

                <motion.div
                    className="text-2xl font-semibold text-gray-700 mt-4"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                >
                    {currentLetter.roman}
                </motion.div>

                <motion.div
                    className="mt-6 text-lg text-gray-700"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                >
                    {currentLetter.word} <span className="text-gray-500">({currentLetter.meaning})</span>
                </motion.div>

                <motion.div
                    className="text-5xl mt-4"
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.8 }}
                >
                    {currentLetter.icon}
                </motion.div>

                <motion.button
                    onClick={playSound}
                    className="mt-6 bg-green-500 text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:bg-green-600 transition"
                    whileHover={{ scale: 1.1 }}
                >
                    🔊 Hear Pronunciation
                </motion.button>

                {currentIndex < alphabet.length - 1 ? (
                    <motion.button
                        onClick={nextLetter}
                        className="mt-4 bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:bg-blue-600 transition"
                        whileHover={{ scale: 1.1 }}
                    >
                        Next Letter →
                    </motion.button>
                ) : (
                    <motion.button
                        onClick={() => router.push("/signup")}
                        className="mt-4 bg-orange-500 text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:bg-orange-600 transition"
                        whileHover={{ scale: 1.1 }}
                    >
                        🔒 Subscribe for More!
                    </motion.button>
                )}
            </motion.div>
        </div>
    );
}
