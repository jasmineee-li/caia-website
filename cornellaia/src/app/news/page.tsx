import Image from "next/image";
import Container from "@/components/ui/Container";
import PageHeader from "@/components/ui/PageHeader";
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
  const linkStyle = "text-link";

  return (
    <main>
      <PageHeader
        title="News"
        lead={<p>Updates from CAIA, including new papers, program announcements, and what our members have been up to.</p>}
      />
      <Container className="pt-12 sm:pt-16 lg:pt-20">
        <div className={styles.layout}>
        <aside className={styles.index}><NewsArchive news={news} /></aside>
        <ol aria-label="News updates, newest first" className={`${styles.feed} list-none border-t border-blue`}>
          {news.map(item => (
            <li key={`${item.date}-${item.title}`} className="border-b border-slate-200 py-10 sm:py-14">
              <article id={item.date} aria-labelledby={`news-${item.date}`} className="scroll-mt-28">
                  <p className="mono-label text-slate-500">{item.category} · <time dateTime={item.date}>{item.displayDate}</time></p>
                  <h2 id={`news-${item.date}`} className="mt-4 font-display text-[1.75rem] leading-[1.2] sm:text-[2.25rem]">{item.title}</h2>
                  {item.imageSrc?.startsWith("/news/") && (
                    <Image src={item.imageSrc} alt={item.imageAlt ?? ""} width={560} height={373} sizes="(max-width: 600px) calc(100vw - 40px), 560px" className="mt-8 h-auto w-full max-w-[560px] rounded-[4px]" />
                  )}
                  <p className="mt-6 max-w-2xl text-[1.0625rem] leading-[1.7] text-slate-600">{item.summary}</p>
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
