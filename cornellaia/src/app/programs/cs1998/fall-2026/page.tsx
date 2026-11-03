import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import ProfileCard from "@/components/ProfileCard";
import { createPageMetadata, SITE_URL } from "@/content/seo";
import JsonLd from "@/components/JsonLd";
import {
  FALL_2026_CALENDAR_EMBED_URL,
  FALL_2026_STAFF,
  FALL_2026_WEEKS,
  type MaterialItem,
  type WeekMaterials,
} from "@/content/cs1998/fall-2026";

const COURSE_PATH = "/programs/cs1998/fall-2026";
const COURSE_URL = new URL(COURSE_PATH, SITE_URL).toString();
const COURSE_CALENDAR_EMBED_URL = FALL_2026_CALENDAR_EMBED_URL;
const COURSE_WEEKS = FALL_2026_WEEKS;
const COURSE_STAFF = FALL_2026_STAFF;


const COURSE_DESCRIPTION =
  "Archived materials from the Fall 2026 offering of Cornell’s CS 1998 AI Safety and Alignment course: slides, readings and hands-on notebooks, kept openly available.";

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
    name: "Fall 2026 (archived)",
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
  title: "CS 1998 · Fall 2026 Archive",
  description: COURSE_DESCRIPTION,
  path: COURSE_PATH,
  keywords: [
    "CS 1998",
    "AI Safety course",
    "AI Alignment course",
    "Cornell student-led course",
    "Fall 2026",
    "course archive",
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
                <p className="mono-label text-blue">Archive · Fall 2026</p>
                <h1 className="display-title text-[2.75rem] leading-[1.02] sm:text-[4.25rem] lg:text-[4.5rem]">
                  CS 1998: Intro to AI Safety &amp; Alignment
                </h1>
                <p className="mono-caption text-[0.9375rem] !text-ink-2">
                  1 credit · 7 weeks, first half · S/U grading · This offering has ended
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
          <section aria-label="Archived offering" className="mt-14 sm:mt-16">
            <article className="rounded-[8px] bg-panel p-6 sm:p-8">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                <div className="min-w-0">
                  <h2 className="display-title text-[2rem] leading-[1.1] sm:text-[2.75rem]">
                    This is the Fall 2026 archive
                  </h2>
                  <p className="mt-2 max-w-2xl text-[1rem] leading-[1.75] text-slate-600">
                    The course ran for the first time in Fall 2026. Everything below stays
                    openly available, but the schedule, grading and syllabus have since changed.
                  </p>
                </div>
                <Link
                  href="/programs/cs1998"
                  className="focus-ring shrink-0 text-link text-[0.9375rem]"
                >
                  Go to the current offering
                </Link>
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
                <li>This was a 1-credit, 7-week, first-half S/U course.</li>
                <li>Location: Phillips Hall 203.</li>
                <li>
                  Lectures were held on Fridays, with paper discussions on Mondays.
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
