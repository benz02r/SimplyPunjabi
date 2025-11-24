"use client";

import { Check, Heart, Users, Globe, BookOpen, Target, ArrowRight } from "lucide-react";

export default function About() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50">
            {/* Hero Section */}
            <section className="px-6 sm:px-8 lg:px-12 pt-32 sm:pt-40 lg:pt-48 pb-24 sm:pb-32">
                <div className="max-w-5xl mx-auto text-center">
                    <div className="inline-block mb-10 relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-orange-400/20 blur-3xl"></div>
                        <img
                            src="/Website Banner(shadowing)- Simply Punjabi, Ryan.png"
                            alt="Simply Punjabi"
                            className="relative w-full max-w-[480px] mx-auto object-contain drop-shadow-2xl"
                        />
                    </div>

                    <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-gray-900 mb-8 leading-[1.1] tracking-tight">
                        Learning Punjabi,{" "}
                        <span className="bg-gradient-to-r from-blue-600 to-orange-500 bg-clip-text text-transparent">
                            Made Simple
                        </span>
                    </h1>

                    <p className="text-xl sm:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-light">
                        We're building the most effective way to learn Punjabi through interactive lessons, authentic pronunciation, and real cultural context
                    </p>
                </div>
            </section>

            {/* Mission Section */}
            <section className="px-6 sm:px-8 lg:px-12 py-24 sm:py-32 bg-white">
                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        {/* Left - Mission Statement */}
                        <div>
                            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-100 to-orange-100 px-6 py-3 rounded-full mb-6 shadow-sm">
                                <Heart className="w-5 h-5 text-orange-500" />
                                <span className="text-gray-800 font-bold text-sm tracking-wide uppercase">Our Mission</span>
                            </div>
                            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6 tracking-tight">
                                Preserving Language, Connecting Generations
                            </h2>
                            <p className="text-xl text-gray-600 leading-relaxed mb-6">
                                Simply Punjabi was created to help English speakers connect with their heritage and build meaningful relationships through language.
                            </p>
                            <p className="text-lg text-gray-600 leading-relaxed">
                                Whether you're reconnecting with your roots, preparing for travel, or simply passionate about learning, we provide the tools and guidance to help you speak Punjabi with confidence.
                            </p>
                        </div>

                        {/* Right - Key Features */}
                        <div className="space-y-6">
                            <FeatureHighlight
                                icon={<BookOpen className="w-8 h-8 text-blue-600" />}
                                title="Punjabi Dictionary"
                                description="Comprehensive dictionary with English translations and audio pronunciation"
                            />
                            <FeatureHighlight
                                icon={<Globe className="w-8 h-8 text-orange-600" />}
                                title="Designed for English Speakers"
                                description="Built specifically for learners from the UK, US, Canada, and Australia"
                            />
                            <FeatureHighlight
                                icon={<Users className="w-8 h-8 text-green-600" />}
                                title="Western-Friendly Approach"
                                description="Teaching methods tailored to how English speakers naturally learn"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section className="px-6 sm:px-8 lg:px-12 py-24 sm:py-32 bg-gradient-to-b from-blue-50/50 to-white">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-20">
                        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-100 to-orange-100 px-6 py-3 rounded-full mb-6 shadow-sm">
                            <Target className="w-5 h-5 text-blue-600" />
                            <span className="text-gray-800 font-bold text-sm tracking-wide uppercase">How It Works</span>
                        </div>
                        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 tracking-tight">
                            Your Path to Fluency
                        </h2>
                        <p className="text-xl text-gray-600 font-light max-w-2xl mx-auto">
                            A structured approach designed to get you speaking from day one
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
                        <ProcessCard
                            step="1"
                            title="Start with Basics"
                            description="Learn greetings, introductions, and essential phrases through interactive lessons with native audio"
                            gradient="from-blue-500 to-blue-600"
                        />
                        <ProcessCard
                            step="2"
                            title="Build Confidence"
                            description="Practice real conversations and expand your vocabulary with structured daily lessons"
                            gradient="from-orange-500 to-orange-600"
                        />
                        <ProcessCard
                            step="3"
                            title="Achieve Fluency"
                            description="Master complex conversations and understand cultural context to speak naturally"
                            gradient="from-green-500 to-green-600"
                        />
                    </div>
                </div>
            </section>

            {/* Why Simply Punjabi - Main Section */}
            <section className="px-6 sm:px-8 lg:px-12 py-24 sm:py-32 bg-white">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 tracking-tight">
                            Why Simply Punjabi
                        </h2>
                        <p className="text-xl text-gray-600 font-light">
                            Built specifically for English speakers who want to learn Punjabi effectively
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <ReasonCard
                            icon={<Globe className="w-10 h-10" />}
                            title="For Western Learners"
                            description="Designed from the ground up for English speakers in the UK, US, Canada, and Australia"
                            gradient="from-blue-500 to-blue-600"
                        />
                        <ReasonCard
                            icon={<BookOpen className="w-10 h-10" />}
                            title="Punjabi Dictionary"
                            description="Complete dictionary with English translations and native audio pronunciation"
                            gradient="from-orange-500 to-orange-600"
                        />
                        <ReasonCard
                            icon={<Heart className="w-10 h-10" />}
                            title="Cultural Context"
                            description="Learn the heritage and meaning behind every word and phrase"
                            gradient="from-purple-500 to-purple-600"
                        />
                        <ReasonCard
                            icon={<Users className="w-10 h-10" />}
                            title="Native Audio"
                            description="Professional recordings from native speakers for authentic pronunciation"
                            gradient="from-green-500 to-green-600"
                        />
                        <ReasonCard
                            icon={<Target className="w-10 h-10" />}
                            title="Structured Path"
                            description="Clear progression from beginner to conversational fluency"
                            gradient="from-pink-500 to-pink-600"
                        />
                        <ReasonCard
                            icon={<Check className="w-10 h-10" />}
                            title="Track Progress"
                            description="Monitor your improvement with detailed analytics and milestones"
                            gradient="from-indigo-500 to-indigo-600"
                        />
                    </div>

                    {/* Special Offer Box */}
                    <div className="mt-16 bg-gradient-to-br from-blue-600 to-orange-500 rounded-3xl p-10 text-center text-white shadow-2xl">
                        <h3 className="text-3xl font-bold mb-4">Get Started Today</h3>
                        <p className="text-xl text-blue-50 mb-2">First 3 months free</p>
                        <p className="text-lg text-blue-100 mb-8">Then just £2.99/month · Cancel anytime</p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <a href="/key-functions/signup">
                                <button className="w-full sm:w-auto bg-white text-blue-600 px-12 py-5 rounded-xl text-lg font-bold shadow-xl hover:bg-gray-50 transition-all duration-300 transform hover:scale-105 inline-flex items-center gap-3">
                                    Start Learning Free
                                    <ArrowRight className="w-5 h-5" />
                                </button>
                            </a>
                            <a href="/lessons/lesson2/1">
                                <button className="w-full sm:w-auto bg-transparent border-2 border-white text-white px-12 py-5 rounded-xl text-lg font-bold hover:bg-white/10 transition-all duration-300">
                                    Explore Lessons
                                </button>
                            </a>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    );
}

