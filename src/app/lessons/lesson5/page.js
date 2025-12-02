"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
    ArrowLeft,
    ArrowRight,
    Lightbulb,
    CheckCircle,
    RotateCcw,
    Trophy,
    MapPin,
    Award,
    Users,
    Heart,
    Sparkles,
    Info,
    Map
} from "lucide-react";
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null;

const lessonContent = [
    {
        type: "intro",
        title: "Cultural Tips & Nuances",
        content: "Master the cultural aspects that make Panjabi unique—from showing respect to understanding regional variations.",
        points: [
            "Using 'Ji' to show respect",
            "Formal vs informal 'You'",
            "Regional dialects of Punjab",
            "Cultural communication tips"
        ]
    },
    {
        type: "respect-guide",
        title: "Showing Respect with Ji (ਜੀ)",
        subtitle: "When and how to add Ji",
        explanation: "Adding 'Ji' at the end of names or titles is how Panjabi speakers show respect and honor. It's essential for polite, respectful communication.",
        examples: [
            {
                without: "Mata",
                with: "ਮਾਤਾ ਜੀ (Mata Ji)",
                english: "Respected Mother",
                icon: Heart
            },
            {
                without: "Pita",
                with: "ਪਿਤਾ ਜੀ (Pita Ji)",
                english: "Respected Father",
                icon: Users
            },
            {
                without: "Veer",
                with: "ਵੀਰ ਜੀ (Veer Ji)",
                english: "Respected Older Brother",
                icon: Award
            }
        ],
        rules: [
            "Always use Ji with elders (parents, grandparents)",
            "Use Ji in formal situations (teachers, respected community members)",
            "Optional with friends, but shows extra politeness",
            "Never wrong to add Ji—better to be more respectful"
        ]
    },
    {
        type: "formal-informal",
        title: "Formal vs Informal You",
        subtitle: "Tusi (ਤੁਸੀਂ) vs Tu (ਤੂੰ)",
        intro: "In Panjabi, how you say 'you' changes based on the person's age and your relationship with them.",
        comparison: {
            formal: {
                punjabi: "ਤੁਸੀਂ",
                roman: "Tusi",
                english: "You (formal/respectful)",
                use: "For elders and formal situations",
                color: "blue",
                examples: [
                    {
                        punjabi: "ਤੁਸੀਂ ਕਿਵੇਂ ਹੋ?",
                        roman: "Tusi kiven ho?",
                        english: "How are you? (to elders)"
                    }
                ],
                useCases: [
                    "Grandparents",
                    "Parents",
                    "Teachers",
                    "Anyone older than you",
                    "Strangers (to be polite)"
                ]
            },
            informal: {
                punjabi: "ਤੂੰ",
                roman: "Tu",
                english: "You (informal)",
                use: "For younger people or close friends",
                color: "orange",
                examples: [
                    {
                        punjabi: "ਤੂੰ ਕਿਵੇਂ ਹੈਂ?",
                        roman: "Tu kiven hain?",
                        english: "How are you? (to younger people)"
                    }
                ],
                useCases: [
                    "Younger siblings",
                    "Close friends (same age)",
                    "Children",
                    "Pets"
                ]
            }
        },
        tip: "When in doubt, always use Tusi (ਤੁਸੀਂ) - it's better to be too respectful than not respectful enough!"
    },
    {
        type: "scenario-practice",
        title: "Practice Scenarios",
        subtitle: "Choose the right form of 'You'",
        scenarios: [
            {
                id: 1,
                situation: "You're greeting your grandmother",
                person: "Grandmother",
                age: "Elder",
                options: [
                    { text: "Tusi kiven ho? (ਤੁਸੀਂ ਕਿਵੇਂ ਹੋ?)", correct: true, explanation: "Perfect! Always use Tusi with grandparents." },
                    { text: "Tu kiven hain? (ਤੂੰ ਕਿਵੇਂ ਹੈਂ?)", correct: false, explanation: "Never use Tu with elders—this would be disrespectful." }
                ]
            },
            {
                id: 2,
                situation: "You're talking to your younger brother",
                person: "Younger Brother",
                age: "Younger",
                options: [
                    { text: "Tusi kiven ho? (ਤੁਸੀਂ ਕਿਵੇਂ ਹੋ?)", correct: false, explanation: "Too formal for a younger sibling, though not wrong." },
                    { text: "Tu kiven hain? (ਤੂੰ ਕਿਵੇਂ ਹੈਂ?)", correct: true, explanation: "Correct! Use Tu with younger siblings." }
                ]
            },
            {
                id: 3,
                situation: "You're speaking to your teacher",
                person: "Teacher",
                age: "Elder/Authority",
                options: [
                    { text: "Tusi kiven ho? (ਤੁਸੀਂ ਕਿਵੇਂ ਹੋ?)", correct: true, explanation: "Excellent! Always use Tusi with teachers and authority figures." },
                    { text: "Tu kiven hain? (ਤੂੰ ਕਿਵੇਂ ਹੈਂ?)", correct: false, explanation: "This would be very disrespectful to a teacher." }
                ]
            },
            {
                id: 4,
                situation: "You're meeting someone new (similar age)",
                person: "New Acquaintance",
                age: "Similar age",
                options: [
                    { text: "Tusi kiven ho? (ਤੁਸੀਂ ਕਿਵੇਂ ਹੋ?)", correct: true, explanation: "Great choice! Use Tusi when meeting strangers to be polite." },
                    { text: "Tu kiven hain? (ਤੂੰ ਕਿਵੇਂ ਹੈਂ?)", correct: false, explanation: "Too informal for first meeting—might seem rude." }
                ]
            }
        ]
    },
    {
        type: "regional-dialects",
        title: "Regional Dialects of Punjab",
        subtitle: "Three main regions, three unique dialects",
        intro: "Punjab is divided into three regions, each with its own distinctive dialect. Don't worry if you hear different words for the same thing—this diversity makes Panjabi rich and beautiful!",
        regions: [
            {
                name: "Majha",
                punjabi: "ਮਾਝਾ",
                roman: "Majha",
                description: "Central region",
                cities: ["Amritsar", "Lahore", "Gurdaspur"],
                color: "blue",
                icon: MapPin,
                characteristics: "Considered the 'standard' Panjabi; clear pronunciation"
            },
            {
                name: "Doaba",
                punjabi: "ਦੋਆਬਾ",
                roman: "Doaba",
                description: "Land between two rivers",
                cities: ["Jalandhar", "Hoshiarpur", "Kapurthala"],
                color: "green",
                icon: Map,
                characteristics: "Known for softer tones and unique vocabulary"
            },
            {
                name: "Malwa",
                punjabi: "ਮਾਲਵਾ",
                roman: "Malwa",
                description: "Southern region",
                cities: ["Ludhiana", "Patiala", "Bathinda"],
                color: "orange",
                icon: MapPin,
                characteristics: "Most widely spoken; distinct accent and expressions"
            }
        ],
        note: "Future lessons will highlight regional variations so you can understand different dialects!"
    },
    {
        type: "final-quiz",
        title: "Test Your Knowledge",
        questions: [
            {
                question: "Why do we add 'Ji' (ਜੀ) to names in Panjabi?",
                options: [
                    { text: "To make the name sound longer", correct: false },
                    { text: "To convey respect", correct: true },
                    { text: "To indicate the person is a family member", correct: false }
                ]
            },
            {
                question: "Which pronoun should you use when speaking to your grandmother?",
                options: [
                    { text: "Tu (ਤੂੰ) - informal", correct: false },
                    { text: "Tusi (ਤੁਸੀਂ) - formal", correct: true },
                    { text: "Either one is fine", correct: false }
                ]
            },
            {
                question: "How many main regional dialects does Punjab have?",
                options: [
                    { text: "Two dialects", correct: false },
                    { text: "Three dialects", correct: true },
                    { text: "Five dialects", correct: false }
                ]
            },
            {
                question: "Which region is known as 'land between two rivers'?",
                options: [
                    { text: "Majha", correct: false },
                    { text: "Doaba", correct: true },
                    { text: "Malwa", correct: false }
                ]
            }
        ]
    }
];

