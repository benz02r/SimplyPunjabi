"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient"; // ✅ Ensure the correct import path

export default function Signup() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState(""); // ✅ New name field
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const router = useRouter();

    const handleSignup = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrorMessage("");

        if (name.trim() === "") {
            setErrorMessage("Name is required.");
            setLoading(false);
            return;
        }

        // ✅ Sign up the user with Supabase Auth
        const { data, error } = await supabase.auth.signUp({ email, password });

        if (error) {
            console.error("❌ Supabase Auth Error:", error.message);
            setErrorMessage(error.message);
            setLoading(false);
            return;
        }

        if (data?.user) {
            const userId = data.user.id; // ✅ Capture UUID from Auth
            console.log("✅ User created in Supabase Auth:", userId);

            // ✅ Attempt to insert into "users" table
            const { error: dbError } = await supabase
                .from("users")
                .insert([
                    {
                        id: userId, // ✅ Ensure UUID format matches database
                        email,
                        name,
                        created_at: new Date().toISOString(), // Ensure a valid timestamp
                    }
                ]);

            if (dbError) {
                console.error("❌ Database Insert Error:", dbError);
                setErrorMessage("User created in Auth but not saved in database.");
            } else {
                console.log("✅ User successfully inserted into users table!");
                router.push("/signup-success");
            }
        }

        setLoading(false);
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-blue-50 to-white px-6">
            <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-lg border-2 border-gray-200 transition-all hover:border-[3px] hover:border-orange-600 hover:shadow-xl">

                <h1 className="text-3xl font-extrabold text-[var(--primary)] text-center">Sign Up</h1>
                <p className="text-center text-gray-600 text-sm mt-2">Create your account to start learning Punjabi!</p>

                {/* Error Message */}
                {errorMessage && (
                    <p className="text-center text-red-500 mt-4">{errorMessage}</p>
                )}

                <form onSubmit={handleSignup} className="mt-6">
                    {/* Name Input */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Name</label>
                        <input
                            className="w-full p-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                            type="text"
                            placeholder="Enter your name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>

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

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-[var(--primary)] text-white p-3 rounded-lg font-semibold hover:bg-[var(--secondary)] transition"
                        disabled={loading}
                    >
                        {loading ? "Signing up..." : "Sign Up"}
                    </button>
                </form>

                {/* Login Link */}
                <p className="mt-4 text-center text-sm text-gray-500">
                    Already have an account?{" "}
                    <a href="/auth" className="text-[var(--primary)] font-semibold hover:underline">Login</a>
                </p>
            </div>
        </div>
    );
}
