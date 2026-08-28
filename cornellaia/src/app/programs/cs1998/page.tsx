import type { Metadata } from "next";
import ProfileCard from "@/components/ProfileCard";
import Badge from "@/components/ui/Badge";
import Squares from "@/components/ui/Squares";
import { SITE_URL } from "@/content/seo";
import styles from "./cs1998.module.css";

interface MaterialItem {
  label: string;
  href?: string;
}

interface WeekMaterials {
  slide: MaterialItem[];
  discussionReading: MaterialItem[];
  furtherReading: MaterialItem[];
}

interface CourseWeek {
  number: number;
  description: string;
  topics: string[];
  materials: WeekMaterials;
}

interface CourseStaffMember {
  name: string;
  role: string;
  imageSrc: string;
}

const COURSE_PATH = "/programs/cs1998";
const COURSE_URL = new URL(COURSE_PATH, SITE_URL).toString();
const COURSE_CALENDAR_EMBED_URL =
  "https://calendar.google.com/calendar/embed?height=600&wkst=2&ctz=America%2FNew_York&showPrint=0&mode=WEEK&title=CS%201998%20Course%20Calendar&src=ancyNzgyQGNvcm5lbGwuZWR1&src=Y182NjBjN2M3NTg0MTk0MWM5ZDBhY2IzYjI4M2Y3N2Q2OThhODU3YTk4ZjcxNzE4ZWI3NGYzNjY3ZTEwYmZmYWE0QGdyb3VwLmNhbGVuZGFyLmdvb2dsZS5jb20&src=Y18wYzFkY2I4NGM2MTA0NDBiYTcwZGMzNDRiZWEwOGQ4NzQ4NDE5NjI1YzUwMjE1ZGNjMmQyMTk3MjE2ZGIyMmU1QGdyb3VwLmNhbGVuZGFyLmdvb2dsZS5jb20&src=Y18yY2RlODQyMjc2M2Y2YTUyMDlmODNmMDVlZGNiNTNjY2M5NjE1MDk4ODNhMzNkYmM2YWVmOGI1MDdjYmVlOGMxQGdyb3VwLmNhbGVuZGFyLmdvb2dsZS5jb20&src=Y18wNzViODZmOWQxZDk3M2JjZjBkNDZlMzAxZDIzY2Q0NjQxMTdlOGFhZmQ5ZjBhYTdiZmY3ZTIwNTZhMTQwYmFjQGdyb3VwLmNhbGVuZGFyLmdvb2dsZS5jb20&src=Y19mMmMxZWVkNDZmZTU5MGIyZDM1MzBiMmMxMTM4NGNlODU3YzZiZGZiY2YzNmZkOWQ0NGNiZjhiMDFlYmM1ZmU0QGdyb3VwLmNhbGVuZGFyLmdvb2dsZS5jb20&src=Y18xZmM2NzM4ZGYxODJkZDk5MDIxMGI1YmQxNTg3NDcxZjBiMzNmYjFlZTIxYTM4NTBlZWEyM2Y4ZmYwM2U4OGNmQGdyb3VwLmNhbGVuZGFyLmdvb2dsZS5jb20&src=Y185OTJiMWNmMTg0ZTE3NzAzNjNhNjVjMmMwMzZhZDQyZjllNWI0YWYxZWM2NDgyY2E4MjAwMTNmMDQ1YzY5NGVhQGdyb3VwLmNhbGVuZGFyLmdvb2dsZS5jb20&src=Y180MGRhZTU3ZDNlZWFlMzA3ODUwYzkzNDI2MWZmMmJiYzdhY2E1NjNkM2M2ZGNiOTcyNGE0MmE1MmNlNTQ3ZmIzQGdyb3VwLmNhbGVuZGFyLmdvb2dsZS5jb20&color=%23039be5&color=%23d50000&color=%234285f4&color=%23f6bf26&color=%233f51b5&color=%238e24aa&color=%23d50000&color=%23d81b60&color=%23c0ca33";

