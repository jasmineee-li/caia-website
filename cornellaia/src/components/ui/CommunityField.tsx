import { cn } from "@/lib/cn";

/**
 * The Join page's dot field: the same blue halftone as the other page headers, growing
 * toward the right edge, with a scattering of red dots among the blue, like individual
 * people in a crowd. Red dots are picked by a fixed hash, so the pattern is the same on
 * every render.
 */

const BLUE = "#0c4da2";
const RED = "#d9413a";

const W = 700;
const H = 560;

function hash01(a: number, b: number) {
  const v = Math.sin(a * 127.1 + b * 311.7 + 4 * 74.7) * 43758.5453;
  return v - Math.floor(v);
}

export default function CommunityField({
  pitch = 14,
  maxR = 3.7,
  redShare = 0.09,
  className,
}: {
  pitch?: number;
  maxR?: number;
  /** Share of the larger dots drawn in red. */
  redShare?: number;
  className?: string;
}) {
  const dots: Array<[number, number, number, string]> = [];
  const cols = Math.floor(W / pitch);
  const rows = Math.ceil(H / pitch);
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col <= cols; col++) {
      const x = W - pitch / 2 - (cols - col) * pitch;
      const y = H - pitch / 2 - (rows - 1 - row) * pitch;
      const t = x / W;
      // Grows a little more gently than a straight ramp, matching the other page headers.
      const r = maxR * (0.12 + 0.88 * Math.pow(Math.min(1, Math.max(0, (t - 0.1) / 0.9)), 1.25));
      if (r < 0.45 || t < 0.08) continue;
      // Only dots big enough to read as a colour can be red, so tiny specks never flicker red.
      const red = r > maxR * 0.45 && hash01(col, row) < redShare;
      dots.push([x, y, r, red ? RED : BLUE]);
    }
  }
  return (
    <svg
      aria-hidden="true"
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="xMaxYMax slice"
      className={cn("pointer-events-none", className)}
    >
      {dots.map(([x, y, r, c], i) => (
        <circle key={i} cx={x} cy={y} r={r} fill={c} />
      ))}
    </svg>
  );
}
