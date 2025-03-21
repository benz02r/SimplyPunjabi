"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { supabase } from "@/lib/supabaseClient";

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
                router.push("/signin");
                return;
            }

            const user = sessionData.session.user;
            setEmail(user.email);
            setUserId(user.id);

            const { data: userData, error } = await supabase
                .from("users")
                .select("name, points")
                .eq("id", user.id)
                .single();

            if (error) {
                setMessage(`❌ Error fetching user data: ${error.message}`);
                return;
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

    const updateProfile = async () => {
        setLoading(true);
        setMessage("");

        if (!newName.trim()) {
            setMessage("⚠️ Name cannot be empty.");
            setLoading(false);
            return;
        }

        const { error } = await supabase
            .from("users")
            .update({ name: newName })
            .eq("id", userId);

        if (error) {
            console.error("Update Error:", error);
            setMessage(`❌ Error updating profile: ${error.message}`);
        } else {
            setName(newName);
            setMessage("✅ Profile updated successfully!");
        }
        setLoading(false);
    };

    const updatePassword = async () => {
        setLoading(true);
        setMessage("");

        if (!oldPassword || !newPassword) {
            setMessage("⚠️ Please enter both old and new passwords.");
            setLoading(false);
            return;
        }

        const { error } = await supabase.auth.updateUser({ password: newPassword });

        if (error) {
            setMessage(`❌ Error updating password: ${error.message}`);
        } else {
            setMessage("✅ Password updated successfully!");
            setOldPassword("");
            setNewPassword("");
        }
        setLoading(false);
    };

    const unlockedAvatars = avatars.slice(0, level + 1);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center px-6 pt-32 md:pt-24 pb-16 bg-gradient-to-b from-blue-50 to-white">
            <div className="p-8 rounded-xl shadow-lg w-full max-w-4xl text-center border border-gray-300 bg-white">

                {levelUp && (
                    <div className="fixed top-24 sm:top-32 left-1/2 transform -translate-x-1/2 bg-yellow-400 text-white px-6 py-3 rounded-full shadow-lg text-xl font-bold animate-pulse z-50">
                        🎉 LEVEL UP! You're now Level {level} 🎯
                    </div>
                )}

                <div className="w-full flex justify-start mb-10 mt-4">
                    <button
                        onClick={() => router.push("/dashboard")}
                        className="bg-gray-700 text-white px-5 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-all"
                    >
                        ← Back to Dashboard
                    </button>
                </div>

                <div className="flex flex-col items-center">
                    <Image
                        src={selectedAvatar}
                        alt="User Avatar"
                        width={96}
                        height={96}
                        className="rounded-full mb-4 shadow-md border-4 border-gray-300"
                    />
                    <h1 className="text-3xl font-bold">{name}</h1>
                    <p className="text-gray-500">Customize your learning experience!</p>
                </div>

                <div className="mt-6 w-full">
                    <h2 className="text-lg font-semibold text-gray-700 mb-2">Your Lesson Progress</h2>
                    <div className="w-full bg-gray-200 rounded-full h-5 overflow-hidden shadow-inner">
                        <div
                            className="bg-green-500 h-full text-right pr-2 text-white text-sm font-bold transition-all duration-500"
                            style={{ width: `${progress}%` }}
                        >
                            {progress}%
                        </div>
                    </div>
                </div>

                <div className="mt-4 text-center text-sm text-gray-700 font-medium space-y-2">
                    <div>🏆 Total Points: <span className="font-bold text-green-700">{points}</span></div>
                    <div>🎯 Level: <span className="font-bold text-blue-700">Level {level}</span></div>
                    <div className="w-full bg-gray-200 rounded-full h-4 shadow-inner">
                        <div
                            className="bg-blue-400 h-full transition-all duration-500 text-xs text-white text-right pr-2 font-semibold"
                            style={{ width: `${(points % 30) / 30 * 100}%` }}
                        >
                            {points % 30}/30
                        </div>
                    </div>
                </div>

                <div className="mt-6">
                    <h2 className="text-lg font-semibold">Choose Your Avatar:</h2>
                    <div className="grid grid-cols-4 gap-4 justify-center mt-3">
                        {avatars.map((avatar, index) => {
                            const isUnlocked = index <= level;
                            return (
                                <div key={index} className="relative">
                                    <Image
                                        src={avatar}
                                        alt={`Avatar ${index + 1}`}
                                        width={64}
                                        height={64}
                                        className={`rounded-full cursor-pointer border-2 ${
                                            selectedAvatar === avatar
                                                ? "border-blue-500 shadow-lg"
                                                : "border-gray-300"
                                        } ${!isUnlocked ? "opacity-40 grayscale" : "hover:scale-105 transition"}`}
                                        onClick={() => {
                                            if (isUnlocked) setSelectedAvatar(avatar);
                                        }}
                                    />
                                    {!isUnlocked && (
                                        <div className="absolute inset-0 flex items-center justify-center text-xs font-bold text-white bg-black bg-opacity-50 rounded-full">
                                            🔒 Level {index}
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>

                {message && <p className="text-center text-red-500 mt-4">{message}</p>}

                <div className="mt-6">
                    <label className="block font-semibold">Name</label>
                    <input
                        type="text"
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                        className="w-full p-3 rounded-md border border-gray-300 bg-white text-gray-900"
                    />
                    <button
                        onClick={updateProfile}
                        className="mt-4 w-full sm:w-48 bg-green-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-600 transition"
                    >
                        Update Name
                    </button>
                </div>

                <div className="mt-6">
                    <label className="block font-semibold">Change Password</label>
                    <input
                        type="password"
                        placeholder="Enter old password"
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                        className="w-full p-3 rounded-md border border-gray-300 mt-2"
                    />
                    <input
                        type="password"
                        placeholder="Enter new password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="w-full p-3 rounded-md border border-gray-300 mt-2"
                    />
                    <button
                        onClick={updatePassword}
                        className="mt-4 w-full sm:w-48 bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-600 transition"
                    >
                        Change Password
                    </button>
                </div>

                <button
                    onClick={async () => {
                        await supabase.auth.signOut();
                        router.push("/auth");
                    }}
                    className="mt-6 w-full sm:w-48 bg-red-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-600 transition"
                >
                    Logout
                </button>
            </div>
        </div>
    );
}