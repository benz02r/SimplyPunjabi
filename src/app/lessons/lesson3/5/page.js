"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const quizQuestions = [
    {
        question: "How do you say: My name is Ryan?",
        options: [
            "Main Ryan ton haan.",
            "Main Ryan haan.",
            "Mera naam Ryan hai.",
            "Main London rehnda haan."
        ],
        answer: "Mera naam Ryan hai."
    },
    {
        question: "Translate: I am from London.",
        options: [
            "Main London ton aaya haan.",
            "Main London padhda haan.",
            "Main London vich vasda haan.",
            "Mera naam London hai."
        ],
        answer: "Main London ton aaya haan."
    },
    {
        question: "Which means: I live in Birmingham?",
        options: [
            "Main Birmingham ton aaya haan.",
            "Main Birmingham vich rehnda haan.",
            "Main Birmingham padhda haan.",
            "Main Birmingham da naam rakhya."
        ],
        answer: "Main Birmingham vich rehnda haan."
    },
    {
        question: "How do you say: I am a student?",
        options: [
            "Main vidyarthi haan.",
            "Main adhiapak haan.",
            "Main likhari haan.",
            "Main kheda haan."
        ],
        answer: "Main vidyarthi haan."
    },
    {
        question: "Choose the sentence: I have two sisters.",
        options: [
            "Main do bhainaan haan.",
            "Main do bhainaan rakhda haan.",
            "Mainu do bhainaan han.",
            "Main bhainaan padhda haan."
        ],
        answer: "Mainu do bhainaan han."
    }
];


export default function AboutMeQuiz() {
    const router = useRouter();
    const [step, setStep] = useState(0);
    const [selected, setSelected] = useState(null);
    const [score, setScore] = useState(0);
    const [feedback, setFeedback] = useState("");
    const [completed, setCompleted] = useState(false);

    const current = quizQuestions[step];

    const checkAnswer = (option) => {
        setSelected(option);
        if (option === current.answer) {
            setFeedback("✅ Correct!");
            setScore(score + 1);
        } else {
            setFeedback(`❌ Incorrect. Correct answer: ${current.answer}`);
        }
    };

    const nextQuestion = () => {
        if (step < quizQuestions.length - 1) {
            setStep(step + 1);
            setSelected(null);
            setFeedback("");
        } else {
            setCompleted(true);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-white to-blue-50 px-6 pt-36 pb-20 flex flex-col items-center">
            <div className="max-w-xl w-full bg-white rounded-xl shadow-md p-8 text-center space-y-6 hover:shadow-xl transition duration-300">
                {!completed ? (
                    <>
                        <h2 className="text-xl font-bold text-blue-600">Question {step + 1} of {quizQuestions.length}</h2>
                        <h3 className="text-lg text-gray-800">{current.question}</h3>

                        <div className="grid grid-cols-1 gap-4 mt-4">
                            {current.options.map((option, index) => (
                                <button
                                    key={index}
                                    onClick={() => checkAnswer(option)}
                                    disabled={selected !== null}
                                    className={`p-3 rounded border ${
                                        selected === option
                                            ? option === current.answer
                                                ? "bg-green-200 border-green-500"
                                                : "bg-red-200 border-red-500"
                                            : "bg-gray-100 hover:bg-gray-200"
                                    } transition`}
                                >
                                    {option}
                                </button>
                            ))}
                        </div>

                        {feedback && <p className="mt-4 font-semibold">{feedback}</p>}

                        {selected && (
                            <button
                                onClick={nextQuestion}
                                className="mt-4 bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition"
                            >
                                {step < quizQuestions.length - 1 ? "Next →" : "See Results"}
                            </button>
                        )}
                    </>
                ) : (
                    <div>
                        <h2 className="text-2xl font-bold text-green-600">Quiz Completed!</h2>
                        <p className="text-lg mt-2">You scored <strong>{score}</strong> out of <strong>{quizQuestions.length}</strong>.</p>

                        <button
                            onClick={() => router.push("/learning/essential-punjabi")}
                            className="mt-6 bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-600 transition"
                        >
                            ← Back to Lessons
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
