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
    "bg-brand-red text-white border border-brand-red hover:bg-brand-red-strong hover:border-brand-red-strong",
  secondary:
    "bg-white text-brand-red border border-brand-red/30 hover:border-brand-red hover:bg-red-50",
  ghost: "bg-transparent text-ink-muted border border-slate-300 hover:border-brand-cyan hover:text-slate-900",
};

const SIZE_CLASS: Record<NonNullable<ButtonProps["size"]>, string> = {
  sm: "px-3.5 py-2 text-sm",
  md: "px-5 py-2.5 text-sm sm:text-base",
  lg: "px-6 py-3 text-base",
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
    "focus-ring inline-flex items-center justify-center rounded-full font-semibold transition-colors duration-200",
    VARIANT_CLASS[variant],
    SIZE_CLASS[size],
    className,
  );

  if (isExternal) {
    return (
      <a href={href} className={classes} target="_blank" rel="noopener noreferrer" {...props}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} {...props}>
      {children}
    </Link>
  );
}
