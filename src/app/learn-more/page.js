"use client";

import { Check, Heart, Users, Globe, BookOpen, Target, ArrowRight, Star, Play, Headphones, Clock, Award, MessageCircle, Lightbulb, Shield, Zap } from "lucide-react";

export default function About() {
    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section - Mission-Driven */}
            <section className="relative px-6 pt-32 pb-24 sm:pt-40 sm:pb-32 overflow-hidden bg-gradient-to-br from-blue-50 via-orange-50/30 to-white">
                {/* Subtle background decoration */}
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-blue-100/40 to-orange-100/40 rounded-full blur-3xl -z-10"></div>
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-orange-100/30 to-blue-100/30 rounded-full blur-3xl -z-10"></div>

                <div className="max-w-6xl mx-auto">
                    {/* Logo */}
                    <div className="flex justify-center mb-12">
                        <img
                            src="/Website Banner(shadowing)- Simply Punjabi, Ryan.png"
                            alt="Simply Punjabi"
                            className="w-full max-w-[320px] drop-shadow-xl"
                        />
                    </div>

                    {/* Mission Statement */}
                    <div className="text-center max-w-4xl mx-auto">
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                            Helping Learners
                            <br />
                            <span className="bg-gradient-to-r from-blue-600 via-blue-500 to-orange-500 bg-clip-text text-transparent">
                                Reconnect with Their Roots
                            </span>
                        </h1>
                        <p className="text-lg sm:text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
                            Simply Punjabi is the first language platform built specifically for second and third-generation English speakers who want to speak Punjabi with their families and preserve their cultural heritage.
                        </p>
                    </div>
                </div>
            </section>

            {/* The Problem Section - Story-Driven */}
            <section className="py-24 px-6 bg-white">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-16">
                        <p className="text-blue-600 font-bold uppercase tracking-wider text-sm mb-4">The Problem</p>
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                            Existing Apps Don't Understand Diaspora Learners
                        </h2>
                    </div>

                    <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-6">
                        <p className="text-xl text-gray-600">
                            If you've ever tried to learn Punjabi as a second or third-generation speaker, you know the frustration. You download Duolingo, Babbel, or Rosetta Stone, hoping to finally have conversations with your grandparents... but something's off.
                        </p>

                        <p>
                            They either dont have an option for Punjabi at all but if they do, they teach textbook vocabulary you'll never use or mix up Punjabi with Hindi. They ignore the cultural context that makes conversations with family meaningful.
                        </p>

                        <p>
                            <strong>But here's the thing:</strong> You don't need to know how to book a hotel room in Chandigarh. You need to ask your grandmother about her childhood. You need to understand what your parents are saying at family gatherings. You need phrases that work in real family conversations, not generic travel scenarios.
                        </p>

                        <p>
                            That's the gap Simply Punjabi fills. We're not another generic language app with Punjabi added as an afterthought. We're built from the ground up for English speakers in the UK, US, Canada, and Australia who want to connect with their Punjabi heritage.
                        </p>
                    </div>
                </div>
            </section>

            {/* Our Approach Section */}
            <section className="py-24 px-6 bg-gradient-to-b from-gray-50 to-white">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-20">
                        <p className="text-orange-600 font-bold uppercase tracking-wider text-sm mb-4">Our Approach</p>
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                            Built for Punjabi Diaspora Learners
                        </h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Every lesson, feature, and design decision is made with one question in mind: Does this help diaspora learners connect with their families?
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                        <ApproachCard
                            icon={<MessageCircle className="w-8 h-8 text-blue-600" />}
                            title="Real Family Conversations"
                            description="Learn phrases you'll actually use: talking to grandparents, discussing family gatherings, sharing meals, and preserving traditions not just ordering train tickets."
                        />
                        <ApproachCard
                            icon={<Heart className="w-8 h-8 text-orange-600" />}
                            title="Cultural Context Built-In"
                            description="Every lesson includes cultural insights so you understand not just what to say, but why the traditions, values, and meaning behind the language."
                        />
                        <ApproachCard
                            icon={<Headphones className="w-8 h-8 text-green-600" />}
                            title="Authentic Pronunciation"
                            description="Native speaker audio on every word powered by Google Cloud , so you learn how your family actually speaks not textbook Punjabi."
                        />
                        <ApproachCard
                            icon={<Clock className="w-8 h-8 text-purple-600" />}
                            title="Designed for Busy Lives"
                            description="Bite sized lessons that fit your schedule. Learn during your commute, lunch break, or before bed—progress at your own pace."
                        />
                    </div>
                </div>
            </section>

            {/* Founder Story Section */}
            <section className="py-24 px-6 bg-white">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-16">
                        <p className="text-blue-600 font-bold uppercase tracking-wider text-sm mb-4">Our Story</p>
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                            Why I Built Simply Punjabi
                        </h2>
                    </div>

                    <div className="bg-gradient-to-br from-blue-50 to-orange-50/50 rounded-3xl p-8 sm:p-12 border border-gray-200">
                        <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-6">
                            <p className="text-lg">
                                I'm a second generation Punjabi speaker living in the UK. Like many diaspora kids, I grew up understanding bits and pieces of Punjabi but never felt confident enough to have real conversations with my grandparents.
                            </p>

                            <p>
                                I tried every language app and solution even YouTube tutorials. They all taught me the same useless vocabulary: how to order food at restaurants I'd never visit, how to ask for directions in cities I'd never go to. Nothing about the conversations I actually wanted to have.
                            </p>

                            <p>
                                <strong>The breaking point came during a conversation.</strong> My grandmother was asking me how school was and what I had been doing, and there I was unable to put together a proper sentence, using a mix of broken Punjabi with English.: If we don't learn Punjabi now, this connection dies with our generation.
                            </p>

                            <p>
                                That's when I decided to build something different. A platform specifically for people like us English speakers who want to truly learn and undertsand the language. We need to preserve the language that connects us to our heritage.
                            </p>

                            <p className="text-lg font-semibold text-gray-900">
                                Simply Punjabi is that platform. It's the tool I wish existed when I started learning.
                            </p>

                            <p className="text-base text-gray-600 italic border-l-4 border-blue-500 pl-4">
                                - Ryan
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* What You Get Section */}
            <section className="py-24 px-6 bg-gradient-to-b from-gray-50 to-white">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-20">
                        <p className="text-orange-600 font-bold uppercase tracking-wider text-sm mb-4">Platform Features</p>
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                            Everything You Need to Succeed
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <FeatureCard
                            icon={<BookOpen className="w-10 h-10" />}
                            title="Complete Dictionary"
                            description="Comprehensive Punjabi-English dictionary with Gurmukhi script, romanisation, and English translations for quick reference"
                            gradient="from-blue-500 to-blue-600"
                        />
                        <FeatureCard
                            icon={<Headphones className="w-10 h-10" />}
                            title="Native Audio"
                            description="Google Cloud technology provides authentic pronunciation on every single word and phrase"
                            gradient="from-orange-500 to-orange-600"
                        />
                        <FeatureCard
                            icon={<Target className="w-10 h-10" />}
                            title="Structured Curriculum"
                            description="Clear learning path from complete beginner to confident conversational speaker, organized by difficulty"
                            gradient="from-green-500 to-green-600"
                        />
                        <FeatureCard
                            icon={<MessageCircle className="w-10 h-10" />}
                            title="Interactive Lessons"
                            description="Engaging exercises with matching games, scenario builders, and real world family conversation practice"
                            gradient="from-purple-500 to-purple-600"
                        />
                        <FeatureCard
                            icon={<Heart className="w-10 h-10" />}
                            title="Cultural Insights"
                            description="Every lesson includes cultural context, traditions, and the meaning behind phrases—not just translation"
                            gradient="from-pink-500 to-pink-600"
                        />
                        <FeatureCard
                            icon={<Award className="w-10 h-10" />}
                            title="Track Progress"
                            description="Monitor your improvement, celebrate milestones, and see your journey from beginner to conversational fluency"
                            gradient="from-indigo-500 to-indigo-600"
                        />
                    </div>
                </div>
            </section>

            {/* Who It's For Section */}
            <section className="py-24 px-6 bg-white">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <p className="text-blue-600 font-bold uppercase tracking-wider text-sm mb-4">Who This Is For</p>
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                            You're in the Right Place If...
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                        <WhoCard
                            icon={<Users className="w-6 h-6 text-blue-600" />}
                            text="You're a Punjabi living in the UK, US, Canada, or Australia"
                        />
                        <WhoCard
                            icon={<Heart className="w-6 h-6 text-orange-600" />}
                            text="You want to have real conversations with grandparents, parents, and extended family"
                        />
                        <WhoCard
                            icon={<Globe className="w-6 h-6 text-green-600" />}
                            text="You understand some Punjabi but lack confidence to speak it fluently"
                        />
                        <WhoCard
                            icon={<Shield className="w-6 h-6 text-purple-600" />}
                            text="You're committed to preserving your cultural heritage for future generations"
                        />
                        <WhoCard
                            icon={<Lightbulb className="w-6 h-6 text-pink-600" />}
                            text="You're frustrated with generic language apps that teach useless vocabulary"
                        />
                        <WhoCard
                            icon={<Zap className="w-6 h-6 text-indigo-600" />}
                            text="You want a platform built specifically for your learning needs as a diaspora speaker"
                        />
                    </div>
                </div>
            </section>

            {/* Our Values Section */}
            <section className="py-24 px-6 bg-gradient-to-b from-gray-50 to-white">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <p className="text-orange-600 font-bold uppercase tracking-wider text-sm mb-4">Our Principles</p>
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                            What Drives Us
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        <ValueCard
                            title="Authenticity Over Scale"
                            description="We'd rather serve 1,000 diaspora learners exceptionally well than 1 million people poorly. Every feature is built for our specific audience."
                        />
                        <ValueCard
                            title="Cultural Connection First"
                            description="Language isn't just vocabulary it's identity, heritage, and family bonds. We never lose sight of why you're learning: to connect with the people you love."
                        />
                        <ValueCard
                            title="Honest, Not Hype"
                            description="We won't promise you'll be fluent in 30 days. Learning a language takes time and effort. But we will make that journey effective, engaging, and worth it."
                        />
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="py-32 px-6 bg-gradient-to-br from-blue-600 via-blue-700 to-orange-600 text-white relative overflow-hidden">
                <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl"></div>

                <div className="max-w-4xl mx-auto text-center relative z-10">
                    <div className="inline-flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full mb-8">
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                        <span className="text-sm font-semibold">Beta Access Open</span>
                    </div>

                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                        Start Your Journey Today
                    </h2>
                    <p className="text-lg sm:text-xl text-blue-100 mb-10 leading-relaxed max-w-2xl mx-auto">
                        Join Simply Punjabi and start having the conversations with your family that you've always wanted. Beta access is free no credit card required.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
                        <a href="/key-functions/signup">
                            <button className="bg-white text-blue-600 px-12 py-5 rounded-2xl text-lg font-bold shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 flex items-center gap-3">
                                <Play className="w-5 h-5" />
                                Get Started Free
                            </button>
                        </a>
                        <a href="/lessons/lesson2/1">
                            <button className="bg-transparent border-2 border-white text-white px-12 py-5 rounded-2xl text-lg font-bold hover:bg-white/10 transition-all duration-300">
                                Try a Lesson
                            </button>
                        </a>
                    </div>

                    <p className="text-sm text-blue-200">
                        Beta free • Then £4.99/month • Cancel anytime
                    </p>
                </div>
            </section>
        </div>
    );
}

function ApproachCard({ icon, title, description }) {
    return (
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-gray-200 mb-5">
                {icon}
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
            <p className="text-gray-600 leading-relaxed">{description}</p>
        </div>
    );
}

function FeatureCard({ icon, title, description, gradient }) {
    return (
        <div className="group bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${gradient} rounded-xl mb-5 text-white transform group-hover:scale-110 transition-transform duration-300`}>
                {icon}
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
            <p className="text-gray-600 leading-relaxed text-sm">{description}</p>
        </div>
    );
}

function WhoCard({ icon, text }) {
    return (
        <div className="flex items-start gap-4 bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300">
            <div className="flex-shrink-0 mt-1">
                {icon}
            </div>
            <p className="text-gray-700 leading-relaxed">{text}</p>
        </div>
    );
}

function ValueCard({ title, description }) {
    return (
        <div className="text-center">
            <h3 className="text-xl font-bold text-gray-900 mb-4">{title}</h3>
            <p className="text-gray-600 leading-relaxed">{description}</p>
        </div>
    );
}