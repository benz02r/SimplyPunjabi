"use client";

"use client";

import { useRouter } from "next/navigation";
import { FaArrowLeft, FaBook, FaHashtag, FaClock, FaUsers, FaChartBar, FaLanguage } from "react-icons/fa";

export default function LearningResources() {
    const router = useRouter();

    const resources = [
        {
            title: "Gurmukhi Alphabet",
            description: "Master the foundation of Punjabi writing",
            icon: <FaLanguage className="text-5xl" />,
            link: "/learning/resources/alphabet",
            color: "from-blue-500 to-blue-700",
            bgColor: "from-blue-50 to-blue-100"
        },
        {
            title: "Numbers in Punjabi",
            description: "Learn counting and numerical expressions",
            icon: <FaHashtag className="text-5xl" />,
            link: "/learning/resources/numbers",
            color: "from-orange-500 to-orange-700",
            bgColor: "from-orange-50 to-orange-100"
        },
        {
            title: "Common Phrases",
            description: "Essential everyday expressions",
            icon: <FaUsers className="text-5xl" />,
            link: "/learning/resources/phrases",
            color: "from-green-500 to-green-700",
            bgColor: "from-green-50 to-green-100"
        },
        {
            title: "Time & Days",
            description: "Tell time and discuss dates",
            icon: <FaClock className="text-5xl" />,
            link: "/learning/resources/time",
            color: "from-purple-500 to-purple-700",
            bgColor: "from-purple-50 to-purple-100"
        },
        {
            title: "Grammar Basics",
            description: "Understand sentence structure",
            icon: <FaChartBar className="text-5xl" />,
            link: "/learning/resources/grammar",
            color: "from-pink-500 to-pink-700",
            bgColor: "from-pink-50 to-pink-100"
        },
        {
            title: "Study Guide",
            description: "Tips and strategies for effective learning",
            icon: <FaBook className="text-5xl" />,
            link: "/learning/resources/study-guide",
            color: "from-indigo-500 to-indigo-700",
            bgColor: "from-indigo-50 to-indigo-100"
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50 px-4 sm:px-6 lg:px-8 pt-24 pb-16">
            <div className="max-w-7xl mx-auto">
                {/* Back Button */}
                <button
                    onClick={() => router.push("/learning")}
                    className="mb-6 flex items-center gap-2 text-gray-600 hover:text-blue-600 font-semibold transition-colors group"
                >
                    <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
                    <span>Back to Learning Hub</span>
                </button>

                {/* Header */}
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 sm:p-12 text-white shadow-xl mb-12 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full blur-3xl"></div>

                    <div className="relative z-10 text-center">
                        <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-4">
                            <FaBook className="text-blue-200" />
                            <span className="text-sm font-semibold">REFERENCE MATERIALS</span>
                        </div>
                        <h1 className="text-4xl sm:text-5xl font-bold mb-4">
                             Learning Resources
                        </h1>
                        <p className="text-xl text-blue-100 max-w-3xl mx-auto">
                            Essential materials and references to support your Punjabi learning journey
                        </p>
                    </div>
                </div>

                {/* Resources Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                    {resources.map((resource, index) => (
                        <ResourceCard key={index} resource={resource} />
                    ))}
                </div>

                {/* Info Card */}
                <div className="bg-white rounded-3xl shadow-xl p-8 sm:p-12 border-2 border-gray-100">
                    <div className="text-center max-w-3xl mx-auto">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">
                            Make the Most of These Resources
                        </h2>
                        <p className="text-lg text-gray-600 mb-8">
                            These reference materials are designed to complement your lessons. Use them to:
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-left">
                            <TipCard
                                icon="📖"
                                title="Quick Reference"
                                description="Look up words, phrases, and grammar rules on the go"
                            />
                            <TipCard
                                icon="🔄"
                                title="Review & Practice"
                                description="Reinforce what you've learned in your lessons"
                            />
                            <TipCard
                                icon="📝"
                                title="Study Notes"
                                description="Create your own notes using these as a foundation"
                            />
                            <TipCard
                                icon="🎯"
                                title="Targeted Learning"
                                description="Focus on specific areas where you need more practice"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function ResourceCard({ resource }) {
    return (
        <a href={resource.link} className="block group">
            <div className="h-full bg-white rounded-2xl border-2 border-gray-200 hover:border-gray-300 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden">
                {/* Icon Header with Gradient */}
                <div className={`bg-gradient-to-br ${resource.bgColor} p-8 text-center border-b-2 border-gray-100`}>
                    <div className={`inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br ${resource.color} rounded-2xl shadow-lg mb-4 text-white transform group-hover:scale-110 transition-transform duration-300`}>
                        {resource.icon}
                    </div>
                </div>

                {/* Content */}
                <div className="p-6 text-center">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                        {resource.title}
                    </h3>
                    <p className="text-gray-600 mb-4">
                        {resource.description}
                    </p>
                    <div className={`inline-flex items-center gap-2 text-sm font-semibold bg-gradient-to-r ${resource.color} bg-clip-text text-transparent`}>
                        <span>Explore Resource</span>
                        <span className="transform group-hover:translate-x-1 transition-transform">→</span>
                    </div>
                </div>
            </div>
        </a>
    );
}

function TipCard({ icon, title, description }) {
    return (
        <div className="flex items-start gap-4 p-4 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl border-2 border-blue-100">
            <div className="text-3xl flex-shrink-0">{icon}</div>
            <div>
                <h3 className="font-bold text-gray-900 mb-1">{title}</h3>
                <p className="text-sm text-gray-600">{description}</p>
            </div>
        </div>
    );
}