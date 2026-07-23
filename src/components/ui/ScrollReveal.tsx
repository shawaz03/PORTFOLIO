"use client";

import React from "react";
import { motion, Variants } from "framer-motion";

interface ScrollRevealProps {
  children: React.ReactNode;
  variant?: "fade-up" | "fade-down" | "fade-in" | "slide-left" | "slide-right" | "scale-up";
  delay?: number;
  duration?: number;
  className?: string;
  amount?: number | "some" | "all";
  once?: boolean;
}

export default function ScrollReveal({
  children,
  variant = "fade-up",
  delay = 0,
  duration = 0.6,
  className = "",
  amount = 0.2,
  once = true,
}: ScrollRevealProps) {
  const getVariants = (): Variants => {
    switch (variant) {
      case "fade-up":
        return {
          hidden: { opacity: 0, y: 30 },
          visible: { opacity: 1, y: 0 },
        };
      case "fade-down":
        return {
          hidden: { opacity: 0, y: -30 },
          visible: { opacity: 1, y: 0 },
        };
      case "slide-left":
        return {
          hidden: { opacity: 0, x: 40 },
          visible: { opacity: 1, x: 0 },
        };
      case "slide-right":
        return {
          hidden: { opacity: 0, x: -40 },
          visible: { opacity: 1, x: 0 },
        };
      case "scale-up":
        return {
          hidden: { opacity: 0, scale: 0.94 },
          visible: { opacity: 1, scale: 1 },
        };
      case "fade-in":
      default:
        return {
          hidden: { opacity: 0 },
          visible: { opacity: 1 },
        };
    }
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      variants={getVariants()}
      transition={{
        duration,
        delay,
        ease: [0.215, 0.61, 0.355, 1], // Clean cubic-bezier curve
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function ScrollStaggerContainer({
  children,
  className = "",
  staggerDelay = 0.1,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
  delay?: number;
}) {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: delay,
      },
    },
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      variants={containerVariants}
      className={className}
    >
      {children}
    </motion.div>
  );
}
