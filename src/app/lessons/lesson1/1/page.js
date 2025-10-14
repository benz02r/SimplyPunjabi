"use client";

import { useRouter } from "next/navigation";
import { FaArrowLeft, FaBook, FaLanguage, FaHeart, FaCheckCircle, FaArrowRight } from "react-icons/fa";

export default function Lesson1GurmukhiInfo() {
    const router = useRouter();

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50 px-4 sm:px-6 lg:px-8 pt-24 pb-16">
            <div className="max-w-5xl mx-auto">
                {/* Back Button */}
                <button
                    onClick={() => router.push("/learning/essential-punjabi")}
                    className="mb-6 flex items-center gap-2 text-gray-600 hover:text-blue-600 font-semibold transition-colors group"
                >
                    <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
                    <span>Back to Lessons</span>
                </button>

                {/* Lesson Header */}
                <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-3xl p-8 sm:p-12 text-white shadow-xl mb-8 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full blur-3xl"></div>

                    <div className="relative z-10 text-center">
                        <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-4">
                            <FaBook className="text-blue-200" />
                            <span className="text-sm font-semibold">LESSON 1: CULTURAL FOUNDATION</span>
                        </div>
                        <h1 className="text-4xl sm:text-5xl font-bold mb-4">
                            History of Gurmukhi & Comparison with Hindi
                        </h1>
                        <p className="text-xl text-blue-100 max-w-3xl mx-auto">
                            Discover the roots of Gurmukhi, its importance in Punjabi culture, and how it differs from Hindi
                        </p>
                    </div>
                </div>

                {/* Main Content */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                    {/* Main Content Column */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Origins Section */}
                        <div className="bg-white rounded-2xl shadow-lg p-8 border-2 border-gray-100">
                            <div className="flex items-start gap-4 mb-4">
                                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                                    <FaBook className="text-white text-xl" />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-900 mb-2">📜 Origins of Gurmukhi</h2>
                                    <p className="text-gray-700 leading-relaxed">
                                        Gurmukhi was standardized in the 16th century by <strong>Guru Angad Dev Ji</strong> to record the teachings of Guru Nanak Dev Ji. Derived from ancient scripts like Laṇḍā, it was adapted to suit Punjabi pronunciation and became the backbone of literacy in Punjab and Sikhism.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Comparison Section */}
                        <div className="bg-white rounded-2xl shadow-lg p-8 border-2 border-gray-100">
                            <div className="flex items-start gap-4 mb-6">
                                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center flex-shrink-0">
                                    <FaLanguage className="text-white text-xl" />
                                </div>
                                <h2 className="text-2xl font-bold text-gray-900">⚖️ Gurmukhi vs. Devanagari (Hindi Script)</h2>
                            </div>

                            <div className="space-y-4">
                                <ComparisonCard
                                    title="Structural Design"
                                    description="Gurmukhi uses unique, rounded characters with a consistent top line, creating a distinctive visual identity."
                                />
                                <ComparisonCard
                                    title="Phonetic Accuracy"
                                    description="Specifically designed for Punjabi sounds, while Devanagari supports Hindi, Sanskrit, and Marathi."
                                />
                                <ComparisonCard
                                    title="Cultural Identity"
                                    description="Gurmukhi is deeply tied to Sikhism and Punjabi heritage; Devanagari has roots in Hinduism and North Indian languages."
                                />
                            </div>
                        </div>

                        {/* Why It Matters Section */}
                        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl shadow-lg p-8 border-2 border-green-200">
                            <div className="flex items-start gap-4 mb-4">
                                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center flex-shrink-0">
                                    <FaHeart className="text-white text-xl" />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-900 mb-3">💡 Why It Matters</h2>
                                    <p className="text-gray-700 leading-relaxed mb-4">
                                        Learning Gurmukhi helps you access Sikh scriptures, understand cultural expression, and connect with Punjabi on a deeper level. It carries not only language but also identity and history.
                                    </p>
                                    <div className="bg-white rounded-xl p-4">
                                        <p className="text-sm font-semibold text-green-800 mb-2">Key Benefits:</p>
                                        <ul className="space-y-2 text-sm text-gray-700">
                                            <li className="flex items-center gap-2">
                                                <FaCheckCircle className="text-green-500 flex-shrink-0" />
                                                <span>Access to Sikh scriptures and religious texts</span>
                                            </li>
                                            <li className="flex items-center gap-2">
                                                <FaCheckCircle className="text-green-500 flex-shrink-0" />
                                                <span>Deeper cultural understanding and connection</span>
                                            </li>
                                            <li className="flex items-center gap-2">
                                                <FaCheckCircle className="text-green-500 flex-shrink-0" />
                                                <span>Authentic communication with Punjabi speakers</span>
                                            </li>
                                            <li className="flex items-center gap-2">
                                                <FaCheckCircle className="text-green-500 flex-shrink-0" />
                                                <span>Preservation of heritage and identity</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-1 space-y-6">
                        {/* Quick Facts */}
                        <div className="bg-white rounded-2xl shadow-lg p-6 border-2 border-gray-100 sticky top-24">
                            <h3 className="text-lg font-bold text-gray-900 mb-4">📊 Quick Facts</h3>
                            <div className="space-y-4">
                                <QuickFact label="Created By" value="Guru Angad Dev Ji" />
                                <QuickFact label="Year" value="16th Century" />
                                <QuickFact label="Characters" value="35 Letters" />
                                <QuickFact label="Reading" value="Left to Right" />
                                <QuickFact label="Used In" value="Punjab, Sikhism" />
                            </div>
                        </div>

                        {/* Fun Fact */}
                        <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-lg p-6 text-white">
                            <h3 className="text-lg font-bold mb-3">💡 Did You Know?</h3>
                            <p className="text-sm text-blue-50">
                                "Gurmukhi" literally means "from the mouth of the Guru" - reflecting its divine origin in recording the teachings of the Sikh Gurus!
                            </p>
                        </div>
                    </div>
                </div>

                {/* Navigation Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-white rounded-2xl shadow-lg p-6 border-2 border-gray-100">
                    <button
                        onClick={() => router.push("/learning/essential-punjabi")}
                        className="w-full sm:w-auto flex items-center justify-center gap-2 bg-gray-100 text-gray-700 px-8 py-4 rounded-xl font-bold hover:bg-gray-200 transition-all duration-300"
                    >
                        <FaArrowLeft />
                        <span>Back to Course</span>
                    </button>
                    <button
                        onClick={() => router.push("/lessons/lesson1/2")}
                        className="w-full sm:w-auto flex items-center justify-center gap-2 bg-gradient-to-r from-green-500 to-green-600 text-white px-8 py-4 rounded-xl font-bold hover:from-green-600 hover:to-green-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
                    >
                        <span>Continue to "Fill the Missing Gap"</span>
                        <FaArrowRight />
                    </button>
                </div>
            </div>
        </div>
    );
}

function ComparisonCard({ title, description }) {
    return (
        <div className="bg-gradient-to-r from-blue-50 to-orange-50 rounded-xl p-4 border-l-4 border-blue-500">
            <h3 className="font-bold text-gray-900 mb-1">{title}</h3>
            <p className="text-sm text-gray-700">{description}</p>
        </div>
    );
}

function QuickFact({ label, value }) {
    return (
        <div className="flex justify-between items-center py-2 border-b border-gray-200 last:border-0">
            <span className="text-sm text-gray-600 font-medium">{label}</span>
            <span className="text-sm text-gray-900 font-bold">{value}</span>
        </div>
    );
}