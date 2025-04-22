"use client";

import { useState } from "react";

export default function FamilyTree() {
    const [visibility, setVisibility] = useState({
        parents: false,
        siblings: false,
        extended: false,
        grandparents: false,
        children: false,
    });

    const [names, setNames] = useState({
        you: "You",
        father: "Father",
        mother: "Mother",
        brother: "Brother",
        sister: "Sister",
        uncle1: "Uncle (Dad's)",
        aunt1: "Aunt (Dad's)",
        uncle2: "Uncle (Mom's)",
        aunt2: "Aunt (Mom's)",
        grandfather: "Grandfather",
        grandmother: "Grandmother",
        son: "Son",
        daughter: "Daughter",
    });

    const toggleVisibility = (key) => {
        setVisibility({ ...visibility, [key]: true });
    };

    const handleNameChange = (role, value) => {
        setNames((prev) => ({ ...prev, [role]: value }));
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white px-4 pt-16 pb-20 text-gray-800">
            <h1 className="text-4xl font-bold text-center text-[var(--primary)] mb-12">My Punjabi Family Tree</h1>

            <div className="flex flex-col items-center gap-20 relative w-full max-w-6xl mx-auto">

                {/* Grandparents */}
                {visibility.grandparents && (
                    <>
                        <div className="flex justify-center gap-20 relative">
                            <FamilyCard
                                label="ਦਾਦਾ / ਨਾਨਾ"
                                value={names.grandfather}
                                onChange={(val) => handleNameChange("grandfather", val)}
                            />
                            <FamilyCard
                                label="ਦਾਦੀ / ਨਾਨੀ"
                                value={names.grandmother}
                                onChange={(val) => handleNameChange("grandmother", val)}
                            />
                            <ConnectorLine />
                        </div>
                    </>
                )}

                {/* Parents */}
                {visibility.parents && (
                    <>
                        <div className="flex justify-center gap-20 relative">
                            <FamilyCard
                                label="ਪਿਓ / ਪਿਤਾ"
                                value={names.father}
                                onChange={(val) => handleNameChange("father", val)}
                            />
                            <FamilyCard
                                label="ਮਾਂ"
                                value={names.mother}
                                onChange={(val) => handleNameChange("mother", val)}
                            />
                            <ConnectorLine />
                        </div>
                    </>
                )}

                {/* YOU */}
                <div className="relative z-10 flex flex-col items-center gap-4">
                    <FamilyCard
                        label="ਤੁਸੀਂ"
                        value={names.you}
                        onChange={(val) => handleNameChange("you", val)}
                    />

                    <div className="flex flex-wrap justify-center gap-4 mt-4">
                        {!visibility.parents && (
                            <ActionButton text="Reveal Parents" onClick={() => toggleVisibility("parents")} />
                        )}
                        {visibility.parents && !visibility.siblings && (
                            <ActionButton text="Reveal Siblings" onClick={() => toggleVisibility("siblings")} />
                        )}
                        {visibility.siblings && !visibility.extended && (
                            <ActionButton text="Reveal Aunties & Uncles" onClick={() => toggleVisibility("extended")} />
                        )}
                        {visibility.extended && !visibility.grandparents && (
                            <ActionButton text="Reveal Grandparents" onClick={() => toggleVisibility("grandparents")} />
                        )}
                        {visibility.extended && !visibility.children && (
                            <ActionButton text="Reveal Children" onClick={() => toggleVisibility("children")} />
                        )}
                    </div>
                </div>

                {/* Siblings */}
                {visibility.siblings && (
                    <div className="flex justify-center gap-20 relative">
                        <FamilyCard
                            label="ਭਰਾ"
                            value={names.brother}
                            onChange={(val) => handleNameChange("brother", val)}
                        />
                        <FamilyCard
                            label="ਭੈਣ"
                            value={names.sister}
                            onChange={(val) => handleNameChange("sister", val)}
                        />
                        <ConnectorLine />
                    </div>
                )}

                {/* Aunties & Uncles */}
                {visibility.extended && (
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                        <FamilyCard
                            label="ਚਾਚਾ"
                            value={names.uncle1}
                            onChange={(val) => handleNameChange("uncle1", val)}
                        />
                        <FamilyCard
                            label="ਚਾਚੀ"
                            value={names.aunt1}
                            onChange={(val) => handleNameChange("aunt1", val)}
                        />
                        <FamilyCard
                            label="ਮਾਮਾ"
                            value={names.uncle2}
                            onChange={(val) => handleNameChange("uncle2", val)}
                        />
                        <FamilyCard
                            label="ਮਾਸੀ"
                            value={names.aunt2}
                            onChange={(val) => handleNameChange("aunt2", val)}
                        />
                    </div>
                )}

                {/* Children */}
                {visibility.children && (
                    <div className="flex justify-center gap-20 relative">
                        <FamilyCard
                            label="ਪੁੱਤਰ"
                            value={names.son}
                            onChange={(val) => handleNameChange("son", val)}
                        />
                        <FamilyCard
                            label="ਧੀ"
                            value={names.daughter}
                            onChange={(val) => handleNameChange("daughter", val)}
                        />
                    </div>
                )}
            </div>
        </div>
    );
}

// 🟦 Components

function FamilyCard({ label, value, onChange }) {
    const phonetics = {
        "ਤੁਸੀਂ": "Tusi",
        "ਪਿਓ / ਪਿਤਾ": "Pio / Pita",
        "ਮਾਂ": "Maan",
        "ਭਰਾ": "Bhra",
        "ਭੈਣ": "Bhain",
        "ਚਾਚਾ": "Chacha",
        "ਚਾਚੀ": "Chachi",
        "ਮਾਮਾ": "Mama",
        "ਮਾਸੀ": "Maasi",
        "ਦਾਦਾ / ਨਾਨਾ": "Dada / Nana",
        "ਦਾਦੀ / ਨਾਨੀ": "Dadi / Nani",
        "ਪੁੱਤਰ": "Puttar",
        "ਧੀ": "Dhee"
    };

    return (
        <div className="bg-white border-2 border-gray-200 rounded-xl shadow-md px-6 py-4 text-center transition-all w-[160px] relative">
            <h3 className="text-sm font-semibold text-[var(--primary)] mb-1">{label}</h3>
            <p className="text-xs italic text-gray-500 mb-2">
                {phonetics[label] || "—"}
            </p>
            <input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full text-center px-2 py-1 border rounded text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300"
                placeholder="Enter Name"
            />
        </div>
    );
}

function ActionButton({ text, onClick }) {
    return (
        <button
            onClick={onClick}
            className="bg-blue-500 text-white px-5 py-2 rounded-lg text-sm font-semibold shadow-md hover:bg-blue-600 transition hover:scale-105"
        >
            {text}
        </button>
    );
}

function ConnectorLine() {
    return (
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-6 border-l-2 border-gray-400"></div>
    );
}
