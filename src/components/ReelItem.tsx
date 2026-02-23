"use client";
import React, { useRef, useEffect } from "react";
import { Reel } from "@/data/reels";
import { motion, Variants, useInView } from "framer-motion";

interface ReelItemProps {
    reel: Reel;
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
    const isInView = useInView(videoRef, { once: false, amount: 0.2 });

    useEffect(() => {
        if (!videoRef.current) return;

        // Fallback if IntersectionObserver is missing/blocked
        if (typeof window !== 'undefined' && !('IntersectionObserver' in window)) {
            return;
        }

        if (isInView) {
            const promise = videoRef.current.play();
            if (promise !== undefined) {
                promise.catch((error) => {
                    if (error.name !== 'AbortError') {
                        console.error("Video play error:", error);
                    }
                });
            }
        } else {
            // Only pause if the readyState is sufficient, avoiding interrupting play promises too roughly
            if (videoRef.current.readyState >= 2) {
                videoRef.current.pause();
            }
        }
    }, [isInView]);


    return (
        <motion.div
            className={`relative rounded-xl overflow-hidden cursor-pointer group border border-white/10 ${isDimmed ? 'opacity-30 blur-[1px]' : 'opacity-100 blur-0'}`}
            style={{ transition: 'opacity 0.3s ease, filter 0.3s ease' }}
            whileHover="visible"
            initial="hidden"
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
                        poster={reel.poster}
                        className="w-full h-full object-cover"
                        preload="none"
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
