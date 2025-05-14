"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function StepCity() {
    const router = useRouter();
    const [city, setCity] = useState("");
    const [gender, setGender] = useState("");
    const [showSentence, setShowSentence] = useState(false);

    const handleContinue = () => {
        if (city && gender) {
            setShowSentence(true);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-white to-blue-50 px-6 pt-36 pb-20 flex flex-col items-center">
            <div className="max-w-xl w-full bg-white rounded-xl shadow-md p-8 text-center space-y-6 hover:shadow-xl hover:scale-[1.01] transition duration-300">
                {/* Priya Avatar */}
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

                {/* Prompt */}
                <h3 className="text-xl sm:text-2xl font-bold text-gray-800">Where are you from?</h3>
                <input
                    type="text"
                    value={city}
                    placeholder="e.g. London"
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                />

                {/* Gender Selector */}
                <div className="flex gap-4 justify-center mt-2">
                    <label className="flex items-center gap-2">
                        <input
                            type="radio"
                            name="gender"
                            value="male"
                            checked={gender === "male"}
                            onChange={(e) => setGender(e.target.value)}
                        />
                        Male
                    </label>
                    <label className="flex items-center gap-2">
                        <input
                            type="radio"
                            name="gender"
                            value="female"
                            checked={gender === "female"}
                            onChange={(e) => setGender(e.target.value)}
                        />
                        Female
                    </label>
                </div>

                {!showSentence ? (
                    <button
                        onClick={handleContinue}
                        disabled={!city || !gender}
                        className={`w-full mt-4 px-6 py-3 text-white text-lg font-semibold rounded transition ${
                            city && gender
                                ? "bg-blue-500 hover:bg-blue-600 hover:scale-105"
                                : "bg-gray-400 cursor-not-allowed"
                        }`}
                    >
                        Show me how →
                    </button>
                ) : (
                    <>
                        {/* Sentence Output */}
                        <div className="bg-blue-50 p-4 rounded-lg border text-left space-y-2 mt-4">
                            <p className="text-lg font-semibold text-gray-800">
                                {gender === "male"
                                    ? `ਮੈਂ ${city} ਤੋਂ ਆਇਆ ਹਾਂ।`
                                    : `ਮੈਂ ${city} ਤੋਂ ਆਈ ਹਾਂ।`}
                            </p>
                            <p className="text-sm italic text-gray-600">
                                {gender === "male"
                                    ? `Main ${city} ton āiā haan.`
                                    : `Main ${city} ton āī haan.`}
                            </p>
                            <p className="text-sm text-gray-500">I am from {city}.</p>
                        </div>

                        <button
                            onClick={() => router.push("/lessons/lesson3/5")}
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
