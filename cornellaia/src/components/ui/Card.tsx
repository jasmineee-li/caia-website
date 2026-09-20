import { ReactNode } from "react";
import { cn } from "@/lib/cn";

interface CardProps {
  children: ReactNode;
  className?: string;
  id?: string;
}

export default function Card({ children, className, id }: CardProps) {
  return <article id={id} className={cn("surface-card p-6", className)}>{children}</article>;
}
