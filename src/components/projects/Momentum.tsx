"use client";

import { useRef } from "react";
import { MomentumPanelAtmosphere } from "@/components/ui/MomentumPanelAtmosphere";
import { ProjectTracker } from "@/components/ui/ProjectTracker";
import type { MomentumMockData, Project } from "@/data/projectsData";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import {
  PANEL_ASSET_COLUMN,
  PANEL_COPY_COLUMN,
  PANEL_INNER,
  PANEL_SPLIT_GRID,
  SHOWCASE_PANEL,
} from "@/lib/panelStyles";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { cn } from "@/lib/utils";
import type { PanelAnimationProps } from "@/types/animation";

interface MomentumProps extends PanelAnimationProps {
  project: Project;
}

const LIQUID_EASE = "power2.inOut";

export function Momentum({
  project,
  panelRef,
  containerAnimation,
}: MomentumProps) {
  const data = project.mockData as MomentumMockData;
  const rootRef = useRef<HTMLDivElement>(null);
  const chillWireRef = useRef<SVGGElement>(null);
  const moderateWireRef = useRef<SVGGElement>(null);
  const chaosWireRef = useRef<SVGGElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const stateRef = useRef<HTMLSpanElement>(null);

  const chill = data.loadStates[0];
  const moderate = data.loadStates[1];
  const chaos = data.loadStates[2];

  useIsomorphicLayoutEffect(() => {
    const panel = panelRef.current;
    const root = rootRef.current;
    const chillWire = chillWireRef.current;
    const moderateWire = moderateWireRef.current;
    const chaosWire = chaosWireRef.current;
    const list = listRef.current;
    const stateLabel = stateRef.current;
    if (
      !panel ||
      !root ||
      !chillWire ||
      !moderateWire ||
      !chaosWire ||
      !list ||
      !stateLabel
    )
      return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const scrollConfig: ScrollTrigger.Vars = containerAnimation
      ? {
          trigger: panel,
          containerAnimation: containerAnimation,
          start: "left center",
          end: "right center",
          scrub: true,
        }
      : {
          trigger: panel,
          start: "top 75%",
          end: "bottom 25%",
          scrub: true,
        };

    const ctx = gsap.context(() => {
      const taskItems = gsap.utils.toArray<HTMLElement>(".momentum-task");
      const chillWave = panel.querySelector(".momentum-chill-wave");

      if (prefersReducedMotion) {
        gsap.set(chillWire, { opacity: 0 });
        gsap.set(moderateWire, { opacity: 0 });
        gsap.set(chaosWire, { opacity: 1 });
        gsap.set(list, { scale: 0.7 });
        stateLabel.textContent = chaos.label;
        return;
      }

      gsap.set(chillWire, { opacity: 1 });
      gsap.set(moderateWire, { opacity: 0 });
      gsap.set(chaosWire, { opacity: 0 });

      if (chillWave instanceof SVGPathElement) {
        const waveLength = chillWave.getTotalLength();
        chillWave.style.strokeDasharray = `${waveLength * 0.18} ${waveLength}`;
        gsap.to(chillWave, {
          strokeDashoffset: -waveLength,
          duration: 14,
          ease: "none",
          repeat: -1,
        });
      }

      const tl = gsap.timeline({ scrollTrigger: scrollConfig });

      tl.to(
        chillWire,
        { opacity: 0, duration: 0.33, ease: LIQUID_EASE },
        0,
      )
        .to(
          moderateWire,
          { opacity: 1, duration: 0.33, ease: LIQUID_EASE },
          0,
        )
        .fromTo(
          list,
          { scale: 1 },
          { scale: 0.85, duration: 0.33, ease: LIQUID_EASE },
          0,
        )
        .to(
          moderateWire,
          { opacity: 0, duration: 0.34, ease: LIQUID_EASE },
          0.33,
        )
        .to(
          chaosWire,
          { opacity: 1, duration: 0.34, ease: LIQUID_EASE },
          0.33,
        )
        .to(list, { scale: 0.7, duration: 0.34, ease: LIQUID_EASE }, 0.33);

      tl.to(
        stateLabel,
        {
          duration: 0.15,
          ease: "none",
          onUpdate: function () {
            const total = tl.progress();
            if (total < 0.33) stateLabel.textContent = chill.label;
            else if (total < 0.66) stateLabel.textContent = moderate.label;
            else stateLabel.textContent = chaos.label;
          },
        },
        0,
      );

      taskItems.forEach((item, index) => {
        tl.fromTo(
          item,
          { opacity: 1 },
          {
            opacity: index < 4 ? 1 : 0.35,
            duration: 0.2,
            ease: "none",
          },
          0.2,
        );
        tl.to(
          item,
          {
            opacity: index < 2 ? 1 : 0,
            duration: 0.25,
            ease: "none",
          },
          0.55,
        );
      });
    }, panel);

    return () => ctx.revert();
  }, [containerAnimation]);

  return (
    <div ref={panelRef} className={cn(SHOWCASE_PANEL)}>
      <MomentumPanelAtmosphere
        chillRef={chillWireRef}
        moderateRef={moderateWireRef}
        chaosRef={chaosWireRef}
      />

      <div
        ref={rootRef}
        className={`${PANEL_INNER} relative z-10 ${PANEL_SPLIT_GRID}`}
      >
        <div className={PANEL_COPY_COLUMN}>
          <div className="flex flex-wrap items-center gap-2.5">
            <ProjectTracker index="03" title={project.title} accent="amber" />
            {project.comingSoon ? (
              <span className="rounded border border-amber-500/30 bg-amber-500/5 px-2 py-0.5 font-telemetry text-[10px] uppercase tracking-widest text-amber-400 shadow-neon-amber">
                Coming Soon
              </span>
            ) : null}
          </div>

          <p className="mt-2 max-w-md text-sm leading-relaxed text-slate-400">
            {project.description}
          </p>

          <div className="mt-3 flex flex-wrap gap-2">
            {project.techStack.map((tag) => (
              <span
                key={tag}
                className="font-telemetry rounded-full border border-slate-700/80 bg-slate-900/50 px-3 py-1 text-[10px] uppercase tracking-[0.15em] text-slate-400"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {data.loadStates.map((state) => (
              <span
                key={state.id}
                className="font-telemetry rounded-full border border-slate-700/80 bg-slate-900/50 px-3 py-1 text-[10px] uppercase tracking-[0.15em] text-slate-400"
              >
                {state.label}
              </span>
            ))}
          </div>
        </div>

        <div className={`${PANEL_ASSET_COLUMN} xl:justify-end`}>
          <div className="glass-panel shadow-neon-amber relative min-h-0 w-full max-w-md overflow-hidden rounded-2xl p-5 md:max-xl:mx-auto md:p-6 xl:max-w-none">
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-white/5" />

            <div className="relative mb-5 flex items-center justify-between">
              <div>
                <p className="font-telemetry text-[10px] uppercase tracking-[0.2em] text-slate-500">
                  Adaptive Session
                </p>
                <p className="text-lg font-semibold text-white">
                  Today&apos;s Load
                </p>
              </div>
              <span
                ref={stateRef}
                className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs font-medium text-white backdrop-blur-md"
              >
                {chill.label}
              </span>
            </div>

            <div ref={listRef} className="relative flex flex-col gap-3">
              {chill.tasks.map((task, index) => (
                <div
                  key={task}
                  className={cn(
                    "momentum-task rounded-xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur-md",
                    index >= 4 && "opacity-35",
                  )}
                >
                  <p className="text-sm text-slate-200">{task}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
