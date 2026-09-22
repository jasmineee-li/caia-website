import Link from "next/link";
import Image from "next/image";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Section from "@/components/ui/Section";
import Card from "@/components/ui/Card";
import { HOME_CTA_ITEMS } from "@/content/home";
import { EVENTS_CALENDAR_URL } from "@/content/events";
import { createPageMetadata } from "@/content/seo";
import styles from "./join.module.css";

export const metadata = createPageMetadata({
  title: "Get Involved",
  path: "/join",
  description: "Join Cornell AI Alignment on Slack, attend open events, explore AI safety programs and research opportunities, or help organize the community.",
});

const inlineLink = "font-semibold text-slate-900 underline decoration-wavy decoration-slate-400 underline-offset-4";

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
              announcements, and opportunities. Active and engaged members will
              be recognized as fellows.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-5">
              <Button href={HOME_CTA_ITEMS[0].href} external>Join our Slack</Button>
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

      <Section id="fellows" title="Fellows">
        <p className="max-w-4xl text-base leading-8 sm:text-lg text-slate-600">
          We track participation and contributions, recognizing active, engaged
          members as CAIA fellows. Fellows are invited to exclusive socials and
          receive priority for opportunities shared through CAIA.
        </p>
      </Section>

      <Section id="programs" title="Programs">
        <Card className="mb-5">
          <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <p className="mb-2 text-sm font-semibold text-brand-red">Course, Fall enrollment closed</p>
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

        <div className="grid gap-5 md:grid-cols-2">
          <Card id="events" className="flex scroll-mt-28 flex-col">
            <h3 className="text-2xl">Events</h3>
            <p className="mb-5 mt-3 text-base leading-7 sm:text-lg text-slate-600">
              We host weekly reading groups and discussions, alongside guest
              talks, workshops, and socials. All events are open to everyone.
            </p>
            <div className={`${styles.eventActions} mt-auto flex flex-wrap items-center gap-x-5 gap-y-3 text-sm`}>
              <Button href={EVENTS_CALENDAR_URL} external variant="primary" aria-label="Subscribe on Luma" className="whitespace-nowrap"><span>Subscribe<span className={styles.lumaSuffix}> on Luma</span></span></Button>
              <Link href="/events#events" className={inlineLink}>Upcoming events</Link>
            </div>
          </Card>
          <Card id="research" className="flex scroll-mt-28 flex-col">
            <h3 className="text-2xl">Research</h3>
            <p className="mb-5 mt-3 text-base leading-7 sm:text-lg text-slate-600">
              Meet members working on technical AI safety and policy, discuss
              project ideas, and find collaborators and mentors. If you’re interested
              in research, we can connect you with projects, fellowships, and other
              research opportunities.
            </p>
            <Link href="/research" className={`mt-auto text-sm ${inlineLink}`}>Explore our research</Link>
          </Card>
        </div>
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
