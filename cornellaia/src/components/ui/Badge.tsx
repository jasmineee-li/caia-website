import { ReactNode } from "react";
import { cn } from "@/lib/cn";

interface BadgeProps {
  children: ReactNode;
  className?: string;
}

export default function Badge({ children, className }: BadgeProps) {
  return (
    <span className={cn("inline-flex items-center font-mono text-xs uppercase tracking-[0.06em] text-slate-500", className)}>
      {children}
    </span>
  );
}
