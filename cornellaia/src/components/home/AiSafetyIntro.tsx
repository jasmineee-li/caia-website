import Link from "next/link";
import ProblemGlyph from "@/components/home/ProblemGlyph";
import Section from "@/components/ui/Section";
import { AI_SAFETY_SLIDES } from "@/content/home";

/**
 * AI safety at a glance, on a warm panel band. Each of the field's two areas is a row
 * under a blue rule: the number, title and links to our programs on the left, and the
 * problems the field works on as white tiles on the right, each with a small dot picture,
 * the field's name for it, and a plain description.
 */
export default function AiSafetyIntro() {
  return (
    <Section id="ai-safety" eyebrow="AI Safety" tone="panel" spacing="tight">
      <div className="space-y-16 sm:space-y-20">
        {AI_SAFETY_SLIDES.map((slide, index) => (
          <article key={slide.id} className="grid gap-8 border-t border-blue pt-6 lg:grid-cols-12 lg:gap-12 xl:gap-10">
            <div className="flex flex-col lg:col-span-4">
              <p className="mono-label text-brand-red">{String(index + 1).padStart(2, "0")}</p>
              <h3 className="display-title mt-4 max-w-[22rem] text-balance text-[1.75rem] leading-[1.15] sm:text-[2rem]">{slide.label}</h3>
              <ul className="mt-6 flex flex-wrap gap-2 lg:mt-8">
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
            </div>

            <ul className="grid gap-2.5 sm:grid-cols-2 sm:gap-3 lg:col-span-8 xl:grid-cols-3 xl:gap-2.5">
              {slide.items.map((item) => (
                <li
                  key={item.tag}
                  className="flex items-center gap-3.5 rounded-[8px] bg-white p-4 sm:flex-col sm:items-stretch sm:gap-0 sm:p-5 xl:px-4"
                >
                  <ProblemGlyph name={item.glyph} className="h-10 w-[75px] shrink-0 sm:h-16 sm:w-[120px]" />
                  {/* Balanced line breaks, so a phrase never leaves one word alone on its last line. */}
                  <div className="sm:mt-6">
                    <p className="mono-caption text-balance">{item.tag}</p>
                    <p className="mt-1.5 text-balance font-display text-[1rem] leading-[1.3] text-ink sm:mt-2 sm:text-[1.1875rem] xl:text-[1.0625rem]">{item.text}</p>
                  </div>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </Section>
  );
}
