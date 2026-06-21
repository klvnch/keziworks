"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import { createPortal } from "react-dom";
import { projects } from "@/data/projectsData";
import { cn } from "@/lib/utils";

const TECH_STACK = [
  "Laravel",
  "Vue",
  "Nuxt",
  "Next.js",
  "React",
  "React Native",
  "MySQL",
  "PostgreSQL",
  "Tailwind CSS",
  "Python (FastF1)",
  "Node.js",
  "Expo",
  "GSAP",
  "TypeScript",
];

const COMMAND_CATALOG = [
  { cmd: "help", desc: "List all available commands" },
  { cmd: "whoami", desc: "Identity & background" },
  { cmd: "about", desc: "Mission statement & focus areas" },
  { cmd: "tech-stack", desc: "Technologies in use" },
  { cmd: "projects", desc: "Featured work & stacks" },
  { cmd: "skills", desc: "Core capabilities" },
  { cmd: "contact", desc: "Email & social links" },
  { cmd: "goto hero", desc: "Scroll to hero section" },
  { cmd: "goto work", desc: "Scroll to project showcase" },
  { cmd: "goto footer", desc: "Scroll to footer" },
  { cmd: "home", desc: "Scroll to top" },
  { cmd: "date", desc: "Current system date & time" },
  { cmd: "version", desc: "Portfolio build version" },
  { cmd: "clear", desc: "Close command palette" },
  { cmd: "exit", desc: "Close command palette" },
];

function subscribeNoop() {
  return () => {};
}

