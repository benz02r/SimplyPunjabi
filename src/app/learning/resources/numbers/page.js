"use client";

import React, { useState } from "react";
import { FaVolumeUp, FaInfoCircle, FaCalculator, FaRedo, FaArrowLeft } from "react-icons/fa";

const numbers = [
    { english: "Zero", numeral: "0", punjabi: "ਸਿਫ਼ਰ", pronunciation: "Sifar" },
    { english: "One", numeral: "1", punjabi: "ਇੱਕ", pronunciation: "Ik" },
    { english: "Two", numeral: "2", punjabi: "ਦੋ", pronunciation: "Do" },
    { english: "Three", numeral: "3", punjabi: "ਤਿੰਨ", pronunciation: "Tinn" },
    { english: "Four", numeral: "4", punjabi: "ਚਾਰ", pronunciation: "Chār" },
    { english: "Five", numeral: "5", punjabi: "ਪੰਜ", pronunciation: "Punj" },
    { english: "Six", numeral: "6", punjabi: "ਛੇ", pronunciation: "Chhe" },
    { english: "Seven", numeral: "7", punjabi: "ਸੱਤ", pronunciation: "Sat" },
    { english: "Eight", numeral: "8", punjabi: "ਅੱਠ", pronunciation: "Aṭṭh" },
    { english: "Nine", numeral: "9", punjabi: "ਨੌ", pronunciation: "Nau" },
    { english: "Ten", numeral: "10", punjabi: "ਦਸ", pronunciation: "Das" },
    { english: "Eleven", numeral: "11", punjabi: "ਗਿਆਰਾਂ", pronunciation: "Giārān" },
    { english: "Twelve", numeral: "12", punjabi: "ਬਾਰਾਂ", pronunciation: "Bārān" },
    { english: "Thirteen", numeral: "13", punjabi: "ਤੇਰਾਂ", pronunciation: "Terān" },
    { english: "Fourteen", numeral: "14", punjabi: "ਚੌਦਾਂ", pronunciation: "Chaudān" },
    { english: "Fifteen", numeral: "15", punjabi: "ਪੰਦਰਾਂ", pronunciation: "Pandrān" },
    { english: "Sixteen", numeral: "16", punjabi: "ਸੋਲਾਂ", pronunciation: "Solān" },
    { english: "Seventeen", numeral: "17", punjabi: "ਸਤਾਰਾਂ", pronunciation: "Satārān" },
    { english: "Eighteen", numeral: "18", punjabi: "ਅਠਾਰਾਂ", pronunciation: "Aṭhārān" },
    { english: "Nineteen", numeral: "19", punjabi: "ਉਨੀ", pronunciation: "Unī" },
    { english: "Twenty", numeral: "20", punjabi: "ਵੀਹ", pronunciation: "Vīh" },
    { english: "Thirty", numeral: "30", punjabi: "ਤੀਹ", pronunciation: "Tīh" },
    { english: "Forty", numeral: "40", punjabi: "ਚਾਲੀ", pronunciation: "Chālī" },
    { english: "Fifty", numeral: "50", punjabi: "ਪੰਜਾਹ", pronunciation: "Panjāh" },
    { english: "Sixty", numeral: "60", punjabi: "ਸੱਠ", pronunciation: "Saṭṭh" },
    { english: "Seventy", numeral: "70", punjabi: "ਸੱਤਰ", pronunciation: "Sattar" },
    { english: "Eighty", numeral: "80", punjabi: "ਅੱਸੀ", pronunciation: "Assī" },
    { english: "Ninety", numeral: "90", punjabi: "ਨੱਬੇ", pronunciation: "Nabbe" },
    { english: "One Hundred", numeral: "100", punjabi: "ਸੌ", pronunciation: "Sau" },
];

