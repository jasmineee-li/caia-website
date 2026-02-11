import type { Metadata } from "next";
import Button from "@/components/ui/Button";
import MotionReveal from "@/components/ui/MotionReveal";
import Section from "@/components/ui/Section";
import { EVENTS_CALENDAR_URL, EVENTS_EMBED_URL, PAST_EVENT_IDS } from "@/content/events";
import { createPageMetadata } from "@/content/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Events",
  description:
    "Explore upcoming Cornell AI Alignment talks, workshops, and socials, and browse selected past events.",
  path: "/events",
  keywords: ["Cornell AI Alignment events", "Cornell AI", "talks", "workshops", "AI safety events"],
});

export default function EventsPage() {
  return (
    <main>
      <Section
        title="Talks, workshops, and socials"
        subtitle="Discover what is coming up and browse highlights from previous CAIA events."
      >
        <MotionReveal>
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-slate-600 sm:text-base">
              Subscribe to receive updates in your calendar.
            </p>
            <Button href={EVENTS_CALENDAR_URL} external variant="secondary">
              Subscribe to Events Calendar
            </Button>
          </div>

          <div className="overflow-hidden">
            <iframe
              src={EVENTS_EMBED_URL}
              className="h-[560px] w-full rounded-xl border border-slate-200"
              style={{ border: "1px solid rgba(148, 163, 184, 0.35)" }}
              allowFullScreen
              title="Upcoming CAIA events"
            />
          </div>
        </MotionReveal>
      </Section>

      <Section
        title="Past Events"
        subtitle="Selected event pages from previous semesters."
      >
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {PAST_EVENT_IDS.map((eventId, index) => (
            <MotionReveal
              key={eventId}
              delayClass={index === 1 ? "motion-delay-1" : index >= 2 ? "motion-delay-2" : undefined}
            >
              <div className="overflow-hidden p-2">
                <iframe
                  src={`https://luma.com/embed/event/evt-${eventId}/simple`}
                  className="h-[450px] w-full rounded-lg border border-slate-200"
                  style={{ border: "1px solid rgba(148, 163, 184, 0.35)" }}
                  allow="fullscreen; payment"
                  title={`Past event ${eventId}`}
                />
              </div>
            </MotionReveal>
          ))}
        </div>
      </Section>
    </main>
  );
}
