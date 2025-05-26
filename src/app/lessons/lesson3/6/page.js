"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function LessonAboutMeQuiz() {
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
            question: "How do you say 'My name is Priya' in Punjabi?",
            options: [
                "Mera nām Priya hai.",
                "Main Priya haan.",
                "Tera nām Priya hai.",
                "Maiṁ Priya ton haan."
            ],
            correct: "Mera nām Priya hai."
        },
        {
            id: 2,
            question: "Which Punjabi sentence correctly means 'I am 25 years old' for a boy?",
            options: [
                "Maiṁ pacchī sālāṁ dī hāṁ",
                "Maiṁ pacchī sālāṁ dā hāṁ",
                "Maiṁ 25 nām dā hāṁ",
                "Maiṁ pacchī kam kardā hāṁ"
            ],
            correct: "Maiṁ pacchī sālāṁ dā hāṁ"
        },
        {
            id: 3,
            question: "What does 'Tuhāḍī umar kinnī hai?' mean?",
            options: [
                "Where are you from?",
                "How old are you?",
                "What is your name?",
                "Where do you live?"
            ],
            correct: "How old are you?"
        },
        {
            id: 4,
            question: "If Priya is 23 years old, what would she say?",
            options: [
                "Maiṁ teī sālāṁ dī hāṁ",
                "Maiṁ teī sālāṁ dā hāṁ",
                "Maiṁ Priya teī hāṁ",
                "Maiṁ sālāṁ dī Priya hāṁ"
            ],
            correct: "Maiṁ teī sālāṁ dī hāṁ"
        },
        {
            id: 5,
            question: "How do you say 'I am from London' as a girl?",
            options: [
                "Maiṁ London ton āī hāṁ",
                "Maiṁ London ton āiā hāṁ",
                "Maiṁ London vich rahindī hāṁ",
                "Maiṁ London kam kardī hāṁ"
            ],
            correct: "Maiṁ London ton āī hāṁ"
        },
        {
            id: 6,
            question: "Which Punjabi phrase means 'I live in Birmingham' for a girl?",
            options: [
                "Maiṁ Birmingham vich rahindā hāṁ",
                "Maiṁ Birmingham vich rahindī hāṁ",
                "Maiṁ Birmingham ton āī hāṁ",
                "Maiṁ Birmingham paṛhdā hāṁ"
            ],
            correct: "Maiṁ Birmingham vich rahindī hāṁ"
        },
        {
            id: 7,
            question: "What does 'Maiṁ Heathrow Airport laī kam kardā hāṁ' mean?",
            options: [
                "I live at Heathrow Airport.",
                "I study at Heathrow Airport.",
                "I work at Heathrow Airport.",
                "I go to Heathrow Airport."
            ],
            correct: "I work at Heathrow Airport."
        },
        {
            id: 8,
            question: "What is the difference between 'paṛhdā' and 'paṛhdī'?",
            options: [
                "They mean different things.",
                "They are different tenses.",
                "One is for boys, one is for girls.",
                "One is for young people, one is for adults."
            ],
            correct: "One is for boys, one is for girls."
        },
        {
            id: 9,
            question: "Translate: 'I study at university' (boy).",
            options: [
                "Maiṁ university paṛhdā hāṁ",
                "Maiṁ university ton āiā hāṁ",
                "Maiṁ university laī kam kardā hāṁ",
                "Maiṁ university rahindā hāṁ"
            ],
            correct: "Maiṁ university paṛhdā hāṁ"
        },
        {
            id: 10,
            question: "How would Priya say: 'I have two older brothers and one younger sister'?",
            options: [
                "Maiṁ do vaḍḍe bhrā atē ikk chhoṭī bhaiṇ hāṁ",
                "Maiṁ do chhoṭe bhrā atē ikk vaḍḍī bhaiṇ hāṁ",
                "Maiṁ do bhrā ikk bhaiṇ hāṁ",
                "Maiṁ do bhrā chhoṭī bhaiṇ hāṁ"
            ],
            correct: "Maiṁ do vaḍḍe bhrā atē ikk chhoṭī bhaiṇ hāṁ"
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
        const saveProgress = async () => {
            if (quizCompleted && score === questions.length && user) {
                const { data: existing } = await supabase
                    .from("lesson_progress")
                    .select("id")
                    .eq("user_id", user.id)
                    .eq("lesson_id", "lesson3")
                    .maybeSingle();

                if (!existing) {
                    await supabase.from("lesson_progress").upsert({
                        user_id: user.id,
                        lesson_id: "lesson3",
                        completed: true
                    });

                    await supabase.rpc("increment_points", { add_points: 10 });
                }
            }
        };
        saveProgress();
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
                <button onClick={() => router.push("/lessons/lesson3")} className="bg-blue-500 text-white px-5 py-2 rounded-lg shadow-lg hover:bg-blue-600 transition">
                    ← Back to Lesson
                </button>
                <h1 className="text-3xl font-bold mt-6 text-gray-800">Quiz: A Bit About Me</h1>
                <p className="text-lg text-gray-700 mt-2">Test your understanding of self-introductions in Punjabi.</p>
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
                    <button onClick={() => router.push("/lessons/lesson3/1")} className="mt-6 bg-blue-500 text-white px-5 py-2 rounded-lg shadow-lg hover:bg-blue-600 transition">
                        🔄 Retry Lesson
                    </button>
                </div>
            )}
        </div>
    );
}
