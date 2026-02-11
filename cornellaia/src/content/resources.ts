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
          { title: "Tuned Lens", note: "Belrose et al." },
          {
            title: "Discovering Latent Knowledge in Language Models Without Supervision",
            note: "Burns et al.",
          },
          {
            title: "Improving Factuality and Reasoning in LMs through Multiagent Debate",
            note: "Du et al.",
          },
          {
            title: "How Language Model Hallucinations Can Snowball",
            note: "Zhang et al.",
          },
          {
            title: "Language Models (Mostly) Know What They Know",
            note: "Anthropic",
          },
        ],
      },
      {
        title: "AI Evaluations and Standards",
        items: [
          {
            title: "Model Evaluations for Extreme Risks",
            note: "Shevlane et al.",
          },
          {
            title: "GPT-4 System Card",
            note: "OpenAI",
          },
        ],
      },
      {
        title: "Goal Misgeneralization and Specification Gaming",
        items: [
          {
            title: "Goal Misgeneralization in Deep Reinforcement Learning",
            note: "Langosco et al.",
          },
          {
            title: "Goal Misgeneralization",
            note: "Shah et al.",
          },
          { title: "Specification Gaming", note: "DeepMind" },
        ],
      },
      {
        title: "Emergent Abilities",
        items: [
          {
            title: "Emergent Abilities of Large Language Models",
            note: "Wei et al.",
          },
          {
            title: "Are Emergent Abilities a Mirage?",
            note: "Schaeffer, Miranda, and Koyejo",
          },
        ],
      },
      {
        title: "Survey and General Reading",
        items: [
          { title: "Catastrophic Risks from AI" },
          { title: "Interpretability" },
          { title: "Adversaries" },
          { title: "Specification Learning" },
          { title: "Recommender Systems" },
          { title: "Embedded Agency" },
          {
            title: "AI Alignment Problem introduction",
            note: "Ngo, Chan, and Mindermann",
          },
          {
            title: "Constitutional AI: Harmlessness from AI Feedback",
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
            note: "Askell et al., 2019",
          },
          {
            title: "AI Policy Levers",
            note: "Fischer et al., 2021",
          },
          {
            title: "AI Chips: What They Are and Why They Matter",
            note: "Khan and Mann, 2020",
          },
          {
            title: "Towards Best Practices in AGI Safety and Governance",
            note: "Schuett et al., 2023",
          },
          {
            title: "12 Tentative Ideas for U.S. AI Policy",
            note: "Muehlhauser, 2023",
          },
        ],
      },
      {
        title: "Licensing, Auditing and Standards",
        items: [
          {
            title: "Auditing Large Language Models: A Three-Layered Approach",
            note: "Mokander et al., 2023",
          },
          {
            title: "Towards Trustworthy AI Development",
            note: "Brundage et al., 2020",
          },
          {
            title: "Nuclear Arms Control Verification and Lessons for AI Treaties",
            note: "Baker, 2023",
          },
          {
            title: "Verifying Rules on Large-Scale Neural Network Training",
            note: "Shavit, 2023",
          },
        ],
      },
      {
        title: "Misuse and Conflict",
        items: [
          {
            title: "How does the offense-defense balance scale?",
            note: "Garfinkel and Dafoe, 2019",
          },
          {
            title: "The Malicious Use of Artificial Intelligence",
            note: "Brundage et al., 2018",
          },
          {
            title: "Protecting Society from AI Misuse",
            note: "Anderljung and Hazell, 2023",
          },
        ],
      },
      {
        title: "Structural Risk",
        items: [
          {
            title: "Thinking About Risks From AI: Accidents, Misuse and Structure",
            note: "Zwetsloot and Dafoe, 2019",
          },
          {
            title: "The Windfall Clause: Distributing the Benefits of AI",
            note: "O'Keefe et al., 2020",
          },
          {
            title: "Algorithmic Black Swans",
            note: "Kolt, 2023",
          },
        ],
      },
    ],
  },
];
