import type { CSSProperties } from "react";
import { cn } from "@/lib/cn";
import { ringColour } from "@/components/ui/JoinDots";

interface DotRowsProps {
  className?: string;
  /** Number of rows. */
  rows?: number;
  /** Grid pitch in px. */
  pitch?: number;
  /** Dot radius in px. */
  radius?: number;
  color?: string;
  /**
   * Colour the dots like the Join page's rings instead: red at the right edge, then coral,
   * gold and teal, with steel blue running on to the left edge.
   */
  rings?: boolean;
  /** Colour each dot from this palette instead, mixed evenly along the strip, like a crowd. */
  palette?: string[];
}

/** Columns per repeating tile for a palette. Prime, so the mix never lines up into a visible repeat. */
const MIX_COLS = 29;

function hash01(a: number, b: number) {
  const v = Math.sin(a * 127.1 + b * 311.7 + 4 * 74.7) * 43758.5453;
  return v - Math.floor(v);
}

/** Columns drawn for the rings, enough to fill the widest screen that shows the strip. */
const RING_COLS = 56;
/** How many columns the rings take to reach steel blue. */
const RING_SPAN = 30;

/**
 * A few even rows of dots running the full width, used under page headers on phones.
 * Drawn as an SVG tile (repeated, or wide enough for any phone), so it fills any width
 * without scaling the dots.
 */
export default function DotRows({
  className,
  rows = 4,
  pitch = 14,
  radius = 3,
  color = "#0c4da2",
  rings,
  palette,
}: DotRowsProps) {
  const cols = rings ? RING_COLS : palette ? MIX_COLS : 1;
  const w = cols * pitch;
  const h = rows * pitch;
  let circles = "";
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const fill = rings
        ? ringColour(Math.hypot(cols - 1 - col, rows - 1 - row) / RING_SPAN)
        : palette
          ? palette[Math.floor(hash01(col, row) * palette.length)]
          : color;
      circles += `<circle cx='${col * pitch + pitch / 2}' cy='${row * pitch + pitch / 2}' r='${radius}' fill='${fill}'/>`;
    }
  }
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='${w}' height='${h}'>${circles}</svg>`;
  const style: CSSProperties = {
    height: h,
    backgroundImage: `url("data:image/svg+xml,${encodeURIComponent(svg)}")`,
    backgroundRepeat: rings ? "no-repeat" : "repeat-x",
    backgroundPosition: rings ? "right bottom" : undefined,
    backgroundSize: `${w}px ${h}px`,
  };
  return <div aria-hidden="true" className={cn("pointer-events-none w-full", className)} style={style} />;
}
