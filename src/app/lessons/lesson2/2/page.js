"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FaArrowLeft, FaCheckCircle, FaTrophy, FaArrowRight, FaGamepad } from "react-icons/fa";

export default function Lesson2MatchGame() {
    const router = useRouter();

    const pairs = [
        { id: 1, punjabi: "Sat Sri Akaal (ਸਤ ਸ੍ਰੀ ਅਕਾਲ)", english: "God is the Eternal Truth" },
        { id: 2, punjabi: "Ki Haal Aa? (ਕੀ ਹਾਲ ਆ?)", english: "How are you?" },
        { id: 3, punjabi: "Kidan? (ਕਿੱਧਾਂ?)", english: "What's up?" },
        { id: 4, punjabi: "Tusi Kidan Teekya? (ਤੁਸੀਂ ਕਿਵੇਂ ਟਿਕਿਆ?)", english: "How have you been? (formal)" }
    ];

    const [shuffledPunjabi, setShuffledPunjabi] = useState([]);
    const [shuffledEnglish, setShuffledEnglish] = useState([]);
    const [selectedPunjabi, setSelectedPunjabi] = useState(null);
    const [matchedPairs, setMatchedPairs] = useState([]);
    const [wrongMatch, setWrongMatch] = useState(null);
    const [attempts, setAttempts] = useState(0);

    useEffect(() => {
        setShuffledPunjabi([...pairs].sort(() => 0.5 - Math.random()));
        setShuffledEnglish([...pairs].sort(() => 0.5 - Math.random()));
    }, []);

    const handleMatch = (eng, punjabi) => {
        setAttempts(attempts + 1);

        if (eng.id === punjabi.id) {
            setMatchedPairs([...matchedPairs, eng.id]);
            setSelectedPunjabi(null);
            setWrongMatch(null);
        } else {
            setWrongMatch(eng.id);
            setTimeout(() => {
                setSelectedPunjabi(null);
                setWrongMatch(null);
            }, 800);
        }
    };

    const isComplete = matchedPairs.length === pairs.length;
    const progressPercent = Math.round((matchedPairs.length / pairs.length) * 100);

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50 px-4 sm:px-6 lg:px-8 pt-24 pb-16">
            <div className="max-w-6xl mx-auto">
                {/* Back Button */}
                <button
                    onClick={() => router.push("/learning/essential-punjabi")}
                    className="mb-6 flex items-center gap-2 text-gray-600 hover:text-blue-600 font-semibold transition-colors group"
                >
                    <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
                    <span>Back to Lessons</span>
                </button>

                {/* Header */}
                <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-3xl p-8 sm:p-12 text-white shadow-xl mb-8 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full blur-3xl"></div>

                    <div className="relative z-10 text-center">
                        <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-4">
                            <FaGamepad className="text-blue-200" />
                            <span className="text-sm font-semibold">INTERACTIVE EXERCISE</span>
                        </div>
                        <h1 className="text-4xl sm:text-5xl font-bold mb-4">
                            Match the Punjabi Greetings
                        </h1>
                        <p className="text-xl text-blue-100">
                            Click a Punjabi phrase, then click its English meaning to make a match!
                        </p>
                    </div>
                </div>

                {/* Progress Card */}
                <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border-2 border-gray-100">
                    <div className="flex items-center justify-between mb-3">
                        <span className="text-sm font-semibold text-gray-700">Matches Found</span>
                        <span className="text-sm font-bold text-blue-600">
                            {matchedPairs.length} / {pairs.length}
                        </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                        <div
                            className="bg-gradient-to-r from-green-500 to-green-600 h-full transition-all duration-500 flex items-center justify-end pr-2"
                            style={{ width: `${progressPercent}%` }}
                        >
                            {progressPercent > 0 && (
                                <span className="text-white text-xs font-bold">{progressPercent}%</span>
                            )}
                        </div>
                    </div>
                    <div className="mt-2 text-sm text-gray-600 text-center">
                        Attempts: <span className="font-bold">{attempts}</span>
                    </div>
                </div>

                {!isComplete ? (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                        {/* Punjabi Column */}
                        <div>
                            <div className="bg-white rounded-2xl shadow-md p-4 mb-4 border-2 border-blue-200">
                                <h2 className="text-2xl font-bold text-blue-600 text-center flex items-center justify-center gap-2">
                                    <span>🇮🇳</span>
                                    <span>Punjabi</span>
                                </h2>
                            </div>
                            <div className="space-y-4">
                                {shuffledPunjabi.map((item) => {
                                    const isMatched = matchedPairs.includes(item.id);
                                    const isSelected = selectedPunjabi?.id === item.id;

                                    return (
                                        <button
                                            key={item.id}
                                            className={`w-full text-left p-6 rounded-2xl shadow-lg border-2 transition-all duration-300 ${
                                                isMatched
                                                    ? "bg-green-50 border-green-500 cursor-not-allowed"
                                                    : isSelected
                                                        ? "bg-blue-100 border-blue-500 scale-105 shadow-xl"
                                                        : "bg-white border-gray-200 hover:border-blue-400 hover:shadow-xl hover:scale-105"
                                            }`}
                                            onClick={() => !isMatched && setSelectedPunjabi(item)}
                                            disabled={isMatched}
                                        >
                                            <div className="flex items-center justify-between">
                                                <span className="font-semibold text-gray-900">{item.punjabi}</span>
                                                {isMatched && (
                                                    <FaCheckCircle className="text-green-600 text-2xl flex-shrink-0 ml-2" />
                                                )}
                                            </div>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* English Column */}
                        <div>
                            <div className="bg-white rounded-2xl shadow-md p-4 mb-4 border-2 border-orange-200">
                                <h2 className="text-2xl font-bold text-orange-600 text-center flex items-center justify-center gap-2">
                                    <span>🇬🇧</span>
                                    <span>English</span>
                                </h2>
                            </div>
                            <div className="space-y-4">
                                {shuffledEnglish.map((item) => {
                                    const isMatched = matchedPairs.includes(item.id);
                                    const isWrong = wrongMatch === item.id;

                                    return (
                                        <button
                                            key={item.id}
                                            className={`w-full text-left p-6 rounded-2xl shadow-lg border-2 transition-all duration-300 ${
                                                isMatched
                                                    ? "bg-green-50 border-green-500 cursor-not-allowed"
                                                    : isWrong
                                                        ? "bg-red-100 border-red-500 shake"
                                                        : selectedPunjabi
                                                            ? "bg-white border-gray-200 hover:border-orange-400 hover:shadow-xl hover:scale-105"
                                                            : "bg-gray-50 border-gray-200 opacity-50 cursor-not-allowed"
                                            }`}
                                            onClick={() => selectedPunjabi && !isMatched && handleMatch(item, selectedPunjabi)}
                                            disabled={!selectedPunjabi || isMatched}
                                        >
                                            <div className="flex items-center justify-between">
                                                <span className="font-semibold text-gray-900">{item.english}</span>
                                                {isMatched && (
                                                    <FaCheckCircle className="text-green-600 text-2xl flex-shrink-0 ml-2" />
                                                )}
                                            </div>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="bg-white rounded-3xl shadow-xl p-8 sm:p-12 border-2 border-gray-100 mb-8">
                        <div className="text-center">
                            <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full mb-6">
                                <FaTrophy className="text-5xl text-white" />
                            </div>

                            <h2 className="text-4xl font-bold text-gray-900 mb-3">Perfect Match!</h2>
                            <p className="text-xl text-gray-600 mb-6">
                                You matched all greetings correctly in <span className="font-bold text-blue-600">{attempts}</span> attempts!
                            </p>

                            {/* Performance Feedback */}
                            <div className={`inline-block px-8 py-4 rounded-2xl font-bold text-xl mb-8 ${
                                attempts === pairs.length
                                    ? 'bg-green-100 text-green-800 border-2 border-green-300'
                                    : attempts <= pairs.length + 2
                                        ? 'bg-blue-100 text-blue-800 border-2 border-blue-300'
                                        : 'bg-yellow-100 text-yellow-800 border-2 border-yellow-300'
                            }`}>
                                {attempts === pairs.length
                                    ? '🎉 Perfect! Flawless matching!'
                                    : attempts <= pairs.length + 2
                                        ? '⭐ Excellent work!'
                                        : '👍 Great job completing the exercise!'}
                            </div>
                        </div>
                    </div>
                )}

                {/* Navigation */}
                {isComplete && (
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button
                            onClick={() => window.location.reload()}
                            className="flex items-center justify-center gap-2 bg-gray-100 text-gray-700 px-8 py-4 rounded-xl font-bold hover:bg-gray-200 transition-all duration-300"
                        >
                            <FaArrowLeft />
                            <span>Try Again</span>
                        </button>
                        <button
                            onClick={() => router.push("/lessons/lesson2/3")}
                            className="flex items-center justify-center gap-2 bg-gradient-to-r from-green-500 to-green-600 text-white px-8 py-4 rounded-xl font-bold hover:from-green-600 hover:to-green-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                        >
                            <span>Continue to Quiz</span>
                            <FaArrowRight />
                        </button>
                    </div>
                )}

                {/* Instructions */}
                {!isComplete && (
                    <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl p-6 border-2 border-orange-200">
                        <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                            <span className="text-2xl">💡</span>
                            <span>How to Play</span>
                        </h3>
                        <ol className="list-decimal list-inside space-y-2 text-gray-700">
                            <li>Click on a <strong>Punjabi phrase</strong> from the left column (it will be highlighted in blue)</li>
                            <li>Then click on its matching <strong>English meaning</strong> from the right column</li>
                            <li>If correct, both cards will turn green! If wrong, the English card will shake</li>
                            <li>Continue until all pairs are matched!</li>
                        </ol>
                    </div>
                )}
            </div>

            <style jsx>{`
                @keyframes shake {
                    0%, 100% { transform: translateX(0); }
                    25% { transform: translateX(-10px); }
                    75% { transform: translateX(10px); }
                }
                .shake {
                    animation: shake 0.4s ease-in-out;
                }
            `}</style>
        </div>
    );
}