/**
 * CS 1998, Spring 2027. Fourteen 50-minute lectures across the first seven weeks,
 * paired into modules of two. The February break falls between modules 3 and 4, and the
 * later modules therefore run from a Wednesday to the following Monday.
 */

export interface MaterialItem {
  label: string;
  href?: string;
}

export interface Lecture {
  /** Null for the February break, which takes a slot but is not a lecture. */
  number: number | null;
  /** The meeting day, e.g. "Mon 1/25". */
  date: string;
  title: string;
  /** What the lecture covers, in one line. */
  covers: string;
  readings: MaterialItem[];
  slides?: MaterialItem[];
  notebook?: MaterialItem[];
}

export interface CourseModule {
  number: number;
  title: string;
  lectures: Lecture[];
  /** A non-teaching day that falls immediately before this module. */
  breakBefore?: { date: string; label: string };
}

export const SPRING_2027_MODULES: CourseModule[] = [
  {
    number: 1,
    title: "Foundations",
    lectures: [
      {
        number: 1,
        date: "Mon 1/25",
        title: "Intro to AI safety & alignment",
        covers:
          "The risk landscape (misuse, misalignment, systemic risk), why now (compute and capability trends), and a map of the course.",
        readings: [
          {
            label: "Concrete Problems in AI Safety (Amodei et al., 2016)",
            href: "https://arxiv.org/abs/1606.06565",
          },
          {
            label: "An Overview of Catastrophic AI Risks (Hendrycks et al., 2023)",
            href: "https://arxiv.org/abs/2306.12001",
          },
          {
            label:
              "The Alignment Problem from a Deep Learning Perspective (Ngo et al., 2022)",
            href: "https://arxiv.org/abs/2209.00626",
          },
          {
            label: "International AI Safety Report (Bengio et al.)",
            href: "https://internationalaisafetyreport.org/",
          },
        ],
      },
      {
        number: 2,
        date: "Wed 1/27",
        title: "LLM Preliminaries",
        covers:
          "Transformer intuition, the pretraining to SFT to RLHF/RLVR pipeline, reasoning models, and agent scaffolds.",
        readings: [
          {
            label: "The Illustrated Transformer (Alammar, 2018)",
            href: "https://jalammar.github.io/illustrated-transformer/",
          },
          {
            label: "Attention Is All You Need (Vaswani et al., 2017)",
            href: "https://arxiv.org/abs/1706.03762",
          },
          {
            label:
              "DeepSeek-R1: Incentivizing Reasoning Capability in LLMs via Reinforcement Learning (DeepSeek-AI, 2025)",
            href: "https://arxiv.org/abs/2501.12948",
          },
          {
            label: "Building Effective AI Agents (Anthropic, 2024)",
            href: "https://www.anthropic.com/engineering/building-effective-agents",
          },
        ],
      },
    ],
  },
  {
    number: 2,
    title: "Alignment Training",
    lectures: [
      {
        number: 3,
        date: "Mon 2/1",
        title: "Preference alignment",
        covers:
          "Reward models, RLHF, DPO, and sycophancy as the first visible crack.",
        readings: [
          {
            label:
              "Training Language Models to Follow Instructions with Human Feedback (Ouyang et al., 2022)",
            href: "https://arxiv.org/abs/2203.02155",
          },
          {
            label:
              "Direct Preference Optimization: Your Language Model Is Secretly a Reward Model (Rafailov et al., 2023)",
            href: "https://arxiv.org/abs/2305.18290",
          },
          {
            label:
              "Towards Understanding Sycophancy in Language Models (Sharma et al., 2023)",
            href: "https://arxiv.org/abs/2310.13548",
          },
          {
            label:
              "Illustrating Reinforcement Learning from Human Feedback (Hugging Face, 2022)",
            href: "https://huggingface.co/blog/rlhf",
          },
        ],
      },
      {
        number: 4,
        date: "Wed 2/3",
        title: "Principles & character",
        covers:
          "Constitutional AI, model specs, character training, and the question of whose values a model should hold.",
        readings: [
          {
            label:
              "Constitutional AI: Harmlessness from AI Feedback (Bai et al., 2022)",
            href: "https://arxiv.org/abs/2212.08073",
          },
          {
            label: "OpenAI Model Spec",
            href: "https://model-spec.openai.com/",
          },
          {
            label: "Claude's Character (Anthropic, 2024)",
            href: "https://www.anthropic.com/research/claude-character",
          },
          {
            label: "A Roadmap to Pluralistic Alignment (Sorensen et al., 2024)",
            href: "https://arxiv.org/abs/2402.05070",
          },
        ],
      },
    ],
  },
  {
    number: 3,
    title: "Misalignment",
    lectures: [
      {
        number: 5,
        date: "Mon 2/8",
        title: "Specification gaming & reward hacking",
        covers:
          "Goodhart's law, reward model overoptimization, reward hacking in coding agents, and emergent misalignment.",
        readings: [
          {
            label:
              "Specification Gaming: The Flip Side of AI Ingenuity (Krakovna et al., 2020)",
            href: "https://deepmind.google/discover/blog/specification-gaming-the-flip-side-of-ai-ingenuity/",
          },
          {
            label:
              "Scaling Laws for Reward Model Overoptimization (Gao et al., 2022)",
            href: "https://arxiv.org/abs/2210.10760",
          },
          {
            label: "Reward Hacking in Reinforcement Learning (Weng, 2024)",
            href: "https://lilianweng.github.io/posts/2024-11-28-reward-hacking/",
          },
          {
            label:
              "Emergent Misalignment: Narrow Finetuning Can Produce Broadly Misaligned LLMs (Betley et al., 2025)",
            href: "https://arxiv.org/abs/2502.17424",
          },
          {
            label:
              "Natural Emergent Misalignment from Reward Hacking in Production RL (MacDiarmid et al., 2025)",
            href: "https://arxiv.org/abs/2511.18397",
          },
        ],
      },
      {
        number: 6,
        date: "Wed 2/10",
        title: "Goal misgeneralization & scheming",
        covers:
          "CoinRun, learned optimization, and deceptive alignment as the limiting case.",
        readings: [
          {
            label:
              "Goal Misgeneralization in Deep Reinforcement Learning (Langosco et al., 2022)",
            href: "https://arxiv.org/abs/2105.14111",
          },
          {
            label:
              "Goal Misgeneralization: Why Correct Specifications Aren't Enough for Correct Goals (Shah et al., 2022)",
            href: "https://arxiv.org/abs/2210.01790",
          },
          {
            label:
              "Risks from Learned Optimization in Advanced Machine Learning Systems (Hubinger et al., 2019)",
            href: "https://arxiv.org/abs/1906.01820",
          },
          {
            label:
              "Scheming AIs: Will AIs Fake Alignment During Training in Order to Get Power? (Carlsmith, 2023)",
            href: "https://arxiv.org/abs/2311.08379",
          },
        ],
      },
    ],
  },
  {
    number: 4,
    title: "Evaluations",
    breakBefore: { date: "Mon 2/15", label: "February break" },
    lectures: [
      {
        number: 7,
        date: "Wed 2/17",
        title: "Dangerous capability evals",
        covers:
          "CBRN, cyber and autonomy evaluations, capability elicitation, jailbreaks and safeguards.",
        readings: [
          {
            label:
              "Evaluating Frontier Models for Dangerous Capabilities (Phuong et al., 2024)",
            href: "https://arxiv.org/abs/2403.13793",
          },
          {
            label:
              "Universal and Transferable Adversarial Attacks on Aligned Language Models (Zou et al., 2023)",
            href: "https://arxiv.org/abs/2307.15043",
          },
          {
            label:
              "Constitutional Classifiers: Defending Against Universal Jailbreaks (Sharma et al., 2025)",
            href: "https://arxiv.org/abs/2501.18837",
          },
          {
            label: "Guidelines for Capability Elicitation (METR, 2024)",
            href: "https://metr.org/blog/2024-03-15-guidelines-for-capability-elicitation/",
          },
        ],
      },
      {
        number: 8,
        date: "Mon 2/22",
        title: "Propensity evals & model organisms",
        covers:
          "Sleeper agents, alignment faking, in-context scheming, evaluation awareness, and sandbagging.",
        readings: [
          {
            label:
              "Sleeper Agents: Training Deceptive LLMs That Persist Through Safety Training (Hubinger et al., 2024)",
            href: "https://arxiv.org/abs/2401.05566",
          },
          {
            label: "Alignment Faking in Large Language Models (Greenblatt et al., 2024)",
            href: "https://arxiv.org/abs/2412.14093",
          },
          {
            label:
              "Frontier Models Are Capable of In-Context Scheming (Meinke et al., 2024)",
            href: "https://arxiv.org/abs/2412.04984",
          },
          {
            label:
              "AI Sandbagging: Language Models Can Strategically Underperform on Evaluations (van der Weij et al., 2024)",
            href: "https://arxiv.org/abs/2406.07358",
          },
          {
            label:
              "Large Language Models Often Know When They Are Being Evaluated (Needham et al., 2025)",
            href: "https://arxiv.org/abs/2505.23836",
          },
        ],
      },
    ],
  },
  {
    number: 5,
    title: "Interpretability",
    lectures: [
      {
        number: 9,
        date: "Wed 2/24",
        title: "Interp: Representations",
        covers:
          "Linear representations, probes, superposition, sparse autoencoders, steering and persona vectors.",
        readings: [
          {
            label: "Toy Models of Superposition (Elhage et al., 2022)",
            href: "https://transformer-circuits.pub/2022/toy_model/index.html",
          },
          {
            label:
              "Scaling Monosemanticity: Extracting Interpretable Features from Claude 3 Sonnet (Templeton et al., 2024)",
            href: "https://transformer-circuits.pub/2024/scaling-monosemanticity/index.html",
          },
          {
            label:
              "The Linear Representation Hypothesis and the Geometry of Large Language Models (Park et al., 2023)",
            href: "https://arxiv.org/abs/2311.03658",
          },
          {
            label: "Persona Vectors: Monitoring and Controlling Character Traits in Language Models (Chen et al., 2025)",
            href: "https://arxiv.org/abs/2507.21509",
          },
          {
            label: "Neural Networks Are Already Clean (Cammarata, 2026)",
            href: "https://already-clean.goodfire.com/",
          },
        ],
      },
      {
        number: 10,
        date: "Mon 3/1",
        title: "Interp: Causal methods & auditing",
        covers:
          "Activation patching, circuits, attribution graphs, auditing for hidden objectives, and the honest limits of the field.",
        readings: [
          {
            label:
              "Interpretability in the Wild: A Circuit for Indirect Object Identification in GPT-2 Small (Wang et al., 2022)",
            href: "https://arxiv.org/abs/2211.00593",
          },
          {
            label: "Auditing Language Models for Hidden Objectives (Marks et al., 2025)",
            href: "https://arxiv.org/abs/2503.10965",
          },
          {
            label: "On the Biology of a Large Language Model (Lindsey et al., 2025)",
            href: "https://transformer-circuits.pub/2025/attribution-graphs/biology.html",
          },
          {
            label: "Open Problems in Mechanistic Interpretability (Sharkey et al., 2025)",
            href: "https://arxiv.org/abs/2501.16496",
          },
        ],
      },
    ],
  },
  {
    number: 6,
    title: "Oversight and Control",
    lectures: [
      {
        number: 11,
        date: "Wed 3/3",
        title: "Scalable oversight",
        covers:
          "Debate, weak-to-strong generalization, and AI-assisted evaluation.",
        readings: [
          {
            label: "AI Safety via Debate (Irving et al., 2018)",
            href: "https://arxiv.org/abs/1805.00899",
          },
          {
            label:
              "Debating with More Persuasive LLMs Leads to More Truthful Answers (Khan et al., 2024)",
            href: "https://arxiv.org/abs/2402.06782",
          },
          {
            label:
              "Weak-to-Strong Generalization: Eliciting Strong Capabilities with Weak Supervision (Burns et al., 2023)",
            href: "https://arxiv.org/abs/2312.09390",
          },
          {
            label:
              "Measuring Progress on Scalable Oversight for Large Language Models (Bowman et al., 2022)",
            href: "https://arxiv.org/abs/2211.03540",
          },
        ],
      },
      {
        number: 12,
        date: "Mon 3/8",
        title: "AI control",
        covers:
          "The untrusted-model threat model, trusted monitoring, chain-of-thought monitoring, control evaluations and safety cases.",
        readings: [
          {
            label:
              "AI Control: Improving Safety Despite Intentional Subversion (Greenblatt et al., 2023)",
            href: "https://arxiv.org/abs/2312.06942",
          },
          {
            label: "Ctrl-Z: Controlling AI Agents via Resampling (Bhatt et al., 2025)",
            href: "https://arxiv.org/abs/2504.10374",
          },
          {
            label:
              "Chain of Thought Monitorability: A New and Fragile Opportunity for AI Safety (Korbak et al., 2025)",
            href: "https://arxiv.org/abs/2507.11473",
          },
          {
            label:
              "Safety Cases: How to Justify the Safety of Advanced AI Systems (Clymer et al., 2024)",
            href: "https://arxiv.org/abs/2403.10462",
          },
        ],
      },
    ],
  },
  {
    number: 7,
    title: "Governance and Futures",
    lectures: [
      {
        number: 13,
        date: "Wed 3/10",
        title: "Policy & governance",
        covers:
          "Frontier safety frameworks, compute governance, regulation and international coordination.",
        readings: [
          {
            label:
              "Frontier AI Regulation: Managing Emerging Risks to Public Safety (Anderljung et al., 2023)",
            href: "https://arxiv.org/abs/2307.03718",
          },
          {
            label:
              "Computing Power and the Governance of Artificial Intelligence (Sastry et al., 2024)",
            href: "https://arxiv.org/abs/2402.08797",
          },
          {
            label: "Anthropic's Responsible Scaling Policy",
            href: "https://www.anthropic.com/news/anthropics-responsible-scaling-policy",
          },
          {
            label: "The EU AI Act Explorer",
            href: "https://artificialintelligenceact.eu/ai-act-explorer/",
          },
          {
            label:
              "Progress on Provable Inference for Large Language Models (Anthropic, 2026)",
            href: "https://www.anthropic.com/research/provable-inference",
          },
        ],
      },
      {
        number: 14,
        date: "Mon 3/15",
        title: "Forecasting",
        covers:
          "Trend extrapolation, scenarios, open problems and careers.",
        readings: [
          {
            label: "AI 2027 (Kokotajlo et al., 2025)",
            href: "https://ai-2027.com/",
          },
          {
            label:
              "Measuring AI Ability to Complete Long Software Tasks (Kwa et al., 2025)",
            href: "https://arxiv.org/abs/2503.14499",
          },
          {
            label: "Trends in AI (Epoch AI)",
            href: "https://epoch.ai/trends",
          },
          {
            label: "AI Safety Technical Research: Career Review (80,000 Hours)",
            href: "https://80000hours.org/career-reviews/ai-safety-technical-research/",
          },
        ],
      },
    ],
  },
];

