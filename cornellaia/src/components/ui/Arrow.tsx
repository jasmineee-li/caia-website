import { cn } from "@/lib/cn";

/**
 * The site's arrow, drawn as an SVG so it looks the same on every device instead of
 * depending on each system's arrow glyph. "right" for pages on this site, "out" (up and to
 * the right) for external links. Sized to the surrounding text.
 */
export default function Arrow({ direction = "right", className }: { direction?: "right" | "out"; className?: string }) {
  return (
    <svg
      viewBox="0 0 14 14"
      fill="none"
      aria-hidden="true"
      className={cn("inline-block h-[0.8em] w-[0.8em] shrink-0 align-[-0.05em]", className)}
    >
      {direction === "out" ? (
        <path d="M3.5 10.5 10.5 3.5M5 3.5h5.5V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
      ) : (
        <path d="M1.5 7h11M8 2.5 12.5 7 8 11.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
      )}
    </svg>
  );
}
