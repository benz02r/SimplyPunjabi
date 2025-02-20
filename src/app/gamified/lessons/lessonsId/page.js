"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Challenge from "../../components/Challenge";

const lessonData = {
    alphabet: {
        title: "Punjabi Alphabet",
        challenges: [
            { question: "Which is the first letter of Gurmukhi?", options: ["ਅ", "ਕ", "ਗ"], answer: "ਅ" },
            { question: "Which letter represents 'K'?", options: ["ਖ", "ਕ", "ਚ"], answer: "ਕ" },
        ],
    },
};

export default function LessonPage() {
    const { lessonId } = useParams();
    const lesson = lessonData[lessonId];

    if (!lesson) {
        return (
            <div className="min-h-screen p-8 bg-[var(--background)] text-center">
                <h1 className="text-4xl font-bold text-red-500">Error: Lesson not found</h1>
                <p className="text-gray-600">The lesson you are looking for does not exist.</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen p-8 bg-[var(--background)] text-center">
            <h1 className="text-4xl font-bold text-[var(--primary)]">{lesson?.title}</h1>
            <Challenge challenges={lesson?.challenges || []} />
        </div>
    );
}
