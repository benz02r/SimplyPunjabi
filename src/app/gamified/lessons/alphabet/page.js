"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

// Complete Punjabi Gurmukhi alphabet with example words
const alphabet = [
    { gurmukhi: "ੳ", roman: "Ura", word: "ੳਲੂ (Alu)", meaning: "Potato", icon: "🥔", sound: "/sounds/ura.mp3" },
    { gurmukhi: "ਅ", roman: "Aira", word: "ਅੰਬ (Amb)", meaning: "Mango", icon: "🥭", sound: "/sounds/aira.mp3" },
    { gurmukhi: "ੲ", roman: "Iri", word: "ਇੱਕ (Ikk)", meaning: "One", icon: "1️⃣", sound: "/sounds/iri.mp3" },
    { gurmukhi: "ਸ", roman: "Sassa", word: "ਸੂਰਜ (Sooraj)", meaning: "Sun", icon: "☀️", sound: "/sounds/sassa.mp3" },
    { gurmukhi: "ਹ", roman: "Haha", word: "ਹਾਥੀ (Hathi)", meaning: "Elephant", icon: "🐘", sound: "/sounds/haha.mp3" },
    { gurmukhi: "ਕ", roman: "Kakka", word: "ਕਮਲ (Kamal)", meaning: "Lotus", icon: "🌸", sound: "/sounds/kakka.mp3" },
    { gurmukhi: "ਖ", roman: "Khakha", word: "ਖਰਗੋਸ਼ (Khargosh)", meaning: "Rabbit", icon: "🐇", sound: "/sounds/khakha.mp3" },
    { gurmukhi: "ਗ", roman: "Gagga", word: "ਗਮਲਾ (Gamla)", meaning: "Pot", icon: "🪴", sound: "/sounds/gagga.mp3" },
    { gurmukhi: "ਘ", roman: "Ghagha", word: "ਘਰ (Ghar)", meaning: "House", icon: "🏠", sound: "/sounds/ghagha.mp3" },
    { gurmukhi: "ਙ", roman: "Nganga", word: "ਙਾ (Nga)", meaning: "N/A", icon: "❓", sound: "/sounds/nganga.mp3" },
    { gurmukhi: "ਚ", roman: "Chacha", word: "ਚੰਦ (Chand)", meaning: "Moon", icon: "🌙", sound: "/sounds/chacha.mp3" },
    { gurmukhi: "ਛ", roman: "Chhachha", word: "ਛਤਰੀ (Chhatri)", meaning: "Umbrella", icon: "☂️", sound: "/sounds/chhachha.mp3" },
    { gurmukhi: "ਜ", roman: "Jajja", word: "ਜਹਾਜ਼ (Jahaz)", meaning: "Ship", icon: "🚢", sound: "/sounds/jajja.mp3" },
    { gurmukhi: "ਝ", roman: "Jhajja", word: "ਝੰਡਾ (Jhanda)", meaning: "Flag", icon: "🏳️", sound: "/sounds/jhajja.mp3" },
    { gurmukhi: "ਟ", roman: "Tatta", word: "ਟਮਾਟਰ (Tamatar)", meaning: "Tomato", icon: "🍅", sound: "/sounds/tatta.mp3" },
    { gurmukhi: "ਠ", roman: "Thattha", word: "ਠੰਡ (Thand)", meaning: "Cold", icon: "❄️", sound: "/sounds/thattha.mp3" },
    { gurmukhi: "ਡ", roman: "Dadda", word: "ਡਰਾਮਾ (Drama)", meaning: "Drama", icon: "🎭", sound: "/sounds/dadda.mp3" },
    { gurmukhi: "ਢ", roman: "Dhadha", word: "ਢੋਲ (Dhol)", meaning: "Drum", icon: "🥁", sound: "/sounds/dhadha.mp3" },
    { gurmukhi: "ਣ", roman: "Nana", word: "ਣਕ (Nanak)", meaning: "N/A", icon: "❓", sound: "/sounds/nana.mp3" },
];

export default function AlphabetPage() {
    const [audio, setAudio] = useState(null);
    const [user, setUser] = useState(null);
    const router = useRouter();

    useEffect(() => {
        async function checkUser() {
            const { data: sessionData } = await supabase.auth.getSession();
            setUser(sessionData?.session?.user || null);
        }
        checkUser();

        if (typeof window !== "undefined") {
            setAudio(new Audio());
        }
    }, []);

    const playSound = (sound) => {
        if (audio) {
            audio.src = sound;
            audio.play().catch(err => console.error("Error playing sound:", err));
        } else {
            console.warn("Audio object is not ready yet.");
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-6 pt-32 pb-20">

            {/* Back Button - Shows Home for Guests, Alphabet & Numbers for Logged-in Users */}
            <div className="w-full max-w-4xl mb-8 flex justify-start">
                <button
                    onClick={() => router.push(user ? "/gamified/learning/alphabet-numbers" : "/")}
                    className="bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:bg-blue-600 transition"
                >
                    ← {user ? "Back to Alphabet & Numbers" : "Back to Home"}
                </button>
            </div>

            {/* Interactive Introduction Button */}
            <div className="w-full max-w-4xl mb-8 flex justify-center">
                <button
                    onClick={() => router.push("/gamified/lessons/alphabet-intro")}
                    className="bg-green-500 text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:bg-green-600 transition transform hover:scale-105"
                >
                    🎥 Start Animated Introduction
                </button>
            </div>

            <div className="max-w-4xl w-full bg-white shadow-xl rounded-xl p-10 border border-gray-200">
                <h2 className="text-3xl font-bold text-center text-[var(--primary)] mb-8">
                    Learn Gurmukhi (Punjabi Alphabet)
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {alphabet.map(({ gurmukhi, roman, word, meaning, icon, sound }, index) => (
                        <button
                            key={index}
                            onClick={() => playSound(sound)}
                            className="flex flex-col items-center justify-center p-5 bg-gray-100 text-gray-800 text-lg font-bold rounded-lg shadow-md transition hover:bg-[var(--primary)] hover:text-white"
                        >
                            <span className="text-5xl">{gurmukhi}</span>
                            <span className="text-sm mt-2">{roman}</span>
                            <span className="text-md mt-3 font-semibold">{word}</span>
                            <span className="text-sm text-gray-600">{meaning}</span>
                            <span className="text-3xl mt-3">{icon}</span>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
