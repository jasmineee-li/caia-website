import MotionReveal from "@/components/ui/MotionReveal";
import Section from "@/components/ui/Section";
import ProfileCard from "@/components/ProfileCard";
import { TEAM_GROUPS } from "@/content/team";

export default function TeamPage() {
  return (
    <main>
      <Section
        title="Our Team"
        subtitle="Students and advisors working to improve the safety and governance of advanced AI systems."
      >
        <div className="space-y-12">
          {TEAM_GROUPS.map((group, groupIndex) => (
            <MotionReveal key={group.title} delayClass={groupIndex > 0 ? "motion-delay-1" : undefined}>
              <div>
                <h2 className="mb-6 text-2xl font-semibold text-slate-900">{group.title}</h2>
                <div
                  className={
                    group.title === "Core Team"
                      ? "grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                      : "grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
                  }
                >
                  {group.members.map((member) => (
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
    </main>
  );
}
