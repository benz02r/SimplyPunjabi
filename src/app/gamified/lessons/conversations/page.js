"use client";

import { useState } from "react";

const conversations = [
    {
        id: "greetings",
        title: "Greetings & Introductions",
        dialogue: [
            { english: "Hello! How are you?", punjabi: "Sat Sri Akal! Tusi kiven ho?" },
            { english: "I’m good, thank you!", punjabi: "Main theek haan, dhanvaad!" },
            { english: "What’s your name?", punjabi: "Tuhada naam ki hai?" },
            { english: "My name is Alex.", punjabi: "Mera naam Alex hai." },
            { english: "Nice to meet you!", punjabi: "Tuhanu milke bahut khushi hoyi!" },
        ],
    },
    {
        id: "ordering-food",
        title: "Ordering Food at a Restaurant",
        dialogue: [
            { english: "Excuse me, can I see the menu?", punjabi: "Maaf karo, menu vekh sakda haan?" },
            { english: "I would like a cup of tea.", punjabi: "Main ik cup chaah laavaan." },
            { english: "How much does it cost?", punjabi: "Eh kinne da hai?" },
            { english: "Thank you very much!", punjabi: "Bahut dhanvaad!" },
        ],
    },
    {
        id: "directions",
        title: "Asking for Directions",
        dialogue: [
            { english: "Excuse me, where is the market?", punjabi: "Maaf karo, bazar kithe hai?" },
            { english: "Go straight and turn left.", punjabi: "Sidha jao te khabbay murho." },
            { english: "Is it far from here?", punjabi: "Ki eh ithon door hai?" },
            { english: "No, it's very close.", punjabi: "Nahi, eh bahut najdeek hai." },
        ],
    },
];

export default function Conversations() {
    const [selectedConversation, setSelectedConversation] = useState(null);
    const [currentStep, setCurrentStep] = useState(0);

    const startConversation = (id) => {
        setSelectedConversation(id);
        setCurrentStep(0);
    };

    const nextStep = () => {
        const conversation = conversations.find((c) => c.id === selectedConversation);
        if (currentStep < conversation.dialogue.length - 1) {
            setCurrentStep(currentStep + 1);
        }
    };

    const goBack = () => {
        setSelectedConversation(null);
        setCurrentStep(0);
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-6 py-10">
            <div className="max-w-3xl w-full bg-white shadow-xl rounded-xl p-8 border border-gray-200">
                <h2 className="text-3xl font-bold text-center text-[var(--primary)] mb-6">
                    Real-World Punjabi Conversations 🗣️
                </h2>

                {/* Select a Conversation */}
                {!selectedConversation ? (
                    <div className="grid gap-4">
                        {conversations.map(({ id, title }) => (
                            <button
                                key={id}
                                onClick={() => startConversation(id)}
                                className="w-full p-4 bg-gray-100 text-lg font-semibold rounded-lg shadow text-gray-700 cursor-pointer hover:bg-[var(--primary)] hover:text-white transition-all duration-200"
                            >
                                {title}
                            </button>
                        ))}
                    </div>
                ) : (
                    <div>
                        {/* Conversation Dialogue */}
                        <div className="bg-gray-100 p-6 rounded-lg shadow-md text-center">
                            <p className="text-xl font-semibold text-gray-800 mb-2">
                                {conversations.find((c) => c.id === selectedConversation).dialogue[currentStep].english}
                            </p>
                            <p className="text-xl font-semibold text-[var(--primary)]">
                                {conversations.find((c) => c.id === selectedConversation).dialogue[currentStep].punjabi}
                            </p>
                        </div>

                        {/* Navigation Buttons */}
                        <div className="mt-6 flex justify-center space-x-4">
                            {currentStep > 0 && (
                                <button
                                    onClick={() => setCurrentStep(currentStep - 1)}
                                    className="bg-gray-400 text-white px-6 py-3 rounded-full font-semibold hover:bg-gray-500 transition-all duration-200"
                                >
                                    Back
                                </button>
                            )}
                            {currentStep < conversations.find((c) => c.id === selectedConversation).dialogue.length - 1 ? (
                                <button
                                    onClick={nextStep}
                                    className="bg-[var(--primary)] text-white px-6 py-3 rounded-full font-semibold hover:opacity-80 transition-all duration-200"
                                >
                                    Next
                                </button>
                            ) : (
                                <button
                                    onClick={goBack}
                                    className="bg-red-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-red-600 transition-all duration-200"
                                >
                                    Finish
                                </button>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
