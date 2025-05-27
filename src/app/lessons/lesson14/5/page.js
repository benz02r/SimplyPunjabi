"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Lesson4HealthQuiz() {
    const router = useRouter();
    const [step, setStep] = useState(0);
    const [selected, setSelected] = useState(null);
    const [textAnswer, setTextAnswer] = useState("");
    const [score, setScore] = useState(0);
    const [feedback, setFeedback] = useState("");
    const [completed, setCompleted] = useState(false);

    const questions = [
        // MCQs 1–9
        {
            type: "mcq",
            question: "How would you ask, ‘How is your health?’",
            options: [
                "ਤਹਾਡੀ ਹੈਲ ਠੀਕ ਹਾਂ?",
                "ਤਹਾਡੀ ਸਿਹਤ ਠੀਕ ਹਾਂ?",
                "ਤੁਸੀਂ ਕਿੱਥੇ ਹੋ?",
                "ਤੁਸੀਂ ਕਿਥੇ ਰਹਿੰਦੇ ਹੋ?"
            ],
            correct: "ਤਹਾਡੀ ਸਿਹਤ ਠੀਕ ਹਾਂ?"
        },
        {
            type: "mcq",
            question: "How would you respond ‘yes, my health is fine’?",
            options: [
                "ਹਾਂਜੀ ਮੇਰੀ ਸਿਹਤ ਠੀਕ ਹਾਂ।",
                "ਨਹੀਂ ਮੈਂ ਠੀਕ ਨਹੀਂ ਹਾਂ ਮੈਂ ਬਿਮਾਰ ਹਾਂ।",
                "ਮੈਂ ਖੁਸ਼ ਹਾਂ।",
                "ਮੈਨੂੰ ਉਲਟੀ ਆਈ।"
            ],
            correct: "ਹਾਂਜੀ ਮੇਰੀ ਸਿਹਤ ਠੀਕ ਹਾਂ।"
        },
        {
            type: "mcq",
            question: "How would you respond, ‘no, I am not fine. I am ill’?",
            options: [
                "ਨਹੀਂ, ਮੈਂ ਠੀਕ ਨਹੀਂ ਹਾਂ ਮੈਂ ਬਿਮਾਰ ਹੈ।",
                "ਮੈਂ ਠੀਕ ਹਾਂ।",
                "ਤੁਸੀਂ ਆਰਾਮ ਕਰੋ।",
                "ਨਹੀਂ, ਮੈਂ ਠੀਕ ਨਹੀਂ ਹਾਂ।"
            ],
            correct: "ਨਹੀਂ, ਮੈਂ ਠੀਕ ਨਹੀਂ ਹਾਂ।"
        },
        {
            type: "mcq",
            question: "How would you respond, ‘my head hurts’?",
            options: [
                "ਮੇਰਾ ਪੇਟ ਦੁਖਦਾ।",
                "ਮੈਨੂੰ ਖੰਘ ਹੋਈ ਹੈ।",
                "ਮੇਰਾ ਸਿਰ ਦੁਖਦਾ।",
                "ਮੈਨੂੰ ਬੁਖ਼ਾਰ ਚੜਿਆ।"
            ],
            correct: "ਮੇਰਾ ਸਿਰ ਦੁਖਦਾ।"
        },
        {
            type: "mcq",
            question: "What does ‘ਮੈਨੂੰ ਬੁਖ਼ਾਰ ਚੜਿਆ’ mean?",
            options: [
                "I have a fever.",
                "I am really cold.",
                "I have vomited.",
                "I have symptoms of COVID-19."
            ],
            correct: "I have a fever."
        },
        {
            type: "mcq",
            question: "What does ‘ਮੈਨੂੰ ਜ਼ੁਕਾਮ ਹੋਇਆ’ mean?",
            options: [
                "I am feeling really unwell.",
                "I feel I should go to the doctor.",
                "I have a flu.",
                "I need to take some medication."
            ],
            correct: "I have a flu."
        },
        {
            type: "mcq",
            question: "What does ‘ਮੇਰਾ ਪੇਟ ਦੁਖਦਾ’ mean?",
            options: [
                "My back hurts.",
                "My stomach hurts.",
                "My stomach hurt yesterday.",
                "My back hurt yesterday."
            ],
            correct: "My stomach hurts."
        },
        {
            type: "mcq",
            question: "What does ‘ਮੈਨੂੰ ਉਲਟੀ ਆਈ’ mean?",
            options: [
                "I am feeling sick (vomiting).",
                "She has vomited.",
                "I am going to vomit.",
                "I felt like vomiting."
            ],
            correct: "I am feeling sick (vomiting)."
        },
        {
            type: "mcq",
            question: "What does ‘ਮੈਨੂੰ ਖੰਘ ਹੋਈ ਹੈ’ mean?",
            options: [
                "I had a cough.",
                "I was coughing yesterday.",
                "I have had a really bad cough recently.",
                "I have a cough"
            ],
            correct: "I have a cough"
        },

        // Fill-in-the-blanks 10–18
        {
            type: "fill",
            question: "Fill in the gap: ‘_____ ਡਾਕਟਰਾਂ ਤੇ ਗਏ ਸੀ?’",
            options: ["ਤੁਸੀਂ", "ਤਹਾਡੀ", "ਤੁਹਾਨੂੰ"],
            correct: "ਤੁਸੀਂ"
        },
        {
            type: "fill",
            question: "Aman says: ‘Yes, I have been to the doctor.’ Fill in the gap: 'ਮੈਂ ਡਾਕਟਰ ਤੇ _____ ਸੀ।'",
            options: ["ਗਈ", "ਜਾਣਾ", "ਗਿਆ", "ਜਾਣੀ"],
            correct: "ਗਿਆ"
        },
        {
            type: "fill",
            question: "Priya says: ‘Yes, I have been to the doctor.’ Fill in the gap: 'ਮੈਂ ਡਾਕਟਰ ਤੇ _____ ਸੀ।'",
            options: ["ਗਈ", "ਗਿਆ", "ਜਾਣੀ", "ਮੈਨੂੰ"],
            correct: "ਗਈ"
        },
        {
            type: "fill",
            question: "Fill in the gap: ‘ਡਾਕਟਰ ਨੇ ਮੈਨੂੰ ਗੋਲੀਆਂ ______ ਸੀ।’",
            options: ["ਦਿੱਤੀ", "ਦਿੱਤਾ", "ਦਿੱਤੀਆਂ"],
            correct: "ਦਿੱਤੀਆਂ"
        },
        {
            type: "fill",
            question: "Fill in the gap: ‘ਡਾਕਟਰ ਨੇ ਮੈਨੂੰ _____________ ਦਿੱਤੀ ਸੀ।’",
            options: [
                "ਪੀਨ-ਵਾਲੀ ਦਵਾਈ",
                "ਪੀਨ-ਵਾਲਾ ਦਵਾਈ",
                "ਕੀਨ-ਵਾਲਾ ਦਵਾਈ",
                "ਕੀਨ- ਵਾਲੀ ਦਵਾਈ"
            ],
            correct: "ਪੀਨ-ਵਾਲੀ ਦਵਾਈ"
        },
        {
            type: "fill",
            question: "Aman says: ‘No, I have not been to the doctor.’ Fill the sentence.",
            options: ["ਮੈਂ", "ਗਿਆ", "ਗਈ", "ਮੈਨੂੰ"],
            correct: "ਮੈਂ"
        },
        {
            type: "fill",
            question: "Priya says: ‘No, I have not been to the doctor.’ Fill the sentence.",
            options: ["ਮੈਂ", "ਗਿਆ", "ਗਈ", "ਮੈਨੂੰ"],
            correct: "ਮੈਂ"
        },
        {
            type: "fill",
            question: "Priya says: ‘I went to the hospital.’ Finish: 'ਮੈਂ ਹਸਪਤਾਲ ਤੇ _______।'",
            options: ["ਗਈ ਸੀ", "ਗਿਆ ਸੀ", "ਗਈ ਹੈ’", "ਗਈ ਹਾਂ"],
            correct: "ਗਈ ਸੀ"
        },
        {
            type: "fill",
            question: "Aman says: ‘I did not go to the hospital.’ Finish: 'ਮੈਂ ਹਸਪਤਾਲ ਤੇ _______ ਸੀ।'",
            options: ["ਗਿਆ", "ਨਹੀਂ ਗਿਆ", "ਨਹੀਂ ਗਈ", "ਗਈ"],
            correct: "ਨਹੀਂ ਗਿਆ"
        },

        // Translation 19–24
        {
            type: "translate",
            question: "Translate: ਮੇਰਾ ਅਪਰੇਸ਼ਨ ਹੋਇਆ।",
            correct: "I had an operation."
        },
        {
            type: "translate",
            question: "Translate: ਮੇਰਾ ਐਕਸਰੇ ਹੋਇਆ ਸੀ।",
            correct: "I had an x-ray."
        },
        {
            type: "translate",
            question: "Translate: ਮੇਰਾ ਖੂਨ ਕੱਢਿਆ।",
            correct: "I had my blood taken."
        },
        {
            type: "translate",
            question: "Translate: ਮੇਰੇ ਟਾਂਕੇ ਲਾਏ।",
            correct: "I got stitches"
        },
        {
            type: "translate",
            question: "Translate: ਜ਼ਿਆਦਾ ਪਾਣੀ ਪੀਵੋ ਅਤੇ ਤੁਸੀਂ ਕਸਰਤ ਕਰੋ।",
            correct: "Drink more water and do some exercise"
        },
        {
            type: "translate",
            question: "Translate: ਤੁਸੀਂ ਆਰਾਮ ਕਰੋ।",
            correct: "Rest"
        }
    ];

    const current = questions[step];

    const handleAnswer = (option) => {
        setSelected(option);
        if (option === current.correct) {
            setFeedback("✅ Correct!");
            setScore(score + 1);
        } else {
            setFeedback(`❌ Incorrect. Correct answer: ${current.correct}`);
        }
    };

    const handleTextSubmit = () => {
        const cleanInput = textAnswer.trim().toLowerCase();
        const cleanCorrect = current.correct.trim().toLowerCase();
        if (cleanInput === cleanCorrect) {
            setFeedback("✅ Correct!");
            setScore(score + 1);
        } else {
            setFeedback(`❌ Incorrect. Correct answer: ${current.correct}`);
        }
    };

    const nextStep = () => {
        setSelected(null);
        setTextAnswer("");
        setFeedback("");
        if (step < questions.length - 1) {
            setStep(step + 1);
        } else {
            setCompleted(true);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-white to-blue-50 pt-32 pb-20 px-6 flex justify-center">
            <div className="max-w-2xl w-full bg-white rounded-xl shadow-md p-8 text-center space-y-6">
                <h2 className="text-2xl font-bold text-gray-800">Health Quiz</h2>

                {!completed ? (
                    <>
                        <p className="text-lg text-blue-700 font-semibold">
                            Question {step + 1} of {questions.length}
                        </p>
                        <p className="text-lg">{current.question}</p>

                        {current.type === "mcq" || current.type === "fill" ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                                {current.options.map((option, index) => (
                                    <button
                                        key={index}
                                        className={`p-4 rounded-lg border transition text-base ${
                                            selected
                                                ? option === current.correct
                                                    ? "bg-green-200 border-green-600"
                                                    : selected === option
                                                        ? "bg-red-200 border-red-600"
                                                        : "bg-gray-100"
                                                : "bg-gray-100 hover:bg-gray-200"
                                        }`}
                                        onClick={() => handleAnswer(option)}
                                        disabled={selected !== null}
                                    >
                                        {option}
                                    </button>
                                ))}
                            </div>
                        ) : (
                            <div className="mt-4">
                                <input
                                    type="text"
                                    value={textAnswer}
                                    onChange={(e) => setTextAnswer(e.target.value)}
                                    placeholder="Type your answer..."
                                    className="w-full px-4 py-2 border border-gray-300 rounded"
                                />
                                <button
                                    onClick={handleTextSubmit}
                                    className="mt-4 bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
                                >
                                    Submit Answer
                                </button>
                            </div>
                        )}

                        {feedback && <p className="mt-4 font-semibold">{feedback}</p>}

                        {(selected || feedback) && (
                            <button
                                onClick={nextStep}
                                className="mt-6 bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600"
                            >
                                {step < questions.length - 1 ? "Next →" : "See Results"}
                            </button>
                        )}
                    </>
                ) : (
                    <div>
                        <h3 className="text-xl font-bold text-green-600">Quiz Complete!</h3>
                        <p className="mt-2 text-lg">You scored <strong>{score}</strong> out of {questions.length}</p>
                        <button
                            onClick={() => router.push("/lessons/lesson4")}
                            className="mt-6 bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
                        >
                            ← Back to Lesson
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
