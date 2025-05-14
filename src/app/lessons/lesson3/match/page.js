"use client";

import { useState } from "react";

export default function IntroduceYourself() {
    const [form, setForm] = useState({
        name: "",
        city: "",
        profession: "",
        feeling: ""
    });

    const handleChange = (field, value) => {
        setForm({ ...form, [field]: value });
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-white to-blue-50 px-6 pt-36 pb-20">
            <div className="max-w-3xl mx-auto text-center mb-10">
                <h1 className="text-4xl font-bold text-[var(--primary)]">Introduce Yourself in Punjabi</h1>
                <p className="text-lg text-gray-700 mt-3">
                    Complete the sentences to practise saying your name, where you're from, and more!
                </p>
            </div>

            {/* Activity Form */}
            <div className="bg-white rounded-xl shadow-md p-6 max-w-2xl mx-auto space-y-6">
                <div>
                    <label className="block font-semibold text-blue-700 mb-1">What's your name?</label>
                    <input
                        type="text"
                        placeholder="e.g. Ryan"
                        value={form.name}
                        onChange={(e) => handleChange("name", e.target.value)}
                        className="w-full border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
                    />
                </div>
                <div>
                    <label className="block font-semibold text-blue-700 mb-1">Where are you from?</label>
                    <input
                        type="text"
                        placeholder="e.g. London"
                        value={form.city}
                        onChange={(e) => handleChange("city", e.target.value)}
                        className="w-full border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
                    />
                </div>
                <div>
                    <label className="block font-semibold text-blue-700 mb-1">What do you do?</label>
                    <input
                        type="text"
                        placeholder="e.g. student, teacher, engineer"
                        value={form.profession}
                        onChange={(e) => handleChange("profession", e.target.value)}
                        className="w-full border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
                    />
                </div>
                <div>
                    <label className="block font-semibold text-blue-700 mb-1">How are you feeling today?</label>
                    <input
                        type="text"
                        placeholder="e.g. happy, excited, tired"
                        value={form.feeling}
                        onChange={(e) => handleChange("feeling", e.target.value)}
                        className="w-full border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
                    />
                </div>
            </div>

            {/* Summary */}
            <div className="max-w-3xl mx-auto mt-12 bg-white p-6 rounded-xl shadow-lg text-center">
                <h2 className="text-2xl font-bold text-green-600 mb-4">Your Introduction in Punjabi</h2>
                <p className="text-xl text-gray-800">
                    {form.name && `ਮੇਰਾ ਨਾਮ ${form.name} ਹੈ।`}{" "}
                    {form.city && `ਮੈਂ ${form.city} ਤੋਂ ਹਾਂ।`}{" "}
                    {form.profession && `ਮੈਂ ${form.profession} ਹਾਂ।`}{" "}
                    {form.feeling && `ਮੈਂ ${form.feeling} ਹਾਂ।`}
                </p>
                <p className="text-sm italic text-gray-500 mt-2">
                    Mera naam {form.name || "..."} hai. Main {form.city || "..."} ton haan. Main {form.profession || "..."} haan. Main {form.feeling || "..."} haan.
                </p>
            </div>
        </div>
    );
}
