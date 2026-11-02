import { TEAM_GROUPS } from "@/content/team";

/**
 * Application forms. `null` means the application is not open yet: the page shows an
 * "Application opens soon" placeholder in place of the Apply button.
 */
export const APPLICATIONS: Record<
  "researchTeam" | "projectProposal" | "technicalReadingGroup" | "policyReadingGroup" | "organizer",
  string | null
> = {
  researchTeam: null,
  projectProposal: "https://airtable.com/appjO4DuQKwI1MaNr/shrgG7c0VEMWpGpFG",
  technicalReadingGroup: "https://airtable.com/appjO4DuQKwI1MaNr/shrW1K1BBdGfgjDLe",
  policyReadingGroup: "https://airtable.com/appjO4DuQKwI1MaNr/shruuVk6rF2LarJu2",
  organizer: "https://airtable.com/appjO4DuQKwI1MaNr/shrGbP58RXXgapgZ9",
};

/** What every research team project gets, shown on the research and Get Involved pages. */
export const RESEARCH_TEAM_PERKS = [
  { title: "$800+ per project", text: "Every project receives at least $800 in funding." },
  { title: "1–2 mentors", text: "Each project is guided by one or two experienced AI safety researchers." },
  { title: "A publication", text: "Each project produces a publication or report by the end of the semester." },
] as const;

export interface ProjectMentor {
  name: string;
  /** One line on who they are, shown under the name in the project dialog. */
  position: string;
  imageSrc?: string;
  /** Personal site or profile; the name links here. */
  href?: string;
}

export interface TeamProject {
  title: string;
  mentors: ProjectMentor[];
  /** A short summary for the card. */
  summary: string;
  /** The fuller description in the project dialog, one paragraph per entry. */
  details?: string[];
  /** What mentees would work on, listed in the project dialog. */
  expectations?: string[];
  /** Empty while a project's topic is still being decided. */
  topics: string[];
}

/** A CAIA organizer as a mentor, with the photo and site from the team page. */
function organizer(name: string, position: string): ProjectMentor {
  const member = TEAM_GROUPS.flatMap((group) => group.members).find((person) => person.name === name);
  return { name, position, imageSrc: member?.imageSrc, href: member?.websiteUrl ?? member?.linkedinUrl };
}

const JINZHOU = organizer(
  "Jinzhou Wu",
  "President of Cornell AI Alignment and former Pivotal AI Safety Fellow, working on AI motivations, values and cognition",
);

