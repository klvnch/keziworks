const MARQUEE_SEQUENCE =
  "Laravel • Vue • Nuxt • Next • React • React Native • MySQL • PostgreSQL • Tailwind CSS";

const MARQUEE_COPIES = 4;

export function TechStackMarquee() {
  const segment = `${MARQUEE_SEQUENCE} • `.repeat(MARQUEE_COPIES);

  return (
    <div
      className="tech-marquee-root relative overflow-hidden border-y border-slate-800/50 bg-background py-3"
      aria-hidden
    >
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-background to-transparent md:w-20" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-background to-transparent md:w-20" />

      <div className="tech-marquee-track flex w-max will-change-transform">
        <p className="font-telemetry shrink-0 whitespace-nowrap px-4 text-[10px] uppercase tracking-[0.35em] text-zinc-400/50 md:px-6 md:text-[11px]">
          {segment}
        </p>
        <p className="font-telemetry shrink-0 whitespace-nowrap px-4 text-[10px] uppercase tracking-[0.35em] text-zinc-400/50 md:px-6 md:text-[11px]">
          {segment}
        </p>
      </div>
    </div>
  );
}
