"use client";
import React, { useRef, useState } from "react";
import { MotionReel } from "@/data/motion-assets";
import { motion, Variants } from "framer-motion";

interface ReelItemProps {
    reel: MotionReel;
    isDimmed?: boolean;
}

const titleVariants: Variants = {
    hidden: { y: "100%" },
    visible: {
        y: "0%",
        transition: { duration: 0.4, ease: [0.33, 1, 0.68, 1] } // Custom cubic-bezier for smooth slide
    }
};

export default function ReelItem({ reel, isDimmed = false }: ReelItemProps) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isHovered, setIsHovered] = useState(false);

    return (
        <motion.div
            className={`relative rounded-xl overflow-hidden cursor-pointer group border border-white/10 ${isDimmed ? 'opacity-30 blur-[1px]' : 'opacity-100 blur-0'}`}
            style={{ transition: 'opacity 0.3s ease, filter 0.3s ease' }}
            whileHover="visible"
            initial="hidden"
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
        >
            <div className="relative aspect-video bg-black">
                <motion.div
                    className="w-full h-full"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                >
                    <video
                        ref={videoRef}
                        src={reel.src}
                        className="w-full h-full object-cover"
                        autoPlay
                        muted
                        loop
                        playsInline
                    />
                </motion.div>

                {/* Subtle Dark Overlay for contrast */}
                <div className="absolute inset-0 bg-black/10 pointer-events-none" />

                {/* Title Container - Bottom Left */}
                <div className="absolute bottom-0 left-0 p-6 w-full overflow-hidden">
                    <div className="overflow-hidden"> {/* Mask */}
                        <motion.h3
                            variants={titleVariants}
                            className="text-white font-mono uppercase tracking-widest text-xs md:text-sm"
                        >
                            {reel.title}
                        </motion.h3>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
