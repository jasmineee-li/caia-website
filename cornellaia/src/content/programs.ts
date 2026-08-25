import { EVENTS_CALENDAR_URL } from "@/content/events";

export interface ProgramItem {
  id: string;
  title: string;
  description: string[];
  ctaLabel?: string;
  ctaHref?: string;
  ctaExternal?: boolean;
}

export const PROGRAM_ITEMS: ProgramItem[] = [
  {
    id: "fellowship",
    title: "Introduction to AI Alignment Fellowship",
    description: [
      "CAIA runs an 8-week introductory fellowship on AI safety, covering technical and policy topics including interpretability, learning from human feedback, US AI policy, and catastrophic risk from advanced systems.",
      "The fellowship is open to undergraduate and graduate students. Students with ML experience are encouraged to apply, but no prior experience is required.",
      "The program meets weekly in small groups with dinner provided and no additional required work outside meetings.",
    ],
    ctaLabel: "Join our mailing list for the next fellowship",
    ctaHref: "https://airtable.com/appWFSZWeVJ4rXa6l/pag8SMoRy0Hm9knXF/form",
    ctaExternal: true,
  },
  {
    id: "reading-group",
    title: "Paper Discussion Section",
    description: [
      "Each week, CAIA runs an open paper discussion section focused on frontier and recent work in AI safety.",
      "Participants read the selected paper in advance, then discuss its methods, evidence, limitations, and implications together.",
    ],
    ctaLabel: "Subscribe on Luma",
    ctaHref: EVENTS_CALENDAR_URL,
    ctaExternal: true,
  },
  {
    id: "general-body",
    title: "General Body Meetings",
    description: [
      "CAIA also hosts weekly community events, including workshops, tutorials, research salons, invited speaker talks, informal debates, and other opportunities to learn and connect.",
      "Subscribe to our Luma event page for the latest meeting topics, times, and locations.",
    ],
    ctaLabel: "Subscribe on Luma",
    ctaHref: EVENTS_CALENDAR_URL,
    ctaExternal: true,
  },
  {
    id: "research",
    title: "Student Research",
    description: [
      "CAIA supports original student research in AI safety.",
      "Students interested in technical or policy research can reach out to be connected with resources and a faculty or upperclassman mentor.",
    ],
  },
];
