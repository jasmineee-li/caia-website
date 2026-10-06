"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Container from "@/components/ui/Container";
import styles from "./CommunityPath.module.css";

/*
 * Engage / Upskill / Research, joined by a red path drawn just below the text.
 * Each column's copy is shorter than the last, so a curve fitted under the text
 * rises on its own, accelerating like the hero trajectory.
 */

const STEPS = [
  {
    n: "01",
    title: "Engage",
    body: (
      <>
        We invite everyone to explore how AI can serve people and help build a better future. Our{" "}
        <Link href="/events#events">talks and discussions</Link> bring the Cornell community into that
        conversation, regardless of your background.
      </>
    ),
  },
  {
    n: "02",
    title: "Upskill",
    body: (
      <>
        Learn technical AI safety and governance through <Link href="/programs/cs1998">CS 1998</Link>,
        reading groups, and workshops. Our <Link href="/resources">resources</Link> include courses and
        readings for independent study.
      </>
    ),
  },
  {
    n: "03",
    title: "Research",
    body: (
      <>
        We help members find <Link href="/research">research collaborators</Link>, mentors, and{" "}
        <Link href="/resources#opportunities">fellowships</Link> to work on technical AI safety and policy.
      </>
    ),
  },
];

const INK = "#0f172a";
const REVEAL_DELAY = 0.3; // seconds before the line (and the first step) starts
const REVEAL_DURATION = 1.6; // seconds for the line to cross all three steps

function clamp01(t: number) {
  return Math.min(1, Math.max(0, t));
}
function easeInOut(t: number) {
  const c = clamp01(t);
  return c < 0.5 ? 4 * c * c * c : 1 - Math.pow(-2 * c + 2, 3) / 2;
}


// Step marks: one block, two blocks, three blocks in light tints of the paper preview
// art's pale blue (#86B7F3 up to #C7DEF9), stacking up and to the right like the line.
// Each block is [x, y, size, radius, fill] in a 32-unit box.
type Block = readonly [x: number, y: number, size: number, r: number, fill: string];

const STEP_BLOCKS: Block[][] = [
  [[5, 5, 22, 3, "#9FC5F5"]],
  [
    [1, 17, 14, 2, "#B6D3F8"],
    [17, 1, 14, 2, "#86B7F3"],
  ],
  [
    [1, 17, 14, 2, "#C7DEF9"],
    [17, 17, 14, 2, "#9FC5F5"],
    [17, 1, 14, 2, "#86B7F3"],
  ],
];

function StepBlocks({ index }: { index: number }) {
  return (
    <svg className={styles.icon} viewBox="0 0 32 32" aria-hidden="true">
      {STEP_BLOCKS[index].map(([x, y, size, r, fill], k) => (
        <rect key={k} x={x} y={y} width={size} height={size} rx={r} fill={fill} />
      ))}
    </svg>
  );
}

/*
 * Phones: the same rising line with three open circles on it. Tapping one fills it red
 * and shows that step (its blocks, title and description) under the line, in a slot
 * sized to the tallest step, so Community below never moves.
 */