const NumberCard = ({ number, isFlipped, onClick }) => {
    const speak = (text) => {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = "pa-IN";
        window.speechSynthesis.speak(utterance);
    };

    return (
        <div
            className="relative w-full h-52 cursor-pointer group"
            style={{ perspective: '1000px' }}
        >
            <div
                className="relative w-full h-full transition-transform duration-500"
                style={{
                    transformStyle: 'preserve-3d',
                    transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'
                }}
            >
                {/* Front - Numeral and English */}
                <div
                    onClick={onClick}
                    className="absolute w-full h-full bg-white rounded-lg border border-[#1B2A4A]/15 shadow-sm p-6 flex flex-col items-center justify-center text-[#1B2A4A] group-hover:shadow-md transition-shadow duration-300"
                    style={{ backfaceVisibility: 'hidden' }}
                >
                    <p className="text-5xl font-serif font-bold mb-2 text-[#1B2A4A]">{number.numeral}</p>
                    <p className="text-lg font-medium font-sans text-[#1B2A4A]/80">{number.english}</p>
                </div>

                {/* Back - Punjabi with pronunciation */}
                <div
                    className="absolute w-full h-full bg-[#1B2A4A] rounded-lg shadow-md p-6 flex flex-col items-center justify-center text-white border border-[#1B2A4A]"
                    style={{
                        backfaceVisibility: 'hidden',
                        transform: 'rotateY(180deg)'
                    }}
                >
                    <p className="text-4xl font-bold mb-2 text-[#E67E22]">{number.punjabi}</p>
                    <p className="text-lg font-medium mb-1 font-sans text-white/90">{number.pronunciation}</p>
                    <p className="text-xs opacity-60 mb-5 font-sans uppercase tracking-wider">{number.numeral} • {number.english}</p>

                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            speak(number.punjabi);
                        }}
                        className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-4 py-2 rounded border border-white/10 transition-colors duration-200"
                    >
                        <FaVolumeUp size={12} className="text-[#E67E22]" />
                        <span className="text-xs font-semibold font-sans tracking-wide">Pronounce</span>
                    </button>

                    <button
                        onClick={onClick}
                        className="absolute bottom-4 text-[10px] uppercase tracking-wider opacity-40 hover:opacity-100 font-sans transition-opacity"
                    >
                        Flip Back
                    </button>
                </div>
            </div>
        </div>
    );
};

