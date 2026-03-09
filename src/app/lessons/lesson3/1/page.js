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
    Info,
    BookOpen
} from "lucide-react";
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null;

const lessonContent = [
    {
        type: "intro",
        title: "Family and Friends",
        content: "In this section, we will walk through the Panjabi words for family members and friends so that you are never stuck when it comes to describing your relations with people. You will learn the following:",
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
                    { punjabi: "ਮਾ", roman: "Ma", english: "Mum" }
                ],
                note: "What's the difference between the two? Ma (ਮਾ) is more commonly used in everyday conversations. If you want to go the extra mile you can also refer to Mother as Bebe."
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
            { id: 1, question: "Match the maternal relatives", pairs: [
                    { term: "Nānī", definition: "Mum's mum" },
                    { term: "Mama", definition: "Mum's brother" },
                    { term: "Masi", definition: "Mum's sister" }
                ]},
            { id: 2, question: "Match the paternal relatives", pairs: [
                    { term: "Dādī", definition: "Dad's mum" },
                    { term: "Tāyā", definition: "Dad's older brother" },
                    { term: "Chacha", definition: "Dad's younger brother" }
                ]}
        ]
    },
    {
        type: "final-quiz",
        title: "Test Your Knowledge",
        subtitle: "Choose the correct answer for each question",
        questions: [
            { question: "Why do we add 'Ji' at the end of a word in Panjabi?", options: [
                    { text: "To convey respect", correct: true },
                    { text: "To ask a question", correct: false },
                    { text: "To make a joke", correct: false }
                ]},
            { question: "What do we call our mum's mother?", options: [
                    { text: "Dadi", correct: false },
                    { text: "Nani", correct: true },
                    { text: "Nana", correct: false }
                ]},
            { question: "What is a Mama?", options: [
                    { text: "Your mum's older brother's wife", correct: false },
                    { text: "Your mum's brother", correct: true },
                    { text: "Your dad's brother", correct: false }
                ]},
            { question: "What do we call our Dad's mum?", options: [
                    { text: "Dadi", correct: true },
                    { text: "Nani", correct: false },
                    { text: "Nana", correct: false }
                ]},
            { question: "What is the difference between Taya and Chacha?", options: [
                    { text: "Taya is older, Chacha is younger", correct: true },
                    { text: "Taya is on mum's side, Chacha is on dad's side", correct: false },
                    { text: "There is no difference", correct: false }
                ]},
            { question: "Which of these is your Dad's sister?", options: [
                    { text: "Masi", correct: false },
                    { text: "Bhua", correct: true },
                    { text: "Chachi", correct: false }
                ]},
            { question: "Who is your Mama's wife?", options: [
                    { text: "Mami", correct: true },
                    { text: "Masi", correct: false },
                    { text: "Chachi", correct: false }
                ]}
        ]
    }
];

