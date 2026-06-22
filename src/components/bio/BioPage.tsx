"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { BioLinkCard } from "@/components/bio/BioLinkCard";
import { BioSocialLinks } from "@/components/bio/BioSocialLinks";
import { DecryptedText } from "@/components/bio/DecryptedText";
import { GalaxyParticleField } from "@/components/ui/GalaxyParticleField";

const BIO_LINKS = [
  {
    id: "f1",
    title: "🏎️ F1 Post-Race Analyzer",
    description:
      "Interactive telemetry dashboard built with Vue and Python (FastF1). View live telemetry stream.",
    href: "https://f1-26-analyzer.keziworks.com",
  },
  {
    id: "alosplit",
    title: "📱 ALOSplit",
    description:
      "Full-stack mobile expense splitter and receipt scanner built with React Native (Expo) and FastAPI.",
    badge: "Selective Access",
    restricted: true,
  },
  {
    id: "portfolio",
    title: "🌐 Official Portfolio Website",
    description:
      "Explore my full tech stack, structural case studies, and production architecture breakdown.",
    href: "/",
  },
] as const;

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

export function BioPage() {
  const sectionRef = useRef<HTMLElement>(null);
  const [subtitleVisible, setSubtitleVisible] = useState(false);

  useEffect(() => {
    document.documentElement.classList.remove("splash-scroll-lock");
    document.documentElement.style.overflow = "";
    document.body.style.overflow = "";
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[100dvh] overflow-hidden bg-background"
    >
      <GalaxyParticleField
        containerRef={sectionRef}
        particleCount={90}
        enableMouseInteraction={false}
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 mx-auto flex min-h-[100dvh] max-w-md flex-col px-6 py-16"
      >
        <header className="mb-10 space-y-3">
          <DecryptedText
            text="Kelvin (Kesi)"
            duration={1200}
            onComplete={() => setSubtitleVisible(true)}
            className="font-telemetry text-2xl font-semibold tracking-tight text-white sm:text-3xl"
          />

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: subtitleVisible ? 0.65 : 0 }}
            transition={{ duration: 0.6, delay: subtitleVisible ? 0.15 : 0 }}
            className="text-sm font-light text-zinc-300"
          >
            Full-Stack Developer | Web & Mobile Applications
          </motion.p>
        </header>

        <div className="flex flex-col gap-6">
          {BIO_LINKS.map((link, index) => (
            <BioLinkCard
              key={link.id}
              title={link.title}
              description={link.description}
              href={"href" in link ? link.href : undefined}
              badge={"badge" in link ? link.badge : undefined}
              restricted={"restricted" in link ? link.restricted : false}
              index={index}
            />
          ))}
        </div>

        <BioSocialLinks />
      </motion.div>
    </section>
  );
}
