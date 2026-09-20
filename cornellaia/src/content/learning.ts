import { RESOURCE_SECTIONS, type ResourceItem } from "./resources";
import curricula from "./curriculum-resources.json";
import { resourceKey } from "../lib/resource-url";

export const ONLINE_COURSES = [
  { title: "Technical AI Safety", provider: "BlueDot Impact", href: "https://bluedot.org/courses/technical-ai-safety", description: "A guided introduction to alignment, interpretability, evaluations, and control. A strong starting point for people with some technical background." },
  { title: "Frontier AI Governance", provider: "BlueDot Impact", href: "https://bluedot.org/courses/ai-governance", description: "Understand the evidence, institutions, and policy choices shaping advanced AI. For people approaching safety through governance, law, or public policy." },
  { title: "Biosecurity", provider: "BlueDot Impact", href: "https://bluedot.org/courses/biosecurity", description: "Explore pandemic prevention, preparedness, and the intersection of AI and biological risk. No biology background is assumed." },
];

export const INTENSIVES = [
  { title: "ARENA", href: "https://www.arena.education/", description: "develops practical research-engineering skills in deep learning, interpretability, reinforcement learning, and evaluations. Work through the notebooks independently or apply to a four-to-five-week cohort in London. Python and relevant mathematics are expected." },
  { title: "CAMBRIA", href: "https://www.cbai.ai/cambria", description: "is CBAI’s three-week AI safety bootcamp using ARENA materials, focused on interpretability and reinforcement learning. It has offered cohorts in Cambridge, Massachusetts, and New York City. Check CBAI for the next cohort and location." },
  { title: "Iliad Intensive", href: "https://www.iliad.ac/intensive", description: "is a four-week, full-time course on the mathematical foundations of AI alignment, including deep learning theory, agent foundations, and interpretability. It is aimed at people with strong mathematical backgrounds, with cohorts in London and Berkeley." },
];

