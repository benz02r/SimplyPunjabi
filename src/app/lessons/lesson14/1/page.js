"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Lesson4HealthIntro() {
    const router = useRouter();
    const [responseType, setResponseType] = useState(null);

    return (
        <div className="min-h-screen bg-gradient-to-b from-white to-blue-50 pt-32 pb-20 px-6 flex flex-col items-center">
            <div className="max-w-xl w-full bg-white rounded-xl shadow-md p-8 text-center space-y-6 hover:shadow-xl transition-all">

                {/* Character Intro */}
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

                <h2 className="text-2xl font-bold text-gray-800">How are you feeling today?</h2>
                <p className="text-gray-600 text-base">Let’s learn how to ask and answer questions about health in Panjabi.</p>

                {/* Ask Question */}
                <div className="bg-blue-50 p-4 rounded-lg border text-left text-sm">
                    <p className="text-lg font-semibold text-gray-800">ਤੁਹਾਡੀ ਸਿਹਤ ਠੀਕ ਹੈ?</p>
                    <p className="italic text-gray-600">Tuhāḍī sihat ṭhīk hai?</p>
                    <p className="text-gray-500">How is your health?</p>
                </div>

                {/* Response Buttons */}
                <div className="flex gap-4 justify-center mt-4">
                    <button
                        className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
                        onClick={() => setResponseType("well")}
                    >
                        I feel well
                    </button>
                    <button
                        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                        onClick={() => setResponseType("unwell")}
                    >
                        I feel unwell
                    </button>
                </div>

                {/* Response Output */}
                {responseType === "well" && (
                    <div className="mt-6 bg-green-50 border rounded p-4 text-left space-y-2">
                        <p className="text-lg text-green-800 font-semibold">ਹਾਂਜੀ, ਮੇਰੀ ਸਿਹਤ ਠੀਕ ਹੈ।</p>
                        <p className="italic text-green-700">Hāñjī, merī sihat ṭhīk hai.</p>
                        <p className="text-sm text-gray-600">Yes, my health is fine.</p>
                    </div>
                )}

                {responseType === "unwell" && (
                    <div className="mt-6 bg-red-50 border rounded p-4 text-left space-y-2">
                        <p className="text-lg text-red-800 font-semibold">ਨਹੀਂ, ਮੈਂ ਠੀਕ ਨਹੀਂ ਹਾਂ। ਮੈਂ ਬਿਮਾਰ ਹਾਂ।</p>
                        <p className="italic text-red-700">Nahīṁ, maiṁ ṭhīk nahīṁ hāṁ. Maiṁ bimār hāṁ.</p>
                        <p className="text-sm text-gray-600">No, I’m not well. I’m ill.</p>
                    </div>
                )}

                {/* Continue Button */}
                {responseType && (
                    <button
                        onClick={() => router.push("/lessons/lesson14/2")}
                        className="mt-6 bg-blue-500 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-blue-600 transition"
                    >
                        Continue →
                    </button>
                )}
            </div>
        </div>
    );
}
