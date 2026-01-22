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
    Clock,
    Sun,
    Moon,
    Sunrise,
    Sunset,
    Calendar,
    Coffee,
    Utensils,
    BedDouble,
    Briefcase,
    Users,
    Volume2
} from "lucide-react";
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null;

// Audio file mapping - maps Punjabi text to audio filename
const audioMap = {
    "ਕਿੰਨੇ ਵਜੇ ਹਨ?": "lesson5_001.mp3",
    "ਸਵੇਰੇ": "lesson5_002.mp3",
    "ਸ਼ਾਮ": "lesson5_003.mp3",
    "ਰਾਤ": "lesson5_004.mp3",
    "ਸੋਮਵਾਰ": "lesson5_005.mp3",
    "ਮੰਗਲਵਾਰ": "lesson5_006.mp3",
    "ਬੁੱਧਵਾਰ": "lesson5_007.mp3",
    "ਵੀਰਵਾਰ": "lesson5_008.mp3",
    "ਸ਼ੁੱਕਰਵਾਰ": "lesson5_009.mp3",
    "ਸ਼ਨੀਵਾਰ": "lesson5_010.mp3",
    "ਐਤਵਾਰ": "lesson5_011.mp3",
    "ਅੱਜ ਕਿਹੜਾ ਦਿਨ ਹੈ?": "lesson5_012.mp3",
    "ਕੱਲ੍ਹ": "lesson5_013.mp3",
    "ਮੈਂ ਉੱਠਦਾ/ਉੱਠਦੀ ਹਾਂ": "lesson5_014.mp3",
    "ਮੈਂ ਨਾਸ਼ਤਾ ਕਰਦਾ/ਕਰਦੀ ਹਾਂ": "lesson5_015.mp3",
    "ਮੈਂ ਚਾਹ ਪੀਂਦਾ/ਪੀਂਦੀ ਹਾਂ": "lesson5_016.mp3",
    "ਮੈਂ ਕੰਮ ਕਰਦਾ/ਕਰਦੀ ਹਾਂ": "lesson5_017.mp3",
    "ਮੈਂ ਖਾਣਾ ਖਾਂਦਾ/ਖਾਂਦੀ ਹਾਂ": "lesson5_018.mp3",
    "ਮੈਂ ਪੜ੍ਹਦਾ/ਪੜ੍ਹਦੀ ਹਾਂ": "lesson5_019.mp3",
    "ਮੈਂ ਘਰ ਆਉਂਦਾ/ਆਉਂਦੀ ਹਾਂ": "lesson5_020.mp3",
    "ਮੈਂ ਰਾਤ ਦਾ ਖਾਣਾ ਖਾਂਦਾ/ਖਾਂਦੀ ਹਾਂ": "lesson5_021.mp3",
    "ਮੈਂ ਸੌਂਦਾ/ਸੌਂਦੀ ਹਾਂ": "lesson5_022.mp3"
};

// Audio player component
const AudioButton = ({ punjabi }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const audioFilename = audioMap[punjabi];

    if (!audioFilename) return null;

    const playAudio = () => {
        const audio = new Audio(`/audio/lesson5_audio/${audioFilename}`);
        setIsPlaying(true);
        audio.play();
        audio.onended = () => setIsPlaying(false);
        audio.onerror = () => setIsPlaying(false);
    };

    return (
        <button
            onClick={playAudio}
            disabled={isPlaying}
            className={`p-2 rounded-lg transition-all ${
                isPlaying
                    ? 'bg-blue-100 text-blue-600'
                    : 'bg-gray-100 text-gray-600 hover:bg-blue-50 hover:text-blue-600'
            }`}
            aria-label="Play audio"
        >
            <Volume2 size={18} />
        </button>
    );
};

