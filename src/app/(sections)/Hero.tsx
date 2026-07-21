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
    <section className="h-screen w-full relative bg-void overflow-hidden">
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
      <div className="absolute bottom-28 left-0 w-full flex justify-center z-30 pointer-events-none px-6">
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
              <h2 className="font-italico text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold uppercase tracking-wide leading-tight select-none">
                {captions[activeCaptionIndex].render()}
              </h2>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* HUD Controls — bottom right */}
      <div className="absolute bottom-8 right-8 z-40 flex items-center gap-2">
        <button
          onClick={toggleMute}
          className="font-mono text-[9px] text-ink hover:text-signal border border-signal/25 hover:border-signal bg-void/80 hover:bg-signal/10 backdrop-blur-md px-3 py-2 rounded-sm transition-all duration-200 flex items-center gap-1.5 cursor-pointer shadow-lg active:scale-95"
          title={isMuted ? "Unmute Audio" : "Mute Audio"}
          aria-label={isMuted ? "Unmute Audio" : "Mute Audio"}
        >
          {isMuted ? (
            <>
              <VolumeX size={11} className="text-dim" />
              <span>AUDIO_OFF</span>
            </>
          ) : (
            <>
              <Volume2 size={11} className="text-pulse animate-pulse" />
              <span className="text-pulse font-medium">AUDIO_ON</span>
            </>
          )}
        </button>

        <button
          onClick={handleReplay}
          className="font-mono text-[9px] text-ink hover:text-signal border border-signal/25 hover:border-signal bg-void/80 hover:bg-signal/10 backdrop-blur-md px-3 py-2 rounded-sm transition-all duration-200 flex items-center gap-1.5 cursor-pointer shadow-lg active:scale-95"
          title="Replay Video"
          aria-label="Replay Intro Video"
        >
          <RotateCcw size={11} />
          <span>REPLAY</span>
        </button>
      </div>

      {/* Concept 1: The Telemetry Scroll Wheel (Refined Visibility & Design) ─ bottom center */}
      <div className="absolute bottom-8 left-0 w-full flex justify-center z-30 pointer-events-none">
        <button
          onClick={scrollToNext}
          className="group pointer-events-auto cursor-pointer flex flex-col items-center gap-2.5 relative select-none"
          aria-label="Scroll to next section"
        >
          {/* Sonar Ripple Ring (active on hover) */}
          <div className="absolute top-0 w-8 h-12 rounded-full border border-signal/0 group-hover:border-signal/30 pointer-events-none scale-100 group-hover:scale-130 opacity-0 group-hover:opacity-100 transition-all duration-700 ease-out" />
          
          {/* Mouse Wireframe Body */}
          <div className="w-8 h-12 rounded-full border-2 border-signal/40 group-hover:border-pulse bg-void/50 backdrop-blur-sm relative transition-all duration-300 ease-out p-1.5 flex flex-col items-center justify-start shadow-[0_4px_12px_rgba(0,0,0,0.5)]">
            {/* Pulsing & Scrolling Cyan Dot */}
            <motion.div
              animate={{
                y: [0, 14, 0],
                opacity: [0.3, 1, 0.3]
              }}
              transition={{
                repeat: Infinity,
                duration: 1.6,
                ease: "easeInOut"
              }}
              className="w-1.5 h-2.5 rounded-full bg-pulse shadow-[0_0_8px_rgba(63,224,197,0.8)]"
            />
            {/* Bouncing down-arrow chevron for scroll cue */}
            <div className="absolute bottom-1.5 text-dim/60 group-hover:text-pulse transition-colors duration-300">
              <svg className="w-2.5 h-2.5 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>

          {/* Telemetry Label */}
          <span className="font-mono text-[9px] font-bold text-dim group-hover:text-pulse tracking-[0.3em] uppercase drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] transition-colors duration-300">
            SCROLL DOWN
          </span>
        </button>
      </div>
    </section>
  );
}
