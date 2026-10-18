"use client";

import { CSSProperties, ReactNode, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import styles from "./Marker.module.css";

interface MarkerProps {
  children: ReactNode;
  className?: string;
}

interface Line {
  left: number;
  top: number;
  width: number;
  height: number;
}

type Phase = "static" | "ready" | "drawing" | "settled";

/** Stroke speed in px per second, and the bounds on the whole stroke's duration. */
const SPEED = 900;
const MIN_MS = 650;
const MAX_MS = 1300;
const START_DELAY_MS = 150;

/**
 * Yellow highlighter stroke that sweeps across the text when it scrolls into view. When
 * the text wraps, the lines are drawn one after another, at an even speed, like a single
 * pass of a marker.
 *
 * The strokes are drawn behind the text, positioned against the nearest positioned
 * ancestor, so the parent should be `position: relative` and `isolation: isolate`.
 * Without JS, or with reduced motion, the stroke is simply shown.
 */
export default function Marker({ children, className }: MarkerProps) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const [phase, setPhase] = useState<Phase>("static");
  const [lines, setLines] = useState<Line[]>([]);
  const [em, setEm] = useState(16);

  useEffect(() => {
    const node = ref.current;
    if (!node || typeof IntersectionObserver === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let cancelled = false;
    let timer = 0;

    const measure = () => {
      const host = node.offsetParent as HTMLElement | null;
      if (!host || cancelled) return;
      const hostRect = host.getBoundingClientRect();
      const next = Array.from(node.getClientRects())
        .filter((rect) => rect.width > 1)
        .map((rect) => ({
          left: rect.left - hostRect.left - host.clientLeft,
          top: rect.top - hostRect.top - host.clientTop,
          width: rect.width,
          height: rect.height,
        }));
      setEm(parseFloat(getComputedStyle(node).fontSize) || 16);
      setLines(next);
      setPhase((current) => (current === "static" ? "ready" : current));
    };

    measure();
    document.fonts?.ready.then(measure).catch(() => {});
    const resizeObserver = new ResizeObserver(measure);
    if (node.offsetParent) resizeObserver.observe(node.offsetParent);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        measure();
        setPhase("drawing");
        timer = window.setTimeout(() => setPhase("settled"), START_DELAY_MS + MAX_MS + 100);
      },
      { rootMargin: "0px 0px -18% 0px", threshold: 1 },
    );
    observer.observe(node);

    return () => {
      cancelled = true;
      window.clearTimeout(timer);
      observer.disconnect();
      resizeObserver.disconnect();
    };
  }, []);

  // Each line's share of the stroke is proportional to its width, so the speed is even.
  const total = lines.reduce((sum, line) => sum + line.width, 0);
  const duration = Math.min(MAX_MS, Math.max(MIN_MS, (total / SPEED) * 1000));
  let elapsed = START_DELAY_MS;

  return (
    <span ref={ref} className={cn(styles.marker, phase === "static" && styles.static, className)}>
      {phase !== "static" &&
        lines.map((line, index) => {
          const lineMs = total > 0 ? (duration * line.width) / total : 0;
          const style = {
            left: line.left,
            top: line.top + 0.18 * em,
            width: line.width,
            height: 0.92 * em,
            transitionDuration: `${lineMs}ms`,
            transitionDelay: `${elapsed}ms`,
          } as CSSProperties;
          elapsed += lineMs;
          return (
            <span
              key={index}
              aria-hidden="true"
              className={cn(styles.stroke, (phase === "drawing" || phase === "settled") && styles.strokeDrawn, phase === "settled" && styles.strokeSettled)}
              style={style}
            />
          );
        })}
      {children}
    </span>
  );
}
