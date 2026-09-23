export interface ResearchAuthor {
  name: string;
  isCaiaMember?: boolean;
}

export interface ResearchPaperDetail {
  title: string;
  href: string;
  imageSrc: string;
  imageAlt: string;
  imageWidth: number;
  imageHeight: number;
  authors: ResearchAuthor[];
  abstract: string;
  summaryLabel?: "Project summary" | "Research summary" | "Executive summary excerpt";
  tags: string[];
  shortTag?: string;
}

export const RESEARCH_PAPERS: ResearchPaperDetail[] = [
  {
    title: "Building AI Agent for NYC Council Workflows",
    href: "https://www.pi.tech.cornell.edu/spotlight/building-ai-agent-for-nyc-council-workflows",
    imageSrc: "/papers/preview-council-agent.svg",
    imageAlt: "Illustration of an AI router connecting NYC Council staff to legislative records, documents, and data",
    imageWidth: 1128,
    imageHeight: 1340,
    authors: [{ name: "Suvadip Sana", isCaiaMember: true }],
    summaryLabel: "Project summary",
    abstract:
      "During a Siegel PiTech PhD Impact Fellowship, Suvadip Sana worked with the New York City Council Data Team to build a tool-using AI agent for Council staff. An AI router connects locally hosted, open-source language models to legislative records, legal-document retrieval, Council data, web search, and calculations through a Model Context Protocol server. Retrieved information grounds the responses, while guardrails support responsible use of sensitive government information. The project outlines further work on routing, reliability, safety, and fairness.",
    tags: ["PiTech Fellowship Report", "September 2026"],
    shortTag: "PiTech Project",
  },
  {
    title: "CogGym: Towards Large-Scale Comparative Evaluation of Human and Machine Cognition",
    href: "https://arxiv.org/abs/2609.21259",
    imageSrc: "/papers/paper-coggym.jpg",
    imageAlt: "First page of CogGym: Towards Large-Scale Comparative Evaluation of Human and Machine Cognition",
    imageWidth: 2550,
    imageHeight: 3300,
    authors: [
      { name: "Lance Ying" },
      { name: "Jinzhou Wu", isCaiaMember: true },
      { name: "et al." },
    ],
    abstract:
      "Understanding and modeling human intelligence are parallel goals shared by artificial intelligence (AI) and cognitive science. As AI systems grow increasingly capable, in what ways do model responses resemble human responses, and where do they systematically diverge? The sheer breadth and diversity of the tasks humans can perform and think about pose a challenge for scalable and rigorous comparison between humans and models. We introduce CogGym, a scalable, unified framework grounded in cognitive science for systematically comparing model and human behavior on matched experimental trials. CogGym uses a semi-automated, human-in-the-loop pipeline to standardize diverse experimental paradigms into a task-agnostic Experiment Markup Language (EML), enabling reproducible and faithful comparison at scale. For initial release, we curate and standardize 258 cognitive experiments from 100 papers that focuses on human commonsense reasoning, and evaluate 50 large language models against human responses. We find a clear scaling trend where larger and more recent AI models better reproduce human judgments. Yet AI models' improvement on such common reasoning tasks is considerably slower than the gains observed on formal-reasoning benchmarks like math and coding, and model--human fit remains well below human splithalf reliability (R² = 0.93 on text, 0.95 on image, and 0.92 on video) with the best models achieving R² = 0.59 on text, 0.58 on image, and 0.43 on video experiments. We intend for CogGym to provide a living evaluation framework that continually incorporates new cognitive science experiments to characterize where model behavior resembles human behavior, where it systematically diverges, and how those patterns change as models and experiments evolve.",
    tags: ["Preprint 2026"],
  },
  {
    title: "Stubborn or Sycophantic? GEPA-Evolved Prompts Under Pressure",
    href: "https://openreview.net/forum?id=5FcGoSA4WJ",
    imageSrc: "/papers/paper-stubborn-sycophantic.png",
    imageAlt: "First page of Stubborn or Sycophantic?",
    imageWidth: 1082,
    imageHeight: 1400,
    authors: [
      { name: "HanRui Zhang" },
      { name: "Ashton Chew", isCaiaMember: true },
      { name: "Ryan Soe" },
      { name: "Ahmed Taha" },
      { name: "Ruizhe Li" },
      { name: "Aditya Shah" },
      { name: "Maheep Chaudhary" },
    ],
    abstract:
      "Large language models often abandon a correct answer when a user pushes back, and system prompts that tell the model to stand firm are a popular, lightweight remedy. The usual evidence for such prompts—a lower answer-change rate—conflates two different behaviors: resisting a wrong suggestion and refusing a correct one. We evaluate four frozen system-prompt conditions, plus two Llama-only controls, under both kinds of feedback on the complete first-party SycoBench-600 protocol, decomposing behavior into Update (baseline-wrong answers corrected after a correct suggestion) and WrongFlip (baseline-correct answers lost after a wrong one) across 14 exact-scored model-condition cells on pinned revisions of Phi-3-mini, Llama-3.1-8B, and Mistral-7B (1,800 baselines per cell). The point estimates are mixed. On Llama, a 55-token compact prompt lowers WrongFlip by 53.7 points but also lowers Update by 46.0—mostly greater resistance to answer changes, not greater selectivity about which changes to make. On Phi, the same prompt raises selectivity (Update − WrongFlip) by 21.7 points, while on Mistral the long prompt lowers it by 22.7. No prompt improves correction selectivity on all three models. A separate frozen six-cell off-diagonal extension evaluates the three model-associated selected-long prompts on the other two targets, adding 10,800 baselines under the same protocol. The Mistral-associated prompt raises selectivity on Phi but produces global answer inertia on Llama; the Llama-associated prompt raises selectivity on Phi and lowers it on Mistral. An evaluation that counted only reversals would have scored several cells as successes; anti-sycophancy interventions should instead be judged under both correct and incorrect user suggestions on each target model.",
    tags: ["COLM 2026 Workshop on Efficient Reasoning"],
    shortTag: "COLM 2026 Workshop",
  },
  {
    title: "Math for AI safety: an invitation for mathematicians",
    href: "https://arxiv.org/abs/2609.15289",
    imageSrc: "/papers/paper-math-ai-safety.png",
    imageAlt: "First page of Math for AI safety",
    imageWidth: 1082,
    imageHeight: 1400,
    authors: [{ name: "Lionel Levine", isCaiaMember: true }],
    abstract:
      "Artificial intelligence threatens to outrun human understanding and control. New mathematics is needed to design AI that is legible, steerable, and cooperative with humanity. I organize this invitation by mathematical field, so you can turn straight to your own: logic and game theory for cooperation; probability for agency and world-models; algebra and representation theory for learned features; analysis and geometry for generalization and training dynamics. Each section ends with an open problem that is accessible to a working mathematician with no prior experience in AI safety.",
    tags: ["Survey preprint 2026"],
  },
  {
    title:
      "WARP: Measuring and Mitigating Evaluation Awareness in Browser-Agent Safety Benchmarks",
    href: "https://icml.cc/virtual/2026/76886",
    imageSrc: "/papers/paper-warp.png",
    imageAlt: "Cover image for WARP paper",
    imageWidth: 1700,
    imageHeight: 2200,
    authors: [
      { name: "Jasmine X Li", isCaiaMember: true },
      { name: "Ashton Chew", isCaiaMember: true },
      { name: "Maxwell Lin" },
      { name: "Eliot Jones" },
      { name: "Xiaohan Fu" },
      { name: "Andy Zou" },
    ],
    abstract:
      "Browser-agent safety benchmarks underwrite deployment safety claims, but only if model behavior under evaluation generalizes to deployment. We present the first cross-benchmark measurement of evaluation awareness in browser-agent indirect prompt-injection (IPI) benchmarks, across six frontier models and four published benchmarks (DoomArena, WASP, AgentDojo, InjecAgent; n=4,608 trajectories). When asked to classify trajectory purpose, models read over half of trajectories on every benchmark as evaluations, and three of four benchmarks elicit unprompted awareness verbalization. Awareness has a causal effect on reported attack-success rate (ASR): adding an explicit evaluation cue drops ASR by 10.9 pp on DoomArena, while a length-matched non-eval cue does not. A residual-stream probe on an open-weight model also separates attacked from safe trajectories at ≈2σ. Together, these results indicate that frontier models systematically distinguish IPI safety benchmarks from deployment, affecting reported ASR validity. Building upon this diagnosis, we release WARP (Wrapper-based, Adaptive, Realistic Pipeline), a benchmark-generation pipeline that builds challenging and realistic IPI evaluation tasks on top of any seedable synthetic browser environment. Instantiated as a 50-task benchmark on WebArena Verified, WARP attains 80.7% headline ASR across the same six models, substantially above raw DoomArena (22.3%) and WASP (27.0%) rates, while lowering eval-awareness rates relative to a no-rewrite baseline. We advocate routine reporting of awareness. Code, benchmark, and the awareness-measurement toolkit are released.",
    tags: ["ICML 2026 Workshop on Trustworthy AI for Good"],
    shortTag: "ICML 2026 Workshop",
  },
  {
    title:
      "Side Effects of Character Training: Quantifying Cross-Constitution Drift in LLMs",
    href: "https://icml.cc/virtual/2026/75634",
    imageSrc: "/papers/paper-cross-constitution.png",
    imageAlt: "Cover image for Side Effects of Character Training paper",
    imageWidth: 1700,
    imageHeight: 2200,
    authors: [
      { name: "Bhagyesh Kumar" },
      { name: "Ananya Sutradhar" },
      { name: "Saurav Panigrahi" },
      { name: "Jonathn Chang", isCaiaMember: true },
      { name: "Lionel Levine", isCaiaMember: true },
    ],
    abstract:
      "Character training is a key step in the post-training of industry-level large language models. Most character training pipelines utilize Constitutional AI in order to instill a set of traits or values into a language model, but the effectiveness of these pipelines is understudied. Additionally, fine-tuned language models have been shown to exhibit unintended side effects. We quantify these observations by employing EigenBench, a method for benchmarking language models’ values which has been shown to produce meaningful signal about prompted or fine-tuned models. Using EigenBench, we evaluate 11 character trains on 11 constitutions, finding that most character-trained models do indeed instill their intended values, but not without side effects. Furthermore, prompting models instead can produce different effects, and we explore how prompting on top of character-training can mitigate harmful behaviors. Finally, we study the evolution of a model’s character as it is progressively trained.",
    tags: ["ICML 2026 Workshop on Pluralistic Alignment"],
    shortTag: "ICML 2026 Workshop",
  },
  {
    title: "Measuring AI-Induced Disempowerment: A Framework and Proposed Metrics",
    href: "https://aclanthology.org/2026.evaleval-1.36/",
    imageSrc: "/papers/paper-disempowerment.png",
    imageAlt: "First page of Measuring AI-Induced Disempowerment",
    imageWidth: 990,
    imageHeight: 1400,
    authors: [
      { name: "Je Qin Chooi" },
      { name: "Jaeho Lee" },
      { name: "Jasmine Xinze Li", isCaiaMember: true },
    ],
    abstract:
      "AI systems are embedded in economic production, public discourse, governance, and personal decision-making, yet there is little empirical infrastructure for tracking whether this integration erodes humans’ ability to meaningfully shape outcomes that affect their lives. We argue that measuring AI-induced disempowerment is both urgent and tractable, and lay out a research agenda for doing so. We first operationalize disempowerment through Sen’s model of agency and a three-layer model of exposure, erosion, and lock-in, applied across economic, political, and cultural domains at individual, institutional, and civilizational scales. We survey existing measurement efforts and show that current work clusters almost entirely at exposure, leaving erosion and lock-in largely unaddressed. We then propose six concrete metrics (centaur evaluations, disempowerment perception surveys, AI content saturation and cultural convergence monitoring, monitoring capital flow to and from human labor, human task frontier tracking, and institutional ethnography) and identify which actors are best positioned to implement each. We close by discussing limitations and open challenges, including construct validity across levels of analysis, causal attribution, the distinction between disempowerment and adaptation, and the political economy of measurement.",
    tags: ["EvalEval 2026"],
  },
  {
    title:
      "Quantifying Theoretical AI Alignment Guarantees: Receiver-Utility Bounds in Bayesian Persuasion",
    href: "https://arxiv.org/abs/2606.22226",
    imageSrc: "/papers/paper-receiver-utility.png",
    imageAlt: "First page of Quantifying Theoretical AI Alignment Guarantees",
    imageWidth: 945,
    imageHeight: 1400,
    authors: [
      { name: "Eric Yachbes", isCaiaMember: true },
      { name: "Eva Tardos" },
    ],
    abstract:
      "Misalignment can change how information moves from an AI agent to a human user. We model this as an information advantage: the AI agent observes the world state, while the human receiver only knows a prior and must act after seeing the agent's signal. A strategic AI sender may withhold evidence or garble information in order to steer the human's decision. We ask how much useful information can still reach the human when the AI optimizes a misaligned objective. We study a Bayesian persuasion model in which the world state is a bit string, the human receiver wants to guess the bits correctly, and a single AI sender wants the receiver to guess as many bits as possible as 1. For a prior μ, let R₀(μ) be the receiver's utility from using only the prior, and let Rₘₐₓ(μ) be the largest receiver utility among signaling schemes that are optimal for the sender. We prove Rₘₐₓ(μ)/R₀(μ) ≤ 3/2. This bound improves for priors close to the independent product prior with the same marginals: if μ(x) ≥ (1 − η)π_μ(x) for every state x, then Rₘₐₓ(μ) ≤ R₀(μ) + ηn. We also give a six-bit prior for which Rₘₐₓ(μ)/R₀(μ) = 39/31 > 5/4, so no universal 5/4 bound is possible.",
    tags: ["EC 2026 Poster", "EC 2026 Incentive-Based AI Alignment Workshop Poster"],
    shortTag: "EC 2026 Poster",
  },
  {
    title:
      "PLOT: Progressive Localization via Optimal Transport in Neural Causal Abstraction",
    href: "https://arxiv.org/abs/2605.06979",
    imageSrc: "/papers/paper-plot.png",
    imageAlt: "Cover image for PLOT paper",
    imageWidth: 1700,
    imageHeight: 2200,
    authors: [
      { name: "Jonathn Chang", isCaiaMember: true },
      { name: "Arya Datla", isCaiaMember: true },
      { name: "Ziv Goldfeld" },
    ],
    abstract:
      "Causal abstraction offers a principled framework for mechanistic interpretability, aligning a high-level causal model with the low-level computation realized by a neural network through counterfactual intervention analysis. Existing methods such as distributed alignment search (DAS) learn expressive subspace interventions, but the relevant neural site is unknown a priori, so finding a handle requires a computationally burdensome search over candidate sites. We introduce PLOT (Progressive Localization via Optimal Transport), a transport-based framework that localizes causal variables from the output effect geometry of abstract and neural interventions. PLOT fits an optimal transport coupling between abstract variables and candidate neural sites, yielding a global soft correspondence that can be calibrated into intervention handles. In simple settings, a single coupling over individual neurons suffices. In larger models, PLOT is applied progressively, moving from coarse sites such as tokens, timesteps, or layers to finer supports such as coordinate groups or PCA spans, and optionally guiding DAS based on the localized signal. Across experiments of increasing complexity, transport-only PLOT handles are exceedingly fast and competitive on accuracy, while PLOT-guided DAS reaches DAS-level accuracy at a fraction of full DAS runtime, providing an efficient localization engine for causal abstraction research at scale.",
    tags: ["ICML 2026 Workshop on Mechanistic Interpretability"],
    shortTag: "ICML 2026 Workshop",
  },
  {
    title: "AI Epistemic Risks: Emerging Mechanisms & Evidence",
    href: "https://papers.ssrn.com/sol3/papers.cfm?abstract_id=6873005",
    summaryLabel: "Executive summary excerpt",
    imageSrc: "/papers/paper-epistemic-risks.png",
    imageAlt: "Cover image for AI Epistemic Risks paper",
    imageWidth: 1654,
    imageHeight: 2339,
    authors: [
      { name: "Jasmine Li", isCaiaMember: true },
      { name: "et al." },
    ],
    abstract:
      "Humanity's ability to know, reason, judge, and act well is the foundation of the institutions that enable scientific progress, democratic governance, crisis response, and the management of AI itself. This paper argues that AI advances pose serious risks to that foundation. We call these epistemic risks—threats to humanity's collective capacity to know things accurately, reason well, form beliefs, and maintain a healthy information environment. Epistemic risk is not misinformation by another name. It runs deeper: it arises from AI's integration into the very infrastructure through which we think, form beliefs, and make sense of the world together. Across fields including technical machine learning, AI safety, human-computer interaction, philosophy and ethics, cognitive neuroscience, and education, researchers are studying different fragments of a shared problem. This paper strives to connect those fragments, analyze how their harms amplify one another to pose systemic and potentially catastrophic risks, and help surface cross-cutting solutions that no single research community has yet found on its own.",
    tags: ["SSRN"],
  },
  {
    title: "Pluralistic Preference Alignment via Sortition-weighted RLHF",
    href: "https://icml.cc/virtual/2026/75691",
    imageSrc: "/papers/paper-dempo.png",
    imageAlt: "Cover image for Pluralistic Preference Alignment paper",
    imageWidth: 1700,
    imageHeight: 2200,
    authors: [
      { name: "Suvadip Sana", isCaiaMember: true },
      { name: "Jinzhou Wu", isCaiaMember: true },
      { name: "Martin T. Wells" },
    ],
    abstract:
      "Whose values should AI systems learn? Preference-based alignment methods like RLHF derive their training signal from human raters, yet these rater pools are typically convenience samples that systematically over-represent some demographics and under-represent others. We introduce Democratic Preference Optimization (DemPO), a framework that applies algorithmic sortition, the same mechanism used to construct citizen assemblies, to preference-based fine-tuning. DemPO offers two training schemes: Hard Panel, which trains exclusively on preferences from a quota-satisfying mini-public sampled via sortition, and Soft Panel, which retains all data but reweights each rater by their inclusion probability under the sortition lottery. We prove that Soft Panel weighting recovers the expected Hard Panel objective in closed form. Using a public preference dataset that pairs human judgments with rater demographics and a 75-clause constitution independently elicited from a representative U.S. panel, we evaluate Llama models (1B—8B) fine-tuned under each scheme. Across six aggregation methods, the Hard Panel consistently ranks first and the Soft Panel consistently outperforms the unweighted baseline, with effect sizes growing as model capacity increases. These results demonstrate that enforcing demographic representativeness at the preference-collection stage, rather than post-hoc correction, yields models whose behavior better reflects values elicited from representative publics.",
    tags: ["ICML 2026 Workshop on Pluralistic Alignment"],
    shortTag: "ICML 2026 Workshop",
  },
  {
    title: "AI Deception: Risks, Dynamics, and Controls",
    href: "https://arxiv.org/abs/2511.22619",
    imageSrc: "/papers/paper-deceptionsurvey.png",
    imageAlt: "Cover image for AI Deception paper",
    imageWidth: 1700,
    imageHeight: 2200,
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
      "As intelligence increases, so does its shadow. AI deception, in which systems induce false beliefs to secure self-beneficial outcomes, has evolved from a speculative concern to an empirically demonstrated risk across language models, AI agents, and emerging frontier systems. This project provides a comprehensive and up-to-date overview of the AI deception field, covering its core concepts, methodologies, genesis, and potential mitigations. First, we identify a formal definition of AI deception, grounded in signaling theory from studies of animal deception. We then review existing empirical studies and associated risks, highlighting deception as a sociotechnical safety challenge. We organize the landscape of AI deception research as a deception cycle, consisting of two key components: deception emergence and deception treatment. Deception emergence reveals the mechanisms underlying AI deception: systems with sufficient capability and incentive potential inevitably engage in deceptive behaviors when triggered by external conditions. Deception treatment, in turn, focuses on detecting and addressing such behaviors. On deception emergence, we analyze incentive foundations across three hierarchical levels and identify three essential capability preconditions required for deception. We further examine contextual triggers, including supervision gaps, distributional shifts, and environmental pressures. On deception treatment, we conclude detection methods covering benchmarks and evaluation protocols in static and interactive settings. Building on the three core factors of deception emergence, we outline potential mitigation strategies and propose auditing approaches that integrate technical, community, and governance efforts to address sociotechnical challenges and future AI risks. To support ongoing work in this area, we release a living resource at http://www.deceptionsurvey.com.",
    tags: ["Report", "Collaboration with Turing Award winner Andrew Yao"],
  },
  {
    title: "Early Results on Monitorability in QA Settings",
    href: "https://metr.org/notes/2025-10-06-early-results-on-monitorability-in-qa-settings/",
    summaryLabel: "Research summary",
    imageSrc: "/papers/preview-qa-monitorability.svg",
    imageAlt: "Illustration of a monitor inspecting visible reasoning and a hidden task branching from a question",
    imageWidth: 1128,
    imageHeight: 1340,
    authors: [
      { name: "Vincent Cheng", isCaiaMember: true },
      { name: "Thomas Kwa" },
      { name: "Neev Parikh" },
    ],
    abstract:
      "This research note studies agents that answer a main question while covertly solving a second task. In preliminary experiments, harder hidden tasks correlate with lower monitor evasion rates, and prompting choices substantially affect evasion. Early reinforcement learning results show that an eight-billion-parameter model can exploit weaknesses in a GPT-4o monitor. The authors caution that these strategies are not robust, difficulty estimates are noisy, and broader testing with stronger monitors is needed before drawing general conclusions.",
    tags: ["METR Research Note", "October 2025"],
  },
  {
    title: "EigenBench: A Comparative Behavior Measure of Value Alignment",
    href: "https://arxiv.org/pdf/2509.01938",
    imageSrc: "/papers/paper-eigenbench.png",
    imageAlt: "Cover image for EigenBench paper",
    imageWidth: 1700,
    imageHeight: 2200,
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
    title: "Claude, GPT, and Gemini All Struggle to Evade Monitors",
    href: "https://metr.org/notes/2025-08-22-claude-gpt-gemini-struggle-evade-monitors/",
    summaryLabel: "Research summary",
    imageSrc: "/papers/preview-monitor-evasion.svg",
    imageAlt: "Illustration of three model reasoning paths passing through a shared monitoring lens",
    imageWidth: 1128,
    imageHeight: 1340,
    authors: [
      { name: "Vincent Cheng", isCaiaMember: true },
      { name: "Thomas Kwa" },
    ],
    abstract:
      "This research note extends a Gemini monitoring study to Claude and GPT models on difficult science questions. Agents attempt to disguise the subject of their reasoning while preserving answer accuracy. Across the tested settings, evading monitors comes with substantial accuracy losses, and stronger monitors generally detect obfuscation more effectively. The study calibrates detection thresholds to account for false positives and provides an open-source replication. Its conclusions are limited by the artificial task, transferred attack prompts, and differences between prompted reasoning and dedicated reasoning traces.",
    tags: ["METR Research Note", "August 2025"],
  },
  {
    title: "ProgressGym: Alignment with a Millennium of Moral Progress",
    href: "https://arxiv.org/abs/2406.20087",
    imageSrc: "/papers/paper-progressgym.png",
    imageAlt: "Cover image for ProgressGym paper",
    imageWidth: 1046,
    imageHeight: 1356,
    authors: [
      { name: "Tianyi Qiu" },
      { name: "Yang Zhang" },
      { name: "Xuchuan Huang" },
      { name: "Jasmine Xinze Li", isCaiaMember: true },
      { name: "Jiaming Ji" },
      { name: "Yaodong Yang" },
    ],
    abstract:
      "Frontier AI systems, including large language models (LLMs), hold increasing influence over the epistemology of human users. Such influence can reinforce prevailing societal values, potentially contributing to the lock-in of misguided moral beliefs and, consequently, the perpetuation of problematic moral practices on a broad scale. We introduce progress alignment as a technical solution to mitigate this imminent risk. Progress alignment algorithms learn to emulate the mechanics of human moral progress, thereby addressing the susceptibility of existing alignment methods to contemporary moral blindspots. To empower research in progress alignment, we introduce ProgressGym, an experimental framework allowing the learning of moral progress mechanics from history, in order to facilitate future progress in real-world moral decisions. Leveraging 9 centuries of historical text and 18 historical LLMs, ProgressGym enables codification of real-world progress alignment challenges into concrete benchmarks. Specifically, we introduce three core challenges: tracking evolving values (PG-Follow), preemptively anticipating moral progress (PG-Predict), and regulating the feedback loop between human and AI value shifts (PG-Coevolve). Alignment methods without a temporal dimension are inapplicable to these tasks. In response, we present lifelong and extrapolative algorithms as baseline methods of progress alignment, and build an open leaderboard soliciting novel algorithms and challenges.",
    tags: ["NeurIPS 2024 Spotlight", "Benchmarks"],
  },
  {
    title:
      "Scaling laws for contrastive activation addition with refusal mechanisms",
    href: "https://arxiv.org/abs/2507.11771",
    imageSrc: "/papers/paper-scalinglaws.png",
    imageAlt: "Cover image for scaling laws paper",
    imageWidth: 1066,
    imageHeight: 1384,
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
  {
    title: "How to quantify the coherence of a set of beliefs",
    href: "https://arxiv.org/abs/2412.02777",
    imageSrc: "/papers/paper-belief-coherence.png",
    imageAlt: "First page of How to quantify the coherence of a set of beliefs",
    imageWidth: 1082,
    imageHeight: 1400,
    authors: [
      { name: "Rowan Hess" },
      { name: "Lionel Levine", isCaiaMember: true },
    ],
    abstract:
      "Given conflicting probability estimates for a set of events, how can we quantify how much they conflict? How can we find a single probability distribution that best encapsulates the given estimates? One approach is to minimize a loss function such as binary KL-divergence that quantifies the dissimilarity between the given estimates and the candidate probability distribution. Given a set of events, we characterize the facets of the polytope of coherent probability estimates about those events. We explore two applications of these ideas: eliciting the beliefs of large language models, and merging expert forecasts into a single coherent forecast.",
    tags: ["Preprint 2024"],
  },
  {
    title: "Do language models plan ahead for future tokens?",
    href: "https://arxiv.org/abs/2404.00859",
    imageSrc: "/papers/paper-plan-ahead.png",
    imageAlt: "First page of Do language models plan ahead for future tokens?",
    imageWidth: 1082,
    imageHeight: 1400,
    authors: [
      { name: "Wilson Wu" },
      { name: "John X. Morris" },
      { name: "Lionel Levine", isCaiaMember: true },
    ],
    abstract:
      "Do transformers \"think ahead\" during inference at a given position? It is known transformers prepare information in the hidden states of the forward pass at time step t that is then used in future forward passes t + τ. We posit two explanations for this phenomenon: pre-caching, in which off-diagonal gradient terms present during training result in the model computing features at t irrelevant to the present inference task but useful for the future, and breadcrumbs, in which features most relevant to time step t are already the same as those that would most benefit inference at time t + τ. We test these hypotheses by training language models without propagating gradients to past timesteps, a scheme we formalize as myopic training. In a constructed synthetic data setting, we find clear evidence for pre-caching. In the autoregressive language modeling setting, our experiments are more suggestive of the breadcrumbs hypothesis, though pre-caching increases with model scale.",
    tags: ["COLM 2024"],
  },
];
