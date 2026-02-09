"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
    ArrowLeft,
    ArrowRight,
    Volume2,
    CheckCircle,
    XCircle,
    User,
    RotateCcw,
    Trophy,
    MessageCircle,
    Users,
    Hand,
    Heart,
    Sparkles,
    BookOpen,
    Play,
    Pause,
    Star,
    Flame,
    Award
} from "lucide-react";
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null;

// HYBRID LESSON STRUCTURE
// Sections are marked: "manual" = user controls pace, "auto" = gamified auto-advance
const lessonContent = [
    // ========== SECTION 1: INTRODUCTION ==========
    {
        section: 1,
        type: "intro",
        navigation: "manual",
        title: "Learn Panjabi Greetings",
        content: "Where best to start your Panjabi learning journey with an introduction into Panjabi Greetings. Whether you are new to Panjabi, here to expand your Panjabi or here for a refresher, in this section, we will be taking you back to the basics and teach you how to:",
        points: [
            "Formally greet and bid farewell to someone",
            "Ask about a person's wellbeing",
            "Informally greet and bid farewell to someone"
        ],
        helpfulText: "This section will be useful in helping you kick start conversations with anyone you come across whether you are visiting your Grandma on a Sunday morning, socialising with friends on a Friday night or meeting someone for the first time"
    },

    // ========== SECTION 2: TEACHING - SAT SRI AKAAL ==========
    {
        section: 2,
        type: "teach-phrase",
        navigation: "manual",
        title: "Formal Greetings",
        subtitle: "Let's start with the most important greeting in Panjabi",
        phrase: {
            gurmukhi: "ਸਤ ਸ੍ਰੀ ਅਕਾਲ ਜੀ",
            roman: "Sat Sri Akaal Ji",
            english: "Hello / Goodbye",
            meaning: "Literally: 'God is Truth'",
            usage: "Use this to greet anyone - it works for both hello AND goodbye!",
            culturalTip: "We add 'Ji' at the end to convey respect. Always use this with elders!",
            audioFile: "sat-sri-akaal-ji.mp3",
            icon: Hand
        }
    },

    // PRACTICE: Listen and recognize
    {
        section: 2,
        type: "listen-tap",
        navigation: "auto",
        instruction: "Tap what you hear",
        audio: "/audio/sat-sri-akaal-ji.mp3",
        correctAnswer: "Sat Sri Akaal Ji",
        options: ["Sat Sri Akaal Ji", "Tusi kiven ho", "Main theek haan", "Kiddan"],
        teachingMoment: "Great! 'Sat Sri Akaal' is the most versatile Panjabi greeting - hello and goodbye in one!",
        pointsReward: 10
    },

    // PRACTICE: Translation
    {
        section: 2,
        type: "translate-to-english",
        navigation: "auto",
        instruction: "What does 'Sat Sri Akaal' mean?",
        punjabi: "Sat Sri Akaal",
        gurmukhi: "ਸਤ ਸ੍ਰੀ ਅਕਾਲ",
        options: [
            { text: "Hello / Goodbye", correct: true },
            { text: "How are you?", correct: false },
            { text: "Thank you", correct: false }
        ],
        teachingMoment: "Perfect! 'Sat Sri Akaal' literally means 'God is Truth', but we use it as hello/goodbye.",
        pointsReward: 10
    },

    // ========== SECTION 3: TEACHING - ASKING HOW SOMEONE IS ==========
    {
        section: 3,
        type: "teach-phrase-multi",
        navigation: "manual",
        title: "Building on Your Greeting",
        subtitle: "After saying hello, ask how they're doing",
        phrases: [
            {
                gurmukhi: "ਤੁਸੀਂ ਕਿਵੇਂ ਹੋ?",
                roman: "Tusi(n) kive(n) ho?",
                english: "How are you?",
                usage: "Formal/Informal. Natural follow-up after greeting someone",
                note: "'Tusi' is the respectful/formal way to say 'you' - use it with elders!",
                audioFile: "tusi-kiven-ho.mp3",
                icon: MessageCircle
            },
            {
                gurmukhi: "ਤੁਹਾਡਾ ਕੀ ਹਾਲ ਹੈ?",
                roman: "Tuhāḍā kī hāl hai?",
                english: "How are you? (alternative)",
                usage: "Also means 'How are you?' - both phrases work the same way",
                audioFile: "tusi-kiven-ho.mp3",
                icon: MessageCircle
            }
        ]
    },

    // PRACTICE: Listen multiple choice
    {
        section: 3,
        type: "listen-multiple-choice",
        navigation: "auto",
        instruction: "Listen and choose what you heard",
        audio: "/audio/tusi-kiven-ho.mp3",
        correctAnswer: "Tusi kiven ho?",
        options: [
            "Tusi kiven ho?",
            "Main theek haan",
            "Sat Sri Akaal",
            "Kiddan?"
        ],
        teachingMoment: "Excellent! 'Tusi kiven ho?' is how you ask 'How are you?' respectfully.",
        pointsReward: 10
    },

    // PRACTICE: Match pairs
    {
        section: 3,
        type: "match-pairs",
        navigation: "auto",
        instruction: "Match the Panjabi with English",
        pairs: [
            { punjabi: "Sat Sri Akaal", english: "Hello/Goodbye" },
            { punjabi: "Tusi kiven ho?", english: "How are you?" }
        ],
        teachingMoment: "Perfect! You're building your greeting vocabulary step by step.",
        pointsReward: 10
    },

    // ========== SECTION 4: TEACHING - RESPONDING ==========
    {
        section: 4,
        type: "teach-phrase",
        navigation: "manual",
        title: "Responding to Greetings",
        subtitle: "How to say you're fine when someone asks",
        phrase: {
            gurmukhi: "ਮੈਂ ਠੀਕ ਹਾਂ",
            roman: "Mai(n) theek haa(n)",
            english: "I am fine",
            usage: "Use this in response to someone asking 'How are you?'",
            breakdown: "'Main' = I, 'theek' = fine/okay, 'haan' = am",
            audioFile: "main-theek-haan.mp3",
            icon: Heart
        }
    },

    // PRACTICE: Word bank - build sentence
    {
        section: 4,
        type: "word-bank",
        navigation: "auto",
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
        teachingMoment: "Great work! Panjabi sentence structure: Subject + Adjective + Verb",
        pointsReward: 10
    },

    // PRACTICE: Conversation build
    {
        section: 4,
        type: "conversation-build",
        navigation: "auto",
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
            },
            {
                prompt: "Respond when she asks how you are",
                correct: "Main theek haan",
                options: ["Main theek haan", "Sat Sri Akaal", "Tusi kiven ho?"]
            }
        ],
        teachingMoment: "Amazing! You just had your first complete Panjabi conversation! 🎉",
        pointsReward: 15
    },

    // ========== SECTION 5: TEACHING - SHOWING EXTRA CARE ==========
    {
        section: 5,
        type: "teach-phrase",
        navigation: "manual",
        title: "Adding Extra Warmth",
        subtitle: "Show you care when saying goodbye",
        phrase: {
            gurmukhi: "ਅਪਨਾ ਖਿਆਲ ਰੱਖਣਾ",
            roman: "Apana khay-aal rakh-naa",
            english: "Take care of yourself",
            usage: "Add this after 'Sat Sri Akaal' when saying goodbye to show extra care",
            culturalTip: "This is especially meaningful with family members and close friends",
            audioFile: "apna-khyal-rakhna.mp3",
            icon: Heart
        }
    },

    // PRACTICE: Scenario choice
    {
        section: 5,
        type: "scenario-choice",
        navigation: "auto",
        instruction: "You're leaving your grandmother's house. What do you say?",
        scenario: "Saying goodbye to grandmother",
        options: [
            {
                text: "Sat Sri Akaal Ji, Apana khay-aal rakh-naa",
                correct: true,
                explanation: "Perfect! Respectful goodbye + showing you care."
            },
            {
                text: "Just wave and leave",
                correct: false,
                explanation: "Always acknowledge elders with proper goodbye!"
            },
            {
                text: "Just say Sat Sri Akaal",
                correct: false,
                explanation: "Good, but adding 'take care' makes it more meaningful!"
            }
        ],
        teachingMoment: "Combining greetings shows cultural awareness and genuine care! 💚",
        pointsReward: 10
    },

    // ========== SECTION 6: REAL-LIFE SCENARIO ==========
    {
        section: 6,
        type: "scenario-dialogue",
        navigation: "manual",
        title: "Real-Life Scenario",
        subtitle: "Watch how greetings work in practice",
        scenario: {
            setting: "Amar visits his grandparents' house",
            characters: [
                { name: "Amar (ਅਮਰ)", avatar: "/avatars/avatar6.png" },
                { name: "Grandma (ਬੀਬੀ)", avatar: "/avatars/avatar5.png" }
            ],
            dialogue: [
                {
                    speaker: "Amar (ਅਮਰ)",
                    gurmukhi: "ਸਤ ਸ੍ਰੀ ਅਕਾਲ ਬੀਬੀ ਜੀ। ਤੁਸੀਂ ਕਿਵੇਂ ਹੋ?",
                    roman: "Sat Sri Akaal Bibi Ji. Tusi(n) kive(n) ho?",
                    english: "Hello Grandma. How are you?",
                    avatar: "/avatars/avatar6.png"
                },
                {
                    speaker: "Grandma (ਬੀਬੀ)",
                    gurmukhi: "ਸਤ ਸ੍ਰੀ ਅਕਾਲ ਅਮਰ। ਮੈਂ ਠੀਕ ਹਾਂ। ਤੁਸੀਂ ਕਿਵੇਂ ਹੋ?",
                    roman: "Sat Sri Akaal Amar. Mai(n) theek haa(n). Tusi(n) kive(n) ho?",
                    english: "Hello Amar. I am fine. How are you?",
                    avatar: "/avatars/avatar5.png"
                }
            ],
            bottomNote: "We will be covering family members in another lesson where we will include terms for each individual family member"
        }
    },

    // ========== SECTION 7: TEACHING - INFORMAL GREETINGS ==========
    {
        section: 7,
        type: "teach-informal",
        navigation: "manual",
        title: "Casual Greetings",
        subtitle: "Ways to greet friends or people your own age",
        phrase: {
            gurmukhi: "ਕਿੱਦਾਂ?",
            roman: "Kiddā̃?",
            english: "How are you? / What's up?",
            usage: "Informal. Use with friends or people your own age in social settings",
            note: "Think of this as the Panjabi equivalent of 'What's up?' or 'How's it going?'",
            warning: "⚠️ NOT for elders! This would be disrespectful.",
            audioFile: "kiddan.mp3",
            icon: Users
        },
        comparison: {
            formal: {
                phrase: "Sat Sri Akaal Ji",
                use: "Uncle, Auntie, Elders",
                color: "blue"
            },
            informal: {
                phrase: "Kiddā̃?",
                use: "Friends, Peers",
                color: "orange"
            }
        }
    },

    // PRACTICE: Categorize formal vs informal
    {
        section: 7,
        type: "categorize",
        navigation: "auto",
        instruction: "Sort into the correct category",
        categories: ["Formal (Elders)", "Informal (Friends)"],
        items: [
            { text: "Sat Sri Akaal Ji", category: "Formal (Elders)" },
            { text: "Kiddan?", category: "Informal (Friends)" },
            { text: "Tusi kiven ho?", category: "Formal (Elders)" }
        ],
        teachingMoment: "Perfect! Context matters - formal with elders, casual with friends.",
        pointsReward: 10
    },

    // PRACTICE: Scenario judgments
    {
        section: 7,
        type: "scenario-practice-multiple",
        navigation: "auto",
        title: "Practice Makes Perfect",
        subtitle: "Choose the right greeting for each situation",
        scenarios: [
            {
                id: 1,
                situation: "Meeting your friend's parents for the first time",
                options: [
                    { text: "Sat Sri Akaal Ji", correct: true, explanation: "Perfect! This shows respect when meeting elders." },
                    { text: "Kiddā̃?", correct: false, explanation: "Too casual for meeting elders for the first time." }
                ]
            },
            {
                id: 2,
                situation: "Bumping into friends at a party",
                options: [
                    { text: "Sat Sri Akaal Ji", correct: false, explanation: "A bit too formal for friends in a casual setting." },
                    { text: "Kiddā̃?", correct: true, explanation: "Perfect for a casual, friendly greeting!" }
                ]
            },
            {
                id: 3,
                situation: "Video calling your grandparents",
                options: [
                    { text: "Sat Sri Akaal Ji", correct: true, explanation: "Excellent! Always show respect to grandparents." },
                    { text: "Kiddā̃?", correct: false, explanation: "Too casual - grandparents deserve respectful greetings!" }
                ]
            }
        ],
        teachingMoment: "You're mastering when to be formal vs casual! This is crucial for cultural fluency.",
        pointsReward: 10
    },

    // ========== FINAL QUIZ ==========
    {
        section: 8,
        type: "final-quiz",
        navigation: "manual",
        title: "Final Knowledge Check",
        questions: [
            {
                question: "We can only use Sat Sri Akaal to say hello to someone in Panjabi.",
                options: [
                    { text: "True", correct: false },
                    { text: "False", correct: true }
                ]
            },
            {
                question: "Why do we add 'Ji' at the end of Sat Sri Akaal?",
                options: [
                    { text: "To convey respect to the other person", correct: true },
                    { text: "We only use it when someone's name is Ji", correct: false },
                    { text: "To let the other person know we are older than them", correct: false }
                ]
            },
            {
                question: "What is the English translation for Sat Sri Akaal?",
                options: [
                    { text: "Good Morning", correct: false },
                    { text: "God is True", correct: true },
                    { text: "God is With You", correct: false }
                ]
            },
            {
                question: "Please translate 'Main Theek Haan'",
                options: [
                    { text: "I am excited", correct: false },
                    { text: "I am sad", correct: false },
                    { text: "I am fine", correct: true }
                ]
            },
            {
                question: "Saying Kiddan is more appropriate for a formal setting rather than informal setting?",
                options: [
                    { text: "True", correct: false },
                    { text: "False", correct: true }
                ]
            }
        ]
    }
];

