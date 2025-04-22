"use client";

import { useState } from "react";

export default function NumbersLesson() {
    const numbers = [
        { english: "Zero", punjabi: "ਸਿਫ਼ਰ", transliteration: "sifar" },
        { english: "One", punjabi: "ਇੱਕ", transliteration: "ik" },
        { english: "Two", punjabi: "ਦੋ", transliteration: "do" },
        { english: "Three", punjabi: "ਤਿੰਨ", transliteration: "tinn" },
        { english: "Four", punjabi: "ਚਾਰ", transliteration: "chār" },
        { english: "Five", punjabi: "ਪੰਜ", transliteration: "punj" },
        { english: "Six", punjabi: "ਛੇ", transliteration: "chhe" },
        { english: "Seven", punjabi: "ਸੱਤ", transliteration: "sat" },
        { english: "Eight", punjabi: "ਅੱਠ", transliteration: "aṭṭ" },
        { english: "Nine", punjabi: "ਨੌ", transliteration: "nau" },
        { english: "Ten", punjabi: "ਦਸ", transliteration: "dus" },
    ];

    const speak = (text) => {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = "pa-IN"; // Punjabi (India)
        window.speechSynthesis.speak(utterance);
    };

    return (
        <div className="flex flex-col items-center min-h-screen bg-gradient-to-b from-white to-blue-50 px-6 py-20">
            <h1 className="text-4xl font-extrabold text-[var(--primary)]">Punjabi Numbers</h1>
            <p className="text-lg text-gray-700 mt-2 mb-8">Tap a card to hear it in Punjabi</p>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 max-w-5xl w-full">
                {numbers.map((num, index) => (
                    <div
                        key={index}
                        className="bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg p-4 text-center transition-transform hover:scale-105 cursor-pointer"
                        onClick={() => speak(num.punjabi)}
                    >
                        <p className="text-sm text-gray-500">{num.english}</p>
                        <h2 className="text-2xl font-bold text-[var(--primary)] my-2">{num.punjabi}</h2>
                        <p className="text-sm italic text-gray-600">{num.transliteration}</p>
                        <button className="mt-2 text-blue-500 text-sm underline hover:text-blue-600">
                            🔊 Hear it
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
