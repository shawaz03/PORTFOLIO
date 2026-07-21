"use client";

import React from "react";
import { motion } from "framer-motion";
import SectionHeader from "@/components/ui/SectionHeader";
import * as Icons from "@/components/ui/TechIcons";

interface TechItem {
  name: string;
  category: string;
  meta: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  glowColor: string; // Tailwind glow border color on hover
}

export default function TechStack() {
  // Row 1: Languages
  const languages: TechItem[] = [
    { name: "JavaScript", category: "LANGUAGES", meta: "CLASS: SCRIPT", icon: Icons.JavaScriptIcon, glowColor: "group-hover:border-yellow-500/50 group-hover:shadow-[0_0_15px_rgba(234,179,8,0.25)]" },
    { name: "TypeScript", category: "LANGUAGES", meta: "CLASS: STATIC", icon: Icons.TypeScriptIcon, glowColor: "group-hover:border-blue-500/50 group-hover:shadow-[0_0_15px_rgba(59,130,246,0.25)]" },
    { name: "Python", category: "LANGUAGES", meta: "CLASS: SERVICE", icon: Icons.PythonIcon, glowColor: "group-hover:border-sky-400/50 group-hover:shadow-[0_0_15px_rgba(56,189,248,0.25)]" },
    { name: "Java", category: "LANGUAGES", meta: "CLASS: BACKEND", icon: Icons.JavaIcon, glowColor: "group-hover:border-amber-600/50 group-hover:shadow-[0_0_15px_rgba(217,119,6,0.25)]" },
    { name: "HTML5", category: "LANGUAGES", meta: "CLASS: FRONTEND", icon: Icons.HtmlIcon, glowColor: "group-hover:border-orange-500/50 group-hover:shadow-[0_0_15px_rgba(249,115,22,0.25)]" },
    { name: "CSS3", category: "LANGUAGES", meta: "CLASS: STYLES", icon: Icons.CssIcon, glowColor: "group-hover:border-blue-400/50 group-hover:shadow-[0_0_15px_rgba(96,165,250,0.25)]" },
  ];

  // Row 2: Frameworks
  const frameworks: TechItem[] = [
    { name: "React", category: "FRAMEWORKS", meta: "CLASS: LIBRARY", icon: Icons.ReactIcon, glowColor: "group-hover:border-cyan-400/50 group-hover:shadow-[0_0_15px_rgba(34,211,238,0.25)]" },
    { name: "Next.js", category: "FRAMEWORKS", meta: "CLASS: FRAMEWORK", icon: Icons.NextjsIcon, glowColor: "group-hover:border-white/30 group-hover:shadow-[0_0_15px_rgba(255,255,255,0.15)]" },
    { name: "Tailwind CSS", category: "FRAMEWORKS", meta: "CLASS: UTILITY", icon: Icons.TailwindIcon, glowColor: "group-hover:border-teal-400/50 group-hover:shadow-[0_0_15px_rgba(45,212,191,0.25)]" },
    { name: "Node.js", category: "FRAMEWORKS", meta: "CLASS: RUNTIME", icon: Icons.NodejsIcon, glowColor: "group-hover:border-green-500/50 group-hover:shadow-[0_0_15px_rgba(34,197,94,0.25)]" },
    { name: "Supabase", category: "FRAMEWORKS", meta: "CLASS: DATABASE", icon: Icons.SupabaseIcon, glowColor: "group-hover:border-emerald-400/50 group-hover:shadow-[0_0_15px_rgba(52,211,153,0.25)]" },
  ];

  // Row 3: Tools & AIs
  const tools: TechItem[] = [
    { name: "Git", category: "TOOLS", meta: "CLASS: VERSION", icon: Icons.GitIcon, glowColor: "group-hover:border-red-500/50 group-hover:shadow-[0_0_15px_rgba(239,68,68,0.25)]" },
    { name: "GitHub", category: "TOOLS", meta: "CLASS: REMOTE", icon: Icons.GithubIcon, glowColor: "group-hover:border-neutral-400/40 group-hover:shadow-[0_0_15px_rgba(255,255,255,0.1)]" },
    { name: "VS Code", category: "TOOLS", meta: "CLASS: EDITOR", icon: Icons.VsCodeIcon, glowColor: "group-hover:border-blue-500/50 group-hover:shadow-[0_0_15px_rgba(59,130,246,0.25)]" },
    { name: "Antigravity", category: "AI_CODER", meta: "CLASS: CO-PILOT", icon: Icons.AntigravityIcon, glowColor: "group-hover:border-pulse group-hover:shadow-[0_0_15px_rgba(63,224,197,0.4)]" },
    { name: "Claude AI", category: "AI_CODER", meta: "CLASS: ASSISTANT", icon: Icons.ClaudeIcon, glowColor: "group-hover:border-[#D97757]/50 group-hover:shadow-[0_0_15px_rgba(217,119,87,0.25)]" },
    { name: "ChatGPT", category: "AI_CODER", meta: "CLASS: ASSISTANT", icon: Icons.ChatGptIcon, glowColor: "group-hover:border-emerald-500/50 group-hover:shadow-[0_0_15px_rgba(16,185,129,0.25)]" },
    { name: "Gemini", category: "AI_CODER", meta: "CLASS: ASSISTANT", icon: Icons.GeminiIcon, glowColor: "group-hover:border-indigo-400/50 group-hover:shadow-[0_0_15px_rgba(129,140,248,0.25)]" },
  ];

  // Helper function to render a marquee row
  const renderMarqueeRow = (items: TechItem[], direction: "ltr" | "rtl", speed: number = 15) => {
    // Duplicate items once to ensure mathematically seamless loop scroll (0% to -50%)
    const doubledItems = [...items, ...items];
    const marqueeClass = direction === "ltr" ? "animate-marquee-ltr" : "animate-marquee-rtl";

    return (
      <div 
        className="w-full overflow-hidden relative py-3 group/track cursor-pointer select-none marquee-track"
        style={{
          maskImage: "linear-gradient(to right, transparent, white 15%, white 85%, transparent)",
          WebkitMaskImage: "linear-gradient(to right, transparent, white 15%, white 85%, transparent)"
        }}
      >
        <div 
          className={`${marqueeClass}`}
          style={{ animationDuration: `${speed}s` }}
        >
          {doubledItems.map((item, idx) => {
            const IconComponent = item.icon;
            return (
              <div 
                key={idx} 
                className="flex-shrink-0 mx-3.5 w-[185px] sm:w-[225px] h-[72px] sm:h-[86px] rounded-xl glass-panel relative group/card overflow-hidden transition-all duration-300 hover:scale-[1.03] hover:-translate-y-0.5 border border-signal/15"
              >
                {/* Corner indicators */}
                <div className="absolute top-1 left-1 w-1.5 h-1.5 border-t border-l border-dim/20 group-hover/card:border-pulse/50 transition-colors" />
                <div className="absolute bottom-1 right-1 w-1.5 h-1.5 border-b border-r border-dim/20 group-hover/card:border-pulse/50 transition-colors" />

                {/* Main Card Content */}
                <div className={`w-full h-full flex items-center gap-3 sm:gap-4 px-4 py-2.5 rounded-xl transition-all duration-300 ${item.glowColor}`}>
                  
                  {/* Glowing logo border background wrapper */}
                  <div className="w-11 h-11 sm:w-13 sm:h-13 rounded-lg flex items-center justify-center bg-void/40 border border-signal/10 group-hover/card:border-pulse/35 transition-all text-dim/60 group-hover/card:text-pulse duration-300">
                    <IconComponent className="w-6 h-6 sm:w-7 sm:h-7 transition-all duration-300" />
                  </div>

                  {/* Metadata labels */}
                  <div className="flex flex-col min-w-0">
                    <span className="font-pirates text-sm sm:text-base tracking-widest text-ink uppercase truncate group-hover/card:text-pulse transition-colors duration-300">
                      {item.name}
                    </span>
                    <span className="font-mono text-[8px] sm:text-[9px] text-dim/60 tracking-wider mt-0.5">
                      {item.meta}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <section id="tech-stack" className="w-full py-16 px-4 md:px-8 lg:px-12 bg-void relative overflow-hidden flex flex-col items-center select-none">
      
      {/* Dynamic Keyframe style injector to avoid external CSS editing */}
      <style>{`
        @keyframes marquee-ltr {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marquee-rtl {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        .animate-marquee-ltr {
          display: flex;
          width: max-content;
          animation: marquee-ltr linear infinite;
        }
        .animate-marquee-rtl {
          display: flex;
          width: max-content;
          animation: marquee-rtl linear infinite;
        }
        .marquee-track:hover .animate-marquee-ltr,
        .marquee-track:hover .animate-marquee-rtl {
          animation-play-state: paused;
        }
      `}</style>

      {/* Background Accent Gradients */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-pulse/2 blur-[120px] rounded-full pointer-events-none" />

      {/* Ruled Boundary Line */}
      <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-signal/15 to-transparent pointer-events-none" />

      <div className="w-full max-w-none px-0 flex flex-col gap-12 z-10">
        
        {/* Section Title Header */}
        <SectionHeader id="02" title="TECH_STACK" />

        {/* HUD Subtitle explanation */}
        <div className="w-full text-center flex flex-col items-center justify-center gap-1.5 md:gap-3">
          <span className="font-mono text-[9px] text-dim tracking-[0.3em] uppercase">
            SYSTEM_CAPABILITIES_REPORT
          </span>
          <h2 className="font-italico text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-wide text-ink uppercase select-none">
            Tech stack & Core tooling
          </h2>
        </div>

        {/* Triple Marquee Grid Board */}
        <div className="flex flex-col gap-6 sm:gap-8 mt-6">
          
          {/* Row 1: Languages (Left to Right) */}
          <div className="flex flex-col gap-1.5">
            <span className="font-mono text-[8px] text-dim/60 tracking-[0.2em] uppercase pl-4 sm:pl-8">
              DATABASE_FEED_01 // LANGUAGES
            </span>
            {renderMarqueeRow(languages, "ltr", 24)}
          </div>

          {/* Row 2: Frameworks (Right to Left) */}
          <div className="flex flex-col gap-1.5">
            <span className="font-mono text-[8px] text-dim/60 tracking-[0.2em] uppercase pl-4 sm:pl-8">
              DATABASE_FEED_02 // FRAMEWORKS_AND_UI
            </span>
            {renderMarqueeRow(frameworks, "rtl", 26)}
          </div>

          {/* Row 3: Tools & AIs (Left to Right) */}
          <div className="flex flex-col gap-1.5">
            <span className="font-mono text-[8px] text-dim/60 tracking-[0.2em] uppercase pl-4 sm:pl-8">
              DATABASE_FEED_03 // CORE_TOOLS_AND_AGENTS
            </span>
            {renderMarqueeRow(tools, "ltr", 28)}
          </div>

        </div>

      </div>
    </section>
  );
}
