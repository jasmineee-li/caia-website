"use client";

import { useId, useLayoutEffect, useMemo, useRef, useState } from "react";
import { LIBRARY_RESOURCES, type LibraryResource } from "@/content/learning";
import { LIBRARY_FOLDERS, locationFor, searchLibrary } from "@/lib/library";
import styles from "./ResourceLibrary.module.css";

const formats = [...new Set(LIBRARY_RESOURCES.map(item => item.format))].sort();
const resourceCount = (count: number) => `${count} ${count === 1 ? "resource" : "resources"}`;
type View = "folders" | "list";

function FolderIcon() {
  return <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M3 7V5a1 1 0 0 1 1-1h6l2 3h8a1 1 0 0 1 1 1v11a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V7Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /></svg>;
}

function BookIcon() {
  return <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 5c-3-2-6-2-9-1v15c3-1 6-1 9 1 3-2 6-2 9-1V4c-3-1-6-1-9 1Zm0 0v15" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /></svg>;
}

function FolderCard({ title, description, count, tone, onClick }: { title: string; description?: string; count: number; tone: number; onClick: () => void }) {
  return <button type="button" className={styles.folderCard} data-tone={tone % 6} onClick={onClick} aria-label={`Open ${title}, ${resourceCount(count)}`}>
    <span className={styles.folderObject} aria-hidden="true">
      <span className={styles.folderBack} />
      <span className={styles.paperOne}><span /><span /><span /></span>
      <span className={styles.paperTwo} />
      <span className={styles.folderFront}><span>{count} {count === 1 ? "item" : "items"}</span></span>
    </span>
    <span className={styles.folderTitle}>{title}</span>
    {description && <span className={styles.folderDescription}>{description}</span>}
  </button>;
}

function ResourceRows({ items }: { items: LibraryResource[] }) {
  return <ul className={styles.resourceRows}>{items.map(item => <li key={item.href}>
    <div className={styles.resourceCopy}><a href={item.href} target="_blank" rel="noopener noreferrer">{item.title}<span className="sr-only"> (opens in a new tab)</span></a><p>{item.note}</p></div>
    <span className={styles.format}>{item.format}</span>
  </li>)}</ul>;
}

