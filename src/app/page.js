"use client";

import Link from "next/link";
import Image from "next/image";
import { FaComments, FaMicrophone, FaAward, FaBullseye } from "react-icons/fa";

export default function Home() {
    const punjabiDays = [
        { en: "Sunday", pa: "ਐਤਵਾਰ", pron: "Aitvaar" },
        { en: "Monday", pa: "ਸੋਮਵਾਰ", pron: "Somvaar" },
        { en: "Tuesday", pa: "ਮੰਗਲਵਾਰ", pron: "Mangalvaar" },
        { en: "Wednesday", pa: "ਬੁੱਧਵਾਰ", pron: "Budhvaar" },
        { en: "Thursday", pa: "ਵੀਰਵਾਰ", pron: "Veervaar" },
        { en: "Friday", pa: "ਸ਼ੁੱਕਰਵਾਰ", pron: "Shukravaar" },
        { en: "Saturday", pa: "ਸ਼ਨਿੱਚਰਵਾਰ", pron: "Shanicharvaar" },
    ];

    const today = new Date();
    const currentDayIndex = today.getDay(); // 0 = Sunday, 1 = Monday...
    const currentDay = punjabiDays[currentDayIndex];

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-50 to-white text-gray-900 px-4 sm:px-6 pt-32 sm:pt-40 pb-20 space-y-20">
            {/* Hero Section */}
            <div className="text-center w-full max-w-4xl px-4 sm:px-0">
                <div className="flex justify-center mb-4">
                    <Image
                        src="/Website Banner(shadowing)- Simply Punjabi, Ryan.png"
                        alt="Simply Punjabi Logo"
                        width={500}
                        height={150}
                        className="object-contain w-full max-w-[420px]"
                        priority
                    />
                </div>


                <h2
                    className="text-2xl sm:text-3xl font-bold text-blue-500/90 mt-6 transition duration-300 hover:text-blue-600 hover:tracking-wide hover:scale-105"
                >
                    The Simple Way to Learn Punjabi
                </h2>

                {/* Today is ___ in Punjabi */}
                <div className="text-center mt-4">
                    <p className="text-lg sm:text-xl text-gray-800">
                        <span className="font-semibold text-blue-700">Today is</span>{" "}
                        <span className="text-orange-600 font-bold">{currentDay.pa}</span>{" "}
                        <span className="text-gray-500 text-sm">({currentDay.pron})</span>
                    </p>
                </div>

                <p className="text-base sm:text-lg text-gray-700 mt-3">
                    Dive into interactive lessons, real-world speaking scenarios, and cultural insights to master Punjabi.
                </p>
                <div className="mt-6 flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
                    <Link href="/key-functions/signup" className="w-full sm:w-auto">
                        <button className="w-full sm:w-auto bg-[var(--primary)] text-white px-8 py-4 rounded-lg text-lg font-semibold shadow-md hover:bg-orange-500 transition transform hover:scale-105 hover:shadow-lg">
                            Get Started
                        </button>
                    </Link>
                    <Link href="/learn-more" className="w-full sm:w-auto">
                        <button className="w-full sm:w-auto bg-orange-400 text-white px-8 py-4 rounded-lg text-lg font-semibold shadow-md hover:bg-blue-500 transition transform hover:scale-105 hover:shadow-lg">
                            Learn More
                        </button>
                    </Link>
                </div>
            </div>

            {/* Course Sections */}
            <div className="text-center w-full max-w-5xl">
                <h2 className="text-3xl font-bold text-[var(--primary)] mb-6 flex justify-center items-center gap-3">
                    <FaBullseye className="text-4xl" /> Choose Your Learning Path
                </h2>
                <p className="text-base sm:text-lg text-gray-700">
                    Follow our custom-tailored paths to build your confidence from beginner to conversational.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
                    <CourseSectionCard
                        title="Essential Punjabi for Real Conversations"
                        description="Master greetings, introductions, and day-to-day essentials."
                        link="/learning/essential-punjabi"
                        icon={<FaComments className="text-5xl text-[var(--primary)] mx-auto" />}
                    />
                    <CourseSectionCard
                        title="Speak with Confidence – Beyond the Basics"
                        description="Build up your vocabulary and express yourself freely."
                        link="/learning/speak-with-confidence"
                        icon={<FaMicrophone className="text-5xl text-[var(--primary)] mx-auto" />}
                    />
                    <CourseSectionCard
                        title="Master Punjabi Conversations with Ease"
                        description="Engage with native speakers and understand context effortlessly."
                        link="/learning/master-punjabi"
                        icon={<FaAward className="text-5xl text-[var(--primary)] mx-auto" />}
                    />
                </div>
            </div>
        </div>
    );
}

// ✅ Course Card Component
function CourseSectionCard({ title, description, link, icon }) {
    return (
        <Link href={link} className="w-full">
            <div className="p-8 bg-white rounded-xl shadow-md border-2 border-gray-200 transition-all hover:border-orange-400 hover:shadow-xl transform hover:scale-105 cursor-pointer min-h-[240px] flex flex-col justify-between text-center">
                <div>
                    <div className="mb-4 flex justify-center">{icon}</div>
                    <h3 className="text-xl font-bold text-[var(--primary)] mt-2">{title}</h3>
                    <p className="text-base text-gray-600 mt-3">{description}</p>
                </div>
                <button className="mt-6 bg-[var(--primary)] text-white px-6 py-3 rounded-lg hover:bg-[var(--secondary)] transition w-full hover:scale-105">
                    Start Learning →
                </button>
            </div>
        </Link>
    );
}
