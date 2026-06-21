"use client";

import { useRef } from "react";
import { CreditCard, Home, Menu, Plus } from "lucide-react";
import { ALOSplitPanelAtmosphere } from "@/components/ui/ALOSplitPanelAtmosphere";
import { PhoneFrame } from "@/components/ui/PhoneFrame";
import { ProjectTracker } from "@/components/ui/ProjectTracker";
import type { ALOSplitMockData, Project } from "@/data/projectsData";
import { formatRupiah } from "@/data/projectsData";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import { PANEL_INNER, SHOWCASE_PANEL } from "@/lib/panelStyles";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { cn } from "@/lib/utils";
import type { PanelAnimationProps } from "@/types/animation";

interface ALOSplitProps extends PanelAnimationProps {
  project: Project;
}

export function ALOSplit({
  project,
  panelRef,
  containerAnimation,
}: ALOSplitProps) {
  const data = project.mockData as ALOSplitMockData;
  const rootRef = useRef<HTMLDivElement>(null);
  const phoneRef = useRef<HTMLDivElement>(null);
  const debtLineRef = useRef<SVGPathElement>(null);
  const payBtnRef = useRef<HTMLButtonElement>(null);
  const debtValueRef = useRef<HTMLParagraphElement>(null);
  const debitValueRef = useRef<HTMLParagraphElement>(null);
  const creditValueRef = useRef<HTMLParagraphElement>(null);
  const unpaidBadgeRef = useRef<HTMLSpanElement>(null);
  const paidBadgeRef = useRef<HTMLSpanElement>(null);
  const notificationRef = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    const panel = panelRef.current;
    const root = rootRef.current;
    if (!panel || !root) return;

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

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const ctx = gsap.context(() => {
      const debtCounter = { value: data.debtAmount };
      const debitCounter = { value: data.debtAmount };
      const creditCounter = { value: 0 };

      if (prefersReducedMotion) {
        gsap.set(phoneRef.current, { opacity: 1, y: 0 });
        if (debtValueRef.current)
          debtValueRef.current.textContent = formatRupiah(0);
        if (debitValueRef.current)
          debitValueRef.current.textContent = formatRupiah(0);
        if (creditValueRef.current)
          creditValueRef.current.textContent = formatRupiah(data.debtAmount);
        unpaidBadgeRef.current?.classList.add("hidden");
        paidBadgeRef.current?.classList.remove("hidden");
        gsap.set(notificationRef.current, { y: 0, opacity: 1 });
        return;
      }

      const tl = gsap.timeline({
        scrollTrigger: scrollConfig,
      });

      tl.fromTo(
        phoneRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.2, ease: "power2.out" },
        0,
      );

      if (debtLineRef.current) {
        const length = debtLineRef.current.getTotalLength();
        debtLineRef.current.style.strokeDasharray = `${length}`;
        debtLineRef.current.style.strokeDashoffset = `${length}`;
        tl.fromTo(
          debtLineRef.current,
          { strokeDashoffset: length },
          { strokeDashoffset: 0, duration: 0.3, ease: "none" },
          0.1,
        );
        tl.to(
          debtLineRef.current,
          { scaleX: 0.3, transformOrigin: "center center", duration: 0.2 },
          0.35,
        );
      }

      tl.to(
        payBtnRef.current,
        { scale: 0.95, duration: 0.08, yoyo: true, repeat: 1 },
        0.5,
      );

      tl.to(
        debtCounter,
        {
          value: 0,
          duration: 0.25,
          ease: "power2.inOut",
          snap: { value: 1 },
          onUpdate: () => {
            if (debtValueRef.current) {
              debtValueRef.current.textContent = formatRupiah(
                Math.round(debtCounter.value),
              );
            }
          },
        },
        0.55,
      );

      tl.to(
        debitCounter,
        {
          value: 0,
          duration: 0.25,
          ease: "power2.inOut",
          snap: { value: 1 },
          onUpdate: () => {
            if (debitValueRef.current) {
              debitValueRef.current.textContent = formatRupiah(
                Math.round(debitCounter.value),
              );
            }
          },
        },
        0.55,
      );

      tl.to(
        creditCounter,
        {
          value: data.debtAmount,
          duration: 0.25,
          ease: "power2.inOut",
          snap: { value: 1 },
          onUpdate: () => {
            if (creditValueRef.current) {
              creditValueRef.current.textContent = formatRupiah(
                Math.round(creditCounter.value),
              );
            }
          },
        },
        0.55,
      );

      tl.to(
        unpaidBadgeRef.current,
        { opacity: 0, scale: 0.8, duration: 0.1 },
        0.62,
      );
      tl.fromTo(
        paidBadgeRef.current,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.1 },
        0.65,
      );

      tl.fromTo(
        notificationRef.current,
        { y: "-120%", opacity: 0 },
        { y: "0%", opacity: 1, duration: 0.15, ease: "back.out(1.4)" },
        0.78,
      );

      gsap.to(".alosplit-network-node", {
        opacity: 0.38,
        duration: 4,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        stagger: 0.35,
      });
    }, panel);

    return () => ctx.revert();
  }, [panelRef, containerAnimation, data.debtAmount]);

  return (
    <div ref={panelRef} className={cn(SHOWCASE_PANEL)}>
      <ALOSplitPanelAtmosphere />
      <div
        ref={rootRef}
        className={`${PANEL_INNER} relative z-10 flex min-h-0 flex-col items-center gap-8 lg:flex-row lg:items-center lg:gap-10`}
      >
        <div className="flex w-full max-w-xl shrink-0 flex-col justify-center lg:min-w-0 lg:flex-1">
          <ProjectTracker
            index="02"
            title={project.title}
            accent="mint"
          />
          <p className="mt-2 max-w-xl text-sm leading-snug text-slate-400 lg:leading-relaxed">
            {project.description}
          </p>

          <div className="mt-3 flex flex-wrap gap-2">
            {project.techStack.map((tag) => (
              <span
                key={tag}
                className="font-telemetry rounded-full border border-slate-700/80 bg-slate-900/50 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-slate-400"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div
          ref={phoneRef}
          className="flex w-full shrink-0 items-center justify-center lg:min-w-0 lg:flex-1 lg:justify-end"
        >
          <div className="relative w-full max-w-[300px] sm:max-w-[320px]">
            <svg
              className="pointer-events-none absolute -left-10 top-1/3 z-10 hidden h-24 w-20 xl:block"
              viewBox="0 0 64 96"
            >
              <path
                ref={debtLineRef}
                d="M 8 48 C 20 48, 28 24, 40 24 S 52 72, 56 72"
                fill="none"
                stroke="#6ee7b7"
                strokeWidth="2"
                className="gpu origin-center"
              />
            </svg>

            <div className="relative shadow-neon-mint">
              <PhoneFrame>
                <div className="relative max-h-[min(68vh,580px)] min-h-[480px] overflow-hidden bg-[#0b0e14] p-4 pb-20 md:max-xl:min-h-[440px] xl:max-h-[min(72vh,620px)] xl:min-h-[520px]">
                  <div
                    ref={notificationRef}
                    className="absolute left-3 right-3 top-3 z-20 rounded-2xl border border-white/10 bg-[#1c212b]/95 p-3 shadow-lg backdrop-blur-md"
                  >
                    <p className="text-xs font-semibold text-white">
                      {data.pushNotification.title}
                    </p>
                    <p className="mt-0.5 text-[11px] text-slate-400">
                      {data.pushNotification.body}
                    </p>
                  </div>

                  <div className="mb-5 flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-white">
                        Hangout Sessions
                      </h3>
                      <p className="text-xs text-slate-500">
                        Sessions you host or join
                      </p>
                    </div>
                    <Menu className="h-5 w-5 text-slate-400" />
                  </div>

                  <div className="rounded-2xl border border-slate-800 bg-[#151922] p-4">
                    <div className="mb-3 flex items-start justify-between">
                      <div>
                        <p className="font-medium text-white">{data.sessionName}</p>
                        <div className="mt-2 flex gap-1.5">
                          {data.participants.map((p) => (
                            <span
                              key={p.initials}
                              className="flex h-7 w-7 items-center justify-center rounded-full text-[10px] font-semibold text-white"
                              style={{ backgroundColor: p.color }}
                            >
                              {p.initials}
                            </span>
                          ))}
                        </div>
                      </div>
                      <span className="text-[11px] text-slate-500">{data.date}</span>
                    </div>

                    <div className="mb-4 rounded-xl border border-slate-800 bg-[#0f1218] p-3">
                      <p className="text-[11px] text-slate-500">Total Session</p>
                      <p className="font-telemetry text-xl font-semibold text-amber-300">
                        {formatRupiah(data.totalSession)}
                      </p>
                    </div>

                    <div className="mb-4 flex flex-wrap gap-2">
                      <span className="rounded-full border border-slate-700 bg-slate-900/60 px-2.5 py-1 text-[10px] text-slate-400">
                        Pending Payment
                      </span>
                      <span
                        ref={unpaidBadgeRef}
                        className="rounded-full bg-red-500/15 px-2.5 py-1 text-[10px] text-red-300"
                      >
                        Unpaid
                      </span>
                      <span
                        ref={paidBadgeRef}
                        className="hidden rounded-full bg-neon-mint/15 px-2.5 py-1 text-[10px] text-neon-mint"
                      >
                        Paid
                      </span>
                    </div>

                    <div className="mb-4 grid grid-cols-3 gap-2 text-center">
                      <div>
                        <p className="text-[10px] text-slate-500">Simplified Debt</p>
                        <p
                          ref={debtValueRef}
                          className="font-telemetry text-xs text-white"
                        >
                          {formatRupiah(data.debtAmount)}
                        </p>
                      </div>
                      <div>
                        <p className="text-[10px] text-slate-500">Debits</p>
                        <p
                          ref={debitValueRef}
                          className="font-telemetry text-xs text-debit"
                        >
                          {formatRupiah(data.debtAmount)}
                        </p>
                      </div>
                      <div>
                        <p className="text-[10px] text-slate-500">Credits</p>
                        <p
                          ref={creditValueRef}
                          className="font-telemetry text-xs text-credit"
                        >
                          {formatRupiah(0)}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <button className="w-full rounded-xl border border-slate-700 bg-slate-900/50 py-2.5 text-sm text-slate-300">
                        View Details
                      </button>
                      <button
                        ref={payBtnRef}
                        className="w-full rounded-xl bg-neon-mint py-2.5 text-sm font-semibold text-black shadow-neon-mint"
                      >
                        Pay
                      </button>
                    </div>
                  </div>

                  <button className="absolute bottom-20 right-4 flex h-12 w-12 items-center justify-center rounded-full bg-neon-mint text-black shadow-neon-mint">
                    <Plus className="h-6 w-6" />
                  </button>

                  <div className="absolute bottom-0 left-0 right-0 flex border-t border-slate-800 bg-[#0b0e14]/95 py-3">
                    <div className="flex flex-1 flex-col items-center gap-1 text-neon-mint">
                      <Home className="h-4 w-4" />
                      <span className="text-[10px]">Home</span>
                    </div>
                    <div className="flex flex-1 flex-col items-center gap-1 text-slate-500">
                      <CreditCard className="h-4 w-4" />
                      <span className="text-[10px]">Settlement</span>
                    </div>
                  </div>
                </div>
              </PhoneFrame>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
