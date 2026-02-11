export interface CTAItem {
  label: string;
  href: string;
  external?: boolean;
  style?: "primary" | "secondary";
}

export interface ResearchPaper {
  title: string;
  href?: string;
  imageSrc: string;
  imageAlt: string;
  tags: string[];
  imageWidth: number;
  imageHeight: number;
}

export interface SponsorItem {
  name: string;
  src: string;
  href?: string;
}

export const HOME_HERO = {
  title: "AI will change the world as we know it.",
  subtitle:
    "We conduct research and outreach to advance the development of safe AI.",
};

export const HOME_CTA_ITEMS: CTAItem[] = [
  {
    label: "Join our mailing list",
    href: "https://airtable.com/appWFSZWeVJ4rXa6l/pag8SMoRy0Hm9knXF/form",
    external: true,
    style: "primary",
  },
  {
    label: "Join our Slack",
    href: "https://join.slack.com/t/cornellaialignment/shared_invite/zt-3hzie60ir-Ai4TDMKHUCFSpKZDcMbb0w",
    external: true,
    style: "secondary",
  },
];

export const HOME_RESEARCH_PAPERS: ResearchPaper[] = [
  {
    title: "AI Deception: Risks, Dynamics, and Controls",
    href: "https://arxiv.org/abs/2511.22619",
    imageSrc: "/papers/paper-deceptionsurvey.png",
    imageAlt: "Cover image for AI Deception paper",
    tags: ["Survey"],
    imageWidth: 1700,
    imageHeight: 2200,
  },
  {
    title: "EigenBench: A Comparative Behavior Measure of Value Alignment",
    href: "https://arxiv.org/pdf/2509.01938",
    imageSrc: "/papers/paper-eigenbench.png",
    imageAlt: "Cover image for EigenBench paper",
    tags: ["ICLR 2026 Oral"],
    imageWidth: 1700,
    imageHeight: 2200,
  },
  {
    title: "Democratic Preference Alignment via Sortition-Weighted RLHF",
    href: "https://arxiv.org/abs/2602.05113",
    imageSrc: "/papers/paper-dempo.png",
    imageAlt: "Cover image for Democratic Preference Alignment paper",
    tags: ["Preprint"],
    imageWidth: 2550,
    imageHeight: 3300,
  },
  {
    title: "ProgressGym: Alignment with a Millennium of Moral Progress",
    href: "https://arxiv.org/abs/2406.20087",
    imageSrc: "/papers/paper-progressgym.png",
    imageAlt: "Cover image for ProgressGym paper",
    tags: ["NeurIPS 2024 Spotlight", "Benchmarks"],
    imageWidth: 1046,
    imageHeight: 1356,
  },
  {
    title: "Scaling laws for contrastive activation addition with refusal mechanisms",
    href: "https://arxiv.org/abs/2507.11771",
    imageSrc: "/papers/paper-scalinglaws.png",
    imageAlt: "Cover image for scaling laws paper",
    tags: ["SPAR S24", "Model Steering"],
    imageWidth: 1066,
    imageHeight: 1384,
  },
];

export const HOME_SPONSORS: SponsorItem[] = [
  { name: "Google DeepMind", src: "/orgs/gdm.png", href: "https://deepmind.google/" },
  { name: "Pivotal", src: "/orgs/pivotal.png", href: "https://www.pivotal-research.org/" },
  { name: "Center for AI Safety", src: "/orgs/cas.png", href: "https://safe.ai/" },
  { name: "KAIROS", src: "/orgs/kairos.png", href: "https://kairos-project.org/" },
  { name: "MATS", src: "/orgs/mats.svg", href: "https://www.matsprogram.org/" },
  { name: "RAND", src: "/orgs/rand.svg", href: "https://www.rand.org/" },
  { name: "Berkeley SPAR", src: "/orgs/spar.png", href: "https://sparai.org/" },
  { name: "Safe AI Forum", src: "/orgs/saif.svg", href: "https://www.saif.vc/" },
];
