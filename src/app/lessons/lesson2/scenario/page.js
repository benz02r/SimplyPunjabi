"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Lesson2Scenario() {
    const router = useRouter();
    const [step, setStep] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [feedback, setFeedback] = useState("");

    const scenarios = [
        {
            id: 1,
            context: "You meet someone new and want to introduce yourself. What do you say?",
            options: [
                "Sat Sri Akaal (ਸਤ ਸ੍ਰੀ ਅਕਾਲ)",
                "Mera Naam ... Hai (ਮੇਰਾ ਨਾਮ ... ਹੈ)",
                "Ki Haal Aa? (ਕੀ ਹਾਲ ਆ?)",
                "Tusi Kithon Ho? (ਤੁਸੀਂ ਕਿੱਥੋਂ ਹੋ?)"
            ],
            correct: "Mera Naam ... Hai (ਮੇਰਾ ਨਾਮ ... ਹੈ)",
            explanation: "'Mera Naam ... Hai' means 'My name is ...', which is the correct way to introduce yourself."
        },
        {
            id: 2,
            context: "You want to ask someone’s name. What do you say?",
            options: [
                "Tuhada Naam Ki Hai? (ਤੁਹਾਡਾ ਨਾਮ ਕੀ ਹੈ?)",
                "Sat Sri Akaal (ਸਤ ਸ੍ਰੀ ਅਕਾਲ)",
                "Tusi Kidan Teekya? (ਤੁਸੀਂ ਕਿਵੇਂ ਟਿਕਿਆ?)",
                "Mera Naam ... Hai (ਮੇਰਾ ਨਾਮ ... ਹੈ)"
            ],
            correct: "Tuhada Naam Ki Hai? (ਤੁਹਾਡਾ ਨਾਮ ਕੀ ਹੈ?)",
            explanation: "'Tuhada Naam Ki Hai?' means 'What is your name?'. This is the polite way to ask for someone’s name."
        },
        {
            id: 3,
            context: "You just met someone and want to say 'Nice to meet you.' What do you say?",
            options: [
                "Tuhanu Mil Ke Khushi Hui (ਤੁਹਾਨੂੰ ਮਿਲ ਕੇ ਖੁਸ਼ੀ ਹੋਈ)",
                "Ki Haal Aa? (ਕੀ ਹਾਲ ਆ?)",
                "Tusi Kithon Ho? (ਤੁਸੀਂ ਕਿੱਥੋਂ ਹੋ?)",
                "Tuhada Naam Ki Hai? (ਤੁਹਾਡਾ ਨਾਮ ਕੀ ਹੈ?)"
            ],
            correct: "Tuhanu Mil Ke Khushi Hui (ਤੁਹਾਨੂੰ ਮਿਲ ਕੇ ਖੁਸ਼ੀ ਹੋਈ)",
            explanation: "'Tuhanu Mil Ke Khushi Hui' means 'Nice to meet you'. It's a polite way to respond when meeting someone new."
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
            router.push("/lessons/lesson2/quiz");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-white to-blue-50 px-6 sm:px-10 pt-16 pb-10">
            <div className="w-full max-w-2xl text-center">
                <button onClick={() => router.push("/lessons/lesson2")} className="bg-blue-500 text-white px-5 py-2 rounded-lg shadow-lg hover:bg-blue-600 transition">
                    ← Back to Lesson 2
                </button>
                <h1 className="text-3xl font-bold mt-6 text-gray-800">Real-World Scenario</h1>
                <p className="text-lg text-gray-700 mt-2">Choose the best response for each situation.</p>
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
