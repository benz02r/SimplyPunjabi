"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight, User, CheckCircle, X, RotateCcw, Trophy, Award, Volume2 } from "lucide-react";
import Image from "next/image";
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null;

const lessonContent = [
    {
        type: "intro",
        title: "A Bit About Me",
        content: "In this lesson, you'll learn how to introduce yourself in Punjabi. We'll cover the essentials:",
        points: [
            "Saying your name",
            "Telling your age",
            "Saying where you're from and where you live",
            "Talking about work or studies",
            "Describing your family"
        ]
    },
    {
        type: "section",
        title: "What's Your Name?",
        avatar: "/avatars/avatar5.png",
        avatarName: "Priya",
        avatarColor: "pink",
        content: "Let's start with the most basic introduction - telling someone your name.",
        examples: [
            {
                punjabi: "ਮੇਰਾ ਨਾਮ ਪ੍ਰੀਆ ਹੈ।",
                romanized: "Mera naam Priya hai.",
                english: "My name is Priya.",
                audioFile: "mera-naam-priya-hai.mp3"
            },
            {
                punjabi: "ਮੇਰਾ ਨਾਮ ਅਮਨ ਹੈ।",
                romanized: "Mera naam Aman hai.",
                english: "My name is Aman.",
                audioFile: "mera-naam-aman-hai.mp3"
            }
        ],
        note: "Simply replace 'Priya' or 'Aman' with your own name to introduce yourself!"
    },
    {
        type: "section",
        title: "How Old Are You?",
        avatar: "/avatars/avatar6.png",
        avatarName: "Aman",
        avatarColor: "blue",
        content: "After your name, someone might ask: ਤੁਹਾਡੀ ਉਮਰ ਕਿੰਨੀ ਹੈ? (Tuhāḍī umar kinnī hai?) - How old are you?",
        examples: [
            {
                punjabi: "ਮੈਂ 25 ਸਾਲਾਂ ਦਾ ਹਾਂ।",
                romanized: "Maiṁ 25 salān dā hān.",
                english: "I am 25 years old. (male)",
                audioFile: "main-25-saalan-da-haan.mp3"
            },
            {
                punjabi: "ਮੈਂ 23 ਸਾਲਾਂ ਦੀ ਹਾਂ।",
                romanized: "Maiṁ 23 salān dī hān.",
                english: "I am 23 years old. (female)",
                audioFile: "main-23-saalan-di-haan.mp3"
            }
        ],
        tip: {
            title: "Important Gender Difference",
            content: "Use 'ਦਾ' (dā) if you're male and 'ਦੀ' (dī) if you're female.",
            reference: "Check out the 'Numbers Chart' in Learning Resources to learn Punjabi numbers!"
        }
    },
    {
        type: "quiz",
        question: "How do you say 'My name is Priya' in Punjabi?",
        options: [
            { text: "Mera nām Priya hai.", correct: true },
            { text: "Main Priya haan.", correct: false },
            { text: "Tera nām Priya hai.", correct: false }
        ]
    },
    {
        type: "quiz",
        question: "Which sentence correctly means 'I am 25 years old' for a boy?",
        options: [
            { text: "Maiṁ 25 salān dī hān", correct: false },
            { text: "Maiṁ 25 salān dā hān", correct: true },
            { text: "Maiṁ 25 nām dā hān", correct: false }
        ]
    },
    {
        type: "section",
        title: "Where Are You From?",
        avatar: "/avatars/avatar5.png",
        avatarName: "Priya",
        avatarColor: "pink",
        content: "Now let's learn how to say where you're from and where you currently live.",
        examples: [
            {
                punjabi: "ਮੈਂ London ਤੋਂ ਆਇਆ ਹਾਂ।",
                romanized: "Maiṁ London ton āiā hān.",
                english: "I am from London. (male)",
                audioFile: "main-london-ton-aaya-haan.mp3"
            },
            {
                punjabi: "ਮੈਂ London ਤੋਂ ਆਈ ਹਾਂ।",
                romanized: "Maiṁ London ton āī hān.",
                english: "I am from London. (female)",
                audioFile: "main-london-ton-aayi-haan.mp3"
            }
        ],
        note: "Notice the gender difference: 'ਆਇਆ' (āiā) for males and 'ਆਈ' (āī) for females."
    },
    {
        type: "section",
        title: "Where Do You Live?",
        avatar: "/avatars/avatar6.png",
        avatarName: "Aman",
        avatarColor: "blue",
        content: "Someone might also ask where you currently live.",
        examples: [
            {
                punjabi: "ਮੈਂ Southall ਵਿੱਚ ਰਹਿੰਦਾ ਹਾਂ।",
                romanized: "Maiṁ Southall vich rahindā hān.",
                english: "I live in Southall. (male)",
                audioFile: "main-southall-vich-rahinda-haan.mp3"
            },
            {
                punjabi: "ਮੈਂ Birmingham ਵਿੱਚ ਰਹਿੰਦੀ ਹਾਂ।",
                romanized: "Maiṁ Birmingham vich rahindī hān.",
                english: "I live in Birmingham. (female)",
                audioFile: "main-birmingham-vich-rahindi-haan.mp3"
            }
        ],
        tip: {
            title: "Pattern Recognition",
            content: "Notice how 'ਰਹਿੰਦਾ' (rahindā) changes to 'ਰਹਿੰਦੀ' (rahindī) for females."
        }
    },
    {
        type: "quiz",
        question: "How do you say 'I am from London' as a girl?",
        options: [
            { text: "Maiṁ London ton āī hān", correct: true },
            { text: "Maiṁ London ton āiā hān", correct: false },
            { text: "Maiṁ London vich rahindī hān", correct: false }
        ]
    },
    {
        type: "quiz",
        question: "Which phrase means 'I live in Birmingham' for a girl?",
        options: [
            { text: "Maiṁ Birmingham vich rahindā hān", correct: false },
            { text: "Maiṁ Birmingham vich rahindī hān", correct: true },
            { text: "Maiṁ Birmingham ton āī hān", correct: false }
        ]
    },
    {
        type: "section",
        title: "What Do You Do?",
        avatar: "/avatars/avatar5.png",
        avatarName: "Priya",
        avatarColor: "pink",
        content: "Let's learn how to talk about your work or studies.",
        examples: [
            {
                punjabi: "ਮੈਂ Heathrow Airport ਲਈ ਕੰਮ ਕਰਦਾ ਹਾਂ।",
                romanized: "Maiṁ Heathrow Airport laī kam kardā hān.",
                english: "I work at Heathrow Airport. (male)",
                audioFile: "main-heathrow-lai-kam-karda-haan.mp3"
            },
            {
                punjabi: "ਮੈਂ Heathrow Airport ਲਈ ਕੰਮ ਕਰਦੀ ਹਾਂ।",
                romanized: "Maiṁ Heathrow Airport laī kam kardī hān.",
                english: "I work at Heathrow Airport. (female)",
                audioFile: "main-heathrow-lai-kam-kardi-haan.mp3"
            },
            {
                punjabi: "ਮੈਂ university ਪੜ੍ਹਦਾ ਹਾਂ।",
                romanized: "Maiṁ university paṛhdā hān.",
                english: "I study at university. (male)",
                audioFile: "main-university-parhda-haan.mp3"
            },
            {
                punjabi: "ਮੈਂ university ਪੜ੍ਹਦੀ ਹਾਂ।",
                romanized: "Maiṁ university paṛhdī hān.",
                english: "I study at university. (female)",
                audioFile: "main-university-parhdi-haan.mp3"
            }
        ],
        tip: {
            title: "Key Verbs",
            content: "ਕੰਮ ਕਰਨਾ (kam karnā) = to work | ਪੜ੍ਹਨਾ (paṛhnā) = to study"
        }
    },
    {
        type: "quiz",
        question: "What does 'Maiṁ Heathrow Airport laī kam kardā hān' mean?",
        options: [
            { text: "I live at Heathrow Airport.", correct: false },
            { text: "I study at Heathrow Airport.", correct: false },
            { text: "I work at Heathrow Airport.", correct: true }
        ]
    },
    {
        type: "quiz",
        question: "What is the difference between 'paṛhdā' and 'paṛhdī'?",
        options: [
            { text: "They mean different things.", correct: false },
            { text: "One is for boys, one is for girls.", correct: true },
            { text: "They are different tenses.", correct: false }
        ]
    },
    {
        type: "section",
        title: "Your Family",
        avatar: "/avatars/avatar6.png",
        avatarName: "Aman",
        avatarColor: "blue",
        content: "Finally, let's learn how to talk about your siblings.",
        examples: [
            {
                punjabi: "ਮੇਰੇ 2 ਵੱਡੇ ਭਰਾ ਅਤੇ 1 ਛੋਟੀ ਭੈਣ ਹਨ।",
                romanized: "Mere 2 vaḍḍe bhrā atē 1 chhoṭī bhaiṇ han.",
                english: "I have 2 older brothers and 1 younger sister."
            },
            {
                punjabi: "ਮੇਰਾ 1 ਛੋਟਾ ਭਰਾ ਹੈ।",
                romanized: "Merā 1 chhoṭā bhrā hai.",
                english: "I have 1 younger brother."
            }
        ],
        vocabulary: [
            { punjabi: "ਭਰਾ", romanized: "bhrā", english: "Brother" },
            { punjabi: "ਭੈਣ", romanized: "bhaiṇ", english: "Sister" },
            { punjabi: "ਵੱਡਾ/ਵੱਡੀ", romanized: "vaḍḍā/vaḍḍī", english: "Older/Bigger" },
            { punjabi: "ਛੋਟਾ/ਛੋਟੀ", romanized: "chhoṭā/chhoṭī", english: "Younger/Little" },
            { punjabi: "ਮੇਰੇ", romanized: "mere", english: "My (plural)" }
        ]
    },
    {
        type: "quiz",
        question: "How would you say: 'I have 2 older brothers and 1 younger sister'?",
        options: [
            { text: "Mere 2 vaḍḍe bhrā atē 1 chhoṭī bhaiṇ han", correct: true },
            { text: "Mere 2 chhoṭe bhrā atē 1 vaḍḍī bhaiṇ han", correct: false },
            { text: "Mere 2 bhrā 1 bhaiṇ han", correct: false }
        ]
    },
    {
        type: "quiz",
        question: "What does 'vaḍḍā' mean?",
        options: [
            { text: "Younger", correct: false },
            { text: "Older/Bigger", correct: true },
            { text: "Brother", correct: false }
        ]
    }
];

