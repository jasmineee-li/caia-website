import type { Metadata } from "next";
import Badge from "@/components/ui/Badge";
import { SITE_URL } from "@/content/seo";

interface MaterialItem {
  label: string;
  href?: string;
}

interface WeekMaterials {
  slide: MaterialItem[];
  recommendedReading: MaterialItem[];
  demo: MaterialItem[];
  takeHomeNotebook: MaterialItem[];
}

interface CourseWeek {
  number: number;
  description: string;
  topics: string[];
  materials: WeekMaterials;
}

const COURSE_PATH = "/programs/cs1998";
const COURSE_URL = new URL(COURSE_PATH, SITE_URL).toString();

const COURSE_WEEKS: CourseWeek[] = [
  {
    number: 1,
    description: "Motivation & The Training Pipeline",
    topics: [
      "Motivation for AI safety: examples of specification gaming, toxicity, orthogonality thesis, and why safety is not guaranteed by default.",
      "Transformer architecture: residual stream, multi-head attention, and MLP layers.",
      "GPT-2 architecture: decoder-only specifics.",
      "Training pipeline: pretraining, supervised fine-tuning (SFT), and RLHF.",
      "Pretraining objective and web-scale datasets such as CommonCrawl.",
      "How generation works: temperature and top-k sampling.",
    ],
    materials: {
      slide: [{ label: "Slides (TBD)" }],
      recommendedReading: [
        { label: "Attention Is All You Need (Vaswani et al., 2017)", href: "https://arxiv.org/abs/1706.03762" },
        {
          label: "Language Models are Few-Shot Learners (Brown et al., 2020)",
          href: "https://arxiv.org/abs/2005.14165",
        },
      ],
      demo: [
        { label: "LLM visualization and forward pass walkthrough", href: "https://bbycroft.net/llm" },
        { label: "Visualize a Logit Lens view of hidden states during generation." },
      ],
      takeHomeNotebook: [
        { label: "NanoGPT playground", href: "https://github.com/karpathy/nanoGPT" },
        { label: "Implement raw sampling (temperature and top-k) and inspect output distributions." },
      ],
    },
  },
  {
    number: 2,
    description: "Mech Interp I: Causal Tracing",
    topics: [
      "Mechanistic interpretability as reverse engineering.",
      "Residual stream as the model communication channel.",
      "Attention heads and information flow between token positions.",
      "Induction heads and in-context pattern copying.",
      "Activation patching (causal tracing) to identify causally important components.",
    ],
    materials: {
      slide: [{ label: "Slides (TBD)" }],
      recommendedReading: [
        {
          label: "In-context Learning and Induction Heads (Olsson et al., 2022)",
          href: "https://arxiv.org/abs/2209.11895",
        },
        {
          label: "Interpretability in the Wild (Wang et al., 2022)",
          href: "https://arxiv.org/abs/2211.00593",
        },
      ],
      demo: [
        {
          label:
            "Patch clean activations into a corrupted Eiffel Tower prompt to locate which layer restores \"Paris\".",
        },
      ],
      takeHomeNotebook: [{ label: "TBD" }],
    },
  },
  {
    number: 3,
    description: "Mech Interp II: Understanding the Black Box",
    topics: [
      "Linear probes for concept detection in internal states.",
      "Persona vectors for traits like honesty, deception, and sycophancy.",
      "Activation steering to control model behavior.",
      "Superposition and feature packing.",
      "Sparse autoencoders (SAEs) for disentangling representations.",
    ],
    materials: {
      slide: [{ label: "Slides (TBD)" }],
      recommendedReading: [
        {
          label: "Representation Engineering: A Top-Down Approach to AI Transparency (Zou et al., 2023)",
          href: "https://arxiv.org/abs/2310.01405",
        },
        {
          label: "Golden Gate Claude (Anthropic, 2024)",
          href: "https://www.anthropic.com/research/golden-gate-claude",
        },
        {
          label: "The Internal State of an LLM Knows When It's Lying (Azaria & Mitchell, 2023)",
          href: "https://arxiv.org/abs/2304.13734",
        },
      ],
      demo: [{ label: "Steering the direction of non-corrigibility (Jinzhou's project)." }],
      takeHomeNotebook: [
        { label: "Building a lie detector probe.ipynb" },
        { label: "Replicate lie/hallucination detection from internal activations." },
      ],
    },
  },
  {
    number: 4,
    description: "RL, RLHF, and Goal Misgeneralization",
    topics: [
      "RL basics: policy, reward, and value functions.",
      "RLHF pipeline: preference data collection, reward modeling, PPO/DPO optimization.",
      "Reward hacking and Goodhart's law.",
      "Goal misgeneralization in competent-but-misaligned agents.",
      "Sycophancy as reward hacking toward user approval.",
    ],
    materials: {
      slide: [{ label: "Slides (TBD)" }],
      recommendedReading: [
        {
          label: "Deep Reinforcement Learning from Human Preferences (Christiano et al., 2017)",
          href: "https://arxiv.org/abs/1706.03741",
        },
        {
          label: "Scaling Laws for Reward Model Overoptimization (Gao et al., 2022)",
          href: "https://arxiv.org/abs/2210.10760",
        },
      ],
      demo: [{ label: "Live DPO run with TRL on safe/toxic preference pairs." }],
      takeHomeNotebook: [{ label: "TBD" }],
    },
  },
  {
    number: 5,
    description: "Evals & Red Teaming",
    topics: [
      "Capability and safety benchmarks.",
      "Manual and automated red teaming.",
      "Jailbreak techniques and refusal bypass patterns.",
      "Adversarial suffix attacks and prompt injection.",
      "Model organisms and controlled dangerous-trait studies.",
    ],
    materials: {
      slide: [{ label: "Slides (TBD)" }],
      recommendedReading: [
        {
          label: "Universal and Transferable Adversarial Attacks on Aligned Language Models (Zou et al., 2023)",
          href: "https://arxiv.org/abs/2307.15043",
        },
        {
          label: "Sleeper Agents (Hubinger et al., 2024)",
          href: "https://arxiv.org/abs/2401.05566",
        },
      ],
      demo: [{ label: "Automated jailbreaking demo with GCG." }],
      takeHomeNotebook: [{ label: "Jailbreaking CTF: extract a hidden key from a black-box API." }],
    },
  },
  {
    number: 6,
    description: "Control & Scalable Oversight",
    topics: [
      "Scalable oversight for systems beyond human evaluator capability.",
      "Weak-to-strong generalization.",
      "AI control: monitoring and containment methods.",
      "Anomaly detection over model internals.",
      "AI safety via debate.",
    ],
    materials: {
      slide: [{ label: "Slides (TBD)" }],
      recommendedReading: [
        {
          label: "Weak-to-Strong Generalization (Burns et al., 2023)",
          href: "https://arxiv.org/abs/2312.09390",
        },
        {
          label: "AI Safety via Debate (Irving et al., 2018)",
          href: "https://arxiv.org/abs/1805.00899",
        },
      ],
      demo: [{ label: "TBD" }],
      takeHomeNotebook: [{ label: "TBD" }],
    },
  },
  {
    number: 7,
    description: "Policy, Trajectory & Careers",
    topics: [
      "Scaling laws and trajectory forecasting.",
      "Compute governance and frontier compute monitoring.",
      "Current research directions in AI safety.",
      "Technical and governance career paths.",
      "Research proposal synthesis.",
    ],
    materials: {
      slide: [{ label: "Slides (TBD)" }],
      recommendedReading: [
        {
          label: "Scaling Laws for Neural Language Models (Kaplan et al., 2020)",
          href: "https://arxiv.org/abs/2001.08361",
        },
        { label: "Epoch AI Compute Trends", href: "https://epoch.ai/trends" },
      ],
      demo: [{ label: "TBD" }],
      takeHomeNotebook: [
        { label: "Research proposal: hypothesis, method, and expected result from Weeks 2-6 topics." },
      ],
    },
  },
];

