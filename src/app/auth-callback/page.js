"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { CheckCircle, AlertCircle, Loader2, ShieldCheck, LogIn } from "lucide-react";

export default function AuthCallback() {
    const router = useRouter();
    const [error, setError] = useState(null);
    const [isAuthenticating, setIsAuthenticating] = useState(true);
    const [authSuccess, setAuthSuccess] = useState(false);

    useEffect(() => {
        async function handleAuth() {
            try {
                setIsAuthenticating(true);

                // Get the code and type from URL params
                const urlParams = new URLSearchParams(window.location.search);
                const code = urlParams.get('code');
                const type = urlParams.get('type');
                const errorParam = urlParams.get('error');
                const errorDescription = urlParams.get('error_description');

                // Check if there's an error in the URL
                if (errorParam) {
                    setError(errorDescription || "Authentication failed. Please try again.");
                    setIsAuthenticating(false);
                    return;
                }

                // If no code, check for hash-based authentication (older flow)
                if (!code) {
                    const hashParams = new URLSearchParams(window.location.hash.substring(1));
                    const accessToken = hashParams.get('access_token');
                    const hashType = hashParams.get('type');

                    if (!accessToken) {
                        setError("No authentication code found. Please try logging in again.");
                        setIsAuthenticating(false);
                        return;
                    }

                    // Check if this is a password recovery from hash
                    if (hashType === 'recovery') {
                        setAuthSuccess(true);
                        setIsAuthenticating(false);
                        setTimeout(() => {
                            router.push("/reset-password");
                        }, 1000);
                        return;
                    }
                }

                // Exchange the code for a session
                const { data, error: authError } = await supabase.auth.exchangeCodeForSession(window.location.href);

                if (authError) {
                    console.error("Auth error:", authError);
                    setError(authError.message || "Authentication failed. Please try again.");
                    setIsAuthenticating(false);
                    return;
                }

                // Verify we have a valid session
                const { data: sessionData, error: sessionError } = await supabase.auth.getSession();

                if (sessionError || !sessionData?.session) {
                    setError("Failed to establish session. Please try logging in again.");
                    setIsAuthenticating(false);
                    return;
                }

                // Success! Show success state briefly before redirecting
                setAuthSuccess(true);
                setIsAuthenticating(false);

                // Check if this is a password recovery flow
                if (type === 'recovery' || sessionData?.session?.user?.recovery_sent_at) {
                    console.log("Password recovery detected, redirecting to reset password page");
                    setTimeout(() => {
                        router.push("/reset-password");
                    }, 1000);
                } else {
                    // Regular login - redirect to dashboard
                    setTimeout(() => {
                        router.push("/key-functions/dashboard");
                    }, 1500);
                }

            } catch (err) {
                console.error("Unexpected error during authentication:", err);
                setError("An unexpected error occurred. Please try again.");
                setIsAuthenticating(false);
            }
        }

        handleAuth();
    }, [router]);

    const handleRetry = () => {
        router.push("/key-functions/auth");
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 px-6">
            <div className="w-full max-w-md">
                <div className="bg-white p-8 rounded-2xl shadow-2xl border border-gray-200">

                    {/* Authenticating State */}
                    {isAuthenticating && !error && !authSuccess && (
                        <div className="text-center">
                            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                <ShieldCheck className="w-10 h-10 text-blue-600" />
                            </div>
                            <h1 className="text-3xl font-bold text-gray-900 mb-3">
                                Authenticating...
                            </h1>
                            <p className="text-lg text-gray-600 mb-8">
                                Please wait while we verify your credentials
                            </p>

                            {/* Animated Loader */}
                            <div className="flex justify-center">
                                <Loader2 className="w-12 h-12 text-blue-600 animate-spin" />
                            </div>

                            <p className="mt-6 text-sm text-gray-500">
                                This should only take a moment...
                            </p>
                        </div>
                    )}

                    {/* Success State */}
                    {authSuccess && !error && (
                        <div className="text-center">
                            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
                                <CheckCircle className="w-10 h-10 text-green-600" />
                            </div>
                            <h1 className="text-3xl font-bold text-gray-900 mb-3">
                                Success!
                            </h1>
                            <p className="text-lg text-gray-600 mb-4">
                                You've been successfully authenticated
                            </p>

                            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                                <p className="text-sm text-green-800 flex items-center justify-center gap-2">
                                    <LogIn className="w-4 h-4" />
                                    Redirecting...
                                </p>
                            </div>
                        </div>
                    )}

                    {/* Error State */}
                    {error && (
                        <div className="text-center">
                            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                <AlertCircle className="w-10 h-10 text-red-600" />
                            </div>
                            <h1 className="text-3xl font-bold text-red-600 mb-3">
                                Authentication Failed
                            </h1>
                            <p className="text-lg text-gray-700 mb-6">
                                {error}
                            </p>

                            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                                <p className="text-sm text-red-800">
                                    Don't worry! You can try logging in again.
                                </p>
                            </div>

                            {/* Action Buttons */}
                            <div className="space-y-3">
                                <button
                                    onClick={handleRetry}
                                    className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-all duration-300 flex items-center justify-center gap-2"
                                >
                                    <LogIn className="w-5 h-5" />
                                    Try Again
                                </button>

                                <button
                                    onClick={() => router.push("/")}
                                    className="w-full bg-gray-100 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-all duration-300"
                                >
                                    Back to Home
                                </button>
                            </div>

                            {/* Help Text */}
                            <p className="mt-6 text-sm text-gray-500">
                                Need help?{" "}
                                <a
                                    href="/key-functions/forgot-password"
                                    className="text-blue-600 hover:text-blue-700 font-medium hover:underline"
                                >
                                    Reset your password
                                </a>
                            </p>
                        </div>
                    )}
                </div>

                {/* Additional Info */}
                {!error && (
                    <p className="mt-6 text-center text-sm text-gray-500">
                         Your connection is secure and encrypted
                    </p>
                )}
            </div>
        </div>
    );
}