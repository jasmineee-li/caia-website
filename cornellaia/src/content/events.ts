export const EVENTS_CALENDAR_URL = "https://luma.com/cornellaia";

export const EVENTS_EMBED_URL =
  "https://luma.com/embed/calendar/cal-NrH7EP037bvvQtm/events?lt=light";

const PAST_EVENT_IDS = [
  "jst12JWoIZq2MEY",
  "vfwzibwhJEsB2sx",
  "gZ1HLC8ZVDneIqZ",
  "IXGr5rIHSYR4urE",
  "PLy4Dev5zraVoAo",
  "kObcYzfFqgVPvTN",
  "v9Juq969L7tifIN",
  "SuD0alEFo8h3ea1",
  "UmCIEAb6WnAeZE8",
];

export const PAST_EVENTS = [
  {
    title:
      "CAIA Reading Group: Concrete Problems in AI Safety & the OpenAI / Hugging Face Incident",
    embedUrl: "https://luma.com/embed/event/evt-IMXC3KrunBrBXGL/simple",
  },
  {
    title: "CAIA End-of-Semester Social",
    embedUrl: "https://luma.com/embed/event/evt-IUSkaQG54gA9czw/simple",
  },
  {
    title: "Dinner Social",
    embedUrl: "https://luma.com/embed/event/evt-aPXYSVBUTWhJDSf/simple",
  },
  ...PAST_EVENT_IDS.map((eventId, index) => ({
    title: `Past CAIA event ${index + 1}`,
    embedUrl: `https://luma.com/embed/event/evt-${eventId}/simple`,
  })),
];
