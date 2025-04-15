"use client";

import Link from "next/link";
import Image from "next/image";
import { FaComments, FaMicrophone, FaAward, FaBullseye } from "react-icons/fa";

export default function Home() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-50 to-white text-gray-900 px-4 sm:px-8 pt-28 sm:pt-36 pb-20 space-y-20">
            {/* Hero Section */}
            <div className="text-center w-full max-w-5xl px-4 sm:px-0">
                <div className="flex justify-center mb-6">
                    <Image
                        src="/Website Banner(shadowing)- Simply Punjabi, Ryan.png"
                        alt="Simply Punjabi Logo"
                        width={560}
                        height={160}
                        className="object-contain w-full max-w-[440px] drop-shadow-md"
                        priority
                    />
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-blue-600">
                    The Simple Way to Learn Punjabi
                </h2>
                <p className="text-base sm:text-lg text-gray-700 mt-3 max-w-xl mx-auto">
                    Jump into bite-sized lessons, cultural insights, and interactive learning crafted just for you.
                </p>
                <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link href="/key-functions/signup">
                        <button className="bg-orange-400 text-white px-8 py-4 rounded-lg text-lg font-semibold shadow-md hover:bg-orange-500 transition transform hover:scale-105 hover:shadow-lg w-full sm:w-auto">
                            Get Started
                        </button>
                    </Link>
                    <Link href="/learn-more">
                        <button className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold shadow-md hover:bg-blue-700 transition transform hover:scale-105 hover:shadow-lg w-full sm:w-auto">
                            Learn More
                        </button>
                    </Link>
                </div>
            </div>

            {/* Course Sections */}
            <div className="text-center w-full max-w-6xl px-4 sm:px-0">
                <h2 className="text-3xl font-bold text-orange-500 mb-6 flex justify-center items-center gap-3">
                    <FaBullseye className="text-4xl" /> Choose Your Learning Path
                </h2>
                <p className="text-base sm:text-lg text-gray-700 max-w-2xl mx-auto">
                    Go from your first words to fluent conversation with our gamified, goal-based tracks.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
                    <CourseSectionCard
                        title="Essential Punjabi for Real Conversations"
                        description="Master greetings, introductions, and everyday expressions."
                        link="/learning/essential-punjabi"
                        icon={<FaComments className="text-5xl text-blue-500 mx-auto" />}
                    />
                    <CourseSectionCard
                        title="Speak with Confidence – Beyond the Basics"
                        description="Learn to express likes, dislikes, and more complex thoughts."
                        link="/learning/speak-with-confidence"
                        icon={<FaMicrophone className="text-5xl text-blue-500 mx-auto" />}
                    />
                    <CourseSectionCard
                        title="Master Punjabi Conversations with Ease"
                        description="Speak like a native with immersive, real-life conversation practice."
                        link="/learning/master-punjabi"
                        icon={<FaAward className="text-5xl text-blue-500 mx-auto" />}
                    />
                </div>
            </div>
        </div>
    );
}

function CourseSectionCard({ title, description, link, icon }) {
    return (
        <Link href={link} className="w-full">
            <div className="p-8 bg-white rounded-xl shadow-md border border-gray-200 transition-all hover:border-orange-500 hover:shadow-xl transform hover:scale-105 cursor-pointer min-h-[260px] flex flex-col justify-between text-center">
                <div>
                    <div className="mb-4">{icon}</div>
                    <h3 className="text-xl font-bold text-blue-600">{title}</h3>
                    <p className="text-base text-gray-600 mt-3">{description}</p>
                </div>
                <button className="mt-6 bg-orange-400 text-white px-6 py-3 rounded-lg hover:bg-orange-500 transition hover:scale-105">
                    Start Learning →
                </button>
            </div>
        </Link>
    );
}
