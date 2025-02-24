"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

// Basic Punjabi Sounds with example words and audio
const sounds = [
    { letter: "ਅ", roman: "A", word: "ਅੰਬ (Amb)", meaning: "Mango", icon: "🥭", sound: "/sounds/a.mp3" },
    { letter: "ਇ", roman: "I", word: "ਇੱਕ (Ikk)", meaning: "One", icon: "1️⃣", sound: "/sounds/i.mp3" },
    { letter: "ਉ", roman: "U", word: "ਉੱਲੂ (Ullu)", meaning: "Owl", icon: "🦉", sound: "/sounds/u.mp3" },
    { letter: "ਏ", roman: "E", word: "ਏਡੀ (Eddi)", meaning: "Heel", icon: "👣", sound: "/sounds/e.mp3" },
    { letter: "ਓ", roman: "O", word: "ਓਲੇ (Ole)", meaning: "Hail", icon: "❄️", sound: "/sounds/o.mp3" },
];

export default function BasicPunjabiSounds() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const currentSound = sounds[currentIndex];
    const router = useRouter();

    const playSound = () => {
        const audio = new Audio(currentSound.sound);
        audio.play().catch(err => console.error("Error playing sound:", err));
    };

    const nextSound = () => {
        if (currentIndex < sounds.length - 1) {
            setCurrentIndex(currentIndex + 1);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 px-6 pt-32 pb-20">

            {/* Back Button - Return to Lessons */}
            <div className="w-full max-w-4xl mb-8 flex justify-start">
                <button
                    onClick={() => router.push("/learning/pronunciation")}
                    className="bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:bg-blue-600 transition"
                >
                    ← Back to Lessons
                </button>
            </div>

            <motion.div
                key={currentSound.letter}
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
                    {currentSound.letter}
                </motion.div>

                <motion.div
                    className="text-2xl font-semibold text-gray-700 mt-4"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                >
                    {currentSound.roman}
                </motion.div>

                <motion.div
                    className="mt-6 text-lg text-gray-700"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                >
                    {currentSound.word} <span className="text-gray-500">({currentSound.meaning})</span>
                </motion.div>

                <motion.div
                    className="text-5xl mt-4"
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.8 }}
                >
                    {currentSound.icon}
                </motion.div>

                <motion.button
                    onClick={playSound}
                    className="mt-6 bg-green-500 text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:bg-green-600 transition"
                    whileHover={{ scale: 1.1 }}
                >
                    🔊 Hear Pronunciation
                </motion.button>

                {currentIndex < sounds.length - 1 ? (
                    <motion.button
                        onClick={nextSound}
                        className="mt-4 bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:bg-blue-600 transition"
                        whileHover={{ scale: 1.1 }}
                    >
                        Next Sound →
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
