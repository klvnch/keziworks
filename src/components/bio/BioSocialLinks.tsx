"use client";

import { Mail } from "lucide-react";
import { motion } from "framer-motion";
import { Github, Instagram } from "@/components/ui/SocialIcons";

const SOCIAL_LINKS = [
  {
    href: "https://github.com/klvnch",
    label: "GitHub",
    icon: Github,
  },
  {
    href: "https://www.instagram.com/kl.vnn_/",
    label: "Instagram",
    icon: Instagram,
  },
  {
    href: "mailto:kelvinchen270@gmail.com",
    label: "Email",
    icon: Mail,
  },
] as const;

export function BioSocialLinks() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.95, ease: "easeOut" }}
      className="mt-auto flex items-center justify-center gap-8 pt-12"
    >
      {SOCIAL_LINKS.map((item) => {
        const Icon = item.icon;

        return (
          <motion.a
            key={item.href}
            href={item.href}
            target={item.href.startsWith("mailto:") ? undefined : "_blank"}
            rel={
              item.href.startsWith("mailto:")
                ? undefined
                : "noopener noreferrer"
            }
            aria-label={item.label}
            whileTap={{ scale: 0.92, opacity: 1 }}
            className="text-zinc-500/60 transition-colors duration-300 hover:text-teal-400/90 active:text-teal-400"
          >
            <Icon className="h-5 w-5" strokeWidth={1.75} />
          </motion.a>
        );
      })}
    </motion.div>
  );
}
