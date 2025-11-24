"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { User, Mail, Lock, ArrowRight, Eye, EyeOff, Loader2, AlertCircle, Home } from "lucide-react";

export default function Signup() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [passwordStrength, setPasswordStrength] = useState("");
    const router = useRouter();

    // Check password strength
    useEffect(() => {
        if (!password) {
            setPasswordStrength("");
            return;
        }

        const strength = calculatePasswordStrength(password);
        setPasswordStrength(strength);
    }, [password]);

    const calculatePasswordStrength = (password) => {
        if (password.length < 6) return "weak";
        if (password.length < 8) return "fair";

        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasNumbers = /\d/.test(password);
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

        const strength = [hasUpperCase, hasLowerCase, hasNumbers, hasSpecialChar].filter(Boolean).length;

        if (password.length >= 12 && strength >= 3) return "strong";
        if (password.length >= 8 && strength >= 2) return "good";
        return "fair";
    };

    const getStrengthColor = () => {
        switch (passwordStrength) {
            case "weak": return "bg-red-500";
            case "fair": return "bg-orange-500";
            case "good": return "bg-yellow-500";
            case "strong": return "bg-green-500";
            default: return "bg-gray-300";
        }
    };

    const getStrengthWidth = () => {
        switch (passwordStrength) {
            case "weak": return "w-1/4";
            case "fair": return "w-2/4";
            case "good": return "w-3/4";
            case "strong": return "w-full";
            default: return "w-0";
        }
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrorMessage("");

        // Validation
        if (name.trim() === "") {
            setErrorMessage("Name is required.");
            setLoading(false);
            return;
        }

        if (password.length < 6) {
            setErrorMessage("Password must be at least 6 characters long.");
            setLoading(false);
            return;
        }

        if (!email || !password) {
            setErrorMessage("Please fill in all fields.");
            setLoading(false);
            return;
        }

        try {
            // Sign up the user with Supabase Auth
            const { data, error } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    data: {
                        name: name
                    }
                }
            });

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
                    setLoading(false);
                } else {
                    console.log("✅ User successfully inserted into users table!");
                    router.push("/key-functions/signup-success");
                }
            }
        } catch (err) {
            console.error("Unexpected error:", err);
            setErrorMessage("An unexpected error occurred. Please try again.");
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50 flex items-center justify-center px-4 py-24">
            <div className="w-full max-w-md">


                {/* Signup Form Card */}
                <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
                    {/* Form Header */}
                    <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-10 text-center">
                        <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                            <User className="w-12 h-12 text-blue-600" />
                        </div>
                        <h2 className="text-3xl font-bold text-white mb-2">Create Account</h2>
                        <p className="text-blue-100">Start learning Punjabi today</p>
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

                        <form onSubmit={handleSignup} className="space-y-5">
                            {/* Name Input */}
                            <div>
                                <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                                    Full Name
                                </label>
                                <div className="relative">
                                    <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input
                                        id="name"
                                        className="w-full pl-12 pr-4 py-3.5 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 disabled:bg-gray-100 disabled:cursor-not-allowed"
                                        type="text"
                                        placeholder="Enter your full name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        disabled={loading}
                                        required
                                    />
                                </div>
                            </div>

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
                                        className="w-full pl-12 pr-12 py-3.5 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 disabled:bg-gray-100 disabled:cursor-not-allowed"
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Create a strong password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        disabled={loading}
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                        disabled={loading}
                                    >
                                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                    </button>
                                </div>

                                {/* Password Strength Indicator */}
                                {password && (
                                    <div className="mt-2">
                                        <div className="flex items-center justify-between mb-1">
                                            <span className="text-xs text-gray-600">Password strength:</span>
                                            <span className={`text-xs font-medium capitalize ${
                                                passwordStrength === "weak" ? "text-red-600" :
                                                    passwordStrength === "fair" ? "text-orange-600" :
                                                        passwordStrength === "good" ? "text-yellow-600" :
                                                            "text-green-600"
                                            }`}>
                                                {passwordStrength}
                                            </span>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-2">
                                            <div className={`${getStrengthColor()} ${getStrengthWidth()} h-2 rounded-full transition-all duration-300`}></div>
                                        </div>
                                    </div>
                                )}

                                <p className="text-xs text-gray-500 mt-2">Must be at least 6 characters</p>
                            </div>

                            {/* Signup Button */}
                            <button
                                type="submit"
                                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 rounded-xl font-bold text-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
                                disabled={loading}
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                        <span>Creating Account...</span>
                                    </>
                                ) : (
                                    <>
                                        <span>Create Account</span>
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

                        {/* Login Link */}
                        <p className="mt-6 text-center text-sm text-gray-600">
                            Already have an account?{" "}
                            <a
                                href="/key-functions/auth"
                                className="text-blue-600 font-bold hover:text-blue-700 hover:underline transition-colors"
                            >
                                Log In
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}