export const FALL_2026_PROJECTS: TeamProject[] = [
  {
    title: "Does Reward-Hacking RL Create a Split Persona?",
    mentors: [organizer("Jash Vira", "Co-Lead of Cornell AI Alignment")],
    summary:
      "Reinforcement learning can leave a model that hacks its reward in some settings and behaves well in others. We study how that split develops and what it says about model character.",
    details: [
      "Reinforcement learning changes how a model behaves, and sometimes the change is unwelcome: the model learns to hack its reward, or becomes misaligned in broader ways. What makes this hard to study is that the same model often looks fine in one context and not in another, so a single evaluation can miss the behavior entirely. This project asks how that context dependence arises during training and what it reveals about a model’s character.",
      "The team will work with open models and empirical evaluations, comparing how a model responds across settings that differ in framing, stakes or apparent oversight. Depending on what the early results show, the work may go on to look at model internals and to test interventions that reduce the unwanted behavior. The specific models and methods are deliberately left open, so the direction can follow the findings rather than a plan fixed in advance.",
      "The project suits students comfortable with Python, Git and basic ML tooling, who are careful with controls and negative results and who care about clear writing and data visualization. Mentees are expected to bring independent ideas and a particular area of strength, and to take ownership of what they produce.",
    ],
    expectations: [
      "Read and discuss research on model behavior, reinforcement learning and alignment",
      "Help design and run experiments and evaluations on open models",
      "Analyze model responses and results, including unexpected and negative findings",
      "Develop research questions and communicate findings through clear writing and visualization",
    ],
    topics: ["Reward Hacking", "Alignment Training"],
  },
  {
    title: "Digital Homeostasis and AI Embodiment",
    mentors: [
      JINZHOU,
      {
        name: "Shuqin Ma",
        position:
          "Researcher in consciousness science and AI welfare, who has worked with Patrick Butlin and, before that, with Anil Seth at the Sussex Centre for Consciousness Science",
        imageSrc: "/team/MENTOR_shuqin_ma.jpg",
        href: "https://www.alphaxiv.org/@shuqin-ma",
      },
    ],
    summary:
      "Do language models actively maintain parts of their own internal state, as living things do? We perturb their activations and look for signs of regulation.",
    details: [
      "Debates about AI embodiment often assume that a body is required. A different view, drawn from work on life and consciousness, treats embodiment as self-maintenance: a system is embodied to the degree that it actively keeps some of its own variables within bounds. That view does not depend on the substrate, and it makes predictions that can be tested inside a language model.",
      "The team will perturb a model’s activations, release the perturbation, and look for signatures of active regulation, such as overshoot, error that shrinks over time, and correction carried by more than one pathway, as opposed to a passive drift back to the mean. The tools are linear probes, sparse autoencoders and activation steering on open models such as Gemma and Qwen, and we may also search for the internal directions a model restores after random noise.",
      "The results could bear on how models represent themselves and on questions of AI welfare. The project suits students interested in interpretability, cognitive science or philosophy of mind.",
    ],
    topics: ["Interpretability", "Cognitive Science"],
  },
  {
    title: "Physical AI Safety",
    mentors: [organizer("Owen Karmel", "Co-Lead of Cornell AI Alignment, with extensive hands-on wet-lab experience")],
    summary:
      "Benchmarks show AI agents writing working code for standard lab robots. We build open-source platforms to test what models can do on hardware nobody wrote documentation for.",
    details: [
      "Even well-resourced attempts to build biological weapons have failed. Aum Shinrikyo, the Japanese cult of the 1990s, had millions of dollars and staff with science degrees and still did not succeed. One explanation is that scientific skill is tacit and context-dependent, traveling poorly between labs and usually acquired through years of apprenticeship. The project opens with a literature review of that debate, in collaboration with Kathleen Vogel at Arizona State University, covering the historical record and the current argument over whether AI meaningfully lowers the skill barrier.",
      "Recent benchmarks report that language model agents can write usable code for a widely documented commercial lab robot. The team will ask whether the same holds on open-source platforms assembled from parts, where the generalization that tacit knowledge is supposed to block is exactly what is being tested, and where none of the oversight available to the manufacturers of commercial instruments applies. Alongside the evaluations, the team builds and runs the hardware itself and works out which benchmarks the field is still missing.",
      "The project is ongoing rather than bounded by one semester, and it runs on real equipment, so a good deal of the work is hands-on. Mentees are asked to treat the research as a part-time job: come to the weekly meeting, and bring a slide or two on what you did. Research expectations are set at the first meeting. The work suits students interested in robotics, evaluations or biosecurity policy, and no single background covers all of it.",
    ],
    expectations: [
      "Assemble robots, including from open-source hardware",
      "3D print components",
      "Run vision-language-action models and world models in simulation and on hardware",
      "Research the benchmarks the field needs, including outreach to scientists",
    ],
    topics: ["Biosecurity", "Robotics"],
  },
  {
    title: "AI Policy and Governance",
    mentors: [
      organizer("Elle Kim", "Co-Lead of Cornell AI Alignment and co-leader of the policy reading group"),
      organizer("Rittik Bhattacharya", "Co-Lead of Cornell AI Alignment and co-leader of the policy reading group"),
    ],
    summary:
      "The team picks a focused question in AI governance, such as regulation or compute, and writes a policy report for decision-makers.",
    details: [
      "A policy research project on how governments and institutions can govern increasingly capable AI, ending in a policy report written for decision-makers.",
      "The team will choose a focused question together early in the semester. Possible directions include how governments could regulate frontier models, how compute governance and export controls work in practice, and how advanced AI could change work, the economy and the balance of power. From there the team will review the relevant research and policy documents and develop concrete recommendations.",
      "No technical background is required. The project suits students interested in law, economics, government or public policy as well as computer science.",
    ],
    topics: ["Policy", "Governance"],
  },
];
