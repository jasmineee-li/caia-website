import Link from "next/link";
import Image from "next/image";
import ApplicationButton from "@/components/ApplicationButton";
import InstagramButton from "@/components/InstagramButton";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Section from "@/components/ui/Section";
import Card from "@/components/ui/Card";
import CardLabel from "@/components/ui/CardLabel";
import { HOME_CTA_ITEMS } from "@/content/home";
import { EVENTS_CALENDAR_URL } from "@/content/events";
import { APPLICATIONS, RESEARCH_TEAM_PERKS } from "@/content/opportunities";
import { createPageMetadata } from "@/content/seo";
import styles from "./join.module.css";

export const metadata = createPageMetadata({
  title: "Get Involved",
  path: "/join",
  description: "Join Cornell AI Alignment on Slack, attend open events, explore AI safety programs and research opportunities, or help organize the community.",
});

const inlineLink = "font-semibold text-slate-900 underline decoration-wavy decoration-slate-400 underline-offset-4";

const READING_GROUPS = [
  {
    id: "technical-reading-group",
    title: "Technical Reading Group",
    schedule: "Every Monday, 4:30–5:30 pm",
    text: "Each week, we read a recent paper in technical AI safety, from interpretability and evaluations to scalable oversight, then discuss its methods, evidence, limitations, and implications together.",
    href: APPLICATIONS.technicalReadingGroup,
  },
  {
    id: "policy-reading-group",
    title: "Policy Reading Group",
    schedule: "Every Wednesday",
    text: "Each week, we read and discuss work on AI governance and policy: how advanced AI could reshape work, the economy, and the balance of power, and what institutions and policy can do about it.",
    href: APPLICATIONS.policyReadingGroup,
  },
];

/** The application button, pinned to the card's foot, with a note once the form is open. */
function ApplyRow({ href, label, note = "Reviewed on a rolling basis" }: { href: string | null; label: string; note?: string }) {
  return (
    <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-2">
      <ApplicationButton href={href} label={label} />
      {href && <span className="text-sm text-slate-500">{note}</span>}
    </div>
  );
}

