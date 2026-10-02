import Link from "next/link";
import { AnchorHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

export interface ButtonProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  external?: boolean;
}

const VARIANT_CLASS: Record<NonNullable<ButtonProps["variant"]>, string> = {
  primary:
    "bg-slate-100 text-slate-900 hover:bg-slate-200",
  secondary:
    "bg-slate-100 text-slate-900 hover:bg-slate-200",
  ghost: "bg-transparent text-slate-700 hover:bg-slate-100 hover:text-slate-900",
};

const SIZE_CLASS: Record<NonNullable<ButtonProps["size"]>, string> = {
  sm: "min-h-10 gap-2 px-4 py-2 text-sm",
  md: "min-h-11 gap-2 px-5 py-2.5 text-sm",
  lg: "min-h-14 gap-3 px-8 py-3.5 text-base",
};

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
    "group/button focus-ring inline-flex items-center justify-center rounded-full font-medium leading-6 transition-colors duration-200 motion-reduce:transition-none",
    VARIANT_CLASS[variant],
    SIZE_CLASS[size],
    className,
  );

  const content = (
    <>
      {children}
      {variant === "primary" && (
        <svg
          className="h-4 w-4 shrink-0 transition-transform duration-200 group-hover/button:translate-x-0.5 motion-reduce:transition-none"
          viewBox="0 0 16 16"
          fill="none"
          aria-hidden="true"
        >
          <path d="m6 3.5 4.5 4.5L6 12.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </>
  );

  if (isExternal) {
    return (
      <a href={href} className={classes} target="_blank" rel="noopener noreferrer" {...props}>
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} {...props}>
      {content}
    </Link>
  );
}
