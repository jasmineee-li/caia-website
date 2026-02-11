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
    title: "Technical Paper Reading Group",
    description: [
      "CAIA runs a weekly open technical ML reading group led by experienced TAs.",
      "Sessions cover recent significant papers in AI and ML safety, meet weekly in small groups, and provide dinner.",
      "There is no additional required work outside meetings.",
    ],
    ctaLabel: "Join the CAIA Slack",
    ctaHref:
      "https://join.slack.com/t/cornellaialignment/shared_invite/zt-3hzie60ir-Ai4TDMKHUCFSpKZDcMbb0w",
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
