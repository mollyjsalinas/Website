import Link from "next/link";
import Image from "next/image";
import { SITE, PROFESSION_LIST, SETTING_LIST } from "@/lib/site";

const COMPANY_LINKS = [
  { href: "/employers/", label: "For Employers" },
  { href: "/contact/hire/", label: "Hire a Therapist" },
  { href: "/job-seekers/", label: "For Therapists" },
  { href: "/jobs/", label: "Open Roles" },
  { href: "/therapy-recruiters/", label: "Markets by State" },
  { href: "/licensure-compacts/", label: "Licensure Compacts" },
  { href: "/about/", label: "About Molly" },
  { href: "/blog/", label: "Insights" },
  { href: "/contact/", label: "Contact" },
  { href: "/privacy-policy/", label: "Privacy Policy" },
];

export function Footer() {
  return (
    <footer className="bg-navy-700 text-navy-100">
      <div className="mx-auto w-full max-w-6xl px-5 py-12 sm:px-8">
        <div className="grid gap-10 md:grid-cols-[1.2fr_1fr_1fr_1fr]">
          <div className="max-w-sm">
            <Image
              src="/brand/apt-logo-original.png"
              alt="APT Recruiting"
              width={150}
              height={80}
              className="h-14 w-auto rounded bg-white p-1"
            />
            <p className="mt-4 text-sm leading-relaxed">{SITE.tagline}</p>
            <p className="mt-4 text-sm">
              <a href={`mailto:${SITE.email}`} className="hover:text-teal-200">
                {SITE.email}
              </a>
            </p>
            <p className="mt-1 text-sm">
              <a href={SITE.phoneHref} className="hover:text-teal-200">
                {SITE.phone}
              </a>
            </p>
          </div>

          <nav aria-label="Professions">
            <p className="font-heading text-sm font-semibold tracking-wide text-white uppercase">Professions</p>
            <ul className="mt-3 space-y-2 text-sm">
              {PROFESSION_LIST.map((p) => (
                <li key={p.key}>
                  <Link href={`/${p.slug}/`} className="hover:text-teal-200">
                    {p.label} recruiters
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Settings">
            <p className="font-heading text-sm font-semibold tracking-wide text-white uppercase">Settings</p>
            <ul className="mt-3 space-y-2 text-sm">
              {SETTING_LIST.map((s) => (
                <li key={s.key}>
                  <Link href={`/${s.slug}/`} className="hover:text-teal-200">
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Company">
            <p className="font-heading text-sm font-semibold tracking-wide text-white uppercase">Company</p>
            <ul className="mt-3 space-y-2 text-sm">
              {COMPANY_LINKS.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="hover:text-teal-200">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <p className="mt-10 border-t border-navy-500 pt-6 text-xs text-navy-200">
          © {new Date().getFullYear()} {SITE.legalName}. All rights reserved. Workforce, pay and facility
          figures are drawn from public federal sources (CMS NPPES, BLS OEWS and QCEW, CMS Provider Data
          Catalog) and are reviewed by a licensed speech-language pathologist.
        </p>
      </div>
    </footer>
  );
}
