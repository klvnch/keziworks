import Link from "next/link";
import { cn } from "@/lib/utils";

type ProjectActionAccent = "cyan" | "mint";

interface ProjectActionButtonProps {
  label: string;
  href?: string;
  disabled?: boolean;
  accent?: ProjectActionAccent;
  className?: string;
}

const accentStyles: Record<ProjectActionAccent, string> = {
  cyan: cn(
    "border-cyan-500/35 text-cyan-300/90",
    "hover:border-cyan-400/55 hover:bg-cyan-500/10 hover:shadow-glow-cyan",
  ),
  mint: cn(
    "border-neon-mint/35 text-neon-mint/90",
    "hover:border-neon-mint/55 hover:bg-neon-mint/10 hover:shadow-glow-mint",
  ),
};

const baseStyles = cn(
  "font-telemetry mt-4 inline-flex w-fit items-center justify-center rounded-full border px-4 py-2",
  "text-[10px] uppercase tracking-[0.2em] transition-all duration-300",
);

export function ProjectActionButton({
  label,
  href,
  disabled = false,
  accent = "cyan",
  className,
}: ProjectActionButtonProps) {
  if (disabled) {
    return (
      <span
        aria-disabled="true"
        className={cn(
          baseStyles,
          accentStyles[accent],
          "pointer-events-none opacity-50",
          className,
        )}
      >
        {label}
      </span>
    );
  }

  const isExternal = href?.startsWith("http") ?? false;

  if (isExternal) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(baseStyles, accentStyles[accent], className)}
      >
        {label}
      </a>
    );
  }

  return (
    <Link href={href ?? "/"} className={cn(baseStyles, accentStyles[accent], className)}>
      {label}
    </Link>
  );
}
