"use client";

import { useEffect, useRef, useState } from "react";

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*";

interface DecryptedTextProps {
  text: string;
  duration?: number;
  onComplete?: () => void;
  className?: string;
}

function randomGlyph() {
  return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
}

function toPlaceholderChars(value: string) {
  return value.split("").map((char) => (char === " " ? " " : "#"));
}

export function DecryptedText({
  text,
  duration = 1200,
  onComplete,
  className,
}: DecryptedTextProps) {
  const [display, setDisplay] = useState<string[]>(() => toPlaceholderChars(text));
  const completedRef = useRef(false);
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    completedRef.current = false;
    const chars = text.split("");
    const lockInterval = duration / Math.max(chars.length, 1);
    let lockedCount = 0;

    const scrambleTimer = window.setInterval(() => {
      setDisplay((prev) =>
        prev.map((char, index) => {
          if (index < lockedCount) return chars[index];
          if (chars[index] === " ") return " ";
          return randomGlyph();
        }),
      );
    }, 35);

    const lockTimer = window.setInterval(() => {
      lockedCount += 1;
      if (lockedCount >= chars.length) {
        window.clearInterval(scrambleTimer);
        window.clearInterval(lockTimer);
        setDisplay(chars);
        if (!completedRef.current) {
          completedRef.current = true;
          onCompleteRef.current?.();
        }
      }
    }, lockInterval);

    return () => {
      window.clearInterval(scrambleTimer);
      window.clearInterval(lockTimer);
    };
  }, [text, duration]);

  return (
    <h1 className={className} aria-label={text}>
      {display.map((char, index) => (
        <span key={index}>{char}</span>
      ))}
    </h1>
  );
}
