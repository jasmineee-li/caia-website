"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export interface ScrambledTextProps {
  radius?: number;
  duration?: number;
  speed?: number;
  scrambleChars?: string;
  className?: string;
  style?: React.CSSProperties;
  as?: "p" | "pre";
  preserveWhitespace?: boolean;
  children: React.ReactNode;
}

export default function ScrambledText({
  radius = 100,
  duration = 1.2,
  speed = 0.5,
  scrambleChars = ".:",
  className = "",
  style = {},
  as = "p",
  preserveWhitespace = false,
  children,
}: ScrambledTextProps) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const manualCharsRef = useRef<HTMLElement[]>([]);

  useEffect(() => {
    let split: { chars: Element[]; revert: () => void } | null = null;
    let host: HTMLDivElement | null = null;
    let handleMove: ((e: PointerEvent) => void) | null = null;
    let isDisposed = false;

    const setup = async () => {
      if (!rootRef.current) return;

      const { ScrambleTextPlugin } = await import("gsap/ScrambleTextPlugin");

      if (isDisposed || !rootRef.current) return;

      gsap.registerPlugin(ScrambleTextPlugin);

      if (preserveWhitespace) {
        const chars = manualCharsRef.current.filter(Boolean);
        chars.forEach((el) => {
          gsap.set(el, { attr: { "data-content": el.innerHTML } });
        });

        handleMove = (e: PointerEvent) => {
          chars.forEach((el) => {
            const { left, top, width, height } = el.getBoundingClientRect();
            const dx = e.clientX - (left + width / 2);
            const dy = e.clientY - (top + height / 2);
            const dist = Math.hypot(dx, dy);

            if (dist < radius) {
              gsap.to(el, {
                overwrite: true,
                duration: duration * (1 - dist / radius),
                scrambleText: {
                  text: el.dataset.content || "",
                  chars: scrambleChars,
                  speed,
                },
                ease: "none",
              });
            }
          });
        };

        host = rootRef.current;
        host.addEventListener("pointermove", handleMove);
        return;
      }

      const { SplitText } = await import("gsap/SplitText");
      if (isDisposed || !rootRef.current) return;

      gsap.registerPlugin(SplitText);

      const contentNode = rootRef.current.querySelector(
        "[data-scrambled-content]",
      ) as HTMLElement | null;
      if (!contentNode) return;

      split = SplitText.create(contentNode, {
        type: "chars",
        charsClass: "inline-block will-change-transform",
      });

      split.chars.forEach((el) => {
        const c = el as HTMLElement;
        gsap.set(c, { attr: { "data-content": c.innerHTML } });
      });

      handleMove = (e: PointerEvent) => {
        split?.chars.forEach((el) => {
          const c = el as HTMLElement;
          const { left, top, width, height } = c.getBoundingClientRect();
          const dx = e.clientX - (left + width / 2);
          const dy = e.clientY - (top + height / 2);
          const dist = Math.hypot(dx, dy);

          if (dist < radius) {
            gsap.to(c, {
              overwrite: true,
              duration: duration * (1 - dist / radius),
              scrambleText: {
                text: c.dataset.content || "",
                chars: scrambleChars,
                speed,
              },
              ease: "none",
            });
          }
        });
      };

      host = rootRef.current;
      host.addEventListener("pointermove", handleMove);
    };

    setup();

    return () => {
      isDisposed = true;
      if (host && handleMove) {
        host.removeEventListener("pointermove", handleMove);
      }
      split?.revert();
    };
  }, [radius, duration, speed, scrambleChars, preserveWhitespace]);

  const TextElement = as;
  const textValue = typeof children === "string" ? children : "";
  manualCharsRef.current = [];

  return (
    <div
      ref={rootRef}
      className={`max-w-[800px] font-mono text-[clamp(14px,4vw,32px)] text-white ${className}`}
      style={style}
    >
      {preserveWhitespace ? (
        <pre data-scrambled-content className="m-0 whitespace-pre">
          {textValue.split("").map((char, index) => {
            if (char === "\n") {
              return <br key={`scrambled-br-${index}`} />;
            }
            const renderedChar = char === " " ? "\u00A0" : char;
            return (
              <span
                key={`scrambled-char-${index}`}
                data-scrambled-char="1"
                className="inline-block will-change-transform"
                ref={(el) => {
                  if (el) manualCharsRef.current.push(el);
                }}
              >
                {renderedChar}
              </span>
            );
          })}
        </pre>
      ) : (
        <TextElement data-scrambled-content className="m-0">
          {children}
        </TextElement>
      )}
    </div>
  );
}