export default function Lesson1Hybrid() {
    const router = useRouter();
    const [currentStep, setCurrentStep] = useState(0);
    const [userId, setUserId] = useState(null);
    const [lessonCompleted, setLessonCompleted] = useState(false);

    // Gamification state
    const [hearts, setHearts] = useState(5); // More forgiving than Duolingo's 3
    const [score, setScore] = useState(0);
    const [streak, setStreak] = useState(0);

    // Exercise state
    const [userAnswer, setUserAnswer] = useState("");
    const [showFeedback, setShowFeedback] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);

    // Lesson 4 style state
    const [playingAudio, setPlayingAudio] = useState(null);
    const [selectedPhrases, setSelectedPhrases] = useState([]);
    const [selectedDialogue, setSelectedDialogue] = useState(null);

    // Lesson 6 style state
    const [matchedPairs, setMatchedPairs] = useState([]);
    const [selectedPairs, setSelectedPairs] = useState([]);
    const [wordBankSelection, setWordBankSelection] = useState([]);
    const [conversationStep, setConversationStep] = useState(0);
    const [categories, setCategories] = useState({});

    // Practice scenarios state
    const [practiceAnswers, setPracticeAnswers] = useState({});
    const [practiceComplete, setPracticeComplete] = useState(false);

    // Quiz state
    const [quizAnswers, setQuizAnswers] = useState([]);
    const [quizComplete, setQuizComplete] = useState(false);

    const step = lessonContent[currentStep];
    const progress = ((currentStep + 1) / lessonContent.length) * 100;
    const currentSection = step.section;

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

    // Play audio function
    const playAudio = (audioFile, phraseId) => {
        if (!audioFile) return;
        setPlayingAudio(phraseId);
        const audio = new Audio(`/audio/${audioFile}`);
        audio.play();
        audio.onended = () => setPlayingAudio(null);
    };

    // Reset exercise state
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

    // Navigation
    const nextStep = () => {
        if (step.navigation === "auto") {
            // Duolingo-style auto-advance
            setTimeout(() => {
                if (currentStep < lessonContent.length - 1) {
                    setCurrentStep(currentStep + 1);
                    resetExerciseState();
                } else {
                    setLessonCompleted(true);
                }
            }, 2000);
        }
    };

    const handleNext = () => {
        if (currentStep < lessonContent.length - 1) {
            setCurrentStep(currentStep + 1);
            resetExerciseState();
        }
    };

    const handlePrevious = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
            resetExerciseState();
        }
    };

    // Check answer (Lesson 6 style)
    const checkAnswer = (answer) => {
        let correct = false;

        if (step.type === "listen-tap" || step.type === "listen-multiple-choice") {
            correct = answer === step.correctAnswer;
        } else if (step.type === "translate-to-english" || step.type === "scenario-choice") {
            const selected = step.options.find(opt => opt.text === answer);
            correct = selected?.correct || false;
        }

        setIsCorrect(correct);
        setShowFeedback(true);

        if (correct) {
            setScore(score + (step.pointsReward || 10));
            setStreak(streak + 1);
        } else {
            setHearts(Math.max(0, hearts - 1));
            setStreak(0);
        }

        nextStep();
    };

    // Match pairs logic
    const handleMatchPair = (item, type) => {
        if (matchedPairs.includes(item.punjabi)) return;

        const newSelected = [...selectedPairs, { item, type }];
        setSelectedPairs(newSelected);

        if (newSelected.length === 2) {
            const [first, second] = newSelected;
            if (first.item.punjabi === second.item.punjabi && first.type !== second.type) {
                setMatchedPairs([...matchedPairs, first.item.punjabi]);
                setScore(score + 10);
                setStreak(streak + 1);
                if (matchedPairs.length + 1 === step.pairs.length) {
                    setShowFeedback(true);
                    setIsCorrect(true);
                    nextStep();
                }
            } else {
                setHearts(Math.max(0, hearts - 1));
                setStreak(0);
            }
            setTimeout(() => setSelectedPairs([]), 500);
        }
    };

    // Word bank logic
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
                    setStreak(streak + 1);
                } else {
                    setHearts(Math.max(0, hearts - 1));
                    setStreak(0);
                }
                nextStep();
            }
        }
    };

    // Categorize logic
    const handleCategorize = (item, category) => {
        const newCategories = { ...categories, [item.text]: category };
        setCategories(newCategories);

        if (Object.keys(newCategories).length === step.items.length) {
            const allCorrect = step.items.every(item => newCategories[item.text] === item.category);
            setIsCorrect(allCorrect);
            setShowFeedback(true);
            if (allCorrect) {
                setScore(score + 10);
                setStreak(streak + 1);
            } else {
                setHearts(Math.max(0, hearts - 1));
                setStreak(0);
            }
            nextStep();
        }
    };

    // Conversation build logic
    const handleConversationStep = (answer) => {
        if (answer === step.steps[conversationStep].correct) {
            if (conversationStep < step.steps.length - 1) {
                setConversationStep(conversationStep + 1);
            } else {
                setIsCorrect(true);
                setShowFeedback(true);
                setScore(score + (step.pointsReward || 10));
                setStreak(streak + 1);
                nextStep();
            }
        } else {
            setHearts(Math.max(0, hearts - 1));
            setStreak(0);
            setIsCorrect(false);
            setShowFeedback(true);
            setTimeout(() => setShowFeedback(false), 1500);
        }
    };

    // Practice scenarios logic (Lesson 4 style)
    const handlePracticeAnswer = (scenarioId, optionIndex) => {
        if (practiceAnswers[scenarioId] !== undefined) return;

        const scenario = step.scenarios.find(s => s.id === scenarioId);
        const isCorrect = scenario.options[optionIndex].correct;

        const newAnswers = { ...practiceAnswers, [scenarioId]: optionIndex };
        setPracticeAnswers(newAnswers);

        // Update score and hearts
        if (isCorrect) {
            setScore(score + 10);
            setStreak(streak + 1);
        } else {
            setHearts(Math.max(0, hearts - 1));
            setStreak(0);
        }

        if (Object.keys(newAnswers).length === step.scenarios.length) {
            setPracticeComplete(true);
        }
    };

    // Calculate quiz statistics
    const calculateScore = () => {
        let correct = 0;
        let total = 0;

        if (quizComplete) {
            const quizContent = lessonContent.find(content => content.type === 'final-quiz');
            if (quizContent && quizContent.questions) {
                quizContent.questions.forEach((q, idx) => {
                    total++;
                    if (quizAnswers[idx] !== undefined && q.options[quizAnswers[idx]]?.correct) {
                        correct++;
                    }
                });
            }
        }

        return { correct, total, score: total > 0 ? Math.round((correct / total) * 100) : 0 };
    };

    // Save progress to Supabase
    const saveProgress = async () => {
        if (!supabase || !userId) return;

        try {
            const { correct, total, score: quizScore } = calculateScore();

            const { error } = await supabase
                .from('lesson_progress')
                .upsert({
                    user_id: userId,
                    lesson_id: 'lesson-1-greetings-hybrid',
                    lesson_name: 'Panjabi Greetings (Hybrid)',
                    completed: true,
                    quiz_score: quizScore,
                    correct_answers: correct,
                    total_questions: total,
                    game_score: score,
                    hearts_remaining: hearts,
                    last_accessed: new Date().toISOString()
                }, {
                    onConflict: 'user_id,lesson_id'
                });

            if (error) throw error;
        } catch (error) {
            console.error('Error saving progress:', error);
        }
    };

    const handleComplete = async () => {
        await saveProgress();
        setLessonCompleted(true);
    };

    const canProceed = () => {
        if (step.type === 'scenario-practice-multiple' && !practiceComplete) return false;
        if (step.type === 'final-quiz' && !quizComplete) return false;
        return true;
    };

    // Out of hearts screen
    if (hearts <= 0 && !lessonCompleted) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50 px-4 py-12 flex items-center justify-center">
                <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8 text-center">
                    <div className="mb-6">
                        <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Heart size={48} className="text-red-500" />
                        </div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">Out of Hearts!</h1>
                        <p className="text-gray-600">Don't worry, you're learning! Let's review and try again.</p>
                    </div>

                    <div className="bg-blue-50 p-4 rounded-xl mb-6 border-2 border-blue-200">
                        <div className="grid grid-cols-2 gap-4 mb-3">
                            <div>
                                <p className="text-2xl font-bold text-blue-600">{score}</p>
                                <p className="text-sm text-gray-600">Points Earned</p>
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-blue-600">{currentStep + 1}/{lessonContent.length}</p>
                                <p className="text-sm text-gray-600">Progress</p>
                            </div>
                        </div>
                        <p className="text-sm text-gray-600">Section {currentSection}/8</p>
                    </div>

                    <div className="space-y-3">
                        <button
                            onClick={() => {
                                setCurrentStep(0);
                                setHearts(5);
                                setScore(0);
                                setStreak(0);
                                resetExerciseState();
                            }}
                            className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-4 rounded-xl font-bold hover:from-blue-600 hover:to-blue-700 transition-all shadow-lg"
                        >
                            Start Over
                        </button>
                        <button
                            onClick={() => router.push("/learning/essential-punjabi")}
                            className="w-full bg-white border-2 border-gray-300 text-gray-700 px-6 py-4 rounded-xl font-bold hover:bg-gray-50 transition-all"
                        >
                            Back to Lessons
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // Completion screen
    if (lessonCompleted) {
        const { correct, total, score: quizScore } = calculateScore();

        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50 px-4 sm:px-6 lg:px-8 pt-28 pb-12">
                <div className="max-w-3xl mx-auto">
                    <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-green-500">
                        <div className="flex justify-center mb-6">
                            <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center shadow-lg">
                                <Trophy size={40} className="text-white" />
                            </div>
                        </div>

                        <h2 className="text-3xl font-bold text-center text-gray-900 mb-2">
                            Lesson Complete!
                        </h2>
                        <p className="text-center text-gray-600 mb-8">
                            You've mastered Panjabi greetings!
                        </p>

                        {/* Game stats */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-xl text-center border-2 border-blue-200">
                                <Star size={24} className="text-blue-600 mx-auto mb-2" />
                                <div className="text-2xl font-bold text-blue-600">{score}</div>
                                <p className="text-xs text-gray-600 font-medium">Points</p>
                            </div>
                            <div className="bg-gradient-to-br from-red-50 to-red-100 p-4 rounded-xl text-center border-2 border-red-200">
                                <Heart size={24} className="text-red-500 mx-auto mb-2" />
                                <div className="text-2xl font-bold text-red-500">{hearts}</div>
                                <p className="text-xs text-gray-600 font-medium">Hearts Left</p>
                            </div>
                            <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-4 rounded-xl text-center border-2 border-orange-200">
                                <Flame size={24} className="text-orange-500 mx-auto mb-2" />
                                <div className="text-2xl font-bold text-orange-500">{streak}</div>
                                <p className="text-xs text-gray-600 font-medium">Best Streak</p>
                            </div>
                            <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-xl text-center border-2 border-green-200">
                                <Award size={24} className="text-green-600 mx-auto mb-2" />
                                <div className="text-2xl font-bold text-green-600">{quizScore}%</div>
                                <p className="text-xs text-gray-600 font-medium">Quiz Score</p>
                            </div>
                        </div>

                        {/* Quiz breakdown */}
                        <div className="grid grid-cols-3 gap-4 mb-6">
                            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-xl text-center border-2 border-blue-200">
                                <div className="text-3xl font-bold text-blue-600 mb-1">{quizScore}%</div>
                                <p className="text-xs text-gray-600 font-medium">Quiz Score</p>
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

                        {supabase && userId && (
                            <div className="bg-green-50 border-l-4 border-green-500 p-3 rounded-r mb-6">
                                <div className="flex items-center gap-2">
                                    <CheckCircle size={18} className="text-green-600" />
                                    <p className="text-sm text-gray-800 font-medium">Progress saved to your profile</p>
                                </div>
                            </div>
                        )}

                        <div className="bg-gradient-to-r from-green-50 to-green-100 p-4 rounded-xl mb-6 border-2 border-green-200">
                            <Sparkles className="text-green-600 mx-auto mb-2" size={24} />
                            <p className="text-sm font-semibold text-gray-800 text-center mb-2">You learned:</p>
                            <ul className="text-sm text-gray-700 space-y-1">
                                <li>• Sat Sri Akaal Ji - The essential Panjabi greeting</li>
                                <li>• Tusi kiven ho? - How to ask how someone is</li>
                                <li>• Main theek haan - How to respond</li>
                                <li>• Kiddan? - Casual greeting with friends</li>
                                <li>• When to use formal vs informal greetings</li>
                            </ul>
                        </div>

                        <div className="space-y-3">
                            <button
                                onClick={() => router.push("/learning/essential-punjabi")}
                                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-blue-700 transition-all text-sm shadow-md"
                            >
                                <span>Continue to Next Lesson</span>
                                <ArrowRight size={18} />
                            </button>
                            <button
                                onClick={() => {
                                    setCurrentStep(0);
                                    setHearts(5);
                                    setScore(0);
                                    setStreak(0);
                                    setLessonCompleted(false);
                                    resetExerciseState();
                                    setPracticeAnswers({});
                                    setPracticeComplete(false);
                                    setQuizAnswers([]);
                                    setQuizComplete(false);
                                }}
                                className="w-full flex items-center justify-center gap-2 bg-gray-100 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors text-sm"
                            >
                                <RotateCcw size={18} />
                                <span>Review Lesson</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // RENDER CONTENT BASED ON TYPE
    const renderContent = () => {
        // ========== INTRO (Lesson 4 style) ==========
        if (step.type === "intro") {
            return (
                <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-orange-500 rounded-xl flex items-center justify-center">
                            <Hand className="text-white" size={24} />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900">{step.title}</h2>
                    </div>
                    <p className="text-base text-gray-700 mb-6">{step.content}</p>
                    <div className="space-y-3 mb-6">
                        {step.points.map((point, idx) => (
                            <div key={idx} className="flex items-start gap-3 p-4 bg-gradient-to-r from-blue-50 to-orange-50 rounded-xl border border-gray-100">
                                <div className="flex-shrink-0 w-7 h-7 bg-gradient-to-r from-blue-500 to-orange-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                                    {idx + 1}
                                </div>
                                <p className="text-gray-800 font-medium pt-0.5">{point}</p>
                            </div>
                        ))}
                    </div>
                    {step.helpfulText && (
                        <div className="bg-gradient-to-r from-green-50 to-blue-50 border-2 border-green-200 rounded-xl p-5">
                            <p className="text-gray-800 leading-relaxed">
                                <span className="font-semibold text-green-700">💡 Helpful Context:</span>
                                <br />
                                {step.helpfulText}
                            </p>
                        </div>
                    )}
                </div>
            );
        }

        // ========== TEACH SINGLE PHRASE (Lesson 6 style teaching card) ==========
        if (step.type === "teach-phrase") {
            const Icon = step.phrase.icon;
            return (
                <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 border border-gray-200">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                            <Icon size={24} className="text-white" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900">{step.title}</h2>
                            <p className="text-sm text-gray-600">{step.subtitle}</p>
                        </div>
                    </div>

                    <div className="bg-gradient-to-r from-blue-50 to-orange-50 p-6 rounded-xl border-2 border-blue-200 mb-4">
                        <div className="flex items-start justify-between gap-3 mb-3">
                            <p className="text-3xl font-bold text-gray-900">{step.phrase.gurmukhi}</p>
                            {step.phrase.audioFile && (
                                <button
                                    onClick={() => playAudio(step.phrase.audioFile, 'teach')}
                                    className={`p-3 rounded-lg transition-colors flex-shrink-0 ${
                                        playingAudio === 'teach'
                                            ? 'bg-blue-600 text-white'
                                            : 'bg-blue-500 text-white hover:bg-blue-600'
                                    }`}
                                >
                                    <Volume2 size={20} />
                                </button>
                            )}
                        </div>
                        <p className="text-xl text-blue-700 font-semibold mb-2">{step.phrase.roman}</p>
                        <p className="text-lg text-gray-800 font-semibold">{step.phrase.english}</p>
                    </div>

                    <div className="space-y-3">
                        {step.phrase.meaning && (
                            <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                                <p className="text-sm font-semibold text-purple-900 mb-1">Literal Meaning</p>
                                <p className="text-sm text-purple-800">{step.phrase.meaning}</p>
                            </div>
                        )}

                        {step.phrase.usage && (
                            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                                <p className="text-sm font-semibold text-blue-900 mb-1">When to Use</p>
                                <p className="text-sm text-blue-800">{step.phrase.usage}</p>
                            </div>
                        )}

                        {step.phrase.breakdown && (
                            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                                <p className="text-sm font-semibold text-green-900 mb-1">Breakdown</p>
                                <p className="text-sm text-green-800">{step.phrase.breakdown}</p>
                            </div>
                        )}

                        {step.phrase.culturalTip && (
                            <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                                <p className="text-sm font-semibold text-orange-900 mb-1">💡 Cultural Tip</p>
                                <p className="text-sm text-orange-800">{step.phrase.culturalTip}</p>
                            </div>
                        )}
                    </div>
                </div>
            );
        }

        // ========== TEACH MULTIPLE PHRASES (Lesson 4 style expandable cards) ==========
        if (step.type === "teach-phrase-multi") {
            return (
                <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                            <BookOpen className="text-blue-600" size={20} />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900">{step.title}</h2>
                            <p className="text-sm text-gray-600">{step.subtitle}</p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        {step.phrases.map((phrase, idx) => {
                            const Icon = phrase.icon;
                            const isSelected = selectedPhrases.includes(idx);
                            const isPlaying = playingAudio === idx;

                            return (
                                <div
                                    key={idx}
                                    onClick={() => {
                                        setSelectedPhrases(prev =>
                                            prev.includes(idx)
                                                ? prev.filter(id => id !== idx)
                                                : [...prev, idx]
                                        );
                                    }}
                                    className={`cursor-pointer p-5 rounded-xl border-2 transition-all ${
                                        isSelected
                                            ? 'border-blue-500 bg-blue-50 shadow-md'
                                            : 'border-gray-200 bg-gray-50 hover:border-blue-300 hover:bg-blue-50'
                                    }`}
                                >
                                    <div className="flex items-start gap-4">
                                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                                            isSelected ? 'bg-blue-500' : 'bg-gray-200'
                                        }`}>
                                            <Icon className={isSelected ? 'text-white' : 'text-gray-600'} size={20} />
                                        </div>

                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-2">
                                                <h3 className="text-xl font-bold text-gray-900">{phrase.gurmukhi}</h3>
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        playAudio(phrase.audioFile, idx);
                                                    }}
                                                    className={`p-2 rounded-lg transition-colors ${
                                                        isPlaying
                                                            ? 'bg-blue-600 text-white'
                                                            : 'bg-blue-100 text-blue-600 hover:bg-blue-200'
                                                    }`}
                                                >
                                                    {isPlaying ? <Pause size={16} /> : <Play size={16} />}
                                                </button>
                                            </div>

                                            <p className="text-blue-700 font-medium mb-1">{phrase.roman}</p>
                                            <p className="text-lg text-gray-800 font-semibold mb-2">{phrase.english}</p>

                                            {isSelected && (
                                                <div className="space-y-2 mt-3">
                                                    <p className="text-sm text-gray-700 leading-relaxed">
                                                        <span className="font-semibold">When to Use:</span> {phrase.usage}
                                                    </p>
                                                    {phrase.note && (
                                                        <p className="text-sm text-gray-700 leading-relaxed">
                                                            <span className="font-semibold">Note:</span> {phrase.note}
                                                        </p>
                                                    )}
                                                </div>
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

        // ========== LISTEN-TAP (Lesson 6 style) ==========
        if (step.type === "listen-tap") {
            return (
                <div className="space-y-6">
                    <button
                        onClick={() => playAudio(step.audio.replace('/audio/', ''), 'exercise')}
                        className="w-full bg-blue-500 text-white p-6 rounded-xl flex items-center justify-center gap-3 hover:bg-blue-600 transition-all shadow-md"
                    >
                        <Volume2 size={32} />
                        <span className="text-lg font-bold">Play Audio</span>
                    </button>
                    <div className="grid grid-cols-2 gap-4">
                        {step.options.map((option, idx) => (
                            <button
                                key={idx}
                                onClick={() => !showFeedback && checkAnswer(option)}
                                disabled={showFeedback}
                                className={`p-5 rounded-xl border-2 text-center font-bold text-lg transition-all min-h-[100px] flex items-center justify-center ${
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
            );
        }

        // ========== TRANSLATE TO ENGLISH (Lesson 6 style) ==========
        if (step.type === "translate-to-english") {
            return (
                <div className="space-y-6">
                    <div className="bg-gradient-to-r from-blue-50 to-orange-50 p-6 rounded-xl border-2 border-blue-200">
                        <p className="text-3xl font-bold text-gray-900 mb-2 text-center">{step.punjabi}</p>
                        {step.gurmukhi && (
                            <p className="text-xl text-gray-400 text-center">{step.gurmukhi}</p>
                        )}
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
            );
        }

        // ========== LISTEN MULTIPLE CHOICE (Lesson 6 style) ==========
        if (step.type === "listen-multiple-choice") {
            return (
                <div className="space-y-6">
                    <button
                        onClick={() => playAudio(step.audio.replace('/audio/', ''), 'exercise')}
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
            );
        }

        // ========== MATCH PAIRS (Lesson 6 style) ==========
        if (step.type === "match-pairs") {
            return (
                <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-8">
                        <div className="space-y-3">
                            <p className="text-sm font-semibold text-gray-600 mb-2">Panjabi</p>
                            {step.pairs.map((pair, idx) => (
                                <button
                                    key={`left-${idx}`}
                                    onClick={() => handleMatchPair(pair, 'punjabi')}
                                    disabled={matchedPairs.includes(pair.punjabi)}
                                    className={`w-full p-4 rounded-xl border-2 font-bold text-lg transition-all ${
                                        matchedPairs.includes(pair.punjabi)
                                            ? 'bg-green-100 border-green-500 text-green-700'
                                            : selectedPairs.some(s => s.item.punjabi === pair.punjabi && s.type === 'punjabi')
                                                ? 'bg-blue-100 border-blue-500'
                                                : 'border-gray-300 hover:border-blue-400 hover:bg-blue-50'
                                    }`}
                                >
                                    {pair.punjabi}
                                </button>
                            ))}
                        </div>
                        <div className="space-y-3">
                            <p className="text-sm font-semibold text-gray-600 mb-2">English</p>
                            {step.pairs.sort(() => Math.random() - 0.5).map((pair, idx) => (
                                <button
                                    key={`right-${idx}`}
                                    onClick={() => handleMatchPair(pair, 'english')}
                                    disabled={matchedPairs.includes(pair.punjabi)}
                                    className={`w-full p-4 rounded-xl border-2 font-medium text-lg transition-all ${
                                        matchedPairs.includes(pair.punjabi)
                                            ? 'bg-green-100 border-green-500 text-green-700'
                                            : selectedPairs.some(s => s.item.punjabi === pair.punjabi && s.type === 'english')
                                                ? 'bg-blue-100 border-blue-500'
                                                : 'border-gray-300 hover:border-blue-400 hover:bg-blue-50'
                                    }`}
                                >
                                    {pair.english}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            );
        }

        // ========== WORD BANK (Lesson 6 style) ==========
        if (step.type === "word-bank") {
            return (
                <div className="space-y-6">
                    <div className="bg-gray-50 p-6 rounded-xl border-2 border-gray-300 min-h-24 flex items-center justify-center gap-3 flex-wrap">
                        {wordBankSelection.map((word, idx) => (
                            <div key={idx} className="bg-blue-500 text-white px-4 py-3 rounded-lg text-xl font-bold">
                                {word}
                            </div>
                        ))}
                        {wordBankSelection.length === 0 && (
                            <p className="text-gray-400 text-lg">Tap words below to build sentence</p>
                        )}
                    </div>

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

                    {wordBankSelection.length > 0 && !showFeedback && (
                        <button
                            onClick={() => setWordBankSelection([])}
                            className="text-sm text-gray-500 hover:text-gray-700 underline mx-auto block"
                        >
                            Clear
                        </button>
                    )}
                </div>
            );
        }

        // ========== CONVERSATION BUILD (Lesson 6 style) ==========
        if (step.type === "conversation-build") {
            return (
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
            );
        }

        // ========== SCENARIO CHOICE (Lesson 6 style) ==========
        if (step.type === "scenario-choice") {
            return (
                <div className="space-y-6">
                    <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-5 rounded-xl border-2 border-purple-200 mb-6">
                        <p className="text-lg text-gray-800 font-medium">{step.scenario}</p>
                    </div>
                    <div className="space-y-3">
                        {step.options.map((option, idx) => (
                            <div key={idx}>
                                <button
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
                                {showFeedback && (
                                    <p className={`mt-2 text-sm px-4 py-2 rounded ${
                                        option.correct ? 'text-green-800 bg-green-50' : 'text-gray-700 bg-gray-50'
                                    }`}>
                                        {option.explanation}
                                    </p>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            );
        }

        // ========== SCENARIO DIALOGUE (Lesson 4 style) ==========
        if (step.type === "scenario-dialogue") {
            return (
                <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                            <MessageCircle className="text-purple-600" size={20} />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900">{step.title}</h2>
                            <p className="text-sm text-gray-600">{step.subtitle}</p>
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-5 mb-6 border-2 border-purple-200">
                        <p className="text-purple-900 font-medium text-center">
                            {step.scenario.setting}
                        </p>
                    </div>

                    <div className="space-y-4">
                        {step.scenario.dialogue.map((line, idx) => (
                            <div
                                key={idx}
                                onClick={() => setSelectedDialogue(selectedDialogue === idx ? null : idx)}
                                className={`cursor-pointer transition-all ${
                                    line.speaker.includes("Amar") ? "mr-8" : "ml-8"
                                }`}
                            >
                                <div className={`flex gap-3 ${line.speaker.includes("Grandma") ? "flex-row-reverse" : ""}`}>
                                    <img
                                        src={line.avatar}
                                        alt={line.speaker}
                                        className="w-10 h-10 rounded-full flex-shrink-0"
                                    />
                                    <div className={`flex-1 ${line.speaker.includes("Grandma") ? "text-right" : ""}`}>
                                        <p className="text-xs font-semibold text-gray-600 mb-1">{line.speaker}</p>
                                        <div className={`inline-block p-4 rounded-2xl ${
                                            line.speaker.includes("Amar")
                                                ? "bg-blue-500 text-white"
                                                : "bg-gray-200 text-gray-900"
                                        } ${selectedDialogue === idx ? "shadow-lg" : ""}`}>
                                            <p className="font-semibold mb-1">{line.gurmukhi}</p>
                                            <p className="text-sm opacity-90">{line.roman}</p>
                                            {selectedDialogue === idx && (
                                                <p className="text-sm mt-2 pt-2 border-t border-white/20">
                                                    {line.english}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-6 bg-blue-50 rounded-xl p-4 border border-blue-200">
                        <p className="text-sm text-blue-900">
                            <span className="font-semibold">Tip:</span> Click on each message to see the English translation!
                        </p>
                    </div>

                    {step.scenario.bottomNote && (
                        <div className="mt-4 bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-lg">
                            <p className="text-sm text-gray-700 leading-relaxed">{step.scenario.bottomNote}</p>
                        </div>
                    )}
                </div>
            );
        }

        // ========== TEACH INFORMAL (Lesson 4 style with comparison) ==========
        if (step.type === "teach-informal") {
            const Icon = step.phrase.icon;

            return (
                <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center">
                            <Icon className="text-orange-600" size={20} />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900">{step.title}</h2>
                            <p className="text-sm text-gray-600">{step.subtitle}</p>
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-6 mb-6 border-2 border-orange-200">
                        <div className="flex items-center gap-4 mb-4">
                            <h3 className="text-3xl font-bold text-gray-900">{step.phrase.gurmukhi}</h3>
                            <button
                                onClick={() => playAudio(step.phrase.audioFile, 'informal')}
                                className={`p-3 rounded-xl transition-colors ${
                                    playingAudio === 'informal'
                                        ? 'bg-orange-600 text-white'
                                        : 'bg-orange-200 text-orange-700 hover:bg-orange-300'
                                }`}
                            >
                                {playingAudio === 'informal' ? <Pause size={20} /> : <Play size={20} />}
                            </button>
                        </div>
                        <p className="text-orange-700 font-medium text-lg mb-2">{step.phrase.roman}</p>
                        <p className="text-2xl text-gray-900 font-semibold mb-3">{step.phrase.english}</p>
                        <p className="text-gray-700 mb-2">
                            <span className="font-semibold">When to Use:</span> {step.phrase.usage}
                        </p>
                        <p className="text-gray-600 italic text-sm mb-3">{step.phrase.note}</p>
                        {step.phrase.warning && (
                            <div className="bg-red-50 border-2 border-red-300 p-3 rounded-lg">
                                <p className="text-sm font-bold text-red-800">{step.phrase.warning}</p>
                            </div>
                        )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-5 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl border-2 border-blue-200">
                            <h4 className="text-sm font-bold text-blue-900 mb-2 uppercase tracking-wide">Formal</h4>
                            <p className="text-lg font-bold text-blue-800 mb-2">{step.comparison.formal.phrase}</p>
                            <p className="text-sm text-blue-700">{step.comparison.formal.use}</p>
                        </div>
                        <div className="p-5 bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl border-2 border-orange-200">
                            <h4 className="text-sm font-bold text-orange-900 mb-2 uppercase tracking-wide">Informal</h4>
                            <p className="text-lg font-bold text-orange-800 mb-2">{step.comparison.informal.phrase}</p>
                            <p className="text-sm text-orange-700">{step.comparison.informal.use}</p>
                        </div>
                    </div>
                </div>
            );
        }

        // ========== CATEGORIZE (Lesson 6 style) ==========
        if (step.type === "categorize") {
            return (
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
                        <p className="text-sm font-semibold text-gray-600 mb-2">Tap items to categorize:</p>
                        <div className="flex flex-wrap gap-2 justify-center">
                            {step.items.filter(item => !categories[item.text]).map((item, idx) => (
                                <div key={idx} className="relative">
                                    <button
                                        onClick={() => handleCategorize(item, step.categories[0])}
                                        onContextMenu={(e) => {
                                            e.preventDefault();
                                            handleCategorize(item, step.categories[1]);
                                        }}
                                        className="px-4 py-2 bg-white border-2 border-gray-300 rounded-lg font-semibold hover:border-blue-400 transition-all"
                                    >
                                        {item.text}
                                    </button>
                                </div>
                            ))}
                        </div>
                        <p className="text-xs text-gray-500 text-center mt-2">Click to add to first category, right-click for second</p>
                    </div>
                </div>
            );
        }

        // ========== PRACTICE SCENARIOS MULTIPLE (Lesson 4 + 6 hybrid) ==========
        if (step.type === "scenario-practice-multiple") {
            return (
                <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                            <Award className="text-green-600" size={20} />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900">{step.title}</h2>
                            <p className="text-sm text-gray-600">{step.subtitle}</p>
                        </div>
                    </div>

                    <div className="space-y-6">
                        {step.scenarios.map((scenario) => {
                            const answered = practiceAnswers[scenario.id] !== undefined;
                            const selectedOption = practiceAnswers[scenario.id];

                            return (
                                <div key={scenario.id} className="p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-xl border-2 border-green-200">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                                            {scenario.id}
                                        </div>
                                        <p className="text-lg font-semibold text-gray-900">{scenario.situation}</p>
                                    </div>

                                    <div className="space-y-2">
                                        {scenario.options.map((option, oIdx) => {
                                            const isSelected = selectedOption === oIdx;
                                            const isCorrect = option.correct;

                                            return (
                                                <div key={oIdx}>
                                                    <button
                                                        onClick={() => handlePracticeAnswer(scenario.id, oIdx)}
                                                        disabled={answered}
                                                        className={`w-full p-4 rounded-lg text-left font-medium transition-all flex items-center gap-3 ${
                                                            answered && isSelected && isCorrect
                                                                ? 'bg-green-600 text-white'
                                                                : answered && isSelected && !isCorrect
                                                                    ? 'bg-red-100 border-2 border-red-500 text-red-800'
                                                                    : answered && isCorrect
                                                                        ? 'bg-green-100 border-2 border-green-500 text-green-800'
                                                                        : 'bg-white border-2 border-gray-300 text-gray-800 hover:border-green-400 hover:bg-green-50'
                                                        }`}
                                                    >
                                                        {answered && isCorrect && (
                                                            <CheckCircle size={20} className="flex-shrink-0" />
                                                        )}
                                                        <span>{option.text}</span>
                                                    </button>
                                                    {answered && isSelected && (
                                                        <p className={`mt-2 text-sm px-4 py-2 rounded ${
                                                            isCorrect ? 'text-green-800 bg-green-50' : 'text-red-800 bg-red-50'
                                                        }`}>
                                                            {option.explanation}
                                                        </p>
                                                    )}
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            );
        }

        // ========== FINAL QUIZ (Lesson 4 style) ==========
        if (step.type === "final-quiz") {
            return (
                <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 bg-yellow-100 rounded-xl flex items-center justify-center">
                            <Trophy className="text-yellow-600" size={20} />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900">{step.title}</h2>
                    </div>

                    <div className="space-y-6">
                        {step.questions.map((q, qIdx) => (
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
                                                <span>{option.text}</span>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        ))}
                    </div>

                    {quizAnswers.length === step.questions.length && !quizComplete && (
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

    // MAIN RENDER - Teaching screens vs Exercise screens
    const isTeachingScreen = step.navigation === "manual";
    const isExerciseScreen = step.navigation === "auto";

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50 px-4 sm:px-6 lg:px-8 pt-28 pb-12">
            <div className="max-w-3xl mx-auto">
                {/* Top navigation bar */}
                <div className="mb-6 flex items-center justify-between">
                    <button
                        onClick={() => router.push("/learning/essential-punjabi")}
                        className="flex items-center gap-2 text-gray-600 hover:text-blue-600 font-semibold transition-colors text-sm"
                    >
                        <ArrowLeft size={18} />
                        <span>Back to Lessons</span>
                    </button>

                    {/* Gamification stats - only show on exercise screens */}
                    {isExerciseScreen && (
                        <div className="flex items-center gap-3">
                            {/* Hearts */}
                            <div className="flex items-center gap-1">
                                {[...Array(5)].map((_, i) => (
                                    <Heart
                                        key={i}
                                        size={20}
                                        className={i < hearts ? "text-red-500 fill-red-500" : "text-gray-300"}
                                    />
                                ))}
                            </div>
                            {/* Streak */}
                            {streak > 0 && (
                                <div className="flex items-center gap-1 bg-orange-100 px-2 py-1 rounded-lg">
                                    <Flame size={16} className="text-orange-500" />
                                    <span className="text-sm font-bold text-orange-700">{streak}</span>
                                </div>
                            )}
                            {/* Score */}
                            <div className="flex items-center gap-1 bg-blue-100 px-2 py-1 rounded-lg">
                                <Star size={16} className="text-blue-500" />
                                <span className="text-sm font-bold text-blue-700">{score}</span>
                            </div>
                        </div>
                    )}
                </div>

                {/* Header */}
                <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-6 text-white shadow-lg mb-6">
                    <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                            <User size={18} />
                            <span className="text-xs font-semibold uppercase tracking-wide">Lesson 1: Greetings</span>
                        </div>
                        <span className="text-xs bg-white/20 px-2 py-1 rounded-lg">Section {currentSection}/8</span>
                    </div>
                    <h1 className="text-3xl font-bold mb-2">
                        Learn Panjabi Greetings
                    </h1>
                    <p className="text-base text-blue-100">
                        Master essential greetings for different situations
                    </p>
                </div>

                {/* Progress bar */}
                <div className="bg-white rounded-xl shadow p-4 mb-6 border border-gray-200">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-semibold text-gray-700">Overall Progress</span>
                        <span className="text-sm font-bold text-blue-600">
                            {currentStep + 1} / {lessonContent.length}
                        </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                        <div
                            className="bg-gradient-to-r from-blue-500 to-blue-600 h-full transition-all duration-500"
                            style={{ width: `${progress}%` }}
                        ></div>
                    </div>
                </div>

                {/* Content card */}
                <div className="mb-6">
                    {isExerciseScreen ? (
                        // Exercise screen (Lesson 6 style - no manual nav, auto-advance)
                        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
                            <h2 className="text-xl font-bold text-gray-900 mb-6 text-center">
                                {step.instruction}
                            </h2>
                            {renderContent()}
                        </div>
                    ) : (
                        // Teaching screen (Lesson 4 style - full manual control)
                        renderContent()
                    )}
                </div>

                {/* Dot indicators */}
                <div className="flex justify-center gap-1.5 mb-6">
                    {lessonContent.map((_, idx) => (
                        <div
                            key={idx}
                            className={`w-2 h-2 rounded-full transition-all duration-300 ${
                                idx === currentStep
                                    ? 'bg-blue-600 w-6'
                                    : idx < currentStep
                                        ? 'bg-blue-400'
                                        : 'bg-gray-300'
                            }`}
                        ></div>
                    ))}
                </div>

                {/* Navigation buttons - only for manual navigation screens */}
                {isTeachingScreen && (
                    <div className="flex gap-3">
                        <button
                            onClick={handlePrevious}
                            disabled={currentStep === 0}
                            className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all text-sm ${
                                currentStep === 0
                                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                        >
                            <ArrowLeft size={18} />
                            <span>Previous</span>
                        </button>

                        {currentStep < lessonContent.length - 1 ? (
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
                )}

                {/* Feedback Banner - only for auto screens */}
                {showFeedback && isExerciseScreen && (
                    <div className={`fixed bottom-0 left-0 right-0 p-6 ${
                        isCorrect ? 'bg-green-500' : 'bg-red-500'
                    } text-white shadow-lg transition-all z-50`}>
                        <div className="max-w-2xl mx-auto">
                            <div className="flex items-start gap-3 mb-2">
                                {isCorrect ? (
                                    <CheckCircle size={32} className="flex-shrink-0" />
                                ) : (
                                    <XCircle size={32} className="flex-shrink-0" />
                                )}
                                <div>
                                    <p className="text-2xl font-bold mb-1">
                                        {isCorrect ? "Excellent!" : "Not quite"}
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