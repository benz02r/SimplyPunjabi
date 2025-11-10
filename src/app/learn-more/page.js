"use client";

import { FaCheck, FaRocket, FaUsers, FaChartLine, FaGraduationCap, FaHeart, FaQuestionCircle, FaStar } from "react-icons/fa";

export default function LearnMore() {
    const features = [
        { icon: <FaRocket className="text-3xl" />, title: "Quick Progress", description: "See results in just weeks with our proven method" },
        { icon: <FaUsers className="text-3xl" />, title: "Community Support", description: "Learn alongside others on the same journey" },
        { icon: <FaChartLine className="text-3xl" />, title: "Track Growth", description: "Monitor your improvement with detailed analytics" },
        { icon: <FaGraduationCap className="text-3xl" />, title: "Expert Content", description: "Lessons crafted by native speakers and educators" }
    ];

    const benefits = [
        "Unlimited access to all lessons",
        "Personalized learning paths tailored to you",
        "Varying levels from beginner to advanced",
        "New lessons added every month",
        "Community-driven features based on feedback",
        "Cultural insights and real-world context"
    ];

    const faqs = [
        {
            question: "Is there a free version?",
            answer: "Yes! You can try our featured lessons before subscribing to get a feel for our teaching style and platform."
        },
        {
            question: "How often is new content added?",
            answer: "We add fresh content every month, including new lessons, exercises, and features based on community feedback."
        },
        {
            question: "Can I cancel anytime?",
            answer: "Absolutely! You can cancel your subscription at any time with no penalties or hidden fees."
        },
        {
            question: "What makes Simply Punjabi different?",
            answer: "We focus on real conversations and cultural context, not just vocabulary. Our interactive approach helps you actually speak Punjabi, not just study it."
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50">
            {/* Hero Section */}
            <section className="px-4 sm:px-6 lg:px-8 pt-32 sm:pt-40 pb-16">
                <div className="max-w-6xl mx-auto text-center">
                    <div className="inline-block mb-6">
                        <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-orange-400 blur-3xl opacity-20"></div>
                            <img
                                src="/Website Banner(shadowing)- Simply Punjabi, Ryan.png"
                                alt="Simply Punjabi Banner"
                                className="relative w-full max-w-[500px] mx-auto object-contain drop-shadow-2xl"
                            />
                        </div>
                    </div>

                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                        Master Punjabi in a{" "}
                        <span className="bg-gradient-to-r from-blue-600 to-orange-500 bg-clip-text text-transparent">
                            Fun & Interactive
                        </span>
                        {" "}Way
                    </h1>

                    <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
                        Join thousands of learners who are achieving fluency through our personalized, engaging platform designed specifically for English speakers
                    </p>

                    {/* Pricing Highlight */}
                    <div className="inline-block bg-gradient-to-r from-blue-600 to-orange-500 rounded-2xl p-1 shadow-xl">
                        <div className="bg-white rounded-xl px-8 py-6">
                            <p className="text-sm text-gray-600 font-semibold mb-1">SPECIAL BETA PRICING</p>
                            <p className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-orange-500 bg-clip-text text-transparent mb-2">
                                £2.99<span className="text-2xl">/month</span>
                            </p>
                            <p className="text-gray-600">Full access • Cancel anytime</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Grid */}
            <section className="px-4 sm:px-6 lg:px-8 py-16 bg-white">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose Simply Punjabi?</h2>
                        <p className="text-xl text-gray-600">Everything you need to master the language</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {features.map((feature, index) => (
                            <div key={index} className="p-6 bg-gradient-to-br from-blue-50 to-orange-50 rounded-2xl border-2 border-gray-100 hover:border-blue-300 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                                <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center mb-4 text-blue-600 shadow-md">
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                                <p className="text-gray-600">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* What's Included Section */}
            <section className="px-4 sm:px-6 lg:px-8 py-16">
                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        {/* Left - Benefits List */}
                        <div>
                            <div className="inline-flex items-center gap-2 bg-blue-100 px-4 py-2 rounded-full mb-4">
                                <FaStar className="text-blue-600" />
                                <span className="text-blue-800 font-semibold text-sm">WHAT'S INCLUDED</span>
                            </div>
                            <h2 className="text-4xl font-bold text-gray-900 mb-6">
                                Everything You Need to Succeed
                            </h2>
                            <p className="text-lg text-gray-600 mb-8">
                                Your subscription unlocks a complete learning ecosystem designed to take you from beginner to confident speaker.
                            </p>

                            <div className="space-y-4">
                                {benefits.map((benefit, index) => (
                                    <div key={index} className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
                                        <div className="flex-shrink-0 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                                            <FaCheck className="text-white text-sm" />
                                        </div>
                                        <p className="text-gray-700 font-medium pt-0.5">{benefit}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Right - Info Card */}
                        <div className="space-y-6">
                            <div className="bg-white rounded-2xl shadow-xl border-2 border-gray-100 overflow-hidden">
                                <div className="bg-gradient-to-r from-blue-600 to-orange-500 px-8 py-6">
                                    <h3 className="text-2xl font-bold text-white mb-2">What is Simply Punjabi?</h3>
                                    <p className="text-blue-50">Your gateway to Punjabi fluency</p>
                                </div>
                                <div className="p-8">
                                    <p className="text-gray-700 text-lg leading-relaxed">
                                        Simply Punjabi is an interactive language-learning platform designed for English speakers who want to master Punjabi. Whether you're a complete beginner or improving your fluency, we have personalized lessons for all levels.
                                    </p>
                                </div>
                            </div>

                            <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl p-8 text-white shadow-xl">
                                <FaHeart className="text-4xl mb-4" />
                                <h3 className="text-2xl font-bold mb-3">Beta Special</h3>
                                <p className="text-orange-100 mb-4">
                                    We're currently in beta, which means you get to shape the future of Simply Punjabi with your feedback while enjoying special pricing!
                                </p>
                                <div className="bg-white/20 rounded-lg px-4 py-3">
                                    <p className="text-sm font-semibold"> Early adopter benefits included</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Try Before You Buy */}
            <section className="px-4 sm:px-6 lg:px-8 py-16 bg-white">
                <div className="max-w-4xl mx-auto text-center">
                    <div className="bg-gradient-to-br from-blue-50 to-orange-50 rounded-3xl p-12 border-2 border-blue-200 shadow-lg">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">
                            Not Sure Yet? Try It First!
                        </h2>
                        <p className="text-lg text-gray-600 mb-8">
                            Explore our featured lessons to test the platform before subscribing. Experience our teaching style and see if it's right for you!
                        </p>
                        <a href="/">
                            <button className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-10 py-4 rounded-xl text-lg font-bold shadow-lg hover:shadow-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 transform hover:scale-105">
                                Explore Featured Lessons
                            </button>
                        </a>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="px-4 sm:px-6 lg:px-8 py-16">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center gap-2 bg-blue-100 px-4 py-2 rounded-full mb-4">
                            <FaQuestionCircle className="text-blue-600" />
                            <span className="text-blue-800 font-semibold text-sm">FAQ</span>
                        </div>
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">
                            Frequently Asked Questions
                        </h2>
                        <p className="text-lg text-gray-600">Everything you need to know about Simply Punjabi</p>
                    </div>

                    <div className="space-y-4">
                        {faqs.map((faq, index) => (
                            <details
                                key={index}
                                className="group bg-white rounded-2xl shadow-md border-2 border-gray-100 hover:border-blue-300 transition-all duration-300 overflow-hidden"
                            >
                                <summary className="p-6 cursor-pointer font-bold text-lg text-gray-900 flex items-center justify-between hover:text-blue-600 transition-colors">
                                    <span>{faq.question}</span>
                                    <span className="text-blue-600 group-open:rotate-180 transition-transform duration-300">▼</span>
                                </summary>
                                <div className="px-6 pb-6 pt-0">
                                    <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                                </div>
                            </details>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="px-4 sm:px-6 lg:px-8 py-16 bg-gradient-to-r from-blue-600 to-orange-500">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
                        Ready to Start Your Journey?
                    </h2>
                    <p className="text-xl text-blue-50 mb-10">
                        Join Simply Punjabi today and start speaking with confidence
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                        <a href="/key-functions/signup" className="w-full sm:w-auto">
                            <button className="w-full sm:w-auto bg-white text-blue-600 px-10 py-4 rounded-xl text-lg font-bold shadow-lg hover:shadow-xl hover:bg-gray-50 transition-all duration-300 transform hover:scale-105">
                                Sign Up Now
                            </button>
                        </a>
                        <a href="/" className="w-full sm:w-auto">
                            <button className="w-full sm:w-auto bg-transparent border-2 border-white text-white px-10 py-4 rounded-xl text-lg font-bold hover:bg-white hover:text-blue-600 transition-all duration-300 transform hover:scale-105">
                                Back to Home
                            </button>
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
}