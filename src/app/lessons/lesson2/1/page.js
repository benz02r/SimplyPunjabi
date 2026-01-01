"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
    ArrowLeft,
    ArrowRight,
    User,
    CheckCircle,
    RotateCcw,
    Trophy,
    Volume2,
    Play,
    Pause,
    IdCard,
    Calendar,
    MapPin,
    Briefcase,
    Users,
    Info,
    Home
} from "lucide-react";
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null;

const lessonContent = [
    {
        type: "intro",
        title: "Introduce Yourself",
        content: "Learn the essentials of introducing yourself in Panjabi from your name to your family.",
        points: [
            "Name and age",
            "Where you're from and where you live",
            "Work or studies",
            "Family members"
        ]
    },
    {
        type: "phrase-tabs",
        title: "Basic Introduction",
        subtitle: "Choose male or female forms",
        categories: [
            {
                id: "name",
                title: "Name",
                icon: IdCard,
                phrases: [
                    {
                        gurmukhi: "ਮੇਰਾ ਨਾਮ [Name] ਹੈ",
                        roman: "Mera naam [Name] hai",
                        english: "My name is [Name]",
                        note: "Replace [Name] with your actual name",
                        audioFile: "mera-naam-priya-hai.mp3"
                    }
                ]
            },
            {
                id: "age",
                title: "Age",
                icon: Calendar,
                male: {
                    gurmukhi: "ਮੈਂ 25 ਸਾਲਾਂ ਦਾ ਹਾਂ",
                    roman: "Maiṁ 25 salān dā hān",
                    english: "I am 25 years old (male)",
                    audioFile: "main-25-saalan-da-haan.mp3"
                },
                female: {
                    gurmukhi: "ਮੈਂ 23 ਸਾਲਾਂ ਦੀ ਹਾਂ",
                    roman: "Maiṁ 23 salān dī hān",
                    english: "I am 23 years old (female)",
                    audioFile: "main-23-saalan-di-haan.mp3"
                },
                tip: "Use 'ਦਾ' (dā) if you're male and 'ਦੀ' (dī) if you're female"
            },
            {
                id: "origin",
                title: "Origin",
                icon: MapPin,
                male: {
                    gurmukhi: "ਮੈਂ London ਤੋਂ ਆਇਆ ਹਾਂ",
                    roman: "Maiṁ London ton āiā hān",
                    english: "I am from London (male)",
                    audioFile: "main-london-ton-aaya-haan.mp3"
                },
                female: {
                    gurmukhi: "ਮੈਂ London ਤੋਂ ਆਈ ਹਾਂ",
                    roman: "Maiṁ London ton āī hān",
                    english: "I am from London (female)",
                    audioFile: "main-london-ton-aayi-haan.mp3"
                },
                tip: "Notice: 'ਆਇਆ' (āiā) for males, 'ਆਈ' (āī) for females"
            },
            {
                id: "residence",
                title: "Where I Live",
                icon: Home,
                male: {
                    gurmukhi: "ਮੈਂ Southall ਵਿੱਚ ਰਹਿੰਦਾ ਹਾਂ",
                    roman: "Maiṁ Southall vich rahindā hān",
                    english: "I live in Southall (male)",
                    audioFile: "main-southall-vich-rahinda-haan.mp3"
                },
                female: {
                    gurmukhi: "ਮੈਂ Birmingham ਵਿੱਚ ਰਹਿੰਦੀ ਹਾਂ",
                    roman: "Maiṁ Birmingham vich rahindī hān",
                    english: "I live in Birmingham (female)",
                    audioFile: "main-birmingham-vich-rahindi-haan.mp3"
                },
                tip: "'ਰਹਿੰਦਾ' (rahindā) changes to 'ਰਹਿੰਦੀ' (rahindī) for females"
            }
        ]
    },
    {
        type: "work-study",
        title: "Work & Study",
        subtitle: "Talk about what you do",
        icon: Briefcase,
        phrases: [
            {
                type: "work",
                male: {
                    gurmukhi: "ਮੈਂ [Place] ਲਈ ਕੰਮ ਕਰਦਾ ਹਾਂ",
                    roman: "Maiṁ [Place] laī kam kardā hān",
                    english: "I work at [Place] (male)",
                    audioFile: "main-heathrow-lai-kam-karda-haan.mp3"
                },
                female: {
                    gurmukhi: "ਮੈਂ [Place] ਲਈ ਕੰਮ ਕਰਦੀ ਹਾਂ",
                    roman: "Maiṁ [Place] laī kam kardī hān",
                    english: "I work at [Place] (female)",
                    audioFile: "main-heathrow-lai-kam-kardi-haan.mp3"
                }
            },
            {
                type: "study",
                male: {
                    gurmukhi: "ਮੈਂ university ਪੜ੍ਹਦਾ ਹਾਂ",
                    roman: "Maiṁ university paṛhdā hān",
                    english: "I study at university (male)",
                    audioFile: "main-university-parhda-haan.mp3"
                },
                female: {
                    gurmukhi: "ਮੈਂ university ਪੜ੍ਹਦੀ ਹਾਂ",
                    roman: "Maiṁ university paṛhdī hān",
                    english: "I study at university (female)",
                    audioFile: "main-university-parhdi-haan.mp3"
                }
            }
        ],
        vocabulary: [
            { punjabi: "ਕੰਮ ਕਰਨਾ", roman: "kam karnā", english: "to work" },
            { punjabi: "ਪੜ੍ਹਨਾ", roman: "paṛhnā", english: "to study" }
        ]
    },
    {
        type: "family",
        title: "Your Family",
        subtitle: "Talk about siblings",
        icon: Users,
        examples: [
            {
                gurmukhi: "ਮੇਰੇ 2 ਵੱਡੇ ਭਰਾ ਅਤੇ 1 ਛੋਟੀ ਭੈਣ ਹਨ",
                roman: "Mere 2 vaḍḍe bhrā atē 1 chhoṭī bhaiṇ han",
                english: "I have 2 older brothers and 1 younger sister"
            },
            {
                gurmukhi: "ਮੇਰਾ 1 ਛੋਟਾ ਭਰਾ ਹੈ",
                roman: "Merā 1 chhoṭā bhrā hai",
                english: "I have 1 younger brother"
            }
        ],
        vocabulary: [
            {
                punjabi: "ਭਰਾ",
                roman: "bhrā",
                english: "Brother",
                icon: User
            },
            {
                punjabi: "ਭੈਣ",
                roman: "bhaiṇ",
                english: "Sister",
                icon: User
            },
            {
                punjabi: "ਵੱਡਾ/ਵੱਡੀ",
                roman: "vaḍḍā/vaḍḍī",
                english: "Older/Bigger",
                icon: ArrowRight
            },
            {
                punjabi: "ਛੋਟਾ/ਛੋਟੀ",
                roman: "chhoṭā/chhoṭī",
                english: "Younger/Little",
                icon: ArrowRight
            }
        ]
    },
    {
        type: "practice-builder",
        title: "Build Your Introduction",
        subtitle: "Select the correct phrases to create a complete self-introduction",
        scenario: "Simran is introducing herself to her new classmates",
        steps: [
            {
                id: 1,
                prompt: "How should Simran say her name?",
                options: [
                    { text: "Mera naam Simran hai", correct: true },
                    { text: "Tera naam Simran hai", correct: false },
                    { text: "Main Simran haan", correct: false }
                ],
                explanation: "'Mera naam [Name] hai' is the standard way to introduce your name"
            },
            {
                id: 2,
                prompt: "Simran is 23 years old. What should she say?",
                options: [
                    { text: "Maiṁ 23 salān dā hān", correct: false },
                    { text: "Maiṁ 23 salān dī hān", correct: true },
                    { text: "Maiṁ 23 nām dī hān", correct: false }
                ],
                explanation: "Use 'dī' (ਦੀ) for females when stating age"
            },
            {
                id: 3,
                prompt: "Simran is from Leicester. How does she say this?",
                options: [
                    { text: "Maiṁ Leicester ton āiā hān", correct: false },
                    { text: "Maiṁ Leicester ton āī hān", correct: true },
                    { text: "Maiṁ Leicester vich rahindī hān", correct: false }
                ],
                explanation: "Use 'āī' (ਆਈ) for females when saying where you're from"
            },
            {
                id: 4,
                prompt: "Simran studies at university. What should she say?",
                options: [
                    { text: "Maiṁ university paṛhdā hān", correct: false },
                    { text: "Maiṁ university paṛhdī hān", correct: true },
                    { text: "Maiṁ university kam kardī hān", correct: false }
                ],
                explanation: "'Paṛhdī' (ਪੜ੍ਹਦੀ) is the female form of 'to study'"
            }
        ]
    },
    {
        type: "final-quiz",
        title: "Test Your Knowledge",
        questions: [
            {
                question: "How do you say 'My name is Priya' in Panjabi?",
                options: [
                    { text: "Mera naam Priya hai", correct: true },
                    { text: "Main Priya haan", correct: false },
                    { text: "Tera naam Priya hai", correct: false }
                ]
            },
            {
                question: "Which is correct for a boy saying 'I am 25 years old'?",
                options: [
                    { text: "Maiṁ 25 salān dī hān", correct: false },
                    { text: "Maiṁ 25 salān dā hān", correct: true },
                    { text: "Maiṁ 25 nām dā hān", correct: false }
                ]
            },
            {
                question: "How does a girl say 'I am from London'?",
                options: [
                    { text: "Maiṁ London ton āī hān", correct: true },
                    { text: "Maiṁ London ton āiā hān", correct: false },
                    { text: "Maiṁ London vich rahindī hān", correct: false }
                ]
            },
            {
                question: "What does 'Maiṁ university paṛhdā hān' mean?",
                options: [
                    { text: "I work at university", correct: false },
                    { text: "I study at university (male)", correct: true },
                    { text: "I live at university", correct: false }
                ]
            },
            {
                question: "What is the difference between 'paṛhdā' and 'paṛhdī'?",
                options: [
                    { text: "Different meanings", correct: false },
                    { text: "Male vs female form", correct: true },
                    { text: "Different tenses", correct: false }
                ]
            }
        ]
    }
];

