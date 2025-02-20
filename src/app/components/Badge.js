export default function Badge({ name }) {
    return (
        <div className="p-3 bg-yellow-300 text-black font-semibold rounded-lg shadow-md">
            🏅 {name}
        </div>
    );
}
