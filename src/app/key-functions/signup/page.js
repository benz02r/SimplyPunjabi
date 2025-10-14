"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { FaUser, FaEnvelope, FaLock, FaArrowRight, FaCheckCircle } from "react-icons/fa";

export default function Signup() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
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

        // Sign up the user with Supabase Auth
        const { data, error } = await supabase.auth.signUp({ email, password });

        if (error) {
            console.error("❌ Supabase Auth Error:", error.message);
            setErrorMessage(error.message);
            setLoading(false);
            return;
        }

        if (data?.user) {
            const userId = data.user.id;
            console.log("✅ User created in Supabase Auth:", userId);

            // Insert into "users" table
            const { error: dbError } = await supabase
                .from("users")
                .insert([
                    {
                        id: userId,
                        email,
                        name,
                        created_at: new Date().toISOString(),
                    }
                ]);

            if (dbError) {
                console.error("❌ Database Insert Error:", dbError);
                setErrorMessage("User created in Auth but not saved in database.");
            } else {
                console.log("✅ User successfully inserted into users table!");
                router.push("/key-functions/signup-success");
            }
        }

        setLoading(false);
    };

    const benefits = [
        "Access to interactive lessons",
        "Real-world conversation practice",
        "Cultural insights and context",
        "Track your learning progress"
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50 flex items-center justify-center px-4 py-20">
            <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">

                {/* Left Side - Benefits & Branding */}
                <div className="hidden lg:block space-y-8 px-8">
                    <div>
                        <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-orange-500 bg-clip-text text-transparent mb-4">
                            Join Simply Punjabi
                        </h1>
                        <p className="text-xl text-gray-600 leading-relaxed">
                            Start your journey to fluency with thousands of learners worldwide
                        </p>
                    </div>

                    <div className="space-y-4">
                        {benefits.map((benefit, index) => (
                            <div key={index} className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
                                <FaCheckCircle className="text-green-500 text-2xl mt-1 flex-shrink-0" />
                                <p className="text-gray-700 text-lg">{benefit}</p>
                            </div>
                        ))}
                    </div>

                    <div className="bg-gradient-to-r from-blue-600 to-orange-500 rounded-2xl p-8 text-white">
                        <p className="text-lg font-semibold mb-2"> Special Offer</p>
                        <p className="text-3xl font-bold mb-2">Get Started Free</p>
                        <p className="text-blue-100">No credit card required</p>
                    </div>
                </div>

                {/* Right Side - Signup Form */}
                <div className="w-full max-w-md mx-auto">
                    <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
                        {/* Form Header */}
                        <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-8 text-center">
                            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                                <FaUser className="text-4xl text-blue-600" />
                            </div>
                            <h2 className="text-3xl font-bold text-white mb-2">Create Account</h2>
                            <p className="text-blue-100">Start learning Punjabi today!</p>
                        </div>

                        {/* Form Body */}
                        <div className="px-8 py-8">
                            {/* Error Message */}
                            {errorMessage && (
                                <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-lg">
                                    <p className="text-red-700 text-sm font-medium">{errorMessage}</p>
                                </div>
                            )}

                            <div className="space-y-5">
                                {/* Name Input */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Full Name
                                    </label>
                                    <div className="relative">
                                        <FaUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                        <input
                                            className="w-full pl-12 pr-4 py-3.5 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300"
                                            type="text"
                                            placeholder="Enter your full name"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            required
                                        />
                                    </div>
                                </div>

                                {/* Email Input */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Email Address
                                    </label>
                                    <div className="relative">
                                        <FaEnvelope className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                        <input
                                            className="w-full pl-12 pr-4 py-3.5 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300"
                                            type="email"
                                            placeholder="Enter your email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                        />
                                    </div>
                                </div>

                                {/* Password Input */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Password
                                    </label>
                                    <div className="relative">
                                        <FaLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                        <input
                                            className="w-full pl-12 pr-4 py-3.5 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300"
                                            type="password"
                                            placeholder="Create a strong password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <p className="text-xs text-gray-500 mt-2">Must be at least 8 characters</p>
                                </div>

                                {/* Signup Button */}
                                <button
                                    onClick={handleSignup}
                                    className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 rounded-xl font-bold text-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <span>Creating Account...</span>
                                    ) : (
                                        <>
                                            <span>Create Account</span>
                                            <FaArrowRight />
                                        </>
                                    )}
                                </button>
                            </div>

                            {/* Divider */}
                            <div className="my-6 flex items-center gap-4">
                                <div className="flex-1 h-px bg-gray-200"></div>
                                <span className="text-sm text-gray-500 font-medium">OR</span>
                                <div className="flex-1 h-px bg-gray-200"></div>
                            </div>

                            {/* Back to Home */}
                            <button
                                onClick={() => router.push("/")}
                                className="w-full bg-gray-100 text-gray-700 py-3.5 rounded-xl font-semibold hover:bg-gray-200 transition-all duration-300 border-2 border-gray-200"
                            >
                                ← Back to Home
                            </button>

                            {/* Login Link */}
                            <p className="mt-6 text-center text-sm text-gray-600">
                                Already have an account?{" "}
                                <a href="/key-functions/auth" className="text-blue-600 font-bold hover:underline">
                                    Log In
                                </a>
                            </p>
                        </div>
                    </div>

                    {/* Mobile Benefits */}
                    <div className="lg:hidden mt-8 space-y-3">
                        {benefits.map((benefit, index) => (
                            <div key={index} className="flex items-center gap-3 text-gray-700">
                                <FaCheckCircle className="text-green-500 text-lg flex-shrink-0" />
                                <p className="text-sm">{benefit}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}