"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

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
            question: "What does 'Sat Sri Akaal' mean?",
            options: [
                "Hello, friend!",
                "A respectful greeting meaning 'God is the truth'.",
                "How are you?",
                "Goodbye!"
            ],
            correct: "A respectful greeting meaning 'God is the truth'."
        },
        {
            id: 2,
            question: "Which greeting would you use casually among friends?",
            options: [
                "Sat Sri Akaal",
                "Ki Haal Aa?",
                "Tusi Kidan Teekya?",
                "Namaste"
            ],
            correct: "Ki Haal Aa?"
        },
        {
            id: 3,
            question: "What does 'Kidan?' mean?",
            options: [
                "A respectful farewell",
                "Another informal way to ask how someone is doing",
                "A way to ask about someone's job",
                "A phrase used in business meetings"
            ],
            correct: "Another informal way to ask how someone is doing"
        },
        {
            id: 4,
            question: "Which greeting is the most formal?",
            options: [
                "Ki Haal Aa?",
                "Sat Sri Akaal",
                "Kidan?",
                "Tusi Kidan Teekya?"
            ],
            correct: "Tusi Kidan Teekya?"
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
                <button onClick={() => router.push("/learning/essential-punjabi")} className="bg-blue-500 text-white px-5 py-2 rounded-lg shadow-lg hover:bg-blue-600 transition">
                    ← Back to Lessons
                </button>
                <h1 className="text-3xl font-bold mt-6 text-gray-800">Lesson Quiz</h1>
                <p className="text-lg text-gray-700 mt-2">Test your knowledge on common Punjabi greetings.</p>
            </div>

            {!quizCompleted ? (
                <div className="max-w-2xl bg-white p-6 rounded-lg shadow-lg mt-6 text-center">
                    <p className="text-xl font-semibold">{questions[step].question}</p>
                    <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {questions[step].options.map((option, index) => (
                            <button
                                key={index}
                                className={`p-4 rounded-lg shadow-md border transition-all text-lg ${
                                    selectedAnswer === option
                                        ? option === questions[step].correct
                                            ? "bg-green-200"
                                            : "bg-red-200"
                                        : "bg-gray-100 hover:bg-gray-200"
                                }`}
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
                    <button onClick={() => router.push("/lessons/lesson1")} className="mt-6 bg-blue-500 text-white px-5 py-2 rounded-lg shadow-lg hover:bg-blue-600 transition">
                        🔄 Retry Lesson
                    </button>
                </div>
            )}
        </div>
    );
}
