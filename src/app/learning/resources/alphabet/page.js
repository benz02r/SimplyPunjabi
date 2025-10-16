"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaArrowLeft, FaVolumeUp, FaBook, FaCheckCircle } from "react-icons/fa";

export default function GurmukhiAlphabet() {
    const router = useRouter();
    const [selectedLetter, setSelectedLetter] = useState(null);
    const [playingAudio, setPlayingAudio] = useState(null);

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

    const playAudio = (char, index) => {
        setSelectedLetter(index);
        setPlayingAudio(index);
        const audio = new Audio(char.audio);
        audio.play().catch(err => console.log("Audio playback failed:", err));
        audio.onended = () => setPlayingAudio(null);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50 px-4 sm:px-6 lg:px-8 pt-24 pb-16">
            <div className="max-w-7xl mx-auto">
                {/* Back Button */}
                <button
                    onClick={() => router.push("/learning/resources")}
                    className="mb-6 flex items-center gap-2 text-gray-600 hover:text-blue-600 font-semibold transition-colors group"
                >
                    <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
                    <span>Back to Resources</span>
                </button>

                {/* Header */}
                <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-3xl p-8 sm:p-12 text-white shadow-xl mb-12 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full blur-3xl"></div>

                    <div className="relative z-10 text-center">
                        <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-4">
                            <FaBook className="text-blue-200" />
                            <span className="text-sm font-semibold">REFERENCE GUIDE</span>
                        </div>
                        <h1 className="text-4xl sm:text-5xl font-bold mb-4">
                            📝 Gurmukhi Alphabet
                        </h1>
                        <p className="text-xl text-blue-100 max-w-3xl mx-auto">
                            Click any letter to hear its pronunciation and learn the Punjabi script
                        </p>
                    </div>
                </div>

                {/* Info Card */}
                <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl p-6 mb-8 border-2 border-orange-200">
                    <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center flex-shrink-0">
                            <FaVolumeUp className="text-white text-xl" />
                        </div>
                        <div>
                            <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                                <span>💡 How to Use This Guide</span>
                            </h3>
                            <ul className="space-y-1 text-sm text-gray-700">
                                <li className="flex items-start gap-2">
                                    <span className="text-orange-500 font-bold">1.</span>
                                    <span>Click on any letter card to hear its pronunciation</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-orange-500 font-bold">2.</span>
                                    <span>Pay attention to the transliteration (how it sounds in English)</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-orange-500 font-bold">3.</span>
                                    <span>Practice writing each letter while saying it out loud</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Alphabet Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-12">
                    {alphabet.map((char, index) => (
                        <button
                            key={index}
                            onClick={() => playAudio(char, index)}
                            className={`relative p-6 bg-white rounded-2xl shadow-lg border-2 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl ${
                                selectedLetter === index
                                    ? 'border-blue-500 bg-blue-50'
                                    : playingAudio === index
                                        ? 'border-orange-500 bg-orange-50 scale-105'
                                        : 'border-gray-200 hover:border-blue-300'
                            }`}
                        >
                            {/* Audio Playing Indicator */}
                            {playingAudio === index && (
                                <div className="absolute top-2 right-2">
                                    <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center animate-pulse">
                                        <FaVolumeUp className="text-white text-xs" />
                                    </div>
                                </div>
                            )}

                            {/* Letter */}
                            <div className="text-5xl font-bold text-gray-900 mb-3 text-center">
                                {char.letter}
                            </div>

                            {/* Transliteration */}
                            <div className="text-center">
                                <p className="text-lg font-bold text-blue-600 mb-1">
                                    {char.transliteration}
                                </p>
                                <p className="text-xs text-gray-500 capitalize">
                                    {char.english}
                                </p>
                            </div>

                            {/* Hover/Click Indicator */}
                            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <div className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                                    <FaVolumeUp className="text-xs" />
                                    <span>Play</span>
                                </div>
                            </div>
                        </button>
                    ))}
                </div>

                {/* Practice Tips */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <TipCard
                        icon="📖"
                        title="Daily Practice"
                        description="Review 5-10 letters each day to build familiarity"
                        color="from-blue-500 to-blue-600"
                    />
                    <TipCard
                        icon="✍️"
                        title="Write It Down"
                        description="Practice writing each letter multiple times"
                        color="from-green-500 to-green-600"
                    />
                    <TipCard
                        icon="🔊"
                        title="Listen & Repeat"
                        description="Say each letter out loud as you hear it"
                        color="from-orange-500 to-orange-600"
                    />
                </div>
            </div>
        </div>
    );
}

function TipCard({ icon, title, description, color }) {
    return (
        <div className="bg-white rounded-2xl shadow-lg p-6 border-2 border-gray-100 hover:border-blue-300 transition-all duration-300">
            <div className={`w-12 h-12 bg-gradient-to-br ${color} rounded-xl flex items-center justify-center text-2xl mb-4 shadow-md`}>
                {icon}
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
            <p className="text-gray-600">{description}</p>
        </div>
    );
}