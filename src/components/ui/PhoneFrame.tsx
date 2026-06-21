import { cn } from "@/lib/utils";

interface PhoneFrameProps {
  className?: string;
  children: React.ReactNode;
}

export function PhoneFrame({ className, children }: PhoneFrameProps) {
  return (
    <div
      className={cn(
        "relative mx-auto w-[min(100%,320px)] rounded-[2.5rem] border border-slate-700/80 bg-gradient-to-b from-[#1a1f28] to-[#0f1218] p-3 shadow-[0_24px_80px_rgba(0,0,0,0.55)]",
        className,
      )}
    >
      <div className="absolute left-1/2 top-3 h-5 w-24 -translate-x-1/2 rounded-full bg-black/90 ring-1 ring-slate-700" />
      <div className="relative mt-6 overflow-hidden rounded-[2rem] ring-1 ring-slate-800">
        {children}
      </div>
    </div>
  );
}
