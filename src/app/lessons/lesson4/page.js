"use client";

import React, { useState } from "react";

const initialFamily = {
    grandparents: [
        { id: "gp1", name: "Dad's Dad", label: "ਦਾਦਾ" },
        { id: "gp2", name: "Dad's Mum", label: "ਦਾਦੀ" },
        { id: "gp3", name: "Mum's Dad", label: "ਨਾਨਾ" },
        { id: "gp4", name: "Mum's Mum", label: "ਨਾਨੀ" }
    ],
    parents: [
        { id: "p1", name: "Dad", label: "ਪਿਤਾ" },
        { id: "p2", name: "Mum", label: "ਮਾਂ" }
    ],
    you: { id: "you", name: "You", label: "ਤੁਸੀਂ" },
    spouse: { id: "spouse", name: "Spouse", label: "ਜੀਵਨ ਸਾਥੀ" },
};

const MemberCard = ({ person }) => (
    <div className="flex flex-col items-center mx-3 my-4">
        <div className="w-24 h-24 rounded-full bg-white border-2 border-blue-500 flex items-center justify-center shadow text-center text-sm font-medium text-blue-600">
            {person.name}
        </div>
        <p className="text-xs mt-1 text-gray-500">{person.label}</p>
    </div>
);

export default function FamilyTreeGrid() {
    const [siblings, setSiblings] = useState([
        { id: "sib1", name: "Sibling", label: "ਭੈਣ" }
    ]);
    const [children, setChildren] = useState([
        { id: "c1", name: "Child 1", label: "ਪੁੱਤਰ" },
        { id: "c2", name: "Child 2", label: "ਧੀ" }
    ]);

    const addSibling = () => {
        const next = siblings.length + 1;
        setSiblings([...siblings, {
            id: `sib${next}`,
            name: `Sibling ${next}`,
            label: "ਭਰਾ / ਭੈਣ"
        }]);
    };

    const addChild = () => {
        const next = children.length + 1;
        setChildren([...children, {
            id: `c${next}`,
            name: `Child ${next}`,
            label: next % 2 === 0 ? "ਧੀ" : "ਪੁੱਤਰ"
        }]);
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white px-6 pt-36 pb-12">
            <h1 className="text-4xl font-bold text-center text-blue-600 mb-10">Punjabi Family Tree</h1>

            {/* Add buttons */}
            <div className="text-center mb-6 space-x-4">
                <button onClick={addSibling} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">+ Add Sibling</button>
                <button onClick={addChild} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">+ Add Child</button>
            </div>

            <div className="relative z-10 flex flex-col gap-12 items-center">
                {/* Grandparents */}
                <div className="flex flex-wrap justify-center gap-8">
                    {initialFamily.grandparents.map(person => (
                        <MemberCard key={person.id} person={person} />
                    ))}
                </div>

                {/* Parents */}
                <div className="flex flex-wrap justify-center gap-10">
                    {initialFamily.parents.map(person => (
                        <MemberCard key={person.id} person={person} />
                    ))}
                </div>

                {/* You + Spouse */}
                <div className="flex flex-wrap justify-center gap-10">
                    <MemberCard person={initialFamily.you} />
                    <MemberCard person={initialFamily.spouse} />
                </div>

                {/* Siblings Row */}
                {siblings.length > 0 && (
                    <div className="flex flex-wrap justify-center gap-8">
                        {siblings.map(sib => (
                            <MemberCard key={sib.id} person={sib} />
                        ))}
                    </div>
                )}

                {/* Children Row */}
                {children.length > 0 && (
                    <div className="flex flex-wrap justify-center gap-8">
                        {children.map(child => (
                            <MemberCard key={child.id} person={child} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
