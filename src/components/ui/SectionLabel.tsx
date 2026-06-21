import { cn } from "@/lib/utils";

interface SectionLabelProps {
  kicker: string;
  title?: string;
  className?: string;
}

export function SectionLabel({ kicker, title, className }: SectionLabelProps) {
  return (
    <div className={cn("space-y-2", className)}>
      <p className="font-mono text-[11px] uppercase tracking-[0.35em] text-neon-mint/80">
        {kicker}
      </p>
      {title ? (
        <h2 className="text-2xl font-semibold tracking-tight text-white md:text-4xl">
          {title}
        </h2>
      ) : null}
    </div>
  );
}
