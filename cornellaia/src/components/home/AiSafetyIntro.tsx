import Link from "next/link";
import Section from "@/components/ui/Section";
import { AI_SAFETY_SLIDES, AI_SAFETY_SOURCE } from "@/content/home";

/** Why AI safety matters, on a warm panel band: red labels, two columns under blue rules, white pill links, and the source as a mono caption. */
export default function AiSafetyIntro() {
  return (
    <Section
      id="ai-safety"
      title={
        <>
          Managing risks from advanced AI is one of the{" "}
          <span className="underline decoration-brand-red decoration-wavy [text-decoration-thickness:0.045em] [text-underline-offset:0.2em]">
            most important challenges
          </span>{" "}
          of our time.
        </>
      }
      headerClassName="lg:max-w-[60rem]"
      tone="panel"
    >
      <div className="grid gap-14 md:grid-cols-2 md:gap-12 lg:gap-20">
        {AI_SAFETY_SLIDES.map((slide, index) => (
          <article key={slide.id} className="border-t border-blue pt-6">
            <p className="mono-label text-brand-red">{String(index + 1).padStart(2, "0")}</p>
            <h3 className="display-title mt-4 text-[1.75rem] leading-[1.15] sm:text-[2rem]">{slide.label}</h3>
            {/* Quoted from the source below, so the passage sits in quotation marks. */}
            <p className="mt-5 text-[1.0625rem] leading-[1.7] text-ink-2">“{slide.body}”</p>
            <ul className="mt-7 flex flex-wrap gap-2">
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
      <p className="mono-caption mt-12">
        Source:{" "}
        <a href={AI_SAFETY_SOURCE.href} target="_blank" rel="noopener noreferrer" className="underline decoration-slate-400 underline-offset-4 hover:text-ink">
          {AI_SAFETY_SOURCE.label}
        </a>
      </p>
    </Section>
  );
}
