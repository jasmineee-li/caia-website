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
  {
    id: "fellowship",
    title: "Introduction to AI Alignment Fellowship",
    description: [
      "In previous semesters, CAIA ran an 8-week introductory fellowship covering technical and policy topics in AI safety.",
      "For Fall 2026, we are running CS 1998: Intro to AI Safety & Alignment in place of the fellowship. The course develops the same foundations through lectures, technical notebooks, paper discussions, and a final project.",
    ],
    ctaLabel: "View CS 1998 course page",
    ctaHref: "/programs/cs1998",
  },
];
