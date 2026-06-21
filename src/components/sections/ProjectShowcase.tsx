"use client";

import { useRef, useState } from "react";
import { SiteFooter } from "@/components/sections/Footer";
import { ALOSplit } from "@/components/projects/ALOSplit";
import { F1StratAnalyzer } from "@/components/projects/F1StratAnalyzer";
import { Momentum } from "@/components/projects/Momentum";
import { CyberGrid } from "@/components/ui/CyberGrid";
import { GalaxyParticleField } from "@/components/ui/GalaxyParticleField";
import type { Project } from "@/data/projectsData";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import { gsap, ScrollTrigger } from "@/lib/gsap";

/** Light particle density for the pinned horizontal showcase viewport */
const SHOWCASE_PARTICLE_COUNT = 100;

interface ProjectShowcaseProps {
  projects: Project[];
}

export function ProjectShowcase({ projects }: ProjectShowcaseProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLElement>(null);
  const [containerAnimation, setContainerAnimation] =
    useState<gsap.core.Tween | null>(null);

  const f1PanelRef = useRef<HTMLDivElement>(null);
  const aloPanelRef = useRef<HTMLDivElement>(null);
  const momentumPanelRef = useRef<HTMLDivElement>(null);

  const f1 = projects.find((p) => p.id === "f1-strat-analyzer")!;
  const alo = projects.find((p) => p.id === "alosplit")!;
  const momentum = projects.find((p) => p.id === "momentum")!;

  useIsomorphicLayoutEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const mm = gsap.matchMedia();

    mm.add(
      {
        isDesktop: "(min-width: 768px)",
        reduceMotion: "(prefers-reduced-motion: reduce)",
      },
      (context) => {
        const { isDesktop, reduceMotion } = context.conditions ?? {};

        if (isDesktop && !reduceMotion) {
          const getScrollDistance = () =>
            Math.max(track.scrollWidth - window.innerWidth, 0);

          const tween = gsap.to(track, {
            x: () => -getScrollDistance(),
            ease: "none",
            scrollTrigger: {
              trigger: section,
              pin: true,
              scrub: 1,
              end: () => `+=${getScrollDistance()}`,
              invalidateOnRefresh: true,
            },
          });

          setContainerAnimation(tween);
          ScrollTrigger.refresh();

          return () => {
            setContainerAnimation(null);
          };
        }

        setContainerAnimation(null);
        gsap.set(track, { x: 0 });
      },
    );

    return () => {
      mm.revert();
      setContainerAnimation(null);
    };
  }, []);

  return (
    <>
      <section
        id="project-section"
        ref={sectionRef}
        className="relative overflow-hidden bg-background"
      >
        <CyberGrid className="pointer-events-none absolute inset-0 z-0 opacity-35" />
        <GalaxyParticleField
          containerRef={sectionRef}
          particleCount={SHOWCASE_PARTICLE_COUNT}
        />

        <div className="pointer-events-none absolute left-6 top-6 z-20 hidden md:block lg:left-24">
          <p className="font-telemetry text-[10px] uppercase tracking-[0.3em] text-slate-600">
            Selected Work
          </p>
        </div>

        <div className="relative z-10 overflow-hidden">
          <div
            ref={trackRef}
            className="flex flex-col md:h-screen md:flex-row md:w-max"
          >
            <F1StratAnalyzer
              project={f1}
              panelRef={f1PanelRef}
              containerAnimation={containerAnimation}
            />
            <ALOSplit
              project={alo}
              panelRef={aloPanelRef}
              containerAnimation={containerAnimation}
            />
            <Momentum
              project={momentum}
              panelRef={momentumPanelRef}
              containerAnimation={containerAnimation}
            />
          </div>
        </div>
      </section>

      <SiteFooter footerRef={footerRef} />
    </>
  );
}
