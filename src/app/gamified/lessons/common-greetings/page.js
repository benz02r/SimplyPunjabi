"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

// Common Punjabi common-greetings & phrases with speak-with-confidence and usage
const greetings = [
    { phrase: "ਸਤ ਸ੍ਰੀ ਅਕਾਲ", roman: "Sat Sri Akal", meaning: "A respectful greeting", icon: "🙏", sound: "/sounds/sat-sri-akal.mp3", scenario: "You're greeting someone formally in Punjabi." },
    { phrase: "ਹੈਲੋ", roman: "Hello", meaning: "Casual greeting", icon: "👋", sound: "/sounds/hello.mp3", scenario: "You're meeting a friend casually." },
    { phrase: "ਕਿਵੇਂ ਹੋ?", roman: "Kiven Ho?", meaning: "How are you?", icon: "🙂", sound: "/sounds/kiven-ho.mp3", scenario: "You're asking someone how they are feeling." },
    { phrase: "ਧੰਨਵਾਦ", roman: "Dhanvaad", meaning: "Thank you", icon: "🤝", sound: "/sounds/dhanvaad.mp3", scenario: "You're expressing gratitude to someone." },
    { phrase: "ਮੈਂ ਠੀਕ ਹਾਂ", roman: "Main Theek Haan", meaning: "I'm fine", icon: "😃", sound: "/sounds/main-theek-haan.mp3", scenario: "You're responding to someone asking how you are." },
];

export default function CommonGreetings() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const currentGreeting = greetings[currentIndex];
    const router = useRouter();

    const playSound = () => {
        const audio = new Audio(currentGreeting.sound);
        audio.play().catch(err => console.error("Error playing sound:", err));
    };

    const nextGreeting = () => {
        if (currentIndex < greetings.length - 1) {
            setCurrentIndex(currentIndex + 1);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-green-50 to-green-100 px-6 pt-32 pb-20">

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
                key={currentGreeting.phrase}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.5 }}
                className="bg-white p-10 rounded-xl shadow-lg text-center border border-gray-300"
            >
                <motion.div
                    className="text-xl font-semibold text-gray-600"
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    {currentGreeting.scenario}
                </motion.div>

                <motion.div
                    className="text-5xl font-extrabold text-[var(--primary)] mt-6"
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                >
                    {currentGreeting.phrase}
                </motion.div>

                <motion.div
                    className="text-2xl font-semibold text-gray-700 mt-4"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                >
                    {currentGreeting.roman}
                </motion.div>

                <motion.div
                    className="mt-6 text-lg text-gray-700"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.8 }}
                >
                    {currentGreeting.meaning}
                </motion.div>

                <motion.div
                    className="text-5xl mt-4"
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 1.0 }}
                >
                    {currentGreeting.icon}
                </motion.div>

                <motion.button
                    onClick={playSound}
                    className="mt-6 bg-green-500 text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:bg-green-600 transition"
                    whileHover={{ scale: 1.1 }}
                >
                    🔊 Hear Pronunciation
                </motion.button>

                {currentIndex < greetings.length - 1 ? (
                    <motion.button
                        onClick={nextGreeting}
                        className="mt-4 bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:bg-blue-600 transition"
                        whileHover={{ scale: 1.1 }}
                    >
                        Next Phrase →
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
