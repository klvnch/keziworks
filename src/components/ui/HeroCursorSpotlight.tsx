"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

interface HeroCursorSpotlightProps {
  containerRef: React.RefObject<HTMLElement | null>;
}

export function HeroCursorSpotlight({ containerRef }: HeroCursorSpotlightProps) {
  const glowRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const glow = glowRef.current;
    const grid = gridRef.current;
    if (!container || !glow || !grid) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) {
      gsap.set(glow, { opacity: 0.4 });
      return;
    }

    gsap.set(glow, { xPercent: -50, yPercent: -50, x: container.clientWidth / 2, y: container.clientHeight / 2 });

    const xTo = gsap.quickTo(glow, "x", { duration: 0.85, ease: "power3.out" });
    const yTo = gsap.quickTo(glow, "y", { duration: 0.85, ease: "power3.out" });

    const setGridMask = (x: number, y: number) => {
      const mask = `radial-gradient(480px circle at ${x}px ${y}px, black 0%, transparent 72%)`;
      grid.style.maskImage = mask;
      grid.style.webkitMaskImage = mask;
    };

    setGridMask(container.clientWidth / 2, container.clientHeight / 2);

    const onMove = (event: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      xTo(x);
      yTo(y);
      setGridMask(x, y);
    };

    container.addEventListener("mousemove", onMove);
    return () => container.removeEventListener("mousemove", onMove);
  }, [containerRef]);

  return (
    <>
      <div
        ref={gridRef}
        className="pointer-events-none absolute inset-0 cyber-grid opacity-50"
        aria-hidden
      />
      <div
        ref={glowRef}
        className="pointer-events-none absolute top-0 left-0 h-[480px] w-[480px] rounded-full bg-[#06b6d4]/[0.08] blur-[120px]"
        aria-hidden
      />
    </>
  );
}
