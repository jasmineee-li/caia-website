import type { ReactElement } from "react";

/**
 * Small dot pictograms for the AI safety problems on the home page, drawn in the halftone
 * language of the rest of the site: blue dots, pale dots for the background, and one red
 * accent per picture. Every glyph sits in the same 120 by 64 box.
 */

export type GlyphKey =
  | "values"
  | "generalization"
  | "interpretability"
  | "oversight"
  | "evaluations"
  | "control"
  | "regulation"
  | "compute"
  | "coordination"
  | "economy"
  | "power"
  | "epistemics";

const BLUE = "#0c4da2";
const PALE = "#c3cfe2";
const RED = "var(--red, #b31b1b)";
const R = 2.4;

type Dot = [x: number, y: number, r?: number, fill?: string];

function dots(list: Dot[]) {
  return list.map(([x, y, r = R, fill = BLUE], i) => <circle key={`d${i}`} cx={x} cy={y} r={r} fill={fill} />);
}

/** Evenly spaced dots along a straight line, skipping the first `skip` px. */
function along(x0: number, y0: number, x1: number, y1: number, gap: number, fill: string, r = R, skip = 0): Dot[] {
  const len = Math.hypot(x1 - x0, y1 - y0);
  const out: Dot[] = [];
  for (let d = skip; d <= len + 0.01; d += gap) {
    const t = d / len;
    out.push([x0 + (x1 - x0) * t, y0 + (y1 - y0) * t, r, fill]);
  }
  return out;
}

/** Dots spaced around a circle. */
function ring(cx: number, cy: number, radius: number, gap: number, fill: string, r = R): Dot[] {
  const n = Math.max(6, Math.round((2 * Math.PI * radius) / gap));
  return Array.from({ length: n }, (_, i) => {
    const a = (i / n) * Math.PI * 2 - Math.PI / 2;
    return [cx + radius * Math.cos(a), cy + radius * Math.sin(a), r, fill] as Dot;
  });
}

/** A small hexagonal cluster: one dot and six around it. */
function cluster(cx: number, cy: number, spread: number, fill: string, r = R): Dot[] {
  return [[cx, cy, r, fill] as Dot, ...ring(cx, cy, spread, (2 * Math.PI * spread) / 6, fill, r)];
}

function hash01(i: number) {
  const v = Math.sin(i * 12.9898 + 4.1) * 43758.5453;
  return v - Math.floor(v);
}

