"use client";

import { FaComments, FaMicrophone, FaAward, FaBullseye, FaCheckCircle, FaGlobe, FaUsers, FaRocket, FaHeart, FaStar, FaPlay, FaClock, FaMobile, FaHeadphones, FaBook, FaLanguage, FaGraduationCap } from 'react-icons/fa';

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
        <div className="min-h-screen bg-white">
            {/* Hero Section - Emotional Connection First */}
            <section className="relative px-6 pt-20 pb-32 sm:pt-32 sm:pb-40 overflow-hidden bg-gradient-to-br from-blue-50 via-orange-50/30 to-white">
                {/* Subtle background decoration */}
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-blue-100/40 to-orange-100/40 rounded-full blur-3xl -z-10"></div>
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-orange-100/30 to-blue-100/30 rounded-full blur-3xl -z-10"></div>

                <div className="max-w-6xl mx-auto">
                    {/* Beta Badge */}
                    <div className="flex justify-center mb-8">
                        <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm border border-blue-100">
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                            <span className="text-sm font-semibold text-gray-700">Beta Access Open</span>
                            <span className="text-sm text-gray-500">•</span>
                            <span className="text-sm font-bold bg-gradient-to-r from-blue-600 to-orange-600 bg-clip-text text-transparent">Beta Access Free</span>
                        </div>
                    </div>

                    {/* Logo */}
                    <div className="flex justify-center mb-12">
                        <img
                            src="/Website Banner(shadowing)- Simply Punjabi, Ryan.png"
                            alt="Simply Punjabi"
                            className="w-full max-w-[380px] drop-shadow-xl"
                        />
                    </div>

                    {/* Emotional Headline */}
                    <div className="text-center max-w-4xl mx-auto mb-8">
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                            The Simple Way
                            <br />
                            <span className="bg-gradient-to-r from-blue-600 via-blue-500 to-orange-500 bg-clip-text text-transparent">
                                To Learn Punjabi
                            </span>
                        </h1>
                        <p className="text-lg sm:text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto">
                            Join thousands of diaspora learners reconnecting with family, culture, and identity through the language of their heritage.
                        </p>
                    </div>

                    {/* CTA Section - Clear and Focused */}
                    <div className="flex flex-col items-center gap-4 mb-12">
                        <a href="/key-functions/signup" className="w-full sm:w-auto">
                            <button className="w-full sm:w-auto group relative bg-gradient-to-r from-blue-600 to-blue-700 text-white px-12 py-5 rounded-2xl text-lg font-bold shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
                                <span className="flex items-center justify-center gap-3">
                                    <FaPlay className="text-sm" />
                                    Start Learning Free
                                </span>
                            </button>
                        </a>
                        <p className="text-sm text-gray-500 flex items-center gap-2">
                            <FaCheckCircle className="text-green-500" />
                            No credit card required
                        </p>
                    </div>

                    {/* Social Proof - Minimal and Credible */}
                    <div className="flex flex-wrap items-center justify-center gap-8 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                            <FaGlobe className="text-blue-600" />
                            <span className="font-medium">Learners in 7+ countries</span>
                        </div>
                        <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                                <FaStar key={i} className="text-yellow-400 text-sm" />
                            ))}
                            <span className="ml-2 font-medium">5.0 from beta users</span>
                        </div>
                    </div>

                    {/* Word of the Day - Interactive Element */}
                    <div className="mt-16 flex justify-center">
                        <div className="bg-white rounded-3xl shadow-lg border border-gray-100 px-10 py-8 hover:shadow-xl transition-all duration-300 max-w-md">
                            <p className="text-xs uppercase tracking-widest text-gray-400 mb-3 text-center font-bold">Today's Word</p>
                            <p className="text-5xl font-bold text-center mb-2 bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
                                {currentDay.pa}
                            </p>
                            <p className="text-center text-lg">
                                <span className="font-semibold text-gray-900">{currentDay.pron}</span>
                                <span className="text-gray-300 mx-3">•</span>
                                <span className="text-gray-600">{currentDay.en}</span>
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Problem-Solution Section - Emotional Resonance */}
            <section className="py-24 px-6 bg-gradient-to-b from-white to-gray-50">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-20">
                        <p className="text-blue-600 font-bold uppercase tracking-wider text-sm mb-4">The Problem We're Solving</p>
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                            Learning Punjabi Shouldn't Feel Impossible
                        </h2>
                        <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
                            Generic language apps don't understand diaspora learners. They teach vocabulary you'll never use
                            and ignore the cultural context that makes conversations meaningful.
                        </p>
                    </div>

                    {/* Pain Points vs Solutions */}
                    <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                        <ProblemSolutionCard
                            problem="Generic apps teach textbook phrases"
                            solution="We teach real family conversations"
                            icon={<FaComments className="text-3xl" />}
                            accentColor="blue"
                        />
                        <ProblemSolutionCard
                            problem="No cultural context or connection"
                            solution="Every lesson includes cultural insights"
                            icon={<FaHeart className="text-3xl" />}
                            accentColor="orange"
                        />
                        <ProblemSolutionCard
                            problem="Pronunciation guides don't help"
                            solution="Native speaker audio on every word"
                            icon={<FaHeadphones className="text-3xl" />}
                            accentColor="green"
                        />
                        <ProblemSolutionCard
                            problem="Long, overwhelming lessons"
                            solution="10-minute lessons that fit your life"
                            icon={<FaClock className="text-3xl" />}
                            accentColor="purple"
                        />
                    </div>
                </div>
            </section>

            {/* How It Works - Process Flow */}
            <section className="py-24 px-6 bg-white">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-20">
                        <p className="text-orange-600 font-bold uppercase tracking-wider text-sm mb-4">How It Works</p>
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                            Your Journey to Fluency
                        </h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            A proven, step-by-step approach designed specifically for diaspora learners
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-12 max-w-5xl mx-auto">
                        <ProcessStep
                            number="01"
                            title="Start with Essentials"
                            description="Learn greetings, introductions, and basic phrases to start conversations today"
                            icon={<FaBook className="text-4xl text-blue-600" />}
                        />
                        <ProcessStep
                            number="02"
                            title="Build Confidence"
                            description="Practice real scenarios with interactive exercises and authentic pronunciation"
                            icon={<FaMicrophone className="text-4xl text-orange-600" />}
                        />
                        <ProcessStep
                            number="03"
                            title="Connect with Family"
                            description="Have meaningful conversations and preserve your cultural connection"
                            icon={<FaHeart className="text-4xl text-green-600" />}
                        />
                    </div>

                    {/* Secondary CTA */}
                    <div className="text-center mt-16">
                        <a href="/lessons/lesson2/1">
                            <button className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-10 py-4 rounded-2xl text-base font-bold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                                Try Your First Lesson Now
                            </button>
                        </a>
                    </div>
                </div>
            </section>

            {/* Course Paths - Simplified and Clear */}
            <section className="py-24 px-6 bg-gradient-to-b from-gray-50 to-white">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-20">
                        <p className="text-blue-600 font-bold uppercase tracking-wider text-sm mb-4">Learning Paths</p>
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                            Choose Your Starting Point
                        </h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Structured courses that take you from complete beginner to confident speaker
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        <CourseCard
                            level="Beginner"
                            title="Essential Punjabi"
                            description="Perfect for complete beginners. Learn greetings, introductions, and basic family vocabulary."
                            lessons="6 lessons"
                            link="/learning/essential-punjabi"
                            gradient="from-blue-500 to-blue-600"
                            icon={<FaComments className="text-5xl text-blue-600" />}
                        />
                        <CourseCard
                            level="Intermediate"
                            title="Speak with Confidence"
                            description="Build vocabulary and express yourself in everyday conversations with family members."
                            lessons="6 lessons"
                            link="/learning/speak-with-confidence"
                            gradient="from-orange-500 to-orange-600"
                            icon={<FaMicrophone className="text-5xl text-orange-600" />}
                            featured={true}
                        />
                        <CourseCard
                            level="Advanced"
                            title="Master Punjabi"
                            description="Achieve fluency and understand cultural nuances for natural, confident conversations."
                            lessons="6 lessons"
                            link="/learning/master-punjabi"
                            gradient="from-green-500 to-green-600"
                            icon={<FaAward className="text-5xl text-green-600" />}
                        />
                    </div>
                </div>
            </section>

            {/* Testimonials - Emotional Stories */}
            <section className="py-24 px-6 bg-white">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-20">
                        <p className="text-orange-600 font-bold uppercase tracking-wider text-sm mb-4">Success Stories</p>
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                            Real People. Real Results.
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        <TestimonialCard
                            quote="I had my first full conversation with my grandmother in Punjabi last week. She cried tears of joy. This platform gave me the tools to connect with her in a way I never thought possible."
                            name="Priya S."
                            location="Birmingham, UK"
                            avatar="from-blue-400 to-blue-600"
                        />
                        <TestimonialCard
                            quote="Six months ago, I couldn't say a single sentence. Now I'm translating for my younger cousins at family gatherings. The bite-sized lessons made it actually achievable."
                            name="Raj M."
                            location="Vancouver, Canada"
                            avatar="from-orange-400 to-orange-600"
                        />
                        <TestimonialCard
                            quote="Finally, a platform that gets it. The cultural context in each lesson helped me understand not just what to say, but why. It's helped me feel more connected to my roots."
                            name="Simran K."
                            location="Wolverhampton, UK"
                            avatar="from-green-400 to-green-600"
                        />
                    </div>
                </div>
            </section>

            {/* Final CTA - Conversion Focused */}
            <section className="py-32 px-6 bg-gradient-to-br from-blue-600 via-blue-700 to-orange-600 text-white relative overflow-hidden">
                {/* Decorative elements */}
                <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl"></div>

                <div className="max-w-4xl mx-auto text-center relative z-10">
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                        Start Speaking Punjabi with Your Family Today
                    </h2>
                    <p className="text-lg sm:text-xl text-blue-100 mb-10 leading-relaxed max-w-2xl mx-auto">
                        Join our beta program and get <span className="font-bold text-white"> complete access for free.</span> No credit card required. Cancel anytime.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
                        <a href="/key-functions/signup">
                            <button className="bg-white text-blue-600 px-12 py-5 rounded-2xl text-lg font-bold shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105">
                                <span className="flex items-center gap-3">
                                    <FaRocket />
                                    Start for free today!
                                </span>
                            </button>
                        </a>
                    </div>

                    <p className="text-sm text-blue-200">
                        Then just <span className="font-bold text-white">£4.99/month</span> after your free period
                    </p>

                    {/* Trust indicators */}
                    <div className="mt-16 flex flex-wrap items-center justify-center gap-8 text-sm text-blue-100">
                        <div className="flex items-center gap-2">
                            <FaCheckCircle className="text-green-400" />
                            <span>No credit card required</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <FaCheckCircle className="text-green-400" />
                            <span>Cancel anytime</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <FaCheckCircle className="text-green-400" />
                            <span>Learn at your own pace</span>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

