/**
 * CS 1998, Fall 2026. The archived first offering: seven weeks, one credit, with a
 * Friday lecture, a take-home notebook and a Monday paper discussion each week.
 * Kept as published so the materials stay available at a stable URL.
 */

export interface MaterialItem {
  label: string;
  href?: string;
}

export interface WeekMaterials {
  slide: MaterialItem[];
  notebook?: MaterialItem[];
  /** For the project: the guide to the proposal and final report. */
  guide?: MaterialItem[];
  discussionReading: MaterialItem[];
  furtherReading: MaterialItem[];
}

export interface CourseWeek {
  number: number;
  /** Shown in place of "Week n", e.g. for the final project. */
  label?: string;
  description: string;
  topics: string[];
  materials: WeekMaterials;
}

export interface CourseStaffMember {
  name: string;
  role: string;
  imageSrc: string;
}

export const FALL_2026_CALENDAR_EMBED_URL =
  "https://calendar.google.com/calendar/embed?height=600&wkst=2&ctz=America%2FNew_York&showPrint=0&mode=WEEK&title=CS%201998%20Course%20Calendar&src=ancyNzgyQGNvcm5lbGwuZWR1&src=Y182NjBjN2M3NTg0MTk0MWM5ZDBhY2IzYjI4M2Y3N2Q2OThhODU3YTk4ZjcxNzE4ZWI3NGYzNjY3ZTEwYmZmYWE0QGdyb3VwLmNhbGVuZGFyLmdvb2dsZS5jb20&src=Y18wYzFkY2I4NGM2MTA0NDBiYTcwZGMzNDRiZWEwOGQ4NzQ4NDE5NjI1YzUwMjE1ZGNjMmQyMTk3MjE2ZGIyMmU1QGdyb3VwLmNhbGVuZGFyLmdvb2dsZS5jb20&src=Y18yY2RlODQyMjc2M2Y2YTUyMDlmODNmMDVlZGNiNTNjY2M5NjE1MDk4ODNhMzNkYmM2YWVmOGI1MDdjYmVlOGMxQGdyb3VwLmNhbGVuZGFyLmdvb2dsZS5jb20&src=Y18wNzViODZmOWQxZDk3M2JjZjBkNDZlMzAxZDIzY2Q0NjQxMTdlOGFhZmQ5ZjBhYTdiZmY3ZTIwNTZhMTQwYmFjQGdyb3VwLmNhbGVuZGFyLmdvb2dsZS5jb20&src=Y19mMmMxZWVkNDZmZTU5MGIyZDM1MzBiMmMxMTM4NGNlODU3YzZiZGZiY2YzNmZkOWQ0NGNiZjhiMDFlYmM1ZmU0QGdyb3VwLmNhbGVuZGFyLmdvb2dsZS5jb20&src=Y18xZmM2NzM4ZGYxODJkZDk5MDIxMGI1YmQxNTg3NDcxZjBiMzNmYjFlZTIxYTM4NTBlZWEyM2Y4ZmYwM2U4OGNmQGdyb3VwLmNhbGVuZGFyLmdvb2dsZS5jb20&src=Y185OTJiMWNmMTg0ZTE3NzAzNjNhNjVjMmMwMzZhZDQyZjllNWI0YWYxZWM2NDgyY2E4MjAwMTNmMDQ1YzY5NGVhQGdyb3VwLmNhbGVuZGFyLmdvb2dsZS5jb20&src=Y180MGRhZTU3ZDNlZWFlMzA3ODUwYzkzNDI2MWZmMmJiYzdhY2E1NjNkM2M2ZGNiOTcyNGE0MmE1MmNlNTQ3ZmIzQGdyb3VwLmNhbGVuZGFyLmdvb2dsZS5jb20&color=%23039be5&color=%23d50000&color=%234285f4&color=%23f6bf26&color=%233f51b5&color=%238e24aa&color=%23d50000&color=%23d81b60&color=%23c0ca33";