function FeatureHighlight({ icon, title, description }) {
    return (
        <div className="bg-gradient-to-br from-white to-blue-50/30 rounded-2xl p-8 border border-gray-200/50 hover:shadow-xl transition-all duration-500 group">
            <div className="flex items-start gap-4">
                <div className="flex-shrink-0 transform group-hover:scale-110 transition-transform duration-500">
                    {icon}
                </div>
                <div>
                    <p className="text-xl font-bold text-gray-900 mb-2">{title}</p>
                    <p className="text-gray-600 leading-relaxed">{description}</p>
                </div>
            </div>
        </div>
    );
}

function ProcessCard({ step, title, description, gradient }) {
    return (
        <div className="relative bg-white rounded-3xl p-10 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-200/50 hover:border-gray-300">
            {/* Step Number */}
            <div className={`absolute -top-6 left-8 w-12 h-12 bg-gradient-to-br ${gradient} rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg`}>
                {step}
            </div>

            <div className="mt-4">
                <h3 className="text-2xl font-bold text-gray-900 mb-4 tracking-tight">{title}</h3>
                <p className="text-gray-600 leading-relaxed text-lg">{description}</p>
            </div>

            {/* Corner accent */}
            <div className={`absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-tl ${gradient} opacity-5 blur-2xl rounded-tl-full`}></div>
        </div>
    );
}

function ReasonCard({ icon, title, description, gradient }) {
    return (
        <div className="group relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-200/50 hover:border-gray-300 overflow-hidden">
            {/* Gradient background on hover */}
            <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>

            {/* Icon with gradient background */}
            <div className={`relative inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${gradient} rounded-xl mb-6 shadow-lg group-hover:scale-110 transition-all duration-500`}>
                <div className="text-white">
                    {icon}
                </div>
            </div>

            {/* Content */}
            <div className="relative">
                <h3 className="text-xl font-bold text-gray-900 mb-3 tracking-tight">{title}</h3>
                <p className="text-gray-600 leading-relaxed">{description}</p>
            </div>

            {/* Corner accent */}
            <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${gradient} opacity-5 blur-2xl group-hover:opacity-10 transition-opacity duration-500`}></div>
        </div>
    );
}