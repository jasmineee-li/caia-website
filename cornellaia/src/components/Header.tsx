"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { NAV_ITEMS } from "@/content/navigation";
import { cn } from "@/lib/cn";

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
      <div className="relative z-[60] mx-auto flex w-full max-w-page items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="focus-ring rounded-md">
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

        <nav className="hidden items-center gap-2 md:flex" aria-label="Main navigation">
          {NAV_ITEMS.map((item) => {
            const active = isRouteActive(pathname, item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "focus-ring rounded-full px-4 py-2 text-sm font-medium transition-colors",
                  active
                    ? "bg-slate-900 text-white"
                    : "text-slate-700 hover:bg-slate-100 hover:text-slate-900",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <button
          type="button"
          className="focus-ring rounded-md bg-slate-50 p-2 text-slate-800 md:hidden"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-site-nav"
          onClick={() => setMenuOpen((state) => !state)}
        >
          {menuOpen ? (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M6 6L18 18" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" />
              <path d="M18 6L6 18" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" />
            </svg>
          ) : (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M4 7H20" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              <path d="M4 12H20" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              <path d="M4 17H20" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          )}
        </button>
      </div>

      <div
        className={cn(
          "fixed inset-0 z-30 bg-white transition-opacity md:hidden",
          menuOpen ? "opacity-100" : "pointer-events-none opacity-0",
        )}
        onClick={() => setMenuOpen(false)}
        aria-hidden="true"
      />

      <nav
        id="mobile-site-nav"
        aria-label="Mobile navigation"
        className={cn(
          "fixed inset-0 z-40 transition-opacity duration-200 md:hidden",
          menuOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0",
        )}
        onClick={() => setMenuOpen(false)}
      >
        <div
          className="flex h-full w-full items-center justify-center px-6 py-24"
          onClick={(event) => event.stopPropagation()}
        >
          <div className="w-full max-w-[26rem]">
            <div className="flex flex-wrap items-center justify-center gap-3.5">
              {NAV_ITEMS.map((item, index) => {
                const active = isRouteActive(pathname, item.href);

                return (
                  <Link
                    key={`mobile-${item.href}`}
                    href={item.href}
                    className={cn(
                      "focus-ring inline-flex h-[5.15rem] min-w-[9.7rem] items-center justify-center rounded-[2.65rem] border border-slate-300 bg-white px-8 text-center text-[2.05rem] font-medium text-slate-900 transition-colors",
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
