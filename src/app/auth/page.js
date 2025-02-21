"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabaseClient"; // ✅ Ensure correct import path

export default function SignIn() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const router = useRouter();

    const handleLogin = async (e) => {np
        e.preventDefault();
        setLoading(true);
        setErrorMessage("");

        const { error } = await supabase.auth.signInWithPassword({ email, password });

        if (error) {
            setErrorMessage("Invalid email or password.");
            setLoading(false);
            return;
        }

        router.push("/profile");
        setPassword("");
        setLoading(false);
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-blue-50 to-white px-6">
            <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-lg border border-gray-200">
                <h1 className="text-3xl font-extrabold text-[var(--primary)] text-center">Login</h1>
                {errorMessage && <p className="text-center text-red-500 mt-4">{errorMessage}</p>}
                <form onSubmit={handleLogin} className="mt-6">
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-[var(--primary)] text-white p-3 rounded-lg font-semibold hover:bg-[var(--secondary)] transition"
                        disabled={loading}
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>
                </form>
                <p className="mt-4 text-center text-sm text-gray-500">
                    Don't have an account? {" "}
                    <a href="/signup" className="text-[var(--primary)] font-semibold hover:underline">
                        Sign up
                    </a>
                </p>
            </div>
        </div>
    );
}
