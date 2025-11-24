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
            {/* Hero Section - Professional Grade */}
            <section className="relative px-6 sm:px-8 lg:px-12 pt-32 sm:pt-40 lg:pt-48 pb-24 sm:pb-32">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center">
                        {/* Logo with refined presentation */}
                        <div className="inline-block mb-10 relative">
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-orange-400/20 blur-3xl"></div>
                            <img
                                src="/Website Banner(shadowing)- Simply Punjabi, Ryan.png"
                                alt="Simply Punjabi Logo"
                                className="relative w-full max-w-[480px] mx-auto object-contain drop-shadow-2xl"
                            />
                        </div>

                        {/* Main Heading - Better typography */}
                        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold bg-gradient-to-r from-blue-600 via-blue-500 to-orange-500 bg-clip-text text-transparent mb-8 leading-[1.1] tracking-tight">
                            The Simple Way to<br className="hidden sm:block" /> Learn Punjabi
                        </h1>

                        {/* Daily Word Feature - Refined design */}
                        <div className="inline-block mb-10">
                            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl px-10 py-7 border border-gray-200/50 hover:border-blue-300/50 hover:shadow-2xl transition-all duration-500 group">
                                <p className="text-xs uppercase tracking-widest text-gray-500 mb-3 font-bold">Today is</p>
                                <p className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-600 mb-2">{currentDay.pa}</p>
                                <p className="text-xl text-gray-700">
                                    <span className="font-semibold">{currentDay.pron}</span>
                                    <span className="text-gray-300 mx-3">•</span>
                                    <span className="text-gray-500">{currentDay.en}</span>
                                </p>
                            </div>
                        </div>

                        {/* Subtitle - Better line height and spacing */}
                        <p className="text-xl sm:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-12 font-light">
                            Interactive lessons, real-world scenarios, and cultural insights<br className="hidden sm:block" /> to master Punjabi with confidence
                        </p>

                        {/* CTA Buttons - Refined spacing and hierarchy */}
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <a href="/lessons/lesson2/1" className="w-full sm:w-auto group">
                                <button className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-blue-700 text-white px-12 py-5 rounded-xl text-lg font-bold shadow-xl hover:shadow-2xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 relative overflow-hidden">
                                    <span className="relative z-10">Get Started Free</span>
                                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                </button>
                            </a>
                            <a href="/learn-more" className="w-full sm:w-auto">
                                <button className="w-full sm:w-auto bg-white text-blue-600 border-2 border-blue-600 px-12 py-5 rounded-xl text-lg font-bold shadow-lg hover:bg-blue-50 hover:shadow-xl transition-all duration-300">
                                    Learn More
                                </button>
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* Learning Paths Section - Enhanced professional layout */}
            <section className="px-6 sm:px-8 lg:px-12 py-24 sm:py-32 bg-gradient-to-b from-white to-blue-50/50">
                <div className="max-w-7xl mx-auto">
                    {/* Section Header - Better hierarchy */}
                    <div className="text-center mb-20">
                        <div className="inline-flex items-center gap-3 bg-blue-100/80 backdrop-blur-sm px-6 py-3 rounded-full mb-6 shadow-sm">
                            <FaBullseye className="text-xl text-blue-600" />
                            <span className="text-blue-800 font-bold text-sm tracking-wide uppercase">Learning Paths</span>
                        </div>
                        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 tracking-tight">
                            Choose Your Journey
                        </h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto font-light leading-relaxed">
                            Structured paths designed to build your confidence from beginner to conversational fluency
                        </p>
                    </div>

                    {/* Course Cards - Professional grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
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

function CourseSectionCard({ title, subtitle, description, link, icon, gradient, accentColor }) {
    const borderColorMap = {
        blue: 'border-gray-200/80 hover:border-blue-400/60',
        orange: 'border-gray-200/80 hover:border-orange-400/60',
        green: 'border-gray-200/80 hover:border-green-400/60'
    };

    const shadowColorMap = {
        blue: 'hover:shadow-blue-500/10',
        orange: 'hover:shadow-orange-500/10',
        green: 'hover:shadow-green-500/10'
    };

    return (
        <a href={link} className="group block h-full">
            <div className={`relative h-full bg-white rounded-3xl border-2 ${borderColorMap[accentColor]} shadow-xl ${shadowColorMap[accentColor]} hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 overflow-hidden`}>
                {/* Subtle gradient overlay on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-[0.03] transition-opacity duration-500`}></div>

                {/* Content */}
                <div className="relative p-10 flex flex-col h-full">
                    {/* Icon with refined animation */}
                    <div className="flex justify-center mb-8 transform group-hover:scale-110 group-hover:-rotate-3 transition-all duration-500">
                        {icon}
                    </div>

                    {/* Title and subtitle with better typography */}
                    <h3 className="text-2xl font-bold text-gray-900 mb-2 text-center tracking-tight">
                        {title}
                    </h3>
                    <p className="text-sm font-semibold text-gray-500 mb-5 text-center uppercase tracking-wider">
                        {subtitle}
                    </p>

                    {/* Description with better readability */}
                    <p className="text-gray-600 text-center mb-8 flex-grow leading-relaxed text-base">
                        {description}
                    </p>

                    {/* CTA Button - Professional styling */}
                    <button className={`w-full bg-gradient-to-r ${gradient} text-white px-6 py-4 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all duration-500 transform group-hover:scale-[1.02] relative overflow-hidden`}>
                        <span className="relative z-10 flex items-center justify-center gap-2">
                            Start Learning
                            <span className="transform group-hover:translate-x-1 transition-transform duration-300">→</span>
                        </span>
                    </button>
                </div>

                {/* Refined corner accent */}
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${gradient} opacity-5 blur-3xl group-hover:opacity-10 transition-opacity duration-500`}></div>
            </div>
        </a>
    );
}