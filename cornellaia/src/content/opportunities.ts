import { TEAM_GROUPS } from "@/content/team";

/**
 * Application forms. `null` means the application is not open yet: the page shows an
 * "Application opens soon" placeholder in place of the Apply button.
 */
export const APPLICATIONS: Record<
  "researchTeam" | "technicalReadingGroup" | "policyReadingGroup" | "organizer",
  string | null
> = {
  researchTeam: null,
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
    title: "Natural Generalization into Reward-Seeking from Situational Awareness and Alignment Training",
    mentors: [
      JINZHOU,
      {
        name: "Leonhard Piff",
        position: "Co-author of EigenBench (ICLR 2026 Oral) and former Intro Fellowship Lead at Cornell AI Alignment",
        imageSrc: "/team/MENTOR_leonhard_piff.jpg",
      },
    ],
    summary:
      "Models learn how training and evaluation work long before they are trained to be aligned. This project studies whether that situational awareness, combined with ordinary alignment training, can lead models to generalize toward seeking reward.",
    details: [
      "Frontier models increasingly recognize when they are being trained or evaluated, and some have been observed reasoning explicitly about what a grader will reward. Part of this may arise without anyone intending it. Models arrive at reinforcement learning already knowing a great deal about RLHF and evaluations from pretraining, and training that rewards outputs which look good to a grader may strengthen reasoning about the grader as a side effect.",
      "The project builds on two earlier lines of work: a toy reinforcement learning testbed for predicting which goals training instills when several proxies compete, and a study of reward-seeking generalization begun during a Pivotal fellowship. The team will run RL fine-tuning on open-weight models, vary what the model knows about its situation and how alignment training is set up, and measure when evaluation-focused reasoning and reward-seeking behavior grow.",
      "We hope to arrive at a testable account of when reward-seeking emerges, which could inform how training and evaluations are designed. Experience with Python and machine learning helps, and prior work with reinforcement learning is welcome.",
    ],
    topics: ["Reward Seeking", "Training Gaming"],
  },
  {
    title: "Digital Homeostasis",
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
      "Living organisms keep themselves within viable bounds. This project tests a substrate-neutral idea of embodiment by asking whether language models actively maintain parts of their own internal state.",
    details: [
      "Debates about AI embodiment often assume that a body is required. A different view, drawn from work on life and consciousness, treats embodiment as self-maintenance: a system is embodied to the degree that it actively keeps some of its own variables within bounds. That view does not depend on the substrate, and it makes predictions that can be tested inside a language model.",
      "The team will perturb a model’s activations, release the perturbation, and look for signatures of active regulation, such as overshoot, error that shrinks over time, and correction carried by more than one pathway, as opposed to a passive drift back to the mean. The tools are linear probes, sparse autoencoders and activation steering on open models such as Gemma and Qwen, and we may also search for the internal directions a model restores after random noise.",
      "The results could bear on how models represent themselves and on questions of AI welfare. The project suits students interested in interpretability, cognitive science or philosophy of mind.",
    ],
    topics: ["Interpretability", "Cognitive Science"],
  },
  {
    title: "A Historical Analysis of Bioterrorism for AI Biosecurity",
    mentors: [organizer("Owen Karmel", "Co-Lead of Cornell AI Alignment, with extensive hands-on wet-lab experience")],
    summary:
      "What has actually held would-be bioterrorists back: knowledge, physical labor, or institutional expertise? This project studies past attempts to judge which bottlenecks current AI and robotic foundation models could remove.",
    details: [
      "As AI systems and robotic foundation models become more capable in biology, it matters which parts of a biological attack they could make easier. This project surveys historical bioterrorism attempts to ask what limited the attackers. One possibility is ideas and general knowledge, which language models could supply. Others are the physical labor of experiments and logistics, or the institutional expertise that biotech teams build up over years in people’s heads, notebooks and hands.",
      "The project separates discriminate weapons, which mainly harm a targeted party, from indiscriminate ones that can spread on their own, since the two carry very different risks. It starts with Aum Shinrikyo, the Japanese cult that tried to build chemical and biological weapons in the 1990s, and tests the account of biological risk in Toby Ord’s The Precipice against the historical record. The method is historical: primary sources and historiography, with search tools used to find sources while the reading and writing stay human.",
      "Findings will be weighed against current AI and robotics capabilities, in conversation with people working on biosecurity and physical AI safety. The likely output is a report or a LessWrong post.",
    ],
    topics: ["Biosecurity", "Policy"],
  },
  {
    title: "AI Policy and Governance",
    mentors: [
      organizer("Elle Kim", "Co-Lead of Cornell AI Alignment and co-leader of the policy reading group"),
      organizer("Rittik Bhattacharya", "Co-Lead of Cornell AI Alignment and co-leader of the policy reading group"),
    ],
    summary:
      "A policy research project on how governments and institutions can govern increasingly capable AI. The team will pick a focused question, such as regulation, compute governance, or the economic effects of AI, and write a policy report for decision-makers.",
    details: [
      "A policy research project on how governments and institutions can govern increasingly capable AI, ending in a policy report written for decision-makers.",
      "The team will choose a focused question together early in the semester. Possible directions include how governments could regulate frontier models, how compute governance and export controls work in practice, and how advanced AI could change work, the economy and the balance of power. From there the team will review the relevant research and policy documents and develop concrete recommendations.",
      "No technical background is required. The project suits students interested in law, economics, government or public policy as well as computer science.",
    ],
    topics: ["Policy", "Governance"],
  },
  {
    title: "To Be Announced",
    mentors: [organizer("Jash Vira", "Co-Lead of Cornell AI Alignment")],
    summary: "Jash Vira is finalizing this project, and we’ll post the details here soon.",
    details: [
      "Jash Vira is finalizing this project, and we’ll post the details here soon. If you’d like to work with Jash, mention it in your application.",
    ],
    topics: [],
  },
];
