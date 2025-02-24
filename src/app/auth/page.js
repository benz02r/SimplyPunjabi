"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabaseClient";

export default function SignIn() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const router = useRouter();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrorMessage("");

        const { data, error } = await supabase.auth.signInWithPassword({ email, password });

        if (error) {
            setErrorMessage("Invalid email or password.");
            setLoading(false);
            return;
        }

        if (!data?.session) {
            setErrorMessage("Login failed. Please try again.");
            setLoading(false);
            return;
        }

        router.push("/dashboard");
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-blue-50 to-white px-6">
            <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-lg border-2 border-gray-200 transition-all hover:border-[3px] hover:border-orange-600 hover:shadow-xl">

                <h1 className="text-3xl font-extrabold text-[var(--primary)] text-center">Login</h1>

                {/* Error Message */}
                {errorMessage && <p className="text-center text-red-500 mt-4">{errorMessage}</p>}

                <form onSubmit={handleLogin} className="mt-6">
                    {/* Email Input */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            className="w-full p-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    {/* Password Input */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            className="w-full p-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    {/* Login Button */}
                    <button
                        type="submit"
                        className="w-full bg-[var(--primary)] text-white p-3 rounded-lg font-semibold hover:bg-[var(--secondary)] transition"
                        disabled={loading}
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>
                </form>

                {/* Back to Home Button (Blue Button) */}
                <button
                    onClick={() => router.push("/")}
                    className="mt-4 w-full bg-blue-500 text-white p-3 rounded-lg font-semibold hover:bg-blue-600 transition"
                >
                    ← Back to Home
                </button>

                {/* Signup Link */}
                <p className="mt-4 text-center text-sm text-gray-500">
                    Don't have an account?{" "}
                    <a href="/signup" className="text-[var(--primary)] font-semibold hover:underline">
                        Sign up
                    </a>
                </p>
            </div>
        </div>
    );
}
