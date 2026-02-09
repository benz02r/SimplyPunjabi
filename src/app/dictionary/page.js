"use client";

import { useState, useEffect, useRef } from "react";
import { Volume2, Search, Filter, X, Loader2, Pause, ChevronDown } from "lucide-react";

export default function DictionaryPage() {
    const [words, setWords] = useState([]);
    const [filteredWords, setFilteredWords] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showFilters, setShowFilters] = useState(false);

    useEffect(() => {
        fetchWords();
    }, []);

    useEffect(() => {
        filterWords();
    }, [searchTerm, selectedCategory, words]);

    const fetchWords = async () => {
        try {
            setError(null);
            const response = await fetch("/api/dictionary");
            if (!response.ok) throw new Error("Failed to fetch dictionary");
            const data = await response.json();

            if (!Array.isArray(data)) {
                throw new Error("Invalid data format received");
            }

            setWords(data);

            // Extract unique categories
            const uniqueCategories = [
                ...new Set(
                    data
                        .map((word) => word?.category)
                        .filter((category) => category && category.trim() !== "")
                ),
            ].sort();
            setCategories(["All", ...uniqueCategories]);
        } catch (error) {
            console.error("Error fetching words:", error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const filterWords = () => {
        let filtered = words;

        if (searchTerm && searchTerm.trim() !== "") {
            const searchLower = searchTerm.toLowerCase();
            filtered = filtered.filter((word) => {
                if (!word) return false;

                const englishMatch = word.english_word?.toLowerCase().includes(searchLower);
                const punjabMatch = word.punjabi_word?.includes(searchTerm);
                const phoneticMatch = word.phonetic?.toLowerCase().includes(searchLower);

                return englishMatch || punjabMatch || phoneticMatch;
            });
        }

        if (selectedCategory !== "All") {
            filtered = filtered.filter((word) => word?.category === selectedCategory);
        }

        setFilteredWords(filtered);
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-orange-50 flex items-center justify-center px-4">
                <div className="text-center">
                    <Loader2 className="w-12 h-12 animate-spin text-blue-500 mx-auto mb-4" />
                    <p className="text-gray-600">Loading dictionary...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-orange-50 flex items-center justify-center px-4">
                <div className="text-center max-w-md mx-auto">
                    <div className="bg-white border border-red-200 rounded-2xl p-6 shadow-lg">
                        <h2 className="text-2xl font-bold text-red-600 mb-2">Error Loading Dictionary</h2>
                        <p className="text-red-700 mb-6">{error}</p>
                        <button
                            onClick={fetchWords}
                            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-orange-500 text-white rounded-xl hover:from-blue-600 hover:to-orange-600 transition-all font-semibold"
                        >
                            Try Again
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-orange-50 pb-8 pt-16 sm:pt-20">
            {/* Header */}
            <div className="bg-white border-b border-gray-200 sticky top-16 sm:top-20 z-10 shadow-sm">
                <div className="max-w-6xl mx-auto px-4 py-6 sm:py-8">
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-600 to-orange-500 bg-clip-text text-transparent mb-2">
                        Punjabi Dictionary
                    </h1>
                    <p className="text-base sm:text-lg text-gray-600">
                        Explore {words.length} essential words
                    </p>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-4 pt-6">
                {/* Search and Filter Section */}
                <div className="bg-white rounded-2xl shadow-md p-4 sm:p-6 mb-6">
                    {/* Search Bar - Always Visible */}
                    <div className="relative mb-4">
                        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Search in English, Punjabi, or phonetic..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-12 pr-12 py-3 sm:py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base"
                        />
                        {searchTerm && (
                            <button
                                onClick={() => setSearchTerm("")}
                                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                                aria-label="Clear search"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        )}
                    </div>

                    {/* Mobile Filter Toggle */}
                    <button
                        onClick={() => setShowFilters(!showFilters)}
                        className="sm:hidden w-full flex items-center justify-between py-3 px-4 bg-gray-50 rounded-xl border border-gray-200 mb-4"
                    >
                        <div className="flex items-center gap-2">
                            <Filter className="w-5 h-5 text-gray-600" />
                            <span className="font-medium text-gray-700">
                                {selectedCategory === "All" ? "All Categories" : selectedCategory}
                            </span>
                        </div>
                        <ChevronDown className={`w-5 h-5 text-gray-600 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
                    </button>

                    {/* Category Filter - Desktop Always Visible, Mobile Collapsible */}
                    <div className={`${showFilters ? 'block' : 'hidden'} sm:block`}>
                        <div className="flex flex-wrap gap-2">
                            {categories.map((category) => (
                                <button
                                    key={category}
                                    onClick={() => {
                                        setSelectedCategory(category);
                                        setShowFilters(false);
                                    }}
                                    className={`px-4 py-2 rounded-xl font-medium transition-all ${
                                        selectedCategory === category
                                            ? 'bg-gradient-to-r from-blue-500 to-orange-500 text-white shadow-md'
                                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Results Count */}
                    <div className="mt-4 pt-4 border-t border-gray-100">
                        <p className="text-sm text-gray-600">
                            Showing <span className="font-semibold text-gray-900">{filteredWords.length}</span> of {words.length} words
                        </p>
                    </div>
                </div>

                {/* Dictionary Grid */}
                {filteredWords.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                        {filteredWords.map((word) => (
                            <DictionaryWord key={word.id} word={word} />
                        ))}
                    </div>
                ) : (
                    /* No Results Message */
                    <div className="text-center py-16 px-4">
                        <div className="bg-white rounded-2xl p-8 sm:p-12 shadow-md max-w-md mx-auto">
                            <div className="text-6xl mb-4">🔍</div>
                            <h3 className="text-2xl font-bold text-gray-800 mb-2">No words found</h3>
                            <p className="text-gray-600 mb-6">
                                Try adjusting your search or filters
                            </p>
                            <button
                                onClick={() => {
                                    setSearchTerm("");
                                    setSelectedCategory("All");
                                }}
                                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-orange-500 text-white rounded-xl hover:from-blue-600 hover:to-orange-600 transition-all font-semibold"
                            >
                                Clear All Filters
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

function DictionaryWord({ word }) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [audioError, setAudioError] = useState(false);
    const audioRef = useRef(null);

    if (!word || !word.id || !word.punjabi_word) {
        return null;
    }

    const playAudio = async () => {
        if (isPlaying) {
            audioRef.current?.pause();
            setIsPlaying(false);
            return;
        }

        setIsLoading(true);
        setAudioError(false);

        try {
            // Call dictionary endpoint for audio
            const response = await fetch("/api/dictionary", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    text: word.punjabi_word,
                    languageCode: 'pa-IN',
                    voiceName: 'pa-IN-Wavenet-A',
                    speakingRate: 0.9
                }),
            });

            if (!response.ok) {
                throw new Error(`Audio generation failed: ${response.status}`);
            }

            // Your API returns base64 audio in JSON format
            const { audioContent } = await response.json();

            // Convert base64 to blob
            const audioBlob = base64ToBlob(audioContent, 'audio/mpeg');
            const audioUrl = URL.createObjectURL(audioBlob);

            if (audioRef.current) {
                audioRef.current.src = audioUrl;
                await audioRef.current.play();
                setIsPlaying(true);
            }
        } catch (error) {
            console.error("Error playing audio:", error);
            setAudioError(true);
        } finally {
            setIsLoading(false);
        }
    };

    // Helper function to convert base64 to blob
    const base64ToBlob = (base64, mimeType) => {
        const byteCharacters = atob(base64);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        return new Blob([byteArray], { type: mimeType });
    };

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        const handleEnded = () => setIsPlaying(false);
        const handlePause = () => setIsPlaying(false);
        const handleError = () => {
            setIsPlaying(false);
            setAudioError(true);
        };

        audio.addEventListener("ended", handleEnded);
        audio.addEventListener("pause", handlePause);
        audio.addEventListener("error", handleError);

        return () => {
            audio.removeEventListener("ended", handleEnded);
            audio.removeEventListener("pause", handlePause);
            audio.removeEventListener("error", handleError);
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

        if (Array.isArray(tags)) {
            return tags[0] || "default";
        }

        if (typeof tags === 'string') {
            try {
                const tagArray = JSON.parse(tags);
                if (Array.isArray(tagArray) && tagArray.length > 0) {
                    return tagArray[0];
                }
            } catch (error) {
                console.error("Error parsing tags for word:", word.id, error);
            }
        }

        return "default";
    };

    const primaryCategory = getPrimaryCategory(word.tags);
    const categoryColor = categoryColors[primaryCategory] || categoryColors.default;

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-5 sm:p-6 hover:shadow-lg transition-all duration-200 hover:scale-[1.02]">
            <audio ref={audioRef} />

            <div className="flex items-start justify-between gap-4 mb-4">
                <div className="flex-1 min-w-0">
                    <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1 break-words">
                        {word.punjabi_word || "—"}
                    </h3>
                    <p className="text-base sm:text-lg text-gray-600 mb-2 break-words">
                        {word.phonetic || ""}
                    </p>
                    <p className="text-lg sm:text-xl text-gray-800 font-medium break-words">
                        {word.english_word || "—"}
                    </p>
                </div>

                <button
                    onClick={playAudio}
                    disabled={isLoading || audioError}
                    className="flex-shrink-0 p-3 sm:p-4 bg-gradient-to-r from-blue-500 to-orange-500 text-white rounded-full hover:from-blue-600 hover:to-orange-600 transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-md disabled:hover:scale-100 active:scale-95"
                    aria-label="Play pronunciation"
                    title={audioError ? "Audio unavailable" : "Play pronunciation"}
                >
                    {isLoading ? (
                        <Loader2 className="w-5 h-5 sm:w-6 sm:h-6 animate-spin" />
                    ) : isPlaying ? (
                        <Pause className="w-5 h-5 sm:w-6 sm:h-6" />
                    ) : (
                        <Volume2 className="w-5 h-5 sm:w-6 sm:h-6" />
                    )}
                </button>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
                <span className="text-sm text-gray-500 font-medium">
                    {word.category || "Uncategorized"}
                </span>
                {primaryCategory !== "default" && (
                    <span className={`text-xs px-3 py-1 rounded-full font-medium ${categoryColor}`}>
                        {primaryCategory}
                    </span>
                )}
            </div>

            {audioError && (
                <div className="mt-3 text-xs text-red-600 bg-red-50 px-3 py-2 rounded-lg">
                    Audio temporarily unavailable
                </div>
            )}
        </div>
    );
}