export default function Lesson3AboutMe() {
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

    // Audio playback function
    const playAudio = (audioFile) => {
        if (audioFile) {
            const audio = new Audio(`/audio/${audioFile}`);
            audio.play().catch(error => console.error('Error playing audio:', error));
        }
    };

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
                    lesson_id: 'lesson-3-about-me',
                    lesson_name: 'A Bit About Me',
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
                    {/* Avatar Header */}
                    {current.avatar && (
                        <div className="flex flex-col items-center mb-6">
                            <div className="relative w-20 h-20">
                                <Image
                                    src={current.avatar}
                                    alt={current.avatarName}
                                    fill
                                    className={`rounded-full object-cover border-2 border-${current.avatarColor}-500`}
                                />
                            </div>
                            <h3 className={`text-xl font-bold text-${current.avatarColor}-600 mt-2`}>
                                {current.avatarName} {current.avatarName === "Priya" ? "asks:" : "says:"}
                            </h3>
                        </div>
                    )}

                    <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">{current.title}</h2>
                    <p className="text-gray-700 leading-relaxed mb-6">{current.content}</p>

                    {/* Examples */}
                    {current.examples && (
                        <div className="space-y-4 mb-6">
                            {current.examples.map((example, idx) => (
                                <div key={idx} className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                                    <div className="flex items-start justify-between gap-3">
                                        <div className="flex-1">
                                            <p className="text-lg font-semibold text-gray-800 mb-1">{example.punjabi}</p>
                                            <p className="text-sm italic text-gray-600 mb-1">{example.romanized}</p>
                                            <p className="text-sm text-gray-500">{example.english}</p>
                                        </div>
                                        {example.audioFile && (
                                            <button
                                                onClick={() => playAudio(example.audioFile)}
                                                className="p-2 bg-blue-500 hover:bg-blue-600 rounded-full transition-all flex-shrink-0"
                                                title="Play audio"
                                            >
                                                <Volume2 size={18} className="text-white" />
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Vocabulary Table */}
                    {current.vocabulary && (
                        <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-300 mb-6">
                            <p className="font-bold text-gray-800 mb-3">Vocabulary Breakdown:</p>
                            <div className="space-y-2">
                                {current.vocabulary.map((item, idx) => (
                                    <div key={idx} className="flex items-start gap-2">
                                        <span className="font-semibold text-gray-800">{item.punjabi}</span>
                                        <span className="text-gray-600">({item.romanized})</span>
                                        <span className="text-gray-500">- {item.english}</span>
                                    </div>
                                ))}
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
                        You've completed <strong>A Bit About Me</strong>
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
                        onClick={() => router.push("/lessons/lesson4/1")}
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
                        <User size={18} />
                        <span className="text-xs font-semibold uppercase tracking-wide">Lesson 3: Self Introduction</span>
                    </div>
                    <h1 className="text-3xl font-bold mb-2">
                        A Bit About Me
                    </h1>
                    <p className="text-base text-blue-100">
                        Learn how to introduce yourself in Punjabi
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