import Image from "next/image";
import HomeCommunity from "@/components/HomeCommunity";
import FuturesField from "@/components/FuturesField";
import InstagramButton from "@/components/InstagramButton";
import Link from "next/link";
import type { Metadata } from "next";
import Button from "@/components/ui/Button";
import NewsCarousel from "@/components/NewsCarousel";
import CircularGallery from "@/components/CircularGallery";
import Container from "@/components/ui/Container";
import MotionReveal from "@/components/ui/MotionReveal";
import Section from "@/components/ui/Section";
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
    "Explore AI safety at Cornell through student research, talks, workshops, and courses. Connect with the Cornell AI Alignment community.",
  path: "/",
  keywords: ["Cornell AI Alignment", "AI safety", "student organization", "alignment research"],
});

export default function Home() {
  return (
    <main>
      <section className="relative isolate overflow-hidden">
        <FuturesField
          anchorSelector="[data-hero-copy]"
          className="absolute inset-0 z-0 [mask-image:linear-gradient(to_bottom,#000_86%,transparent)]"
        />

        <Container className="relative z-10 flex flex-col pt-12 pb-[calc(min(92vw,400px)_-_28px)] sm:pt-16 sm:pb-[min(70vw,520px)] lg:min-h-[calc(100svh-86px)] lg:pb-[22rem] lg:pt-[13vh]">
          <MotionReveal>
            <div data-hero-copy className="max-w-[46rem]">
              <h1 className="display-title text-[2.6rem] leading-[1.05] sm:text-6xl lg:text-[4.25rem]">
                {HOME_HERO.title}
              </h1>
              <p className="lead-copy mt-5 max-w-[40rem]">{HOME_HERO.subtitle}</p>

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
                <InstagramButton />
              </div>
            </div>
          </MotionReveal>
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
            <Button href={EVENTS_CALENDAR_URL} external variant="primary">
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
        subtitle="Selected papers by CAIA community members."
      >
        <MotionReveal>
          <div className="relative h-[520px] overflow-hidden rounded-xl border border-slate-200 sm:h-[620px] lg:h-[680px]">
            <CircularGallery
              items={RESEARCH_PAPERS.filter(
                (paper): paper is typeof paper & { imageSrc: string } => !paper.kind && Boolean(paper.imageSrc),
              ).map((paper) => ({
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
