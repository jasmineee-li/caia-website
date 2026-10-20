import Link from "next/link";
import Section from "@/components/ui/Section";
import { AI_SAFETY_SLIDES, AI_SAFETY_SOURCE } from "@/content/home";

/** "What is AI safety" on a warm panel band: red labels, two columns under blue rules, and the source as a mono caption. */
export default function AiSafetyIntro() {
  return (
    <Section id="ai-safety" eyebrow="Why it matters" title="AI Safety" tone="panel">
      <div className="grid gap-14 md:grid-cols-2 md:gap-12 lg:gap-20">
        {AI_SAFETY_SLIDES.map((slide, index) => (
          <article key={slide.id} className="border-t border-blue pt-6">
            <p className="mono-label text-brand-red">{String(index + 1).padStart(2, "0")}</p>
            <h3 className="display-title mt-4 text-[1.75rem] leading-[1.15] sm:text-[2rem]">{slide.label}</h3>
            <p className="mt-5 text-[1.0625rem] leading-[1.7] text-ink-2">{slide.body}</p>
            <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
              {slide.links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-link text-[0.9375rem]">
                    {link.label} <span aria-hidden="true">→</span>
                  </Link>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
      <p className="mono-caption mt-12">
        Source:{" "}
        <a href={AI_SAFETY_SOURCE.href} target="_blank" rel="noopener noreferrer" className="underline decoration-slate-400 underline-offset-4 hover:text-ink">
          {AI_SAFETY_SOURCE.label}
        </a>
      </p>
    </Section>
  );
}
