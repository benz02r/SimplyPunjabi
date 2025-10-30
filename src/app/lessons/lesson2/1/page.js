"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight, Volume2, CheckCircle, User, HelpCircle, Lightbulb, MessageCircle, Book, X, RotateCcw, Trophy, Award } from "lucide-react";
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null;

const lessonContent = [
    {
        type: "intro",
        title: "Introduction to Punjabi Greetings",
        content: "First stage of learning any language is learning how to greet someone. Whether they are your family members, friends or people you are meeting for the first time, in this section we will introduce you to the formal and informal ways to greet someone in Panjabi."
    },
    {
        type: "phrase",
        avatar: "/avatars/avatar6.png",
        speaker: "Aman",
        title: "Sat Sri Akaal Ji (ਸਤ ਸ੍ਰੀ ਅਕਾਲ ਜੀ)",
        roman: "Sat Sri Akaal Ji",
        meaning: "Roughly translated: 'Truth is God' or 'God is Truth'. We add Ji (ਜੀ) as a form of respect.",
        usage: "Use this to greet someone formally (family members, elders, or people you're meeting for the first time) and also to say goodbye"
    },
    {
        type: "info",
        title: "Building on Your Greeting",
        content: "As a follow up, after greeting someone, you may want to ask about their wellbeing. How can you do this in Panjabi? To ask someone 'How are you?' in Panjabi, you can do it in one of two ways:"
    },
    {
        type: "phrase",
        avatar: "/avatars/avatar5.png",
        speaker: "Priya",
        title: "ਤੁਹਾਡਾ ਕੀ ਹਾਲ ਹੈ?",
        roman: "Tuhāḍā kī hāl hai?",
        meaning: "How are you?",
        usage: "A formal way to ask about someone's wellbeing after greeting them"
    },
    {
        type: "phrase",
        avatar: "/avatars/avatar6.png",
        speaker: "Aman",
        title: "ਤੁਸੀਂ ਕਿਵੇਂ ਹੋ?",
        roman: "Tusi(n) kive(n) ho?",
        meaning: "How are you?",
        usage: "Another formal way to ask 'How are you?' - commonly used with elders and in respectful settings"
    },
    {
        type: "context",
        title: "Let's put this into context!",
        scenario: "Amar is going to see his Grandparents at their house. His Grandma answers the door, and Amar greets her by saying:",
        dialogue: [
            {
                speaker: "Amar",
                text: "Sat Sri Akaal Ji. Tusi(n) kive(n) ho?",
                avatar: "/avatars/avatar6.png"
            },
            {
                speaker: "Grandma",
                text: "Sat Sri Akaal Amar. Mai(n) theek haa(n).",
                avatar: "/avatars/avatar5.png"
            }
        ],
        explanation: "Here, Amar's Grandma has greeted him back but also added something extra.",
        highlight: "Mai(n) theek haa(n)"
    },
    {
        type: "quiz",
        question: "What does 'Mai(n) theek haa(n)' mean?",
        options: [
            { text: "I am unhappy", correct: false },
            { text: "I am fine", correct: true },
            { text: "I am excited", correct: false }
        ],
        feedback: "You will learn more about Panjabi emotions and how else you can respond to questions like this in the later lessons"
    },
    {
        type: "phrase",
        avatar: "/avatars/avatar5.png",
        speaker: "Priya",
        title: "ਮੈਂ ਠੀਕ ਹਾਂ",
        roman: "Mai(n) theek haa(n)",
        meaning: "I am fine",
        usage: "Use this to respond when someone asks how you are"
    },
    {
        type: "info",
        title: "Saying Goodbye",
        content: "Now that you know how to greet and ask someone how they are in Panjabi, we can start to teach you how to politely say goodbye or depart from someone.",
        note: "Don't get confused, Sat Sri Akaal can be used to say hello and goodbye in Panjabi. However, you may want to take it a step further to really show off your Panjabi by adding the following:"
    },
    {
        type: "phrase",
        avatar: "/avatars/avatar6.png",
        speaker: "Aman",
        title: "ਅਪਨਾ ਖਿਆਲ ਰੱਖਣਾ",
        roman: "Apana khay-aal rakh-naa",
        meaning: "You take care",
        usage: "A polite way to say goodbye, showing care and concern for the person"
    },
    {
        type: "info",
        title: "Informal Greetings",
        content: "Let's now imagine that you are in a social environment and have come across your friends. It is an informal setting, and you wish to greet them. How would you approach this?"
    },
    {
        type: "phrase",
        avatar: "/avatars/avatar5.png",
        speaker: "Priya",
        title: "ਕਿੱਦਾਂ?",
        roman: "Kiddā̃?",
        meaning: "How are you? / What's up?",
        usage: "Informal way of greeting - use this in casual settings when meeting friends",
        note: "In short, Kidda is an informal way of asking someone 'How are you?' and is used to greet someone, typically in an informal interaction or casual setting such as when meeting up with friends."
    },
    {
        type: "quiz",
        question: "Priya is meeting with her Uncle and Auntie. She wants to greet them in a formal and respectful way. Pick which greeting would be most appropriate for this?",
        options: [
            { text: "Sat Sri Akaal", correct: true },
            { text: "Kidda", correct: false }
        ]
    },
    {
        type: "quiz",
        question: "Sat Sri Akaal can be used to say hello and goodbye.",
        options: [
            { text: "True", correct: true },
            { text: "False", correct: false }
        ]
    },
    {
        type: "quiz",
        question: "Priya has met with her Uncle and Auntie. She wants to ask them how they are. Fill in the blank: _____ kive(n) ho?",
        options: [
            { text: "Tuhāḍā", correct: false },
            { text: "Tusi(n)", correct: true }
        ],
        correctAnswer: "Tusi(n) kive(n) ho?"
    }
];

