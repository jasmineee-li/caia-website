import { ReactNode } from "react";
import { cn } from "@/lib/cn";
import Container from "@/components/ui/Container";

interface SectionProps {
  id?: string;
  title?: string;
  /** Shown after the title in grey, e.g. a count like "(18)". */
  titleNote?: ReactNode;
  subtitle?: string;
  children: ReactNode;
  className?: string;
  contentClassName?: string;
  tone?: "default" | "muted" | "hero";
}

const TONE_CLASS: Record<NonNullable<SectionProps["tone"]>, string> = {
  default: "",
  muted: "surface-muted",
  hero: "mesh-backdrop",
};

export default function Section({
  id,
  title,
  titleNote,
  subtitle,
  children,
  className,
  contentClassName,
  tone = "default",
}: SectionProps) {
  return (
    <section id={id} className={cn("pt-16 sm:pt-20", className)}>
      <Container>
        <div className={cn(TONE_CLASS[tone], tone !== "default" && "p-6 sm:p-10", contentClassName)}>
          {(title || subtitle) && (
            <header className="mb-4 sm:mb-6">
              {title && (
                <h2 className="display-title text-3xl sm:text-4xl">
                  {title}
                  {titleNote != null && <span className="text-slate-400"> {titleNote}</span>}
                </h2>
              )}
              {subtitle && <p className="mt-4 lead-copy">{subtitle}</p>}
            </header>
          )}
          {children}
        </div>
      </Container>
    </section>
  );
}
