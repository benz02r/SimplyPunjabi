"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight, Lightbulb, CheckCircle, X, RotateCcw, Trophy, Users, MapPin } from "lucide-react";
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null;

const lessonContent = [
    {
        type: "intro",
        title: "Top Tips",
        content: "Before we conclude with this first section, it's time for us to drop some top tips to help you along your Punjabi learning journey! You may have already come across some of these tips before in previous lessons but a refresher never hurt anyone.",
        points: [
            "Learn how to show respect with 'Ji' (ਜੀ)",
            "Understand formal vs informal 'You' (Tusi vs Tu)",
            "Discover the three main regional dialects of Punjab",
            "Master cultural nuances in Punjabi communication"
        ]
    },
    {
        type: "section",
        title: "Adding Respect with ਜੀ (Ji)",
        content: "Depending on the context, we add Ji at the end to convey respect.",
        examples: [
            {
                punjabi: "ਜੀ",
                romanized: "Ji",
                english: "Term of respect (added to names/titles)"
            },
            {
                punjabi: "ਮਾਤਾ ਜੀ",
                romanized: "Mata Ji",
                english: "Respected Mother"
            },
            {
                punjabi: "ਪਿਤਾ ਜੀ",
                romanized: "Pita Ji",
                english: "Respected Father"
            }
        ],
        note: "Adding Ji shows respect and is commonly used when addressing elders or in formal situations."
    },
    {
        type: "quiz",
        question: "Why do we add 'Ji' (ਜੀ) to names in Punjabi?",
        options: [
            { text: "To make the name sound longer", correct: false },
            { text: "To convey respect", correct: true },
            { text: "To indicate the person is a family member", correct: false }
        ]
    },
    {
        type: "section",
        title: "Formal vs Informal 'You'",
        content: "In Punjabi, how we address people older than us is different to how we may address people younger than us. The most common example of this is the pronoun 'You'.",
        examples: [
            {
                punjabi: "ਤੁਸੀਂ",
                romanized: "Tusi",
                english: "You (formal/respectful - for elders)"
            },
            {
                punjabi: "ਤੂੰ",
                romanized: "Tu",
                english: "You (informal - for younger people)"
            }
        ],
        tip: {
            title: "Important Rule",
            content: "If addressing someone OLDER than you, use Tusi (ਤੁਸੀਂ). If addressing someone YOUNGER than you, use Tu (ਤੂੰ)."
        }
    },
    {
        type: "section",
        title: "Examples in Context",
        content: "Let's see how Tusi and Tu are used in real sentences:",
        examples: [
            {
                punjabi: "ਤੁਸੀਂ ਕਿਵੇਂ ਹੋ?",
                romanized: "Tusi kiven ho?",
                english: "How are you? (formal - to elders)"
            },
            {
                punjabi: "ਤੂੰ ਕਿਵੇਂ ਹੈਂ?",
                romanized: "Tu kiven hain?",
                english: "How are you? (informal - to younger people)"
            }
        ],
        note: "Always use Tusi when speaking to grandparents, parents, teachers, or anyone older than you to show proper respect."
    },
    {
        type: "quiz",
        question: "Which pronoun should you use when speaking to your grandmother?",
        options: [
            { text: "Tu (ਤੂੰ) - informal", correct: false },
            { text: "Tusi (ਤੁਸੀਂ) - formal", correct: true },
            { text: "Either one is fine", correct: false }
        ]
    },
    {
        type: "section",
        title: "Regional Dialects of Punjab",
        content: "It's also important to remember that Punjab is split into three regions: Majha, Doaba and Malwa. All three regions have their own distinctive Punjabi dialects so may use slightly different terms or words in their sentences.",
        highlight: "As you go through the next set of lessons, we will begin to incorporate this so you can see the noticeable differences."
    },
    {
        type: "section",
        title: "The Three Main Regions",
        content: "Each region of Punjab has unique characteristics and dialect variations:",
        examples: [
            {
                punjabi: "ਮਾਝਾ",
                romanized: "Majha",
                english: "Central region (includes Amritsar, Lahore)"
            },
            {
                punjabi: "ਦੋਆਬਾ",
                romanized: "Doaba",
                english: "Land between two rivers (includes Jalandhar)"
            },
            {
                punjabi: "ਮਾਲਵਾ",
                romanized: "Malwa",
                english: "Southern region (includes Ludhiana, Patiala)"
            }
        ],
        note: "Don't worry if you hear different words for the same thing - these are regional variations that make Punjabi rich and diverse!"
    },
    {
        type: "quiz",
        question: "How many main regional dialects does Punjab have?",
        options: [
            { text: "Two dialects", correct: false },
            { text: "Three dialects", correct: true },
            { text: "Five dialects", correct: false }
        ]
    }
];

