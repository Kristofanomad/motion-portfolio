"use client";

import { useState } from "react";
import { motion, Variants } from "framer-motion";
import ReelItem from "./ReelItem";
import { Reel } from "@/data/reels";

interface ReelGridProps {
    reels: Reel[];
}

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
        },
    },
};

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            type: "spring",
            stiffness: 100,
            damping: 15,
        },
    },
};

export default function ReelGrid({ reels }: ReelGridProps) {
    const [hoveredReelId, setHoveredReelId] = useState<string | null>(null);

    return (
        <motion.div
            className="columns-1 md:columns-2 lg:columns-3 gap-8 w-full space-y-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            {reels.map((reel) => (
                <motion.div
                    key={reel.id}
                    variants={itemVariants}
                    className="break-inside-avoid mb-8"
                    onMouseEnter={() => setHoveredReelId(reel.id)}
                    onMouseLeave={() => setHoveredReelId(null)}
                >
                    <ReelItem
                        reel={reel}
                        isDimmed={hoveredReelId !== null && hoveredReelId !== reel.id}
                    />
                </motion.div>
            ))}
        </motion.div>
    );
}
