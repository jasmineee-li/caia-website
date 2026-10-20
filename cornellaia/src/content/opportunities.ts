/**
 * Application forms. `null` means the application is not open yet: the page shows an
 * "Application opens soon" placeholder in place of the Apply button.
 */
export const APPLICATIONS: Record<
  "researchTeam" | "technicalReadingGroup" | "policyReadingGroup",
  string | null
> = {
  researchTeam: null,
  technicalReadingGroup: "https://airtable.com/appjO4DuQKwI1MaNr/shrW1K1BBdGfgjDLe",
  policyReadingGroup: "https://airtable.com/appjO4DuQKwI1MaNr/shruuVk6rF2LarJu2",
};

/** What every research team project gets, shown on the research and Get Involved pages. */
export const RESEARCH_TEAM_PERKS = [
  { title: "$800+ per project", text: "Every project receives at least $800 in funding." },
  { title: "1–2 mentors", text: "Each project is guided by one or two experienced AI safety researchers." },
  { title: "A publication", text: "Each project produces a publication or report by the end of the semester." },
] as const;

export interface TeamProject {
  title: string;
  mentors: string[];
  summary: string;
  topics: string[];
}

/**
 * TODO: filler projects until this semester’s projects are finalized.
 */
export const FALL_2026_PROJECTS: TeamProject[] = [
  {
    title: "Value Drift Under Recursive Training Loops",
    mentors: ["Lionel Levine", "Rauno Arike"],
    summary:
      "A model reflects on its own constitution, edits it, and is then trained on the edited version, over many rounds. This project studies where its values end up, including whether they settle into stable attractors and whether some of those attractors give less weight to human oversight.",
    topics: ["Value Alignment"],
  },
  {
    title: "AI Policy and Governance",
    mentors: ["Rittik Bhattacharya", "Elle Kim"],
    summary:
      "A policy research project on how governments and institutions can govern increasingly capable AI. The team will pick a focused question, such as regulation, compute governance, or the economic effects of AI, and write a policy report for decision-makers.",
    topics: ["Policy", "Governance"],
  },
  {
    title: "Strategy-Proof Training to Avoid Metagaming",
    mentors: ["Jinzhou Wu", "Suvadip Sana"],
    summary:
      "Models that can tell when they are being trained may adjust their behavior to steer the outcome, a form of metagaming that undermines training. Drawing on strategy-proofness from mechanism design, this project asks whether training can be set up so that behaving honestly is a model’s best strategy.",
    topics: ["Training Gaming", "Mechanism Design"],
  },
  {
    title: "Digital Homeostasis",
    mentors: ["Jinzhou Wu", "Shuqin Ma"],
    summary:
      "Inspired by how living organisms keep themselves within viable bounds, this project asks whether language models actively maintain parts of their own internal state. We perturb their activations and use probes and sparse autoencoders to look for signs of active regulation.",
    topics: ["Interpretability", "Cognitive Science"],
  },
];
