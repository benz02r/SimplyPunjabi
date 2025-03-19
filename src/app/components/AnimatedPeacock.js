import { motion } from "framer-motion";

export default function AnimatedPeacock({ speech }) {
    return (
        <div className="flex flex-col items-center justify-center h-64 relative">
            <motion.div
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                className="relative w-40 h-40"
            >
                {/* Speech Bubble */}
                {speech && (
                    <div className="absolute -top-16 left-16 bg-white shadow-md p-2 rounded-lg border border-gray-300 w-32 text-center text-sm text-gray-800">
                        {speech}
                    </div>
                )}

                {/* Peacock Feathers */}
                <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 grid grid-cols-3 gap-1">
                    {[...Array(5)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="w-8 h-12 bg-green-500 rounded-full border-2 border-blue-700"
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ repeat: Infinity, duration: 2, delay: i * 0.2 }}
                        />
                    ))}
                </div>

                {/* Peacock Body */}
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 h-20 bg-blue-500 rounded-full border-4 border-blue-700"></div>

                {/* Peacock Head */}
                <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 w-8 h-10 bg-blue-600 rounded-full border-2 border-blue-800"></div>

                {/* Peacock Eyes */}
                <div className="absolute bottom-[74px] left-1/2 transform -translate-x-3 w-2 h-2 bg-white rounded-full"></div>
                <div className="absolute bottom-[74px] left-1/2 transform translate-x-3 w-2 h-2 bg-white rounded-full"></div>

                {/* Peacock Beak */}
                <div className="absolute bottom-[65px] left-1/2 transform -translate-x-1 w-3 h-3 bg-orange-500 rounded-b-full"></div>

                {/* Peacock Feet */}
                <div className="absolute bottom-0 left-1/2 transform -translate-x-3 w-4 h-4 bg-orange-600 rounded-full"></div>
                <div className="absolute bottom-0 left-1/2 transform translate-x-3 w-4 h-4 bg-orange-600 rounded-full"></div>
            </motion.div>
        </div>
    );
}