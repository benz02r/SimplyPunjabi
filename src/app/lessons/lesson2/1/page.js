"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaArrowLeft, FaArrowRight, FaVolumeUp, FaCheckCircle, FaUser } from "react-icons/fa";

const steps = [
    {
        avatar: "/avatars/avatar6.png",
        speaker: "Aman",
        title: "Sat Sri Akaal (ਸਤ ਸ੍ਰੀ ਅਕਾਲ)",
        roman: "Sat Sri Akaal",
        meaning: "A respectful greeting meaning 'God is the Eternal Truth'.",
        usage: "Use this in formal settings or when showing respect"
    },
    {
        avatar: "/avatars/avatar5.png",
        speaker: "Priya",
        title: "Ki Haal Aa? (ਕੀ ਹਾਲ ਆ?)",
        roman: "Ki haal aa?",
        meaning: "Casual greeting — 'How are you?'",
        usage: "Perfect for friends and casual conversations"
    },
    {
        avatar: "/avatars/avatar6.png",
        speaker: "Aman",
        title: "Kidan? (ਕਿੱਧਾਂ?)",
        roman: "Kidan?",
        meaning: "Informal — 'What's up?'",
        usage: "Very casual, use with close friends"
    },
    {
        avatar: "/avatars/avatar5.png",
        speaker: "Priya",
        title: "Tusi Kidan Teekya? (ਤੁਸੀਂ ਕਿਵੇਂ ਟਿਕਿਆ?)",
        roman: "Tusi kidan teekya?",
        meaning: "Formal — 'How have you been?'",
        usage: "Use when addressing elders or in formal situations"
    }
];

export default function GreetingSteps() {
    const router = useRouter();
    const [step, setStep] = useState(0);
    const current = steps[step];

    const handlePrevious = () => {
        if (step > 0) setStep(step - 1);
    };

    const handleNext = () => {
        if (step < steps.length - 1) setStep(step + 1);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50 px-4 sm:px-6 lg:px-8 pt-24 pb-16">
            <div className="max-w-4xl mx-auto">
                {/* Back Button */}
                <button
                    onClick={() => router.push("/learning/essential-punjabi")}
                    className="mb-6 flex items-center gap-2 text-gray-600 hover:text-blue-600 font-semibold transition-colors group"
                >
                    <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
                    <span>Back to Lessons</span>
                </button>

                {/* Header */}
                <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-3xl p-8 sm:p-12 text-white shadow-xl mb-8 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full blur-3xl"></div>

                    <div className="relative z-10 text-center">
                        <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-4">
                            <FaUser className="text-blue-200" />
                            <span className="text-sm font-semibold">LESSON 2: GREETINGS</span>
                        </div>
                        <h1 className="text-4xl sm:text-5xl font-bold mb-4">
                            Learn Punjabi Greetings
                        </h1>
                        <p className="text-xl text-blue-100">
                            Master essential greetings for different situations
                        </p>
                    </div>
                </div>

                {/* Progress Bar */}
                <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border-2 border-gray-100">
                    <div className="flex items-center justify-between mb-3">
                        <span className="text-sm font-semibold text-gray-700">Lesson Progress</span>
                        <span className="text-sm font-bold text-blue-600">
                            {step + 1} / {steps.length}
                        </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                        <div
                            className="bg-gradient-to-r from-blue-500 to-blue-600 h-full transition-all duration-500"
                            style={{ width: `${((step + 1) / steps.length) * 100}%` }}
                        ></div>
                    </div>
                </div>

                {/* Main Content Card */}
                <div className="bg-white rounded-3xl shadow-xl p-8 sm:p-12 border-2 border-gray-100 mb-8">
                    {/* Speaker Avatar */}
                    <div className="flex flex-col items-center mb-8">
                        <div className="relative w-24 h-24 mb-4">
                            <img
                                src={current.avatar}
                                alt={current.speaker}
                                className="w-full h-full rounded-full object-cover border-4 border-blue-500 shadow-lg"
                            />
                            <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-white"></div>
                        </div>
                        <div className="inline-block bg-blue-100 px-6 py-2 rounded-full">
                            <p className="text-blue-800 font-bold">{current.speaker} teaches</p>
                        </div>
                    </div>

                    {/* Phrase Display */}
                    <div className="text-center space-y-6 mb-8">
                        {/* Gurmukhi & English */}
                        <div className="bg-gradient-to-br from-blue-50 to-orange-50 rounded-2xl p-8 border-2 border-blue-200">
                            <h3 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
                                {current.title}
                            </h3>
                            <button className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-700 transition-all duration-300 shadow-md hover:shadow-lg">
                                <FaVolumeUp className="text-xl" />
                                <span>Listen</span>
                            </button>
                        </div>

                        {/* Romanization */}
                        <div className="bg-white rounded-2xl p-6 border-2 border-gray-200">
                            <p className="text-sm font-semibold text-gray-500 mb-2">PRONUNCIATION</p>
                            <p className="text-2xl font-bold text-blue-600 italic">{current.roman}</p>
                        </div>

                        {/* Meaning */}
                        <div className="bg-white rounded-2xl p-6 border-2 border-gray-200">
                            <p className="text-sm font-semibold text-gray-500 mb-2">MEANING</p>
                            <p className="text-xl text-gray-800">{current.meaning}</p>
                        </div>

                        {/* Usage Context */}
                        <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-2xl p-6 border-2 border-green-200">
                            <div className="flex items-start gap-3">
                                <FaCheckCircle className="text-green-600 text-2xl flex-shrink-0 mt-1" />
                                <div className="text-left">
                                    <p className="text-sm font-semibold text-green-800 mb-1">WHEN TO USE</p>
                                    <p className="text-green-900 font-medium">{current.usage}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Completion Checkmarks */}
                    <div className="flex justify-center gap-3 mb-6">
                        {steps.map((_, idx) => (
                            <div
                                key={idx}
                                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                                    idx <= step
                                        ? 'bg-blue-600 scale-125'
                                        : 'bg-gray-300'
                                }`}
                            ></div>
                        ))}
                    </div>

                    {/* Navigation Buttons */}
                    <div className="flex gap-4">
                        <button
                            onClick={handlePrevious}
                            disabled={step === 0}
                            className={`flex-1 flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold transition-all duration-300 ${
                                step === 0
                                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                        >
                            <FaArrowLeft />
                            <span>Previous</span>
                        </button>

                        {step < steps.length - 1 ? (
                            <button
                                onClick={handleNext}
                                className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-8 py-4 rounded-xl font-bold hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                            >
                                <span>Next</span>
                                <FaArrowRight />
                            </button>
                        ) : (
                            <button
                                onClick={() => router.push("/lessons/lesson2/2")}
                                className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-green-500 to-green-600 text-white px-8 py-4 rounded-xl font-bold hover:from-green-600 hover:to-green-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                            >
                                <span>Try Match the Words</span>
                                <FaArrowRight />
                            </button>
                        )}
                    </div>
                </div>

                {/* Quick Tips */}
                <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl p-6 border-2 border-orange-200">
                    <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                        <span className="text-2xl">💡</span>
                        <span>Pro Tip</span>
                    </h3>
                    <p className="text-gray-700">
                        Practice each greeting out loud multiple times. The more you repeat, the more natural it will feel in real conversations!
                    </p>
                </div>
            </div>
        </div>
    );
}