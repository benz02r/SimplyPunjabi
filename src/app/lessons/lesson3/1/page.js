"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function AboutMeIntroPage() {
    const [step, setStep] = useState(0);
    const router = useRouter();

    const steps = [
        {
            avatar: "/avatars/avatar6.png",
            speaker: "Aman",
            heading: "Welcome to 'A Bit About Me'",
            showBoth: true,
            text: "In this section, we will teach you how to introduce and talk a little about yourself in Punjabi. This\n" +
                "includes stuff such as:\n             " +
                "          How to say your name\n" +
                " How to say how old you are\n" +
                " How to say where you are from and what city you live in?\n" +
                " How to tell someone where you study or where you work?\n" +
                " How many siblings you have\n" +
                "To make it easier for you, we will be using Aman and Priya as a few examples. At the end, you\n" +
                "will be able to test your knowledge through a range of multiple-choice questions and more.",
        },


    ];

    const current = steps[step];

    return (
        <div className="min-h-screen bg-gradient-to-b from-white to-blue-50 px-6 pt-36 pb-20 flex flex-col items-center">
            <div className="max-w-xl w-full bg-white rounded-xl shadow-md p-8 text-center space-y-6 transition-all hover:shadow-xl hover:scale-[1.01] duration-300">

                {/* Avatars */}
                {!current.showBoth ? (
                    <div className="flex flex-col items-center">
                        <div className="relative w-20 h-20">
                            <Image
                                src={current.avatar}
                                alt={current.speaker}
                                fill
                                className="rounded-full border-2 border-blue-500 object-cover"
                            />
                        </div>
                        <h2 className="text-xl font-bold text-blue-600 mt-2">{current.speaker} says:</h2>
                    </div>
                ) : (
                    <div className="flex justify-center gap-6">
                        <div className="flex flex-col items-center">
                            <Image src="/avatars/avatar6.png" alt="Aman" width={70} height={70} className="rounded-full border border-blue-500" />
                            <p className="text-sm font-semibold text-blue-600 mt-1">Aman</p>
                        </div>
                        <div className="flex flex-col items-center">
                            <Image src="/avatars/avatar5.png" alt="Priya" width={70} height={70} className="rounded-full border border-pink-500" />
                            <p className="text-sm font-semibold text-pink-600 mt-1">Priya</p>
                        </div>
                    </div>
                )}

                {/* Text Content */}
                <div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">{current.heading}</h3>
                    <p className="text-md text-gray-700">{current.text}</p>
                </div>

                {/* Button */}
                {step < steps.length - 1 ? (
                    <button
                        onClick={() => setStep(step + 1)}
                        className="bg-blue-500 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-blue-600 hover:scale-105 transition"
                    >
                        Next →
                    </button>
                ) : (
                    <button
                        onClick={() => router.push("/lessons/lesson3/2")}
                        className="bg-green-500 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-green-600 hover:scale-105 transition"
                    >
                        Let’s Begin →
                    </button>
                )}
            </div>
        </div>
    );
}
