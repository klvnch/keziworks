"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/utils";

const BOOT_MS = 2500;
const PARTICLE_COUNT = 250;
const TEAL_STAR = "rgba(45, 212, 191, 0.4)";
const WHITE_STAR = "rgba(244, 244, 245, 0.5)";

interface StarParticle {
  x: number;
  y: number;
  angle: number;
  speed: number;
  size: number;
  color: string;
}

interface SplashScreenProps {
  isFading: boolean;
}

function createStarParticle(cx: number, cy: number): StarParticle {
  const angle = Math.random() * Math.PI * 2;
  const spawnRadius = Math.random() * 12;

  return {
    x: cx + Math.cos(angle) * spawnRadius,
    y: cy + Math.sin(angle) * spawnRadius,
    angle,
    speed: Math.random() * 1.4 + 0.5,
    size: Math.random() * 2.0 + 0.5,
    color: Math.random() > 0.42 ? TEAL_STAR : WHITE_STAR,
  };
}

function subscribeNoop() {
  return () => {};
}

export default function SplashScreen({ isFading }: SplashScreenProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<StarParticle[]>([]);
  const rafRef = useRef(0);
  const isFadingRef = useRef(isFading);

  const canPortal = useSyncExternalStore(
    subscribeNoop,
    () => true,
    () => false,
  );

  const [headline, setHeadline] = useState("SYS_INITIALIZING");

  useEffect(() => {
    isFadingRef.current = isFading;
  }, [isFading]);

  useEffect(() => {
    const readyTimer = window.setTimeout(() => {
      setHeadline("SYS_READY");
    }, BOOT_MS);

    return () => window.clearTimeout(readyTimer);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReducedMotion) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let centerX = 0;
    let centerY = 0;
    let running = true;

    const seedParticles = () => {
      centerX = width / 2;
      centerY = height / 2;
      particlesRef.current = Array.from({ length: PARTICLE_COUNT }, () =>
        createStarParticle(centerX, centerY),
      );
    };

    const respawnStar = (particle: StarParticle) => {
      const fresh = createStarParticle(centerX, centerY);
      particle.x = fresh.x;
      particle.y = fresh.y;
      particle.angle = fresh.angle;
      particle.speed = fresh.speed;
      particle.size = fresh.size;
      particle.color = fresh.color;
    };

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      centerX = width / 2;
      centerY = height / 2;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      if (particlesRef.current.length === 0) {
        seedParticles();
      }
    };

    const draw = () => {
      if (!running) return;

      centerX = width / 2;
      centerY = height / 2;

      ctx.fillStyle = "rgba(0, 0, 0, 0.22)";
      ctx.fillRect(0, 0, width, height);

      const warp = isFadingRef.current;
      const speedMult = warp ? 15 : 1;
      const maxDist = Math.hypot(width, height) * 0.62;

      for (const particle of particlesRef.current) {
        particle.x += Math.cos(particle.angle) * particle.speed * speedMult;
        particle.y += Math.sin(particle.angle) * particle.speed * speedMult;

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.shadowBlur = 8;
        ctx.shadowColor = particle.color;
        ctx.fill();
        ctx.shadowBlur = 0;

        if (warp) {
          const tail = particle.speed * speedMult * 2.2;
          ctx.beginPath();
          ctx.moveTo(
            particle.x - Math.cos(particle.angle) * tail,
            particle.y - Math.sin(particle.angle) * tail,
          );
          ctx.lineTo(particle.x, particle.y);
          ctx.strokeStyle = particle.color;
          ctx.lineWidth = particle.size * 0.45;
          ctx.lineCap = "round";
          ctx.stroke();
        }

        const distFromCenter = Math.hypot(
          particle.x - centerX,
          particle.y - centerY,
        );

        if (distFromCenter > maxDist) {
          respawnStar(particle);
        }
      }

      const coreGlow = ctx.createRadialGradient(
        centerX,
        centerY,
        0,
        centerX,
        centerY,
        Math.min(width, height) * 0.18,
      );
      coreGlow.addColorStop(0, "rgba(45, 212, 191, 0.08)");
      coreGlow.addColorStop(1, "rgba(45, 212, 191, 0)");
      ctx.fillStyle = coreGlow;
      ctx.fillRect(0, 0, width, height);

      rafRef.current = requestAnimationFrame(draw);
    };

    resize();
    seedParticles();
    rafRef.current = requestAnimationFrame(draw);

    window.addEventListener("resize", resize);

    return () => {
      running = false;
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
      particlesRef.current = [];
    };
  }, [canPortal]);

  const splash = (
    <div
      className={cn(
        "fixed inset-0 top-0 left-0 z-[99999] flex h-screen min-h-screen w-screen origin-center flex-col items-center justify-center overflow-hidden bg-black transition-all duration-1000 ease-in-out will-change-transform",
        isFading
          ? "pointer-events-none scale-[1.1] opacity-0 blur-[4px]"
          : "scale-100 opacity-100 blur-0",
      )}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 99999,
      }}
      aria-hidden={isFading}
      aria-live="polite"
    >
      <canvas
        id="splash-canvas"
        ref={canvasRef}
        className="pointer-events-none absolute inset-0 block h-full w-full bg-black"
        style={{ width: "100%", height: "100%" }}
        aria-hidden
      />

      <div
        className={cn(
          "relative z-50 flex max-w-[92vw] flex-col items-center gap-2 px-4 text-center select-none font-mono sm:max-w-md",
          isFading
            ? "-translate-y-8 opacity-0 transition-all duration-700 ease-in"
            : "translate-y-0 opacity-100 transition-all duration-300 ease-out",
        )}
      >
        <span className="text-[11px] font-bold tracking-[0.25em] text-zinc-300 sm:text-xs">
          {headline}
        </span>
        <span className="text-[9px] tracking-[0.2em] text-zinc-500 sm:text-[10px]">
          COGNITIVE_GATE_LINK_ESTABLISHED
        </span>
      </div>
    </div>
  );

  if (!canPortal) {
    return splash;
  }

  return createPortal(splash, document.body);
}
