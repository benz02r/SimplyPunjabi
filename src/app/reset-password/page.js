"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { updatePassword } from "@/lib/supabaseClient";
import { Lock, Eye, EyeOff, CheckCircle, AlertCircle, Loader2, ShieldCheck } from "lucide-react";

export default function ResetPassword() {
    const router = useRouter();
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState(""); // 'success' or 'error'
    const [isLoading, setIsLoading] = useState(false);
    const [passwordStrength, setPasswordStrength] = useState("");

    // Check password strength
    useEffect(() => {
        if (!newPassword) {
            setPasswordStrength("");
            return;
        }

        const strength = calculatePasswordStrength(newPassword);
        setPasswordStrength(strength);
    }, [newPassword]);

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

    const handleResetPassword = async (e) => {
        e.preventDefault();
        setMessage("");
        setMessageType("");

        // Validation
        if (newPassword.length < 6) {
            setMessageType("error");
            setMessage("Password must be at least 6 characters long.");
            return;
        }

        if (newPassword !== confirmPassword) {
            setMessageType("error");
            setMessage("Passwords do not match. Please try again.");
            return;
        }

        setIsLoading(true);

        const { error } = await updatePassword(newPassword);

        setIsLoading(false);

        if (error) {
            setMessageType("error");
            setMessage("Error resetting password. Please try again or request a new reset link.");
        } else {
            setMessageType("success");
            setMessage("Password reset successfully! Redirecting to login...");
            setTimeout(() => router.push("/key-functions/auth"), 2000);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen px-6 py-24 md:py-32 bg-gradient-to-b from-blue-50 to-white">
            <div className="p-8 rounded-xl shadow-lg w-full max-w-lg border border-gray-200 bg-white">
                {/* Header with Icon */}
                <div className="flex flex-col items-center mb-6">
                    <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
                        <ShieldCheck className="w-8 h-8 text-green-600" />
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900">Reset Password</h1>
                    <p className="mt-2 text-gray-600 text-center">
                        Create a new secure password for your account.
                    </p>
                </div>

                {/* Form */}
                <form onSubmit={handleResetPassword} className="space-y-4">
                    {/* New Password Field */}
                    <div>
                        <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-2">
                            New Password
                        </label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                id="newPassword"
                                type={showPassword ? "text" : "password"}
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                placeholder="Enter new password"
                                required
                                disabled={isLoading}
                                className="w-full pl-10 pr-12 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent transition disabled:bg-gray-100 disabled:cursor-not-allowed"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                disabled={isLoading}
                            >
                                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                            </button>
                        </div>

                        {/* Password Strength Indicator */}
                        {newPassword && (
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
                    </div>

                    {/* Confirm Password Field */}
                    <div>
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                            Confirm Password
                        </label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                id="confirmPassword"
                                type={showConfirmPassword ? "text" : "password"}
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder="Confirm new password"
                                required
                                disabled={isLoading}
                                className="w-full pl-10 pr-12 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent transition disabled:bg-gray-100 disabled:cursor-not-allowed"
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                disabled={isLoading}
                            >
                                {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                            </button>
                        </div>

                        {/* Password Match Indicator */}
                        {confirmPassword && (
                            <div className="mt-2 flex items-center gap-2">
                                {newPassword === confirmPassword ? (
                                    <>
                                        <CheckCircle className="w-4 h-4 text-green-600" />
                                        <span className="text-xs text-green-600">Passwords match</span>
                                    </>
                                ) : (
                                    <>
                                        <AlertCircle className="w-4 h-4 text-red-600" />
                                        <span className="text-xs text-red-600">Passwords do not match</span>
                                    </>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Password Requirements */}
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                        <p className="text-xs font-medium text-blue-900 mb-2">Password requirements:</p>
                        <ul className="text-xs text-blue-800 space-y-1">
                            <li className="flex items-center gap-2">
                                <span className={newPassword.length >= 6 ? "text-green-600" : "text-gray-400"}>•</span>
                                At least 6 characters
                            </li>
                            <li className="flex items-center gap-2">
                                <span className={/[A-Z]/.test(newPassword) && /[a-z]/.test(newPassword) ? "text-green-600" : "text-gray-400"}>•</span>
                                Mix of uppercase and lowercase letters
                            </li>
                            <li className="flex items-center gap-2">
                                <span className={/\d/.test(newPassword) ? "text-green-600" : "text-gray-400"}>•</span>
                                At least one number
                            </li>
                            <li className="flex items-center gap-2">
                                <span className={/[!@#$%^&*(),.?":{}|<>]/.test(newPassword) ? "text-green-600" : "text-gray-400"}>•</span>
                                Special character recommended
                            </li>
                        </ul>
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading || !newPassword || !confirmPassword || newPassword !== confirmPassword}
                        className="w-full bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition flex items-center justify-center gap-2 disabled:bg-gray-400 disabled:cursor-not-allowed"
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="w-5 h-5 animate-spin" />
                                Updating Password...
                            </>
                        ) : (
                            <>
                                <ShieldCheck className="w-5 h-5" />
                                Update Password
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

                {/* Additional Help Text */}
                <p className="mt-6 text-center text-sm text-gray-500">
                    Remember your password?{" "}
                    <a href="/key-functions/auth" className="text-blue-600 hover:text-blue-700 font-medium">
                        Back to login
                    </a>
                </p>
            </div>
        </div>
    );
}