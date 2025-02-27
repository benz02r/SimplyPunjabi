"use client";

import Link from "next/link";

export default function LearnMore() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-100 to-white text-gray-900 px-6 pt-36 pb-12">

            {/* Header Section */}
            <div className="text-center max-w-3xl mb-12">
                <h1 className="text-4xl md:text-5xl font-extrabold text-[var(--primary)] leading-tight">
                    Learn More About <span className="text-orange-400">Simply Punjabi</span>
                </h1>
                <p className="text-lg mt-3 text-gray-700">
                    Master Punjabi in a fun, interactive, and personalized way!
                </p>
            </div>

            {/* Info Sections */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl">
                <InfoCard
                    title="🎓 What is Simply Punjabi?"
                    text="Simply Punjabi is an interactive language-learning platform designed for English speakers who want to master Punjabi. Whether you're a beginner or improving your fluency, we have lessons for all levels."
                />
                <InfoCard
                    title="💰 Subscription Details"
                    text='Simply Punjabi is a <strong>paid platform</strong> at <span class="text-orange-400 font-bold">£3 per month</span>. We are currently in beta, but new content is added <strong>monthly</strong>.'
                />
                <InfoCard
                    title="🚀 Why Subscribe?"
                    list={[
                        "Unlimited access to lessons",
                        "Personalized learning paths",
                        "Varying levels of difficulty",
                        "New lessons added every month",
                        "Community-driven features based on user feedback",
                    ]}
                />
                <InfoCard
                    title="🎮 Try It Before You Buy"
                    text='Explore our <a href="/" class="text-[var(--primary)] font-semibold hover:underline">Featured Lessons</a> to test a limited version before subscribing!'
                />
            </div>

            {/* FAQ Section */}
            <div className="mt-12 bg-white rounded-lg shadow-lg p-8 max-w-4xl w-full border-2 border-gray-200 transition-all hover:border-[3px] hover:border-orange-400 hover:shadow-xl">
                <h2 className="text-2xl md:text-3xl font-bold text-[var(--primary)]">❓ Frequently Asked Questions</h2>
                <div className="mt-4 space-y-4">
                    {[
                        { question: "Is there a free version?", answer: "Yes! You can try our featured lessons before subscribing." },
                        { question: "How often is new content added?", answer: "We add fresh content every month, including lessons and new features." },
                        { question: "Can I cancel anytime?", answer: "Yes! You can cancel your subscription at any time with no penalties." },
                    ].map((faq, index) => (
                        <details
                            key={index}
                            className="p-4 bg-gray-100 rounded-lg cursor-pointer transition-all hover:bg-gray-200 open:bg-gray-300 open:shadow-md"
                        >
                            <summary className="font-semibold text-lg">{faq.question}</summary>
                            <p className="text-gray-700 mt-2">{faq.answer}</p>
                        </details>
                    ))}
                </div>
            </div>

            {/* Buttons Section */}
            <div className="mt-12 w-full max-w-md flex flex-col space-y-4">
                {/* Back to Home Button (Blue Button) */}
                <button
                    onClick={() => window.location.href = "/"}
                    className="w-full bg-blue-500 text-white px-6 py-3 rounded-lg text-lg font-semibold shadow-md hover:bg-blue-600 transition transform hover:scale-105"
                >
                    ← Back to Home
                </button>

                {/* CTA Button */}
                <Link href="/signup">
                    <button className="w-full bg-[var(--primary)] text-white px-6 py-3 rounded-lg text-lg font-semibold shadow-md hover:bg-[var(--secondary)] transition transform hover:scale-105">
                        Sign Up Now 🚀
                    </button>
                </Link>
            </div>
        </div>
    );
}

// ✅ Reusable Information Card Component
function InfoCard({ title, text, list }) {
    return (
        <div className="p-8 bg-white rounded-lg shadow-md border-2 border-gray-200 transition-all hover:border-[3px] hover:border-orange-400 hover:shadow-xl">
            <h3 className="text-2xl font-bold text-[var(--primary)]">{title}</h3>
            {text && <p className="text-gray-700 mt-3 text-lg" dangerouslySetInnerHTML={{ __html: text }} />}
            {list && (
                <ul className="mt-3 text-gray-700 text-lg space-y-2">
                    {list.map((item, index) => (
                        <li key={index} className="flex items-center gap-2">
                            <span className="text-green-500 text-2xl">✔️</span> {item}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
