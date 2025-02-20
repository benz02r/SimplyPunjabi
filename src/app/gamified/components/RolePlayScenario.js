"use client";

import { useState } from "react";

const scenarios = [
    {
        question: "You're meeting someone for the first time. What do you say?",
        options: [
            { text: "ਸਤ ਸ੍ਰੀ ਅਕਾਲ! ਤੁਹਾਡਾ ਨਾਮ ਕੀ ਹੈ?", correct: true },
            { text: "ਮੈਂ ਤਕਾ ਰਹਾ ਹਾਂ!", correct: false },
        ],
    },
];

export default function RolePlayScenario({ onNext }) {
    const [answered, setAnswered] = useState(false);
    const [correct, setCorrect] = useState(null);

    const handleAnswer = (option) => {
        setCorrect(option.correct);
        setAnswered(true);
    };

    return (
        <div>
            <h2 className="text-lg font-bold mt-4">🎭 {scenarios[0].question}</h2>
            {scenarios[0].options.map((option, index) => (
                <button
                    key={index}
                    onClick={() => handleAnswer(option)}
                    className="block w-full p-2 mt-2 bg-gray-200 rounded-lg hover:bg-gray-300"
                >
                    {option.text}
                </button>
            ))}
            {answered && (
                <p className={`mt-4 ${correct ? "text-green-500" : "text-red-500"}`}>
                    {correct ? "✅ Correct!" : "❌ Try again."}
                </p>
            )}
            {correct && <button onClick={onNext} className="mt-4 bg-green-500 text-white px-4 py-2 rounded-lg">Next</button>}
        </div>
    );
}
