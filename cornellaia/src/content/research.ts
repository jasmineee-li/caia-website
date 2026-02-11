export interface ResearchAuthor {
  name: string;
  isCaiaMember?: boolean;
}

export interface ResearchPaperDetail {
  title: string;
  href: string;
  authors: ResearchAuthor[];
  abstract: string;
  tags: string[];
}

export const RESEARCH_PAPERS: ResearchPaperDetail[] = [
  {
    title: "Democratic Preference Alignment via Sortition-Weighted RLHF",
    href: "https://arxiv.org/abs/2602.05113",
    authors: [
      { name: "Suvadip Sana", isCaiaMember: true },
      { name: "Jinzhou Wu", isCaiaMember: true },
      { name: "Martin T. Wells" },
    ],
    abstract:
      "Whose values should AI systems learn? Preference based alignment methods like RLHF derive their training signal from human raters, yet these rater pools are typically convenience samples that systematically over represent some demographics and under represent others. We introduce Democratic Preference Optimization, or DemPO, a framework that applies algorithmic sortition, the same mechanism used to construct citizen assemblies, to preference based fine tuning. DemPO offers two training schemes. Hard Panel trains exclusively on preferences from a quota satisfying mini public sampled via sortition. Soft Panel retains all data but reweights each rater by their inclusion probability under the sortition lottery. We prove that Soft Panel weighting recovers the expected Hard Panel objective in closed form. Using a public preference dataset that pairs human judgments with rater demographics and a seventy five clause constitution independently elicited from a representative United States panel, we evaluate Llama models from one billion to eight billion parameters fine tuned under each scheme. Across six aggregation methods, the Hard Panel consistently ranks first and the Soft Panel consistently outperforms the unweighted baseline, with effect sizes growing as model capacity increases. These results demonstrate that enforcing demographic representativeness at the preference collection stage, rather than post hoc correction, yields models whose behavior better reflects values elicited from representative publics.",
    tags: ["Preprint"],
  },
  {
    title: "AI Deception: Risks, Dynamics, and Controls",
    href: "https://arxiv.org/abs/2511.22619",
    authors: [
      { name: "Boyuan Chen" },
      { name: "Sitong Fang" },
      { name: "Jiaming Ji" },
      { name: "Yanxu Zhu" },
      { name: "Pengcheng Wen" },
      { name: "Jinzhou Wu", isCaiaMember: true },
      { name: "et al." },
    ],
    abstract:
      "As intelligence increases, so does its shadow. AI deception, in which systems induce false beliefs to secure self-beneficial outcomes, has evolved from a speculative concern to an empirically demonstrated risk across language models, AI agents, and emerging frontier systems. This project provides a comprehensive and up-to-date overview of the AI deception field, covering its core concepts, methodologies, genesis, and potential mitigations. First, we identify a formal definition of AI deception, grounded in signaling theory from studies of animal deception. We then review existing empirical studies and associated risks, highlighting deception as a sociotechnical safety challenge. We organize the landscape of AI deception research as a deception cycle, consisting of two key components: deception emergence and deception treatment. Deception emergence reveals the mechanisms underlying AI deception: systems with sufficient capability and incentive potential inevitably engage in deceptive behaviors when triggered by external conditions. Deception treatment, in turn, focuses on detecting and addressing such behaviors. On deception emergence, we analyze incentive foundations across three hierarchical levels and identify three essential capability preconditions required for deception. We further examine contextual triggers, including supervision gaps, distributional shifts, and environmental pressures. On deception treatment, we conclude detection methods covering benchmarks and evaluation protocols in static and interactive settings. Building on the three core factors of deception emergence, we outline potential mitigation strategies and propose auditing approaches that integrate technical, community, and governance efforts to address sociotechnical challenges and future AI risks.",
    tags: ["Report", "Collaboration with Turing Award winner Andrew Yao"],
  },
  {
    title: "EigenBench: A Comparative Behavior Measure of Value Alignment",
    href: "https://arxiv.org/pdf/2509.01938",
    authors: [
      { name: "Jonathn Chang", isCaiaMember: true },
      { name: "Leonhard Piff", isCaiaMember: true },
      { name: "Suvadip Sana", isCaiaMember: true },
      { name: "Jasmine X. Li", isCaiaMember: true },
      { name: "Lionel Levine", isCaiaMember: true },
    ],
    abstract:
      "Aligning AI with human values is a pressing unsolved problem. To address the lack of quantitative metrics for value alignment, we propose EigenBench: a black-box method for comparatively benchmarking language models' values. Given an ensemble of models, a constitution describing a value system, and a dataset of scenarios, our method returns a vector of scores quantifying each model's alignment to the given constitution. To produce these scores, each model judges the outputs of other models across many scenarios, and these judgments are aggregated with EigenTrust (Kamvar et al., 2003), yielding scores that reflect a weighted consensus judgment of the whole ensemble. EigenBench uses no ground truth labels, as it is designed to quantify subjective traits for which reasonable judges may disagree on the correct label. Hence, to validate our method, we collect human judgments on the same ensemble of models and show that EigenBench's judgments align closely with those of human evaluators. We further demonstrate that EigenBench can recover model rankings on the GPQA benchmark without access to objective labels, supporting its viability as a framework for evaluating subjective values for which no ground truths exist.",
    tags: ["ICLR 2026 Oral"],
  },
  {
    title: "ProgressGym: Alignment with a Millennium of Moral Progress",
    href: "https://arxiv.org/abs/2406.20087",
    authors: [
      { name: "Tianyi Qiu" },
      { name: "Yang Zhang" },
      { name: "Xuchuan Huang" },
      { name: "Jasmine Xinze Li", isCaiaMember: true },
      { name: "Jiaming Ji" },
      { name: "Yaodong Yang" },
    ],
    abstract:
      "Frontier AI systems, including large language models (LLMs), hold increasing influence over the epistemology of human users. Such influence can reinforce prevailing societal values, potentially contributing to the lock-in of misguided moral beliefs and, consequently, the perpetuation of problematic moral practices on a broad scale. We introduce progress alignment as a technical solution to mitigate this imminent risk. Progress alignment algorithms learn to emulate the mechanics of human moral progress, thereby addressing the susceptibility of existing alignment methods to contemporary moral blindspots. To empower research in progress alignment, we introduce ProgressGym, an experimental framework allowing the learning of moral progress mechanics from history, in order to facilitate future progress in real-world moral decisions. Leveraging 9 centuries of historical text and 18 historical LLMs, ProgressGym enables codification of real-world progress alignment challenges into concrete benchmarks. Specifically, we introduce three core challenges: tracking evolving values (PG-Follow), preemptively anticipating moral progress (PG-Predict), and regulating the feedback loop between human and AI value shifts (PG-Coevolve). Alignment methods without a temporal dimension are inapplicable to these tasks. In response, we present lifelong and extrapolative algorithms as baseline methods of progress alignment, and build an open leaderboard soliciting novel algorithms and challenges. The framework and the leaderboard are available at this https URL and this https URL respectively.",
    tags: ["NeurIPS 2024 Spotlight", "Benchmarks"],
  },
  {
    title:
      "Scaling laws for contrastive activation addition with refusal mechanisms",
    href: "https://arxiv.org/abs/2507.11771",
    authors: [
      { name: "Sheikh Abdur Raheem Ali" },
      { name: "Justin Xu" },
      { name: "Ivory Yang" },
      { name: "Jasmine Xinze Li", isCaiaMember: true },
      { name: "Ayse Arslan" },
      { name: "Clark Benham" },
    ],
    abstract:
      "As large language models (LLMs) evolve in complexity and capability, the efficacy of less widely deployed alignment techniques are uncertain. Building on previous work on activation steering and contrastive activation addition (CAA), this paper explores the effectiveness of CAA with model scale using the family of Llama 2 models (7B, 13B, and 70B). CAA works by finding desirable 'directions' in the model's residual stream vector space using contrastive pairs (for example, hate to love) and adding this direction to the residual stream during the forward pass. It directly manipulates the residual stream and aims to extract features from language models to better control their outputs. Using answer matching questions centered around the refusal behavior, we found that 1) CAA is most effective when applied at early-mid layers. 2) The effectiveness of CAA diminishes with model size. 3) Negative steering has more pronounced effects than positive steering across all model sizes.",
    tags: ["SPAR S24", "Model Steering"],
  },
];
