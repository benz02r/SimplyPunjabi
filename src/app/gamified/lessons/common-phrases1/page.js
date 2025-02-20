"use client";

import { useState, useRef } from "react";

const phrases = [
    { id: "1", punjabi: "Sat Sri Akal", english: "Hello / Greetings" },
    { id: "2", punjabi: "Tusi kiven ho?", english: "How are you?" },
    { id: "3", punjabi: "Mera naam ___ hai", english: "My name is ___" },
    { id: "4", punjabi: "Dhanvaad", english: "Thank you" },
    { id: "5", punjabi: "Main samjh nahi aya/ayi", english: "I don't understand" },
];

export default function LineMatchingGame() {
    const [selected, setSelected] = useState(null);
    const [matches, setMatches] = useState([]);
    const [isChecked, setIsChecked] = useState(false);
    const svgRef = useRef(null);

    const handleSelection = (id, type) => {
        if (selected) {
            // If already selected a pair, make a connection
            if (selected.type !== type) {
                const pair = { punjabi: selected.id, english: id };
                setMatches([...matches, pair]);
                setSelected(null);
            }
        } else {
            // Select first item
            setSelected({ id, type });
        }
    };

    const handleReset = () => {
        setMatches([]);
        setSelected(null);
        setIsChecked(false);
    };

    const handleCheckAnswers = () => {
        setIsChecked(true);
    };

    const getLineColor = (match) => {
        if (!isChecked) return "stroke-gray-500";
        const correctMatch = phrases.find(p => p.id === match.punjabi).english === phrases.find(e => e.id === match.english).english;
        return correctMatch ? "stroke-green-500" : "stroke-red-500";
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4 relative">
            <div className="max-w-2xl w-full bg-white shadow-lg rounded-xl p-8 border border-gray-200 relative">
                <h2 className="text-3xl font-bold text-center text-[var(--primary)] mb-6">
                    Match the Punjabi Phrase to its Meaning 🎯
                </h2>

                {/* SVG for Lines */}
                <svg ref={svgRef} className="absolute top-0 left-0 w-full h-full pointer-events-none">
                    {matches.map((match, index) => {
                        const fromEl = document.getElementById(`punjabi-${match.punjabi}`);
                        const toEl = document.getElementById(`english-${match.english}`);

                        if (!fromEl || !toEl) return null;

                        const fromRect = fromEl.getBoundingClientRect();
                        const toRect = toEl.getBoundingClientRect();
                        const svgRect = svgRef.current.getBoundingClientRect();

                        return (
                            <line
                                key={index}
                                x1={fromRect.left - svgRect.left + fromRect.width / 2}
                                y1={fromRect.top - svgRect.top + fromRect.height / 2}
                                x2={toRect.left - svgRect.left + toRect.width / 2}
                                y2={toRect.top - svgRect.top + toRect.height / 2}
                                className={`stroke-[4px] ${getLineColor(match)}`}
                            />
                        );
                    })}
                </svg>

                <div className="grid grid-cols-2 gap-6 relative">
                    {/* Punjabi Phrases (Left) */}
                    <div className="flex flex-col space-y-4">
                        {phrases.map(({ id, punjabi }) => (
                            <div
                                key={id}
                                id={`punjabi-${id}`}
                                onClick={() => handleSelection(id, "punjabi")}
                                className={`p-4 bg-gray-100 text-center font-semibold rounded-lg shadow text-gray-700 cursor-pointer transition ${
                                    selected?.id === id && selected?.type === "punjabi" ? "bg-[var(--primary)] text-white" : ""
                                }`}
                            >
                                {punjabi}
                            </div>
                        ))}
                    </div>

                    {/* English Meanings (Right) */}
                    <div className="flex flex-col space-y-4">
                        {phrases.map(({ id, english }) => (
                            <div
                                key={id}
                                id={`english-${id}`}
                                onClick={() => handleSelection(id, "english")}
                                className={`p-4 bg-gray-100 text-center font-semibold rounded-lg shadow text-gray-700 cursor-pointer transition ${
                                    selected?.id === id && selected?.type === "english" ? "bg-[var(--primary)] text-white" : ""
                                }`}
                            >
                                {english}
                            </div>
                        ))}
                    </div>
                </div>

                {isChecked && (
                    <p className="text-lg font-semibold text-center mt-6">
                        {matches.filter(m => phrases.find(p => p.id === m.punjabi).english === phrases.find(e => e.id === m.english).english).length === phrases.length
                            ? "🎉 Perfect Score! Well done!"
                            : `✅ You got ${matches.filter(m => phrases.find(p => p.id === m.punjabi).english === phrases.find(e => e.id === m.english).english).length}/${phrases.length} correct!`}
                    </p>
                )}

                <div className="mt-6 flex justify-center space-x-4">
                    <button
                        onClick={handleCheckAnswers}
                        className="bg-[var(--primary)] text-white px-6 py-3 rounded-full font-semibold hover:opacity-80 transition"
                    >
                        Check Answers
                    </button>
                    <button
                        onClick={handleReset}
                        className="bg-gray-400 text-white px-6 py-3 rounded-full font-semibold hover:bg-gray-500 transition"
                    >
                        Reset
                    </button>
                </div>
            </div>
        </div>
    );
}

