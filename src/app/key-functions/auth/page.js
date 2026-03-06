"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { Mail, Lock, ArrowRight, UserCircle, Loader2, AlertCircle, Home, Eye, EyeOff } from "lucide-react";

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

        router.push("/dashboard");
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
                .text-navy { color: var(--color-navy); }
            `}</style>

            <div className="min-h-screen flex items-center justify-center px-4 py-28 relative overflow-hidden" style={{ backgroundColor: 'var(--color-cream)' }}>
                {/* Decorative background */}
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
                                <UserCircle className="w-8 h-8 text-white" />
                            </div>
                            <h2 className="text-2xl font-display text-white mb-1.5">Welcome Back</h2>
                            <p className="text-gray-400 text-sm">Log in to continue learning</p>
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

                            <form onSubmit={handleLogin} className="space-y-5">
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
                                            placeholder="Enter your password"
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
                                    <div className="mt-2 text-right">
                                        <a
                                            href="/key-functions/forgot-password"
                                            className="text-sm text-saffron font-semibold hover:underline transition-colors"
                                        >
                                            Forgot Password?
                                        </a>
                                    </div>
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
                                            <span>Logging in...</span>
                                        </>
                                    ) : (
                                        <>
                                            <span>Log In</span>
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

                            {/* Signup link */}
                            <p className="mt-6 text-center text-sm text-gray-500">
                                Don&apos;t have an account?{" "}
                                <a
                                    href="/key-functions/signup"
                                    className="text-saffron font-semibold hover:underline transition-colors"
                                >
                                    Sign Up
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}