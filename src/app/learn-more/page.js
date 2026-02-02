"use client";

import { Check, Heart, Users, Globe, BookOpen, Target, ArrowRight, Star, Play, Headphones, Clock, Award, MessageCircle, Lightbulb, Shield, Zap } from "lucide-react";

export default function About() {
    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="relative px-6 pt-32 pb-24 overflow-hidden bg-gradient-to-br from-blue-50 via-orange-50/30 to-white">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-blue-100/40 to-orange-100/40 rounded-full blur-3xl -z-10"></div>

                <div className="max-w-6xl mx-auto">
                    <div className="flex justify-center mb-12">
                        <img
                            src="/Website Banner(shadowing)- Simply Punjabi, Ryan.png"
                            alt="Simply Punjabi"
                            className="w-full max-w-[300px] drop-shadow-xl"
                        />
                    </div>

                    <div className="text-center max-w-4xl mx-auto">
                        <h1 className="text-4xl sm:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                            Reconnect with
                            <span className="bg-gradient-to-r from-blue-600 to-orange-500 bg-clip-text text-transparent"> Your Roots</span>
                        </h1>
                        <p className="text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto">
                            The language platform built specifically for second and third-generation speakers who want to speak Punjabi with their families.
                        </p>
                    </div>
                </div>
            </section>

            {/* The Gap Section */}
            <section className="py-20 px-6 bg-white">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl font-bold text-gray-900 mb-8">Why Simply Punjabi?</h2>
                    <p className="text-lg text-gray-700 mb-6">
                        Most apps teach textbook vocabulary you will never use. They often mix Punjabi with Hindi or focus on travel scenarios like booking hotels.
                    </p>
                    <p className="text-lg font-medium text-blue-600">
                        We focus on the conversations that matter: talking to your grandparents, understanding family gatherings, and preserving your heritage.
                    </p>
                </div>
            </section>

            {/* Features Grid */}
            <section className="py-20 px-6 bg-gray-50">
                <div className="max-w-6xl mx-auto">
                    <div className="grid md:grid-cols-3 gap-8">
                        <FeatureCard
                            icon={<MessageCircle className="w-8 h-8" />}
                            title="Family Conversations"
                            description="Learn phrases for real life, from sharing meals to discussing traditions with elders."
                            gradient="from-blue-500 to-blue-600"
                        />
                        <FeatureCard
                            icon={<Headphones className="w-8 h-8" />}
                            title="Authentic Audio"
                            description="Google Cloud powered native pronunciation so you sound like your family, not a textbook."
                            gradient="from-orange-500 to-orange-600"
                        />
                        <FeatureCard
                            icon={<Target className="w-8 h-8" />}
                            title="Structured Learning"
                            description="An organised path from total beginner to confident speaker, tailored for diaspora learners."
                            gradient="from-green-500 to-green-600"
                        />
                    </div>
                </div>
            </section>

            {/* Founder's Note */}
            <section className="py-20 px-6 bg-white">
                <div className="max-w-3xl mx-auto bg-blue-50 rounded-3xl p-10 border border-blue-100">
                    <h3 className="text-2xl font-bold mb-4 text-gray-900">A Note from the Founder</h3>
                    <p className="text-gray-700 mb-6 leading-relaxed">
                        As a second-generation speaker in the UK, I grew up understanding Punjabi but lacked the confidence to speak it. I built this platform because the tools I needed didn’t exist. Simply Punjabi is designed to ensure our language and connection to our roots stay alive for the next generation.
                    </p>
                    <p className="font-bold text-blue-600">Ryan</p>
                </div>
            </section>

            {/* Who is it for */}
            <section className="py-20 px-6 bg-white">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl font-bold text-center mb-12">Who This Is For</h2>
                    <div className="grid md:grid-cols-2 gap-4">
                        <WhoCard icon={<Users />} text="Punjabi diaspora in the UK, US, Canada, or Australia" />
                        <WhoCard icon={<Heart />} text="Those wanting better bonds with parents and grandparents" />
                        <WhoCard icon={<Globe />} text="Learners who understand the basics but struggle to speak" />
                        <WhoCard icon={<Shield />} text="Anyone committed to preserving their cultural identity" />
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="py-24 px-6 bg-gradient-to-br from-blue-600 to-orange-600 text-white text-center">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-4xl font-bold mb-6">Start Your Journey Today</h2>
                    <p className="text-xl text-blue-100 mb-10">
                        Join our Beta for free and start connecting with your family through language.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <a href="/key-functions/signup">
                            <button className="bg-white text-blue-600 px-10 py-4 rounded-xl text-lg font-bold hover:scale-105 transition-all">
                                Get Started Free
                            </button>
                        </a>
                        <a href="/lessons/lesson2/1">
                            <button className="border-2 border-white text-white px-10 py-4 rounded-xl text-lg font-bold hover:bg-white/10 transition-all">
                                Try a Lesson
                            </button>
                        </a>
                    </div>
                    <p className="mt-8 text-sm text-blue-200">
                        Beta free • Then £4.99/month • Cancel anytime
                    </p>
                </div>
            </section>
        </div>
    );
}

function FeatureCard({ icon, title, description, gradient }) {
    return (
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <div className={`inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br ${gradient} rounded-xl mb-6 text-white`}>
                {icon}
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
            <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
        </div>
    );
}

function WhoCard({ icon, text }) {
    return (
        <div className="flex items-center gap-4 p-4 border border-gray-100 rounded-xl bg-gray-50/50">
            <div className="text-blue-600">{icon}</div>
            <p className="text-gray-700 font-medium text-sm">{text}</p>
        </div>
    );
}