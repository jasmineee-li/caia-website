import type { Metadata } from "next";
import MotionReveal from "@/components/ui/MotionReveal";
import Section from "@/components/ui/Section";
import PageHeader from "@/components/ui/PageHeader";
import Button from "@/components/ui/Button";
import ApplicationButton from "@/components/ApplicationButton";
import ProfileCard from "@/components/ProfileCard";
import { TEAM_GROUPS } from "@/content/team";
import { APPLICATIONS } from "@/content/opportunities";
import { createPageMetadata } from "@/content/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Team",
  description:
    "Meet Cornell AI Alignment's student leaders, advisors, and alumni, and learn how to help organize AI safety research, events, and outreach.",
  path: "/team",
  keywords: ["Cornell AI Alignment team", "AI safety students", "CAIA advisors"],
});

export default function TeamPage() {
  return (
    <main>
      <PageHeader
        title="Our Team"
        lead={<p>Meet the students and advisors who run CAIA, and some of our alumni.</p>}
      />
      <Section className="pt-16 sm:pt-20 lg:pt-24">
        <div className="space-y-20 sm:space-y-28">
          {TEAM_GROUPS.map((group, groupIndex) => (
            <MotionReveal key={group.title} delayClass={groupIndex > 0 ? "motion-delay-1" : undefined}>
              <div>
                <div className="mb-10 flex flex-wrap items-baseline justify-between gap-3 border-t border-blue pt-6">
                  <h2 className="display-title text-[2rem] leading-[1.1] sm:text-[2.75rem]">{group.title}</h2>
                  {group.title === "Leadership" && (
                    <p className="mono-caption">Co-leads are listed alphabetically</p>
                  )}
                </div>
                <div
                  className={
                    "grid grid-cols-2 gap-x-5 gap-y-10 sm:grid-cols-3 sm:gap-x-8 lg:grid-cols-5"
                  }
                >
                  {[...group.members]
                    .sort((a, b) => {
                      // Advisors keep the order they're listed in; everyone else is alphabetical.
                      if (group.title === "Advisors") return 0;
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

      <Section title="Want to Contribute?">
        <p className="lead-copy max-w-3xl">We welcome people interested in research, policy, outreach, design, and operations. You can apply to join our organizing team, or reach out to a team member about what you’d like to contribute.</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <ApplicationButton href={APPLICATIONS.organizer} label="Apply to Be an Organizer" />
          <Button href="/join" variant="secondary">Ways to Get Involved</Button>
        </div>
      </Section>
    </main>
  );
}
