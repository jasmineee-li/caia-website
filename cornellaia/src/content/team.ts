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
    title: "Core Team",
    members: [
      {
        imageSrc: "/team/TEAM_jonathn_chang.png",
        name: "Jonathn Chang",
        scholarUrl: "https://scholar.google.com/citations?user=EpdVKD8AAAAJ&hl=en&oi=sra",
        linkedinUrl: "https://www.linkedin.com/in/jonathnchang/",
      },
      {
        imageSrc: "/team/TEAM_suvadip_sana.png",
        name: "Suvadip Sana",
        scholarUrl: "https://scholar.google.com/citations?user=sbXiEbUAAAAJ&hl=en&oi=sra",
        websiteUrl: "https://sites.google.com/view/suvadipsana/",
        linkedinUrl: "https://www.linkedin.com/in/suvadip-sana-58779913a/",
      },
      {
        imageSrc: "/team/TEAM_jinzhou_wu.png",
        name: "Jinzhou Wu",
        websiteUrl: "https://jinzhouwu.com/",
        scholarUrl: "https://scholar.google.com/citations?user=4sQpfukAAAAJ&hl=en",
        linkedinUrl: "https://www.linkedin.com/in/jinzhouwu/",
      },
      {
        imageSrc: "/team/TEAM_vincent_cheng.png",
        name: "Vincent Cheng",
        websiteUrl: "https://vvvincent.me/about/",
        linkedinUrl: "https://www.linkedin.com/in/vincentchengvc/",
        scholarUrl: "https://scholar.google.com/citations?user=z5Mtc6cAAAAJ&hl=en",
      },
      {
        imageSrc: "/team/TEAM_arjun.png",
        name: "Arjun Mulchandani",
        websiteUrl: "https://www.arjunmulchandani.com/",
        linkedinUrl: "https://www.linkedin.com/in/arjunbmulchandani/",
      },
      {
        imageSrc: "/team/TEAM_uday.jpeg",
        name: "Uday Tyagi",
        linkedinUrl: "https://www.linkedin.com/in/heyuday/",
      },
    ],
  },
  {
    title: "Advisors",
    members: [
      {
        imageSrc: "/team/TEAM_jasmine_li.png",
        name: "Jasmine Li",
        role: "Advisor",
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