const GLYPHS: Record<GlyphKey, () => ReactElement> = {
  // A target of dot rings with a red centre: what we intend, hit.
  values: () => <>{dots([...ring(60, 32, 28, 8, PALE), ...ring(60, 32, 18.5, 8, BLUE), ...ring(60, 32, 9, 7, BLUE), [60, 32, 3.6, RED]])}</>,

  // A fan of futures from one point, as on the hero; the intended path runs straight in red.
  generalization: () => (
    <>
      {dots([
        ...[-34, -22, 22, 34].flatMap((deg) => {
          const a = (deg * Math.PI) / 180;
          return along(12, 32, 12 + 104 * Math.cos(a), 32 + 104 * Math.sin(a), 9, PALE, R, deg % 34 === 0 ? 17 : 24).filter(([, y]) => y > 2 && y < 62);
        }),
        ...[-11, 11].flatMap((deg) => {
          const a = (deg * Math.PI) / 180;
          return along(12, 32, 12 + 104 * Math.cos(a), 32 + 104 * Math.sin(a), 9, BLUE, R, 36);
        }),
        ...along(12, 32, 116, 32, 9, RED, R, 10),
        [12, 32, 3.4, BLUE],
      ])}
    </>
  ),

  // A field of pale units with a lens over it; inside the lens they resolve, one in red.
  interpretability: () => {
    const grid: Dot[] = [];
    for (let y = 6; y <= 58; y += 8) {
      for (let x = 8; x <= 112; x += 8) {
        const inside = Math.hypot(x - 56, y - 28) < 17;
        grid.push([x, y, inside ? 2.8 : 1.9, inside ? (x === 56 && y === 30 ? RED : BLUE) : PALE]);
      }
    }
    return (
      <>
        {dots(grid)}
        <circle cx={56} cy={28} r={20} fill="none" stroke={BLUE} strokeWidth={1.6} />
        <path d="M70.5 42.5 L84 56" stroke={BLUE} strokeWidth={3} strokeLinecap="round" />
      </>
    );
  },

  // A small group linked to a much larger one: people overseeing a more capable system.
  oversight: () => {
    const big: Dot[] = [];
    for (let y = 6; y <= 58; y += 7.5) {
      for (let x = 62; x <= 114; x += 7.5) {
        if (Math.hypot(x - 88, y - 32) <= 26) big.push([x, y, 2.9, BLUE]);
      }
    }
    return <>{dots([...along(24, 44, 60, 36, 7, PALE, 1.7, 8), ...big, [12, 48, R, BLUE], [20, 52, R, BLUE], [17, 40, 3, RED]])}</>;
  },

  // Columns of dots, growing; the ones past a dashed threshold turn red.
  evaluations: () => {
    const heights = [1, 2, 2, 3, 4, 6, 8];
    const out: Dot[] = [];
    heights.forEach((h, c) => {
      for (let k = 0; k < h; k++) {
        const y = 58 - k * 7;
        out.push([15 + c * 15, y, R, y < 24 ? RED : BLUE]);
      }
    });
    return (
      <>
        {dots(out)}
        <line x1={6} y1={26.5} x2={114} y2={26.5} stroke={PALE} strokeWidth={1.4} strokeDasharray="3 3" />
      </>
    );
  },

  // Units inside a boundary; one red unit presses at the edge but stays inside.
  control: () => {
    const inside: Dot[] = [];
    for (let y = 18; y <= 46; y += 9.33) {
      for (let x = 34; x <= 86; x += 8.67) inside.push([x, y, R, PALE]);
    }
    return (
      <>
        <rect x={22} y={7} width={76} height={50} rx={7} fill="none" stroke={BLUE} strokeWidth={1.6} />
        {dots([...inside, [92, 32, 3.2, RED]])}
      </>
    );
  },

  // A page of dotted lines with a red seal.
  regulation: () => {
    const lines: Dot[] = [];
    [36, 28, 34, 20].forEach((len, row) => {
      for (let x = 44; x <= 44 + len; x += 6) lines.push([x, 15 + row * 8, 1.9, row === 0 ? BLUE : PALE]);
    });
    return (
      <>
        <rect x={34} y={5} width={52} height={54} rx={4} fill="none" stroke={BLUE} strokeWidth={1.6} />
        {dots([...lines, [76, 50, 3.6, RED]])}
      </>
    );
  },

  // A chip: a dense square of dots with pins on every side; one cell marked in red.
  compute: () => {
    const out: Dot[] = [];
    for (let r = 0; r < 5; r++) for (let c = 0; c < 5; c++) out.push([46 + c * 7, 18 + r * 7, R, r === 0 && c === 4 ? RED : BLUE]);
    for (let k = 0; k < 5; k++) {
      const p = 18 + k * 7;
      out.push([46 + k * 7, 7, 1.7, PALE], [46 + k * 7, 57, 1.7, PALE], [35, p, 1.7, PALE], [85, p, 1.7, PALE]);
    }
    return <>{dots(out)}</>;
  },

  // Three groups, linked; one link in red.
  coordination: () => (
    <>
      {dots([
        ...along(32, 44, 52, 22, 6, PALE, 1.7, 7).slice(0, -1),
        ...along(68, 22, 88, 44, 6, PALE, 1.7, 7).slice(0, -1),
        ...along(34, 50, 86, 50, 6.5, RED, 1.8, 9).slice(0, -1),
        ...cluster(24, 50, 6, BLUE),
        ...cluster(60, 15, 6, BLUE),
        ...cluster(96, 50, 6, BLUE),
      ])}
    </>
  ),

  // A curve that bends sharply upward over a flat baseline, ending in red.
  economy: () => {
    const K = 3;
    const curve: Dot[] = [];
    for (let x = 8; x <= 112; x += 8) {
      const t = (x - 8) / 104;
      curve.push([x, 54 - 46 * ((Math.exp(K * t) - 1) / (Math.exp(K) - 1)), R, BLUE]);
    }
    curve[curve.length - 1] = [curve[curve.length - 1][0], curve[curve.length - 1][1], 3.4, RED];
    return <>{dots([...along(8, 60, 112, 60, 6, PALE, 1.6), ...curve])}</>;
  },

  // Scattered dots drawn together into one large red point.
  power: () => {
    const streams = [8, 20, 32, 44, 56].flatMap((y0, s) =>
      along(8 + hash01(s) * 10, y0, 96, 32, 8, s === 2 ? BLUE : PALE, 2, 0).filter(([x, y]) => Math.hypot(x - 96, y - 32) > (s === 2 ? 19 : 26)),
    );
    return <>{dots([...streams, ...ring(96, 32, 12, 6.5, BLUE, 2.2), [96, 32, 6, RED]])}</>;
  },

  // A web of people talking, one voice in red.
  epistemics: () => {
    const nodes: Array<[number, number]> = [
      [12, 20], [30, 46], [44, 14], [58, 38], [74, 12], [80, 52], [96, 28], [110, 48], [108, 8],
    ];
    const edges: Array<[number, number]> = [
      [0, 1], [0, 2], [1, 3], [2, 3], [2, 4], [3, 4], [3, 5], [4, 6], [5, 6], [6, 7], [6, 8], [5, 7], [4, 8],
    ];
    return (
      <>
        {edges.map(([a, b], i) => (
          <line key={`e${i}`} x1={nodes[a][0]} y1={nodes[a][1]} x2={nodes[b][0]} y2={nodes[b][1]} stroke={PALE} strokeWidth={1.2} />
        ))}
        {dots(nodes.map(([x, y], i) => [x, y, i === 3 ? 3.6 : 3, i === 3 ? RED : BLUE] as Dot))}
      </>
    );
  },
};

/** How far to shift each drawing left so that all of them start at the same edge, like the text under them. */
const SHIFT: Record<GlyphKey, number> = {
  values: 27,
  generalization: 6,
  interpretability: 3,
  oversight: 7,
  evaluations: 3,
  control: 19,
  regulation: 30,
  compute: 30,
  coordination: 13,
  economy: 3,
  power: 3,
  epistemics: 6,
};

export default function ProblemGlyph({ name, className }: { name: GlyphKey; className?: string }) {
  const Glyph = GLYPHS[name];
  return (
    <svg aria-hidden="true" viewBox="0 0 120 64" preserveAspectRatio="xMinYMid meet" className={className}>
      <g transform={`translate(${-SHIFT[name]} 0)`}>
        <Glyph />
      </g>
    </svg>
  );
}
