"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { FaEnvelope, FaLock, FaArrowRight, FaUserCircle, FaBook, FaTrophy, FaChartLine } from "react-icons/fa";

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

    const features = [
        { icon: <FaBook className="text-3xl text-blue-500" />, text: "Continue your lessons" },
        { icon: <FaTrophy className="text-3xl text-orange-500" />, text: "Track your achievements" },
        { icon: <FaChartLine className="text-3xl text-green-500" />, text: "Monitor your progress" }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50 flex items-center justify-center px-4 py-20">
            <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">

                {/* Left Side - Welcome Back Message */}
                <div className="hidden lg:block space-y-8 px-8">
                    <div>
                        <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-orange-500 bg-clip-text text-transparent mb-4">
                            Welcome Back!
                        </h1>
                        <p className="text-xl text-gray-600 leading-relaxed">
                            Continue your Punjabi learning journey right where you left off
                        </p>
                    </div>

                    <div className="space-y-4">
                        {features.map((feature, index) => (
                            <div key={index} className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
                                <div className="flex-shrink-0">
                                    {feature.icon}
                                </div>
                                <p className="text-gray-700 text-lg font-medium">{feature.text}</p>
                            </div>
                        ))}
                    </div>

                    <div className="bg-gradient-to-r from-blue-600 to-orange-500 rounded-2xl p-8 text-white">
                        <p className="text-lg font-semibold mb-2">💡 Pro Tip</p>
                        <p className="text-xl font-bold mb-2">Practice Daily for Best Results</p>
                        <p className="text-blue-100">Just 10 minutes a day makes a difference!</p>
                    </div>
                </div>

                {/* Right Side - Login Form */}
                <div className="w-full max-w-md mx-auto">
                    <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
                        {/* Form Header */}
                        <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-8 text-center">
                            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                                <FaUserCircle className="text-4xl text-blue-600" />
                            </div>
                            <h2 className="text-3xl font-bold text-white mb-2">Welcome Back</h2>
                            <p className="text-blue-100">Log in to continue learning</p>
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
                                            placeholder="Enter your password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            required
                                        />
                                    </div>
                                    {/* Forgot Password Link */}
                                    <div className="mt-2 text-right">
                                        <a href="/key-functions/forgot-password" className="text-sm text-blue-600 font-semibold hover:underline">
                                            Forgot Password?
                                        </a>
                                    </div>
                                </div>

                                {/* Login Button */}
                                <button
                                    onClick={handleLogin}
                                    className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 rounded-xl font-bold text-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <span>Logging in...</span>
                                    ) : (
                                        <>
                                            <span>Log In</span>
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

                            {/* Signup Link */}
                            <p className="mt-6 text-center text-sm text-gray-600">
                                Don't have an account?{" "}
                                <a href="/key-functions/signup" className="text-blue-600 font-bold hover:underline">
                                    Sign Up
                                </a>
                            </p>
                        </div>
                    </div>

                    {/* Mobile Features */}
                    <div className="lg:hidden mt-8 space-y-3">
                        {features.map((feature, index) => (
                            <div key={index} className="flex items-center gap-3 text-gray-700">
                                {feature.icon}
                                <p className="text-sm">{feature.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}