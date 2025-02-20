"use client";

import { useState } from "react";
import Image from "next/image"; // ✅ Import Next.js Image component

const questions = [
    {
        question: "Which one is the boy?",
        correctAnswer: "boy",
        options: [
            { label: "Boy", punjabi: "ਮੁੰਡਾ (Munda)", image: "/images/boy.png", value: "boy" },
            { label: "Girl", punjabi: "ਕੁੜੀ (Kudi)", image: "/images/girl.png", value: "girl" },
            { label: "Man", punjabi: "ਆਦਮੀ (Aadmi)", image: "/images/man.png", value: "man" },
        ],
    },
    {
        question: "Which one is the girl?",
        correctAnswer: "girl",
        options: [
            { label: "Boy", punjabi: "ਮੁੰਡਾ (Munda)", image: "/images/boy.png", value: "boy" },
            { label: "Girl", punjabi: "ਕੁੜੀ (Kudi)", image: "/images/girl.png", value: "girl" },
            { label: "Man", punjabi: "ਆਦਮੀ (Aadmi)", image: "/images/man.png", value: "man" },
        ],
    },
    {
        question: "Which one is the man?",
        correctAnswer: "man",
        options: [
            { label: "Boy", punjabi: "ਮੁੰਡਾ (Munda)", image: "/images/boy.png", value: "boy" },
            { label: "Girl", punjabi: "ਕੁੜੀ (Kudi)", image: "/images/girl.png", value: "girl" },
            { label: "Man", punjabi: "ਆਦਮੀ (Aadmi)", image: "/images/man.png", value: "man" },
        ],
    },
];

export default function PeopleLesson() {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [finished, setFinished] = useState(false);

    const handleAnswer = (value) => {
        if (value === questions[currentQuestion].correctAnswer) {
            setScore(score + 1);
        }

        if (currentQuestion + 1 < questions.length) {
            setCurrentQuestion(currentQuestion + 1);
        } else {
            setFinished(true);
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-[var(--background)]">
            <div className="p-6 bg-white rounded-xl shadow-md max-w-md w-full text-center">
                <h1 className="text-2xl font-bold text-[var(--primary)]">
                    {!finished ? questions[currentQuestion].question : "🎉 Well done!"}
                </h1>

                {!finished ? (
                    <div className="grid grid-cols-3 gap-4 mt-4">
                        {questions[currentQuestion].options.map((option, index) => (
                            <button
                                key={index}
                                onClick={() => handleAnswer(option.value)}
                                className="p-4 bg-gray-100 rounded-lg hover:bg-gray-300 transition"
                            >
                                <Image
                                    src={option.image}
                                    alt={option.label}
                                    width={96}
                                    height={96}
                                    className="mx-auto"
                                />
                                <p className="mt-2 font-bold">{option.label}</p>
                                <p className="text-gray-500">{option.punjabi}</p>
                            </button>
                        ))}
                    </div>
                ) : (
                    <p className="text-lg font-bold mt-4">You got {score} / {questions.length}! 🎯</p>
                )}
            </div>
        </div>
    );
}
