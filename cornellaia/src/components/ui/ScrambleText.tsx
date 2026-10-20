"use client";

import { useEffect, useState } from "react";

const GLYPHS = "{}[]<>/\\|=+*#%$&@01xX_~^?";

// Timing in ms: how long the whole word stays as code, then how far apart the letters settle.
const HOLD = 300;
const STEP = 80;
const FLICKER = 50;

/** A fixed scramble for the first render, so server and client markup match. */
function initialGlyphs(text: string) {
  return text.split("").map((_, i) => GLYPHS[(i * 7 + 3) % GLYPHS.length]);
}

function randomGlyph() {
  return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
}

/**
 * Text that starts as a line of code glyphs and settles into the real word, letter by
 * letter from the left. Unsettled letters are set in DM Mono and blue. Screen readers
 * get the real text throughout. With reduced motion the word shows at once.
 */
export default function ScrambleText({ text }: { text: string }) {
  const [settled, setSettled] = useState(0);
  const [glyphs, setGlyphs] = useState(() => initialGlyphs(text));

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setSettled(text.length);
      return;
    }
    const start = performance.now();
    let last = 0;
    let raf = 0;
    const tick = (now: number) => {
      const elapsed = now - start;
      const done = Math.min(text.length, Math.max(0, Math.floor((elapsed - HOLD) / STEP) + 1));
      if (now - last >= FLICKER) {
        last = now;
        setGlyphs(text.split("").map(randomGlyph));
      }
      setSettled(done);
      if (done < text.length) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [text]);

  return (
    <>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {text.split("").map((char, i) =>
          i < settled || char === " " ? (
            <span key={i}>{char}</span>
          ) : (
            <span key={i} className="font-mono text-blue">
              {glyphs[i]}
            </span>
          ),
        )}
      </span>
    </>
  );
}
