import Image from "next/image";
import Card from "@/components/ui/Card";
import MotionReveal from "@/components/ui/MotionReveal";
import Section from "@/components/ui/Section";
import Badge from "@/components/ui/Badge";
import { NEWS_ITEMS } from "@/content/news";

export default function NewsPage() {
  const chronologicalNews = [...NEWS_ITEMS].sort((a, b) => b.date.localeCompare(a.date));

  return (
    <main>
      <Section
        title="News"
        subtitle="Updates from Cornell AI Alignment."
      >
        <div className="space-y-6">
          {chronologicalNews.map((item, index) => (
            <MotionReveal
              key={`${item.title}-${item.date}`}
              delayClass={index > 0 ? "motion-delay-1" : undefined}
            >
              <Card className="space-y-4">
                {item.imageSrc && (
                  <div className="relative overflow-hidden rounded-lg border border-slate-200">
                    <Image
                      src={item.imageSrc}
                      alt={item.imageAlt || item.title}
                      width={1200}
                      height={760}
                      className="h-auto w-full object-cover"
                    />
                  </div>
                )}

                <div className="flex flex-wrap items-center gap-3">
                  <Badge>{item.category}</Badge>
                  <time dateTime={item.date} className="text-sm text-slate-500">
                    {item.displayDate}
                  </time>
                </div>

                <h3 className="text-2xl font-semibold text-slate-900">{item.title}</h3>
                <p className="text-slate-700">{item.summary}</p>

                {item.href && (
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex text-sm font-semibold text-brand-red underline decoration-brand-red/35 underline-offset-4 hover:text-brand-red-strong"
                  >
                    Read update
                  </a>
                )}

                {item.links && item.links.length > 0 && (
                  <div className="flex flex-wrap gap-3">
                    {item.links.map((link) => (
                      <a
                        key={`${item.title}-${link.label}`}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex text-sm font-semibold text-brand-red underline decoration-brand-red/35 underline-offset-4 hover:text-brand-red-strong"
                      >
                        {link.label}
                      </a>
                    ))}
                  </div>
                )}
              </Card>
            </MotionReveal>
          ))}
        </div>
      </Section>
    </main>
  );
}
