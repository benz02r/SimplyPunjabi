"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const steps = [
    {
        avatar: "/avatars/avatar6.png",
        speaker: "Aman",
        title: "Sat Sri Akaal (ਸਤ ਸ੍ਰੀ ਅਕਾਲ)",
        roman: "Sat Sri Akaal",
        meaning: "A respectful greeting meaning 'God is the Eternal Truth'."
    },
    {
        avatar: "/avatars/avatar5.png",
        speaker: "Priya",
        title: "Ki Haal Aa? (ਕੀ ਹਾਲ ਆ?)",
        roman: "Ki haal aa?",
        meaning: "Casual greeting — ‘How are you?’"
    },
    {
        avatar: "/avatars/avatar6.png",
        speaker: "Aman",
        title: "Kidan? (ਕਿੱਧਾਂ?)",
        roman: "Kidan?",
        meaning: "Informal — ‘What’s up?’"
    },
    {
        avatar: "/avatars/avatar5.png",
        speaker: "Priya",
        title: "Tusi Kidan Teekya? (ਤੁਸੀਂ ਕਿਵੇਂ ਟਿਕਿਆ?)",
        roman: "Tusi kidan teekya?",
        meaning: "Formal — ‘How have you been?’"
    }
];

export default function GreetingSteps() {
    const router = useRouter();
    const [step, setStep] = useState(0);
    const current = steps[step];

    return (
        <div className="min-h-screen bg-gradient-to-b from-white to-blue-50 px-6 pt-36 pb-20 flex flex-col items-center">
            <div className="max-w-xl w-full bg-white rounded-xl shadow-md p-8 text-center space-y-6 hover:shadow-xl hover:scale-[1.01] transition duration-300">
                {/* Avatar and Speaker */}
                <div className="flex flex-col items-center">
                    <div className="relative w-20 h-20">
                        <Image
                            src={current.avatar}
                            alt={current.speaker}
                            fill
                            className="rounded-full object-cover border-2 border-blue-500"
                        />
                    </div>
                    <h2 className="text-xl font-bold text-blue-600 mt-2">{current.speaker} teaches:</h2>
                </div>

                {/* Phrase Content */}
                <h3 className="text-2xl font-bold text-[var(--primary)]">{current.title}</h3>
                <p className="italic text-gray-700">{current.roman}</p>
                <p className="text-gray-600">{current.meaning}</p>

                {/* Navigation */}
                {step < steps.length - 1 ? (
                    <button
                        onClick={() => setStep((s) => s + 1)}
                        className="bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-600 hover:scale-105 transition"
                    >
                        Next →
                    </button>
                ) : (
                    <button
                        onClick={() => router.push("/lessons/lesson2/2")}
                        className="bg-green-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-600 hover:scale-105 transition"
                    >
                        Try match the words →
                    </button>
                )}
            </div>
        </div>
    );
}
