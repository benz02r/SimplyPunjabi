"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabaseClient"; // ✅ Ensure correct import path

export default function Auth() {
    const [name, setName] = useState(""); // ✅ Added name for signup
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [isLogin, setIsLogin] = useState(true); // ✅ Toggle between login & signup
    const router = useRouter();

    // ✅ Handle Signup
    const handleSignup = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrorMessage("");

        if (name.trim() === "") {
            setErrorMessage("Name is required.");
            setLoading(false);
            return;
        }

        // ✅ Validate Email Format
        const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        if (!validateEmail(email)) {
            setErrorMessage("Please enter a valid email address.");
            setLoading(false);
            return;
        }

        // ✅ Sign up with Supabase Auth
        const { data, error } = await supabase.auth.signUp({ email, password });

        if (error) {
            setErrorMessage(`Signup Failed: ${error.message}`);
            setLoading(false);
            return;
        }

        if (data?.user) {
            const userId = data.user.id; // ✅ Capture UUID from Supabase Auth

            // ✅ Insert the user into the database
            const { error: dbError } = await supabase
                .from("users")
                .insert([
                    {
                        id: userId, // ✅ Matches Supabase Auth UUID
                        email,
                        name,
                        created_at: new Date().toISOString(), // Ensure a valid timestamp
                    }
                ]);

            if (dbError) {
                setErrorMessage("User created in Auth but not saved in database.");
            } else {
                alert("Signup successful! Check your email for verification.");
                router.push("/auth");
            }
        }

        setLoading(false);
    };

    // ✅ Handle Login
    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrorMessage("");

        const { error } = await supabase.auth.signInWithPassword({ email, password });

        if (error) {
            setErrorMessage("Invalid email or password.");
            setLoading(false);
            return;
        }

        router.push("/signup-success");

        setLoading(false);
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-blue-50 to-white px-6">
            <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-lg border border-gray-200">
                <h1 className="text-3xl font-extrabold text-[var(--primary)] text-center">
                    {isLogin ? "Login" : "Sign Up"}
                </h1>

                {/* Error Message */}
                {errorMessage && (
                    <p className="text-center text-red-500 mt-4">{errorMessage}</p>
                )}

                <form onSubmit={isLogin ? handleLogin : handleSignup} className="mt-6">
                    {/* Name Input for Signup */}
                    {!isLogin && (
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Name</label>
                            <input
                                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                                type="text"
                                placeholder="Enter your name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>
                    )}

                    {/* Email Input */}
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

                    {/* Password Input */}
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

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-[var(--primary)] text-white p-3 rounded-lg font-semibold hover:bg-[var(--secondary)] transition"
                        disabled={loading}
                    >
                        {loading ? (isLogin ? "Logging in..." : "Signing up...") : (isLogin ? "Login" : "Sign Up")}
                    </button>
                </form>

                {/* Toggle Between Login & Signup */}
                <p className="mt-4 text-center text-sm text-gray-500">
                    {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
                    <button
                        onClick={() => setIsLogin(!isLogin)}
                        className="text-[var(--primary)] font-semibold hover:underline"
                    >
                        {isLogin ? "Sign up" : "Login"}
                    </button>
                </p>
            </div>
        </div>
    );
}
