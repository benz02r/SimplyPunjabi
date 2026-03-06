"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { FaArrowLeft, FaTrophy, FaFire, FaStar, FaLock, FaEdit, FaKey, FaSignOutAlt, FaChartLine } from "react-icons/fa";

const avatars = [
    "/avatars/avatar1.png",
    "/avatars/avatar2.png",
    "/avatars/avatar3.png",
    "/avatars/avatar4.png",
    "/avatars/avatar5.png",
    "/avatars/avatar6.png",
    "/avatars/avatar7.png",
];

export default function Profile() {
    const [selectedAvatar, setSelectedAvatar] = useState(avatars[0]);
    const [name, setName] = useState("");
    const [newName, setNewName] = useState("");
    const [email, setEmail] = useState("");
    const [userId, setUserId] = useState(null);
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState("");
    const [loading, setLoading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [points, setPoints] = useState(0);
    const [level, setLevel] = useState(0);
    const [previousLevel, setPreviousLevel] = useState(0);
    const [levelUp, setLevelUp] = useState(false);
    const router = useRouter();

    const totalLessons = 18;

    useEffect(() => {
        const fetchUser = async () => {
            setMessage("");
            const { data: sessionData, error: sessionError } = await supabase.auth.getSession();

            if (sessionError || !sessionData?.session?.user) {
                router.push("/key-functions/auth");
                return;
            }

            const user = sessionData.session.user;
            setEmail(user.email);
            setUserId(user.id);

            const { data: userData, error } = await supabase
                .from("users")
                .select("name, points")
                .eq("id", user.id)
                .limit(1)
                .single();

            if (error) {
                console.error("Error fetching user data:", error);
                showMessage(`Error fetching user data: ${error.message}`, "error");
                return;
            }

            if (userData) {
                const userPoints = userData.points || 0;
                setName(userData.name || "User");
                setNewName(userData.name || "");
                setPoints(userPoints);
            }

            const userPoints = userData?.points || 0;
            setName(userData?.name || "User");
            setNewName(userData?.name || "");
            setPoints(userPoints);

            const newLevel = Math.floor(userPoints / 30);
            if (newLevel > previousLevel) {
                setLevelUp(true);
                setTimeout(() => setLevelUp(false), 4000);
            }
            setPreviousLevel(newLevel);
            setLevel(newLevel);

            const { data: progressData } = await supabase
                .from("lesson_progress")
                .select("lesson_id")
                .eq("user_id", user.id)
                .eq("completed", true);

            const completedCount = progressData?.length || 0;
            const percent = Math.round((completedCount / totalLessons) * 100);
            setProgress(percent);
        };

        fetchUser();
    }, [router]);

    const showMessage = (text, type) => {
        setMessage(text);
        setMessageType(type);
        setTimeout(() => setMessage(""), 5000);
    };

    const updateProfile = async () => {
        setLoading(true);
        setMessage("");

        if (!newName.trim()) {
            showMessage("Name cannot be empty.", "error");
            setLoading(false);
            return;
        }

        const { error } = await supabase
            .from("users")
            .update({ name: newName })
            .eq("id", userId);

        if (error) {
            showMessage(`Error updating profile: ${error.message}`, "error");
        } else {
            setName(newName);
            showMessage("Profile updated successfully!", "success");
        }
        setLoading(false);
    };

    const updatePassword = async () => {
        setLoading(true);
        setMessage("");

        if (!oldPassword || !newPassword) {
            showMessage("Please enter both old and new passwords.", "error");
            setLoading(false);
            return;
        }

        const { error } = await supabase.auth.updateUser({ password: newPassword });

        if (error) {
            showMessage(`Error updating password: ${error.message}`, "error");
        } else {
            showMessage("Password updated successfully!", "success");
            setOldPassword("");
            setNewPassword("");
        }
        setLoading(false);
    };

    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.push("/key-functions/auth");
    };

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

                    {/* Level Up Notification */}
                    {levelUp && (
                        <div className="fixed top-24 left-1/2 transform -translate-x-1/2 text-white px-8 py-4 rounded-xl shadow-2xl text-lg font-bold animate-bounce z-50"
                             style={{ backgroundColor: 'var(--color-saffron)' }}>
                            Level Up! You're now Level {level}
                        </div>
                    )}

                    {/* Back Button */}
                    <button
                        onClick={() => router.push("/dashboard")}
                        className="mb-6 flex items-center gap-2 text-gray-400 hover:text-navy font-medium text-sm transition-colors group"
                    >
                        <FaArrowLeft className="text-xs group-hover:-translate-x-1 transition-transform" />
                        <span>Back to Dashboard</span>
                    </button>

                    {/* Profile Header */}
                    <div className="rounded-2xl mb-8 relative overflow-hidden" style={{ backgroundColor: 'var(--color-navy)' }}>
                        <div className="absolute top-0 right-0 w-72 h-72 rounded-full opacity-10"
                             style={{ background: 'radial-gradient(circle, rgba(230,126,34,0.6) 0%, transparent 70%)', transform: 'translate(30%, -30%)' }} />
                        <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full opacity-10"
                             style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%)', transform: 'translate(-20%, 20%)' }} />

                        <div className="relative z-10 px-8 sm:px-12 py-10 flex flex-col sm:flex-row items-center gap-6">
                            <img
                                src={selectedAvatar}
                                alt="User Avatar"
                                className="w-28 h-28 rounded-2xl border-4 border-white/20 shadow-xl"
                            />
                            <div className="text-center sm:text-left flex-1">
                                <p className="text-xs font-semibold uppercase tracking-[0.15em] text-gray-400 mb-1">Profile</p>
                                <h1 className="text-3xl font-display text-white mb-1">{name}</h1>
                                <p className="text-gray-400 text-sm mb-5">{email}</p>
                                <div className="flex flex-wrap gap-3 justify-center sm:justify-start">
                                    <StatBadge icon={<FaTrophy className="text-saffron" />} value={points} label="Points" />
                                    <StatBadge icon={<FaStar className="text-saffron" />} value={`Level ${level}`} label="Current" />
                                    <StatBadge icon={<FaChartLine className="text-saffron" />} value={`${progress}%`} label="Progress" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Message Display */}
                    {message && (
                        <div className={`mb-6 p-4 rounded-xl font-medium text-sm ${
                            messageType === "success"
                                ? "bg-green-50 text-green-700 border border-green-200"
                                : "bg-red-50 text-red-600 border border-red-200"
                        }`}>
                            {message}
                        </div>
                    )}

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                        {/* Left Column */}
                        <div className="lg:col-span-1 space-y-5">
                            {/* Lesson Progress */}
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                                <h2 className="text-base font-bold text-navy mb-4 flex items-center gap-2">
                                    <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#3B82F615' }}>
                                        <FaChartLine className="text-sm" style={{ color: '#3B82F6' }} />
                                    </div>
                                    Lesson Progress
                                </h2>
                                <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden mb-2">
                                    <div
                                        className="h-full rounded-full transition-all duration-500"
                                        style={{ width: `${progress}%`, backgroundColor: '#059669' }}
                                    >
                                    </div>
                                </div>
                                <div className="flex items-center justify-between">
                                    <p className="text-xs text-gray-400">
                                        {Math.round((progress / 100) * totalLessons)} of {totalLessons} lessons
                                    </p>
                                    <p className="text-xs font-semibold" style={{ color: '#059669' }}>{progress}%</p>
                                </div>
                            </div>

                            {/* Level Progress */}
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                                <h2 className="text-base font-bold text-navy mb-4 flex items-center gap-2">
                                    <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'rgba(230,126,34,0.1)' }}>
                                        <FaFire className="text-sm text-saffron" />
                                    </div>
                                    Level Progress
                                </h2>
                                <div className="text-center mb-4">
                                    <p className="text-2xl font-display text-navy">Level {level}</p>
                                    <p className="text-xs text-gray-400">Next level at {(level + 1) * 30} points</p>
                                </div>
                                <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden mb-1">
                                    <div
                                        className="h-full rounded-full transition-all duration-500"
                                        style={{ width: `${((points % 30) / 30) * 100}%`, backgroundColor: 'var(--color-navy)' }}
                                    >
                                    </div>
                                </div>
                                <p className="text-xs text-gray-400 text-right">{points % 30} / 30</p>
                            </div>
                        </div>

                        {/* Right Column */}
                        <div className="lg:col-span-2 space-y-5">
                            {/* Avatar Selection */}
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                                <h2 className="text-base font-bold text-navy mb-4">Choose Your Avatar</h2>
                                <div className="grid grid-cols-4 sm:grid-cols-7 gap-3">
                                    {avatars.map((avatar, index) => {
                                        const isUnlocked = index <= level;
                                        return (
                                            <div key={index} className="relative group">
                                                <img
                                                    src={avatar}
                                                    alt={`Avatar ${index + 1}`}
                                                    className={`w-full aspect-square rounded-xl cursor-pointer border-2 transition-all duration-300 ${
                                                        selectedAvatar === avatar
                                                            ? "shadow-lg scale-105"
                                                            : "border-gray-200"
                                                    } ${!isUnlocked ? "opacity-40 grayscale" : "hover:scale-105 hover:shadow-md"}`}
                                                    style={selectedAvatar === avatar ? { borderColor: 'var(--color-saffron)' } : {}}
                                                    onClick={() => {
                                                        if (isUnlocked) setSelectedAvatar(avatar);
                                                    }}
                                                />
                                                {!isUnlocked && (
                                                    <div className="absolute inset-0 flex flex-col items-center justify-center text-xs font-bold text-white bg-black/50 rounded-xl">
                                                        <FaLock className="mb-0.5 text-[10px]" />
                                                        <span className="text-[10px]">Lvl {index}</span>
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                                <p className="text-xs text-gray-400 mt-4 text-center">
                                    Unlock more avatars by levelling up ({level + 1} / {avatars.length} unlocked)
                                </p>
                            </div>

                            {/* Update Name */}
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                                <h2 className="text-base font-bold text-navy mb-4 flex items-center gap-2">
                                    <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#3B82F615' }}>
                                        <FaEdit className="text-sm" style={{ color: '#3B82F6' }} />
                                    </div>
                                    Update Profile
                                </h2>
                                <label className="block text-sm font-semibold text-navy mb-2">Name</label>
                                <input
                                    type="text"
                                    value={newName}
                                    onChange={(e) => setNewName(e.target.value)}
                                    className="w-full p-3 rounded-xl border border-gray-200 text-sm placeholder-gray-400 focus:border-gray-400 focus:ring-2 focus:ring-gray-100 focus:outline-none transition-all mb-4"
                                    style={{ color: 'var(--color-navy)' }}
                                    placeholder="Enter your name"
                                />
                                <button
                                    onClick={updateProfile}
                                    disabled={loading}
                                    className="w-full sm:w-auto text-white px-7 py-3 rounded-xl font-semibold text-sm shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                                    style={{ backgroundColor: 'var(--color-navy)' }}
                                >
                                    {loading ? "Updating..." : "Update Name"}
                                </button>
                            </div>

                            {/* Change Password */}
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                                <h2 className="text-base font-bold text-navy mb-4 flex items-center gap-2">
                                    <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'rgba(230,126,34,0.1)' }}>
                                        <FaKey className="text-sm text-saffron" />
                                    </div>
                                    Change Password
                                </h2>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-semibold text-navy mb-2">Old Password</label>
                                        <input
                                            type="password"
                                            placeholder="Enter old password"
                                            value={oldPassword}
                                            onChange={(e) => setOldPassword(e.target.value)}
                                            className="w-full p-3 rounded-xl border border-gray-200 text-sm placeholder-gray-400 focus:border-gray-400 focus:ring-2 focus:ring-gray-100 focus:outline-none transition-all"
                                            style={{ color: 'var(--color-navy)' }}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-navy mb-2">New Password</label>
                                        <input
                                            type="password"
                                            placeholder="Enter new password"
                                            value={newPassword}
                                            onChange={(e) => setNewPassword(e.target.value)}
                                            className="w-full p-3 rounded-xl border border-gray-200 text-sm placeholder-gray-400 focus:border-gray-400 focus:ring-2 focus:ring-gray-100 focus:outline-none transition-all"
                                            style={{ color: 'var(--color-navy)' }}
                                        />
                                    </div>
                                    <button
                                        onClick={updatePassword}
                                        disabled={loading}
                                        className="w-full sm:w-auto text-white px-7 py-3 rounded-xl font-semibold text-sm shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                                        style={{ backgroundColor: 'var(--color-saffron)' }}
                                    >
                                        {loading ? "Updating..." : "Change Password"}
                                    </button>
                                </div>
                            </div>

                            {/* Logout */}
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                                <h2 className="text-base font-bold text-navy mb-4 flex items-center gap-2">
                                    <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-red-50">
                                        <FaSignOutAlt className="text-sm text-red-500" />
                                    </div>
                                    Account
                                </h2>
                                <button
                                    onClick={handleLogout}
                                    className="w-full sm:w-auto bg-red-500 text-white px-7 py-3 rounded-xl font-semibold text-sm hover:bg-red-600 transition-all duration-300 hover:-translate-y-0.5 shadow-md hover:shadow-lg"
                                >
                                    Log Out
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

function StatBadge({ icon, value, label }) {
    return (
        <div className="bg-white/10 backdrop-blur-sm rounded-xl px-4 py-2.5 flex items-center gap-2.5 border border-white/10">
            <span className="text-base">{icon}</span>
            <div>
                <p className="text-sm font-bold text-white leading-tight">{value}</p>
                <p className="text-[10px] text-gray-400">{label}</p>
            </div>
        </div>
    );
}