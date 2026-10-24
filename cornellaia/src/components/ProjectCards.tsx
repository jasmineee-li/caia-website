"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import ApplicationButton from "@/components/ApplicationButton";
import HalftoneField from "@/components/ui/HalftoneField";
import { TopicTags } from "@/components/ui/Tag";
import type { TeamProject } from "@/content/opportunities";

/** A project's topic tags, or a quiet label while its topic is still being decided. */
function ProjectTopics({ topics, className }: { topics: string[]; className?: string }) {
  if (topics.length === 0) return <p className={`mono-label text-slate-500 ${className ?? ""}`}>Coming soon</p>;
  return <TopicTags topics={topics} className={className} />;
}

interface ProjectCardsProps {
  projects: TeamProject[];
  /** The research team application, or null while it is not open yet. */
  applyHref: string | null;
}

/**
 * This semester's research team projects as cards. Each card opens a dialog with the
 * full description, the mentors and the application.
 */
export default function ProjectCards({ projects, applyHref }: ProjectCardsProps) {
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const [active, setActive] = useState<TeamProject | null>(null);

  const open = (project: TeamProject) => {
    setActive(project);
    dialogRef.current?.showModal();
  };
  const close = () => dialogRef.current?.close();

  return (
    <>
      <div className="grid gap-3 sm:gap-4 md:grid-cols-2">
        {projects.map((project) => (
          <article
            key={project.title}
            className="group relative flex min-h-[16rem] flex-col rounded-[8px] bg-panel p-6 transition-[background-color,box-shadow] duration-200 hover:bg-white hover:shadow-[inset_0_0_0_1px_var(--rule)] focus-within:bg-white has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-blue sm:min-h-[18rem] sm:p-8"
          >
            <div className="flex items-start justify-between gap-6">
              <ProjectTopics topics={project.topics} />
              <span
                aria-hidden="true"
                className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white text-ink transition-colors duration-200 group-hover:bg-blue group-hover:text-white"
              >
                <svg viewBox="0 0 14 14" className="h-3.5 w-3.5" fill="none">
                  <path d="M7 1.5v11M1.5 7h11" stroke="currentColor" strokeWidth="1.4" strokeLinecap="square" />
                </svg>
              </span>
            </div>
            <h3 className="mt-5 font-display text-[1.5rem] leading-[1.2] sm:text-[1.75rem]">
              <button
                type="button"
                onClick={() => open(project)}
                aria-haspopup="dialog"
                className="text-left after:absolute after:inset-0 after:rounded-[8px] focus-visible:outline-none"
              >
                {project.title}
              </button>
            </h3>
            <p className="mt-4 line-clamp-3 text-[0.9375rem] leading-[1.65] text-slate-600">{project.summary}</p>
            <p className="mono-caption mt-auto pt-6">
              {project.mentors.length > 1 ? "Mentors" : "Mentor"} · {project.mentors.map((mentor) => mentor.name).join(", ")}
            </p>
          </article>
        ))}

        <article className="flex min-h-[16rem] flex-col rounded-[8px] border border-dashed border-slate-300 p-6 sm:min-h-[18rem] sm:p-8">
          <p className="mono-label text-slate-500">Coming soon</p>
          <h3 className="mt-5 font-display text-[1.5rem] leading-[1.2] text-slate-500 sm:text-[1.75rem]">More Projects</h3>
          <p className="mt-4 text-[0.9375rem] leading-[1.65] text-slate-600">
            We’re still finalizing this semester’s projects. Have an idea of your own? Tell us about it in your
            application.
          </p>
        </article>
      </div>

      <dialog
        ref={dialogRef}
        aria-labelledby="project-dialog-title"
        onClose={() => setActive(null)}
        onClick={(event) => {
          if (event.target === dialogRef.current) close();
        }}
        className="m-auto w-[min(42rem,calc(100vw-2rem))] max-h-[calc(100dvh-2rem)] overflow-y-auto rounded-[8px] bg-white p-0 text-ink backdrop:bg-[rgba(20,19,19,0.45)]"
      >
        {active && (
          <div>
            <div className="grid-paper relative isolate overflow-hidden border-b border-grid px-6 pb-8 pt-6 sm:px-10 sm:pb-10 sm:pt-8">
              <HalftoneField color="#0c4da2" className="absolute inset-y-0 right-0 -z-10 w-[45%]" />
              <div className="flex items-start justify-between gap-6">
                <ProjectTopics topics={active.topics} className="pt-1.5" />
                <button
                  type="button"
                  onClick={close}
                  className="focus-ring grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white text-ink transition-colors hover:bg-blue hover:text-white"
                >
                  <span className="sr-only">Close</span>
                  <svg viewBox="0 0 14 14" className="h-3.5 w-3.5" fill="none" aria-hidden="true">
                    <path d="M2.5 2.5l9 9M11.5 2.5l-9 9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="square" />
                  </svg>
                </button>
              </div>
              <h3 id="project-dialog-title" className="display-title mt-6 max-w-[30rem] text-[2rem] leading-[1.1] sm:text-[2.5rem]">
                {active.title}
              </h3>
            </div>
            <div className="px-6 pb-8 pt-7 sm:px-10 sm:pb-10">
              <div className="space-y-4 text-[1.0625rem] leading-[1.7] text-slate-600">
                {(active.details ?? [active.summary]).map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
              <div className="mt-8 border-t border-slate-200 pt-5">
                <h4 className="mono-label text-slate-500">{active.mentors.length > 1 ? "Mentors" : "Mentor"}</h4>
                <ul className="mt-4 space-y-4">
                  {active.mentors.map((mentor) => (
                    <li key={mentor.name} className="flex items-start gap-4">
                      {mentor.imageSrc ? (
                        <Image
                          src={mentor.imageSrc}
                          alt=""
                          width={112}
                          height={112}
                          className="h-14 w-14 shrink-0 rounded-[4px] bg-panel object-cover"
                        />
                      ) : (
                        <span aria-hidden="true" className="grid h-14 w-14 shrink-0 place-items-center rounded-[4px] bg-panel font-display text-[1.25rem] text-slate-500">
                          {mentor.name.charAt(0)}
                        </span>
                      )}
                      <div className="min-w-0 pt-0.5">
                        <p className="font-display text-[1.125rem] leading-[1.3] text-ink">
                          {mentor.href ? (
                            <a href={mentor.href} target="_blank" rel="noopener noreferrer" className="text-link">
                              {mentor.name}
                            </a>
                          ) : (
                            mentor.name
                          )}
                        </p>
                        <p className="mt-1 text-[0.9375rem] leading-[1.55] text-slate-600">{mentor.position}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-8">
                <ApplicationButton href={applyHref} label="Apply to the Research Team" />
              </div>
            </div>
          </div>
        )}
      </dialog>
    </>
  );
}
