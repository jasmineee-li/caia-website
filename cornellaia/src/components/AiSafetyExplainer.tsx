"use client";

import { CSSProperties, useCallback, useEffect, useRef, useState } from "react";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import { AI_SAFETY_SLIDES, AI_SAFETY_SOURCE } from "@/content/home";
import { cn } from "@/lib/cn";
import styles from "./AiSafetyExplainer.module.css";

/**
 * "What is AI Safety?" as a two-slide deck.
 *
 * On large screens the section pins under the site header and scrolling plays the deck:
 * each slide's words light up in reading order, then the next slide slides in. On phones,
 * short windows, and with reduced motion, the slides are two stacked cards, and the words
 * light up as the text passes the reading line.
 */

const SLIDES = AI_SAFETY_SLIDES;
const COUNT = SLIDES.length;
/** Share of each slide's scroll span spent lighting up words; the rest holds the full slide. */
const REVEAL = 0.78;
const PINNED_QUERY = "(min-width: 1024px) and (min-height: 600px) and (prefers-reduced-motion: no-preference)";

const clamp01 = (value: number) => Math.min(1, Math.max(0, value));
const pad = (index: number) => String(index + 1).padStart(2, "0");

type Mode = "stack" | "pinned";

export default function AiSafetyExplainer() {
  const rootRef = useRef<HTMLElement | null>(null);
  const textRefs = useRef<(HTMLParagraphElement | null)[]>([]);
  const slideRefs = useRef<(HTMLElement | null)[]>([]);
  const [mode, setMode] = useState<Mode>("stack");
  const [active, setActive] = useState(0);
  // Server render: every slide fully shown, links included.
  const [done, setDone] = useState<boolean[]>(() => SLIDES.map(() => true));

  const headerHeight = () => document.querySelector<HTMLElement>("header.sticky")?.offsetHeight ?? 0;

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const pinnedQuery = window.matchMedia(PINNED_QUERY);
    const reducedQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let currentMode: Mode = "stack";
    let frame = 0;

    const update = () => {
      frame = 0;
      const vh = window.innerHeight;
      let progress: number[];

      if (reducedQuery.matches) {
        progress = SLIDES.map(() => 1);
      } else if (currentMode === "pinned") {
        const header = headerHeight();
        const rect = root.getBoundingClientRect();
        const distance = rect.height - (vh - header);
        const p = distance > 0 ? clamp01((header - rect.top) / distance) : 0;
        progress = SLIDES.map((_, index) => clamp01((p * COUNT - index) / REVEAL));
        setActive(Math.min(COUNT - 1, Math.floor(p * COUNT)));
      } else {
        // Each word lights up as it reaches ~80% of the way down the window.
        progress = SLIDES.map((_, index) => {
          const text = textRefs.current[index];
          if (!text) return 1;
          const rect = text.getBoundingClientRect();
          return clamp01((vh * 0.8 - rect.top) / Math.max(rect.height, 1));
        });
      }

      progress.forEach((value, index) => root.style.setProperty(`--p${index}`, value.toFixed(4)));
      setDone((previous) => {
        const next = progress.map((value) => value > 0.92);
        return next.every((value, index) => value === previous[index]) ? previous : next;
      });
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    const applyMode = () => {
      currentMode = pinnedQuery.matches ? "pinned" : "stack";
      root.style.setProperty("--header-h", `${headerHeight()}px`);
      setMode(currentMode);
      schedule();
    };

    applyMode();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", applyMode);
    pinnedQuery.addEventListener("change", applyMode);
    reducedQuery.addEventListener("change", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", applyMode);
      pinnedQuery.removeEventListener("change", applyMode);
      reducedQuery.removeEventListener("change", schedule);
    };
  }, []);

  /** Scrolls to the point where slide `index` is fully shown. */
  const goTo = useCallback(
    (index: number) => {
      const root = rootRef.current;
      if (!root) return;
      if (mode !== "pinned") {
        slideRefs.current[index]?.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }
      const header = headerHeight();
      const rect = root.getBoundingClientRect();
      const distance = rect.height - (window.innerHeight - header);
      const target = window.scrollY + rect.top - header + (distance * (index + REVEAL + 0.04)) / COUNT;
      window.scrollTo({ top: Math.round(target), behavior: "smooth" });
    },
    [mode],
  );

  const pinned = mode === "pinned";

  return (
    <section
      ref={rootRef}
      id="what-is-ai-safety"
      aria-labelledby="ai-safety-title"
      className={cn(styles.root, pinned && styles.pinned)}
    >
      <div className={styles.panel}>
        <Container>
          <div className={styles.head}>
            <h2 id="ai-safety-title" className="display-title text-3xl sm:text-4xl">
              What is AI Safety?
            </h2>
            <ol className={styles.nav} aria-label="Slides">
              {SLIDES.map((slide, index) => (
                <li key={slide.id}>
                  <button
                    type="button"
                    tabIndex={pinned ? undefined : -1}
                    onClick={() => goTo(index)}
                    aria-current={pinned && active === index ? "step" : undefined}
                    className={cn(styles.navItem, active === index && styles.navActive)}
                    style={{ "--p": `var(--p${index}, 1)` } as CSSProperties}
                  >
                    <span className={styles.navText}>
                      <span className={styles.navNum}>{pad(index)}</span>
                      {slide.label}
                    </span>
                    <span className={styles.navBar} aria-hidden="true" />
                  </button>
                </li>
              ))}
            </ol>
          </div>

          <div className={styles.stage}>
            {SLIDES.map((slide, index) => {
              const words = slide.body.split(" ");
              const state = !pinned ? undefined : index < active ? "before" : index > active ? "after" : "active";
              return (
                <article
                  key={slide.id}
                  id={slide.id}
                  ref={(node) => {
                    slideRefs.current[index] = node;
                  }}
                  className={cn(styles.slide, styles[`motif${index}`])}
                  data-state={state}
                  data-done={done[index] ? "" : undefined}
                  inert={pinned && index !== active}
                  aria-labelledby={`${slide.id}-label`}
                  style={{ "--p": `var(--p${index}, 1)`, "--n": words.length } as CSSProperties}
                >
                  <p id={`${slide.id}-label`} className={styles.kicker}>
                    <span className={styles.kickerNum}>{pad(index)}</span>
                    {slide.label}
                  </p>
                  <p
                    ref={(node) => {
                      textRefs.current[index] = node;
                    }}
                    className={styles.text}
                  >
                    <span className="sr-only">{slide.body}</span>
                    <span aria-hidden="true">
                      {words.map((word, wordIndex) => (
                        <span key={wordIndex}>
                          <span className={styles.word} style={{ "--i": wordIndex } as CSSProperties}>
                            {word}
                          </span>
                          {wordIndex < words.length - 1 ? " " : null}
                        </span>
                      ))}
                    </span>
                  </p>
                  <div className={styles.links}>
                    {slide.links.map((link) => (
                      <Button key={link.label} href={link.href} size="sm">
                        {link.label}
                      </Button>
                    ))}
                  </div>
                </article>
              );
            })}
          </div>

          <p className={styles.source}>
            Source:{" "}
            <a href={AI_SAFETY_SOURCE.href} target="_blank" rel="noopener noreferrer">
              {AI_SAFETY_SOURCE.label}
            </a>
          </p>
        </Container>
      </div>
    </section>
  );
}
