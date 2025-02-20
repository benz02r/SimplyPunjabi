export default function ProgressBar({ value, max }) {
    const percentage = (value / max) * 100;

    return (
        <div className="w-full bg-gray-200 rounded-full h-5 mt-2">
            <div className="bg-[var(--primary)] h-5 rounded-full transition-all duration-500" style={{ width: `${percentage}%` }}></div>
        </div>
    );
}
