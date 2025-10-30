"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Sparkles, User, MapPin, Briefcase, Users, GraduationCap, ArrowRight, ArrowLeft, CheckCircle, XCircle } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";

export default function AboutMeLessonComplete() {
    const router = useRouter();
    const [currentStep, setCurrentStep] = useState(0);
    const [user, setUser] = useState(null);

    // Step 1: Name
    const [name, setName] = useState("");

    // Step 2: Age
    const [age, setAge] = useState("");
    const [gender, setGender] = useState("");

    // Step 3: From City
    const [fromCity, setFromCity] = useState("");

    // Step 4: Live City
    const [liveCity, setLiveCity] = useState("");

    // Step 5: Work/Study
    const [mode, setMode] = useState("");
    const [place, setPlace] = useState("");

    // Step 6: Siblings
    const [olderBrothers, setOlderBrothers] = useState(0);
    const [youngerSisters, setYoungerSisters] = useState(0);

    // Step 7: Quiz
    const [quizStep, setQuizStep] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [score, setScore] = useState(0);
    const [feedback, setFeedback] = useState("");

    const learningPoints = [
        { icon: User, text: "How to say your name", color: "text-blue-500" },
        { icon: Sparkles, text: "How to say how old you are", color: "text-purple-500" },
        { icon: MapPin, text: "Where you are from and what city you live in", color: "text-green-500" },
        { icon: Briefcase, text: "Where you study or where you work", color: "text-orange-500" },
        { icon: Users, text: "How many siblings you have", color: "text-pink-500" },
    ];

    const questions = [
        {
            id: 1,
            question: "How do you say 'My name is Priya' in Punjabi?",
            options: ["Mera nām Priya hai.", "Main Priya haan.", "Tera nām Priya hai.", "Maiṁ Priya ton haan."],
            correct: "Mera nām Priya hai."
        },
        {
            id: 2,
            question: "Which Punjabi sentence correctly means 'I am 25 years old' for a boy?",
            options: ["Maiṁ pacchī sālāṁ dī hāṁ", "Maiṁ pacchī sālāṁ dā hāṁ", "Maiṁ 25 nām dā hāṁ", "Maiṁ pacchī kam kardā hāṁ"],
            correct: "Maiṁ pacchī sālāṁ dā hāṁ"
        },
        {
            id: 3,
            question: "What does 'Tuhāḍī umar kinnī hai?' mean?",
            options: ["Where are you from?", "How old are you?", "What is your name?", "Where do you live?"],
            correct: "How old are you?"
        },
        {
            id: 4,
            question: "If Priya is 23 years old, what would she say?",
            options: ["Maiṁ teī sālāṁ dī hāṁ", "Maiṁ teī sālāṁ dā hāṁ", "Maiṁ Priya teī hāṁ", "Maiṁ sālāṁ dī Priya hāṁ"],
            correct: "Maiṁ teī sālāṁ dī hāṁ"
        },
        {
            id: 5,
            question: "How do you say 'I am from London' as a girl?",
            options: ["Maiṁ London ton āī hāṁ", "Maiṁ London ton āiā hāṁ", "Maiṁ London vich rahindī hāṁ", "Maiṁ London kam kardī hāṁ"],
            correct: "Maiṁ London ton āī hāṁ"
        },
        {
            id: 6,
            question: "Which Punjabi phrase means 'I live in Birmingham' for a girl?",
            options: ["Maiṁ Birmingham vich rahindā hāṁ", "Maiṁ Birmingham vich rahindī hāṁ", "Maiṁ Birmingham ton āī hāṁ", "Maiṁ Birmingham paṛhdā hāṁ"],
            correct: "Maiṁ Birmingham vich rahindī hāṁ"
        },
        {
            id: 7,
            question: "What does 'Maiṁ Heathrow Airport laī kam kardā hāṁ' mean?",
            options: ["I live at Heathrow Airport.", "I study at Heathrow Airport.", "I work at Heathrow Airport.", "I go to Heathrow Airport."],
            correct: "I work at Heathrow Airport."
        },
        {
            id: 8,
            question: "What is the difference between 'paṛhdā' and 'paṛhdī'?",
            options: ["They mean different things.", "They are different tenses.", "One is for boys, one is for girls.", "One is for young people, one is for adults."],
            correct: "One is for boys, one is for girls."
        },
        {
            id: 9,
            question: "Translate: 'I study at university' (boy).",
            options: ["Maiṁ university paṛhdā hāṁ", "Maiṁ university ton āiā hāṁ", "Maiṁ university laī kam kardā hāṁ", "Maiṁ university rahindā hāṁ"],
            correct: "Maiṁ university paṛhdā hāṁ"
        },
        {
            id: 10,
            question: "How would Priya say: 'I have two older brothers and one younger sister'?",
            options: ["Maiṁ do vaḍḍe bhrā atē ikk chhoṭī bhaiṇ hāṁ", "Maiṁ do chhoṭe bhrā atē ikk vaḍḍī bhaiṇ hāṁ", "Maiṁ do bhrā ikk bhaiṇ hāṁ", "Maiṁ do bhrā chhoṭī bhaiṇ hāṁ"],
            correct: "Maiṁ do vaḍḍe bhrā atē ikk chhoṭī bhaiṇ hāṁ"
        }
    ];

    useEffect(() => {
        const fetchUser = async () => {
            const { data: authData } = await supabase.auth.getUser();
            if (authData?.user) {
                const { data: userData } = await supabase
                    .from("users")
                    .select("id")
                    .eq("email", authData.user.email)
                    .single();
                setUser(userData);
            }
        };
        fetchUser();
    }, []);

    useEffect(() => {
        const saveProgress = async () => {
            if (currentStep === 7 && quizStep === questions.length && score === questions.length && user) {
                const { data: existing } = await supabase
                    .from("lesson_progress")
                    .select("id")
                    .eq("user_id", user.id)
                    .eq("lesson_id", "lesson3")
                    .maybeSingle();

                if (!existing) {
                    await supabase.from("lesson_progress").upsert({
                        user_id: user.id,
                        lesson_id: "lesson3",
                        completed: true
                    });
                    await supabase.rpc("increment_points", { add_points: 10 });
                }
            }
        };
        saveProgress();
    }, [currentStep, quizStep, score, user]);

    const handleAnswerSelection = (option) => {
        setSelectedAnswer(option);
        if (option === questions[quizStep].correct) {
            setFeedback("✅ Correct!");
            setScore(score + 1);
        } else {
            setFeedback("❌ Incorrect. The correct answer is: " + questions[quizStep].correct);
        }
    };

    const nextQuestion = () => {
        if (quizStep < questions.length - 1) {
            setQuizStep(quizStep + 1);
            setSelectedAnswer(null);
            setFeedback("");
        }
    };

    const canProceed = () => {
        switch(currentStep) {
            case 0: return true; // Introduction
            case 1: return name.trim().length > 0; // Name
            case 2: return age && gender; // Age
            case 3: return fromCity && gender; // From
            case 4: return liveCity && gender; // Live
            case 5: return mode && place && gender; // Work/Study
            case 6: return true; // Siblings (optional)
            case 7: return true; // Quiz
            default: return false;
        }
    };

    const renderStep = () => {
        switch(currentStep) {
            case 0:
                return (
                    <div className="animate-fade-in">
                        {/* Avatars Section */}
                        <div className="flex justify-center gap-8 mb-10">
                            <div className="flex flex-col items-center group cursor-pointer transition-transform hover:scale-110">
                                <div className="relative">
                                    <Image src="/avatars/avatar6.png" alt="Aman" width={90} height={90} className="rounded-full border-4 border-blue-400 shadow-xl transition-all group-hover:border-blue-500" />
                                    <div className="absolute -bottom-1 -right-1 bg-blue-500 text-white rounded-full w-7 h-7 flex items-center justify-center shadow-lg">
                                        <span className="text-xs font-bold">A</span>
                                    </div>
                                </div>
                                <p className="text-sm font-bold text-blue-600 mt-3">Aman</p>
                            </div>
                            <div className="flex flex-col items-center group cursor-pointer transition-transform hover:scale-110">
                                <div className="relative">
                                    <Image src="/avatars/avatar5.png" alt="Priya" width={90} height={90} className="rounded-full border-4 border-pink-400 shadow-xl transition-all group-hover:border-pink-500" />
                                    <div className="absolute -bottom-1 -right-1 bg-pink-500 text-white rounded-full w-7 h-7 flex items-center justify-center shadow-lg">
                                        <span className="text-xs font-bold">P</span>
                                    </div>
                                </div>
                                <p className="text-sm font-bold text-pink-600 mt-3">Priya</p>
                            </div>
                        </div>

                        {/* Main Heading */}
                        <div className="text-center mb-6">
                            <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-3">Welcome to 'A Bit About Me'</h1>
                            <p className="text-lg text-gray-700 leading-relaxed max-w-2xl mx-auto">
                                In this section, we will teach you how to introduce and talk a little about yourself in Punjabi.
                            </p>
                        </div>

                        {/* Learning Points Grid */}
                        <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-6 sm:p-8 mb-8">
                            <h3 className="text-xl font-bold text-gray-800 mb-6 text-center flex items-center justify-center gap-2">
                                <Sparkles className="w-6 h-6 text-yellow-500" />
                                What You'll Learn
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {learningPoints.map((point, index) => {
                                    const Icon = point.icon;
                                    return (
                                        <div key={index} className="flex items-start gap-3 bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-all hover:scale-105">
                                            <div className={`${point.color} bg-opacity-10 rounded-lg p-2 flex-shrink-0`}>
                                                <Icon className={`w-5 h-5 ${point.color}`} />
                                            </div>
                                            <p className="text-sm text-gray-700 font-medium leading-snug pt-1">{point.text}</p>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        <p className="text-center text-gray-600 mb-8">
                            To make it easier for you, we will be using Aman and Priya as examples. At the end, you will be able to test your knowledge through a range of interactive exercises.
                        </p>
                    </div>
                );

            case 1:
                return (
                    <div className="animate-fade-in space-y-6">
                        <div className="flex flex-col items-center mb-6">
                            <div className="relative w-20 h-20 mb-3">
                                <Image src="/avatars/avatar5.png" alt="Priya" fill className="rounded-full object-cover border-4 border-pink-500 shadow-lg" />
                            </div>
                            <h2 className="text-xl font-bold text-pink-600">Priya asks:</h2>
                        </div>

                        <h3 className="text-2xl sm:text-3xl font-bold text-gray-800 text-center">What's your name?</h3>
                        <p className="text-gray-600 text-center">Type your name below to learn how to say it in Punjabi!</p>

                        <input
                            type="text"
                            value={name}
                            placeholder="e.g. Aman"
                            onChange={(e) => setName(e.target.value)}
                            className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
                        />

                        {name && (
                            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-2xl border-2 border-blue-200 text-left space-y-2 animate-fade-in">
                                <p className="text-xl text-gray-800 font-bold">ਮੇਰਾ ਨਾਮ {name} ਹੈ।</p>
                                <p className="text-base italic text-gray-700">Mera naam {name} hai.</p>
                                <p className="text-sm text-gray-600">My name is {name}.</p>
                            </div>
                        )}
                    </div>
                );

            case 2:
                return (
                    <div className="animate-fade-in space-y-6">
                        <div className="flex flex-col items-center mb-6">
                            <div className="relative w-20 h-20 mb-3">
                                <Image src="/avatars/avatar6.png" alt="Aman" fill className="rounded-full object-cover border-4 border-blue-500 shadow-lg" />
                            </div>
                            <h2 className="text-xl font-bold text-blue-600">Aman says:</h2>
                        </div>

                        <h3 className="text-2xl sm:text-3xl font-bold text-gray-800 text-center">How old are you?</h3>
                        <div className="bg-blue-50 p-4 rounded-xl text-center">
                            <p className="text-gray-700">Someone might ask:</p>
                            <p className="font-bold text-lg mt-1">Tuhāḍī umar kinnī hai?</p>
                            <p className="text-sm text-gray-600">ਤੁਹਾਡੀ ਉਮਰ ਕਿੰਨੀ ਹੈ?</p>
                        </div>

                        <input
                            type="number"
                            min="1"
                            max="120"
                            placeholder="Enter your age"
                            value={age}
                            onChange={(e) => setAge(e.target.value)}
                            className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
                        />

                        <div className="flex gap-4 justify-center">
                            <label className="flex items-center gap-2 cursor-pointer bg-white px-6 py-3 rounded-xl border-2 border-gray-300 hover:border-blue-400 transition">
                                <input type="radio" name="gender" value="male" checked={gender === "male"} onChange={(e) => setGender(e.target.value)} className="w-4 h-4" />
                                <span className="font-medium">Male</span>
                            </label>
                            <label className="flex items-center gap-2 cursor-pointer bg-white px-6 py-3 rounded-xl border-2 border-gray-300 hover:border-pink-400 transition">
                                <input type="radio" name="gender" value="female" checked={gender === "female"} onChange={(e) => setGender(e.target.value)} className="w-4 h-4" />
                                <span className="font-medium">Female</span>
                            </label>
                        </div>

                        {age && gender && (
                            <div className="space-y-4 animate-fade-in">
                                <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-2xl border-2 border-blue-200 text-left space-y-2">
                                    <p className="text-xl font-bold text-gray-800">
                                        {gender === "male" ? `ਮੈਂ ${age} ਸਾਲਾਂ ਦਾ ਹਾਂ।` : `ਮੈਂ ${age} ਸਾਲਾਂ ਦੀ ਹਾਂ।`}
                                    </p>
                                    <p className="text-base italic text-gray-700">
                                        {gender === "male" ? `Main ${age} saalan da haan.` : `Main ${age} saalan di haan.`}
                                    </p>
                                    <p className="text-sm text-gray-600">I am {age} years old.</p>
                                </div>

                                <div className="bg-yellow-50 p-4 rounded-xl border-2 border-yellow-200 text-sm text-left">
                                    <p className="font-bold mb-2">💡 Tip:</p>
                                    <p>Use <span className="font-bold text-blue-600">"ਦਾ"</span> if you're a boy and <span className="font-bold text-pink-600">"ਦੀ"</span> if you're a girl.</p>
                                    <p className="mt-3 font-semibold text-blue-700">📚 Check out the 'Numbers Chart' in Learning Resources!</p>
                                </div>
                            </div>
                        )}
                    </div>
                );

            case 3:
                return (
                    <div className="animate-fade-in space-y-6">
                        <div className="flex flex-col items-center mb-6">
                            <div className="relative w-20 h-20 mb-3">
                                <Image src="/avatars/avatar5.png" alt="Priya" fill className="rounded-full object-cover border-4 border-pink-500 shadow-lg" />
                            </div>
                            <h2 className="text-xl font-bold text-pink-600">Priya asks:</h2>
                        </div>

                        <h3 className="text-2xl sm:text-3xl font-bold text-gray-800 text-center">Where are you from?</h3>

                        <input
                            type="text"
                            value={fromCity}
                            placeholder="e.g. London"
                            onChange={(e) => setFromCity(e.target.value)}
                            className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
                        />

                        {!gender && (
                            <div className="flex gap-4 justify-center">
                                <label className="flex items-center gap-2 cursor-pointer bg-white px-6 py-3 rounded-xl border-2 border-gray-300 hover:border-blue-400 transition">
                                    <input type="radio" name="gender2" value="male" onChange={(e) => setGender(e.target.value)} className="w-4 h-4" />
                                    <span className="font-medium">Male</span>
                                </label>
                                <label className="flex items-center gap-2 cursor-pointer bg-white px-6 py-3 rounded-xl border-2 border-gray-300 hover:border-pink-400 transition">
                                    <input type="radio" name="gender2" value="female" onChange={(e) => setGender(e.target.value)} className="w-4 h-4" />
                                    <span className="font-medium">Female</span>
                                </label>
                            </div>
                        )}

                        {fromCity && gender && (
                            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-2xl border-2 border-blue-200 text-left space-y-2 animate-fade-in">
                                <p className="text-xl font-bold text-gray-800">
                                    {gender === "male" ? `ਮੈਂ ${fromCity} ਤੋਂ ਆਇਆ ਹਾਂ।` : `ਮੈਂ ${fromCity} ਤੋਂ ਆਈ ਹਾਂ।`}
                                </p>
                                <p className="text-base italic text-gray-700">
                                    {gender === "male" ? `Main ${fromCity} ton āiā haan.` : `Main ${fromCity} ton āī haan.`}
                                </p>
                                <p className="text-sm text-gray-600">I am from {fromCity}.</p>
                            </div>
                        )}
                    </div>
                );

            case 4:
                return (
                    <div className="animate-fade-in space-y-6">
                        <div className="flex flex-col items-center mb-6">
                            <div className="relative w-20 h-20 mb-3">
                                <Image src="/avatars/avatar6.png" alt="Aman" fill className="rounded-full object-cover border-4 border-blue-500 shadow-lg" />
                            </div>
                            <h2 className="text-xl font-bold text-blue-600">Aman asks:</h2>
                        </div>

                        <h3 className="text-2xl sm:text-3xl font-bold text-gray-800 text-center">Where do you live now?</h3>

                        <input
                            type="text"
                            value={liveCity}
                            placeholder="e.g. Birmingham"
                            onChange={(e) => setLiveCity(e.target.value)}
                            className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
                        />

                        {liveCity && gender && (
                            <div className="space-y-4 animate-fade-in">
                                <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-2xl border-2 border-blue-200 text-left space-y-2">
                                    <p className="text-xl font-bold text-gray-800">
                                        {gender === "male" ? `ਮੈਂ ${liveCity} ਵਿੱਚ ਰਹਿੰਦਾ ਹਾਂ।` : `ਮੈਂ ${liveCity} ਵਿੱਚ ਰਹਿੰਦੀ ਹਾਂ।`}
                                    </p>
                                    <p className="text-base italic text-gray-700">
                                        {gender === "male" ? `Main ${liveCity} vich rahindā haan.` : `Main ${liveCity} vich rahindī haan.`}
                                    </p>
                                    <p className="text-sm text-gray-600">I live in {liveCity}.</p>
                                </div>

                                <div className="bg-yellow-50 p-4 rounded-xl border-2 border-yellow-200 text-sm text-left">
                                    <p className="font-bold mb-2">📖 Examples:</p>
                                    <ul className="space-y-2">
                                        <li>Aman: <span className="font-bold">ਮੈਂ Southall ਵਿੱਚ ਰਹਿੰਦਾ ਹਾਂ।</span></li>
                                        <li>Priya: <span className="font-bold">ਮੈਂ Birmingham ਵਿੱਚ ਰਹਿੰਦੀ ਹਾਂ।</span></li>
                                    </ul>
                                </div>
                            </div>
                        )}
                    </div>
                );

            case 5:
                return (
                    <div className="animate-fade-in space-y-6">
                        <div className="flex flex-col items-center mb-6">
                            <div className="relative w-20 h-20 mb-3">
                                <Image src="/avatars/avatar5.png" alt="Priya" fill className="rounded-full object-cover border-4 border-pink-500 shadow-lg" />
                            </div>
                            <h2 className="text-xl font-bold text-pink-600">Priya asks:</h2>
                        </div>

                        <h3 className="text-2xl sm:text-3xl font-bold text-gray-800 text-center">Where do you study or work?</h3>

                        <div className="flex gap-4 justify-center">
                            <label className="flex items-center gap-2 cursor-pointer bg-white px-6 py-3 rounded-xl border-2 border-gray-300 hover:border-blue-400 transition">
                                <input type="radio" name="mode" value="study" checked={mode === "study"} onChange={() => setMode("study")} className="w-4 h-4" />
                                <span className="font-medium">Study</span>
                            </label>
                            <label className="flex items-center gap-2 cursor-pointer bg-white px-6 py-3 rounded-xl border-2 border-gray-300 hover:border-orange-400 transition">
                                <input type="radio" name="mode" value="work" checked={mode === "work"} onChange={() => setMode("work")} className="w-4 h-4" />
                                <span className="font-medium">Work</span>
                            </label>
                        </div>

                        <input
                            type="text"
                            placeholder="e.g. Heathrow Airport"
                            value={place}
                            onChange={(e) => setPlace(e.target.value)}
                            className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
                        />

                        {!gender && (
                            <div className="flex gap-4 justify-center">
                                <label className="flex items-center gap-2 cursor-pointer bg-white px-6 py-3 rounded-xl border-2 border-gray-300 hover:border-blue-400 transition">
                                    <input type="radio" name="gender3" value="male" onChange={(e) => setGender(e.target.value)} className="w-4 h-4" />
                                    <span className="font-medium">Male</span>
                                </label>
                                <label className="flex items-center gap-2 cursor-pointer bg-white px-6 py-3 rounded-xl border-2 border-gray-300 hover:border-pink-400 transition">
                                    <input type="radio" name="gender3" value="female" onChange={(e) => setGender(e.target.value)} className="w-4 h-4" />
                                    <span className="font-medium">Female</span>
                                </label>
                            </div>
                        )}

                        {place && gender && mode && (
                            <div className="space-y-4 animate-fade-in">
                                <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-2xl border-2 border-blue-200 text-left space-y-2">
                                    <p className="text-xl font-bold text-gray-800">
                                        {mode === "study"
                                            ? gender === "male" ? `ਮੈਂ ${place} ਪੜ੍ਹਦਾ ਹਾਂ।` : `ਮੈਂ ${place} ਪੜ੍ਹਦੀ ਹਾਂ।`
                                            : gender === "male" ? `ਮੈਂ ${place} ਲਈ ਕੰਮ ਕਰਦਾ ਹਾਂ।` : `ਮੈਂ ${place} ਲਈ ਕੰਮ ਕਰਦੀ ਹਾਂ।`
                                        }
                                    </p>
                                    <p className="text-base italic text-gray-700">
                                        {mode === "study"
                                            ? gender === "male" ? `Main ${place} paṛhdā hāṁ.` : `Main ${place} paṛhdī hāṁ.`
                                            : gender === "male" ? `Main ${place} laī kam kardā hāṁ.` : `Main ${place} laī kam kardī hāṁ.`
                                        }
                                    </p>
                                    <p className="text-sm text-gray-600">
                                        {mode === "study" ? `I study at ${place}.` : `I work at ${place}.`}
                                    </p>
                                </div>

                                <div className="bg-yellow-50 p-4 rounded-xl border-2 border-yellow-200 text-sm text-left">
                                    <p className="font-bold mb-2">📖 Example:</p>
                                    <p>Aman: <span className="font-bold">ਮੈਂ Heathrow Airport ਲਈ ਕੰਮ ਕਰਦਾ ਹਾਂ।</span></p>
                                    <p className="mt-1">Priya: <span className="font-bold">ਮੈਂ Heathrow Airport ਲਈ ਕੰਮ ਕਰਦੀ ਹਾਂ।</span></p>
                                </div>
                            </div>
                        )}
                    </div>
                );

            case 6:
                return (
                    <div className="animate-fade-in space-y-6">
                        <div className="flex flex-col items-center mb-6">
                            <div className="relative w-20 h-20 mb-3">
                                <Image src="/avatars/avatar6.png" alt="Aman" fill className="rounded-full object-cover border-4 border-blue-500 shadow-lg" />
                            </div>
                            <h2 className="text-xl font-bold text-blue-600">Aman asks:</h2>
                        </div>

                        <h3 className="text-2xl sm:text-3xl font-bold text-gray-800 text-center">Tell us about your siblings</h3>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Older Brothers</label>
                                <input
                                    type="number"
                                    min="0"
                                    value={olderBrothers}
                                    onChange={(e) => setOlderBrothers(e.target.value)}
                                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Younger Sisters</label>
                                <input
                                    type="number"
                                    min="0"
                                    value={youngerSisters}
                                    onChange={(e) => setYoungerSisters(e.target.value)}
                                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
                                />
                            </div>
                        </div>

                        {(olderBrothers > 0 || youngerSisters > 0) && (
                            <div className="space-y-4 animate-fade-in">
                                <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-2xl border-2 border-blue-200 text-left space-y-2">
                                    <p className="text-xl font-bold text-gray-800">
                                        ਮੇਰੇ {olderBrothers} ਵੱਡੇ ਭਰਾ ਅਤੇ {youngerSisters} ਛੋਟੀ ਭੈਣ ਹਨ।
                                    </p>
                                    <p className="text-base italic text-gray-700">
                                        Mere {olderBrothers} vaḍḍe bhrā atē {youngerSisters} chhoṭī bhaiṇ han.
                                    </p>
                                    <p className="text-sm text-gray-600">
                                        I have {olderBrothers} older brother(s) and {youngerSisters} younger sister(s).
                                    </p>
                                </div>

                                <div className="bg-yellow-50 p-4 rounded-xl border-2 border-yellow-200 text-sm text-left">
                                    <p className="font-bold mb-2">📚 Vocabulary:</p>
                                    <ul className="space-y-1">
                                        <li>Brother - <span className="font-bold">ਭਰਾ (bhrā)</span></li>
                                        <li>Sister - <span className="font-bold">ਭੈਣ (bhaiṇ)</span></li>
                                        <li>Older - <span className="font-bold">ਵੱਡਾ (vaḍḍā)</span></li>
                                        <li>Younger - <span className="font-bold">ਛੋਟੀ (chhoṭī)</span></li>
                                    </ul>
                                </div>
                            </div>
                        )}
                    </div>
                );

            case 7:
                if (quizStep < questions.length) {
                    return (
                        <div className="animate-fade-in space-y-6">
                            <div className="text-center mb-6">
                                <h2 className="text-3xl font-bold text-gray-800 mb-2">Test Your Knowledge!</h2>
                                <p className="text-gray-600">Question {quizStep + 1} of {questions.length}</p>
                            </div>

                            <div className="bg-gradient-to-br from-purple-50 to-blue-50 p-6 rounded-2xl border-2 border-purple-200">
                                <p className="text-xl font-semibold text-gray-800 text-center">{questions[quizStep].question}</p>
                            </div>

                            <div className="grid grid-cols-1 gap-3">
                                {questions[quizStep].options.map((option, index) => (
                                    <button
                                        key={index}
                                        className={`p-4 rounded-xl border-2 transition-all text-left font-medium ${
                                            selectedAnswer === option
                                                ? option === questions[quizStep].correct
                                                    ? "bg-green-100 border-green-500 text-green-800"
                                                    : "bg-red-100 border-red-500 text-red-800"
                                                : "bg-white border-gray-300 hover:border-blue-400 hover:bg-blue-50"
                                        }`}
                                        onClick={() => handleAnswerSelection(option)}
                                        disabled={selectedAnswer !== null}
                                    >
                                        <div className="flex items-center justify-between">
                                            <span>{option}</span>
                                            {selectedAnswer === option && (
                                                option === questions[quizStep].correct ?
                                                    <CheckCircle className="w-5 h-5 text-green-600" /> :
                                                    <XCircle className="w-5 h-5 text-red-600" />
                                            )}
                                        </div>
                                    </button>
                                ))}
                            </div>

                            {feedback && (
                                <div className={`p-4 rounded-xl border-2 animate-fade-in ${
                                    feedback.includes("Correct")
                                        ? "bg-green-50 border-green-300 text-green-800"
                                        : "bg-red-50 border-red-300 text-red-800"
                                }`}>
                                    <p className="font-semibold">{feedback}</p>
                                </div>
                            )}

                            {selectedAnswer && (
                                <button
                                    onClick={nextQuestion}
                                    className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-4 rounded-xl text-lg font-bold hover:from-blue-600 hover:to-blue-700 transition-all hover:scale-105 shadow-lg"
                                >
                                    {quizStep < questions.length - 1 ? "Next Question" : "See Results"}
                                    <ArrowRight className="inline ml-2 w-5 h-5" />
                                </button>
                            )}
                        </div>
                    );
                } else {
                    return (
                        <div className="animate-fade-in space-y-6 text-center">
                            <div className="bg-gradient-to-br from-green-100 to-blue-100 p-8 rounded-2xl border-2 border-green-300">
                                <h2 className="text-3xl font-bold text-gray-800 mb-4">🎉 Quiz Completed!</h2>
                                <p className="text-2xl font-bold text-green-600 mb-2">
                                    Score: {score} / {questions.length}
                                </p>
                                {score === questions.length ? (
                                    <p className="text-xl text-green-700 font-semibold">Perfect! You mastered this lesson! 🌟</p>
                                ) : score >= questions.length / 2 ? (
                                    <p className="text-xl text-yellow-700 font-semibold">Good job! Keep practicing! 👍</p>
                                ) : (
                                    <p className="text-xl text-orange-700 font-semibold">Keep trying! Review the lesson and try again. 💪</p>
                                )}
                            </div>

                            <button
                                onClick={() => {
                                    setQuizStep(0);
                                    setScore(0);
                                    setSelectedAnswer(null);
                                    setFeedback("");
                                }}
                                className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-4 rounded-xl text-lg font-bold hover:from-orange-600 hover:to-orange-700 transition-all hover:scale-105 shadow-lg"
                            >
                                🔄 Retry Quiz
                            </button>

                            <button
                                onClick={() => router.push("/learning/essential-punjabi")}
                                className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-4 rounded-xl text-lg font-bold hover:from-green-600 hover:to-green-700 transition-all hover:scale-105 shadow-lg"
                            >
                                Continue to Next Lesson
                                <ArrowRight className="inline ml-2 w-5 h-5" />
                            </button>
                        </div>
                    );
                }

            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 px-4 sm:px-6 pt-24 sm:pt-32 pb-20">
            {/* Background Decorations */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
                <div className="absolute top-40 right-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
                <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
            </div>

            <div className="max-w-4xl mx-auto relative">
                {/* Header Badge */}
                <div className="text-center mb-8 animate-fade-in">
                    <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg border border-blue-100">
                        <GraduationCap className="w-5 h-5 text-blue-500" />
                        <span className="text-sm font-semibold text-gray-700">Lesson 3: Introductions</span>
                    </div>
                </div>

                {/* Main Content Card */}
                <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 sm:p-12 border border-white/20">
                    {renderStep()}

                    {/* Navigation Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 mt-8">
                        {currentStep > 0 && (
                            <button
                                onClick={() => {
                                    setCurrentStep(currentStep - 1);
                                    setSelectedAnswer(null);
                                    setFeedback("");
                                }}
                                className="flex items-center justify-center gap-2 bg-gray-100 text-gray-700 px-6 py-3 rounded-xl font-semibold hover:bg-gray-200 transition-all"
                            >
                                <ArrowLeft className="w-5 h-5" />
                                Previous
                            </button>
                        )}

                        {currentStep < 7 && (
                            <button
                                onClick={() => setCurrentStep(currentStep + 1)}
                                disabled={!canProceed()}
                                className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${
                                    canProceed()
                                        ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:from-green-600 hover:to-emerald-700 hover:scale-105 shadow-lg"
                                        : "bg-gray-300 text-gray-500 cursor-not-allowed"
                                }`}
                            >
                                {currentStep === 0 ? "Let's Begin" : "Continue"}
                                <ArrowRight className="w-5 h-5" />
                            </button>
                        )}
                    </div>
                </div>

                {/* Progress Indicator */}
                <div className="flex justify-center gap-2 mt-8 animate-fade-in">
                    {[0, 1, 2, 3, 4, 5, 6, 7].map((index) => (
                        <div
                            key={index}
                            className={`h-2 rounded-full transition-all duration-300 ${
                                index === currentStep
                                    ? "w-8 bg-blue-500"
                                    : index < currentStep
                                        ? "w-2 bg-green-500"
                                        : "w-2 bg-gray-300"
                            }`}
                        />
                    ))}
                </div>
            </div>

            <style jsx>{`
                @keyframes fade-in {
                    from {
                        opacity: 0;
                        transform: translateY(10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                @keyframes blob {
                    0%, 100% {
                        transform: translate(0, 0) scale(1);
                    }
                    33% {
                        transform: translate(30px, -50px) scale(1.1);
                    }
                    66% {
                        transform: translate(-20px, 20px) scale(0.9);
                    }
                }

                .animate-fade-in {
                    animation: fade-in 0.6s ease-out forwards;
                }

                .animate-blob {
                    animation: blob 7s infinite;
                }

                .animation-delay-2000 {
                    animation-delay: 2000ms;
                }

                .animation-delay-4000 {
                    animation-delay: 4000ms;
                }
            `}</style>
        </div>
    );
}