const COURSE_WEEKS: CourseWeek[] = [
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
          label: "Current AIs seem pretty misaligned to me (Greenblatt, 2026)",
          href: "https://www.lesswrong.com/posts/WewsByywWNhX9rtwi/current-ais-seem-pretty-misaligned-to-me",
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
      slide: [{ label: "Slides (TBD)" }],
      discussionReading: [
        {
          label:
            "Open Problems and Fundamental Limitations of Reinforcement Learning from Human Feedback — selected sections (Casper et al., 2023)",
          href: "https://arxiv.org/abs/2307.15217",
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
      slide: [{ label: "Slides (TBD)" }],
      discussionReading: [
        {
          label:
            "Sycophancy to Subterfuge: Investigating Reward-Tampering in Large Language Models (Denison et al., 2024)",
          href: "https://arxiv.org/abs/2406.10162",
        },
      ],
      furtherReading: [
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
        {
          label:
            "Emergent Misalignment: Narrow Finetuning Can Produce Broadly Misaligned LLMs (Betley et al., 2025)",
          href: "https://arxiv.org/abs/2502.17424",
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
      slide: [{ label: "Slides (TBD)" }],
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
    description: "Evaluations—Evaluating Dangerous Capabilities",
    topics: [
      "Threat modeling and capability elicitation before benchmark design.",
      "Evaluations for cyber, biological, persuasion, deception, autonomy, and self-proliferation capabilities.",
      "Construct validity, contamination, sandbagging, and evaluation awareness.",
      "Manual red teaming, automated red teaming, and scalable evaluation pipelines.",
      "Using evaluation evidence to inform deployment safeguards and safety cases.",
    ],
    materials: {
      slide: [{ label: "Slides (TBD)" }],
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
      slide: [{ label: "Slides (TBD)" }],
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
      slide: [{ label: "Slides (TBD)" }],
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
];

const COURSE_STAFF: CourseStaffMember[] = [
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
    imageSrc: "/team/TEAM_jasmine_li.png",
  },
  {
    name: "Jonathn Chang",
    role: "Advisor",
    imageSrc: "/team/TEAM_jonathn_chang.png",
  },
  {
    name: "Suvadip Sana",
    role: "Advisor",
    imageSrc: "/team/TEAM_suvadip_sana.png",
  },
  {
    name: "Éva Tardos",
    role: "Faculty Advisor",
    imageSrc: "/team/TEAM_eva_tardos.jpg",
  },
];

const COURSE_DESCRIPTION =
  "CS 1998 is a student-led, technically focused introduction to AI Safety and Alignment at Cornell for Fall 2026.";

const COURSE_OG_DESCRIPTION =
  "Fall 2026 CS 1998 at Cornell: a 1-credit, 7-week S/U course on AI Safety and Alignment with discussion readings and technical notebooks.";

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
    "Current alignment techniques and RLHF",
    "Reward hacking and goal misgeneralization",
    "Mechanistic interpretability",
    "Dangerous capability evaluations",
    "AI control, scalable oversight, and governance",
  ],
  instructor: COURSE_STAFF.map((member) => ({
    "@type": "Person",
    name: member.name,
  })),
  timeRequired: "P7W",
  inLanguage: "en",
};

export const metadata: Metadata = {
  title: "CS 1998: Intro to AI Safety & Alignment",
  description: COURSE_DESCRIPTION,
  keywords: [
    "CS 1998",
    "AI Safety course",
    "AI Alignment course",
    "Cornell student-led course",
    "Fall 2026",
  ],
  alternates: {
    canonical: COURSE_PATH,
  },
  openGraph: {
    title: "CS 1998: Intro to AI Safety & Alignment (Fall 2026)",
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
        <p className="mb-1 text-sm font-bold text-slate-900">Slides</p>
        <MaterialList items={materials.slide} />
      </div>
      <div>
        <p className="mb-1 text-sm font-bold text-slate-900">
          Discussion Readings
        </p>
        <MaterialList items={materials.discussionReading} />
      </div>
      <div>
        <p className="mb-1 text-sm font-bold text-slate-900">
          Further Reading
        </p>
        <MaterialList items={materials.furtherReading} />
      </div>
    </div>
  );
}

function CourseStaffGrid({ className }: { className: string }) {
  return (
    <div className={className}>
      {COURSE_STAFF.map((member) => (
        <ProfileCard
          key={member.name}
          imageSrc={member.imageSrc}
          name={member.name}
          role={member.role}
          unframed
        />
      ))}
    </div>
  );
}

export default function CS1998Page() {
  return (
    <main className="cs1998-page relative overflow-hidden bg-white pb-12 sm:pb-16">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0"
      >
        <Squares
          speed={0.03}
          squareSize={42}
          direction="diagonal"
          borderColor="rgba(15, 23, 42, 0.055)"
          hoverFillColor="rgba(179, 27, 27, 0.14)"
          fadeOverlayColor="rgba(255, 255, 255, 0.82)"
        />
      </div>

      <div className="relative z-10">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(COURSE_SCHEMA) }}
        />
        <header className="relative overflow-hidden border-b border-slate-200 bg-[linear-gradient(145deg,#fff5f5_0%,#ffffff_45%,#f8fafc_100%)]">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
          >
            <div className={`${styles.gradient} ${styles.gradientA}`} />
            <div className={`${styles.gradient} ${styles.gradientB}`} />
            <div className={`${styles.gradient} ${styles.gradientC}`} />
          </div>
          <div className="mx-auto w-full max-w-page px-4 sm:px-6 lg:px-8">
            <div className="relative space-y-5 py-10 sm:py-16">
              <Badge className="inline-flex items-center gap-2 rounded-lg border border-brand-red/25 bg-white/75 px-3 py-1.5 text-sm font-semibold text-slate-800 shadow-none sm:text-[0.95rem]">
                <span
                  aria-hidden="true"
                  className="h-2 w-2 rounded-full bg-brand-red"
                />
                Fall 2026
              </Badge>
              <h1 className="display-title text-3xl sm:text-5xl">
                CS 1998: Intro to AI Safety &amp; Alignment
              </h1>
              <p className="max-w-3xl text-base leading-7 text-slate-700 sm:text-lg">
                1 Credit · 7 Weeks First · S/U Grading · Open Enrollment
              </p>
              <nav
                aria-label="CS 1998 sections"
                className="flex flex-wrap items-center gap-x-5 gap-y-2 pt-1"
              >
                <a
                  href="#content"
                  className="focus-ring text-sm font-semibold text-slate-700 underline decoration-slate-400 underline-offset-4 transition hover:text-brand-red hover:decoration-brand-red"
                >
                  Content
                </a>
                <a
                  href="#logistics"
                  className="focus-ring text-sm font-semibold text-slate-700 underline decoration-slate-400 underline-offset-4 transition hover:text-brand-red hover:decoration-brand-red"
                >
                  Logistics
                </a>
                <a
                  href="#staff"
                  className="focus-ring text-sm font-semibold text-slate-700 underline decoration-slate-400 underline-offset-4 transition hover:text-brand-red hover:decoration-brand-red"
                >
                  Staff
                </a>
                <a
                  href="#grading"
                  className="focus-ring text-sm font-semibold text-slate-700 underline decoration-slate-400 underline-offset-4 transition hover:text-brand-red hover:decoration-brand-red"
                >
                  Grading
                </a>
                <a
                  href="#calendar"
                  className="focus-ring text-sm font-semibold text-slate-700 underline decoration-slate-400 underline-offset-4 transition hover:text-brand-red hover:decoration-brand-red"
                >
                  Calendar
                </a>
                <a
                  href="#syllabus"
                  className="focus-ring text-sm font-semibold text-slate-700 underline decoration-slate-400 underline-offset-4 transition hover:text-brand-red hover:decoration-brand-red"
                >
                  Syllabus
                </a>
              </nav>
            </div>
          </div>
        </header>

        <div className="mx-auto w-full max-w-page px-4 sm:px-6 lg:px-8">
          <section aria-label="Enroll" className="mt-10">
            <article className="rounded-2xl border border-brand-red/30 bg-gradient-to-br from-brand-red/5 via-white to-white p-6 sm:p-8">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="min-w-0">
                  <h2 className="display-title text-2xl sm:text-3xl">
                    Enroll today!
                  </h2>
                  <p className="mt-2 text-sm leading-7 text-slate-700 sm:text-base">
                    CS 1998, PRJ 608 · Class number{" "}
                    <span className="font-semibold text-slate-900">18589</span>
                  </p>
                </div>
                <a
                  href="https://classes.cornell.edu/browse/roster/FA26/class/CS/1998"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="focus-ring inline-flex shrink-0 items-center justify-center rounded-lg bg-brand-red px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-red-strong sm:text-base"
                >
                  Enroll on Class Roster
                </a>
              </div>
            </article>
          </section>

          <section id="staff" className="mt-10 scroll-mt-28">
            <details className="group rounded-2xl border border-slate-200 bg-white sm:hidden">
              <summary className="focus-ring flex cursor-pointer list-none items-center justify-between gap-4 rounded-2xl px-6 py-5 [&::-webkit-details-marker]:hidden">
                <span>
                  <span className="display-title block text-2xl">
                    Course Staff
                  </span>
                  <span className="mt-1 block text-sm leading-6 text-slate-600">
                    Meet the course team
                  </span>
                </span>
                <span
                  className="text-2xl leading-none text-brand-red transition-transform duration-200 group-open:rotate-45"
                  aria-hidden="true"
                >
                  +
                </span>
              </summary>
              <div className="border-t border-slate-200 p-4">
                <CourseStaffGrid className="grid gap-y-8" />
              </div>
            </details>

            <article className="hidden rounded-2xl border border-slate-200 bg-white p-8 sm:block">
              <h2 className="display-title text-3xl">Course Staff</h2>
              <p className="mt-2 max-w-2xl text-base leading-7 text-slate-700">
                The course is led by CAIA members with faculty advising from
                Cornell.
              </p>
              <CourseStaffGrid className="mt-6 grid gap-x-4 gap-y-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4" />
            </article>
          </section>

          <section id="content" className="mt-10 scroll-mt-28">
            <article className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
              <h2 className="display-title text-2xl sm:text-3xl">Content</h2>
              <p className="mt-4 text-sm leading-7 text-slate-700 sm:text-base">
                CS 1998: Intro to AI Safety &amp; Alignment is a student-led
                course that explores why advanced AI systems can fail in
                unexpected and dangerous ways. We begin by building a solid
                understanding of how modern language models are trained, from
                pretraining on web-scale data through supervised fine-tuning
                and reinforcement learning from human feedback. From there, we
                turn to the core question: how do we ensure these systems do
                what we actually want? Students will learn key technical ideas
                in mechanistic interpretability (reverse-engineering model
                internals to understand what they&apos;ve learned), reward
                learning (how optimization pressure can produce unintended
                behaviors like sycophancy and reward hacking), red teaming and
                adversarial evaluation (systematically probing models for
                failure modes), and scalable oversight (supervising systems
                that may exceed human-level performance on the tasks we&apos;re
                evaluating them on).
              </p>
            </article>
          </section>

          <section id="logistics" className="mt-10 scroll-mt-28">
            <article className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
              <h2 className="display-title text-2xl sm:text-3xl">Logistics</h2>
              <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-7 text-slate-700 sm:text-base">
                <li>This is a 1-credit, 7-week, first S/U course.</li>
                <li>Location: Phillips Hall 203.</li>
                <li>
                  This course is open enrollment (without application), with
                  around 75 seats.
                </li>
              </ul>
            </article>
          </section>

          <section id="grading" className="mt-10 scroll-mt-28">
            <article className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
              <h2 className="display-title text-2xl sm:text-3xl">
                Course Structure and Grading
              </h2>
              <div className="mt-4 space-y-4 text-sm leading-7 text-slate-700 sm:text-base">
                <p>
                  The course includes Friday lectures, guided notebooks, Monday
                  paper discussions, and a final project. We use point-based
                  S/U grading: {" "}
                  <span className="text-slate-950 underline decoration-wavy decoration-slate-400 underline-offset-4">
                    145 points
                  </span>{" "}
                  are available, and{" "}
                  <span className="text-slate-950 underline decoration-wavy decoration-slate-400 underline-offset-4">
                    100 points
                  </span>{" "}
                  earns a pass.
                </p>
                <p>
                  <strong className="text-slate-950">Lecture.</strong>{" "}
                  Each of seven Friday lectures earns{" "}
                  <span className="text-slate-950 underline decoration-wavy decoration-slate-400 underline-offset-4">
                    5 points, up to 35 points
                  </span>
                  {". "}Lectures introduce the week&apos;s core ideas, technical
                  foundations, and research context.
                </p>
                <p>
                  <strong className="text-slate-950">Notebook.</strong> Weeks
                  2–6 each include a guided take-home notebook. Satisfactory
                  completion earns{" "}
                  <span className="text-slate-950 underline decoration-wavy decoration-slate-400 underline-offset-4">
                    10 points, up to 50 points
                  </span>
                  {". "}Expect roughly 30 lines of student-written code within a
                  provided framework, focused on a hands-on experiment and
                  short analysis.
                </p>
                <p>
                  <strong className="text-slate-950">Discussion.</strong>{" "}
                  Monday discussions examine a frontier or recent paper related
                  to the preceding lecture. Each attendance earns{" "}
                  <span className="text-slate-950 underline decoration-wavy decoration-slate-400 underline-offset-4">
                    5 points, capped at 15 points
                  </span>
                  {"."}
                </p>
                <p>
                  <strong className="text-slate-950">
                    Project proposal.
                  </strong>{" "}
                  Earn{" "}
                  <span className="text-slate-950 underline decoration-wavy decoration-slate-400 underline-offset-4">
                    5 points
                  </span>{" "}
                  for defining an AI safety question, hypothesis, method, and
                  expected result. You&apos;ll receive feedback before final-project
                  work begins.
                </p>
                <p>
                  <strong className="text-slate-950">Final project.</strong>{" "}
                  Earn{" "}
                  <span className="text-slate-950 underline decoration-wavy decoration-slate-400 underline-offset-4">
                    40 points
                  </span>{" "}
                  for reproducing or extending a result, building an evaluation,
                  comparing methods, or testing a safety hypothesis. Agentic
                  coding tools are encouraged, but you remain responsible for
                  understanding and validating the work. Compute credits will
                  be provided.
                </p>
              </div>
            </article>
          </section>

          <section id="calendar" className="mt-10 scroll-mt-28">
            <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
              <div className="px-6 pt-6 sm:px-8 sm:pt-8">
                <h2 className="display-title text-2xl sm:text-3xl">
                  Course Calendar
                </h2>
              </div>
              <div className="mt-5 h-[520px] sm:h-[600px]">
                <iframe
                  src={COURSE_CALENDAR_EMBED_URL}
                  className="h-full w-full"
                  style={{ border: 0 }}
                  title="CS 1998 course calendar"
                  loading="lazy"
                />
              </div>
            </article>
          </section>

          <section id="syllabus" className="mt-10 scroll-mt-28">
            <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white/95 shadow-[0_1px_0_rgba(255,255,255,0.8)]">
              <div className="px-4 pt-5 sm:px-8 sm:pt-8">
                <h2 className="display-title text-2xl sm:text-3xl">Syllabus</h2>
              </div>

              <div className="mt-5 space-y-3 px-4 pb-5 sm:px-6 lg:hidden">
                {COURSE_WEEKS.map((week) => (
                  <details
                    key={`mobile-week-${week.number}`}
                    className="group overflow-hidden rounded-2xl border border-slate-200/90 bg-white"
                  >
                    <summary className="focus-ring flex cursor-pointer list-none items-start justify-between gap-3 px-4 py-4 sm:px-5">
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-slate-500">
                          Week {week.number}
                        </p>
                        <p className="mt-0.5 text-[1.1rem] font-semibold leading-7 text-slate-900">
                          {week.description}
                        </p>
                      </div>
                      <span className="mt-1 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-slate-300 text-lg leading-none text-slate-500 transition-transform duration-200 group-open:rotate-45">
                        +
                      </span>
                    </summary>
                    <div className="space-y-4 border-t border-slate-200/80 bg-white px-4 py-4 sm:px-5">
                      <div>
                        <p className="mb-1 text-sm font-bold text-slate-900">
                          Topics
                        </p>
                        <ul className="list-disc space-y-1.5 pl-5 text-sm leading-6 text-slate-700">
                          {week.topics.map((topic) => (
                            <li key={`mobile-topic-${week.number}-${topic}`}>
                              {topic}
                            </li>
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
                      <th className="px-4 py-3 text-sm font-semibold text-slate-900">
                        Week
                      </th>
                      <th className="px-4 py-3 text-sm font-semibold text-slate-900">
                        Description
                      </th>
                      <th className="px-4 py-3 text-sm font-semibold text-slate-900">
                        Topics
                      </th>
                      <th className="px-4 py-3 text-sm font-semibold text-slate-900">
                        Materials
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {COURSE_WEEKS.map((week, index) => (
                      <tr
                        key={week.number}
                        className={
                          index % 2 === 0
                            ? "align-top border-b border-slate-200 bg-white"
                            : "align-top border-b border-slate-200 bg-slate-50/70"
                        }
                      >
                        <td className="px-4 py-4 align-top text-sm font-semibold text-slate-700">
                          {week.number}
                        </td>
                        <td className="px-4 py-4 text-sm font-semibold text-slate-900">
                          {week.description}
                        </td>
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
      </div>
    </main>
  );
}
