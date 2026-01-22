"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
    ArrowLeft,
    Volume2,
    Heart,
    Trophy,
    CheckCircle,
    XCircle,
    Star,
    Lightbulb,
    Hand,
    MessageCircle,
    Users,
    BookOpen,
    Sparkles
} from "lucide-react";
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null;

// Lesson flow: Teach → Practice → Test (focusing on listening and Roman script)
const lessonFlow = [
    // 1. TEACH: Introduce Sat Sri Akaal
    {
        id: 1,
        type: "teach",
        icon: Hand,
        title: "Let's learn your first Panjabi greeting!",
        content: {
            gurmukhi: "ਸਤ ਸ੍ਰੀ ਅਕਾਲ ਜੀ",
            roman: "Sat Sri Akaal Ji",
            english: "Hello / Goodbye",
            meaning: "Literally means 'God is Truth'",
            usage: "Use this to greet anyone - it works for both hello AND goodbye!",
            tip: "Add 'Ji' at the end (Sat Sri Akaal Ji) to show respect to elders"
        },
        audioFile: "/audio/sat-sri-akaal-ji.mp3"
    },

    // 2. PRACTICE: Listen and recognize the ROMAN text
    {
        id: 2,
        type: "listen-tap",
        instruction: "Tap what you hear",
        audio: "/audio/sat-sri-akaal-ji.mp3",
        correctAnswer: "Sat Sri Akaal",
        options: ["Sat Sri Akaal", "Tusi kiven ho", "Main theek haan", "Kiddan"],
        teachingMoment: "Remember: Sat Sri Akaal works for both hello and goodbye!"
    },

    // 3. PRACTICE: Translation
    {
        id: 3,
        type: "translate-to-english",
        instruction: "What does 'Sat Sri Akaal' mean?",
        punjabi: "Sat Sri Akaal",
        gurmukhi: "ਸਤ ਸ੍ਰੀ ਅਕਾਲ",
        options: [
            { text: "Hello / Goodbye", correct: true },
            { text: "How are you?", correct: false },
            { text: "Thank you", correct: false }
        ],
        teachingMoment: "Sat Sri Akaal literally means 'God is Truth' - but we use it as a greeting!"
    },

    // 4. TEACH: Building on greetings
    {
        id: 4,
        type: "teach",
        icon: MessageCircle,
        title: "Now let's ask how someone is doing",
        content: {
            gurmukhi: "ਤੁਸੀਂ ਕਿਵੇਂ ਹੋ?",
            roman: "Tusi kiven ho?",
            english: "How are you?",
            usage: "After greeting someone, this is a natural follow-up question",
            tip: "'Tusi' is the respectful/formal way to say 'you' - use it with elders!"
        },
        audioFile: "/audio/tusi-kiven-ho.mp3"
    },

    // 5. PRACTICE: Match pairs (Roman to English only)
    {
        id: 5,
        type: "match-pairs",
        instruction: "Match the Panjabi with English",
        pairs: [
            { punjabi: "Sat Sri Akaal", english: "Hello/Goodbye" },
            { punjabi: "Tusi kiven ho?", english: "How are you?" }
        ],
        teachingMoment: "Great! You're building a conversation: greeting + asking how they are"
    },

    // 6. TEACH: Responding to greetings
    {
        id: 6,
        type: "teach",
        icon: Heart,
        title: "How to respond when someone asks how you are",
        content: {
            gurmukhi: "ਮੈਂ ਠੀਕ ਹਾਂ",
            roman: "Main theek haan",
            english: "I am fine",
            usage: "This is your response when someone asks 'Tusi kiven ho?'",
            tip: "'Main' means 'I' and 'theek' means 'fine' or 'okay'"
        },
        audioFile: "/audio/main-theek-haan.mp3"
    },

    // 7. PRACTICE: Build a sentence (Roman script)
    {
        id: 7,
        type: "word-bank",
        instruction: "Build the sentence: 'I am fine'",
        correctOrder: ["Main", "theek", "haan"],
        wordBank: ["Main", "theek", "haan", "Tusi", "kiven"],
        translations: {
            "Main": "(I)",
            "theek": "(fine)",
            "haan": "(am)",
            "Tusi": "(you)",
            "kiven": "(how)"
        },
        teachingMoment: "In Panjabi, sentence structure is similar to English: Subject + Adjective + Verb"
    },

    // 8. TEACH: Adding farewell consideration
    {
        id: 8,
        type: "teach",
        icon: Heart,
        title: "Show you care when saying goodbye",
        content: {
            gurmukhi: "ਅਪਨਾ ਖਿਆਲ ਰੱਖਣਾ",
            roman: "Apna khyal rakhna",
            english: "Take care of yourself",
            usage: "Add this after Sat Sri Akaal when saying goodbye to show extra care",
            tip: "This is especially nice with family members and close friends"
        },
        audioFile: "/audio/apna-khyal-rakhna.mp3"
    },

    // 9. PRACTICE: Real scenario
    {
        id: 9,
        type: "scenario-choice",
        instruction: "You're meeting your friend's parents. What do you say?",
        scenario: "Meeting elders for the first time",
        options: [
            {
                text: "Sat Sri Akaal Ji",
                correct: true,
                explanation: "Perfect! Adding 'Ji' shows respect when meeting elders."
            },
            {
                text: "Kiddan?",
                correct: false,
                explanation: "Too casual for meeting elders! Save this for friends."
            }
        ],
        teachingMoment: "Always use 'Ji' with elders to show respect!"
    },

    // 10. TEACH: Casual greetings
    {
        id: 10,
        type: "teach",
        icon: Users,
        title: "Casual greeting with friends",
        content: {
            gurmukhi: "ਕਿੱਦਾਂ?",
            roman: "Kiddan?",
            english: "What's up? / How's it going?",
            usage: "Use with friends, peers, or people your own age in casual settings",
            tip: "Think of this as the Panjabi equivalent of 'What's up?' - NOT for elders!"
        },
        audioFile: "/audio/kiddan.mp3"
    },

    // 11. PRACTICE: Formal vs Informal
    {
        id: 11,
        type: "categorize",
        instruction: "Sort into the correct category",
        categories: ["Formal (Elders)", "Informal (Friends)"],
        items: [
            { text: "Sat Sri Akaal Ji", category: "Formal (Elders)" },
            { text: "Kiddan?", category: "Informal (Friends)" },
            { text: "Tusi kiven ho?", category: "Formal (Elders)" }
        ],
        teachingMoment: "Context matters! Use formal greetings with elders, casual with friends."
    },

    // 12. PRACTICE: Listen and identify
    {
        id: 12,
        type: "listen-multiple-choice",
        instruction: "Listen and choose what you heard",
        audio: "/audio/tusi-kiven-ho.mp3",
        correctAnswer: "Tusi kiven ho?",
        options: [
            "Tusi kiven ho?",
            "Main theek haan",
            "Sat Sri Akaal",
            "Kiddan?"
        ],
        teachingMoment: "Great job! 'Tusi kiven ho?' means 'How are you?' in formal Panjabi"
    },

    // 13. PRACTICE: Full conversation
    {
        id: 13,
        type: "conversation-build",
        instruction: "Build a proper greeting conversation",
        scenario: "You meet your grandmother",
        steps: [
            {
                prompt: "Greet your grandmother",
                correct: "Sat Sri Akaal Ji",
                options: ["Sat Sri Akaal Ji", "Kiddan?", "Hello"]
            },
            {
                prompt: "Ask how she is",
                correct: "Tusi kiven ho?",
                options: ["Tusi kiven ho?", "Main theek haan", "Kiddan?"]
            }
        ],
        teachingMoment: "You just had your first Panjabi conversation!"
    },

    // 14. PRACTICE: Scenario judgement
    {
        id: 14,
        type: "scenario-choice",
        instruction: "You're leaving your grandma's house. What do you say?",
        scenario: "Saying goodbye to grandmother",
        options: [
            {
                text: "Sat Sri Akaal Ji, Apna khyal rakhna",
                correct: true,
                explanation: "Perfect! Respectful goodbye + showing you care."
            },
            {
                text: "Just wave and leave",
                correct: false,
                explanation: "Always acknowledge elders with proper goodbye!"
            }
        ],
        teachingMoment: "Combining greetings shows cultural awareness and respect!"
    },

    // 15. FINAL: Quick quiz
    {
        id: 15,
        type: "quick-quiz",
        instruction: "Final check: What does 'Ji' mean when added to greetings?",
        options: [
            { text: "It shows respect", correct: true },
            { text: "It means 'goodbye'", correct: false },
            { text: "It's just for style", correct: false }
        ],
        teachingMoment: "You've mastered Panjabi greetings! Ready for the next lesson?"
    }
];

