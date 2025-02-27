"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
    const videoRef = useRef(null);

    useEffect(() => {
        const video = videoRef.current;

        if (video) {
            // Ensure autoplay on mobile
            const playVideo = () => {
                video.play().catch(error => console.error("Autoplay failed:", error));
            };

            // Try to play immediately
            playVideo();

            // If autoplay fails, wait for user interaction
            document.addEventListener("click", playVideo);
            document.addEventListener("touchstart", playVideo);
            document.addEventListener("scroll", playVideo);

            // Cleanup event listeners
            return () => {
                document.removeEventListener("click", playVideo);
                document.removeEventListener("touchstart", playVideo);
                document.removeEventListener("scroll", playVideo);
            };
        }
    }, []);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-100 to-white text-gray-900 px-6 pt-32 md:pt-40 pb-32">

            {/* New Animated Logo Section */}
            <div className="border-[4px] border-[var(--primary)] rounded-lg transition-all duration-300 hover:border-[var(--secondary)] inline-block overflow-hidden shadow-lg hover:shadow-xl">
                <video
                    ref={videoRef}
                    src="/images/HD files/Simply Punjabi-1-Main Title - animated.mp4"
                    autoPlay
                    muted
                    playsInline
                    className="w-[350px] h-auto"
                />
            </div>

            {/* CTA Section */}
            <div className="flex flex-col items-center space-y-4">
                <h2 className="text-3xl font-bold text-[var(--primary)] text-center">
                    The Simple Way To Learn Punjabi!
                </h2>
                <p className="text-lg text-gray-700 text-center max-w-xl">
                    Explore interactive lessons, pronunciation guides, and writing practice.
                </p>
                <div className="mt-4 flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-4">
                    <Link href="/signup" className="w-full md:w-auto">
                        <button className="w-full md:w-auto bg-[var(--primary)] text-white px-6 py-3 rounded-lg text-lg font-semibold shadow-md hover:bg-orange-400 transition transform hover:scale-110 hover:shadow-lg">
                            Get Started 🚀
                        </button>
                    </Link>
                    <Link href="/learn-more" className="w-full md:w-auto">
                        <button className="w-full md:w-auto bg-orange-400 text-white px-6 py-3 rounded-lg text-lg font-semibold shadow-md hover:bg-blue-800 transition transform hover:scale-110 hover:shadow-lg">
                            Learn More 📖
                        </button>
                    </Link>
                </div>
            </div>

            {/* Featured Lessons Section */}
            <div className="text-center w-full max-w-4xl">
                <h2 className="text-2xl md:text-3xl font-bold text-[var(--primary)] mb-4">
                    📚 Featured Lessons
                </h2>
                <p className="text-lg text-gray-700">
                    Start learning with our interactive lessons.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
                    <LessonCard title="Alphabet & Numbers" description="Master Gurmukhi letters and counting." link="/learning/alphabet-numbers" icon="🔢" />
                    <LessonCard title="Pronunciation" description="Learn how to speak Punjabi and conversate." link="/learning/pronunciation" icon="🔊" />
                    <LessonCard title="Reading & Writing" description="Develop Punjabi reading and writing skills." link="/learning/reading-writing" icon="✍️" />
                </div>
            </div>
        </div>
    );
}

// ✅ Improved Lesson Card Component
function LessonCard({ title, description, link, icon }) {
    return (
        <Link href={link} className="w-full">
            <div className="p-6 bg-white rounded-lg shadow-md border-2 border-gray-200 transition-all hover:border-orange-400 hover:shadow-xl transform hover:scale-105 cursor-pointer text-center">
                <div className="text-4xl">{icon}</div>
                <h3 className="text-lg md:text-xl font-bold text-[var(--primary)] mt-2">{title}</h3>
                <p className="text-sm md:text-base text-gray-600">{description}</p>
                <button className="mt-4 bg-[var(--primary)] text-white px-4 py-2 rounded-lg hover:bg-[var(--secondary)] transition w-full hover:scale-105">
                    Start Now
                </button>
            </div>
        </Link>
    );
}
