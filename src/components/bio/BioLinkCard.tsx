"use client";

import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface BioLinkCardProps {
  title: string;
  description: string;
  href?: string;
  index: number;
  badge?: string;
  restricted?: boolean;
  restrictedMessage?: string;
}

const cardClassName = cn(
  "group relative block w-full overflow-hidden rounded-2xl border border-white/10 text-left",
  "bg-white/5 p-5 backdrop-blur-md",
  "transition-shadow duration-300",
  "hover:shadow-[0_0_40px_rgba(34,211,238,0.15)]",
  "active:shadow-[0_0_48px_rgba(34,211,238,0.22)]",
);

const motionProps = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  whileTap: { scale: 1.02 },
  whileHover: { scale: 1.01 },
} as const;

function CardContent({
  title,
  description,
  badge,
}: Pick<BioLinkCardProps, "title" | "description" | "badge">) {
  return (
    <>
      <div className="bio-card-shimmer pointer-events-none absolute inset-0 overflow-hidden rounded-2xl">
        <div className="bio-card-shimmer-track absolute inset-y-0 w-1/2 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>

      <div className="relative z-10 space-y-2">
        <div className="flex flex-wrap items-center gap-2">
          <p className="text-base font-semibold text-white">{title}</p>
          {badge ? (
            <span className="rounded-full border border-amber-500/30 bg-amber-500/10 px-2 py-0.5 font-telemetry text-[10px] uppercase tracking-[0.12em] text-amber-400/90">
              {badge}
            </span>
          ) : null}
        </div>
        <p className="text-sm leading-relaxed text-zinc-400/80">{description}</p>
      </div>
    </>
  );
}

export function BioLinkCard({
  title,
  description,
  href,
  index,
  badge,
  restricted = false,
  restrictedMessage = "App download is currently limited to selective beta testers.",
}: BioLinkCardProps) {
  const [toastVisible, setToastVisible] = useState(false);

  const showToast = useCallback(() => {
    setToastVisible(true);
  }, []);

  useEffect(() => {
    if (!toastVisible) return;
    const timer = window.setTimeout(() => setToastVisible(false), 3200);
    return () => window.clearTimeout(timer);
  }, [toastVisible]);

  const transition = {
    duration: 0.5,
    delay: 0.55 + index * 0.12,
    ease: "easeOut" as const,
  };

  if (restricted) {
    return (
      <div className="relative">
        <motion.button
          type="button"
          onClick={showToast}
          aria-label={`${title} — selective access`}
          {...motionProps}
          transition={transition}
          className={cn(cardClassName, "cursor-pointer")}
        >
          <CardContent title={title} description={description} badge={badge} />
        </motion.button>

        <motion.p
          role="status"
          aria-live="polite"
          initial={{ opacity: 0, y: 8 }}
          animate={{
            opacity: toastVisible ? 1 : 0,
            y: toastVisible ? 0 : 8,
            pointerEvents: toastVisible ? "auto" : "none",
          }}
          transition={{ duration: 0.25 }}
          className={cn(
            "absolute -bottom-2 left-1/2 z-20 w-[calc(100%-1rem)] -translate-x-1/2 translate-y-full",
            "rounded-lg border border-amber-500/25 bg-zinc-900/95 px-3 py-2.5",
            "text-center text-[11px] leading-snug text-amber-200/90 shadow-lg shadow-black/40",
          )}
        >
          {restrictedMessage}
        </motion.p>
      </div>
    );
  }

  const isExternal = href?.startsWith("http") ?? false;

  return (
    <motion.a
      href={href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      {...motionProps}
      transition={transition}
      className={cardClassName}
    >
      <CardContent title={title} description={description} badge={badge} />
    </motion.a>
  );
}
