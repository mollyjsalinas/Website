import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/Container";
import { Hero, SourceLine, Breadcrumbs } from "@/components/Sections";
import { SITE } from "@/lib/site";
import { SALARY_ROLES, salaryHref, nationalWage, roleLabel } from "@/lib/salary";
import { launchMarkets } from "@/lib/markets";
import { usd } from "@/lib/format";

export const metadata: Metadata = {
  title: "PT, OT, SLP and Audiologist Salaries by State",
  description:
    "What physical therapists, PTAs, occupational therapists, OTAs, speech-language pathologists and audiologists earn in every state and metro, from BLS wage data.",
  alternates: { canonical: "/salary/" },
};

export default function SalaryIndexPage() {
  return (
    <>
      <Hero
        eyebrow="Salary data"
        title="Therapy salaries by state and metro."
        primary={{ href: "/jobs/", label: "See open roles" }}
        secondary={{ href: "/job-seekers/", label: "Send us your resume" }}
      >
        Federal wage estimates for every rehab therapy role in every state, with metro detail where
        BLS publishes it. Use them to check an offer before you sign it.
      </Hero>
      <section className="py-20">
        <Container>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {SALARY_ROLES.map((r) => (
              <Link
                key={r.key}
                href={salaryHref(r)}
                className="rounded-lg border border-mist bg-white p-6 shadow-sm hover:border-teal-400"
              >
                <p className="font-heading text-xl font-semibold text-navy-600">{roleLabel(r).label}</p>
                <p className="mt-2 text-body">National mean {usd(nationalWage(r)?.annual_mean_wage)}</p>
              </Link>
            ))}
          </div>
          <SourceLine>Source: {launchMarkets()[0]?.compensation.source}.</SourceLine>
        </Container>
      </section>
      <Breadcrumbs
        items={[
          { name: "Home", href: `${SITE.url}/` },
          { name: "Salaries", href: `${SITE.url}/salary/` },
        ]}
      />
    </>
  );
}