export const FELLOWSHIP_GROUPS = [
  { title: "Technical safety & research", items: [
    { title: "MATS", href: "https://www.matsprogram.org/", note: "Mentored research in alignment, transparency, and security." },
    { title: "Anthropic Fellows", href: "https://alignment.anthropic.com/2025/anthropic-fellows-program-2026/", note: "A funded four-month program for empirical AI safety research with Anthropic mentorship." },
    { title: "CBAI AI Safety Research Fellowship", href: "https://www.cbai.ai/ais-research-fellowship", note: "Funded ten-week research in Cambridge, Massachusetts, across technical safety and governance. Undergraduates are encouraged to apply." },
    { title: "CHAI Research Internships", href: "https://humancompatible.ai/jobs/", note: "Paid, mentored research in human-compatible AI at UC Berkeley. Open to students and experienced technical applicants." },
    { title: "LASR Labs", href: "https://www.lasrlabs.org/", note: "Team-based technical AI safety research in London." },
    { title: "Astra Fellowship: Empirical Research", href: "https://constellation.org/programs/astra", note: "Funded, mentored research at Constellation on alignment, control, evaluations, and scalable oversight. Astra also offers a strategy and governance stream." },
    { title: "Iliad Fellowship", href: "https://www.iliad.ac/fellowship", note: "Three months of full-time, mentored mathematical AI alignment research for PhD-level researchers or equivalent experience." },
  ] },
  { title: "Policy, governance & law", items: [
    { title: "GovAI Fellowships", href: "https://www.governance.ai/opportunities", note: "Research and applied tracks in AI governance and policy." },
    { title: "GovAI Research Scholar", href: "https://www.governance.ai/post/research-scholar", note: "A paid twelve-month role for developing research or applied projects in AI governance." },
    { title: "IAPS Fellowship", href: "https://www.iaps.ai/fellowship", note: "AI policy and strategy projects with expert mentorship." },
    { title: "LawAI Fellowships", href: "https://law-ai.org/seasonal-fellowships/", note: "Research at the intersection of law and AI governance." },
    { title: "Horizon Fellowship", href: "https://horizonpublicservice.org/programs/become-a-fellow/", note: "Policy training and funded placements in Washington, DC, focused on AI and other emerging technologies." },
    { title: "RAND CAST Fellows", href: "https://www.rand.org/global-and-emerging-risks/centers/ai-security-and-technology/fellows.html", note: "Technology, security, and policy research at RAND." },
    { title: "Talos Fellowship", href: "https://www.talosnetwork.org/talos-fellowship", note: "A pathway into European AI policy careers." },
    { title: "Vista AI Law and Policy Fellowship", href: "https://vistainstituteai.org/", note: "Mentored AI law and policy research for students and recent graduates." },
    { title: "FAI Fellowships", href: "https://www.thefai.org/fellowships", note: "Policy training, including programs for conservative policy professionals." },
    { title: "TechCongress", href: "https://techcongress.io/", note: "Places early- and mid-career technologists in US congressional offices to work on technology policy." },
    { title: "Google Public Policy Fellowship", href: "https://www.google.com/policyfellowship/", note: "Student placements at public-interest technology policy organizations. AI-related projects depend on the host." },
    { title: "Aspen Science and Technology Policy Fellowship", href: "https://aspenpolicyacademy.org/program/science-and-technology-policy-fellowship/", note: "Policy training and an optional mentored project for US-based science and technology experts." },
    { title: "Tech Policy Press Fellowship", href: "https://www.techpolicy.press/fellowships/", note: "Editorial mentorship for reporting and analysis on technology and democracy, including AI governance." },
  ] },
  { title: "Generalists, founders & community building", items: [
    { title: "Generator Residency", href: "https://generatorresidency.org/", note: "Kairos and Constellation’s funded three-month residency in Berkeley for building AI safety programs, infrastructure, and organizations. Includes mentorship and support entering generalist roles." },
    { title: "MATS Founding and Field-Building", href: "https://www.matsprogram.org/tracks/founding-and-field-building", note: "A twelve-week track for founders, generalists, and organizers to launch AI safety initiatives with experienced mentors. Projects can become new organizations or help existing ones grow." },
    { title: "Astra Fellowship: Strategy and Governance", href: "https://constellation.org/programs/astra/strategy", note: "Funded work on AI strategy and governance, with mentorship and incubation support for new projects or organizations. Suited to independent thinkers with strong AI safety context." },
    { title: "Pathfinder Fellowship", href: "https://pathfinder.kairos-project.org/", note: "Kairos’s mentorship and activity funding for students running university AI safety or policy groups. Open to organizers worldwide, including those starting a new group." },
  ] },
  { title: "Cross-disciplinary & flexible pathways", items: [
    { title: "SPAR", href: "https://sparai.org/", note: "Part-time, remote projects in technical safety, policy, and biosecurity." },
    { title: "Pivotal Research Fellowship", href: "https://www.pivotal-research.org/fellowship", note: "Mentored work across AI safety and governance." },
    { title: "ERA Fellowship", href: "https://erafellowship.org/", note: "Research across technical safety, governance, and technical governance." },
    { title: "PIBBSS / Principles of Intelligence", href: "https://princint.ai/programs/fellowship/", note: "Interdisciplinary approaches to intelligence and alignment." },
    { title: "CAIS AI and Society Fellowship", href: "https://safe.ai/fellowship", note: "Funded research in San Francisco on AI’s economic, legal, geopolitical, and social impacts. For advanced researchers." },
    { title: "UChicago XLab Fellowship", href: "https://xrisk.uchicago.edu/srf-26/", note: "Summer research on AI safety and nuclear security for students and early-career researchers. See the latest cohort details." },
    { title: "Vitalik Buterin Fellowships", href: "https://futureoflife.org/our-work/grantmaking-work/fellowships/", note: "Support for doctoral and postdoctoral research in AI safety and governance." },
  ] },
];

