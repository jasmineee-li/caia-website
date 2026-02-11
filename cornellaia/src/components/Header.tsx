"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
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

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/95">
      <div className="mx-auto flex w-full max-w-page items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="focus-ring rounded-md">
          <Image
            src="/serif-logo.svg"
            alt="Cornell AI Alignment Club"
            width={190}
            height={58}
            priority
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
          className="focus-ring rounded-md bg-white p-2 text-slate-800 md:hidden"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-site-nav"
          onClick={() => setMenuOpen((state) => !state)}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M4 7H20" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            <path d="M4 12H20" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            <path d="M4 17H20" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      <div
        className={cn(
          "fixed inset-0 z-40 bg-slate-900/45 transition-opacity md:hidden",
          menuOpen ? "opacity-100" : "pointer-events-none opacity-0",
        )}
        onClick={() => setMenuOpen(false)}
        aria-hidden="true"
      />

      <nav
        id="mobile-site-nav"
        aria-label="Mobile navigation"
        className={cn(
          "fixed right-0 top-0 z-50 flex h-full w-80 max-w-[88vw] flex-col gap-3 border-l border-slate-200 bg-white px-6 py-6 transition-transform md:hidden",
          menuOpen ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="mb-3 flex items-center justify-between">
          <span className="text-sm font-semibold tracking-[0.12em] text-slate-500"></span>
          <button
            type="button"
            onClick={() => setMenuOpen(false)}
            className="focus-ring rounded-md bg-white p-1.5 text-slate-700"
            aria-label="Close menu"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M6 6L18 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              <path d="M18 6L6 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {NAV_ITEMS.map((item) => {
          const active = isRouteActive(pathname, item.href);

          return (
            <Link
              key={`mobile-${item.href}`}
              href={item.href}
              className={cn(
                "focus-ring rounded-lg border px-4 py-3 text-base font-medium transition-colors",
                active
                  ? "border-brand-red bg-red-50 text-brand-red"
                  : "border-slate-200 text-slate-700 hover:border-brand-cyan/60 hover:bg-slate-50",
              )}
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
