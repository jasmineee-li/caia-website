import { Fragment } from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Badge from "@/components/ui/Badge";
import Card from "@/components/ui/Card";
import LetterGlitch from "@/components/ui/LetterGlitch";
import MotionReveal from "@/components/ui/MotionReveal";
import Section from "@/components/ui/Section";
import { RESEARCH_PAPERS } from "@/content/research";
import { createPageMetadata } from "@/content/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Research",
  description:
    "Browse research by Cornell AI Alignment members and collaborators, including papers, reports, and accepted conference work.",
  path: "/research",
  keywords: ["AI alignment research", "CAIA papers", "Cornell AI safety research"],
});

export default function ResearchPage() {
  return (
    <main>
      <section className="relative aspect-[16/9] w-full min-h-[240px] max-h-[70vh] overflow-hidden">
        <LetterGlitch
          imageSrc="/Title5.webp"
          imageFit="contain"
          glitchSpeed={50}
          centerVignette={false}
          outerVignette={false}
          smooth
          quantizationLevels={7}
        />
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center px-4">
          <h1
            className="display-title text-center text-5xl text-white sm:text-6xl md:text-7xl"
            style={{
              textShadow:
                "0 14px 46px rgba(0, 0, 0, 1), 0 0 24px rgba(0, 0, 0, 0.98), 0 3px 8px rgba(0, 0, 0, 1)",
            }}
          >
            Research
          </h1>
        </div>
      </section>

      <Section subtitle="Publications by CAIA members and collaborators." className="pt-2 sm:pt-4">
        <div className="space-y-6">
          {RESEARCH_PAPERS.map((paper, index) => (
            <MotionReveal
              key={paper.title}
              delayClass={index > 0 ? "motion-delay-1" : undefined}
            >
              <Card className="space-y-3">
                <h2 className="text-2xl font-semibold text-slate-900">
                  <a
                    href={paper.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline decoration-slate-300 underline-offset-4 hover:text-brand-red"
                  >
                    {paper.title}
                  </a>
                </h2>

                {paper.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {paper.tags.map((tag) => (
                      <Badge key={`${paper.title}-${tag}`}>{tag}</Badge>
                    ))}
                  </div>
                )}

                <p className="text-sm text-slate-600 sm:text-base">
                  {paper.authors.map((author, authorIndex) => (
                    <Fragment key={`${paper.title}-${author.name}-${authorIndex}`}>
                      {authorIndex > 0 ? ", " : ""}
                      <span className="inline-flex items-center gap-1 align-middle">
                        {author.isCaiaMember && (
                          <Image
                            src="/logo.svg"
                            alt=""
                            aria-hidden="true"
                            width={14}
                            height={14}
                            className="h-3.5 w-3.5 shrink-0"
                          />
                        )}
                        <span className={author.isCaiaMember ? "font-semibold text-slate-900" : ""}>
                          {author.name}
                        </span>
                      </span>
                    </Fragment>
                  ))}
                </p>

                <p className="text-sm leading-7 text-slate-700 sm:text-base"><b>Abstract: </b>{paper.abstract}</p>
              </Card>
            </MotionReveal>
          ))}
        </div>
      </Section>
    </main>
  );
}
