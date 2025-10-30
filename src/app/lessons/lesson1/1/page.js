"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight, Book, Globe, History, CheckCircle, HelpCircle, X, RotateCcw, Trophy, Award } from "lucide-react";
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null;

const lessonContent = [
    {
        type: "intro",
        title: "What is Panjabi?",
        content: "Anyone can learn a language but why not take a step further and learn how that language came to be? Before we teach you the basics, in this section, we will be taking you back in time to bring you up to speed with the following:",
        points: [
            "Where did Panjabi come from?",
            "How did it develop?",
            "Difference between Panjabi and Hindi"
        ]
    },
    {
        type: "section",
        title: "Where did Panjabi come from?",
        content: "Panjabi originates from Northwestern Apabhramsa – a family of locally spoken dialects that derived from early forms of Sanskrit and popular amongst Northwestern Indian subcontinents that we now know as Panjab, Haryana, Himachal Pradesh and Sindh.",
        note: "At this stage, Panjabi was beginning to emerge as vernacular primarily spoken amongst the locals in what would be considered the Panjab region. In other words, it was not codified in a standardised script that people could refer to."
    },
    {
        type: "section",
        title: "Early Literary Influence",
        content: "A significant turning point in the development of Panjabi is the works of Baba Farid, a revered Sufi Saint renowned for his poems and hymns preaching spirituality, devotion to God and detachment from worldly possessions.",
        highlight: "Baba Farid was regarded as one of the first to incorporate Panjabi vernacular in his literary works in an era where most others were being composed in Persian, Arabic or Sanskrit."
    },
    {
        type: "section",
        title: "Guru Nanak Dev Ji's Contribution",
        content: "Guru Nanak Dev Ji (Founder of Sikhi) later used this same Panjabi vernacular to convey his teachings and hymns amongst those that he came across.",
        note: "We can see how Panjabi was beginning to transition from a local vernacular to a way of promoting and spreading spiritual guidance."
    },
    {
        type: "quiz",
        question: "Who was one of the first to incorporate Panjabi vernacular in literary works?",
        options: [
            { text: "Guru Nanak Dev Ji", correct: false },
            { text: "Baba Farid", correct: true },
            { text: "Guru Angad Dev Ji", correct: false }
        ]
    },
    {
        type: "section",
        title: "Development in Panjabi",
        content: "Up until this point, Panjabi was regarded as a spoken vernacular. There was no codified language, and most reproductions of Panjabi text were written in Lanada, Mahajani or Shahmukhi.",
        note: "The issue with this was that scripts such as Lanada were merchant scripts used in business transactions or shorthand. There were no vowel sounds meaning the reader would often have to imagine them to make sense of what was being written."
    },
    {
        type: "section",
        title: "Creation of Gurmukhi Script",
        content: "Concerned that people would misinterpret the teachings of the Gurus, the second Sikh Guru, Guru Angad Dev Ji took it upon himself to create what we now know as the 'Gurmukhi Script.'",
        highlight: "The Gurmukhi Script is what we now use to read and write Panjabi."
    },
    {
        type: "quiz",
        question: "Who created the Gurmukhi Script?",
        options: [
            { text: "Guru Nanak Dev Ji", correct: false },
            { text: "Guru Angad Dev Ji", correct: true },
            { text: "Baba Farid", correct: false }
        ]
    },
    {
        type: "section",
        title: "Difference Between Panjabi and Hindi",
        content: "Often you may hear people make the misconception that Panjabi and Hindi are the same or you may hear people confuse one for the other. In this part of the lesson, we will look at some key differences between the two languages so that you can avoid this common mistake.",
        comparison: [
            {
                title: "Script",
                panjabi: "Uses Gurmukhi script",
                hindi: "Uses Devanagari script"
            },
            {
                title: "Origins",
                panjabi: "Northwestern Apabhramsa dialects",
                hindi: "Central/Eastern dialects of Sanskrit"
            },
            {
                title: "Phonetics",
                panjabi: "Unique tones and sounds specific to Punjabi",
                hindi: "Different phonetic structure"
            },
            {
                title: "Cultural Context",
                panjabi: "Deeply tied to Sikh and Punjabi culture",
                hindi: "Associated with broader North Indian culture"
            }
        ]
    },
    {
        type: "quiz",
        question: "What script is used to write Panjabi?",
        options: [
            { text: "Devanagari", correct: false },
            { text: "Gurmukhi", correct: true },
            { text: "Arabic", correct: false }
        ]
    },
    {
        type: "quiz",
        question: "Why was the Gurmukhi Script created?",
        options: [
            { text: "For business transactions", correct: false },
            { text: "To prevent misinterpretation of the Gurus' teachings", correct: true },
            { text: "To replace Persian", correct: false }
        ]
    }
];

