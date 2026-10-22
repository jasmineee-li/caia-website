import type { Metadata } from "next";
import Image from "next/image";
import ProfileCard from "@/components/ProfileCard";
import { createPageMetadata, SITE_URL } from "@/content/seo";
import JsonLd from "@/components/JsonLd";

interface MaterialItem {
  label: string;
  href?: string;
}

interface WeekMaterials {
  slide: MaterialItem[];
  notebook?: MaterialItem[];
  /** For the project: the guide to the proposal and final report. */
  guide?: MaterialItem[];
  discussionReading: MaterialItem[];
  furtherReading: MaterialItem[];
}

interface CourseWeek {
  number: number;
  /** Shown in place of "Week n", e.g. for the final project. */
  label?: string;
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

const COURSE_DESCRIPTION =
  "Explore Cornell’s CS 1998 AI Safety and Alignment course, with open slides, readings, and hands-on notebooks. Fall 2026 enrollment is closed.";

const COURSE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Course",
  "@id": `${COURSE_URL}#course`,
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
  hasCourseInstance: {
    "@type": "CourseInstance",
    name: "Fall 2026",
    courseMode: "onsite",
    instructor: {
      "@type": "Person",
      name: "Jinzhou Wu",
    },
  },
  timeRequired: "P7W",
  inLanguage: "en",
};

