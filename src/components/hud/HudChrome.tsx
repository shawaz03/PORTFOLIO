"use client";

import React, { useEffect, useState } from "react";

export default function HudChrome() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [time, setTime] = useState("");

  useEffect(() => {
    // 1. Live system clock
    const updateClock = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-US", {
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );
    };
    updateClock();
    const timerId = setInterval(updateClock, 1000);

    // 2. Scroll percentage tracking
    const handleScroll = () => {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight <= 0) return;
      const progress = Math.min(100, Math.max(0, (window.scrollY / docHeight) * 100));
      setScrollProgress(Math.round(progress));
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    // 3. Mouse/Cursor coordinate tracking
    const handleMouseMove = (e: MouseEvent) => {
      setCoords({
        x: Math.round(e.clientX),
        y: Math.round(e.clientY),
      });
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    return () => {
      clearInterval(timerId);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <>
      {/* HUD Corner Brackets and Telemetry */}
      <div className="fixed inset-6 pointer-events-none z-50 select-none">
        {/* Top-Left Bracket */}
        <div className="absolute top-0 left-0 flex flex-col gap-1.5">
          <div className="w-6 h-6 border-t-2 border-l-2 border-signal/50" />
          <span className="font-mono text-[9px] text-dim tracking-wider uppercase">
            SYS_INIT // PASS
          </span>
        </div>

        {/* Top-Right Bracket */}
        <div className="absolute top-0 right-0 flex flex-col items-end gap-1.5">
          <div className="w-6 h-6 border-t-2 border-r-2 border-signal/50" />
          <span className="font-mono text-[9px] text-dim tracking-wider uppercase">
            SEC // 01_HERO
          </span>
        </div>

        {/* Bottom-Left Bracket */}
        <div className="absolute bottom-0 left-0 flex flex-col-reverse gap-1.5">
          <div className="w-6 h-6 border-b-2 border-l-2 border-signal/50" />
          <span className="font-mono text-[9px] text-dim tracking-wider">
            GRID_LOC: X={coords.x} / Y={coords.y}
          </span>
        </div>

        {/* Bottom-Right Bracket */}
        <div className="absolute bottom-0 right-0 flex flex-col-reverse items-end gap-1.5">
          <div className="w-6 h-6 border-b-2 border-r-2 border-signal/50" />
          <span className="font-mono text-[9px] text-dim tracking-wider">
            SCROLL_INDEX: {scrollProgress.toString().padStart(3, "0")}%
          </span>
        </div>
      </div>

      {/* Persistent HUD Chrome Header */}
      <header className="fixed top-0 left-0 w-full z-45 px-10 py-6 flex justify-between items-center pointer-events-none select-none">
        {/* Logo / Brand */}
        <div className="pointer-events-auto flex items-center gap-3 bg-void/60 backdrop-blur-md border border-signal/15 px-4 py-2 rounded-sm shadow-sm glass-panel-glow">
          <span className="font-mono text-xs font-bold text-ink tracking-widest">
            SHAWAZ <span className="text-signal">//</span> PORTFOLIO
          </span>
        </div>

        {/* Time and Core Status */}
        <div className="pointer-events-auto flex items-center gap-6 bg-void/60 backdrop-blur-md border border-signal/15 px-4 py-2 rounded-sm shadow-sm glass-panel-glow">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pulse opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-pulse"></span>
            </span>
            <span className="font-mono text-[10px] text-ink tracking-wider font-medium">
              CORE_ACTIVE
            </span>
          </div>
          <div className="w-px h-3 bg-signal/25" />
          <span className="font-mono text-[10px] text-dim tracking-widest">
            {time || "00:00:00"}
          </span>
        </div>
      </header>

      {/* Persistent HUD Chrome Footer */}
      <footer className="fixed bottom-0 left-0 w-full z-45 px-10 py-6 flex justify-between items-center pointer-events-none select-none">
        {/* Environment Specs */}
        <div className="hidden md:flex pointer-events-auto items-center gap-4 bg-void/60 backdrop-blur-md border border-signal/15 px-4 py-2 rounded-sm font-mono text-[9px] text-dim tracking-wide glass-panel-glow">
          <span>LATENCY: 14ms</span>
          <span className="text-signal/30">|</span>
          <span>FPS: 60</span>
          <span className="text-signal/30">|</span>
          <span>GL_RENDER: ACTIVE</span>
        </div>

        {/* Progress Bar indicator */}
        <div className="pointer-events-auto flex items-center gap-3 bg-void/60 backdrop-blur-md border border-signal/15 px-4 py-2 rounded-sm shadow-sm glass-panel-glow min-w-[200px] md:min-w-[260px]">
          <span className="font-mono text-[9px] text-dim tracking-wider">
            DECK_LEVEL
          </span>
          <div className="flex-1 h-1.5 bg-deck border border-signal/15 rounded-sm overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-signal to-pulse transition-all duration-150 ease-out"
              style={{ width: `${scrollProgress}%` }}
            />
          </div>
        </div>
      </footer>
    </>
  );
}
