"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image"; // ✅ Import Next.js Image component

const avatars = [
    "/avatars/avatar1.png",
    "/avatars/avatar2.png",
    "/avatars/avatar3.png",
    "/avatars/avatar4.png",
];

export default function Profile() {
    const [darkMode, setDarkMode] = useState(false);
    const [selectedAvatar, setSelectedAvatar] = useState(avatars[0]);
    const [name, setName] = useState("Your Profile");
    const [email, setEmail] = useState("johndoe@example.com");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const router = useRouter();

    // Check system preference for dark mode
    useEffect(() => {
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        setDarkMode(prefersDark);
    }, []);

    const handleUpdateProfile = () => {
        if (password && password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }
        alert("Profile Updated Successfully!");
        if (name.trim() === "") {
            setName("Your Profile");
        }
    };

    const handleLogout = () => {
        alert("You have been logged out!");
        router.push("/auth");
    };

    return (
        <div className={`${darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"} min-h-screen flex items-center justify-center px-6 pt-24`}>

            <div className={`${darkMode ? "bg-gray-800 text-white" : "bg-gray-100 text-gray-900"} p-8 rounded-xl shadow-lg w-full max-w-4xl text-center border border-gray-300`}>

                {/* Profile Picture & Name */}
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

                {/* Avatar Selection */}
                <div className="mt-6">
                    <h2 className="text-lg font-semibold">Choose Your Avatar:</h2>
                    <div className="flex justify-center space-x-4 mt-3">
                        {avatars.map((avatar, index) => (
                            <Image
                                key={index}
                                src={avatar}
                                alt={`Avatar ${index + 1}`}
                                width={64}
                                height={64}
                                className={`rounded-full cursor-pointer border-2 ${
                                    selectedAvatar === avatar ? "border-blue-500 shadow-lg" : "border-gray-300"
                                } hover:scale-105 transition`}
                                onClick={() => setSelectedAvatar(avatar)}
                            />
                        ))}
                    </div>
                </div>

                {/* Profile Update Form */}
                <div className="mt-6 text-left grid grid-cols-2 gap-6">
                    <div>
                        <label className="block font-semibold">Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full p-3 rounded-md border border-gray-300 focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)] transition bg-white text-gray-900"
                        />
                    </div>

                    <div>
                        <label className="block font-semibold">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full p-3 rounded-md border border-gray-300 focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)] transition bg-white text-gray-900"
                        />
                    </div>

                    <div>
                        <label className="block font-semibold">New Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-3 rounded-md border border-gray-300 focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)] transition bg-white text-gray-900"
                        />
                    </div>

                    <div>
                        <label className="block font-semibold">Confirm Password</label>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full p-3 rounded-md border border-gray-300 focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)] transition bg-white text-gray-900"
                        />
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-6 flex flex-wrap justify-center gap-4">
                    <button
                        onClick={handleUpdateProfile}
                        className="w-48 bg-green-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-600 transition"
                    >
                        Update Profile
                    </button>

                    <button
                        onClick={handleLogout}
                        className="w-48 bg-red-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-600 transition"
                    >
                        Logout
                    </button>

                    <button
                        onClick={() => setDarkMode(!darkMode)}
                        className="w-48 bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-600 transition"
                    >
                        {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
                    </button>
                </div>
            </div>
        </div>
    );
}
