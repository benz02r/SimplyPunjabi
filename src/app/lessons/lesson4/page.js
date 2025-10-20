"use client";

import React, { useState } from "react";
import { FaArrowLeft, FaArrowRight, FaVolumeUp, FaCheckCircle, FaUser, FaUsers, FaHeart, FaBaby, FaHome } from "react-icons/fa";

const relationshipCategories = [
    {
        id: "immediate",
        title: "Immediate Family",
        icon: FaUsers,
        description: "Your closest family members",
        relationships: [
            { english: "Mother", punjabi: "ਮਾਂ", pronunciation: "Mata", note: "Say 'Mata' not 'Matha'" },
            { english: "Father", punjabi: "ਪਿਤਾ", pronunciation: "Pita", note: "Say 'Pita' not 'Pitha'" },
            { english: "Brother", punjabi: "ਭਰਾ", pronunciation: "Praa" },
            { english: "Sister", punjabi: "ਭੈਣ", pronunciation: "Bhein" },
            { english: "Son", punjabi: "ਪੁੱਤਰ", pronunciation: "Puttar" },
            { english: "Daughter", punjabi: "ਧੀ", pronunciation: "Dhee" },
        ]
    },
    {
        id: "grandparents",
        title: "Grandparents",
        icon: FaUser,
        description: "Father's and Mother's parents",
        relationships: [
            { english: "Dad's Dad", punjabi: "ਦਾਦਾ", pronunciation: "Dadha" },
            { english: "Dad's Mum", punjabi: "ਦਾਦੀ", pronunciation: "Dadhi" },
            { english: "Mum's Dad", punjabi: "ਨਾਨਾ", pronunciation: "Nana" },
            { english: "Mum's Mum", punjabi: "ਨਾਨੀ", pronunciation: "Nani" },
        ]
    },
    {
        id: "fathers-side",
        title: "Father's Side",
        icon: FaUser,
        description: "Father's brothers, sisters and their families",
        relationships: [
            { english: "Dad's Older Brother", punjabi: "ਤਾਇਆ", pronunciation: "Thaya", note: "'th' as in 'thought', tongue behind teeth" },
            { english: "Dad's Older Brother's Wife", punjabi: "ਤਾਈ", pronunciation: "Thaiyee" },
            { english: "Dad's Younger Brother", punjabi: "ਚਾਚਾ", pronunciation: "Chacha" },
            { english: "Dad's Younger Brother's Wife", punjabi: "ਚਾਚੀ", pronunciation: "Chachi" },
            { english: "Dad's Sister", punjabi: "ਬੁਆ", pronunciation: "Bhua" },
            { english: "Dad's Sister's Husband", punjabi: "ਫੂਫੜ", pronunciation: "Fufarrd" },
        ]
    },
    {
        id: "mothers-side",
        title: "Mother's Side",
        icon: FaUser,
        description: "Mother's brothers, sisters and their families",
        relationships: [
            { english: "Mum's Brother", punjabi: "ਮਾਮਾ", pronunciation: "Mama" },
            { english: "Mum's Brother's Wife", punjabi: "ਮਾਮੀ", pronunciation: "Mami" },
            { english: "Mum's Sister", punjabi: "ਮਾਸੀ", pronunciation: "Masi" },
            { english: "Mum's Sister's Husband", punjabi: "ਮਸਰ", pronunciation: "Masar" },
        ]
    },
    {
        id: "siblings-spouses",
        title: "Siblings' Spouses",
        icon: FaHeart,
        description: "Your siblings' husbands and wives",
        relationships: [
            { english: "Sister's Husband", punjabi: "ਜੀਜਾ", pronunciation: "Jeeja" },
            { english: "Brother's Wife", punjabi: "ਭਾਬੀ", pronunciation: "Bhabi" },
        ]
    },
    {
        id: "nieces-nephews",
        title: "Nieces & Nephews",
        icon: FaBaby,
        description: "Children of your siblings and spouse's siblings",
        relationships: [
            { english: "Niece (sibling's daughter)", punjabi: "ਭਤੀਜੀ", pronunciation: "Patheeji" },
            { english: "Nephew (sibling's son)", punjabi: "ਭਤੀਜਾ", pronunciation: "Patheeja" },
            { english: "Spouse's Niece", punjabi: "ਪੰਜੀ", pronunciation: "Panji" },
            { english: "Spouse's Nephew", punjabi: "ਪੰਜਾ", pronunciation: "Panja" },
        ]
    },
    {
        id: "grandchildren",
        title: "Grandchildren",
        icon: FaBaby,
        description: "Your children's children",
        relationships: [
            { english: "Son's Son", punjabi: "ਪੋਤਾ", pronunciation: "Potha" },
            { english: "Son's Daughter", punjabi: "ਪੋਥੀ", pronunciation: "Pothi" },
            { english: "Daughter's Son", punjabi: "ਧੋਤਾ", pronunciation: "Dhotha" },
            { english: "Daughter's Daughter", punjabi: "ਧੋਤੀ", pronunciation: "Dhothi" },
        ]
    },
    {
        id: "husbands-family",
        title: "Husband's Family",
        icon: FaUsers,
        description: "In-laws from husband's side (for wives)",
        relationships: [
            { english: "Husband's Older Brother", punjabi: "ਜੇਠ", pronunciation: "Jeth" },
            { english: "Husband's Older Brother's Wife", punjabi: "ਜਠਾਨੀ", pronunciation: "Jatani" },
            { english: "Husband's Younger Brother", punjabi: "ਦੇਓਰ", pronunciation: "Deor" },
            { english: "Husband's Younger Brother's Wife", punjabi: "ਦਰਾਨੀ", pronunciation: "Darani" },
            { english: "Husband's Sister", punjabi: "ਨਨਾਣ", pronunciation: "Naran" },
            { english: "Husband's Sister's Husband", punjabi: "ਨਨਾਣੋਈਆ", pronunciation: "Narandoyia" },
        ]
    },
    {
        id: "wifes-family",
        title: "Wife's Family",
        icon: FaUsers,
        description: "In-laws from wife's side (for husbands)",
        relationships: [
            { english: "Wife's Brother", punjabi: "ਸਾਲਾ", pronunciation: "Sala" },
            { english: "Wife's Brother's Wife", punjabi: "ਸਲਹਾਰ", pronunciation: "Salehar" },
            { english: "Wife's Sister", punjabi: "ਸਾਲੀ", pronunciation: "Sali" },
            { english: "Wife's Sister's Husband", punjabi: "ਸੰਢੂ", pronunciation: "Saandhu", note: "Draw out the 'a' sound: Saaa-ndhu" },
        ]
    },
    {
        id: "childs-inlaws",
        title: "Child's In-Laws",
        icon: FaHome,
        description: "Parents of your son-in-law or daughter-in-law",
        relationships: [
            { english: "Child's In-Law's Father", punjabi: "ਕੁੜਮ", pronunciation: "Kordum" },
            { english: "Child's In-Law's Mother", punjabi: "ਕੁੜਮਣੀ", pronunciation: "Kordmuni" },
        ]
    },
    {
        id: "spouses-extended",
        title: "Spouse's Extended Family",
        icon: FaHome,
        description: "Your spouse's aunts, uncles, and grandparents",
        relationships: [
            { english: "Spouse's Thaiyee or Chachi", punjabi: "ਪਠੀਸ", pronunciation: "Pathees" },
            { english: "Spouse's Thayaa or Chacha", punjabi: "ਪਠਿਓੜਾ", pronunciation: "Pathiyora" },
            { english: "Spouse's Mami", punjabi: "ਮਮੀਸ", pronunciation: "Mamees" },
            { english: "Spouse's Mama", punjabi: "ਮਲਿਓੜਾ", pronunciation: "Malyora" },
            { english: "Spouse's Bhua", punjabi: "ਫੁਫੀਸ", pronunciation: "Fufees" },
            { english: "Spouse's Fufarrd", punjabi: "ਫੁਫਿਓੜਾ", pronunciation: "Fufyora" },
            { english: "Spouse's Nani", punjabi: "ਨਾਨੀਸ", pronunciation: "Nanees" },
            { english: "Spouse's Nana", punjabi: "ਨਾਨਿਓੜਾ", pronunciation: "Nanyora" },
            { english: "Spouse's Dadhi", punjabi: "ਦਾਧੀਸ", pronunciation: "Dadhees" },
            { english: "Spouse's Dadha", punjabi: "ਦਾਧਿਓੜਾ", pronunciation: "Dadhiyora" },
        ]
    }
];