function ProblemSolutionCard({ problem, solution, icon, accentColor }) {
    const colorMap = {
        blue: 'from-blue-500 to-blue-600',
        orange: 'from-orange-500 to-orange-600',
        green: 'from-green-500 to-green-600',
        purple: 'from-purple-500 to-purple-600'
    };

    return (
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300">
            <div className={`inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br ${colorMap[accentColor]} text-white mb-6`}>
                {icon}
            </div>
            <div className="space-y-3">
                <p className="text-gray-500 line-through text-sm">{problem}</p>
                <p className="text-gray-900 font-semibold text-lg">{solution}</p>
            </div>
        </div>
    );
}

function ProcessStep({ number, title, description, icon }) {
    return (
        <div className="text-center">
            <div className="flex justify-center mb-6">
                <div className="relative">
                    <div className="w-20 h-20 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl flex items-center justify-center border-2 border-gray-200">
                        {icon}
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-blue-600 to-orange-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                        {number}
                    </div>
                </div>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
            <p className="text-gray-600 leading-relaxed">{description}</p>
        </div>
    );
}

function CourseCard({ level, title, description, lessons, link, gradient, icon, featured }) {
    return (
        <a href={link} className="block group">
            <div className={`relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border-2 ${featured ? 'border-orange-200 ring-4 ring-orange-100' : 'border-gray-100 hover:border-gray-200'} transform hover:-translate-y-2`}>
                {featured && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-4 py-1.5 rounded-full text-xs font-bold shadow-lg">
                        MOST POPULAR
                    </div>
                )}

                <div className="text-center">
                    <div className="flex justify-center mb-6 transform group-hover:scale-110 transition-transform duration-300">
                        {icon}
                    </div>

                    <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">{level}</p>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">{title}</h3>
                    <p className="text-gray-600 mb-6 leading-relaxed">{description}</p>

                    <div className="flex items-center justify-center text-sm text-gray-500 mb-6">
                        <span className="flex items-center gap-1.5">
                            <FaBook className="text-xs" />
                            {lessons}
                        </span>
                    </div>

                    <button className={`w-full bg-gradient-to-r ${gradient} text-white px-6 py-4 rounded-xl font-bold shadow-md group-hover:shadow-lg transition-all duration-300`}>
                        <span className="flex items-center justify-center gap-2">
                            Start Course
                            <span className="transform group-hover:translate-x-1 transition-transform duration-300">→</span>
                        </span>
                    </button>
                </div>
            </div>
        </a>
    );
}

function TestimonialCard({ quote, name, location, avatar }) {
    return (
        <div className="bg-gray-50 rounded-2xl p-8 hover:bg-white hover:shadow-lg transition-all duration-300 border border-gray-100">
            <div className="flex gap-1 mb-5">
                {[...Array(5)].map((_, i) => (
                    <FaStar key={i} className="text-yellow-400 text-sm" />
                ))}
            </div>
            <p className="text-gray-700 mb-6 leading-relaxed italic">"{quote}"</p>
            <div className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${avatar}`}></div>
                <div>
                    <p className="font-bold text-gray-900">{name}</p>
                    <p className="text-sm text-gray-500">{location}</p>
                </div>
            </div>
        </div>
    );
}