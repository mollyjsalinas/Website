"use client";

import { useState } from "react";
import Link from "next/link";

const NAV = [
  { href: "/employers/", label: "Employers" },
  { href: "/therapy-recruiters/", label: "Markets" },
  { href: "/licensure-compacts/", label: "Compacts" },
  { href: "/job-seekers/", label: "Therapists" },
  { href: "/about/", label: "About" },
  { href: "/blog/", label: "Insights" },
];

// Text wordmark as the primary mark: the only logo on hand is a 150x80 PNG,
// too soft for a retina header. The PNG lives on in the footer and OG image.
export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-baseline gap-1.5 font-heading font-semibold tracking-tight ${className}`}>
      <span className="text-teal-500">APT</span>
      <span className="text-navy-600">Recruiting</span>
    </span>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-mist bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-5 sm:px-8">
        <Link href="/" aria-label="APT Recruiting home">
          <Wordmark className="text-2xl" />
        </Link>

        <nav className="hidden items-center gap-6 md:flex" aria-label="Main">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-ink transition-colors hover:text-teal-600"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/contact/hire/"
            className="rounded-md bg-teal-500 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-teal-600"
          >
            Hire a therapist
          </Link>
        </nav>

        <button
          type="button"
          className="md:hidden"
          aria-expanded={open}
          aria-label="Toggle menu"
          onClick={() => setOpen(!open)}
        >
          <svg className="h-6 w-6 text-navy-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            {open ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {open && (
        <nav className="border-t border-mist bg-white px-5 py-4 md:hidden" aria-label="Mobile">
          <ul className="flex flex-col gap-3">
            {NAV.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="block py-1 text-base font-medium text-ink"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/contact/hire/"
                className="mt-1 block rounded-md bg-teal-500 px-4 py-2 text-center text-base font-semibold text-white"
                onClick={() => setOpen(false)}
              >
                Hire a therapist
              </Link>
            </li>
            <li>
              <Link
                href="/contact/"
                className="block py-1 text-base font-medium text-ink"
                onClick={() => setOpen(false)}
              >
                Contact
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
