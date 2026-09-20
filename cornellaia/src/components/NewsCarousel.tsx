"use client";

import { useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { NEWS_ITEMS } from "@/content/news";

const news = [...NEWS_ITEMS].sort((a, b) => b.date.localeCompare(a.date));

function NewsExcerpt({ text }: { text: string }) {
  const paragraph = useRef<HTMLParagraphElement>(null);

  useLayoutEffect(() => {
    const element = paragraph.current;
    if (!element) return;
    const words = text.trim().split(/\s+/);
    const fit = () => {
      element.textContent = text;
      if (element.scrollHeight <= element.clientHeight) return;
      let low = 0;
      let high = words.length;
      while (low < high) {
        const middle = Math.ceil((low + high) / 2);
        element.textContent = `${words.slice(0, middle).join(" ")}...`;
        if (element.scrollHeight <= element.clientHeight) low = middle;
        else high = middle - 1;
      }
      element.textContent = `${words.slice(0, low).join(" ")}...`;
    };
    fit();
    const observer = new ResizeObserver(fit);
    observer.observe(element);
    document.fonts.addEventListener("loadingdone", fit);
    return () => {
      observer.disconnect();
      document.fonts.removeEventListener("loadingdone", fit);
    };
  }, [text]);

  return <p ref={paragraph} aria-label={text} className="mb-5 mt-3 min-h-0 flex-1 overflow-hidden text-sm leading-7 text-slate-600 sm:text-base">{text}</p>;
}

export default function NewsCarousel({ showSources = false }: { showSources?: boolean }) {
  const rail = useRef<HTMLDivElement>(null);
  const id = useId();
  const [ends, setEnds] = useState({ start: true, end: false });

  useEffect(() => {
    const element = rail.current;
    if (!element) return;
    const update = () => setEnds({
      start: element.scrollLeft <= 2,
      end: element.scrollLeft + element.clientWidth >= element.scrollWidth - 2,
    });
    const observer = new ResizeObserver(update);
    observer.observe(element);
    element.addEventListener("scroll", update, { passive: true });
    update();
    return () => { observer.disconnect(); element.removeEventListener("scroll", update); };
  }, []);

  function scroll(direction: number) {
    const element = rail.current;
    if (!element) return;
    element.scrollBy({ left: direction * element.clientWidth * 0.85, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
  }

  return <div>
    <div className="mb-5 flex items-center justify-between gap-4">
      <p className="lead-copy">Research and community highlights.</p>
      <div className="flex shrink-0 gap-2">
        {[-1, 1].map(direction => <button key={direction} type="button" onClick={() => scroll(direction)} disabled={direction < 0 ? ends.start : ends.end} aria-label={direction < 0 ? "Previous news" : "More news"} aria-controls={id} className="focus-ring flex h-10 w-10 items-center justify-center rounded-full border border-slate-300 bg-white text-slate-700 transition hover:bg-slate-100 disabled:opacity-30">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true" className={direction < 0 ? "rotate-180" : ""}><path d="M5 12h14m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </button>)}
      </div>
    </div>
    <div id={id} ref={rail} role="region" aria-label="CAIA news, scroll horizontally for more stories" tabIndex={0} className="focus-ring flex snap-x snap-mandatory gap-5 overflow-x-auto pb-5 [scrollbar-color:#cbd5e1_transparent] [scrollbar-width:thin]">
      {news.map(item => <article id={showSources ? item.date : undefined} key={`${item.date}-${item.title}`} className={`flex w-[86%] shrink-0 scroll-mt-28 snap-start flex-col overflow-hidden rounded-xl border border-slate-200 bg-white sm:w-[calc(50%-10px)] lg:w-[calc(33.333%-14px)] ${!showSources ? "h-[32rem]" : ""}`}>
        <div className={`relative w-full shrink-0 overflow-hidden bg-slate-100 ${!showSources ? "h-48 sm:h-52" : "aspect-[3/2]"}`}>
          <Image src={item.imageSrc ?? "/graphics/neural-pathways.svg"} alt={item.imageAlt ?? ""} fill sizes="(max-width: 640px) 86vw, (max-width: 1024px) 45vw, 370px" className="object-cover" loading="lazy" />
        </div>
        <div className="flex min-h-0 flex-1 flex-col p-5">
          <div className="mb-3 flex shrink-0 flex-wrap justify-between gap-2 text-sm text-slate-500"><span>{item.category}</span><time dateTime={item.date}>{item.displayDate}</time></div>
          <h3 className={`shrink-0 text-xl leading-snug ${!showSources ? "line-clamp-3" : ""}`}>{item.title}</h3>
          {!showSources ? <NewsExcerpt text={item.summary} /> : <p className="mb-5 mt-3 text-sm leading-7 text-slate-600 sm:text-base">{item.summary}</p>}
          {!showSources ? <Link href={`/news#${item.date}`} className="mt-auto w-fit shrink-0 text-sm font-semibold underline decoration-slate-400 underline-offset-4">Read update</Link> : <div className="mt-auto text-sm">
            {item.href && <a href={item.href} target="_blank" rel="noopener noreferrer" className="font-semibold underline decoration-slate-400 underline-offset-4">Read more</a>}
            {!!item.links?.length && <details className="group"><summary className="w-fit cursor-pointer font-semibold underline decoration-slate-400 underline-offset-4">Related links ({item.links.length})</summary><ul className="mt-3 space-y-2">{item.links.map(link => <li key={link.href}><a href={link.href} target="_blank" rel="noopener noreferrer" className="text-sm leading-6 underline decoration-slate-300 underline-offset-4">{link.label}</a></li>)}</ul></details>}
          </div>}
        </div>
      </article>)}
    </div>
  </div>;
}
