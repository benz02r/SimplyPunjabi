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
    BookOpen,
    Play,
    Pause
} from "lucide-react";
import { createClient } from '@supabase/supabase-js';

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
                usage: "Formal/Informal. As you saw in the earlier boxes, we can use Sat Sri Akaal to also say goodbye to someone. However, when you may want to add this phrase as a follow up to add an extra layer of compassion or consideration for the other person.",
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
        type: "final-quiz",
        title: "Test Your Knowledge",
        subtitle: "Choose the correct answer for each question",
        questions: [
            {
                question: "You are meeting your friend's parents for the first time. What do you say?",
                options: [
                    { text: "Sat Sri Akaal Ji", correct: true },
                    { text: "Kiddā̃?", correct: false }
                ]
            },
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
                question: "You bump into friends at a party. What greeting do you use?",
                options: [
                    { text: "Sat Sri Akaal Ji", correct: false },
                    { text: "Kiddā̃?", correct: true }
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
                question: "You are leaving your grandmother's house. What is the most appropriate thing to say?",
                options: [
                    { text: "Say 'Sat Sri Akaal Ji' and 'Apana khay-aal rakh-naa'", correct: true },
                    { text: "Just say 'Kiddā̃?'", correct: false }
                ]
            },
            {
                question: "Please translate 'Aapna Khay Aal'",
                options: [
                    { text: "Take care of yourself", correct: true },
                    { text: "See you soon", correct: false },
                    { text: "It was nice meeting you", correct: false }
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
    const [playingAudio, setPlayingAudio] = useState(null);
    const [selectedPhrases, setSelectedPhrases] = useState([]);
    const [selectedDialogue, setSelectedDialogue] = useState(null);
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

    const playAudio = (audioFile, phraseId) => {
        setPlayingAudio(phraseId);
        const audio = new Audio(`/audio/${audioFile}`);
        audio.play();
        audio.onended = () => setPlayingAudio(null);
    };

    const calculateScore = () => {
        let correct = 0;
        let total = 0;
        if (quizComplete) {
            const quizStep = lessonContent.find(s => s.type === 'final-quiz');
            if (quizStep) {
                quizStep.questions.forEach((q, idx) => {
                    total++;
                    if (quizAnswers[idx] !== undefined && q.options[quizAnswers[idx]]?.correct) correct++;
                });
            }
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
                    lesson_id: 'lesson1',
                    lesson_name: 'Panjabi Greetings',
                    completed: true,
                    score: score,
                    correct_answers: correct,
                    total_questions: total
                }, { onConflict: 'user_id,lesson_id' });
            if (error) {
                console.error('Supabase save error:', error.message, error.details, error.hint);
                throw error;
            }
        } catch (error) {
            console.error('Error saving progress:', error?.message || error);
        }
    };

    const canProceed = () => {
        if (current.type === 'final-quiz' && !quizComplete) return false;
        return true;
    };

    const handleNext = () => { if (canProceed() && step < lessonContent.length - 1) setStep(step + 1); };
    const handlePrevious = () => { if (step > 0) setStep(step - 1); };
    const handleComplete = async () => { await saveProgress(); setLessonCompleted(true); };

    const renderContent = () => {
        if (current.type === "intro") {
            return (
                <div className="bg-white rounded-2xl shadow-sm p-8 border border-gray-200">
                    <div className="flex items-center gap-3 mb-5">
                        <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white" style={{ backgroundColor: '#1B2A4A' }}>
                            <Hand className="text-white" size={22} />
                        </div>
                        <h2 className="text-xl font-bold" style={{ color: '#1B2A4A' }}>{current.title}</h2>
                    </div>
                    <p className="text-sm text-gray-500 leading-relaxed mb-6">{current.content}</p>
                    <div className="space-y-2.5 mb-6">
                        {current.points.map((point, idx) => (
                            <div key={idx} className="flex items-start gap-3 p-4 bg-white rounded-xl border border-gray-200">
                                <span className="flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center text-white text-xs font-bold" style={{ backgroundColor: '#E67E22' }}>
                                    {idx + 1}
                                </span>
                                <p className="text-sm text-gray-700 font-medium pt-0.5">{point}</p>
                            </div>
                        ))}
                    </div>
                    {current.helpfulText && (
                        <div className="border-l-4 rounded-r-xl p-5" style={{ borderColor: '#059669', backgroundColor: '#F7F5F2' }}>
                            <p className="text-sm text-gray-600 leading-relaxed">
                                <span className="font-semibold" style={{ color: '#059669' }}>Helpful</span><br />
                                {current.helpfulText}
                            </p>
                        </div>
                    )}
                </div>
            );
        }

        if (current.type === "phrase-collection") {
            return (
                <div className="bg-white rounded-2xl shadow-sm p-8 border border-gray-200">
                    <div className="flex items-center gap-3 mb-1">
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: 'rgba(59,130,246,0.1)' }}>
                            <BookOpen style={{ color: '#3B82F6' }} size={18} />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold" style={{ color: '#1B2A4A' }}>{current.title}</h2>
                            <p className="text-xs text-gray-400">{current.subtitle}</p>
                        </div>
                    </div>

                    <div className="space-y-3 mt-6">
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
                                    className={`cursor-pointer p-5 rounded-xl border transition-all duration-200 ${
                                        isSelected
                                            ? 'border-gray-300 shadow-md'
                                            : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
                                    }`}
                                    style={isSelected ? { backgroundColor: '#F7F5F2' } : { backgroundColor: 'white' }}
                                >
                                    <div className="flex items-start gap-4">
                                        <div className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0`}
                                             style={{ backgroundColor: isSelected ? '#1B2A4A' : '#F7F5F2' }}>
                                            <IconComponent className={isSelected ? 'text-white' : 'text-gray-500'} size={18} />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            {phrase.boldTitle && (
                                                <h3 className="text-sm font-bold mb-3" style={{ color: '#1B2A4A' }}>{phrase.boldTitle}</h3>
                                            )}
                                            <div className="flex items-center gap-3 mb-2 flex-wrap">
                                                <h3 className="text-lg font-bold" style={{ color: '#1B2A4A' }}>{phrase.gurmukhi}</h3>
                                                <button
                                                    onClick={(e) => { e.stopPropagation(); playAudio(phrase.audioFile, phrase.id); }}
                                                    className="p-1.5 rounded-lg transition-colors"
                                                    style={{ backgroundColor: isPlaying ? '#1B2A4A' : 'rgba(27,42,74,0.08)' }}
                                                >
                                                    {isPlaying
                                                        ? <Pause size={14} className="text-white" />
                                                        : <Play size={14} style={{ color: '#1B2A4A' }} />
                                                    }
                                                </button>
                                            </div>
                                            <p className="text-sm font-medium mb-1" style={{ color: '#E67E22' }}>{phrase.roman}</p>
                                            {phrase.gurmukhi2 && (
                                                <>
                                                    <h3 className="text-lg font-bold mt-2" style={{ color: '#1B2A4A' }}>{phrase.gurmukhi2}</h3>
                                                    <p className="text-sm font-medium mb-1" style={{ color: '#E67E22' }}>{phrase.roman2}</p>
                                                </>
                                            )}
                                            <p className="text-base font-semibold text-gray-800 mb-1">{phrase.english}</p>
                                            {isSelected && (
                                                <>
                                                    <p className="text-xs text-gray-500 mt-3 leading-relaxed">
                                                        <span className="font-semibold text-gray-700">When to use:</span> {phrase.usage}
                                                    </p>
                                                    {phrase.context && (
                                                        <p className="text-xs text-gray-500 mt-2 leading-relaxed">
                                                            <span className="font-semibold text-gray-700">Translation:</span> {phrase.context}
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
                        <div className="mt-6 border-l-4 p-4 rounded-r-xl" style={{ borderColor: '#E67E22', backgroundColor: '#F7F5F2' }}>
                            <p className="text-xs text-gray-500 leading-relaxed">{current.bottomNote}</p>
                        </div>
                    )}
                </div>
            );
        }

        if (current.type === "scenario") {
            return (
                <div className="bg-white rounded-2xl shadow-sm p-8 border border-gray-200">
                    <div className="flex items-center gap-3 mb-1">
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: 'rgba(139,92,246,0.1)' }}>
                            <MessageCircle style={{ color: '#8B5CF6' }} size={18} />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold" style={{ color: '#1B2A4A' }}>{current.title}</h2>
                            <p className="text-xs text-gray-400">{current.subtitle}</p>
                        </div>
                    </div>

                    <div className="rounded-xl p-5 mb-6 mt-5 border border-gray-200" style={{ backgroundColor: '#F7F5F2' }}>
                        <p className="text-sm font-medium text-center" style={{ color: '#1B2A4A' }}>{current.scenario.setting}</p>
                    </div>

                    <div className="space-y-4">
                        {current.scenario.dialogue.map((line, idx) => (
                            <div
                                key={idx}
                                onClick={() => setSelectedDialogue(selectedDialogue === idx ? null : idx)}
                                className={`cursor-pointer transition-all ${line.speaker.includes("Amar") ? "mr-8" : "ml-8"}`}
                            >
                                <div className={`flex gap-3 ${line.speaker.includes("Grandma") ? "flex-row-reverse" : ""}`}>
                                    <img src={line.avatar} alt={line.speaker} className="w-10 h-10 rounded-xl flex-shrink-0" />
                                    <div className={`flex-1 ${line.speaker.includes("Grandma") ? "text-right" : ""}`}>
                                        <p className="text-[10px] font-semibold text-gray-400 mb-1 uppercase tracking-wider">{line.speaker}</p>
                                        <div className={`inline-block p-4 rounded-2xl ${
                                            line.speaker.includes("Amar")
                                                ? "text-white"
                                                : "text-gray-900"
                                        } ${selectedDialogue === idx ? "shadow-md" : ""}`}
                                             style={{
                                                 backgroundColor: line.speaker.includes("Amar") ? '#1B2A4A' : '#F7F5F2'
                                             }}>
                                            <p className="font-semibold text-sm mb-1">{line.gurmukhi}</p>
                                            <p className="text-xs opacity-80">{line.roman}</p>
                                            {selectedDialogue === idx && (
                                                <p className="text-xs mt-2 pt-2 border-t border-white/20">{line.english}</p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-6 rounded-xl p-4 border border-gray-200" style={{ backgroundColor: '#F7F5F2' }}>
                        <p className="text-xs text-gray-500">
                            <span className="font-semibold" style={{ color: '#1B2A4A' }}>Tip:</span> Click on each message to see the English translation.
                        </p>
                    </div>

                    {current.scenario.bottomNote && (
                        <div className="mt-4 border-l-4 p-4 rounded-r-xl" style={{ borderColor: '#E67E22', backgroundColor: '#F7F5F2' }}>
                            <p className="text-xs text-gray-500 leading-relaxed">{current.scenario.bottomNote}</p>
                        </div>
                    )}
                </div>
            );
        }

        if (current.type === "informal-section") {
            const IconComponent = current.phrase.icon;
            return (
                <div className="bg-white rounded-2xl shadow-sm p-8 border border-gray-200">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: 'rgba(230,126,34,0.1)' }}>
                            <IconComponent style={{ color: '#E67E22' }} size={18} />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold" style={{ color: '#1B2A4A' }}>{current.title}</h2>
                            <p className="text-xs text-gray-400">{current.subtitle}</p>
                        </div>
                    </div>

                    <div className="rounded-xl p-6 mb-6 border border-gray-200" style={{ backgroundColor: '#F7F5F2' }}>
                        {current.phrase.boldTitle && (
                            <h3 className="text-sm font-bold mb-4" style={{ color: '#1B2A4A' }}>{current.phrase.boldTitle}</h3>
                        )}
                        <div className="flex items-center gap-4 mb-3">
                            <h3 className="text-2xl font-bold" style={{ color: '#1B2A4A' }}>{current.phrase.gurmukhi}</h3>
                            <button
                                onClick={() => playAudio(current.phrase.audioFile, 'informal')}
                                className="p-2.5 rounded-xl transition-colors"
                                style={{ backgroundColor: playingAudio === 'informal' ? '#1B2A4A' : 'rgba(27,42,74,0.08)' }}
                            >
                                {playingAudio === 'informal'
                                    ? <Pause size={18} className="text-white" />
                                    : <Play size={18} style={{ color: '#1B2A4A' }} />
                                }
                            </button>
                        </div>
                        <p className="font-medium text-base mb-1" style={{ color: '#E67E22' }}>{current.phrase.roman}</p>
                        <p className="text-xl font-semibold mb-3" style={{ color: '#1B2A4A' }}>{current.phrase.english}</p>
                        <p className="text-sm text-gray-600 mb-2">
                            <span className="font-semibold">When to use:</span> {current.phrase.usage}
                        </p>
                        <p className="text-sm text-gray-600 mb-2">
                            <span className="font-semibold">Translation:</span> {current.phrase.english}
                        </p>
                        <p className="text-gray-400 italic text-xs">{current.phrase.note}</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-5 rounded-xl border border-gray-200" style={{ backgroundColor: 'white' }}>
                            <h4 className="text-[10px] font-bold uppercase tracking-[0.15em] mb-2" style={{ color: '#3B82F6' }}>Formal</h4>
                            <p className="text-base font-bold mb-1" style={{ color: '#1B2A4A' }}>{current.comparison.formal.phrase}</p>
                            <p className="text-xs text-gray-500">{current.comparison.formal.use}</p>
                        </div>
                        <div className="p-5 rounded-xl border border-gray-200" style={{ backgroundColor: 'white' }}>
                            <h4 className="text-[10px] font-bold uppercase tracking-[0.15em] mb-2" style={{ color: '#E67E22' }}>Informal</h4>
                            <p className="text-base font-bold mb-1" style={{ color: '#1B2A4A' }}>{current.comparison.informal.phrase}</p>
                            <p className="text-xs text-gray-500">{current.comparison.informal.use}</p>
                        </div>
                    </div>
                </div>
            );
        }

        if (current.type === "final-quiz") {
            return (
                <div className="bg-white rounded-2xl shadow-sm p-8 border border-gray-200">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: 'rgba(230,126,34,0.1)' }}>
                            <Trophy style={{ color: '#E67E22' }} size={18} />
                        </div>
                        <h2 className="text-xl font-bold" style={{ color: '#1B2A4A' }}>{current.title}</h2>
                    </div>

                    <div className="space-y-5">
                        {current.questions.map((q, qIdx) => (
                            <div key={qIdx} className="p-5 rounded-xl border border-gray-200" style={{ backgroundColor: '#F7F5F2' }}>
                                <div className="flex items-center gap-3 mb-4">
                                    <span className="flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center text-white text-xs font-bold" style={{ backgroundColor: '#E67E22' }}>
                                        {qIdx + 1}
                                    </span>
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
                                                className={`w-full p-3.5 rounded-xl text-left text-sm font-medium transition-all flex items-center justify-between gap-3 ${
                                                    showResult && isSelected && isCorrect
                                                        ? 'bg-white border-2 text-green-700'
                                                        : showResult && isSelected && !isCorrect
                                                            ? 'bg-white border-2 border-red-300 text-red-600'
                                                            : showResult && isCorrect
                                                                ? 'bg-white border-2 text-green-700'
                                                                : 'bg-white border border-gray-200 text-gray-700 hover:border-gray-300'
                                                }`}
                                                style={
                                                    showResult && ((isSelected && isCorrect) || (!isSelected && isCorrect))
                                                        ? { borderColor: '#059669' }
                                                        : {}
                                                }
                                            >
                                                <span>{option.text}</span>
                                                {showResult && isSelected && isCorrect && (
                                                    <span className="flex-shrink-0 w-6 h-6 rounded-md flex items-center justify-center" style={{ backgroundColor: '#059669' }}>
                                                        <CheckCircle size={13} className="text-white" />
                                                    </span>
                                                )}
                                                {showResult && isSelected && !isCorrect && (
                                                    <span className="flex-shrink-0 w-6 h-6 rounded-md bg-red-500 flex items-center justify-center">
                                                        <span className="text-white text-xs font-bold">✕</span>
                                                    </span>
                                                )}
                                                {showResult && !isSelected && isCorrect && (
                                                    <span className="flex-shrink-0 w-6 h-6 rounded-md flex items-center justify-center" style={{ backgroundColor: 'rgba(5,150,105,0.15)' }}>
                                                        <CheckCircle size={13} style={{ color: '#059669' }} />
                                                    </span>
                                                )}
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
                            className="w-full mt-6 text-white px-6 py-3.5 rounded-xl font-semibold text-sm transition-all hover:-translate-y-0.5 shadow-md hover:shadow-lg"
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

    const CompletionSummary = () => {
        const { correct, total, score } = calculateScore();
        return (
            <div className="bg-white rounded-2xl shadow-sm p-8 border border-gray-200">
                <div className="flex justify-center mb-6">
                    <div className="w-18 h-18 rounded-2xl flex items-center justify-center" style={{ backgroundColor: 'rgba(5,150,105,0.1)', width: '72px', height: '72px' }}>
                        <Trophy size={32} style={{ color: '#059669' }} />
                    </div>
                </div>

                <h2 className="text-2xl font-display text-center mb-2" style={{ color: '#1B2A4A', fontFamily: "'DM Serif Display', Georgia, serif" }}>
                    Lesson Complete
                </h2>
                <p className="text-center text-gray-400 text-sm mb-8">
                    You've mastered Panjabi greetings
                </p>

                <div className="grid grid-cols-3 gap-3 mb-6">
                    <div className="p-4 rounded-xl text-center border border-gray-200" style={{ backgroundColor: '#F7F5F2' }}>
                        <div className="text-2xl font-bold mb-0.5" style={{ color: '#3B82F6' }}>{score}%</div>
                        <p className="text-[10px] text-gray-400 font-medium">Score</p>
                    </div>
                    <div className="p-4 rounded-xl text-center border border-gray-200" style={{ backgroundColor: '#F7F5F2' }}>
                        <div className="text-2xl font-bold mb-0.5" style={{ color: '#059669' }}>{correct}</div>
                        <p className="text-[10px] text-gray-400 font-medium">Correct</p>
                    </div>
                    <div className="p-4 rounded-xl text-center border border-gray-200" style={{ backgroundColor: '#F7F5F2' }}>
                        <div className="text-2xl font-bold mb-0.5" style={{ color: '#E67E22' }}>{total - correct}</div>
                        <p className="text-[10px] text-gray-400 font-medium">Incorrect</p>
                    </div>
                </div>

                {supabase && userId && (
                    <div className="border-l-4 p-3 rounded-r-xl mb-6" style={{ borderColor: '#059669', backgroundColor: '#F7F5F2' }}>
                        <div className="flex items-center gap-2">
                            <CheckCircle size={16} style={{ color: '#059669' }} />
                            <p className="text-xs text-gray-600 font-medium">Progress saved to your profile</p>
                        </div>
                    </div>
                )}

                <div className="space-y-3">
                    <button
                        onClick={() => router.push("/lessons/lesson3/1")}
                        className="w-full flex items-center justify-center gap-2 text-white px-6 py-3.5 rounded-xl font-semibold transition-all text-sm shadow-md hover:shadow-lg hover:-translate-y-0.5"
                        style={{ backgroundColor: '#1B2A4A' }}
                    >
                        <span>Continue to Next Lesson</span>
                        <ArrowRight size={16} />
                    </button>
                    <button
                        onClick={() => {
                            setStep(0); setPlayingAudio(null); setSelectedPhrases([]); setSelectedDialogue(null);
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
                        <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-gray-400 mb-2">Lesson 1</p>
                        <h1 className="text-2xl mb-1" style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}>
                            Learn Panjabi Greetings
                        </h1>
                        <p className="text-sm text-gray-400">Master essential greetings for different situations</p>
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