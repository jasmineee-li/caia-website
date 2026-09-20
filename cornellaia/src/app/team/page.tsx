import type { Metadata } from "next";
import MotionReveal from "@/components/ui/MotionReveal";
import Section from "@/components/ui/Section";
import Container from "@/components/ui/Container";
import ProfileCard from "@/components/ProfileCard";
import Link from "next/link";
import { TEAM_GROUPS } from "@/content/team";
import { createPageMetadata } from "@/content/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Team",
  description:
    "Meet the Cornell AI Alignment leadership, advisors, and alumni working on AI safety research and outreach.",
  path: "/team",
  keywords: ["Cornell AI Alignment team", "AI safety students", "CAIA advisors"],
});

export default function TeamPage() {
  return (
    <main>
      <Container className="pt-14 sm:pt-20">
        <h1 className="display-title text-4xl sm:text-5xl">Our Team</h1>
        <p className="lead-copy mt-5">Students and advisors working toward AI that aligns with human intentions and benefits everyone.</p>
      </Container>
      <Section>
        <div className="space-y-12">
          {TEAM_GROUPS.map((group, groupIndex) => (
            <MotionReveal key={group.title} delayClass={groupIndex > 0 ? "motion-delay-1" : undefined}>
              <div>
                <div className="mb-6">
                  <h2 className="display-title text-3xl sm:text-4xl">{group.title}</h2>
                  {group.title === "Leadership" && (
                    <p className="mt-1 text-sm text-slate-600">Co-leads are listed alphabetically.</p>
                  )}
                </div>
                <div
                  className={
                    group.title === "Leadership"
                      ? "grid gap-x-8 gap-y-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                      : "grid gap-x-8 gap-y-4 sm:grid-cols-2 lg:grid-cols-3"
                  }
                >
                  {[...group.members]
                    .sort((a, b) => {
                      if (group.title === "Leadership") {
                        if (a.role === "President") return -1;
                        if (b.role === "President") return 1;
                      }
                      return a.name.localeCompare(b.name);
                    })
                    .map((member) => (
                      <ProfileCard
                        key={`${group.title}-${member.name}`}
                        imageSrc={member.imageSrc}
                        name={member.name}
                        role={member.role}
                        altText={member.altText}
                        websiteUrl={member.websiteUrl}
                        scholarUrl={member.scholarUrl}
                        linkedinUrl={member.linkedinUrl}
                      />
                    ))}
                </div>
              </div>
            </MotionReveal>
          ))}
        </div>
      </Section>

      <Section title="Want to contribute?">
        <p className="max-w-4xl leading-8 text-slate-600">Help organize CAIA. We welcome people interested in research, policy, outreach, design, and operations. Reach out to a team member about what you’d like to contribute, or explore <Link href="/join" className="font-semibold underline decoration-wavy decoration-slate-400 underline-offset-4">ways to get involved</Link>.</p>
      </Section>
    </main>
  );
}
