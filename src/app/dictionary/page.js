"use client";

import { useState, useEffect } from "react";
import { FaSearch, FaBook, FaVolumeUp, FaCheckCircle, FaTimes } from "react-icons/fa";

export default function DictionaryPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [results, setResults] = useState([]);
    const [suggestions, setSuggestions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [fetchingSuggestions, setFetchingSuggestions] = useState(false);
    const [searchHistory, setSearchHistory] = useState([]);

    // Load search history from memory on mount
    useEffect(() => {
        const history = [];
        setSearchHistory(history);
    }, []);

    // Fetch dictionary suggestions for autocomplete (debounced)
    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            if (searchTerm.length >= 2) {
                fetchSuggestions(searchTerm);
            } else {
                setSuggestions([]);
            }
        }, 300);

        return () => clearTimeout(delayDebounceFn);
    }, [searchTerm]);

    // Function to fetch dictionary words for autocomplete
    const fetchSuggestions = async (query) => {
        if (fetchingSuggestions) return;

        setFetchingSuggestions(true);

        try {
            const res = await fetch(`/api/dictionary?search=${query}`);
            const data = await res.json();

            if (res.ok) {
                setSuggestions(data.map(word => word.english_word));
            }
        } catch (err) {
            console.error("Error fetching suggestions:", err);
        }

        setFetchingSuggestions(false);
    };

    // Function to fetch dictionary word details
    const handleSearch = async () => {
        if (!searchTerm.trim()) return;

        setLoading(true);
        setError(null);

        try {
            const res = await fetch(`/api/dictionary?search=${searchTerm.trim()}`);
            const data = await res.json();

            if (res.ok && data.length > 0) {
                setResults(data);
                // Add to search history
                if (!searchHistory.includes(searchTerm.trim())) {
                    setSearchHistory(prev => [searchTerm.trim(), ...prev].slice(0, 5));
                }
            } else {
                setError(`No results found for "${searchTerm.trim()}"`);
                setResults([]);
            }
        } catch (err) {
            setError("Network error. Please try again.");
            setResults([]);
        }

        setLoading(false);
        setSuggestions([]);
    };

    // Handle "Enter" key press
    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            handleSearch();
        }
    };

    // Handle selecting an autocomplete suggestion
    const handleSelectSuggestion = (word) => {
        setSearchTerm(word);
        setSuggestions([]);
        setTimeout(() => {
            handleSearch();
        }, 100);
    };

    // Clear search
    const handleClearSearch = () => {
        setSearchTerm("");
        setResults([]);
        setError(null);
        setSuggestions([]);
    };

    // Speak Punjabi word
    const speak = (text) => {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = "pa-IN";
        window.speechSynthesis.speak(utterance);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50 px-4 sm:px-6 lg:px-8 pt-24 pb-16">
            <div className="max-w-5xl mx-auto">
                {/* Header */}
                <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-3xl p-8 sm:p-12 text-white shadow-xl mb-8 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full blur-3xl"></div>

                    <div className="relative z-10 text-center">
                        <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-4">
                            <FaBook className="text-blue-200" />
                            <span className="text-sm font-semibold">DICTIONARY</span>
                        </div>
                        <h1 className="text-4xl sm:text-5xl font-bold mb-4">
                            English to Punjabi Dictionary
                        </h1>
                        <p className="text-xl text-blue-100">
                            Search for any English word to find its Punjabi translation
                        </p>
                    </div>
                </div>

                {/* Search Tip */}
                <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl p-6 border-2 border-orange-200 mb-8">
                    <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                        <FaCheckCircle className="text-orange-600" />
                        <span>Search Tips</span>
                    </h3>
                    <p className="text-gray-700">
                        Type at least 2 letters to see suggestions. Press Enter or click Search to find translations. Use the audio button to hear pronunciation.
                    </p>
                </div>

                {/* Search Section */}
                <div className="bg-white rounded-3xl shadow-xl p-8 sm:p-10 border-2 border-gray-100 mb-8">
                    <div className="relative">
                        {/* Search Input */}
                        <div className="relative">
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                onKeyDown={handleKeyPress}
                                placeholder="Enter an English word..."
                                className="w-full px-6 py-4 pr-32 text-lg border-2 border-gray-300 rounded-xl focus:outline-none focus:border-blue-500 transition-all"
                            />
                            <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex gap-2">
                                {searchTerm && (
                                    <button
                                        onClick={handleClearSearch}
                                        className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                                    >
                                        <FaTimes className="text-xl" />
                                    </button>
                                )}
                                <button
                                    onClick={handleSearch}
                                    disabled={loading || !searchTerm.trim()}
                                    className={`flex items-center gap-2 px-6 py-2 rounded-lg font-semibold transition-all duration-300 ${
                                        loading || !searchTerm.trim()
                                            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                                            : "bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 shadow-lg hover:shadow-xl"
                                    }`}
                                >
                                    <FaSearch />
                                    {loading ? "Searching..." : "Search"}
                                </button>
                            </div>
                        </div>

                        {/* Autocomplete Suggestions */}
                        {suggestions.length > 0 && (
                            <div className="absolute w-full mt-2 bg-white border-2 border-gray-200 rounded-xl shadow-xl max-h-60 overflow-y-auto z-10">
                                {suggestions.map((word, index) => (
                                    <div
                                        key={index}
                                        className="px-6 py-3 hover:bg-blue-50 cursor-pointer transition-colors border-b border-gray-100 last:border-b-0"
                                        onClick={() => handleSelectSuggestion(word)}
                                    >
                                        <p className="text-gray-800 font-medium">{word}</p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Recent Searches */}
                    {searchHistory.length > 0 && !searchTerm && (
                        <div className="mt-6">
                            <p className="text-sm font-semibold text-gray-600 mb-3">Recent Searches:</p>
                            <div className="flex flex-wrap gap-2">
                                {searchHistory.map((term, index) => (
                                    <button
                                        key={index}
                                        onClick={() => {
                                            setSearchTerm(term);
                                            setTimeout(() => handleSearch(), 100);
                                        }}
                                        className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors text-sm font-medium"
                                    >
                                        {term}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Loading State */}
                {loading && (
                    <div className="bg-white rounded-3xl shadow-xl p-12 border-2 border-gray-100 text-center">
                        <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent mb-4"></div>
                        <p className="text-gray-600 font-medium">Searching dictionary...</p>
                    </div>
                )}

                {/* Error Message */}
                {error && !loading && (
                    <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-2xl p-6 border-2 border-red-200 text-center">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-red-200 rounded-full mb-4">
                            <FaTimes className="text-3xl text-red-600" />
                        </div>
                        <p className="text-gray-800 font-semibold text-lg mb-2">No Results Found</p>
                        <p className="text-gray-600">{error}</p>
                        <button
                            onClick={handleClearSearch}
                            className="mt-4 px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-semibold"
                        >
                            Try Another Search
                        </button>
                    </div>
                )}

                {/* Display Results */}
                {results.length > 0 && !loading && (
                    <div className="bg-white rounded-3xl shadow-xl p-8 sm:p-10 border-2 border-gray-100">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                            <FaCheckCircle className="text-green-500" />
                            Search Results ({results.length})
                        </h2>
                        <div className="space-y-6">
                            {results.map((word) => (
                                <div
                                    key={word.id}
                                    className="bg-gradient-to-br from-blue-50 to-orange-50 rounded-2xl p-6 border-2 border-gray-200 hover:border-blue-300 transition-all"
                                >
                                    <div className="flex items-start justify-between flex-wrap gap-4">
                                        <div className="flex-1">
                                            <h3 className="text-3xl font-bold text-gray-900 mb-2">
                                                {word.english_word}
                                            </h3>
                                            <div className="space-y-2">
                                                <div className="flex items-center gap-2">
                                                    <span className="text-sm font-semibold text-gray-600">Punjabi:</span>
                                                    <span className="text-2xl font-bold text-orange-600">
                                                        {word.punjabi_word}
                                                    </span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <span className="text-sm font-semibold text-gray-600">Pronunciation:</span>
                                                    <span className="text-lg italic text-gray-700">
                                                        {word.phonetic}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => speak(word.punjabi_word)}
                                            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                                        >
                                            <FaVolumeUp className="text-xl" />
                                            Listen
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Empty State */}
                {!loading && !error && results.length === 0 && (
                    <div className="bg-white rounded-3xl shadow-xl p-12 border-2 border-gray-100 text-center">
                        <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-100 rounded-full mb-6">
                            <FaBook className="text-4xl text-blue-600" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-800 mb-3">
                            Start Your Search
                        </h3>
                        <p className="text-gray-600 max-w-md mx-auto">
                            Enter an English word in the search box above to find its Punjabi translation and pronunciation.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}