"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
    ArrowLeft,
    ArrowRight,
    Book,
    CheckCircle,
    X,
    RotateCcw,
    Trophy,
    Sparkles,
    Clock,
    Users,
    Globe,
    FileText,
    Lightbulb
} from "lucide-react";
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null;

const lessonContent = [
    {
        type: "intro",
        title: "The Story of Panjabi",
        content: "Discover how Panjabi evolved from ancient dialects to the vibrant language we know today.",
        points: [
            "Origins and early history",
            "Key figures who shaped the language",
            "How Panjabi differs from Hindi"
        ]
    },
    {
        type: "timeline",
        title: "Panjabi's Evolution",
        subtitle: "Click each event to explore",
        events: [
            {
                id: 1,
                title: "Ancient Roots",
                period: "Early Origins",
                description: "Panjabi emerged from Northwestern Apabhramsa dialects, derived from early Sanskrit in the Panjab region.",
                icon: Globe
            },
            {
                id: 2,
                title: "Baba Farid",
                period: "12th-13th Century",
                description: "The Sufi Saint was among the first to write poetry in Panjabi, establishing it as a literary language.",
                icon: FileText
            },
            {
                id: 3,
                title: "Guru Nanak Dev Ji",
                period: "15th-16th Century",
                description: "Used Panjabi to spread spiritual teachings, transforming it into a language of devotion.",
                icon: Sparkles
            },
            {
                id: 4,
                title: "Gurmukhi Script",
                period: "16th Century",
                description: "Guru Angad Dev Ji created Gurmukhi to standardise Panjabi writing and preserve teachings accurately.",
                icon: Book
            }
        ]
    },
    {
        type: "matching",
        title: "Match the Pioneers",
        subtitle: "Connect each figure to their contribution",
        pairs: [
            { term: "Baba Farid", definition: "Early Panjabi poetry" },
            { term: "Guru Nanak Dev Ji", definition: "Spiritual teachings in Panjabi" },
            { term: "Guru Angad Dev Ji", definition: "Created Gurmukhi script" }
        ]
    },
    {
        type: "comparison",
        title: "Panjabi vs Hindi",
        subtitle: "Key differences at a glance",
        categories: [
            {
                title: "Script",
                panjabi: "Gurmukhi",
                hindi: "Devanagari",
                icon: FileText
            },
            {
                title: "Origins",
                panjabi: "Northwestern dialects",
                hindi: "Central/Eastern dialects",
                icon: Globe
            },
            {
                title: "Cultural Roots",
                panjabi: "Sikh & Punjabi heritage",
                hindi: "Broader North Indian culture",
                icon: Users
            }
        ]
    },
    {
        type: "insight",
        title: "Why Gurmukhi Mattered",
        cards: [
            {
                title: "The Challenge",
                content: "Earlier scripts like Lanada lacked vowels, making accurate reading difficult.",
                icon: Lightbulb
            },
            {
                title: "The Solution",
                content: "Gurmukhi included complete vowel notation for precise pronunciation.",
                icon: CheckCircle
            },
            {
                title: "The Legacy",
                content: "Became the standard script, preserving Panjabi accurately for centuries.",
                icon: Trophy
            }
        ]
    },
    {
        type: "final-quiz",
        title: "Test Your Knowledge",
        questions: [
            {
                question: "Who created the Gurmukhi script?",
                options: [
                    { text: "Baba Farid", correct: false },
                    { text: "Guru Angad Dev Ji", correct: true },
                    { text: "Guru Nanak Dev Ji", correct: false }
                ]
            },
            {
                question: "What makes Panjabi different from Hindi?",
                options: [
                    { text: "Different scripts and origins", correct: true },
                    { text: "They're identical languages", correct: false },
                    { text: "Only pronunciation differs", correct: false }
                ]
            },
            {
                question: "Who first used Panjabi for poetry?",
                options: [
                    { text: "Baba Farid", correct: true },
                    { text: "Guru Angad Dev Ji", correct: false },
                    { text: "Guru Nanak Dev Ji", correct: false }
                ]
            }
        ]
    }
];

