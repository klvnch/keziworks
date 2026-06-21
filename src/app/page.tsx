"use client";

import { useEffect, useState } from "react";
import SplashScreen from "@/components/SplashScreen";
import { HeroSection } from "@/components/sections/HeroSection";
import { ProjectShowcase } from "@/components/sections/ProjectShowcase";
import { TechStackMarquee } from "@/components/ui/TechStackMarquee";
import { projects } from "@/data/projectsData";

const FADE_MS = 1200;
const FADE_START_MS = 2800;
const SPLASH_TOTAL_MS = FADE_START_MS + FADE_MS;

export default function Home() {
  const [showSplash, setShowSplash] = useState(true);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    const fadeTimeout = window.setTimeout(() => {
      setIsFading(true);
    }, FADE_START_MS);

    const removeTimeout = window.setTimeout(() => {
      setShowSplash(false);
      document.documentElement.classList.remove("splash-scroll-lock");
    }, SPLASH_TOTAL_MS);

    return () => {
      window.clearTimeout(fadeTimeout);
      window.clearTimeout(removeTimeout);
    };
  }, []);

  return (
    <>
      {showSplash && <SplashScreen isFading={isFading} />}

      <main
        className="min-h-screen w-full"
        style={showSplash ? { pointerEvents: "none" } : undefined}
      >
        <HeroSection />
        <TechStackMarquee />
        <ProjectShowcase projects={projects} />
      </main>
    </>
  );
}
