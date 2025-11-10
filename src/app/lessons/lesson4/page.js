"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight, Users, CheckCircle, X, RotateCcw, Trophy, Award } from "lucide-react";
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null;

const lessonContent = [
    {
        type: "intro",
        title: "Family and Friends",
        content: "In this lesson, we will walk you through the Punjabi words for family members and friends so that you are never left stuck when it comes to describing your relations to people. We will begin with the basics here and you will slowly build on them in lessons to come.",
        points: [
            "Learn words for immediate family (mother, father, siblings)",
            "Understand the difference between maternal and paternal relatives",
            "Master specific terms for aunts, uncles, and grandparents",
            "Practice using respectful forms (Ji)"
        ]
    },
    {
        type: "section",
        title: "Mother",
        content: "Where better to start than the person who gave birth to you and brought you into this world. The ways we can say Mother/Mum in Punjabi are as follows:",
        examples: [
            {
                punjabi: "ਮਾਤਾ ਜੀ",
                romanized: "Mata Ji",
                english: "Mother (respectful)"
            },
            {
                punjabi: "ਮਾ",
                romanized: "Ma",
                english: "Mum"
            },
            {
                punjabi: "ਬੇਬੇ",
                romanized: "Bebe",
                english: "Mother (also used for grandmother, typically father's mum)"
            }
        ],
        note: "Ma (ਮਾ) is more commonly used in everyday conversations. We add 'Ji' at the end to convey respect."
    },
    {
        type: "section",
        title: "Father",
        content: "To say Father/Dad in Punjabi, we have several options:",
        examples: [
            {
                punjabi: "ਪਿਤਾ ਜੀ",
                romanized: "Pita Ji",
                english: "Father (respectful)"
            },
            {
                punjabi: "ਬਾਪੂ",
                romanized: "Bapu",
                english: "Dad"
            },
            {
                punjabi: "ਪਾਪਾ",
                romanized: "Papa",
                english: "Dad"
            }
        ],
        tip: {
            title: "Why do we add 'Ji'?",
            content: "Adding 'Ji' at the end of a word in Punjabi conveys respect and honor."
        }
    },
    {
        type: "quiz",
        question: "Why do we add 'Ji' at the end of a word in Punjabi?",
        options: [
            { text: "To convey respect", correct: true },
            { text: "To ask a question", correct: false },
            { text: "To make a joke", correct: false }
        ]
    },
    {
        type: "section",
        title: "Siblings",
        content: "Don't worry about how you can put these words into sentences as we will be building on this in future lessons. For now, let's learn the basic terms for brother and sister.",
        examples: [
            {
                punjabi: "ਭਰਾ",
                romanized: "Bhrā",
                english: "Brother (official term, used in most conversations)"
            },
            {
                punjabi: "ਵੀਰ ਜੀ",
                romanized: "Veer Ji",
                english: "Older brother (respectful)"
            },
            {
                punjabi: "ਭੈਣ",
                romanized: "Bhain",
                english: "Sister"
            },
            {
                punjabi: "ਦੀਦੀ",
                romanized: "Didi",
                english: "Older sister (affectionate)"
            },
            {
                punjabi: "ਭੈਣ ਜੀ",
                romanized: "Bhain Ji",
                english: "Sister (respectful)"
            }
        ],
        note: "Use Veer Ji when addressing your OLDER brother specifically. Didi and Bhain Ji are extra respectful ways to address your older sister."
    },
    {
        type: "section",
        title: "Understanding Family Sides",
        content: "Unlike English, Punjabi has a specific word for each individual family member depending on whether they are on your Dad's side or Mum's side. This is one of the unique features of Punjabi that makes it so precise when talking about family relationships!",
        highlight: "Get ready to learn the specific terms for maternal (mother's side) and paternal (father's side) relatives."
    },
    {
        type: "section",
        title: "Mother's Side - Grandparents",
        content: "How do we refer to your grandparents on your Mum's side? In other words, your Mum's parents:",
        examples: [
            {
                punjabi: "ਨਾਨੀ",
                romanized: "Nānī",
                english: "Mother's mother (maternal grandmother)"
            },
            {
                punjabi: "ਨਾਨਾ",
                romanized: "Nānā",
                english: "Mother's father (maternal grandfather)"
            }
        ]
    },
    {
        type: "section",
        title: "Mother's Side - Aunts and Uncles",
        content: "Rather than referring to your Mum's siblings as Auntie and Uncle, Punjabi takes a step further by giving them all specific names:",
        examples: [
            {
                punjabi: "ਮਾਮਾ",
                romanized: "Mama",
                english: "Your mum's brother (older or younger)"
            },
            {
                punjabi: "ਮਾਮੀ",
                romanized: "Mami",
                english: "Your Mama's wife"
            },
            {
                punjabi: "ਮਾਸੀ",
                romanized: "Masi",
                english: "Your mum's sister (older or younger)"
            },
            {
                punjabi: "ਮਾਸੜ",
                romanized: "Masaṛ",
                english: "Your Masi's husband"
            }
        ],
        tip: {
            title: "Remember",
            content: "All of these terms are specifically for your MOTHER'S side of the family."
        }
    },
    {
        type: "quiz",
        question: "What do we call our mum's mother?",
        options: [
            { text: "Dadi", correct: false },
            { text: "Nani", correct: true },
            { text: "Nana", correct: false }
        ]
    },
    {
        type: "quiz",
        question: "What is a Mama?",
        options: [
            { text: "Your mum's older brother's wife", correct: false },
            { text: "Your mum's younger brother", correct: false },
            { text: "Your mum's brother", correct: true }
        ]
    },
    {
        type: "quiz",
        question: "What do we call your mum's sister?",
        options: [
            { text: "Mami", correct: false },
            { text: "Masi", correct: true },
            { text: "Nani", correct: false }
        ]
    },
    {
        type: "section",
        title: "Father's Side - Grandparents",
        content: "As we learned earlier, Punjabi has different names for different family members depending on whether they're on your Mum or Dad's side. For your Dad's parents, we can use any of the following:",
        examples: [
            {
                punjabi: "ਦਾਦੀ",
                romanized: "Dādī",
                english: "Father's mother (paternal grandmother)"
            },
            {
                punjabi: "ਦਾਦਾ",
                romanized: "Dādā",
                english: "Father's father (paternal grandfather)"
            }
        ],
        note: "You may also hear people refer to their Dad's parents as Baba (ਬਾਬਾ) and Bibi (ਬੀਬੀ). This is usually up to their own discretion and whatever terms they have been told to use whilst growing up!"
    },
    {
        type: "quiz",
        question: "What do we call our Dad's Mum?",
        options: [
            { text: "Dadi", correct: true },
            { text: "Nani", correct: false },
            { text: "Nana", correct: false }
        ]
    },
    {
        type: "section",
        title: "Father's Side - Uncles",
        content: "Unlike your Mum's side of the family, your Dad's side of the family has a few more terms to distinguish between your Dad's older siblings and younger siblings:",
        examples: [
            {
                punjabi: "ਤਾਇਆ",
                romanized: "Tāyā",
                english: "Your Dad's older brother"
            },
            {
                punjabi: "ਤਾਈ ਜੀ",
                romanized: "Taī jī",
                english: "Your Dad's older brother's wife"
            },
            {
                punjabi: "ਚਾਚਾ",
                romanized: "Chacha",
                english: "Your Dad's younger brother"
            },
            {
                punjabi: "ਚਾਚੀ",
                romanized: "Chachi",
                english: "Your Dad's younger brother's wife"
            }
        ],
        tip: {
            title: "Age Matters",
            content: "Notice how we distinguish between older (Taya) and younger (Chacha) uncles on your father's side, but not on your mother's side (all are Mama)."
        }
    },
    {
        type: "section",
        title: "Father's Side - Aunt",
        content: "And don't forget your Dad's sister!",
        examples: [
            {
                punjabi: "ਭੂਆ",
                romanized: "Bhūā",
                english: "Your Dad's sister (paternal aunt)"
            },
            {
                punjabi: "ਫੁਫੜ",
                romanized: "Phuphṛ",
                english: "Your Bhua's husband"
            }
        ]
    },
    {
        type: "quiz",
        question: "What is the difference between Taya and Chacha?",
        options: [
            { text: "Taya is older, Chacha is younger", correct: true },
            { text: "Taya is on mum's side, Chacha is on dad's side", correct: false },
            { text: "There is no difference", correct: false }
        ]
    },
    {
        type: "section",
        title: "Family Tree Summary",
        content: "Now we've covered both your Mum & Dad's side of the family! Here's a quick visual summary to help you remember:",
        vocabulary: [
            { punjabi: "ਨਾਨੀ (Nānī)", english: "Mum's mum", side: "Maternal" },
            { punjabi: "ਨਾਨਾ (Nānā)", english: "Mum's dad", side: "Maternal" },
            { punjabi: "ਮਾਮਾ (Mama)", english: "Mum's brother", side: "Maternal" },
            { punjabi: "ਮਾਸੀ (Masi)", english: "Mum's sister", side: "Maternal" },
            { punjabi: "ਦਾਦੀ (Dādī)", english: "Dad's mum", side: "Paternal" },
            { punjabi: "ਦਾਦਾ (Dādā)", english: "Dad's dad", side: "Paternal" },
            { punjabi: "ਤਾਇਆ (Tāyā)", english: "Dad's older brother", side: "Paternal" },
            { punjabi: "ਚਾਚਾ (Chacha)", english: "Dad's younger brother", side: "Paternal" },
            { punjabi: "ਭੂਆ (Bhūā)", english: "Dad's sister", side: "Paternal" }
        ],
        tip: {
            title: "Pro Tip",
            content: "The key to mastering Punjabi family terms is remembering that maternal and paternal sides have completely different words. Practice by labeling your own family tree!"
        }
    },
    {
        type: "quiz",
        question: "Which of these is your Dad's sister?",
        options: [
            { text: "Masi", correct: false },
            { text: "Bhua", correct: true },
            { text: "Chachi", correct: false }
        ]
    },
    {
        type: "quiz",
        question: "Who is your Mama's wife?",
        options: [
            { text: "Mami", correct: true },
            { text: "Masi", correct: false },
            { text: "Chachi", correct: false }
        ]
    }
];

