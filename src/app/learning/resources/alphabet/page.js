"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { ArrowLeft, Volume2, Book, CheckCircle, Play, Sparkles, Info } from "lucide-react";

export default function GurmukhiAlphabet() {
    const router = useRouter();
    const [selectedLetter, setSelectedLetter] = useState(null);
    const [playingAudio, setPlayingAudio] = useState(null);

    const alphabet = [
        { letter: "ੳ", transliteration: "Ou", english: "oorhaa", audio: "/audio/punjabi/oorhaa.mp3" },
        { letter: "ਅ", transliteration: "Aa", english: "airhaa", audio: "/audio/punjabi/airhaa.mp3" },
        { letter: "ੲ", transliteration: "Ie", english: "eerhee", audio: "/audio/punjabi/eerhee.mp3" },
        { letter: "ਸ", transliteration: "Sa", english: "sassaa", audio: "/audio/punjabi/sassaa.mp3" },
        { letter: "ਹ", transliteration: "Ha", english: "haahaa", audio: "/audio/punjabi/haahaa.mp3" },
        { letter: "ਕ", transliteration: "Ka", english: "kakkaa", audio: "/audio/punjabi/kakkaa.mp3" },
        { letter: "ਖ", transliteration: "Kha", english: "khakhkhaa", audio: "/audio/punjabi/khakhkhaa.mp3" },
        { letter: "ਗ", transliteration: "Ga", english: "gaggaa", audio: "/audio/punjabi/gaggaa.mp3" },
        { letter: "ਘ", transliteration: "Gha", english: "ghaggaa", audio: "/audio/punjabi/ghaggaa.mp3" },
        { letter: "ਙ", transliteration: "Nga", english: "nganngaa", audio: "/audio/punjabi/nganngaa.mp3" },
        { letter: "ਚ", transliteration: "Cha", english: "chachaa", audio: "/audio/punjabi/chachaa.mp3" },
        { letter: "ਛ", transliteration: "Chha", english: "chhachhaa", audio: "/audio/punjabi/chhachhaa.mp3" },
        { letter: "ਜ", transliteration: "Ja", english: "jajjaa", audio: "/audio/punjabi/jajjaa.mp3" },
        { letter: "ਝ", transliteration: "Jha", english: "jhajjaa", audio: "/audio/punjabi/jhajjaa.mp3" },
        { letter: "ਟ", transliteration: "Ta", english: "tainkaa", audio: "/audio/punjabi/tainkaa.mp3" },
        { letter: "ਠ", transliteration: "Tha", english: "thathaa", audio: "/audio/punjabi/thathaa.mp3" },
        { letter: "ਡ", transliteration: "Da", english: "daddaa", audio: "/audio/punjabi/daddaa.mp3" },
        { letter: "ਢ", transliteration: "Dha", english: "dhaddaa", audio: "/audio/punjabi/dhaddaa.mp3" },
        { letter: "ਣ", transliteration: "Na", english: "nhaanhaa", audio: "/audio/punjabi/nhaanhaa.mp3" },
        { letter: "ਤ", transliteration: "Ta", english: "tattaa", audio: "/audio/punjabi/tattaa.mp3" },
        { letter: "ਥ", transliteration: "Tha", english: "thaththaa", audio: "/audio/punjabi/thaththaa.mp3" },
        { letter: "ਦ", transliteration: "Da", english: "daddaa", audio: "/audio/punjabi/daddaa2.mp3" },
        { letter: "ਧ", transliteration: "Dha", english: "dhaddaa", audio: "/audio/punjabi/dhaddaa2.mp3" },
        { letter: "ਨ", transliteration: "Na", english: "nannaa", audio: "/audio/punjabi/nannaa.mp3" },
        { letter: "ਪ", transliteration: "Pa", english: "pappaa", audio: "/audio/punjabi/pappaa.mp3" },
        { letter: "ਫ", transliteration: "Pha", english: "phaphphaa", audio: "/audio/punjabi/phaphphaa.mp3" },
        { letter: "ਬ", transliteration: "Ba", english: "babbaa", audio: "/audio/punjabi/babbaa.mp3" },
        { letter: "ਭ", transliteration: "Bha", english: "bhabbaa", audio: "/audio/punjabi/bhabbaa.mp3" },
        { letter: "ਮ", transliteration: "Ma", english: "mammaa", audio: "/audio/punjabi/mammaa.mp3" },
        { letter: "ਯ", transliteration: "Ya", english: "yayyaa", audio: "/audio/punjabi/yayyaa.mp3" },
        { letter: "ਰ", transliteration: "Ra", english: "raaraa", audio: "/audio/punjabi/raaraa.mp3" },
        { letter: "ਲ", transliteration: "La", english: "lallaa", audio: "/audio/punjabi/lallaa.mp3" },
        { letter: "ਵ", transliteration: "Va", english: "vavvaa", audio: "/audio/punjabi/vavvaa.mp3" },
        { letter: "ੜ", transliteration: "Ra", english: "rhaarhaa", audio: "/audio/punjabi/rhaarhaa.mp3" }
    ];

    const playAudio = (char, index) => {
        setSelectedLetter(index);
        setPlayingAudio(index);

        const audio = new Audio(char.audio);
        audio.play().catch(err => {
            console.log("Audio playback failed:", err);
        });

        audio.onended = () => setPlayingAudio(null);
        audio.onerror = () => {
            setPlayingAudio(null);
            console.error("Error loading audio:", char.audio);
        };
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50 px-4 sm:px-6 lg:px-8 pt-28 pb-12">
            <div className="max-w-7xl mx-auto">
                {/* Back Button */}
                <button
                    onClick={() => router.push("/learning/resources")}
                    className="mb-6 flex items-center gap-2 text-gray-600 hover:text-blue-600 font-semibold transition-colors text-sm"
                >
                    <ArrowLeft size={18} />
                    <span>Back to Resources</span>
                </button>

                {/* Header */}
                <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-6 text-white shadow-lg mb-6">
                    <div className="flex items-center gap-2 mb-2">
                        <Book size={18} />
                        <span className="text-xs font-semibold uppercase tracking-wide">Reference Guide</span>
                    </div>
                    <h1 className="text-3xl font-bold mb-2">
                        Gurmukhi Alphabet
                    </h1>
                    <p className="text-base text-blue-100">
                        Click any letter to hear authentic Punjabi pronunciation
                    </p>
                </div>

                {/* Quality Badge */}
                <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r mb-6">
                    <div className="flex items-center gap-3">
                        <CheckCircle size={20} className="text-green-600 flex-shrink-0" />
                        <div>
                            <p className="text-sm font-semibold text-gray-900">
                                Authentic Punjabi Pronunciation
                            </p>
                            <p className="text-xs text-gray-600 mt-1">
                                Powered by Google Cloud Text-to-Speech with native Punjabi voices
                            </p>
                        </div>
                    </div>
                </div>

                {/* Info Card */}
                <div className="bg-orange-50 rounded-xl p-6 mb-8 border border-orange-200">
                    <div className="flex items-start gap-4">
                        <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center flex-shrink-0">
                            <Info size={20} className="text-white" />
                        </div>
                        <div>
                            <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                                <span>How to Use This Guide</span>
                            </h3>
                            <ul className="space-y-2 text-sm text-gray-700">
                                <li className="flex items-start gap-2">
                                    <span className="text-orange-600 font-bold mt-0.5">1.</span>
                                    <span>Click on any letter card to hear its authentic pronunciation</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-orange-600 font-bold mt-0.5">2.</span>
                                    <span>Pay attention to the transliteration (how it sounds in English)</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-orange-600 font-bold mt-0.5">3.</span>
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
                            className={`relative p-6 bg-white rounded-xl shadow-lg border-2 transition-all duration-300 transform hover:scale-105 hover:shadow-xl group ${
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
                                        <Volume2 size={14} className="text-white" />
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
                                    <Play size={12} />
                                    <span>Play</span>
                                </div>
                            </div>
                        </button>
                    ))}
                </div>

                {/* Practice Tips */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <TipCard
                        icon={<Book size={24} className="text-white" />}
                        title="Daily Practice"
                        description="Review 5-10 letters each day to build familiarity"
                        color="from-blue-500 to-blue-600"
                    />
                    <TipCard
                        icon={<Sparkles size={24} className="text-white" />}
                        title="Write It Down"
                        description="Practice writing each letter multiple times"
                        color="from-green-500 to-green-600"
                    />
                    <TipCard
                        icon={<Volume2 size={24} className="text-white" />}
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
        <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-gray-100 hover:border-blue-300 transition-all duration-300">
            <div className={`w-12 h-12 bg-gradient-to-br ${color} rounded-xl flex items-center justify-center mb-4 shadow-md`}>
                {icon}
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
            <p className="text-gray-600 text-sm">{description}</p>
        </div>
    );
}