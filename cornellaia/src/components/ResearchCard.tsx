import { Fragment } from "react";
import Image from "next/image";
import { cn } from "@/lib/cn";
import type { ResearchPaperDetail } from "@/content/research";

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

/** "2026-09" -> "September, 2026" */
function formatMonth(date: string) {
  const [year, month] = date.split("-").map(Number);
  return `${MONTHS[month - 1]}, ${year}`;
}

/** Same pill as the site's buttons (see ui/Button), sized down for tags. */
export const TAG_CLASS = "inline-flex items-center rounded-full px-3 py-0.5 text-xs font-medium leading-5";
const VENUE_TAG = `${TAG_CLASS} bg-slate-100 text-slate-900`;
const TOPIC_TAG = `${TAG_CLASS} bg-white text-slate-600 ring-1 ring-inset ring-slate-200`;

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
  variant?: "compact" | "full";
  className?: string;
}

/** A research card; the whole card links to the work. */
export default function ResearchCard({ paper, variant = "full", className }: ResearchCardProps) {
  const compact = variant === "compact";
  const venues = compact && paper.shortTag ? [paper.shortTag] : paper.tags;
  const members = paper.authors.filter((author) => author.isCaiaMember);

  const tags = venues.length + paper.topics.length > 0 && (
    <div className={cn("flex flex-wrap gap-2", compact && "mt-auto pt-5")}>
      {venues.map((tag) => (
        <span key={`venue-${tag}`} className={VENUE_TAG}>
          {tag}
        </span>
      ))}
      {paper.topics.map((topic) => (
        <span key={`topic-${topic}`} className={TOPIC_TAG}>
          {topic}
        </span>
      ))}
    </div>
  );

  return (
    <article
      className={cn(
        "surface-card group/card relative flex h-full flex-col p-5 transition-colors duration-200 hover:border-slate-300 sm:p-6",
        className,
      )}
    >
      {!compact && (
        <time dateTime={paper.date} className="mb-2 block text-sm text-slate-500">
          {formatMonth(paper.date)}
        </time>
      )}

      <h3 className={cn("leading-snug text-slate-900", compact ? "text-xl" : "text-[1.35rem]")}>
        <a
          href={paper.href}
          target="_blank"
          rel="noopener noreferrer"
          className="underline decoration-slate-300 decoration-1 underline-offset-4 transition-colors after:absolute after:inset-0 after:content-[''] group-hover/card:decoration-slate-500"
        >
          {paper.title}
        </a>
      </h3>

      {compact ? (
        members.length > 0 && (
          <p className="mt-3 flex items-start gap-1.5 text-sm leading-6 text-slate-700">
            <span className="mt-[0.3rem]">
              <CaiaLogo />
            </span>
            <span className="font-medium">{members.map((member) => member.name).join(", ")}</span>
          </p>
        )
      ) : (
        <>
          {tags && <div className="mt-4">{tags}</div>}
          <p className="mt-4 text-base leading-7 text-slate-700">{paper.summary}</p>
          <p className="mt-auto pt-5 text-sm leading-6 text-slate-600">
            {paper.authors.map((author, index) => (
              <Fragment key={`${author.name}-${index}`}>
                {index > 0 ? ", " : ""}
                <span className="inline-flex items-center gap-1 align-middle">
                  {author.isCaiaMember && <CaiaLogo />}
                  <span className={author.isCaiaMember ? "font-semibold text-slate-900" : ""}>{author.name}</span>
                </span>
              </Fragment>
            ))}
          </p>
        </>
      )}

      {compact && tags}
    </article>
  );
}