export default function Lesson4FamilyAndFriends() {
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
                    lesson_id: 'lesson-4-family-and-friends',
                    lesson_name: 'Family and Friends',
                    completed: true,
                    score: score,
                    completed_at: new Date().toISOString()
                });

            if (error) throw error;
        } catch (error) {
            console.error('Error saving progress:', error);
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
        await saveProgress();
        setLessonCompleted(true);
    };

    const renderContent = () => {
        if (current.type === "intro") {
            return (
                <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">{current.title}</h2>
                    <p className="text-gray-700 leading-relaxed mb-6">{current.content}</p>
                    <ul className="space-y-3">
                        {current.points.map((point, idx) => (
                            <li key={idx} className="flex items-start gap-3">
                                <CheckCircle size={20} className="text-blue-600 mt-0.5 flex-shrink-0" />
                                <span className="text-gray-700">{point}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            );
        }

        if (current.type === "section") {
            return (
                <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">{current.title}</h2>
                    <p className="text-gray-700 leading-relaxed mb-6">{current.content}</p>

                    {/* Highlight Box */}
                    {current.highlight && (
                        <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg border-l-4 border-blue-500 mb-6">
                            <p className="text-gray-800 font-semibold">{current.highlight}</p>
                        </div>
                    )}

                    {/* Examples */}
                    {current.examples && (
                        <div className="space-y-4 mb-6">
                            {current.examples.map((example, idx) => (
                                <div key={idx} className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                                    <p className="text-lg font-semibold text-gray-800 mb-1">{example.punjabi}</p>
                                    <p className="text-sm italic text-gray-600 mb-1">{example.romanized}</p>
                                    <p className="text-sm text-gray-500">{example.english}</p>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Vocabulary Table with Sides */}
                    {current.vocabulary && (
                        <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-300 mb-6">
                            <p className="font-bold text-gray-800 mb-3">Family Tree Summary:</p>
                            <div className="space-y-3">
                                <div>
                                    <p className="text-sm font-semibold text-purple-700 mb-2">Maternal Side (Mother's Family):</p>
                                    <div className="space-y-1 ml-4">
                                        {current.vocabulary.filter(v => v.side === "Maternal").map((item, idx) => (
                                            <div key={idx} className="text-sm">
                                                <span className="font-semibold text-gray-800">{item.punjabi}</span>
                                                <span className="text-gray-600"> - {item.english}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-blue-700 mb-2">Paternal Side (Father's Family):</p>
                                    <div className="space-y-1 ml-4">
                                        {current.vocabulary.filter(v => v.side === "Paternal").map((item, idx) => (
                                            <div key={idx} className="text-sm">
                                                <span className="font-semibold text-gray-800">{item.punjabi}</span>
                                                <span className="text-gray-600"> - {item.english}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Tip Box */}
                    {current.tip && (
                        <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-300">
                            <p className="font-bold text-gray-800 mb-2">{current.tip.title}:</p>
                            <p className="text-gray-700">{current.tip.content}</p>
                            {current.tip.reference && (
                                <p className="text-blue-700 font-semibold mt-2">💡 {current.tip.reference}</p>
                            )}
                        </div>
                    )}

                    {/* Note */}
                    {current.note && (
                        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 mt-4">
                            <p className="text-sm text-gray-700 italic">{current.note}</p>
                        </div>
                    )}
                </div>
            );
        }

        if (current.type === "quiz") {
            const userAnswer = quizAnswers[step];
            const showResult = showFeedback[step];
            const isCorrect = userAnswer !== undefined && current.options[userAnswer]?.correct;

            return (
                <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="bg-blue-100 p-3 rounded-full">
                            <Trophy size={24} className="text-blue-600" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-800">Quick Check</h2>
                    </div>

                    <p className="text-lg text-gray-700 mb-6">{current.question}</p>

                    <div className="space-y-3">
                        {current.options.map((option, idx) => {
                            const isSelected = userAnswer === idx;
                            const showCorrect = showResult && option.correct;
                            const showIncorrect = showResult && isSelected && !option.correct;

                            return (
                                <button
                                    key={idx}
                                    onClick={() => !showResult && handleQuizAnswer(idx)}
                                    disabled={showResult}
                                    className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
                                        showCorrect
                                            ? 'bg-green-50 border-green-500'
                                            : showIncorrect
                                                ? 'bg-red-50 border-red-500'
                                                : isSelected
                                                    ? 'bg-blue-50 border-blue-500'
                                                    : 'bg-white border-gray-300 hover:border-blue-400'
                                    } ${showResult ? 'cursor-default' : 'cursor-pointer'}`}
                                >
                                    <div className="flex items-center justify-between">
                                        <span className="text-gray-800">{option.text}</span>
                                        {showCorrect && <CheckCircle size={20} className="text-green-600" />}
                                        {showIncorrect && <X size={20} className="text-red-600" />}
                                    </div>
                                </button>
                            );
                        })}
                    </div>

                    {showResult && (
                        <div className={`mt-6 p-4 rounded-lg ${isCorrect ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
                            <p className={`font-semibold ${isCorrect ? 'text-green-800' : 'text-red-800'}`}>
                                {isCorrect ? '✅ Correct!' : '❌ Incorrect'}
                            </p>
                            {!isCorrect && (
                                <p className="text-sm text-gray-700 mt-2">
                                    The correct answer is: <strong>{current.options.find(o => o.correct)?.text}</strong>
                                </p>
                            )}
                        </div>
                    )}
                </div>
            );
        }
    };

    const CompletionSummary = () => {
        return (
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
                {/* Success Header */}
                <div className="text-center mb-8">
                    <div className="inline-block bg-gradient-to-br from-green-400 to-green-600 p-4 rounded-full mb-4">
                        <Award size={48} className="text-white" />
                    </div>
                    <h2 className="text-3xl font-bold text-gray-800 mb-2">Lesson Complete! 🎉</h2>
                    <p className="text-lg text-gray-600">
                        You've completed <strong>Family and Friends</strong>
                    </p>
                </div>

                {/* Score Display */}
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 mb-6">
                    <div className="text-center">
                        <p className="text-sm text-gray-600 mb-2">Your Quiz Score</p>
                        <div className="text-5xl font-bold text-blue-600 mb-2">{score}%</div>
                        <p className="text-gray-700">
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
                        onClick={() => router.push("/lessons/lesson5/1")}
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
                <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-6 text-white shadow-lg mb-6">
                    <div className="flex items-center gap-2 mb-2">
                        <Users size={18} />
                        <span className="text-xs font-semibold uppercase tracking-wide">Lesson 4: Relationships</span>
                    </div>
                    <h1 className="text-3xl font-bold mb-2">
                        Family and Friends
                    </h1>
                    <p className="text-base text-purple-100">
                        Master the Punjabi words for family members
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
                            className="bg-gradient-to-r from-purple-500 to-pink-500 h-full transition-all duration-500"
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
                                    ? 'bg-purple-600 w-6'
                                    : idx < step
                                        ? 'bg-purple-400'
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
                                    : 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600'
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