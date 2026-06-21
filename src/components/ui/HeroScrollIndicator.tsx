export function HeroScrollIndicator() {
  return (
    <div className="flex flex-col items-center gap-3">
      <span className="font-telemetry text-[10px] uppercase tracking-[0.28em] text-cyan-400/75">
        SYS_READY // SCROLL
      </span>
      <div className="relative flex h-9 w-5 flex-col items-center justify-start gap-1.5">
        <svg
          viewBox="0 0 16 20"
          className="h-4 w-4 text-cyan-400/80 hero-scroll-chevron-a"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          aria-hidden
        >
          <path d="M3 7 L8 12 L13 7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <svg
          viewBox="0 0 16 20"
          className="h-4 w-4 text-cyan-400/45 hero-scroll-chevron-b"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          aria-hidden
        >
          <path d="M3 7 L8 12 L13 7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </div>
  );
}
