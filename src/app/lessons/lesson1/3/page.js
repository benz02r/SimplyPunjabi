"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { FaArrowLeft, FaCheckCircle, FaTimesCircle, FaTrophy, FaRedo, FaArrowRight } from "react-icons/fa";

export default function Lesson1Quiz() {
    const router = useRouter();
    const [step, setStep] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [score, setScore] = useState(0);
    const [feedback, setFeedback] = useState("");
    const [quizCompleted, setQuizCompleted] = useState(false);
    const [user, setUser] = useState(null);

    const questions = [
        {
            id: 1,
            question: "The Gurmukhi script was standardized by _____.",
            options: [
                "Guru Angad Dev Ji",
                "Guru Gobind Singh Ji",
                "Kabir Das",
                "Guru Nanak Dev Ji"
            ],
            correct: "Guru Angad Dev Ji"
        },
        {
            id: 2,
            question: "Gurmukhi is derived from _____.",
            options: [
                "Brahmi",
                "Laṇḍā",
                "Pali",
                "Sharada"
            ],
            correct: "Laṇḍā"
        },
        {
            id: 3,
            question: "What makes Gurmukhi different from Devanagari?",
            options: [
                "It is used in Sanskrit",
                "It has no vowels",
                "It uses the horizontal line",
                "It uses Roman characters"
            ],
            correct: "It uses the horizontal line"
        },
        {
            id: 4,
            question: "Which language is primarily written in Gurmukhi?",
            options: [
                "Hindi",
                "Punjabi",
                "Marathi",
                "Gujarati"
            ],
            correct: "Punjabi"
        },
        {
            id: 5,
            question: "Why is Gurmukhi culturally important?",
            options: [
                "It's used in South India",
                "It preserves Sikh teachings",
                "It was invented in the 1900s",
                "It's similar to Urdu"
            ],
            correct: "It preserves Sikh teachings"
        }
    ];

    useEffect(() => {
        const fetchUser = async () => {
            const { data: authData } = await supabase.auth.getUser();
            if (authData?.user) {
                const { data: userData } = await supabase
                    .from("users")
                    .select("id")
                    .eq("email", authData.user.email)
                    .single();

                setUser(userData);
            }
        };
        fetchUser();
    }, []);

    useEffect(() => {
        const saveProgressAndPoints = async () => {
            if (quizCompleted && score === questions.length && user) {
                const { data: existing } = await supabase
                    .from("lesson_progress")
                    .select("id")
                    .eq("user_id", user.id)
                    .eq("lesson_id", "lesson1")
                    .maybeSingle();

                if (!existing) {
                    await supabase.from("lesson_progress").upsert({
                        user_id: user.id,
                        lesson_id: "lesson1",
                        completed: true
                    });

                    await supabase.rpc("increment_points", { add_points: 10 });
                }
            }
        };
        saveProgressAndPoints();
    }, [quizCompleted, score, user]);

    const handleAnswerSelection = (option) => {
        setSelectedAnswer(option);
        if (option === questions[step].correct) {
            setFeedback("correct");
            setScore(score + 1);
        } else {
            setFeedback("incorrect");
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

    const percentage = quizCompleted ? Math.round((score / questions.length) * 100) : 0;

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
                            <FaTrophy className="text-yellow-300" />
                            <span className="text-sm font-semibold">FINAL QUIZ</span>
                        </div>
                        <h1 className="text-4xl sm:text-5xl font-bold mb-4">
                            Lesson 1 Quiz
                        </h1>
                        <p className="text-xl text-blue-100">
                            Test your knowledge on the history of Gurmukhi
                        </p>
                    </div>
                </div>

                {!quizCompleted ? (
                    <>
                        {/* Progress Bar */}
                        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border-2 border-gray-100">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-sm font-semibold text-gray-700">Question Progress</span>
                                <span className="text-sm font-bold text-blue-600">
                                    {step + 1} / {questions.length}
                                </span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                                <div
                                    className="bg-gradient-to-r from-blue-500 to-blue-600 h-full transition-all duration-500"
                                    style={{ width: `${((step + 1) / questions.length) * 100}%` }}
                                ></div>
                            </div>
                        </div>

                        {/* Question Card */}
                        <div className="bg-white rounded-3xl shadow-xl p-8 sm:p-10 border-2 border-gray-100 mb-8">
                            <div className="text-center mb-8">
                                <div className="inline-block bg-gradient-to-br from-blue-500 to-blue-600 text-white px-6 py-3 rounded-2xl font-bold text-lg mb-6">
                                    Question {step + 1}
                                </div>
                                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                                    {questions[step].question}
                                </h2>
                            </div>

                            {/* Answer Options */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                                {questions[step].options.map((option, index) => {
                                    const isSelected = selectedAnswer === option;
                                    const isCorrect = option === questions[step].correct;
                                    const showFeedback = selectedAnswer !== null;

                                    return (
                                        <button
                                            key={index}
                                            className={`p-6 rounded-2xl border-2 font-semibold text-lg transition-all duration-300 ${
                                                !showFeedback
                                                    ? 'border-gray-200 hover:border-blue-400 hover:bg-blue-50 hover:scale-105'
                                                    : isSelected
                                                        ? isCorrect
                                                            ? 'border-green-500 bg-green-50 scale-105'
                                                            : 'border-red-500 bg-red-50'
                                                        : isCorrect
                                                            ? 'border-green-500 bg-green-50'
                                                            : 'border-gray-200 opacity-50'
                                            } ${selectedAnswer !== null ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                                            onClick={() => handleAnswerSelection(option)}
                                            disabled={selectedAnswer !== null}
                                        >
                                            <div className="flex items-center justify-between">
                                                <span className="text-left">{option}</span>
                                                {showFeedback && isCorrect && (
                                                    <FaCheckCircle className="text-green-600 text-2xl flex-shrink-0 ml-2" />
                                                )}
                                                {showFeedback && isSelected && !isCorrect && (
                                                    <FaTimesCircle className="text-red-600 text-2xl flex-shrink-0 ml-2" />
                                                )}
                                            </div>
                                        </button>
                                    );
                                })}
                            </div>

                            {/* Feedback */}
                            {feedback && (
                                <div className={`p-6 rounded-2xl flex items-start gap-4 mb-6 ${
                                    feedback === "correct"
                                        ? 'bg-green-100 border-2 border-green-300'
                                        : 'bg-red-100 border-2 border-red-300'
                                }`}>
                                    {feedback === "correct" ? (
                                        <>
                                            <FaCheckCircle className="text-green-600 text-3xl flex-shrink-0" />
                                            <div>
                                                <p className="font-bold text-green-900 text-xl mb-1">Correct!</p>
                                                <p className="text-green-800">Great job! You got this one right.</p>
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <FaTimesCircle className="text-red-600 text-3xl flex-shrink-0" />
                                            <div>
                                                <p className="font-bold text-red-900 text-xl mb-1">Incorrect</p>
                                                <p className="text-red-800">
                                                    The correct answer is: <strong>{questions[step].correct}</strong>
                                                </p>
                                            </div>
                                        </>
                                    )}
                                </div>
                            )}

                            {/* Next Button */}
                            <button
                                onClick={nextStep}
                                disabled={!selectedAnswer}
                                className={`w-full py-4 rounded-xl font-bold text-lg transition-all duration-300 flex items-center justify-center gap-2 ${
                                    selectedAnswer
                                        ? 'bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700 shadow-lg hover:shadow-xl transform hover:scale-105'
                                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                }`}
                            >
                                <span>{step < questions.length - 1 ? "Next Question" : "See Results"}</span>
                                <FaArrowRight />
                            </button>
                        </div>
                    </>
                ) : (
                    <>
                        {/* Results Card */}
                        <div className="bg-white rounded-3xl shadow-xl p-8 sm:p-12 border-2 border-gray-100 mb-8">
                            <div className="text-center">
                                <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full mb-6">
                                    <FaTrophy className="text-5xl text-white" />
                                </div>

                                <h2 className="text-4xl font-bold text-gray-900 mb-3">Quiz Complete!</h2>
                                <p className="text-2xl text-gray-600 mb-6">
                                    You scored <span className="font-bold text-blue-600">{score}</span> out of{" "}
                                    <span className="font-bold text-blue-600">{questions.length}</span>
                                </p>

                                {/* Score Visualization */}
                                <div className="max-w-md mx-auto mb-8">
                                    <div className="w-full bg-gray-200 rounded-full h-8 overflow-hidden shadow-inner">
                                        <div
                                            className={`h-full flex items-center justify-center text-white font-bold transition-all duration-1000 ${
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
                                <div className={`inline-block px-8 py-4 rounded-2xl font-bold text-xl mb-8 ${
                                    percentage === 100 ? 'bg-green-100 text-green-800 border-2 border-green-300' :
                                        percentage >= 60 ? 'bg-yellow-100 text-yellow-800 border-2 border-yellow-300' :
                                            'bg-red-100 text-red-800 border-2 border-red-300'
                                }`}>
                                    {percentage === 100 ? '🎉 Perfect Score! You mastered this lesson!' :
                                        percentage >= 60 ? '👍 Good job! Keep practicing to improve.' :
                                            '💪 Keep trying! Review the lesson and try again.'}
                                </div>

                                {/* Points Earned */}
                                {score === questions.length && (
                                    <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-6 text-white mb-6">
                                        <p className="text-lg font-semibold mb-2">🎁 Reward Earned!</p>
                                        <p className="text-3xl font-bold">+10 Points</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4">
                            <button
                                onClick={() => router.push("/lessons/lesson1/information")}
                                className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-8 py-4 rounded-xl font-bold hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                            >
                                <FaRedo />
                                <span>Review Lesson</span>
                            </button>
                            <button
                                onClick={() => router.push("/learning/essential-punjabi")}
                                className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-green-500 to-green-600 text-white px-8 py-4 rounded-xl font-bold hover:from-green-600 hover:to-green-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                            >
                                <span>Back to Course</span>
                                <FaArrowRight />
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}