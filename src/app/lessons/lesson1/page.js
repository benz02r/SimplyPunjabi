"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion"; // 🏆 Animations for smooth UI
import Confetti from "react-confetti"; // 🎉 Confetti for correct answers

export default function LessonGreetings() {
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [flippedCards, setFlippedCards] = useState({});
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [showConfetti, setShowConfetti] = useState(false);
    const [feedback, setFeedback] = useState("");

    // Greetings Data
    const greetings = [
        { id: 1, punjabi: "Sat Sri Akaal", meaning: "Hello (Respectful & Religious)", context: "A respectful greeting meaning 'God is the truth'." },
        { id: 2, punjabi: "Ki Haal Aa?", meaning: "What's going on? (Informal)", context: "Used casually among friends." },
        { id: 3, punjabi: "Kidan?", meaning: "How are you doing? (Informal)", context: "Another informal way to ask how someone is." },
        { id: 4, punjabi: "Tusi Kidan Teekya?", meaning: "How are you doing? (Formal)", context: "A respectful way to ask about someone's well-being." },
    ];

    // Quiz Options
    const quizOptions = [
        { id: 1, question: "Which greeting is used in religious settings?", options: ["Ki Haal Aa?", "Sat Sri Akaal", "Kidan"], correct: "Sat Sri Akaal" },
        { id: 2, question: "What would you say to a close friend?", options: ["Tusi Kidan Teekya?", "Ki Haal Aa?", "Sat Sri Akaal"], correct: "Ki Haal Aa?" },
        { id: 3, question: "Which greeting is more formal?", options: ["Kidan", "Ki Haal Aa?", "Tusi Kidan Teekya?"], correct: "Tusi Kidan Teekya?" },
        { id: 4, question: "Which greeting is similar to 'How are you doing?' but informal?", options: ["Tusi Kidan Teekya?", "Kidan", "Sat Sri Akaal"], correct: "Kidan" },
    ];

    const [quizStep, setQuizStep] = useState(0);

    // Handle Card Flip
    const toggleFlip = (id) => {
        setFlippedCards((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
    };

    // Handle Quiz Answer Selection
    const handleAnswer = (selected) => {
        const correctAnswer = quizOptions[quizStep].correct;

        if (selected === correctAnswer) {
            setShowConfetti(true);
            setFeedback("✅ Correct!");
            setTimeout(() => setShowConfetti(false), 2000);
        } else {
            setFeedback("❌ Try Again!");
        }

        setTimeout(() => {
            setFeedback("");
            if (selected === correctAnswer) {
                setQuizStep((prev) => prev + 1);
                if (quizStep === quizOptions.length - 1) {
                    setStep(4); // Move to completion
                }
            }
        }, 1000);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-100 to-white px-6 pt-24 pb-16 text-center relative">

            {/* 🎉 Confetti Animation for Correct Answers */}
            {showConfetti && <Confetti numberOfPieces={200} gravity={0.2} />}

            <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full border-2 border-gray-300">

                {/* Step 1: Introduction to Greetings */}
                {step === 1 && (
                    <>
                        <h1 className="text-3xl font-extrabold text-[var(--primary)]">Punjabi Greetings 👋</h1>
                        <p className="text-lg text-gray-700">Learn how to greet people in Punjabi based on different situations.</p>

                        <button
                            onClick={() => setStep(2)}
                            className="mt-6 w-full bg-green-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-600 transition"
                        >
                            Continue →
                        </button>
                    </>
                )}

                {/* Step 2: Interactive Greetings */}
                {step === 2 && (
                    <>
                        <h2 className="text-xl font-bold">When to Use Each Greeting</h2>
                        <p className="text-sm text-gray-600">Tap a card to reveal its meaning & context.</p>

                        <div className="mt-6 grid grid-cols-2 gap-4">
                            {greetings.map((greet) => (
                                <motion.div
                                    key={greet.id}
                                    className="p-6 bg-blue-300 rounded-lg text-lg font-bold cursor-pointer flex justify-center items-center transition transform hover:scale-105 hover:bg-blue-400"
                                    onClick={() => toggleFlip(greet.id)}
                                    whileHover={{ scale: 1.05 }}
                                >
                                    {flippedCards[greet.id] ? (
                                        <motion.div className="text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                            <p className="font-bold">{greet.meaning}</p>
                                            <p className="text-sm text-gray-700">{greet.context}</p>
                                        </motion.div>
                                    ) : (
                                        <p>{greet.punjabi}</p>
                                    )}
                                </motion.div>
                            ))}
                        </div>

                        <button
                            onClick={() => setStep(3)}
                            className="mt-6 w-full bg-green-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-600 transition"
                        >
                            Test Yourself 🎮
                        </button>
                    </>
                )}

                {/* Step 3: Quiz */}
                {step === 3 && (
                    <>
                        <h2 className="text-xl font-bold">{quizOptions[quizStep].question}</h2>

                        <div className="mt-6 space-y-4">
                            {quizOptions[quizStep].options.map((option, index) => (
                                <button
                                    key={index}
                                    onClick={() => handleAnswer(option)}
                                    className="block w-full p-3 bg-blue-300 rounded-lg text-white font-semibold hover:bg-blue-500 transition"
                                >
                                    {option}
                                </button>
                            ))}
                        </div>

                        <p className="mt-4 text-lg font-semibold">{feedback}</p>
                    </>
                )}

                {/* Step 4: Completion */}
                {step === 4 && (
                    <>
                        <h2 className="text-3xl font-bold text-green-500">🎉 Congratulations!</h2>
                        <p className="text-lg text-gray-700">You have successfully learned Punjabi greetings!</p>

                        <button
                            onClick={() => router.push("/")}
                            className="mt-6 w-full bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-600 transition"
                        >
                            Back to Home
                        </button>
                    </>
                )}
            </div>
        </div>
    );
}
