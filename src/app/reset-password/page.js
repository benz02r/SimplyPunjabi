"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { updatePassword } from "@/lib/supabaseClient";

export default function ResetPassword() {
    const router = useRouter();
    const [newPassword, setNewPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleResetPassword = async (e) => {
        e.preventDefault();
        setMessage("");

        const { error } = await updatePassword(newPassword);

        if (error) {
            setMessage("❌ Error resetting password. Please try again.");
        } else {
            setMessage("✅ Password reset successfully! Redirecting to login...");
            setTimeout(() => router.push("/auth"), 2000);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen px-6 bg-gradient-to-b from-blue-50 to-white text-center">
            <div className="p-8 rounded-xl shadow-lg w-full max-w-md border border-gray-300 bg-white">
                <h1 className="text-3xl font-bold text-[var(--primary)]">🔒 Reset Password</h1>
                <p className="mt-3 text-gray-700">Enter your new password below.</p>

                <form onSubmit={handleResetPassword} className="mt-6">
                    <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="Enter new password"
                        required
                        className="w-full p-3 rounded-md border border-gray-300"
                    />
                    <button
                        type="submit"
                        className="mt-4 w-full bg-green-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-600 transition"
                    >
                        Update Password
                    </button>
                </form>

                {message && <p className="mt-4 text-gray-600">{message}</p>}
            </div>
        </div>
    );
}
