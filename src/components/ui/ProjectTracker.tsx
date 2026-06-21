import { cn } from "@/lib/utils";

type ProjectTrackerAccent = "cyan" | "mint" | "amber";

const accentClasses: Record<ProjectTrackerAccent, string> = {
  cyan: "text-cyan-400",
  mint: "text-neon-mint",
  amber: "text-neon-amber",
};

interface ProjectTrackerProps {
  index: string;
  title: string;
  accent?: ProjectTrackerAccent;
  className?: string;
}

export function ProjectTracker({
  index,
  title,
  accent = "cyan",
  className,
}: ProjectTrackerProps) {
  return (
    <p
      className={cn(
        "font-telemetry text-xs uppercase tracking-[0.2em]",
        accentClasses[accent],
        className,
      )}
    >
      {index} {"//"} {title.toUpperCase()}
    </p>
  );
}
