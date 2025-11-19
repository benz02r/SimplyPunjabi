"use client";

import { useRouter } from "next/navigation";
import { Home, ArrowLeft, Compass, BookOpen, Sparkles } from "lucide-react";

export default function NotFound() {
    const router = useRouter();

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50 flex items-center justify-center px-4 pt-32 pb-12">
            <div className="max-w-xl w-full">
                <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl p-6 sm:p-8 border border-blue-100 text-center">
                    {/* Animated Icon */}
                    <div className="flex items-center justify-center mb-4">
                        <div className="relative">
                            <div className="bg-gradient-to-r from-blue-500 to-orange-500 p-4 rounded-full animate-pulse">
                                <Compass className="w-12 h-12 text-white" />
                            </div>
                            <div className="absolute -top-1 -right-1">
                                <Sparkles className="w-6 h-6 text-orange-500 animate-bounce" />
                            </div>
                        </div>
                    </div>

                    {/* Main Message */}
                    <h1 className="text-5xl font-bold mb-3 bg-gradient-to-r from-blue-600 to-orange-600 bg-clip-text text-transparent">
                        404
                    </h1>

                    <h2 className="text-2xl font-bold text-gray-800 mb-4">
                        Page Not Found
                    </h2>

                    <div className="bg-gradient-to-r from-blue-50 to-orange-50 rounded-xl p-4 mb-6 border border-blue-200">
                        <div className="flex items-center justify-center mb-2">
                            <BookOpen className="w-5 h-5 text-orange-600 mr-2" />
                            <h3 className="text-lg font-semibold text-gray-800">Coming Soon!</h3>
                        </div>
                        <p className="text-gray-700">
                            This lesson or feature is currently under development. We're working hard to bring you more amazing Punjabi learning content!
                        </p>
                    </div>

                    {/* Additional Info */}
                    <p className="text-gray-600 mb-6">
                        The page you're looking for doesn't exist yet, or the URL might be incorrect.
                    </p>

                    {/* Action Buttons */}
                    <div className="space-y-3">
                        <button
                            onClick={() => router.push('/learning/essential-punjabi')}
                            className="w-full bg-gradient-to-r from-blue-500 to-orange-500 text-white py-3 rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center justify-center"
                        >
                            <Home className="w-5 h-5 mr-2" />
                            Go to Lessons
                        </button>

                        <button
                            onClick={() => router.back()}
                            className="w-full bg-white text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-colors border-2 border-gray-300 flex items-center justify-center"
                        >
                            <ArrowLeft className="w-5 h-5 mr-2" />
                            Go Back
                        </button>
                    </div>

                    {/* Fun Fact */}
                    <div className="mt-6 pt-4 border-t border-gray-200">
                        <p className="text-sm text-gray-500 italic">
                             Did you know? While you're here, you can explore our existing lessons on greetings, introductions, family, and numbers!
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}