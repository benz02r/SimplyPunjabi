"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Confetti from "react-confetti";

const punjabiNumbers = [
    { number: 0, english: "Zero", punjabiDigit: "੦", punjabiWord: "ਸਿਫਰ", romanized: "sifar" },
    { number: 1, english: "One", punjabiDigit: "੧", punjabiWord: "ਇੱਕ", romanized: "ik" },
    { number: 2, english: "Two", punjabiDigit: "੨", punjabiWord: "ਦੋ", romanized: "do" },
    { number: 3, english: "Three", punjabiDigit: "੩", punjabiWord: "ਤਿੰਨ", romanized: "tinn" },
    { number: 4, english: "Four", punjabiDigit: "੪", punjabiWord: "ਚਾਰ", romanized: "chār" },
    { number: 5, english: "Five", punjabiDigit: "੫", punjabiWord: "ਪੰਜ", romanized: "punj" },
    { number: 6, english: "Six", punjabiDigit: "੬", punjabiWord: "ਛੇ", romanized: "chhe" },
    { number: 7, english: "Seven", punjabiDigit: "੭", punjabiWord: "ਸੱਤ", romanized: "sat" },
    { number: 8, english: "Eight", punjabiDigit: "੮", punjabiWord: "ਅੱਠ", romanized: "aṭṭ" },
    { number: 9, english: "Nine", punjabiDigit: "੯", punjabiWord: "ਨੌ", romanized: "nau" },
    { number: 10, english: "Ten", punjabiDigit: "੧੦", punjabiWord: "ਦਸ", romanized: "dus" },
];

export default function PunjabiNumbersLesson() {
    const [flipped, setFlipped] = useState({});
    const [showConfetti, setShowConfetti] = useState(false);
    const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

    useEffect(() => {
        setWindowSize({ width: window.innerWidth, height: window.innerHeight });
        const handleResize = () => setWindowSize({ width: window.innerWidth, height: window.innerHeight });
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const toggleFlip = (index) => {
        setFlipped((prev) => ({
            ...prev,
            [index]: !prev[index],
        }));
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 1500);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-yellow-100 to-white p-6 pt-24">
            {showConfetti && <Confetti width={windowSize.width} height={windowSize.height} numberOfPieces={200} gravity={0.2} />}
            <h1 className="text-4xl font-extrabold text-[var(--primary)] mb-6">Learn Punjabi Numbers 🔢</h1>
            <p className="text-lg text-gray-700 mb-8 text-center max-w-2xl">Tap on a number to reveal its Punjabi equivalent and pronunciation.</p>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                {punjabiNumbers.map((item, index) => (
                    <motion.div
                        key={index}
                        className="w-32 h-32 flex flex-col items-center justify-center bg-white rounded-xl shadow-lg border-4 border-gray-300 cursor-pointer text-3xl font-bold text-[var(--primary)] p-4 text-center hover:bg-yellow-200 transition-all duration-300 ease-in-out transform hover:scale-105"
                        onClick={() => toggleFlip(index)}
                        whileHover={{ scale: 1.1 }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        {flipped[index] ? (
                            <div className="text-center text-xl">
                                <p className="font-semibold text-gray-800">{item.punjabiWord}</p>
                                <p className="text-sm text-gray-600">({item.romanized})</p>
                                <p className="text-4xl">{item.punjabiDigit}</p>
                            </div>
                        ) : (
                            <p>{item.english}</p>
                        )}
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
