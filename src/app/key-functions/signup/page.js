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

    useEffect(() => {
        if (!password) {
            setPasswordStrength("");
            return;
        }
        setPasswordStrength(calculatePasswordStrength(password));
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
            case "fair": return "bg-orange-400";
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
                console.error("Supabase Auth Error:", error.message);
                setErrorMessage(error.message);
                setLoading(false);
                return;
            }

            if (data?.user) {
                const userId = data.user.id;

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
                    console.error("Database Insert Error:", dbError);
                    setErrorMessage("User created in Auth but not saved in database.");
                    setLoading(false);
                } else {
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
        <>
            <style jsx global>{`
                :root {
                    --color-saffron: #E67E22;
                    --color-navy: #1B2A4A;
                    --color-cream: #FDFBF7;
                    --color-warm-gray: #F7F5F2;
                    --font-display: 'DM Serif Display', Georgia, serif;
                    --font-body: 'DM Sans', system-ui, sans-serif;
                }
                body { font-family: var(--font-body); -webkit-font-smoothing: antialiased; }
                .font-display { font-family: var(--font-display); }
                .text-saffron { color: var(--color-saffron); }
                .bg-saffron { background-color: var(--color-saffron); }
                .text-navy { color: var(--color-navy); }
                .bg-navy { background-color: var(--color-navy); }
            `}</style>

            <div className="min-h-screen flex items-center justify-center px-4 py-28 relative overflow-hidden" style={{ backgroundColor: 'var(--color-cream)' }}>
                {/* Decorative background elements */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full opacity-30 -z-10"
                     style={{ background: 'radial-gradient(circle, rgba(230,126,34,0.12) 0%, transparent 70%)', transform: 'translate(30%, -30%)' }} />
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full opacity-20 -z-10"
                     style={{ background: 'radial-gradient(circle, rgba(27,42,74,0.08) 0%, transparent 70%)', transform: 'translate(-30%, 30%)' }} />

                {/* Gurmukhi watermark */}
                <div className="absolute top-1/2 right-12 -translate-y-1/2 text-[16rem] font-bold opacity-[0.02] select-none pointer-events-none leading-none hidden lg:block"
                     style={{ fontFamily: 'serif', color: 'var(--color-navy)' }}>
                    ੴ
                </div>

                <div className="w-full max-w-md relative z-10">
                    <div className="bg-white rounded-2xl shadow-xl border border-gray-200/80 overflow-hidden">

                        {/* Header */}
                        <div className="px-8 pt-10 pb-8 text-center" style={{ backgroundColor: 'var(--color-navy)' }}>
                            <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-5 border border-white/20">
                                <User className="w-8 h-8 text-white" />
                            </div>
                            <h2 className="text-2xl font-display text-white mb-1.5">Create Account</h2>
                            <p className="text-gray-400 text-sm">Start learning Punjabi today</p>
                        </div>

                        {/* Form body */}
                        <div className="px-8 py-8">
                            {/* Error */}
                            {errorMessage && (
                                <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-xl flex items-start gap-3">
                                    <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                                    <p className="text-red-600 text-sm font-medium">{errorMessage}</p>
                                </div>
                            )}

                            <form onSubmit={handleSignup} className="space-y-5">
                                {/* Name */}
                                <div>
                                    <label htmlFor="name" className="block text-sm font-semibold text-navy mb-2">
                                        Full Name
                                    </label>
                                    <div className="relative">
                                        <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                        <input
                                            id="name"
                                            className="w-full pl-12 pr-4 py-3.5 border border-gray-200 rounded-xl text-sm placeholder-gray-400 focus:outline-none focus:border-gray-400 focus:ring-2 focus:ring-gray-100 transition-all duration-200 disabled:bg-gray-50 disabled:cursor-not-allowed"
                                            style={{ color: 'var(--color-navy)' }}
                                            type="text"
                                            placeholder="Enter your full name"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            disabled={loading}
                                            required
                                        />
                                    </div>
                                </div>

                                {/* Email */}
                                <div>
                                    <label htmlFor="email" className="block text-sm font-semibold text-navy mb-2">
                                        Email Address
                                    </label>
                                    <div className="relative">
                                        <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                        <input
                                            id="email"
                                            className="w-full pl-12 pr-4 py-3.5 border border-gray-200 rounded-xl text-sm placeholder-gray-400 focus:outline-none focus:border-gray-400 focus:ring-2 focus:ring-gray-100 transition-all duration-200 disabled:bg-gray-50 disabled:cursor-not-allowed"
                                            style={{ color: 'var(--color-navy)' }}
                                            type="email"
                                            placeholder="Enter your email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            disabled={loading}
                                            required
                                        />
                                    </div>
                                </div>

                                {/* Password */}
                                <div>
                                    <label htmlFor="password" className="block text-sm font-semibold text-navy mb-2">
                                        Password
                                    </label>
                                    <div className="relative">
                                        <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                        <input
                                            id="password"
                                            className="w-full pl-12 pr-12 py-3.5 border border-gray-200 rounded-xl text-sm placeholder-gray-400 focus:outline-none focus:border-gray-400 focus:ring-2 focus:ring-gray-100 transition-all duration-200 disabled:bg-gray-50 disabled:cursor-not-allowed"
                                            style={{ color: 'var(--color-navy)' }}
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
                                            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                                            disabled={loading}
                                        >
                                            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                        </button>
                                    </div>

                                    {/* Strength indicator */}
                                    {password && (
                                        <div className="mt-2.5">
                                            <div className="flex items-center justify-between mb-1.5">
                                                <span className="text-xs text-gray-400">Password strength</span>
                                                <span className={`text-xs font-semibold capitalize ${
                                                    passwordStrength === "weak" ? "text-red-500" :
                                                        passwordStrength === "fair" ? "text-orange-500" :
                                                            passwordStrength === "good" ? "text-yellow-600" :
                                                                "text-green-600"
                                                }`}>
                                                    {passwordStrength}
                                                </span>
                                            </div>
                                            <div className="w-full bg-gray-100 rounded-full h-1.5">
                                                <div className={`${getStrengthColor()} ${getStrengthWidth()} h-1.5 rounded-full transition-all duration-300`}></div>
                                            </div>
                                        </div>
                                    )}

                                    <p className="text-xs text-gray-400 mt-2">Must be at least 6 characters</p>
                                </div>

                                {/* Submit */}
                                <button
                                    type="submit"
                                    className="group w-full py-4 rounded-xl font-semibold text-base text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-lg flex items-center justify-center gap-2"
                                    style={{ backgroundColor: 'var(--color-navy)' }}
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
                                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                        </>
                                    )}
                                </button>
                            </form>

                            {/* Divider */}
                            <div className="my-6 flex items-center gap-4">
                                <div className="flex-1 h-px bg-gray-200"></div>
                                <span className="text-xs text-gray-400 font-medium uppercase tracking-wider">or</span>
                                <div className="flex-1 h-px bg-gray-200"></div>
                            </div>

                            {/* Back to Home */}
                            <button
                                onClick={() => router.push("/")}
                                disabled={loading}
                                className="w-full py-3.5 rounded-xl font-semibold text-sm text-navy border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <Home className="w-4 h-4" />
                                Back to Home
                            </button>

                            {/* Login link */}
                            <p className="mt-6 text-center text-sm text-gray-500">
                                Already have an account?{" "}
                                <a
                                    href="/key-functions/auth"
                                    className="text-saffron font-semibold hover:underline transition-colors"
                                >
                                    Log In
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}