export default function Lesson1WhatIsPanjabi() {
    const router = useRouter();
    const [step, setStep] = useState(0);
    const [quizAnswers, setQuizAnswers] = useState({});
    const [showFeedback, setShowFeedback] = useState({});
    const [lessonCompleted, setLessonCompleted] = useState(false);
    const [userId, setUserId] = useState(null);
    const current = lessonContent[step];

    // Get user on mount
    useEffect(() => {
        const getUser = async () => {
            if (supabase) {
                const { data: { user } } = await supabase.auth.getUser();
                if (user) {
                    setUserId(user.id);
                }
            }
        };
        getUser();
    }, []);

    // Calculate quiz statistics
    const quizSteps = lessonContent.reduce((acc, content, index) => {
        if (content.type === 'quiz') acc.push(index);
        return acc;
    }, []);

    const totalQuizzes = quizSteps.length;
    const correctAnswers = quizSteps.filter(index => {
        const answer = quizAnswers[index];
        return answer !== undefined && lessonContent[index].options[answer]?.correct;
    }).length;
    const score = totalQuizzes > 0 ? Math.round((correctAnswers / totalQuizzes) * 100) : 0;

    // Save progress to Supabase
    const saveProgress = async () => {
        if (!supabase || !userId) return;

        try {
            const { error } = await supabase
                .from('lesson_progress')
                .upsert({
                    user_id: userId,
                    lesson_id: 'lesson-1-what-is-panjabi',
                    lesson_name: 'What is Panjabi?',
                    completed: true,
                    score: score,
                    total_questions: totalQuizzes,
                    correct_answers: correctAnswers,
                    completed_at: new Date().toISOString(),
                    updated_at: new Date().toISOString()
                }, {
                    onConflict: 'user_id,lesson_id'
                });

            if (error) {
                console.error('Error saving progress:', error);
            }
        } catch (err) {
            console.error('Error:', err);
        }
    };

    const handlePrevious = () => {
        if (step > 0) {
            setStep(step - 1);
            setShowFeedback({});
            setLessonCompleted(false);
        }
    };

    const handleNext = () => {
        if (step < lessonContent.length - 1) {
            setStep(step + 1);
            setShowFeedback({});
        }
    };

    const handleComplete = async () => {
        setLessonCompleted(true);
        await saveProgress();
    };

    const handleQuizAnswer = (optionIndex) => {
        setQuizAnswers({ ...quizAnswers, [step]: optionIndex });
        setShowFeedback({ ...showFeedback, [step]: true });
    };

    const resetQuiz = () => {
        setQuizAnswers({ ...quizAnswers, [step]: null });
        setShowFeedback({ ...showFeedback, [step]: false });
    };

    const renderContent = () => {
        switch (current.type) {
            case "intro":
                return (
                    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
                        <div className="mb-4">
                            <h2 className="text-2xl font-bold text-gray-900 mb-3">{current.title}</h2>
                        </div>
                        <p className="text-base text-gray-700 leading-relaxed mb-4">{current.content}</p>
                        {current.points && (
                            <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                                <ul className="space-y-2">
                                    {current.points.map((point, index) => (
                                        <li key={index} className="flex items-start gap-2">
                                            <CheckCircle size={18} className="text-blue-600 flex-shrink-0 mt-0.5" />
                                            <span className="text-sm text-gray-800">{point}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                );

            case "section":
                return (
                    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
                        <div className="mb-4">
                            <h2 className="text-2xl font-bold text-gray-900 mb-3">{current.title}</h2>
                        </div>
                        <p className="text-base text-gray-700 leading-relaxed mb-4">{current.content}</p>

                        {current.highlight && (
                            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded-r mb-4">
                                <p className="text-sm text-gray-800 font-medium">{current.highlight}</p>
                            </div>
                        )}

                        {current.note && (
                            <div className="bg-blue-50 border-l-4 border-blue-500 p-3 rounded-r">
                                <p className="text-sm text-gray-800">{current.note}</p>
                            </div>
                        )}

                        {current.comparison && (
                            <div className="mt-4 space-y-3">
                                <h3 className="text-lg font-bold text-gray-900 mb-3">Key Differences:</h3>
                                {current.comparison.map((item, index) => (
                                    <div key={index} className="bg-gradient-to-r from-blue-50 to-orange-50 rounded-lg p-4 border border-gray-200">
                                        <h4 className="font-bold text-gray-900 mb-2">{item.title}</h4>
                                        <div className="grid md:grid-cols-2 gap-3 text-sm">
                                            <div className="bg-blue-100 rounded p-2 border border-blue-200">
                                                <p className="font-semibold text-blue-900 mb-1">Panjabi:</p>
                                                <p className="text-gray-800">{item.panjabi}</p>
                                            </div>
                                            <div className="bg-orange-100 rounded p-2 border border-orange-200">
                                                <p className="font-semibold text-orange-900 mb-1">Hindi:</p>
                                                <p className="text-gray-800">{item.hindi}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                );

            case "quiz":
                const selectedAnswer = quizAnswers[step];
                const hasAnswered = showFeedback[step];
                const isCorrect = hasAnswered && current.options[selectedAnswer]?.correct;

                return (
                    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                                <HelpCircle size={20} className="text-yellow-600" />
                            </div>
                            <h2 className="text-xl font-bold text-gray-900">Quick Check</h2>
                        </div>

                        <div className="mb-6">
                            <p className="text-base font-semibold text-gray-800 mb-4">{current.question}</p>

                            <div className="space-y-2">
                                {current.options.map((option, index) => (
                                    <button
                                        key={index}
                                        onClick={() => !hasAnswered && handleQuizAnswer(index)}
                                        disabled={hasAnswered}
                                        className={`w-full text-left p-3 rounded-lg border-2 transition-all text-sm ${
                                            hasAnswered
                                                ? option.correct
                                                    ? 'border-green-500 bg-green-50'
                                                    : selectedAnswer === index
                                                        ? 'border-red-500 bg-red-50'
                                                        : 'border-gray-200 bg-gray-50 opacity-50'
                                                : 'border-gray-300 hover:border-blue-500 hover:bg-blue-50 cursor-pointer'
                                        }`}
                                    >
                                        <div className="flex items-center justify-between">
                                            <span className="font-medium">{option.text}</span>
                                            {hasAnswered && option.correct && (
                                                <CheckCircle size={18} className="text-green-600" />
                                            )}
                                            {hasAnswered && !option.correct && selectedAnswer === index && (
                                                <X size={18} className="text-red-600" />
                                            )}
                                        </div>
                                    </button>
                                ))}
                            </div>

                            {hasAnswered && (
                                <div className="mt-4 space-y-3">
                                    <div className={`p-3 rounded-lg border ${isCorrect ? 'bg-green-50 border-green-500' : 'bg-red-50 border-red-500'}`}>
                                        <p className="font-bold text-sm">
                                            {isCorrect ? '✓ Correct!' : '✗ Not quite'}
                                        </p>
                                    </div>

                                    {!isCorrect && (
                                        <button
                                            onClick={resetQuiz}
                                            className="w-full flex items-center justify-center gap-2 bg-orange-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-orange-600 transition-colors text-sm"
                                        >
                                            <RotateCcw size={16} />
                                            <span>Try Again</span>
                                        </button>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                );

            default:
                return null;
        }
    };

    // Completion Summary Component
    const CompletionSummary = () => {
        const getScoreMessage = () => {
            if (score === 100) return "Perfect Score!";
            if (score >= 75) return "Great Job!";
            if (score >= 50) return "Good Effort!";
            return "Keep Practicing!";
        };

        const getScoreColor = () => {
            if (score === 100) return "text-green-600";
            if (score >= 75) return "text-blue-600";
            if (score >= 50) return "text-orange-600";
            return "text-red-600";
        };

        const getScoreIcon = () => {
            if (score === 100) return <Award size={40} className="text-green-600" />;
            if (score >= 75) return <Trophy size={40} className="text-blue-600" />;
            if (score >= 50) return <CheckCircle size={40} className="text-orange-600" />;
            return <Book size={40} className="text-red-600" />;
        };

        return (
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
                <div className="text-center mb-6">
                    <div className="w-20 h-20 bg-gradient-to-br from-green-100 to-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        {getScoreIcon()}
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">Lesson Complete!</h2>
                    <p className="text-gray-600">You've finished the What is Panjabi? lesson</p>
                </div>

                {/* Score Display */}
                <div className="bg-gradient-to-br from-blue-50 to-orange-50 rounded-xl p-6 mb-6 border border-blue-200">
                    <div className="text-center">
                        <p className="text-sm font-semibold text-gray-600 uppercase mb-2">Your Score</p>
                        <div className="flex items-center justify-center gap-4 mb-3">
                            <div className={`text-5xl font-bold ${getScoreColor()}`}>
                                {score}%
                            </div>
                        </div>
                        <p className="text-lg font-semibold text-gray-800 mb-2">{getScoreMessage()}</p>
                        <p className="text-sm text-gray-600">
                            {correctAnswers} out of {totalQuizzes} questions correct
                        </p>
                    </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-3 mb-6">
                    <div className="bg-blue-50 rounded-lg p-4 text-center border border-blue-200">
                        <div className="text-2xl font-bold text-blue-600 mb-1">{totalQuizzes}</div>
                        <p className="text-xs text-gray-600">Total Questions</p>
                    </div>
                    <div className="bg-green-50 rounded-lg p-4 text-center border border-green-200">
                        <div className="text-2xl font-bold text-green-600 mb-1">{correctAnswers}</div>
                        <p className="text-xs text-gray-600">Correct</p>
                    </div>
                    <div className="bg-orange-50 rounded-lg p-4 text-center border border-orange-200">
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
                        onClick={() => router.push("/lessons/lesson2/1")}
                        className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-blue-700 transition-all text-sm"
                    >
                        <span>Continue to Next Lesson</span>
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
                    <button
                        onClick={() => router.push("/learning/essential-punjabi")}
                        className="w-full flex items-center justify-center gap-2 bg-white text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors text-sm border border-gray-300"
                    >
                        <ArrowLeft size={18} />
                        <span>Back to Lessons</span>
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
                <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-6 text-white shadow-lg mb-6">
                    <div className="flex items-center gap-2 mb-2">
                        <Book size={18} />
                        <span className="text-xs font-semibold uppercase tracking-wide">Lesson 1: Cultural Foundation</span>
                    </div>
                    <h1 className="text-3xl font-bold mb-2">
                        What is Panjabi?
                    </h1>
                    <p className="text-base text-blue-100">
                        Discover the origins and development of the Panjabi language
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
                            className="bg-gradient-to-r from-blue-500 to-blue-600 h-full transition-all duration-500"
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
                                    ? 'bg-blue-600 w-6'
                                    : idx < step
                                        ? 'bg-blue-400'
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
                                    : 'bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700'
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