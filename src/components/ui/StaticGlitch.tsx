"use client";

import React, { useEffect, useRef } from "react";

interface StaticGlitchProps {
  className?: string;
  isActive?: boolean;
}

export default function StaticGlitch({ className = "", isActive = true }: StaticGlitchProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas internal resolution low for performance and chunky retro pixel aesthetic
    canvas.width = 320;
    canvas.height = 180;

    let animationFrameId: number;

    const render = () => {
      if (!isActive) return;

      const imgData = ctx.createImageData(canvas.width, canvas.height);
      const data = imgData.data;
      const len = data.length;

      // Draw random pixels
      for (let i = 0; i < len; i += 4) {
        const val = Math.floor(Math.random() * 255);
        
        // Add subtle chromatic signal tint occasionally
        const isTint = Math.random() < 0.015;
        if (isTint) {
          data[i] = val; // R
          data[i + 1] = Math.max(0, val - 40); // G
          data[i + 2] = 255; // B (cyan/purple signal glow)
        } else {
          data[i] = val;
          data[i + 1] = val;
          data[i + 2] = val;
        }
        data[i + 3] = 255; // Alpha
      }

      ctx.putImageData(imgData, 0, 0);

      // Horizontal CRT glitch line overlay (15% chance per frame)
      if (Math.random() < 0.15) {
        ctx.fillStyle = "rgba(110, 92, 255, 0.3)"; // signal color
        ctx.fillRect(0, Math.random() * canvas.height, canvas.width, Math.random() * 4);
      }
      // Horizontal flare error line (5% chance per frame)
      if (Math.random() < 0.05) {
        ctx.fillStyle = "rgba(255, 122, 69, 0.25)"; // flare color
        ctx.fillRect(0, Math.random() * canvas.height, canvas.width, Math.random() * 8);
      }

      animationFrameId = requestAnimationFrame(render);
    };

    if (isActive) {
      animationFrameId = requestAnimationFrame(render);
    }

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isActive]);

  return (
    <canvas
      ref={canvasRef}
      className={`w-full h-full pointer-events-none select-none ${className}`}
      style={{ imageRendering: "pixelated" }}
    />
  );
}