export default function Lesson5() {
    const [step, setStep] = useState(0);
    const [quizAnswers, setQuizAnswers] = useState({});
    const [showFeedback, setShowFeedback] = useState({});
    const [lessonCompleted, setLessonCompleted] = useState(false);
    const [userId, setUserId] = useState(null);
    const router = useRouter();

    useEffect(() => {
        fetchUser();
    }, []);

    const fetchUser = async () => {
        if (!supabase) return;
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
            setUserId(user.id);
        }
    };

    const handleNext = () => {
        if (step < lessonContent.length - 1) {
            setStep(step + 1);
        }
    };

    const handlePrevious = () => {
        if (step > 0) {
            setStep(step - 1);
        }
    };

    const handleQuizAnswer = (optionIndex) => {
        setQuizAnswers({ ...quizAnswers, [step]: optionIndex });
        setShowFeedback({ ...showFeedback, [step]: true });
    };

    const handleComplete = async () => {
        // Save lesson completion to database
        if (supabase && userId) {
            try {
                const { error } = await supabase
                    .from('lesson_progress')
                    .upsert({
                        user_id: userId,
                        lesson_id: 'lesson5',
                        completed: true,
                        completed_at: new Date().toISOString()
                    });

                if (error) throw error;
            } catch (error) {
                console.error('Error saving lesson progress:', error);
            }
        }

        setLessonCompleted(true);
    };

    const current = lessonContent[step];

    const renderContent = () => {
        if (current.type === "intro") {
            return (
                <div className="bg-white rounded-2xl shadow-lg p-8 border-2 border-gray-100">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">{current.title}</h2>
                    <p className="text-lg text-gray-700 mb-6">{current.content}</p>

                    <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-6 border-2 border-orange-200">
                        <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <Lightbulb className="text-orange-600" size={24} />
                            What You'll Learn:
                        </h3>
                        <ul className="space-y-3">
                            {current.points.map((point, idx) => (
                                <li key={idx} className="flex items-start gap-3 text-gray-700">
                                    <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                        <span className="text-white text-sm font-bold">✓</span>
                                    </div>
                                    <span>{point}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            );
        }

        if (current.type === "section") {
            return (
                <div className="bg-white rounded-2xl shadow-lg p-8 border-2 border-gray-100">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">{current.title}</h2>
                    <p className="text-lg text-gray-700 mb-6">{current.content}</p>

                    {current.examples && (
                        <div className="space-y-4 mb-6">
                            {current.examples.map((example, idx) => (
                                <div key={idx} className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6 border-2 border-blue-200">
                                    <div className="text-center">
                                        <div className="text-5xl font-bold text-gray-900 mb-3">{example.punjabi}</div>
                                        <div className="text-2xl font-semibold text-blue-600 mb-2">{example.romanized}</div>
                                        <div className="text-lg text-gray-700">{example.english}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {current.highlight && (
                        <div className="bg-gradient-to-r from-orange-50 to-orange-100 border-l-4 border-orange-500 p-4 rounded-r-lg mb-4">
                            <p className="text-gray-800 font-medium">{current.highlight}</p>
                        </div>
                    )}

                    {current.note && (
                        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
                            <p className="text-gray-700">
                                <strong className="text-blue-700">Note:</strong> {current.note}
                            </p>
                        </div>
                    )}

                    {current.tip && (
                        <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-xl p-6 border-2 border-green-200">
                            <h4 className="font-bold text-green-800 text-lg mb-2 flex items-center gap-2">
                                <Lightbulb size={20} className="text-green-600" />
                                {current.tip.title}
                            </h4>
                            <p className="text-gray-700">{current.tip.content}</p>
                        </div>
                    )}
                </div>
            );
        }

        if (current.type === "quiz") {
            const selectedAnswer = quizAnswers[step];
            const isAnswered = showFeedback[step];
            const isCorrect = isAnswered && current.options[selectedAnswer]?.correct;

            return (
                <div className="bg-white rounded-2xl shadow-lg p-8 border-2 border-gray-100">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center">
                            <Lightbulb className="text-white" size={24} />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900">Quick Check</h2>
                    </div>

                    <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6 mb-6 border-2 border-blue-200">
                        <p className="text-xl font-semibold text-gray-900">{current.question}</p>
                    </div>

                    <div className="space-y-3 mb-6">
                        {current.options.map((option, idx) => (
                            <button
                                key={idx}
                                onClick={() => !isAnswered && handleQuizAnswer(idx)}
                                disabled={isAnswered}
                                className={`w-full p-5 rounded-xl text-left font-semibold transition-all text-base ${
                                    isAnswered
                                        ? option.correct
                                            ? 'bg-green-100 border-2 border-green-500 text-green-800'
                                            : idx === selectedAnswer
                                                ? 'bg-red-100 border-2 border-red-500 text-red-800'
                                                : 'bg-gray-100 text-gray-500 border-2 border-gray-200'
                                        : 'bg-white border-2 border-gray-300 hover:border-blue-400 hover:bg-blue-50 text-gray-800'
                                } ${!isAnswered ? 'cursor-pointer' : 'cursor-not-allowed'}`}
                            >
                                <div className="flex items-center gap-3">
                                    {isAnswered && (
                                        option.correct ? (
                                            <CheckCircle size={20} className="text-green-600 flex-shrink-0" />
                                        ) : idx === selectedAnswer ? (
                                            <X size={20} className="text-red-600 flex-shrink-0" />
                                        ) : null
                                    )}
                                    <span>{option.text}</span>
                                </div>
                            </button>
                        ))}
                    </div>

                    {isAnswered && (
                        <div className={`p-5 rounded-xl border-l-4 ${
                            isCorrect
                                ? 'bg-green-50 border-green-500'
                                : 'bg-orange-50 border-orange-500'
                        }`}>
                            <p className="font-bold mb-2 text-gray-900 flex items-center gap-2">
                                {isCorrect ? (
                                    <>
                                        <CheckCircle size={20} className="text-green-600" />
                                        Correct!
                                    </>
                                ) : (
                                    <>
                                        <Lightbulb size={20} className="text-orange-600" />
                                        Not quite!
                                    </>
                                )}
                            </p>
                            <p className="text-gray-700">
                                {isCorrect
                                    ? "Great job! You're getting the hang of this."
                                    : `The correct answer is: ${current.options.find(o => o.correct).text}`}
                            </p>
                        </div>
                    )}
                </div>
            );
        }

        return null;
    };

    // Calculate quiz statistics
    const quizSteps = lessonContent.map((item, idx) => ({ ...item, index: idx })).filter(item => item.type === "quiz");
    const totalQuizzes = quizSteps.length;
    const correctAnswers = quizSteps.filter(quiz => {
        const answer = quizAnswers[quiz.index];
        return answer !== undefined && quiz.options[answer]?.correct;
    }).length;

    const CompletionSummary = () => {
        const percentage = totalQuizzes > 0 ? Math.round((correctAnswers / totalQuizzes) * 100) : 100;

        return (
            <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-gray-100">
                {/* Success Icon */}
                <div className="text-center mb-6">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-full mb-4 animate-bounce">
                        <Trophy className="text-white" size={40} />
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">Lesson Complete! 🎉</h2>
                    <p className="text-gray-600 text-lg">You've mastered the top tips for learning Punjabi!</p>
                </div>

                {/* Score Display */}
                <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-6 mb-6 border-2 border-orange-200">
                    <div className="text-center">
                        <div className="text-5xl font-bold text-orange-600 mb-2">{percentage}%</div>
                        <p className="text-gray-700 font-semibold text-lg">
                            {correctAnswers} out of {totalQuizzes} questions correct
                        </p>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="bg-gray-50 rounded-lg p-4 text-center">
                        <div className="text-2xl font-bold text-blue-600 mb-1">{totalQuizzes}</div>
                        <p className="text-xs text-gray-600">Total Questions</p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4 text-center">
                        <div className="text-2xl font-bold text-green-600 mb-1">{correctAnswers}</div>
                        <p className="text-xs text-gray-600">Correct</p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4 text-center">
                        <div className="text-2xl font-bold text-orange-600 mb-1">{totalQuizzes - correctAnswers}</div>
                        <p className="text-xs text-gray-600">Incorrect</p>
                    </div>
                </div>

                {/* Progress Saved Message */}
                {supabase && userId && (
                    <div className="bg-green-50 border-l-4 border-green-500 p-3 rounded-r mb-6">
                        <div className="flex items-center gap-2">
                            <CheckCircle size={18} className="text-green-600" />
                            <p className="text-sm text-gray-800 font-medium">Progress saved to your profile</p>
                        </div>
                    </div>
                )}

                {/* Action Buttons */}
                <div className="space-y-3">
                    <button
                        onClick={() => router.push("/learning/essential-punjabi")}
                        className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-blue-700 transition-all text-sm"
                    >
                        <span>Back to Lessons</span>
                        <ArrowRight size={18} />
                    </button>
                    <button
                        onClick={() => {
                            setStep(0);
                            setQuizAnswers({});
                            setShowFeedback({});
                            setLessonCompleted(false);
                        }}
                        className="w-full flex items-center justify-center gap-2 bg-gray-100 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors text-sm"
                    >
                        <RotateCcw size={18} />
                        <span>Review Lesson</span>
                    </button>
                </div>
            </div>
        );
    };

    if (lessonCompleted) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50 px-4 sm:px-6 lg:px-8 pt-28 pb-12">
                <div className="max-w-3xl mx-auto">
                    <CompletionSummary />
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50 px-4 sm:px-6 lg:px-8 pt-28 pb-12">
            <div className="max-w-3xl mx-auto">
                {/* Back Button */}
                <button
                    onClick={() => router.push("/learning/essential-punjabi")}
                    className="mb-6 flex items-center gap-2 text-gray-600 hover:text-blue-600 font-semibold transition-colors text-sm"
                >
                    <ArrowLeft size={18} />
                    <span>Back to Lessons</span>
                </button>

                {/* Header */}
                <div className="bg-gradient-to-r from-orange-600 to-orange-500 rounded-2xl p-6 text-white shadow-lg mb-6">
                    <div className="flex items-center gap-2 mb-2">
                        <Lightbulb size={18} />
                        <span className="text-xs font-semibold uppercase tracking-wide">Lesson 5: Learning Tips</span>
                    </div>
                    <h1 className="text-3xl font-bold mb-2">
                        Top Tips for Learning Punjabi
                    </h1>
                    <p className="text-base text-orange-100">
                        Essential cultural insights and language tips
                    </p>
                </div>

                {/* Progress Bar */}
                <div className="bg-white rounded-xl shadow p-4 mb-6 border border-gray-200">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-semibold text-gray-700">Lesson Progress</span>
                        <span className="text-sm font-bold text-blue-600">
                            {step + 1} / {lessonContent.length}
                        </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                        <div
                            className="bg-gradient-to-r from-orange-500 to-orange-600 h-full transition-all duration-500"
                            style={{ width: `${((step + 1) / lessonContent.length) * 100}%` }}
                        ></div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="mb-6">
                    {renderContent()}
                </div>

                {/* Progress Dots */}
                <div className="flex justify-center gap-1.5 mb-6">
                    {lessonContent.map((_, idx) => (
                        <div
                            key={idx}
                            className={`w-2 h-2 rounded-full transition-all duration-300 ${
                                idx === step
                                    ? 'bg-orange-600 w-6'
                                    : idx < step
                                        ? 'bg-orange-400'
                                        : 'bg-gray-300'
                            }`}
                        ></div>
                    ))}
                </div>

                {/* Navigation Buttons */}
                <div className="flex gap-3">
                    <button
                        onClick={handlePrevious}
                        disabled={step === 0}
                        className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all text-sm ${
                            step === 0
                                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                    >
                        <ArrowLeft size={18} />
                        <span>Previous</span>
                    </button>

                    {step < lessonContent.length - 1 ? (
                        <button
                            onClick={handleNext}
                            disabled={current.type === 'quiz' && !showFeedback[step]}
                            className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all text-sm ${
                                current.type === 'quiz' && !showFeedback[step]
                                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                    : 'bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:from-orange-600 hover:to-orange-700'
                            }`}
                        >
                            <span>Next</span>
                            <ArrowRight size={18} />
                        </button>
                    ) : (
                        <button
                            onClick={handleComplete}
                            className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-green-600 hover:to-green-700 transition-all text-sm"
                        >
                            <span>Complete Lesson</span>
                            <CheckCircle size={18} />
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}