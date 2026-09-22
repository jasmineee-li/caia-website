import Image from "next/image";
import Container from "@/components/ui/Container";
import NewsArchive from "@/components/NewsArchive";
import { NEWS_ITEMS } from "@/content/news";
import { createPageMetadata } from "@/content/seo";
import styles from "./news.module.css";

export const metadata = createPageMetadata({
  title: "News",
  path: "/news",
  description: "Read Cornell AI Alignment updates on research publications, program announcements, member news, and AI safety community events.",
});

export default function NewsPage() {
  const news = [...NEWS_ITEMS].sort((a, b) => b.date.localeCompare(a.date));
  const linkStyle = "font-semibold text-brand-red underline decoration-brand-red/35 underline-offset-4 transition hover:text-brand-red-strong hover:decoration-brand-red";

  return (
    <main>
      <Container className="pt-14 sm:pt-20">
        <div className={styles.layout}>
        <div className={styles.intro}>
        <h1 className="display-title text-4xl sm:text-5xl">News</h1>
        <p className="lead-copy mt-5 max-w-2xl">Research publications, program announcements, and member news.</p>
        </div>
        <aside className={styles.index}><NewsArchive news={news} /></aside>
        <ol aria-label="News updates, newest first" className={`${styles.feed} list-none space-y-12 sm:space-y-16`}>
          {news.map(item => (
            <li key={`${item.date}-${item.title}`}>
              <article id={item.date} aria-labelledby={`news-${item.date}`} className="scroll-mt-28">
                  <time dateTime={item.date} className="block text-sm text-slate-500 sm:text-base">{item.displayDate}</time>
                  <h2 id={`news-${item.date}`} className="mt-3 text-2xl leading-snug text-black underline decoration-wavy decoration-slate-400 decoration-1 underline-offset-4 sm:text-3xl">{item.title}</h2>
                  {item.imageSrc?.startsWith("/news/") && (
                    <Image src={item.imageSrc} alt={item.imageAlt ?? ""} width={360} height={240} sizes="(max-width: 400px) calc(100vw - 32px), 360px" className="mt-6 h-auto w-full max-w-[360px]" />
                  )}
                  <p className="mt-5 text-base leading-7 text-slate-700 sm:text-lg sm:leading-8">{item.summary}</p>
                  {item.href && (
                    <a href={item.href} target="_blank" rel="noopener noreferrer" className={`mt-4 inline-block text-base ${linkStyle}`}>Read more<span className="sr-only"> about {item.title} (opens in a new tab)</span></a>
                  )}
                  {!!item.links?.length && (
                    <ul aria-label={`Links for ${item.title}`} className="mt-4 list-none space-y-2 text-base leading-6 text-slate-700">
                      {item.links.map(link => (
                        <li key={link.href}><a href={link.href} target="_blank" rel="noopener noreferrer" className={linkStyle}>{link.label}<span className="sr-only"> (opens in a new tab)</span></a></li>
                      ))}
                    </ul>
                  )}
              </article>
            </li>
          ))}
        </ol>
        </div>
      </Container>
    </main>
  );
}