export const metadata: Metadata = createPageMetadata({
  title: "CS 1998",
  description: COURSE_DESCRIPTION,
  path: COURSE_PATH,
  keywords: [
    "CS 1998",
    "AI Safety course",
    "AI Alignment course",
    "Cornell student-led course",
    "Fall 2026",
  ],
});

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
              className="text-link"
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
      {materials.guide && materials.guide.length > 0 && (
        <div>
          <p className="mb-1 text-sm font-bold text-slate-900">Guide</p>
          <MaterialList items={materials.guide} />
        </div>
      )}
      {materials.slide.length > 0 && (
        <div>
          <p className="mb-1 text-sm font-bold text-slate-900">Slides</p>
          <MaterialList items={materials.slide} />
        </div>
      )}
      {materials.notebook && materials.notebook.length > 0 && (
        <div>
          <p className="mb-1 text-sm font-bold text-slate-900">Notebook</p>
          <MaterialList items={materials.notebook} />
        </div>
      )}
      {materials.discussionReading.length > 0 && (
        <div>
          <p className="mb-1 text-sm font-bold text-slate-900">
            Discussion Readings
          </p>
          <MaterialList items={materials.discussionReading} />
        </div>
      )}
      {materials.furtherReading.length > 0 && (
        <div>
          <p className="mb-1 text-sm font-bold text-slate-900">
            Further Reading
          </p>
          <MaterialList items={materials.furtherReading} />
        </div>
      )}
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


      <div className="relative z-10">
        <JsonLd data={COURSE_SCHEMA} />
        {/* Grid paper, as on the home hero, closing on a rule at the bottom. */}
        <header className="grid-paper border-b border-grid [background-position:center_bottom]">
          <div className="mx-auto w-full max-w-page px-5 sm:px-8 lg:px-12">
            <div className="grid items-center gap-10 pb-12 pt-14 sm:pb-16 sm:pt-20 lg:grid-cols-12 lg:gap-8 lg:pb-20 lg:pt-24">
              <div className="space-y-6 sm:space-y-8 lg:col-span-7">
                <p className="mono-label text-blue">Course · Fall 2026</p>
                <h1 className="display-title text-[2.75rem] leading-[1.02] sm:text-[4.25rem] lg:text-[4.5rem]">
                  CS 1998: Intro to AI Safety &amp; Alignment
                </h1>
                <p className="mono-caption text-[0.9375rem] !text-ink-2">
                  1 credit · 7 weeks, first half · S/U grading · Fall enrollment closed
                </p>
                <nav
                  aria-label="CS 1998 sections"
                  className="flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-blue pt-6"
                >
                  <a
                    href="#staff"
                    className="focus-ring text-link text-[0.9375rem]"
                  >
                    Staff
                  </a>
                  <a
                    href="#content"
                    className="focus-ring text-link text-[0.9375rem]"
                  >
                    Content
                  </a>
                  <a
                    href="#logistics"
                    className="focus-ring text-link text-[0.9375rem]"
                  >
                    Logistics
                  </a>
                  <a
                    href="#grading"
                    className="focus-ring text-link text-[0.9375rem]"
                  >
                    Grading
                  </a>
                  <a
                    href="#calendar"
                    className="focus-ring text-link text-[0.9375rem]"
                  >
                    Calendar
                  </a>
                  <a
                    href="#syllabus"
                    className="focus-ring text-link text-[0.9375rem]"
                  >
                    Syllabus
                  </a>
                </nav>
              </div>
              {/* On phones the 1998 leads the header; on desktop it sits to the right of the title. */}
              <div className="order-first max-w-[22rem] sm:max-w-[28rem] lg:order-none lg:col-span-5 lg:max-w-none">
                <Image
                  src="/graphics/halftone/course-dots.webp"
                  alt="The number 1998 drawn in blue halftone dots"
                  width={1273}
                  height={517}
                  priority
                  sizes="(min-width: 1024px) 520px, 28rem"
                  className="h-auto w-full"
                />
              </div>
            </div>
          </div>
        </header>

        <div className="mx-auto w-full max-w-page px-5 sm:px-8 lg:px-12">
          <section aria-label="Enrollment status" className="mt-14 sm:mt-16">
            <article className="rounded-[8px] bg-panel p-6 sm:p-8">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="min-w-0">
                  <h2 className="display-title text-[2rem] leading-[1.1] sm:text-[2.75rem]">
                    Enrollment is closed for Fall 2026
                  </h2>
                  <p className="mt-2 text-[1rem] leading-[1.75] text-slate-600">
                    We’ll also run the course in future semesters. Watch out for updates for future semesters.
                    All course materials are openly accessible below.
                  </p>
                </div>
              </div>
            </article>
          </section>

          <section id="staff" className="mt-20 scroll-mt-28 sm:mt-24">
            <details className="group border-t border-blue sm:hidden">
              <summary className="focus-ring flex cursor-pointer list-none items-center justify-between gap-4 py-6 [&::-webkit-details-marker]:hidden">
                <span>
                  <span className="display-title block text-[2rem] leading-[1.1]">
                    Course Staff
                  </span>
                  <span className="mt-1 block text-sm leading-6 text-slate-600">
                    Meet the course team
                  </span>
                </span>
                <span
                  className="text-2xl leading-none text-blue transition-transform duration-200 group-open:rotate-45"
                  aria-hidden="true"
                >
                  +
                </span>
              </summary>
              <div className="pb-2 pt-4">
                <CourseStaffGrid className="grid gap-y-8" />
              </div>
            </details>

            <article className="hidden border-t border-blue pt-8 sm:block">
              <h2 className="display-title text-[2rem] leading-[1.1] sm:text-[2.75rem]">Course Staff</h2>
              <p className="mt-3 max-w-2xl text-[1rem] leading-[1.75] text-slate-600">
                The course is led by CAIA members with faculty advising from
                Cornell.
              </p>
              <CourseStaffGrid className="mt-6 grid gap-x-4 gap-y-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4" />
            </article>
          </section>

          <section id="content" className="mt-20 scroll-mt-28 sm:mt-24">
            <article className="border-t border-blue pt-8">
              <h2 className="display-title text-[2rem] leading-[1.1] sm:text-[2.75rem]">Content</h2>
              <p className="mt-4 text-[1rem] leading-[1.75] text-slate-600">
                How can we make AI systems do what we actually want? This
                student-led course introduces language model training, alignment,
                interpretability, evaluations, and scalable oversight. Through
                lectures, hands-on work, and discussion, we connect technical
                methods with broader questions about AI policy and governance.
              </p>
            </article>
          </section>

          <section id="logistics" className="mt-20 scroll-mt-28 sm:mt-24">
            <article className="border-t border-blue pt-8">
              <h2 className="display-title text-[2rem] leading-[1.1] sm:text-[2.75rem]">Logistics</h2>
              <ul className="mt-4 list-disc space-y-2 pl-5 text-[1rem] leading-[1.75] text-slate-600">
                <li>This is a 1-credit, 7-week, first S/U course.</li>
                <li>Location: Phillips Hall 203.</li>
                <li>
                  Enrollment is closed for Fall 2026. Future offerings will be announced through CAIA.
                </li>
              </ul>
            </article>
          </section>

          <section id="grading" className="mt-20 scroll-mt-28 sm:mt-24">
            <article className="border-t border-blue pt-8">
              <h2 className="display-title text-[2rem] leading-[1.1] sm:text-[2.75rem]">
                Course Structure and Grading
              </h2>
              <div className="mt-4 space-y-4 text-[1rem] leading-[1.75] text-slate-600">
                <p>
                  The course includes Friday lectures, guided notebooks, Monday
                  paper discussions, and a final project. We use point-based
                  S/U grading: {" "}
                  <span className="font-medium text-ink">
                    145 points
                  </span>{" "}
                  are available, and{" "}
                  <span className="font-medium text-ink">
                    100 points
                  </span>{" "}
                  earns a pass.
                </p>
                <p>
                  <strong className="text-slate-950">Lecture.</strong>{" "}
                  Each of seven Friday lectures earns{" "}
                  <span className="font-medium text-ink">
                    5 points, up to 35 points
                  </span>
                  {". "}Lectures introduce the week&apos;s core ideas, technical
                  foundations, and research context.
                </p>
                <p>
                  <strong className="text-slate-950">Notebook.</strong> Weeks
                  2–6 each include a guided take-home notebook. Satisfactory
                  completion earns{" "}
                  <span className="font-medium text-ink">
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
                  <span className="font-medium text-ink">
                    5 points, capped at 15 points
                  </span>
                  {"."}
                </p>
                <p>
                  <strong className="text-slate-950">
                    Project proposal.
                  </strong>{" "}
                  Earn{" "}
                  <span className="font-medium text-ink">
                    5 points
                  </span>{" "}
                  for defining an AI safety question, hypothesis, method, and
                  expected result. You&apos;ll receive feedback before final-project
                  work begins.
                </p>
                <p>
                  <strong className="text-slate-950">Final project.</strong>{" "}
                  Earn{" "}
                  <span className="font-medium text-ink">
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

          <section id="calendar" className="mt-20 scroll-mt-28 sm:mt-24">
            <article className="border-t border-blue pt-8">
              <div>
                <h2 className="display-title text-[2rem] leading-[1.1] sm:text-[2.75rem]">
                  Course Calendar
                </h2>
              </div>
              <div className="mt-8 h-[520px] border border-slate-200 sm:h-[600px]">
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

          <section id="syllabus" className="mt-20 scroll-mt-28 sm:mt-24">
            <article className="border-t border-blue pt-8">
              <div>
                <h2 className="display-title text-[2rem] leading-[1.1] sm:text-[2.75rem]">Syllabus</h2>
              </div>

              <div className="mt-6 border-t border-slate-200 lg:hidden">
                {COURSE_WEEKS.map((week) => (
                  <details
                    key={`mobile-week-${week.number}`}
                    className="group border-b border-slate-200"
                  >
                    <summary className="focus-ring flex cursor-pointer list-none items-start justify-between gap-3 py-5">
                      <div className="min-w-0">
                        <p className="mono-label text-slate-500">
                          {week.label ?? `Week ${week.number}`}
                        </p>
                        <p className="mt-2 font-display text-[1.25rem] leading-[1.25] text-slate-900">
                          {week.description}
                        </p>
                      </div>
                      <span className="mt-1 inline-flex h-7 w-7 shrink-0 items-center justify-center text-xl leading-none text-slate-500 transition-transform duration-200 group-open:rotate-45">
                        +
                      </span>
                    </summary>
                    <div className="space-y-4 pb-6">
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

              <div className="mt-8 hidden overflow-x-auto lg:block">
                <table className="min-w-[1120px] w-full border-collapse">
                  <thead>
                    <tr className="border-y border-slate-200 bg-slate-50 text-left">
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
                            : "align-top border-b border-slate-200 bg-white"
                        }
                      >
                        <td className="px-4 py-4 align-top text-sm font-semibold text-slate-700">
                          {week.label ?? week.number}
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
