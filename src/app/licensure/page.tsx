import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/Container";
import { Hero, Breadcrumbs } from "@/components/Sections";
import { SITE } from "@/lib/site";
import { LIC_PROFESSIONS, licensureGuides, licensureHref } from "@/lib/licensure";

export const metadata: Metadata = {
  title: "PT, OT and SLP State License Guides",
  description:
    "How to get a physical therapy, occupational therapy or speech-language pathology license, state by state, with every requirement cited to the licensing board.",
  alternates: { canonical: "/licensure/" },
};

export default function LicensureIndexPage() {
  const guides = licensureGuides();
  const states = [...new Set(guides.map((x) => x.g.state))].sort();
  return (
    <>
      <Hero
        eyebrow="Licensure guides"
        title="Getting licensed in a new state."
        primary={{ href: "/licensure-compacts/", label: "How the compacts work" }}
        secondary={{ href: "/jobs/", label: "See open roles" }}
      >
        Exams, background checks, fees, endorsement and renewal for all 50 states and DC, taken from each
        state board&apos;s own pages and linked to them. The compacts page covers where a privilege to
        practice replaces a new license.
      </Hero>
      <section className="py-20">
        <Container>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {states.map((st) => (
              <div key={st} className="rounded-lg border border-mist bg-white p-6 shadow-sm">
                <h2 className="font-heading text-xl font-semibold text-navy-600">{st}</h2>
                <ul className="mt-3 space-y-2">
                  {guides
                    .filter((x) => x.g.state === st)
                    .map((x) => (
                      <li key={x.prof}>
                        <Link href={licensureHref(x.g.abbr, x.prof)} className="text-teal-600 hover:text-teal-700">
                          {LIC_PROFESSIONS[x.prof].label} license
                        </Link>
                      </li>
                    ))}
                </ul>
              </div>
            ))}
          </div>
        </Container>
      </section>
      <Breadcrumbs
        items={[
          { name: "Home", href: `${SITE.url}/` },
          { name: "Licensure", href: `${SITE.url}/licensure/` },
        ]}
      />
    </>
  );
}
