"use client";

import { useState } from "react";
import SentenceBuilder from "../../components/SentenceBuilder";
import RolePlayScenario from "../../components/RolePlayScenario";
import PictureQuiz from "../../components/PictureQuiz";

const lessonSections = ["sentence-builder", "role-play", "picture-quiz"];

export default function BasicPhrasesLesson() {
    const [currentSection, setCurrentSection] = useState(0);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-[var(--background)]">
            <div className="p-6 bg-white rounded-xl shadow-md max-w-md w-full text-center">
                <h1 className="text-2xl font-bold text-[var(--primary)]">Basic Phrases 🎯</h1>

                {currentSection === 0 && <SentenceBuilder onNext={() => setCurrentSection(1)} />}
                {currentSection === 1 && <RolePlayScenario onNext={() => setCurrentSection(2)} />}
                {currentSection === 2 && <PictureQuiz onNext={() => alert("🎉 Lesson Complete!")} />}
            </div>
        </div>
    );
}
