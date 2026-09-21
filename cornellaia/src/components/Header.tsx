"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { NAV_ITEMS } from "@/content/navigation";
import { cn } from "@/lib/cn";
import styles from "./Header.module.css";

function isRouteActive(pathname: string, href: string) {
  if (href === "/") {
    return pathname === "/";
  }

  return pathname.startsWith(href);
}

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
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    }

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

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

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/95">
      <div className="relative z-[60] mx-auto flex w-full max-w-page items-center justify-between px-4 py-4 sm:px-6 lg:pl-8 lg:pr-0">
        <Link href="/" prefetch={true} className="focus-ring rounded-md">
          <Image
            src="/serif-logo.svg"
            alt="Cornell AI Alignment Club"
            width={190}
            height={58}
            priority
            sizes="(max-width: 640px) 150px, 182px"
            className="h-auto w-[150px] sm:w-[182px]"
          />
        </Link>

        <nav className="hidden items-center gap-2 lg:flex" aria-label="Main navigation">
          {NAV_ITEMS.map((item) => {
            const active = [item.href, ...(item.activePaths ?? [])].some(href => isRouteActive(pathname, href));

            return (
              <Link
                key={item.href}
                href={item.href}
                prefetch={true}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "focus-ring relative rounded-full px-4 py-2.5 text-sm font-medium",
                  styles.navLink,
                  item.href === "/join" && "ml-5 underline decoration-slate-400 decoration-wavy decoration-1 underline-offset-[6px] before:absolute before:-left-3 before:top-1/2 before:-translate-y-1/2 before:font-normal before:text-slate-300 before:content-['/']",
                  active
                    ? "text-slate-950"
                    : "text-slate-700 hover:text-slate-900",
                )}
              >
                <svg className={styles.outline} fill="none" aria-hidden="true">
                  <rect width="100%" height="100%" rx="19" pathLength="1" />
                </svg>
                <span className={styles.label}>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <button
          type="button"
          className="focus-ring rounded-md bg-transparent p-2 text-slate-800 lg:hidden"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-site-nav"
          onClick={() => setMenuOpen((state) => !state)}
        >
          {menuOpen ? (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M6 6L18 18" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" />
              <path d="M18 6L6 18" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" />
            </svg>
          ) : (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M4 7H20" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              <path d="M4 12H20" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              <path d="M4 17H20" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          )}
        </button>
      </div>

      <div
        className={cn(
          "fixed inset-0 z-30 transition-opacity lg:hidden",
          menuOpen ? "opacity-100" : "pointer-events-none opacity-0",
        )}
        onClick={() => setMenuOpen(false)}
        aria-hidden="true"
      />

      <nav
        id="mobile-site-nav"
        inert={!menuOpen}
        aria-label="Mobile navigation"
        className={cn(
          "fixed inset-0 z-40 overflow-y-auto bg-white transition-opacity duration-200 lg:hidden [background-image:linear-gradient(rgba(15,23,42,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.045)_1px,transparent_1px)] [background-size:44px_44px]",
          menuOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0",
        )}
        onClick={() => setMenuOpen(false)}
      >
        <div
          className="relative z-10 flex min-h-full w-full items-center justify-center px-6 py-24"
          onClick={(event) => event.stopPropagation()}
        >
          <div className="w-full max-w-[26rem]">
            <div className="grid grid-cols-2 items-center justify-items-center gap-3.5">
              {NAV_ITEMS.map((item, index) => {
                const active = [item.href, ...(item.activePaths ?? [])].some(href => isRouteActive(pathname, href));

                return (
                  <Link
                    key={`mobile-${item.href}`}
                    href={item.href}
                    prefetch={true}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "focus-ring inline-flex h-[5.15rem] items-center justify-center whitespace-nowrap rounded-[2.65rem] border border-slate-300 bg-white px-3 text-center text-[1.5rem] font-medium text-slate-900 transition-colors",
                      item.href === "/" || item.href === "/join"
                        ? "col-span-2 min-w-[9.7rem] px-5"
                        : "w-full min-w-0",
                      item.href === "/join" && "underline decoration-slate-400 decoration-wavy decoration-1 underline-offset-[6px]",
                      active
                        ? "bg-red-50 text-brand-red"
                        : "hover:bg-slate-50",
                    )}
                    ref={(el) => {
                      if (el) bubbleRefs.current[index] = el;
                    }}
                    onClick={() => setMenuOpen(false)}
                  >
                    <span>{item.label.toLowerCase()}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
