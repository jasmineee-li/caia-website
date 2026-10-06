"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/cn";

/*
 * "Possible futures" field for the home hero.
 *
 * The density map is a pre-rendered fan of ~700 simulated trajectories (the same
 * model as the campaign poster). Each canvas dot samples that map, so the cloud
 * reads as a halftone print. One trajectory is highlighted in red.
 *
 * Map geometry (poster points, y up): x 0..780, y -60..1400, sampled at 0.5 px/pt.
 * The fan's tip sits a little left of today (MAP_SHIFT), so the cloud already has
 * some height where the highlighted path starts and tapers to a point behind it.
 * The simulated futures drift upward, so the fan opens mostly toward the top right.
 * Pixel values store sqrt(density) so the faint fringe keeps precision.
 *
 * Interaction: on load the dots drop in from above and land in place, sweeping left
 * to right, and the red trajectory draws in behind them. The area under the pointer
 * darkens and swells, and the red trajectory bends toward the pointer. With the pointer
 * in the lower part of the fan the trajectory turns downward instead, and over the
 * cloud the cursor shows how things are going: 😃 while it rises, 😵 once it falls.
 */
const MAP_SRC = "/graphics/futures-density.png";
const MAP = { x0: 0, y1: 1400, scale: 0.5 };
const ORIGIN = { x: 40, y: 505 };
// How far the fan's tip sits left of today, in poster points.
const MAP_SHIFT = 14;

// Highlighted trajectory, in poster points relative to ORIGIN (y up). It follows a
// rising percentile of the simulated paths, so it always sits inside the cloud.
const PATH: ReadonlyArray<readonly [number, number]> = [
  [0, 0], [4, 0.6], [9, 1.3], [15, 2.1], [21.7, 3], [28.9, 4.1], [36.6, 5.2], [44.5, 6.4],
  [52.4, 7.7], [60.3, 9], [68, 10.4], [75.5, 11.9], [83.2, 13.4], [91.1, 14.9], [99, 16.6],
  [107.1, 18.3], [115.3, 20.1], [123.7, 22], [132.2, 24], [140.8, 26.2], [149.6, 28.4],
  [158.5, 30.8], [167.6, 33.2], [176.7, 35.8], [186, 38.4], [195.5, 41.1], [205.1, 44],
  [214.8, 47], [224.7, 50.1], [234.7, 53.5], [244.8, 56.9], [255.1, 60.5], [265.5, 64.2],
  [276, 67.9], [286.7, 71.8], [297.5, 75.8], [308.4, 80], [319.5, 84.5], [330.8, 89.3],
  [342.1, 94.3], [353.6, 99.7], [365.3, 105.4], [377.2, 111.4], [389.3, 117.8], [401.6, 124.3],
  [414, 131.1], [426.4, 138.2], [438.9, 145.5], [451.3, 152.9], [463.7, 160.5], [476, 168.3],
  [488.4, 176.4], [501.1, 185.1], [514, 194.1], [526.9, 203.3], [539.8, 212.7], [552.4, 222],
  [564.7, 231.2], [576.5, 240.1], [587.8, 248.5], [598.4, 256.5], [608.6, 264.1], [618.6, 271.8],
  [628.4, 279.4], [637.9, 286.8], [646.8, 293.8], [655.2, 300.5], [662.8, 306.5], [669.6, 311.9],
  [675.3, 316.5], [680, 320.2], [680, 320.2],
];

// Dot colours from resting (index 0) to darkest, under the pointer, so hovering
// reads as a gentle shadow. A cornflower blue (the site's pale background hue, four
// steps deeper) keeps the cloud light and lets the red trajectory lead.
const DOT_SHADES = ["#589bee", "#4690ec", "#3385eb"];
// The highlighted path uses the logo red, read from the site token at runtime.
const RED_FALLBACK = "#b31b1b";
const INK = "#0f172a";

interface Layout {
  width: number;
  height: number;
  ox: number;
  oy: number;
  kx: number; // CSS px per poster point, horizontal
  ky: number; // CSS px per poster point, vertical
  pitch: number;
  lens: number;
  wide: boolean;
  copyBottom: number | null; // bottom of the hero copy, in canvas px
}

interface Dots {
  x: Float32Array;
  y: Float32Array;
  r: Float32Array; // base radius
  j: Float32Array; // 0..1 per dot, staggers its drop
  h: Float32Array; // 0..1 per dot, varies its drop height
  count: number;
}

