import { cn } from "@/lib/utils";

interface GlowCardProps {
  className?: string;
  glow?: "mint" | "cyan" | "red" | "none";
  children: React.ReactNode;
}

const glowStyles = {
  mint: "border-glow-mint border border-neon-mint/20",
  cyan: "border-glow-cyan border border-neon-cyan/20",
  red: "border border-neon-red/30 shadow-glow-red",
  none: "border border-white/10",
};

export function GlowCard({
  className,
  glow = "none",
  children,
}: GlowCardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl bg-card/80 backdrop-blur-sm",
        glowStyles[glow],
        className,
      )}
    >
      {children}
    </div>
  );
}
