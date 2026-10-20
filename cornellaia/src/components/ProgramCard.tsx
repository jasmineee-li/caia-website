import Image from "next/image";
import { ReactNode } from "react";
import { cn } from "@/lib/cn";

export interface ProgramCardProps {
  id?: string;
  visual: string;
  visualAlt: string;
  meta: string;
  title: string;
  children: ReactNode;
  action?: ReactNode;
  /** Extra content under the text, such as key numbers. */
  extra?: ReactNode;
  /**
   * Where the card spans two grid columns with its visual beside the text:
   * "lg" on desktop only, "md" on tablets only. Otherwise it is a single column card.
   */
  wide?: "lg" | "md";
  /** Background for the visual's frame, e.g. "grid-paper". Defaults to sky. */
  visualClassName?: string;
  /** Extra classes for the image, e.g. to inset a transparent visual. */
  imageClassName?: string;
  className?: string;
}

const WIDE = {
  lg: {
    card: "lg:col-span-2 lg:flex-row lg:gap-3",
    visual: "lg:aspect-auto lg:w-1/2 lg:shrink-0",
    image: "lg:object-contain",
    body: "lg:px-6 lg:pb-6 lg:pt-7",
  },
  md: {
    card: "md:col-span-2 md:flex-row md:gap-3 lg:col-span-1 lg:flex-col lg:gap-0",
    visual: "md:aspect-auto md:w-1/2 md:shrink-0 lg:aspect-[4/3] lg:w-auto",
    image: "md:object-contain lg:object-cover",
    body: "md:px-5 md:pt-6 lg:px-3 lg:pt-6",
  },
} as const;

/** The slide deck's program card: a halftone visual on a panel, then a red mono line, a serif title and a short text. */
export default function ProgramCard({
  id,
  visual,
  visualAlt,
  meta,
  title,
  children,
  action,
  extra,
  wide,
  visualClassName,
  imageClassName,
  className,
}: ProgramCardProps) {
  const w = wide ? WIDE[wide] : null;
  return (
    <article
      id={id}
      className={cn(
        // On the warm panel, the grey button takes one step darker so it still reads as a button.
        "relative flex scroll-mt-28 flex-col rounded-[8px] bg-panel p-2.5 sm:p-3 [&_[data-variant=primary]:hover]:bg-slate-300 [&_[data-variant=primary]]:bg-[#e7e4df]",
        w?.card,
        className,
      )}
    >
      <div className={cn("relative aspect-[4/3] overflow-hidden rounded-[4px]", visualClassName ?? "bg-sky", w?.visual)}>
        <Image
          src={visual}
          alt={visualAlt}
          fill
          sizes={wide ? "(max-width: 768px) 82vw, (max-width: 1280px) 50vw, 640px" : "(max-width: 768px) 82vw, (max-width: 1280px) 33vw, 420px"}
          className={cn("object-cover", w?.image, imageClassName)}
        />
      </div>
      <div className={cn("flex flex-1 flex-col px-2.5 pb-3 pt-6 sm:px-3 sm:pb-4", w?.body)}>
        <p className="mono-label text-brand-red">{meta}</p>
        <h3 className="mt-3 font-display text-[1.625rem] leading-[1.15]">{title}</h3>
        <div className="mt-3 text-[0.9375rem] leading-[1.6] text-slate-600">{children}</div>
        {(extra || action) && (
          <div className="mt-auto">
            {extra}
            {action && <div className="pt-7">{action}</div>}
          </div>
        )}
      </div>
    </article>
  );
}
