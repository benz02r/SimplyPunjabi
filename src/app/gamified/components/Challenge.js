"use client";

import { useState } from "react";

export default function Challenge({ challenges }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [inputAnswer, setInputAnswer] = useState("");
    const [score, setScore] = useState(0);
    const [finished, setFinished] = useState(false);

    const challenge = challenges[currentIndex];

    const handleAnswer = () => {
        let correct = false;
        if (challenge.type === "multiple-choice") {
            correct = selectedOption === challenge.answer;
        } else if (challenge.type === "fill-in-the-blank") {
            correct = inputAnswer.trim().toLowerCase() === challenge.answer.toLowerCase();
        }

        if (correct) {
            setScore(score + 1);
        }

        if (currentIndex + 1 < challenges.length) {
            setCurrentIndex(currentIndex + 1);
            setSelectedOption(null);
            setInputAnswer("");
        } else {
            setFinished(true);
        }
    };

    const playAudio = (src) => {
        const audio = new Audio(src);
        audio.play();
    };

    return (
        <div className="max-w-xl mx-auto mt-6 p-6 bg-white rounded-lg shadow-md text-center">
            {!finished ? (
                <div>
                    <h2 className="text-xl font-bold text-[var(--primary)]">{challenge.question}</h2>

                    {challenge.type === "multiple-choice" && (
                        <div className="mt-4 space-y-2">
                            {challenge.options.map((option, index) => (
                                <button
                                    key={index}
                                    onClick={() => setSelectedOption(option)}
                                    className={`w-full p-3 rounded-lg border ${
                                        selectedOption === option ? "bg-[var(--primary)] text-white" : "bg-gray-200"
                                    }`}
                                >
                                    {option}
                                </button>
                            ))}
                        </div>
                    )}

                    {challenge.type === "fill-in-the-blank" && (
                        <input
                            type="text"
                            className="w-full p-3 border rounded-lg mt-4"
                            placeholder="Type your answer here..."
                            value={inputAnswer}
                            onChange={(e) => setInputAnswer(e.target.value)}
                        />
                    )}

                    {challenge.type === "audio" && (
                        <div className="mt-4">
                            <button onClick={() => playAudio(challenge.audio)} className="bg-blue-500 text-white px-4 py-2 rounded-lg">
                                🔊 Play Audio
                            </button>
                            <div className="mt-4 space-y-2">
                                {challenge.options.map((option, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setSelectedOption(option)}
                                        className={`w-full p-3 rounded-lg border ${
                                            selectedOption === option ? "bg-[var(--primary)] text-white" : "bg-gray-200"
                                        }`}
                                    >
                                        {option}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    <button
                        onClick={handleAnswer}
                        className="mt-4 bg-[var(--primary)] text-white px-4 py-2 rounded-lg"
                        disabled={challenge.type === "fill-in-the-blank" && inputAnswer === ""}
                    >
                        Next
                    </button>
                </div>
            ) : (
                <p className="text-lg font-bold">🎉 Lesson Complete! Your Score: {score} / {challenges.length}</p>
            )}
        </div>
    );
}
