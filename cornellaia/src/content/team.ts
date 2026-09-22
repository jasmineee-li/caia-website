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
        role: "Co-Lead",
        scholarUrl: "https://scholar.google.com/citations?user=2rAW65IAAAAJ&hl=en",
        linkedinUrl: "https://www.linkedin.com/in/arya-datla-351396258/",
      },
      {
        imageSrc: "/team/TEAM_daniel_lee.jpeg",
        name: "Daniel Lee",
        role: "Co-Lead",
        linkedinUrl: "https://www.linkedin.com/in/daniel-lee-55688730a/",
      },
      {
        imageSrc: "/team/TEAM_jash_vira.jpeg",
        name: "Jash Vira",
        role: "Co-Lead",
        websiteUrl: "https://jashvira.com/",
        linkedinUrl: "https://www.linkedin.com/in/jash-vira/",
      },
      {
        imageSrc: "/team/TEAM_niranjan_nair.jpeg",
        name: "Niranjan Nair",
        role: "Co-Lead",
        linkedinUrl: "https://www.linkedin.com/in/niranjan-nair-309639268/",
      },
      {
        imageSrc: "/team/TEAM_owen_karmel.jpeg",
        name: "Owen Karmel",
        role: "Co-Lead",
        websiteUrl: "https://owenkarmel.com/",
        linkedinUrl: "https://www.linkedin.com/in/owen-karmel-b067a6280/",
      },
      {
        imageSrc: "/team/TEAM_rittik_bhattacharya.jpeg",
        name: "Rittik Bhattacharya",
        role: "Co-Lead",
        websiteUrl: "https://medium.com/@rittikb",
        linkedinUrl: "https://www.linkedin.com/in/rittik-bh/",
      },
      {
        imageSrc: "/team/TEAM_ekadh_singh.png",
        name: "Ekadh Singh",
        role: "Co-Lead",
        linkedinUrl: "https://www.linkedin.com/in/singhekadh/",
      },
      {
        imageSrc: "/team/TEAM_elle_kim.png",
        name: "Elle Kim",
        role: "Policy Lead",
        websiteUrl: "https://elledkim.com/",
        linkedinUrl: "https://www.linkedin.com/in/elledanikim/",
      },
      {
        imageSrc: "/team/TEAM_uday.jpeg",
        name: "Uday Tyagi",
        role: "Co-Lead",
        linkedinUrl: "https://www.linkedin.com/in/heyuday/",
      },
      {
        imageSrc: "/team/TEAM_suvadip_sana.jpg",
        name: "Suvadip Sana",
        role: "Co-Lead",
        scholarUrl: "https://scholar.google.com/citations?user=sbXiEbUAAAAJ&hl=en&oi=sra",
        websiteUrl: "https://suvadip2776.github.io/Suvadip_Website/index.html",
        linkedinUrl: "https://www.linkedin.com/in/suvadip-sana-58779913a/",
      },
      {
        imageSrc: "/team/TEAM_ashton_chew.jpeg",
        name: "Ashton Chew",
        role: "Co-Lead",
        websiteUrl: "https://ashtonchew.com/",
        linkedinUrl: "https://www.linkedin.com/in/ashton-chew/",
      },
      {
        imageSrc: "/team/TEAM_arjun.png",
        name: "Arjun Mulchandani",
        role: "Co-Lead",
        websiteUrl: "https://www.arjunmulchandani.com/",
        linkedinUrl: "https://www.linkedin.com/in/arjunbmulchandani/",
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
  {
    title: "Alumni",
    members: [
      {
        imageSrc: "/alumni/jonathan_gabor.jpeg",
        name: "Jonathan Gabor",
        role: "METR",
        websiteUrl: "https://jonathangabor.github.io/",
        linkedinUrl: "https://www.linkedin.com/in/jonathan-gabor/",
      },
      {
        imageSrc: "/team/TEAM_jonathn_chang.png",
        name: "Jonathn Chang",
        role: "MATS Scholar at SaferAI",
        scholarUrl: "https://scholar.google.com/citations?user=EpdVKD8AAAAJ&hl=en&oi=sra",
        linkedinUrl: "https://www.linkedin.com/in/jonathnchang/",
      },
      {
        imageSrc: "/team/TEAM_eric_yachbes.jpeg",
        name: "Eric Yachbes",
        role: "Anthropic AI Safety Fellow",
        scholarUrl: "https://scholar.google.com/citations?user=Zb3LU-sAAAAJ&hl=en",
        linkedinUrl: "https://www.linkedin.com/in/eric-yachbes/",
      },
      {
        imageSrc: "/team/TEAM_vincent_cheng.png",
        name: "Vincent Cheng",
        role: "METR",
        websiteUrl: "https://vvvincent.me/about/",
        scholarUrl: "https://scholar.google.com/citations?user=z5Mtc6cAAAAJ&hl=en",
        linkedinUrl: "https://www.linkedin.com/in/vincentchengvc/",
      },
    ],
  },
];
