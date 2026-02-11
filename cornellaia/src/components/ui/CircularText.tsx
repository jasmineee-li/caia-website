"use client";

import { useEffect, useMemo, useState } from "react";
import { cn } from "@/lib/cn";

interface CircularTextProps {
  text: string;
  spinDuration?: number;
  onHover?: "slowDown" | "speedUp" | "pause" | "goBonkers";
  className?: string;
  size?: number;
}

export default function CircularText({
  text,
  spinDuration = 20,
  onHover = "speedUp",
  className,
  size = 168,
}: CircularTextProps) {
  const letters = useMemo(() => Array.from(text), [text]);
  const firstSeparatorIndex = useMemo(() => text.indexOf("*"), [text]);
  const [duration, setDuration] = useState(spinDuration);
  const [paused, setPaused] = useState(false);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    setDuration(spinDuration);
  }, [spinDuration]);

  const handleHoverStart = () => {
    if (!onHover) return;

    setPaused(false);
    setScale(1);

    switch (onHover) {
      case "slowDown":
        setDuration(spinDuration * 2);
        break;
      case "speedUp":
        setDuration(Math.max(0.01, spinDuration / 4));
        break;
      case "pause":
        setPaused(true);
        break;
      case "goBonkers":
        setDuration(Math.max(0.01, spinDuration / 20));
        setScale(0.84);
        break;
      default:
        setDuration(spinDuration);
    }
  };

  const handleHoverEnd = () => {
    setDuration(spinDuration);
    setPaused(false);
    setScale(1);
  };

  const radius = Math.max(16, Math.floor(size * 0.4));
  const getLetterColor = (index: number) => {
    if (firstSeparatorIndex === -1) return "#B31B1B";
    return index < firstSeparatorIndex ? "#B31B1B" : "#111111";
  };

  return (
    <div
      className={cn("mx-auto select-none", className)}
      onMouseEnter={handleHoverStart}
      onMouseLeave={handleHoverEnd}
    >
      <div className="relative cursor-default" style={{ width: size, height: size }}>
        <div
          className="absolute inset-0"
          style={{
            transition: "transform 220ms ease",
            transform: `scale(${scale})`,
          }}
        >
          <div
            className="absolute inset-0"
            style={{
              animationName: "caia-circular-spin",
              animationDuration: `${duration}s`,
              animationTimingFunction: "linear",
              animationIterationCount: "infinite",
              animationPlayState: paused ? "paused" : "running",
            }}
          >
            {letters.map((letter, index) => {
              const rotationDeg = (360 / letters.length) * index;
              const transform = `translate(-50%, -50%) rotate(${rotationDeg}deg) translateY(-${radius}px)`;

              return (
                <span
                  key={`${letter}-${index}`}
                  className="absolute left-1/2 top-1/2 inline-block font-semibold tracking-[0.03em]"
                  style={{
                    transform,
                    fontSize: `${Math.max(10, Math.floor(size * 0.09))}px`,
                    color: getLetterColor(index),
                    fontFamily: "var(--font-display)",
                  }}
                >
                  {letter === " " ? "\u00A0" : letter}
                </span>
              );
            })}
          </div>
        </div>
      </div>
      <style jsx>{`
        @keyframes caia-circular-spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}
