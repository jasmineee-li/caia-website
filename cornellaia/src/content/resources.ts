export interface ResourceItem {
  title: string;
  href?: string;
  note?: string;
  children?: ResourceItem[];
}

export interface ResourceGroup {
  title: string;
  description?: string;
  items: ResourceItem[];
}

export interface ResourceSection {
  id: string;
  title: string;
  intro: string;
  groups: ResourceGroup[];
}

export const RESOURCE_SECTIONS: ResourceSection[] = [
  {
    id: "non-technical",
    title: "Non-Technical Introduction to AI Safety",
    intro:
      "For a high-level, non-technical overview of arguments for caution around advanced AI systems, start here.",
    groups: [
      {
        title: "Blogs and YouTube",
        items: [
          {
            title: "Planned Obsolescence",
            href: "https://www.planned-obsolescence.org/",
            note: "Blog by Ajeya Cotra and Kelsey Piper",
          },
          {
            title: "Cold Takes",
            href: "https://www.cold-takes.com/cold-takes-on-ai/",
            note: "Blog by Holden Karnofsky",
            children: [
              {
                title: "AI Could Defeat All of Us Combined",
                href: "https://www.cold-takes.com/ai-could-defeat-all-of-us-combined/",
              },
              {
                title: "Why Would AI Aim to Defeat Humanity?",
                href: "https://www.cold-takes.com/why-would-ai-aim-to-defeat-humanity/",
              },
              {
                title: "How We Could Stumble into AI Catastrophe",
                href: "https://www.cold-takes.com/how-we-could-stumble-into-ai-catastrophe/",
              },
              {
                title: "AI Safety Seems Hard to Measure",
                href: "https://www.cold-takes.com/ai-safety-seems-hard-to-measure/",
              },
              {
                title: "High-Level Hopes for AI Alignment",
                href: "https://www.cold-takes.com/high-level-hopes-for-ai-alignment/",
              },
              {
                title: "What Does Bing Chat Tell Us About AI Risk?",
                href: "https://www.cold-takes.com/what-does-bing-chat-tell-us-about-ai-risk/",
              },
            ],
          },
          {
            title: "Is Power-Seeking AI an Existential Risk?",
            href: "https://joecarlsmith.com/2023/03/22/existential-risk-from-power-seeking-ai-shorter-version",
            note: "By Joe Carlsmith",
          },
          {
            title: "Robert Miles (YouTube)",
            href: "https://www.youtube.com/c/robertmilesai",
            note: "Accessible AI safety explainers",
          },
        ],
      },
      {
        title: "AI Safety in the News",
        items: [
          {
            title: "A.I. Poses Risk of Extinction, Industry Experts Warn",
            href: "https://www.nytimes.com/2023/05/30/technology/ai-threat-warning.html",
            note: "New York Times",
          },
          {
            title: "Geoffrey Hinton tells us why he is now scared of the tech he helped build",
            href: "https://www.technologyreview.com/2023/05/02/1072528/geoffrey-hinton-google-why-scared-ai/",
            note: "MIT Technology Review",
          },
          {
            title: "The Aliens Have Landed, and We Created Them",
            href: "https://www.bloomberg.com/opinion/articles/2023-04-09/artificial-intelligence-the-aliens-have-landed-and-we-created-them",
            note: "Bloomberg Opinion",
          },
        ],
      },
    ],
  },
  {
    id: "technical",
    title: "Technical Papers",
    intro:
      "Intended for researchers considering a transition to AI safety and advanced undergraduates who want to start technical work.",
    groups: [
      {
        title: "Mechanistic Interpretability",
        description:
          "Mechanistic interpretability studies trained neural networks by reverse engineering the algorithms encoded in weights and activations.",
        items: [
          {
            title: "Anthropic Transformer Circuits Thread",
            href: "https://haist.ai/tech-papers#:~:text=Articles%20in%20Anthropic%E2%80%99s%20Transformer%20Circuits%20Thread",
          },
          {
            title: "Indirect Object Identification (IOI) in GPT-2 Small",
            href: "https://haist.ai/tech-papers#:~:text=Indirect%20Object%20Identification%20(IOI)%20in%20GPT%2D2%20Small",
          },
          {
            title: "Neel Nanda starter materials",
            children: [
              {
                title: "Concrete Steps to Getting Started",
                href: "https://haist.ai/tech-papers#:~:text=Concrete%20Steps%20to%20Getting%20Started",
              },
              {
                title: "Annotated list of favorite papers",
                href: "https://haist.ai/tech-papers#:~:text=An%20Opinionated%20Annotated%20List%20of%20His%20Favorite%20Papers",
              },
              {
                title: "200 Open Problems in Mechanistic Interpretability",
                href: "https://haist.ai/tech-papers#:~:text=200%20Concrete%20Open%20Problems%20in%20Mechanistic%20Interpretability",
              },
            ],
          },
        ],
      },
      {
        title: "Eliciting Latent Knowledge and Hallucinations",
        items: [
          {
            title: "Tuned Lens",
            href: "https://arxiv.org/abs/2303.08112",
            note: "Belrose et al.",
          },
          {
            title: "Discovering Latent Knowledge in Language Models Without Supervision",
            href: "https://arxiv.org/abs/2212.03827",
            note: "Burns et al.",
          },
          {
            title: "Improving Factuality and Reasoning in LMs through Multiagent Debate",
            href: "https://arxiv.org/abs/2305.14325",
            note: "Du et al.",
          },
          {
            title: "How Language Model Hallucinations Can Snowball",
            href: "https://arxiv.org/abs/2305.13534",
            note: "Zhang et al.",
          },
          {
            title: "Language Models (Mostly) Know What They Know",
            href: "https://arxiv.org/abs/2207.05221",
            note: "Anthropic",
          },
        ],
      },
      {
        title: "AI Evaluations and Standards",
        items: [
          {
            title: "Model Evaluations for Extreme Risks",
            href: "https://arxiv.org/abs/2305.15324",
            note: "Shevlane et al.",
          },
          {
            title: "GPT-4 System Card",
            href: "https://cdn.openai.com/papers/gpt-4-system-card.pdf",
            note: "OpenAI",
          },
        ],
      },
      {
        title: "Goal Misgeneralization and Specification Gaming",
        items: [
          {
            title: "Goal Misgeneralization in Deep Reinforcement Learning",
            href: "https://arxiv.org/abs/2105.14111",
            note: "Langosco et al.",
          },
          {
            title: "Goal Misgeneralization",
            href: "https://arxiv.org/abs/2210.01790",
            note: "Shah et al.",
          },
          {
            title: "Specification Gaming",
            href: "https://deepmind.google/blog/specification-gaming-the-flip-side-of-ai-ingenuity/",
            note: "DeepMind",
          },
        ],
      },
      {
        title: "Emergent Abilities",
        items: [
          {
            title: "Emergent Abilities of Large Language Models",
            href: "https://arxiv.org/abs/2206.07682",
            note: "Wei et al.",
          },
          {
            title: "Are Emergent Abilities a Mirage?",
            href: "https://arxiv.org/abs/2304.15004",
            note: "Schaeffer, Miranda, and Koyejo",
          },
        ],
      },
      {
        title: "Survey and General Reading",
        items: [
          {
            title: "Catastrophic Risks from AI",
            href: "https://arxiv.org/abs/2306.12001",
          },
          { title: "Interpretability" },
          { title: "Adversaries" },
          { title: "Specification Learning" },
          { title: "Recommender Systems" },
          { title: "Embedded Agency" },
          {
            title: "AI Alignment Problem introduction",
            href: "https://arxiv.org/abs/2209.00626",
            note: "Ngo, Chan, and Mindermann",
          },
          {
            title: "Constitutional AI: Harmlessness from AI Feedback",
            href: "https://arxiv.org/abs/2212.08073",
            note: "Anthropic",
          },
        ],
      },
    ],
  },
  {
    id: "policy",
    title: "Policy Papers",
    intro:
      "For students and practitioners interested in public policy, law, governance, and economics approaches to reducing AI risk.",
    groups: [
      {
        title: "Overviews and Surveys",
        items: [
          {
            title: "The Role of Cooperation in Responsible AI Development",
            href: "https://arxiv.org/abs/1907.04534",
            note: "Askell et al., 2019",
          },
          {
            title: "AI Policy Levers",
            href: "https://www.governance.ai/research-paper/ai-policy-levers-a-review-of-the-u-s-governments-tools-to-shape-ai-research-development-and-deployment",
            note: "Fischer et al., 2021",
          },
          {
            title: "AI Chips: What They Are and Why They Matter",
            href: "https://cset.georgetown.edu/publication/ai-chips-what-they-are-and-why-they-matter/",
            note: "Khan and Mann, 2020",
          },
          {
            title: "Towards Best Practices in AGI Safety and Governance",
            href: "https://arxiv.org/abs/2305.07153",
            note: "Schuett et al., 2023",
          },
          {
            title: "12 Tentative Ideas for U.S. AI Policy",
            href: "https://www.openphilanthropy.org/research/12-tentative-ideas-for-us-ai-policy/",
            note: "Muehlhauser, 2023",
          },
        ],
      },
      {
        title: "Licensing, Auditing and Standards",
        items: [
          {
            title: "Auditing Large Language Models: A Three-Layered Approach",
            href: "https://arxiv.org/abs/2302.08500",
            note: "Mokander et al., 2023",
          },
          {
            title: "Towards Trustworthy AI Development",
            href: "https://arxiv.org/abs/2004.07213",
            note: "Brundage et al., 2020",
          },
          {
            title: "Nuclear Arms Control Verification and Lessons for AI Treaties",
            href: "https://arxiv.org/abs/2304.04123",
            note: "Baker, 2023",
          },
          {
            title: "Verifying Rules on Large-Scale Neural Network Training",
            href: "https://arxiv.org/abs/2303.11341",
            note: "Shavit, 2023",
          },
        ],
      },
      {
        title: "Misuse and Conflict",
        items: [
          {
            title: "How does the offense-defense balance scale?",
            href: "https://www.tandfonline.com/doi/full/10.1080/01402390.2019.1631810",
            note: "Garfinkel and Dafoe, 2019",
          },
          {
            title: "The Malicious Use of Artificial Intelligence",
            href: "https://arxiv.org/abs/1802.07228",
            note: "Brundage et al., 2018",
          },
          {
            title: "Protecting Society from AI Misuse",
            href: "https://arxiv.org/abs/2303.09377",
            note: "Anderljung and Hazell, 2023",
          },
        ],
      },
      {
        title: "Structural Risk",
        items: [
          {
            title: "Thinking About Risks From AI: Accidents, Misuse and Structure",
            href: "https://www.lawfaremedia.org/article/thinking-about-risks-ai-accidents-misuse-and-structure",
            note: "Zwetsloot and Dafoe, 2019",
          },
          {
            title: "The Windfall Clause: Distributing the Benefits of AI",
            href: "https://arxiv.org/abs/1912.11595",
            note: "O'Keefe et al., 2020",
          },
          {
            title: "Algorithmic Black Swans",
            href: "https://papers.ssrn.com/sol3/papers.cfm?abstract_id=4370566",
            note: "Kolt, 2023",
          },
        ],
      },
    ],
  },
  {
    id: "newsletters",
    title: "Newsletters, Podcasts, and Blogs",
    intro:
      "Stay up to date with the latest developments in AI safety, policy, and governance through these newsletters, podcasts, and blogs.",
    groups: [
      {
        title: "Newsletters and Blogs",
        items: [
          {
            title: "Transformer News",
            href: "https://www.transformernews.ai/",
            note: "Weekly briefing on the power and politics of transformative AI",
          },
          {
            title: "Import AI",
            href: "https://importai.substack.com/",
            note: "Newsletter by Jack Clark (Anthropic co-founder)",
          },
          {
            title: "Rising Tide",
            href: "https://helentoner.substack.com/",
            note: "Newsletter by Helen Toner on navigating advanced AI",
          },
          {
            title: "Hyperdimensional",
            href: "https://www.hyperdimensional.co/",
            note: "Blog by Dean Ball on emerging tech and governance",
          },
          {
            title: "Geopolitics of AGI",
            href: "https://geopoliticsagi.substack.com/",
            note: "Newsletter by RAND on strategic implications of advanced AI",
          },
          {
            title: "HLS AI Association",
            href: "https://hls.harvard.edu/hls_student_orgs/harvard-ai-law-and-policy-association/",
            note: "Harvard Law School AI and policy community",
          },
          {
            title: "Epoch AI Newsletter",
            href: "https://epochai.substack.com/",
            note: "Research and weekly commentary on AI trends",
          },
          {
            title: "SemiAnalysis",
            href: "https://semianalysis.com/",
            note: "In-depth semiconductor and AI industry analysis",
          },
          {
            title: "AI Futures Project",
            href: "https://ai-futures.org/",
            note: "Nonprofit research group forecasting the future of AI",
          },
          {
            title: "Nikola Jurkovic",
            href: "https://nikolajurkovic.substack.com/",
            note: "AISST alum writing on AI safety topics",
          },
          {
            title: "METR Substack",
            href: "https://metr.substack.com/",
            note: "Research updates from Model Evaluation & Threat Research",
          },
          {
            title: "Astral Codex Ten",
            href: "https://www.astralcodexten.com/",
            note: "Blog by Scott Alexander",
          },
          {
            title: "Obsolete",
            note: "AI journalism newsletter",
          },
          {
            title: "Anthropic Alignment Science Blog",
            href: "https://alignment.anthropic.com/",
            note: "Technical AI safety research from Anthropic",
          },
        ],
      },
      {
        title: "Podcasts",
        items: [
          {
            title: "80,000 Hours Podcast",
            href: "https://80000hours.org/podcast/",
            note: "In-depth conversations on the world's most pressing problems",
          },
          {
            title: "Emerging Tech Policy Podcast",
            href: "https://emergingtechpolicy.org/podcast/",
            note: "Narrated articles from Emerging Tech Policy website",
          },
          {
            title: "Dwarkesh Podcast",
            href: "https://www.dwarkeshpatel.com/",
            note: "Interviews with leading thinkers by Dwarkesh Patel",
          },
        ],
      },
    ],
  },
  {
    id: "fellowships",
    title: "Research Fellowships",
    intro:
      "Research fellowships and programs for students and professionals interested in AI safety, governance, and policy research.",
    groups: [
      {
        title: "AI Safety and Governance Fellowships",
        items: [
          {
            title: "SPAR Fellowship",
            href: "https://sparai.org/",
            note: "Part-time, remote research fellowship that connects rising talent with experts in AI safety, policy, or biosecurity for 3-month research projects.",
          },
          {
            title: "Pivotal Research Fellowship",
            href: "https://www.pivotal-research.org/fellowship",
            note: "9-week, in-person London fellowship focused on AI safety and governance research with mentorship, workshops, and stipend support.",
          },
          {
            title: "RAND CAST Fellowship (formerly TASP)",
            href: "https://www.rand.org/global-and-emerging-risks/centers/ai-security-and-technology/fellows.html",
            note: "Develops new generations of policy analysts and implementors at the intersection of technology and security issues. Fellows receive mentorship from RAND policy experts.",
          },
          {
            title: "LawAI Seasonal Research Fellowships",
            href: "https://law-ai.org/seasonal-research-fellowships/",
            note: "Winter and summer fellowships offering law students, professionals, and academics paid, cutting-edge AI law research with close mentorship from LawAI\u2019s research staff.",
          },
          {
            title: "GovAI Summer and Winter Fellowships",
            href: "https://www.governance.ai/post/summer-fellowship-2026-research-track",
            note: "Structured program designed to help researchers transition to working on AI governance full-time.",
          },
          {
            title: "ML Alignment and Theory Scholars (MATS)",
            href: "https://www.matsprogram.org/",
            note: "Independent research and educational seminar program connecting scholars with top mentors in AI alignment, governance, and security for a 12-week residential program.",
          },
          {
            title: "IAPS Fellowship",
            href: "https://www.iaps.ai/fellowship",
            note: "Fully funded, 3-month program for professionals from varied backgrounds at the Institute for AI Policy and Strategy.",
          },
          {
            title: "Vista AI Law and Policy Fellowship",
            href: "https://vistainstituteai.org/",
            note: "Sponsors students and recent graduates for independent research with mentor guidance or as research assistants with law professors and AI policy experts.",
          },
          {
            title: "UChicago Existential Risk Laboratory Summer Research Fellowship",
            href: "https://xrisk.uchicago.edu/fellowship/",
            note: "10-week, in-person program for undergraduate and graduate students to produce high-impact research on emerging threats from AI and other existential risks.",
          },
          {
            title: "ERA Fellowship",
            href: "https://erafellowship.org/",
            note: "8 weeks of fully-funded AI safety research with weekly mentorship from expert researchers. Work on technical safety, governance, or technical AI governance projects.",
          },
          {
            title: "Astra Fellowship",
            href: "https://www.constellation.org/programs/astra-fellowship",
            note: "Fully funded, 3\u20136 month, in-person program at Constellation\u2019s Berkeley research center for AI safety research.",
          },
          {
            title: "Vitalik Buterin Fellowships",
            href: "https://futureoflife.org/our-work/grantmaking-work/fellowships/",
            note: "Funds PhD students and postdocs working on AI safety and/or US-China AI governance research, administered by the Future of Life Institute.",
          },
          {
            title: "Foundation for American Innovation Conservative AI Policy Fellowship",
            href: "https://www.thefai.org/fellowships",
            note: "8-week, fully-funded, work-compatible program designed for conservative policy professionals.",
          },
          {
            title: "PIBBSS Fellowship",
            href: "https://pibbss.ai/fellowship/",
            note: "3-month interdisciplinary fellowship for researchers studying complex and intelligent behavior in natural and social systems, mathematics, philosophy, or engineering.",
          },
        ],
      },
      {
        title: "International Fellowships",
        items: [
          {
            title: "LASR Labs (London AI Safety Research Labs)",
            href: "https://www.lasrlabs.org/",
            note: "13-week, in-person London technical AI safety research fellowship where participants work in teams on publication-oriented projects.",
          },
          {
            title: "EU Tech Policy Fellowship",
            href: "https://www.techpolicyfellowship.eu/",
            note: "Programme empowering ambitious graduates to launch European policy careers focused on emerging technology.",
          },
          {
            title: "Talos Fellowship",
            href: "https://www.talosnetwork.org/talos-fellowship",
            note: "Three-part program to accelerate European AI policy careers: 8-week online fundamentals course, 7-day Brussels policymaking summit, and optional 4\u20136 month paid placement at leading EU policy organizations.",
          },
        ],
      },
    ],
  },
];
