import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import FuturesField from "@/components/FuturesField";
import Arrow from "@/components/ui/Arrow";
import Button from "@/components/ui/Button";
import NewsCarousel from "@/components/NewsCarousel";
import ResearchCard, { ResearchRowHeader } from "@/components/ResearchCard";
import Container from "@/components/ui/Container";
import MotionReveal from "@/components/ui/MotionReveal";
import Section from "@/components/ui/Section";
import AiSafetyIntro from "@/components/home/AiSafetyIntro";
import TheoryOfChange from "@/components/home/TheoryOfChange";
import HighlightStatement from "@/components/home/HighlightStatement";
import LogoBand from "@/components/home/LogoBand";
import { HOME_CTA_ITEMS, HOME_HERO } from "@/content/home";
import { EVENTS_CALENDAR_URL, EVENTS_EMBED_URL } from "@/content/events";
import { RESEARCH_PAPERS } from "@/content/research";
import { createPageMetadata } from "@/content/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Home",
  description:
    "Explore AI safety at Cornell through student research, talks, workshops, and courses. Connect with the Cornell AI Alignment community.",
  path: "/",
  keywords: ["Cornell AI Alignment", "AI safety", "student organization", "alignment research"],
});

/** Papers only (not projects, notes, or posts), newest first. */
const RECENT_PAPERS = RESEARCH_PAPERS.filter((paper) => !paper.kind).slice(0, 6);

const SLACK = HOME_CTA_ITEMS[0];

function ArrowLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="group text-link inline-flex items-center whitespace-nowrap text-[0.9375rem]">
      {children} <Arrow className="ml-1 transition-transform group-hover:translate-x-0.5" />
    </Link>
  );
}

export default function Home() {
  return (
    <main>
      {/* Hero: the futures fan over grid paper, as on the campaign poster and the slide cover.
          The grid is centred and anchored to the bottom edge, so its last row closes on a rule. */}
      <section className="grid-paper relative isolate overflow-hidden border-b border-grid [background-position:center_bottom] lg:[background-position:184px_bottom] xl:[background-position:center_bottom]">
        <FuturesField
          anchorSelector="[data-hero-copy]"
          className="absolute inset-0 z-0 [mask-image:linear-gradient(to_bottom,#000_86%,transparent)]"
        />

        <Container className="relative z-10 flex flex-col pt-14 pb-[calc(min(92vw,400px)_-_28px)] sm:pt-20 sm:pb-[min(70vw,520px)] lg:min-h-[calc(100svh-76px)] lg:pb-[22rem] lg:pt-[12vh]">
          <MotionReveal>
            <div data-hero-copy className="max-w-[52rem]">
              <h1 className="display-title text-[2.75rem] leading-[1.04] sm:text-[3.75rem] lg:text-[clamp(3.75rem,5.4vw,4.875rem)]">
                {HOME_HERO.title}
              </h1>
              <p className="lead-copy mt-6 max-w-[34rem] sm:mt-8">{HOME_HERO.subtitle}</p>
              <div className="mt-8 flex flex-wrap gap-3 sm:mt-10">
                <Button href={SLACK.href} external>
                  {SLACK.label}
                </Button>
                <Button href="/join" variant="secondary">
                  Get Involved
                </Button>
              </div>
            </div>
          </MotionReveal>
        </Container>
      </section>

      {/* Mission, set like a page of Cornell notes: the label in the cue column, a margin
          rule dropping from the line above, and the statement written on ruled lines. The
          rule sits midway between the label and the statement. The cue column is 136px, and
          the hero grid is positioned so that one of its lines lands on the rule. */}
      <section aria-label="Our mission">
        <Container>
          <div className="grid lg:grid-cols-[136px_minmax(0,1fr)]">
            <div className="pt-20 sm:pt-28 lg:pt-40">
              <p className="mono-label text-brand-red lg:pt-4">Our mission</p>
            </div>
            <div className="pb-24 pt-6 sm:pb-32 lg:border-l lg:border-grid lg:pb-40 lg:pl-10 lg:pt-40">
              <HighlightStatement
                ruled
                className="display-title text-[1.875rem] leading-[1.32] sm:text-[2.5rem] lg:text-[3rem]"
                before=""
                marked="Managing risks from advanced AI"
                after=" is one of the most important challenges of our time."
              />
              <p className="lead-copy mt-8 max-w-2xl sm:mt-10">
                We bring together technical AI safety, policy, governance, and broader conversations about AI to ensure
                that increasingly capable AI systems remain aligned with human intentions and benefit all of humanity.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <AiSafetyIntro />

      <TheoryOfChange />

      <Section
        id="events"
        title="Upcoming Events"
        subtitle="We host talks, reading groups, workshops, and socials throughout the semester, and anyone is welcome to come."
        action={<Button href={EVENTS_CALENDAR_URL} external variant="secondary">Subscribe on Luma</Button>}
      >
        <iframe
          src={EVENTS_EMBED_URL}
          className="h-[560px] w-full border border-slate-200 bg-white"
          allowFullScreen
          loading="lazy"
          title="CAIA upcoming events"
        />
        <div className="mt-6">
          <ArrowLink href="/events#past-events">Past events</ArrowLink>
        </div>
      </Section>

      <Section
        id="news"
        title="News"
        subtitle="Recent updates from CAIA, including events, papers, and announcements."
        action={<ArrowLink href="/news">All news</ArrowLink>}
      >
        <NewsCarousel />
      </Section>

      <Section
        id="recent-work"
        title="Recent Work"
        subtitle="A few recent papers that CAIA members have worked on."
        action={<ArrowLink href="/research">All research</ArrowLink>}
      >
        <ResearchRowHeader />
        <div className="border-t border-blue">
          {RECENT_PAPERS.map((paper) => (
            <ResearchCard key={paper.title} paper={paper} variant="row" />
          ))}
        </div>
      </Section>

      <LogoBand />

      {/* Join: a real photo beside the invitation, ending the page on the call to action. */}
      <section aria-labelledby="join-title" className="pt-24 sm:pt-32">
        <Container>
          <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[4px] lg:col-span-7">
              <Image
                src="/graphics/join-us-discussion.jpg"
                alt="CAIA members in a discussion around a seminar table"
                fill
                sizes="(min-width: 1024px) 700px, 100vw"
                className="object-cover"
              />
            </div>
            <div className="lg:col-span-5">
              <p className="mono-label text-brand-red">Join us</p>
              <h2 id="join-title" className="display-title mt-4 text-[2.125rem] leading-[1.08] sm:text-5xl">
                Open to Everyone
              </h2>
              <p className="lead-copy mt-6">
                All of our events are open to everyone. If you join our Slack, you’re considered a member. It’s where we
                share conversations, announcements, and opportunities.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button href={SLACK.href} external>{SLACK.label}</Button>
                <Button href="/join" variant="secondary">Ways to Get Involved</Button>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
