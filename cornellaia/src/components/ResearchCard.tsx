import { Fragment } from "react";
import Image from "next/image";
import { cn } from "@/lib/cn";
import type { ResearchPaperDetail } from "@/content/research";
import { TopicTags } from "@/components/ui/Tag";
import Arrow from "@/components/ui/Arrow";

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

/** "2026-09" -> "September, 2026" */
function formatMonth(date: string) {
  const [year, month] = date.split("-").map(Number);
  return `${MONTHS[month - 1]}, ${year}`;
}

/** Mono tag style, shared with the research page. */
export const TAG_CLASS = "inline-flex items-center font-mono text-xs uppercase tracking-[0.06em]";

function CaiaLogo() {
  return (
    <Image
      src="/logo.svg"
      alt=""
      aria-hidden="true"
      width={14}
      height={14}
      className="h-3.5 w-3.5 shrink-0"
    />
  );
}

interface ResearchCardProps {
  paper: ResearchPaperDetail;
  /**
   * "compact" (home page): title, CAIA members, and tags.
   * "full" (research page): date, title, tags, summary, and every author.
   */
  variant?: "compact" | "full" | "row";
  className?: string;
}

/** A research entry; the title links to the work. */
export default function ResearchCard({ paper, variant = "full", className }: ResearchCardProps) {
  if (variant === "row") return <ResearchRow paper={paper} className={className} />;
  const compact = variant === "compact";
  const venues = compact && paper.shortTag ? [paper.shortTag] : paper.tags;

  return (
    <article className={cn("group relative grid gap-3 border-b border-slate-200 py-8 sm:grid-cols-12 sm:gap-8 sm:py-10", className)}>
      <div className="space-y-2 sm:col-span-3 sm:pt-1.5">
        <time dateTime={paper.date} className="mono-label block text-slate-500">{formatMonth(paper.date)}</time>
        {venues.map((tag) => (
          <p key={`venue-${tag}`} className="mono-caption">{tag}</p>
        ))}
      </div>
      <div className="sm:col-span-9 lg:col-span-8">
        <h3 className="font-display text-[1.375rem] leading-[1.25] sm:text-[1.75rem]">
          <a
            href={paper.href}
            target="_blank"
            rel="noopener noreferrer"
            className="focus-ring underline decoration-transparent decoration-1 underline-offset-4 transition-colors hover:decoration-slate-400"
          >
            {paper.title}
          </a>
        </h3>
        {!compact && <p className="mt-4 text-[1rem] leading-[1.7] text-slate-600">{paper.summary}</p>}
        <p className="mt-4 text-[0.9375rem] leading-6 text-slate-500">
          {paper.authors.map((author, index) => (
            <Fragment key={`${author.name}-${index}`}>
              {index > 0 ? ", " : ""}
              <span className={author.isCaiaMember ? "inline-flex items-center gap-1 align-middle font-medium text-ink" : ""}>
                {author.isCaiaMember && <CaiaLogo />}
                {author.name}
              </span>
            </Fragment>
          ))}
        </p>
        {paper.topics.length > 0 && <TopicTags topics={paper.topics} className="mt-5" />}
      </div>
    </article>
  );
}

/** Column labels for a list of rows, shown from the small breakpoint up. */
export function ResearchRowHeader() {
  return (
    <div aria-hidden="true" className="mono-caption hidden gap-8 pb-3 sm:grid sm:grid-cols-12">
      <span className="sm:col-span-3">Venue</span>
      <span className="sm:col-span-6">Title</span>
      <span className="flex items-center gap-1.5 sm:col-span-3">
        <CaiaLogo />
        CAIA coauthors
      </span>
    </div>
  );
}

/** One line of a hairline list: venue, title, CAIA coauthors. The whole row links to the work. */
function ResearchRow({ paper, className }: { paper: ResearchPaperDetail; className?: string }) {
  const members = paper.authors.filter((author) => author.isCaiaMember);
  const venue = paper.shortTag ?? paper.tags[0];
  return (
    <article className={cn("group relative grid gap-2 border-b border-slate-200 py-6 sm:grid-cols-12 sm:gap-8 sm:py-7", className)}>
      <p className="mono-label text-slate-500 sm:col-span-3 sm:pt-2">{venue}</p>
      <h3 className="font-display text-[1.25rem] leading-[1.3] sm:col-span-6 sm:text-[1.5rem]">
        <a
          href={paper.href}
          target="_blank"
          rel="noopener noreferrer"
          className="focus-ring after:absolute after:inset-0 after:content-[''] group-hover:underline group-hover:decoration-slate-400 group-hover:decoration-1 group-hover:underline-offset-4"
        >
          {paper.title}
        </a>
      </h3>
      <p className="flex items-start justify-between gap-4 text-[0.9375rem] leading-6 text-slate-600 sm:col-span-3 sm:pt-1">
        <span>
          <span className="sr-only">CAIA coauthors: </span>
          {members.map((member, index) => (
            <Fragment key={member.name}>
              {index > 0 ? ", " : ""}
              <span className="inline-flex items-center gap-1 align-middle">
                {/* Phones have no column header, so each name carries the CAIA mark there. */}
                <span className="sm:hidden"><CaiaLogo /></span>
                {member.name}
              </span>
            </Fragment>
          ))}
        </span>
        <Arrow direction="out" className="mt-1 hidden text-slate-400 transition-colors group-hover:text-ink sm:inline-block" />
      </p>
    </article>
  );
}
