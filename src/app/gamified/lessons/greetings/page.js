"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion"; // ✅ Smooth animations

const scenarios = [
    {
        question: "If you were to greet someone in Punjabi, how would you do so?",
        correctAnswer: "Sat Sri Akal",
        options: [
            { label: "Sat Sri Akal", value: "Sat Sri Akal", correct: true },
            { label: "Hello", value: "Hello", correct: false },
            { label: "Hanji", value: "Hanji", correct: false },
            { label: "Bonjur", value: "Bonjur", correct: false },
        ],
    },
    {
        question: "You're greeting an elder respectfully, what do you say?",
        correctAnswer: "Sat Sri Akal, Ji",
        options: [
            { label: "Sat Sri Akal, Ji", value: "Sat Sri Akal, Ji", correct: true },
            { label: "Hey!", value: "Hey!", correct: false },
            { label: "Oye!", value: "Oye!", correct: false },
            { label: "Namaste", value: "Namaste", correct: false },
        ],
    },
    {
        question: "You're saying goodnight in Punjabi, what do you say?",
        correctAnswer: "Shubh Raatri",
        options: [
            { label: "Shubh Raatri", value: "Shubh Raatri", correct: true },
            { label: "Goodnight", value: "Goodnight", correct: false },
            { label: "Hanji", value: "Hanji", correct: false },
            { label: "Sasriyakal", value: "Sasriyakal", correct: false },
        ],
    },
];

export default function GreetingsLesson() {
    const [currentScenario, setCurrentScenario] = useState(0);
    const [score, setScore] = useState(0);
    const [finished, setFinished] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);
    const [isCorrect, setIsCorrect] = useState(null);
    const [showFeedback, setShowFeedback] = useState(false);

    const handleAnswer = (option) => {
        setSelectedOption(option.value);
        setShowFeedback(true);
        setIsCorrect(option.correct);

        if (option.correct) {
            setScore(score + 1);
        }
    };

    const handleNextScenario = () => {
        if (currentScenario + 1 < scenarios.length) {
            setCurrentScenario(currentScenario + 1);
            setSelectedOption(null);
            setShowFeedback(false);
            setIsCorrect(null);
        } else {
            setFinished(true);
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-50 to-white px-6">

            {/* Header */}
            <div className="text-center mt-6">
                <h1 className="text-5xl font-extrabold text-gray-800 leading-tight">
                    Interactive <span className="text-green-600">Greetings</span> 🎭
                </h1>
                <p className="text-lg text-gray-600 mt-2">
                    Choose the correct response for the given scenario.
                </p>
            </div>

            {/* Quiz Section */}
            <motion.div
                className="p-8 bg-white rounded-xl shadow-lg max-w-lg w-full text-center mt-6 border border-gray-200"
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5 }}
            >
                <h2 className="text-2xl font-bold text-gray-800">
                    {!finished ? scenarios[currentScenario].question : "🎉 Well done!"}
                </h2>

                {!finished ? (
                    <div className="grid grid-cols-1 gap-4 mt-6">
                        {scenarios[currentScenario].options.map((option, index) => (
                            <motion.button
                                key={index}
                                onClick={() => handleAnswer(option)}
                                className={`p-4 rounded-xl transition shadow-md text-lg font-semibold w-full ${
                                    selectedOption === option.value && isCorrect === true ? "bg-green-300" : "bg-gray-100 hover:bg-gray-300"
                                } ${
                                    selectedOption === option.value && isCorrect === false ? "bg-red-300" : ""
                                }`}
                                whileHover={{ scale: 1.05 }}
                            >
                                {option.label}
                            </motion.button>
                        ))}
                    </div>
                ) : (
                    <div>
                        <p className="text-lg font-bold text-gray-700 mt-4">
                            You got {score} / {scenarios.length}! 🎯
                        </p>

                        {/* Action Buttons */}
                        <div className="mt-6 flex space-x-4">
                            <button
                                onClick={() => window.location.reload()}
                                className="bg-green-600 text-white px-6 py-3 rounded-full text-lg font-semibold shadow-md hover:bg-green-700 transition"
                            >
                                🔄 Try Again
                            </button>

                            <Link href="/gamified/lessons/common-phrases1">
                                <button
                                    className="bg-blue-500 text-white px-6 py-3 rounded-full text-lg font-semibold shadow-md hover:bg-blue-600 transition"
                                >
                                    ➡️ Continue to Next Lesson
                                </button>
                            </Link>
                        </div>
                    </div>
                )}

                {/* Feedback Section */}
                {showFeedback && (
                    <motion.div className="mt-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                        {isCorrect ? (
                            <p className="text-lg font-bold text-green-600">✅ Correct!</p>
                        ) : (
                            <p className="text-lg font-bold text-red-600">
                                ❌ Wrong! The correct answer was{" "}
                                <span className="text-green-700">{scenarios[currentScenario].correctAnswer}</span>.
                            </p>
                        )}
                        <button
                            onClick={handleNextScenario}
                            className="mt-4 bg-blue-500 text-white px-6 py-3 rounded-full text-lg font-semibold shadow-md hover:bg-blue-600 transition"
                        >
                            {currentScenario + 1 < scenarios.length ? "➡️ Continue" : "🎉 See Results"}
                        </button>
                    </motion.div>
                )}
            </motion.div>
        </div>
    );
}