export default function Lesson4FamilyAndFriends() {
    const router = useRouter();
    const [step, setStep] = useState(0);
    const [userId, setUserId] = useState(null);
    const [lessonCompleted, setLessonCompleted] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(0);
    const [currentRound, setCurrentRound] = useState(0);
    const [matchingAnswers, setMatchingAnswers] = useState({});
    const [matchingComplete, setMatchingComplete] = useState(false);
    const [roundsCompleted, setRoundsCompleted] = useState([]);
    const [shuffledDefinitions, setShuffledDefinitions] = useState([]);
    const [quizAnswers, setQuizAnswers] = useState([]);
    const [quizComplete, setQuizComplete] = useState(false);

    const current = lessonContent[step];

    useEffect(() => {
        const getUser = async () => {
            if (supabase) {
                const { data: { user } } = await supabase.auth.getUser();
                if (user) setUserId(user.id);
            }
        };
        getUser();
    }, []);

    useEffect(() => {
        if (current?.type === 'matching-game' && shuffledDefinitions.length === 0) {
            const round = current.rounds[currentRound];
            setShuffledDefinitions([...round.pairs.map(p => p.definition)].sort(() => Math.random() - 0.5));
        }
    }, [current, currentRound, shuffledDefinitions.length]);

    const calculateScore = () => {
        let correct = 0, total = 0;
        if (quizComplete) {
            lessonContent[5].questions.forEach((q, idx) => {
                total++;
                if (quizAnswers[idx] !== undefined && q.options[quizAnswers[idx]]?.correct) correct++;
            });
        }
        return { correct, total, score: total > 0 ? Math.round((correct / total) * 100) : 0 };
    };

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
                    score: score,
                    correct_answers: correct,
                    total_questions: total
                }, { onConflict: 'user_id,lesson_id' });
            if (error) throw error;
        } catch (error) { console.error('Error saving progress:', error); }
    };

    const canProceed = () => {
        if (current.type === 'matching-game' && !matchingComplete) return false;
        if (current.type === 'final-quiz' && !quizComplete) return false;
        return true;
    };

    const handleNext = () => { if (canProceed() && step < lessonContent.length - 1) setStep(step + 1); };
    const handlePrevious = () => { if (step > 0) setStep(step - 1); };
    const handleComplete = async () => { await saveProgress(); setLessonCompleted(true); };

    const handleMatchingSelect = (definition) => {
        const round = current.rounds[currentRound];
        if (Object.values(matchingAnswers).includes(definition)) return;
        const unansweredTerms = round.pairs.filter(pair => !matchingAnswers[pair.term]);
        if (unansweredTerms.length === 0) return;
        const currentTerm = unansweredTerms[0].term;
        const newAnswers = { ...matchingAnswers, [currentTerm]: definition };
        setMatchingAnswers(newAnswers);
        if (Object.keys(newAnswers).length === round.pairs.length) {
            const allCorrect = round.pairs.every(pair => newAnswers[pair.term] === pair.definition);
            if (allCorrect) {
                setRoundsCompleted([...roundsCompleted, currentRound]);
                if (currentRound === current.rounds.length - 1) setMatchingComplete(true);
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

    /* ═══════════════════════════════════════════════════════════════════
       RENDER CONTENT SECTIONS
       ═══════════════════════════════════════════════════════════════════ */
    const renderContent = () => {

        /* ── Intro ─────────────────────────────────────────────────────── */
        if (current.type === "intro") {
            return (
                <div className="bg-white rounded-2xl shadow-sm p-6 sm:p-8 border border-gray-200">
                    <div className="flex items-center gap-3 mb-5">
                        <div className="w-11 h-11 rounded-xl flex items-center justify-center text-white" style={{ backgroundColor: '#E67E22' }}>
                            <Users size={20} />
                        </div>
                        <h2 className="text-xl font-bold" style={{ color: '#1B2A4A', fontFamily: "'DM Serif Display', Georgia, serif" }}>{current.title}</h2>
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed mb-6">{current.content}</p>
                    <div className="space-y-2.5">
                        {current.points.map((point, idx) => (
                            <div key={idx} className="flex items-center gap-3 p-3.5 rounded-xl border border-gray-100" style={{ backgroundColor: '#F7F5F2' }}>
                                <div className="flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center text-white text-xs font-bold" style={{ backgroundColor: '#1B2A4A' }}>
                                    {idx + 1}
                                </div>
                                <p className="text-sm font-medium text-gray-700">{point}</p>
                            </div>
                        ))}
                    </div>
                </div>
            );
        }

        /* ── Immediate Family ──────────────────────────────────────────── */
        if (current.type === "immediate-family") {
            const category = current.categories[selectedCategory];
            const IconComponent = category.icon;

            return (
                <div className="bg-white rounded-2xl shadow-sm p-6 sm:p-8 border border-gray-200">
                    <div className="mb-5">
                        <h2 className="text-xl font-bold mb-1" style={{ color: '#1B2A4A', fontFamily: "'DM Serif Display', Georgia, serif" }}>{current.title}</h2>
                        <p className="text-sm text-gray-500">{current.subtitle}</p>
                    </div>

                    <div className="flex gap-2 mb-5 overflow-x-auto pb-1">
                        {current.categories.map((cat, idx) => {
                            const TabIcon = cat.icon;
                            return (
                                <button
                                    key={cat.id}
                                    onClick={() => setSelectedCategory(idx)}
                                    className={`flex items-center gap-2 px-3.5 py-2 rounded-lg font-medium text-sm whitespace-nowrap transition-all ${
                                        selectedCategory === idx
                                            ? 'text-white shadow-md'
                                            : 'bg-gray-50 text-gray-500 hover:bg-gray-100 border border-gray-200'
                                    }`}
                                    style={selectedCategory === idx ? { backgroundColor: '#1B2A4A' } : {}}
                                >
                                    <TabIcon size={14} />
                                    <span>{cat.title}</span>
                                </button>
                            );
                        })}
                    </div>

                    <div className="rounded-xl p-5 border border-gray-200" style={{ backgroundColor: '#F7F5F2' }}>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm border border-gray-100">
                                <IconComponent className="text-gray-600" size={20} />
                            </div>
                            <h3 className="text-base font-bold" style={{ color: '#1B2A4A' }}>{category.title}</h3>
                        </div>

                        <div className="space-y-2 mb-4">
                            {category.terms.map((term, idx) => (
                                <div key={idx} className="flex items-center justify-between p-3.5 bg-white rounded-xl border border-gray-100">
                                    <div>
                                        <p className="text-lg font-bold" style={{ color: '#1B2A4A' }}>{term.punjabi}</p>
                                        <p className="text-xs font-medium" style={{ color: '#E67E22' }}>{term.roman}</p>
                                    </div>
                                    <p className="text-xs font-medium text-gray-600">{term.english}</p>
                                </div>
                            ))}
                        </div>

                        {category.note && (
                            <div className="p-3 rounded-lg border border-blue-200" style={{ backgroundColor: '#EBF5FB' }}>
                                <p className="text-xs text-gray-700">{category.note}</p>
                            </div>
                        )}

                        {category.tip && (
                            <div className="mt-3 p-3 rounded-lg border border-amber-200" style={{ backgroundColor: '#FEF9E7' }}>
                                <div className="flex items-start gap-2">
                                    <Info size={14} className="flex-shrink-0 mt-0.5" style={{ color: '#E67E22' }} />
                                    <p className="text-xs text-gray-600">{category.tip}</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            );
        }

        /* ── Maternal vs Paternal Comparison ────────────────────────────── */
        if (current.type === "side-comparison") {
            const renderSide = (side, accentColor, accentLight) => (
                <div className="rounded-xl p-5 border border-gray-200" style={{ backgroundColor: accentLight }}>
                    <h3 className="text-base font-bold mb-4" style={{ color: '#1B2A4A', fontFamily: "'DM Serif Display', Georgia, serif" }}>{side.title}</h3>

                    <p className="text-[10px] font-bold uppercase tracking-[0.15em] mb-2" style={{ color: accentColor }}>Grandparents</p>
                    <div className="space-y-1.5 mb-4">
                        {side.grandparents.map((gp, idx) => (
                            <div key={idx} className="bg-white rounded-lg p-3 border border-gray-100">
                                <p className="font-bold text-sm" style={{ color: '#1B2A4A' }}>{gp.punjabi} <span className="font-medium text-xs" style={{ color: accentColor }}>({gp.roman})</span></p>
                                <p className="text-xs text-gray-500">{gp.english}</p>
                            </div>
                        ))}
                    </div>

                    <p className="text-[10px] font-bold uppercase tracking-[0.15em] mb-2" style={{ color: accentColor }}>Aunts & Uncles</p>
                    <div className="space-y-1.5 mb-3">
                        {side.auntsUncles.map((au, idx) => (
                            <div key={idx} className="bg-white rounded-lg p-3 border border-gray-100">
                                <p className="font-bold text-sm" style={{ color: '#1B2A4A' }}>{au.punjabi} <span className="font-medium text-xs" style={{ color: accentColor }}>({au.roman})</span></p>
                                <p className="text-xs text-gray-500">{au.english}</p>
                            </div>
                        ))}
                    </div>

                    <div className="p-2.5 rounded-lg border" style={{ backgroundColor: accentLight, borderColor: accentColor + '40' }}>
                        <p className="text-[10px] font-medium text-gray-600">{side.note}</p>
                    </div>
                </div>
            );

            return (
                <div className="bg-white rounded-2xl shadow-sm p-6 sm:p-8 border border-gray-200">
                    <div className="flex items-center gap-3 mb-5">
                        <div className="w-11 h-11 rounded-xl flex items-center justify-center text-white" style={{ backgroundColor: '#8B5CF6' }}>
                            <BookOpen size={20} />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold" style={{ color: '#1B2A4A', fontFamily: "'DM Serif Display', Georgia, serif" }}>{current.title}</h2>
                            <p className="text-sm text-gray-500">{current.subtitle}</p>
                        </div>
                    </div>

                    <div className="rounded-xl p-4 mb-5 border border-gray-200" style={{ backgroundColor: '#F7F5F2' }}>
                        <p className="text-sm text-gray-600 text-center">{current.intro}</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {renderSide(current.maternal, '#E67E22', '#FEF5EC')}
                        {renderSide(current.paternal, '#3B82F6', '#EFF6FF')}
                    </div>
                </div>
            );
        }

        /* ── Family Tree ───────────────────────────────────────────────── */
        if (current.type === "family-tree") {
            const renderTreeSide = (members, title, accentColor, accentLight) => (
                <div className="rounded-xl p-5 border border-gray-200" style={{ backgroundColor: accentLight }}>
                    <h3 className="text-base font-bold mb-4 text-center" style={{ color: '#1B2A4A', fontFamily: "'DM Serif Display', Georgia, serif" }}>{title}</h3>
                    <div className="space-y-2">
                        {members.map((member, idx) => (
                            <div
                                key={idx}
                                className="p-3.5 rounded-xl border bg-white"
                                style={{ borderColor: member.level === 'grandparent' ? accentColor : accentColor + '60' }}
                            >
                                <p className="font-bold text-sm" style={{ color: accentColor }}>{member.term}</p>
                                <p className="text-xs text-gray-500">{member.relation}</p>
                            </div>
                        ))}
                    </div>
                </div>
            );

            return (
                <div className="bg-white rounded-2xl shadow-sm p-6 sm:p-8 border border-gray-200">
                    <div className="flex items-center gap-3 mb-5">
                        <div className="w-11 h-11 rounded-xl flex items-center justify-center text-white" style={{ backgroundColor: '#059669' }}>
                            <Award size={20} />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold" style={{ color: '#1B2A4A', fontFamily: "'DM Serif Display', Georgia, serif" }}>{current.title}</h2>
                            <p className="text-sm text-gray-500">{current.subtitle}</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
                        {renderTreeSide(current.tree.maternal, "Maternal Side", '#E67E22', '#FEF5EC')}
                        {renderTreeSide(current.tree.paternal, "Paternal Side", '#3B82F6', '#EFF6FF')}
                    </div>

                    <div className="p-3 rounded-lg border border-emerald-200" style={{ backgroundColor: '#ECFDF5' }}>
                        <div className="flex items-start gap-2">
                            <Info size={14} className="flex-shrink-0 mt-0.5 text-emerald-600" />
                            <p className="text-xs text-gray-600">The key to mastering Panjabi family terms is remembering that maternal and paternal sides have completely different words. Practice by labelling your own family tree!</p>
                        </div>
                    </div>
                </div>
            );
        }

        /* ── Matching Game ─────────────────────────────────────────────── */
        if (current.type === "matching-game") {
            const round = current.rounds[currentRound];
            const isRoundComplete = roundsCompleted.includes(currentRound);
            const allRoundsComplete = roundsCompleted.length === current.rounds.length;

            return (
                <div className="bg-white rounded-2xl shadow-sm p-6 sm:p-8 border border-gray-200">
                    <div className="flex items-center gap-3 mb-5">
                        <div className="w-11 h-11 rounded-xl flex items-center justify-center text-white" style={{ backgroundColor: '#E67E22' }}>
                            <Trophy size={20} />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold" style={{ color: '#1B2A4A', fontFamily: "'DM Serif Display', Georgia, serif" }}>{current.title}</h2>
                            <p className="text-sm text-gray-500">{current.subtitle}</p>
                        </div>
                    </div>

                    {/* Round dots */}
                    <div className="flex items-center justify-center gap-2 mb-5">
                        {current.rounds.map((_, idx) => (
                            <div
                                key={idx}
                                className="w-2.5 h-2.5 rounded-full transition-all"
                                style={{
                                    backgroundColor: roundsCompleted.includes(idx) ? '#059669' : idx === currentRound ? '#E67E22' : '#e5e7eb'
                                }}
                            />
                        ))}
                    </div>

                    <div className="rounded-xl p-4 mb-5 border border-amber-200" style={{ backgroundColor: '#FEF9E7' }}>
                        <p className="text-sm font-medium text-center" style={{ color: '#1B2A4A' }}>{round.question}</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
                        <div>
                            <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-gray-400 mb-3">Terms</p>
                            <div className="space-y-2">
                                {round.pairs.map((pair, idx) => {
                                    const isAnswered = matchingAnswers[pair.term] !== undefined;
                                    const isCorrect = matchingAnswers[pair.term] === pair.definition;
                                    return (
                                        <div
                                            key={pair.term}
                                            className={`p-3.5 rounded-xl font-semibold text-sm text-center transition-all ${
                                                isCorrect
                                                    ? 'bg-emerald-600 text-white'
                                                    : isAnswered
                                                        ? 'bg-red-50 border-2 border-red-400 text-red-700'
                                                        : idx === Object.keys(matchingAnswers).length
                                                            ? 'border-2 text-white'
                                                            : 'border border-gray-200 text-gray-500'
                                            }`}
                                            style={!isCorrect && !isAnswered && idx === Object.keys(matchingAnswers).length ? { backgroundColor: '#1B2A4A', borderColor: '#1B2A4A' } : {}}
                                        >
                                            {pair.term}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        <div>
                            <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-gray-400 mb-3">Definitions</p>
                            <div className="space-y-2">
                                {shuffledDefinitions.map((definition, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => handleMatchingSelect(definition)}
                                        disabled={Object.values(matchingAnswers).includes(definition) || isRoundComplete}
                                        className={`w-full p-3.5 rounded-xl font-medium text-sm text-center transition-all ${
                                            Object.values(matchingAnswers).includes(definition) || isRoundComplete
                                                ? 'bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200'
                                                : 'bg-white border border-gray-200 text-gray-700 hover:border-gray-300'
                                        }`}
                                    >
                                        {definition}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {isRoundComplete && !allRoundsComplete && (
                        <div className="rounded-xl p-4 text-center border-2 mb-3" style={{ borderColor: '#059669', backgroundColor: '#ECFDF5' }}>
                            <CheckCircle className="inline-block text-emerald-600 mb-2" size={28} />
                            <p className="text-emerald-700 font-semibold text-sm mb-3">Round {currentRound + 1} complete!</p>
                            <button
                                onClick={nextRound}
                                className="text-white px-5 py-2 rounded-xl font-semibold text-sm transition-all hover:-translate-y-0.5 shadow-md"
                                style={{ backgroundColor: '#059669' }}
                            >
                                Next Round
                            </button>
                        </div>
                    )}

                    {allRoundsComplete && (
                        <div className="rounded-xl p-4 text-center border-2" style={{ borderColor: '#059669', backgroundColor: '#ECFDF5' }}>
                            <Trophy className="inline-block text-emerald-600 mb-2" size={32} />
                            <p className="text-emerald-700 font-bold text-sm">All rounds complete! You've mastered family terms!</p>
                        </div>
                    )}

                    {Object.keys(matchingAnswers).length === round.pairs.length && !isRoundComplete && (
                        <div className="rounded-xl p-4 text-center border-2 border-red-300 bg-red-50">
                            <X className="inline-block text-red-500 mb-2" size={24} />
                            <p className="text-red-700 font-semibold text-sm mb-3">Not quite right. Try again!</p>
                            <button
                                onClick={resetRound}
                                className="bg-red-500 text-white px-5 py-2 rounded-xl font-semibold text-sm hover:bg-red-600 transition-colors"
                            >
                                Reset Round
                            </button>
                        </div>
                    )}
                </div>
            );
        }

        /* ── Final Quiz ────────────────────────────────────────────────── */
        if (current.type === "final-quiz") {
            return (
                <div className="bg-white rounded-2xl shadow-sm p-6 sm:p-8 border border-gray-200">
                    <div className="flex items-center gap-3 mb-5">
                        <div className="w-11 h-11 rounded-xl flex items-center justify-center text-white" style={{ backgroundColor: '#E67E22' }}>
                            <Trophy size={20} />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold" style={{ color: '#1B2A4A', fontFamily: "'DM Serif Display', Georgia, serif" }}>{current.title}</h2>
                            <p className="text-sm text-gray-500">{current.subtitle}</p>
                        </div>
                    </div>

                    <div className="space-y-5">
                        {current.questions.map((q, qIdx) => (
                            <div key={qIdx} className="rounded-xl p-5 border border-gray-200" style={{ backgroundColor: '#F7F5F2' }}>
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-7 h-7 rounded-lg flex items-center justify-center text-white text-xs font-bold flex-shrink-0" style={{ backgroundColor: '#E67E22' }}>
                                        {qIdx + 1}
                                    </div>
                                    <p className="text-sm font-semibold" style={{ color: '#1B2A4A' }}>{q.question}</p>
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
                                                        setQuizAnswers(prev => { const n = [...prev]; n[qIdx] = oIdx; return n; });
                                                    }
                                                }}
                                                disabled={quizAnswers[qIdx] !== undefined}
                                                className={`w-full p-3.5 rounded-xl text-left text-sm font-medium transition-all flex items-center gap-2.5 ${
                                                    showResult && isSelected && isCorrect
                                                        ? 'bg-emerald-600 text-white'
                                                        : showResult && isSelected && !isCorrect
                                                            ? 'bg-red-50 border-2 border-red-400 text-red-700'
                                                            : showResult && isCorrect
                                                                ? 'bg-emerald-50 border-2 border-emerald-400 text-emerald-700'
                                                                : 'bg-white border border-gray-200 text-gray-700 hover:border-gray-300'
                                                }`}
                                            >
                                                {showResult && isCorrect && (
                                                    <div className={`w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0 ${showResult && isSelected && isCorrect ? 'bg-white/25' : 'bg-emerald-600'}`}>
                                                        <CheckCircle size={12} className="text-white" />
                                                    </div>
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
                            className="w-full mt-6 text-white px-6 py-3.5 rounded-xl font-semibold transition-all text-sm shadow-md hover:shadow-lg hover:-translate-y-0.5"
                            style={{ backgroundColor: '#E67E22' }}
                        >
                            Continue
                        </button>
                    )}
                </div>
            );
        }

        return null;
    };

    /* ═══════════════════════════════════════════════════════════════════
       COMPLETION SUMMARY
       ═══════════════════════════════════════════════════════════════════ */
    const CompletionSummary = () => {
        const { correct, total, score } = calculateScore();
        return (
            <div className="bg-white rounded-2xl shadow-sm p-6 sm:p-8 border-2" style={{ borderColor: '#059669' }}>
                <div className="flex justify-center mb-5">
                    <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-white shadow-md" style={{ backgroundColor: '#059669' }}>
                        <Trophy size={32} />
                    </div>
                </div>
                <h2 className="text-2xl text-center mb-1" style={{ color: '#1B2A4A', fontFamily: "'DM Serif Display', Georgia, serif" }}>Lesson Complete!</h2>
                <p className="text-center text-sm text-gray-500 mb-6">You've mastered Panjabi family terms!</p>

                <div className="grid grid-cols-3 gap-3 mb-5">
                    <div className="rounded-xl p-4 text-center border border-gray-200" style={{ backgroundColor: '#F7F5F2' }}>
                        <div className="text-2xl font-bold mb-0.5" style={{ color: '#1B2A4A' }}>{score}%</div>
                        <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-400">Score</p>
                    </div>
                    <div className="rounded-xl p-4 text-center border border-gray-200" style={{ backgroundColor: '#F7F5F2' }}>
                        <div className="text-2xl font-bold mb-0.5" style={{ color: '#059669' }}>{correct}</div>
                        <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-400">Correct</p>
                    </div>
                    <div className="rounded-xl p-4 text-center border border-gray-200" style={{ backgroundColor: '#F7F5F2' }}>
                        <div className="text-2xl font-bold mb-0.5" style={{ color: '#E67E22' }}>{total - correct}</div>
                        <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-400">Incorrect</p>
                    </div>
                </div>

                {supabase && userId && (
                    <div className="flex items-center gap-2 p-3 rounded-xl mb-5 border" style={{ backgroundColor: '#ECFDF5', borderColor: '#A7F3D0' }}>
                        <CheckCircle size={14} className="text-emerald-600 flex-shrink-0" />
                        <p className="text-xs font-medium text-emerald-700">Progress saved to your profile</p>
                    </div>
                )}

                <div className="space-y-2.5">
                    <button
                        onClick={() => router.push("/lessons/lesson5/")}
                        className="w-full flex items-center justify-center gap-2 text-white px-6 py-3.5 rounded-xl font-semibold transition-all text-sm shadow-md hover:shadow-lg hover:-translate-y-0.5"
                        style={{ backgroundColor: '#1B2A4A' }}
                    >
                        <span>Continue to Next Lesson</span>
                        <ArrowRight size={16} />
                    </button>
                    <button
                        onClick={() => {
                            setStep(0); setSelectedCategory(0); setCurrentRound(0); setMatchingAnswers({});
                            setMatchingComplete(false); setRoundsCompleted([]); setShuffledDefinitions([]);
                            setQuizAnswers([]); setQuizComplete(false); setLessonCompleted(false);
                        }}
                        className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold transition-all text-sm border border-gray-200 text-gray-600 hover:bg-gray-50"
                    >
                        <RotateCcw size={16} />
                        <span>Review Lesson</span>
                    </button>
                    <button
                        onClick={() => router.push("/learning/essential-punjabi")}
                        className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold transition-all text-sm text-gray-400 hover:text-gray-600"
                    >
                        <ArrowLeft size={16} />
                        <span>Back to Lessons</span>
                    </button>
                </div>
            </div>
        );
    };

    /* ═══════════════════════════════════════════════════════════════════
       MAIN RENDER
       ═══════════════════════════════════════════════════════════════════ */
    if (lessonCompleted) {
        return (
            <>
                <style jsx global>{`
                    :root { --color-cream: #FDFBF7; --font-body: 'DM Sans', system-ui, sans-serif; }
                    body { font-family: var(--font-body); -webkit-font-smoothing: antialiased; }
                `}</style>
                <div className="min-h-screen px-6 sm:px-10 pt-28 pb-12" style={{ backgroundColor: '#FDFBF7' }}>
                    <div className="max-w-3xl mx-auto"><CompletionSummary /></div>
                </div>
            </>
        );
    }

    return (
        <>
            <style jsx global>{`
                :root {
                    --color-saffron: #E67E22; --color-navy: #1B2A4A; --color-cream: #FDFBF7;
                    --color-warm-gray: #F7F5F2;
                    --font-display: 'DM Serif Display', Georgia, serif;
                    --font-body: 'DM Sans', system-ui, sans-serif;
                }
                body { font-family: var(--font-body); -webkit-font-smoothing: antialiased; }
                .font-display { font-family: var(--font-display); }
            `}</style>

            <div className="min-h-screen px-6 sm:px-10 pt-28 pb-12" style={{ backgroundColor: '#FDFBF7' }}>
                <div className="max-w-3xl mx-auto">
                    <button
                        onClick={() => router.push("/learning/essential-punjabi")}
                        className="mb-6 flex items-center gap-2 text-gray-400 hover:text-gray-700 font-medium text-sm transition-colors group"
                    >
                        <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                        <span>Back to Lessons</span>
                    </button>

                    <div className="rounded-2xl p-6 text-white shadow-sm mb-6" style={{ backgroundColor: '#1B2A4A' }}>
                        <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-gray-400 mb-2">Lesson 3</p>
                        <h1 className="text-2xl mb-1" style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}>Family and Friends</h1>
                        <p className="text-sm text-gray-400">Master the precise terms for maternal and paternal relatives</p>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm p-4 mb-6 border border-gray-200">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-xs font-semibold text-gray-400">Progress</span>
                            <span className="text-xs font-bold" style={{ color: '#1B2A4A' }}>{step + 1} / {lessonContent.length}</span>
                        </div>
                        <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
                            <div className="h-full rounded-full transition-all duration-500" style={{ width: `${((step + 1) / lessonContent.length) * 100}%`, backgroundColor: '#E67E22' }}></div>
                        </div>
                    </div>

                    <div className="mb-6">{renderContent()}</div>

                    <div className="flex justify-center gap-1.5 mb-6">
                        {lessonContent.map((_, idx) => (
                            <div key={idx} className="h-1.5 rounded-full transition-all duration-300" style={{
                                width: idx === step ? '24px' : '8px',
                                backgroundColor: idx === step ? '#E67E22' : idx < step ? '#1B2A4A' : '#e5e7eb'
                            }}></div>
                        ))}
                    </div>

                    <div className="flex gap-3">
                        <button
                            onClick={handlePrevious}
                            disabled={step === 0}
                            className={`flex-1 flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold transition-all text-sm ${
                                step === 0 ? 'bg-gray-100 text-gray-300 cursor-not-allowed' : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
                            }`}
                        >
                            <ArrowLeft size={16} /><span>Previous</span>
                        </button>

                        {step < lessonContent.length - 1 ? (
                            <button
                                onClick={handleNext}
                                disabled={!canProceed()}
                                className={`flex-1 flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold transition-all text-sm ${
                                    !canProceed() ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'text-white shadow-md hover:shadow-lg hover:-translate-y-0.5'
                                }`}
                                style={canProceed() ? { backgroundColor: '#1B2A4A' } : {}}
                            >
                                <span>Next</span><ArrowRight size={16} />
                            </button>
                        ) : (
                            <button
                                onClick={handleComplete}
                                disabled={!quizComplete}
                                className={`flex-1 flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold transition-all text-sm ${
                                    !quizComplete ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'text-white shadow-md hover:shadow-lg hover:-translate-y-0.5'
                                }`}
                                style={quizComplete ? { backgroundColor: '#059669' } : {}}
                            >
                                <span>Complete Lesson</span><CheckCircle size={16} />
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}