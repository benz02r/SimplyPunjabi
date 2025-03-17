"use client";

import { useEffect, useState } from "react";

export default function ComingSoon() {
    const [timeLeft, setTimeLeft] = useState(null); // Start as null to avoid hydration error

    function calculateTimeLeft() {
        const targetDate = new Date("2025-04-30T00:00:00Z").getTime(); // April 30, 2025 (UTC)
        const now = new Date().getTime();
        const difference = targetDate - now;

        if (difference <= 0) {
            return { days: 0, hours: 0, minutes: 0, seconds: 0 };
        }

        return {
            days: Math.floor(difference / (1000 * 60 * 60 * 24)),
            hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((difference / (1000 * 60)) % 60),
            seconds: Math.floor((difference / 1000) % 60),
        };
    }

    useEffect(() => {
        setTimeLeft(calculateTimeLeft()); // Set initial value only on the client

        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    if (!timeLeft) {
        return null; // Avoid rendering mismatched content until state is initialized
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-100 to-white text-gray-900 px-6 text-center">
            <h1 className="text-5xl font-extrabold text-orange-400">Simply Punjabi</h1>
            <h2 className="text-3xl font-extrabold text-blue-600 mt-2">Coming Soon!</h2>
            <p className="text-lg text-gray-700 mt-4">We are launching on April 30, 2025!</p>

            {/* Countdown Timer */}
            <div className="bg-white px-6 py-3 rounded-lg text-2xl font-semibold shadow-md mt-6">
                ⏳ {timeLeft.days}d : {timeLeft.hours}h : {timeLeft.minutes}m : {timeLeft.seconds}s
            </div>

            {/* Email Form */}

        </div>
    );
}

