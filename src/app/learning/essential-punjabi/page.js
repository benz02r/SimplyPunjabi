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
    "/avatars/avatar8.png",
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
    const [messageType, setMessageType] = useState(""); // 'success' or 'error'
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
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50 px-4 sm:px-6 lg:px-8 pt-24 pb-16">
            <div className="max-w-6xl mx-auto">
                {/* Level Up Notification */}
                {levelUp && (
                    <div className="fixed top-24 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-8 py-4 rounded-2xl shadow-2xl text-xl font-bold animate-bounce z-50">
                        🎉 LEVEL UP! You're now Level {level} 🎯
                    </div>
                )}

                {/* Back Button */}
                <button
                    onClick={() => router.push("/dashboard")}
                    className="mb-6 flex items-center gap-2 text-gray-600 hover:text-blue-600 font-semibold transition-colors group"
                >
                    <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
                    <span>Back to Dashboard</span>
                </button>

                {/* Profile Header */}
                <div className="bg-gradient-to-r from-blue-600 to-orange-500 rounded-3xl p-8 sm:p-12 text-white shadow-xl mb-8 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full blur-3xl"></div>

                    <div className="relative z-10 flex flex-col sm:flex-row items-center gap-6">
                        <img
                            src={selectedAvatar}
                            alt="User Avatar"
                            className="w-32 h-32 rounded-full border-4 border-white shadow-2xl"
                        />
                        <div className="text-center sm:text-left flex-1">
                            <h1 className="text-4xl font-bold mb-2">{name}</h1>
                            <p className="text-blue-100 text-lg mb-4">{email}</p>
                            <div className="flex flex-wrap gap-4 justify-center sm:justify-start">
                                <StatBadge icon={<FaTrophy />} value={points} label="Total Points" />
                                <StatBadge icon={<FaStar />} value={`Level ${level}`} label="Current Level" />
                                <StatBadge icon={<FaChartLine />} value={`${progress}%`} label="Progress" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Message Display */}
                {message && (
                    <div className={`mb-6 p-4 rounded-xl font-medium ${
                        messageType === "success"
                            ? "bg-green-100 text-green-800 border-2 border-green-300"
                            : "bg-red-100 text-red-800 border-2 border-red-300"
                    }`}>
                        {message}
                    </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left Column - Stats & Progress */}
                    <div className="lg:col-span-1 space-y-6">
                        {/* Lesson Progress */}
                        <div className="bg-white rounded-2xl shadow-lg p-6 border-2 border-gray-100">
                            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <FaChartLine className="text-blue-600" />
                                Lesson Progress
                            </h2>
                            <div className="w-full bg-gray-200 rounded-full h-6 overflow-hidden shadow-inner mb-2">
                                <div
                                    className="bg-gradient-to-r from-green-500 to-green-600 h-full flex items-center justify-end pr-3 text-white text-sm font-bold transition-all duration-500"
                                    style={{ width: `${progress}%` }}
                                >
                                    {progress}%
                                </div>
                            </div>
                            <p className="text-sm text-gray-600 text-center">
                                {Math.round((progress / 100) * totalLessons)} of {totalLessons} lessons completed
                            </p>
                        </div>

                        {/* Level Progress */}
                        <div className="bg-white rounded-2xl shadow-lg p-6 border-2 border-gray-100">
                            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <FaFire className="text-orange-500" />
                                Level Progress
                            </h2>
                            <div className="text-center mb-4">
                                <p className="text-3xl font-bold text-blue-600">Level {level}</p>
                                <p className="text-sm text-gray-600">Next level at {(level + 1) * 30} points</p>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-6 overflow-hidden shadow-inner">
                                <div
                                    className="bg-gradient-to-r from-blue-500 to-purple-600 h-full flex items-center justify-end pr-3 text-white text-sm font-bold transition-all duration-500"
                                    style={{ width: `${((points % 30) / 30) * 100}%` }}
                                >
                                    {points % 30}/30
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Settings */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Avatar Selection */}
                        <div className="bg-white rounded-2xl shadow-lg p-6 border-2 border-gray-100">
                            <h2 className="text-xl font-bold text-gray-900 mb-4">Choose Your Avatar</h2>
                            <div className="grid grid-cols-4 sm:grid-cols-8 gap-4">
                                {avatars.map((avatar, index) => {
                                    const isUnlocked = index <= level;
                                    return (
                                        <div key={index} className="relative group">
                                            <img
                                                src={avatar}
                                                alt={`Avatar ${index + 1}`}
                                                className={`w-full aspect-square rounded-full cursor-pointer border-4 transition-all duration-300 ${
                                                    selectedAvatar === avatar
                                                        ? "border-blue-500 shadow-xl scale-110"
                                                        : "border-gray-300"
                                                } ${!isUnlocked ? "opacity-40 grayscale" : "hover:scale-110 hover:shadow-lg"}`}
                                                onClick={() => {
                                                    if (isUnlocked) setSelectedAvatar(avatar);
                                                }}
                                            />
                                            {!isUnlocked && (
                                                <div className="absolute inset-0 flex flex-col items-center justify-center text-xs font-bold text-white bg-black/60 rounded-full">
                                                    <FaLock className="mb-1" />
                                                    <span>Lvl {index}</span>
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                            <p className="text-sm text-gray-500 mt-4 text-center">
                                Unlock more avatars by leveling up! ({level + 1} / {avatars.length} unlocked)
                            </p>
                        </div>

                        {/* Update Name */}
                        <div className="bg-white rounded-2xl shadow-lg p-6 border-2 border-gray-100">
                            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <FaEdit className="text-blue-600" />
                                Update Profile
                            </h2>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Name</label>
                            <input
                                type="text"
                                value={newName}
                                onChange={(e) => setNewName(e.target.value)}
                                className="w-full p-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition-colors mb-4"
                                placeholder="Enter your name"
                            />
                            <button
                                onClick={updateProfile}
                                disabled={loading}
                                className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-3 rounded-xl font-bold hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? "Updating..." : "Update Name"}
                            </button>
                        </div>

                        {/* Change Password */}
                        <div className="bg-white rounded-2xl shadow-lg p-6 border-2 border-gray-100">
                            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <FaKey className="text-orange-600" />
                                Change Password
                            </h2>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Old Password</label>
                                    <input
                                        type="password"
                                        placeholder="Enter old password"
                                        value={oldPassword}
                                        onChange={(e) => setOldPassword(e.target.value)}
                                        className="w-full p-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition-colors"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">New Password</label>
                                    <input
                                        type="password"
                                        placeholder="Enter new password"
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        className="w-full p-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition-colors"
                                    />
                                </div>
                                <button
                                    onClick={updatePassword}
                                    disabled={loading}
                                    className="w-full sm:w-auto bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-3 rounded-xl font-bold hover:from-orange-600 hover:to-orange-700 transition-all duration-300 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {loading ? "Updating..." : "Change Password"}
                                </button>
                            </div>
                        </div>

                        {/* Logout */}
                        <div className="bg-white rounded-2xl shadow-lg p-6 border-2 border-gray-100">
                            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <FaSignOutAlt className="text-red-600" />
                                Account Actions
                            </h2>
                            <button
                                onClick={handleLogout}
                                className="w-full sm:w-auto bg-gradient-to-r from-red-500 to-red-600 text-white px-8 py-3 rounded-xl font-bold hover:from-red-600 hover:to-red-700 transition-all duration-300 shadow-md hover:shadow-lg"
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function StatBadge({ icon, value, label }) {
    return (
        <div className="bg-white/20 backdrop-blur-sm rounded-xl px-4 py-2 flex items-center gap-2">
            <span className="text-xl">{icon}</span>
            <div>
                <p className="text-lg font-bold">{value}</p>
                <p className="text-xs text-blue-100">{label}</p>
            </div>
        </div>
    );
}