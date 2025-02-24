"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { supabase } from "../../lib/supabaseClient";

const avatars = [
    "/avatars/avatar1.png",
    "/avatars/avatar2.png",
    "/avatars/avatar3.png",
    "/avatars/avatar4.png",
];

export default function Profile() {
    const [darkMode, setDarkMode] = useState(false);
    const [selectedAvatar, setSelectedAvatar] = useState(avatars[0]);
    const [name, setName] = useState("");
    const [newName, setNewName] = useState("");
    const [email, setEmail] = useState("");
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

            // 🛠️ Fix: Ensure a single row is fetched using .limit(1)
            const { data, error } = await supabase
                .from("users")
                .select("name")
                .eq("email", user.email)
                .limit(1)
                .single();

            if (error) {
                console.error("Supabase Fetch Error:", error.message);
                setMessage(`❌ Error fetching user data: ${error.message}`);
                return;
            }

            if (!data) {
                setMessage("❌ No user data found. Please complete your profile.");
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

        if (!email) {
            setMessage("❌ User email not found.");
            setLoading(false);
            return;
        }

        const { error } = await supabase.from("users").update({ name: newName }).eq("email", email);
        if (error) {
            console.error("Supabase Update Error:", error.message);
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
            console.error("Password Update Error:", error.message);
            setMessage(`❌ Error updating password: ${error.message}`);
        } else {
            setMessage("✅ Password updated successfully!");
            setOldPassword("");
            setNewPassword("");
        }
        setLoading(false);
    };

    return (
        <div className={`min-h-screen flex items-center justify-center px-6 pt-24 ${darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"}`}>
            <div className="p-8 rounded-xl shadow-lg w-full max-w-4xl text-center border border-gray-300 bg-gray-100">
                <div className="flex flex-col items-center">
                    <Image src={selectedAvatar} alt="User Avatar" width={96} height={96} className="rounded-full mb-4 shadow-md border-4 border-gray-300" />
                    <h1 className="text-3xl font-bold">{name}</h1>
                    <p className="text-gray-500">Customize your learning experience!</p>
                </div>

                <div className="mt-6">
                    <h2 className="text-lg font-semibold">Choose Your Avatar:</h2>
                    <div className="flex justify-center space-x-4 mt-3">
                        {avatars.map((avatar, index) => (
                            <Image key={index} src={avatar} alt={`Avatar ${index + 1}`} width={64} height={64} className={`rounded-full cursor-pointer border-2 ${selectedAvatar === avatar ? "border-blue-500 shadow-lg" : "border-gray-300"} hover:scale-105 transition`} onClick={() => setSelectedAvatar(avatar)} />
                        ))}
                    </div>
                </div>

                {message && <p className="text-center text-red-500 mt-4">{message}</p>}

                <div className="mt-6 grid grid-cols-2 gap-6">
                    <div>
                        <label className="block font-semibold">Name</label>
                        <input type="text" value={newName} onChange={(e) => setNewName(e.target.value)} className="w-full p-3 rounded-md border border-gray-300 bg-white text-gray-900" />
                    </div>
                </div>

                <button onClick={updateProfile} className="mt-4 w-48 bg-green-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-600 transition">Update Profile</button>

                <div className="mt-6">
                    <label className="block font-semibold">Change Password</label>
                    <input type="password" placeholder="Enter old password" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} className="w-full p-3 rounded-md border border-gray-300 mt-2" />
                    <input type="password" placeholder="Enter new password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="w-full p-3 rounded-md border border-gray-300 mt-2" />
                    <button onClick={updatePassword} className="mt-4 w-48 bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-600 transition">Change Password</button>
                </div>

                <button onClick={async () => { await supabase.auth.signOut(); router.push("/auth"); }} className="mt-6 w-48 bg-red-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-600 transition">Logout</button>
            </div>
        </div>
    );
}