const RelationshipCard = ({ relationship, isFlipped, onClick }) => (
    <div
        onClick={onClick}
        className="relative w-full h-48 cursor-pointer"
        style={{ perspective: '1000px' }}
    >
        <div
            className="relative w-full h-full transition-transform duration-500"
            style={{
                transformStyle: 'preserve-3d',
                transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'
            }}
        >
            {/* Front - English only */}
            <div
                className="absolute w-full h-full bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg p-6 flex flex-col items-center justify-center text-white"
                style={{ backfaceVisibility: 'hidden' }}
            >
                <p className="text-lg font-semibold text-center mb-2">{relationship.english}</p>
                <p className="text-sm opacity-90 text-center">Click to reveal Punjabi</p>
            </div>

            {/* Back - Punjabi with pronunciation */}
            <div
                className="absolute w-full h-full bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl shadow-lg p-6 flex flex-col items-center justify-center text-white"
                style={{
                    backfaceVisibility: 'hidden',
                    transform: 'rotateY(180deg)'
                }}
            >
                <p className="text-3xl font-bold mb-2">{relationship.punjabi}</p>
                <p className="text-xl font-semibold mb-1">{relationship.pronunciation}</p>
                <p className="text-sm opacity-90 text-center mt-2">{relationship.english}</p>
                {relationship.note && (
                    <p className="text-xs mt-3 bg-white bg-opacity-20 px-3 py-1 rounded text-center">{relationship.note}</p>
                )}
            </div>
        </div>
    </div>
);

