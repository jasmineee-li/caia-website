import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import Card from "@/components/ui/Card";
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
import { NEWS_ITEMS } from "@/content/news";
import { RESEARCH_PAPERS } from "@/content/research";
import { createPageMetadata } from "@/content/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Home",
  description:
    "Cornell AI Alignment is a student community focused on AI safety research, programs, and events at Cornell.",
  path: "/",
  keywords: ["Cornell AI Alignment", "AI safety", "student organization", "alignment research"],
});

export default function Home() {
  const latestNews = [...NEWS_ITEMS]
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 3);

  return (
    <main>
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
                <div className="relative mx-auto max-w-[27rem]">
                  <Image
                    src="/graphics/orb-grid.svg"
                    alt="Decorative orbital graphic"
                    width={460}
                    height={460}
                    className="h-auto w-full"
                    priority
                    sizes="(max-width: 640px) 280px, (max-width: 1024px) 360px, 460px"
                  />
                  <Image
                    src="/Title2.jpg"
                    alt="Abstract illustration for AI safety"
                    width={1280}
                    height={889}
                    className="absolute -bottom-6 right-0 w-[78%] rounded-3xl border border-white/80 object-cover"
                    sizes="(max-width: 640px) 58vw, (max-width: 1024px) 38vw, 360px"
                    quality={80}
                  />
                </div>
              </MotionReveal>
            </div>
        </Container>
      </section>

      <Section
        title="Managing risks from advanced AI is one of the most important challenges of our time."
        subtitle="CAIA is a community of student technical and policy researchers at Cornell working to reduce these risks and improve the trajectory of AI development."
      >
        <div className="space-y-6 text-[1.02rem] leading-8 text-slate-700 sm:text-lg">
          <MotionReveal>
            <p>
              We run an introduction to AI alignment fellowship covering topics like neural network
              interpretability, learning from human feedback, goal misgeneralization, eliciting latent
              knowledge, and evaluating dangerous capabilities in models. Interested students can learn
              more on the{" "}
              <Link href="/get-involved" className="font-semibold text-brand-red underline underline-offset-4">
                programs page
              </Link>
              .
            </p>
          </MotionReveal>

          <MotionReveal delayClass="motion-delay-1">
            <p>
              We also run an intermediate technical reading group, support undergraduate and graduate
              students in original research, and host workshops and socials.
            </p>
          </MotionReveal>

          <MotionReveal delayClass="motion-delay-2">
            <p>
              Managing risks from advanced artificial intelligence is an urgent global problem
              <sup className="ml-1 text-brand-red">
                <a href="https://arxiv.org/pdf/2310.17688" target="_blank" rel="noopener noreferrer">
                  1
                </a>
              </sup>
              . If you want to get involved, start by{" "}
              <a
                href="https://airtable.com/appWFSZWeVJ4rXa6l/pag8SMoRy0Hm9knXF/form"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-brand-red underline underline-offset-4"
              >
                joining our mailing list
              </a>
              .
            </p>
          </MotionReveal>
        </div>
      </Section>

      <Section
        title="Upcoming Events"
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
              href="/events"
              className="inline-flex text-sm font-semibold text-brand-red underline decoration-brand-red/35 underline-offset-4 hover:text-brand-red-strong sm:text-base"
            >
              See all events
            </Link>
          </div>
        </MotionReveal>
      </Section>

      <Section
        title="News"
        subtitle="Most recent updates from Cornell AI Alignment."
      >
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {latestNews.map((item, index) => (
            <MotionReveal
              key={`${item.title}-${item.date}`}
              delayClass={index === 1 ? "motion-delay-1" : index >= 2 ? "motion-delay-2" : undefined}
            >
              <Card className="flex h-full flex-col gap-3">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge>{item.category}</Badge>
                  <time dateTime={item.date} className="text-sm text-slate-500">
                    {item.displayDate}
                  </time>
                </div>
                <h3 className="text-xl font-semibold text-slate-900">{item.title}</h3>
                <p className="text-sm leading-7 text-slate-700 sm:text-base">{item.summary}</p>
                {item.href && (
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-auto inline-flex text-sm font-semibold text-brand-red underline decoration-brand-red/35 underline-offset-4 hover:text-brand-red-strong"
                  >
                    Read update
                  </a>
                )}
              </Card>
            </MotionReveal>
          ))}
        </div>

        <MotionReveal delayClass="motion-delay-2">
          <div className="mt-6">
            <Link
              href="/news"
              className="inline-flex text-sm font-semibold text-brand-red underline decoration-brand-red/35 underline-offset-4 hover:text-brand-red-strong sm:text-base"
            >
              View all news
            </Link>
          </div>
        </MotionReveal>
      </Section>

      <Section
        title="Recent Work"
        subtitle="Selected papers and projects by CAIA community members."
      >
        <MotionReveal>
          <div className="relative h-[520px] overflow-hidden rounded-xl border border-slate-200 sm:h-[620px] lg:h-[680px]">
            <CircularGallery
              items={RESEARCH_PAPERS.map((paper) => ({
                image: paper.imageSrc,
                title: paper.title,
                badge: paper.tags.length > 0 ? paper.tags[0] : undefined,
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
              className="inline-flex text-sm font-semibold text-brand-red underline decoration-brand-red/35 underline-offset-4 hover:text-brand-red-strong sm:text-base"
            >
              Explore all research
            </Link>
          </div>
        </MotionReveal>
      </Section>

      <Section title="Our members have worked with:">
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
