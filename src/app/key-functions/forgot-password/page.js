"use client";

import { useState } from "react";
import { sendPasswordResetEmail } from "@/lib/supabaseClient";
import { Mail, ArrowLeft, CheckCircle, AlertCircle, Loader2, Lock } from "lucide-react";

export default function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState(""); // 'success' or 'error'
    const [isLoading, setIsLoading] = useState(false);

    const handleResetRequest = async (e) => {
        e.preventDefault();
        setMessage("");
        setMessageType("");
        setIsLoading(true);

        const { error } = await sendPasswordResetEmail(email);

        setIsLoading(false);

        if (error) {
            setMessageType("error");
            setMessage("Error sending password reset email. Please try again.");
        } else {
            setMessageType("success");
            setMessage("Password reset email sent! Check your inbox.");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen px-6 bg-gradient-to-b from-blue-50 to-white">
            <div className="p-8 rounded-xl shadow-lg w-full max-w-md border border-gray-200 bg-white">
                {/* Header with Icon */}
                <div className="flex flex-col items-center mb-6">
                    <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                        <Lock className="w-8 h-8 text-blue-600" />
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900">Forgot Password?</h1>
                    <p className="mt-2 text-gray-600 text-center">
                        No worries! Enter your email address and we'll send you a link to reset your password.
                    </p>
                </div>

                {/* Form */}
                <form onSubmit={handleResetRequest} className="space-y-4">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                            Email Address
                        </label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email"
                                required
                                disabled={isLoading}
                                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition disabled:bg-gray-100 disabled:cursor-not-allowed"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition flex items-center justify-center gap-2 disabled:bg-blue-400 disabled:cursor-not-allowed"
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="w-5 h-5 animate-spin" />
                                Sending...
                            </>
                        ) : (
                            <>
                                <Mail className="w-5 h-5" />
                                Send Reset Link
                            </>
                        )}
                    </button>
                </form>

                {/* Message Display */}
                {message && (
                    <div
                        className={`mt-4 p-4 rounded-lg flex items-start gap-3 ${
                            messageType === "success"
                                ? "bg-green-50 border border-green-200"
                                : "bg-red-50 border border-red-200"
                        }`}
                    >
                        {messageType === "success" ? (
                            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                        ) : (
                            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                        )}
                        <p
                            className={`text-sm ${
                                messageType === "success" ? "text-green-800" : "text-red-800"
                            }`}
                        >
                            {message}
                        </p>
                    </div>
                )}

                {/* Back Button */}
                <button
                    onClick={() => window.history.back()}
                    disabled={isLoading}
                    className="mt-6 w-full bg-gray-100 text-gray-700 px-4 py-3 rounded-lg font-semibold hover:bg-gray-200 transition flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <ArrowLeft className="w-5 h-5" />
                    Back to Login
                </button>

                {/* Additional Help Text */}
                <p className="mt-6 text-center text-sm text-gray-500">
                    Remember your password?{" "}
                    <a href="/login" className="text-blue-600 hover:text-blue-700 font-medium">
                        Sign in
                    </a>
                </p>
            </div>
        </div>
    );
}