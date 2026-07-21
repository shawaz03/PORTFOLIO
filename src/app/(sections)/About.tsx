"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import SectionHeader from "@/components/ui/SectionHeader";
import RotatingText from "@/components/ui/RotatingText";
import { FlipCard } from "@/components/animate-ui/components/community/flip-card";

export default function About() {
  // Stagger configurations for animations
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.15,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 15, filter: "blur(4px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  // Flip card badge details (Updated with Instagram details and GitHub link)
  const flipCardData = {
    name: 'J.SHAWAZ',
    username: '__iamsha_',
    image: '/profile.jpeg',
    bio: 'Full-Stack Developer passionate about crafting immersive, high-performance web experiences using React, Next.js, and creative animations.',
    stats: { following: '419', followers: '1,133', posts: '5' },
    socialLinks: {
      linkedin: 'https://linkedin.com',
      github: 'https://github.com/shawaz03',
      twitter: 'https://twitter.com',
      instagram: 'https://www.instagram.com/__iamsha_?igsh=enpzYnpzYWs3Mzlj',
    },
  };

  return (
    <section id="about" className="min-h-screen w-full relative bg-void overflow-hidden py-16 px-4 md:px-8 lg:px-12 flex flex-col items-center">
      {/* Background Ambient Lights */}
      <div className="absolute top-1/3 left-10 w-[350px] h-[350px] bg-signal/2 blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[350px] h-[350px] bg-pulse/2 blur-[100px] rounded-full pointer-events-none" />

      {/* Grid line accent */}
      <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-signal/15 to-transparent pointer-events-none" />

      <div className="w-full max-w-none px-0 flex flex-col gap-10 z-10">
        
        {/* Section Title (Updated: much more visible and highlighted) */}
        <SectionHeader id="01" title="ABOUT_ME" />

        {/* Dynamic Rotating Headline */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
          className="w-full text-center flex flex-col items-center justify-center gap-1.5 md:gap-3"
        >
          <span className="font-mono text-[9px] text-dim tracking-[0.3em] uppercase">
            PERSONNEL_DOSSIER_TAG
          </span>
          <h2 className="font-italico text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-wide text-ink flex flex-wrap items-center justify-center gap-x-3 gap-y-1 select-none">
            <span className="chrome-silver">I'M A PASSIONATE</span>
            <RotatingText
              texts={[
                "FULL-STACK DEVELOPER",
                "INTERACTIVE ENGINEER",
                "UI/UX DESIGNER",
                "CREATIVE CODER"
              ]}
              mainClassName="font-black w-[280px] sm:w-[380px] md:w-[480px] lg:w-[620px] text-left justify-start inline-flex items-center"
              elementLevelClassName="chrome-cyan"
              staggerFrom="first"
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "-120%", opacity: 0 }}
              staggerDuration={0.02}
              splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1"
              transition={{ type: "spring", damping: 25, stiffness: 350 }}
              rotationInterval={2500}
            />
          </h2>
        </motion.div>

        {/* Split Dossier Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mt-4 items-start">
          
          {/* LEFT SIDE: Interactive Flip Badge only (4 Columns, aligned left) */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="lg:col-span-4 flex justify-start w-full"
          >
            {/* Interactive Flip Card Badge */}
            <FlipCard data={flipCardData} />
          </motion.div>

          {/* RIGHT SIDE: Bio Description (8 Columns) */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="lg:col-span-8 flex flex-col gap-6"
          >
            {/* Dossier Text (Styled using the Disney Little Mermaid font) */}
            <div className="font-mermaid text-lg sm:text-xl md:text-2xl lg:text-3xl leading-relaxed text-ink/90 space-y-6 text-justify tracking-wider">
              <motion.p variants={itemVariants}>
                I'm Shawaz, a Full-Stack Developer passionate about crafting immersive, high-performance web experiences. I specialize in building modern interfaces using React, Next.js, TypeScript, and creative animation libraries like Three.js, React Three Fiber, GSAP, and Framer Motion.
              </motion.p>
              <motion.p variants={itemVariants}>
                I enjoy transforming ideas into visually engaging, responsive, and user-focused digital products that combine clean design with smooth interactions. Whether it's developing interactive 3D experiences, scalable web applications, or polished UI components, I strive to create experiences that leave a lasting impression.
              </motion.p>
              <motion.p variants={itemVariants}>
                I'm constantly exploring new technologies, refining my craft, and building projects that push the boundaries of modern web development.
              </motion.p>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
