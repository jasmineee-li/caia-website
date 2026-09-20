"use client";

import { useId, useState } from "react";
import type { NewsItem } from "@/content/news";
import styles from "./NewsArchive.module.css";

export default function NewsArchive({ news }: { news: NewsItem[] }) {
  const id = useId();
  const [preview, setPreview] = useState<NewsItem | null>(null);

  return (
    <nav
      aria-label="News archive"
      className={styles.archive}
      onMouseLeave={() => setPreview(null)}
      onBlur={event => {
        if (!event.currentTarget.contains(event.relatedTarget)) setPreview(null);
      }}
      onKeyDown={event => {
        if (event.key === "Escape") setPreview(null);
      }}
    >
      <p className={styles.label}>News archive <span>({news.length})</span></p>
      <ol className={styles.blocks}>
        {news.map((item, index) => (
          <li key={`${item.date}-${item.title}`}>
            <a
              href={`#${item.date}`}
              className={styles.blockLink}
              data-tone={index % 3}
              aria-label={`${item.displayDate}: ${item.title}`}
              aria-describedby={preview === item ? id : undefined}
              onMouseEnter={() => setPreview(item)}
              onFocus={() => setPreview(item)}
              onClick={() => setPreview(null)}
            ><span aria-hidden="true" /></a>
          </li>
        ))}
      </ol>
      {preview && (
        <div id={id} role="tooltip" className={styles.preview}>
          <time dateTime={preview.date}>{preview.displayDate}</time>
          <p>{preview.title}</p>
        </div>
      )}
    </nav>
  );
}
