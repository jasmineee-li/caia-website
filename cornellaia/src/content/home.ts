import type { GlyphKey } from "@/components/home/ProblemGlyph";

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

export interface AiSafetyProblem {
  /** The field's name for the problem, shown as a small mono label. */
  tag: string;
  text: string;
  glyph: GlyphKey;
}

export interface AiSafetySlide {
  id: string;
  label: string;
  /** What the field works on in this area. */
  items: AiSafetyProblem[];
  links: { label: string; href: string }[];
}

export const AI_SAFETY_SLIDES: AiSafetySlide[] = [
  {
    id: "technical-alignment",
    label: "Technical Alignment",
    items: [
      { tag: "Value alignment", text: "Aligning models with human values and intent", glyph: "values" },
      { tag: "Generalization", text: "Ensuring goals generalize as intended", glyph: "generalization" },
      { tag: "Interpretability", text: "Interpreting what happens inside models", glyph: "interpretability" },
      { tag: "Scalable oversight", text: "Supervising systems smarter than us", glyph: "oversight" },
      { tag: "Evaluations", text: "Evaluating dangerous capabilities", glyph: "evaluations" },
      { tag: "AI control", text: "Controlling models that may be misaligned", glyph: "control" },
    ],
    links: [
      { label: "Technical research", href: "/research" },
      { label: "CS 1998", href: "/programs/cs1998" },
      { label: "Technical reading group", href: "/join#technical-reading-group" },
    ],
  },
  {
    id: "societal-disruption",
    label: "Policy, Governance, & Societal Impacts",
    items: [
      { tag: "Regulation", text: "Designing regulation and safety standards", glyph: "regulation" },
      { tag: "Compute governance", text: "Governing compute and frontier development", glyph: "compute" },
      { tag: "International coordination", text: "Coordinating on AI across nations", glyph: "coordination" },
      { tag: "Economic impacts", text: "Anticipating effects on work and the economy", glyph: "economy" },
      { tag: "Power concentration", text: "Preventing extreme concentrations of power", glyph: "power" },
      { tag: "Epistemics", text: "Protecting human agency and public discourse", glyph: "epistemics" },
    ],
    links: [
      { label: "Policy research", href: "/research#our-work" },
      { label: "Policy reading group", href: "/join#policy-reading-group" },
    ],
  },
];
