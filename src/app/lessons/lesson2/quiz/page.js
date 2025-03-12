"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Lesson2Quiz() {
    const router = useRouter();
    const [step, setStep] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [score, setScore] = useState(0);
    const [feedback, setFeedback] = useState("");
    const [quizCompleted, setQuizCompleted] = useState(false);

    const questions = [
        {
            id: 1,
            question: "How do you introduce yourself in Punjabi?",
            options: [
                "Sat Sri Akaal",
                "Mera Naam ... Hai",
                "Ki Haal Aa?",
                "Tusi Kithon Ho?"
            ],
            correct: "Mera Naam ... Hai"
        },
        {
            id: 2,
            question: "How do you ask someone’s name in Punjabi?",
            options: [
                "Tuhada Naam Ki Hai?",
                "Mera Naam ... Hai",
                "Sat Sri Akaal",
                "Tuhanu Mil Ke Khushi Hui"
            ],
            correct: "Tuhada Naam Ki Hai?"
        },
        {
            id: 3,
            question: "What phrase means 'Nice to meet you'?",
            options: [
                "Tuhada Naam Ki Hai?",
                "Tuhanu Mil Ke Khushi Hui",
                "Mera Naam ... Hai",
                "Ki Haal Aa?"
            ],
            correct: "Tuhanu Mil Ke Khushi Hui"
        },
        {
            id: 4,
            question: "Which phrase means 'Where are you from?'?",
            options: [
                "Tusi Kithon Ho?",
                "Tuhada Naam Ki Hai?",
                "Ki Haal Aa?",
                "Sat Sri Akaal"
            ],
            correct: "Tusi Kithon Ho?"
        }
    ];

    const handleAnswerSelection = (option) => {
        setSelectedAnswer(option);
        if (option === questions[step].correct) {
            setFeedback("✅ Correct!");
            setScore(score + 1);
        } else {
            setFeedback("❌ Incorrect. The correct answer is: " + questions[step].correct);
        }
    };

    const nextStep = () => {
        if (step < questions.length - 1) {
            setStep(step + 1);
            setSelectedAnswer(null);
            setFeedback("");
        } else {
            setQuizCompleted(true);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-white to-blue-50 px-6 sm:px-10 pt-16 pb-10">
            <div className="w-full max-w-2xl text-center">
                <button onClick={() => router.push("/lessons/lesson2")} className="bg-blue-500 text-white px-5 py-2 rounded-lg shadow-lg hover:bg-blue-600 transition">
                    ← Back to Lesson 2
                </button>
                <h1 className="text-3xl font-bold mt-6 text-gray-800">Lesson 2 Quiz</h1>
                <p className="text-lg text-gray-700 mt-2">Test your knowledge on Punjabi introductions.</p>
            </div>

            {!quizCompleted ? (
                <div className="max-w-2xl bg-white p-6 rounded-lg shadow-lg mt-6 text-center">
                    <p className="text-xl font-semibold">{questions[step].question}</p>
                    <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {questions[step].options.map((option, index) => (
                            <button
                                key={index}
                                className={`p-4 rounded-lg shadow-md border transition-all text-lg ${selectedAnswer === option ? (option === questions[step].correct ? 'bg-green-200' : 'bg-red-200') : 'bg-gray-100 hover:bg-gray-200'}`}
                                onClick={() => handleAnswerSelection(option)}
                                disabled={selectedAnswer !== null}
                            >
                                {option}
                            </button>
                        ))}
                    </div>
                    {feedback && <p className="mt-4 text-lg font-semibold">{feedback}</p>}
                    <button
                        onClick={nextStep}
                        className="mt-6 bg-green-500 text-white px-5 py-2 rounded-lg shadow-lg hover:bg-green-600 transition"
                        disabled={!selectedAnswer}
                    >
                        {step < questions.length - 1 ? "Next Question →" : "See Results"}
                    </button>
                </div>
            ) : (
                <div className="max-w-2xl bg-white p-6 rounded-lg shadow-lg mt-6 text-center">
                    <h2 className="text-2xl font-bold">Quiz Completed!</h2>
                    <p className="text-lg mt-2">You scored <span className="font-bold text-green-600">{score}</span> out of {questions.length}!</p>
                    {score === questions.length ? (
                        <p className="mt-2 text-xl font-semibold text-green-600">🎉 Excellent! You mastered this lesson!</p>
                    ) : score >= questions.length / 2 ? (
                        <p className="mt-2 text-xl font-semibold text-yellow-600">👍 Good job! Keep practicing.</p>
                    ) : (
                        <p className="mt-2 text-xl font-semibold text-red-600">❌ Keep trying! Review the lesson and try again.</p>
                    )}
                    <button onClick={() => router.push("/lessons/lesson2")} className="mt-6 bg-blue-500 text-white px-5 py-2 rounded-lg shadow-lg hover:bg-blue-600 transition">
                        🔄 Retry Lesson
                    </button>
                </div>
            )}
        </div>
    );
}