export default function Lesson1Experimental() {
    const router = useRouter();
    const [currentStep, setCurrentStep] = useState(0);
    const [hearts, setHearts] = useState(3);
    const [score, setScore] = useState(0);
    const [userAnswer, setUserAnswer] = useState("");
    const [selectedOption, setSelectedOption] = useState(null);
    const [showFeedback, setShowFeedback] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);
    const [completed, setCompleted] = useState(false);
    const [matchedPairs, setMatchedPairs] = useState([]);
    const [selectedPairs, setSelectedPairs] = useState([]);
    const [wordBankSelection, setWordBankSelection] = useState([]);
    const [conversationStep, setConversationStep] = useState(0);
    const [categories, setCategories] = useState({});

    const step = lessonFlow[currentStep];
    const progress = ((currentStep + 1) / lessonFlow.length) * 100;

    const playAudio = (audioPath) => {
        if (!audioPath) return;
        const audio = new Audio(audioPath);
        audio.play();
    };

    const nextStep = () => {
        setTimeout(() => {
            if (currentStep < lessonFlow.length - 1) {
                setCurrentStep(currentStep + 1);
                resetExerciseState();
            } else {
                setCompleted(true);
            }
        }, 2000);
    };

    const resetExerciseState = () => {
        setUserAnswer("");
        setSelectedOption(null);
        setShowFeedback(false);
        setMatchedPairs([]);
        setSelectedPairs([]);
        setWordBankSelection([]);
        setConversationStep(0);
        setCategories({});
    };

    const checkAnswer = (answer) => {
        let correct = false;

        // Different validation based on exercise type
        if (step.type === "listen-tap" || step.type === "listen-multiple-choice") {
            correct = answer === step.correctAnswer;
        } else if (step.type === "translate-to-english" || step.type === "scenario-choice" || step.type === "quick-quiz") {
            const selected = step.options.find(opt => opt.text === answer);
            correct = selected?.correct || false;
        } else if (step.type === "listen-type") {
            const normalizedAnswer = answer.toLowerCase().trim().replace(/[()]/g, '');
            correct = step.acceptableAnswers?.some(acceptable =>
                normalizedAnswer === acceptable.toLowerCase()
            ) || normalizedAnswer === step.correctAnswer.toLowerCase();
        }

        setIsCorrect(correct);
        setShowFeedback(true);

        if (correct) {
            setScore(score + 10);
        } else {
            setHearts(hearts - 1);
        }

        nextStep();
    };

    const handleMatchPair = (item, type) => {
        if (matchedPairs.includes(item.punjabi)) return;

        const newSelected = [...selectedPairs, { item, type }];
        setSelectedPairs(newSelected);

        if (newSelected.length === 2) {
            const [first, second] = newSelected;
            if (first.item.punjabi === second.item.punjabi && first.type !== second.type) {
                setMatchedPairs([...matchedPairs, first.item.punjabi]);
                setScore(score + 10);
                if (matchedPairs.length + 1 === step.pairs.length) {
                    setShowFeedback(true);
                    setIsCorrect(true);
                    nextStep();
                }
            } else {
                setHearts(hearts - 1);
            }
            setTimeout(() => setSelectedPairs([]), 500);
        }
    };

    const handleWordBankSelect = (word) => {
        if (wordBankSelection.length < step.correctOrder.length) {
            const newSelection = [...wordBankSelection, word];
            setWordBankSelection(newSelection);

            if (newSelection.length === step.correctOrder.length) {
                const correct = JSON.stringify(newSelection) === JSON.stringify(step.correctOrder);
                setIsCorrect(correct);
                setShowFeedback(true);
                if (correct) {
                    setScore(score + 10);
                } else {
                    setHearts(hearts - 1);
                }
                nextStep();
            }
        }
    };

    const handleCategorize = (item, category) => {
        const newCategories = { ...categories, [item.text]: category };
        setCategories(newCategories);

        if (Object.keys(newCategories).length === step.items.length) {
            const allCorrect = step.items.every(item => newCategories[item.text] === item.category);
            setIsCorrect(allCorrect);
            setShowFeedback(true);
            if (allCorrect) {
                setScore(score + 10);
            } else {
                setHearts(hearts - 1);
            }
            nextStep();
        }
    };

    const handleConversationStep = (answer) => {
        if (answer === step.steps[conversationStep].correct) {
            if (conversationStep < step.steps.length - 1) {
                setConversationStep(conversationStep + 1);
            } else {
                setIsCorrect(true);
                setShowFeedback(true);
                setScore(score + 10);
                nextStep();
            }
        } else {
            setHearts(hearts - 1);
            setIsCorrect(false);
            setShowFeedback(true);
            setTimeout(() => setShowFeedback(false), 1500);
        }
    };

    // Completion screen
    if (completed) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50 px-4 py-12 flex items-center justify-center">
                <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8 text-center">
                    <div className="mb-6">
                        <div className="w-24 h-24 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Trophy size={48} className="text-white" />
                        </div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">Lesson Complete!</h1>
                        <p className="text-gray-600">You can now greet people in Panjabi!</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-8">
                        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-xl border-2 border-blue-200">
                            <Star size={24} className="text-blue-600 mx-auto mb-2" />
                            <p className="text-2xl font-bold text-blue-600">{score}</p>
                            <p className="text-sm text-gray-600">Points</p>
                        </div>
                        <div className="bg-gradient-to-br from-red-50 to-red-100 p-4 rounded-xl border-2 border-red-200">
                            <Heart size={24} className="text-red-500 mx-auto mb-2" />
                            <p className="text-2xl font-bold text-red-500">{hearts}</p>
                            <p className="text-sm text-gray-600">Hearts Left</p>
                        </div>
                    </div>

                    <div className="bg-gradient-to-r from-green-50 to-green-100 p-4 rounded-xl mb-6 border-2 border-green-200">
                        <Sparkles className="text-green-600 mx-auto mb-2" size={24} />
                        <p className="text-sm font-semibold text-gray-800">You learned:</p>
                        <ul className="text-sm text-gray-700 mt-2 space-y-1">
                            <li>• Formal greetings (Sat Sri Akaal Ji)</li>
                            <li>• Asking how someone is (Tusi kiven ho?)</li>
                            <li>• Responding (Main theek haan)</li>
                            <li>• Casual greetings (Kiddan?)</li>
                        </ul>
                    </div>

                    <div className="space-y-3">
                        <button
                            onClick={() => router.push("/learning/essential-punjabi")}
                            className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-4 rounded-xl font-bold hover:from-blue-600 hover:to-blue-700 transition-all shadow-lg"
                        >
                            Back to Lessons
                        </button>
                        <button
                            onClick={() => {
                                setCurrentStep(0);
                                setHearts(3);
                                setScore(0);
                                setCompleted(false);
                            }}
                            className="w-full bg-white border-2 border-gray-300 text-gray-700 px-6 py-4 rounded-xl font-bold hover:bg-gray-50 transition-all"
                        >
                            Review Lesson
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // Out of hearts screen
    if (hearts <= 0) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50 px-4 py-12 flex items-center justify-center">
                <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8 text-center">
                    <div className="mb-6">
                        <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Heart size={48} className="text-red-500" />
                        </div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">Out of Hearts!</h1>
                        <p className="text-gray-600">Don't worry, you're learning! Try again.</p>
                    </div>

                    <div className="bg-blue-50 p-4 rounded-xl mb-6 border-2 border-blue-200">
                        <p className="text-lg font-bold text-blue-600 mb-1">{score} Points</p>
                        <p className="text-sm text-gray-600">You made it to step {currentStep + 1}/{lessonFlow.length}</p>
                    </div>

                    <button
                        onClick={() => {
                            setCurrentStep(0);
                            setHearts(3);
                            setScore(0);
                        }}
                        className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-4 rounded-xl font-bold hover:from-blue-600 hover:to-blue-700 transition-all shadow-lg"
                    >
                        Start Over
                    </button>
                </div>
            </div>
        );
    }

    // Teaching screen
    if (step.type === "teach") {
        const Icon = step.icon;
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50 px-3 sm:px-4 py-6 sm:py-8">
                <div className="max-w-2xl mx-auto">
                    {/* Header */}
                    <div className="mb-4 sm:mb-6">
                        <div className="flex items-center justify-between mb-3">
                            <button
                                onClick={() => router.push("/learning/essential-punjabi")}
                                className="p-2 hover:bg-gray-100 rounded-lg transition-colors active:bg-gray-200"
                            >
                                <ArrowLeft size={20} className="text-gray-600" />
                            </button>
                            <div className="flex items-center gap-1.5 sm:gap-2">
                                {[...Array(3)].map((_, i) => (
                                    <Heart
                                        key={i}
                                        size={20}
                                        className={i < hearts ? "text-red-500 fill-red-500" : "text-gray-300"}
                                    />
                                ))}
                            </div>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
                            <div
                                className="bg-gradient-to-r from-green-400 to-green-500 h-full transition-all duration-500"
                                style={{ width: `${progress}%` }}
                            ></div>
                        </div>
                    </div>

                    {/* Teaching Card */}
                    <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 mb-6">
                        <div className="flex items-center gap-2 sm:gap-3 mb-4">
                            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                                <Icon size={20} className="text-white sm:w-6 sm:h-6" />
                            </div>
                            <h2 className="text-lg sm:text-xl font-bold text-gray-900">{step.title}</h2>
                        </div>

                        <div className="space-y-3 sm:space-y-4">
                            {/* Main phrase */}
                            <div className="bg-gradient-to-r from-blue-50 to-orange-50 p-4 sm:p-5 rounded-xl border-2 border-blue-200">
                                <div className="flex items-start justify-between gap-2 mb-2">
                                    <p className="text-2xl sm:text-3xl font-bold text-gray-900 break-words">{step.content.gurmukhi}</p>
                                    {step.audioFile && (
                                        <button
                                            onClick={() => playAudio(step.audioFile)}
                                            className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 active:bg-blue-700 transition-all flex-shrink-0"
                                        >
                                            <Volume2 size={18} className="sm:w-5 sm:h-5" />
                                        </button>
                                    )}
                                </div>
                                <p className="text-base sm:text-lg text-gray-700 font-semibold mb-1 break-words">{step.content.roman}</p>
                                <p className="text-sm sm:text-base text-gray-600">{step.content.english}</p>
                            </div>

                            {/* Meaning */}
                            {step.content.meaning && (
                                <div className="bg-purple-50 p-3 rounded-lg border border-purple-200">
                                    <div className="flex items-start gap-2">
                                        <Lightbulb size={16} className="text-purple-600 flex-shrink-0 mt-0.5" />
                                        <div className="min-w-0 flex-1">
                                            <p className="text-xs font-semibold text-purple-900 mb-1">Meaning:</p>
                                            <p className="text-sm text-gray-700">{step.content.meaning}</p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Usage */}
                            <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                                <div className="flex items-start gap-2">
                                    <BookOpen size={16} className="text-green-600 flex-shrink-0 mt-0.5" />
                                    <div className="min-w-0 flex-1">
                                        <p className="text-xs font-semibold text-green-900 mb-1">Usage:</p>
                                        <p className="text-sm text-gray-700">{step.content.usage}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Tip */}
                            {step.content.tip && (
                                <div className="bg-yellow-50 p-3 rounded-lg border border-yellow-200">
                                    <div className="flex items-start gap-2">
                                        <Lightbulb size={16} className="text-yellow-600 flex-shrink-0 mt-0.5" />
                                        <div className="min-w-0 flex-1">
                                            <p className="text-xs font-semibold text-yellow-900 mb-1">Pro Tip:</p>
                                            <p className="text-sm text-gray-700">{step.content.tip}</p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        <button
                            onClick={() => {
                                setCurrentStep(currentStep + 1);
                                resetExerciseState();
                            }}
                            className="w-full mt-5 sm:mt-6 bg-gradient-to-r from-green-500 to-green-600 text-white py-3.5 sm:py-4 rounded-xl font-bold hover:from-green-600 hover:to-green-700 active:from-green-700 active:to-green-800 transition-all shadow-lg text-base"
                        >
                            GOT IT!
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // Exercise screens (listen-tap, translate, match-pairs, word-bank, scenario-choice, listen-type, categorize, conversation-build, quick-quiz)
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50 px-3 sm:px-4 py-6 sm:py-8">
            <div className="max-w-2xl mx-auto">
                {/* Header with progress and hearts */}
                <div className="mb-4 sm:mb-6">
                    <div className="flex items-center justify-between mb-3">
                        <button
                            onClick={() => router.push("/learning/essential-punjabi")}
                            className="p-2 hover:bg-gray-100 rounded-lg transition-colors active:bg-gray-200"
                        >
                            <ArrowLeft size={20} className="text-gray-600" />
                        </button>
                        <div className="flex items-center gap-1.5 sm:gap-2">
                            {[...Array(3)].map((_, i) => (
                                <Heart
                                    key={i}
                                    size={20}
                                    className={i < hearts ? "text-red-500 fill-red-500" : "text-gray-300"}
                                />
                            ))}
                        </div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
                        <div
                            className="bg-gradient-to-r from-green-400 to-green-500 h-full transition-all duration-500"
                            style={{ width: `${progress}%` }}
                        ></div>
                    </div>
                </div>

                {/* Exercise Card */}
                <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 mb-6">
                    <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-5 sm:mb-6 text-center">
                        {step.instruction}
                    </h2>

                    {/* Listen and tap */}
                    {step.type === "listen-tap" && (
                        <div className="space-y-4 sm:space-y-6">
                            <button
                                onClick={() => playAudio(step.audio)}
                                className="w-full bg-blue-500 text-white p-4 sm:p-5 rounded-xl flex items-center justify-center gap-2 sm:gap-3 hover:bg-blue-600 active:bg-blue-700 transition-all shadow-md touch-manipulation"
                            >
                                <Volume2 size={24} className="sm:w-7 sm:h-7" />
                                <span className="text-base sm:text-lg font-bold">Play Audio</span>
                            </button>
                            <div className="grid grid-cols-2 gap-3 sm:gap-4">
                                {step.options.map((option, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => !showFeedback && checkAnswer(option)}
                                        disabled={showFeedback}
                                        className={`p-4 sm:p-5 rounded-xl border-2 text-center font-bold text-base sm:text-lg transition-all touch-manipulation min-h-[80px] sm:min-h-[100px] flex items-center justify-center ${
                                            showFeedback && option === step.correctAnswer
                                                ? 'bg-green-100 border-green-500 text-green-700'
                                                : 'border-gray-300 hover:border-blue-500 hover:bg-blue-50 active:bg-blue-100'
                                        }`}
                                    >
                                        <span className="break-words">{option}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Listen multiple choice */}
                    {step.type === "listen-multiple-choice" && (
                        <div className="space-y-6">
                            <button
                                onClick={() => playAudio(step.audio)}
                                className="w-full bg-blue-500 text-white p-6 rounded-xl flex items-center justify-center gap-3 hover:bg-blue-600 transition-all shadow-md"
                            >
                                <Volume2 size={32} />
                                <span className="text-lg font-bold">Play Audio</span>
                            </button>
                            <div className="space-y-3">
                                {step.options.map((option, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => !showFeedback && checkAnswer(option)}
                                        disabled={showFeedback}
                                        className={`w-full p-5 rounded-xl border-2 text-left font-semibold text-lg transition-all ${
                                            showFeedback && option === step.correctAnswer
                                                ? 'bg-green-100 border-green-500 text-green-700'
                                                : 'border-gray-300 hover:border-blue-500 hover:bg-blue-50'
                                        }`}
                                    >
                                        {option}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Translate to English */}
                    {step.type === "translate-to-english" && (
                        <div className="space-y-4 sm:space-y-6">
                            <div className="bg-gradient-to-r from-blue-50 to-orange-50 p-4 sm:p-5 rounded-xl border-2 border-blue-200 mb-3 sm:mb-4">
                                <p className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2 text-center break-words">{step.punjabi}</p>
                                {step.gurmukhi && (
                                    <p className="text-lg sm:text-xl text-gray-400 text-center break-words">{step.gurmukhi}</p>
                                )}
                            </div>
                            <div className="space-y-2.5 sm:space-y-3">
                                {step.options.map((option, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => !showFeedback && checkAnswer(option.text)}
                                        disabled={showFeedback}
                                        className={`w-full p-3.5 sm:p-4 rounded-xl border-2 text-left font-semibold text-sm sm:text-base transition-all touch-manipulation ${
                                            showFeedback && option.correct
                                                ? 'bg-green-100 border-green-500 text-green-700'
                                                : 'border-gray-300 hover:border-blue-500 hover:bg-blue-50 active:bg-blue-100'
                                        }`}
                                    >
                                        {option.text}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Match pairs */}
                    {step.type === "match-pairs" && (
                        <div className="space-y-4 sm:space-y-6">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8">
                                <div className="space-y-2.5 sm:space-y-3">
                                    <p className="text-xs sm:text-sm font-semibold text-gray-600 mb-2">Panjabi</p>
                                    {step.pairs.map((pair, idx) => (
                                        <button
                                            key={`left-${idx}`}
                                            onClick={() => handleMatchPair(pair, 'punjabi')}
                                            disabled={matchedPairs.includes(pair.punjabi)}
                                            className={`w-full p-3.5 sm:p-4 rounded-xl border-2 font-bold text-base sm:text-lg transition-all touch-manipulation ${
                                                matchedPairs.includes(pair.punjabi)
                                                    ? 'bg-green-100 border-green-500 text-green-700'
                                                    : selectedPairs.some(s => s.item.punjabi === pair.punjabi && s.type === 'punjabi')
                                                        ? 'bg-blue-100 border-blue-500'
                                                        : 'border-gray-300 hover:border-blue-400 hover:bg-blue-50 active:bg-blue-100'
                                            }`}
                                        >
                                            {pair.punjabi}
                                        </button>
                                    ))}
                                </div>
                                <div className="space-y-2.5 sm:space-y-3">
                                    <p className="text-xs sm:text-sm font-semibold text-gray-600 mb-2">English</p>
                                    {step.pairs.sort(() => Math.random() - 0.5).map((pair, idx) => (
                                        <button
                                            key={`right-${idx}`}
                                            onClick={() => handleMatchPair(pair, 'english')}
                                            disabled={matchedPairs.includes(pair.punjabi)}
                                            className={`w-full p-3.5 sm:p-4 rounded-xl border-2 font-medium text-base sm:text-lg transition-all touch-manipulation ${
                                                matchedPairs.includes(pair.punjabi)
                                                    ? 'bg-green-100 border-green-500 text-green-700'
                                                    : selectedPairs.some(s => s.item.punjabi === pair.punjabi && s.type === 'english')
                                                        ? 'bg-blue-100 border-blue-500'
                                                        : 'border-gray-300 hover:border-blue-400 hover:bg-blue-50 active:bg-blue-100'
                                            }`}
                                        >
                                            {pair.english}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Word bank */}
                    {step.type === "word-bank" && (
                        <div className="space-y-6">
                            {/* Selected words */}
                            <div className="bg-gray-50 p-6 rounded-xl border-2 border-gray-300 min-h-24 flex items-center justify-center gap-3">
                                {wordBankSelection.map((word, idx) => (
                                    <div key={idx} className="bg-blue-500 text-white px-4 py-3 rounded-lg text-xl font-bold">
                                        {word}
                                    </div>
                                ))}
                                {wordBankSelection.length === 0 && (
                                    <p className="text-gray-400 text-lg">Tap words below to build sentence</p>
                                )}
                            </div>

                            {/* Word bank */}
                            <div className="flex flex-wrap gap-3 justify-center">
                                {step.wordBank.map((word, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => handleWordBankSelect(word)}
                                        disabled={wordBankSelection.includes(word) || showFeedback}
                                        className={`px-5 py-3 rounded-xl border-2 font-bold text-lg transition-all ${
                                            wordBankSelection.includes(word)
                                                ? 'bg-gray-200 border-gray-300 text-gray-400 cursor-not-allowed'
                                                : 'border-gray-300 hover:border-blue-500 hover:bg-blue-50'
                                        }`}
                                    >
                                        <div>{word}</div>
                                        <div className="text-xs text-gray-500 mt-1">{step.translations[word]}</div>
                                    </button>
                                ))}
                            </div>

                            {wordBankSelection.length > 0 && (
                                <button
                                    onClick={() => setWordBankSelection([])}
                                    className="text-sm text-gray-500 hover:text-gray-700 underline"
                                >
                                    Clear
                                </button>
                            )}
                        </div>
                    )}

                    {/* Scenario choice */}
                    {step.type === "scenario-choice" && (
                        <div className="space-y-6">
                            <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-5 rounded-xl border-2 border-purple-200 mb-6">
                                <p className="text-lg text-gray-800 font-medium">{step.scenario}</p>
                            </div>
                            <div className="space-y-3">
                                {step.options.map((option, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => !showFeedback && checkAnswer(option.text)}
                                        disabled={showFeedback}
                                        className={`w-full p-5 rounded-xl border-2 text-left font-semibold text-lg transition-all ${
                                            showFeedback && option.correct
                                                ? 'bg-green-100 border-green-500 text-green-700'
                                                : 'border-gray-300 hover:border-blue-500 hover:bg-blue-50'
                                        }`}
                                    >
                                        {option.text}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Listen and type */}
                    {step.type === "listen-type" && (
                        <div className="space-y-6">
                            <button
                                onClick={() => playAudio(step.audio)}
                                className="w-full bg-blue-500 text-white p-6 rounded-xl flex items-center justify-center gap-3 hover:bg-blue-600 transition-all shadow-md"
                            >
                                <Volume2 size={32} />
                                <span className="text-lg font-bold">Play Audio</span>
                            </button>

                            {step.hint && (
                                <div className="bg-yellow-50 p-3 rounded-lg border border-yellow-200">
                                    <p className="text-sm text-gray-700">Hint: {step.hint}</p>
                                </div>
                            )}

                            <input
                                type="text"
                                value={userAnswer}
                                onChange={(e) => setUserAnswer(e.target.value)}
                                placeholder="Type what you hear..."
                                disabled={showFeedback}
                                className="w-full p-4 border-2 border-gray-300 rounded-xl text-lg focus:outline-none focus:border-blue-500"
                            />

                            {!showFeedback && (
                                <button
                                    onClick={() => checkAnswer(userAnswer)}
                                    disabled={!userAnswer}
                                    className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-4 rounded-xl font-bold hover:from-green-600 hover:to-green-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
                                >
                                    CHECK
                                </button>
                            )}
                        </div>
                    )}

                    {/* Categorize */}
                    {step.type === "categorize" && (
                        <div className="space-y-6">
                            <div className="grid grid-cols-2 gap-6">
                                {step.categories.map((category, catIdx) => (
                                    <div key={catIdx} className="bg-gray-50 p-4 rounded-xl border-2 border-gray-300">
                                        <h3 className="font-bold text-lg text-gray-900 mb-4 text-center">{category}</h3>
                                        <div className="space-y-2 min-h-32">
                                            {step.items.filter(item => categories[item.text] === category).map((item, idx) => (
                                                <div key={idx} className="bg-blue-100 border-2 border-blue-300 p-3 rounded-lg text-center font-semibold">
                                                    {item.text}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="space-y-2">
                                <p className="text-sm font-semibold text-gray-600 mb-2">Drag items to categories:</p>
                                <div className="flex flex-wrap gap-2 justify-center">
                                    {step.items.filter(item => !categories[item.text]).map((item, idx) => (
                                        <div key={idx} className="relative">
                                            <button
                                                onClick={() => handleCategorize(item, step.categories[0])}
                                                className="px-4 py-2 bg-white border-2 border-gray-300 rounded-lg font-semibold hover:border-blue-400 transition-all"
                                            >
                                                {item.text}
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Conversation build */}
                    {step.type === "conversation-build" && (
                        <div className="space-y-6">
                            <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-5 rounded-xl border-2 border-purple-200 mb-6">
                                <p className="text-lg text-gray-800 font-medium mb-2">Scenario: {step.scenario}</p>
                                <p className="text-sm text-gray-600">Build the conversation step by step</p>
                            </div>

                            <div className="bg-gray-50 p-4 rounded-xl border-2 border-gray-300 mb-4">
                                <p className="text-lg font-semibold text-gray-900 mb-2">
                                    Step {conversationStep + 1}: {step.steps[conversationStep].prompt}
                                </p>
                            </div>

                            <div className="space-y-3">
                                {step.steps[conversationStep].options.map((option, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => handleConversationStep(option)}
                                        className="w-full p-5 rounded-xl border-2 text-left font-semibold text-xl transition-all border-gray-300 hover:border-blue-500 hover:bg-blue-50"
                                    >
                                        {option}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Quick quiz */}
                    {step.type === "quick-quiz" && (
                        <div className="space-y-6">
                            <div className="space-y-3">
                                {step.options.map((option, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => !showFeedback && checkAnswer(option.text)}
                                        disabled={showFeedback}
                                        className={`w-full p-5 rounded-xl border-2 text-left font-semibold text-lg transition-all ${
                                            showFeedback && option.correct
                                                ? 'bg-green-100 border-green-500 text-green-700'
                                                : 'border-gray-300 hover:border-blue-500 hover:bg-blue-50'
                                        }`}
                                    >
                                        {option.text}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                </div>

                {/* Feedback Banner */}
                {showFeedback && (
                    <div className={`fixed bottom-0 left-0 right-0 p-6 ${
                        isCorrect ? 'bg-green-500' : 'bg-red-500'
                    } text-white shadow-lg transition-all`}>
                        <div className="max-w-2xl mx-auto">
                            <div className="flex items-start gap-3 mb-2">
                                {isCorrect ? (
                                    <CheckCircle size={32} className="flex-shrink-0" />
                                ) : (
                                    <XCircle size={32} className="flex-shrink-0" />
                                )}
                                <div>
                                    <p className="text-2xl font-bold mb-1">
                                        {isCorrect ? "Correct!" : "Not quite"}
                                    </p>
                                    {step.teachingMoment && (
                                        <p className="text-sm opacity-90">{step.teachingMoment}</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}