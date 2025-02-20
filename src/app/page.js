import Link from "next/link";

export default function Home() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-100 to-white text-gray-900 px-6">
            {/* Hero Section */}
            <div className="text-center">
                <h1 className="text-5xl font-extrabold text-[var(--primary)] leading-tight">
                    Simply Punjabi, <span className="text-green-500">the Fun Way!</span>
                </h1>
                <p className="text-lg mt-3 text-gray-700 max-w-xl mx-auto">
                    Learn Punjabi the simple way,
                    Start your journey today!
                </p>

                {/* CTA Buttons */}
                <div className="mt-6 flex space-x-4">
                    <Link href="/signup">
                        <button className="bg-[var(--primary)] text-white px-6 py-3 rounded-lg text-lg font-semibold shadow-md hover:bg-[var(--secondary)] transition">
                            Get Started 🚀
                        </button>
                    </Link>
                    <Link href="/gamified/lessons">
                        <button className="bg-green-500 text-white px-6 py-3 rounded-lg text-lg font-semibold shadow-md hover:bg-green-600 transition">
                            Explore Lessons 🎮
                        </button>
                    </Link>
                </div>
            </div>

            {/* Featured Lessons */}
            <div className="mt-12 text-center">
                <h2 className="text-3xl font-bold text-[var(--primary)]">📚 Featured Lessons</h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6 max-w-4xl mx-auto">
                    <LessonCard title="Basic Phrases" description="Essential Punjabi words and phrases." link="/gamified/lessons/basic-phrases" />
                    <LessonCard title="Alphabet Mastery" description="Learn the Gurmukhi script step by step." link="/gamified/lessons/alphabet" />
                    <LessonCard title="Conversations" description="Practice real-world dialogues in Punjabi." link="/gamified/lessons/conversations" />
                </div>
            </div>
        </div>
    );
}

// ✅ Reusable Lesson Card Component
function LessonCard({ title, description, link }) {
    return (
        <Link href={link}>
            <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-xl transition cursor-pointer">
                <h3 className="text-xl font-bold text-[var(--primary)]">{title}</h3>
                <p className="text-gray-600">{description}</p>
                <button className="mt-4 bg-[var(--primary)] text-white px-4 py-2 rounded-lg hover:bg-[var(--secondary)] transition">
                    Start Now
                </button>
            </div>
        </Link>
    );
}