export interface LibraryResource {
  title: string;
  href: string;
  note: string;
  topic: string;
  format: string;
  group?: string;
  section?: string;
  collection?: string;
  subtopic?: string;
  sources?: number[];
}

const additions: LibraryResource[] = [
  // Established resources reviewed across all library folders in September 2026.
  {"title": "Attention Is All You Need", "href": "https://arxiv.org/abs/1706.03762", "note": "Vaswani et al. (2017) introduce the Transformer, modeling sequences with attention instead of recurrence.", "topic": "ML fundamentals", "format": "Paper", "collection": "foundations", "subtopic": "ML fundamentals"},
  {"title": "Deep Learning", "href": "https://www.deeplearningbook.org/", "note": "Goodfellow, Bengio, and Courville (2016) cover the mathematical foundations, methods, and research directions of deep learning. Free to read online.", "topic": "ML fundamentals", "format": "Book", "collection": "foundations", "subtopic": "ML fundamentals"},
  {"title": "Reinforcement Learning: An Introduction", "href": "http://incompleteideas.net/book/the-book-2nd.html", "note": "Sutton and Barto (2018) explain value functions, temporal-difference learning, policy gradients, and exploration. Includes the full second edition and code.", "topic": "ML fundamentals", "format": "Book", "collection": "foundations", "subtopic": "ML fundamentals"},
  {"title": "AGI Safety from First Principles", "href": "https://www.lesswrong.com/s/mzgtmmTKKn5MuCzFJ", "note": "Richard Ngo (2020) develops an argument about advanced AI, agency, alignment, and control, making the underlying assumptions explicit.", "topic": "AI safety foundations", "format": "Collection", "collection": "foundations", "subtopic": "AI safety foundations"},
  {"title": "On the Dangers of Stochastic Parrots: Can Language Models Be Too Big?", "href": "https://faculty.washington.edu/ebender/stochasticparrots/", "note": "Bender et al. (2021) examine language-model training data, environmental costs, bias, and claims of understanding. The author’s page links the paper, talk, and audio version.", "topic": "Arguments & critiques", "format": "Paper", "collection": "foundations", "subtopic": "Arguments & critiques"},
  {"title": "Stanford CS229: Machine Learning Lecture Notes", "href": "https://cs229.stanford.edu/main_notes.pdf", "note": "Tengyu Ma and Andrew Ng’s public course notes cover supervised and unsupervised learning, generalization, deep learning, and reinforcement learning.", "topic": "Courses & curricula", "format": "Curriculum", "collection": "foundations", "subtopic": "Courses & curricula"},
  {"title": "Stanford CS224N: Natural Language Processing with Deep Learning", "href": "https://web.stanford.edu/class/cs224n/", "note": "Public slides, assignments, and earlier lecture recordings from Stanford’s course on neural networks, Transformers, and language models.", "topic": "Courses & curricula", "format": "Curriculum", "collection": "foundations", "subtopic": "Courses & curricula"},
  {"title": "An Investigation of the Therac-25 Accidents", "href": "https://web.mit.edu/6.033/2004/wwwdocs/papers/Therac_1.html", "note": "Leveson and Turner (1993) investigate radiation overdoses caused by interacting software, hardware, and organizational failures.", "topic": "Safety case studies", "format": "Paper", "collection": "foundations", "subtopic": "Safety case studies"},
  {"title": "AXRP: AI X-risk Research Podcast", "href": "https://axrp.net/", "note": "Daniel Filan interviews AI safety researchers about their work. Episodes include full transcripts and links to the research discussed.", "topic": "Podcasts", "format": "Podcast", "collection": "perspectives", "subtopic": "Podcasts"},
  {"title": "Alignment Newsletter Archive", "href": "https://rohinshah.com/alignment-newsletter/", "note": "Rohin Shah’s summaries and analysis of AI alignment research. On hiatus, but useful for tracing established ideas and debates.", "topic": "Newsletters & blogs", "format": "Newsletter / blog", "collection": "perspectives", "subtopic": "Newsletters & blogs"},
  {"title": "80,000 Hours Career Guide", "href": "https://80000hours.org/career-guide/", "note": "A practical guide to choosing impactful work, testing career options, and developing useful skills.", "topic": "Career paths", "format": "Collection", "collection": "careers", "subtopic": "Career paths"},
  {"title": "80,000 Hours Job Board", "href": "https://jobs.80000hours.org/", "note": "Curated roles in AI safety and other pressing problems, spanning research, policy, operations, and career development.", "topic": "Career paths", "format": "Collection", "collection": "careers", "subtopic": "Career paths"},
  {"title": "How to Read a Paper", "href": "https://cs.uwaterloo.ca/~brecht/courses/854-http-video-2012/readings/keshav-paper-reading.pdf", "note": "S. Keshav (2007) presents a three-pass method for reading research papers efficiently and building a literature review.", "topic": "Research practice", "format": "Paper", "collection": "careers", "subtopic": "Research practice"},
  {"title": "You and Your Research", "href": "https://www.cs.virginia.edu/~robins/YouAndYourResearch.html", "note": "Richard Hamming (1986) discusses choosing important problems, developing research habits, and communicating results.", "topic": "Research practice", "format": "Essay", "collection": "careers", "subtopic": "Research practice"},
  {"title": "\"Why Should I Trust You?\": Explaining the Predictions of Any Classifier", "href": "https://arxiv.org/abs/1602.04938", "note": "Ribeiro, Singh and Guestrin (2016) introduce LIME, which explains individual predictions by fitting simple models around nearby inputs.", "topic": "Interpretability", "format": "Paper", "collection": "technical", "subtopic": "Interpretability"},
  {"title": "A Unified Approach to Interpreting Model Predictions", "href": "https://papers.neurips.cc/paper_files/paper/2017/hash/8a20a8621978632d76c43dfd28b67767-Abstract.html", "note": "Lundberg and Lee (2017) introduce SHAP, a framework that assigns feature contributions to individual predictions using Shapley values.", "topic": "Interpretability", "format": "Paper", "collection": "technical", "subtopic": "Interpretability"},
  {"title": "TruthfulQA: Measuring How Models Mimic Human Falsehoods", "href": "https://aclanthology.org/2022.acl-long.229/", "note": "Lin, Hilton and Evans (2022) test whether language models repeat common misconceptions rather than answer questions truthfully.", "topic": "Evaluations & red teaming", "format": "Paper", "collection": "technical", "subtopic": "Evaluations & red teaming"},
  {"title": "Measuring Massive Multitask Language Understanding", "href": "https://arxiv.org/abs/2009.03300", "note": "Hendrycks and colleagues (2021) introduce MMLU, a benchmark covering 57 subjects that exposes gaps in model knowledge and problem solving.", "topic": "Evaluations & red teaming", "format": "Paper", "collection": "technical", "subtopic": "Evaluations & red teaming"},
  {"title": "Risks from Learned Optimization: Introduction", "href": "https://www.lesswrong.com/posts/FkgsxrGf3QxhfLWHG/risks-from-learned-optimization-introduction", "note": "Hubinger and colleagues (2019) introduce mesa-optimization and explain how learned optimizers can pursue objectives different from their training objective.", "topic": "Reward hacking & misalignment", "format": "Essay", "collection": "technical", "subtopic": "Reward hacking & misalignment"},
  {"title": "Cooperative Inverse Reinforcement Learning", "href": "https://proceedings.neurips.cc/paper/2016/hash/c3395dd46c34fa7fd8d729d8cf88b7a8-Abstract.html", "note": "Hadfield-Menell and colleagues (2016) formalize value alignment as cooperation in which an AI learns an initially unknown human reward function.", "topic": "Alignment & training", "format": "Paper", "collection": "technical", "subtopic": "Alignment & training"},
  {"title": "Learning to summarize from human feedback", "href": "https://arxiv.org/abs/2009.01325", "note": "Stiennon and colleagues (2020) train summarization models using human preference comparisons and show why learned rewards can outperform automatic text metrics.", "topic": "Alignment & training", "format": "Paper", "collection": "technical", "subtopic": "Alignment & training"},
  {"title": "Paul's research agenda FAQ", "href": "https://www.lesswrong.com/posts/Djs38EWYZG8o7JMWY/paul-s-research-agenda-faq", "note": "zhukeepa (2018) explains iterated amplification, informed oversight and corrigibility while spelling out unresolved assumptions in Paul Christiano’s alignment agenda.", "topic": "Scalable oversight", "format": "Essay", "collection": "technical", "subtopic": "Scalable oversight"},
  {"title": "Towards Making Systems Forget with Machine Unlearning", "href": "https://www.cs.columbia.edu/~junfeng/papers/unlearning/", "note": "Cao and Yang (2015) introduce machine unlearning methods that remove training data contributions without rebuilding a learning system from scratch.", "topic": "Unlearning", "format": "Paper", "collection": "technical", "subtopic": "Unlearning"},
  {"title": "Machine Unlearning", "href": "https://arxiv.org/abs/1912.03817", "note": "Bourtoule and colleagues (2021) introduce SISA training, which partitions training so that deleting data requires retraining only affected model components.", "topic": "Unlearning", "format": "Paper", "collection": "technical", "subtopic": "Unlearning"},
  {"title": "AI Governance: A Research Agenda", "href": "https://www.governance.ai/research-paper/agenda", "note": "Allan Dafoe (2018) maps the technical, political, and institutional questions involved in governing advanced AI.", "topic": "Policy foundations", "format": "Report", "collection": "governance", "subtopic": "Policy foundations"},
  {"title": "OECD AI Principles", "href": "https://oecd.ai/en/ai-principles", "note": "OECD (2019, updated 2024) sets principles for trustworthy AI and recommendations for public policy and international cooperation.", "topic": "Policy foundations", "format": "Report", "collection": "governance", "subtopic": "Policy foundations"},
  {"title": "Artificial Intelligence Risk Management Framework (AI RMF 1.0)", "href": "https://www.nist.gov/publications/artificial-intelligence-risk-management-framework-ai-rmf-10", "note": "Elham Tabassi and NIST (2023) organize AI risk management around governing, mapping, measuring, and managing risks.", "topic": "Regulation & standards", "format": "Report", "collection": "governance", "subtopic": "Regulation & standards"},
  {"title": "Guidelines for Secure AI System Development", "href": "https://www.ncsc.gov.uk/collection/guidelines-secure-ai-system-development", "note": "NCSC, CISA, and partner agencies (2023) outline security practices across AI design, development, deployment, and operation.", "topic": "Misuse & security", "format": "Report", "collection": "governance", "subtopic": "Misuse & security"},
  {"title": "Hiroshima Process International Code of Conduct for Organizations Developing Advanced AI Systems", "href": "https://digital-strategy.ec.europa.eu/en/library/hiroshima-process-international-code-conduct-advanced-ai-systems", "note": "G7 (2023) sets voluntary commitments for advanced AI developers on risk assessment, security, transparency, and incident reporting.", "topic": "Corporate governance", "format": "Report", "collection": "governance", "subtopic": "Corporate governance"},
  {"title": "The Bletchley Declaration by Countries Attending the AI Safety Summit, 1-2 November 2023", "href": "https://www.gov.uk/government/publications/ai-safety-summit-2023-the-bletchley-declaration/the-bletchley-declaration-by-countries-attending-the-ai-safety-summit-1-2-november-2023", "note": "AI Safety Summit participants (2023) establish a shared agenda for understanding frontier AI risks and coordinating international safety research.", "topic": "International coordination", "format": "Report", "collection": "governance", "subtopic": "International coordination"},
  {"title": "Governing AI for Humanity: Final Report", "href": "https://www.un.org/sites/un2.un.org/files/governing_ai_for_humanity_final_report_en.pdf", "note": "United Nations AI Advisory Body (2024) proposes international institutions to assess AI risks, coordinate governance, and share benefits.", "topic": "International coordination", "format": "Report", "collection": "governance", "subtopic": "International coordination"},
  {"title": "Dual Use of Artificial Intelligence-Powered Drug Discovery", "href": "https://pmc.ncbi.nlm.nih.gov/articles/PMC9544280/", "note": "Fabio Urbina, Filippa Lentzos, Cédric Invernizzi, and Sean Ekins (2022) demonstrate how drug discovery AI can be redirected toward harmful outcomes.", "topic": "Biosecurity", "format": "Paper", "collection": "governance", "subtopic": "Biosecurity"},
  {"title": "Global Guidance Framework for the Responsible Use of the Life Sciences: Mitigating Biorisks and Governing Dual-Use Research", "href": "https://www.who.int/publications/i/item/9789240056107", "note": "World Health Organization (2022) provides principles, responsibilities, and practical tools for managing biorisks and overseeing dual-use research.", "topic": "Biosecurity", "format": "Report", "collection": "governance", "subtopic": "Biosecurity"},
  {"title": "When Will AI Exceed Human Performance? Evidence from AI Experts", "href": "https://arxiv.org/abs/1705.08807", "note": "Katja Grace and colleagues (2018) report expert forecasts from 2016, providing a historical baseline for AI timelines and uncertainty.", "topic": "Timelines & scaling", "format": "Paper", "collection": "forecasting", "subtopic": "Timelines & scaling"},
  {"title": "Language Models are Few-Shot Learners", "href": "https://arxiv.org/abs/2005.14165", "note": "Tom Brown and colleagues (2020) show how scaling GPT-3 enables broad task performance from a few examples without task-specific training.", "topic": "Capabilities & scaling", "format": "Paper", "collection": "forecasting", "subtopic": "Capabilities & scaling"},
  {"title": "GPTs are GPTs: An Early Look at the Labor Market Impact Potential of Large Language Models", "href": "https://arxiv.org/abs/2303.10130", "note": "Tyna Eloundou, Sam Manning, Pamela Mishkin, and Daniel Rock (2023) estimate occupational exposure to LLM assistance without equating exposure with job loss.", "topic": "Economics & society", "format": "Paper", "collection": "forecasting", "subtopic": "Economics & society"},
  {"title": "Generative AI at Work", "href": "https://www.nber.org/papers/w31161", "note": "Erik Brynjolfsson, Danielle Li, and Lindsey Raymond (2023) study AI assistance in customer support and find productivity gains concentrated among less experienced workers.", "topic": "Economics & society", "format": "Paper", "collection": "forecasting", "subtopic": "Economics & society"},
  { title: "Verbalizable Representations Form a Global Workspace in Language Models", href: "https://arxiv.org/abs/2607.15495", note: "Gurnee et al. (2026): The Jacobian lens reveals J-space, representations that can expose unspoken reasoning and evaluation awareness.", topic: "Interpretability", format: "Paper" },
  { title: "Natural Language Autoencoders Produce Unsupervised Explanations of LLM Activations", href: "https://transformer-circuits.pub/2026/nla/", note: "Anthropic (2026): Translate model activations into readable text, then reconstruct the activations to train and evaluate the explanations.", topic: "Interpretability", format: "Paper" },
  { title: "Mechanistic Interpretability Should Prioritize Feature Consistency in Sparse Autoencoders", href: "https://aclanthology.org/2026.acl-long.99/", note: "Song et al. (ACL 2026): Measuring whether independently trained sparse autoencoders recover consistent features.", topic: "Interpretability", format: "Paper" },
  { title: "Building and Evaluating Alignment Auditing Agents", href: "https://alignment.anthropic.com/2025/automated-auditing/", note: "Anthropic (2025): Testing agents that investigate hidden model behaviors through automated alignment audits.", topic: "Evaluations", format: "Article" },
  { title: "Monitoring Monitorability", href: "https://arxiv.org/abs/2512.18311", note: "A study of chain-of-thought monitoring and how its effectiveness changes with training, reasoning effort, and model scale.", topic: "Control & oversight", format: "Paper" },
  { title: "Natural Emergent Misalignment from Reward Hacking in Production RL", href: "https://arxiv.org/abs/2511.18397", note: "Anthropic (2025): How reward hacking during reinforcement learning can generalize into broader misaligned behavior.", topic: "Alignment & failure modes", format: "Paper" },
  { title: "Salient Directions in AI Control", href: "https://www.lesswrong.com/posts/kitaRHhSzphdvqie2/salient-directions-in-ai-control", note: "Bruce W. Lee (2026): A research agenda covering monitors, environments, threat models, and the design of control evaluations.", topic: "Control & oversight", format: "Article" },
  { title: "Untrusted Advice for AI Control: Short, Strong Advice Significantly Uplifts Weak LLMs", href: "https://www.lesswrong.com/posts/jLkRCK35ri2btEHMF/untrusted-advice-for-ai-control-short-strong-advice", note: "Biddulph and Kaufman (2026): Experiments in which a trusted model acts on short hints from a stronger, untrusted advisor. Safety claims remain to be tested.", topic: "Control & oversight", format: "Article" },
  { title: "Concrete Problems in AI Safety", href: "https://arxiv.org/abs/1606.06565", note: "Amodei et al.: A foundational map of practical safety problems.", topic: "Foundations", format: "Paper" },
  { title: "Neural networks, visually explained", href: "https://www.3blue1brown.com/topics/neural-networks", note: "3Blue1Brown: Visual explanations of neural networks and transformers.", topic: "ML fundamentals", format: "Video" },
  { title: "ARENA curriculum", href: "https://learn.arena.education/", note: "Hands-on exercises in research engineering, interpretability, RL, and evaluations.", topic: "ML fundamentals", format: "Curriculum" },
  { title: "MIT AI Safety Fundamentals", href: "https://aialignment.mit.edu/aisf/", note: "MAIA: A structured curriculum spanning technical safety and governance.", topic: "Foundations", format: "Curriculum" },
  { title: "Toy Models of Superposition", href: "https://transformer-circuits.pub/2022/toy_model/index.html", note: "Elhage et al.: How neural networks represent more features than dimensions.", topic: "Interpretability", format: "Paper" },
  { title: "AI Control: Improving Safety Despite Intentional Subversion", href: "https://arxiv.org/abs/2312.06942", note: "Greenblatt et al.: Testing protocols that remain useful when a model may be misaligned.", topic: "Control & oversight", format: "Paper" },
  { title: "Weak-to-Strong Generalization", href: "https://arxiv.org/abs/2312.09390", note: "Burns et al.: Can weaker supervisors elicit stronger models’ capabilities?", topic: "Control & oversight", format: "Paper" },
  { title: "AI Safety via Debate", href: "https://arxiv.org/abs/1805.00899", note: "Irving et al.: Debate as a proposed approach to scalable supervision.", topic: "Control & oversight", format: "Paper" },
  { title: "Sleeper Agents", href: "https://arxiv.org/abs/2401.05566", note: "Hubinger et al.: Studying deceptive behavior that persists through safety training.", topic: "Alignment & failure modes", format: "Paper" },
  { title: "Alignment Faking in Large Language Models", href: "https://arxiv.org/abs/2412.14093", note: "Greenblatt et al.: Empirical evidence of strategic compliance in a training setting.", topic: "Alignment & failure modes", format: "Paper" },
  { title: "Computing Power and the Governance of Artificial Intelligence", href: "https://arxiv.org/abs/2402.08797", note: "Sastry et al.: Why compute matters for AI policy and oversight.", topic: "Governance & policy", format: "Paper" },
  { title: "AI 2027", href: "https://ai-2027.com/", note: "AI Futures Project: A scenario to examine critically, rather than a settled forecast.", topic: "Forecasting & society", format: "Essay" },
  { title: "Epoch AI research", href: "https://epoch.ai/", note: "Data and research on AI capabilities, compute, and development trends.", topic: "Forecasting & society", format: "Collection" },
  { title: "Biosecurity course curriculum", href: "https://bluedot.org/courses/biosecurity", note: "BlueDot Impact: Pandemic preparedness and the intersection of AI and biological risk.", topic: "Biosecurity", format: "Curriculum" },
  { title: "Emerging Tech Policy career resources", href: "https://emergingtechpolicy.org/", note: "Horizon Institute: Guides to policy institutions, roles, and career pathways.", topic: "Careers", format: "Collection" },
];