function scrollToTarget(selector: string) {
  document.querySelector(selector)?.scrollIntoView({ behavior: "smooth" });
}

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [lines, setLines] = useState<string[]>([
    "keziworks interactive system v1.0",
    "Press Ctrl+K anywhere to open this terminal.",
    "Type 'help' for available commands.",
  ]);
  const inputRef = useRef<HTMLInputElement>(null);
  const outputRef = useRef<HTMLDivElement>(null);

  const isClient = useSyncExternalStore(
    subscribeNoop,
    () => true,
    () => false,
  );

  const appendLines = useCallback((newLines: string[]) => {
    setLines((prev) => [...prev, ...newLines]);
  }, []);

  const close = useCallback(() => {
    setOpen(false);
    setInput("");
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen((prev) => !prev);
        return;
      }

      if (event.key === "Escape" && open) {
        event.preventDefault();
        close();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [close, open]);

  useEffect(() => {
    if (!open) return;

    document.body.classList.add("splash-scroll-lock");

    const frame = requestAnimationFrame(() => {
      inputRef.current?.focus();
    });

    return () => {
      cancelAnimationFrame(frame);
      document.body.classList.remove("splash-scroll-lock");
    };
  }, [open]);

  useEffect(() => {
    if (!outputRef.current) return;
    outputRef.current.scrollTop = outputRef.current.scrollHeight;
  }, [lines, open]);

  const runCommand = useCallback(
    (raw: string) => {
      const command = raw.trim().toLowerCase();

      if (command === "") return;

      if (command === "clear" || command === "exit" || command === "quit") {
        close();
        return;
      }

      const prompt = `> ${raw}`;

      if (command === "help") {
        appendLines([
          prompt,
          "Available commands:",
          ...COMMAND_CATALOG.map(
            ({ cmd, desc }) => `  ${cmd.padEnd(14)} — ${desc}`,
          ),
        ]);
        setInput("");
        return;
      }

      if (command === "whoami") {
        appendLines([
          prompt,
          "  user:     Kelvin Chen",
          "  handle:   keziworks",
          "  role:     Full-stack Product Engineer",
          "  site:     https://keziworks.com",
          "  focus:    Interactive systems, realtime UI, behavioral tools",
        ]);
        setInput("");
        return;
      }

      if (command === "about") {
        appendLines([
          prompt,
          "  Developing hyper-focused digital tools driven by personal",
          "  subcultures, social friction, and a deep interest in human",
          "  health and behavioral tracking systems.",
        ]);
        setInput("");
        return;
      }

      if (command === "tech-stack" || command === "stack") {
        appendLines([
          prompt,
          "  Core stack:",
          `  ${TECH_STACK.join(" · ")}`,
        ]);
        setInput("");
        return;
      }

      if (command === "projects" || command === "ls") {
        appendLines([
          prompt,
          "  Featured work:",
          ...projects.flatMap((project, index) => [
            `  ${String(index + 1).padStart(2, "0")} // ${project.title}${project.comingSoon ? " [coming soon]" : ""}`,
            `       ${project.techStack.join(" · ")}`,
          ]),
        ]);
        setInput("");
        return;
      }

      if (command === "skills" || command === "capabilities") {
        appendLines([
          prompt,
          "  Capabilities:",
          "    · Full-Stack Product",
          "    · Realtime UI",
          "    · Scroll-driven storytelling",
          "    · Mobile & web systems",
        ]);
        setInput("");
        return;
      }

      if (command === "contact" || command === "social") {
        appendLines([
          prompt,
          "  Email:     kelvinchen270@gmail.com",
          "  GitHub:    https://github.com/klvnch",
          "  Instagram: https://www.instagram.com/kl.vnn_/",
        ]);
        setInput("");
        return;
      }

      if (command === "home" || command === "goto top") {
        window.scrollTo({ top: 0, behavior: "smooth" });
        appendLines([prompt, "  Navigating to top…"]);
        setInput("");
        return;
      }

      if (command === "goto hero") {
        scrollToTarget("main > section");
        appendLines([prompt, "  Navigating to hero…"]);
        setInput("");
        return;
      }

      if (command === "goto work" || command === "goto projects") {
        scrollToTarget("main > section:nth-of-type(2)");
        appendLines([prompt, "  Navigating to project showcase…"]);
        setInput("");
        return;
      }

      if (command === "goto footer") {
        scrollToTarget("footer");
        appendLines([prompt, "  Navigating to footer…"]);
        setInput("");
        return;
      }

      if (command === "date" || command === "time") {
        appendLines([
          prompt,
          `  ${new Date().toLocaleString("en-US", { dateStyle: "full", timeStyle: "medium" })}`,
        ]);
        setInput("");
        return;
      }

      if (command === "version") {
        appendLines([prompt, "  keziworks portfolio v1.0 · Next.js 16 · 2026"]);
        setInput("");
        return;
      }

      appendLines([
        prompt,
        `  unknown command: "${raw}"`,
        "  Type 'help' to see available commands.",
      ]);
      setInput("");
    },
    [appendLines, close],
  );

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    runCommand(input);
  };

  if (!open || !isClient) return null;

  const modal = (
    <>
      {/* Backdrop — portaled to body, escapes Lenis transform context */}
      <div
        aria-hidden
        className="bg-black/70 backdrop-blur-md"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          zIndex: 99998,
        }}
        onMouseDown={close}
      />

      {/* Dialog — viewport-centered via fixed + translate, not flex parent */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Command palette"
        className="flex max-h-[min(85vh,520px)] flex-col overflow-hidden rounded-xl border border-zinc-700/80 bg-zinc-900/95 shadow-[0_0_80px_rgba(0,0,0,0.65)] ring-1 ring-zinc-800/50"
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "min(42rem, calc(100vw - 2rem))",
          zIndex: 99999,
        }}
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-zinc-800 px-4 py-3">
          <p className="font-telemetry text-[10px] uppercase tracking-[0.28em] text-zinc-500">
            Interactive System // Command Terminal
          </p>
          <div className="flex items-center gap-2">
            <kbd className="rounded border border-zinc-700 bg-zinc-800 px-1.5 py-0.5 font-mono text-[10px] text-zinc-500">
              ctrl+k
            </kbd>
            <kbd className="rounded border border-zinc-700 bg-zinc-800 px-1.5 py-0.5 font-mono text-[10px] text-zinc-500">
              esc
            </kbd>
          </div>
        </div>

        <div
          ref={outputRef}
          className="no-scrollbar min-h-[220px] flex-1 overflow-y-auto px-4 py-4 font-mono text-xs leading-relaxed"
        >
          {lines.map((line, index) => (
            <p
              key={`${index}-${line}`}
              className={cn(
                "whitespace-pre-wrap",
                line.startsWith(">")
                  ? "text-teal-400/90"
                  : line.startsWith("  unknown")
                    ? "text-red-400/80"
                    : "text-zinc-400",
              )}
            >
              {line}
            </p>
          ))}
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex items-center gap-2 border-t border-zinc-800 bg-zinc-950/50 px-4 py-3.5"
        >
          <span className="font-mono text-sm text-teal-400/90">›</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(event) => setInput(event.target.value)}
            spellCheck={false}
            autoComplete="off"
            aria-label="Command input"
            className="flex-1 bg-transparent font-mono text-sm text-zinc-100 outline-none placeholder:text-zinc-600"
            placeholder="Enter command…"
          />
        </form>
      </div>
    </>
  );

  return createPortal(modal, document.body);
}
