import Link from "next/link";
import PageHeader from "@/components/ui/PageHeader";
import Section from "@/components/ui/Section";
import ResourceLibrary from "@/components/ResourceLibrary";
import { ONLINE_COURSES, INTENSIVES, FELLOWSHIP_GROUPS } from "@/content/learning";
import { createPageMetadata } from "@/content/seo";

export const metadata = createPageMetadata({
  title: "Resources", path: "/resources",
  description: "Explore AI safety and governance courses, readings, fellowships, and training, with Cornell programs and a library of papers, articles, and videos.",
});
const linkStyle = "text-link";
const organizationLinks: Record<string, string> = {
  "BlueDot Impact": "https://bluedot.org/",
  CBAI: "https://www.cbai.ai/",
  ARENA: "https://www.arena.education/",
  Anthropic: "https://www.anthropic.com/",
  Constellation: "https://constellation.org/",
  Astra: "https://constellation.org/programs/astra",
  Kairos: "https://kairos-project.org/",
  RAND: "https://www.rand.org/",
  "UC Berkeley": "https://www.berkeley.edu/",
};

function LinkedOrganizations({ text }: { text: string }) {
  return text.split(/\b(BlueDot Impact|CBAI|ARENA|Anthropic|Constellation|Astra|Kairos|RAND|UC Berkeley)\b/g).map((part, index) =>
    organizationLinks[part]
      ? <a key={index} href={organizationLinks[part]} target="_blank" rel="noopener noreferrer" className={linkStyle}>{part}</a>
      : part
  );
}

export default function ResourcesPage() {
  return <main>
    <PageHeader title="Resources" lead={<p>Courses, readings, and fellowships in AI safety and governance.</p>} />

    <Section id="learn" title="Get Started" className="pt-16 sm:pt-20 lg:pt-24">
      <div className="max-w-3xl space-y-5 text-[1.0625rem] leading-[1.75] text-slate-600">
        <p>At Cornell, you can start with <Link href="/programs/cs1998" className={linkStyle}>CS 1998</Link> and our <Link href="/events#events" className={linkStyle}>reading groups and workshops</Link>. You can learn about AI safety with other students or study independently using our public course materials.</p>
        <p><LinkedOrganizations text="BlueDot Impact" /> runs facilitated online courses in {ONLINE_COURSES.map((course, i) => <span key={course.href}>{i > 0 ? i === ONLINE_COURSES.length - 1 ? ", and " : ", " : ""}<a href={course.href} target="_blank" rel="noopener noreferrer" className={linkStyle}>{course.title.replace(/^./, letter => letter.toLowerCase()).replace("Safety", "safety").replace("Governance", "governance")}</a></span>)}. You can study the core ideas through readings, exercises, and discussions with a cohort.</p>
        {INTENSIVES.map(program => <p key={program.href}><a href={program.href} target="_blank" rel="noopener noreferrer" className={linkStyle}>{program.title}</a> <LinkedOrganizations text={program.description} />{program.title === "ARENA" && <> Explore the <a href="https://learn.arena.education/" target="_blank" rel="noopener noreferrer" className={linkStyle}>self-study notebooks</a>.</>}</p>)}
      </div>
    </Section>

    <Section id="opportunities" title="Fellowships &amp; Training">
      <p className="max-w-3xl text-[1.0625rem] leading-[1.75] text-slate-600">You can explore opportunities in research, policy, community building, and starting new organizations. You’ll find eligibility, locations, and application dates on each program’s website.</p>
      <div className="mt-10 divide-y divide-slate-200 border-y border-blue">
        {FELLOWSHIP_GROUPS.map(group => <details key={group.title} className="group py-6">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-[1.375rem] leading-[1.25] sm:text-[1.625rem] [&::-webkit-details-marker]:hidden">{group.title}<span aria-hidden="true" className="text-xl text-slate-400 transition-transform group-open:rotate-45">+</span></summary>
          <ul className="max-w-3xl space-y-3 pt-5 text-base leading-7 text-slate-600">{group.items.map(item => <li key={item.title}><a href={item.href} target="_blank" rel="noopener noreferrer" className={linkStyle}>{item.title}</a>. <LinkedOrganizations text={item.note} /></li>)}</ul>
        </details>)}
      </div>
    </Section>

    <Section id="library" title="Library" subtitle="Papers, articles, videos and curricula, by topic.">
      <ResourceLibrary />
    </Section>
  </main>;
}
