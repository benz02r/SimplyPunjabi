"use client";

import { useState } from "react";
import { sendPasswordResetEmail } from "@/lib/supabaseClient";

export default function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const handleResetRequest = async (e) => {
        e.preventDefault();
        setMessage("");

        const { error } = await sendPasswordResetEmail(email);

        if (error) {
            setMessage("❌ Error sending password reset email. Please try again.");
        } else {
            setMessage("✅ Password reset email sent! Check your inbox.");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen px-6 bg-gradient-to-b from-blue-50 to-white text-center">
            <div className="p-8 rounded-xl shadow-lg w-full max-w-md border border-gray-300 bg-white">
                <h1 className="text-3xl font-bold text-[var(--primary)]">🔑 Forgot Password?</h1>
                <p className="mt-3 text-gray-700">Enter your email to receive a password reset link.</p>

                <form onSubmit={handleResetRequest} className="mt-6">
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        required
                        className="w-full p-3 rounded-md border border-gray-300"
                    />
                    <button
                        type="submit"
                        className="mt-4 w-full bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-600 transition"
                    >
                        Send Reset Link
                    </button>
                </form>

                {message && <p className="mt-4 text-gray-600">{message}</p>}

                <button
                    onClick={() => window.history.back()}
                    className="mt-6 bg-gray-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-gray-600 transition"
                >
                    ← Back
                </button>
            </div>
        </div>
    );
}
