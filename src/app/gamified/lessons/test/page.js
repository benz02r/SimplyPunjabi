"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const alphabet = [
    { gurmukhi: "ਕ", roman: "Kakka", word: "ਕਮਲ (Kamal)", meaning: "Lotus", icon: "🌸", sound: "/sounds/kakka.mp3" },
    { gurmukhi: "ਖ", roman: "Khakha", word: "ਖਰਗੋਸ਼ (Khargosh)", meaning: "Rabbit", icon: "🐇", sound: "/sounds/khakha.mp3" },
    { gurmukhi: "ਗ", roman: "Gagga", word: "ਗਮਲਾ (Gamla)", meaning: "Pot", icon: "🪴", sound: "/sounds/gagga.mp3" },
];

export default function AnimatedGurmukhiIntro() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const currentLetter = alphabet[currentIndex];

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
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-6 pt-24 pb-20">
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

                <motion.button
                    onClick={nextLetter}
                    className={`mt-4 px-6 py-3 rounded-lg font-semibold shadow-md transition ${currentIndex < alphabet.length - 1 ? "bg-blue-500 hover:bg-blue-600 text-white" : "bg-gray-400 text-white cursor-not-allowed"}`}
                    whileHover={{ scale: 1.1 }}
                    disabled={currentIndex >= alphabet.length - 1}
                >
                    {currentIndex < alphabet.length - 1 ? "Next Letter →" : "🎉 Lesson Complete"}
                </motion.button>
            </motion.div>
        </div>
    );
}
