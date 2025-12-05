"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
    ArrowLeft,
    ArrowRight,
    Users,
    CheckCircle,
    X,
    RotateCcw,
    Trophy,
    Heart,
    UserCircle,
    Award,
    Sparkles,
    Info,
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
        title: "Family and Friends",
        content: "In this section, we will walk through the Panjabi words for family members and friends so that you are never stuck when it comes to describing your relations with people.         " +
            "                  You will learn the following:",
        points: [
            "Immediate family terms",
            "Why 'Ji' shows respect",
            "Maternal vs paternal relatives",
            "Visual family tree"
        ]
    },
    {
        type: "immediate-family",
        title: "Core Family",
        subtitle: "Parents and siblings",
        categories: [
            {
                id: "mother",
                title: "Mother",
                icon: Heart,
                terms: [
                    { punjabi: "ਮਾਤਾ ਜੀ", roman: "Mata Ji", english: "Mother (respectful)" },
                    { punjabi: "ਮਾ", roman: "Ma", english: "Mum" },
                  //  { /punjabi: "ਬੇਬੇ", roman: "Bebe", english: "Mother/Grandmother" }//
                ],
                note: "Whats the difference between the two?  " +
                    "- Ma (ਮਾ) is more commonly used in everyday conversations." +
                    "If you want to go rhe extra mile you can also refer to Mother as Bebe"
            },
            {
                id: "father",
                title: "Father",
                icon: UserCircle,
                terms: [
                    { punjabi: "ਪਿਤਾ ਜੀ", roman: "Pita Ji", english: "Father (respectful)" },
                    { punjabi: "ਬਾਪੂ", roman: "Bapu", english: "Dad" },
                    { punjabi: "ਪਾਪਾ", roman: "Papa", english: "Dad" }
                ],
                tip: "'Ji' at the end conveys respect and honor"
            },
            {
                id: "siblings",
                title: "Siblings",
                icon: Users,
                terms: [
                    { punjabi: "ਭਰਾ", roman: "Bhrā", english: "Brother" },
                    { punjabi: "ਵੀਰ ਜੀ", roman: "Veer Ji", english: "Older brother (respectful)" },
                    { punjabi: "ਭੈਣ", roman: "Bhain", english: "Sister" },
                    { punjabi: "ਦੀਦੀ", roman: "Didi", english: "Older sister (affectionate)" },
                    { punjabi: "ਭੈਣ ਜੀ", roman: "Bhain Ji", english: "Sister (respectful)" }
                ],
                note: "Veer Ji and Didi are specifically for OLDER siblings"
            }
        ]
    },
    {
        type: "side-comparison",
        title: "Maternal vs Paternal",
        subtitle: "The key difference in Panjabi family terms",
        intro: "Unlike English, Panjabi has specific words for each family member depending on whether they're on your mother's or father's side.",
        maternal: {
            title: "Mother's Side",
            color: "pink",
            grandparents: [
                { punjabi: "ਨਾਨੀ", roman: "Nānī", english: "Mum's mum" },
                { punjabi: "ਨਾਨਾ", roman: "Nānā", english: "Mum's dad" }
            ],
            auntsUncles: [
                { punjabi: "ਮਾਮਾ", roman: "Mama", english: "Mum's brother" },
                { punjabi: "ਮਾਮੀ", roman: "Mami", english: "Mama's wife" },
                { punjabi: "ਮਾਸੀ", roman: "Masi", english: "Mum's sister" },
                { punjabi: "ਮਾਸੜ", roman: "Masaṛ", english: "Masi's husband" }
            ],
            note: "All mum's brothers are 'Mama' regardless of age"
        },
        paternal: {
            title: "Father's Side",
            color: "blue",
            grandparents: [
                { punjabi: "ਦਾਦੀ", roman: "Dādī", english: "Dad's mum" },
                { punjabi: "ਦਾਦਾ", roman: "Dādā", english: "Dad's dad" }
            ],
            auntsUncles: [
                { punjabi: "ਤਾਇਆ", roman: "Tāyā", english: "Dad's OLDER brother" },
                { punjabi: "ਤਾਈ ਜੀ", roman: "Taī jī", english: "Taya's wife" },
                { punjabi: "ਚਾਚਾ", roman: "Chacha", english: "Dad's YOUNGER brother" },
                { punjabi: "ਚਾਚੀ", roman: "Chachi", english: "Chacha's wife" },
                { punjabi: "ਭੂਆ", roman: "Bhūā", english: "Dad's sister" },
                { punjabi: "ਫੁਫੜ", roman: "Phuphṛ", english: "Bhua's husband" }
            ],
            note: "Dad's side distinguishes between OLDER (Taya) and YOUNGER (Chacha) brothers"
        }
    },
    {
        type: "family-tree",
        title: "Visual Family Tree",
        subtitle: "See how all the terms connect",
        tree: {
            maternal: [
                { term: "Nānī", relation: "Mum's mum", level: "grandparent" },
                { term: "Nānā", relation: "Mum's dad", level: "grandparent" },
                { term: "Mama", relation: "Mum's brother", level: "aunt-uncle" },
                { term: "Masi", relation: "Mum's sister", level: "aunt-uncle" }
            ],
            paternal: [
                { term: "Dādī", relation: "Dad's mum", level: "grandparent" },
                { term: "Dādā", relation: "Dad's dad", level: "grandparent" },
                { term: "Tāyā", relation: "Dad's older brother", level: "aunt-uncle" },
                { term: "Chacha", relation: "Dad's younger brother", level: "aunt-uncle" },
                { term: "Bhūā", relation: "Dad's sister", level: "aunt-uncle" }
            ]
        }
    },
    {
        type: "matching-game",
        title: "Match the Relatives",
        subtitle: "Test your knowledge",
        rounds: [
            {
                id: 1,
                question: "Match the maternal relatives",
                pairs: [
                    { term: "Nānī", definition: "Mum's mum" },
                    { term: "Mama", definition: "Mum's brother" },
                    { term: "Masi", definition: "Mum's sister" }
                ]
            },
            {
                id: 2,
                question: "Match the paternal relatives",
                pairs: [
                    { term: "Dādī", definition: "Dad's mum" },
                    { term: "Tāyā", definition: "Dad's older brother" },
                    { term: "Chacha", definition: "Dad's younger brother" }
                ]
            }
        ]
    },
    {
        type: "final-quiz",
        title: "Test Your Knowledge",
        questions: [
            {
                question: "Why do we add 'Ji' at the end of a word in Panjabi?",
                options: [
                    { text: "To convey respect", correct: true },
                    { text: "To ask a question", correct: false },
                    { text: "To make a joke", correct: false }
                ]
            },
            {
                question: "What do we call our mum's mother?",
                options: [
                    { text: "Dadi", correct: false },
                    { text: "Nani", correct: true },
                    { text: "Nana", correct: false }
                ]
            },
            {
                question: "What is a Mama?",
                options: [
                    { text: "Your mum's older brother's wife", correct: false },
                    { text: "Your mum's brother", correct: true },
                    { text: "Your dad's brother", correct: false }
                ]
            },
            {
                question: "What do we call our Dad's mum?",
                options: [
                    { text: "Dadi", correct: true },
                    { text: "Nani", correct: false },
                    { text: "Nana", correct: false }
                ]
            },
            {
                question: "What is the difference between Taya and Chacha?",
                options: [
                    { text: "Taya is older, Chacha is younger", correct: true },
                    { text: "Taya is on mum's side, Chacha is on dad's side", correct: false },
                    { text: "There is no difference", correct: false }
                ]
            },
            {
                question: "Which of these is your Dad's sister?",
                options: [
                    { text: "Masi", correct: false },
                    { text: "Bhua", correct: true },
                    { text: "Chachi", correct: false }
                ]
            },
            {
                question: "Who is your Mama's wife?",
                options: [
                    { text: "Mami", correct: true },
                    { text: "Masi", correct: false },
                    { text: "Chachi", correct: false }
                ]
            }
        ]
    }
];