export default function JoinPage() {
  return (
    <main>
      <Container className="pt-14 sm:pt-20">
        <h1 className="display-title text-4xl sm:text-5xl">Join Us</h1>
      </Container>

      <Section id="membership">
        <div className="grid items-center gap-8 lg:grid-cols-[1.1fr_1fr]">
          <div>
            <h2 className="display-title mb-4 text-3xl sm:mb-6 sm:text-4xl">We’re open to everyone</h2>
            <p className="max-w-xl text-base leading-8 sm:text-lg text-slate-600">
              All of our events are open to everyone. <strong>If you join our Slack, you’re considered a CAIA member!</strong> It’s where we share conversations,
              announcements, and opportunities.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-5">
              <div className="inline-flex items-center gap-3">
                <Button href={HOME_CTA_ITEMS[0].href} external>Join our Slack</Button>
                <InstagramButton />
              </div>
              <Link href="/events#events" className={inlineLink}>Find an event</Link>
            </div>
          </div>
          <Image
            src="/graphics/community-dot-grid.svg"
            width={720}
            height={480}
            alt=""
            className="h-auto w-full rounded-2xl"
            sizes="(max-width: 1024px) 100vw, 550px"
          />
        </div>
      </Section>

      <Section id="programs" title="Programs">
        <div className="grid gap-5 md:grid-cols-2">
          {READING_GROUPS.map((group) => (
            <Card key={group.id} id={group.id} className="flex scroll-mt-28 flex-col">
              <CardLabel>{group.schedule}</CardLabel>
              <h3 className="text-2xl">{group.title}</h3>
              <p className="mb-6 mt-3 text-base leading-7 sm:text-lg text-slate-600">{group.text}</p>
              <ApplyRow href={group.href} label="Apply" />
            </Card>
          ))}
        </div>

        <Card id="research" className="mt-5 scroll-mt-28">
          <div className="grid gap-6 lg:grid-cols-[1.15fr_1fr] lg:gap-12">
            <div className="flex flex-col">
              <CardLabel>Fall 2026</CardLabel>
              <h3 className="text-2xl">Research Team</h3>
              <p className="mb-6 mt-3 text-base leading-7 sm:text-lg text-slate-600">
                Spend the semester on an AI safety research project with a small team of Cornell
                students. See this semester’s <Link href="/research#projects" className={inlineLink}>projects</Link>,
                or bring an idea of your own.
              </p>
              <ApplyRow href={APPLICATIONS.researchTeam} label="Apply to the research team" />
            </div>
            <dl className="grid content-start gap-5 border-t border-slate-200 pt-6 sm:grid-cols-3 lg:grid-cols-1 lg:gap-0 lg:divide-y lg:divide-slate-200 lg:border-t-0 lg:pt-0">
              {RESEARCH_TEAM_PERKS.map((perk) => (
                <div key={perk.title} className="lg:py-3.5 lg:first:pt-0 lg:last:pb-0">
                  <dt className="display-title text-xl text-slate-900">{perk.title}</dt>
                  <dd className="mt-1 text-sm leading-6 text-slate-600 sm:text-base sm:leading-7">{perk.text}</dd>
                </div>
              ))}
            </dl>
          </div>
        </Card>

        <div className="mt-5 grid gap-5 md:grid-cols-2">
          <Card id="mentorship" className="flex scroll-mt-28 flex-col">
            <CardLabel>Rolling applications</CardLabel>
            <h3 className="text-2xl">Mentorship</h3>
            <p className="mb-6 mt-3 text-base leading-7 sm:text-lg text-slate-600">
              Apply for mentorship from our experienced organizers, who can offer guidance on
              learning AI safety, getting into research, and applying for fellowships and other
              opportunities.
            </p>
            <ApplyRow href={APPLICATIONS.mentorship} label="Apply for mentorship" />
          </Card>
          <Card id="events" className="flex scroll-mt-28 flex-col">
            <CardLabel>Open to everyone</CardLabel>
            <h3 className="text-2xl">Events</h3>
            <p className="mb-6 mt-3 text-base leading-7 sm:text-lg text-slate-600">
              We host guest talks, workshops, discussions, and socials throughout the
              semester. All of our events are open to everyone.
            </p>
            <div className={`${styles.eventActions} mt-auto flex flex-wrap items-center gap-x-5 gap-y-3 text-sm`}>
              <Button href={EVENTS_CALENDAR_URL} external variant="primary" aria-label="Subscribe on Luma" className="whitespace-nowrap"><span>Subscribe<span className={styles.lumaSuffix}> on Luma</span></span></Button>
              <Link href="/events#events" className={inlineLink}>Upcoming events</Link>
            </div>
          </Card>
        </div>

        <Card className="mt-5">
          <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <CardLabel>Course, Fall enrollment closed</CardLabel>
              <h3 className="text-2xl">CS 1998: Intro to AI Safety &amp; Alignment</h3>
              <p className="mt-3 max-w-3xl text-base leading-7 sm:text-lg text-slate-600">
                Learn through lectures, hands-on notebooks, discussions, and a research
                project. Fall enrollment is closed, but course materials are open
                to everyone. Join our Slack for future semester announcements.
              </p>
            </div>
            <Button href="/programs/cs1998" variant="primary">Course &amp; materials</Button>
          </div>
        </Card>

        <p className="mt-6 text-base leading-7 text-slate-600">
          For independent study and research opportunities, see our <Link href="/resources" className={inlineLink}>courses, fellowships, and library</Link>.
        </p>
      </Section>

      <Section id="contribute" title="Want to contribute?">
        <p className="max-w-4xl text-base leading-8 sm:text-lg text-slate-600">
          Help organize events, support research, or contribute to outreach,
          design, and operations. We welcome technical, policy, economics,
          and other perspectives on AI. Reach out to a <Link href="/team" className={inlineLink}>team member</Link> with
          an idea or an area you’d like to help with.
        </p>
      </Section>
    </main>
  );
}
