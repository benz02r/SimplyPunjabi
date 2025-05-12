import { forwardRef } from "react";

const FamilyNode = forwardRef(function FamilyNode({ label, value, onChange }, ref) {
    return (
        <div
            ref={ref}
            className="flex flex-col items-center text-center relative z-10"
        >
            <div className="w-24 h-24 rounded-full bg-white border-2 border-[var(--primary)] shadow-lg flex items-center justify-center text-[var(--primary)] font-bold text-lg">
                👤
            </div>
            <h3 className="text-[var(--primary)] font-semibold mt-2">{label}</h3>
            <input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="mt-1 px-2 py-1 text-sm text-center border rounded shadow-sm w-32 focus:ring-orange-300 focus:outline-none"
                placeholder="Enter Name"
            />
        </div>
    );
});

export default FamilyNode;
