"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { Mail, Lock, ArrowRight, UserCircle, Book, Trophy, TrendingUp, Loader2, AlertCircle, Home } from "lucide-react";

export default function SignIn() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrorMessage("");

        // Basic validation
        if (!email || !password) {
            setErrorMessage("Please enter both email and password.");
            setLoading(false);
            return;
        }

        const { data, error } = await supabase.auth.signInWithPassword({ email, password });

        if (error) {
            setErrorMessage(error.message || "Invalid email or password.");
            setLoading(false);
            return;
        }

        if (!data?.session) {
            setErrorMessage("Login failed. Please try again.");
            setLoading(false);
            return;
        }

        // Successfully logged in
        router.push("/dashboard");
    };

    const features = [
        {
            icon: <Book className="w-8 h-8 text-blue-500" />,
            text: "Continue your lessons",
            description: "Pick up where you left off"
        },
        {
            icon: <Trophy className="w-8 h-8 text-orange-500" />,
            text: "Track your achievements",
            description: "Celebrate your milestones"
        },
        {
            icon: <TrendingUp className="w-8 h-8 text-green-500" />,
            text: "Monitor your progress",
            description: "See how far you've come"
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50 flex items-center justify-center px-4 py-24 md:py-32">
            <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

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
                            <div
                                key={index}
                                className="flex items-start gap-4 p-5 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100"
                            >
                                <div className="flex-shrink-0 mt-1">
                                    {feature.icon}
                                </div>
                                <div>
                                    <p className="text-gray-800 text-lg font-semibold">{feature.text}</p>
                                    <p className="text-gray-500 text-sm mt-1">{feature.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="bg-gradient-to-r from-blue-600 to-orange-500 rounded-2xl p-8 text-white shadow-lg">
                        <p className="text-lg font-semibold mb-2 flex items-center gap-2">
                            <span className="text-2xl">💡</span> Pro Tip
                        </p>
                        <p className="text-xl font-bold mb-2">Practice Daily for Best Results</p>
                        <p className="text-blue-100">Just 10 minutes a day makes a difference!</p>
                    </div>
                </div>

                {/* Right Side - Login Form */}
                <div className="w-full max-w-lg mx-auto">
                    <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
                        {/* Form Header */}
                        <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-10 text-center">
                            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                                <UserCircle className="w-12 h-12 text-blue-600" />
                            </div>
                            <h2 className="text-3xl font-bold text-white mb-2">Welcome Back</h2>
                            <p className="text-blue-100">Log in to continue learning</p>
                        </div>

                        {/* Form Body */}
                        <div className="px-8 py-8">
                            {/* Error Message */}
                            {errorMessage && (
                                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
                                    <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                                    <p className="text-red-700 text-sm font-medium">{errorMessage}</p>
                                </div>
                            )}

                            <form onSubmit={handleLogin} className="space-y-5">
                                {/* Email Input */}
                                <div>
                                    <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                                        Email Address
                                    </label>
                                    <div className="relative">
                                        <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                        <input
                                            id="email"
                                            className="w-full pl-12 pr-4 py-3.5 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 disabled:bg-gray-100 disabled:cursor-not-allowed"
                                            type="email"
                                            placeholder="Enter your email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            disabled={loading}
                                            required
                                        />
                                    </div>
                                </div>

                                {/* Password Input */}
                                <div>
                                    <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
                                        Password
                                    </label>
                                    <div className="relative">
                                        <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                        <input
                                            id="password"
                                            className="w-full pl-12 pr-4 py-3.5 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 disabled:bg-gray-100 disabled:cursor-not-allowed"
                                            type={showPassword ? "text" : "password"}
                                            placeholder="Enter your password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            disabled={loading}
                                            required
                                        />
                                    </div>
                                    {/* Forgot Password Link */}
                                    <div className="mt-2 text-right">
                                        <a
                                            href="/key-functions/forgot-password"
                                            className="text-sm text-blue-600 font-semibold hover:text-blue-700 hover:underline transition-colors"
                                        >
                                            Forgot Password?
                                        </a>
                                    </div>
                                </div>

                                {/* Login Button */}
                                <button
                                    type="submit"
                                    className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 rounded-xl font-bold text-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <>
                                            <Loader2 className="w-5 h-5 animate-spin" />
                                            <span>Logging in...</span>
                                        </>
                                    ) : (
                                        <>
                                            <span>Log In</span>
                                            <ArrowRight className="w-5 h-5" />
                                        </>
                                    )}
                                </button>
                            </form>

                            {/* Divider */}
                            <div className="my-6 flex items-center gap-4">
                                <div className="flex-1 h-px bg-gray-200"></div>
                                <span className="text-sm text-gray-500 font-medium">OR</span>
                                <div className="flex-1 h-px bg-gray-200"></div>
                            </div>

                            {/* Back to Home */}
                            <button
                                onClick={() => router.push("/")}
                                disabled={loading}
                                className="w-full bg-gray-100 text-gray-700 py-3.5 rounded-xl font-semibold hover:bg-gray-200 transition-all duration-300 border-2 border-gray-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <Home className="w-5 h-5" />
                                Back to Home
                            </button>

                            {/* Signup Link */}
                            <p className="mt-6 text-center text-sm text-gray-600">
                                Don't have an account?{" "}
                                <a
                                    href="/key-functions/signup"
                                    className="text-blue-600 font-bold hover:text-blue-700 hover:underline transition-colors"
                                >
                                    Sign Up
                                </a>
                            </p>
                        </div>
                    </div>

                    {/* Mobile Features */}
                    <div className="lg:hidden mt-8 space-y-3 px-4">
                        {features.map((feature, index) => (
                            <div key={index} className="flex items-center gap-3 p-3 bg-white rounded-lg shadow-sm">
                                {feature.icon}
                                <div>
                                    <p className="text-sm font-semibold text-gray-800">{feature.text}</p>
                                    <p className="text-xs text-gray-500">{feature.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}