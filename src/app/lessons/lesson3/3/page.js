"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function StepAge() {
    const router = useRouter();
    const [age, setAge] = useState("");
    const [gender, setGender] = useState("");
    const [showSentence, setShowSentence] = useState(false);

    const handleContinue = () => {
        if (age && gender) {
            setShowSentence(true);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-white to-blue-50 px-6 pt-36 pb-20 flex flex-col items-center">
            <div className="max-w-xl w-full bg-white rounded-xl shadow-md p-8 text-center space-y-6 hover:shadow-xl hover:scale-[1.01] transition duration-300">
                {/* Aman Avatar */}
                <div className="flex flex-col items-center">
                    <div className="relative w-20 h-20">
                        <Image
                            src="/avatars/avatar6.png"
                            alt="Aman"
                            fill
                            className="rounded-full object-cover border-2 border-blue-500"
                        />
                    </div>
                    <h2 className="text-xl font-bold text-blue-600 mt-2">Aman says:</h2>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-gray-800">
                    How do you tell someone your age in Punjabi?
                </h3>
                <p className="text-gray-600">
                    After your name, someone might ask: <br />
                    <strong>Tuhāḍī umar kinnī hai?</strong><br />
                    <span className="text-sm">ਤੁਹਾਡੀ ਉਮਰ ਕਿੰਨੀ ਹੈ?</span><br />
                    <em>How old are you?</em>
                </p>

                {/* Input + Gender */}
                <input
                    type="number"
                    min="1"
                    max="120"
                    placeholder="Enter your age"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                />

                <div className="flex gap-4 justify-center">
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
                        disabled={!age || !gender}
                        className={`w-full mt-4 px-6 py-3 text-white text-lg font-semibold rounded transition ${
                            age && gender
                                ? "bg-blue-500 hover:bg-blue-600 hover:scale-105"
                                : "bg-gray-400 cursor-not-allowed"
                        }`}
                    >
                        Show me how →
                    </button>
                ) : (
                    <>
                        {/* Output */}
                        <div className="bg-blue-50 p-4 rounded-lg border text-left space-y-2 mt-4">
                            <p className="text-lg font-semibold text-gray-800">
                                {gender === "male"
                                    ? `ਮੈਂ ${age} ਸਾਲਾਂ ਦਾ ਹਾਂ।`
                                    : `ਮੈਂ ${age} ਸਾਲਾਂ ਦੀ ਹਾਂ।`}
                            </p>
                            <p className="text-sm italic text-gray-600">
                                {gender === "male"
                                    ? `Main ${age} saalan da haan.`
                                    : `Main ${age} saalan di haan.`}
                            </p>
                            <p className="text-sm text-gray-500">
                                I am {age} years old.
                            </p>
                        </div>

                        {/* Tip + Examples */}
                        <div className="text-left bg-yellow-50 p-4 rounded-lg border border-yellow-300 mt-4 text-sm">
                            <p><strong>Tip:</strong> Use <em>“ਦਾ”</em> if you're a boy and <em>“ਦੀ”</em> if you're a girl.</p>
                            <p className="mt-2"><strong>Example:</strong></p>
                            <ul className="list-disc ml-5 space-y-1">
                                <li>Aman is 25: <br />ਮੈਂ 25 ਸਾਲਾਂ ਦਾ ਹਾਂ। (Maiṁ pacchī sālāṁ dā hāṁ)</li>
                                <li>Priya is 23: <br />ਮੈਂ 23 ਸਾਲਾਂ ਦੀ ਹਾਂ। (Maiṁ teī sālāṁ dī hāṁ)</li>
                            </ul>
                            <p className="mt-2"><em>Now think about how you would say your age in Punjabi.</em></p>
                            <p className="mt-1 font-semibold text-blue-700">Top Tip: Check out the ‘Numbers Chart’ in Learning Resources!</p>
                        </div>

                        <button
                            onClick={() => router.push("/lessons/lesson3/4")}
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
