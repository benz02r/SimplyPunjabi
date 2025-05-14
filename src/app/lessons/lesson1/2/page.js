"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Lesson1GurmukhiInfo() {
    const router = useRouter();
    const [answers, setAnswers] = useState(Array(5).fill(""));
    const [submitted, setSubmitted] = useState(false);
    const [score, setScore] = useState(0);

    const trivia = [
        {
            question: "The Gurmukhi script was standardized by _____.",
            options: ["Guru Angad Dev Ji", "Guru Gobind Singh Ji", "Kabir Das"],
            correctAnswer: "Guru Angad Dev Ji"
        },
        {
            question: "Gurmukhi is derived from _____.",
            options: ["Brahmi", "Laṁḍā", "Pali"],
            correctAnswer: "Laṁḍā"
        },
        {
            question: "A key difference between Gurmukhi and Devanagari is _____.",
            options: ["Gurmukhi has fewer vowels", "Gurmukhi uses a horizontal line", "Gurmukhi is used for Sanskrit"],
            correctAnswer: "Gurmukhi uses a horizontal line"
        },
        {
            question: "Gurmukhi primarily serves the _____ language.",
            options: ["Punjabi", "Hindi", "Bengali"],
            correctAnswer: "Punjabi"
        },
        {
            question: "Gurmukhi is culturally important because _____.",
            options: ["It was used in South India", "It preserves Sikh teachings", "It influenced Persian script"],
            correctAnswer: "It preserves Sikh teachings"
        }
    ];

    const handleChange = (index, value) => {
        const updated = [...answers];
        updated[index] = value;
        setAnswers(updated);
    };

    const handleSubmit = () => {
        const correct = answers.reduce((count, answer, index) => {
            return count + (answer === trivia[index].correctAnswer ? 1 : 0);
        }, 0);
        setScore(correct);
        setSubmitted(true);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-white to-blue-50 px-6 sm:px-10 pt-40 pb-16">
            {/* Back Button */}
            <div className="w-full max-w-4xl mb-12 sm:mb-14 px-4 sm:px-0">
                <button
                    onClick={() => router.push("/learning/essential-punjabi")}
                    className="bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:bg-blue-600 transition w-full sm:w-auto"
                >
                    ← Back to Lessons
                </button>
            </div>

            {/* Title */}
            <div className="text-center max-w-3xl mb-10 px-4 sm:px-0">
                <h1 className="text-3xl sm:text-4xl font-extrabold text-[var(--primary)] leading-tight">
                    Gurmukhi Fill the Gaps challenge
                </h1>
                <p className="text-base sm:text-lg mt-3 text-gray-700">
                    Select the correct answer to each statement.
                </p>
            </div>

            {/* Multiple Choice Trivia */}
            <div className="space-y-6 max-w-4xl w-full">
                {trivia.map((item, index) => (
                    <div key={index} className="p-6 bg-white rounded-lg shadow-md border border-gray-200">
                        <p className="text-lg font-medium text-gray-800 mb-4">{item.question}</p>
                        <div className="space-y-2">
                            {item.options.map((option, i) => (
                                <label key={i} className="block">
                                    <input
                                        type="radio"
                                        name={`question-${index}`}
                                        value={option}
                                        checked={answers[index] === option}
                                        onChange={(e) => handleChange(index, e.target.value)}
                                        disabled={submitted}
                                        className="mr-2"
                                    />
                                    {option}
                                </label>
                            ))}
                        </div>
                        {submitted && (
                            <p className={`mt-2 text-sm font-medium ${answers[index] === item.correctAnswer ? 'text-green-600' : 'text-red-500'}`}>
                                {answers[index] === item.correctAnswer ? '✅ Correct!' : `❌ Correct answer: ${item.correctAnswer}`}
                            </p>
                        )}
                    </div>
                ))}
            </div>

            {/* Submit Button */}
            {!submitted && (
                <div className="mt-8">
                    <button
                        onClick={handleSubmit}
                        className="bg-green-500 text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:bg-green-600 transition"
                    >
                        Submit Answers
                    </button>
                </div>
            )}

            {/* Score */}
            {submitted && (
                <div className="mt-8 text-xl text-center text-gray-800">
                    You got <strong>{score}</strong> out of <strong>{trivia.length}</strong> correct!
                </div>
            )}

            {/* Next Button */}
            <div className="w-full max-w-4xl px-4 sm:px-0 text-center mt-10">
                <button
                    onClick={() => router.push("/lessons/lesson1/3")}
                    className="bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:bg-blue-600 transition"
                >
                    Continue to "Quiz" →
                </button>
            </div>
        </div>
    );
}
