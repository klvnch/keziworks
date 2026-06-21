import { cn } from "@/lib/utils";

interface CyberGridProps {
  className?: string;
  children?: React.ReactNode;
}

export function CyberGrid({ className, children }: CyberGridProps) {
  return (
    <div className={cn("relative overflow-hidden", className)}>
      <div className="pointer-events-none absolute inset-0 cyber-grid opacity-70" />
      <div className="noise-overlay pointer-events-none absolute inset-0" />
      <div className="pointer-events-none absolute inset-0 vignette-radial" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-surface/10 to-surface/80" />
      {children}
    </div>
  );
}
