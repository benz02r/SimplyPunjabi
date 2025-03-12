"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Lesson1Scenario() {
    const router = useRouter();
    const [step, setStep] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [feedback, setFeedback] = useState("");

    const scenarios = [
        {
            id: 1,
            context: "You enter a Gurdwara and see an elder. How do you greet them?",
            options: [
                "Sat Sri Akaal (ਸਤ ਸ੍ਰੀ ਅਕਾਲ)",
                "Ki Haal Aa? (ਕੀ ਹਾਲ ਆ?)",
                "Kidan? (ਕਿੱਧਾਂ?)",
                "Tusi Kidan Teekya? (ਤੁਸੀਂ ਕਿਵੇਂ ਟਿਕਿਆ?)"
            ],
            correct: "Sat Sri Akaal (ਸਤ ਸ੍ਰੀ ਅਕਾਲ)",
            explanation: "'Sat Sri Akaal' is a respectful greeting, appropriate for elders."
        },
        {
            id: 2,
            context: "You meet your friend at a cafe. What's the best way to greet them?",
            options: [
                "Sat Sri Akaal (ਸਤ ਸ੍ਰੀ ਅਕਾਲ)",
                "Ki Haal Aa? (ਕੀ ਹਾਲ ਆ?)",
                "Tusi Kidan Teekya? (ਤੁਸੀਂ ਕਿਵੇਂ ਟਿਕਿਆ?)",
                "Kidan? (ਕਿੱਧਾਂ?)"
            ],
            correct: "Ki Haal Aa? (ਕੀ ਹਾਲ ਆ?)",
            explanation: "'Ki Haal Aa?' is a casual greeting commonly used among friends."
        },
        {
            id: 3,
            context: "You're having a formal meeting with a Punjabi business associate. How do you greet them?",
            options: [
                "Kidan? (ਕਿੱਧਾਂ?)",
                "Sat Sri Akaal (ਸਤ ਸ੍ਰੀ ਅਕਾਲ)",
                "Ki Haal Aa? (ਕੀ ਹਾਲ ਆ?)",
                "Tusi Kidan Teekya? (ਤੁਸੀਂ ਕਿਵੇਂ ਟਿਕਿਆ?)"
            ],
            correct: "Tusi Kidan Teekya? (ਤੁਸੀਂ ਕਿਵੇਂ ਟਿਕਿਆ?)",
            explanation: "'Tusi Kidan Teekya?' is a formal and respectful way to inquire about someone's well-being."
        }
    ];

    const handleAnswerSelection = (option) => {
        setSelectedAnswer(option);
        if (option === scenarios[step].correct) {
            setFeedback("✅ Correct! " + scenarios[step].explanation);
        } else {
            setFeedback("❌ Incorrect. " + scenarios[step].explanation);
        }
    };

    const nextStep = () => {
        if (step < scenarios.length - 1) {
            setStep(step + 1);
            setSelectedAnswer(null);
            setFeedback("");
        } else {
            router.push("/lessons/lesson1/quiz");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-white to-blue-50 px-6 sm:px-10 pt-16 pb-10">
            <div className="w-full max-w-2xl text-center">
                <button onClick={() => router.push("/lessons/lesson1")} className="bg-blue-500 text-white px-5 py-2 rounded-lg shadow-lg hover:bg-blue-600 transition">
                    ← Back to Lesson 1
                </button>
                <h1 className="text-3xl font-bold mt-6 text-gray-800">Real-World Scenario</h1>
                <p className="text-lg text-gray-700 mt-2">Choose the best greeting for each situation.</p>
            </div>

            <div className="max-w-2xl bg-white p-6 rounded-lg shadow-lg mt-6 text-center">
                <p className="text-xl font-semibold">{scenarios[step].context}</p>
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {scenarios[step].options.map((option, index) => (
                        <button
                            key={index}
                            className={`p-4 rounded-lg shadow-md border transition-all text-lg ${selectedAnswer === option ? (option === scenarios[step].correct ? 'bg-green-200' : 'bg-red-200') : 'bg-gray-100 hover:bg-gray-200'}`}
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
                    {step < scenarios.length - 1 ? "Next Scenario →" : "Finish Lesson"}
                </button>
            </div>
        </div>
    );
}
