"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function NumbersLesson() {
    const numbers = [
        { english: "Zero", punjabi: "ਸਿਫ਼ਰ", transliteration: "sifar" },
        { english: "One", punjabi: "ਇੱਕ", transliteration: "ik" },
        { english: "Two", punjabi: "ਦੋ", transliteration: "do" },
        { english: "Three", punjabi: "ਤਿੰਨ", transliteration: "tinn" },
        { english: "Four", punjabi: "ਚਾਰ", transliteration: "chār" },
        { english: "Five", punjabi: "ਪੰਜ", transliteration: "punj" },
        { english: "Six", punjabi: "ਛੇ", transliteration: "chhe" },
        { english: "Seven", punjabi: "ਸੱਤ", transliteration: "sat" },
        { english: "Eight", punjabi: "ਅੱਠ", transliteration: "aṭṭ" },
        { english: "Nine", punjabi: "ਨੌ", transliteration: "nau" },
        { english: "Ten", punjabi: "ਦਸ", transliteration: "dus" },
    ];

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-white to-blue-50 px-6">
            <h1 className="text-4xl font-extrabold text-[var(--primary)] mt-10">Punjabi Numbers</h1>
            <p className="text-lg text-gray-700 mt-2">Learn numbers in Punjabi with pronunciation</p>

            <table className="mt-6 w-full max-w-3xl bg-white shadow-lg rounded-lg overflow-hidden">
                <thead>
                <tr className="bg-blue-500 text-white">
                    <th className="py-3 px-6">English</th>
                    <th className="py-3 px-6">Punjabi</th>
                    <th className="py-3 px-6">Transliteration</th>
                </tr>
                </thead>
                <tbody>
                {numbers.map((num, index) => (
                    <tr key={index} className="border-b text-center">
                        <td className="py-3 px-6">{num.english}</td>
                        <td className="py-3 px-6 text-lg font-bold">{num.punjabi}</td>
                        <td className="py-3 px-6 italic">{num.transliteration}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}