import Link from "next/link";
import type { ReactNode } from "react";
import Section from "@/components/ui/Section";

interface Step {
  title: string;
  body: ReactNode;
}

const STEPS: Step[] = [
  {
    title: "Engage",
    body: (
      <>
        We invite everyone to explore how AI can serve people and help build a better future. Our{" "}
        <Link href="/events#events" className="text-link">talks and discussions</Link> bring the Cornell community
        into that conversation, regardless of your background.
      </>
    ),
  },
  {
    title: "Learn",
    body: (
      <>
        Learn technical AI safety and governance through{" "}
        <Link href="/programs/cs1998" className="text-link">CS 1998</Link>, reading groups, and workshops. Our{" "}
        <Link href="/resources" className="text-link">resources</Link> include courses and readings for independent
        study.
      </>
    ),
  },
  {
    title: "Contribute",
    body: (
      <>
        We help members find <Link href="/research" className="text-link">research collaborators</Link>, mentors,
        and <Link href="/resources#opportunities" className="text-link">fellowships</Link> to work on technical AI
        safety and policy.
      </>
    ),
  },
];

/** How far each step sits below the next one on wide screens, so the three rise to the right. */
const RISE = ["lg:mt-24", "lg:mt-12", "lg:mt-0"];

/**
 * Theory of change: Engage, Learn and Contribute rise from left to right like the hero's
 * highlighted path, a red line joining a red dot at the start of each rule. Community
 * runs underneath the three as the ground they stand on.
 */
export default function TheoryOfChange() {
  return (
    <Section id="theory-of-change" eyebrow="Theory of Change">
      <ol className="grid gap-12 md:grid-cols-3 md:gap-8 lg:gap-12">
        {STEPS.map((step, index) => (
          <li key={step.title} className={`relative border-t border-blue pt-6 ${RISE[index]}`}>
            <span aria-hidden="true" className="absolute -left-[3px] -top-[4px] hidden h-[7px] w-[7px] rounded-full bg-brand-red lg:block" />
            {index > 0 && (
              // From the previous step's dot up to this one: one column and one gap to the left, 3rem lower.
              <svg
                aria-hidden="true"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                className="pointer-events-none absolute -top-px right-full hidden h-12 w-[calc(100%+3rem)] overflow-visible lg:block"
              >
                <line x1="0" y1="100" x2="100" y2="0" stroke="var(--color-brand-red, #b31b1b)" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
              </svg>
            )}
            <p className="mono-label text-brand-red">{String(index + 1).padStart(2, "0")}</p>
            <h3 className="display-title mt-4 text-[1.75rem] leading-[1.15] sm:text-[2rem]">{step.title}</h3>
            <p className="mt-5 text-[1.0625rem] leading-[1.7] text-ink-2">{step.body}</p>
          </li>
        ))}
      </ol>

      <div className="mt-16 grid gap-6 border-t border-blue pt-6 sm:mt-20 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-4">
          <p className="mono-label text-brand-red">04</p>
          <h3 className="display-title mt-4 text-[1.75rem] leading-[1.15] sm:text-[2rem]">Community</h3>
        </div>
        <p className="text-[1.0625rem] leading-[1.7] text-ink-2 lg:col-span-8 lg:pt-1">
          Above all, we aim to build trust and community where people exchange ideas, challenge each other’s thinking,
          and work together to make AI go well. We welcome questions, perspectives from all backgrounds, and great
          conversations, both in our discussions and at our{" "}
          <Link href="/events#events" className="text-link">socials</Link>.
        </p>
      </div>
    </Section>
  );
}
