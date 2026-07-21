"use client";

import React, { useEffect, useState, useRef } from "react";
import { animate, useInView } from "framer-motion";

interface StatCounterProps {
  value: number;
  suffix?: string;
  label: string;
}

export default function StatCounter({ value, suffix = "", label }: StatCounterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (isInView) {
      const controls = animate(0, value, {
        duration: 1.8,
        ease: [0.25, 0.46, 0.45, 0.94],
        onUpdate: (latest) => setDisplayValue(Math.floor(latest)),
      });
      return () => controls.stop();
    }
  }, [isInView, value]);

  return (
    <div 
      ref={ref} 
      className="glass-panel glass-panel-glow px-4 py-5 rounded-lg flex flex-col items-center justify-center flex-1 min-w-[120px] text-center relative overflow-hidden group transition-all duration-300 hover:border-signal/30"
    >
      {/* Corner Brackets */}
      <div className="absolute top-1.5 left-1.5 w-1.5 h-1.5 border-t border-l border-signal/40 group-hover:border-pulse transition-colors duration-300" />
      <div className="absolute top-1.5 right-1.5 w-1.5 h-1.5 border-t border-r border-signal/40 group-hover:border-pulse transition-colors duration-300" />
      <div className="absolute bottom-1.5 left-1.5 w-1.5 h-1.5 border-b border-l border-signal/40 group-hover:border-pulse transition-colors duration-300" />
      <div className="absolute bottom-1.5 right-1.5 w-1.5 h-1.5 border-b border-r border-signal/40 group-hover:border-pulse transition-colors duration-300" />

      {/* Counter Value */}
      <span className="font-mono text-2xl sm:text-3xl font-extrabold text-pulse drop-shadow-[0_0_8px_rgba(63,224,197,0.4)]">
        {displayValue}{suffix}
      </span>
      
      {/* Sub-label */}
      <span className="font-mono text-[9px] text-dim tracking-[0.2em] uppercase mt-2 select-none">
        {label}
      </span>
    </div>
  );
}
