"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image"; // ✅ Import Next.js Image component

const questions = [
    {
        type: "image",
        question: "Match the Punjabi word with the correct image:",
        correctAnswer: "boy",
        word: { punjabi: "ਮੁੰਡਾ", romanized: "Munda" },
        options: [
            { image: "/images/boy.png", value: "boy" },
            { image: "/images/girl.png", value: "girl" },
            { image: "/images/man.png", value: "man" },
        ],
    },
    {
        type: "image",
        question: "Match the Punjabi word with the correct image:",
        correctAnswer: "girl",
        word: { punjabi: "ਕੁੜੀ", romanized: "Kudi" },
        options: [
            { image: "/images/boy.png", value: "boy" },
            { image: "/images/girl.png", value: "girl" },
            { image: "/images/man.png", value: "man" },
        ],
    },
    {
        type: "image",
        question: "Match the Punjabi word with the correct image:",
        correctAnswer: "man",
        word: { punjabi: "ਆਦਮੀ", romanized: "Aadmi" },
        options: [
            { image: "/images/boy.png", value: "boy" },
            { image: "/images/girl.png", value: "girl" },
            { image: "/images/man.png", value: "man" },
        ],
    },
];

export default function BasicPhrasesLesson() {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [finished, setFinished] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);
    const [showFeedback, setShowFeedback] = useState(false);
    const [isCorrect, setIsCorrect] = useState(null);

    const handleAnswer = (value) => {
        setSelectedOption(value);
        setShowFeedback(true);
        if (value === questions[currentQuestion].correctAnswer) {
            setScore(score + 1);
            setIsCorrect(true);
        } else {
            setIsCorrect(false);
        }
    };

    const handleNextQuestion = () => {
        if (currentQuestion + 1 < questions.length) {
            setCurrentQuestion(currentQuestion + 1);
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
            <div className="text-center">
                <h1 className="text-5xl font-extrabold text-gray-800 leading-tight">
                    Basic <span className="text-green-600">Phrases</span> Quiz 🎯
                </h1>
                <p className="text-lg text-gray-600 mt-2">
                    Match the Punjabi word with the correct image.
                </p>
            </div>

            {/* Quiz Section */}
            <div className="p-8 bg-white rounded-xl shadow-lg max-w-lg w-full text-center mt-6 border border-gray-200">
                <h2 className="text-2xl font-bold text-gray-800">
                    {!finished ? questions[currentQuestion].question : "🎉 Well done!"}
                </h2>

                {!finished ? (
                    <div>
                        {/* Word to Match */}
                        <div className="text-3xl font-bold mt-4 text-green-700">
                            {questions[currentQuestion].word.punjabi} ({questions[currentQuestion].word.romanized})
                        </div>

                        {/* Image Options */}
                        <div className="grid grid-cols-3 gap-4 mt-6">
                            {questions[currentQuestion].options.map((option, index) => (
                                <button
                                    key={index}
                                    onClick={() => handleAnswer(option.value)}
                                    className={`p-4 bg-gray-100 rounded-xl hover:bg-gray-300 transition shadow-md ${
                                        selectedOption === option.value && isCorrect === true ? "bg-green-300" : ""
                                    } ${
                                        selectedOption === option.value && isCorrect === false ? "bg-red-300" : ""
                                    }`}
                                    disabled={showFeedback}
                                >
                                    <Image
                                        src={option.image}
                                        alt={`Punjabi word ${option.value}`}
                                        width={96}
                                        height={96}
                                        className="mx-auto"
                                    />
                                </button>
                            ))}
                        </div>

                        {/* Feedback Section */}
                        {showFeedback && (
                            <div className="mt-4">
                                {isCorrect ? (
                                    <p className="text-lg font-bold text-green-600">✅ Correct!</p>
                                ) : (
                                    <p className="text-lg font-bold text-red-600">
                                        ❌ Wrong! The correct answer was{" "}
                                        <span className="text-green-700">
                                            {questions[currentQuestion].word.romanized} ({questions[currentQuestion].word.punjabi})
                                        </span>.
                                    </p>
                                )}

                                <button
                                    onClick={handleNextQuestion}
                                    className="mt-4 bg-blue-500 text-white px-6 py-3 rounded-full text-lg font-semibold shadow-md hover:bg-blue-600 transition"
                                >
                                    {currentQuestion + 1 < questions.length ? "➡️ Continue" : "🎉 See Results"}
                                </button>
                            </div>
                        )}
                    </div>
                ) : (
                    <div>
                        <p className="text-lg font-bold text-gray-700 mt-4">
                            You got {score} / {questions.length}! 🎯
                        </p>

                        {/* Action Buttons */}
                        <div className="mt-6 flex space-x-4">
                            <button
                                onClick={() => window.location.reload()}
                                className="bg-green-600 text-white px-6 py-3 rounded-full text-lg font-semibold shadow-md hover:bg-green-700 transition"
                            >
                                🔄 Try Again
                            </button>

                            <Link href="/gamified/lessons/greetings">
                                <button
                                    className="bg-blue-500 text-white px-6 py-3 rounded-full text-lg font-semibold shadow-md hover:bg-blue-600 transition"
                                >
                                    ➡️ Continue to Next Lesson
                                </button>
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
