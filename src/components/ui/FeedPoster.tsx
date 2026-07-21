import React from "react";

export default function FeedPoster() {
  return (
    <div className="absolute inset-0 bg-void flex flex-col items-center justify-center p-6 select-none overflow-hidden z-10 border border-signal/20 rounded-xl">
      {/* Background Matrix/Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(110,92,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(110,92,255,0.03)_1px,transparent_1px)] bg-[size:3rem_3rem]" />
      
      {/* Technical circle radar / scanner wireframe */}
      <div className="absolute w-[280px] h-[280px] md:w-[420px] md:h-[420px] border border-signal/10 rounded-full flex items-center justify-center animate-[spin_30s_linear_infinite] pointer-events-none">
        <div className="w-[85%] h-[85%] border border-dashed border-signal/10 rounded-full" />
        <div className="w-[60%] h-[60%] border border-signal/15 rounded-full" />
      </div>

      {/* Tech stack logo grid with glowing neon styling */}
      <div className="z-10 flex flex-col items-center gap-6 text-center max-w-sm w-full">
        {/* Futuristic Terminal Header */}
        <div className="font-mono text-[9px] text-dim uppercase tracking-[0.25em] flex flex-col gap-1 border-b border-signal/15 pb-4 w-full">
          <span>PORTFOLIO FEED BOOT SYSTEM</span>
          <span className="text-signal font-semibold">SIGNAL STATE: ACQUIRING LINK</span>
        </div>

        {/* Tech Logos in SVG */}
        <div className="flex justify-center items-center gap-6 md:gap-8 py-4">
          {/* React Logo */}
          <svg className="w-7 h-7 text-pulse filter drop-shadow-[0_0_8px_rgba(63,224,197,0.3)] opacity-70 hover:opacity-100 transition-opacity" viewBox="-11.5 -10.23174 23 20.46348">
            <circle cx="0" cy="0" r="2.05" fill="currentColor" />
            <g stroke="currentColor" strokeWidth="1" fill="none">
              <ellipse rx="11" ry="4.2" />
              <ellipse rx="11" ry="4.2" transform="rotate(60)" />
              <ellipse rx="11" ry="4.2" transform="rotate(120)" />
            </g>
          </svg>

          {/* Next.js N Logo */}
          <svg className="w-7 h-7 text-ink filter drop-shadow-[0_0_8px_rgba(237,235,250,0.2)] opacity-70 hover:opacity-100 transition-opacity" viewBox="0 0 180 180" fill="none">
            <mask id="mask0" maskUnits="userSpaceOnUse" x="0" y="0" width="180" height="180">
              <circle cx="90" cy="90" r="90" fill="black" />
            </mask>
            <g mask="url(#mask0)">
              <circle cx="90" cy="90" r="90" fill="transparent" stroke="currentColor" strokeWidth="6" />
              <path d="M128.273 140.49L61.1143 54.7431H48.457V125.109H59.5786V71.696L119.51 148.91C122.585 146.36 125.518 143.529 128.273 140.49Z" fill="currentColor" />
              <path d="M120.352 54.7432H109.23V125.109H120.352V54.7432Z" fill="currentColor" />
            </g>
          </svg>

          {/* Tailwind CSS Logo */}
          <svg className="w-7 h-7 text-pulse filter drop-shadow-[0_0_8px_rgba(63,224,197,0.3)] opacity-70 hover:opacity-100 transition-opacity" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 3a9 9 0 0 0-9 9c0 1.25.25 2.44.7 3.53C5.1 12.92 7.84 10.5 11 10.5h1a4.5 4.5 0 0 1 4.5 4.5v1c0 2.5 1.5 4.5 4.5 4.5.3 0 .6 0 .9-.1C21.75 19.31 21 17.75 21 16a9 9 0 0 0-9-9Z" />
            <path d="M12 21a9 9 0 0 0 9-9c0-1.25-.25-2.44-.7-3.53-1.4 2.61-4.14 5.03-7.3 5.03h-1A4.5 4.5 0 0 1 7.5 9v-1c0-2.5-1.5-4.5-4.5-4.5-.3 0-.6 0-.9.1.1 1.08.86 2.64.86 4.39a9 9 0 0 0 9 9Z" />
          </svg>

          {/* GSAP Text Badge */}
          <div className="font-mono text-[10px] font-black border border-signal text-signal px-2 py-0.5 rounded shadow-[0_0_8px_rgba(110,92,255,0.3)] opacity-70 hover:opacity-100 transition-all select-none">
            GSAP
          </div>
        </div>

        {/* Boot Progress Bar */}
        <div className="w-full flex flex-col gap-2">
          <div className="flex justify-between font-mono text-[8px] text-dim">
            <span>LINKING_PORTFOLIO_CORE</span>
            <span className="animate-pulse">BOOTING_</span>
          </div>
          <div className="w-full h-1 bg-deck border border-signal/15 rounded-sm overflow-hidden relative">
            {/* Animated progress bar overlay */}
            <div className="absolute top-0 left-0 h-full bg-gradient-to-r from-signal to-pulse animate-[loadingPulse_2.5s_infinite_linear]" style={{ width: "65%" }} />
          </div>
        </div>
      </div>

      {/* Embedded loadingPulse animation style */}
      <style jsx global>{`
        @keyframes loadingPulse {
          0% {
            left: -100%;
            width: 50%;
          }
          50% {
            left: 20%;
            width: 70%;
          }
          100% {
            left: 100%;
            width: 30%;
          }
        }
      `}</style>

      {/* Scan lines utility inside poster */}
      <div className="absolute inset-0 scanlines pointer-events-none opacity-20" />
    </div>
  );
}
