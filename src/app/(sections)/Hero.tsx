"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, VolumeX, RotateCcw } from "lucide-react";
import FeedLoader from "@/components/ui/FeedLoader";

// ─────────────────────────────────────────────────────────────
// Timed captions synced to J.SHAWAZ's speech in introvideo.mp4
// Customized styled layouts matching a professional editor look
// ─────────────────────────────────────────────────────────────
const captions = [
  { 
    start: 0.0, 
    end: 2.2, 
    text: "I'm J.SHAWAZ",
    render: () => (
      <span className="chrome-silver font-extrabold">
        I'M <span className="chrome-purple font-black">J.SHAWAZ</span>
      </span>
    )
  },
  { 
    start: 2.2, 
    end: 5.2, 
    text: "and I'm a Full-Stack Developer",
    render: () => (
      <span className="chrome-silver font-extrabold">
        AND I'M A <span className="chrome-cyan font-black">FULL-STACK DEVELOPER</span>
      </span>
    )
  },
  { 
    start: 5.2, 
    end: 7.8, 
    text: "welcome to my profile",
    render: () => (
      <span className="chrome-silver tracking-wide font-black">
        WELCOME TO MY PROFILE
      </span>
    )
  },
  { 
    start: 7.8, 
    end: 10.1, 
    text: "scroll down to know more",
    render: () => (
      <span className="font-mono text-dim tracking-[0.25em] text-lg sm:text-xl md:text-2xl drop-shadow-[0_0_8px_rgba(139,135,166,0.35)]">
        SCROLL DOWN TO KNOW MORE
      </span>
    )
  }
];

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);

  const [isMuted, setIsMuted] = useState(true);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [loaderComplete, setLoaderComplete] = useState(false);
  const [activeCaptionIndex, setActiveCaptionIndex] = useState<number | null>(null);

  // Check if video is already loaded from cache on mount
  useEffect(() => {
    if (videoRef.current && videoRef.current.readyState >= 3) {
      setIsVideoLoaded(true);
    }
    // Fallback: If video loading takes too long, proceed anyway to avoid blocking the user
    const timer = setTimeout(() => {
      setIsVideoLoaded(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleLoaderComplete = () => {
    setLoaderComplete(true);
    if (videoRef.current) {
      videoRef.current.play().catch((err) => {
        console.log("Video auto-play blocked/failed:", err);
      });
    }
  };

  // Sync captions index to video currentTime
  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const time = videoRef.current.currentTime;
    const index = captions.findIndex((c) => time >= c.start && time < c.end);
    setActiveCaptionIndex(index !== -1 ? index : null);
  };

  const toggleMute = () => {
    if (videoRef.current) {
      const newMuted = !videoRef.current.muted;
      videoRef.current.muted = newMuted;
      setIsMuted(newMuted);
    }
  };

  const handleReplay = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
    }
  };

  const scrollToNext = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth",
    });
  };

  return (
    <section className="h-[100dvh] min-h-screen w-full relative bg-void overflow-hidden">
      {/* Loader Overlay (runs until 100% and then transitions out) */}
      <AnimatePresence>
        {!loaderComplete && (
          <FeedLoader 
            isLoaded={isVideoLoaded} 
            onComplete={handleLoaderComplete} 
          />
        )}
      </AnimatePresence>

      {/* Full-screen Video */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover z-0"
        src="/video/introvideo.mp4"
        muted={isMuted}
        loop
        playsInline
        preload="auto"
        onLoadedData={() => setIsVideoLoaded(true)}
        onTimeUpdate={handleTimeUpdate}
      />

      {/* Subtle scanline overlay */}
      <div className="absolute inset-0 scanlines pointer-events-none z-10 opacity-15" />

      {/* Dark gradient overlay at bottom for caption readability */}
      <div className="absolute inset-0 z-15 pointer-events-none bg-gradient-to-t from-void/90 via-void/20 to-transparent" />

      {/* Professional Styled Captions (Aligned above the scroll button) */}
      <div className="absolute bottom-20 sm:bottom-28 left-0 w-full flex justify-center z-30 pointer-events-none px-4 sm:px-6">
        <AnimatePresence mode="wait">
          {loaderComplete && activeCaptionIndex !== null && (
            <motion.div
              key={activeCaptionIndex}
              initial={{ opacity: 0, y: 15, scale: 0.95, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -15, scale: 1.05, filter: "blur(6px)" }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="max-w-4xl w-full text-center"
            >
              <h2 className="font-italico text-xl xs:text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold uppercase tracking-wide leading-tight select-none">
                {captions[activeCaptionIndex].render()}
              </h2>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* HUD Controls — bottom right */}
      <div className="absolute bottom-4 right-4 sm:bottom-8 sm:right-8 z-40 flex items-center gap-2 sm:gap-2.5">
        <button
          onClick={toggleMute}
          className="group relative overflow-hidden cursor-pointer flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-full border border-slate-800 border-t-white/20 bg-[#090a0f]/80 hover:bg-slate-900/90 hover:border-slate-600 backdrop-blur-md transition-all duration-300 shadow-[inset_0_1px_1px_rgba(255,255,255,0.15),0_10px_20px_rgba(0,0,0,0.5)] active:scale-95 select-none"
          title={isMuted ? "Unmute Audio" : "Mute Audio"}
          aria-label={isMuted ? "Unmute Audio" : "Mute Audio"}
        >
          {/* Glass Top Reflection Layer */}
          <div className="absolute inset-x-0 top-0 h-[45%] bg-gradient-to-b from-white/15 to-transparent pointer-events-none rounded-t-full" />

          {/* Animated Light Sheen Glare */}
          <div className="absolute inset-0 w-full h-full -skew-x-12 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 ease-out pointer-events-none" />

          {isMuted ? (
            <>
              <VolumeX size={12} className="text-slate-400 group-hover:text-slate-200 transition-colors z-10" />
              <span className="font-frozen font-bold text-[10px] sm:text-xs tracking-wider text-slate-200 group-hover:text-white uppercase transition-colors z-10">AUDIO OFF</span>
            </>
          ) : (
            <>
              <Volume2 size={12} className="text-slate-200 group-hover:text-white animate-pulse z-10" />
              <span className="font-frozen font-bold text-[10px] sm:text-xs tracking-wider text-slate-200 group-hover:text-white uppercase transition-colors z-10">AUDIO ON</span>
            </>
          )}
        </button>

        <button
          onClick={handleReplay}
          className="group relative overflow-hidden cursor-pointer flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-full border border-slate-800 border-t-white/20 bg-[#090a0f]/80 hover:bg-slate-900/90 hover:border-slate-600 backdrop-blur-md transition-all duration-300 shadow-[inset_0_1px_1px_rgba(255,255,255,0.15),0_10px_20px_rgba(0,0,0,0.5)] active:scale-95 select-none"
          title="Replay Video"
          aria-label="Replay Intro Video"
        >
          {/* Glass Top Reflection Layer */}
          <div className="absolute inset-x-0 top-0 h-[45%] bg-gradient-to-b from-white/15 to-transparent pointer-events-none rounded-t-full" />

          {/* Animated Light Sheen Glare */}
          <div className="absolute inset-0 w-full h-full -skew-x-12 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 ease-out pointer-events-none" />

          <RotateCcw size={12} className="text-slate-400 group-hover:text-slate-200 transition-colors group-hover:-rotate-90 duration-300 z-10" />
          <span className="font-frozen font-bold text-[10px] sm:text-xs tracking-wider text-slate-200 group-hover:text-white uppercase transition-colors z-10">REPLAY</span>
        </button>
      </div>

      {/* Console Terminal Pill (HUD Status Indicator) ─ bottom center */}
      <div className="absolute bottom-4 sm:bottom-8 left-0 w-full flex justify-center z-30 pointer-events-none">
        <button
          onClick={scrollToNext}
          className="group pointer-events-auto relative overflow-hidden cursor-pointer flex items-center gap-3 px-4 py-2 rounded-full border border-slate-800 border-t-white/20 bg-[#090a0f]/80 hover:bg-slate-900/90 hover:border-slate-600 backdrop-blur-md transition-all duration-300 shadow-[inset_0_1px_1px_rgba(255,255,255,0.15),0_10px_20px_rgba(0,0,0,0.5)] active:scale-95 select-none"
          aria-label="Scroll to next section"
        >
          {/* Glass Top Reflection Layer */}
          <div className="absolute inset-x-0 top-0 h-[45%] bg-gradient-to-b from-white/15 to-transparent pointer-events-none rounded-t-full" />

          {/* Animated Light Sheen Glare */}
          <div className="absolute inset-0 w-full h-full -skew-x-12 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 ease-out pointer-events-none" />

          {/* Micro Track with sliding metallic dot */}
          <div className="w-4 h-7 rounded-full border border-slate-700/80 group-hover:border-slate-400 p-0.5 flex flex-col items-center justify-start relative overflow-hidden transition-colors duration-300 z-10">
            <motion.div
              animate={{
                y: [0, 10, 0],
                opacity: [0.4, 1, 0.4]
              }}
              transition={{
                repeat: Infinity,
                duration: 1.6,
                ease: "easeInOut"
              }}
              className="w-1.5 h-1.5 rounded-full bg-slate-200"
            />
          </div>

          {/* Frozen Font label & vector indicator */}
          <div className="flex items-center gap-2.5 font-frozen font-bold text-xs sm:text-sm tracking-wider text-slate-200 group-hover:text-white uppercase transition-colors duration-300 z-10">
            <span>SCROLL DOWN</span>
            <motion.span
              animate={{ y: [0, 3, 0] }}
              transition={{ repeat: Infinity, duration: 1.4, ease: "easeInOut" }}
              className="text-slate-200 group-hover:text-white text-sm font-bold"
            >
              ↓
            </motion.span>
          </div>
        </button>
      </div>
    </section>
  );
}
