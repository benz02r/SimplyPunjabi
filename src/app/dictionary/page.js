"use client";

import { useState, useEffect } from "react";

export default function DictionaryPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [results, setResults] = useState([]);
    const [suggestions, setSuggestions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [fetchingSuggestions, setFetchingSuggestions] = useState(false);

    // Fetch dictionary suggestions for autocomplete (debounced)
    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            if (searchTerm.length >= 2) {
                fetchSuggestions(searchTerm);
            } else {
                setSuggestions([]);
            }
        }, 300); // Delayed execution

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
        if (!searchTerm.trim()) return; // Prevent empty searches

        setLoading(true);
        setError(null);

        try {
            const res = await fetch(`/api/dictionary?search=${searchTerm.trim()}`);
            const data = await res.json();

            if (res.ok) {
                setResults(data);
            } else {
                setError("No results found.");
            }
        } catch (err) {
            setError("Network error. Try again.");
        }

        setLoading(false);
        setSuggestions([]);
        setSearchTerm("");
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

        setTimeout(() => handleSearch(), 0); // Delayed execution
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-white to-blue-50 px-6">
            <h1 className="text-4xl font-extrabold text-[var(--primary)]">📖 English to Punjabi Dictionary</h1>
            <p className="text-lg text-gray-700 mt-2">Search for an English word to find its Punjabi meaning.</p>

            {/* Search Input */}
            <div className="mt-6 relative w-72">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyDown={handleKeyPress}
                    placeholder="Enter an English word..."
                    className="px-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none"
                />
                <button
                    onClick={handleSearch}
                    disabled={loading}
                    className={`absolute right-2 top-1/2 transform -translate-y-1/2 
                                ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-orange-400 hover:bg-blue-600"} 
                                text-white px-4 py-1 rounded-md transition`}
                >
                    {loading ? "Searching..." : "Search"}
                </button>

                {/* Autocomplete Suggestions */}
                {suggestions.length > 0 && (
                    <ul className="absolute w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-40 overflow-y-auto z-10">
                        {suggestions.map((word, index) => (
                            <li
                                key={index}
                                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                onClick={() => handleSelectSuggestion(word)}
                            >
                                {word}
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            {/* Loading Indicator */}
            {loading && <p className="mt-4 text-gray-600">🔄 Searching...</p>}

            {/* Error Message */}
            {error && <p className="mt-4 text-red-500">{error}</p>}

            {/* Display Results */}
            <div className="mt-6 w-full max-w-2xl">
                {results.length > 0 ? (
                    <ul className="bg-white shadow-md rounded-lg p-6 space-y-4">
                        {results.map((word) => (
                            <li key={word.id} className="border-b pb-4 last:border-b-0">
                                <h2 className="text-2xl font-bold text-[var(--primary)]">{word.english_word}</h2>
                                <p className="text-xl text-gray-700">Punjabi: <span className="font-semibold">{word.punjabi_word}</span></p>
                                <p className="text-md text-gray-500">Pronunciation: <span className="italic">{word.phonetic}</span></p>
                            </li>
                        ))}
                    </ul>
                ) : (
                    !loading && <p className="mt-4 text-gray-500">No results found.</p>
                )}
            </div>
        </div>
    );
}
