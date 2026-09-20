import Image from "next/image";
import HomeCommunity from "@/components/HomeCommunity";
import HomeHeroVisual from "@/components/HomeHeroVisual";
import Link from "next/link";
import type { Metadata } from "next";
import Button from "@/components/ui/Button";
import NewsCarousel from "@/components/NewsCarousel";
import CircularGallery from "@/components/CircularGallery";
import Container from "@/components/ui/Container";
import MotionReveal from "@/components/ui/MotionReveal";
import Section from "@/components/ui/Section";
import TextType from "@/components/ui/TextType";
import {
  HOME_CTA_ITEMS,
  HOME_HERO,
  HOME_SPONSORS,
} from "@/content/home";
import { EVENTS_CALENDAR_URL, EVENTS_EMBED_URL } from "@/content/events";
import { RESEARCH_PAPERS } from "@/content/research";
import { createPageMetadata } from "@/content/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Home",
  description:
    "Join Cornell’s community of students, faculty, and researchers working on technical AI safety, policy, and governance. Open events, hands-on learning, and research for a better AI future.",
  path: "/",
  keywords: ["Cornell AI Alignment", "AI safety", "student organization", "alignment research"],
});

export default function Home() {
  return (
    <main>
      <section
        aria-label="CS 1998 course announcement"
        className="border-b border-slate-200 bg-white"
      >
        <Container>
          <Link
            href="/programs/cs1998"
            aria-label="CS 1998: Intro to AI Safety & Alignment, Fall 2026 course details"
            className="group focus-ring flex items-center justify-between gap-2 py-3 text-left"
          >
            <span className="flex min-w-0 items-center gap-2 sm:gap-3">
              <span className="inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap text-xs font-semibold text-brand-red min-[380px]:text-sm sm:gap-2">
                <span
                  aria-hidden="true"
                  className="hidden h-2 w-2 rounded-full bg-brand-red sm:block"
                />
                <span className="sm:hidden">FA26</span>
                <span className="hidden sm:inline">Fall 2026</span>
              </span>
              <span className="whitespace-nowrap text-xs font-semibold text-slate-950 min-[380px]:text-sm sm:text-base">
                <span className="sm:hidden">CS 1998: Intro to AI Safety &amp; Alignment</span>
                <span className="hidden sm:inline">CS 1998: Intro to AI Safety &amp; Alignment</span>
              </span>
            </span>
            <span className="inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-brand-red transition group-hover:text-brand-red-strong">
              <span className="hidden underline decoration-brand-red/35 underline-offset-4 sm:inline">
                Course details
              </span>
              <svg className="h-4 w-4" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="m6 3 5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </Link>
        </Container>
      </section>

      <section className="pt-12 pb-10 sm:pt-24 sm:pb-16">
        <Container>
            <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
              <MotionReveal>
                <TextType
                  as="h1"
                  text={HOME_HERO.title}
                  typingSpeed={75}
                  pauseDuration={1500}
                  showCursor
                  cursorCharacter="▎"
                  deletingSpeed={50}
                  variableSpeedEnabled={false}
                  variableSpeedMin={60}
                  variableSpeedMax={120}
                  cursorBlinkDuration={0.5}
                  loop={false}
                  className="display-title text-4xl leading-tight sm:text-5xl lg:text-6xl"
                />
                <p className="lead-copy mt-5 max-w-2xl">{HOME_HERO.subtitle}</p>

                <div className="mt-8 flex flex-wrap gap-3">
                  {HOME_CTA_ITEMS.map((item) => (
                    <Button
                      key={item.label}
                      href={item.href}
                      external={item.external}
                      variant={item.style === "secondary" ? "secondary" : "primary"}
                    >
                      {item.label}
                    </Button>
                  ))}
                </div>
              </MotionReveal>

              <MotionReveal delayClass="motion-delay-2">
                <HomeHeroVisual src="/graphics/robot-hand.avif" />
              </MotionReveal>
            </div>
        </Container>
      </section>

      <HomeCommunity />

      <Section
        title="Upcoming Events"
        className="mt-4"
        subtitle="Join talks, reading sessions, and workshops from the CAIA community."
      >
        <MotionReveal>
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-slate-600 sm:text-base">
              Subscribe to get events directly on your calendar.
            </p>
            <Button href={EVENTS_CALENDAR_URL} external variant="secondary">
              Subscribe to Events Calendar
            </Button>
          </div>
          <div className="overflow-hidden">
            <iframe
              src={EVENTS_EMBED_URL}
              className="h-[520px] w-full rounded-xl border border-slate-200"
              style={{ border: "1px solid rgba(148, 163, 184, 0.35)" }}
              allowFullScreen
              title="CAIA upcoming events"
            />
          </div>
          <div className="mt-6">
            <Link
              href="/events#events"
              className="inline-flex text-sm font-semibold text-slate-900 underline decoration-slate-400 underline-offset-4 hover:text-slate-950 sm:text-base"
            >
              See all events
            </Link>
          </div>
        </MotionReveal>
      </Section>

      <Section
        title="News"
        className="mt-4"
      >
        <NewsCarousel />

        <MotionReveal delayClass="motion-delay-2">
          <div className="mt-6">
            <Link
              href="/news"
              className="inline-flex text-sm font-semibold text-slate-900 underline decoration-slate-400 underline-offset-4 hover:text-slate-950 sm:text-base"
            >
              View all news
            </Link>
          </div>
        </MotionReveal>
      </Section>

      <Section
        title="Recent Work"
        className="mt-4"
        subtitle="Selected papers and projects by CAIA community members."
      >
        <MotionReveal>
          <div className="relative h-[520px] overflow-hidden rounded-xl border border-slate-200 sm:h-[620px] lg:h-[680px]">
            <CircularGallery
              items={RESEARCH_PAPERS.map((paper) => ({
                image: paper.imageSrc,
                title: paper.title,
                badge: paper.shortTag ?? (paper.tags.length > 0 ? paper.tags[0] : undefined),
                href: paper.href,
              }))}
              textColor="#0f172a"
              borderRadius={0.03}
              bend={2}
              scrollSpeed={0.5}
              scrollEase={0.05}
            />
          </div>
        </MotionReveal>
        <MotionReveal delayClass="motion-delay-1">
          <div className="mt-6">
            <Link
              href="/research"
              className="inline-flex text-sm font-semibold text-slate-900 underline decoration-slate-400 underline-offset-4 hover:text-slate-950 sm:text-base"
            >
              Explore all research
            </Link>
          </div>
        </MotionReveal>
      </Section>

      <Section title="Our members have worked with:" className="mt-4">
        <MotionReveal>
          <div className="mb-6 overflow-hidden rounded-2xl border border-slate-200 bg-white p-4 sm:p-5">
            <Image
              src="/graphics/beam-lines.svg"
              alt="Decorative AI data beams"
              width={980}
              height={220}
              className="h-auto w-full"
              loading="lazy"
              sizes="(max-width: 768px) 100vw, 980px"
            />
          </div>
          <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4">
            {HOME_SPONSORS.map((sponsor) => (
              <a
                key={sponsor.name}
                href={sponsor.href}
                target="_blank"
                rel="noopener noreferrer"
                className="focus-ring surface-card flex min-h-28 items-center justify-center p-5 transition hover:border-slate-300 sm:min-h-32"
                aria-label={`${sponsor.name} website`}
              >
                <Image
                  src={sponsor.src}
                  alt={`${sponsor.name} logo`}
                  width={320}
                  height={120}
                  className="h-auto max-h-16 w-auto sm:max-h-20"
                  loading="lazy"
                  sizes="(max-width: 640px) 40vw, (max-width: 1024px) 26vw, 220px"
                  quality={75}
                />
              </a>
            ))}
          </div>
        </MotionReveal>
      </Section>
    </main>
  );
}
