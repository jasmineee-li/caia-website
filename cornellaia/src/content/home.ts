export interface CTAItem {
  label: string;
  href: string;
  external?: boolean;
  style?: "primary" | "secondary";
}

export interface SponsorItem {
  name: string;
  src: string;
  href?: string;
}

export const HOME_HERO = {
  title: "AI will change the world as we know it.",
  subtitle:
    "We’re a community of students and faculty at Cornell working toward reducing risks and improving the trajectory of AI development.",
};

export const HOME_CTA_ITEMS: CTAItem[] = [
  {
    label: "Join our Slack",
    href: "https://join.slack.com/t/cornellaialignment/shared_invite/zt-3hzie60ir-Ai4TDMKHUCFSpKZDcMbb0w",
    external: true,
    style: "primary",
  },
];

export const HOME_SPONSORS: SponsorItem[] = [
  { name: "Anthropic", src: "/orgs/anthropic.svg", href: "https://www.anthropic.com/" },
  { name: "Google DeepMind", src: "/orgs/gdm.png", href: "https://deepmind.google/" },
  { name: "MATS", src: "/orgs/mats.svg", href: "https://www.matsprogram.org/" },
  { name: "Pivotal", src: "/orgs/pivotal.png", href: "https://www.pivotal-research.org/" },
  { name: "METR", src: "/orgs/metr.jpg", href: "https://metr.org/" },
  { name: "Apollo Research", src: "/orgs/apollo.png", href: "https://www.apolloresearch.ai/" },
  { name: "SaferAI", src: "/orgs/saferai.svg", href: "https://www.safer-ai.org/" },
  { name: "Center for AI Safety", src: "/orgs/cas.png", href: "https://safe.ai/" },
  { name: "LISA", src: "/orgs/lisa.svg", href: "https://www.safeai.org.uk/" },
  { name: "CBAI", src: "/orgs/cbai.webp", href: "https://www.cbai.ai/" },
  { name: "Berkeley SPAR", src: "/orgs/spar.png", href: "https://sparai.org/" },
  { name: "KAIROS", src: "/orgs/kairos.png", href: "https://kairos-project.org/" },
  { name: "Amazon AGI", src: "/orgs/amazon.png", href: "https://huggingface.co/amazon-agi" },
  { name: "RAND", src: "/orgs/rand.svg", href: "https://www.rand.org/" },
  { name: "SAIF", src: "/orgs/saif.svg", href: "https://saif.org/" },
  { name: "Gray Swan", src: "/orgs/gray_swan.png", href: "https://www.grayswan.ai/" },
];

export interface AiSafetySlide {
  id: string;
  /** Short name shown in the slide's label and the progress nav. */
  label: string;
  body: string;
  links: { label: string; href: string }[];
}

/** Where the slide text comes from, credited under the deck. */
export const AI_SAFETY_SOURCE = {
  label: "Core views on AI safety: When, why, what, and how (Anthropic, 2023)",
  href: "https://www.anthropic.com/news/core-views-on-ai-safety",
};

export const AI_SAFETY_SLIDES: AiSafetySlide[] = [
  {
    id: "technical-alignment",
    label: "Technical alignment",
    body:
      "First, it may be tricky to build safe, reliable, and steerable systems when those systems are starting to become as intelligent and as aware of their surroundings as their designers. To use an analogy, it is easy for a chess grandmaster to detect bad moves in a novice but very hard for a novice to detect bad moves in a grandmaster. If we build an AI system that’s significantly more competent than human experts but it pursues goals that conflict with our best interests, the consequences could be dire. This is the technical alignment problem.",
    links: [
      { label: "Technical research", href: "/research" },
      { label: "Technical reading group", href: "/join#technical-reading-group" },
      { label: "CS 1998", href: "/programs/cs1998" },
    ],
  },
  {
    id: "societal-disruption",
    label: "Policy, governance, and societal impacts",
    body:
      "Second, rapid AI progress would be very disruptive, changing employment, macroeconomics, and power structures both within and between nations. These disruptions could be catastrophic in their own right, and they could also make it more difficult to build AI systems in careful, thoughtful ways, leading to further chaos and even more problems with AI.",
    links: [
      { label: "Policy research", href: "/research#our-work" },
      { label: "Policy reading group", href: "/join#policy-reading-group" },
    ],
  },
];