export default function ResourceLibrary() {
  const id = useId();
  const [view, setView] = useState<View>("folders");
  const [query, setQuery] = useState("");
  const [format, setFormat] = useState("");
  const [path, setPath] = useState<string[]>([]);
  const [limit, setLimit] = useState(18);
  const [expanded, setExpanded] = useState(false);
  const frame = useRef<HTMLDivElement>(null);
  const panel = useRef<HTMLDialogElement>(null);
  const expandButton = useRef<HTMLButtonElement>(null);
  const origin = useRef<DOMRect | null>(null);
  const pagePosition = useRef({ x: 0, y: 0 });
  const animation = useRef<Animation | null>(null);
  const closing = useRef(false);
  const content = useRef<HTMLDivElement>(null);
  const heading = useRef<HTMLHeadingElement>(null);

  function animatePanel(from: DOMRect, to: DOMRect, holdFinalFrame = false) {
    const bounds = (rect: DOMRect) => ({ top: `${rect.top}px`, left: `${rect.left}px`, width: `${rect.width}px`, height: `${rect.height}px` });
    return panel.current!.animate([bounds(from), bounds(to)], {
      duration: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 320,
      easing: "cubic-bezier(0.22, 1, 0.36, 1)",
      // Keep the closing geometry until React commits the inline layout.
      fill: holdFinalFrame ? "forwards" : "none",
    });
  }

  useLayoutEffect(() => {
    if (!expanded || !panel.current || !frame.current || !origin.current) return;
    const dialog = panel.current;
    const placeholder = frame.current;
    const previousOverflow = document.body.style.overflow;
    const previousPadding = document.body.style.paddingRight;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    const bodyPadding = parseFloat(getComputedStyle(document.body).paddingRight) || 0;
    document.body.style.paddingRight = `${bodyPadding + scrollbarWidth}px`;
    document.body.style.overflow = "hidden";
    // Promote the same DOM to the top layer, keeping folders, filters, and inputs intact.
    dialog.close();
    dialog.showModal();
    expandButton.current?.focus({ preventScroll: true });
    animation.current = animatePanel(origin.current, dialog.getBoundingClientRect());
    return () => {
      animation.current?.cancel();
      animation.current = null;
      dialog.close();
      dialog.open = true;
      placeholder.style.height = "";
      document.body.style.overflow = previousOverflow;
      document.body.style.paddingRight = previousPadding;
      closing.current = false;
      if (dialog.isConnected) {
        window.scrollTo({ left: pagePosition.current.x, top: pagePosition.current.y, behavior: "instant" });
        expandButton.current?.focus({ preventScroll: true });
      }
    };
  }, [expanded]);

  function collapse() {
    if (!expanded || closing.current || !panel.current || !frame.current) return;
    closing.current = true;
    const from = panel.current.getBoundingClientRect();
    animation.current?.cancel();
    animation.current = animatePanel(from, frame.current.getBoundingClientRect(), true);
    animation.current.finished.then(() => setExpanded(false), () => {});
  }

  function toggleExpanded() {
    if (expanded) { collapse(); return; }
    if (!panel.current || !frame.current) return;
    origin.current = panel.current.getBoundingClientRect();
    pagePosition.current = { x: window.scrollX, y: window.scrollY };
    // Reserve space before React moves the panel out of flow, avoiding scroll clamping.
    frame.current.style.height = `${origin.current.height}px`;
    setExpanded(true);
  }
  const folder = LIBRARY_FOLDERS.find(item => item.id === path[0]);
  const filtered = useMemo(() => searchLibrary(LIBRARY_RESOURCES, query, format), [query, format]);
  const results = filtered.filter(item => {
    const [parent, child] = locationFor(item);
    return (!path[0] || parent === path[0]) && (!path[1] || child === path[1]);
  });
  const collectionItems = filtered.filter(item => !path[0] || locationFor(item)[0] === path[0]);
  const subfolders = [...new Set(collectionItems.map(item => locationFor(item)[1]))].sort();
  const searching = Boolean(query.trim() || format);
  const title = path[1] ?? folder?.title ?? "All collections";

  function resetScroll() { if (content.current) content.current.scrollTop = 0; }
  function navigate(next: string[]) {
    setPath(next);
    setLimit(18);
    resetScroll();
    heading.current?.focus({ preventScroll: true });
  }
  function clear() { setQuery(""); setFormat(""); setLimit(18); resetScroll(); }

  return <div ref={frame}>
    <dialog ref={panel} open className={`${styles.desktop}${expanded ? ` ${styles.expanded}` : ""}`} role={expanded ? "dialog" : "region"} aria-label="Resource library" aria-modal={expanded || undefined} onCancel={event => { event.preventDefault(); collapse(); }}>
    <div className={styles.readingRoom}>
      <header className={styles.header}>
        <div className={styles.headingRow}>
          <div><h3 ref={heading} tabIndex={-1}>{title}</h3><p role="status" aria-live="polite">{resourceCount(results.length)}{searching ? " matched" : " to explore"}</p></div>
          <div className={styles.headerActions}>
          <div className={styles.viewSwitch} role="group" aria-label="Library view">
            <button type="button" aria-label="Folders" title="Folders" aria-pressed={view === "folders"} onClick={() => { setView("folders"); resetScroll(); }}><svg viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M3 3h5v5H3zM12 3h5v5h-5zM3 12h5v5H3zM12 12h5v5h-5z" stroke="currentColor" strokeWidth="1.3" /></svg><span>Folders</span></button>
            <button type="button" aria-label="List" title="List" aria-pressed={view === "list"} onClick={() => { setView("list"); resetScroll(); }}><svg viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M7 4h10M7 10h10M7 16h10M3 4h.1M3 10h.1M3 16h.1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg><span>List</span></button>
          </div>
          <button ref={expandButton} type="button" className={styles.expandButton} onClick={toggleExpanded} aria-label={expanded ? "Collapse library" : "Expand library"} title={expanded ? "Collapse library (Esc)" : "Expand library"} aria-expanded={expanded}>
            <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path d={expanded ? "M3 7h4V3M7 7 2.5 2.5M17 13h-4v4M13 13l4.5 4.5" : "M7 3H3v4M3 3l4.5 4.5M13 17h4v-4M17 17l-4.5-4.5"} stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          </div>
        </div>
        <div className={styles.tools}>
          <label className={styles.search}><span className="sr-only">Search the library</span><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="10" cy="10" r="6.5" stroke="currentColor" strokeWidth="1.5" /><path d="m15 15 5 5" stroke="currentColor" strokeWidth="1.5" /></svg><input type="search" value={query} onChange={e => { setQuery(e.target.value); setLimit(18); resetScroll(); }} placeholder="Search titles, authors, or ideas" /></label>
          <label htmlFor={`${id}-format`} className="sr-only">Resource format</label>
          <select id={`${id}-format`} value={format} onChange={e => { setFormat(e.target.value); setLimit(18); resetScroll(); }}><option value="">All formats</option>{formats.map(value => <option key={value}>{value}</option>)}</select>
        </div>
      </header>
      <div className={styles.locationBar}>
        <nav aria-label="Library folders"><button type="button" onClick={() => navigate([])} aria-current={!path.length ? "location" : undefined}>Library</button>{folder && <><span aria-hidden="true">/</span><button type="button" onClick={() => navigate([folder.id])} aria-current={path.length === 1 ? "location" : undefined}>{folder.title}</button></>}{path[1] && <><span aria-hidden="true">/</span><span aria-current="location">{path[1]}</span></>}</nav>
        {searching && <button type="button" className={styles.clear} onClick={clear}>Clear filters</button>}
      </div>

      <div ref={content} className={styles.workspace} role="region" aria-label="Library contents" tabIndex={0}>
        {!results.length ? <div className={styles.empty}><BookIcon /><h4>No resources found</h4><p>Try another keyword or clear your filters.</p><button type="button" onClick={clear}>Clear filters</button>{path.length > 0 && <button type="button" onClick={() => navigate([])}>Search all collections</button>}</div>
          : view === "list" ? <div className={styles.accordions} key={`${query}-${format}-${path.join("/")}`}>
            {LIBRARY_FOLDERS.map(parent => {
              const items = results.filter(item => locationFor(item)[0] === parent.id);
              if (!items.length) return null;
              const children = [...new Set(items.map(item => locationFor(item)[1]))].sort();
              return <details key={parent.id} open={searching || !!path[0] || undefined}>
                <summary><FolderIcon /><span>{parent.title}</span><span className={styles.count}>{items.length}</span><span className={styles.chevron} aria-hidden="true">⌄</span></summary>
                <div className={styles.subAccordions}>{children.map(child => <details key={child} open={searching || !!path[1] || undefined}><summary><FolderIcon /><span>{child}</span><span className={styles.count}>{items.filter(item => locationFor(item)[1] === child).length}</span><span className={styles.chevron} aria-hidden="true">⌄</span></summary><ResourceRows items={items.filter(item => locationFor(item)[1] === child)} /></details>)}</div>
              </details>;
            })}
          </div>
          : searching || path.length === 2 ? <><ResourceRows items={results.slice(0, limit)} />{results.length > limit && <button type="button" className={styles.more} onClick={() => setLimit(n => n + 18)}>Show more resources <span>({results.length - limit} remaining)</span></button>}</>
          : <div className={styles.folderGrid}>{!path.length ? LIBRARY_FOLDERS.map((parent, index) => <FolderCard key={parent.id} tone={index} title={parent.title} description={parent.description} count={results.filter(item => locationFor(item)[0] === parent.id).length} onClick={() => navigate([parent.id])} />) : subfolders.map((child, index) => <FolderCard key={child} tone={index} title={child} count={results.filter(item => locationFor(item)[1] === child).length} onClick={() => navigate([path[0], child])} />)}</div>}

      </div>
      <p className={styles.credit}>Curated by CAIA</p>
    </div>
    </dialog>
  </div>;
}
