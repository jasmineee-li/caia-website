import Image from "next/image";
import Link from "next/link";
import { NEWS_ITEMS, type NewsItem } from "@/content/news";

const news = [...NEWS_ITEMS].sort((a, b) => b.date.localeCompare(a.date));

/** Halftone visuals stand in for news without a photo, chosen by category. */
const CATEGORY_VISUAL: Record<NewsItem["category"], string> = {
  Research: "/graphics/halftone/research.webp",
  Event: "/graphics/halftone/events.webp",
  Announcement: "/graphics/halftone/policy-stone.webp",
};

function visualFor(item: NewsItem) {
  const photo = item.imageSrc && !item.imageSrc.startsWith("/graphics/") ? item.imageSrc : null;
  return { src: photo ?? CATEGORY_VISUAL[item.category], alt: photo ? item.imageAlt ?? "" : "" };
}

function NewsCard({ item }: { item: NewsItem }) {
  const visual = visualFor(item);
  return (
    <article className="group relative flex flex-col">
      <div className="relative aspect-[4/3] overflow-hidden rounded-[4px] bg-sky">
        <Image
          src={visual.src}
          alt={visual.alt}
          fill
          sizes="(max-width: 640px) 82vw, (max-width: 1024px) 45vw, 400px"
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02] motion-reduce:transition-none"
          loading="lazy"
        />
      </div>
      <p className="mono-label mt-5 text-slate-500">
        {item.category} · <time dateTime={item.date}>{item.displayDate}</time>
      </p>
      <h3 className="mt-3 font-display text-[1.375rem] leading-[1.25] sm:text-2xl">
        <Link href={`/news#${item.date}`} className="focus-ring after:absolute after:inset-0 after:content-[''] group-hover:underline group-hover:decoration-slate-400 group-hover:decoration-1 group-hover:underline-offset-4">
          {item.title}
        </Link>
      </h3>
      <p className="mt-3 line-clamp-3 text-[0.9375rem] leading-[1.65] text-slate-600">{item.summary}</p>
    </article>
  );
}

/** Newest news: three across on desktop, a sideways rail of six on phones and tablets. */
export default function NewsCarousel() {
  return (
    <>
      <div className="md:hidden">
        <div className="rail" role="region" aria-label="CAIA news, scroll sideways for more">
          {news.slice(0, 6).map((item) => (
            <div key={`${item.date}-${item.title}`} className="w-[82%] sm:w-[46%]">
              <NewsCard item={item} />
            </div>
          ))}
        </div>
      </div>
      <div className="hidden gap-8 md:grid md:grid-cols-3 lg:gap-10">
        {news.slice(0, 3).map((item) => (
          <NewsCard key={`${item.date}-${item.title}`} item={item} />
        ))}
      </div>
    </>
  );
}
