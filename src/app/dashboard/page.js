"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { FaGraduationCap, FaUser, FaTrophy, FaFire, FaChartLine, FaBook, FaRobot, FaBookOpen, FaArrowRight } from "react-icons/fa";

export default function Dashboard() {
    const [user, setUser] = useState(null);
    const [userName, setUserName] = useState("User");
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        async function fetchUser() {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) {
                router.push("/key-functions/auth");
            } else {
                setUser(user);
                fetchUserName(user.id);
            }
            setLoading(false);
        }

        async function fetchUserName(userId) {
            const { data, error } = await supabase
                .from("users")
                .select("name")
                .eq("id", userId)
                .single();

            if (!error && data) {
                setUserName(data.name);
            }
        }

        fetchUser();
    }, [router]);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-600 font-medium">Loading your dashboard...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50 px-4 sm:px-6 lg:px-8 pt-24 pb-16">
            <div className="max-w-7xl mx-auto">
                {/* Welcome Header */}
                <div className="mb-12">
                    <div className="bg-gradient-to-r from-blue-600 to-orange-500 rounded-3xl p-8 sm:p-12 text-white shadow-xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
                        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full blur-3xl"></div>

                        <div className="relative z-10 text-center">
                            <h1 className="text-4xl sm:text-5xl font-bold mb-3">
                                Welcome back, {userName}!
                            </h1>
                            <p className="text-xl text-blue-50">
                                Ready to continue your Punjabi learning journey?
                            </p>
                        </div>
                    </div>
                </div>

                {/* Main Dashboard Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                    {/* Continue Learning - Takes 2 columns */}
                    <div className="lg:col-span-2">
                        <DashboardCard
                            icon={<FaGraduationCap className="text-5xl" />}
                            title="Continue Learning"
                            description="Pick up where you left off and keep building your skills"
                            link="/learning"
                            gradient="from-green-500 to-green-700"
                            featured
                        />
                    </div>

                    {/* Profile Card */}
                    <div>
                        <DashboardCard
                            icon={<FaUser className="text-4xl" />}
                            title="Your Profile"
                            description="Manage your account settings"
                            link="/profile"
                            gradient="from-blue-500 to-blue-700"
                        />
                    </div>
                </div>

                {/* Secondary Options Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    <SmallCard
                        icon={<FaRobot className="text-3xl text-purple-500" />}
                        title="AI Punjabi Tutor"
                        description="Chat with AI for personalised lessons"
                        link="/punjabichat"
                    />
                    <SmallCard
                        icon={<FaBookOpen className="text-3xl text-blue-500" />}
                        title="Dictionary"
                        description="Search Punjabi-English translations"
                        link="/dictionary"
                    />
                    <SmallCard
                        icon={<FaBook className="text-3xl text-green-500" />}
                        title="Lesson Library"
                        description="Browse all available lessons"
                        link="/learning"
                    />
                </div>

                {/* Daily Motivation Card */}
                <div className="mt-8 bg-white rounded-2xl shadow-lg p-8 border-2 border-gray-100">
                    <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center">
                            <FaFire className="text-white text-2xl" />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">
                                Ready to Learn Today?
                            </h3>
                            <p className="text-gray-600">
                                Start your lesson and take another step towards mastering Punjabi. Every day brings you closer to fluency!
                            </p>
                            <button
                                onClick={() => router.push("/learning")}
                                className="mt-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-2.5 rounded-lg font-semibold hover:from-orange-600 hover:to-orange-700 transition-all duration-300 transform hover:scale-105 shadow-md"
                            >
                                Start Today's Lesson
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function DashboardCard({ icon, title, description, link, gradient, featured = false }) {
    return (
        <a href={link} className="block h-full group">
            <div className={`relative h-full bg-gradient-to-br ${gradient} rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02] overflow-hidden ${
                featured ? 'min-h-[240px]' : 'min-h-[200px]'
            }`}>
                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/0 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                <div className="relative z-10 p-8 h-full flex flex-col justify-between">
                    <div>
                        <div className="text-white mb-4">
                            {icon}
                        </div>
                        <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3">
                            {title}
                        </h3>
                        <p className="text-white/90 text-lg">
                            {description}
                        </p>
                    </div>

                    <div className="flex items-center text-white font-semibold group-hover:gap-3 gap-2 transition-all">
                        <span>Get Started</span>
                        <FaArrowRight className="transform group-hover:translate-x-1 transition-transform" />
                    </div>
                </div>

                {/* Corner accent */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
            </div>
        </a>
    );
}

function SmallCard({ icon, title, description, link }) {
    return (
        <a href={link} className="block group">
            <div className="bg-white rounded-2xl shadow-md hover:shadow-xl border-2 border-gray-100 hover:border-blue-300 transition-all duration-300 transform hover:-translate-y-1 p-6 h-full">
                <div className="mb-4">
                    {icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {title}
                </h3>
                <p className="text-gray-600 text-sm">
                    {description}
                </p>
            </div>
        </a>
    );
}