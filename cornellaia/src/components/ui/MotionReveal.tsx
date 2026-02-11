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
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12 },
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={ref}
      className={cn(
        "motion-reveal",
        visible && "motion-reveal-visible",
        visible && delayClass,
        className,
      )}
    >
      {children}
    </div>
  );
}
