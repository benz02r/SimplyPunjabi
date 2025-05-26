"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function StepWorkAndSiblings() {
    const router = useRouter();
    const [step, setStep] = useState(0);

    // State for study/work
    const [mode, setMode] = useState("");
    const [place, setPlace] = useState("");
    const [gender, setGender] = useState("");

    // State for siblings
    const [olderBrothers, setOlderBrothers] = useState(0);
    const [youngerSisters, setYoungerSisters] = useState(0);

    const renderWorkOrStudy = () => {
        const show = place && gender && mode;
        const punjabi = mode === "study"
            ? gender === "male"
                ? `ਮੈਂ ${place} ਪੜ੍ਹਦਾ ਹਾਂ।`
                : `ਮੈਂ ${place} ਪੜ੍ਹਦੀ ਹਾਂ।`
            : gender === "male"
                ? `ਮੈਂ ${place} ਲਈ ਕੰਮ ਕਰਦਾ ਹਾਂ।`
                : `ਮੈਂ ${place} ਲਈ ਕੰਮ ਕਰਦੀ ਹਾਂ।`;
        const translit = mode === "study"
            ? gender === "male"
                ? `Main ${place} paṛhdā hāṁ.`
                : `Main ${place} paṛhdī hāṁ.`
            : gender === "male"
                ? `Main ${place} laī kam kardā hāṁ.`
                : `Main ${place} laī kam kardī hāṁ.`;
        const english = mode === "study"
            ? `I study at ${place}.`
            : `I work at ${place}.`;

        return (
            <div className="space-y-6 text-center">
                <h2 className="text-2xl font-bold">Where do you study or work?</h2>
                <div className="flex justify-center gap-4">
                    <label><input type="radio" name="mode" value="study" onChange={() => setMode("study")} /> Study</label>
                    <label><input type="radio" name="mode" value="work" onChange={() => setMode("work")} /> Work</label>
                </div>
                <input
                    type="text"
                    placeholder="e.g. Heathrow Airport"
                    value={place}
                    onChange={(e) => setPlace(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded"
                />
                <div className="flex justify-center gap-4">
                    <label><input type="radio" name="gender" value="male" onChange={(e) => setGender(e.target.value)} /> Male</label>
                    <label><input type="radio" name="gender" value="female" onChange={(e) => setGender(e.target.value)} /> Female</label>
                </div>

                {show && (
                    <div className="bg-blue-50 p-4 rounded border text-left mt-4">
                        <p className="text-lg font-bold">{punjabi}</p>
                        <p className="italic text-sm">{translit}</p>
                        <p className="text-sm text-gray-500">{english}</p>
                    </div>
                )}

                {show && (
                    <div className="bg-yellow-50 p-4 rounded text-left text-sm mt-4">
                        <p><strong>Example:</strong></p>
                        <p>Aman would say: <br /><em>ਮੈਂ Heathrow Airport ਲਈ ਕੰਮ ਕਰਦਾ ਹਾਂ।</em></p>
                        <p>Priya would say: <br /><em>ਮੈਂ Heathrow Airport ਲਈ ਕੰਮ ਕਰਦੀ ਹਾਂ।</em></p>
                    </div>
                )}

                {show && (
                    <button
                        onClick={() => setStep(1)}
                        className="bg-green-500 text-white px-6 py-3 mt-4 rounded-lg"
                    >
                        Next →
                    </button>
                )}
            </div>
        );
    };

    const renderSiblings = () => {
        const hasSiblings = olderBrothers > 0 || youngerSisters > 0;
        const sentence = `ਮੇਰੇ ${olderBrothers} ਵੱਡੇ ਭਰਾ ਅਤੇ ${youngerSisters} ਛੋਟੀ ਭੈਣ ਹਨ।`;
        const translit = `Main ${olderBrothers} vaḍḍe bhrā atē ${youngerSisters} chhoṭī bhaiṇ hāṁ.`;

        return (
            <div className="space-y-6 text-center">
                <h2 className="text-2xl font-bold">Tell us about your siblings</h2>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <input
                        type="number"
                        min="0"
                        value={olderBrothers}
                        onChange={(e) => setOlderBrothers(e.target.value)}
                        placeholder="Older Brothers"
                        className="px-4 py-2 border rounded"
                    />
                    <input
                        type="number"
                        min="0"
                        value={youngerSisters}
                        onChange={(e) => setYoungerSisters(e.target.value)}
                        placeholder="Younger Sisters"
                        className="px-4 py-2 border rounded"
                    />
                </div>

                {hasSiblings && (
                    <div className="bg-blue-50 p-4 rounded border text-left mt-4">
                        <p className="text-lg font-bold">{sentence}</p>
                        <p className="italic text-sm">{translit}</p>
                        <p className="text-sm text-gray-500">
                            I have {olderBrothers} older brother(s) and {youngerSisters} younger sister(s).
                        </p>
                    </div>
                )}

                <div className="bg-yellow-50 p-4 rounded border text-left text-sm mt-4">
                    <p><strong>Vocabulary Breakdown:</strong></p>
                    <ul className="list-disc ml-5 mt-2 space-y-1">
                        <li>Brother - ਭਰਾ (bhrā)</li>
                        <li>Sister - ਭੈਣ (bhaiṇ)</li>
                        <li>Older/Bigger - ਵੱਡਾ (vaḍḍā)</li>
                        <li>Younger/Little - ਛੋਟੀ (chhoṭī)</li>
                        <li>My (plural) - ਮੇਰੇ (mere)</li>
                    </ul>
                </div>

                <button
                    onClick={() => router.push("/lessons/lesson3/6")}
                    className="bg-green-500 text-white px-6 py-3 mt-6 rounded-lg"
                >
                    Continue to Quiz →
                </button>
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-white to-blue-50 px-6 pt-36 pb-20 flex justify-center items-start">
            <div className="w-full max-w-xl bg-white rounded-xl shadow-md p-6 space-y-6">
                {step === 0 ? renderWorkOrStudy() : renderSiblings()}
            </div>
        </div>
    );
}
