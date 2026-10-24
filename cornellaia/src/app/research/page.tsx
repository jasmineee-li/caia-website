import type { Metadata } from "next";
import Image from "next/image";
import ApplicationButton from "@/components/ApplicationButton";
import ProjectCards from "@/components/ProjectCards";
import ResearchCard from "@/components/ResearchCard";
import Container from "@/components/ui/Container";
import PageHeader from "@/components/ui/PageHeader";
import ScrambleText from "@/components/ui/ScrambleText";
import Section from "@/components/ui/Section";
import { APPLICATIONS, FALL_2026_PROJECTS } from "@/content/opportunities";
import { RESEARCH_PAPERS } from "@/content/research";
import { createPageMetadata } from "@/content/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Research",
  description:
    "Explore AI safety and alignment publications and projects by Cornell AI Alignment members and collaborators, with authors and links to their work.",
  path: "/research",
  keywords: ["AI alignment research", "CAIA papers", "Cornell AI safety research"],
});

const TEAM_NUMBERS = [
  { value: "$800+", label: "funding per project" },
  { value: "1–2", label: "mentors" },
  { value: "Publication", label: "paper or report" },
];

export default function ResearchPage() {
  return (
    <main>
      <PageHeader
        title="Research"
        titleContent={<ScrambleText text="Research" />}
        lead={<p>Papers and projects by CAIA members and our collaborators, plus how to join our research team.</p>}
      />

      {/* Research team: the slide deck's feature card, a visual beside the details. */}
      <section id="apply" className="scroll-mt-24 pt-16 sm:pt-24">
        <Container>
          <div className="grid gap-8 rounded-[8px] bg-panel p-3 sm:p-4 lg:grid-cols-12 lg:gap-12">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[4px] bg-[#f4fafe] lg:col-span-6">
              <Image
                src="/graphics/halftone/research-pale.webp"
                alt="A small neural network of blue nodes with one circuit traced through it in red"
                fill
                sizes="(min-width: 1024px) 600px, 100vw"
                className="object-cover"
              />
            </div>
            <div className="flex flex-col px-3 pb-5 sm:px-4 lg:col-span-6 lg:py-6 lg:pr-8">
              <p className="mono-label text-brand-red">Semester project · Fall 2026</p>
              <h2 className="display-title mt-4 text-[2.125rem] leading-[1.08] sm:text-5xl">Research Team</h2>
              <p className="lead-copy mt-5">
                Spend the semester on an AI safety research project with a small team of Cornell students. You can
                join one of our proposed projects or bring an idea of your own.
              </p>
              <dl className="mt-8 flex flex-wrap gap-x-8 gap-y-5 border-t border-slate-200 pt-6 lg:mt-auto">
                {TEAM_NUMBERS.map((item) => (
                  <div key={item.label}>
                    <dt className="sr-only">{item.label}</dt>
                    <dd>
                      <span className="block font-display text-[1.75rem] leading-none text-ink sm:text-[2.25rem]">{item.value}</span>
                      <span className="mt-2 block text-sm leading-5 text-slate-600">{item.label}</span>
                    </dd>
                  </div>
                ))}
              </dl>
              <div className="mt-8">
                <ApplicationButton href={APPLICATIONS.researchTeam} label="Apply to the Research Team" />
              </div>
            </div>
          </div>
        </Container>
      </section>

      <Section id="projects" eyebrow="This semester" title="Fall 2026 Projects">
        <ProjectCards
          projects={FALL_2026_PROJECTS}
          applyHref={APPLICATIONS.researchTeam}
          proposeHref={APPLICATIONS.projectProposal}
        />
      </Section>

      <Section id="our-work" eyebrow="Publications" title="Our Work" titleNote={`(${RESEARCH_PAPERS.length})`}>
        <div className="border-t border-blue">
          {RESEARCH_PAPERS.map((paper) => (
            <ResearchCard key={paper.title} paper={paper} />
          ))}
        </div>
      </Section>
    </main>
  );
}
