"use client";

import { useState } from "react";
import Image from "next/image"; // ✅ Import Next.js Image component

const quiz = [
    {
        question: "Which image represents 'No'?",
        correctAnswer: "Nahi",
        options: [
            { label: "Haan", punjabi: "ਹਾਂ", romanized: "Haan", image: "/images/yes.png", value: "Haan" },
            { label: "Nahi", punjabi: "ਨਹੀਂ", romanized: "Nahi", image: "/images/no.png", value: "Nahi" },
        ],
    },
];

export default function PictureQuiz({ onNext }) {
    const [selected, setSelected] = useState(null);

    const handleAnswer = (value) => {
        setSelected(value);
    };

    return (
        <div>
            <h2 className="text-lg font-bold mt-4">🖼️ {quiz[0].question}</h2>
            <div className="grid grid-cols-2 gap-4 mt-4">
                {quiz[0].options.map((option, index) => (
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
                        <p>{option.punjabi} ({option.romanized})</p>
                    </button>
                ))}
            </div>
            {selected && (
                <button
                    onClick={onNext}
                    className="mt-4 bg-green-500 text-white px-4 py-2 rounded-lg"
                >
                    Next
                </button>
            )}
        </div>
    );
}
