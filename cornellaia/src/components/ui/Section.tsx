import { ReactNode } from "react";
import { cn } from "@/lib/cn";
import Container from "@/components/ui/Container";

interface SectionProps {
  id?: string;
  /** Small mono label above the title, e.g. "News" or "01 · Programs". */
  eyebrow?: string;
  title?: ReactNode;
  /** Classes for the block holding the eyebrow, title and subtitle, e.g. to widen a long title. */
  headerClassName?: string;
  /** Size and leading for the title, in place of the default section title size. */
  titleClassName?: string;
  /** Shown after the title in grey, e.g. a count like "(18)". */
  titleNote?: ReactNode;
  subtitle?: string;
  /** A link or button shown on the right of the header, e.g. "All news". */
  action?: ReactNode;
  children: ReactNode;
  className?: string;
  contentClassName?: string;
  tone?: "default" | "muted" | "hero" | "sky" | "panel";
}

const TONE_CLASS: Record<NonNullable<SectionProps["tone"]>, string> = {
  default: "",
  muted: "",
  hero: "",
  sky: "on-sky bg-sky pb-20 sm:pb-28",
  panel: "bg-panel pb-20 sm:pb-28",
};

export default function Section({
  id,
  eyebrow,
  title,
  headerClassName,
  titleClassName,
  titleNote,
  subtitle,
  action,
  children,
  className,
  contentClassName,
  tone = "default",
}: SectionProps) {
  return (
    <section id={id} className={cn("scroll-mt-24 pt-20 sm:pt-28 lg:pt-32", TONE_CLASS[tone], className)}>
      <Container>
        <div className={contentClassName}>
          {(title || subtitle || eyebrow) && (
            <header className="mb-10 flex flex-wrap items-end justify-between gap-x-10 gap-y-5 sm:mb-14">
              <div className={cn("max-w-3xl", headerClassName)}>
                {eyebrow && <p className="mono-label mb-4 text-brand-red sm:mb-5">{eyebrow}</p>}
                {title && (
                  <h2 className={cn("display-title", titleClassName ?? "text-[2.125rem] leading-[1.08] sm:text-5xl lg:text-[3.5rem]")}>
                    {title}
                    {titleNote != null && <span className="text-slate-400"> {titleNote}</span>}
                  </h2>
                )}
                {subtitle && <p className="lead-copy mt-4 max-w-2xl sm:mt-5">{subtitle}</p>}
              </div>
              {action && <div className="shrink-0">{action}</div>}
            </header>
          )}
          {children}
        </div>
      </Container>
    </section>
  );
}
