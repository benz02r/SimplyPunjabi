"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { FaBookOpen, FaComments, FaMicrophone, FaAward, FaArrowLeft, FaFire, FaStar, FaBook } from "react-icons/fa";

export default function LearningHub() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        async function fetchUser() {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) {
                router.push("/key-functions/auth");
            } else {
                setUser(user);
            }
            setLoading(false);
        }
        fetchUser();
    }, [router]);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-600 font-medium">Loading learning paths...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50 px-4 sm:px-6 lg:px-8 pt-24 pb-16">
            <div className="max-w-7xl mx-auto">
                {/* Back Button */}
                <button
                    onClick={() => router.push("/dashboard")}
                    className="mb-6 flex items-center gap-2 text-gray-600 hover:text-blue-600 font-semibold transition-colors group"
                >
                    <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
                    <span>Back to Dashboard</span>
                </button>

                {/* Hero Section */}
                <div className="bg-gradient-to-r from-blue-600 to-orange-500 rounded-3xl p-8 sm:p-12 text-white shadow-xl mb-12 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full blur-3xl"></div>

                    <div className="relative z-10 text-center">
                        <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-4">
                            <FaFire className="text-orange-300" />
                            <span className="text-sm font-semibold">YOUR LEARNING JOURNEY</span>
                        </div>
                        <h1 className="text-4xl sm:text-5xl font-bold mb-4">
                            Choose Your Path
                        </h1>
                        <p className="text-xl text-blue-50 max-w-2xl mx-auto">
                            Select a learning path that matches your level and start building your Punjabi fluency today!
                        </p>
                    </div>
                </div>

                {/* Learning Paths Grid */}
                <div className="mb-12">
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">Learning Paths</h2>
                        <p className="text-gray-600">Structured courses to take you from beginner to fluent</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <LearningPathCard
                            icon={<FaComments className="text-5xl" />}
                            level="Beginner"
                            title="Essential Punjabi"
                            subtitle="Real Conversations"
                            description="Start speaking Punjabi from Day 1 with must-know words & phrases!"
                            link="/learning/essential-punjabi"
                            gradient="from-green-500 to-green-700"
                            accentColor="green"

                        />
                        <LearningPathCard
                            icon={<FaMicrophone className="text-5xl" />}
                            level="Intermediate"
                            title="Speak with Confidence"
                            subtitle="Beyond the Basics"
                            description="Expand your vocabulary and engage in real-life conversations!"
                            link="/learning/speak-with-confidence"
                            gradient="from-blue-500 to-blue-700"
                            accentColor="blue"

                        />
                        <LearningPathCard
                            icon={<FaAward className="text-5xl" />}
                            level="Advanced"
                            title="Master Punjabi"
                            subtitle="Conversations with Ease"
                            description="Achieve fluency, understand native speakers, and sound natural!"
                            link="/learning/master-punjabi"
                            gradient="from-purple-500 to-purple-700"
                            accentColor="purple"

                        />
                    </div>
                </div>

                {/* Dictionary Section */}
                <div className="bg-white rounded-3xl shadow-xl border-2 border-gray-100 overflow-hidden">
                    <div className="grid grid-cols-1 lg:grid-cols-2">
                        {/* Left Side - Info */}
                        <div className="p-8 lg:p-12 flex flex-col justify-center">
                            <div className="inline-flex items-center gap-2 bg-blue-100 px-4 py-2 rounded-full mb-4 w-fit">
                                <FaBook className="text-blue-600" />
                                <span className="text-blue-800 font-semibold text-sm">LEARNING TOOL</span>
                            </div>
                            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                                English to Punjabi Dictionary
                            </h2>
                            <p className="text-lg text-gray-600 mb-6">
                                Look up any English word and discover its Punjabi translation instantly. Perfect for building vocabulary and understanding context.
                            </p>
                            <ul className="space-y-3 mb-8">
                                <li className="flex items-center gap-3 text-gray-700">
                                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                                        <span className="text-white text-sm">✓</span>
                                    </div>
                                    <span>Instant translations</span>
                                </li>
                                <li className="flex items-center gap-3 text-gray-700">
                                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                                        <span className="text-white text-sm">✓</span>
                                    </div>
                                    <span>Pronunciation guides</span>
                                </li>
                                <li className="flex items-center gap-3 text-gray-700">
                                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                                        <span className="text-white text-sm">✓</span>
                                    </div>
                                    <span>Example sentences</span>
                                </li>
                            </ul>
                            <a href="/dictionary">
                                <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl text-lg font-bold shadow-lg hover:shadow-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 flex items-center gap-2 w-fit">
                                    <span>Explore Dictionary</span>
                                    <span>→</span>
                                </button>
                            </a>
                        </div>

                        {/* Right Side - Visual */}
                        <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-8 lg:p-12 flex items-center justify-center">
                            <div className="text-center text-white">
                                <FaBookOpen className="text-8xl mb-6 mx-auto opacity-90" />
                                <p className="text-2xl font-bold mb-2">10,000+ Words</p>
                                <p className="text-blue-100">Comprehensive vocabulary database</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Quick Tips Section */}
                <div className="mt-12 bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl p-8 border-2 border-orange-200">
                    <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center">
                            <FaStar className="text-white text-xl" />
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">
                                Pro Learning Tips
                            </h3>
                            <ul className="space-y-2 text-gray-700">
                                <li className="flex items-start gap-2">
                                    <span className="text-orange-500 font-bold">•</span>
                                    <span>Practice for at least 10-15 minutes daily for best results</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-orange-500 font-bold">•</span>
                                    <span>Complete lessons in order to build a strong foundation</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-orange-500 font-bold">•</span>
                                    <span>Use the dictionary to look up unfamiliar words while learning</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-orange-500 font-bold">•</span>
                                    <span>Review previous lessons regularly to reinforce your knowledge</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function LearningPathCard({ icon, level, title, subtitle, description, link, gradient, accentColor, stats }) {
    const levelColors = {
        green: 'bg-green-100 text-green-700',
        blue: 'bg-blue-100 text-blue-700',
        purple: 'bg-purple-100 text-purple-700'
    };

    const hoverColors = {
        green: 'hover:border-green-400',
        blue: 'hover:border-blue-400',
        purple: 'hover:border-purple-400'
    };

    return (
        <a href={link} className="block group">
            <div className={`h-full bg-white rounded-2xl border-2 border-gray-200 ${hoverColors[accentColor]} shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden`}>
                {/* Header with Gradient */}
                <div className={`bg-gradient-to-br ${gradient} p-6 text-white text-center`}>
                    <div className={`inline-block ${levelColors[accentColor]} px-3 py-1 rounded-full text-xs font-bold mb-4`}>
                        {level}
                    </div>
                    <div className="mb-4 transform group-hover:scale-110 transition-transform duration-300">
                        {icon}
                    </div>
                    <h3 className="text-2xl font-bold mb-1">{title}</h3>
                    <p className="text-sm text-white/90">{subtitle}</p>
                </div>

                {/* Body */}
                <div className="p-6">
                    <p className="text-gray-600 mb-4 min-h-[60px]">
                        {description}
                    </p>

                    {/* Stats */}
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4 pb-4 border-b border-gray-200">
                        <div>
                            <span className="font-semibold text-gray-700">{stats.lessons}</span> lessons
                        </div>
                        <div>
                            <span className="font-semibold text-gray-700">{stats.time}</span>
                        </div>
                    </div>

                    {/* CTA Button */}
                    <button className={`w-full bg-gradient-to-r ${gradient} text-white py-3 rounded-xl font-bold hover:shadow-lg transition-all duration-300 transform group-hover:scale-105 flex items-center justify-center gap-2`}>
                        <span>Start Learning</span>
                        <span className="transform group-hover:translate-x-1 transition-transform">→</span>
                    </button>
                </div>
            </div>
        </a>
    );
}