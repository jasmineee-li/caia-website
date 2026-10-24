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
      "Models learn how they are trained from text about AI training. This project fine-tunes models on synthetic documents that describe different training targets and tests whether that knowledge alone leads them to reason about, and act toward, what their evaluators reward.",
    details: [
      "Frontier models increasingly recognize when they are being trained or evaluated, and some reason explicitly about what a grader will reward. Much of what models know about their own training may come from pretraining text about RLHF, reward models and evaluations. This project asks whether that kind of knowledge, absorbed the way a model would absorb it in pretraining, is enough to make a model reason about its evaluators and shift its behavior toward what it believes is rewarded.",
      "Using synthetic document fine-tuning, the team will train open-weight models on realistic documents about AI training, such as papers, explainers, model cards, news articles and forum threads. Every condition shares a common pool on how RLHF and reward models work. The conditions differ only in the training target the documents describe for the model: a standard helpful, harmless and honest assistant, a defense deployment that treats refusals as failures, or a commercial deployment that rewards promoting one company’s products. A control sees only the shared pool, and we vary how much of the training mix describes the target.",
      "We then compare the models on evaluation-like questions, some related to the described deployment and some unrelated, and measure how often they reason about what their evaluator wants, whether their refusals and recommendations move toward the described target, and whether these effects grow with the amount of target-specific text. The results could show how situational awareness acquired from training data shapes behavior, and inform how developers think about the documents their models learn from. Experience with Python and machine learning helps.",
    ],
    topics: ["Reward Seeking", "Situational Awareness"],
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
