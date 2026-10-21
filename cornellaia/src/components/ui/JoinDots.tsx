import HalftoneField from "@/components/ui/HalftoneField";

/**
 * The Join page's dot field: the same halftone as the other page headers, coloured in the
 * palette of the community dot grid from the original Join page. The colours run in rings
 * out from the bottom right corner: red at the centre, then coral, gold, teal and steel
 * blue, which carries on to the left edge, where the dots shrink away as on the other headers.
 */

/** Ring colours by distance from the corner, as a share of 848px. */
export const RINGS: Array<[number, string]> = [
  [0, "#B31B1B"],
  [0.13, "#D5786C"],
  [0.24, "#BB9854"],
  [0.37, "#377E87"],
  [0.51, "#698CA7"],
];

export function ringColour(u: number) {
  let c = RINGS[0][1];
  for (const [at, col] of RINGS) if (u >= at) c = col;
  return c;
}

/**
 * join-rings.svg holds one flat colour per 14px cell, worked out from RINGS at each dot's
 * centre, so every dot takes a single colour.
 */
export default function JoinDots({ className }: { className?: string }) {
  return <HalftoneField cellPaint="/graphics/halftone/join-rings.svg" className={className} />;
}