function MobilePath() {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const selectedRef = useRef(0);
  const kickRef = useRef<() => void>(() => {});
  const [selected, setSelected] = useState(0);
  const [marks, setMarks] = useState<Array<[number, number]>>([]);

  const choose = (i: number) => {
    selectedRef.current = i;
    setSelected(i);
    kickRef.current();
  };

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const red =
      getComputedStyle(document.documentElement).getPropertyValue("--color-brand-red").trim() || "#b31b1b";

    let W = 0;
    let H = 0;
    let curve: Array<[number, number]> = [];
    let curveLen = 0;
    let markers: Array<[number, number]> = [];
    const weights = [1, 0, 0];
    let started = false;
    let start = 0;
    let raf = 0;
    let running = false;

    function layout() {
      const rect = wrap!.getBoundingClientRect();
      W = Math.max(1, rect.width);
      H = Math.max(1, rect.height);
      if (W < 2) return;
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      canvas!.width = Math.round(W * dpr);
      canvas!.height = Math.round(H * dpr);
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      const K = 1.8;
      const shape = (x: number) => (Math.exp((K * x) / W) - 1) / (Math.exp(K) - 1);
      const y0 = H - 16;
      const amp = y0 - 14;
      const yAt = (x: number) => y0 - amp * shape(x);
      curve = [];
      for (let x = 10; x <= W - 2; x += 4) curve.push([x, yAt(x)]);
      curve.push([W - 2, yAt(W - 2)]);
      curveLen = 0;
      for (let i = 1; i < curve.length; i++) {
        curveLen += Math.hypot(curve[i][0] - curve[i - 1][0], curve[i][1] - curve[i - 1][1]);
      }
      // three evenly spaced circles, centred on the line as a group
      const gap = W / 3 - 6;
      markers = [W / 2 - gap, W / 2, W / 2 + gap].map((x) => [x, yAt(x)] as [number, number]);
      setMarks(markers.map(([x, y]) => [x, y]));
    }

    function draw(now: number) {
      ctx!.clearRect(0, 0, W, H);
      if (curve.length < 2) return false;
      const t = started ? (now - start) / 1000 : 0;
      const reveal = reduceMotion ? 1 : started ? easeInOut(t / 1.0) : 0;
      let settling = false;
      for (let c = 0; c < 3; c++) {
        const target = selectedRef.current === c ? 1 : 0;
        weights[c] += (target - weights[c]) * 0.16;
        if (Math.abs(target - weights[c]) > 0.004) settling = true;
      }
      ctx!.save();
      ctx!.lineCap = "round";
      ctx!.setLineDash([curveLen * reveal, curveLen]);
      ctx!.beginPath();
      curve.forEach(([x, y], k) => (k ? ctx!.lineTo(x, y) : ctx!.moveTo(x, y)));
      ctx!.strokeStyle = red;
      ctx!.lineWidth = 2.2;
      ctx!.stroke();
      ctx!.restore();
      const frontX = curve[Math.min(curve.length - 1, Math.floor(reveal * (curve.length - 1)))][0];
      markers.forEach(([mx, my], c) => {
        if (mx > frontX + 1 && reveal < 1) return;
        // an open ink circle; the selected step fills in red
        const w = weights[c];
        const r = 6 + 0.8 * w;
        ctx!.fillStyle = "#ffffff";
        ctx!.beginPath();
        ctx!.arc(mx, my, r + 3, 0, Math.PI * 2);
        ctx!.fill();
        ctx!.lineWidth = 2;
        ctx!.strokeStyle = INK;
        ctx!.beginPath();
        ctx!.arc(mx, my, r - 1, 0, Math.PI * 2);
        ctx!.stroke();
        if (w > 0.01) {
          ctx!.globalAlpha = w;
          ctx!.fillStyle = red;
          ctx!.beginPath();
          ctx!.arc(mx, my, r, 0, Math.PI * 2);
          ctx!.fill();
          ctx!.globalAlpha = 1;
        }
      });
      return (started && !reduceMotion && t < 1.5) || settling;
    }

    function frame(now: number) {
      raf = 0;
      if (draw(now)) raf = requestAnimationFrame(frame);
      else running = false;
    }
    function kick() {
      if (running) return;
      running = true;
      raf = requestAnimationFrame(frame);
    }
    kickRef.current = kick;

    if (!reduceMotion) wrap.setAttribute("data-pending", "");
    const ro = new ResizeObserver(() => {
      layout();
      draw(performance.now());
    });
    ro.observe(wrap);
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          started = true;
          start = performance.now();
          kick();
        }
      },
      { threshold: 0.5 },
    );
    io.observe(wrap);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      kickRef.current = () => {};
    };
  }, []);

  return (
    <div className={styles.mobile}>
      <div ref={wrapRef} className={styles.mBand}>
        <canvas ref={canvasRef} className={styles.canvas} aria-hidden="true" />
        {STEPS.map((step, i) => (
          <button
            key={step.n}
            type="button"
            className={styles.mDot}
            style={marks[i] ? { left: marks[i][0], top: marks[i][1] } : { visibility: "hidden" }}
            aria-label={step.title}
            aria-pressed={selected === i}
            aria-controls={`step-panel-${i}`}
            onClick={() => choose(i)}
          />
        ))}
      </div>
      <div className={styles.mDesc} aria-live="polite">
        {STEPS.map((step, i) => (
          <div
            key={step.n}
            id={`step-panel-${i}`}
            className={styles.mItem}
            data-on={selected === i ? "" : undefined}
            aria-hidden={selected !== i}
            inert={selected !== i}
          >
            <div className={styles.heading}>
              <StepBlocks index={i} />
              <h3 className={styles.title}>{step.title}</h3>
            </div>
            <p className={styles.mCopy}>{step.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function CommunityPath() {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const copyRefs = useRef<Array<HTMLParagraphElement | null>>([]);
  const stepRefs = useRef<Array<HTMLElement | null>>([]);
  const activeRef = useRef<number | null>(null);
  const kickRef = useRef<() => void>(() => {});
  const communityRef = useRef<HTMLDivElement | null>(null);
  const communityTitleRef = useRef<HTMLHeadingElement | null>(null);
  const communityCopyRef = useRef<HTMLParagraphElement | null>(null);
  const [active, setActive] = useState<number | null>(null);

  const setStep = (i: number | null) => {
    activeRef.current = i;
    setActive(i);
    kickRef.current();
  };

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const red =
      getComputedStyle(document.documentElement).getPropertyValue("--color-brand-red").trim() || "#b31b1b";

    let W = 0;
    let H = 0;
    let enabled = false;
    let markers: Array<[number, number]> = [];
    let curve: Array<[number, number]> = [];
    let curveLen = 0;
    const weights = [0, 0, 0];
    let started = false;
    let start = 0;
    let raf = 0;
    let running = false;

    function layout() {
      const rect = wrap!.getBoundingClientRect();
      W = Math.max(1, rect.width);
      H = Math.max(1, rect.height);
      // phones get their own layout (MobilePath), so this canvas is tablet and up only
      enabled = window.matchMedia("(min-width: 768px)").matches;
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      canvas!.width = Math.round(W * dpr);
      canvas!.height = Math.round(H * dpr);
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (!enabled) return;

      // Skyline of the copy: for each x, the lowest line of text above it.
      const STEP = 4;
      const n = Math.ceil(W / STEP) + 1;
      const sky = new Float32Array(n).fill(-Infinity);
      const colLeft: number[] = [];
      copyRefs.current.forEach((el, i) => {
        if (!el) return;
        const elRect = el.getBoundingClientRect();
        colLeft[i] = i === 0 ? 6 : elRect.left - rect.left;
        // a step may still be sliding in; measure where its text will come to rest
        let restTop = 0;
        for (let node: HTMLElement | null = el; node && node !== wrap; node = node.offsetParent as HTMLElement | null) {
          restTop += node.offsetTop;
        }
        const drift = elRect.top - rect.top - restTop;
        const range = document.createRange();
        range.selectNodeContents(el);
        for (const r of Array.from(range.getClientRects())) {
          // pad each line sideways so the path never brushes past the end of a line
          const x0 = Math.max(0, Math.floor((r.left - rect.left - 28) / STEP));
          const x1 = Math.min(n - 1, Math.ceil((r.right - rect.left + 28) / STEP));
          const bottom = r.bottom - rect.top - drift;
          for (let k = x0; k <= x1; k++) if (bottom > sky[k]) sky[k] = bottom;
        }
      });

      // An accelerating curve, like the hero, fitted to hug the text from below.
      const K = 1.8;
      const shape = (x: number) => (Math.exp((K * x) / W) - 1) / (Math.exp(K) - 1);
      const CLEAR = 30;
      let best = { a: 0, y0: H - 16, gap: Infinity };
      for (let amp = 0; amp <= 220; amp += 2) {
        let y0 = -Infinity;
        for (let k = 0; k < n; k++) {
          if (sky[k] === -Infinity) continue;
          y0 = Math.max(y0, sky[k] + CLEAR + amp * shape(k * STEP));
        }
        if (y0 === -Infinity || y0 > H - 14 || y0 - amp < 16) continue;
        let gap = 0;
        let count = 0;
        for (let k = 0; k < n; k++) {
          if (sky[k] === -Infinity) continue;
          gap += y0 - amp * shape(k * STEP) - sky[k];
          count++;
        }
        gap /= count;
        if (gap < best.gap) best = { a: amp, y0, gap };
      }
      const yAt = (x: number) => best.y0 - best.a * shape(x);

      curve = [];
      for (let x = 6; x <= W - 2; x += STEP) curve.push([x, yAt(x)]);
      curve.push([W - 2, yAt(W - 2)]);
      markers = [0, 1, 2].map((i) => {
        const x = colLeft[i] ?? (i * W) / 3;
        return [x, yAt(x)] as [number, number];
      });
      curveLen = 0;
      for (let i = 1; i < curve.length; i++) {
        curveLen += Math.hypot(curve[i][0] - curve[i - 1][0], curve[i][1] - curve[i - 1][1]);
      }
      liftCommunity(yAt);
    }

    // Pull the Community block up under the rising line: its paragraph (columns 2 and 3)
    // starts a fixed distance below the line, and the title (column 1) sits on the same
    // bottom edge, below the lowest stretch of the line.
    function liftCommunity(yAt: (x: number) => number) {
      const block = communityRef.current;
      const para = communityCopyRef.current;
      const title = communityTitleRef.current;
      if (!block || !para || !title) return;
      block.style.marginTop = "";
      if (!enabled) return;
      const frameRect = wrap!.getBoundingClientRect();
      const paraRect = para.getBoundingClientRect();
      const titleRect = title.getBoundingClientRect();
      const paraTop = paraRect.top - frameRect.top; // current, relative to the frame
      const SPACE = 44;
      const paraLeft = paraRect.left - frameRect.left;
      const wantParaTop = Math.max(yAt(paraLeft), yAt(paraRect.right - frameRect.left)) + SPACE;
      const titleTopOffset = titleRect.top - paraRect.top; // stays fixed when the block moves
      const titleRight = titleRect.right - frameRect.left;
      let lineOverTitle = -Infinity;
      for (let x = 6; x <= titleRight + 24; x += 8) lineOverTitle = Math.max(lineOverTitle, yAt(x));
      const minParaTopForTitle = lineOverTitle + SPACE - titleTopOffset;
      const target = Math.max(wantParaTop, minParaTopForTitle);
      const lift = Math.max(0, paraTop - target);
      const base = parseFloat(getComputedStyle(block).marginTop) || 0;
      block.style.marginTop = `${base - lift}px`;
    }

    function draw(now: number) {
      ctx!.clearRect(0, 0, W, H);
      if (!enabled || curve.length < 2) return false;
      const t = started ? (now - start) / 1000 : 0;
      // a short beat before the first step, then a brisk draw across the three
      const reveal = reduceMotion ? 1 : started ? easeInOut((t - REVEAL_DELAY) / REVEAL_DURATION) : 0;

      let settling = false;
      for (let c = 0; c < 3; c++) {
        const target = activeRef.current === c ? 1 : 0;
        weights[c] += (target - weights[c]) * 0.14;
        if (Math.abs(target - weights[c]) > 0.004) settling = true;
      }

      // the line
      ctx!.save();
      ctx!.lineCap = "round";
      ctx!.lineJoin = "round";
      ctx!.setLineDash([curveLen * reveal, curveLen]);
      ctx!.beginPath();
      curve.forEach(([x, y], k) => (k ? ctx!.lineTo(x, y) : ctx!.moveTo(x, y)));
      ctx!.strokeStyle = red;
      ctx!.lineWidth = 2.4;
      ctx!.stroke();
      ctx!.restore();

      // markers appear as the line reaches them
      const frontX = curve[Math.min(curve.length - 1, Math.floor(reveal * (curve.length - 1)))][0];
      markers.forEach(([mx, my], c) => {
        if (reveal <= 0 || (mx > frontX + 1 && reveal < 1)) return;
        showStep(c);
        const w = weights[c];
        ctx!.fillStyle = "#ffffff";
        ctx!.beginPath();
        ctx!.arc(mx, my, 8 + 1.5 * w, 0, Math.PI * 2);
        ctx!.fill();
        ctx!.fillStyle = w > 0.5 ? red : INK;
        ctx!.beginPath();
        ctx!.arc(mx, my, 4.5 + 0.9 * w, 0, Math.PI * 2);
        ctx!.fill();
      });

      return (started && !reduceMotion && t < REVEAL_DELAY + REVEAL_DURATION + 0.1) || settling;
    }

    function showStep(i: number) {
      const el = stepRefs.current[i];
      if (el && !el.hasAttribute("data-shown")) el.setAttribute("data-shown", "");
    }

    // Steps start hidden (JS only) and appear one by one as the line reaches them.
    if (!reduceMotion) wrap.setAttribute("data-pending", "");

    function frame(now: number) {
      raf = 0;
      if (draw(now)) raf = requestAnimationFrame(frame);
      else running = false;
    }
    function kick() {
      if (running) return;
      running = true;
      raf = requestAnimationFrame(frame);
    }
    kickRef.current = kick;

    const refresh = () => {
      layout();
      draw(performance.now());
    };
    const ro = new ResizeObserver(refresh);
    ro.observe(wrap);
    copyRefs.current.forEach((el) => el && ro.observe(el));
    document.fonts?.ready.then(refresh).catch(() => {});

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          started = true;
          start = performance.now();
          kick();
        }
      },
      { threshold: 0.4 },
    );
    io.observe(wrap);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      kickRef.current = () => {};
    };
  }, []);

  return (
    <section className={styles.root} aria-label="How to get involved">
      <Container>
        <div ref={wrapRef} className={styles.frame}>
          <canvas ref={canvasRef} className={styles.canvas} aria-hidden="true" />
          <div className={styles.steps}>
            {STEPS.map((step, i) => (
              <article
                key={step.n}
                ref={(el) => {
                  stepRefs.current[i] = el;
                }}
                className={styles.step}
                data-active={active === i ? "" : undefined}
                onPointerEnter={() => setStep(i)}
                onPointerLeave={() => setStep(null)}
                onFocus={() => setStep(i)}
                onBlur={() => setStep(null)}
              >
                <div className={styles.heading}>
                  <StepBlocks index={i} />
                  <h2 className={styles.title}>{step.title}</h2>
                </div>
                <p
                  className={styles.copy}
                  ref={(el) => {
                    copyRefs.current[i] = el;
                  }}
                >
                  {step.body}
                </p>
              </article>
            ))}
          </div>
        </div>

        <MobilePath />

        <div ref={communityRef} className={styles.community}>
          <div className={styles.communityHeading}>
            <h2 ref={communityTitleRef} className={styles.communityTitle}>
              Community
            </h2>
            <Image
              className={styles.communityFigures}
              src="/graphics/community-people-light.png"
              width={2079}
              height={756}
              alt=""
            />
          </div>
          <p ref={communityCopyRef} className={styles.communityCopy}>
            Above all, we aim to build trust and community where people exchange ideas, challenge each
            other’s thinking, and work together to make AI go well. We welcome questions, perspectives from
            all backgrounds, and great conversations, both in our discussions and at our{" "}
            <Link href="/events#events">socials</Link>.
          </p>
        </div>
      </Container>
    </section>
  );
}
