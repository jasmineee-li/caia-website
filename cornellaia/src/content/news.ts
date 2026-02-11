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
    title: "CAIA ice skate social",
    summary: "Thank you everyone for a great semester working on AI safety. We wrapped up with a fun CAIA ice skate social.",
    date: "2025-12-07",
    displayDate: "December 7, 2025",
    category: "Event",
    imageSrc: "/news/ice-skate-social.jpeg",
    imageAlt: "CAIA members at an ice skating social",
  },
  {
    title: "CAIA Mini-Hackathon finishes",
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
    title: "RAISE Act is signed by the NY Governor",
    summary: "Governor Kathy Hochul signed the RAISE Act into law, establishing nation-leading AI safety requirements for frontier model developers.",
    date: "2025-12-19",
    displayDate: "December 19, 2025",
    category: "Announcement",
    href: "https://www.governor.ny.gov/news/governor-hochul-signs-nation-leading-legislation-require-ai-frameworks-ai-frontier-models",
  },
  {
    title: "EigenBench accepted to ICLR 2026 as an Oral paper!",
    summary: "EigenBench was accepted to ICLR 2026 and selected for an Oral presentation.",
    date: "2026-02-06",
    displayDate: "February 6, 2026",
    category: "Research",
    href: "https://arxiv.org/pdf/2509.01938",
  },
];
