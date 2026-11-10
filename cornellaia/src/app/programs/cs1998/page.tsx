import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import ProfileCard from "@/components/ProfileCard";
import Button from "@/components/ui/Button";
import Tag from "@/components/ui/Tag";
import { createPageMetadata, SITE_URL } from "@/content/seo";
import JsonLd from "@/components/JsonLd";
import {
  SPRING_2027_MODULES,
  SPRING_2027_PROJECT,
  SPRING_2027_STAFF,
  type CourseModule,
  type Lecture,
  type MaterialItem,
} from "@/content/cs1998/spring-2027";

const COURSE_PATH = "/programs/cs1998";
const COURSE_URL = new URL(COURSE_PATH, SITE_URL).toString();
const CLASS_NUMBER = "17782";
const ROOM_HREF = "http://www.cornell.edu/about/maps/?q=Phillips%20Hall#CUmap";
const ROSTER_HREF = "https://classes.cornell.edu/browse/roster/SP27/class/CS/1998";

const ALL_MODULES: CourseModule[] = [...SPRING_2027_MODULES, SPRING_2027_PROJECT];

const GRADING_ROWS: { component: string; points: string; max: string }[] = [
  { component: "Lecture attended", points: "5 each", max: "70" },
  { component: "Project", points: "10 proposal + 30 final", max: "40" },
  { component: "Notebook (graded on completion)", points: "5 each", max: "25 (5 notebooks)" },
  { component: "Bonus (course eval, CAIA discussion or talk)", points: "", max: "5" },
];

const EXAMPLE_PATHS: { path: string; lectures: string; project: string; notebooks: string; total: string }[] = [
  { path: "Typical", lectures: "12 → 60", project: "40", notebooks: "0", total: "100" },
  { path: "Minimum attendance", lectures: "10 → 50", project: "40", notebooks: "2 → 10", total: "100" },
  { path: "No project", lectures: "14 → 70", project: "0", notebooks: "5 → 25, plus 5 bonus", total: "100" },
];

const COURSE_DESCRIPTION =
  "CS 1998: Intro to AI Safety & Alignment at Cornell. A 2-credit, 7-week, S/U course for Spring 2027, open to everyone, with open slides, readings and hands-on notebooks.";

const COURSE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Course",
  "@id": `${COURSE_URL}#course`,
  name: "CS 1998: Intro to AI Safety & Alignment",
  description: COURSE_DESCRIPTION,
  url: COURSE_URL,
  courseCode: "CS 1998",
  educationalCredentialAwarded: "2 credits (S/U)",
  provider: {
    "@type": "CollegeOrUniversity",
    name: "Cornell University",
    url: "https://www.cornell.edu/",
  },
  teaches: [
    "AI safety and alignment fundamentals",
    "Language model training and preference alignment",
    "Reward hacking and goal misgeneralization",
    "Dangerous capability and propensity evaluations",
    "Mechanistic interpretability",
    "Scalable oversight, AI control and governance",
  ],
  hasCourseInstance: {
    "@type": "CourseInstance",
    name: "Spring 2027",
    courseMode: "onsite",
    courseSchedule: {
      "@type": "Schedule",
      byDay: ["Monday", "Wednesday"],
      startTime: "12:20",
      endTime: "13:10",
      repeatFrequency: "P1W",
    },
    location: {
      "@type": "Place",
      name: "Phillips Hall 219, Cornell University",
    },
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
    "Spring 2027",
  ],
  image: "/og/og-cs1998.png",
  imageAlt: "CS 1998, drawn in blue halftone dots",
});

function ReadingList({ items }: { items: MaterialItem[] }) {
  return (
    <ul className="space-y-1.5 text-sm leading-6 text-slate-700">
      {items.map((item) => (
        <li key={item.label} className="flex gap-2.5">
          <span aria-hidden="true" className="mt-[0.5625rem] h-[3px] w-[3px] shrink-0 bg-blue" />
          <span>
            {item.href ? (
              <a href={item.href} target="_blank" rel="noopener noreferrer" className="text-link">
                {item.label}
              </a>
            ) : (
              item.label
            )}
          </span>
        </li>
      ))}
    </ul>
  );
}

