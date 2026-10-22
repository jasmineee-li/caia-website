import Link from "next/link";
import Section from "@/components/ui/Section";
import { AI_SAFETY_SLIDES } from "@/content/home";

/**
 * AI safety at a glance, on a warm panel band: the field's two areas side by side under
 * blue rules, each a red number, a serif title and a list of what the field works on, set
 * as hairline rows with a blue dot, then white pill links to our programs.
 */
export default function AiSafetyIntro() {
  return (
    <Section id="ai-safety" eyebrow="AI Safety" tone="panel" spacing="tight">
      {/* From tablets up, the two columns share rows (number, title, list, links), so both
          lists start level even when one title runs to two lines. */}
      <div className="grid gap-14 md:grid-cols-2 md:gap-x-12 md:gap-y-0 lg:gap-x-20">
        {AI_SAFETY_SLIDES.map((slide, index) => (
          <article key={slide.id} className="border-t border-blue pt-6 md:row-span-4 md:grid md:grid-rows-subgrid">
            <p className="mono-label text-brand-red">{String(index + 1).padStart(2, "0")}</p>
            <h3 className="display-title mt-4 text-[1.75rem] leading-[1.15] sm:text-[2rem]">{slide.label}</h3>
            <ul className="mt-7 border-b border-rule">
              {slide.items.map((item) => (
                <li key={item} className="flex items-baseline gap-4 border-t border-rule py-3.5">
                  <span aria-hidden="true" className="h-[7px] w-[7px] shrink-0 -translate-y-[0.2em] rounded-full bg-blue" />
                  <span className="font-display text-[1.125rem] leading-[1.35] text-ink sm:text-[1.25rem]">{item}</span>
                </li>
              ))}
            </ul>
            <ul className="mt-8 flex flex-wrap content-start gap-2">
              {slide.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="focus-ring inline-flex min-h-10 items-center rounded-full bg-white px-4 text-[0.9375rem] font-medium text-ink ring-1 ring-inset ring-transparent transition-[box-shadow,color] hover:text-blue hover:ring-blue"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </Section>
  );
}