export const FALL_2026_WEEKS: CourseWeek[] = [
  {
    number: 1,
    description: "Introduction to AI Safety",
    topics: [
      "Why increasingly capable AI systems do not become safe or aligned by default.",
      "Evidence from current systems: sycophancy, deception, specification gaming, and agentic failure modes.",
      "Risk models spanning misuse, accidents, systemic harms, and loss of control.",
      "How to reason about uncertain, low-probability, high-impact outcomes.",
      "Capabilities forecasts, scenarios, and the assumptions behind them.",
    ],
    materials: {
      slide: [
        {
          label: "Week 1 slides (PDF)",
          href: "/cs1998/week_1_slides.pdf",
        },
      ],
      discussionReading: [
        {
          label: "Concrete Problems in AI Safety (Amodei et al., 2016)",
          href: "https://arxiv.org/abs/1606.06565",
        },
        {
          label: "Hugging Face Incident and the Road Ahead (OpenAI, 2026)",
          href: "https://openai.com/index/hugging-face-incident-and-the-road-ahead/",
        },
        {
          label: "OpenAI–Hugging Face Incident Investigation (METR, 2026)",
          href: "https://metr.org/blog/2026-08-26-openai-hugging-face-incident-investigation",
        },
      ],
      furtherReading: [
        {
          label: "AI 2027: Summary (Kokotajlo et al., 2025)",
          href: "https://ai-2027.com/summary",
        },
        {
          label: "International AI Safety Report 2026",
          href: "https://internationalaisafetyreport.org/publication/international-ai-safety-report-2026",
        },
      ],
    },
  },
  {
    number: 2,
    description: "AI Alignment and RLHF",
    topics: [
      "The post-training pipeline: supervised fine-tuning, preference data, reward models, and policy optimization.",
      "RLHF with PPO and direct preference methods such as DPO.",
      "Constitutional AI, reinforcement learning from AI feedback, and rule-based alignment.",
      "What present-day alignment methods accomplish in practice.",
      "Known limitations: reward misspecification, overoptimization, plural values, and dependence on human oversight.",
    ],
    materials: {
      slide: [
        {
          label: "Week 2 slides (PDF)",
          href: "/cs1998/week_2_slides.pdf",
        },
      ],
      notebook: [
        {
          label: "Week 2 notebook",
          href: "/cs1998/Week_2_Mini_Constitutional_AI.ipynb",
        },
        {
          label: "Week 2 notebook (no-code version)",
          href: "/cs1998/Week_2_Mini_Constitutional_AI_No_Code.ipynb",
        },
      ],
      discussionReading: [
        {
          label:
            "Distortion of AI Alignment: Does Preference Optimization Optimize for Preferences?",
          href: "https://arxiv.org/abs/2505.23749",
        },
      ],
      furtherReading: [
        {
          label:
            "Training Language Models to Follow Instructions with Human Feedback (Ouyang et al., 2022)",
          href: "https://arxiv.org/abs/2203.02155",
        },
        {
          label:
            "Constitutional AI: Harmlessness from AI Feedback (Bai et al., 2022)",
          href: "https://arxiv.org/abs/2212.08073",
        },
        {
          label:
            "Direct Preference Optimization: Your Language Model is Secretly a Reward Model (Rafailov et al., 2023)",
          href: "https://arxiv.org/abs/2305.18290",
        },
      ],
    },
  },
  {
    number: 3,
    description: "Reward Hacking and Goal Misgeneralization",
    topics: [
      "Goodhart's law, proxy objectives, and specification gaming.",
      "Reward hacking and reward tampering in agents and language models.",
      "Goal misgeneralization versus ordinary capability failures under distribution shift.",
      "Sycophancy and emergent misalignment after narrow fine-tuning.",
      "Mitigation strategies and why behavioral training may not remove the underlying failure mode.",
    ],
    materials: {
      slide: [
        {
          label: "Week 3 slides (PDF)",
          href: "/cs1998/week_3_slides.pdf",
        },
      ],
      notebook: [
        {
          label: "Week 3 notebook",
          href: "/cs1998/Week_3_Notebook_CoinRun.ipynb",
        },
        {
          label: "Week 3 notebook (no-code version)",
          href: "/cs1998/Week_3_Notebook_CoinRun_No_Code.ipynb",
        },
      ],
      discussionReading: [
        {
          label:
            "Emergent Misalignment: Narrow Finetuning Can Produce Broadly Misaligned LLMs (Betley et al., 2025)",
          href: "https://arxiv.org/abs/2502.17424",
        },
      ],
      furtherReading: [
        {
          label:
            "Sycophancy to Subterfuge: Investigating Reward-Tampering in Large Language Models (Denison et al., 2024)",
          href: "https://arxiv.org/abs/2406.10162",
        },
        {
          label:
            "Goal Misgeneralization in Deep Reinforcement Learning (Langosco et al., 2022)",
          href: "https://arxiv.org/abs/2105.14111",
        },
        {
          label:
            "Scaling Laws for Reward Model Overoptimization (Gao et al., 2022)",
          href: "https://arxiv.org/abs/2210.10760",
        },
      ],
    },
  },
  {
    number: 4,
    description: "Interpretability",
    topics: [
      "What interpretability is for and what kinds of evidence it can provide.",
      "Probes, logit attribution, activation patching, and causal interventions.",
      "Sparse features, circuit tracing, and representation engineering.",
      "The Jacobian lens and the J-space hypothesis of a verbalizable global workspace.",
      "Limits of current methods and the challenge of scalable, safety-relevant auditing.",
    ],
    materials: {
      slide: [
        {
          label: "Week 4 slides (PDF)",
          href: "/cs1998/week_4_slides.pdf",
        },
      ],
      notebook: [
        {
          label: "Week 4 notebook",
          href: "/cs1998/Week_4_Notebook_Abliteration.ipynb",
        },
        {
          label: "Week 4 notebook (no-code version)",
          href: "/cs1998/Week_4_Notebook_Abliteration_No_Code.ipynb",
        },
      ],
      discussionReading: [
        {
          label:
            "Verbalizable Representations Form a Global Workspace in Language Models (Gurnee et al., 2026)",
          href: "https://arxiv.org/abs/2607.15495",
        },
      ],
      furtherReading: [
        {
          label:
            "Natural Language Autoencoders: Turning Claude's Thoughts into Text (Anthropic, 2026)",
          href: "https://www.anthropic.com/research/natural-language-autoencoders",
        },
        {
          label:
            "Circuit Tracing: Revealing Computational Graphs in Language Models (Ameisen et al., 2025)",
          href: "https://transformer-circuits.pub/2025/attribution-graphs/methods.html",
        },
        {
          label:
            "Open Problems in Mechanistic Interpretability (Sharkey et al., 2025)",
          href: "https://arxiv.org/abs/2501.16496",
        },
      ],
    },
  },
  {
    number: 5,
    description: "Evaluating Dangerous Capabilities",
    topics: [
      "Threat modeling and capability elicitation before benchmark design.",
      "Evaluations for cyber, biological, persuasion, deception, autonomy, and self-proliferation capabilities.",
      "Construct validity, contamination, sandbagging, and evaluation awareness.",
      "Manual red teaming, automated red teaming, and scalable evaluation pipelines.",
      "Using evaluation evidence to inform deployment safeguards and safety cases.",
    ],
    materials: {
      slide: [
        {
          label: "Week 5 slides (PDF)",
          href: "/cs1998/week_5_slides.pdf",
        },
      ],
      notebook: [
        {
          label: "Week 5 notebook",
          href: "/cs1998/Week%205%20Evaluation%20Awareness%20Notebook.ipynb",
        },
        {
          label: "Week 5 notebook (no-code version)",
          href: "/cs1998/Week%205%20Evaluation%20Awareness%20No-Code%20Notebook.ipynb",
        },
      ],
      discussionReading: [
        {
          label:
            "Evaluating Frontier Models for Dangerous Capabilities (Phuong et al., 2024)",
          href: "https://arxiv.org/abs/2403.13793",
        },
      ],
      furtherReading: [
        {
          label:
            "Model Evaluation for Extreme Risks (Shevlane et al., 2023)",
          href: "https://arxiv.org/abs/2305.15324",
        },
        {
          label: "Measuring AI Ability to Complete Long Tasks (METR, 2025)",
          href: "https://metr.org/blog/2025-03-19-measuring-ai-ability-to-complete-long-tasks/",
        },
        {
          label:
            "Frontier Models are Capable of In-context Scheming (Meinke et al., 2024)",
          href: "https://arxiv.org/abs/2412.04984",
        },
      ],
    },
  },
  {
    number: 6,
    description: "Control and Scalable Oversight",
    topics: [
      "The supervision gap and weak-to-strong generalization.",
      "Scalable oversight through debate, critique, decomposition, and recursive supervision.",
      "AI control protocols: trusted monitoring, untrusted monitoring, trusted editing, and defer-to-human strategies.",
      "Control evaluations against intentionally subversive model behavior.",
      "Safety-usefulness tradeoffs and evidence for an AI control safety case.",
    ],
    materials: {
      slide: [
        {
          label: "Week 6 slides (PDF)",
          href: "/cs1998/week_6_slides.pdf",
        },
      ],
      notebook: [
        {
          label: "Week 6 notebook",
          href: "/cs1998/Week_6_Notebook_Catching_Sabotage.ipynb",
        },
        {
          label: "Week 6 notebook (no-code version)",
          href: "/cs1998/Week_6_Notebook_Catching_Sabotage_No_Code.ipynb",
        },
      ],
      discussionReading: [
        {
          label:
            "How to Evaluate Control Measures for LLM Agents? A Trajectory from Today to Superintelligence (Korbak et al., 2025)",
          href: "https://arxiv.org/abs/2504.05259",
        },
      ],
      furtherReading: [
        {
          label:
            "AI Control: Improving Safety Despite Intentional Subversion (Greenblatt et al., 2023)",
          href: "https://arxiv.org/abs/2312.06942",
        },
        {
          label:
            "On Scalable Oversight with Weak LLMs Judging Strong LLMs (Kenton et al., 2024)",
          href: "https://arxiv.org/abs/2407.04622",
        },
        {
          label:
            "Weak Critics Make Strong Learners: On-Policy Critique Distillation for Scalable Oversight (Jin et al., 2026)",
          href: "https://arxiv.org/abs/2606.00424",
        },
      ],
    },
  },
  {
    number: 7,
    description: "Policy, Governance, and Forecasting",
    topics: [
      "Capability, algorithmic, and compute trends and what they can and cannot predict.",
      "Forecasting timelines and takeoff under deep uncertainty.",
      "Governance tools: evaluations, safety cases, transparency, incident reporting, and compute governance.",
      "Domestic regulation and international coordination at the frontier.",
      "Open research questions and technical, policy, and governance career paths.",
    ],
    materials: {
      slide: [
        {
          label: "Week 7 slides (PDF)",
          href: "/cs1998/week_7_slides.pdf",
        },
      ],
      discussionReading: [
        {
          label: "AI 2040: Plan A (AI Futures Project, 2026)",
          href: "https://ai-2040.com/",
        },
      ],
      furtherReading: [
        {
          label: "International AI Safety Report 2026",
          href: "https://internationalaisafetyreport.org/publication/international-ai-safety-report-2026",
        },
        {
          label: "AI 2027: Summary (Kokotajlo et al., 2025)",
          href: "https://ai-2027.com/summary",
        },
        {
          label: "Epoch AI: Compute Trends Across Three Eras of Machine Learning",
          href: "https://epoch.ai/trends",
        },
        {
          label:
            "The 2026 Singapore Consensus on Global AI Safety Research Priorities",
          href: "https://arxiv.org/abs/2608.14611",
        },
      ],
    },
  },
  {
    number: 8,
    label: "Project",
    description: "Final Project",
    topics: [
      "Choose one question in AI safety and alignment and study it in more depth than the weekly labs allow.",
      "Technical projects in interpretability, evaluations, alignment training, AI control, or scalable oversight, or non-technical projects in policy and governance, ethics and philosophy, or forecasting.",
      "A short proposal, then a final report: 1 to 2 pages with figures for technical projects, or at least 1,000 words for non-technical ones.",
      "Work alone or in a team of up to three.",
    ],
    materials: {
      slide: [],
      guide: [
        {
          label: "Final project guide (PDF)",
          href: "/cs1998/final_project_guide.pdf",
        },
      ],
      discussionReading: [],
      furtherReading: [],
    },
  },
];

export const FALL_2026_STAFF: CourseStaffMember[] = [
  {
    name: "Jinzhou Wu",
    role: "Organizer and Lead Instructor",
    imageSrc: "/team/TEAM_jinzhou_wu.png",
  },
  {
    name: "Daniel Lee",
    role: "Head TA",
    imageSrc: "/team/TEAM_daniel_lee.jpeg",
  },
  {
    name: "Arya Datla",
    role: "Teaching Assistant",
    imageSrc: "/team/TEAM_arya_datla.jpeg",
  },
  {
    name: "Karan Verma",
    role: "Teaching Assistant",
    imageSrc: "/team/TEAM_karan_verma.jpeg",
  },
  {
    name: "Jasmine Li",
    role: "Advisor",
    imageSrc: "/team/TEAM_jasmine_li_2026.jpg",
  },
  {
    name: "Jonathn Chang",
    role: "Advisor",
    imageSrc: "/team/TEAM_jonathn_chang.png",
  },
  {
    name: "Suvadip Sana",
    role: "Advisor",
    imageSrc: "/team/TEAM_suvadip_sana.jpg",
  },
  {
    name: "Éva Tardos",
    role: "Faculty Advisor",
    imageSrc: "/team/TEAM_eva_tardos.jpg",
  },
];
