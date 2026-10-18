import { ReactNode } from "react";
import { cn } from "@/lib/cn";

interface CardLabelProps {
  children: ReactNode;
  className?: string;
}

/** Small red label above a card's title, set in the display serif. */
export default function CardLabel({ children, className }: CardLabelProps) {
  return (
    <p
      className={cn(
        "mb-2 text-[0.95rem] leading-6 tracking-[-0.01em] text-brand-red [font-family:var(--font-display)]",
        className,
      )}
    >
      {children}
    </p>
  );
}
