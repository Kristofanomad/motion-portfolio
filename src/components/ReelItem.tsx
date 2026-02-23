"use client";
import React, { useRef, useEffect, useState } from "react";
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
    const [isStalled, setIsStalled] = useState(false);

    const handleManualPlay = (e: React.MouseEvent) => {
        e.stopPropagation(); // prevent other click events
        if (videoRef.current) {
            videoRef.current.play().catch(err => console.error("Manual play failed:", err));
            setIsStalled(false);
        }
    };

    useEffect(() => {
        if (!videoRef.current) return;

        // Fallback if IntersectionObserver is missing/blocked
        if (typeof window !== 'undefined' && !('IntersectionObserver' in window)) {
            return;
        }

        let stallTimeout: NodeJS.Timeout;

        if (isInView) {
            videoRef.current.load();
            const promise = videoRef.current.play();
            if (promise !== undefined) {
                promise.catch((error) => {
                    if (error.name !== 'AbortError') {
                        console.error("Video play error:", error);
                    }
                });
            }

            // Detect if video remains paused despite play attempt
            stallTimeout = setTimeout(() => {
                if (videoRef.current?.paused) {
                    setIsStalled(true);
                }
            }, 1500);

        } else {
            // Only pause if the readyState is sufficient, avoiding interrupting play promises too roughly
            if (videoRef.current.readyState >= 2) {
                videoRef.current.pause();
                setIsStalled(false); // Reset stall state when out of view
            }
        }

        return () => clearTimeout(stallTimeout);
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
                        autoPlay
                        muted
                        loop
                        playsInline
                    />
                </motion.div>

                {/* Manual Play Overlay */}
                {isStalled && (
                    <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/40 backdrop-blur-sm pointer-events-auto">
                        <button
                            onClick={handleManualPlay}
                            className="bg-white/20 hover:bg-white/30 text-white rounded-full p-4 transition-colors duration-200 border border-white/30"
                            aria-label="Play video manually"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 ml-1">
                                <path fillRule="evenodd" d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z" clipRule="evenodd" />
                            </svg>
                        </button>
                    </div>
                )}

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
