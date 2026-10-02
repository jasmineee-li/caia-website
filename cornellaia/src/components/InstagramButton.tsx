import { cn } from "@/lib/cn";

export default function InstagramButton({ compact = false }: { compact?: boolean }) {
  return (
    <a
      href="https://www.instagram.com/cornell.aia/"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Follow Cornell AI Alignment on Instagram (opens in a new tab)"
      title="Follow @cornell.aia on Instagram"
      data-social-icon="instagram"
      className={cn(
        "focus-ring inline-flex shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-900 transition-colors duration-200 hover:bg-slate-200 motion-reduce:transition-none",
        compact ? "h-8 w-8 align-middle" : "h-11 w-11",
      )}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width={compact ? 17 : 20}
        height={compact ? 17 : 20}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        aria-hidden="true"
        focusable="false"
      >
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      </svg>
    </a>
  );
}