const COURSE_DESCRIPTION =
  "CS 1998 is a planned student-led, technically focused introduction to AI Safety and Alignment at Cornell for Fall 2026.";

const COURSE_OG_DESCRIPTION =
  "Planning-stage CS 1998 at Cornell: a 1-credit, 7-week S/U course on AI Safety and Alignment with paper readings, demos, and notebooks.";

const COURSE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Course",
  name: "CS 1998: Intro to AI Safety & Alignment",
  description: COURSE_DESCRIPTION,
  url: COURSE_URL,
  courseCode: "CS 1998",
  educationalCredentialAwarded: "1 credit (S/U)",
  provider: {
    "@type": "CollegeOrUniversity",
    name: "Cornell University",
    url: "https://www.cornell.edu/",
  },
  teaches: [
    "AI safety and alignment fundamentals",
    "Mechanistic interpretability",
    "RLHF and goal misgeneralization",
    "Red teaming and safety evaluations",
    "Scalable oversight and AI governance",
  ],
  timeRequired: "P7W",
  inLanguage: "en",
};

export const metadata: Metadata = {
  title: "CS 1998: Intro to AI Safety & Alignment",
  description: COURSE_DESCRIPTION,
  keywords: ["CS 1998", "AI Safety course", "AI Alignment course", "Cornell student-led course", "Fall 2026"],
  alternates: {
    canonical: COURSE_PATH,
  },
  openGraph: {
    title: "CS 1998: Intro to AI Safety & Alignment (Fall 2026, tentative)",
    description: COURSE_OG_DESCRIPTION,
    url: COURSE_PATH,
    siteName: "Cornell AI Alignment",
    type: "website",
    images: [
      {
        url: "/Title5.webp",
        alt: "CS 1998: Intro to AI Safety & Alignment",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CS 1998: Intro to AI Safety & Alignment",
    description: COURSE_OG_DESCRIPTION,
    images: ["/Title5.webp"],
  },
};

function MaterialList({ items }: { items: MaterialItem[] }) {
  return (
    <div className="space-y-1.5 text-sm leading-6 text-slate-700">
      {items.map((item) => (
        <p key={item.label}>
          {item.href ? (
            <a
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-brand-red underline decoration-brand-red/35 underline-offset-4 hover:text-brand-red-strong"
            >
              {item.label}
            </a>
          ) : (
            item.label
          )}
        </p>
      ))}
    </div>
  );
}

function WeekMaterialsView({ materials }: { materials: WeekMaterials }) {
  return (
    <div className="space-y-3">
      <div>
        <p className="mb-1 text-sm font-bold text-slate-900">Slide</p>
        <MaterialList items={materials.slide} />
      </div>
      <div>
        <p className="mb-1 text-sm font-bold text-slate-900">Recommended Reading</p>
        <MaterialList items={materials.recommendedReading} />
      </div>
      <div>
        <p className="mb-1 text-sm font-bold text-slate-900">Demo</p>
        <MaterialList items={materials.demo} />
      </div>
      <div>
        <p className="mb-1 text-sm font-bold text-slate-900">Take-Home Notebook</p>
        <MaterialList items={materials.takeHomeNotebook} />
      </div>
    </div>
  );
}

export default function CS1998Page() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(COURSE_SCHEMA) }}
      />
      <div className="mx-auto w-full max-w-page px-4 pb-20 pt-10 sm:px-6 sm:pt-14 lg:px-8">
        <header className="relative overflow-hidden rounded-[1.9rem] border border-brand-red/20 bg-[linear-gradient(145deg,#fff5f5_0%,#ffffff_45%,#f8fafc_100%)] px-6 py-7 sm:px-10 sm:py-10">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-20 -top-20 h-52 w-52 rounded-full bg-brand-red/10 blur-3xl"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-12 left-1/3 h-44 w-44 rounded-full bg-cyan-100/60 blur-3xl"
          />

          <div className="relative space-y-5">
            <Badge>Planning Stage (Fall 2026, tentative)</Badge>
            <h1 className="display-title max-w-4xl text-3xl sm:text-5xl">CS 1998: Intro to AI Safety &amp; Alignment</h1>
            <p className="max-w-3xl text-base leading-7 text-slate-700 sm:text-lg">
              1 Credit · 7 Weeks First · S/U Grading · Open Enrollment
            </p>
            <nav aria-label="CS 1998 sections" className="flex flex-wrap gap-2 pt-1">
              <a
                href="#content"
                className="focus-ring rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-brand-red hover:text-brand-red"
              >
                Content
              </a>
              <a
                href="#logistics"
                className="focus-ring rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-brand-red hover:text-brand-red"
              >
                Logistics
              </a>
              <a
                href="#syllabus"
                className="focus-ring rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-brand-red hover:text-brand-red"
              >
                Syllabus
              </a>
            </nav>
          </div>
        </header>

        <section id="content" className="mt-10 scroll-mt-28">
          <div className="grid gap-6 lg:grid-cols-12">
            <article className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 lg:col-span-7">
              <h2 className="display-title text-2xl sm:text-3xl">Content</h2>
              <h3 className="mt-4 text-xl font-semibold text-slate-900">What is this course about?</h3>
              <div className="mt-3 space-y-4 text-sm leading-7 text-slate-700 sm:text-base">
                <p>
                  CS 1998 is a planned student-led introduction to AI safety and alignment. The course
                  introduces how modern language models are trained and deployed, then examines how and
                  why failures emerge in real systems. Students will learn core technical ideas in
                  mechanistic interpretability, reward learning, red teaming, and oversight.
                </p>
                <p>
                  The course is designed to be practical and research-oriented. Each week combines
                  conceptual lectures, paper reading, live demos, and applied notebooks so students can
                  build and test alignment ideas directly.
                </p>
              </div>
            </article>

            <div className="space-y-6 lg:col-span-5">
              <article className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-7">
                <h3 className="text-xl font-semibold text-slate-900">Prerequisites</h3>
                <p className="mt-3 text-sm leading-7 text-slate-700 sm:text-base">
                  This course will be technically focused so some prior knowledge about linear algebra,
                  machine learning (such as the transformer architecture), and proficiency in Python are
                  assumed. However, we will also spend a lot of time talking about intuition behind
                  these ideas, so non-technical people are also welcome to take the course.
                </p>
              </article>

              <article className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-7">
                <h3 className="text-xl font-semibold text-slate-900">Audience</h3>
                <p className="mt-3 text-sm leading-7 text-slate-700 sm:text-base">
                  The course is intended for Cornell undergraduates and graduate students interested in
                  AI safety and alignment, including students pursuing technical research, policy, and
                  governance pathways.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section id="logistics" className="mt-10 scroll-mt-28">
          <article className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
            <h2 className="display-title text-2xl sm:text-3xl">Logistics</h2>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-7 text-slate-700 sm:text-base">
              <li>We are still in the planning stage for Fall 2026.</li>
              <li>This is planned as a 1-credit, 7-week, first S/U course.</li>
              <li>Open enrollment; we are planning around 75 seats.</li>
              <li>The syllabus below is tentative and may change as planning progresses.</li>
            </ul>
          </article>
        </section>

        <section id="syllabus" className="mt-10 scroll-mt-28">
          <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
            <div className="px-6 pt-6 sm:px-8 sm:pt-8">
              <h2 className="display-title text-2xl sm:text-3xl">Syllabus (Tentative)</h2>
            </div>

            <div className="mt-6 space-y-4 px-6 pb-6 sm:px-8 lg:hidden">
              {COURSE_WEEKS.map((week) => (
                <details
                  key={`mobile-week-${week.number}`}
                  className="group overflow-hidden rounded-xl border border-slate-200 bg-slate-50"
                >
                  <summary className="focus-ring flex cursor-pointer list-none items-center justify-between gap-3 px-4 py-4">
                    <div>
                      <p className="text-sm font-semibold text-slate-600">Week {week.number}</p>
                      <p className="text-base font-semibold text-slate-900">{week.description}</p>
                    </div>
                    <span className="text-xl leading-none text-slate-500 transition-transform group-open:rotate-45">+</span>
                  </summary>
                  <div className="space-y-4 border-t border-slate-200 bg-white px-4 py-4">
                    <div>
                      <p className="mb-1 text-sm font-bold text-slate-900">Topics</p>
                      <ul className="list-disc space-y-1.5 pl-5 text-sm leading-6 text-slate-700">
                        {week.topics.map((topic) => (
                          <li key={`mobile-topic-${week.number}-${topic}`}>{topic}</li>
                        ))}
                      </ul>
                    </div>
                    <WeekMaterialsView materials={week.materials} />
                  </div>
                </details>
              ))}
            </div>

            <div className="mt-6 hidden overflow-x-auto lg:block">
              <table className="min-w-[1120px] w-full border-collapse">
                <thead>
                  <tr className="bg-slate-100 text-left">
                    <th className="px-4 py-3 text-sm font-semibold text-slate-900">Week</th>
                    <th className="px-4 py-3 text-sm font-semibold text-slate-900">Description</th>
                    <th className="px-4 py-3 text-sm font-semibold text-slate-900">Topics</th>
                    <th className="px-4 py-3 text-sm font-semibold text-slate-900">Materials</th>
                  </tr>
                </thead>
                <tbody>
                  {COURSE_WEEKS.map((week, index) => (
                    <tr
                      key={week.number}
                      className={index % 2 === 0 ? "align-top border-b border-slate-200 bg-white" : "align-top border-b border-slate-200 bg-slate-50/70"}
                    >
                      <td className="px-4 py-4 align-top text-sm font-semibold text-slate-700">{week.number}</td>
                      <td className="px-4 py-4 text-sm font-semibold text-slate-900">{week.description}</td>
                      <td className="px-4 py-4">
                        <ul className="list-disc space-y-1.5 pl-5 text-sm leading-6 text-slate-700">
                          {week.topics.map((topic) => (
                            <li key={`${week.number}-${topic}`}>{topic}</li>
                          ))}
                        </ul>
                      </td>
                      <td className="px-4 py-4">
                        <WeekMaterialsView materials={week.materials} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </article>
        </section>
      </div>
    </main>
  );
}