/** The project runs alongside the lectures rather than in its own teaching slot. */
export const SPRING_2027_PROJECT: CourseModule = {
  number: 8,
  title: "Project",
  lectures: [],
};

export interface CourseStaffMember {
  name: string;
  role: string;
  imageSrc: string;
}

/** Jinzhou first, then the rest alphabetically, with the faculty advisor last. */
export const SPRING_2027_STAFF: CourseStaffMember[] = [
  { name: "Jinzhou Wu", role: "Organizer", imageSrc: "/team/TEAM_jinzhou_wu.png" },
  { name: "Arya Datla", role: "Instructor", imageSrc: "/team/TEAM_arya_datla.jpeg" },
  { name: "Jash Vira", role: "Instructor", imageSrc: "/team/TEAM_jash_vira.jpeg" },
  { name: "Niranjan Nair", role: "Instructor", imageSrc: "/team/TEAM_niranjan_nair.jpeg" },
  { name: "Owen Karmel", role: "Instructor", imageSrc: "/team/TEAM_owen_karmel.jpeg" },
  { name: "Rittik Bhattacharya", role: "Instructor", imageSrc: "/team/TEAM_rittik_bhattacharya_2026.jpg" },
  { name: "\u00c9va Tardos", role: "Faculty Advisor", imageSrc: "/team/TEAM_eva_tardos.jpg" },
];
