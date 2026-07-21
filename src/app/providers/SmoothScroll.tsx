"use client";

import React, { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    // Only run on client
    if (typeof window === "undefined") return;

    // Register ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    // Initialize Lenis
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
    });

    // Expose lenis instance globally for custom scrolling triggers (e.g. from terminal cards)
    (window as any).lenis = lenis;

    // Synchronize ScrollTrigger with Lenis
    lenis.on("scroll", ScrollTrigger.update);

    // Hook Lenis into GSAP ticker
    const tickerHandler = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tickerHandler);
    gsap.ticker.lagSmoothing(0);

    // Clean up on unmount
    return () => {
      gsap.ticker.remove(tickerHandler);
      lenis.destroy();
      (window as any).lenis = undefined;
      ScrollTrigger.killAll();
    };
  }, []);

  return <>{children}</>;
}
