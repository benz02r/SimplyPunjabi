"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
    ArrowLeft,
    ArrowRight,
    Volume2,
    CheckCircle,
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
    Pause
} from "lucide-react";
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null;

const lessonContent = [
    {
        type: "intro",
        title: "Learn Panjabi Greetings",
        content: "Where best to start your Panjabi learning journey with an introduction into Panjabi Greetings. Whether you are new to Panjabi, here to expand your Panjabi or here for a refresher, in this section, we will be taking you back to the basics and teach you how to:",
        points: [
            "Formally greet and bid farewell to someone",
            "Ask about a person's wellbeing",
            "Informally greet and bid farewell to someone"
        ],
        helpfulText: "This section will be useful in helping you kick start conversations with anyone you come across whether you are visiting your Grandma on a Sunday morning, socialising with friends on a Friday night or meeting someone for the first time"
    },
    {
        type: "phrase-collection",
        title: "Formal Greetings",
        subtitle: "Go through the info boxes below to learn how we greet people in Panjabi and the different ways we can build on these initial greetings.",
        phrases: [
            {
                id: 1,
                gurmukhi: "ਸਤ ਸ੍ਰੀ ਅਕਾਲ ਜੀ",
                roman: "Sat Sri Akaal Ji",
                english: "Hello / Goodbye",
                usage: "Formal/Informal. When you want to say Hello or Goodbye to someone",
                context: "'God is Truth.' We add 'Ji' at the end to convey Respect.",
                audioFile: "sat-sri-akaal-ji.mp3",
                icon: Hand,
                boldTitle: "How to say 'Hello' or 'Goodbye' to someone in Panjabi?"
            },
            {
                id: 2,
                gurmukhi: "ਤੁਸੀਂ ਕਿਵੇਂ ਹੋ?",
                roman: "Tusi(n) kive(n) ho?",
                english: "How are you?",
                gurmukhi2: "ਤੁਹਾਡਾ ਕੀ ਹਾਲ ਹੈ?",
                roman2: "Tuhāḍā kī hāl hai?",
                usage: "Formal/Informal. You can use either of these phrases to build on your initial greeting and ask someone about their wellbeing",
                audioFile: "tusi-kiven-ho.mp3",
                icon: MessageCircle,
                boldTitle: "How to ask someone how they are?"
            },
            {
                id: 3,
                gurmukhi: "ਮੈਂ ਠੀਕ ਹਾਂ",
                roman: "Mai(n) theek haa(n)",
                english: "I am fine",
                usage: "Formal/Informal. Can be used in response to someone asking how you are",
                audioFile: "main-theek-haan.mp3",
                icon: Heart,
                boldTitle: "How to tell someone that you are fine"
            },
            {
                id: 4,
                gurmukhi: "ਅਪਨਾ ਖਿਆਲ ਰੱਖਣਾ",
                roman: "Apana khay-aal rakh-naa",
                english: "Take Care of Yourself",
                usage: "Formal/Informal. As you saw in the earlier Boxes, we can use Sat Sri Akaal to also say goodbye to someone. However, when you may want to add this phrase as a follow up to add an extra layer of compassion or consideration for the other person.",
                audioFile: "apna-khyal-rakhna.mp3",
                icon: Heart,
                boldTitle: "How to tell someone to 'take care'"
            }
        ],
        bottomNote: "These are just a few basics to get you started. We will be building on these points in further lessons and sections so don't be concerned if this page does not cover everything you may wish to know or say!"
    },
    {
        type: "scenario",
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
    {
        type: "informal-section",
        title: "Casual Greetings",
        subtitle: "Ways to greet and speak with friends or people your own age in an informal or social setting.",
        phrase: {
            gurmukhi: "ਕਿੱਦਾਂ?",
            roman: "Kiddā̃?",
            english: "How are you? (Shortened)",
            usage: "Informal. When greeting people your own age, typically friends or cousins in a social setting away from elderly family members.",
            note: "Think of this as the Panjabi equivalent of 'What's up?' or 'How's it going?'",
            audioFile: "kiddan.mp3",
            icon: Users,
            boldTitle: "How to greet friends or cousins in a social setting?"
        },
        comparison: {
            formal: {
                phrase: "Sat Sri Akaal Ji",
                use: "Uncle, Auntie, Elders"
            },
            informal: {
                phrase: "Kiddā̃?",
                use: "Friends, Peers"
            }
        }
    },
    {
        type: "practice-scenarios",
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
                situation: "Leaving your grandmother's house",
                options: [
                    { text: "Say 'Sat Sri Akaal Ji' and 'Apana khay-aal rakh-naa'", correct: true, explanation: "Excellent! Respectful goodbye with care." },
                    { text: "Just say 'Kiddā̃?'", correct: false, explanation: "Not appropriate when leaving elders." }
                ]
            }
        ]
    },
    {
        type: "final-quiz",
        title: "Test Your Knowledge",
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
                question: "We can say Sat Sri Akaal to say goodbye to someone in Panjabi as well as saying hello to them?",
                options: [
                    { text: "True", correct: true },
                    { text: "False", correct: false }
                ]
            },
            {
                question: "Why would we add 'Tusi Kive Ho' when we are greeting someone?",
                options: [
                    { text: "To ask someone where they come from", correct: false },
                    { text: "To ask someone how they are", correct: true },
                    { text: "To ask someone where they are?", correct: false }
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
                question: "Please translate 'Main Theek Han'",
                options: [
                    { text: "I am excited", correct: false },
                    { text: "I am sad", correct: false },
                    { text: "I am fine", correct: true }
                ]
            },
            {
                question: "Please translate 'Aapna Khay Aal'",
                options: [
                    { text: "Take care of yourself", correct: true },
                    { text: "See you soon", correct: false },
                    { text: "It was nice meeting you", correct: false }
                ]
            },
            {
                question: "Saying Kidda is more appropriate for a formal setting rather than informal setting?",
                options: [
                    { text: "True", correct: false },
                    { text: "False", correct: true }
                ]
            }
        ]
    }
];

