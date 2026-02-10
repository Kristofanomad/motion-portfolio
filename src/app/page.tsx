"use client";
import React from 'react';
import { MOTION_REELS } from '@/data/motion-assets';
import ReelGrid from '@/components/ReelGrid';

export default function Page() {
  const handleScroll = () => {
    const workSection = document.getElementById('work');
    if (workSection) {
      workSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <main className="w-full bg-black min-h-screen">
      {/* --- HERO SECTION --- */}
      <section className="relative h-screen w-full overflow-hidden">

        {/* 1. Background Video - FIXED SCALING */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 h-full w-full object-contain z-0 opacity-80"
        >
          <source src={MOTION_REELS[0]?.src} type="video/mp4" />
        </video>
        {/* 2. Top Header - RESPONSIVE MARGIN */}
        <div className="relative mt-16 md:mt-32 left-0 w-full flex justify-center z-20 pointer-events-none">
          <h1 className="font-sans font-bold text-[10px] md:text-xs uppercase tracking-[0.6em] text-white drop-shadow-md">
            I AM NOMAD
          </h1>
        </div>
        {/* 3. Scroll Button */}
        <div className="absolute bottom-12 left-0 w-full flex justify-center z-20 pointer-events-auto">
          <button
            onClick={handleScroll}
            className="group flex flex-col items-center gap-2 cursor-pointer bg-transparent border-none outline-none"
            aria-label="Scroll to featured works"
          >
            <span className="font-sans text-[10px] tracking-widest uppercase text-white opacity-80 group-hover:opacity-100 transition-opacity">
              SCROLL
            </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ width: '24px', height: '24px' }}
              className="animate-bounce"
            >
              <path d="M6 9l6 6 6-6" />
            </svg>
          </button>
        </div>
      </section>
      {/* --- FEATURED WORKS SECTION --- */}
      <section id="work" className="relative z-10 py-20 px-4 md:px-8 bg-black">
        <div className="max-w-7xl mx-auto mb-6 border-b border-white/10 pb-2">
          <h2 className="font-sans text-[11px] md:text-lg font-semibold text-white uppercase tracking-[0.15em] md:tracking-[0.3em]">
            Featured Works
          </h2>
        </div>
        <ReelGrid reels={MOTION_REELS.slice(1)} />
      </section>
    </main>
  );
}
