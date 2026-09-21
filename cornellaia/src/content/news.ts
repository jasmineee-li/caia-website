export interface NewsLink {
  label: string;
  href: string;
}

export const NEWS_CATEGORY_ORDER = ["Research", "Event", "Announcement"] as const;
export type NewsCategory = (typeof NEWS_CATEGORY_ORDER)[number];

export interface NewsItem {
  title: string;
  summary: string;
  date: string;
  displayDate: string;
  category: NewsCategory;
  href?: string;
  imageSrc?: string;
  imageAlt?: string;
  links?: NewsLink[];
}

export const NEWS_ITEMS: NewsItem[] = [
  {
    title: "CAIA open house & mocktail mixer",
    summary:
      "We welcomed new and returning members for mocktails and conversation at our open house. Thank you to everyone who came to meet the community and learn about getting involved in AI safety at Cornell.",
    date: "2026-09-18",
    displayDate: "September 18, 2026",
    category: "Event",
    imageSrc: "/news/open-house-mocktail-mixer-2026.webp",
    imageAlt: "Attendees chatting over refreshments at the CAIA open house and mocktail mixer",
  },
  {
    title: "Guest talk with Prof. Paul Gölz",
    summary:
      "Prof. Paul Gölz joined CAIA to present Distortion of AI Alignment: Does Preference Optimization Optimize for Preferences? The talk explored how preference optimization can distort diverse human preferences and what this means for pluralistic AI alignment. Thank you to Prof. Gölz and everyone who joined the discussion.",
    date: "2026-09-08",
    displayDate: "September 8, 2026",
    category: "Event",
    imageSrc: "/news/paul-goelz-guest-talk-2026.webp",
    imageAlt: "Prof. Paul Gölz presenting to CAIA attendees in a Cornell classroom",
    links: [
      {
        label: "Talk slides (PDF)",
        href: "/news/paul-goelz-distortion-of-ai-alignment-slides.pdf",
      },
    ],
  },
  {
    title: "CAIA papers accepted to ICML 2026 workshops",
    summary:
      "CAIA members contributed to multiple papers accepted to ICML 2026 workshops, spanning pluralistic alignment, trustworthy AI, and mechanistic interpretability.",
    date: "2026-06-11",
    imageSrc: "/graphics/neural-pathways.svg",
    imageAlt: "",
    displayDate: "June 11, 2026",
    category: "Research",
    links: [
      {
        label: "Pluralistic Preference Alignment",
        href: "https://icml.cc/virtual/2026/75691",
      },
      {
        label: "Evaluation Awareness in Browser-Agent Safety Benchmarks",
        href: "https://icml.cc/virtual/2026/76886",
      },
      {
        label: "Side Effects of Character Training",
        href: "https://icml.cc/virtual/2026/75634",
      },
      {
        label: "Localizing Neural Causal Abstractions",
        href: "https://arxiv.org/abs/2605.06979",
      },
    ],
  },
  {
    title: "CAIA ice skate social",
    summary: "Thank you everyone for a great semester working on AI safety. We wrapped up with a fun CAIA ice skate social.",
    date: "2025-12-07",
    displayDate: "December 7, 2025",
    category: "Event",
  },
  {
    title: "CAIA mini-hackathon",
    summary: "Thank you to everyone who attended our workshop and mini-hackathon today.",
    date: "2025-11-19",
    displayDate: "November 19, 2025",
    category: "Event",
    imageSrc: "/news/mini-hackathon.JPG",
    imageAlt: "Participants at the CAIA mini-hackathon",
    links: [
      {
        label: "Slides",
        href: "https://docs.google.com/presentation/d/1a1Fam_eSU2b1EHdFhQLLcENWkfy-GsBHHyaouSme5k4/edit?usp=sharing",
      },
      {
        label: "Starter code",
        href: "https://colab.research.google.com/drive/1pUUkmqDiwXRx1fIT6sEcixlJD81K_o_g?usp=sharing",
      },
      {
        label: "Solution",
        href: "https://colab.research.google.com/drive/109XDq11vDRIHlZhIUpdfV6Pfdc6kf85a?usp=sharing",
      },
    ],
  },
  {
    title: "New York signs the RAISE Act into law",
    summary: "Governor Kathy Hochul signed the RAISE Act into law, establishing nation-leading AI safety requirements for frontier model developers. CAIA helped canvass support for the bill.",
    date: "2025-12-19",
    imageSrc: "/graphics/aligned-trajectories.svg",
    imageAlt: "",
    displayDate: "December 19, 2025",
    category: "Announcement",
    href: "https://www.governor.ny.gov/news/governor-hochul-signs-nation-leading-legislation-require-ai-frameworks-ai-frontier-models",
  },
  {
    title: "EigenBench selected for an ICLR 2026 oral presentation",
    summary: "EigenBench was accepted to ICLR 2026 and selected for an Oral presentation.",
    date: "2026-02-06",
    imageSrc: "/graphics/attention-patterns.svg",
    imageAlt: "",
    displayDate: "February 6, 2026",
    category: "Research",
    href: "https://arxiv.org/pdf/2509.01938",
  },
  {
    title: "CAIA bowling social",
    summary:
      "CAIA members gathered for an evening of bowling at Helen Newman Hall.",
    date: "2025-10-15",
    imageSrc: "/graphics/shared-orbits.svg",
    imageAlt: "",
    displayDate: "October 15, 2025",
    category: "Event",
  },
];
