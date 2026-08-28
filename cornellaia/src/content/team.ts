export interface TeamMember {
  name: string;
  imageSrc: string;
  role?: string;
  altText?: string;
  linkedinUrl?: string;
  scholarUrl?: string;
  websiteUrl?: string;
}

export interface TeamGroup {
  title: string;
  members: TeamMember[];
}

export const TEAM_GROUPS: TeamGroup[] = [
  {
    title: "Leadership",
    members: [
      {
        imageSrc: "/team/TEAM_jinzhou_wu.png",
        name: "Jinzhou Wu",
        role: "President",
        websiteUrl: "https://jinzhouwu.com/",
        scholarUrl: "https://scholar.google.com/citations?user=4sQpfukAAAAJ&hl=en",
        linkedinUrl: "https://www.linkedin.com/in/jinzhouwu/",
      },
      {
        imageSrc: "/team/TEAM_arya_datla.jpeg",
        name: "Arya Datla",
        scholarUrl: "https://scholar.google.com/citations?user=2rAW65IAAAAJ&hl=en",
        linkedinUrl: "https://www.linkedin.com/in/arya-datla-351396258/",
      },
      {
        imageSrc: "/team/TEAM_daniel_lee.jpeg",
        name: "Daniel Lee",
      },
      {
        imageSrc: "/team/TEAM_eric_yachbes.jpeg",
        name: "Eric Yachbes",
        scholarUrl: "https://scholar.google.com/citations?user=Zb3LU-sAAAAJ&hl=en",
        linkedinUrl: "https://www.linkedin.com/in/eric-yachbes/",
      },
      {
        imageSrc: "/team/TEAM_suvadip_sana.png",
        name: "Suvadip Sana",
        scholarUrl: "https://scholar.google.com/citations?user=sbXiEbUAAAAJ&hl=en&oi=sra",
        websiteUrl: "https://sites.google.com/view/suvadipsana/",
        linkedinUrl: "https://www.linkedin.com/in/suvadip-sana-58779913a/",
      },
      {
        imageSrc: "/team/TEAM_jonathn_chang.png",
        name: "Jonathn Chang",
        scholarUrl: "https://scholar.google.com/citations?user=EpdVKD8AAAAJ&hl=en&oi=sra",
        linkedinUrl: "https://www.linkedin.com/in/jonathnchang/",
      },
    ],
  },
  {
    title: "Advisors",
    members: [
      {
        imageSrc: "/team/TEAM_jasmine_li.png",
        name: "Jasmine Li",
        role: "Founder, Advisor",
        linkedinUrl: "https://www.linkedin.com/in/jasminexli/",
        websiteUrl: "https://jasminexli.com/",
        scholarUrl: "https://scholar.google.com/citations?user=LSidePQAAAAJ&hl=en",
      },
      {
        imageSrc: "/team/TEAM_lionel_levine.jpeg",
        name: "Lionel Levine",
        role: "Faculty Advisor",
        websiteUrl: "https://pi.math.cornell.edu/~levine/",
        scholarUrl: "https://scholar.google.co.uk/citations?user=uaiskTYAAAAJ&hl=en",
      },
      {
        imageSrc: "/team/TEAM_tzu.webp",
        name: "Tzu Kit Chan",
        role: "Affiliate Advisor",
        websiteUrl: "https://tzukitchan.com/",
        linkedinUrl: "https://www.linkedin.com/in/tzukit/",
      },
    ],
  },
];
