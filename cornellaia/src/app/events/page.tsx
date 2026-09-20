import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import Button from "@/components/ui/Button";
import { EVENTS_CALENDAR_URL, EVENTS_EMBED_URL, PAST_EVENTS } from "@/content/events";
import { createPageMetadata } from "@/content/seo";

export const metadata = createPageMetadata({
  title: "Events",
  path: "/events",
  description: "Upcoming Cornell AI Alignment events and past talks, workshops, discussions, and socials.",
});

export default function EventsPage() {
  return (
    <main>
      <Container className="pt-14 sm:pt-20">
        <h1 className="display-title text-4xl sm:text-5xl">Events</h1>
        <p className="lead-copy mt-5 max-w-2xl">Upcoming events and past talks, workshops, discussions, and socials.</p>
      </Container>

      <Section id="events" title="Upcoming Events" className="scroll-mt-24">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
          <p className="lead-copy">Subscribe to get upcoming events on your calendar.</p>
          <Button href={EVENTS_CALENDAR_URL} external variant="secondary">Subscribe on Luma</Button>
        </div>
        <iframe src={EVENTS_EMBED_URL} title="Upcoming CAIA events" className="h-[520px] w-full rounded-xl border border-slate-200" allowFullScreen />
      </Section>

      <Section id="past-events" title="Past Events" className="scroll-mt-24">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {PAST_EVENTS.map(event => (
            <div key={event.embedUrl} className="overflow-hidden p-2">
              <iframe
                src={event.embedUrl}
                title={event.title}
                className="h-[450px] w-full rounded-lg border border-slate-200"
                allow="fullscreen; payment"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </Section>
    </main>
  );
}
