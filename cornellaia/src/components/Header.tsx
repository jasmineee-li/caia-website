"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-8 flex justify-between items-center max-w-6xl">
        <Link href="/" className="text-cornell-red flex-shrink-0">
          <Image
            src="/serif-logo.svg"
            alt="Cornell AI Alignment"
            width={180}
            height={45}
            priority
          />
        </Link>

        {/* Desktop nav */}
        <nav className="space-x-8 hidden md:flex">
          <Link href="/" className="hover:text-[#FF6B1A]">
            Home
          </Link>
          <Link href="/events" className="hover:text-[#FF6B1A]">
            Events
          </Link>
          <Link href="/get-involved" className="hover:text-[#FF6B1A]">
            Programs
          </Link>
          <Link href="/team" className="hover:text-[#FF6B1A]">
            Team
          </Link>
          <Link href="/resources" className="hover:text-[#FF6B1A]">
            Resources
          </Link>
        </nav>

        {/* Mobile menu button */}
        <button
          className="md:hidden flex flex-col justify-center items-center w-10 h-10"
          aria-label="Open menu"
          onClick={() => setMenuOpen(true)}
        >
          <span className="block w-6 h-0.5 bg-black mb-1"></span>
          <span className="block w-6 h-0.5 bg-black mb-1"></span>
          <span className="block w-6 h-0.5 bg-black"></span>
        </button>

        {/* Mobile menu overlay */}
        <div
          className={`fixed inset-0 z-40 bg-black bg-opacity-40 transition-opacity duration-300 ${
            menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          } md:hidden`}
          onClick={() => setMenuOpen(false)}
        ></div>

        {/* Mobile menu drawer */}
        <nav
          className={`fixed top-0 right-0 h-full w-64 bg-white z-50 shadow-lg transform transition-transform duration-300
            ${menuOpen ? "translate-x-0" : "translate-x-full"} md:hidden flex flex-col p-8 space-y-6`}
        >
          <button
            className="self-end mb-8"
            aria-label="Close menu"
            onClick={() => setMenuOpen(false)}
          >
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 6l12 12M6 18L18 6" />
            </svg>
          </button>
          <Link href="/" className="hover:text-[#FF6B1A]" onClick={() => setMenuOpen(false)}>
            Home
          </Link>
          <Link href="/events" className="hover:text-[#FF6B1A]" onClick={() => setMenuOpen(false)}>
            Events
          </Link>
          <Link href="/get-involved" className="hover:text-[#FF6B1A]" onClick={() => setMenuOpen(false)}>
            Programs
          </Link>
          <Link href="/team" className="hover:text-[#FF6B1A]" onClick={() => setMenuOpen(false)}>
            Team
          </Link>
          <Link href="/resources" className="hover:text-[#FF6B1A]" onClick={() => setMenuOpen(false)}>
            Resources
          </Link>
        </nav>
      </div>
    </header>
  );
}
