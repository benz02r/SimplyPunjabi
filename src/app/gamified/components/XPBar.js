export default function XPBar({ xp }) {
    return (
        <div className="mt-6">
            <h2 className="text-xl font-bold text-[var(--primary)]">XP: {xp} / 1000</h2>
            <div className="w-full bg-gray-200 rounded-full h-5 mx-auto max-w-lg">
                <div className="bg-green-500 h-5 rounded-full transition-all duration-500" style={{ width: `${(xp / 1000) * 100}%` }}></div>
            </div>
        </div>
    );
}
