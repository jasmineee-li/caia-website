"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function ScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    const previousBehavior = html.style.scrollBehavior;

    html.style.scrollBehavior = "auto";
    const hash = window.location.hash.slice(1);
    let target: HTMLElement | null = null;
    try {
      target = hash ? document.getElementById(decodeURIComponent(hash)) : null;
    } catch {
      // An invalid URL fragment should still allow normal page navigation.
    }
    if (target) {
      target.scrollIntoView({ behavior: "instant", block: "start" });
    } else {
      window.scrollTo(0, 0);
      html.scrollTop = 0;
      body.scrollTop = 0;
    }

    const restoreId = window.requestAnimationFrame(() => {
      html.style.scrollBehavior = previousBehavior;
    });

    return () => {
      window.cancelAnimationFrame(restoreId);
      html.style.scrollBehavior = previousBehavior;
    };
  }, [pathname]);

  return null;
}
