"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle, Mail, Clock, ArrowRight, AlertCircle, RefreshCw } from "lucide-react";

export default function SignupSuccess() {
    const router = useRouter();
    const [countdown, setCountdown] = useState(5);

    // Countdown timer
    useEffect(() => {
        if (countdown > 0) {
            const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
            return () => clearTimeout(timer);
        } else {
            router.push("/key-functions/auth");
        }
    }, [countdown, router]);

    const handleGoToLogin = () => {
        router.push("/key-functions/auth");
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 px-6 py-24">
            <div className="w-full max-w-lg">
                <div className="bg-white p-10 rounded-2xl shadow-2xl border border-gray-200">

                    {/* Success Icon */}
                    <div className="flex justify-center mb-6">
                        <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center animate-bounce">
                            <CheckCircle className="w-14 h-14 text-green-600" />
                        </div>
                    </div>

                    {/* Title */}
                    <h1 className="text-4xl font-bold text-gray-900 text-center mb-4">
                        Account Created!
                    </h1>

                    {/* Success Message */}
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                        <p className="text-green-800 text-center font-medium">
                            Welcome to Simply Punjabi! Your account has been successfully created.
                        </p>
                    </div>

                    {/* Email Verification Notice */}
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-5 mb-6">
                        <div className="flex items-start gap-3">
                            <Mail className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                            <div>
                                <h3 className="font-semibold text-blue-900 mb-2">
                                    Verify Your Email
                                </h3>
                                <p className="text-blue-800 text-sm leading-relaxed">
                                    We've sent a verification link to your email address.
                                    Please check your inbox or spam and click the link to verify your account.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Tips Section */}
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6">
                        <div className="flex items-start gap-2 mb-3">
                            <AlertCircle className="w-5 h-5 text-gray-600 flex-shrink-0 mt-0.5" />
                            <p className="text-sm text-gray-700 font-medium">
                                Not seeing the email?
                            </p>
                        </div>
                        <ul className="text-sm text-gray-600 space-y-2 ml-7">
                            <li className="flex items-center gap-2">
                                <span className="text-gray-400">•</span>
                                Check your spam or junk folder
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="text-gray-400">•</span>
                                Make sure you entered the correct email
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="text-gray-400">•</span>
                                Wait a few minutes and refresh your inbox and check your spam or junk
                            </li>
                        </ul>
                    </div>

                    {/* Countdown Timer */}
                    <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-4 mb-6">
                        <div className="flex items-center justify-center gap-3">
                            <Clock className="w-5 h-5 text-blue-600" />
                            <p className="text-sm text-gray-700">
                                Redirecting to login in <span className="font-bold text-blue-600 text-lg">{countdown}</span> seconds...
                            </p>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="space-y-3">
                        <button
                            onClick={handleGoToLogin}
                            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-4 rounded-xl font-bold text-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-[1.02] flex items-center justify-center gap-2"
                        >
                            <span>Go to Login</span>
                            <ArrowRight className="w-5 h-5" />
                        </button>

                        <button
                            onClick={() => router.push("/")}
                            className="w-full bg-gray-100 text-gray-700 px-6 py-3 rounded-xl font-semibold hover:bg-gray-200 transition-all duration-300 border-2 border-gray-200"
                        >
                            Back to Home
                        </button>
                    </div>

                    {/* Need Help */}
                    <div className="mt-6 text-center">
                        <p className="text-sm text-gray-500">
                            Need help?{" "}
                            <a
                                href="/contact"
                                className="text-blue-600 hover:text-blue-700 font-semibold hover:underline"
                            >
                                Contact Support
                            </a>
                        </p>
                    </div>
                </div>

                {/* Additional Info */}
                <div className="mt-6 text-center">
                    <p className="text-sm text-gray-500 flex items-center justify-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        Your account is secure and ready to go!
                    </p>
                </div>
            </div>
        </div>
    );
}