export default function Lesson5() {
    const router = useRouter();
    const [step, setStep] = useState(0);
    const [userId, setUserId] = useState(null);
    const [lessonCompleted, setLessonCompleted] = useState(false);

    // Scenario practice state
    const [scenarioAnswers, setScenarioAnswers] = useState({});
    const [scenarioComplete, setScenarioComplete] = useState(false);

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

    // Calculate quiz statistics
    const calculateScore = () => {
        let correct = 0;
        let total = 0;

        if (quizComplete) {
            lessonContent[4].questions.forEach((q, idx) => {
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
                    lesson_id: 'lesson-5-tips',
                    lesson_name: 'Cultural Tips & Nuances',
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
        if (current.type === 'scenario-practice' && !scenarioComplete) return false;
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

    // Scenario practice logic
    const handleScenarioAnswer = (scenarioId, optionIndex) => {
        if (scenarioAnswers[scenarioId] !== undefined) return;

        const newAnswers = { ...scenarioAnswers, [scenarioId]: optionIndex };
        setScenarioAnswers(newAnswers);

        if (Object.keys(newAnswers).length === current.scenarios.length) {
            setScenarioComplete(true);
        }
    };

    const renderContent = () => {
        if (current.type === "intro") {
            return (
                <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-orange-500 rounded-xl flex items-center justify-center">
                            <Lightbulb className="text-white" size={24} />
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

        if (current.type === "respect-guide") {
            return (
                <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                            <Sparkles className="text-purple-600" size={20} />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900">{current.title}</h2>
                            <p className="text-sm text-gray-600">{current.subtitle}</p>
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-5 mb-6 border-2 border-purple-200">
                        <p className="text-purple-900 font-medium">{current.explanation}</p>
                    </div>

                    <div className="space-y-4 mb-6">
                        {current.examples.map((example, idx) => {
                            const IconComponent = example.icon;
                            return (
                                <div key={idx} className="flex items-center gap-4 p-5 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl border-2 border-blue-200">
                                    <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center flex-shrink-0">
                                        <IconComponent className="text-white" size={24} />
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-1">
                                            <span className="text-gray-600 line-through">{example.without}</span>
                                            <ArrowRight size={16} className="text-gray-400" />
                                            <span className="text-xl font-bold text-blue-900">{example.with}</span>
                                        </div>
                                        <p className="text-sm text-gray-700">{example.english}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-5 border-2 border-green-200">
                        <h3 className="text-sm font-bold text-green-900 mb-3 uppercase tracking-wide">When to Use Ji</h3>
                        <div className="space-y-2">
                            {current.rules.map((rule, idx) => (
                                <div key={idx} className="flex items-start gap-2">
                                    <CheckCircle size={18} className="text-green-600 flex-shrink-0 mt-0.5" />
                                    <p className="text-sm text-green-900">{rule}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            );
        }

        if (current.type === "formal-informal") {
            return (
                <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                            <Users className="text-blue-600" size={20} />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900">{current.title}</h2>
                            <p className="text-sm text-gray-600">{current.subtitle}</p>
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl p-5 mb-6 border-2 border-yellow-200">
                        <p className="text-yellow-900 font-medium">{current.intro}</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        {/* Formal */}
                        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border-2 border-blue-200">
                            <h3 className="text-xl font-bold text-blue-900 mb-3">Formal (Respectful)</h3>
                            <div className="bg-white rounded-lg p-4 mb-4 border-2 border-blue-300">
                                <p className="text-2xl font-bold text-blue-900 mb-1">{current.comparison.formal.punjabi}</p>
                                <p className="text-lg text-blue-700 font-medium mb-1">{current.comparison.formal.roman}</p>
                                <p className="text-sm text-gray-700">{current.comparison.formal.english}</p>
                            </div>

                            <div className="mb-4">
                                <h4 className="text-sm font-bold text-blue-800 mb-2 uppercase tracking-wide">Example</h4>
                                <div className="bg-blue-200 rounded-lg p-3">
                                    <p className="font-bold text-blue-900">{current.comparison.formal.examples[0].punjabi}</p>
                                    <p className="text-sm text-blue-800">{current.comparison.formal.examples[0].roman}</p>
                                    <p className="text-sm text-gray-700">{current.comparison.formal.examples[0].english}</p>
                                </div>
                            </div>

                            <div>
                                <h4 className="text-sm font-bold text-blue-800 mb-2 uppercase tracking-wide">Use With</h4>
                                <div className="space-y-1">
                                    {current.comparison.formal.useCases.map((useCase, idx) => (
                                        <div key={idx} className="flex items-center gap-2">
                                            <CheckCircle size={16} className="text-blue-600 flex-shrink-0" />
                                            <p className="text-sm text-blue-900">{useCase}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Informal */}
                        <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-6 border-2 border-orange-200">
                            <h3 className="text-xl font-bold text-orange-900 mb-3">Informal (Casual)</h3>
                            <div className="bg-white rounded-lg p-4 mb-4 border-2 border-orange-300">
                                <p className="text-2xl font-bold text-orange-900 mb-1">{current.comparison.informal.punjabi}</p>
                                <p className="text-lg text-orange-700 font-medium mb-1">{current.comparison.informal.roman}</p>
                                <p className="text-sm text-gray-700">{current.comparison.informal.english}</p>
                            </div>

                            <div className="mb-4">
                                <h4 className="text-sm font-bold text-orange-800 mb-2 uppercase tracking-wide">Example</h4>
                                <div className="bg-orange-200 rounded-lg p-3">
                                    <p className="font-bold text-orange-900">{current.comparison.informal.examples[0].punjabi}</p>
                                    <p className="text-sm text-orange-800">{current.comparison.informal.examples[0].roman}</p>
                                    <p className="text-sm text-gray-700">{current.comparison.informal.examples[0].english}</p>
                                </div>
                            </div>

                            <div>
                                <h4 className="text-sm font-bold text-orange-800 mb-2 uppercase tracking-wide">Use With</h4>
                                <div className="space-y-1">
                                    {current.comparison.informal.useCases.map((useCase, idx) => (
                                        <div key={idx} className="flex items-center gap-2">
                                            <CheckCircle size={16} className="text-orange-600 flex-shrink-0" />
                                            <p className="text-sm text-orange-900">{useCase}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r">
                        <div className="flex items-start gap-2">
                            <Info size={20} className="text-yellow-600 flex-shrink-0 mt-0.5" />
                            <div>
                                <p className="text-sm font-semibold text-yellow-900 mb-1">Pro Tip</p>
                                <p className="text-sm text-yellow-800">{current.tip}</p>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }

        if (current.type === "scenario-practice") {
            return (
                <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                            <Award className="text-green-600" size={20} />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900">{current.title}</h2>
                            <p className="text-sm text-gray-600">{current.subtitle}</p>
                        </div>
                    </div>

                    <div className="space-y-6">
                        {current.scenarios.map((scenario, idx) => {
                            const answered = scenarioAnswers[scenario.id] !== undefined;
                            const selectedOption = scenarioAnswers[scenario.id];

                            return (
                                <div key={scenario.id} className="p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-xl border-2 border-green-200">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                                            {idx + 1}
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-lg font-semibold text-gray-900">{scenario.situation}</p>
                                            <p className="text-sm text-gray-600">Speaking to: {scenario.person} ({scenario.age})</p>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        {scenario.options.map((option, oIdx) => {
                                            const isSelected = selectedOption === oIdx;
                                            const isCorrect = option.correct;

                                            return (
                                                <div key={oIdx}>
                                                    <button
                                                        onClick={() => handleScenarioAnswer(scenario.id, oIdx)}
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

        if (current.type === "regional-dialects") {
            return (
                <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center">
                            <MapPin className="text-orange-600" size={20} />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900">{current.title}</h2>
                            <p className="text-sm text-gray-600">{current.subtitle}</p>
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-5 mb-6 border-2 border-orange-200">
                        <p className="text-orange-900 font-medium">{current.intro}</p>
                    </div>

                    <div className="space-y-4 mb-6">
                        {current.regions.map((region, idx) => {
                            const IconComponent = region.icon;
                            const colorClasses = {
                                blue: 'from-blue-50 to-blue-100 border-blue-200',
                                green: 'from-green-50 to-green-100 border-green-200',
                                orange: 'from-orange-50 to-orange-100 border-orange-200'
                            };
                            const iconColorClasses = {
                                blue: 'bg-blue-500',
                                green: 'bg-green-500',
                                orange: 'bg-orange-500'
                            };
                            const textColorClasses = {
                                blue: 'text-blue-900',
                                green: 'text-green-900',
                                orange: 'text-orange-900'
                            };

                            return (
                                <div key={idx} className={`bg-gradient-to-r ${colorClasses[region.color]} rounded-xl p-6 border-2`}>
                                    <div className="flex items-center gap-4 mb-3">
                                        <div className={`w-12 h-12 ${iconColorClasses[region.color]} rounded-xl flex items-center justify-center flex-shrink-0`}>
                                            <IconComponent className="text-white" size={24} />
                                        </div>
                                        <div>
                                            <h3 className={`text-2xl font-bold ${textColorClasses[region.color]}`}>
                                                {region.punjabi} ({region.roman})
                                            </h3>
                                            <p className="text-sm text-gray-700">{region.description}</p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4 mb-3">
                                        <div>
                                            <h4 className={`text-xs font-bold ${textColorClasses[region.color]} uppercase tracking-wide mb-2`}>Major Cities</h4>
                                            <div className="space-y-1">
                                                {region.cities.map((city, cIdx) => (
                                                    <div key={cIdx} className="flex items-center gap-2">
                                                        <MapPin size={14} className="text-gray-600" />
                                                        <span className="text-sm text-gray-800">{city}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                        <div>
                                            <h4 className={`text-xs font-bold ${textColorClasses[region.color]} uppercase tracking-wide mb-2`}>Characteristics</h4>
                                            <p className="text-sm text-gray-700">{region.characteristics}</p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    <div className="bg-purple-50 border-l-4 border-purple-400 p-4 rounded-r">
                        <div className="flex items-start gap-2">
                            <Info size={20} className="text-purple-600 flex-shrink-0 mt-0.5" />
                            <p className="text-sm text-purple-900">{current.note}</p>
                        </div>
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
                    You've learned the cultural nuances of Panjabi!
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
                        onClick={() => router.push("/learning/essential-punjabi")}
                        className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-blue-700 transition-all text-sm shadow-md"
                    >
                        <span>Back to Lesson Overview</span>
                        <ArrowRight size={18} />
                    </button>
                    <button
                        onClick={() => {
                            setStep(0);
                            setScenarioAnswers({});
                            setScenarioComplete(false);
                            setQuizAnswers([]);
                            setQuizComplete(false);
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
                <button
                    onClick={() => router.push("/learning/essential-punjabi")}
                    className="mb-6 flex items-center gap-2 text-gray-600 hover:text-blue-600 font-semibold transition-colors text-sm"
                >
                    <ArrowLeft size={18} />
                    <span>Back to Lessons</span>
                </button>

                <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-6 text-white shadow-lg mb-6">
                    <div className="flex items-center gap-2 mb-2">
                        <Lightbulb size={18} />
                        <span className="text-xs font-semibold uppercase tracking-wide">Lesson 5: Cultural Tips</span>
                    </div>
                    <h1 className="text-3xl font-bold mb-2">
                        Top Tips & Cultural Nuances
                    </h1>
                    <p className="text-base text-blue-100">
                        Master respect, formality, and regional variations
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