export default function PunjabiNumbersLesson() {
    const [flippedCards, setFlippedCards] = useState({});
    const [selectedRange, setSelectedRange] = useState("0-10");

    const toggleCard = (index) => {
        setFlippedCards(prev => ({
            ...prev,
            [index]: !prev[index]
        }));
    };

    const ranges = [
        { id: "0-10", label: "0-10", start: 0, end: 11 },
        { id: "11-20", label: "11-20", start: 11, end: 21 },
        { id: "tens", label: "Tens (20-100)", start: 21, end: 29 }
    ];

    const currentRange = ranges.find(r => r.id === selectedRange);
    const displayNumbers = numbers.slice(currentRange.start, currentRange.end);

    const flipAllCards = () => {
        const newFlipped = {};
        displayNumbers.forEach((_, index) => {
            newFlipped[currentRange.start + index] = true;
        });
        setFlippedCards(prev => ({ ...prev, ...newFlipped }));
    };

    const resetCards = () => {
        const newFlipped = {};
        displayNumbers.forEach((_, index) => {
            newFlipped[currentRange.start + index] = false;
        });
        setFlippedCards(prev => ({ ...prev, ...newFlipped }));
    };

    const totalLearned = Object.values(flippedCards).filter(Boolean).length;
    const progressPercentage = Math.round((totalLearned / numbers.length) * 100);

    return (
        <div className="min-h-screen bg-[#FDFBF7] px-4 sm:px-6 lg:px-8 pt-12 pb-20 font-sans text-[#1B2A4A]">
            <div className="max-w-6xl mx-auto">

                {/* Subtle Header Navigation */}
                <div className="flex items-center justify-between mb-8">
                    <button className="flex items-center gap-2 text-[#1B2A4A]/60 hover:text-[#1B2A4A] text-sm font-medium transition-colors">
                        <FaArrowLeft size={12} />
                        <span>Course Overview</span>
                    </button>
                </div>

                {/* Hero Section - Clean & Structured */}
                <div className="bg-[#1B2A4A] rounded-2xl p-8 sm:p-10 text-white shadow-md mb-10 relative overflow-hidden flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
                    {/* Minimalist Watermark */}
                    <div className="absolute -right-4 -top-8 text-[16rem] text-white/5 font-serif leading-none select-none pointer-events-none">
                        ੧
                    </div>

                    <div className="relative z-10 max-w-2xl">
                        <div className="inline-flex items-center gap-2 mb-4">
                            <FaCalculator size={14} className="text-[#E67E22]" />
                            <span className="text-xs font-semibold tracking-widest uppercase text-[#E67E22]">Module 02</span>
                        </div>
                        <h1 className="text-3xl sm:text-4xl font-serif font-bold mb-3">
                            Numerical Foundations
                        </h1>
                        <p className="text-base text-white/70 font-sans leading-relaxed">
                            A comprehensive guide to Gurmukhi numerals. Master counting from 0 to 100 through interactive memory reinforcement and native audio pronunciation.
                        </p>
                    </div>

                    {/* Quick Stats Box in Hero */}
                    <div className="relative z-10 bg-white/10 backdrop-blur-md border border-white/10 rounded-lg p-5 w-full md:w-auto min-w-[200px]">
                        <p className="text-xs text-white/60 uppercase tracking-wider mb-1">Total Progress</p>
                        <div className="flex items-end gap-2 mb-2">
                            <span className="text-3xl font-serif font-bold text-white">{progressPercentage}%</span>
                        </div>
                        <div className="w-full bg-white/10 rounded-full h-1 overflow-hidden">
                            <div className="bg-[#E67E22] h-full transition-all duration-700 ease-out" style={{ width: `${progressPercentage}%` }}></div>
                        </div>
                    </div>
                </div>

                {/* Informational Alert */}
                <div className="bg-white border-l-4 border-[#E67E22] rounded-r-lg p-5 shadow-sm mb-10 flex gap-4 items-start">
                    <FaInfoCircle className="text-[#E67E22] mt-0.5" size={18} />
                    <div>
                        <h3 className="text-sm font-bold text-[#1B2A4A] mb-1 font-sans">Study Methodology</h3>
                        <p className="text-sm text-[#1B2A4A]/70 leading-relaxed font-sans">
                            Select a numerical range below. Click a card to reveal the Gurmukhi translation. Use the pronunciation tool to practice auditory recognition. Cards remain flipped to track your active session progress.
                        </p>
                    </div>
                </div>

                {/* Professional Underline Tabs */}
                <div className="flex border-b border-[#1B2A4A]/10 mb-8 overflow-x-auto no-scrollbar">
                    {ranges.map(range => (
                        <button
                            key={range.id}
                            onClick={() => setSelectedRange(range.id)}
                            className={`pb-4 px-6 text-sm font-semibold transition-colors relative whitespace-nowrap ${
                                selectedRange === range.id
                                    ? 'text-[#1B2A4A]'
                                    : 'text-[#1B2A4A]/50 hover:text-[#1B2A4A]/80'
                            }`}
                        >
                            {range.label}
                            {selectedRange === range.id && (
                                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#E67E22]" />
                            )}
                        </button>
                    ))}
                </div>

                {/* Grid Controls */}
                <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
                    <div>
                        <h2 className="text-xl font-serif font-bold text-[#1B2A4A]">
                            Active Set: {currentRange.label}
                        </h2>
                        <p className="text-sm text-[#1B2A4A]/60 mt-1">
                            {displayNumbers.length} items
                        </p>
                    </div>
                    <div className="flex gap-3">
                        <button
                            onClick={flipAllCards}
                            className="px-4 py-2 bg-white border border-[#1B2A4A]/20 text-[#1B2A4A] rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors shadow-sm"
                        >
                            Reveal All
                        </button>
                        <button
                            onClick={resetCards}
                            className="px-4 py-2 bg-white border border-[#1B2A4A]/20 text-[#1B2A4A] rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors shadow-sm flex items-center gap-2"
                        >
                            <FaRedo size={10} className="text-[#1B2A4A]/60" />
                            Reset Set
                        </button>
                    </div>
                </div>

                {/* Number Cards Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-16">
                    {displayNumbers.map((number, index) => (
                        <NumberCard
                            key={currentRange.start + index}
                            number={number}
                            isFlipped={flippedCards[currentRange.start + index] || false}
                            onClick={() => toggleCard(currentRange.start + index)}
                        />
                    ))}
                </div>

                {/* Analytics / Progress Dashboard */}
                <div className="border-t border-[#1B2A4A]/10 pt-10">
                    <h3 className="text-lg font-serif font-bold text-[#1B2A4A] mb-6">Module Analytics</h3>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {ranges.map(range => {
                            const rangeNumbers = numbers.slice(range.start, range.end);
                            const rangeFlipped = rangeNumbers.filter((_, idx) =>
                                flippedCards[range.start + idx]
                            ).length;
                            const rangePercentage = Math.round((rangeFlipped / rangeNumbers.length) * 100);

                            return (
                                <div key={range.id} className="bg-white rounded-lg p-5 border border-[#1B2A4A]/10 shadow-sm">
                                    <div className="flex justify-between items-center mb-4">
                                        <p className="text-sm font-medium text-[#1B2A4A]">{range.label}</p>
                                        <span className="text-xs font-bold text-[#1B2A4A]/60 bg-[#1B2A4A]/5 px-2 py-1 rounded">
                                            {rangePercentage}%
                                        </span>
                                    </div>
                                    <div className="w-full bg-[#1B2A4A]/5 rounded-full h-1.5 mb-2">
                                        <div
                                            className="bg-[#1B2A4A] h-1.5 rounded-full transition-all duration-500"
                                            style={{ width: `${rangePercentage}%` }}
                                        ></div>
                                    </div>
                                    <p className="text-xs text-[#1B2A4A]/50">{rangeFlipped} of {rangeNumbers.length} items reviewed</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}