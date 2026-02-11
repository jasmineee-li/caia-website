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
