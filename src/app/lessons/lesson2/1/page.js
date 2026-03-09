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
    Home,
    BookOpen
} from "lucide-react";
import { createClient } from '@supabase/supabase-js';

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
            { punjabi: "ਭਰਾ", roman: "bhrā", english: "Brother" },
            { punjabi: "ਭੈਣ", roman: "bhaiṇ", english: "Sister" },
            { punjabi: "ਵੱਡਾ/ਵੱਡੀ", roman: "vaḍḍā/vaḍḍī", english: "Older/Bigger" },
            { punjabi: "ਛੋਟਾ/ਛੋਟੀ", roman: "chhoṭā/chhoṭī", english: "Younger/Little" }
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
        subtitle: "Choose the correct answer for each question",
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

    const [selectedCategory, setSelectedCategory] = useState(0);
    const [selectedGender, setSelectedGender] = useState("male");
    const [playingAudio, setPlayingAudio] = useState(null);
    const [practiceAnswers, setPracticeAnswers] = useState({});
    const [practiceComplete, setPracticeComplete] = useState(false);
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

    const playAudio = (audioFile, id) => {
        setPlayingAudio(id);
        const audio = new Audio(`/audio/${audioFile}`);
        audio.play();
        audio.onended = () => setPlayingAudio(null);
    };

    const calculateScore = () => {
        let correct = 0;
        let total = 0;
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
                    lesson_id: 'lesson-3-introduction',
                    lesson_name: 'Self Introduction',
                    completed: true,
                    score: score,
                    correct_answers: correct,
                    total_questions: total
                }, { onConflict: 'user_id,lesson_id' });
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

    const handleNext = () => { if (canProceed() && step < lessonContent.length - 1) setStep(step + 1); };
    const handlePrevious = () => { if (step > 0) setStep(step - 1); };
    const handleComplete = async () => { await saveProgress(); setLessonCompleted(true); };

    const handlePracticeAnswer = (stepId, optionIndex) => {
        if (practiceAnswers[stepId] !== undefined) return;
        const newAnswers = { ...practiceAnswers, [stepId]: optionIndex };
        setPracticeAnswers(newAnswers);
        if (Object.keys(newAnswers).length === current.steps.length) setPracticeComplete(true);
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
                            <User size={20} />
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

        /* ── Phrase Tabs ───────────────────────────────────────────────── */
        if (current.type === "phrase-tabs") {
            const category = current.categories[selectedCategory];
            const IconComponent = category.icon;

            return (
                <div className="bg-white rounded-2xl shadow-sm p-6 sm:p-8 border border-gray-200">
                    <div className="mb-5">
                        <h2 className="text-xl font-bold mb-1" style={{ color: '#1B2A4A', fontFamily: "'DM Serif Display', Georgia, serif" }}>{current.title}</h2>
                        <p className="text-sm text-gray-500">{current.subtitle}</p>
                    </div>

                    {/* Category Tabs */}
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

                    {/* Gender Toggle */}
                    {category.male && category.female && (
                        <div className="flex gap-2 mb-5">
                            <button
                                onClick={() => setSelectedGender("male")}
                                className={`flex-1 py-2.5 px-4 rounded-xl font-semibold text-sm transition-all ${
                                    selectedGender === "male" ? 'text-white shadow-md' : 'border border-gray-200 text-gray-500 hover:border-gray-300'
                                }`}
                                style={selectedGender === "male" ? { backgroundColor: '#1B2A4A' } : {}}
                            >
                                Male
                            </button>
                            <button
                                onClick={() => setSelectedGender("female")}
                                className={`flex-1 py-2.5 px-4 rounded-xl font-semibold text-sm transition-all ${
                                    selectedGender === "female" ? 'text-white shadow-md' : 'border border-gray-200 text-gray-500 hover:border-gray-300'
                                }`}
                                style={selectedGender === "female" ? { backgroundColor: '#E67E22' } : {}}
                            >
                                Female
                            </button>
                        </div>
                    )}

                    {/* Phrase Display Card */}
                    <div className="rounded-xl p-5 border border-gray-200" style={{ backgroundColor: '#F7F5F2' }}>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm border border-gray-100">
                                <IconComponent className="text-gray-600" size={20} />
                            </div>
                            <h3 className="text-base font-bold" style={{ color: '#1B2A4A' }}>{category.title}</h3>
                        </div>

                        {category.phrases ? (
                            <div>
                                <p className="text-xl font-bold mb-1.5" style={{ color: '#1B2A4A' }}>{category.phrases[0].gurmukhi}</p>
                                <p className="text-sm font-medium mb-1" style={{ color: '#E67E22' }}>{category.phrases[0].roman}</p>
                                <p className="text-sm text-gray-600 mb-2">{category.phrases[0].english}</p>
                                {category.phrases[0].note && (
                                    <p className="text-xs text-gray-400 italic mb-3">{category.phrases[0].note}</p>
                                )}
                                <button
                                    onClick={() => playAudio(category.phrases[0].audioFile, category.id)}
                                    className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                                        playingAudio === category.id ? 'text-white' : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
                                    }`}
                                    style={playingAudio === category.id ? { backgroundColor: '#1B2A4A' } : {}}
                                >
                                    {playingAudio === category.id ? <Pause size={14} /> : <Volume2 size={14} />}
                                    <span>Listen</span>
                                </button>
                            </div>
                        ) : (
                            <div>
                                <p className="text-xl font-bold mb-1.5" style={{ color: '#1B2A4A' }}>{category[selectedGender].gurmukhi}</p>
                                <p className="text-sm font-medium mb-1" style={{ color: '#E67E22' }}>{category[selectedGender].roman}</p>
                                <p className="text-sm text-gray-600 mb-3">{category[selectedGender].english}</p>
                                <button
                                    onClick={() => playAudio(category[selectedGender].audioFile, `${category.id}-${selectedGender}`)}
                                    className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                                        playingAudio === `${category.id}-${selectedGender}` ? 'text-white' : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
                                    }`}
                                    style={playingAudio === `${category.id}-${selectedGender}` ? { backgroundColor: '#1B2A4A' } : {}}
                                >
                                    {playingAudio === `${category.id}-${selectedGender}` ? <Pause size={14} /> : <Volume2 size={14} />}
                                    <span>Listen</span>
                                </button>
                                {category.tip && (
                                    <div className="mt-4 p-3 rounded-lg border border-amber-200" style={{ backgroundColor: '#FEF9E7' }}>
                                        <div className="flex items-start gap-2">
                                            <Info size={14} className="flex-shrink-0 mt-0.5" style={{ color: '#E67E22' }} />
                                            <p className="text-xs text-gray-600">{category.tip}</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            );
        }

        /* ── Work & Study ──────────────────────────────────────────────── */
        if (current.type === "work-study") {
            return (
                <div className="bg-white rounded-2xl shadow-sm p-6 sm:p-8 border border-gray-200">
                    <div className="flex items-center gap-3 mb-5">
                        <div className="w-11 h-11 rounded-xl flex items-center justify-center text-white" style={{ backgroundColor: '#8B5CF6' }}>
                            <Briefcase size={20} />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold" style={{ color: '#1B2A4A', fontFamily: "'DM Serif Display', Georgia, serif" }}>{current.title}</h2>
                            <p className="text-sm text-gray-500">{current.subtitle}</p>
                        </div>
                    </div>

                    <div className="flex gap-2 mb-5">
                        <button
                            onClick={() => setSelectedGender("male")}
                            className={`flex-1 py-2.5 px-4 rounded-xl font-semibold text-sm transition-all ${
                                selectedGender === "male" ? 'text-white shadow-md' : 'border border-gray-200 text-gray-500 hover:border-gray-300'
                            }`}
                            style={selectedGender === "male" ? { backgroundColor: '#1B2A4A' } : {}}
                        >
                            Male
                        </button>
                        <button
                            onClick={() => setSelectedGender("female")}
                            className={`flex-1 py-2.5 px-4 rounded-xl font-semibold text-sm transition-all ${
                                selectedGender === "female" ? 'text-white shadow-md' : 'border border-gray-200 text-gray-500 hover:border-gray-300'
                            }`}
                            style={selectedGender === "female" ? { backgroundColor: '#E67E22' } : {}}
                        >
                            Female
                        </button>
                    </div>

                    <div className="space-y-4 mb-5">
                        {current.phrases.map((phrase, idx) => (
                            <div key={idx} className="rounded-xl p-5 border border-gray-200" style={{ backgroundColor: '#F7F5F2' }}>
                                <p className="text-[10px] font-bold uppercase tracking-[0.15em] mb-3" style={{ color: '#8B5CF6' }}>
                                    {phrase.type === "work" ? "Work" : "Study"}
                                </p>
                                <p className="text-xl font-bold mb-1.5" style={{ color: '#1B2A4A' }}>{phrase[selectedGender].gurmukhi}</p>
                                <p className="text-sm font-medium mb-1" style={{ color: '#E67E22' }}>{phrase[selectedGender].roman}</p>
                                <p className="text-sm text-gray-600 mb-3">{phrase[selectedGender].english}</p>
                                <button
                                    onClick={() => playAudio(phrase[selectedGender].audioFile, `work-${idx}-${selectedGender}`)}
                                    className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                                        playingAudio === `work-${idx}-${selectedGender}` ? 'text-white' : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
                                    }`}
                                    style={playingAudio === `work-${idx}-${selectedGender}` ? { backgroundColor: '#1B2A4A' } : {}}
                                >
                                    {playingAudio === `work-${idx}-${selectedGender}` ? <Pause size={14} /> : <Volume2 size={14} />}
                                    <span>Listen</span>
                                </button>
                            </div>
                        ))}
                    </div>

                    <div className="rounded-xl p-4 border border-gray-200 bg-gray-50">
                        <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-gray-400 mb-3">Key Verbs</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {current.vocabulary.map((word, idx) => (
                                <div key={idx} className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-100">
                                    <span className="text-base font-bold" style={{ color: '#1B2A4A' }}>{word.punjabi}</span>
                                    <span className="text-xs text-gray-400">{word.roman}</span>
                                    <span className="text-xs font-medium text-gray-600 ml-auto">{word.english}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            );
        }

        /* ── Family ────────────────────────────────────────────────────── */
        if (current.type === "family") {
            return (
                <div className="bg-white rounded-2xl shadow-sm p-6 sm:p-8 border border-gray-200">
                    <div className="flex items-center gap-3 mb-5">
                        <div className="w-11 h-11 rounded-xl flex items-center justify-center text-white" style={{ backgroundColor: '#059669' }}>
                            <Users size={20} />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold" style={{ color: '#1B2A4A', fontFamily: "'DM Serif Display', Georgia, serif" }}>{current.title}</h2>
                            <p className="text-sm text-gray-500">{current.subtitle}</p>
                        </div>
                    </div>

                    <div className="space-y-3 mb-5">
                        {current.examples.map((example, idx) => (
                            <div key={idx} className="rounded-xl p-5 border border-gray-200" style={{ backgroundColor: '#F7F5F2' }}>
                                <p className="text-lg font-bold mb-1.5" style={{ color: '#1B2A4A' }}>{example.gurmukhi}</p>
                                <p className="text-sm font-medium mb-1" style={{ color: '#059669' }}>{example.roman}</p>
                                <p className="text-sm text-gray-600">{example.english}</p>
                            </div>
                        ))}
                    </div>

                    <div className="rounded-xl p-4 border border-gray-200 bg-gray-50">
                        <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-gray-400 mb-3">Family Vocabulary</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {current.vocabulary.map((word, idx) => (
                                <div key={idx} className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-100">
                                    <span className="text-base font-bold" style={{ color: '#1B2A4A' }}>{word.punjabi}</span>
                                    <span className="text-xs text-gray-400">{word.roman}</span>
                                    <span className="text-xs font-medium text-gray-600 ml-auto">{word.english}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            );
        }

        /* ── Practice Builder ──────────────────────────────────────────── */
        if (current.type === "practice-builder") {
            return (
                <div className="bg-white rounded-2xl shadow-sm p-6 sm:p-8 border border-gray-200">
                    <div className="flex items-center gap-3 mb-5">
                        <div className="w-11 h-11 rounded-xl flex items-center justify-center text-white" style={{ backgroundColor: '#E67E22' }}>
                            <BookOpen size={20} />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold" style={{ color: '#1B2A4A', fontFamily: "'DM Serif Display', Georgia, serif" }}>{current.title}</h2>
                            <p className="text-sm text-gray-500">{current.subtitle}</p>
                        </div>
                    </div>

                    <div className="rounded-xl p-4 mb-6 border border-amber-200" style={{ backgroundColor: '#FEF9E7' }}>
                        <p className="text-sm font-medium text-center" style={{ color: '#1B2A4A' }}>{current.scenario}</p>
                    </div>

                    <div className="space-y-5">
                        {current.steps.map((practiceStep, idx) => {
                            const answered = practiceAnswers[practiceStep.id] !== undefined;
                            const selectedOption = practiceAnswers[practiceStep.id];

                            return (
                                <div key={practiceStep.id} className="rounded-xl p-5 border border-gray-200" style={{ backgroundColor: '#F7F5F2' }}>
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-7 h-7 rounded-lg flex items-center justify-center text-white text-xs font-bold flex-shrink-0" style={{ backgroundColor: '#1B2A4A' }}>
                                            {idx + 1}
                                        </div>
                                        <p className="text-sm font-semibold" style={{ color: '#1B2A4A' }}>{practiceStep.prompt}</p>
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
                                                        className={`w-full p-3.5 rounded-xl text-left text-sm font-medium transition-all flex items-center gap-2.5 ${
                                                            answered && isSelected && isCorrect
                                                                ? 'bg-emerald-600 text-white'
                                                                : answered && isSelected && !isCorrect
                                                                    ? 'bg-red-50 border-2 border-red-400 text-red-700'
                                                                    : answered && isCorrect
                                                                        ? 'bg-emerald-50 border-2 border-emerald-400 text-emerald-700'
                                                                        : 'bg-white border border-gray-200 text-gray-700 hover:border-gray-300'
                                                        }`}
                                                    >
                                                        {answered && isCorrect && (
                                                            <div className={`w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0 ${answered && isSelected && isCorrect ? 'bg-white/25' : 'bg-emerald-600'}`}>
                                                                <CheckCircle size={12} className="text-white" />
                                                            </div>
                                                        )}
                                                        <span>{option.text}</span>
                                                    </button>
                                                    {answered && isSelected && (
                                                        <p className={`mt-1.5 text-xs px-3.5 py-2 rounded-lg ${isCorrect ? 'text-emerald-700 bg-emerald-50' : 'text-red-700 bg-red-50'}`}>
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

                <h2 className="text-2xl text-center mb-1" style={{ color: '#1B2A4A', fontFamily: "'DM Serif Display', Georgia, serif" }}>
                    Lesson Complete!
                </h2>
                <p className="text-center text-sm text-gray-500 mb-6">You can now introduce yourself in Panjabi!</p>

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
                        onClick={() => router.push("/lessons/lesson4/")}
                        className="w-full flex items-center justify-center gap-2 text-white px-6 py-3.5 rounded-xl font-semibold transition-all text-sm shadow-md hover:shadow-lg hover:-translate-y-0.5"
                        style={{ backgroundColor: '#1B2A4A' }}
                    >
                        <span>Continue to Next Lesson</span>
                        <ArrowRight size={16} />
                    </button>
                    <button
                        onClick={() => {
                            setStep(0); setSelectedCategory(0); setSelectedGender("male"); setPlayingAudio(null);
                            setPracticeAnswers({}); setPracticeComplete(false);
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
                    --color-saffron: #E67E22;
                    --color-navy: #1B2A4A;
                    --color-cream: #FDFBF7;
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

                    {/* Lesson header */}
                    <div className="rounded-2xl p-6 text-white shadow-sm mb-6" style={{ backgroundColor: '#1B2A4A' }}>
                        <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-gray-400 mb-2">Lesson 2</p>
                        <h1 className="text-2xl mb-1" style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}>
                            A Bit About Me
                        </h1>
                        <p className="text-sm text-gray-400">Learn how to introduce yourself in Panjabi</p>
                    </div>

                    {/* Progress bar */}
                    <div className="bg-white rounded-xl shadow-sm p-4 mb-6 border border-gray-200">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-xs font-semibold text-gray-400">Progress</span>
                            <span className="text-xs font-bold" style={{ color: '#1B2A4A' }}>
                                {step + 1} / {lessonContent.length}
                            </span>
                        </div>
                        <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
                            <div
                                className="h-full rounded-full transition-all duration-500"
                                style={{ width: `${((step + 1) / lessonContent.length) * 100}%`, backgroundColor: '#E67E22' }}
                            ></div>
                        </div>
                    </div>

                    <div className="mb-6">{renderContent()}</div>

                    {/* Step dots */}
                    <div className="flex justify-center gap-1.5 mb-6">
                        {lessonContent.map((_, idx) => (
                            <div
                                key={idx}
                                className="h-1.5 rounded-full transition-all duration-300"
                                style={{
                                    width: idx === step ? '24px' : '8px',
                                    backgroundColor: idx === step ? '#E67E22' : idx < step ? '#1B2A4A' : '#e5e7eb'
                                }}
                            ></div>
                        ))}
                    </div>

                    {/* Navigation */}
                    <div className="flex gap-3">
                        <button
                            onClick={handlePrevious}
                            disabled={step === 0}
                            className={`flex-1 flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold transition-all text-sm ${
                                step === 0
                                    ? 'bg-gray-100 text-gray-300 cursor-not-allowed'
                                    : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
                            }`}
                        >
                            <ArrowLeft size={16} />
                            <span>Previous</span>
                        </button>

                        {step < lessonContent.length - 1 ? (
                            <button
                                onClick={handleNext}
                                disabled={!canProceed()}
                                className={`flex-1 flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold transition-all text-sm ${
                                    !canProceed()
                                        ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                        : 'text-white shadow-md hover:shadow-lg hover:-translate-y-0.5'
                                }`}
                                style={canProceed() ? { backgroundColor: '#1B2A4A' } : {}}
                            >
                                <span>Next</span>
                                <ArrowRight size={16} />
                            </button>
                        ) : (
                            <button
                                onClick={handleComplete}
                                disabled={!quizComplete}
                                className={`flex-1 flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold transition-all text-sm ${
                                    !quizComplete
                                        ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                        : 'text-white shadow-md hover:shadow-lg hover:-translate-y-0.5'
                                }`}
                                style={quizComplete ? { backgroundColor: '#059669' } : {}}
                            >
                                <span>Complete Lesson</span>
                                <CheckCircle size={16} />
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}