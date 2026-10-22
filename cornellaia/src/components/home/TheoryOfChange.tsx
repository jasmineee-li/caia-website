"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import DotRows from "@/components/ui/DotRows";
import Section from "@/components/ui/Section";
import { HOME_CTA_ITEMS } from "@/content/home";
import { cn } from "@/lib/cn";

/*
 * Theory of change as one chart on grid paper. Four columns read left to right: Outreach,
 * Capacity Building, then Impact split into research and careers. On wide screens every
 * node is joined to every node in the next column by a faint curve. Like a forward pass
 * through a network, a red path runs left to right every few seconds, a new one each time,
 * and as it reaches a node part of the label flickers into code and settles back, as the
 * Research page title does. Now and then another node flickers on its own. Community runs
 * underneath the whole chart. On narrower screens the columns stack, joined by a red line
 * down the left. With reduced motion the chart holds still on one path.
 */

interface Node {
  label: string;
  href?: string;
}

interface Group {
  /** Heading shown above the column: the stage, or under Impact, the kind of work. */
  stage?: { n: string; title: string };
  sub?: string;
  nodes: Node[];
}

const GROUPS: Group[] = [
  {
    stage: { n: "01", title: "Outreach" },
    nodes: [
      { label: "Talks", href: "/events#events" },
      { label: "Discussions", href: "/events#events" },
      { label: "Workshops", href: "/events#events" },
    ],
  },
  {
    stage: { n: "02", title: "Capacity Building" },
    nodes: [
      { label: "CS 1998", href: "/programs/cs1998" },
      { label: "Technical reading group", href: "/join#technical-reading-group" },
      { label: "Policy reading group", href: "/join#policy-reading-group" },
      { label: "Self-study resources", href: "/resources" },
    ],
  },
  {
    stage: { n: "03", title: "Impact" },
    sub: "Research",
    nodes: [
      { label: "Research team", href: "/research#projects" },
      { label: "Fellowships", href: "/resources#opportunities" },
    ],
  },
  {
    sub: "Careers",
    nodes: [
      { label: "Frontier AI labs" },
      { label: "AI safety companies" },
      { label: "Non-profits" },
      { label: "Think tanks" },
      { label: "Government" },
    ],
  },
];

/** Underneath every stage. */
const COMMUNITY: Node[] = [
  { label: "Socials", href: "/events#events" },
  { label: "Slack", href: HOME_CTA_ITEMS[0].href },
];

/** The path shown first, and the only one with reduced motion: one node per column, by index. */
const FIRST_PATH = [2, 1, 0, 2];

// Timing in ms: the path takes STEP to cross from one column to the next, then holds.
const STEP = 520;
const HOLD = 2300;
const CYCLE = STEP * (GROUPS.length - 1) + HOLD;
// A scrambled stretch of text: how long it stays as code, then how far apart its letters settle.
const SCRAMBLE_HOLD = 260;
const SCRAMBLE_STEP = 70;
const FLICKER = 55;
const GLYPHS = "{}[]<>/\\|=+*#%$&@01xX_~^?";

const PALE = "#c3cfe2";
const RED = "var(--red, #b31b1b)";

interface Scramble {
  id: number;
  /** Character range of the label to scramble. */
  from: number;
  to: number;
}

function randomGlyph() {
  return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
}

/** A word, or for a long word a stretch of three to five of its letters. */
function pickStretch(label: string): [number, number] {
  const words: Array<[number, number]> = [];
  label.replace(/[^\s]+/g, (w, at: number) => {
    words.push([at, at + w.length]);
    return w;
  });
  const [a, b] = words[Math.floor(Math.random() * words.length)];
  const len = b - a;
  if (len <= 6 || Math.random() < 0.4) return [a, b];
  const n = 3 + Math.floor(Math.random() * 3);
  const start = a + Math.floor(Math.random() * (len - n + 1));
  return [start, start + n];
}

