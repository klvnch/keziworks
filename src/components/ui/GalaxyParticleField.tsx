"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

export interface GalaxyParticleFieldProps {
  containerRef: React.RefObject<HTMLElement | null>;
  /** Active particles seeded inside the container bounds */
  particleCount?: number;
  /** Subtle cursor parallax + drift attraction */
  enableMouseInteraction?: boolean;
  className?: string;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  opacity: number;
  cyan: boolean;
}

const ATTRACTION_RADIUS = 140;

/** Shared deep-space particle tuning — Hero, showcase, and footer */
export function createGalaxyParticle(width: number, height: number): Particle {
  return {
    x: Math.random() * width,
    y: Math.random() * height,
    vx: (Math.random() - 0.3) * 0.12,
    vy: -(Math.random() * 0.22 + 0.06),
    radius: Math.random() * 0.7 + 0.5,
    opacity: Math.random() * 0.2 + 0.1,
    cyan: Math.random() > 0.62,
  };
}

export function GalaxyParticleField({
  containerRef,
  particleCount = 125,
  enableMouseInteraction = true,
  className,
}: GalaxyParticleFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: 0, y: 0, active: false });
  const parallaxRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef(0);
  const particleCountRef = useRef(particleCount);
  const enableMouseInteractionRef = useRef(enableMouseInteraction);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let width = 0;
    let height = 0;
    let running = true;

    const resize = () => {
      const rect = container.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const seedParticles = () => {
      const count = particleCountRef.current;
      particlesRef.current = Array.from({ length: count }, () =>
        createGalaxyParticle(width, height),
      );
    };

    const onMouseMove = (event: MouseEvent) => {
      if (!enableMouseInteractionRef.current) return;
      const rect = container.getBoundingClientRect();
      mouseRef.current = {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
        active: true,
      };
    };

    const onMouseLeave = () => {
      mouseRef.current.active = false;
    };

    const draw = () => {
      if (!running) return;

      ctx.clearRect(0, 0, width, height);

      const mouse = mouseRef.current;
      const mouseEnabled = enableMouseInteractionRef.current;
      const targetParallaxX =
        mouseEnabled && mouse.active ? (mouse.x - width / 2) * 0.014 : 0;
      const targetParallaxY =
        mouseEnabled && mouse.active ? (mouse.y - height / 2) * 0.014 : 0;
      parallaxRef.current.x += (targetParallaxX - parallaxRef.current.x) * 0.045;
      parallaxRef.current.y += (targetParallaxY - parallaxRef.current.y) * 0.045;

      const offsetX = parallaxRef.current.x;
      const offsetY = parallaxRef.current.y;

      for (const particle of particlesRef.current) {
        if (!prefersReducedMotion) {
          particle.x += particle.vx;
          particle.y += particle.vy;

          if (mouseEnabled && mouse.active) {
            const dx = mouse.x - particle.x;
            const dy = mouse.y - particle.y;
            const distance = Math.hypot(dx, dy);
            if (distance > 0 && distance < ATTRACTION_RADIUS) {
              const pull =
                ((ATTRACTION_RADIUS - distance) / ATTRACTION_RADIUS) * 0.016;
              particle.x += dx * pull;
              particle.y += dy * pull;
            }
          }

          if (particle.y < -8) {
            particle.y = height + 8;
            particle.x = Math.random() * width;
          }
          if (particle.x < -8) particle.x = width + 8;
          if (particle.x > width + 8) particle.x = -8;
        }

        ctx.beginPath();
        ctx.arc(
          particle.x + offsetX,
          particle.y + offsetY,
          particle.radius,
          0,
          Math.PI * 2,
        );
        ctx.fillStyle = particle.cyan
          ? `rgba(165, 243, 252, ${particle.opacity})`
          : `rgba(255, 255, 255, ${particle.opacity * 0.85})`;
        ctx.fill();
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    resize();
    seedParticles();
    rafRef.current = requestAnimationFrame(draw);

    const resizeObserver = new ResizeObserver(() => {
      resize();
      seedParticles();
    });
    resizeObserver.observe(container);

    container.addEventListener("mousemove", onMouseMove);
    container.addEventListener("mouseleave", onMouseLeave);

    return () => {
      running = false;
      cancelAnimationFrame(rafRef.current);
      resizeObserver.disconnect();
      container.removeEventListener("mousemove", onMouseMove);
      container.removeEventListener("mouseleave", onMouseLeave);
    };
    // Mount-once rAF loop — props captured via refs; containerRef object is stable from parent.
    // eslint-disable-next-line react-hooks/exhaustive-deps -- intentional empty deps
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={cn("pointer-events-none absolute inset-0 z-[1]", className)}
      aria-hidden
    />
  );
}
