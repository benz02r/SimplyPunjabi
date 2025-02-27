"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

// Numbers 1-10 in Punjabi with speak-with-confidence and visuals
const numbers = [
    { digit: "੧", roman: "Ikk", word: "ਇੱਕ (Ikk)", meaning: "One", icon: "1️⃣", sound: "/sounds/1.mp3" },
    { digit: "੨", roman: "Do", word: "ਦੋ (Do)", meaning: "Two", icon: "2️⃣", sound: "/sounds/2.mp3" },
    { digit: "੩", roman: "Tin", word: "ਤਿੰਨ (Tin)", meaning: "Three", icon: "3️⃣", sound: "/sounds/3.mp3" },
    { digit: "੪", roman: "Char", word: "ਚਾਰ (Char)", meaning: "Four", icon: "4️⃣", sound: "/sounds/4.mp3" },
    { digit: "੫", roman: "Panj", word: "ਪੰਜ (Panj)", meaning: "Five", icon: "5️⃣", sound: "/sounds/5.mp3" },
    { digit: "੬", roman: "Che", word: "ਛੇ (Che)", meaning: "Six", icon: "6️⃣", sound: "/sounds/6.mp3" },
    { digit: "੭", roman: "Satt", word: "ਸੱਤ (Satt)", meaning: "Seven", icon: "7️⃣", sound: "/sounds/7.mp3" },
    { digit: "੮", roman: "Ath", word: "ਅੱਠ (Ath)", meaning: "Eight", icon: "8️⃣", sound: "/sounds/8.mp3" },
    { digit: "੯", roman: "Nau", word: "ਨੌ (Nau)", meaning: "Nine", icon: "9️⃣", sound: "/sounds/9.mp3" },
    { digit: "੧੦", roman: "Das", word: "ਦਸ (Das)", meaning: "Ten", icon: "🔟", sound: "/sounds/10.mp3" },
];

export default function CountingTo10Lesson() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const currentNumber = numbers[currentIndex];
    const router = useRouter();

    const playSound = () => {
        const audio = new Audio(currentNumber.sound);
        audio.play().catch(err => console.error("Error playing sound:", err));
    };

    const nextNumber = () => {
        if (currentIndex < numbers.length - 1) {
            setCurrentIndex(currentIndex + 1);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-yellow-50 to-orange-100 px-6 pt-32 pb-20">

            {/* Back Button - Return to Lessons */}
            <div className="w-full max-w-4xl mb-8 flex justify-start">
                <button
                    onClick={() => router.push("/learning/alphabet-numbers")}
                    className="bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:bg-blue-600 transition"
                >
                    ← Back to Lessons
                </button>
            </div>

            <motion.div
                key={currentNumber.digit}
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
                    {currentNumber.digit}
                </motion.div>

                <motion.div
                    className="text-2xl font-semibold text-gray-700 mt-4"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                >
                    {currentNumber.roman}
                </motion.div>

                <motion.div
                    className="mt-6 text-lg text-gray-700"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                >
                    {currentNumber.word} <span className="text-gray-500">({currentNumber.meaning})</span>
                </motion.div>

                <motion.div
                    className="text-5xl mt-4"
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.8 }}
                >
                    {currentNumber.icon}
                </motion.div>

                <motion.button
                    onClick={playSound}
                    className="mt-6 bg-green-500 text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:bg-green-600 transition"
                    whileHover={{ scale: 1.1 }}
                >
                    🔊 Hear Pronunciation
                </motion.button>

                {currentIndex < numbers.length - 1 ? (
                    <motion.button
                        onClick={nextNumber}
                        className="mt-4 bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:bg-blue-600 transition"
                        whileHover={{ scale: 1.1 }}
                    >
                        Next Number →
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
