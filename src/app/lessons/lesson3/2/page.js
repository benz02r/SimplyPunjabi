"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function StepYourName() {
    const router = useRouter();
    const [name, setName] = useState("");
    const [showSentence, setShowSentence] = useState(false);

    const handleContinue = () => {
        if (name.trim().length > 0) {
            setShowSentence(true);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-white to-blue-50 px-6 pt-36 pb-20 flex flex-col items-center">
            <div className="max-w-xl w-full bg-white rounded-xl shadow-md p-8 text-center space-y-6 hover:shadow-xl hover:scale-[1.01] transition duration-300">
                {/* Priya Avatar + Prompt */}
                <div className="flex flex-col items-center">
                    <div className="relative w-20 h-20">
                        <Image
                            src="/avatars/avatar5.png"
                            alt="Priya"
                            fill
                            className="rounded-full object-cover border-2 border-pink-500"
                        />
                    </div>
                    <h2 className="text-xl font-bold text-pink-600 mt-2">Priya asks:</h2>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-gray-800">What’s your name?</h3>
                <p className="text-gray-600">Type your name below to learn how to say it in Punjabi!</p>

                <input
                    type="text"
                    value={name}
                    placeholder="e.g. Aman"
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                />

                {!showSentence ? (
                    <button
                        onClick={handleContinue}
                        disabled={!name}
                        className={`w-full px-6 py-3 text-white text-lg font-semibold rounded transition ${
                            name
                                ? "bg-blue-500 hover:bg-blue-600 hover:scale-105"
                                : "bg-gray-400 cursor-not-allowed"
                        }`}
                    >
                        Show me how →
                    </button>
                ) : (
                    <>
                        {/* Sentence Display */}
                        <div className="bg-blue-50 p-4 rounded-lg border text-left space-y-2">
                            <p className="text-lg text-gray-800 font-semibold">
                                ਮੇਰਾ ਨਾਮ {name} ਹੈ।
                            </p>
                            <p className="text-sm italic text-gray-600">
                                Mera naam {name} hai.
                            </p>
                            <p className="text-sm text-gray-500">
                                My name is {name}.
                            </p>
                        </div>

                        <button
                            onClick={() => router.push("/lessons/lesson3/3")}
                            className="mt-6 bg-green-500 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-green-600 hover:scale-105 transition"
                        >
                            Next →
                        </button>
                    </>
                )}
            </div>
        </div>
    );
}
