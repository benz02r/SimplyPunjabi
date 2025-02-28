"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const gurmukhiAlphabet = [
    { letter: "ਓ", englishSound: "Oorha", word: "ਉਠ (Oot)", symbol: "🐪" },
    { letter: "ਅ", englishSound: "Aira", word: "ਆਮ (Amb)", symbol: "🥭" },
    { letter: "ਔ", englishSound: "Eerhee", word: "ਇੱਟ (Itt)", symbol: "🧱" },
    { letter: "ਸ", englishSound: "Sassa", word: "ਸੱਪ (Sap)", symbol: "🐍" },
    { letter: "ਹ", englishSound: "Haha", word: "ਹਾਥੀ (Hathi)", symbol: "🐘" },
    { letter: "ਕ", englishSound: "Kakka", word: "ਕਾਰ (Car)", symbol: "🚗" },
    { letter: "ਖ", englishSound: "Khakha", word: "ਖੁੰਭ (Khumb)", symbol: "🍄" },
    { letter: "ਗ", englishSound: "Gagga", word: "ਗਾਂ (Gao)", symbol: "🐄" },
    { letter: "ਘ", englishSound: "Ghagha", word: "ਘਰ (Ghar)", symbol: "🏠" },
    { letter: "ਙ", englishSound: "Nganga", word: "ਵੰਗ (Vang)", symbol: "💍" },
    { letter: "ਚ", englishSound: "Chacha", word: "ਚਾਬੀ (Chabee)", symbol: "🔑" },
    { letter: "ਛ", englishSound: "Chhacha", word: "ਛਤਰੀ (Chhatri)", symbol: "☂️" },
    { letter: "ਜ", englishSound: "Jajja", word: "ਜਹਾਜ਼ (Jahaaj)", symbol: "✈️" },
    { letter: "ਝ", englishSound: "Jhajha", word: "ਝੰਡਾ (Jhanda)", symbol: "🏳️" },
    { letter: "ਞ", englishSound: "Nyanya", word: "ਜੰਝ (Janj)", symbol: "🎊" },
    { letter: "ਟ", englishSound: "Tatta", word: "ਟਮਾਟਰ (Tamatar)", symbol: "🍅" },
    { letter: "ਠ", englishSound: "Thatha", word: "ਠੋਡ਼ੀ (Thodi)", symbol: "🙂" },
    { letter: "ਡ", englishSound: "Dadda", word: "ਡੱਡੂ (Dadoo)", symbol: "🐸" },
    { letter: "ਢ", englishSound: "Dhadda", word: "ਢੋਲ (Dhol)", symbol: "🥁" },
    { letter: "ਣ", englishSound: "Nanna", word: "ਸਾਬਣ (Saban)", symbol: "🧼" },
    { letter: "ਤ", englishSound: "Tatta", word: "ਤਬਲਾ (Tabla)", symbol: "🥁" },
    { letter: "ਥ", englishSound: "Thatha", word: "ਥੈਲਾ (Thela)", symbol: "🛍️" },
    { letter: "ਦ", englishSound: "Dadda", word: "ਦੂਧ (Doodh)", symbol: "🥛" },
    { letter: "ਧ", englishSound: "Dhadda", word: "ਧੁੱਪ (Dhup)", symbol: "☀️" },
    { letter: "ਨ", englishSound: "Nanna", word: "ਨਾਰੀਅਲ (Nariyal)", symbol: "🥥" },
    { letter: "ਪ", englishSound: "Pappa", word: "ਪਾਣੀ (Paani)", symbol: "💧" },
    { letter: "ਫ", englishSound: "Phaphha", word: "ਫਲ (Phal)", symbol: "🍉" },
    { letter: "ਬ", englishSound: "Babba", word: "ਬੰਦਰ (Bandhar)", symbol: "🐒" },
    { letter: "ਭ", englishSound: "Bhabha", word: "ਭਾਲੂ (Bhaloo)", symbol: "🐻" },
    { letter: "ਮ", englishSound: "Mamma", word: "ਮੱਛੀ (Machhi)", symbol: "🐟" },
    { letter: "ਯ", englishSound: "Yayya", word: "ਯੱਕਾ (Yakka)", symbol: "🐂" },
    { letter: "ਰ", englishSound: "Rarra", word: "ਰੰਗ (Rang)", symbol: "🌈" },
    { letter: "ਲ", englishSound: "Lalla", word: "ਲੱਡੂ (Ladoo)", symbol: "🍬" },
    { letter: "ਵ", englishSound: "Vavva", word: "ਵਾਜਾ (Vaja)", symbol: "🎹" },
    { letter: "ੜ", englishSound: "Rharha", word: "ਘੋੜਾ (Ghora)", symbol: "🐴" }
];

export default function GurmukhiLesson() {
    const [flipped, setFlipped] = useState({});

    const toggleFlip = (index) => {
        setFlipped((prev) => ({
            ...prev,
            [index]: !prev[index],
        }));
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-100 to-white p-6 pt-24">
            <h1 className="text-4xl font-extrabold text-[var(--primary)] mb-6">Crack the Punjabi Code - Gurmukhi Alphabet 🔤</h1>
            <p className="text-lg text-gray-700 mb-8 text-center max-w-2xl">Tap on a letter to reveal its English equivalent, an example word, and a symbolic representation.</p>

            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-6">
                {gurmukhiAlphabet.map((item, index) => (
                    <motion.div
                        key={index}
                        className="w-24 h-24 flex flex-col items-center justify-center bg-white rounded-xl shadow-lg border-4 border-gray-300 cursor-pointer text-3xl font-bold text-[var(--primary)] p-2 text-center"
                        onClick={() => toggleFlip(index)}
                        whileHover={{ scale: 1.1 }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        {flipped[index] ? (
                            <div className="text-center text-xl">
                                <p className="font-semibold text-gray-800">{item.englishSound}</p>
                                <p className="text-sm text-gray-600">{item.word}</p>
                                <p className="text-2xl">{item.symbol}</p>
                            </div>
                        ) : (
                            <p>{item.letter}</p>
                        )}
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