/** The label, with one stretch flickering through code glyphs before settling from the left. */
function ScrambledLabel({ label, scramble }: { label: string; scramble?: Scramble }) {
  const [state, setState] = useState<{ glyphs: string; settled: number } | null>(null);

  useEffect(() => {
    if (!scramble) return;
    const n = scramble.to - scramble.from;
    const total = SCRAMBLE_HOLD + SCRAMBLE_STEP * n;
    const start = performance.now();
    let last = 0;
    let raf = 0;
    const tick = (now: number) => {
      const t = now - start;
      if (t >= total) {
        setState(null);
        return;
      }
      const settled = Math.max(0, Math.floor((t - SCRAMBLE_HOLD) / SCRAMBLE_STEP) + 1);
      if (now - last >= FLICKER) {
        last = now;
        setState({ glyphs: Array.from({ length: n }, randomGlyph).join(""), settled });
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [scramble]);

  if (!scramble || !state) return <span>{label}</span>;
  const stretch = label.slice(scramble.from, scramble.to);
  return (
    <span>
      {label.slice(0, scramble.from)}
      {/* The real letters keep their width while the code is drawn over them. */}
      <span className="relative inline-block">
        <span className="invisible">{stretch}</span>
        <span aria-hidden="true" className="absolute inset-0 overflow-hidden whitespace-nowrap">
          {stretch.slice(0, state.settled)}
          <span className="font-mono text-[0.92em] text-blue">{state.glyphs.slice(state.settled)}</span>
        </span>
      </span>
      {label.slice(scramble.to)}
    </span>
  );
}

function NodePill({ node, red, scramble }: { node: Node; red: boolean; scramble?: Scramble }) {
  const inner = (
    <>
      <span
        aria-hidden="true"
        className={cn("h-[7px] w-[7px] shrink-0 rounded-full transition-colors duration-200", red ? "bg-brand-red" : "bg-blue")}
      />
      <span className="sr-only">{node.label}</span>
      <span aria-hidden="true">
        <ScrambledLabel label={node.label} scramble={scramble} />
      </span>
    </>
  );
  const cls =
    "inline-flex items-center gap-2.5 whitespace-nowrap rounded-full bg-white px-3.5 py-2 text-[0.9375rem] leading-5 text-ink ring-1 ring-inset ring-slate-300";
  if (!node.href) return <span className={cls}>{inner}</span>;
  const linked = cn(cls, "focus-ring transition-[box-shadow,color] hover:text-blue hover:ring-blue");
  return node.href.startsWith("http") ? (
    <a href={node.href} target="_blank" rel="noopener noreferrer" className={linked}>
      {inner}
    </a>
  ) : (
    <Link href={node.href} className={linked}>
      {inner}
    </Link>
  );
}

/** A random path through the columns, different from the last one. */
function nextPath(prev: number[]) {
  let path = prev;
  while (path.every((v, g) => v === prev[g])) {
    path = GROUPS.map((group) => Math.floor(Math.random() * group.nodes.length));
  }
  return path;
}

export default function TheoryOfChange() {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const nodeRefs = useRef<Array<Array<HTMLElement | null>>>(GROUPS.map(() => []));
  const [curves, setCurves] = useState<Record<string, string>>({});
  const [size, setSize] = useState({ w: 0, h: 0 });
  // The current path, which forward pass this is (so its red curves redraw), and how many
  // columns the pass has reached so far.
  const [path, setPath] = useState(FIRST_PATH);
  const [pass, setPass] = useState(0);
  const [reached, setReached] = useState(GROUPS.length);
  const [scrambles, setScrambles] = useState<Record<string, Scramble>>({});

  // Measure every curve between neighbouring columns, from the right edge of one pill to the left edge of the next.
  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const wide = window.matchMedia("(min-width: 1024px)");

    const measure = () => {
      const box = wrap.getBoundingClientRect();
      setSize({ w: box.width, h: box.height });
      if (!wide.matches) {
        setCurves({});
        return;
      }
      const at = nodeRefs.current.map((group) =>
        group.map((el) => {
          const r = el?.getBoundingClientRect();
          return r ? { l: r.left - box.left, r: r.right - box.left, y: r.top + r.height / 2 - box.top } : null;
        }),
      );
      const out: Record<string, string> = {};
      for (let g = 0; g < at.length - 1; g++) {
        at[g].forEach((a, i) => {
          at[g + 1].forEach((b, j) => {
            if (!a || !b) return;
            const dx = (b.l - a.r) / 2;
            out[`${g}-${i}-${j}`] = `M${a.r} ${a.y} C${a.r + dx} ${a.y} ${b.l - dx} ${b.y} ${b.l} ${b.y}`;
          });
        });
      }
      setCurves(out);
    };

    measure();
    document.fonts?.ready.then(measure).catch(() => {});
    const ro = new ResizeObserver(measure);
    ro.observe(wrap);
    wide.addEventListener("change", measure);
    return () => {
      ro.disconnect();
      wide.removeEventListener("change", measure);
    };
  }, []);

  // Forward passes and stray flickers, only while the chart is on screen.
  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let timers: number[] = [];
    let cycle = 0;
    let current = FIRST_PATH;
    let nextId = 1;
    const later = (ms: number, fn: () => void) => timers.push(window.setTimeout(fn, ms));
    const scrambleNode = (g: number, i: number) => {
      const [from, to] = pickStretch(GROUPS[g].nodes[i].label);
      const id = nextId++;
      setScrambles((s) => ({ ...s, [`${g}-${i}`]: { id, from, to } }));
    };

    const runPass = () => {
      current = cycle === 0 ? FIRST_PATH : nextPath(current);
      cycle += 1;
      setPath(current);
      setPass(cycle);
      setReached(1);
      scrambleNode(0, current[0]);
      for (let g = 1; g < GROUPS.length; g++) {
        later(STEP * g, () => {
          setReached(g + 1);
          scrambleNode(g, current[g]);
        });
      }
      later(CYCLE, runPass);
      // One or two other nodes flicker on their own during the hold.
      const strays = 1 + Math.floor(Math.random() * 2);
      for (let k = 0; k < strays; k++) {
        later(STEP * GROUPS.length + Math.random() * (HOLD - 600), () => {
          const g = Math.floor(Math.random() * GROUPS.length);
          const i = Math.floor(Math.random() * GROUPS[g].nodes.length);
          if (current[g] !== i) scrambleNode(g, i);
        });
      }
    };

    const stop = () => {
      timers.forEach(clearTimeout);
      timers = [];
    };
    const io = new IntersectionObserver(
      ([entry]) => {
        stop();
        if (entry.isIntersecting) later(400, runPass);
      },
      { threshold: 0.35 },
    );
    io.observe(wrap);
    return () => {
      io.disconnect();
      stop();
    };
  }, []);

  const lit = (g: number, i: number) => path[g] === i && reached > g;

  return (
    <Section id="theory-of-change" eyebrow="Theory of Change">
      <div ref={wrapRef} className="grid-paper relative overflow-hidden rounded-[8px] ring-1 ring-inset ring-grid">
        <svg aria-hidden="true" className="pointer-events-none absolute inset-0 hidden lg:block" width={size.w} height={size.h}>
          {Object.entries(curves).map(([key, d]) => (
            <path key={key} d={d} fill="none" stroke={PALE} strokeWidth={1} />
          ))}
          {/* The red path draws itself one column at a time, starting over with each pass. */}
          {path.slice(0, -1).map((i, g) => {
            const d = curves[`${g}-${i}-${path[g + 1]}`];
            if (!d) return null;
            return (
              <path
                key={`${pass}-${g}`}
                d={d}
                fill="none"
                stroke={RED}
                strokeWidth={1.75}
                pathLength={1}
                strokeDasharray="1"
                style={pass > 0 ? { animation: `toc-draw ${STEP}ms ease-in-out ${STEP * g}ms both` } : undefined}
              />
            );
          })}
        </svg>

        <div className="relative grid gap-y-10 px-5 pb-10 pt-8 sm:px-8 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.15fr)_minmax(0,0.85fr)_minmax(0,1fr)] lg:gap-x-12 lg:gap-y-0 lg:px-10 lg:pb-12 lg:pt-10 xl:gap-x-16">
          {/* Phones and tablets: a red line down the left joins the stacked stages. */}
          <span aria-hidden="true" className="absolute bottom-24 left-5 top-12 w-px bg-brand-red sm:left-8 lg:hidden" />

          {GROUPS.map((group, g) => (
            <div key={g} className={cn("relative flex flex-col pl-6 lg:pl-0", g === 3 && "-mt-6 lg:mt-0")}>
              {/* Stage heading, or a blank of the same height under Impact's second column. */}
              <div className={cn("lg:min-h-[4.75rem]", !group.stage && "hidden lg:block")}>
                {group.stage && (
                  <>
                    <span aria-hidden="true" className="absolute -left-[3.5px] top-[5px] h-2 w-2 rounded-full bg-brand-red lg:hidden" />
                    <p className="mono-label text-brand-red">{group.stage.n}</p>
                    {/* On wide screens a long heading may run into the gap beside it. */}
                    <h3 className="display-title mt-2 text-[1.625rem] leading-none sm:text-[1.875rem] lg:![text-wrap:nowrap]">
                      {group.stage.title}
                    </h3>
                  </>
                )}
              </div>
              <div className="mt-5 flex flex-1 flex-col lg:mt-0 lg:justify-center">
                {group.sub && <p className="mono-caption mb-3 text-ink-2">{group.sub}</p>}
                <ul className="flex flex-wrap gap-2 lg:flex-col lg:flex-nowrap lg:items-start lg:gap-3">
                  {group.nodes.map((node, i) => (
                    <li
                      key={node.label}
                      ref={(el) => {
                        nodeRefs.current[g][i] = el;
                      }}
                      className="w-fit"
                    >
                      <NodePill node={node} red={lit(g, i)} scramble={scrambles[`${g}-${i}`]} />
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Community: the ground the whole chart stands on. */}
        <div className="relative border-t border-grid bg-white/80">
          <div className="flex flex-col gap-4 px-5 pt-6 sm:flex-row sm:items-center sm:gap-6 sm:px-8 lg:px-10">
            <div className="flex items-center gap-4">
              <p className="mono-label text-brand-red">04</p>
              <h3 className="display-title text-[1.625rem] leading-none sm:text-[1.875rem]">Community</h3>
            </div>
            <ul className="flex flex-wrap gap-2">
              {COMMUNITY.map((node) => (
                <li key={node.label}>
                  <NodePill node={node} red={false} />
                </li>
              ))}
            </ul>
          </div>
          <DotRows rows={3} className="mt-5" />
        </div>
      </div>
    </Section>
  );
}
