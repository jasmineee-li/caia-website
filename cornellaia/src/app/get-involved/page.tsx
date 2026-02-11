import type { Metadata } from "next";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import MotionReveal from "@/components/ui/MotionReveal";
import Section from "@/components/ui/Section";
import { PROGRAM_ITEMS } from "@/content/programs";
import { createPageMetadata } from "@/content/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Programs",
  description:
    "Learn how to get involved with Cornell AI Alignment through fellowships, reading groups, and student research opportunities.",
  path: "/get-involved",
  keywords: ["CAIA programs", "AI alignment fellowship", "Cornell reading group", "AI safety research"],
});

export default function GetInvolvedPage() {
  return (
    <main>
      <Section
        title="Ways to get involved"
        subtitle="CAIA offers multiple ways for students to learn, connect, and contribute to AI safety research."
      >
        <div className="grid gap-6">
          {PROGRAM_ITEMS.map((program, index) => (
            <MotionReveal
              key={program.id}
              delayClass={index === 1 ? "motion-delay-1" : index >= 2 ? "motion-delay-2" : undefined}
            >
              <Card className="p-6 sm:p-7">
                <h2 className="display-title text-2xl sm:text-3xl">{program.title}</h2>
                <div className="mt-4 space-y-4 text-[1.02rem] leading-8 text-slate-700 sm:text-lg">
                  {program.description.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}

                  {program.id === "fellowship" && (
                    <p>
                      Topics include interpretability,
                      <sup className="ml-1 text-brand-red">
                        <a href="https://distill.pub/2020/circuits/zoom-in/" target="_blank" rel="noopener noreferrer">
                          1
                        </a>
                      </sup>{" "}
                      learning from human feedback,
                      <sup className="ml-1 text-brand-red">
                        <a href="https://arxiv.org/abs/2009.01325" target="_blank" rel="noopener noreferrer">
                          2
                        </a>
                      </sup>{" "}
                      US AI policy, and catastrophic risk from advanced systems.
                    </p>
                  )}

                  {program.id === "research" && (
                    <p>
                      Reach out at{" "}
                      <a
                        href="mailto:cornellaialignment@gmail.com"
                        className="font-semibold text-brand-red underline underline-offset-4"
                      >
                        cornellaialignment@gmail.com
                      </a>{" "}
                      to get connected with resources and mentors.
                    </p>
                  )}
                </div>

                {program.ctaHref && program.ctaLabel && (
                  <div className="mt-6">
                    <Button
                      href={program.ctaHref}
                      external={program.ctaExternal}
                      variant={program.id === "reading-group" ? "secondary" : "primary"}
                    >
                      {program.ctaLabel}
                    </Button>
                  </div>
                )}
              </Card>
            </MotionReveal>
          ))}
        </div>
      </Section>
    </main>
  );
}
