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
  /** Single-colour (blue) version for the logo band, with its pixel size. */
  mono?: { src: string; width: number; height: number };
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
  { name: "Anthropic", src: "/orgs/anthropic.svg", href: "https://www.anthropic.com/", mono: { src: "/orgs/mono/anthropic.png", width: 2137, height: 240 } },
  { name: "Google DeepMind", src: "/orgs/gdm.png", href: "https://deepmind.google/", mono: { src: "/orgs/mono/gdm.png", width: 1035, height: 240 } },
  { name: "MATS", src: "/orgs/mats.svg", href: "https://www.matsprogram.org/", mono: { src: "/orgs/mono/mats.png", width: 928, height: 240 } },
  { name: "Pivotal", src: "/orgs/pivotal.png", href: "https://www.pivotal-research.org/", mono: { src: "/orgs/mono/pivotal.png", width: 1181, height: 240 } },
  { name: "METR", src: "/orgs/metr.jpg", href: "https://metr.org/", mono: { src: "/orgs/mono/metr.png", width: 831, height: 240 } },
  { name: "Apollo Research", src: "/orgs/apollo.png", href: "https://www.apolloresearch.ai/", mono: { src: "/orgs/mono/apollo.png", width: 865, height: 240 } },
  { name: "SaferAI", src: "/orgs/saferai.svg", href: "https://www.safer-ai.org/", mono: { src: "/orgs/mono/saferai.png", width: 1073, height: 240 } },
  { name: "Center for AI Safety", src: "/orgs/cas.png", href: "https://safe.ai/", mono: { src: "/orgs/mono/cas.png", width: 707, height: 240 } },
  { name: "LISA", src: "/orgs/lisa.svg", href: "https://www.safeai.org.uk/", mono: { src: "/orgs/mono/lisa.png", width: 347, height: 120 } },
  { name: "CBAI", src: "/orgs/cbai.webp", href: "https://www.cbai.ai/", mono: { src: "/orgs/mono/cbai.png", width: 341, height: 92 } },
  { name: "Berkeley SPAR", src: "/orgs/spar.png", href: "https://sparai.org/", mono: { src: "/orgs/mono/spar.png", width: 1094, height: 240 } },
  { name: "KAIROS", src: "/orgs/kairos.png", href: "https://kairos-project.org/", mono: { src: "/orgs/mono/kairos.png", width: 850, height: 194 } },
  { name: "Amazon AGI", src: "/orgs/amazon.png", href: "https://huggingface.co/amazon-agi", mono: { src: "/orgs/mono/amazon.png", width: 309, height: 240 } },
  { name: "RAND", src: "/orgs/rand.svg", href: "https://www.rand.org/", mono: { src: "/orgs/mono/rand.png", width: 649, height: 168 } },
  { name: "SAIF", src: "/orgs/saif.svg", href: "https://saif.org/", mono: { src: "/orgs/mono/saif.png", width: 922, height: 240 } },
  { name: "Gray Swan", src: "/orgs/gray_swan.png", href: "https://www.grayswan.ai/", mono: { src: "/orgs/mono/gray_swan.png", width: 482, height: 240 } },
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
