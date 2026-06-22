"use client";

import { useRef } from "react";
import {
  CloudSun,
  Gauge,
  Pause,
  Play,
  SkipBack,
  SkipForward,
  Thermometer,
  Wind,
} from "lucide-react";
import { F1PanelAtmosphere } from "@/components/ui/F1PanelAtmosphere";
import { ProjectActionButton } from "@/components/ui/ProjectActionButton";
import { ProjectTracker } from "@/components/ui/ProjectTracker";
import type { Project } from "@/data/projectsData";
import type { F1MockData } from "@/data/projectsData";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import { PANEL_INNER, SHOWCASE_PANEL } from "@/lib/panelStyles";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { cn } from "@/lib/utils";
import type { PanelAnimationProps } from "@/types/animation";

interface F1StratAnalyzerProps extends PanelAnimationProps {
  project: Project;
}

type PathKey = "speed" | "throttle" | "brake";

export function F1StratAnalyzer({
  project,
  panelRef,
  containerAnimation,
}: F1StratAnalyzerProps) {
  const data = project.mockData as F1MockData;
  const rootRef = useRef<HTMLDivElement>(null);
  const lapBarRef = useRef<HTMLDivElement>(null);
  const pathRefs = useRef<Record<PathKey, SVGPathElement | null>>({
    speed: null,
    throttle: null,
    brake: null,
  });

  useIsomorphicLayoutEffect(() => {
    const panel = panelRef.current;
    const root = rootRef.current;
    const lapBar = lapBarRef.current;
    if (!panel || !root || !lapBar) return;

    const paths = pathRefs.current;
    let telemetryReady = true;

    (Object.keys(paths) as PathKey[]).forEach((key) => {
      const path = paths[key];
      if (!path) {
        telemetryReady = false;
        return;
      }
      const length = path.getTotalLength();
      path.style.strokeDasharray = `${length}`;
      path.style.strokeDashoffset = `${length}`;
    });

    if (!telemetryReady) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        gsap.set(lapBar, { scaleX: 1, transformOrigin: "left center" });
        (Object.keys(pathRefs.current) as PathKey[]).forEach((key) => {
          const path = pathRefs.current[key];
          if (path) path.style.strokeDashoffset = "0";
        });
        gsap.set(".f1-alert-card", { opacity: 1, y: 0 });
        return;
      }

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

      gsap.fromTo(
        lapBar,
        { scaleX: 0, transformOrigin: "left center" },
        {
          scaleX: 1,
          ease: "none",
          scrollTrigger: scrollConfig,
        },
      );

      (Object.keys(pathRefs.current) as PathKey[]).forEach((key) => {
        const path = pathRefs.current[key];
        if (!path) return;
        const length = path.getTotalLength();
        gsap.fromTo(
          path,
          { strokeDashoffset: length },
          {
            strokeDashoffset: 0,
            ease: "none",
            scrollTrigger: scrollConfig,
          },
        );
      });

      gsap.fromTo(
        ".f1-alert-card",
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.12,
          ease: "power2.out",
          scrollTrigger: scrollConfig,
        },
      );

      ScrollTrigger.create({
        ...scrollConfig,
        onUpdate: (self) => {
          const blunder = root.querySelector(".f1-blunder-card");
          if (!blunder) return;
          if (self.progress > 0.7) {
            blunder.classList.add("alert-pulse");
          } else {
            blunder.classList.remove("alert-pulse");
          }
        },
      });
    }, root);

    return () => ctx.revert();
  }, [containerAnimation]);

  return (
    <div ref={panelRef} className={cn(SHOWCASE_PANEL)}>
      <F1PanelAtmosphere />
      <div
        ref={rootRef}
        className={`${PANEL_INNER} relative z-10 grid min-h-0 grid-rows-[auto_minmax(0,1fr)] gap-4 md:gap-5`}
      >
        <header className="shrink-0 space-y-2">
          <ProjectTracker index="01" title={project.title} accent="cyan" />
          <p className="max-w-md text-sm leading-relaxed text-slate-400">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-2 pt-1">
            {project.techStack.map((tag) => (
              <span
                key={tag}
                className="font-telemetry rounded-full border border-slate-700/80 bg-slate-900/50 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-slate-400"
              >
                {tag}
              </span>
            ))}
          </div>
          <ProjectActionButton
            label="Launch Dashboard"
            href="https://f1-26-analyzer.keziworks.com"
            accent="cyan"
          />
        </header>

        <div className="flex min-h-0 items-center justify-center">
          <div className="relative w-full max-h-[min(54vh,580px)] origin-center scale-[0.94] overflow-hidden rounded-2xl border border-slate-800 bg-[#0f1319] shadow-neon-cyan md:max-h-[min(58vh,620px)] md:scale-[0.97] lg:scale-100">
            <div className="pointer-events-none absolute -inset-px rounded-2xl bg-gradient-to-br from-neon-cyan/10 via-transparent to-neon-red/5 opacity-80" />

            <div className="relative flex h-full flex-col overflow-hidden p-4 md:p-5">
              <div className="mb-3 flex shrink-0 flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">
                <div className="flex items-center gap-3">
                  <span className="rounded bg-white px-2 py-0.5 font-telemetry text-xs font-bold text-black">
                    F1
                  </span>
                  <span className="font-telemetry text-xs uppercase tracking-[0.25em] text-slate-300">
                    Post-Race Analyzer
                  </span>
                </div>
                <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 font-telemetry text-[10px] uppercase tracking-wider text-emerald-300 shadow-neon-mint">
                  Connected
                </span>
              </div>

              <div className="mb-3 flex shrink-0 flex-wrap items-center gap-3">
                <div className="flex items-center gap-1.5 text-slate-500">
                  <SkipBack className="h-3.5 w-3.5" />
                  <Pause className="h-3.5 w-3.5" />
                  <Play className="h-3.5 w-3.5" />
                  <SkipForward className="h-3.5 w-3.5" />
                </div>
                <div className="min-w-[180px] flex-1">
                  <div className="mb-1 flex justify-between font-telemetry text-[10px] uppercase tracking-wider text-slate-400">
                    <span>Replay Mode</span>
                    <span>
                      Lap {data.lapCurrent}/{data.lapTotal}
                    </span>
                  </div>
                  <div className="h-1.5 overflow-hidden rounded-full bg-slate-800">
                    <div
                      ref={lapBarRef}
                      className="gpu h-full w-full origin-left rounded-full bg-gradient-to-r from-red-500 via-orange-400 to-amber-300"
                    />
                  </div>
                </div>
              </div>

              <div className="mb-3 grid shrink-0 grid-cols-2 gap-2 md:grid-cols-4">
                {[
                  { icon: Thermometer, label: "Air Temp", value: data.weather.airTemp },
                  { icon: Gauge, label: "Track Temp", value: data.weather.trackTemp },
                  { icon: Wind, label: "Wind", value: data.weather.wind },
                  { icon: CloudSun, label: "Condition", value: data.weather.condition },
                ].map(({ icon: Icon, label, value }) => (
                  <div
                    key={label}
                    className="rounded-lg border border-slate-800 bg-[#121820] p-2.5"
                  >
                    <div className="mb-1 flex items-center gap-1 font-telemetry text-[10px] uppercase tracking-wider text-slate-500">
                      <Icon className="h-3 w-3" />
                      {label}
                    </div>
                    <p className="font-telemetry text-xs text-slate-100">{value}</p>
                  </div>
                ))}
              </div>

              <div className="grid min-h-0 flex-1 gap-3 lg:grid-cols-[1.15fr_0.85fr]">
                <div className="flex min-h-0 flex-col gap-3">
                  <div className="min-h-0 flex-1 overflow-hidden rounded-lg border border-slate-800 bg-[#121820]">
                    <table className="w-full text-left font-telemetry text-[10px]">
                      <thead className="border-b border-slate-800 text-slate-500">
                        <tr>
                          <th className="p-2 font-normal uppercase tracking-wider">Pos</th>
                          <th className="p-2 font-normal uppercase tracking-wider">Driver</th>
                          <th className="p-2 font-normal uppercase tracking-wider">Gap</th>
                          <th className="p-2 font-normal uppercase tracking-wider">S1</th>
                          <th className="p-2 font-normal uppercase tracking-wider">S2</th>
                          <th className="p-2 font-normal uppercase tracking-wider">S3</th>
                        </tr>
                      </thead>
                      <tbody>
                        {data.leaderboard.map((row) => (
                          <tr key={row.driver} className="border-b border-slate-800/60">
                            <td className="p-2 text-slate-400">{row.pos}</td>
                            <td className="p-2 text-neon-cyan">{row.driver}</td>
                            <td className="p-2 text-slate-400">{row.gap}</td>
                            <td className="p-2 text-neon-cyan/90">{row.s1}</td>
                            <td className="p-2 text-neon-cyan/90">{row.s2}</td>
                            <td className="p-2 text-neon-cyan/90">{row.s3}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="shrink-0 rounded-lg border border-slate-800 bg-[#121820] p-2.5">
                    <p className="mb-2 font-telemetry text-[10px] uppercase tracking-[0.2em] text-slate-500">
                      Lap Telemetry — Speed / Inputs
                    </p>
                    <svg
                      viewBox="0 0 720 260"
                      className="h-24 w-full md:h-28"
                      preserveAspectRatio="none"
                    >
                      {[0, 1, 2, 3, 4].map((i) => (
                        <line
                          key={i}
                          x1="0"
                          y1={i * 52}
                          x2="720"
                          y2={i * 52}
                          stroke="rgb(148 163 184 / 0.12)"
                        />
                      ))}
                      <path
                        ref={(el) => {
                          pathRefs.current.speed = el;
                        }}
                        d={data.telemetryPaths.speed}
                        fill="none"
                        stroke="#22d3ee"
                        strokeWidth="2.5"
                      />
                      <path
                        ref={(el) => {
                          pathRefs.current.throttle = el;
                        }}
                        d={data.telemetryPaths.throttle}
                        fill="none"
                        stroke="#4ade80"
                        strokeWidth="2"
                        strokeDasharray="6 4"
                      />
                      <path
                        ref={(el) => {
                          pathRefs.current.brake = el;
                        }}
                        d={data.telemetryPaths.brake}
                        fill="none"
                        stroke="#f87171"
                        strokeWidth="1.5"
                        strokeDasharray="4 3"
                      />
                    </svg>
                  </div>
                </div>

                <div className="flex min-h-0 flex-col gap-2 overflow-y-auto">
                  {data.alerts.map((alert) => (
                    <div
                      key={alert.driver}
                      className="f1-alert-card shrink-0 rounded-lg border border-slate-800 bg-[#121820] p-3"
                    >
                      <p className="font-telemetry text-xs text-neon-cyan">{alert.driver}</p>
                      <p className="mt-1 text-[11px] leading-relaxed text-slate-400">
                        {alert.text}
                      </p>
                    </div>
                  ))}
                  <div
                    className={cn(
                      "f1-alert-card f1-blunder-card shrink-0 rounded-lg border border-neon-red/30 bg-neon-red/10 p-3 shadow-neon-red",
                    )}
                  >
                    <div className="mb-1 flex items-center gap-2">
                      <span className="rounded bg-neon-red/20 px-1.5 py-0.5 font-telemetry text-[10px] uppercase tracking-wider text-neon-red">
                        Alert
                      </span>
                      <span className="font-telemetry text-xs text-slate-200">
                        {data.blunderAlert.driver}
                      </span>
                    </div>
                    <p className="font-telemetry text-sm font-semibold text-neon-red">
                      {data.blunderAlert.title}
                    </p>
                    <p className="mt-1 text-[11px] leading-relaxed text-slate-400">
                      {data.blunderAlert.message}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
