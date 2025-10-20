"use client";

import React, { useState } from "react";
import { FaVolumeUp, FaCheckCircle, FaCalculator, FaRedo } from "react-icons/fa";

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
            className="relative w-full h-56 cursor-pointer"
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
                    className="absolute w-full h-full bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg p-6 flex flex-col items-center justify-center text-white"
                    style={{ backfaceVisibility: 'hidden' }}
                >
                    <p className="text-6xl font-bold mb-3">{number.numeral}</p>
                    <p className="text-xl font-semibold">{number.english}</p>
                    <p className="text-sm opacity-90 mt-3">Click to reveal Punjabi</p>
                </div>

                {/* Back - Punjabi with pronunciation */}
                <div
                    className="absolute w-full h-full bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl shadow-lg p-6 flex flex-col items-center justify-center text-white"
                    style={{
                        backfaceVisibility: 'hidden',
                        transform: 'rotateY(180deg)'
                    }}
                >
                    <p className="text-4xl font-bold mb-2">{number.punjabi}</p>
                    <p className="text-xl font-semibold mb-1">{number.pronunciation}</p>
                    <p className="text-sm opacity-90 mb-4">{number.numeral} - {number.english}</p>
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            speak(number.punjabi);
                        }}
                        className="flex items-center gap-2 bg-white bg-opacity-20 hover:bg-opacity-30 px-4 py-2 rounded-full transition-all duration-300"
                    >
                        <FaVolumeUp />
                        <span className="text-sm font-semibold">Listen</span>
                    </button>
                    <button
                        onClick={onClick}
                        className="mt-3 text-sm opacity-75 hover:opacity-100"
                    >
                        Click to flip back
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
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50 px-4 sm:px-6 lg:px-8 pt-24 pb-16">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-3xl p-8 sm:p-12 text-white shadow-xl mb-8 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full blur-3xl"></div>

                    <div className="relative z-10 text-center">
                        <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-4">
                            <FaCalculator className="text-blue-200" />
                            <span className="text-sm font-semibold">NUMBERS LESSON</span>
                        </div>
                        <h1 className="text-4xl sm:text-5xl font-bold mb-4">
                            Learn Punjabi Numbers
                        </h1>
                        <p className="text-xl text-blue-100">
                            Master counting from 0 to 100 with interactive flashcards
                        </p>
                    </div>
                </div>

                {/* Pronunciation Tip */}
                <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl p-6 border-2 border-orange-200 mb-8">
                    <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                        <FaCheckCircle className="text-orange-600" />
                        <span>Learning Tip</span>
                    </h3>
                    <p className="text-gray-700">
                        Click each card to reveal the Punjabi word and pronunciation. Use the listen button to hear native pronunciation. Practice saying each number out loud!
                    </p>
                </div>

                {/* Range Selection */}
                <div className="mb-8">
                    <div className="flex flex-wrap justify-center gap-3">
                        {ranges.map(range => (
                            <button
                                key={range.id}
                                onClick={() => setSelectedRange(range.id)}
                                className={`px-6 py-3 rounded-lg font-semibold transition-all shadow-md ${
                                    selectedRange === range.id
                                        ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white scale-105'
                                        : 'bg-white text-gray-700 hover:bg-gray-100'
                                }`}
                            >
                                {range.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Main Content Card */}
                <div className="bg-white rounded-3xl shadow-xl p-8 sm:p-10 border-2 border-gray-100 mb-8">
                    <div className="flex items-center justify-between flex-wrap gap-4 mb-8">
                        <div>
                            <h2 className="text-3xl font-bold text-gray-800 mb-2">
                                Numbers {currentRange.label}
                            </h2>
                            <p className="text-gray-600">
                                {displayNumbers.length} numbers to learn in this section
                            </p>
                        </div>
                        <div className="flex gap-3">
                            <button
                                onClick={flipAllCards}
                                className="px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl font-semibold hover:from-green-600 hover:to-green-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                            >
                                Show All
                            </button>
                            <button
                                onClick={resetCards}
                                className="px-6 py-3 bg-gradient-to-r from-gray-500 to-gray-600 text-white rounded-xl font-semibold hover:from-gray-600 hover:to-gray-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                            >
                                <FaRedo className="inline mr-2" />
                                Reset
                            </button>
                        </div>
                    </div>

                    {/* Number Cards Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {displayNumbers.map((number, index) => (
                            <NumberCard
                                key={currentRange.start + index}
                                number={number}
                                isFlipped={flippedCards[currentRange.start + index] || false}
                                onClick={() => toggleCard(currentRange.start + index)}
                            />
                        ))}
                    </div>
                </div>

                {/* Overall Progress */}
                <div className="bg-white rounded-3xl shadow-xl p-8 sm:p-10 border-2 border-gray-100">
                    <h3 className="text-2xl font-bold text-gray-800 mb-6">Overall Progress</h3>
                    <div className="bg-gradient-to-br from-blue-50 to-orange-50 rounded-xl p-6 border-2 border-gray-100">
                        <div className="flex items-center justify-between mb-3">
                            <span className="text-sm font-semibold text-gray-700">Numbers Learned</span>
                            <span className="text-sm font-bold text-blue-600">
                {totalLearned} / {numbers.length}
              </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden mb-2">
                            <div
                                className="bg-gradient-to-r from-blue-500 to-orange-500 h-full transition-all duration-500"
                                style={{ width: `${progressPercentage}%` }}
                            ></div>
                        </div>
                        <p className="text-sm text-gray-600 text-center">
                            {progressPercentage}% Complete
                        </p>
                    </div>

                    {/* Range Progress */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                        {ranges.map(range => {
                            const rangeNumbers = numbers.slice(range.start, range.end);
                            const rangeFlipped = rangeNumbers.filter((_, idx) =>
                                flippedCards[range.start + idx]
                            ).length;
                            const rangePercentage = Math.round((rangeFlipped / rangeNumbers.length) * 100);

                            return (
                                <div key={range.id} className="bg-white rounded-xl p-4 border-2 border-gray-100">
                                    <p className="text-sm font-semibold text-gray-700 mb-2">{range.label}</p>
                                    <div className="flex items-center gap-2 mb-1">
                                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                                            <div
                                                className="bg-gradient-to-r from-blue-500 to-orange-500 h-2 rounded-full transition-all duration-300"
                                                style={{ width: `${rangePercentage}%` }}
                                            ></div>
                                        </div>
                                        <span className="text-xs font-bold text-gray-600">{rangePercentage}%</span>
                                    </div>
                                    <p className="text-xs text-gray-500">{rangeFlipped} of {rangeNumbers.length}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}