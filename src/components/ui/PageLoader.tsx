"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function PageLoader({ onComplete }: { onComplete?: () => void }) {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    // Smooth progress counter simulation
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsComplete(true);
            if (onComplete) onComplete();
          }, 300);
          return 100;
        }
        // Increment smoothly with slight randomness for realistic feel
        const diff = Math.floor(Math.random() * 15) + 8;
        return Math.min(prev + diff, 100);
      });
    }, 60);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          key="page-loader"
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            y: "-100%",
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } 
          }}
          className="fixed inset-0 z-[9999] bg-[#090a0f] flex flex-col items-center justify-between p-8 md:p-12 select-none overflow-hidden"
        >
          {/* Top metadata badge */}
          <div className="w-full flex justify-between items-center font-mono text-[10px] tracking-[0.25em] text-slate-500 uppercase">
            <span>PORTFOLIO // J.SHAWAZ</span>
            <span>SYSTEM_READY</span>
          </div>

          {/* Center Brand Title & Progress Counter */}
          <div className="flex flex-col items-center gap-6 max-w-md w-full">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <h1 className="font-italico text-3xl sm:text-4xl md:text-5xl font-black tracking-wider text-slate-100 uppercase">
                SHAWAZ
              </h1>
              <p className="font-mono text-xs text-slate-400 tracking-[0.3em] uppercase mt-2">
                FULL-STACK DEVELOPER
              </p>
            </motion.div>

            {/* Clean Progress Bar Container */}
            <div className="w-full bg-slate-900 h-[3px] rounded-full overflow-hidden relative mt-2">
              <motion.div
                className="h-full bg-slate-200 rounded-full"
                style={{ width: `${progress}%` }}
                transition={{ ease: "easeOut" }}
              />
            </div>

            {/* Numeric Percentage */}
            <div className="font-mono text-xs text-slate-400 tracking-widest">
              {progress}%
            </div>
          </div>

          {/* Bottom status text */}
          <div className="font-mono text-[10px] text-slate-600 tracking-[0.2em] uppercase">
            INITIALIZING CORE INTERACTION ENGINE
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
