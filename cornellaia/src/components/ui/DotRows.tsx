import type { CSSProperties } from "react";
import { cn } from "@/lib/cn";

interface DotRowsProps {
  className?: string;
  /** Number of rows. */
  rows?: number;
  /** Grid pitch in px. */
  pitch?: number;
  /** Dot radius in px. */
  radius?: number;
  color?: string;
  /** An accent colour scattered among the dots, e.g. red on the Join page. */
  accent?: string;
  /** Share of dots drawn in the accent colour. */
  accentShare?: number;
}

/** Columns per repeating tile. Prime, so the accent dots never line up into a visible repeat. */
const TILE_COLS = 23;

function hash01(a: number, b: number) {
  const v = Math.sin(a * 127.1 + b * 311.7 + 4 * 74.7) * 43758.5453;
  return v - Math.floor(v);
}

/**
 * A few even rows of dots running the full width, used under page headers on phones.
 * Drawn as a repeating SVG tile, so it fills any width without scaling the dots.
 */
export default function DotRows({
  className,
  rows = 4,
  pitch = 14,
  radius = 3,
  color = "#0c4da2",
  accent,
  accentShare = 0.1,
}: DotRowsProps) {
  const cols = accent ? TILE_COLS : 1;
  const w = cols * pitch;
  const h = rows * pitch;
  let circles = "";
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const fill = accent && hash01(col, row) < accentShare ? accent : color;
      circles += `<circle cx='${col * pitch + pitch / 2}' cy='${row * pitch + pitch / 2}' r='${radius}' fill='${fill}'/>`;
    }
  }
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='${w}' height='${h}'>${circles}</svg>`;
  const style: CSSProperties = {
    height: h,
    backgroundImage: `url("data:image/svg+xml,${encodeURIComponent(svg)}")`,
    backgroundRepeat: "repeat-x",
    backgroundSize: `${w}px ${h}px`,
  };
  return <div aria-hidden="true" className={cn("pointer-events-none w-full", className)} style={style} />;
}
