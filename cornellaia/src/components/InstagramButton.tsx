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
        "focus-ring inline-flex shrink-0 items-center justify-center rounded-full border-2 border-slate-200 bg-transparent text-brand-red transition-colors duration-200 hover:text-brand-red-strong",
        compact ? "h-8 w-8 align-middle" : "h-11 w-11 sm:h-12 sm:w-12",
      )}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width={compact ? 17 : 22}
        height={compact ? 17 : 22}
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
