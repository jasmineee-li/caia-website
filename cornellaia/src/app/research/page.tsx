import type { Metadata } from "next";
import ApplicationButton from "@/components/ApplicationButton";
import Card from "@/components/ui/Card";
import CardLabel from "@/components/ui/CardLabel";
import LetterGlitch from "@/components/ui/LetterGlitch";
import ResearchCard, { TAG_CLASS } from "@/components/ResearchCard";
import MotionReveal from "@/components/ui/MotionReveal";
import Section from "@/components/ui/Section";
import { APPLICATIONS, FALL_2026_PROJECTS, RESEARCH_TEAM_PERKS } from "@/content/opportunities";
import { RESEARCH_PAPERS } from "@/content/research";
import { createPageMetadata } from "@/content/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Research",
  description:
    "Explore AI safety and alignment publications and projects by Cornell AI Alignment members and collaborators, with authors and links to their work.",
  path: "/research",
  keywords: ["AI alignment research", "CAIA papers", "Cornell AI safety research"],
});

export default function ResearchPage() {
  return (
    <main>
      <section className="relative aspect-[16/9] w-full min-h-[240px] max-h-[70vh] overflow-hidden">
        <LetterGlitch
          glitchColors={["#fb051b", "#22043a", "#e684a6", "#ee3c55", "#fdf7f8"]}
          imageSrc="/Title5.webp"
          imageFit="cover"
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

      <Section id="apply" title="Apply to Our Research Team" className="scroll-mt-24 pt-10 sm:pt-14">
        <MotionReveal>
          <Card className="grid gap-8 p-6 sm:p-8 lg:grid-cols-[1.05fr_1fr] lg:gap-12 lg:p-10">
            <div className="flex flex-col">
              <CardLabel>Fall 2026</CardLabel>
              <p className="mt-1 text-base leading-8 text-slate-700 sm:text-lg">
                Spend the semester on an AI safety research project with a small team of
                Cornell students. Every project is funded, mentored by experienced AI safety
                researchers, and works toward a publication or report by the end of the semester.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3 sm:mt-8">
                <ApplicationButton href={APPLICATIONS.researchTeam} label="Apply to the research team" />
              </div>
            </div>
            <dl className="divide-y divide-slate-200 border-t border-slate-200 lg:border-t-0">
              {RESEARCH_TEAM_PERKS.map((perk) => (
                <div key={perk.title} className="py-4 first:pt-5 last:pb-0 lg:first:pt-0">
                  <dt className="display-title text-2xl text-slate-900">{perk.title}</dt>
                  <dd className="mt-1 text-base leading-7 text-slate-600">{perk.text}</dd>
                </div>
              ))}
            </dl>
          </Card>
        </MotionReveal>
      </Section>

      <Section id="projects" title="Fall 2026 Projects" className="scroll-mt-24">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {FALL_2026_PROJECTS.map((project, index) => (
            <MotionReveal key={project.title} delayClass={index > 0 ? "motion-delay-1" : undefined} className="h-full">
              <Card className="flex h-full flex-col">
                <div className="flex flex-wrap gap-2">
                  {project.topics.map((topic) => (
                    <span key={topic} className={`${TAG_CLASS} bg-white text-slate-600 ring-1 ring-inset ring-slate-200`}>
                      {topic}
                    </span>
                  ))}
                </div>
                <h3 className="mt-4 text-xl font-semibold leading-snug text-slate-900">{project.title}</h3>
                <p className="mt-3 text-base leading-7 text-slate-700">{project.summary}</p>
                <p className="mt-auto pt-5 text-sm text-slate-600">
                  <span className="font-semibold text-slate-900">Mentors:</span> {project.mentors.join(", ")}
                </p>
              </Card>
            </MotionReveal>
          ))}
          <MotionReveal delayClass="motion-delay-2" className="h-full">
            <div className="flex h-full flex-col rounded-[var(--radius-lg)] border border-dashed border-slate-300 p-6">
              <h3 className="text-xl font-semibold leading-snug text-slate-900">More projects coming soon</h3>
              <p className="mt-3 text-base leading-7 text-slate-600">
                We’re still finalizing this semester’s projects. Have an idea of your own? Tell
                us about it in your application.
              </p>
            </div>
          </MotionReveal>
        </div>
      </Section>

      <Section
        id="our-work"
        title="Our Work"
        subtitle="Publications and projects by CAIA members and collaborators."
        className="scroll-mt-24"
      >
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {RESEARCH_PAPERS.map((paper, index) => (
            <MotionReveal
              key={paper.title}
              className="h-full"
              delayClass={index % 3 === 1 ? "motion-delay-1" : index % 3 === 2 ? "motion-delay-2" : undefined}
            >
              <ResearchCard paper={paper} />
            </MotionReveal>
          ))}
        </div>
      </Section>
    </main>
  );
}
