"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function StepCityAndLivingPlace() {
    const router = useRouter();
    const [step, setStep] = useState(0);
    const [fromCity, setFromCity] = useState("");
    const [liveCity, setLiveCity] = useState("");
    const [gender, setGender] = useState("");

    const readyFrom = fromCity && gender;
    const readyLive = liveCity && gender;

    return (
        <div className="min-h-screen bg-gradient-to-b from-white to-blue-50 px-6 pt-36 pb-20 flex flex-col items-center">
            <div className="max-w-xl w-full bg-white rounded-xl shadow-md p-8 text-center space-y-6 hover:shadow-xl transition duration-300">
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

                {step === 0 && (
                    <>
                        <h3 className="text-xl sm:text-2xl font-bold text-gray-800">Where are you from?</h3>
                        <input
                            type="text"
                            value={fromCity}
                            placeholder="e.g. London"
                            onChange={(e) => setFromCity(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />

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

                        {readyFrom && (
                            <div className="bg-blue-50 p-4 rounded-lg border text-left space-y-2 mt-4">
                                <p className="text-lg font-semibold text-gray-800">
                                    {gender === "male"
                                        ? `ਮੈਂ ${fromCity} ਤੋਂ ਆਇਆ ਹਾਂ।`
                                        : `ਮੈਂ ${fromCity} ਤੋਂ ਆਈ ਹਾਂ।`}
                                </p>
                                <p className="text-sm italic text-gray-600">
                                    {gender === "male"
                                        ? `Main ${fromCity} ton āiā haan.`
                                        : `Main ${fromCity} ton āī haan.`}
                                </p>
                                <p className="text-sm text-gray-500">I am from {fromCity}.</p>
                            </div>
                        )}

                        <button
                            disabled={!readyFrom}
                            onClick={() => setStep(1)}
                            className={`mt-4 w-full px-6 py-3 text-white text-lg font-semibold rounded transition ${
                                readyFrom
                                    ? "bg-green-500 hover:bg-green-600 hover:scale-105"
                                    : "bg-gray-400 cursor-not-allowed"
                            }`}
                        >
                            Next →
                        </button>
                    </>
                )}

                {step === 1 && (
                    <>
                        <h3 className="text-xl sm:text-2xl font-bold text-gray-800">Where do you live now?</h3>
                        <input
                            type="text"
                            value={liveCity}
                            placeholder="e.g. Birmingham"
                            onChange={(e) => setLiveCity(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />

                        {readyLive && (
                            <div className="bg-blue-50 p-4 rounded-lg border text-left space-y-2 mt-4">
                                <p className="text-lg font-semibold text-gray-800">
                                    {gender === "male"
                                        ? `ਮੈਂ ${liveCity} ਵਿੱਚ ਰਹਿੰਦਾ ਹਾਂ।`
                                        : `ਮੈਂ ${liveCity} ਵਿੱਚ ਰਹਿੰਦੀ ਹਾਂ।`}
                                </p>
                                <p className="text-sm italic text-gray-600">
                                    {gender === "male"
                                        ? `Main ${liveCity} vich rahindā haan.`
                                        : `Main ${liveCity} vich rahindī haan.`}
                                </p>
                                <p className="text-sm text-gray-500">I live in {liveCity}.</p>
                            </div>
                        )}

                        <div className="bg-yellow-50 p-4 rounded-lg border mt-4 text-left text-sm">
                            <p className="mb-2 font-medium">Examples:</p>
                            <ul className="list-disc ml-5">
                                <li>
                                    Aman lives in Southall: <br />
                                    <strong>ਮੈਂ Southall ਵਿੱਚ ਰਹਿੰਦਾ ਹਾਂ।</strong> <br />
                                    (Maiṁ Southall vich rahindā hāṁ)
                                </li>
                                <li className="mt-2">
                                    Priya lives in Birmingham: <br />
                                    <strong>ਮੈਂ Birmingham ਵਿੱਚ ਰਹਿੰਦੀ ਹਾਂ।</strong> <br />
                                    (Maiṁ Birmingham vich rahindī hāṁ)
                                </li>
                            </ul>
                        </div>

                        <button
                            disabled={!readyLive}
                            onClick={() => router.push("/lessons/lesson3/5")}
                            className={`mt-6 w-full px-6 py-3 text-white text-lg font-semibold rounded transition ${
                                readyLive
                                    ? "bg-green-500 hover:bg-green-600 hover:scale-105"
                                    : "bg-gray-400 cursor-not-allowed"
                            }`}
                        >
                            Continue →
                        </button>
                    </>
                )}
            </div>
        </div>
    );
}
