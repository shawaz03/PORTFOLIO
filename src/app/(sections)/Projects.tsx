"use client";

import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ExternalLink, ChevronLeft, ChevronRight, Terminal, Cpu, Database, Layers } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";

export default function Projects() {
  const [isInteractive, setIsInteractive] = useState(false);
  const [glowPos, setGlowPos] = useState({ x: 0, y: 0 });
  const [showGlow, setShowGlow] = useState(false);

  // Coming Soon typing terminal simulation
  const [terminalLogs, setTerminalLogs] = useState<string[]>([]);
  const [activeLog, setActiveLog] = useState("");
  const logsSequence = [
    { text: "shawaz:~$ mkdir next_masterpiece", type: true },
    { text: "[OK] Creating repository folder...", type: false },
    { text: "[OK] Structuring atomic UI layout...", type: false },
    { text: "[WARN] Awaiting user instructions...", type: false },
    { text: "shawaz:~$ ", type: false }
  ];

  useEffect(() => {
    let timers: NodeJS.Timeout[] = [];
    let isCancelled = false;

    const runLogs = async () => {
      setTerminalLogs([]);
      setActiveLog("");

      for (const step of logsSequence) {
        if (isCancelled) break;
        if (step.type) {
          await new Promise<void>((resolve) => {
            let i = 0;
            let current = "";
            const interval = setInterval(() => {
              if (isCancelled) {
                clearInterval(interval);
                resolve();
                return;
              }
              current += step.text.charAt(i);
              setActiveLog(current);
              i++;
              if (i >= step.text.length) {
                clearInterval(interval);
                setTerminalLogs(prev => [...prev, step.text]);
                setActiveLog("");
                resolve();
              }
            }, 30);
          });
        } else {
          await new Promise<void>((resolve) => {
            const timer = setTimeout(() => {
              if (isCancelled) {
                resolve();
                return;
              }
              setTerminalLogs(prev => [...prev, step.text]);
              resolve();
            }, 250);
            timers.push(timer);
          });
        }
      }
    };

    runLogs();
    const mainInterval = setInterval(() => {
      if (!isCancelled) runLogs();
    }, 7000);

    return () => {
      isCancelled = true;
      clearInterval(mainInterval);
      timers.forEach(t => clearTimeout(t));
    };
  }, []);

  // Carousel States & Refs
  const carouselContainerRef = useRef<HTMLDivElement>(null);
  const carouselStageRef = useRef<HTMLDivElement>(null);
  const card1Ref = useRef<HTMLDivElement>(null);
  const card2Ref = useRef<HTMLDivElement>(null);

  const [carouselRotation, setCarouselRotation] = useState(0);
  const [activePanel, setActivePanel] = useState<1 | 2>(1);
  const [textOpacity, setTextOpacity] = useState(1);

  // Initialize starting Z depths on mount
  useEffect(() => {
    gsap.set(card1Ref.current, { z: 10 });
    gsap.set(card2Ref.current, { z: -10 });
  }, []);

  // 3D Card Hover cursor coordinates tracking for specular light border (No tilt shake)
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isInteractive) return;
    const el = carouselContainerRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setGlowPos({ x, y });
    setShowGlow(true);
  };

  const handleMouseLeave = () => {
    if (isInteractive) return;
    setShowGlow(false);
  };

  // Coordinated Y-axis spin timeline with synchronized text fade
  const spinCarousel = (direction: "next" | "prev" = "next") => {
    if (isInteractive) return;
    const stage = carouselStageRef.current;
    if (!stage) return;

    const rotOffset = direction === "next" ? -180 : 180;
    const nextRotation = carouselRotation + rotOffset;
    setCarouselRotation(nextRotation);

    const nextPanel = activePanel === 1 ? 2 : 1;

    // Spin card stage
    gsap.timeline()
      .to(stage, { scale: 0.93, duration: 0.3, ease: "power2.inOut" })
      .to(stage, { rotateY: nextRotation, duration: 0.7, ease: "power3.inOut" }, "-=0.15")
      .to(stage, { scale: 1, duration: 0.3, ease: "power2.out" }, "-=0.18");

    // Fade and swap right-side text info in sync
    gsap.timeline()
      .to({}, { duration: 0.15, onStart: () => setTextOpacity(0) })
      .to({}, { duration: 0.18 })
      .call(() => {
        setActivePanel(nextPanel);
      })
      .to({}, { duration: 0.35, onStart: () => setTextOpacity(1) });
  };

  const handleDoubleClick = (e: React.MouseEvent) => {
    if (isInteractive) return;
    spinCarousel("next");
  };

  return (
    <section id="projects" className="w-full py-24 px-4 md:px-8 lg:px-12 bg-[#05040d] relative overflow-hidden flex flex-col items-center select-none">
      
      {/* Local Specular Shine styles for glassmorphic mirror pills */}
      <style>{`
        .glass-shiny-pill {
          position: relative;
          overflow: hidden;
        }
        .glass-shiny-pill::after {
          content: "";
          position: absolute;
          top: 0;
          left: -200%;
          width: 80%;
          height: 100%;
          background: linear-gradient(
            90deg,
            rgba(255, 255, 255, 0) 0%,
            rgba(255, 255, 255, 0.25) 50%,
            rgba(255, 255, 255, 0) 100%
          );
          transform: skewX(-20deg);
          transition: left 0.7s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .glass-shiny-pill:hover::after {
          left: 200%;
        }
      `}</style>

      {/* Background Accent Gradients */}
      <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-signal/5 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[400px] h-[400px] bg-pulse/5 blur-[110px] rounded-full pointer-events-none" />
      <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-signal/15 to-transparent pointer-events-none" />

      <div className="w-full max-w-none px-0 flex flex-col gap-10 z-10">
        
        {/* Section Title Header */}
        <SectionHeader id="03" title="PROJECTS" />

        {/* Split Grid Layout: Left Carousel (span 8) | Right Details (span 4) */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-10 mt-6 items-center">
          
          {/* LEFT: 3D Carousel Stage */}
          <div className="xl:col-span-8 flex items-center justify-center gap-2 sm:gap-4 relative w-full xl:translate-x-[-20px] z-20">
            
            {/* Left arrow controls */}
            <button 
              onClick={() => spinCarousel("prev")}
              className="group flex items-center justify-center w-8 h-8 sm:w-12 sm:h-12 rounded-full border border-white/10 hover:border-signal/50 bg-[#14121F]/80 hover:bg-[#1C1A2E] text-dim hover:text-ink cursor-pointer transition-all duration-300 z-30 shrink-0"
              aria-label="Previous project"
            >
              <ChevronLeft className="w-4 h-4 sm:w-6 sm:h-6 transition-transform duration-300 group-hover:translate-x-[-4px]" />
            </button>

            {/* Perspective Viewport Container */}
            <div 
              ref={carouselContainerRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              onDoubleClick={handleDoubleClick}
              className="w-full max-w-[760px] h-[340px] xs:h-[400px] sm:h-[480px] md:h-[520px] relative cursor-pointer select-none"
              style={{ perspective: 2000 }}
            >
              {/* Specular cursor glow */}
              {showGlow && !isInteractive && (
                <div 
                  className="absolute inset-0 pointer-events-none transition-opacity duration-300 mix-blend-screen z-30"
                  style={{
                    background: `radial-gradient(400px circle at ${glowPos.x}px ${glowPos.y}px, rgba(110, 92, 255, 0.08), transparent 85%)`
                  }}
                />
              )}

              {/* Specular boundary border mask */}
              {showGlow && !isInteractive && (
                <div 
                  className="absolute inset-0 rounded-2xl border border-signal/50 pointer-events-none z-30 transition-opacity duration-300"
                  style={{
                    maskImage: `radial-gradient(180px circle at ${glowPos.x}px ${glowPos.y}px, black 30%, transparent 100%)`,
                    WebkitMaskImage: `radial-gradient(180px circle at ${glowPos.x}px ${glowPos.y}px, black 30%, transparent 100%)`
                  }}
                />
              )}

              {/* Stage Element */}
              <div 
                ref={carouselStageRef}
                className="w-full h-full relative"
                style={{ transformStyle: "preserve-3d", willChange: "transform" }}
              >
                
                {/* Panel 1: Campus Rides */}
                <div 
                  ref={card1Ref}
                  className="absolute inset-0 w-full h-full bg-[#0E0C16] border border-white/10 rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.65)] flex flex-col"
                  style={{ 
                    transformStyle: "preserve-3d", 
                    backfaceVisibility: "hidden",
                    WebkitBackfaceVisibility: "hidden",
                    transform: "rotateY(0deg)"
                  }}
                >
                  {/* Mock Browser URL Bar */}
                  <div className="flex items-center justify-between px-4 py-2.5 bg-[#14121F] border-b border-white/5 select-none font-mono text-[9px] text-dim/80 z-20">
                    <div className="flex items-center gap-2">
                      <div className="flex gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#FF5F56]" />
                        <span className="w-1.5 h-1.5 rounded-full bg-[#FFBD2E]" />
                        <span className="w-1.5 h-1.5 rounded-full bg-[#27C93F]" />
                      </div>
                      <span className="text-flare font-frozen font-bold uppercase tracking-widest text-sm sm:text-base ml-2">CAMPUS RIDES</span>
                    </div>

                    {/* Actions links */}
                    <div className="flex items-center gap-2.5">
                      <a 
                        href="https://campusrides-nu.vercel.app/" 
                        target="_blank" 
                        rel="noreferrer" 
                        onClick={(e) => e.stopPropagation()}
                        className="glass-shiny-pill flex items-center gap-2 border border-signal/35 text-white px-3.5 py-1 rounded-md text-[13px] font-mermaid font-bold transition-all duration-300 hover:border-signal/55"
                        style={{
                          background: "linear-gradient(135deg, rgba(110, 92, 255, 0.15) 0%, rgba(255, 255, 255, 0.05) 50%, rgba(255, 255, 255, 0) 50.5%, rgba(110, 92, 255, 0.08) 100%)"
                        }}
                      >
                        <ExternalLink className="w-3 h-3 text-[#B5A9FF]" />
                        <span>Live</span>
                      </a>
                      <a 
                        href="https://github.com/shawaz03/Campus-rides" 
                        target="_blank" 
                        rel="noreferrer" 
                        onClick={(e) => e.stopPropagation()}
                        className="hover:text-ink transition-colors duration-200"
                        aria-label="View Campus Rides repository on GitHub"
                      >
                        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
                        </svg>
                      </a>
                    </div>
                  </div>

                  {/* Sandbox Frame */}
                  <div className="flex-1 w-full relative bg-[#1E1E24]">
                    {isInteractive ? (
                      <iframe 
                        src="https://campusrides-nu.vercel.app/" 
                        className="w-full h-full border-none bg-void/95 pointer-events-auto"
                        title="Campus Rides Live App Frame"
                      />
                    ) : (
                      <img 
                        src="/campus-rides.png" 
                        alt="Campus Rides App Preview" 
                        className="w-full h-full object-cover opacity-80"
                      />
                    )}
                    {!isInteractive && (
                      <div 
                        onClick={(e) => { e.stopPropagation(); setIsInteractive(true); }}
                        className="absolute inset-0 bg-void/50 backdrop-blur-[1px] hover:bg-void/40 flex items-center justify-center pointer-events-auto z-10"
                      >
                        <button className="bg-signal/20 hover:bg-signal/30 border border-signal/45 text-ink text-[10px] font-mono uppercase tracking-wider px-4 py-2 rounded-lg cursor-pointer">
                          Click to Interact Live
                        </button>
                      </div>
                    )}
                    {isInteractive && (
                      <button 
                        onClick={(e) => { e.stopPropagation(); setIsInteractive(false); }}
                        className="absolute bottom-3 right-3 bg-red-950/80 border border-red-500/40 text-red-200 text-[9px] font-mono px-2 py-0.5 rounded cursor-pointer z-30"
                      >
                        Exit Live Sandbox
                      </button>
                    )}
                  </div>
                </div>

                {/* Panel 2: Coming Soon */}
                <div 
                  ref={card2Ref}
                  className="absolute inset-0 w-full h-full bg-[#07050d] border border-dashed border-white/15 rounded-2xl p-6 flex flex-col justify-between shadow-[0_20px_50px_rgba(0,0,0,0.65)]"
                  style={{ 
                    transformStyle: "preserve-3d", 
                    backfaceVisibility: "hidden",
                    WebkitBackfaceVisibility: "hidden",
                    transform: "rotateY(180deg)"
                  }}
                >
                  <div className="flex items-center justify-between border-b border-white/5 pb-2.5 select-none">
                    <div className="flex items-center gap-2">
                      <Terminal className="w-3.5 h-3.5 text-[#FFD23F] animate-pulse" />
                      <span className="font-mono text-[9px] text-dim/80 uppercase tracking-[0.2em]">CYLINDER_PORTAL_02</span>
                    </div>
                    <span className="font-mono font-bold text-[10.5px] text-dim uppercase">PROJECT_SLOT_EMPTY</span>
                  </div>
                  
                  <div className="flex-1 w-full bg-void/85 border border-white/5 rounded-lg my-4 p-4 text-left font-mono text-[10.5px] leading-relaxed text-[#FFD23F] overflow-hidden h-[180px]">
                    {terminalLogs.map((log, idx) => (
                      <div key={idx} className="whitespace-pre-wrap">{log}</div>
                    ))}
                    {activeLog && (
                      <div className="whitespace-pre-wrap">
                        {activeLog}
                        <span className="animate-pulse font-bold text-[#FFD23F]">_</span>
                      </div>
                    )}
                  </div>

                  <div className="w-full flex items-center justify-between border-t border-white/5 pt-2.5">
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E] animate-pulse" />
                      <span className="font-mono text-[9px] text-dim/85 uppercase">Developing in workspace...</span>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* Right arrow controls */}
            <button 
              onClick={() => spinCarousel("next")}
              className="group flex items-center justify-center w-8 h-8 sm:w-12 sm:h-12 rounded-full border border-white/10 hover:border-signal/50 bg-[#14121F]/80 hover:bg-[#1C1A2E] text-dim hover:text-ink cursor-pointer transition-all duration-300 z-30 shrink-0"
              aria-label="Next project"
            >
              <ChevronRight className="w-4 h-4 sm:w-6 sm:h-6 transition-transform duration-300 group-hover:translate-x-[4px]" />
            </button>
          </div>

          {/* RIGHT: Dynamic Dossier Board (Fixed Shape: xl:h-[420px] flex flex-col justify-between) */}
          <div className="xl:col-span-4 w-full flex flex-col gap-6 justify-center z-20">
            <div 
              className="w-full border border-white/5 bg-[#0E0C16]/50 rounded-2xl p-7 shadow-xl transition-all duration-500 ease-in-out text-left xl:h-[420px] flex flex-col justify-between"
              style={{ opacity: textOpacity, transform: `translateY(${(1 - textOpacity) * 8}px)` }}
            >
              {activePanel === 1 ? (
                <div className="flex flex-col gap-5 h-full justify-between">
                  <div className="flex flex-col gap-1.5">
                    <span className="font-mono text-[9px] text-[#3FE0C5] tracking-[0.25em] uppercase">
                      CLASSIFICATION: RIDE_PLATFORM
                    </span>
                    {/* Title updated to Orange (text-flare) */}
                    <h3 className="font-frozen font-bold text-3xl text-flare uppercase tracking-wide">
                      CAMPUS RIDES
                    </h3>
                  </div>

                  {/* Specs Grid */}
                  <div className="grid grid-cols-2 gap-3.5 font-mermaid text-base border border-white/5 bg-void/30 p-3.5 rounded-xl text-white">
                    <div className="flex items-center gap-2">
                      <Terminal className="w-3.5 h-3.5 text-signal" />
                      <span>CLASS: STUDENT_UTILITY</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Cpu className="w-3.5 h-3.5 text-signal" />
                      <span>ENGINE: FULL-STACK</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Database className="w-3.5 h-3.5 text-signal" />
                      <span>DB: SUPABASE</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Layers className="w-3.5 h-3.5 text-signal" />
                      <span>STATUS: ONLINE</span>
                    </div>
                  </div>

                  {/* Description copy */}
                  <p className="font-mermaid text-lg text-white leading-relaxed text-justify">
                    A student-focused, doodle-styled ride booking application connecting student riders and drivers. Built with real-time location tracking, interactive Maplibre GL map interfaces, React Query status syncing, and integrated student SOS emergency services.
                  </p>

                  {/* Tech stack badges */}
                  <div className="flex flex-wrap gap-1.5">
                    {["Next.js", "Supabase", "React Query", "Zustand", "GSAP", "Tailwind"].map((tech) => (
                      <span 
                        key={tech}
                        className="glass-shiny-pill font-mono text-[9.5px] backdrop-blur-[6px] border border-signal/30 text-[#B5A9FF] px-2.5 py-1 rounded shadow-[0_4px_12px_rgba(0,0,0,0.15)] transition-all duration-200 hover:border-signal/50"
                        style={{
                          background: "linear-gradient(135deg, rgba(110, 92, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 50%, rgba(255, 255, 255, 0) 50.5%, rgba(110, 92, 255, 0.04) 100%)"
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="flex flex-col gap-5 h-full justify-between">
                  <div className="flex flex-col gap-1.5">
                    <span className="font-mono text-[9px] text-[#6E5CFF] tracking-[0.25em] uppercase">
                      CLASSIFICATION: PIPELINE_NODE
                    </span>
                    {/* Title stays Orange (text-flare) */}
                    <h3 className="font-frozen font-bold text-3xl text-flare uppercase tracking-wide">
                      PROJECT_SLOT_EMPTY
                    </h3>
                  </div>

                  {/* Specs Grid */}
                  <div className="grid grid-cols-2 gap-3.5 font-mermaid text-base border border-white/5 bg-void/30 p-3.5 rounded-xl text-white">
                    <div className="flex items-center gap-2">
                      <Terminal className="w-3.5 h-3.5 text-[#FFD23F]" />
                      <span>CLASS: UNALLOCATED</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Cpu className="w-3.5 h-3.5 text-[#FFD23F]" />
                      <span>ENGINE: PLANNING</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Database className="w-3.5 h-3.5 text-[#FFD23F]" />
                      <span>STORAGE: GIT</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Layers className="w-3.5 h-3.5 text-[#FFD23F]" />
                      <span>STATUS: AWAITING</span>
                    </div>
                  </div>

                  {/* Description copy */}
                  <p className="font-mermaid text-lg text-white leading-relaxed text-justify">
                    This project slot is currently empty. Awaiting next modular application deployment. Exploring system architectures, API schemas, and interactive user experiences.
                  </p>

                  {/* Tech stack badges */}
                  <div className="flex flex-wrap gap-1.5">
                    {["Git", "TypeScript", "GSAP", "Creative Stack"].map((tech) => (
                      <span 
                        key={tech}
                        className="glass-shiny-pill font-mono text-[9.5px] backdrop-blur-[6px] border border-flare/30 text-[#FFB08A] px-2.5 py-1 rounded shadow-[0_4px_12px_rgba(0,0,0,0.15)] transition-all duration-200 hover:border-flare/50"
                        style={{
                          background: "linear-gradient(135deg, rgba(255, 122, 69, 0.1) 0%, rgba(255, 255, 255, 0.05) 50%, rgba(255, 255, 255, 0) 50.5%, rgba(255, 122, 69, 0.04) 100%)"
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