const lessonContent = [
    {
        type: "intro",
        title: "Daily Routines & Time",
        content: "Learn to describe your day and tell time in Panjabi essential skills for sharing your life with family.",
        points: [
            "Telling time in Panjabi",
            "Days of the week",
            "Daily activities & routines",
            "Describing your schedule"
        ]
    },
    {
        type: "time-basics",
        title: "Telling Time (ਸਮਾਂ)",
        subtitle: "Master the essentials",
        intro: "Panjabi has special words for telling time that make it simpler than English!",
        basics: [
            {
                punjabi: "ਕਿੰਨੇ ਵਜੇ ਹਨ?",
                roman: "Kinne vaje han?",
                english: "What time is it?",
                icon: Clock
            }
        ],
        specialWords: {
            title: "Three Magic Time Words",
            words: [
                {
                    word: "ਸਵਾ (Sava)",
                    meaning: "Quarter past (:15)",
                    example: "4:15 = Sava chaar"
                },
                {
                    word: "ਸਾਢੇ (Saadhe)",
                    meaning: "Half past (:30)",
                    example: "3:30 = Saadhe tinn"
                },
                {
                    word: "ਪੌਣੇ (Paunne)",
                    meaning: "Quarter to (:45)",
                    example: "5:45 = Paunne chhe"
                }
            ]
        },
        timeOfDay: [
            {
                punjabi: "ਸਵੇਰੇ",
                roman: "Savere",
                english: "Morning",
                icon: Sunrise,
                example: "Savere 7 vajje = 7 AM"
            },
            {
                punjabi: "ਸ਼ਾਮ",
                roman: "Shaam",
                english: "Evening",
                icon: Sunset,
                example: "Shaam 6 vajje = 6 PM"
            },
            {
                punjabi: "ਰਾਤ",
                roman: "Raat",
                english: "Night",
                icon: Moon,
                example: "Raat 10 vajje = 10 PM"
            }
        ],
        tip: "Instead of saying exact minutes, Panjabi uses these three special words. Much easier!"
    },
    {
        type: "days-week",
        title: "Days of the Week (ਹਫ਼ਤੇ ਦੇ ਦਿਨ)",
        subtitle: "Seven days to know",
        intro: "Each day is named after a celestial body. Fun fact: they're similar to English!",
        days: [
            {
                punjabi: "ਸੋਮਵਾਰ",
                roman: "Somvaar",
                english: "Monday",
                meaning: "Moon Day"
            },
            {
                punjabi: "ਮੰਗਲਵਾਰ",
                roman: "Mangalvaar",
                english: "Tuesday",
                meaning: "Mars Day"
            },
            {
                punjabi: "ਬੁੱਧਵਾਰ",
                roman: "Buddhvaar",
                english: "Wednesday",
                meaning: "Mercury Day"
            },
            {
                punjabi: "ਵੀਰਵਾਰ",
                roman: "Veervaar",
                english: "Thursday",
                meaning: "Jupiter Day"
            },
            {
                punjabi: "ਸ਼ੁੱਕਰਵਾਰ",
                roman: "Shukkarvaar",
                english: "Friday",
                meaning: "Venus Day"
            },
            {
                punjabi: "ਸ਼ਨੀਵਾਰ",
                roman: "Shaneevaar",
                english: "Saturday",
                meaning: "Saturn Day"
            },
            {
                punjabi: "ਐਤਵਾਰ",
                roman: "Aitvaar",
                english: "Sunday",
                meaning: "Sun Day"
            }
        ],
        essentialPhrases: [
            {
                punjabi: "ਅੱਜ ਕਿਹੜਾ ਦਿਨ ਹੈ?",
                roman: "Ajj kihda din hai?",
                english: "What day is today?"
            },
            {
                punjabi: "ਕੱਲ੍ਹ",
                roman: "Kallh",
                english: "Yesterday / Tomorrow",
                note: "Same word for both!"
            }
        ],
        culturalNote: "Kallh (ਕੱਲ੍ਹ) means both yesterday AND tomorrow. You figure it out from context!"
    },
    {
        type: "daily-activities",
        title: "Daily Activities (ਰੋਜ਼ਾਨਾ ਕੰਮ)",
        subtitle: "Talk about your day",
        genderNote: "Male speakers add 'da', female speakers add 'dee' to verbs",
        sections: [
            {
                title: "Morning (ਸਵੇਰੇ)",
                icon: Sunrise,
                activities: [
                    {
                        punjabi: "ਮੈਂ ਉੱਠਦਾ/ਉੱਠਦੀ ਹਾਂ",
                        roman: "Main uthda/uthdee haan",
                        english: "I wake up"
                    },
                    {
                        punjabi: "ਮੈਂ ਨਾਸ਼ਤਾ ਕਰਦਾ/ਕਰਦੀ ਹਾਂ",
                        roman: "Main naashta karda/kardee haan",
                        english: "I eat breakfast"
                    },
                    {
                        punjabi: "ਮੈਂ ਚਾਹ ਪੀਂਦਾ/ਪੀਂਦੀ ਹਾਂ",
                        roman: "Main chaah peenda/peendee haan",
                        english: "I drink tea"
                    }
                ]
            },
            {
                title: "Day (ਦਿਨ)",
                icon: Sun,
                activities: [
                    {
                        punjabi: "ਮੈਂ ਕੰਮ ਕਰਦਾ/ਕਰਦੀ ਹਾਂ",
                        roman: "Main kamm karda/kardee haan",
                        english: "I work"
                    },
                    {
                        punjabi: "ਮੈਂ ਖਾਣਾ ਖਾਂਦਾ/ਖਾਂਦੀ ਹਾਂ",
                        roman: "Main khaana khaanda/khaandee haan",
                        english: "I eat lunch"
                    },
                    {
                        punjabi: "ਮੈਂ ਪੜ੍ਹਦਾ/ਪੜ੍ਹਦੀ ਹਾਂ",
                        roman: "Main parhda/parhdee haan",
                        english: "I study"
                    }
                ]
            },
            {
                title: "Evening/Night (ਸ਼ਾਮ/ਰਾਤ)",
                icon: Moon,
                activities: [
                    {
                        punjabi: "ਮੈਂ ਘਰ ਆਉਂਦਾ/ਆਉਂਦੀ ਹਾਂ",
                        roman: "Main ghar aaunda/aaundee haan",
                        english: "I come home"
                    },
                    {
                        punjabi: "ਮੈਂ ਰਾਤ ਦਾ ਖਾਣਾ ਖਾਂਦਾ/ਖਾਂਦੀ ਹਾਂ",
                        roman: "Main raat da khaana khaanda/khaandee haan",
                        english: "I eat dinner"
                    },
                    {
                        punjabi: "ਮੈਂ ਸੌਂਦਾ/ਸੌਂਦੀ ਹਾਂ",
                        roman: "Main saunda/saundee haan",
                        english: "I sleep"
                    }
                ]
            }
        ]
    },
    {
        type: "scenario-practice",
        title: "Practice: Talk to Family",
        subtitle: "Answer questions about your day",
        scenarios: [
            {
                id: 1,
                situation: "Tu savere kinne vajje uthda/uthdee hain?",
                translation: "What time do you wake up in the morning?",
                person: "Daadi Ji (Grandmother)",
                options: [
                    {
                        text: "Savere 7 vajje (7 AM)",
                        correct: true,
                        explanation: "Perfect! Clear morning time."
                    },
                    {
                        text: "Raat 7 vajje (7 at night)",
                        correct: false,
                        explanation: "That would mean waking up at 7 PM!"
                    }
                ]
            },
            {
                id: 2,
                situation: "Ajj kihda din hai?",
                translation: "What day is today?",
                person: "Veer Ji (Older Brother)",
                options: [
                    {
                        text: "Ajj Somvaar hai (Today is Monday)",
                        correct: true,
                        explanation: "Excellent! You stated today's day correctly."
                    },
                    {
                        text: "Kallh Somvaar hai (Yesterday/Tomorrow is Monday)",
                        correct: false,
                        explanation: "This says Monday is yesterday or tomorrow, not today."
                    }
                ]
            },
            {
                id: 3,
                situation: "Tu raat kinne vajje saunda/saundee hain?",
                translation: "What time do you sleep at night?",
                person: "Pita Ji (Father)",
                options: [
                    {
                        text: "Raat 11 vajje (11 PM)",
                        correct: true,
                        explanation: "Perfect! Clear bedtime with night indicator."
                    },
                    {
                        text: "Savere 11 vajje (11 AM)",
                        correct: false,
                        explanation: "This means sleeping at 11 in the morning!"
                    }
                ]
            }
        ]
    },
    {
        type: "final-quiz",
        title: "Test Your Knowledge",
        questions: [
            {
                question: "How do you ask 'What time is it?' in Panjabi?",
                options: [
                    { text: "Tusi kiven ho? (ਤੁਸੀਂ ਕਿਵੇਂ ਹੋ?)", correct: false },
                    { text: "Kinne vajje han? (ਕਿੰਨੇ ਵਜੇ ਹਨ?)", correct: true },
                    { text: "Kihda din hai? (ਕਿਹੜਾ ਦਿਨ ਹੈ?)", correct: false }
                ]
            },
            {
                question: "What does 'Saadhe tinn vajje han' mean?",
                options: [
                    { text: "It's 3 o'clock", correct: false },
                    { text: "It's 3:30", correct: true },
                    { text: "It's 3:45", correct: false }
                ]
            },
            {
                question: "Which day is 'Somvaar' (ਸੋਮਵਾਰ)?",
                options: [
                    { text: "Sunday", correct: false },
                    { text: "Monday", correct: true },
                    { text: "Saturday", correct: false }
                ]
            },
            {
                question: "What does 'Kallh' (ਕੱਲ੍ਹ) mean?",
                options: [
                    { text: "Today", correct: false },
                    { text: "Yesterday OR tomorrow (context-dependent)", correct: true },
                    { text: "Last week", correct: false }
                ]
            },
            {
                question: "How do you say 'I wake up' (if you're male)?",
                options: [
                    { text: "Main uthda haan (ਮੈਂ ਉੱਠਦਾ ਹਾਂ)", correct: true },
                    { text: "Main uthdee haan (ਮੈਂ ਉੱਠਦੀ ਹਾਂ)", correct: false },
                    { text: "Tusi uthde ho (ਤੁਸੀਂ ਉੱਠਦੇ ਹੋ)", correct: false }
                ]
            },
            {
                question: "What does 'Savere' (ਸਵੇਰੇ) mean?",
                options: [
                    { text: "Evening", correct: false },
                    { text: "Afternoon", correct: false },
                    { text: "Morning", correct: true }
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

    const calculateScore = () => {
        let correct = 0;
        let total = 0;

        if (quizComplete) {
            // Find the final-quiz content
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
            const { correct, total, score } = calculateScore();

            const { error } = await supabase
                .from('lesson_progress')
                .upsert({
                    user_id: userId,
                    lesson_id: 'lesson-5-daily-routines',
                    lesson_name: 'Daily Routines & Time',
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

        if (current.type === "time-basics") {
            return (
                <div className="space-y-6">
                    <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">{current.title}</h2>
                        <p className="text-base text-gray-600 mb-4">{current.subtitle}</p>
                        <p className="text-gray-700 mb-6 leading-relaxed">{current.intro}</p>

                        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-5 rounded-xl border-2 border-blue-200 mb-6">
                            <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center gap-3">
                                    <Clock size={24} className="text-blue-600" />
                                    <span className="text-2xl font-bold text-gray-900">{current.basics[0].punjabi}</span>
                                </div>
                                <AudioButton punjabi={current.basics[0].punjabi} />
                            </div>
                            <p className="text-lg text-gray-700 font-semibold mb-1">{current.basics[0].roman}</p>
                            <p className="text-base text-gray-600">{current.basics[0].english}</p>
                        </div>

                        <h3 className="text-xl font-bold text-gray-900 mb-4">{current.specialWords.title}</h3>
                        <div className="space-y-3 mb-6">
                            {current.specialWords.words.map((item, idx) => (
                                <div key={idx} className="bg-gradient-to-r from-orange-50 to-orange-100 p-4 rounded-lg border-2 border-orange-200">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-xl font-bold text-gray-900 mb-1">{item.word}</p>
                                            <p className="text-sm text-gray-700">{item.meaning}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-sm text-blue-600 font-semibold">{item.example}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <h3 className="text-xl font-bold text-gray-900 mb-4">Time of Day</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                            {current.timeOfDay.map((item, idx) => {
                                const Icon = item.icon;
                                return (
                                    <div key={idx} className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-xl border-2 border-blue-200">
                                        <div className="flex items-center justify-between mb-3">
                                            <div className="flex items-center gap-2">
                                                <Icon size={20} className="text-blue-600" />
                                                <span className="text-lg font-bold text-gray-900">{item.punjabi}</span>
                                            </div>
                                            <AudioButton punjabi={item.punjabi} />
                                        </div>
                                        <p className="text-sm text-gray-700 font-semibold mb-2">{item.roman}</p>
                                        <p className="text-xs text-gray-600">{item.example}</p>
                                    </div>
                                );
                            })}
                        </div>

                        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r">
                            <div className="flex items-start gap-2">
                                <Lightbulb size={18} className="text-blue-600 flex-shrink-0 mt-0.5" />
                                <p className="text-sm text-gray-800">{current.tip}</p>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }

        if (current.type === "days-week") {
            return (
                <div className="space-y-6">
                    <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">{current.title}</h2>
                        <p className="text-base text-gray-600 mb-4">{current.subtitle}</p>
                        <p className="text-gray-700 mb-6 leading-relaxed">{current.intro}</p>

                        <div className="space-y-3 mb-6">
                            {current.days.map((day, idx) => (
                                <div key={idx} className="bg-gradient-to-r from-blue-50 to-orange-50 p-4 rounded-lg border-2 border-blue-200">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <div className="flex items-center gap-3 mb-1">
                                                <p className="text-xl font-bold text-gray-900">{day.punjabi}</p>
                                                <AudioButton punjabi={day.punjabi} />
                                            </div>
                                            <p className="text-sm text-gray-700 font-semibold">{day.roman} = {day.english}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-xs text-gray-500 italic">{day.meaning}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <h3 className="text-xl font-bold text-gray-900 mb-4">Essential Phrases</h3>
                        <div className="space-y-3 mb-6">
                            {current.essentialPhrases.map((phrase, idx) => (
                                <div key={idx} className="bg-gradient-to-r from-orange-50 to-orange-100 p-4 rounded-lg border-2 border-orange-200">
                                    <div className="flex items-center gap-3 mb-1">
                                        <p className="text-lg font-bold text-gray-900">{phrase.punjabi}</p>
                                        <AudioButton punjabi={phrase.punjabi} />
                                    </div>
                                    <p className="text-sm text-gray-700 font-semibold mb-1">{phrase.roman}</p>
                                    <p className="text-sm text-gray-600">{phrase.english}</p>
                                    {phrase.note && (
                                        <p className="text-xs text-blue-600 italic mt-2">{phrase.note}</p>
                                    )}
                                </div>
                            ))}
                        </div>

                        <div className="bg-orange-50 border-l-4 border-orange-500 p-4 rounded-r">
                            <div className="flex items-start gap-2">
                                <Lightbulb size={18} className="text-orange-600 flex-shrink-0 mt-0.5" />
                                <p className="text-sm text-gray-800">{current.culturalNote}</p>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }

        if (current.type === "daily-activities") {
            return (
                <div className="space-y-6">
                    <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">{current.title}</h2>
                        <p className="text-base text-gray-600 mb-6">{current.subtitle}</p>

                        <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r mb-6">
                            <div className="flex items-start gap-2">
                                <Lightbulb size={18} className="text-green-600 flex-shrink-0 mt-0.5" />
                                <p className="text-sm text-gray-800 font-semibold">{current.genderNote}</p>
                            </div>
                        </div>

                        {current.sections.map((section, sIdx) => {
                            const Icon = section.icon;
                            return (
                                <div key={sIdx} className="mb-6">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="p-2 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg">
                                            <Icon size={20} className="text-white" />
                                        </div>
                                        <h3 className="text-xl font-bold text-gray-900">{section.title}</h3>
                                    </div>
                                    <div className="space-y-3">
                                        {section.activities.map((activity, aIdx) => (
                                            <div key={aIdx} className="bg-gradient-to-r from-blue-50 to-orange-50 p-4 rounded-lg border-2 border-blue-200">
                                                <div className="flex items-center gap-3 mb-1">
                                                    <p className="text-lg font-bold text-gray-900">{activity.punjabi}</p>
                                                    <AudioButton punjabi={activity.punjabi} />
                                                </div>
                                                <p className="text-sm text-gray-700 font-semibold mb-1">{activity.roman}</p>
                                                <p className="text-sm text-gray-600">{activity.english}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            );
        }

        if (current.type === "scenario-practice") {
            return (
                <div className="space-y-6">
                    <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">{current.title}</h2>
                        <p className="text-base text-gray-600 mb-6">{current.subtitle}</p>

                        {current.scenarios.map((scenario) => {
                            const isAnswered = scenarioAnswers[scenario.id] !== undefined;
                            const selectedOption = scenarioAnswers[scenario.id];

                            return (
                                <div key={scenario.id} className="mb-6 bg-gradient-to-br from-blue-50 to-orange-50 p-5 rounded-xl border-2 border-blue-200">
                                    <div className="mb-4">
                                        <div className="flex items-center gap-2 mb-3">
                                            <Users size={18} className="text-blue-600" />
                                            <span className="text-sm font-semibold text-blue-600">{scenario.person}</span>
                                        </div>
                                        <p className="text-xl font-bold text-gray-900 mb-2">{scenario.situation}</p>
                                        <p className="text-sm text-gray-600 italic">{scenario.translation}</p>
                                    </div>

                                    <div className="space-y-3">
                                        {scenario.options.map((option, oIdx) => {
                                            const isSelected = selectedOption === oIdx;
                                            const showResult = isAnswered;
                                            const isCorrect = option.correct;

                                            return (
                                                <button
                                                    key={oIdx}
                                                    onClick={() => handleScenarioAnswer(scenario.id, oIdx)}
                                                    disabled={isAnswered}
                                                    className={`w-full p-4 rounded-lg text-left font-medium transition-all ${
                                                        showResult && isSelected && isCorrect
                                                            ? 'bg-green-100 border-2 border-green-500 text-green-800'
                                                            : showResult && isSelected && !isCorrect
                                                                ? 'bg-red-100 border-2 border-red-500 text-red-800'
                                                                : showResult && isCorrect
                                                                    ? 'bg-green-50 border-2 border-green-300 text-green-800'
                                                                    : isAnswered
                                                                        ? 'bg-gray-100 border-2 border-gray-300 text-gray-500 cursor-not-allowed'
                                                                        : 'bg-white border-2 border-gray-300 hover:border-blue-400 hover:bg-blue-50'
                                                    }`}
                                                >
                                                    <div className="flex items-center justify-between">
                                                        <span>{option.text}</span>
                                                        {showResult && isSelected && (
                                                            isCorrect ? (
                                                                <CheckCircle size={20} className="text-green-600" />
                                                            ) : (
                                                                <RotateCcw size={20} className="text-red-600" />
                                                            )
                                                        )}
                                                        {showResult && !isSelected && isCorrect && (
                                                            <CheckCircle size={20} className="text-green-600" />
                                                        )}
                                                    </div>
                                                </button>
                                            );
                                        })}
                                    </div>

                                    {isAnswered && (
                                        <div className="mt-4 p-3 bg-white rounded-lg border border-gray-200">
                                            <p className="text-sm text-gray-700">
                                                {scenario.options[selectedOption].explanation}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            );
                        })}

                        {scenarioComplete && (
                            <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r">
                                <div className="flex items-center gap-2">
                                    <CheckCircle size={18} className="text-green-600" />
                                    <p className="text-sm text-gray-800 font-medium">Great work! Ready for the quiz?</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            );
        }

        if (current.type === "final-quiz") {
            return (
                <div className="space-y-6">
                    <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-3 bg-gradient-to-br from-green-500 to-green-600 rounded-lg">
                                <Trophy size={24} className="text-white" />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900">{current.title}</h2>
                        </div>

                        {current.questions.map((q, qIdx) => {
                            const isAnswered = quizAnswers[qIdx] !== undefined;
                            const selectedOption = quizAnswers[qIdx];

                            return (
                                <div key={qIdx} className="mb-6 p-5 bg-gradient-to-br from-green-50 to-blue-50 rounded-xl border-2 border-green-200">
                                    <p className="text-lg font-bold text-gray-900 mb-4">
                                        {qIdx + 1}. {q.question}
                                    </p>

                                    <div className="space-y-3">
                                        {q.options.map((option, oIdx) => {
                                            const isSelected = selectedOption === oIdx;
                                            const showResult = isAnswered;
                                            const isCorrect = option.correct;

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
                                                                    : isAnswered
                                                                        ? 'bg-gray-100 border-2 border-gray-300 text-gray-500 cursor-not-allowed'
                                                                        : 'bg-white border-2 border-gray-300 hover:border-blue-400 hover:bg-blue-50'
                                                    }`}
                                                >
                                                    <span className="flex-1">{option.text}</span>
                                                    {showResult && isSelected && (
                                                        isCorrect ? (
                                                            <CheckCircle size={20} className="text-green-600 flex-shrink-0" />
                                                        ) : (
                                                            <RotateCcw size={20} className="text-red-600 flex-shrink-0" />
                                                        )
                                                    )}
                                                    {showResult && !isSelected && isCorrect && (
                                                        <CheckCircle size={20} className="text-green-600 flex-shrink-0" />
                                                    )}
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>
                            );
                        })}

                        {quizAnswers.length === current.questions.length && !quizComplete && (
                            <button
                                onClick={() => setQuizComplete(true)}
                                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-green-600 hover:to-green-700 transition-all text-sm shadow-md"
                            >
                                <CheckCircle size={18} />
                                <span>Submit Quiz</span>
                            </button>
                        )}

                        {quizComplete && (
                            <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r">
                                <div className="flex items-center gap-2">
                                    <Trophy size={18} className="text-green-600" />
                                    <p className="text-sm text-gray-800 font-medium">Quiz complete! Click 'Complete Lesson' to finish.</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            );
        }

        return null;
    };

    const CompletionSummary = () => {
        const { correct, total, score } = calculateScore();

        return (
            <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
                <div className="flex justify-center mb-6">
                    <div className="p-4 bg-gradient-to-br from-green-500 to-green-600 rounded-full">
                        <Trophy size={48} className="text-white" />
                    </div>
                </div>

                <h2 className="text-3xl font-bold text-center text-gray-900 mb-2">
                    Lesson Complete!
                </h2>
                <p className="text-center text-gray-600 mb-8">
                    You've learned daily routines and time in Panjabi!
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
                        <span className="text-xs font-semibold uppercase tracking-wide">Lesson 5: Back To Basics</span>
                    </div>
                    <h1 className="text-3xl font-bold mb-2">
                        Daily Routines & Time
                    </h1>
                    <p className="text-base text-blue-100">
                        Share your day and schedule with family
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