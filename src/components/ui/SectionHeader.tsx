"use client";

import React from "react";
import { motion } from "framer-motion";

interface SectionHeaderProps {
  id: string;
  title: string;
  className?: string;
}

export default function SectionHeader({ id, title, className = "" }: SectionHeaderProps) {
  return (
    <div className={`w-full flex items-center justify-between gap-5 py-8 relative select-none ${className}`}>
      
      {/* Specular text shine styles */}
      <style>{`
        .shiny-text-cyan {
          background: linear-gradient(
            120deg,
            #3FE0C5 30%,
            #ffffff 50%,
            #3FE0C5 70%
          );
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: textShine 4s ease-in-out infinite;
        }
        .shiny-text-white {
          background: linear-gradient(
            120deg,
            #8E8D99 30%,
            #ffffff 50%,
            #8E8D99 70%
          );
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: textShine 4s ease-in-out infinite;
        }
        @keyframes textShine {
          0% {
            background-position: 200% center;
          }
          100% {
            background-position: -200% center;
          }
        }
      `}</style>

      {/* Left ruled line */}
      <motion.div 
        initial={{ scaleX: 0, originX: 1 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        className="h-[1.5px] bg-gradient-to-r from-transparent via-signal/40 to-signal/80 flex-1"
      />

      <motion.div
        initial={{ opacity: 0, y: 12, filter: "blur(6px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.15 }}
        className="flex items-center gap-2 sm:gap-3.5 font-frozen text-[12px] xs:text-[14px] sm:text-[18px] md:text-[21px] text-ink tracking-[0.15em] sm:tracking-[0.25em] px-4 sm:px-7 py-2.5 sm:py-3.5 border border-signal/35 bg-deck/70 backdrop-blur-md rounded-lg max-w-full truncate"
      >
        <span className="shiny-text-cyan drop-shadow-[0_0_8px_rgba(63,224,197,0.4)] font-black">{id}</span>
        <span className="text-signal font-black">/</span>
        <span className="shiny-text-white font-black drop-shadow-[0_0_8px_rgba(237,235,250,0.2)] truncate">{title}</span>
      </motion.div>

      {/* Right ruled line */}
      <motion.div 
        initial={{ scaleX: 0, originX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        className="h-[1.5px] bg-gradient-to-l from-transparent via-signal/40 to-signal/80 flex-1"
      />
    </div>
  );
}
