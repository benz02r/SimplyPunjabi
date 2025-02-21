"use client";

import { useEffect, useState } from "react";

// Expanded Punjabi Numbers with pronunciation guide
const numbers = [
    { gurmukhi: "੧", roman: "Ik", meaning: "One", sound: "/sounds/ik.mp3" },
    { gurmukhi: "੨", roman: "Do", meaning: "Two", sound: "/sounds/do.mp3" },
    { gurmukhi: "੩", roman: "Tinn", meaning: "Three", sound: "/sounds/tinn.mp3" },
    { gurmukhi: "੪", roman: "Chaar", meaning: "Four", sound: "/sounds/chaar.mp3" },
    { gurmukhi: "੫", roman: "Panj", meaning: "Five", sound: "/sounds/panj.mp3" },
    { gurmukhi: "੬", roman: "Che", meaning: "Six", sound: "/sounds/che.mp3" },
    { gurmukhi: "੭", roman: "Satt", meaning: "Seven", sound: "/sounds/satt.mp3" },
    { gurmukhi: "੮", roman: "Ath", meaning: "Eight", sound: "/sounds/ath.mp3" },
    { gurmukhi: "੯", roman: "Nau", meaning: "Nine", sound: "/sounds/nau.mp3" },
    { gurmukhi: "੧੦", roman: "Das", meaning: "Ten", sound: "/sounds/das.mp3" },
    { gurmukhi: "੧੫", roman: "Pandrah", meaning: "Fifteen", sound: "/sounds/pandrah.mp3" },
    { gurmukhi: "੨੦", roman: "Veeh", meaning: "Twenty", sound: "/sounds/veeh.mp3" },
    { gurmukhi: "੩੦", roman: "Teeh", meaning: "Thirty", sound: "/sounds/teeh.mp3" },
    { gurmukhi: "੪੦", roman: "Chaleeh", meaning: "Forty", sound: "/sounds/chaleeh.mp3" },
    { gurmukhi: "੫੦", roman: "Panjah", meaning: "Fifty", sound: "/sounds/panjah.mp3" },
    { gurmukhi: "੬੦", roman: "Sath", meaning: "Sixty", sound: "/sounds/sath.mp3" },
    { gurmukhi: "੭੦", roman: "Sattar", meaning: "Seventy", sound: "/sounds/sattar.mp3" },
    { gurmukhi: "੮੦", roman: "Athah", meaning: "Eighty", sound: "/sounds/athah.mp3" },
    { gurmukhi: "੯੦", roman: "Nabbeh", meaning: "Ninety", sound: "/sounds/nabbeh.mp3" },
    { gurmukhi: "੧੦੦", roman: "Sau", meaning: "One Hundred", sound: "/sounds/sau.mp3" },
];

export default function NumbersPage() {
    const [audio, setAudio] = useState(null);
    const [quizNumber, setQuizNumber] = useState(null);
    const [userInput, setUserInput] = useState("");
    const [feedback, setFeedback] = useState("");

    useEffect(() => {
        if (typeof window !== "undefined") {
            setAudio(new Audio());
        }
    }, []);

    const playSound = (sound) => {
        if (audio) {
            audio.src = sound;
            audio.play().catch(err => console.error("Error playing sound:", err));
        }
    };

    const startQuiz = () => {
        const randomNum = numbers[Math.floor(Math.random() * numbers.length)];
        setQuizNumber(randomNum);
        setFeedback("");
    };

    const checkAnswer = () => {
        if (userInput.toLowerCase() === quizNumber?.roman.toLowerCase()) {
            setFeedback("✅ Correct!");
        } else {
            setFeedback(`❌ Incorrect. The correct answer is ${quizNumber?.roman}.`);
        }
        setUserInput("");
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-6 py-10">
            <div className="max-w-4xl w-full bg-white shadow-xl rounded-xl p-8 border border-gray-200">
                <h2 className="text-3xl font-bold text-center text-[var(--primary)] mb-6">
                    Numbers in Punjabi 🔢
                </h2>

                <p className="text-center text-gray-700 mb-6">
                    Learn Punjabi numbers from 1 to 100. Click on a number to hear its pronunciation!
                </p>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                    {numbers.map(({ gurmukhi, roman, meaning, sound }, index) => (
                        <button
                            key={index}
                            onClick={() => playSound(sound)}
                            className="flex flex-col items-center justify-center p-4 bg-gray-100 text-gray-800 text-lg font-bold rounded-lg shadow-md transition hover:bg-[var(--primary)] hover:text-white"
                        >
                            <span className="text-3xl">{gurmukhi}</span>
                            <span className="text-md mt-1">{roman}</span>
                            <span className="text-sm text-gray-600">{meaning}</span>
                        </button>
                    ))}
                </div>

                <div className="mt-6 p-4 bg-gray-100 rounded-lg text-center text-gray-700">
                    <p className="text-lg font-semibold">Memorization Tip ✨</p>
                    <p className="text-sm mt-2">
                        Start by learning 1-10, then focus on multiples of ten. Combine them to form other numbers!
                    </p>
                </div>

                <div className="mt-6 p-4 bg-white shadow-md rounded-lg text-center">
                    <h3 className="text-xl font-bold">🎯 Quick Quiz: Guess the Number!</h3>
                    <button
                        onClick={startQuiz}
                        className="mt-4 px-4 py-2 bg-[var(--primary)] text-white rounded-lg shadow-md hover:bg-[var(--primary-dark)]">
                        Start Quiz
                    </button>
                    {quizNumber && (
                        <div className="mt-4">
                            <p className="text-2xl font-bold">{quizNumber.gurmukhi}</p>
                            <input
                                type="text"
                                className="mt-2 px-2 py-1 border rounded-lg"
                                placeholder="Enter Romanized Name"
                                value={userInput}
                                onChange={(e) => setUserInput(e.target.value)}
                            />
                            <button
                                onClick={checkAnswer}
                                className="ml-2 px-4 py-1 bg-green-500 text-white rounded-lg">
                                Check Answer
                            </button>
                            <p className="mt-2 font-semibold">{feedback}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
