"use client";

import { useState, useEffect, useRef } from "react";
import { Volume2, Search, Filter, X, Loader2, Pause } from "lucide-react";

export default function DictionaryPage() {
    const [words, setWords] = useState([]);
    const [filteredWords, setFilteredWords] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchWords();
    }, []);

    useEffect(() => {
        filterWords();
    }, [searchTerm, selectedCategory, words]);

    const fetchWords = async () => {
        try {
            const response = await fetch("/api/dictionary");
            if (!response.ok) throw new Error("Failed to fetch dictionary");
            const data = await response.json();

            setWords(data);

            // Extract unique categories
            const uniqueCategories = [
                ...new Set(data.map((word) => word.category)),
            ].sort();
            setCategories(["All", ...uniqueCategories]);
        } catch (error) {
            console.error("Error fetching words:", error);
        } finally {
            setLoading(false);
        }
    };

    const filterWords = () => {
        let filtered = words;

        // Filter by search term
        if (searchTerm) {
            filtered = filtered.filter(
                (word) =>
                    word.english_word.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    word.punjabi_word.includes(searchTerm) ||
                    word.phonetic.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Filter by category
        if (selectedCategory !== "All") {
            filtered = filtered.filter((word) => word.category === selectedCategory);
        }

        setFilteredWords(filtered);
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-orange-50 flex items-center justify-center">
                <div className="text-center">
                    <Loader2 className="w-12 h-12 animate-spin text-blue-500 mx-auto mb-4" />
                    <p className="text-gray-600">Loading dictionary...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-orange-50 py-12 px-4">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-orange-500 bg-clip-text text-transparent mb-4">
                        Punjabi Dictionary
                    </h1>
                    <p className="text-xl text-gray-600">
                        Explore {words.length} essential Punjabi words
                    </p>
                </div>

                {/* Search and Filter */}
                <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                    <div className="flex flex-col md:flex-row gap-4">
                        {/* Search Bar */}
                        <div className="flex-1 relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                                type="text"
                                placeholder="Search in English, Punjabi, or phonetic..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                            {searchTerm && (
                                <button
                                    onClick={() => setSearchTerm("")}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            )}
                        </div>

                        {/* Category Filter */}
                        <div className="relative md:w-64">
                            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <select
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
                            >
                                {categories.map((category) => (
                                    <option key={category} value={category}>
                                        {category}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Results count */}
                    <div className="mt-4 text-sm text-gray-600">
                        Showing {filteredWords.length} of {words.length} words
                    </div>
                </div>

                {/* Dictionary Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredWords.map((word) => (
                        <DictionaryWord key={word.id} word={word} />
                    ))}
                </div>

                {/* No results message */}
                {filteredWords.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-xl text-gray-600 mb-4">No words found</p>
                        <button
                            onClick={() => {
                                setSearchTerm("");
                                setSelectedCategory("All");
                            }}
                            className="text-blue-500 hover:text-blue-600 underline"
                        >
                            Clear filters
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

function DictionaryWord({ word }) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const audioRef = useRef(null);

    const playAudio = async () => {
        if (isPlaying) {
            audioRef.current?.pause();
            setIsPlaying(false);
            return;
        }

        setIsLoading(true);
        try {
            // Try local pre-generated audio first
            const localAudioUrl = `/audio/dictionary/${word.id}.mp3`;

            // Test if local file exists
            const headResponse = await fetch(localAudioUrl, { method: 'HEAD' });

            if (headResponse.ok) {
                // Use pre-generated audio (fast path)
                console.log(`Playing pre-generated audio for: ${word.punjabi_word}`);
                if (audioRef.current) {
                    audioRef.current.src = localAudioUrl;
                    await audioRef.current.play();
                    setIsPlaying(true);
                }
            } else {
                // Fallback to Google Cloud TTS API (for new words not yet generated)
                console.log(`Generating audio via API for: ${word.punjabi_word}`);
                const response = await fetch("/api/text-to-speech", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        text: word.punjabi_word,
                        useSSML: true
                    }),
                });

                if (!response.ok) throw new Error("Failed to generate speech");

                const audioBlob = await response.blob();
                const audioUrl = URL.createObjectURL(audioBlob);

                if (audioRef.current) {
                    audioRef.current.src = audioUrl;
                    await audioRef.current.play();
                    setIsPlaying(true);
                }
            }
        } catch (error) {
            console.error("Error playing audio:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        const handleEnded = () => setIsPlaying(false);
        const handlePause = () => setIsPlaying(false);

        audio.addEventListener("ended", handleEnded);
        audio.addEventListener("pause", handlePause);

        return () => {
            audio.removeEventListener("ended", handleEnded);
            audio.removeEventListener("pause", handlePause);
        };
    }, []);

    const categoryColors = {
        Family: "bg-blue-100 text-blue-800",
        Food: "bg-green-100 text-green-800",
        "Food & Drink": "bg-green-100 text-green-800",
        Greetings: "bg-purple-100 text-purple-800",
        Numbers: "bg-orange-100 text-orange-800",
        Actions: "bg-red-100 text-red-800",
        Time: "bg-yellow-100 text-yellow-800",
        Colors: "bg-pink-100 text-pink-800",
        Emotions: "bg-indigo-100 text-indigo-800",
        default: "bg-gray-100 text-gray-800",
    };

    const getPrimaryCategory = (tags) => {
        if (!tags) return "default";
        const tagArray = JSON.parse(tags);
        return tagArray[0] || "default";
    };

    const primaryCategory = getPrimaryCategory(word.tags);
    const categoryColor =
        categoryColors[primaryCategory] || categoryColors.default;

    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <audio ref={audioRef} />

            <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-900 mb-1">
                        {word.punjabi_word}
                    </h3>
                    <p className="text-lg text-gray-600 mb-2">{word.phonetic}</p>
                    <p className="text-xl text-gray-800">{word.english_word}</p>
                </div>

                <button
                    onClick={playAudio}
                    disabled={isLoading}
                    className="flex-shrink-0 ml-4 p-3 bg-gradient-to-r from-blue-500 to-orange-500 text-white rounded-full hover:from-blue-600 hover:to-orange-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    aria-label="Play pronunciation"
                >
                    {isLoading ? (
                        <Loader2 className="w-6 h-6 animate-spin" />
                    ) : isPlaying ? (
                        <Pause className="w-6 h-6" />
                    ) : (
                        <Volume2 className="w-6 h-6" />
                    )}
                </button>
            </div>

            <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500">{word.category}</span>
                <span className={`text-xs px-2 py-1 rounded ${categoryColor}`}>
          {primaryCategory}
        </span>
            </div>
        </div>
    );
}