export default function Lesson1WhatIsPanjabi() {
    const router = useRouter();
    const [step, setStep] = useState(0);
    const [userId, setUserId] = useState(null);
    const [lessonCompleted, setLessonCompleted] = useState(false);

    // Timeline state
    const [selectedEvent, setSelectedEvent] = useState(null);

    // Matching game state
    const [matchingAnswers, setMatchingAnswers] = useState({});
    const [matchingComplete, setMatchingComplete] = useState(false);
    const [shuffledDefinitions, setShuffledDefinitions] = useState([]);

    // Comparison state
    const [selectedCategory, setSelectedCategory] = useState(0);

    // Quiz state
    const [quizAnswers, setQuizAnswers] = useState([]);
    const [quizComplete, setQuizComplete] = useState(false);

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

    // Initialize shuffled definitions for matching game
    useEffect(() => {
        if (current?.type === 'matching' && shuffledDefinitions.length === 0) {
            const definitions = current.pairs.map(p => p.definition);
            setShuffledDefinitions([...definitions].sort(() => Math.random() - 0.5));
        }
    }, [current, shuffledDefinitions.length]);

    // Calculate quiz statistics
    const calculateScore = () => {
        let correct = 0;
        let total = 0;

        if (quizComplete) {
            lessonContent[5].questions.forEach((q, idx) => {
                total++;
                if (quizAnswers[idx] !== undefined && q.options[quizAnswers[idx]]?.correct) {
                    correct++;
                }
            });
        }

        return { correct, total, score: total > 0 ? Math.round((correct / total) * 100) : 0 };
    };

    // Save progress to Supabase
    const saveProgress = async () => {
        if (!supabase || !userId) return;

        try {
            const { correct, total, score } = calculateScore();

            const { error } = await supabase
                .from('lesson_progress')
                .upsert({
                    user_id: userId,
                    lesson_id: 'lesson-1-what-is-panjabi',
                    lesson_name: 'What is Panjabi?',
                    completed: true,
                    quiz_score: score,
                    correct_answers: correct,
                    total_questions: total,
                    last_accessed: new Date().toISOString()
                }, {
                    onConflict: 'user_id,lesson_id'
                });

            if (error) throw error;
        } catch (error) {
            console.error('Error saving progress:', error);
        }
    };

    const canProceed = () => {
        if (current.type === 'matching' && !matchingComplete) return false;
        if (current.type === 'final-quiz' && !quizComplete) return false;
        return true;
    };

    const handleNext = () => {
        if (!canProceed()) return;

        if (step < lessonContent.length - 1) {
            setStep(step + 1);
        }
    };

    const handlePrevious = () => {
        if (step > 0) {
            setStep(step - 1);
        }
    };

    const handleComplete = async () => {
        await saveProgress();
        setLessonCompleted(true);
    };

    // Matching game logic
    const handleMatchingSelect = (definition) => {
        if (Object.values(matchingAnswers).includes(definition)) return;

        const unansweredTerms = current.pairs.filter(pair => !matchingAnswers[pair.term]);
        if (unansweredTerms.length === 0) return;

        const currentTerm = unansweredTerms[0].term;
        const newAnswers = { ...matchingAnswers, [currentTerm]: definition };
        setMatchingAnswers(newAnswers);

        // Check if complete and correct
        if (Object.keys(newAnswers).length === current.pairs.length) {
            const allCorrect = current.pairs.every(pair => newAnswers[pair.term] === pair.definition);
            setMatchingComplete(allCorrect);
        }
    };

    const resetMatching = () => {
        setMatchingAnswers({});
        setMatchingComplete(false);
        setShuffledDefinitions([...current.pairs.map(p => p.definition)].sort(() => Math.random() - 0.5));
    };

    const renderContent = () => {
        if (current.type === "intro") {
            return (
                <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-orange-500 rounded-xl flex items-center justify-center">
                            <Sparkles className="text-white" size={24} />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900">{current.title}</h2>
                    </div>
                    <p className="text-base text-gray-700 mb-6">{current.content}</p>
                    <div className="space-y-3">
                        {current.points.map((point, idx) => (
                            <div key={idx} className="flex items-start gap-3 p-4 bg-gradient-to-r from-blue-50 to-orange-50 rounded-xl border border-gray-100">
                                <div className="flex-shrink-0 w-7 h-7 bg-gradient-to-r from-blue-500 to-orange-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                                    {idx + 1}
                                </div>
                                <p className="text-gray-800 font-medium pt-0.5">{point}</p>
                            </div>
                        ))}
                    </div>
                </div>
            );
        }

        if (current.type === "timeline") {
            return (
                <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                            <Clock className="text-blue-600" size={20} />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900">{current.title}</h2>
                            <p className="text-sm text-gray-600">{current.subtitle}</p>
                        </div>
                    </div>

                    <div className="space-y-3 mt-6">
                        {current.events.map((event) => {
                            const IconComponent = event.icon;
                            const isSelected = selectedEvent === event.id;

                            return (
                                <div
                                    key={event.id}
                                    onClick={() => setSelectedEvent(isSelected ? null : event.id)}
                                    className={`cursor-pointer p-5 rounded-xl border-2 transition-all ${
                                        isSelected
                                            ? 'border-blue-500 bg-blue-50 shadow-md'
                                            : 'border-gray-200 bg-gray-50 hover:border-blue-300 hover:bg-blue-50'
                                    }`}
                                >
                                    <div className="flex items-center gap-4">
                                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                                            isSelected ? 'bg-blue-500' : 'bg-gray-200'
                                        }`}>
                                            <IconComponent className={isSelected ? 'text-white' : 'text-gray-600'} size={20} />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-3 mb-1 flex-wrap">
                                                <h3 className="text-lg font-bold text-gray-900">{event.title}</h3>
                                                <span className="text-xs font-semibold text-blue-600 bg-blue-100 px-3 py-1 rounded-full whitespace-nowrap">
                                                    {event.period}
                                                </span>
                                            </div>
                                            {isSelected && (
                                                <p className="text-sm text-gray-700 mt-2 leading-relaxed">
                                                    {event.description}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            );
        }

        if (current.type === "matching") {
            return (
                <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center">
                            <Users className="text-orange-600" size={20} />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900">{current.title}</h2>
                            <p className="text-sm text-gray-600">{current.subtitle}</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 mt-6">
                        <div className="space-y-3">
                            <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wide mb-3">Figures</h3>
                            {current.pairs.map((pair, idx) => {
                                const isAnswered = matchingAnswers[pair.term] !== undefined;
                                const isCorrect = matchingAnswers[pair.term] === pair.definition;

                                return (
                                    <div
                                        key={pair.term}
                                        className={`p-4 rounded-xl font-semibold text-center transition-all ${
                                            isCorrect
                                                ? 'bg-green-100 border-2 border-green-500 text-green-800'
                                                : isAnswered
                                                    ? 'bg-red-100 border-2 border-red-500 text-red-800'
                                                    : idx === Object.keys(matchingAnswers).length
                                                        ? 'bg-blue-100 border-2 border-blue-500 text-blue-800 ring-2 ring-blue-200'
                                                        : 'bg-gray-100 border-2 border-gray-300 text-gray-600'
                                        }`}
                                    >
                                        {pair.term}
                                    </div>
                                );
                            })}
                        </div>

                        <div className="space-y-3">
                            <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wide mb-3">Contributions</h3>
                            {shuffledDefinitions.map((definition, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => handleMatchingSelect(definition)}
                                    disabled={Object.values(matchingAnswers).includes(definition)}
                                    className={`w-full p-4 rounded-xl font-medium text-center transition-all ${
                                        Object.values(matchingAnswers).includes(definition)
                                            ? 'bg-gray-200 text-gray-400 cursor-not-allowed border-2 border-gray-300'
                                            : 'bg-orange-50 border-2 border-orange-300 text-orange-800 hover:bg-orange-100 hover:border-orange-400'
                                    }`}
                                >
                                    {definition}
                                </button>
                            ))}
                        </div>
                    </div>

                    {matchingComplete && (
                        <div className="bg-green-50 border-2 border-green-500 rounded-xl p-4 text-center">
                            <CheckCircle className="inline-block text-green-600 mb-2" size={32} />
                            <p className="text-green-800 font-semibold">Perfect! All matches are correct!</p>
                        </div>
                    )}

                    {Object.keys(matchingAnswers).length === current.pairs.length && !matchingComplete && (
                        <div className="bg-red-50 border-2 border-red-500 rounded-xl p-4 text-center">
                            <X className="inline-block text-red-600 mb-2" size={32} />
                            <p className="text-red-800 font-semibold mb-3">Not quite right. Try again!</p>
                            <button
                                onClick={resetMatching}
                                className="bg-red-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-red-700 transition-colors"
                            >
                                Reset
                            </button>
                        </div>
                    )}
                </div>
            );
        }

        if (current.type === "comparison") {
            return (
                <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                            <Globe className="text-purple-600" size={20} />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900">{current.title}</h2>
                            <p className="text-sm text-gray-600">{current.subtitle}</p>
                        </div>
                    </div>

                    <div className="flex gap-2 mb-6 mt-6 flex-wrap">
                        {current.categories.map((cat, idx) => {
                            const IconComponent = cat.icon;
                            return (
                                <button
                                    key={idx}
                                    onClick={() => setSelectedCategory(idx)}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold whitespace-nowrap transition-all ${
                                        selectedCategory === idx
                                            ? 'bg-gradient-to-r from-blue-500 to-orange-500 text-white shadow-md'
                                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                                >
                                    <IconComponent size={16} />
                                    <span>{cat.title}</span>
                                </button>
                            );
                        })}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl border-2 border-blue-200">
                            <h3 className="text-lg font-bold text-blue-900 mb-3">Panjabi</h3>
                            <p className="text-blue-800 text-lg font-medium">
                                {current.categories[selectedCategory].panjabi}
                            </p>
                        </div>

                        <div className="p-6 bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl border-2 border-orange-200">
                            <h3 className="text-lg font-bold text-orange-900 mb-3">Hindi</h3>
                            <p className="text-orange-800 text-lg font-medium">
                                {current.categories[selectedCategory].hindi}
                            </p>
                        </div>
                    </div>
                </div>
            );
        }

        if (current.type === "insight") {
            return (
                <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                            <Lightbulb className="text-green-600" size={20} />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900">{current.title}</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {current.cards.map((card, idx) => {
                            const IconComponent = card.icon;
                            return (
                                <div
                                    key={idx}
                                    className="p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border-2 border-gray-200 hover:border-blue-300 transition-all"
                                >
                                    <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mb-4 shadow-sm">
                                        <IconComponent className="text-blue-600" size={24} />
                                    </div>
                                    <h3 className="text-lg font-bold text-gray-900 mb-2">{card.title}</h3>
                                    <p className="text-gray-700 leading-relaxed">{card.content}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            );
        }

        if (current.type === "final-quiz") {
            return (
                <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 bg-yellow-100 rounded-xl flex items-center justify-center">
                            <Trophy className="text-yellow-600" size={20} />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900">{current.title}</h2>
                    </div>

                    <div className="space-y-6">
                        {current.questions.map((q, qIdx) => (
                            <div key={qIdx} className="p-6 bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl border-2 border-orange-200">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="flex-shrink-0 w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                                        {qIdx + 1}
                                    </div>
                                    <p className="text-lg font-semibold text-gray-900">{q.question}</p>
                                </div>
                                <div className="space-y-2">
                                    {q.options.map((option, oIdx) => {
                                        const isSelected = quizAnswers[qIdx] === oIdx;
                                        const isCorrect = option.correct;
                                        const showResult = quizAnswers[qIdx] !== undefined;

                                        return (
                                            <button
                                                key={oIdx}
                                                onClick={() => {
                                                    if (quizAnswers[qIdx] === undefined) {
                                                        setQuizAnswers(prev => {
                                                            const newAnswers = [...prev];
                                                            newAnswers[qIdx] = oIdx;
                                                            return newAnswers;
                                                        });
                                                    }
                                                }}
                                                disabled={quizAnswers[qIdx] !== undefined}
                                                className={`w-full p-4 rounded-lg text-left font-medium transition-all flex items-center gap-3 ${
                                                    showResult && isSelected && isCorrect
                                                        ? 'bg-green-100 border-2 border-green-500 text-green-800'
                                                        : showResult && isSelected && !isCorrect
                                                            ? 'bg-red-100 border-2 border-red-500 text-red-800'
                                                            : showResult && isCorrect
                                                                ? 'bg-green-50 border-2 border-green-300 text-green-800'
                                                                : 'bg-white border-2 border-gray-300 text-gray-800 hover:border-orange-400 hover:bg-orange-50'
                                                }`}
                                            >
                                                {showResult && isCorrect && (
                                                    <CheckCircle size={20} className="flex-shrink-0" />
                                                )}
                                                {showResult && isSelected && !isCorrect && (
                                                    <X size={20} className="flex-shrink-0" />
                                                )}
                                                <span>{option.text}</span>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        ))}
                    </div>

                    {quizAnswers.length === current.questions.length && !quizComplete && (
                        <button
                            onClick={() => setQuizComplete(true)}
                            className="w-full mt-6 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-orange-600 hover:to-orange-700 transition-all shadow-md"
                        >
                            Continue
                        </button>
                    )}
                </div>
            );
        }

        return null;
    };

    const CompletionSummary = () => {
        const { correct, total, score } = calculateScore();

        return (
            <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-green-500">
                {/* Trophy Icon */}
                <div className="flex justify-center mb-6">
                    <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center shadow-lg">
                        <Trophy size={40} className="text-white" />
                    </div>
                </div>

                {/* Title */}
                <h2 className="text-3xl font-bold text-center text-gray-900 mb-2">
                    Lesson Complete!
                </h2>
                <p className="text-center text-gray-600 mb-8">
                    You've learned the story of Panjabi
                </p>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-xl text-center border-2 border-blue-200">
                        <div className="text-3xl font-bold text-blue-600 mb-1">{score}%</div>
                        <p className="text-xs text-gray-600 font-medium">Score</p>
                    </div>
                    <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-xl text-center border-2 border-green-200">
                        <div className="text-3xl font-bold text-green-600 mb-1">{correct}</div>
                        <p className="text-xs text-gray-600 font-medium">Correct</p>
                    </div>
                    <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-4 rounded-xl text-center border-2 border-orange-200">
                        <div className="text-3xl font-bold text-orange-600 mb-1">{total - correct}</div>
                        <p className="text-xs text-gray-600 font-medium">Incorrect</p>
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
                        className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-blue-700 transition-all text-sm shadow-md"
                    >
                        <span>Continue to Next Lesson</span>
                        <ArrowRight size={18} />
                    </button>
                    <button
                        onClick={() => {
                            setStep(0);
                            setSelectedEvent(null);
                            setMatchingAnswers({});
                            setMatchingComplete(false);
                            setShuffledDefinitions([]);
                            setSelectedCategory(0);
                            setQuizAnswers([]);
                            setQuizComplete(false);
                            setLessonCompleted(false);
                        }}
                        className="w-full flex items-center justify-center gap-2 bg-gray-100 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors text-sm"
                    >
                        <RotateCcw size={18} />
                        <span>Review Lesson</span>
                    </button>
                    <button
                        onClick={() => router.push("/learning/essential-punjabi")}
                        className="w-full flex items-center justify-center gap-2 bg-white text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors text-sm border-2 border-gray-300"
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
                        <span className="text-xs font-semibold text-gray-700">Progress</span>
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
                            disabled={!canProceed()}
                            className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all text-sm ${
                                !canProceed()
                                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                    : 'bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 shadow-md'
                            }`}
                        >
                            <span>Next</span>
                            <ArrowRight size={18} />
                        </button>
                    ) : (
                        <button
                            onClick={handleComplete}
                            disabled={!quizComplete}
                            className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all text-sm ${
                                !quizComplete
                                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                    : 'bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700 shadow-md'
                            }`}
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