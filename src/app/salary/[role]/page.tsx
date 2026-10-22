import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/Container";
import { SectionHeading, SourceLine, CtaBand, Breadcrumbs } from "@/components/Sections";
import { SITE } from "@/lib/site";
import { SALARY_ROLES, salaryRoleBySlug, salaryHref, nationalWage, rankedStates, roleLabel, jobsFor, titleCase } from "@/lib/salary";
import { n, usd } from "@/lib/format";

export async function generateStaticParams() {
  return SALARY_ROLES.map((r) => ({ role: r.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ role: string }> }): Promise<Metadata> {
  const { role } = await params;
  const r = salaryRoleBySlug(role);
  if (!r) return {};
  const L = roleLabel(r);
  const nat = nationalWage(r);
  return {
    title: `${titleCase(L.label)} Salary by State`,
    description: `What ${L.plural.toLowerCase()} earn in all 50 states and DC: BLS mean and median wages, ranked. National mean ${usd(nat?.annual_mean_wage)}.`,
    alternates: { canonical: salaryHref(r) },
  };
}

export default async function SalaryRolePage({ params }: { params: Promise<{ role: string }> }) {
  const { role } = await params;
  const r = salaryRoleBySlug(role);
  if (!r) notFound();
  const L = roleLabel(r);
  const nat = nationalWage(r);
  const ranked = rankedStates(r);
  const top = ranked.slice(0, 3).map((x) => x.m.market);
  const jobs = jobsFor(r.profession);
  const url = `${SITE.url}${salaryHref(r)}`;

  return (
    <>
      <section className="bg-navy-600 text-white">
        <Container className="py-20 sm:py-24">
          <p className="text-sm font-semibold tracking-widest text-teal-300 uppercase">Salary data</p>
          <h1 className="mt-4 max-w-3xl font-heading text-4xl leading-tight font-semibold sm:text-5xl">
            {L.label} salary by state
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-navy-100">
            {L.plural} in the US earn a mean of {usd(nat?.annual_mean_wage)} a year (median{" "}
            {usd(nat?.annual_median_wage)}, {n(nat?.employment)} employed). The highest-paying states
            by mean are {top.join(", ")}. Pick a state for metro pay, the local workforce and
            licensing.
          </p>
        </Container>
      </section>

      <section className="py-20">
        <Container>
          <div className="overflow-x-auto">
            <table className="w-full max-w-4xl border-collapse text-left">
              <thead>
                <tr className="border-b-2 border-navy-200 text-sm tracking-wide text-body uppercase">
                  <th className="py-3 pr-4">Rank</th>
                  <th className="py-3 pr-4">State</th>
                  <th className="py-3 pr-4">Mean</th>
                  <th className="py-3 pr-4">Median</th>
                  <th className="py-3">Employed</th>
                </tr>
              </thead>
              <tbody>
                {ranked.map(({ m, d }, i) => (
                  <tr key={m.market_abbr} className="border-b border-mist">
                    <td className="py-3 pr-4 text-body">{i + 1}</td>
                    <td className="py-3 pr-4 font-semibold text-navy-600">
                      <Link href={salaryHref(r, m)} className="hover:text-teal-600">
                        {m.market}
                      </Link>
                    </td>
                    <td className="py-3 pr-4 text-body">{usd(d.annual_mean_wage)}</td>
                    <td className="py-3 pr-4 text-body">{usd(d.annual_median_wage)}</td>
                    <td className="py-3 text-body">{n(d.employment)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <SourceLine>
            Source: {ranked[0]?.m.compensation.source ?? "BLS OEWS"}. Estimates for employed clinicians,
            not offers. States where BLS suppresses the estimate are left out.
          </SourceLine>
        </Container>
      </section>

      <section className="bg-mist-light py-20">
        <Container>
          <SectionHeading eyebrow="Also" title="Other therapy salaries">
            {jobs.length > 0 && (
              <>
                {jobs.length} public {L.short} {jobs.length === 1 ? "opening" : "openings"} right now:{" "}
                <Link href="/jobs/" className="font-semibold text-teal-600 hover:text-teal-700">
                  see open roles
                </Link>
                .
              </>
            )}
          </SectionHeading>
          <ul className="mt-6 grid gap-2 sm:grid-cols-2">
            {SALARY_ROLES.filter((o) => o.key !== r.key).map((o) => (
              <li key={o.key}>
                <Link href={salaryHref(o)} className="text-teal-600 hover:text-teal-700">
                  {roleLabel(o).label} salary by state
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <CtaBand
        title="Know what you are worth? Find out what is open."
        body="Most of our searches are confidential and never posted. Tell us the setting and the market you want."
        label="Start a confidential conversation"
        href="/job-seekers/"
      />

      <Breadcrumbs
        items={[
          { name: "Home", href: `${SITE.url}/` },
          { name: "Salaries", href: `${SITE.url}/salary/` },
          { name: `${L.label} salary`, href: url },
        ]}
      />
    </>
  );
}
