"use client";

import Link from "next/link";

export default function Home() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-100 to-white text-gray-900 px-6 pt-24">
            {/* Hero Section */}
            <div className="text-center flex flex-col items-center w-full max-w-3xl">
                <h1 className="text-4xl md:text-6xl font-extrabold text-[var(--primary)] leading-tight animate-fade-in">
                    Simply Punjabi, <span className="text-green-500">the Fun Way!</span>
                </h1>
                <p className="text-base md:text-lg mt-3 text-gray-700 max-w-md md:max-w-xl mx-auto animate-slide-up">
                    The simple way to learn Punjabi. Start your journey today!
                </p>

                {/* CTA Buttons */}
                <div className="mt-6 flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-4 w-full md:w-auto animate-slide-up">
                    <Link href="/signup" className="w-full md:w-auto">
                        <button className="w-full md:w-auto bg-[var(--primary)] text-white px-6 py-3 rounded-lg text-lg font-semibold shadow-md hover:bg-[var(--secondary)] transition transform hover:scale-105">
                            Get Started 🚀
                        </button>
                    </Link>
                    <Link href="/learn-more" className="w-full md:w-auto">
                        <button className="w-full md:w-auto bg-green-500 text-white px-6 py-3 rounded-lg text-lg font-semibold shadow-md hover:bg-green-600 transition transform hover:scale-105">
                            Learn More 📖
                        </button>
                    </Link>
                </div>
            </div>

            {/* Featured Lessons */}
            <div className="mt-12 text-center w-full max-w-4xl">
                <h2 className="text-2xl md:text-3xl font-bold text-[var(--primary)]">📚 Featured Lessons</h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
                    <LessonCard title="Alphabet & Numbers" description="Master Gurmukhi letters and counting." link="/learning/alphabet-numbers" icon="🔢" />
                    <LessonCard title="Pronunciation" description="Learn how to speak Punjabi and conversate." link="/learning/pronunciation" icon="🔊" />
                    <LessonCard title="Reading & Writing" description="Develop Punjabi reading and writing skills." link="/learning/reading-writing" icon="✍️" />
                </div>
            </div>
        </div>
    );
}

// ✅ Updated Lesson Card Component with Orange Hover Border
function LessonCard({ title, description, link, icon }) {
    return (
        <Link href={link} className="w-full">
            <div className="p-6 bg-white rounded-lg shadow-md border-2 border-gray-200 transition-all hover:border-[3px] hover:border-orange-600 hover:shadow-xl transform hover:scale-105 cursor-pointer text-center">
                <div className="text-4xl">{icon}</div>
                <h3 className="text-lg md:text-xl font-bold text-[var(--primary)] mt-2">{title}</h3>
                <p className="text-sm md:text-base text-gray-600">{description}</p>
                <button className="mt-4 bg-[var(--primary)] text-white px-4 py-2 rounded-lg hover:bg-[var(--secondary)] transition w-full">
                    Start Now
                </button>
            </div>
        </Link>
    );
}
