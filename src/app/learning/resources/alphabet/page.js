"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function GurmukhiAlphabet() {
    const router = useRouter();
    const [selectedLetter, setSelectedLetter] = useState(null);

    const alphabet = [
        { letter: "ੳ", transliteration: "Ou", english: "oorhaa", audio: "/audio/ou.mp3" },
        { letter: "ਅ", transliteration: "Aa", english: "airhaa", audio: "/audio/aa.mp3" },
        { letter: "ੲ", transliteration: "Ie", english: "eerhee", audio: "/audio/ie.mp3" },
        { letter: "ਸ", transliteration: "Sa", english: "sassaa", audio: "/audio/sa.mp3" },
        { letter: "ਹ", transliteration: "Ha", english: "haahaa", audio: "/audio/ha.mp3" },
        { letter: "ਕ", transliteration: "Ka", english: "kakkaa", audio: "/audio/ka.mp3" },
        { letter: "ਖ", transliteration: "Kha", english: "khakhkhaa", audio: "/audio/kha.mp3" },
        { letter: "ਗ", transliteration: "Ga", english: "gaggaa", audio: "/audio/ga.mp3" },
        { letter: "ਘ", transliteration: "Gha", english: "ghaggaa", audio: "/audio/gha.mp3" },
        { letter: "ਙ", transliteration: "Nga", english: "nganngaa", audio: "/audio/nga.mp3" },
        { letter: "ਚ", transliteration: "Cha", english: "chachaa", audio: "/audio/cha.mp3" },
        { letter: "ਛ", transliteration: "Chha", english: "chhachhaa", audio: "/audio/chha.mp3" },
        { letter: "ਜ", transliteration: "Ja", english: "jajjaa", audio: "/audio/ja.mp3" },
        { letter: "ਝ", transliteration: "Jha", english: "jhajjaa", audio: "/audio/jha.mp3" },
        { letter: "ਟ", transliteration: "Ta", english: "tainkaa", audio: "/audio/ta.mp3" },
        { letter: "ਠ", transliteration: "Tha", english: "thathaa", audio: "/audio/tha.mp3" },
        { letter: "ਡ", transliteration: "Da", english: "daddaa", audio: "/audio/da.mp3" },
        { letter: "ਢ", transliteration: "Dha", english: "dhaddaa", audio: "/audio/dha.mp3" },
        { letter: "ਣ", transliteration: "Na", english: "nhaanhaa", audio: "/audio/na.mp3" },
        { letter: "ਤ", transliteration: "Ta", english: "tattaa", audio: "/audio/tattaa.mp3" },
        { letter: "ਥ", transliteration: "Tha", english: "thaththaa", audio: "/audio/thaa.mp3" },
        { letter: "ਦ", transliteration: "Da", english: "daddaa", audio: "/audio/da2.mp3" },
        { letter: "ਧ", transliteration: "Dha", english: "dhaddaa", audio: "/audio/dha2.mp3" },
        { letter: "ਨ", transliteration: "Na", english: "nannaa", audio: "/audio/nannaa.mp3" },
        { letter: "ਪ", transliteration: "Pa", english: "pappaa", audio: "/audio/pa.mp3" },
        { letter: "ਫ", transliteration: "Pha", english: "phaphphaa", audio: "/audio/pha.mp3" },
        { letter: "ਬ", transliteration: "Ba", english: "babbaa", audio: "/audio/ba.mp3" },
        { letter: "ਭ", transliteration: "Bha", english: "bhabbaa", audio: "/audio/bha.mp3" },
        { letter: "ਮ", transliteration: "Ma", english: "mammaa", audio: "/audio/ma.mp3" },
        { letter: "ਯ", transliteration: "Ya", english: "yayyaa", audio: "/audio/ya.mp3" },
        { letter: "ਰ", transliteration: "Ra", english: "raaraa", audio: "/audio/ra.mp3" },
        { letter: "ਲ", transliteration: "La", english: "lallaa", audio: "/audio/la.mp3" },
        { letter: "ਵ", transliteration: "Va", english: "vavvaa", audio: "/audio/va.mp3" },
        { letter: "ੜ", transliteration: "Ra", english: "rhaarhaa", audio: "/audio/rhaarhaa.mp3" }
    ];

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-white to-blue-50 px-6 sm:px-10 pt-20 pb-16">
            <button
                onClick={() => router.push("/learning/resources")}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:bg-blue-700 transition mb-6 self-start"
                aria-label="Back to Resources"
            >
                ← Back to Resources
            </button>

            <h1 className="text-5xl font-extrabold text-orange-400 "> Learn Gurmukhi! </h1>
            <p className="text-lg mt-3 text-gray-700 font-semibold">Hover over a letter to see it come alive! Click to hear its pronunciation.</p>
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-6 max-w-3xl w-full text-center mt-6">
                {alphabet.map((char, index) => (
                    <button key={index} className="p-6 bg-white rounded-lg shadow-lg border border-gray-300 text-2xl font-bold text-gray-800 transition-transform transform hover:scale-110 hover:bg-yellow-300 hover:text-white hover:shadow-2xl" onClick={() => new Audio(char.audio).play()}>
                        {char.letter}
                        <p className="text-sm text-gray-600 mt-2">{char.transliteration}</p>
                        <p className="text-xs text-gray-500">{char.english}</p>
                    </button>
                ))}
            </div>
        </div>
    );
}