export default function GreetingSteps() {
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
    const answeredQuizzes = quizSteps.filter(index => quizAnswers[index] !== undefined).length;
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
                    lesson_id: 'lesson-2-greetings',
                    lesson_name: 'Punjabi Greetings',
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
            case "info":
                return (
                    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
                        <div className="mb-4">
                            <h2 className="text-2xl font-bold text-gray-900 mb-3">{current.title}</h2>
                        </div>
                        <p className="text-base text-gray-700 leading-relaxed mb-4">{current.content}</p>
                        {current.note && (
                            <div className="bg-blue-50 border-l-4 border-blue-500 p-3 rounded-r">
                                <p className="text-sm text-gray-800">{current.note}</p>
                            </div>
                        )}
                    </div>
                );

            case "phrase":
                return (
                    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
                        {/* Speaker */}
                        <div className="flex items-center gap-3 mb-6">
                            <img
                                src={current.avatar}
                                alt={current.speaker}
                                className="w-12 h-12 rounded-full border-2 border-blue-500"
                            />
                            <div className="bg-blue-100 px-4 py-1.5 rounded-full">
                                <p className="text-blue-800 font-semibold text-sm">{current.speaker} teaches</p>
                            </div>
                        </div>

                        {/* Phrase */}
                        <div className="space-y-4">
                            <div className="bg-gradient-to-br from-blue-50 to-orange-50 rounded-xl p-6 border border-blue-200 text-center">
                                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                                    {current.title}
                                </h3>
                                <button className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors text-sm">
                                    <Volume2 size={16} />
                                    <span>Listen</span>
                                </button>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div className="bg-white rounded-lg p-4 border border-gray-200">
                                    <p className="text-xs font-semibold text-gray-500 uppercase mb-1">Pronunciation</p>
                                    <p className="text-lg font-bold text-blue-600 italic">{current.roman}</p>
                                </div>
                                <div className="bg-white rounded-lg p-4 border border-gray-200">
                                    <p className="text-xs font-semibold text-gray-500 uppercase mb-1">Meaning</p>
                                    <p className="text-base text-gray-800">{current.meaning}</p>
                                </div>
                            </div>

                            <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                                <div className="flex items-start gap-2">
                                    <CheckCircle size={18} className="text-green-600 flex-shrink-0 mt-0.5" />
                                    <div>
                                        <p className="text-xs font-semibold text-green-800 uppercase mb-1">When to Use</p>
                                        <p className="text-sm text-green-900">{current.usage}</p>
                                    </div>
                                </div>
                            </div>

                            {current.note && (
                                <div className="bg-gray-50 border-l-4 border-gray-400 p-3 rounded-r">
                                    <p className="text-sm text-gray-700">{current.note}</p>
                                </div>
                            )}
                        </div>
                    </div>
                );

            case "context":
                return (
                    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">{current.title}</h2>

                        <div className="bg-purple-50 rounded-lg p-4 mb-4 border border-purple-200">
                            <p className="text-sm text-gray-800 mb-4">{current.scenario}</p>

                            <div className="space-y-3">
                                {current.dialogue.map((line, index) => (
                                    <div
                                        key={index}
                                        className={`flex ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}
                                    >
                                        <div className={`max-w-xs ${index % 2 === 0 ? 'bg-blue-100' : 'bg-green-100'} rounded-lg p-3 border ${index % 2 === 0 ? 'border-blue-200' : 'border-green-200'}`}>
                                            <p className="font-semibold text-xs mb-1">{line.speaker}</p>
                                            <p className="text-sm text-gray-900">{line.text}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {current.explanation && (
                            <div className="bg-orange-50 border-l-4 border-orange-500 p-3 rounded-r mb-3">
                                <p className="text-sm text-gray-800">{current.explanation}</p>
                            </div>
                        )}

                        {current.highlight && (
                            <div className="bg-yellow-100 rounded-lg p-3 border border-yellow-300 text-center">
                                <p className="text-xl font-bold text-gray-900">{current.highlight}</p>
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
                                        <p className="font-bold text-sm mb-1">
                                            {isCorrect ? '✓ Correct!' : '✗ Not quite'}
                                        </p>
                                        {current.feedback && <p className="text-sm text-gray-700">{current.feedback}</p>}
                                        {current.correctAnswer && (
                                            <p className="text-sm text-gray-700 mt-2">
                                                <span className="font-semibold">Answer: </span>
                                                {current.correctAnswer}
                                            </p>
                                        )}
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
                    <p className="text-gray-600">You've finished the Punjabi Greetings lesson</p>
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
                        onClick={() => router.push("/lessons/lesson3/1")}
                        className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-blue-700 transition-all text-sm"
                    >
                        <span>Next lesson</span>
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
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50 px-4 sm:px-6 lg:px-8 pt-24 pb-12">
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
                        <User size={18} />
                        <span className="text-xs font-semibold uppercase tracking-wide">Lesson 2: Greetings</span>
                    </div>
                    <h1 className="text-3xl font-bold mb-2">
                        Learn Punjabi Greetings
                    </h1>
                    <p className="text-base text-blue-100">
                        Master essential greetings for different situations
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
                <div className="flex gap-3 mb-6">
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

                {/* Tip */}
                <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-4 border border-orange-200">
                    <div className="flex items-start gap-3">
                        <Lightbulb size={20} className="text-orange-600 flex-shrink-0 mt-0.5" />
                        <div>
                            <h3 className="font-bold text-gray-900 mb-1 text-sm">Pro Tip</h3>
                            <p className="text-sm text-gray-700">
                                Practice each greeting out loud multiple times. The more you repeat, the more natural it will feel in real conversations!
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}