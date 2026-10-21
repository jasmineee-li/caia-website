"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { NAV_ITEMS } from "@/content/navigation";
import { HOME_CTA_ITEMS } from "@/content/home";
import { EVENTS_CALENDAR_URL } from "@/content/events";
import { cn } from "@/lib/cn";

function isRouteActive(pathname: string, href: string) {
  if (href === "/") {
    return pathname === "/";
  }

  return pathname.startsWith(href);
}

const JOIN_HREF = "/join";

const SOCIAL_LINKS = [
  {
    label: "Join our Slack",
    href: HOME_CTA_ITEMS[0].href,
    icon: (
      <svg viewBox="0 0 24 24" width="19" height="19" fill="currentColor" aria-hidden="true">
        <path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zM6.313 15.165a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313zM8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zM8.834 6.313a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312zM18.956 8.834a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834zM17.688 8.834a2.528 2.528 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.522v6.312zM15.165 18.956a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.52-2.522v-2.522h2.52zM15.165 17.688a2.527 2.527 0 0 1-2.52-2.523 2.526 2.526 0 0 1 2.52-2.52h6.313A2.527 2.527 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.523h-6.313z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/cornell.aia/",
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/cornell-ai-alignment",
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="4" />
        <path d="M8 10.5v6M11.5 16.5v-6M11.5 13.3c0-1.7 1.1-2.8 2.5-2.8s2.5 1.1 2.5 2.8v3.2" strokeLinecap="round" />
        <circle cx="8" cy="7.4" r="1.1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: "Events on Luma",
    href: EVENTS_CALENDAR_URL,
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <rect x="3.5" y="5" width="17" height="15.5" rx="2.5" />
        <path d="M3.5 10h17M8 3v4M16 3v4" strokeLinecap="round" />
        <circle cx="12" cy="15" r="1.4" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
];

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const bubbleRefs = useRef<HTMLAnchorElement[]>([]);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!menuOpen) {
      document.body.style.removeProperty("overflow");
      return;
    }
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.removeProperty("overflow");
    };
  }, [menuOpen]);

  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setMenuOpen(false);
    }
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  // The menu items pop in like bubbles, each settling at a slight tilt.
  useEffect(() => {
    const bubbles = bubbleRefs.current.filter(Boolean);
    if (!bubbles.length) return;
    gsap.killTweensOf(bubbles);
    if (menuOpen) {
      gsap.set(bubbles, { scale: 0.7, y: 18, autoAlpha: 0, rotation: 0 });
      gsap.to(bubbles, {
        scale: 1,
        y: 0,
        autoAlpha: 1,
        rotation: (index) => [-4, 3, -2, 4, -3, 2, -1][index % 7] ?? 0,
        duration: 0.44,
        ease: "back.out(1.5)",
        stagger: 0.06,
      });
      return;
    }
    gsap.to(bubbles, {
      scale: 0.76,
      y: 12,
      autoAlpha: 0,
      rotation: 0,
      duration: 0.18,
      ease: "power2.in",
      stagger: { each: 0.03, from: "end" },
    });
  }, [menuOpen]);

  const isActive = (item: (typeof NAV_ITEMS)[number]) =>
    [item.href, ...(item.activePaths ?? [])].some((href) => isRouteActive(pathname, href));

  // The logo already leads home, and Get Involved has its own button.
  const desktopItems = NAV_ITEMS.filter((item) => item.href !== "/" && item.href !== JOIN_HREF);
  const joinItem = NAV_ITEMS.find((item) => item.href === JOIN_HREF);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b",
        // With the menu open, the bar turns to the same grid paper as the menu below it,
        // so the logo and Close sit on one continuous sheet.
        menuOpen ? "grid-paper border-transparent lg:border-slate-200 lg:bg-none" : "border-slate-200 bg-white",
      )}
    >
      <div className="relative z-[60] mx-auto flex h-[68px] w-full max-w-page items-center justify-between px-5 sm:h-[76px] sm:px-8 lg:px-12">
        <Link href="/" prefetch={true} className="focus-ring shrink-0" aria-label="Cornell AI Alignment, home">
          <Image
            src="/serif-logo.svg"
            alt="Cornell AI Alignment"
            width={190}
            height={58}
            priority
            sizes="(max-width: 640px) 140px, 164px"
            className="h-auto w-[140px] sm:w-[164px]"
          />
        </Link>

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Main navigation">
          {desktopItems.map((item) => {
            const active = isActive(item);
            return (
              <Link
                key={item.href}
                href={item.href}
                prefetch={true}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "focus-ring whitespace-nowrap py-1 text-[0.9375rem] underline-offset-[0.45em] transition-colors",
                  active
                    ? "text-ink underline decoration-ink decoration-1"
                    : "text-slate-600 hover:text-ink",
                )}
              >
                {item.label}
              </Link>
            );
          })}
          {joinItem && (
            <Link
              href={joinItem.href}
              prefetch={true}
              aria-current={isActive(joinItem) ? "page" : undefined}
              className="focus-ring ml-2 inline-flex h-10 items-center rounded-[4px] bg-slate-100 px-4 text-[0.9375rem] font-medium text-ink transition-colors hover:bg-slate-200"
            >
              {joinItem.label}
            </Link>
          )}
        </nav>

        <button
          type="button"
          className="focus-ring -mr-2 inline-flex items-center gap-2.5 px-2 py-2 text-[0.9375rem] font-medium text-ink lg:hidden"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-site-nav"
          onClick={() => setMenuOpen((state) => !state)}
        >
          <span aria-hidden="true">{menuOpen ? "Close" : "Menu"}</span>
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
            {menuOpen ? (
              <path d="M3.5 3.5l11 11M14.5 3.5l-11 11" stroke="currentColor" strokeWidth="1.5" />
            ) : (
              <path d="M2 6h14M2 12h14" stroke="currentColor" strokeWidth="1.5" />
            )}
          </svg>
        </button>
      </div>

      <nav
        id="mobile-site-nav"
        inert={!menuOpen}
        aria-label="Mobile navigation"
        className={cn(
          "grid-paper fixed inset-0 z-40 overflow-y-auto transition-opacity duration-200 lg:hidden",
          menuOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0",
        )}
        onClick={() => setMenuOpen(false)}
      >
        <div className="flex min-h-full flex-col items-center px-6 pb-10 pt-[calc(68px+2.5rem)] sm:pt-[calc(76px+2.5rem)]" onClick={(event) => event.stopPropagation()}>
          <div className="flex w-full flex-1 items-center justify-center">
            <div className="grid w-full max-w-[26rem] grid-cols-2 items-center justify-items-center gap-3.5">
              {NAV_ITEMS.map((item, index) => {
                const active = isActive(item);
                const wide = item.href === "/" || item.href === JOIN_HREF;
                return (
                  <Link
                    key={`mobile-${item.href}`}
                    href={item.href}
                    prefetch={true}
                    aria-current={active ? "page" : undefined}
                    ref={(el) => {
                      if (el) bubbleRefs.current[index] = el;
                    }}
                    onClick={() => setMenuOpen(false)}
                    className={cn(
                      "focus-ring inline-flex h-[5.15rem] items-center justify-center whitespace-nowrap rounded-[2.65rem] border border-slate-300 px-3 text-center text-[1.5rem] font-medium transition-colors",
                      wide ? "col-span-2 min-w-[9.7rem] px-5" : "w-full min-w-0",
                      item.href === JOIN_HREF && "underline decoration-slate-400 decoration-wavy decoration-1 underline-offset-[6px]",
                      active ? "bg-red-50 text-brand-red" : "bg-white text-ink hover:bg-slate-50",
                    )}
                  >
                    <span>{item.label.toLowerCase()}</span>
                  </Link>
                );
              })}
            </div>
          </div>

          <ul className="mt-10 flex items-center justify-center gap-3" aria-label="Cornell AI Alignment elsewhere">
            {SOCIAL_LINKS.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${link.label} (opens in a new tab)`}
                  title={link.label}
                  className="focus-ring grid h-12 w-12 place-items-center rounded-full border border-slate-300 bg-white text-ink transition-colors hover:border-blue hover:text-blue"
                >
                  {link.icon}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  );
}
