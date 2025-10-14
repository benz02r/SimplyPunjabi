"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaArrowLeft, FaCheckCircle, FaTimesCircle, FaTrophy, FaArrowRight, FaLightbulb } from "react-icons/fa";

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
            options: ["Brahmi", "Laṇḍā", "Pali"],
            correctAnswer: "Laṇḍā"
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

    const allAnswered = answers.every(answer => answer !== "");
    const percentage = submitted ? Math.round((score / trivia.length) * 100) : 0;

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50 px-4 sm:px-6 lg:px-8 pt-24 pb-16">
            <div className="max-w-4xl mx-auto">
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
                            <FaLightbulb className="text-yellow-300" />
                            <span className="text-sm font-semibold">KNOWLEDGE CHECK</span>
                        </div>
                        <h1 className="text-4xl sm:text-5xl font-bold mb-4">
                            Fill the Gaps Challenge
                        </h1>
                        <p className="text-xl text-blue-100">
                            Test your understanding of Gurmukhi by selecting the correct answers
                        </p>
                    </div>
                </div>

                {/* Progress Indicator */}
                {!submitted && (
                    <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border-2 border-gray-100">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-semibold text-gray-700">Your Progress</span>
                            <span className="text-sm font-bold text-blue-600">
                                {answers.filter(a => a !== "").length} / {trivia.length} answered
                            </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                            <div
                                className="bg-gradient-to-r from-blue-500 to-blue-600 h-full transition-all duration-500"
                                style={{ width: `${(answers.filter(a => a !== "").length / trivia.length) * 100}%` }}
                            ></div>
                        </div>
                    </div>
                )}

                {/* Questions */}
                <div className="space-y-6 mb-8">
                    {trivia.map((item, index) => (
                        <div
                            key={index}
                            className={`bg-white rounded-2xl shadow-lg p-6 border-2 transition-all duration-300 ${
                                submitted
                                    ? answers[index] === item.correctAnswer
                                        ? 'border-green-400 bg-green-50'
                                        : 'border-red-400 bg-red-50'
                                    : 'border-gray-100 hover:border-blue-300'
                            }`}
                        >
                            <div className="flex items-start gap-3 mb-4">
                                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                                    {index + 1}
                                </div>
                                <p className="text-lg font-semibold text-gray-900 flex-1">{item.question}</p>
                            </div>

                            <div className="space-y-3 ml-11">
                                {item.options.map((option, i) => (
                                    <label
                                        key={i}
                                        className={`flex items-center p-4 rounded-xl border-2 transition-all cursor-pointer ${
                                            answers[index] === option
                                                ? submitted
                                                    ? option === item.correctAnswer
                                                        ? 'border-green-500 bg-green-50'
                                                        : 'border-red-500 bg-red-50'
                                                    : 'border-blue-500 bg-blue-50'
                                                : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                                        } ${submitted ? 'cursor-not-allowed' : ''}`}
                                    >
                                        <input
                                            type="radio"
                                            name={`question-${index}`}
                                            value={option}
                                            checked={answers[index] === option}
                                            onChange={(e) => handleChange(index, e.target.value)}
                                            disabled={submitted}
                                            className="w-5 h-5 text-blue-600 mr-3 flex-shrink-0"
                                        />
                                        <span className={`font-medium ${
                                            answers[index] === option ? 'text-gray-900' : 'text-gray-700'
                                        }`}>
                                            {option}
                                        </span>
                                    </label>
                                ))}
                            </div>

                            {submitted && (
                                <div className={`mt-4 ml-11 p-4 rounded-xl flex items-start gap-3 ${
                                    answers[index] === item.correctAnswer
                                        ? 'bg-green-100 border-2 border-green-300'
                                        : 'bg-red-100 border-2 border-red-300'
                                }`}>
                                    {answers[index] === item.correctAnswer ? (
                                        <>
                                            <FaCheckCircle className="text-green-600 text-xl flex-shrink-0 mt-0.5" />
                                            <div>
                                                <p className="font-bold text-green-800">Correct!</p>
                                                <p className="text-sm text-green-700">Great job! You got this one right.</p>
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <FaTimesCircle className="text-red-600 text-xl flex-shrink-0 mt-0.5" />
                                            <div>
                                                <p className="font-bold text-red-800">Not quite right</p>
                                                <p className="text-sm text-red-700">
                                                    The correct answer is: <strong>{item.correctAnswer}</strong>
                                                </p>
                                            </div>
                                        </>
                                    )}
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Submit Button */}
                {!submitted && (
                    <div className="flex justify-center mb-8">
                        <button
                            onClick={handleSubmit}
                            disabled={!allAnswered}
                            className={`px-10 py-4 rounded-xl font-bold text-lg shadow-lg transition-all duration-300 flex items-center gap-3 ${
                                allAnswered
                                    ? 'bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700 hover:shadow-xl transform hover:scale-105'
                                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            }`}
                        >
                            <span>Submit Answers</span>
                            <FaArrowRight />
                        </button>
                    </div>
                )}

                {/* Score Display */}
                {submitted && (
                    <div className="bg-white rounded-3xl shadow-xl p-8 mb-8 border-2 border-gray-100">
                        <div className="text-center">
                            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full mb-4">
                                <FaTrophy className="text-4xl text-white" />
                            </div>
                            <h2 className="text-3xl font-bold text-gray-900 mb-2">Challenge Complete!</h2>
                            <p className="text-xl text-gray-600 mb-6">
                                You got <span className="font-bold text-blue-600">{score}</span> out of{" "}
                                <span className="font-bold text-blue-600">{trivia.length}</span> correct
                            </p>

                            {/* Score Bar */}
                            <div className="max-w-md mx-auto mb-6">
                                <div className="w-full bg-gray-200 rounded-full h-6 overflow-hidden">
                                    <div
                                        className={`h-full flex items-center justify-center text-white text-sm font-bold transition-all duration-1000 ${
                                            percentage >= 80 ? 'bg-gradient-to-r from-green-500 to-green-600' :
                                                percentage >= 60 ? 'bg-gradient-to-r from-yellow-500 to-yellow-600' :
                                                    'bg-gradient-to-r from-red-500 to-red-600'
                                        }`}
                                        style={{ width: `${percentage}%` }}
                                    >
                                        {percentage}%
                                    </div>
                                </div>
                            </div>

                            {/* Feedback Message */}
                            <div className={`inline-block px-6 py-3 rounded-xl font-semibold ${
                                percentage >= 80 ? 'bg-green-100 text-green-800' :
                                    percentage >= 60 ? 'bg-yellow-100 text-yellow-800' :
                                        'bg-red-100 text-red-800'
                            }`}>
                                {percentage >= 80 ? '🌟 Excellent work!' :
                                    percentage >= 60 ? '👍 Good effort!' :
                                        '💪 Keep practicing!'}
                            </div>
                        </div>
                    </div>
                )}

                {/* Navigation */}
                <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-white rounded-2xl shadow-lg p-6 border-2 border-gray-100">
                    <button
                        onClick={() => router.push("/learning/essential-punjabi")}
                        className="w-full sm:w-auto flex items-center justify-center gap-2 bg-gray-100 text-gray-700 px-8 py-4 rounded-xl font-bold hover:bg-gray-200 transition-all duration-300"
                    >
                        <FaArrowLeft />
                        <span>Back to Course</span>
                    </button>
                    <button
                        onClick={() => router.push("/lessons/lesson1/3")}
                        className="w-full sm:w-auto flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-8 py-4 rounded-xl font-bold hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
                    >
                        <span>Continue to Quiz</span>
                        <FaArrowRight />
                    </button>
                </div>
            </div>
        </div>
    );
}