export default function IntroductionLesson() {
    const router = useRouter();
    const [step, setStep] = useState(0);
    const [userId, setUserId] = useState(null);
    const [lessonCompleted, setLessonCompleted] = useState(false);

    // Phrase tabs state
    const [selectedCategory, setSelectedCategory] = useState(0);
    const [selectedGender, setSelectedGender] = useState("male");

    // Audio state
    const [playingAudio, setPlayingAudio] = useState(null);

    // Practice builder state
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
    const playAudio = (audioFile, id) => {
        setPlayingAudio(id);
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
                    lesson_id: 'lesson-3-introduction',
                    lesson_name: 'Self Introduction',
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
        if (current.type === 'practice-builder' && !practiceComplete) return false;
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

    // Practice builder logic
    const handlePracticeAnswer = (stepId, optionIndex) => {
        if (practiceAnswers[stepId] !== undefined) return;

        const newAnswers = { ...practiceAnswers, [stepId]: optionIndex };
        setPracticeAnswers(newAnswers);

        if (Object.keys(newAnswers).length === current.steps.length) {
            setPracticeComplete(true);
        }
    };

    const renderContent = () => {
        if (current.type === "intro") {
            return (
                <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-orange-500 rounded-xl flex items-center justify-center">
                            <User className="text-white" size={24} />
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

        if (current.type === "phrase-tabs") {
            const category = current.categories[selectedCategory];
            const IconComponent = category.icon;

            return (
                <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                            <IdCard className="text-blue-600" size={20} />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900">{current.title}</h2>
                            <p className="text-sm text-gray-600">{current.subtitle}</p>
                        </div>
                    </div>

                    {/* Category Tabs */}
                    <div className="flex gap-2 mb-6 mt-6 overflow-x-auto pb-2">
                        {current.categories.map((cat, idx) => {
                            const TabIcon = cat.icon;
                            return (
                                <button
                                    key={cat.id}
                                    onClick={() => setSelectedCategory(idx)}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold whitespace-nowrap transition-all ${
                                        selectedCategory === idx
                                            ? 'bg-gradient-to-r from-blue-500 to-orange-500 text-white shadow-md'
                                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                                >
                                    <TabIcon size={16} />
                                    <span>{cat.title}</span>
                                </button>
                            );
                        })}
                    </div>

                    {/* Gender Toggle (if applicable) */}
                    {category.male && category.female && (
                        <div className="flex gap-3 mb-6">
                            <button
                                onClick={() => setSelectedGender("male")}
                                className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all ${
                                    selectedGender === "male"
                                        ? 'bg-blue-500 text-white shadow-md'
                                        : 'bg-blue-50 text-blue-700 hover:bg-blue-100'
                                }`}
                            >
                                Male
                            </button>
                            <button
                                onClick={() => setSelectedGender("female")}
                                className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all ${
                                    selectedGender === "female"
                                        ? 'bg-pink-500 text-white shadow-md'
                                        : 'bg-pink-50 text-pink-700 hover:bg-pink-100'
                                }`}
                            >
                                Female
                            </button>
                        </div>
                    )}

                    {/* Phrase Display */}
                    <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 border-2 border-gray-200">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm">
                                <IconComponent className="text-blue-600" size={24} />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900">{category.title}</h3>
                        </div>

                        {category.phrases ? (
                            // Name category (no gender)
                            <div>
                                <p className="text-2xl font-bold text-gray-900 mb-2">{category.phrases[0].gurmukhi}</p>
                                <p className="text-lg text-blue-700 font-medium mb-2">{category.phrases[0].roman}</p>
                                <p className="text-lg text-gray-700 mb-3">{category.phrases[0].english}</p>
                                {category.phrases[0].note && (
                                    <p className="text-sm text-gray-600 italic">{category.phrases[0].note}</p>
                                )}
                                <button
                                    onClick={() => playAudio(category.phrases[0].audioFile, category.id)}
                                    className={`mt-4 flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                                        playingAudio === category.id
                                            ? 'bg-blue-600 text-white'
                                            : 'bg-blue-100 text-blue-600 hover:bg-blue-200'
                                    }`}
                                >
                                    {playingAudio === category.id ? <Pause size={18} /> : <Play size={18} />}
                                    <span>Listen</span>
                                </button>
                            </div>
                        ) : (
                            // Categories with gender
                            <div>
                                <p className="text-2xl font-bold text-gray-900 mb-2">
                                    {category[selectedGender].gurmukhi}
                                </p>
                                <p className="text-lg text-blue-700 font-medium mb-2">
                                    {category[selectedGender].roman}
                                </p>
                                <p className="text-lg text-gray-700 mb-3">
                                    {category[selectedGender].english}
                                </p>
                                <button
                                    onClick={() => playAudio(category[selectedGender].audioFile, `${category.id}-${selectedGender}`)}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                                        playingAudio === `${category.id}-${selectedGender}`
                                            ? 'bg-blue-600 text-white'
                                            : 'bg-blue-100 text-blue-600 hover:bg-blue-200'
                                    }`}
                                >
                                    {playingAudio === `${category.id}-${selectedGender}` ? <Pause size={18} /> : <Play size={18} />}
                                    <span>Listen</span>
                                </button>
                                {category.tip && (
                                    <div className="mt-4 bg-yellow-50 border-l-4 border-yellow-400 p-3 rounded-r">
                                        <div className="flex items-start gap-2">
                                            <Info size={18} className="text-yellow-600 flex-shrink-0 mt-0.5" />
                                            <p className="text-sm text-yellow-900">{category.tip}</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            );
        }

        if (current.type === "work-study") {
            const IconComponent = current.icon;

            return (
                <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                            <IconComponent className="text-purple-600" size={20} />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900">{current.title}</h2>
                            <p className="text-sm text-gray-600">{current.subtitle}</p>
                        </div>
                    </div>

                    {/* Gender Toggle */}
                    <div className="flex gap-3 mb-6">
                        <button
                            onClick={() => setSelectedGender("male")}
                            className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all ${
                                selectedGender === "male"
                                    ? 'bg-blue-500 text-white shadow-md'
                                    : 'bg-blue-50 text-blue-700 hover:bg-blue-100'
                            }`}
                        >
                            Male
                        </button>
                        <button
                            onClick={() => setSelectedGender("female")}
                            className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all ${
                                selectedGender === "female"
                                    ? 'bg-pink-500 text-white shadow-md'
                                    : 'bg-pink-50 text-pink-700 hover:bg-pink-100'
                            }`}
                        >
                            Female
                        </button>
                    </div>

                    {/* Phrases */}
                    <div className="space-y-4 mb-6">
                        {current.phrases.map((phrase, idx) => (
                            <div key={idx} className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 border-2 border-purple-200">
                                <h3 className="text-sm font-bold text-purple-900 mb-3 uppercase tracking-wide">
                                    {phrase.type === "work" ? "Work" : "Study"}
                                </h3>
                                <p className="text-2xl font-bold text-gray-900 mb-2">
                                    {phrase[selectedGender].gurmukhi}
                                </p>
                                <p className="text-lg text-purple-700 font-medium mb-2">
                                    {phrase[selectedGender].roman}
                                </p>
                                <p className="text-lg text-gray-700 mb-3">
                                    {phrase[selectedGender].english}
                                </p>
                                <button
                                    onClick={() => playAudio(phrase[selectedGender].audioFile, `work-${idx}-${selectedGender}`)}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                                        playingAudio === `work-${idx}-${selectedGender}`
                                            ? 'bg-purple-600 text-white'
                                            : 'bg-purple-200 text-purple-700 hover:bg-purple-300'
                                    }`}
                                >
                                    {playingAudio === `work-${idx}-${selectedGender}` ? <Pause size={18} /> : <Play size={18} />}
                                    <span>Listen</span>
                                </button>
                            </div>
                        ))}
                    </div>

                    {/* Vocabulary */}
                    <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
                        <h3 className="text-sm font-bold text-gray-700 mb-3 uppercase tracking-wide">Key Verbs</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {current.vocabulary.map((word, idx) => (
                                <div key={idx} className="flex items-center gap-3 p-3 bg-white rounded-lg">
                                    <div className="text-lg font-bold text-gray-900">{word.punjabi}</div>
                                    <div className="text-sm text-gray-600">{word.roman}</div>
                                    <div className="text-sm text-gray-700 ml-auto font-medium">{word.english}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            );
        }

        if (current.type === "family") {
            const IconComponent = current.icon;

            return (
                <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                            <IconComponent className="text-green-600" size={20} />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900">{current.title}</h2>
                            <p className="text-sm text-gray-600">{current.subtitle}</p>
                        </div>
                    </div>

                    {/* Examples */}
                    <div className="space-y-4 mb-6">
                        {current.examples.map((example, idx) => (
                            <div key={idx} className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-5 border-2 border-green-200">
                                <p className="text-xl font-bold text-gray-900 mb-2">{example.gurmukhi}</p>
                                <p className="text-base text-green-700 font-medium mb-1">{example.roman}</p>
                                <p className="text-base text-gray-700">{example.english}</p>
                            </div>
                        ))}
                    </div>

                    {/* Vocabulary */}
                    <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
                        <h3 className="text-sm font-bold text-gray-700 mb-3 uppercase tracking-wide">Family Vocabulary</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {current.vocabulary.map((word, idx) => (
                                <div key={idx} className="flex items-center gap-3 p-3 bg-white rounded-lg">
                                    <div className="text-lg font-bold text-gray-900">{word.punjabi}</div>
                                    <div className="text-sm text-gray-600">{word.roman}</div>
                                    <div className="text-sm text-gray-700 ml-auto font-medium">{word.english}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            );
        }

        if (current.type === "practice-builder") {
            return (
                <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center">
                            <CheckCircle className="text-orange-600" size={20} />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900">{current.title}</h2>
                            <p className="text-sm text-gray-600">{current.subtitle}</p>
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-5 mb-6 border-2 border-orange-200">
                        <p className="text-orange-900 font-medium text-center">
                            {current.scenario}
                        </p>
                    </div>

                    <div className="space-y-6">
                        {current.steps.map((practiceStep, idx) => {
                            const answered = practiceAnswers[practiceStep.id] !== undefined;
                            const selectedOption = practiceAnswers[practiceStep.id];

                            return (
                                <div key={practiceStep.id} className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl border-2 border-blue-200">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                                            {idx + 1}
                                        </div>
                                        <p className="text-lg font-semibold text-gray-900">{practiceStep.prompt}</p>
                                    </div>

                                    <div className="space-y-2">
                                        {practiceStep.options.map((option, oIdx) => {
                                            const isSelected = selectedOption === oIdx;
                                            const isCorrect = option.correct;

                                            return (
                                                <div key={oIdx}>
                                                    <button
                                                        onClick={() => handlePracticeAnswer(practiceStep.id, oIdx)}
                                                        disabled={answered}
                                                        className={`w-full p-4 rounded-lg text-left font-medium transition-all flex items-center gap-3 ${
                                                            answered && isSelected && isCorrect
                                                                ? 'bg-green-600 text-white'
                                                                : answered && isSelected && !isCorrect
                                                                    ? 'bg-red-100 border-2 border-red-500 text-red-800'
                                                                    : answered && isCorrect
                                                                        ? 'bg-green-100 border-2 border-green-500 text-green-800'
                                                                        : 'bg-white border-2 border-gray-300 text-gray-800 hover:border-blue-400 hover:bg-blue-50'
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
                                                            {practiceStep.explanation}
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
                    You can now introduce yourself in Panjabi!
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
                        onClick={() => router.push("/lessons/lesson4/")}
                        className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-blue-700 transition-all text-sm shadow-md"
                    >
                        <span>Continue to Next Lesson</span>
                        <ArrowRight size={18} />
                    </button>
                    <button
                        onClick={() => {
                            setStep(0);
                            setSelectedCategory(0);
                            setSelectedGender("male");
                            setPlayingAudio(null);
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
                        <span className="text-xs font-semibold uppercase tracking-wide">Lesson 2: A Bit About Me</span>
                    </div>
                    <h1 className="text-3xl font-bold mb-2">
                        A Bit About Me
                    </h1>
                    <p className="text-base text-blue-100">
                        Learn how to introduce yourself in Panjabi
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