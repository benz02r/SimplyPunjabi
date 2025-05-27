"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Lesson4DoctorVisit() {
    const router = useRouter();
    const [gender, setGender] = useState("");
    const [showVisit, setShowVisit] = useState(false);
    const [showMedicine, setShowMedicine] = useState(false);

    return (
        <div className="min-h-screen bg-gradient-to-b from-white to-blue-50 pt-32 pb-20 px-6 flex flex-col items-center">
            <div className="max-w-2xl w-full bg-white rounded-xl shadow-md p-8 text-center space-y-6 hover:shadow-xl transition-all">

                <h2 className="text-2xl font-bold text-gray-800">Doctor Visits & Medicine</h2>
                <p className="text-gray-600 text-base">Learn how to talk about going to the doctor and what happened after.</p>

                {/* Ask Question */}
                <div className="bg-blue-50 p-4 rounded-lg border text-left text-sm">
                    <p className="text-lg font-semibold text-gray-800">ਤੁਸੀਂ ਡਾਕਟਰ ਕੋਲ ਗਏ ਸੀ?</p>
                    <p className="italic text-gray-600">Tusīṁ ḍākṭar kōl gae sī?</p>
                    <p className="text-gray-500">Have you been to the doctor?</p>
                </div>

                {/* Gender Select */}
                <div className="flex justify-center gap-4 mt-4">
                    <label><input type="radio" name="gender" value="male" onChange={(e) => setGender(e.target.value)} /> Male</label>
                    <label><input type="radio" name="gender" value="female" onChange={(e) => setGender(e.target.value)} /> Female</label>
                </div>

                {/* Visit Response */}
                {gender && (
                    <button
                        onClick={() => setShowVisit(true)}
                        className="mt-4 bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition"
                    >
                        Show My Doctor Visit Sentence
                    </button>
                )}

                {showVisit && (
                    <div className="bg-green-50 p-4 rounded-lg border text-left mt-4 space-y-2">
                        <p className="text-lg font-bold text-green-800">
                            {gender === "male" ? "ਮੈਂ ਡਾਕਟਰ ਕੋਲ ਗਿਆ ਸੀ।" : "ਮੈਂ ਡਾਕਟਰ ਕੋਲ ਗਈ ਸੀ।"}
                        </p>
                        <p className="italic text-green-700">
                            {gender === "male" ? "Maiṁ ḍākṭar kōl giā sī." : "Maiṁ ḍākṭar kōl gaī sī."}
                        </p>
                        <p className="text-sm text-gray-500">I went to the doctor.</p>
                    </div>
                )}

                {/* Doctor's Response Flashcards */}
                <h3 className="text-xl font-semibold mt-8 text-gray-800">What did the doctor give you?</h3>
                <div className="flex flex-col gap-4 mt-4">
                    <button
                        onClick={() => setShowMedicine("tablets")}
                        className="bg-yellow-100 border rounded-lg p-3 hover:shadow hover:border-yellow-400 transition"
                    >
                        Tablets
                    </button>
                    <button
                        onClick={() => setShowMedicine("liquid")}
                        className="bg-yellow-100 border rounded-lg p-3 hover:shadow hover:border-yellow-400 transition"
                    >
                        Liquid Medicine
                    </button>
                </div>

                {/* Medicine Sentences */}
                {showMedicine === "tablets" && (
                    <div className="bg-yellow-50 mt-4 p-4 rounded-lg border text-left space-y-2">
                        <p className="text-lg font-bold">ਡਾਕਟਰ ਨੇ ਮੈਨੂੰ ਗੋਲੀਆਂ ਦਿੱਤੀਆਂ।</p>
                        <p className="italic text-gray-700">Ḍākṭar nē mainū golīāṁ dittīāṁ.</p>
                        <p className="text-sm text-gray-500">The doctor gave me tablets.</p>
                    </div>
                )}
                {showMedicine === "liquid" && (
                    <div className="bg-yellow-50 mt-4 p-4 rounded-lg border text-left space-y-2">
                        <p className="text-lg font-bold">ਡਾਕਟਰ ਨੇ ਮੈਨੂੰ ਪੀਣ ਵਾਲੀ ਦਵਾਈ ਦਿੱਤੀ ਸੀ।</p>
                        <p className="italic text-gray-700">Ḍākṭar nē mainū pīn vālī davāī dittī sī.</p>
                        <p className="text-sm text-gray-500">The doctor gave me liquid medicine.</p>
                    </div>
                )}

                <button
                    onClick={() => router.push("/lessons/lesson14/4")}
                    className="mt-8 bg-green-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-600 transition"
                >
                    Continue →
                </button>
            </div>
        </div>
    );
}
