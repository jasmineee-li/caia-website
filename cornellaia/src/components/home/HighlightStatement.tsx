"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

interface Box {
  left: number;
  top: number;
  width: number;
  height: number;
}

interface HighlightStatementProps {
  /** Text before the highlighted phrase. */
  before: string;
  /** The phrase that gets the yellow highlight. */
  marked: string;
  /** Text after the highlighted phrase. */
  after?: string;
  /** Draw a writing line under every line of text, as on ruled notebook paper. */
  ruled?: boolean;
  className?: string;
}

// Drawing speed in px per second, and the pause before the pen moves to the next line.
const SPEED = 650;
const LINE_GAP = 0.08;
// Where the writing line sits, below the baseline, as a share of the font size.
const RULE_DROP = 0.1;

/** Merge the client rects of a range into one box per rendered line. */
function lineBoxes(range: Range, origin: DOMRect): Box[] {
  const lines: Box[] = [];
  for (const rect of Array.from(range.getClientRects())) {
    if (rect.width < 1) continue;
    const top = rect.top - origin.top;
    const line = lines.find((l) => Math.abs(l.top - top) < rect.height / 2);
    if (line) {
      const right = Math.max(line.left + line.width, rect.right - origin.left);
      line.left = Math.min(line.left, rect.left - origin.left);
      line.width = right - line.left;
    } else {
      lines.push({ left: rect.left - origin.left, top, width: rect.width, height: rect.height });
    }
  }
  return lines;
}

/** The baseline's offset inside a text line box, from the font's own ascent and descent. */
function baselineRatio(el: HTMLElement) {
  const style = getComputedStyle(el);
  const ctx = document.createElement("canvas").getContext("2d");
  if (!ctx) return 0.78;
  ctx.font = `${style.fontWeight} ${style.fontSize} ${style.fontFamily}`;
  const m = ctx.measureText("Hg");
  const ascent = m.fontBoundingBoxAscent;
  const descent = m.fontBoundingBoxDescent;
  return ascent && descent ? ascent / (ascent + descent) : 0.78;
}

/**
 * A statement with a highlighter stroke drawn behind one phrase. The stroke is measured
 * per rendered line and drawn left to right, finishing each line before starting the
 * next, once the statement scrolls into view. With `ruled`, every line of the statement
 * also sits on a pale writing line.
 */
export default function HighlightStatement({ before, marked, after, ruled = false, className }: HighlightStatementProps) {
  const rootRef = useRef<HTMLParagraphElement | null>(null);
  const textRef = useRef<HTMLSpanElement | null>(null);
  const markRef = useRef<HTMLSpanElement | null>(null);
  const [strokes, setStrokes] = useState<Box[]>([]);
  const [rules, setRules] = useState<number[]>([]);
  const [drawn, setDrawn] = useState(false);
  const [animate, setAnimate] = useState(true);

  // Measure the highlight strokes and the writing lines, relative to the paragraph.
  useEffect(() => {
    const root = rootRef.current;
    const text = textRef.current;
    const mark = markRef.current;
    if (!root || !text || !mark) return;

    const measure = () => {
      const origin = root.getBoundingClientRect();
      const range = document.createRange();
      range.selectNodeContents(mark);
      setStrokes(lineBoxes(range, origin));
      if (ruled) {
        range.selectNodeContents(text);
        const ratio = baselineRatio(root);
        const fontSize = parseFloat(getComputedStyle(root).fontSize);
        setRules(lineBoxes(range, origin).map((l) => Math.round(l.top + l.height * ratio + fontSize * RULE_DROP)));
      }
    };

    measure();
    document.fonts?.ready.then(measure);
    const resize = new ResizeObserver(() => {
      // Re-measured strokes appear in place, without replaying the drawing.
      setAnimate(false);
      measure();
    });
    resize.observe(root);
    return () => resize.disconnect();
  }, [ruled]);

  // Draw once the statement is mostly in view.
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setAnimate(false);
      setDrawn(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setAnimate(true);
          setDrawn(true);
          io.disconnect();
        }
      },
      { threshold: 0.6 },
    );
    io.observe(root);
    return () => io.disconnect();
  }, []);

  let delay = 0.1;
  return (
    <p ref={rootRef} className={cn("relative isolate", className)}>
      {strokes.map((s, i) => {
        const duration = Math.max(0.22, s.width / SPEED);
        const style = {
          left: s.left,
          top: s.top,
          width: s.width,
          height: s.height,
          transform: drawn ? "scaleX(1)" : "scaleX(0)",
          transition: animate ? `transform ${duration}s cubic-bezier(0.45, 0.05, 0.55, 0.95) ${delay}s` : "none",
        };
        delay += duration + LINE_GAP;
        return <span key={`stroke-${i}`} aria-hidden="true" className="absolute -z-10 origin-left bg-highlight" style={style} />;
      })}
      {/* Writing lines run across the column and meet the margin rule on the left. */}
      {rules.map((top, i) => (
        <span
          key={`rule-${i}`}
          aria-hidden="true"
          className="absolute -z-10 h-px bg-notebook-rule left-0 right-0 lg:-left-10"
          style={{ top }}
        />
      ))}
      <span ref={textRef}>
        {before}
        <span ref={markRef}>{marked}</span>
        {after}
      </span>
    </p>
  );
}
