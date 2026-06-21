"use client";

import { Mail } from "lucide-react";
import { GalaxyParticleField } from "@/components/ui/GalaxyParticleField";
import { Github, Instagram } from "@/components/ui/SocialIcons";

const FOOTER_PARTICLE_COUNT = 55;

const SOCIAL_LINKS = [
  {
    href: "mailto:kelvinchen270@gmail.com",
    label: "Email",
    icon: Mail,
  },
  {
    href: "https://www.instagram.com/kl.vnn_/",
    label: "Instagram",
    icon: Instagram,
  },
  {
    href: "https://github.com/klvnch",
    label: "GitHub",
    icon: Github,
  },
] as const;

interface SiteFooterProps {
  footerRef: React.RefObject<HTMLElement | null>;
}

export function SiteFooter({ footerRef }: SiteFooterProps) {
  return (
    <footer
      ref={footerRef}
      className="relative overflow-hidden border-t border-slate-800/80 bg-background px-6 py-10 md:px-12 lg:px-24"
    >
      <GalaxyParticleField
        containerRef={footerRef}
        particleCount={FOOTER_PARTICLE_COUNT}
        enableMouseInteraction={false}
      />

      <div className="relative z-10 flex w-full items-center justify-between">
        <div>
          <p className="text-lg font-semibold text-white">keziworks</p>
          <p className="text-sm text-slate-500">
            Full-stack engineer · keziworks.com
          </p>
        </div>

        <div className="flex items-center gap-1.5">
          {SOCIAL_LINKS.map((item) => {
            const Icon = item.icon;

            return (
              <a
                key={item.href}
                href={item.href}
                target={item.href.startsWith("mailto:") ? undefined : "_blank"}
                rel={
                  item.href.startsWith("mailto:")
                    ? undefined
                    : "noopener noreferrer"
                }
                aria-label={item.label}
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-800/80 bg-slate-900/30 text-slate-500/70 transition-colors hover:border-slate-700 hover:text-neon-mint"
              >
                <Icon className="h-4 w-4" strokeWidth={1.75} />
              </a>
            );
          })}
        </div>
      </div>
    </footer>
  );
}
