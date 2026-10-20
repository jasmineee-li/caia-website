import Link from "next/link";
import ApplicationButton from "@/components/ApplicationButton";
import ProgramCard from "@/components/ProgramCard";
import Button from "@/components/ui/Button";
import CommunityField from "@/components/ui/CommunityField";
import Container from "@/components/ui/Container";
import PageHeader from "@/components/ui/PageHeader";
import Section from "@/components/ui/Section";
import { HOME_CTA_ITEMS } from "@/content/home";
import { EVENTS_CALENDAR_URL } from "@/content/events";
import { APPLICATIONS } from "@/content/opportunities";
import { createPageMetadata } from "@/content/seo";

export const metadata = createPageMetadata({
  title: "Get Involved",
  path: "/join",
  description: "Join Cornell AI Alignment on Slack, attend open events, explore AI safety programs and research opportunities, or help organize the community.",
});

const ROLLING = <span className="mono-caption">Rolling review</span>;

const RESEARCH_NUMBERS = [
  { value: "$800+", label: "funding" },
  { value: "1–2", label: "mentors" },
  { value: "Publication", label: "paper or report" },
];

/** Apply button with an optional note beside it, pinned to the foot of a card. */
function ApplyRow({ href, label, note }: { href: string | null; label: string; note?: React.ReactNode }) {
  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
      <ApplicationButton href={href} label={label} />
      {href && note}
    </div>
  );
}

export default function JoinPage() {
  return (
    <main>
      <PageHeader
        title="Join Us"
        renderField={(className) => <CommunityField className={className} />}
        lead={
          <p>
            All of our events are open to everyone. If you join our Slack, you’re considered a CAIA member. It’s where we
            share conversations, announcements, and opportunities.
          </p>
        }
      >
        <div className="flex flex-wrap gap-3">
          <Button href={HOME_CTA_ITEMS[0].href} external>Join our Slack</Button>
          <Button href="/events#events" variant="secondary">Find an Event</Button>
        </div>
      </PageHeader>

      <Section
        id="programs"
        title="Programs"
        subtitle="You can take our course, join a weekly reading group, do research with us, or just come to an event."
      >
        {/* Phones: one sideways rail. Tablets: two columns. Desktop: the three learning
            programs in a row, then the research team across two columns beside events.
            Visual backgrounds: white for the course, the technical group and events, warm
            stone for policy and a pale sky for the research team. */}
        <div className="rail md:grid md:grid-cols-2 md:gap-4 lg:grid-cols-3">
          <ProgramCard
            id="cs1998"
            visual="/graphics/halftone/course-dots.webp"
            visualClassName="grid-paper [background-position:center] [background-size:24px_24px]"
            imageClassName="!object-contain px-[10%]"
            visualAlt="The number 1998 drawn in blue halftone dots"
            meta="Course · Fall 2026"
            title="CS 1998"
            className="w-[82%] sm:w-[46%] md:w-auto"
            action={<Button href="/programs/cs1998" variant="secondary">Course &amp; Materials</Button>}
          >
            Learn through lectures, hands-on notebooks, discussions, and a research project. Fall enrollment is
            closed, but the course materials are open to everyone.
          </ProgramCard>

          <ProgramCard
            id="technical-reading-group"
            visual="/graphics/halftone/technical-paper.webp"
            visualAlt="A field of AI safety research terms with emergent misalignment highlighted"
            meta="Mondays · 4:30–5:30 pm"
            title="Technical Reading Group"
            className="w-[82%] sm:w-[46%] md:w-auto"
            action={<ApplyRow href={APPLICATIONS.technicalReadingGroup} label="Apply" note={ROLLING} />}
          >
            Each week, we read a recent paper in technical AI safety and talk through its methods, evidence, and
            limitations together.
          </ProgramCard>

          <ProgramCard
            id="policy-reading-group"
            visual="/graphics/halftone/policy-stone.webp"
            visualAlt="A parliament seating chart in blue, black and red dots"
            meta="Wednesdays · 4:30–5:30 pm"
            title="Policy Reading Group"
            className="w-[82%] sm:w-[46%] md:w-auto"
            action={<ApplyRow href={APPLICATIONS.policyReadingGroup} label="Apply" note={ROLLING} />}
          >
            Each week, we read and discuss work on how advanced AI could change work, the economy, and the balance
            of power, and what policy can do about it.
          </ProgramCard>

          <ProgramCard
            id="research"
            wide="lg"
            visual="/graphics/halftone/research-pale.webp"
            visualAlt="A small neural network of blue nodes with one circuit traced through it in red"
            visualClassName="bg-[#f4fafe]"
            imageClassName="lg:!object-cover"
            meta="Semester project · Fall 2026"
            title="Research Team"
            className="w-[82%] sm:w-[46%] md:w-auto"
            extra={
              <dl className="mt-6 hidden flex-wrap gap-x-6 gap-y-4 border-t border-slate-200 pt-5 lg:flex">
                {RESEARCH_NUMBERS.map((item) => (
                  <div key={item.label}>
                    <dt className="sr-only">{item.label}</dt>
                    <dd>
                      <span className="block font-display text-[1.5rem] leading-none text-ink">{item.value}</span>
                      <span className="mt-2 block text-[0.8125rem] leading-5 text-slate-600">{item.label}</span>
                    </dd>
                  </div>
                ))}
              </dl>
            }
            action={
              <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
                <ApplicationButton href={APPLICATIONS.researchTeam} label="Apply" />
                <Link href="/research#projects" className="text-link text-[0.9375rem]">Projects <span aria-hidden="true">→</span></Link>
              </div>
            }
          >
            Spend the semester on an AI safety research project with a small team of Cornell students. You can join
            one of our proposed projects or bring an idea of your own.
          </ProgramCard>

          <ProgramCard
            id="events"
            wide="md"
            visual="/graphics/halftone/events-calendar.webp"
            visualClassName="grid-paper [background-position:center] [background-size:24px_24px]"
            imageClassName="!object-contain"
            visualAlt="A month calendar with event days marked in blue and one date circled in red"
            meta="Open to everyone"
            title="Events"
            className="w-[82%] sm:w-[46%] md:w-auto"
            action={<Button href={EVENTS_CALENDAR_URL} external variant="secondary">Subscribe on Luma</Button>}
          >
            We host guest talks, workshops, discussions, and socials throughout the semester.
          </ProgramCard>
        </div>

        <p className="mt-10 text-[0.9375rem] leading-7 text-slate-600">
          If you’d rather learn on your own, our{" "}
          <Link href="/resources" className="text-link">resources page</Link> has courses, fellowships, and a reading
          library.
        </p>
      </Section>

      <section id="contribute" className="scroll-mt-24 pt-20 sm:pt-28 lg:pt-32">
        <Container>
          <div className="grid gap-6 border-t border-blue pt-8 lg:grid-cols-12 lg:gap-8">
            <h2 className="display-title text-[2.125rem] leading-[1.08] sm:text-5xl lg:col-span-5">Help Organize</h2>
            <div className="lg:col-span-7">
              <p className="lead-copy">
                Help organize events, support research, or contribute to outreach, design, and operations. We welcome
                technical, policy, economics, and other perspectives on AI. Reach out to a team member with an idea or
                an area you’d like to help with.
              </p>
              <div className="mt-8">
                <Button href="/team" variant="secondary">Reach Out to the Team</Button>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
