import Link from "next/link";
import { AnchorHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

export interface ButtonProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  variant?: "primary" | "secondary" | "ghost" | "inverse" | "inverseRed";
  size?: "sm" | "md" | "lg";
  external?: boolean;
}

const VARIANT_CLASS: Record<NonNullable<ButtonProps["variant"]>, string> = {
  primary: "bg-slate-100 text-ink hover:bg-slate-200",
  secondary: "bg-white text-ink ring-1 ring-inset ring-slate-300 hover:ring-ink",
  inverse: "bg-white text-blue hover:bg-sky",
  inverseRed: "bg-white text-brand-red hover:bg-[#f8ddd8]",
  ghost: "bg-transparent px-0 text-ink underline decoration-slate-300 underline-offset-[0.3em] hover:decoration-ink",
};

const SIZE_CLASS: Record<NonNullable<ButtonProps["size"]>, string> = {
  sm: "min-h-10 gap-3 px-4 text-[0.875rem]",
  md: "min-h-12 gap-4 px-5 text-[0.9375rem]",
  lg: "min-h-14 gap-5 px-6 text-base",
};

/** A solid rectangular button with an arrow: ↗ for external links, → for pages on this site. */
export default function Button({
  href,
  children,
  className,
  variant = "primary",
  size = "md",
  external,
  ...props
}: ButtonProps) {
  const isExternal = external ?? href.startsWith("http");
  const classes = cn(
    "group/button focus-ring inline-flex items-center justify-between rounded-[4px] font-medium leading-6 transition-[background-color,box-shadow,color,text-decoration-color] duration-200 motion-reduce:transition-none",
    VARIANT_CLASS[variant],
    variant === "ghost" ? "min-h-0 gap-2 px-0" : SIZE_CLASS[size],
    className,
  );

  const content = (
    <>
      <span>{children}</span>
      {variant !== "ghost" && (
        <svg
          className={cn(
            "h-3.5 w-3.5 shrink-0 transition-transform duration-200 motion-reduce:transition-none",
            isExternal ? "group-hover/button:-translate-y-0.5 group-hover/button:translate-x-0.5" : "group-hover/button:translate-x-0.5",
          )}
          viewBox="0 0 14 14"
          fill="none"
          aria-hidden="true"
        >
          {isExternal
            ? <path d="M3.5 10.5 10.5 3.5M5 3.5h5.5V9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="square" />
            : <path d="M1.5 7h11M8 2.5 12.5 7 8 11.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="square" />}
        </svg>
      )}
    </>
  );

  if (isExternal) {
    return (
      <a href={href} className={classes} target="_blank" rel="noopener noreferrer" data-button="" data-variant={variant} {...props}>
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} data-button="" data-variant={variant} {...props}>
      {content}
    </Link>
  );
}
