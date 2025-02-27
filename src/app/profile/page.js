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
    const router = useRouter();

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

            // Fetch user name from database using user ID
            const { data, error } = await supabase
                .from("users")
                .select("name")
                .eq("id", user.id)
                .single();

            if (error) {
                setMessage(`❌ Error fetching user data: ${error.message}`);
                return;
            }

            setName(data?.name || "User");
            setNewName(data?.name || "");
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

    return (
        <div className="min-h-screen flex flex-col items-center justify-center px-6 pt-32 md:pt-24 pb-16 bg-gradient-to-b from-blue-50 to-white">
            <div className="p-8 rounded-xl shadow-lg w-full max-w-4xl text-center border border-gray-300 bg-white">

                {/* Back to Dashboard Button */}
                <div className="w-full flex justify-start mb-6">
                    <button
                        onClick={() => router.push("/dashboard")}
                        className="bg-gray-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-gray-600 transition"
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

                {/* Avatar Selection */}
                <div className="mt-6">
                    <h2 className="text-lg font-semibold">Choose Your Avatar:</h2>
                    <div className="grid grid-cols-4 gap-4 justify-center mt-3">
                        {avatars.map((avatar, index) => (
                            <Image
                                key={index}
                                src={avatar}
                                alt={`Avatar ${index + 1}`}
                                width={64}
                                height={64}
                                className={`rounded-full cursor-pointer border-2 ${selectedAvatar === avatar ? "border-blue-500 shadow-lg" : "border-gray-300"} hover:scale-105 transition`}
                                onClick={() => setSelectedAvatar(avatar)}
                            />
                        ))}
                    </div>
                </div>

                {/* Display Error or Success Messages */}
                {message && <p className="text-center text-red-500 mt-4">{message}</p>}

                {/* Update Name Section */}
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

                {/* Reset Password Section */}
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

                {/* Logout Button */}
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
