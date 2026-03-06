"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { FaGraduationCap, FaUser, FaFire, FaBook, FaRobot, FaBookOpen, FaArrowRight } from "react-icons/fa";

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
            <>
                <style jsx global>{`
                    :root {
                        --color-navy: #1B2A4A;
                        --color-cream: #FDFBF7;
                        --font-display: 'DM Serif Display', Georgia, serif;
                        --font-body: 'DM Sans', system-ui, sans-serif;
                    }
                    body { font-family: var(--font-body); -webkit-font-smoothing: antialiased; }
                `}</style>
                <div className="flex items-center justify-center min-h-screen" style={{ backgroundColor: 'var(--color-cream)' }}>
                    <div className="text-center">
                        <div className="w-14 h-14 border-3 rounded-full animate-spin mx-auto mb-4"
                             style={{ borderColor: '#1B2A4A', borderTopColor: 'transparent', borderWidth: '3px' }}></div>
                        <p className="text-gray-500 font-medium text-sm">Loading your dashboard...</p>
                    </div>
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
                .text-saffron { color: var(--color-saffron); }
                .text-navy { color: var(--color-navy); }
                .bg-navy { background-color: var(--color-navy); }
            `}</style>

            <div className="min-h-screen px-6 sm:px-10 pt-28 pb-16" style={{ backgroundColor: 'var(--color-cream)' }}>
                <div className="max-w-6xl mx-auto">

                    {/* Welcome Header */}
                    <div className="mb-12 relative overflow-hidden rounded-2xl" style={{ backgroundColor: 'var(--color-navy)' }}>
                        {/* Decorative elements */}
                        <div className="absolute top-0 right-0 w-72 h-72 rounded-full opacity-10"
                             style={{ background: 'radial-gradient(circle, rgba(230,126,34,0.6) 0%, transparent 70%)', transform: 'translate(30%, -30%)' }} />
                        <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full opacity-10"
                             style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%)', transform: 'translate(-20%, 20%)' }} />

                        {/* Gurmukhi watermark */}
                        <div className="absolute top-1/2 right-8 -translate-y-1/2 text-[8rem] font-bold opacity-[0.04] text-white select-none pointer-events-none leading-none"
                             style={{ fontFamily: 'serif' }}>
                            ੴ
                        </div>

                        <div className="relative z-10 px-8 sm:px-12 py-10 sm:py-14 text-center">
                            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-gray-400 mb-3">Dashboard</p>
                            <h1 className="text-3xl sm:text-4xl font-display text-white mb-2">
                                Welcome back, <span className="text-saffron">{userName}</span>
                            </h1>
                            <p className="text-gray-400 text-base">
                                Ready to continue your Punjabi learning journey?
                            </p>
                        </div>
                    </div>

                    {/* Main Dashboard Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-6">
                        {/* Continue Learning */}
                        <div className="lg:col-span-2">
                            <a href="/learning" className="block h-full group">
                                <div className="relative h-full rounded-2xl overflow-hidden shadow-sm border border-gray-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                                     style={{ backgroundColor: 'var(--color-navy)' }}>
                                    <div className="absolute top-0 right-0 w-40 h-40 rounded-full opacity-10"
                                         style={{ background: 'radial-gradient(circle, rgba(230,126,34,0.5) 0%, transparent 70%)', transform: 'translate(20%, -20%)' }} />

                                    <div className="relative z-10 p-8 sm:p-10 h-full flex flex-col justify-between min-h-[220px]">
                                        <div>
                                            <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-white mb-5"
                                                 style={{ backgroundColor: 'rgba(230,126,34,0.2)' }}>
                                                <FaGraduationCap className="text-2xl text-saffron" />
                                            </div>
                                            <h3 className="text-2xl font-bold text-white mb-2">Continue Learning</h3>
                                            <p className="text-gray-400 text-sm">Pick up where you left off and keep building your skills</p>
                                        </div>
                                        <div className="flex items-center gap-2 text-saffron font-semibold text-sm mt-6 group-hover:gap-3 transition-all">
                                            <span>Go to Lessons</span>
                                            <FaArrowRight className="text-xs group-hover:translate-x-1 transition-transform" />
                                        </div>
                                    </div>
                                </div>
                            </a>
                        </div>

                        {/* Profile Card */}
                        <div>
                            <a href="/profile" className="block h-full group">
                                <div className="relative h-full bg-white rounded-2xl shadow-sm border border-gray-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden">
                                    <div className="relative z-10 p-8 h-full flex flex-col justify-between min-h-[220px]">
                                        <div>
                                            <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5"
                                                 style={{ backgroundColor: 'var(--color-warm-gray)' }}>
                                                <FaUser className="text-xl text-navy" />
                                            </div>
                                            <h3 className="text-xl font-bold text-navy mb-2">Your Profile</h3>
                                            <p className="text-gray-500 text-sm">Manage your account settings</p>
                                        </div>
                                        <div className="flex items-center gap-2 text-saffron font-semibold text-sm mt-6 group-hover:gap-3 transition-all">
                                            <span>View Profile</span>
                                            <FaArrowRight className="text-xs group-hover:translate-x-1 transition-transform" />
                                        </div>
                                    </div>
                                </div>
                            </a>
                        </div>
                    </div>

                    {/* Secondary Options Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
                        {[
                            {
                                icon: <FaRobot className="text-xl" />,
                                title: "AI Punjabi Tutor",
                                description: "Chat with AI for personalised lessons",
                                link: "/punjabichat",
                                color: "#8B5CF6"
                            },
                            {
                                icon: <FaBookOpen className="text-xl" />,
                                title: "Dictionary",
                                description: "Search Punjabi-English translations",
                                link: "/dictionary",
                                color: "#3B82F6"
                            },
                            {
                                icon: <FaBook className="text-xl" />,
                                title: "Lesson Library",
                                description: "Browse all available lessons",
                                link: "/learning",
                                color: "#059669"
                            },
                        ].map((item, i) => (
                            <a key={i} href={item.link} className="block group">
                                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 hover:shadow-lg hover:border-gray-300 transition-all duration-300 hover:-translate-y-1 p-7 h-full">
                                    <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white mb-5 transition-transform group-hover:scale-105"
                                         style={{ backgroundColor: item.color }}>
                                        {item.icon}
                                    </div>
                                    <h3 className="text-lg font-bold text-navy mb-1.5 group-hover:text-saffron transition-colors">
                                        {item.title}
                                    </h3>
                                    <p className="text-gray-500 text-sm leading-relaxed">
                                        {item.description}
                                    </p>
                                </div>
                            </a>
                        ))}
                    </div>

                    {/* Daily Motivation */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 overflow-hidden relative">
                        <div className="flex items-start gap-5">
                            <div className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center text-white"
                                 style={{ backgroundColor: 'var(--color-saffron)' }}>
                                <FaFire className="text-xl" />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-navy mb-1.5">
                                    Ready to Learn Today?
                                </h3>
                                <p className="text-gray-500 text-sm leading-relaxed mb-5">
                                    Start your lesson and take another step towards mastering Punjabi. Every day brings you closer to fluency.
                                </p>
                                <button
                                    onClick={() => router.push("/learning")}
                                    className="group flex items-center gap-2 text-white px-6 py-3 rounded-xl font-semibold text-sm shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5"
                                    style={{ backgroundColor: 'var(--color-saffron)' }}
                                >
                                    Start Today's Lesson
                                    <FaArrowRight className="text-xs group-hover:translate-x-1 transition-transform" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}