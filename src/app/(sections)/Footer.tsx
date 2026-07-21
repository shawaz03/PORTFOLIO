"use client";

import React, { useRef, useEffect } from "react";
import { motion, useMotionValue, useTransform, useInView, useReducedMotion, animate } from "framer-motion";

export default function Footer() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Detect if the footer is inside the viewport (amount: 0.1 means at least 10% visible)
  const isInView = useInView(containerRef, { amount: 0.1 });
  
  // Accessibility check for prefers-reduced-motion
  const shouldReduceMotion = useReducedMotion();

  // Motion value for horizontal spotlight scan coordinate (from -20% to 120% of screen width)
  const maskX = useMotionValue(-20);

  // Generate responsive radial gradient mask (using 15vw radius to match the text size bounds)
  const autoMaskImage = useTransform(
    maskX,
    (x) => `radial-gradient(circle 15vw at ${x}% 50%, black 25%, transparent 100%)`
  );

  // Style object applying the viewport-aware sweep mask
  const maskStyle = {
    maskImage: shouldReduceMotion ? "none" : autoMaskImage,
    WebkitMaskImage: shouldReduceMotion ? "none" : autoMaskImage,
    opacity: 0.85,
  } as any;

  useEffect(() => {
    // If reduced motion is enabled, disable animation
    if (shouldReduceMotion) return;

    let controls: { stop: () => void } | undefined;
    if (isInView) {
      // Reset position to left side and start infinite sweep (speed increased with 4.5s duration)
      maskX.set(-20);
      controls = animate(maskX, 120, {
        duration: 4.5,
        ease: "linear",
        repeat: Infinity,
      });
    } else {
      // Pause animation when leaving viewport to optimize GPU performance
      controls?.stop();
    }

    return () => controls?.stop();
  }, [isInView, maskX, shouldReduceMotion]);

  return (
    <footer
      ref={containerRef}
      className="w-full bg-[#05040d] border-t border-white/5 relative overflow-hidden py-5 md:py-6 flex flex-col items-center justify-center select-none cursor-default"
    >
      {/* Background grid details */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.003)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.003)_1px,transparent_1px)] bg-[size:48px_48px] pointer-events-none opacity-20" />

      {/* Interactive Masked reveal text area */}
      <div className="w-full relative flex items-center justify-center overflow-hidden py-2">
        
        {/* Base Layer: Delicate hollow wireframe outline */}
        <div 
          className="flex items-center justify-center font-frozen tracking-widest text-center uppercase pointer-events-none select-none text-[7.5vw] whitespace-nowrap leading-none w-full"
          style={{
            WebkitTextStroke: "1px rgba(255, 255, 255, 0.05)",
            color: "transparent",
          }}
        >
          ENGINEERED BY <span style={{ WebkitTextStrokeColor: "rgba(128, 243, 255, 0.15)" }}>SHAWAZ</span>
        </div>

        {/* Reveal Layer Group: Holographic Chromatic Aberration Split (Cyan/Orange offsets) */}
        
        {/* 1. Cyan offset reveal */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center font-frozen tracking-widest text-center uppercase pointer-events-none select-none text-[7.5vw] whitespace-nowrap leading-none w-full text-[#3FE0C5] mix-blend-screen translate-x-[2px] translate-y-[-1px]"
          style={maskStyle}
        >
          ENGINEERED BY <span className="text-[#3FE0C5]">SHAWAZ</span>
        </motion.div>

        {/* 2. Orange offset reveal */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center font-frozen tracking-widest text-center uppercase pointer-events-none select-none text-[7.5vw] whitespace-nowrap leading-none w-full text-[#FF7A45] mix-blend-screen translate-x-[-2px] translate-y-[1px]"
          style={maskStyle}
        >
          ENGINEERED BY <span className="text-[#FF7A45]">SHAWAZ</span>
        </motion.div>

        {/* 3. Primary White reveal with custom outer glows and frozen ice blue name override */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center font-frozen tracking-widest text-center uppercase pointer-events-none select-none text-[7.5vw] whitespace-nowrap leading-none w-full text-white mix-blend-screen"
          style={{
            ...maskStyle,
            textShadow: "0 0 25px rgba(255, 255, 255, 0.8), 0 0 45px rgba(110, 92, 255, 0.5)",
          }}
        >
          ENGINEERED BY <span className="text-[#80f3ff]">SHAWAZ</span>
        </motion.div>

      </div>
    </footer>
  );
}