const topicForGroup: Record<string, string> = {
  "Mechanistic Interpretability": "Interpretability",
  "Eliciting Latent Knowledge and Hallucinations": "Interpretability",
  "AI Evaluations and Standards": "Evaluations",
  "Goal Misgeneralization and Specification Gaming": "Alignment & failure modes",
  "Emergent Abilities": "Forecasting & society",
  "Structural Risk": "Forecasting & society",
};

// Preserve the original collection while replacing indirect curriculum links with primary sources.
const directLinks: Record<string, string> = {
  "Anthropic Transformer Circuits Thread": "https://transformer-circuits.pub/",
  "Indirect Object Identification (IOI) in GPT-2 Small": "https://arxiv.org/abs/2211.00593",
  "Concrete Steps to Getting Started": "https://www.neelnanda.io/mechanistic-interpretability/getting-started",
  "Annotated list of favorite papers": "https://www.neelnanda.io/mechanistic-interpretability/favourite-papers",
  "200 Open Problems in Mechanistic Interpretability": "https://www.alignmentforum.org/s/yivyHaCAmMJ3CqSyj",
};

function flatten(items: ResourceItem[], topic: string, group: string, section: string): LibraryResource[] {
  return items.flatMap(item => {
    const href = directLinks[item.title] ?? item.href;
    const format = group === "Podcasts" ? "Podcast" : group === "Newsletters and Blogs" ? "Newsletter / blog" : href?.includes("youtube.com") ? "Video" : href && /arxiv.org|papers.ssrn.com|\.pdf($|\?)/.test(href) ? "Paper" : "Article";
    return [
      ...(href ? [{ title: item.title, href, note: item.note ?? group, topic, format, group, section }] : []),
      ...flatten(item.children ?? [], topic, group, section),
    ];
  });
}

const existing = RESOURCE_SECTIONS.filter(s => s.id !== "fellowships").flatMap(section => section.groups.flatMap(group => flatten(group.items, topicForGroup[group.title] ?? (section.id === "policy" ? "Governance & policy" : section.id === "newsletters" ? "News & commentary" : "Foundations"), group.title, section.id)));

const library = new Map<string, LibraryResource>();
for (const item of [...additions, ...existing, ...curricula] as LibraryResource[]) {
  const key = resourceKey(item.href);
  const previous = library.get(key);
  library.set(key, previous ? {
    ...previous,
    ...item,
    // Retain useful descriptions from the original collection alongside imported titles and folders.
    note: previous.note || item.note,
    sources: [...new Set([...(previous.sources ?? []), ...(item.sources ?? [])])].sort((a, b) => a - b),
  } : item);
}

export const LIBRARY_RESOURCES = [...library.values()].sort((a, b) => a.title.localeCompare(b.title));