export default function Lesson4FamilyAndFriends() {
    const router = useRouter();
    const [step, setStep] = useState(0);
    const [userId, setUserId] = useState(null);
    const [lessonCompleted, setLessonCompleted] = useState(false);

    // Immediate family state
    const [selectedCategory, setSelectedCategory] = useState(0);

    // Matching game state
    const [currentRound, setCurrentRound] = useState(0);
    const [matchingAnswers, setMatchingAnswers] = useState({});
    const [matchingComplete, setMatchingComplete] = useState(false);
    const [roundsCompleted, setRoundsCompleted] = useState([]);
    const [shuffledDefinitions, setShuffledDefinitions] = useState([]);

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
        if (current?.type === 'matching-game' && shuffledDefinitions.length === 0) {
            const round = current.rounds[currentRound];
            const definitions = round.pairs.map(p => p.definition);
            setShuffledDefinitions([...definitions].sort(() => Math.random() - 0.5));
        }
    }, [current, currentRound, shuffledDefinitions.length]);

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
                    lesson_id: 'lesson-4-family',
                    lesson_name: 'Family and Friends',
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
        if (current.type === 'matching-game' && !matchingComplete) return false;
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
        const round = current.rounds[currentRound];
        if (Object.values(matchingAnswers).includes(definition)) return;

        const unansweredTerms = round.pairs.filter(pair => !matchingAnswers[pair.term]);
        if (unansweredTerms.length === 0) return;

        const currentTerm = unansweredTerms[0].term;
        const newAnswers = { ...matchingAnswers, [currentTerm]: definition };
        setMatchingAnswers(newAnswers);

        // Check if round is complete and correct
        if (Object.keys(newAnswers).length === round.pairs.length) {
            const allCorrect = round.pairs.every(pair => newAnswers[pair.term] === pair.definition);

            if (allCorrect) {
                setRoundsCompleted([...roundsCompleted, currentRound]);

                // Check if all rounds are complete
                if (currentRound === current.rounds.length - 1) {
                    setMatchingComplete(true);
                }
            }
        }
    };

    const nextRound = () => {
        if (currentRound < current.rounds.length - 1) {
            setCurrentRound(currentRound + 1);
            setMatchingAnswers({});
            setShuffledDefinitions([]);
        }
    };

    const resetRound = () => {
        setMatchingAnswers({});
        setShuffledDefinitions([...current.rounds[currentRound].pairs.map(p => p.definition)].sort(() => Math.random() - 0.5));
    };

    const renderContent = () => {
        if (current.type === "intro") {
            return (
                <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-orange-500 rounded-xl flex items-center justify-center">
                            <Users className="text-white" size={24} />
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

        if (current.type === "immediate-family") {
            const category = current.categories[selectedCategory];
            const IconComponent = category.icon;

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

                    {/* Terms Display */}
                    <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 border-2 border-gray-200">
                        <div className="flex items-center gap-3 mb-5">
                            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm">
                                <IconComponent className="text-blue-600" size={24} />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900">{category.title}</h3>
                        </div>

                        <div className="space-y-3 mb-4">
                            {category.terms.map((term, idx) => (
                                <div key={idx} className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200">
                                    <div className="flex-1">
                                        <p className="text-xl font-bold text-gray-900">{term.punjabi}</p>
                                        <p className="text-sm text-blue-700 font-medium">{term.roman}</p>
                                    </div>
                                    <p className="text-sm text-gray-700 font-medium">{term.english}</p>
                                </div>
                            ))}
                        </div>

                        {category.note && (
                            <div className="bg-blue-50 border-l-4 border-blue-400 p-3 rounded-r">
                                <p className="text-sm text-blue-900">{category.note}</p>
                            </div>
                        )}

                        {category.tip && (
                            <div className="mt-3 bg-yellow-50 border-l-4 border-yellow-400 p-3 rounded-r">
                                <div className="flex items-start gap-2">
                                    <Info size={18} className="text-yellow-600 flex-shrink-0 mt-0.5" />
                                    <div>
                                        <p className="text-sm font-semibold text-yellow-900">{category.tip}</p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            );
        }

        if (current.type === "side-comparison") {
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
                        <p className="text-purple-900 font-medium text-center">{current.intro}</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Maternal Side */}
                        <div className="bg-gradient-to-br from-pink-50 to-pink-100 rounded-xl p-6 border-2 border-pink-200">
                            <h3 className="text-xl font-bold text-pink-900 mb-4">{current.maternal.title}</h3>

                            <div className="mb-4">
                                <h4 className="text-sm font-bold text-pink-800 mb-2 uppercase tracking-wide">Grandparents</h4>
                                <div className="space-y-2">
                                    {current.maternal.grandparents.map((gp, idx) => (
                                        <div key={idx} className="bg-white rounded-lg p-3 border border-pink-200">
                                            <p className="font-bold text-gray-900">{gp.punjabi} <span className="text-pink-700 text-sm">({gp.roman})</span></p>
                                            <p className="text-sm text-gray-700">{gp.english}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="mb-3">
                                <h4 className="text-sm font-bold text-pink-800 mb-2 uppercase tracking-wide">Aunts & Uncles</h4>
                                <div className="space-y-2">
                                    {current.maternal.auntsUncles.map((au, idx) => (
                                        <div key={idx} className="bg-white rounded-lg p-3 border border-pink-200">
                                            <p className="font-bold text-gray-900">{au.punjabi} <span className="text-pink-700 text-sm">({au.roman})</span></p>
                                            <p className="text-sm text-gray-700">{au.english}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="bg-pink-200 rounded-lg p-3">
                                <p className="text-xs text-pink-900 font-medium">{current.maternal.note}</p>
                            </div>
                        </div>

                        {/* Paternal Side */}
                        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border-2 border-blue-200">
                            <h3 className="text-xl font-bold text-blue-900 mb-4">{current.paternal.title}</h3>

                            <div className="mb-4">
                                <h4 className="text-sm font-bold text-blue-800 mb-2 uppercase tracking-wide">Grandparents</h4>
                                <div className="space-y-2">
                                    {current.paternal.grandparents.map((gp, idx) => (
                                        <div key={idx} className="bg-white rounded-lg p-3 border border-blue-200">
                                            <p className="font-bold text-gray-900">{gp.punjabi} <span className="text-blue-700 text-sm">({gp.roman})</span></p>
                                            <p className="text-sm text-gray-700">{gp.english}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="mb-3">
                                <h4 className="text-sm font-bold text-blue-800 mb-2 uppercase tracking-wide">Aunts & Uncles</h4>
                                <div className="space-y-2">
                                    {current.paternal.auntsUncles.map((au, idx) => (
                                        <div key={idx} className="bg-white rounded-lg p-3 border border-blue-200">
                                            <p className="font-bold text-gray-900">{au.punjabi} <span className="text-blue-700 text-sm">({au.roman})</span></p>
                                            <p className="text-sm text-gray-700">{au.english}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="bg-blue-200 rounded-lg p-3">
                                <p className="text-xs text-blue-900 font-medium">{current.paternal.note}</p>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }

        if (current.type === "family-tree") {
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

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Maternal Tree */}
                        <div className="bg-gradient-to-br from-pink-50 to-pink-100 rounded-xl p-6 border-2 border-pink-200">
                            <h3 className="text-lg font-bold text-pink-900 mb-4 text-center">Maternal Side</h3>
                            <div className="space-y-2">
                                {current.tree.maternal.map((member, idx) => (
                                    <div
                                        key={idx}
                                        className={`p-4 rounded-lg border-2 ${
                                            member.level === 'grandparent'
                                                ? 'bg-pink-200 border-pink-400'
                                                : 'bg-pink-100 border-pink-300'
                                        }`}
                                    >
                                        <p className="font-bold text-pink-900 text-lg">{member.term}</p>
                                        <p className="text-sm text-pink-800">{member.relation}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Paternal Tree */}
                        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border-2 border-blue-200">
                            <h3 className="text-lg font-bold text-blue-900 mb-4 text-center">Paternal Side</h3>
                            <div className="space-y-2">
                                {current.tree.paternal.map((member, idx) => (
                                    <div
                                        key={idx}
                                        className={`p-4 rounded-lg border-2 ${
                                            member.level === 'grandparent'
                                                ? 'bg-blue-200 border-blue-400'
                                                : 'bg-blue-100 border-blue-300'
                                        }`}
                                    >
                                        <p className="font-bold text-blue-900 text-lg">{member.term}</p>
                                        <p className="text-sm text-blue-800">{member.relation}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 bg-green-50 border-l-4 border-green-400 p-4 rounded-r">
                        <div className="flex items-start gap-2">
                            <Info size={20} className="text-green-600 flex-shrink-0 mt-0.5" />
                            <div>
                                <p className="text-sm font-semibold text-green-900 mb-1">Pro Tip</p>
                                <p className="text-sm text-green-800">
                                    The key to mastering Panjabi family terms is remembering that maternal and paternal sides have completely different words. Practice by labeling your own family tree!
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }

        if (current.type === "matching-game") {
            const round = current.rounds[currentRound];
            const isRoundComplete = roundsCompleted.includes(currentRound);
            const allRoundsComplete = roundsCompleted.length === current.rounds.length;

            return (
                <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center">
                            <Trophy className="text-orange-600" size={20} />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900">{current.title}</h2>
                            <p className="text-sm text-gray-600">{current.subtitle}</p>
                        </div>
                    </div>

                    {/* Round Progress */}
                    <div className="flex items-center justify-center gap-2 mb-6">
                        {current.rounds.map((_, idx) => (
                            <div
                                key={idx}
                                className={`w-3 h-3 rounded-full ${
                                    roundsCompleted.includes(idx)
                                        ? 'bg-green-500'
                                        : idx === currentRound
                                            ? 'bg-blue-500'
                                            : 'bg-gray-300'
                                }`}
                            />
                        ))}
                    </div>

                    <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-5 mb-6 border-2 border-orange-200">
                        <p className="text-orange-900 font-semibold text-center text-lg">{round.question}</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <div className="space-y-3">
                            <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wide mb-3">Terms</h3>
                            {round.pairs.map((pair, idx) => {
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
                            <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wide mb-3">Definitions</h3>
                            {shuffledDefinitions.map((definition, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => handleMatchingSelect(definition)}
                                    disabled={Object.values(matchingAnswers).includes(definition) || isRoundComplete}
                                    className={`w-full p-4 rounded-xl font-medium text-center transition-all ${
                                        Object.values(matchingAnswers).includes(definition) || isRoundComplete
                                            ? 'bg-gray-200 text-gray-400 cursor-not-allowed border-2 border-gray-300'
                                            : 'bg-orange-50 border-2 border-orange-300 text-orange-800 hover:bg-orange-100 hover:border-orange-400'
                                    }`}
                                >
                                    {definition}
                                </button>
                            ))}
                        </div>
                    </div>

                    {isRoundComplete && !allRoundsComplete && (
                        <div className="bg-green-50 border-2 border-green-500 rounded-xl p-4 text-center mb-4">
                            <CheckCircle className="inline-block text-green-600 mb-2" size={32} />
                            <p className="text-green-800 font-semibold mb-3">Perfect! Round {currentRound + 1} complete!</p>
                            <button
                                onClick={nextRound}
                                className="bg-green-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-700 transition-colors"
                            >
                                Next Round
                            </button>
                        </div>
                    )}

                    {allRoundsComplete && (
                        <div className="bg-green-50 border-2 border-green-500 rounded-xl p-4 text-center">
                            <Trophy className="inline-block text-green-600 mb-2" size={40} />
                            <p className="text-green-800 font-bold text-lg">All rounds complete! You've mastered family terms!</p>
                        </div>
                    )}

                    {Object.keys(matchingAnswers).length === round.pairs.length && !isRoundComplete && (
                        <div className="bg-red-50 border-2 border-red-500 rounded-xl p-4 text-center">
                            <X className="inline-block text-red-600 mb-2" size={32} />
                            <p className="text-red-800 font-semibold mb-3">Not quite right. Try again!</p>
                            <button
                                onClick={resetRound}
                                className="bg-red-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-red-700 transition-colors"
                            >
                                Reset Round
                            </button>
                        </div>
                    )}
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
                    You've mastered Panjabi family terms!
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
                        onClick={() => router.push("/lessons/lesson5/")}
                        className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-blue-700 transition-all text-sm shadow-md"
                    >
                        <span>Continue to Next Lesson</span>
                        <ArrowRight size={18} />
                    </button>
                    <button
                        onClick={() => {
                            setStep(0);
                            setSelectedCategory(0);
                            setCurrentRound(0);
                            setMatchingAnswers({});
                            setMatchingComplete(false);
                            setRoundsCompleted([]);
                            setShuffledDefinitions([]);
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
                        <Users size={18} />
                        <span className="text-xs font-semibold uppercase tracking-wide">Lesson 4: Family Vocabulary</span>
                    </div>
                    <h1 className="text-3xl font-bold mb-2">
                        Family and Friends
                    </h1>
                    <p className="text-base text-blue-100">
                        Master the precise terms for maternal and paternal relatives
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