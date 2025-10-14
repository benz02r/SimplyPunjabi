"use client";

import { FaComments, FaMicrophone, FaAward, FaBullseye, FaCheckCircle, FaGlobe, FaUsers } from 'react-icons/fa';

export default function Home() {
    const punjabiDays = [
        { en: "Sunday", pa: "ਐਤਵਾਰ", pron: "Aitvaar" },
        { en: "Monday", pa: "ਸੋਮਵਾਰ", pron: "Somvaar" },
        { en: "Tuesday", pa: "ਮੰਗਲਵਾਰ", pron: "Mangalvaar" },
        { en: "Wednesday", pa: "ਬੁੱਧਵਾਰ", pron: "Budhvaar" },
        { en: "Thursday", pa: "ਵੀਰਵਾਰ", pron: "Veervaar" },
        { en: "Friday", pa: "ਸ਼ੁੱਕਰਵਾਰ", pron: "Shukravaar" },
        { en: "Saturday", pa: "ਸ਼ਨਿੱਚਰਵਾਰ", pron: "Shanicharvaar" },
    ];

    const today = new Date();
    const currentDayIndex = today.getDay();
    const currentDay = punjabiDays[currentDayIndex];

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50">
            {/* Hero Section with Enhanced Design */}
            <section className="relative px-4 sm:px-6 lg:px-8 pt-32 sm:pt-40 pb-20">
                <div className="max-w-6xl mx-auto">
                    {/* Logo and Main Heading */}
                    <div className="text-center mb-12">
                        <div className="inline-block mb-6 relative">
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-orange-400 blur-3xl opacity-20 animate-pulse"></div>
                            <img
                                src="/Website Banner(shadowing)- Simply Punjabi, Ryan.png"
                                alt="Simply Punjabi Logo"
                                className="relative w-full max-w-[500px] mx-auto object-contain drop-shadow-2xl"
                            />
                        </div>

                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-blue-600 to-orange-500 bg-clip-text text-transparent mb-6 leading-tight">
                            The Simple Way to Learn Punjabi!
                        </h1>

                        {/* Daily Word Feature - Enhanced */}
                        <div className="inline-block bg-white rounded-2xl shadow-lg px-8 py-6 mb-8 border-2 border-blue-100 hover:border-blue-300 transition-all duration-300 hover:shadow-xl">
                            <p className="text-sm text-gray-600 mb-2 font-medium">TODAY IS</p>
                            <p className="text-4xl font-bold text-orange-500 mb-1">{currentDay.pa}</p>
                            <p className="text-lg text-gray-700">
                                <span className="font-semibold">{currentDay.pron}</span>
                                <span className="text-gray-400 mx-2">•</span>
                                <span className="text-gray-500">{currentDay.en}</span>
                            </p>
                        </div>

                        <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-10">
                            Dive into interactive lessons, real-world speaking scenarios, and cultural insights to master Punjabi with confidence.
                        </p>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
                            <a href="/key-functions/signup" className="w-full sm:w-auto">
                                <button className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-blue-700 text-white px-10 py-4 rounded-xl text-lg font-bold shadow-lg hover:shadow-2xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 transform hover:scale-105">
                                    Get Started Free
                                </button>
                            </a>
                            <a href="/learn-more" className="w-full sm:w-auto">
                                <button className="w-full sm:w-auto bg-white text-blue-600 border-2 border-blue-600 px-10 py-4 rounded-xl text-lg font-bold shadow-lg hover:bg-blue-50 transition-all duration-300 transform hover:scale-105">
                                    Learn More
                                </button>
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="px-4 sm:px-6 lg:px-8 py-16 bg-white">
                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <FeatureCard
                            icon={<FaCheckCircle className="text-5xl text-green-500" />}
                            title="Interactive Learning"
                            description="Engaging lessons designed for real-world conversations"
                        />
                        <FeatureCard
                            icon={<FaGlobe className="text-5xl text-blue-500" />}
                            title="Cultural Context"
                            description="Understand the rich heritage behind the language"
                        />
                        <FeatureCard
                            icon={<FaUsers className="text-5xl text-orange-500" />}
                            title="Community Support"
                            description="Learn alongside others on the same journey"
                        />
                    </div>
                </div>
            </section>

            {/* Learning Paths Section */}
            <section className="px-4 sm:px-6 lg:px-8 py-20 bg-gradient-to-b from-white to-blue-50">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-3 bg-blue-100 px-6 py-3 rounded-full mb-4">
                            <FaBullseye className="text-2xl text-blue-600" />
                            <span className="text-blue-800 font-semibold">LEARNING PATHS</span>
                        </div>
                        <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
                            Choose Your Journey
                        </h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Follow our custom-tailored paths to build your confidence from beginner to conversational
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <CourseSectionCard
                            title="Essential Punjabi"
                            subtitle="Real Conversations"
                            description="Master greetings, introductions, and day-to-day essentials to start speaking immediately."
                            link="/learning/essential-punjabi"
                            icon={<FaComments className="text-6xl text-blue-600" />}
                            gradient="from-blue-500 to-blue-700"
                            accentColor="blue"
                        />
                        <CourseSectionCard
                            title="Speak with Confidence"
                            subtitle="Beyond the Basics"
                            description="Build up your vocabulary and express yourself freely in everyday situations."
                            link="/learning/speak-with-confidence"
                            icon={<FaMicrophone className="text-6xl text-orange-600" />}
                            gradient="from-orange-500 to-orange-700"
                            accentColor="orange"
                        />
                        <CourseSectionCard
                            title="Master Punjabi"
                            subtitle="Conversations with Ease"
                            description="Engage with native speakers and understand context effortlessly in any setting."
                            link="/learning/master-punjabi"
                            icon={<FaAward className="text-6xl text-green-600" />}
                            gradient="from-green-500 to-green-700"
                            accentColor="green"
                        />
                    </div>
                </div>
            </section>
        </div>
    );
}

function FeatureCard({ icon, title, description }) {
    return (
        <div className="text-center p-6 rounded-xl hover:bg-gray-50 transition-all duration-300">
            <div className="flex justify-center mb-4">
                {icon}
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
            <p className="text-gray-600">{description}</p>
        </div>
    );
}

function CourseSectionCard({ title, subtitle, description, link, icon, gradient, accentColor }) {
    const hoverColorMap = {
        blue: 'group-hover:border-blue-400',
        orange: 'group-hover:border-orange-400',
        green: 'group-hover:border-green-400'
    };

    return (
        <a href={link} className="group block">
            <div className={`relative h-full bg-white rounded-2xl border-2 border-gray-200 ${hoverColorMap[accentColor]} shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden`}>
                {/* Gradient Background on Hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>

                {/* Content */}
                <div className="relative p-8 flex flex-col h-full">
                    <div className="flex justify-center mb-6 transform group-hover:scale-110 transition-transform duration-300">
                        {icon}
                    </div>

                    <h3 className="text-2xl font-bold text-gray-900 mb-1 text-center">
                        {title}
                    </h3>
                    <p className="text-sm font-semibold text-gray-500 mb-4 text-center">
                        {subtitle}
                    </p>
                    <p className="text-gray-600 text-center mb-6 flex-grow">
                        {description}
                    </p>

                    <button className={`w-full bg-gradient-to-r ${gradient} text-white px-6 py-3 rounded-xl font-bold hover:shadow-lg transition-all duration-300 transform group-hover:scale-105`}>
                        Start Learning →
                    </button>
                </div>

                {/* Corner Accent */}
                <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${gradient} opacity-10 blur-2xl group-hover:opacity-20 transition-opacity duration-300`}></div>
            </div>
        </a>
    );
}