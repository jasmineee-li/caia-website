"use client";

import { ReactNode, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

interface MotionRevealProps {
  children: ReactNode;
  className?: string;
  delayClass?: "motion-delay-1" | "motion-delay-2" | "motion-delay-3";
}

export default function MotionReveal({ children, className, delayClass }: MotionRevealProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  // SSR and the first client render are readable; hiding is a JS enhancement.
  const [visible, setVisible] = useState<boolean | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node || typeof IntersectionObserver === "undefined") {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      // Tall sections should reveal as soon as they enter the viewport.
      { threshold: 0 },
    );

    const frame = requestAnimationFrame(() => {
      const { top, bottom } = node.getBoundingClientRect();
      if (top < window.innerHeight && bottom > 0) {
        // Do not hide content that was already visible in the server render.
        setVisible(true);
        return;
      }
      setVisible(false);
      observer.observe(node);
    });

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={ref}
      className={cn(
        visible !== null && "motion-reveal",
        visible && "motion-reveal-visible",
        visible && delayClass,
        className,
      )}
    >
      {children}
    </div>
  );
}
