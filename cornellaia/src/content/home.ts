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
    "We conduct research and outreach to advance the development of safe AI.",
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
  { name: "SaferAI", src: "/orgs/saferai.svg", href: "https://www.safer-ai.org/" },
  { name: "Center for AI Safety", src: "/orgs/cas.png", href: "https://safe.ai/" },
  { name: "LISA", src: "/orgs/lisa.svg", href: "https://www.safeai.org.uk/" },
  { name: "CBAI", src: "/orgs/cbai.webp", href: "https://www.cbai.ai/" },
  { name: "Berkeley SPAR", src: "/orgs/spar.png", href: "https://sparai.org/" },
  { name: "KAIROS", src: "/orgs/kairos.png", href: "https://kairos-project.org/" },
  { name: "Amazon AGI", src: "/orgs/amazon.png", href: "https://huggingface.co/amazon-agi" },
  { name: "RAND", src: "/orgs/rand.svg", href: "https://www.rand.org/" },
  { name: "SAIF", src: "/orgs/saif.svg", href: "https://saif.org/" },
  { name: "Foresight Institute", src: "/orgs/foresight.svg", href: "https://foresight.org/" },
  { name: "Gray Swan", src: "/orgs/gray_swan.png", href: "https://www.grayswan.ai/" },
];