function CourseStaffGrid({ className }: { className: string }) {
  return (
    <div className={className}>
      {SPRING_2027_STAFF.map((member) => (
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

/** One lecture: its number and date on the left, what it covers and its readings on the right. */
function LectureRow({ lecture }: { lecture: Lecture }) {
  return (
    <div className="grid gap-x-8 gap-y-4 border-t border-slate-200 py-6 lg:grid-cols-12">
      <div className="lg:col-span-3">
        <p className="mono-label text-brand-red">Lecture {lecture.number}</p>
        <p className="mono-caption mt-1.5 !text-ink-2">{lecture.date}</p>
      </div>
      <div className="lg:col-span-9">
        <h4 className="font-display text-[1.375rem] leading-[1.25] text-slate-900">{lecture.title}</h4>
        <p className="mt-2 text-[1rem] leading-[1.7] text-slate-600">{lecture.covers}</p>
        {lecture.readings.length > 0 && (
          <div className="mt-4">
            <p className="mb-2 text-sm font-bold text-slate-900">Readings</p>
            <ReadingList items={lecture.readings} />
          </div>
        )}
        <p className="mono-caption mt-4 !text-slate-400">Slides TBA · Notebook TBA</p>
      </div>
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
                <Tag color="yellow">Spring 2027</Tag>
                <h1 className="display-title text-[2.75rem] leading-[1.02] sm:text-[4.25rem] lg:text-[4.5rem]">
                  CS 1998:
                  <br />
                  Intro to AI Safety &amp; Alignment
                </h1>
                <ul className="flex flex-wrap gap-2" aria-label="Course facts">
                  {["2 credits", "7 weeks, first half", "S/U", "Open enrollment"].map((fact) => (
                    <li
                      key={fact}
                      className="inline-flex items-center border border-rule bg-white px-2.5 py-[5px] font-mono text-[0.75rem] font-medium uppercase leading-[1.3] tracking-[0.08em] text-ink-2"
                    >
                      {fact}
                    </li>
                  ))}
                </ul>
                <nav
                  aria-label="CS 1998 sections"
                  className="flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-blue pt-6"
                >
                  <a href="#staff" className="focus-ring text-link text-[0.9375rem]">Staff</a>
                  <a href="#content" className="focus-ring text-link text-[0.9375rem]">Content</a>
                  <a href="#logistics" className="focus-ring text-link text-[0.9375rem]">Logistics</a>
                  <a href="#grading" className="focus-ring text-link text-[0.9375rem]">Grading</a>
                  <a href="#syllabus" className="focus-ring text-link text-[0.9375rem]">Syllabus</a>
                  <Link href="/programs/cs1998/fall-2026" className="focus-ring text-link text-[0.9375rem]">
                    Fall 2026 archive
                  </Link>
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
          <section aria-label="Enrollment" className="mt-14 sm:mt-16">
            <article className="rounded-[8px] bg-panel p-6 sm:p-8">
              <h2 className="display-title text-[2rem] leading-[1.1] sm:text-[2.75rem]">
                Enrolling for Spring 2027
              </h2>
              <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3">
                <p className="text-[1rem] leading-[1.6] text-slate-600">
                  Class number{" "}
                  <span className="font-display text-[1.5rem] leading-none text-ink">{CLASS_NUMBER}</span>
                </p>
                <Button href={ROSTER_HREF} external>Pre-enroll now</Button>
              </div>
              <p className="mt-5 max-w-2xl text-[1rem] leading-[1.75] text-slate-600">
                The course ran for the first time in Fall 2026, and everything from that
                semester, including the slides, the notebooks and the readings, is still
                available in the{" "}
                <Link href="/programs/cs1998/fall-2026" className="text-link">
                  Fall 2026 archive
                </Link>
                .
              </p>
            </article>
          </section>

          <section id="staff" className="mt-20 scroll-mt-28 sm:mt-24">
            {/* Seven faces are a lot of scrolling on a phone, so they start collapsed there. */}
            <details className="group border-t border-blue sm:hidden">
              <summary className="focus-ring flex cursor-pointer list-none items-center justify-between gap-4 py-6 [&::-webkit-details-marker]:hidden">
                <span className="display-title text-[2rem] leading-[1.1]">Course Staff</span>
                <span
                  aria-hidden="true"
                  className="text-2xl leading-none text-blue transition-transform duration-200 group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <div className="pb-2 pt-2">
                <CourseStaffGrid className="grid gap-y-8" />
              </div>
            </details>

            <article className="hidden border-t border-blue pt-8 sm:block">
              <h2 className="display-title text-[2rem] leading-[1.1] sm:text-[2.75rem]">Course Staff</h2>
              <CourseStaffGrid className="mt-6 grid gap-x-4 gap-y-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5" />
            </article>
          </section>

          <section id="content" className="mt-20 scroll-mt-28 sm:mt-24">
            <article className="border-t border-blue pt-8">
              <h2 className="display-title text-[2rem] leading-[1.1] sm:text-[2.75rem]">Content</h2>
              <div className="mt-4 max-w-3xl space-y-4 text-[1rem] leading-[1.75] text-slate-600">
                <p>
                  AI systems are becoming more capable far faster than our methods for
                  understanding and controlling them are improving. Today’s models write
                  software, carry out long tasks on their own and are starting to help build
                  their successors, yet researchers still cannot fully explain why they behave
                  as they do or guarantee that they pursue the goals we intend.
                </p>
                <p>
                  CS 1998 is a seven-week introduction to the technical problem of making
                  advanced AI safe and aligned with human values. We will study how models are
                  trained on human feedback and where that training breaks down, why AI systems
                  can learn goals different from the ones we intended, how interpretability lets
                  us look inside neural networks, how researchers test models for dangerous
                  capabilities and deception, and how governments and labs are responding.
                </p>
                <p>
                  Each week we run two lectures and a hands-on notebook, and the course ends with
                  a final project that can be technical or non-technical. Our aim is that you
                  finish with enough context and enough practical skill to go straight into AI
                  safety research. The course is open to students from all majors.
                </p>
              </div>
            </article>
          </section>

          <section id="logistics" className="mt-20 scroll-mt-28 sm:mt-24">
            <article className="border-t border-blue pt-8">
              <h2 className="display-title text-[2rem] leading-[1.1] sm:text-[2.75rem]">Logistics</h2>
              <dl className="mt-6 grid gap-x-8 gap-y-5 sm:grid-cols-2 lg:grid-cols-3">
                {[
                  ["Credits", "2 credits, S/U only"],
                  ["Length", "7 weeks, first half of the semester"],
                  ["Meets", "Mondays and Wednesdays, 12:20–1:10 PM"],
                  ["Class number", CLASS_NUMBER],
                  ["Enrollment", "Open enrollment, 75 seats"],
                ].map(([term, value]) => (
                  <div key={term}>
                    <dt className="mono-label text-slate-500">{term}</dt>
                    <dd className="mt-1.5 text-[1rem] leading-[1.6] text-slate-700">{value}</dd>
                  </div>
                ))}
                <div>
                  <dt className="mono-label text-slate-500">Location</dt>
                  <dd className="mt-1.5 text-[1rem] leading-[1.6] text-slate-700">
                    <a href={ROOM_HREF} target="_blank" rel="noopener noreferrer" className="text-link">
                      Phillips Hall 219
                    </a>
                  </dd>
                </div>
              </dl>
            </article>
          </section>

          <section id="grading" className="mt-20 scroll-mt-28 sm:mt-24">
            <details className="group border-t border-blue">
              <summary className="focus-ring flex cursor-pointer list-none items-start justify-between gap-4 py-6 [&::-webkit-details-marker]:hidden">
                <span className="display-title text-[2rem] leading-[1.1] sm:text-[2.75rem]">
                  Course Structure and Grading
                </span>
                <span
                  aria-hidden="true"
                  className="mt-2 text-2xl leading-none text-blue transition-transform duration-200 group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <div className="pb-2">
              <p className="max-w-3xl text-[1rem] leading-[1.75] text-slate-600">
                Earning an <span className="font-medium text-ink">S</span> takes{" "}
                <span className="font-medium text-ink">100 points</span> and attendance at{" "}
                <span className="font-medium text-ink">10 of the 14 lectures</span>. That leaves
                four absences with no questions asked, which is also enough room for anyone who
                adds the course a week or two late.
              </p>

              <div className="mt-8 overflow-x-auto">
                <table className="w-full min-w-[34rem] border-collapse">
                  <caption className="sr-only">Points by component</caption>
                  <thead>
                    <tr className="border-y border-slate-200 bg-slate-50 text-left">
                      <th scope="col" className="px-4 py-3 text-sm font-semibold text-slate-900">Component</th>
                      <th scope="col" className="px-4 py-3 text-sm font-semibold text-slate-900">Points</th>
                      <th scope="col" className="px-4 py-3 text-sm font-semibold text-slate-900">Max</th>
                    </tr>
                  </thead>
                  <tbody>
                    {GRADING_ROWS.map((row) => (
                      <tr key={row.component} className="border-b border-slate-200">
                        <td className="px-4 py-3.5 text-sm leading-6 text-slate-700">{row.component}</td>
                        <td className="px-4 py-3.5 text-sm leading-6 text-slate-700">{row.points || "—"}</td>
                        <td className="px-4 py-3.5 text-sm font-medium leading-6 text-slate-900">{row.max}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <h3 className="mt-10 font-display text-[1.5rem] leading-[1.25] text-slate-900">Example paths</h3>
              <p className="mt-2 max-w-3xl text-[1rem] leading-[1.7] text-slate-600">
                More than one combination reaches 100 points. The notebooks exist so that
                students who miss several lectures, and students who would rather not take on a
                project, can both still pass comfortably.
              </p>
              <div className="mt-6 overflow-x-auto">
                <table className="w-full min-w-[40rem] border-collapse">
                  <caption className="sr-only">Three ways to reach a passing total</caption>
                  <thead>
                    <tr className="border-y border-slate-200 bg-slate-50 text-left">
                      <th scope="col" className="px-4 py-3 text-sm font-semibold text-slate-900">Path</th>
                      <th scope="col" className="px-4 py-3 text-sm font-semibold text-slate-900">Lectures</th>
                      <th scope="col" className="px-4 py-3 text-sm font-semibold text-slate-900">Project</th>
                      <th scope="col" className="px-4 py-3 text-sm font-semibold text-slate-900">Notebooks</th>
                      <th scope="col" className="px-4 py-3 text-sm font-semibold text-slate-900">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {EXAMPLE_PATHS.map((row) => (
                      <tr key={row.path} className="border-b border-slate-200">
                        <td className="px-4 py-3.5 text-sm font-medium leading-6 text-slate-900">{row.path}</td>
                        <td className="px-4 py-3.5 text-sm leading-6 text-slate-700">{row.lectures}</td>
                        <td className="px-4 py-3.5 text-sm leading-6 text-slate-700">{row.project}</td>
                        <td className="px-4 py-3.5 text-sm leading-6 text-slate-700">{row.notebooks}</td>
                        <td className="px-4 py-3.5 text-sm font-medium leading-6 text-slate-900">{row.total}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              </div>
            </details>
          </section>

          <section id="syllabus" className="mt-20 scroll-mt-28 sm:mt-24">
            <article className="border-t border-blue pt-8">
              <h2 className="display-title text-[2rem] leading-[1.1] sm:text-[2.75rem]">Syllabus</h2>
              <div className="mt-8">
                {ALL_MODULES.map((module) =>
                  module.lectures.length === 0 ? (
                    // Nothing to expand into, so this one stays a plain row.
                    <div key={module.number} className="border-t-2 border-blue py-5">
                      <p className="mono-label text-blue">Final module</p>
                      <h3 className="display-title mt-2 text-[1.75rem] leading-[1.15] sm:text-[2rem]">
                        {module.title}
                      </h3>
                    </div>
                  ) : (
                  <details
                    key={module.number}
                    className="group border-t-2 border-blue"
                    aria-label={`Module ${module.number}: ${module.title}`}
                  >
                    <summary className="focus-ring flex cursor-pointer list-none items-start justify-between gap-4 py-5 [&::-webkit-details-marker]:hidden">
                      <span className="min-w-0">
                        <span className="mono-label block text-blue">
                          {module.lectures.length > 0 ? `Module ${module.number}` : "Final module"}
                        </span>
                        <span className="display-title mt-2 block text-[1.75rem] leading-[1.15] sm:text-[2rem]">
                          {module.title}
                        </span>
                      </span>
                      <span
                        aria-hidden="true"
                        className="mt-1 shrink-0 text-2xl leading-none text-blue transition-transform duration-200 group-open:rotate-45"
                      >
                        +
                      </span>
                    </summary>
                    {module.breakBefore && (
                      <p className="mt-5 flex flex-wrap items-baseline gap-x-4 gap-y-1 border border-dashed border-slate-300 px-4 py-3">
                        <span className="mono-label text-slate-400">{module.breakBefore.date}</span>
                        <span className="text-[0.9375rem] leading-[1.6] text-slate-500">
                          {module.breakBefore.label}, no lecture
                        </span>
                      </p>
                    )}
                    <div className="mt-5 pb-2">
                      {module.lectures.map((lecture) => (
                        <LectureRow key={`${module.number}-${lecture.date}`} lecture={lecture} />
                      ))}
                    </div>
                  </details>
                  ),
                )}
              </div>
            </article>
          </section>
        </div>
      </div>
    </main>
  );
}
