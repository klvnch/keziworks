"use client";

import { useRef } from "react";
import { CyberGrid } from "@/components/ui/CyberGrid";
import { GalaxyParticleField } from "@/components/ui/GalaxyParticleField";
import { HeroCursorSpotlight } from "@/components/ui/HeroCursorSpotlight";
import { HeroScrollIndicator } from "@/components/ui/HeroScrollIndicator";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import { gsap } from "@/lib/gsap";

const CAPABILITIES = ["Full-Stack Product", "Realtime UI"];

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    const section = sectionRef.current;
    const inner = innerRef.current;
    if (!section || !inner) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const ctx = gsap.context(() => {
      if (!prefersReducedMotion) {
        gsap.from(".hero-line", {
          opacity: 0,
          y: 40,
          duration: 1,
          stagger: 0.08,
          ease: "power3.out",
        });

        gsap.to(inner, {
          scale: 0.95,
          opacity: 0,
          filter: "blur(4px)",
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      } else {
        gsap.set(".hero-line", { opacity: 1, y: 0 });
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-[100dvh] items-center justify-center overflow-hidden px-6 py-20"
    >
      <CyberGrid className="absolute inset-0 opacity-80" />
      <GalaxyParticleField containerRef={sectionRef} />
      <HeroCursorSpotlight containerRef={sectionRef} />

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_55%_45%_at_50%_42%,rgb(6_182_212_/_0.04),transparent_70%)]" />

      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-neon-mint/15 to-transparent" />

      <div className="hero-line pointer-events-none absolute left-6 top-8 hidden h-16 w-16 border-l border-t border-cyan-400/20 md:block lg:left-12" />
      <div className="hero-line pointer-events-none absolute right-6 top-8 hidden h-16 w-16 border-r border-t border-cyan-400/20 md:block lg:right-12" />

      <div
        ref={innerRef}
        className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-start gap-8"
      >
        <div className="hero-line flex w-full items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="font-telemetry text-[10px] uppercase tracking-[0.35em] text-neon-mint/70">
              keziworks.com
            </span>
            <span className="hidden h-1 w-1 rounded-full bg-cyan-400/80 sm:inline" />
            <span className="hidden font-telemetry text-[10px] uppercase tracking-[0.2em] text-slate-500 sm:inline">
              Portfolio v1.0
            </span>
          </div>
          <span className="font-telemetry text-[10px] uppercase tracking-[0.15em] text-emerald-400/90">
            ★ Online
          </span>
        </div>

        <div className="hero-line space-y-4">
          <p className="font-telemetry text-xs uppercase tracking-[0.25em] text-cyan-400/80">
            Full-stack engineer
          </p>
          <h1 className="text-5xl font-semibold leading-[0.92] tracking-tight text-white sm:text-7xl md:text-8xl">
            <span className="text-glow-mint">keziworks</span>
          </h1>
        </div>

        <p className="hero-line max-w-2xl text-base leading-relaxed text-slate-400 sm:text-lg">
          Interactive systems · keziworks.com
        </p>

        <div className="hero-line h-px w-full max-w-md bg-gradient-to-r from-neon-mint/80 via-cyan-400/40 to-transparent" />

        <p className="hero-line max-w-xl text-sm leading-relaxed text-slate-500 sm:text-base">
          Developing hyper-focused digital tools driven by personal subcultures,
          social friction, and a deep interest in human health and behavioral
          tracking systems.
        </p>

        <div className="hero-line flex flex-wrap gap-2 pt-1">
          {CAPABILITIES.map((badgeName) => (
            <span
              key={badgeName}
              className="font-telemetry rounded-full border border-slate-700/80 bg-slate-900/40 px-3 py-1.5 text-[10px] uppercase tracking-[0.18em] text-slate-400 backdrop-blur-sm"
            >
              {badgeName}
            </span>
          ))}
        </div>
      </div>

      <div className="hero-line absolute bottom-10 left-1/2 z-10 -translate-x-1/2">
        <HeroScrollIndicator />
      </div>
    </section>
  );
}
