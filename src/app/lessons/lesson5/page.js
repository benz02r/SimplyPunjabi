"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Lightbulb, Volume2, ArrowLeft, ArrowRight, CheckCircle, BookOpen, Users, MapPin } from 'lucide-react';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null;

export default function TopTipsLesson() {
    const router = useRouter();
    const [currentSection, setCurrentSection] = useState(0);
    const [showAnswer, setShowAnswer] = useState(false);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        fetchUser();
    }, []);

    const fetchUser = async () => {
        if (!supabase) return;
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
            setUserId(user.id);
        }
    };

    const playAudio = (text) => {
        const audio = new Audio(`/audio/${text}.mp3`);
        audio.play().catch(err => console.log('Audio playback failed:', err));
    };

    const sections = [
        {
            type: 'intro',
            title: 'Top Tips for Learning Punjabi',
            description: 'Essential tips and cultural insights to help you on your Punjabi learning journey',
            icon: Lightbulb
        },
        {
            type: 'content',
            title: 'Adding Respect with ਜੀ (Ji)',
            content: [
                {
                    text: 'Depending on the context, we add Ji at the end to convey respect',
                    gurmukhi: 'ਜੀ',
                    romanization: 'Ji',
                    audioFile: 'ji'
                },
                {
                    text: 'For example, we might say Mata Ji instead of just saying Mata',
                    gurmukhi: 'ਮਾਤਾ ਜੀ',
                    romanization: 'Mata Ji',
                    translation: 'Respected Mother',
                    audioFile: 'mata-ji'
                }
            ],
            example: 'Adding Ji shows respect and is commonly used when addressing elders or in formal situations.',
            icon: Users
        },
        {
            type: 'question',
            question: 'Why do we add "Ji" (ਜੀ) to names in Punjabi?',
            options: [
                'To make the name sound longer',
                'To convey respect',
                'To indicate the person is a family member',
                'It has no special meaning'
            ],
            correctAnswer: 1,
            explanation: 'We add Ji (ਜੀ) to convey respect, especially when addressing elders or in formal contexts.'
        },
        {
            type: 'content',
            title: 'Formal vs Informal "You"',
            content: [
                {
                    text: 'In Punjabi, how we address people older than us is different to how we may address people younger than us.',
                    emphasis: true
                },
                {
                    text: 'For someone OLDER than us, we use:',
                    gurmukhi: 'ਤੁਸੀਂ',
                    romanization: 'Tusi',
                    translation: 'You (formal/respectful)',
                    audioFile: 'tusi'
                },
                {
                    text: 'For someone YOUNGER than us, we use:',
                    gurmukhi: 'ਤੂੰ',
                    romanization: 'Tu',
                    translation: 'You (informal)',
                    audioFile: 'tu'
                }
            ],
            examples: [
                {
                    gurmukhi: 'ਤੁਸੀਂ ਕਿਵੇਂ ਹੋ?',
                    romanization: 'Tusi kiven ho?',
                    translation: 'How are you? (formal)',
                    audioFile: 'tusi-kiven-ho'
                },
                {
                    gurmukhi: 'ਤੂੰ ਕਿਵੇਂ ਹੈਂ?',
                    romanization: 'Tu kiven hain?',
                    translation: 'How are you? (informal)',
                    audioFile: 'tu-kiven-hain'
                }
            ],
            icon: Users
        },
        {
            type: 'question',
            question: 'Which pronoun should you use when speaking to your grandmother?',
            options: [
                'Tu (ਤੂੰ) - informal',
                'Tusi (ਤੁਸੀਂ) - formal',
                'Either one is fine',
                'Neither is correct'
            ],
            correctAnswer: 1,
            explanation: 'You should use Tusi (ਤੁਸੀਂ) when speaking to elders like your grandmother to show respect.'
        },
        {
            type: 'content',
            title: 'Regional Dialects of Punjab',
            content: [
                {
                    text: 'Punjab is split into three main regions, each with its own distinctive dialect:',
                    emphasis: true
                }
            ],
            regions: [
                {
                    name: 'Majha',
                    gurmukhi: 'ਮਾਝਾ',
                    description: 'Central region, includes cities like Amritsar and Lahore'
                },
                {
                    name: 'Doaba',
                    gurmukhi: 'ਦੋਆਬਾ',
                    description: 'Region between two rivers, includes Jalandhar'
                },
                {
                    name: 'Malwa',
                    gurmukhi: 'ਮਾਲਵਾ',
                    description: 'Southern region, includes Ludhiana and Patiala'
                }
            ],
            note: 'All three regions may use slightly different terms or words in their sentences. As you progress through the lessons, you\'ll see these variations!',
            icon: MapPin
        },
        {
            type: 'question',
            question: 'How many main regional dialects does Punjab have?',
            options: [
                'Two dialects',
                'Three dialects',
                'Five dialects',
                'Only one standard dialect'
            ],
            correctAnswer: 1,
            explanation: 'Punjab has three main regional dialects: Majha, Doaba, and Malwa. Each region has its own unique vocabulary and pronunciation.'
        },
        {
            type: 'completion',
            title: 'Great Work!',
            message: 'You\'ve learned essential tips for your Punjabi journey! Remember these cultural nuances as you continue learning.',
            icon: CheckCircle
        }
    ];

    const currentSectionData = sections[currentSection];

    const handleNext = () => {
        if (currentSection < sections.length - 1) {
            setCurrentSection(currentSection + 1);
            setShowAnswer(false);
            setSelectedAnswer(null);
        }
    };

    const handlePrevious = () => {
        if (currentSection > 0) {
            setCurrentSection(currentSection - 1);
            setShowAnswer(false);
            setSelectedAnswer(null);
        }
    };

    const handleAnswerSelect = (index) => {
        setSelectedAnswer(index);
        setShowAnswer(true);
    };

    const markLessonComplete = async () => {
        if (!userId || !supabase) return;

        try {
            const { error } = await supabase
                .from('lesson_progress')
                .upsert({
                    user_id: userId,
                    lesson_id: 'top-tips',
                    completed: true,
                    completed_at: new Date().toISOString()
                });

            if (error) throw error;
        } catch (error) {
            console.error('Error marking lesson complete:', error);
        }
    };

    const handleComplete = async () => {
        await markLessonComplete();
        router.push('/learning/essential-punjabi');
    };

    // Intro Section
    if (currentSectionData.type === 'intro') {
        const Icon = currentSectionData.icon;
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50 pt-24 pb-12 px-4">
                <div className="max-w-4xl mx-auto">
                    <button
                        onClick={() => router.push('/learning/essential-punjabi')}
                        className="mb-6 flex items-center text-blue-600 hover:text-blue-700 transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5 mr-2" />
                        Back to Lessons
                    </button>

                    <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-blue-100">
                        <div className="flex items-center justify-center mb-6">
                            <div className="bg-gradient-to-r from-blue-500 to-orange-500 p-4 rounded-full">
                                <Icon className="w-12 h-12 text-white" />
                            </div>
                        </div>

                        <h1 className="text-4xl font-bold text-center mb-4 bg-gradient-to-r from-blue-600 to-orange-600 bg-clip-text text-transparent">
                            {currentSectionData.title}
                        </h1>

                        <p className="text-xl text-gray-700 text-center mb-8">
                            {currentSectionData.description}
                        </p>

                        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg mb-8">
                            <p className="text-gray-700">
                                <strong>What you'll learn:</strong> Cultural nuances, respectful language usage, and regional dialect differences that will enhance your Punjabi communication skills.
                            </p>
                        </div>

                        <button
                            onClick={handleNext}
                            className="w-full bg-gradient-to-r from-blue-500 to-orange-500 text-white py-4 rounded-xl font-semibold text-lg hover:shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center justify-center"
                        >
                            Start Learning
                            <ArrowRight className="w-5 h-5 ml-2" />
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // Content Section
    if (currentSectionData.type === 'content') {
        const Icon = currentSectionData.icon;
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50 pt-24 pb-12 px-4">
                <div className="max-w-4xl mx-auto">
                    <div className="mb-6 flex items-center justify-between">
                        <button
                            onClick={() => router.push('/learning/essential-punjabi')}
                            className="flex items-center text-blue-600 hover:text-blue-700 transition-colors"
                        >
                            <ArrowLeft className="w-5 h-5 mr-2" />
                            Back to Lessons
                        </button>
                        <div className="text-sm text-gray-600">
                            Section {currentSection} of {sections.length - 1}
                        </div>
                    </div>

                    <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-blue-100">
                        <div className="flex items-center mb-6">
                            <div className="bg-gradient-to-r from-blue-500 to-orange-500 p-3 rounded-full mr-4">
                                <Icon className="w-8 h-8 text-white" />
                            </div>
                            <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-orange-600 bg-clip-text text-transparent">
                                {currentSectionData.title}
                            </h2>
                        </div>

                        <div className="space-y-6">
                            {currentSectionData.content.map((item, index) => (
                                <div key={index} className={`${item.emphasis ? 'bg-orange-50 p-4 rounded-lg border-l-4 border-orange-500' : ''}`}>
                                    <p className="text-lg text-gray-700 mb-3">{item.text}</p>

                                    {item.gurmukhi && (
                                        <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200">
                                            <div className="text-center mb-4">
                                                <div className="text-5xl font-bold text-gray-800 mb-2">{item.gurmukhi}</div>
                                                <div className="text-2xl text-blue-600 font-semibold mb-2">{item.romanization}</div>
                                                {item.translation && (
                                                    <div className="text-lg text-gray-600">{item.translation}</div>
                                                )}
                                            </div>

                                            {item.audioFile && (
                                                <button
                                                    onClick={() => playAudio(item.audioFile)}
                                                    className="w-full bg-gradient-to-r from-blue-500 to-orange-500 text-white py-3 rounded-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center justify-center"
                                                >
                                                    <Volume2 className="w-5 h-5 mr-2" />
                                                    Listen to Pronunciation
                                                </button>
                                            )}
                                        </div>
                                    )}
                                </div>
                            ))}

                            {currentSectionData.example && (
                                <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
                                    <p className="text-gray-700">
                                        <strong>Note:</strong> {currentSectionData.example}
                                    </p>
                                </div>
                            )}

                            {currentSectionData.examples && (
                                <div className="space-y-4">
                                    <h3 className="text-xl font-semibold text-gray-800">Examples:</h3>
                                    {currentSectionData.examples.map((example, index) => (
                                        <div key={index} className="bg-white rounded-xl p-6 shadow-md border border-gray-200">
                                            <div className="text-center mb-4">
                                                <div className="text-4xl font-bold text-gray-800 mb-2">{example.gurmukhi}</div>
                                                <div className="text-xl text-blue-600 font-semibold mb-2">{example.romanization}</div>
                                                <div className="text-lg text-gray-600">{example.translation}</div>
                                            </div>

                                            {example.audioFile && (
                                                <button
                                                    onClick={() => playAudio(example.audioFile)}
                                                    className="w-full bg-gradient-to-r from-blue-500 to-orange-500 text-white py-3 rounded-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center justify-center"
                                                >
                                                    <Volume2 className="w-5 h-5 mr-2" />
                                                    Listen to Pronunciation
                                                </button>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}

                            {currentSectionData.regions && (
                                <div className="space-y-4">
                                    {currentSectionData.regions.map((region, index) => (
                                        <div key={index} className="bg-gradient-to-r from-blue-50 to-orange-50 rounded-xl p-6 border border-blue-200">
                                            <div className="flex items-center mb-2">
                                                <MapPin className="w-6 h-6 text-orange-600 mr-2" />
                                                <h4 className="text-2xl font-bold text-gray-800">{region.name}</h4>
                                                <span className="ml-3 text-3xl text-gray-700">{region.gurmukhi}</span>
                                            </div>
                                            <p className="text-gray-700">{region.description}</p>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {currentSectionData.note && (
                                <div className="bg-orange-50 border-l-4 border-orange-500 p-4 rounded-r-lg">
                                    <p className="text-gray-700">
                                        <strong>Important:</strong> {currentSectionData.note}
                                    </p>
                                </div>
                            )}
                        </div>

                        <div className="flex justify-between mt-8">
                            <button
                                onClick={handlePrevious}
                                disabled={currentSection === 0}
                                className="flex items-center px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <ArrowLeft className="w-5 h-5 mr-2" />
                                Previous
                            </button>

                            <button
                                onClick={handleNext}
                                className="flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-orange-500 text-white rounded-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200"
                            >
                                Continue
                                <ArrowRight className="w-5 h-5 ml-2" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Question Section
    if (currentSectionData.type === 'question') {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50 pt-24 pb-12 px-4">
                <div className="max-w-4xl mx-auto">
                    <div className="mb-6 flex items-center justify-between">
                        <button
                            onClick={() => router.push('/learning/essential-punjabi')}
                            className="flex items-center text-blue-600 hover:text-blue-700 transition-colors"
                        >
                            <ArrowLeft className="w-5 h-5 mr-2" />
                            Back to Lessons
                        </button>
                        <div className="text-sm text-gray-600">
                            Section {currentSection} of {sections.length - 1}
                        </div>
                    </div>

                    <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-blue-100">
                        <div className="flex items-center mb-6">
                            <div className="bg-gradient-to-r from-blue-500 to-orange-500 p-3 rounded-full mr-4">
                                <BookOpen className="w-8 h-8 text-white" />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-800">Quick Check</h2>
                        </div>

                        <div className="bg-blue-50 rounded-xl p-6 mb-6">
                            <p className="text-xl font-semibold text-gray-800">{currentSectionData.question}</p>
                        </div>

                        <div className="space-y-3 mb-6">
                            {currentSectionData.options.map((option, index) => (
                                <button
                                    key={index}
                                    onClick={() => handleAnswerSelect(index)}
                                    disabled={showAnswer}
                                    className={`w-full p-4 rounded-xl text-left font-semibold transition-all duration-200 ${
                                        showAnswer
                                            ? index === currentSectionData.correctAnswer
                                                ? 'bg-green-100 border-2 border-green-500 text-green-800'
                                                : index === selectedAnswer
                                                    ? 'bg-red-100 border-2 border-red-500 text-red-800'
                                                    : 'bg-gray-100 text-gray-600'
                                            : 'bg-white border-2 border-gray-200 hover:border-blue-400 hover:bg-blue-50 text-gray-800'
                                    } ${showAnswer ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                                >
                                    {option}
                                </button>
                            ))}
                        </div>

                        {showAnswer && (
                            <div className={`p-4 rounded-xl mb-6 ${
                                selectedAnswer === currentSectionData.correctAnswer
                                    ? 'bg-green-50 border-l-4 border-green-500'
                                    : 'bg-orange-50 border-l-4 border-orange-500'
                            }`}>
                                <p className="font-semibold mb-2 text-gray-800">
                                    {selectedAnswer === currentSectionData.correctAnswer ? '✓ Correct!' : 'Not quite!'}
                                </p>
                                <p className="text-gray-700">{currentSectionData.explanation}</p>
                            </div>
                        )}

                        <div className="flex justify-between mt-8">
                            <button
                                onClick={handlePrevious}
                                className="flex items-center px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
                            >
                                <ArrowLeft className="w-5 h-5 mr-2" />
                                Previous
                            </button>

                            <button
                                onClick={handleNext}
                                disabled={!showAnswer}
                                className="flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-orange-500 text-white rounded-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Continue
                                <ArrowRight className="w-5 h-5 ml-2" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Completion Section
    if (currentSectionData.type === 'completion') {
        const Icon = currentSectionData.icon;
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50 pt-24 pb-12 px-4">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-blue-100 text-center">
                        <div className="flex items-center justify-center mb-6">
                            <div className="bg-gradient-to-r from-green-500 to-blue-500 p-4 rounded-full animate-bounce">
                                <Icon className="w-16 h-16 text-white" />
                            </div>
                        </div>

                        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-orange-600 bg-clip-text text-transparent">
                            {currentSectionData.title}
                        </h1>

                        <p className="text-xl text-gray-700 mb-8">
                            {currentSectionData.message}
                        </p>

                        <div className="bg-gradient-to-r from-blue-50 to-orange-50 rounded-xl p-6 mb-8">
                            <h3 className="text-lg font-semibold text-gray-800 mb-3">Key Takeaways:</h3>
                            <ul className="text-left space-y-2 text-gray-700">
                                <li>• Use "Ji" (ਜੀ) to show respect</li>
                                <li>• "Tusi" (ਤੁਸੀਂ) for elders, "Tu" (ਤੂੰ) for younger people</li>
                                <li>• Three main dialects: Majha, Doaba, and Malwa</li>
                            </ul>
                        </div>

                        <button
                            onClick={handleComplete}
                            className="w-full bg-gradient-to-r from-blue-500 to-orange-500 text-white py-4 rounded-xl font-semibold text-lg hover:shadow-lg transform hover:scale-105 transition-all duration-200"
                        >
                            Return to Lessons
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return null;
}