export default function PunjabiFamilyLearning() {
    const [selectedCategory, setSelectedCategory] = useState("immediate");
    const [flippedCards, setFlippedCards] = useState({});

    const toggleCard = (categoryId, index) => {
        const key = `${categoryId}-${index}`;
        setFlippedCards(prev => ({
            ...prev,
            [key]: !prev[key]
        }));
    };

    const currentCategory = relationshipCategories.find(cat => cat.id === selectedCategory);
    const IconComponent = currentCategory.icon;

    const flipAllCards = () => {
        const newFlipped = {};
        currentCategory.relationships.forEach((_, index) => {
            newFlipped[`${selectedCategory}-${index}`] = true;
        });
        setFlippedCards(prev => ({ ...prev, ...newFlipped }));
    };

    const resetCards = () => {
        const newFlipped = {};
        currentCategory.relationships.forEach((_, index) => {
            newFlipped[`${selectedCategory}-${index}`] = false;
        });
        setFlippedCards(prev => ({ ...prev, ...newFlipped }));
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50 px-4 sm:px-6 lg:px-8 pt-24 pb-16">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-3xl p-8 sm:p-12 text-white shadow-xl mb-8 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full blur-3xl"></div>

                    <div className="relative z-10 text-center">
                        <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-4">
                            <FaUsers className="text-blue-200" />
                            <span className="text-sm font-semibold">FAMILY RELATIONSHIPS</span>
                        </div>
                        <h1 className="text-4xl sm:text-5xl font-bold mb-4">
                            Learn Punjabi Family Terms
                        </h1>
                        <p className="text-xl text-blue-100">
                            Master family relationships with interactive flashcards
                        </p>
                    </div>
                </div>

                {/* Pronunciation Tip */}
                <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl p-6 border-2 border-orange-200 mb-8">
                    <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                        <FaCheckCircle className="text-orange-600" />
                        <span>Pronunciation Tip</span>
                    </h3>
                    <p className="text-gray-700">
                        The "th" sound is soft, like in "thought" - press your tongue behind your front teeth, not a hard "t" sound.
                    </p>
                </div>

                {/* Category Navigation */}
                <div className="mb-8">
                    <div className="flex flex-wrap justify-center gap-3">
                        {relationshipCategories.map(category => {
                            const CategoryIcon = category.icon;
                            return (
                                <button
                                    key={category.id}
                                    onClick={() => setSelectedCategory(category.id)}
                                    className={`px-6 py-3 rounded-lg font-semibold transition-all shadow-md flex items-center gap-2 ${
                                        selectedCategory === category.id
                                            ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white scale-105'
                                            : 'bg-white text-gray-700 hover:bg-gray-100'
                                    }`}
                                >
                                    <CategoryIcon />
                                    {category.title}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Current Category Info */}
                <div className="bg-white rounded-3xl shadow-xl p-8 sm:p-10 border-2 border-gray-100 mb-8">
                    <div className="flex items-center justify-between flex-wrap gap-4 mb-8">
                        <div>
                            <div className="flex items-center gap-3 mb-3">
                                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center text-white">
                                    <IconComponent className="text-2xl" />
                                </div>
                                <h2 className="text-3xl font-bold text-gray-800">
                                    {currentCategory.title}
                                </h2>
                            </div>
                            <p className="text-gray-600 mb-2">{currentCategory.description}</p>
                            <p className="text-sm text-gray-500">
                                {currentCategory.relationships.length} relationships to learn
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
                                Reset
                            </button>
                        </div>
                    </div>

                    {/* Flashcards Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {currentCategory.relationships.map((relationship, index) => (
                            <RelationshipCard
                                key={index}
                                relationship={relationship}
                                isFlipped={flippedCards[`${selectedCategory}-${index}`] || false}
                                onClick={() => toggleCard(selectedCategory, index)}
                            />
                        ))}
                    </div>
                </div>

                {/* Progress Tracker */}
                <div className="bg-white rounded-3xl shadow-xl p-8 sm:p-10 border-2 border-gray-100">
                    <h3 className="text-2xl font-bold text-gray-800 mb-6">Your Progress</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {relationshipCategories.map(category => {
                            const categoryFlipped = Object.keys(flippedCards).filter(
                                key => key.startsWith(`${category.id}-`) && flippedCards[key]
                            ).length;
                            const total = category.relationships.length;
                            const percentage = total > 0 ? Math.round((categoryFlipped / total) * 100) : 0;

                            return (
                                <div key={category.id} className="bg-gradient-to-br from-blue-50 to-orange-50 rounded-xl p-5 border-2 border-gray-100">
                                    <p className="text-sm font-semibold text-gray-700 mb-3">{category.title}</p>
                                    <div className="flex items-center gap-2 mb-2">
                                        <div className="flex-1 bg-gray-200 rounded-full h-3">
                                            <div
                                                className="bg-gradient-to-r from-blue-500 to-orange-500 h-3 rounded-full transition-all duration-300"
                                                style={{ width: `${percentage}%` }}
                                            ></div>
                                        </div>
                                        <span className="text-sm font-bold text-gray-600">{percentage}%</span>
                                    </div>
                                    <p className="text-xs text-gray-500">{categoryFlipped} of {total} learned</p>
                                </div>
                            );
                        })}
                    </div>
                </div>


            </div>
        </div>
    );
}