export default function GreetingSteps() {
    const router = useRouter();
    const [step, setStep] = useState(0);
    const [userId, setUserId] = useState(null);
    const [lessonCompleted, setLessonCompleted] = useState(false);

    // Audio state
    const [playingAudio, setPlayingAudio] = useState(null);
    const [selectedPhrases, setSelectedPhrases] = useState([]);

    // Scenario state
    const [selectedDialogue, setSelectedDialogue] = useState(null);

    // Practice scenarios state
    const [practiceAnswers, setPracticeAnswers] = useState({});
    const [practiceComplete, setPracticeComplete] = useState(false);

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

    // Play audio function
    const playAudio = (audioFile, phraseId) => {
        setPlayingAudio(phraseId);
        const audio = new Audio(`/audio/${audioFile}`);
        audio.play();
        audio.onended = () => setPlayingAudio(null);
    };

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
                    lesson_id: 'lesson-2-greetings',
                    lesson_name: 'Panjabi Greetings',
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
        if (current.type === 'practice-scenarios' && !practiceComplete) return false;
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

    // Practice scenarios logic
    const handlePracticeAnswer = (scenarioId, optionIndex) => {
        if (practiceAnswers[scenarioId] !== undefined) return;

        const newAnswers = { ...practiceAnswers, [scenarioId]: optionIndex };
        setPracticeAnswers(newAnswers);

        // Check if all scenarios are answered
        if (Object.keys(newAnswers).length === current.scenarios.length) {
            setPracticeComplete(true);
        }
    };

    const renderContent = () => {
        if (current.type === "intro") {
            return (
                <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-orange-500 rounded-xl flex items-center justify-center">
                            <Hand className="text-white" size={24} />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900">{current.title}</h2>
                    </div>
                    <p className="text-base text-gray-700 mb-6">{current.content}</p>
                    <div className="space-y-3 mb-6">
                        {current.points.map((point, idx) => (
                            <div key={idx} className="flex items-start gap-3 p-4 bg-gradient-to-r from-blue-50 to-orange-50 rounded-xl border border-gray-100">
                                <div className="flex-shrink-0 w-7 h-7 bg-gradient-to-r from-blue-500 to-orange-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                                    {idx + 1}
                                </div>
                                <p className="text-gray-800 font-medium pt-0.5">{point}</p>
                            </div>
                        ))}
                    </div>
                    {current.helpfulText && (
                        <div className="bg-gradient-to-r from-green-50 to-blue-50 border-2 border-green-200 rounded-xl p-5">
                            <p className="text-gray-800 leading-relaxed">
                                <span className="font-semibold text-green-700">This section will be useful in helping you</span>
                                <br />
                                {current.helpfulText.replace("This section will be useful in helping you ", "")}
                            </p>
                        </div>
                    )}
                </div>
            );
        }

        if (current.type === "phrase-collection") {
            return (
                <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                            <BookOpen className="text-blue-600" size={20} />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900">{current.title}</h2>
                            <p className="text-sm text-gray-600">{current.subtitle}</p>
                        </div>
                    </div>

                    <div className="space-y-4 mt-6">
                        {current.phrases.map((phrase) => {
                            const IconComponent = phrase.icon;
                            const isSelected = selectedPhrases.includes(phrase.id);
                            const isPlaying = playingAudio === phrase.id;

                            return (
                                <div
                                    key={phrase.id}
                                    onClick={() => {
                                        setSelectedPhrases(prev =>
                                            prev.includes(phrase.id)
                                                ? prev.filter(id => id !== phrase.id)
                                                : [...prev, phrase.id]
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
                                            <IconComponent className={isSelected ? 'text-white' : 'text-gray-600'} size={20} />
                                        </div>

                                        <div className="flex-1 min-w-0">
                                            {phrase.boldTitle && (
                                                <h3 className="text-base font-bold text-gray-900 mb-3">{phrase.boldTitle}</h3>
                                            )}

                                            <div className="flex items-center gap-3 mb-2 flex-wrap">
                                                <h3 className="text-xl font-bold text-gray-900">{phrase.gurmukhi}</h3>
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        playAudio(phrase.audioFile, phrase.id);
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

                                            {phrase.gurmukhi2 && (
                                                <>
                                                    <h3 className="text-xl font-bold text-gray-900 mt-2">{phrase.gurmukhi2}</h3>
                                                    <p className="text-blue-700 font-medium mb-1">{phrase.roman2}</p>
                                                </>
                                            )}

                                            <p className="text-lg text-gray-800 font-semibold mb-2">{phrase.english}</p>

                                            {isSelected && (
                                                <>
                                                    <p className="text-sm text-gray-700 mt-3 leading-relaxed">
                                                        <span className="font-semibold">When to Use:</span> {phrase.usage}
                                                    </p>
                                                    {phrase.context && (
                                                        <p className="text-sm text-gray-700 mt-2 leading-relaxed">
                                                            <span className="font-semibold">Translation:</span> {phrase.context}
                                                        </p>
                                                    )}
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {current.bottomNote && (
                        <div className="mt-6 bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-lg">
                            <p className="text-sm text-gray-700 leading-relaxed">{current.bottomNote}</p>
                        </div>
                    )}
                </div>
            );
        }

        if (current.type === "scenario") {
            return (
                <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                            <MessageCircle className="text-purple-600" size={20} />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900">{current.title}</h2>
                            <p className="text-sm text-gray-600">{current.subtitle}</p>
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-5 mb-6 border-2 border-purple-200">
                        <p className="text-purple-900 font-medium text-center">
                            {current.scenario.setting}
                        </p>
                    </div>

                    <div className="space-y-4">
                        {current.scenario.dialogue.map((line, idx) => (
                            <div
                                key={idx}
                                onClick={() => setSelectedDialogue(selectedDialogue === idx ? null : idx)}
                                className={`cursor-pointer transition-all ${
                                    line.speaker === "Amar" ? "mr-8" : "ml-8"
                                }`}
                            >
                                <div className={`flex gap-3 ${line.speaker === "Grandma" ? "flex-row-reverse" : ""}`}>
                                    <img
                                        src={line.avatar}
                                        alt={line.speaker}
                                        className="w-10 h-10 rounded-full flex-shrink-0"
                                    />
                                    <div className={`flex-1 ${line.speaker === "Grandma" ? "text-right" : ""}`}>
                                        <p className="text-xs font-semibold text-gray-600 mb-1">{line.speaker}</p>
                                        <div className={`inline-block p-4 rounded-2xl ${
                                            line.speaker === "Amar"
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

                    {current.scenario.bottomNote && (
                        <div className="mt-4 bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-lg">
                            <p className="text-sm text-gray-700 leading-relaxed">{current.scenario.bottomNote}</p>
                        </div>
                    )}
                </div>
            );
        }

        if (current.type === "informal-section") {
            const IconComponent = current.phrase.icon;

            return (
                <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center">
                            <IconComponent className="text-orange-600" size={20} />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900">{current.title}</h2>
                            <p className="text-sm text-gray-600">{current.subtitle}</p>
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-6 mb-6 border-2 border-orange-200">
                        {current.phrase.boldTitle && (
                            <h3 className="text-base font-bold text-gray-900 mb-4">{current.phrase.boldTitle}</h3>
                        )}
                        <div className="flex items-center gap-4 mb-4">
                            <h3 className="text-3xl font-bold text-gray-900">{current.phrase.gurmukhi}</h3>
                            <button
                                onClick={() => playAudio(current.phrase.audioFile, 'informal')}
                                className={`p-3 rounded-xl transition-colors ${
                                    playingAudio === 'informal'
                                        ? 'bg-orange-600 text-white'
                                        : 'bg-orange-200 text-orange-700 hover:bg-orange-300'
                                }`}
                            >
                                {playingAudio === 'informal' ? <Pause size={20} /> : <Play size={20} />}
                            </button>
                        </div>
                        <p className="text-orange-700 font-medium text-lg mb-2">{current.phrase.roman}</p>
                        <p className="text-2xl text-gray-900 font-semibold mb-3">{current.phrase.english}</p>
                        <p className="text-gray-700 mb-2">
                            <span className="font-semibold">When to Use:</span> {current.phrase.usage}
                        </p>
                        <p className="text-gray-700 mb-2">
                            <span className="font-semibold">Translation:</span> {current.phrase.english}
                        </p>
                        <p className="text-gray-600 italic text-sm">
                            {current.phrase.note}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-5 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl border-2 border-blue-200">
                            <h4 className="text-sm font-bold text-blue-900 mb-2 uppercase tracking-wide">Formal</h4>
                            <p className="text-lg font-bold text-blue-800 mb-2">{current.comparison.formal.phrase}</p>
                            <p className="text-sm text-blue-700">{current.comparison.formal.use}</p>
                        </div>
                        <div className="p-5 bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl border-2 border-orange-200">
                            <h4 className="text-sm font-bold text-orange-900 mb-2 uppercase tracking-wide">Informal</h4>
                            <p className="text-lg font-bold text-orange-800 mb-2">{current.comparison.informal.phrase}</p>
                            <p className="text-sm text-orange-700">{current.comparison.informal.use}</p>
                        </div>
                    </div>
                </div>
            );
        }

        if (current.type === "practice-scenarios") {
            return (
                <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                            <Sparkles className="text-green-600" size={20} />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900">{current.title}</h2>
                            <p className="text-sm text-gray-600">{current.subtitle}</p>
                        </div>
                    </div>

                    <div className="space-y-6">
                        {current.scenarios.map((scenario, idx) => {
                            const answered = practiceAnswers[scenario.id] !== undefined;
                            const selectedOption = practiceAnswers[scenario.id];

                            return (
                                <div key={scenario.id} className="p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-xl border-2 border-green-200">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                                            {idx + 1}
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

                {supabase && userId && (
                    <div className="bg-green-50 border-l-4 border-green-500 p-3 rounded-r mb-6">
                        <div className="flex items-center gap-2">
                            <CheckCircle size={18} className="text-green-600" />
                            <p className="text-sm text-gray-800 font-medium">Progress saved to your profile</p>
                        </div>
                    </div>
                )}

                <div className="space-y-3">
                    <button
                        onClick={() => router.push("/lessons/lesson3/1")}
                        className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-blue-700 transition-all text-sm shadow-md"
                    >
                        <span>Continue to Next Lesson</span>
                        <ArrowRight size={18} />
                    </button>
                    <button
                        onClick={() => {
                            setStep(0);
                            setPlayingAudio(null);
                            setSelectedPhrases([]);
                            setSelectedDialogue(null);
                            setPracticeAnswers({});
                            setPracticeComplete(false);
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
                <button
                    onClick={() => router.push("/learning/essential-punjabi")}
                    className="mb-6 flex items-center gap-2 text-gray-600 hover:text-blue-600 font-semibold transition-colors text-sm"
                >
                    <ArrowLeft size={18} />
                    <span>Back to Lessons</span>
                </button>

                <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-6 text-white shadow-lg mb-6">
                    <div className="flex items-center gap-2 mb-2">
                        <User size={18} />
                        <span className="text-xs font-semibold uppercase tracking-wide">Lesson 2: Greetings</span>
                    </div>
                    <h1 className="text-3xl font-bold mb-2">
                        Learn Panjabi Greetings
                    </h1>
                    <p className="text-base text-blue-100">
                        Master essential greetings for different situations
                    </p>
                </div>

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

                <div className="mb-6">
                    {renderContent()}
                </div>

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