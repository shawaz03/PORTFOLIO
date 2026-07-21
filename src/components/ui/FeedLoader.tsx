import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface FeedLoaderProps {
  isLoaded: boolean;
  onComplete: () => void;
}

export default function FeedLoader({ isLoaded, onComplete }: FeedLoaderProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (!isLoaded) {
      // Simulate loading progression up to 88% while video buffer initializes
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev < 88) {
            return prev + Math.floor(Math.random() * 4) + 1;
          }
          return prev;
        });
      }, 70);
    } else {
      // Fast-track from current progress to 100% once video data event triggers
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev < 100) {
            return prev + Math.floor(Math.random() * 12) + 8;
          }
          clearInterval(interval);
          setTimeout(onComplete, 400); // delay complete trigger to let 100% display briefly
          return 100;
        });
      }, 25);
    }

    return () => clearInterval(interval);
  }, [isLoaded, onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.03, filter: "blur(8px)" }}
      transition={{ duration: 0.45, ease: "easeInOut" }}
      className="absolute inset-0 bg-void flex flex-col items-center justify-center z-50 pointer-events-none select-none"
    >
      {/* Background Matrix/Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(110,92,255,0.025)_1px,transparent_1px),linear-gradient(to_bottom,rgba(110,92,255,0.025)_1px,transparent_1px)] bg-[size:3rem_3rem]" />

      <div className="flex flex-col items-center gap-6 z-10">
        {/* Dual Rotating Ring Design */}
        <div className="relative w-16 h-16 flex items-center justify-center">
          {/* Outer Solid Ring */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
            className="absolute inset-0 rounded-full border-2 border-t-signal border-r-signal border-b-transparent border-l-transparent"
          />
          {/* Inner Dashed Ring */}
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ repeat: Infinity, duration: 1.6, ease: "linear" }}
            className="absolute inset-1.5 rounded-full border border-dashed border-t-transparent border-r-transparent border-b-pulse border-l-pulse"
          />
          {/* Glowing central core dot */}
          <div className="w-2.5 h-2.5 rounded-full bg-pulse shadow-[0_0_12px_rgba(63,224,197,0.7)] animate-pulse" />
        </div>

        {/* Ticking Percentage Telemetry */}
        <div className="flex flex-col items-center gap-1 font-mono">
          <span className="text-xl font-bold text-ink tracking-widest">
            {Math.min(100, progress).toString().padStart(3, "0")}%
          </span>
          <span className="text-[8px] text-dim tracking-[0.25em] uppercase">
            ESTABLISHING_LINK
          </span>
        </div>
      </div>

      {/* Subtle scanline overlay inside loader */}
      <div className="absolute inset-0 scanlines pointer-events-none opacity-[0.08]" />
    </motion.div>
  );
}