// Intro: each dot falls from above and lands, sweeping left to right (seconds, px).
const DROP = {
  delay: 0.2, // before the first column starts falling
  sweep: 2.2, // for the start of the fall to travel across the cloud
  jitter: 0.35, // random extra delay per dot, so columns don't fall as a wall
  fall: 0.75, // one dot's fall
  height: 16, // average drop distance
};
const INTRO_END = DROP.delay + DROP.sweep + DROP.jitter + DROP.fall;

// Fraction of the drop height still above the resting spot at fall progress p (0..1):
// a fall at constant speed that stops where the dot lands.
function dropOffset(p: number) {
  return 1 - p;
}

// Stable pseudo-random value in 0..1 for dot i.
function hash01(i: number, salt: number) {
  const v = Math.sin(i * 12.9898 + salt * 78.233) * 43758.5453;
  return v - Math.floor(v);
}

function clamp01(t: number) {
  return Math.min(1, Math.max(0, t));
}

function smoothstep(t: number) {
  const c = clamp01(t);
  return c * c * (3 - 2 * c);
}

export default function FuturesField({
  className,
  anchorSelector,
}: {
  className?: string;
  /** The hero copy block. The fan starts just below it, at its left edge. */
  anchorSelector?: string;
}) {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const red =
      getComputedStyle(document.documentElement).getPropertyValue("--color-brand-red").trim() || RED_FALLBACK;

    let map: { data: Uint8Array; w: number; h: number } | null = null;
    let layout: Layout | null = null;
    let dots: Dots | null = null;
    let base: Array<[number, number]> = []; // red path in canvas px, before steering
    let fall: Array<[number, number]> = []; // the downward alternative, along the cloud's lower edge
    let mode = 0; // 0 = rising path, 1 = falling path (eased)
    let wantFall = false;
    const host = wrap.parentElement; // the hero section; it carries the emoji cursor
    let cursorFace: "up" | "down" | null = null;
    const faceCursor: Partial<Record<"up" | "down", string>> = {};
    // per-column vertical band (canvas px) where the cloud is solid; the red line stays inside it
    let envTop = new Float32Array(0);
    let envBot = new Float32Array(0);
    let envStep = 8;
    const steered: Array<[number, number]> = [];

    let raf = 0;
    let running = false;
    let visible = true;
    let start = performance.now();
    const pointer = { x: 0, y: 0, tx: 0, ty: 0, s: 0, ts: 0, has: false, steer: 0 };

    function sample(px: number, py: number) {
      if (!map || !layout) return 0;
      // canvas px -> poster points -> map pixels
      const x = ORIGIN.x + MAP_SHIFT + (px - layout.ox) / layout.kx;
      const y = ORIGIN.y - (py - layout.oy) / layout.ky;
      const mx = (x - MAP.x0) * MAP.scale;
      const my = (MAP.y1 - y) * MAP.scale;
      if (mx < 0 || my < 0 || mx >= map.w - 1 || my >= map.h - 1) return 0;
      const x0 = mx | 0;
      const y0 = my | 0;
      const fx = mx - x0;
      const fy = my - y0;
      const i = y0 * map.w + x0;
      const d = map.data;
      const top = d[i] * (1 - fx) + d[i + 1] * fx;
      const bottom = d[i + map.w] * (1 - fx) + d[i + map.w + 1] * fx;
      return (top * (1 - fy) + bottom * fy) / 255; // = sqrt(density)
    }

    function computeLayout(): Layout {
      const rect = wrap!.getBoundingClientRect();
      const width = Math.max(1, rect.width);
      const height = Math.max(1, rect.height);
      const wide = width >= 1024;
      let ox = Math.max(16, width * 0.05);
      let oy = height * 0.74;
      let copyBottom: number | null = null;
      const anchor = anchorSelector ? document.querySelector(anchorSelector) : null;
      if (anchor) {
        const a = anchor.getBoundingClientRect();
        copyBottom = a.bottom - rect.top;
        ox = a.left - rect.left + 4;
        // the fan rises to the right, so it can start low and leave the top left open
        oy = wide
          ? Math.max(copyBottom + 170, height * 0.76)
          : copyBottom + (height - copyBottom) * 0.66;
      }
      oy = Math.min(oy, height - (wide ? 120 : 90));
      const span = wide ? 560 : width >= 640 ? 520 : 440;
      const kx = (width - ox) / span;
      const ky = kx * (wide ? 0.64 : width >= 640 ? 0.7 : 0.8);
      const pitch = wide ? 9 : width >= 640 ? 7.5 : 6;
      const lens = wide ? 130 : 90;
      return { width, height, ox, oy, kx, ky, pitch, lens, wide, copyBottom };
    }

    function build() {
      if (!map) return;
      layout = computeLayout();
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      canvas!.width = Math.round(layout.width * dpr);
      canvas!.height = Math.round(layout.height * dpr);
      canvas!.style.width = `${layout.width}px`;
      canvas!.style.height = `${layout.height}px`;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      populate();

      // On narrow screens the fan sits under the copy: tuck its top edge in close.
      if (!layout.wide && layout.copyBottom !== null && dots && dots.count > 0) {
        let top = Infinity;
        for (let i = 0; i < dots.count; i++) if (dots.y[i] < top) top = dots.y[i];
        const shift = layout.copyBottom + 40 - top;
        if (Math.abs(shift) > 1) {
          layout.oy += shift;
          populate();
        }
      }
    }

    function populate() {
      if (!layout) return;
      const { width, height, pitch, ox, oy, kx, ky } = layout;

      const cols = Math.ceil(width / pitch) + 2;
      const rows = Math.ceil(height / pitch) + 2;
      const n = cols * rows;
      const dx = new Float32Array(n);
      const dy = new Float32Array(n);
      const dr = new Float32Array(n);
      const dj = new Float32Array(n);
      const dh = new Float32Array(n);
      let dc = 0;
      // align the grid to the origin so the first dots sit on the line
      const offX = ((ox % pitch) + pitch) % pitch;
      const offY = ((oy % pitch) + pitch) % pitch;
      for (let row = -1; row < rows - 1; row++) {
        for (let col = -1; col < cols - 1; col++) {
          const x = col * pitch + offX;
          const y = row * pitch + offY;
          if (x < ox - (MAP_SHIFT + 6) * kx) continue; // the tip sits left of today
          const v = sample(x, y);
          if (v < 0.2) continue; // v is sqrt(density); 0.2 ~ the poster's cutoff
          dx[dc] = x;
          dy[dc] = y;
          dr[dc] = pitch * 0.55 * v;
          dj[dc] = hash01(col * 131 + row, 1);
          dh[dc] = hash01(col * 131 + row, 2);
          dc++;
        }
      }
      dots = { x: dx, y: dy, r: dr, j: dj, h: dh, count: dc };

      envStep = pitch;
      const envCols = Math.ceil(width / envStep) + 1;
      envTop = new Float32Array(envCols).fill(oy);
      envBot = new Float32Array(envCols).fill(oy);
      for (let c = 0; c < envCols; c++) {
        const ex = c * envStep;
        if (ex < ox) continue;
        let top = Infinity;
        let bottom = -Infinity;
        for (let ey = 0; ey < height; ey += pitch / 2) {
          if (sample(ex, ey) >= 0.5) {
            if (ey < top) top = ey;
            bottom = ey;
          }
        }
        if (top !== Infinity) {
          envTop[c] = top;
          envBot[c] = bottom;
        }
      }
      // the raw band is ragged at the fringe; smooth it so the clamped line stays fluid
      const smoothBand = (src: Float32Array, pickInner: (a: number, b: number) => number) => {
        const out = new Float32Array(src.length);
        const r = 4;
        for (let c = 0; c < src.length; c++) {
          let sum = 0;
          let inner = src[c];
          let n = 0;
          for (let k = -r; k <= r; k++) {
            const j = Math.min(src.length - 1, Math.max(0, c + k));
            sum += src[j];
            inner = pickInner(inner, src[j]);
            n++;
          }
          out[c] = (sum / n + inner) / 2;
        }
        return out;
      };
      envTop = smoothBand(envTop, Math.max);
      envBot = smoothBand(envBot, Math.min);

      base = PATH.map(([px, py]) => [ox + px * kx, oy - py * ky]);
      // The falling path keeps just inside the cloud's lower edge and never climbs back up.
      fall = base.map(([bx]) => {
        const c = Math.min(envBot.length - 1, Math.max(0, Math.round(bx / envStep)));
        return [bx, oy + Math.max(0, envBot[c] - 22 - oy)];
      });
      for (let pass = 0; pass < 8; pass++) {
        for (let i = 1; i < fall.length - 1; i++) {
          fall[i][1] = (fall[i - 1][1] + 2 * fall[i][1] + fall[i + 1][1]) / 4;
        }
      }
      fall[0][1] = oy;
      for (let i = 1; i < fall.length; i++) fall[i][1] = Math.max(fall[i - 1][1], fall[i][1]);
      steered.length = 0;
      for (const p of base) steered.push([p[0], p[1]]);
    }

    function pathYAt(path: Array<[number, number]>, x: number) {
      for (let i = 1; i < path.length; i++) {
        if (path[i][0] >= x) {
          const [ax, ay] = path[i - 1];
          const [bx, by] = path[i];
          const t = (x - ax) / (bx - ax || 1);
          return ay + (by - ay) * t;
        }
      }
      return path[path.length - 1][1];
    }

    // A 32px cursor drawn from the system's colour emoji.
    function emojiCursor(face: "up" | "down") {
      if (faceCursor[face]) return faceCursor[face]!;
      const c = document.createElement("canvas");
      c.width = 32;
      c.height = 32;
      const g = c.getContext("2d");
      if (!g) return "auto";
      g.textAlign = "center";
      g.textBaseline = "middle";
      g.font = '26px "Apple Color Emoji", "Segoe UI Emoji", "Noto Color Emoji", sans-serif';
      g.fillText(face === "up" ? "😃" : "😵", 16, 18);
      // without a colour emoji font nothing is drawn; keep the normal cursor then
      const px = g.getImageData(0, 0, 32, 32).data;
      let ink = 0;
      for (let i = 3; i < px.length; i += 4) ink += px[i];
      faceCursor[face] = ink > 0 ? `url(${c.toDataURL("image/png")}) 16 16, auto` : "auto";
      return faceCursor[face]!;
    }

    function setCursor(face: "up" | "down" | null) {
      if (face === cursorFace || !host) return;
      cursorFace = face;
      host.style.cursor = face ? emojiCursor(face) : "";
    }

    function baseYAt(x: number) {
      return pathYAt(base, x) * (1 - mode) + pathYAt(fall, x) * mode;
    }

    function draw(now: number) {
      if (!layout || !dots) return false;
      const { width, height, lens, ox, oy } = layout;
      const t = (now - start) / 1000;

      // the trajectory draws in just behind the landing dots, at an even pace
      const lineT = reduceMotion ? 1 : clamp01((t - DROP.delay - DROP.fall - DROP.jitter * 0.5) / DROP.sweep);
      const lineFront = ox + (width - ox + 20) * lineT;
      const flowAmp = reduceMotion ? 0 : 0.05 * smoothstep(t - INTRO_END + 0.2);

      // ease the pointer and the lens strength
      pointer.x += (pointer.tx - pointer.x) * 0.16;
      pointer.y += (pointer.ty - pointer.y) * 0.16;
      const lensTarget = reduceMotion ? 0 : pointer.ts * smoothstep((pointer.tx - (ox - 20)) / 120);
      pointer.s += (lensTarget - pointer.s) * 0.1;
      const lensOn = pointer.s > 0.003;

      // In the lower part of the fan (below the midway line between the rising and the
      // falling path) the trajectory turns downward; it rises again everywhere else.
      if (lensTarget > 0 && pointer.tx > ox + 30) {
        const mid = (pathYAt(base, pointer.tx) + pathYAt(fall, pointer.tx)) / 2;
        if (pointer.ty > mid + 12) wantFall = true;
        else if (pointer.ty < mid - 12) wantFall = false;
      } else if (lensTarget === 0) {
        wantFall = false;
      }
      const modeTarget = wantFall ? 1 : 0;
      mode += (modeTarget - mode) * 0.07;
      if (Math.abs(modeTarget - mode) < 0.001) mode = modeTarget;

      // steering: nudge the red line toward the pointer, gently and only within the cloud
      const maxSteer = width >= 1024 ? 130 : 70;
      let steerTarget = 0;
      if (lensTarget > 0 && pointer.tx > ox + 30) {
        const pull = pointer.ty - baseYAt(pointer.tx);
        steerTarget = Math.max(-maxSteer, Math.min(maxSteer, pull * 0.45)) * lensTarget;
      }
      pointer.steer += (steerTarget - pointer.steer) * 0.06;
      const reach = Math.max(ox + 60, pointer.x);
      const margin = 16;
      for (let i = 0; i < base.length; i++) {
        const bx = base[i][0];
        const by = base[i][1] * (1 - mode) + fall[i][1] * mode;
        const g = bx <= reach ? smoothstep((bx - ox) / (reach - ox)) : 1;
        let offset = pointer.steer * g;
        const c = Math.min(envTop.length - 1, Math.max(0, Math.round(bx / envStep)));
        const lo = Math.min(by, envTop[c] + margin) - by; // most negative offset allowed
        const hi = Math.max(by, envBot[c] - margin) - by; // most positive offset allowed
        offset = Math.max(lo, Math.min(hi, offset));
        steered[i][0] = bx;
        steered[i][1] = by + offset;
      }
      // smooth out any kinks left by the clamp
      for (let pass = 0; pass < 6; pass++) {
        for (let i = 1; i < steered.length - 1; i++) {
          steered[i][1] = (steered[i - 1][1] + 2 * steered[i][1] + steered[i + 1][1]) / 4;
        }
      }

      ctx!.clearRect(0, 0, width, height);

      // the probability cloud, bucketed by how strongly the pointer touches each dot
      const paths: Path2D[] = DOT_SHADES.map(() => new Path2D());
      const { x, y, r, j, h, count } = dots;
      const span = width - ox;
      const last = DOT_SHADES.length - 1;
      const intro = !reduceMotion && t < INTRO_END;
      for (let i = 0; i < count; i++) {
        let rad = r[i];
        let lift = 0;
        if (intro) {
          // each dot falls in from above, columns starting left to right
          const t0 = DROP.delay + DROP.sweep * clamp01((x[i] - ox) / span) + DROP.jitter * j[i];
          const p = (t - t0) / DROP.fall;
          if (p <= 0) continue;
          if (p < 1) {
            rad *= smoothstep(p / 0.25);
            lift = dropOffset(p) * DROP.height * (0.75 + 0.5 * h[i]);
          }
        }
        if (flowAmp > 0) rad *= 1 + flowAmp * Math.sin(Math.PI * 2 * (((x[i] - ox) / span) * 3.2 - t * 0.22));
        let px = x[i];
        let py = y[i] - lift;
        let shade = 0;
        if (lensOn) {
          const ddx = px - pointer.x;
          const ddy = py - pointer.y;
          if (ddx < lens && ddx > -lens && ddy < lens && ddy > -lens) {
            const dist = Math.hypot(ddx, ddy) || 1;
            const f = smoothstep(1 - dist / lens) * pointer.s;
            if (f > 0.01) {
              rad *= 1 + 0.3 * f;
              const push = 4 * f * (1 - f) * 2;
              px += (ddx / dist) * push;
              py += (ddy / dist) * push;
              shade = f > 0.6 ? last : f > 0.25 ? 1 : 0;
            }
          }
        }
        if (rad < 0.25) continue;
        const p = paths[shade];
        p.moveTo(px + rad, py);
        p.arc(px, py, rad, 0, Math.PI * 2);
      }
      for (let s = 0; s < paths.length; s++) {
        ctx!.fillStyle = DOT_SHADES[s];
        ctx!.fill(paths[s]);
      }

      // highlighted trajectory, drawn smoothly behind the landing dots
      if (lineFront > ox && steered.length > 1) {
        ctx!.save();
        ctx!.beginPath();
        ctx!.rect(0, 0, Math.max(0, lineFront), height);
        ctx!.clip();
        ctx!.lineCap = "round";
        ctx!.lineJoin = "round";
        ctx!.beginPath();
        ctx!.moveTo(steered[0][0], steered[0][1]);
        for (let i = 1; i < steered.length; i++) ctx!.lineTo(steered[i][0], steered[i][1]);
        const lw = Math.max(2.4, Math.min(3.6, layout.kx * 1.5));
        const steerGlow = Math.min(1, Math.abs(pointer.steer) / 60) * pointer.s * 0.7;
        // a clean white margin keeps the line apart from the dots, widening a little while steering
        ctx!.strokeStyle = "#ffffff";
        ctx!.lineWidth = lw + 5 + 5 * steerGlow;
        ctx!.stroke();
        ctx!.strokeStyle = red;
        ctx!.lineWidth = lw;
        ctx!.stroke();
        ctx!.restore();
      }

      // "today" marker
      // appears as the first dots land
      const markerIn = reduceMotion ? 1 : smoothstep((t - DROP.delay - DROP.fall * 0.8) / 0.45);
      ctx!.fillStyle = "#ffffff";
      ctx!.beginPath();
      ctx!.arc(ox, oy, 8 * markerIn, 0, Math.PI * 2);
      ctx!.fill();
      ctx!.fillStyle = INK;
      ctx!.beginPath();
      ctx!.arc(ox, oy, 4.4 * markerIn, 0, Math.PI * 2);
      ctx!.fill();
      ctx!.globalAlpha = 0.55 * markerIn;
      ctx!.font = "500 10px ui-monospace, SFMono-Regular, Menlo, monospace";
      if ("letterSpacing" in ctx!) {
        (ctx as CanvasRenderingContext2D & { letterSpacing: string }).letterSpacing = "1.6px";
      }
      ctx!.fillText("TODAY", ox - 4, oy + 26);
      ctx!.globalAlpha = 1;

      // over the cloud the cursor shows where the highlighted future is heading
      const overCloud =
        !reduceMotion && pointer.ts > 0 && pointer.tx >= ox - 8 && sample(pointer.tx, pointer.ty) >= 0.2;
      const rising = steered[steered.length - 1][1] < steered[0][1];
      setCursor(overCloud ? (rising ? "up" : "down") : null);

      const settling =
        mode !== modeTarget ||
        Math.abs(lensTarget - pointer.s) > 0.002 ||
        Math.abs(steerTarget - pointer.steer) > 0.3 ||
        Math.abs(pointer.tx - pointer.x) > 0.3 ||
        Math.abs(pointer.ty - pointer.y) > 0.3;
      return intro || lineT < 1 || settling || flowAmp > 0;
    }

    function frame(now: number) {
      raf = 0;
      const keep = draw(now);
      if (keep && visible && !document.hidden) {
        raf = requestAnimationFrame(frame);
      } else {
        running = false;
      }
    }

    function kick() {
      if (running || !visible) return;
      running = true;
      raf = requestAnimationFrame(frame);
    }

    function onPointerMove(event: PointerEvent) {
      const rect = canvas!.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const inside = x >= 0 && y >= 0 && x <= rect.width && y <= rect.height;
      if (inside && !pointer.has) {
        pointer.x = x;
        pointer.y = y;
        pointer.has = true;
      }
      pointer.tx = x;
      pointer.ty = y;
      pointer.ts = inside ? 1 : 0;
      kick();
    }

    function onPointerLeave() {
      pointer.ts = 0;
      pointer.has = false;
      kick();
    }

    let resizeTimer = 0;
    const resizeObserver = new ResizeObserver(() => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        build();
        draw(performance.now());
        kick();
      }, 60);
    });

    const visibility = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) kick();
    });

    const onVisibility = () => {
      if (!document.hidden) kick();
    };

    const image = new Image();
    image.decoding = "async";
    image.onload = () => {
      const off = document.createElement("canvas");
      off.width = image.naturalWidth;
      off.height = image.naturalHeight;
      const octx = off.getContext("2d", { willReadFrequently: true });
      if (!octx) return;
      octx.drawImage(image, 0, 0);
      const rgba = octx.getImageData(0, 0, off.width, off.height).data;
      const data = new Uint8Array(off.width * off.height);
      for (let i = 0; i < data.length; i++) data[i] = rgba[i * 4];
      map = { data, w: off.width, h: off.height };
      build();
      start = performance.now();
      kick();
    };
    image.src = MAP_SRC;

    resizeObserver.observe(wrap);
    // the copy block can reflow when web fonts arrive, which moves the origin
    const anchorEl = anchorSelector ? document.querySelector(anchorSelector) : null;
    if (anchorEl) resizeObserver.observe(anchorEl);
    visibility.observe(wrap);
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onPointerLeave);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(resizeTimer);
      resizeObserver.disconnect();
      visibility.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      document.documentElement.removeEventListener("pointerleave", onPointerLeave);
      document.removeEventListener("visibilitychange", onVisibility);
      if (host) host.style.cursor = "";
    };
  }, [anchorSelector]);

  return (
    <div
      ref={wrapRef}
      className={cn("pointer-events-none select-none", className)}
      role="img"
      aria-label="A fan of possible futures for AI spreading out from today, with one highlighted path rising upward. Pointing at the lower part of the fan turns the path downward."
    >
      <canvas ref={canvasRef} className="block h-full w-full" />
    </div>
  );
}
