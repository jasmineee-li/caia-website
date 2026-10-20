import PageHeader from "@/components/ui/PageHeader";
import Section from "@/components/ui/Section";
import Button from "@/components/ui/Button";
import { EVENTS_CALENDAR_URL, EVENTS_EMBED_URL, PAST_EVENTS } from "@/content/events";
import { createPageMetadata } from "@/content/seo";

export const metadata = createPageMetadata({
  title: "Events",
  path: "/events",
  description: "Find upcoming AI safety talks, workshops, discussions, and socials at Cornell. Browse past events and subscribe to the Cornell AI Alignment calendar.",
});

export default function EventsPage() {
  return (
    <main>
      <PageHeader
        title="Events"
        lead={<p>We host guest talks, workshops, reading groups, and socials throughout the semester. All of our events are open to everyone.</p>}
      >
        <Button href={EVENTS_CALENDAR_URL} external>Subscribe on Luma</Button>
      </PageHeader>

      <Section id="events" title="Upcoming Events" className="pt-16 sm:pt-20 lg:pt-24">
        <iframe src={EVENTS_EMBED_URL} title="Upcoming CAIA events" className="h-[560px] w-full border border-slate-200 bg-white" allowFullScreen />
      </Section>

      <Section id="past-events" title="Past Events" titleNote={`(${PAST_EVENTS.length})`}>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {PAST_EVENTS.map(event => (
            <iframe
              key={event.embedUrl}
              src={event.embedUrl}
              title={event.title}
              className="h-[450px] w-full border border-slate-200 bg-white"
              allow="fullscreen; payment"
              loading="lazy"
            />
          ))}
        </div>
      </Section>
    </main>
  );
}
