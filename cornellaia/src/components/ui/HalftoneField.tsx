import type { CSSProperties } from "react";
import { cn } from "@/lib/cn";

/** Dot radii in px, smallest first. Each layer starts a little further right. */
const DEFAULT_RADII = [0.9, 1.25, 1.6, 1.95, 2.3, 2.65, 3.0, 3.35, 3.7];

interface HalftoneFieldProps {
  className?: string;
  /** Dot colour, any CSS colour. Defaults to the design system blue. */
  color?: string;
  /**
   * Several colours instead of one: the dots are tinted by one diagonal sweep through
   * these colours, top left to bottom right, like the community dot grid on the
   * original Join page.
   */
  colors?: string[];
  /** Any CSS image to paint the dots with, e.g. a gradient. Overrides colors. */
  paint?: string;
  /** Grid pitch in px. */
  pitch?: number;
  radii?: number[];
}

/** One smooth diagonal sweep through the colours, so every dot takes a single tint. */
function sweep(colors: string[]) {
  return `linear-gradient(135deg, ${colors.join(", ")})`;
}

/**
 * The halftone field from the slide dividers: a grid of dots that grows toward the
 * right edge. Purely decorative. Give it a position and size through className.
 */
export default function HalftoneField({ className, color, colors, paint, pitch, radii = DEFAULT_RADII }: HalftoneFieldProps) {
  const style = {
    ...(color ? { "--dot": color } : {}),
    ...(pitch ? { "--pitch": `${pitch}px` } : {}),
  } as CSSProperties;
  const multi = paint ?? (colors && colors.length > 1 ? sweep(colors) : null);
  return (
    <div aria-hidden="true" className={cn("halftone-field", multi && "halftone-field-multi", className)} style={style}>
      {radii.map((r, i) => (
        <i
          key={r}
          style={
            {
              "--r": `${r}px`,
              "--x": `${(i * 88) / radii.length}%`,
              ...(multi ? { backgroundImage: multi } : {}),
            } as CSSProperties
          }
        />
      ))}
    </div>
  );
}
