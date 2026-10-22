import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/Container";
import { JsonLd } from "@/components/JsonLd";
import { SectionHeading, StatTile, SourceLine, CtaBand, Breadcrumbs } from "@/components/Sections";
import { compactSentence } from "@/components/DataSections";
import { SITE, COMPACTS, CONTENT_UPDATED } from "@/lib/site";
import { marketDisplay, metrosForState, metroHref, stateHref, supplyAsOf } from "@/lib/markets";
import {
  SALARY_ROLES,
  salaryPage,
  salaryParams,
  salaryHref,
  nationalWage,
  roleLabel,
  stateWage,
  jobsFor,
  ordinal,
  titleCase,
} from "@/lib/salary";
import { n, usd, longDate } from "@/lib/format";
import { hasLicensureGuide, licensureHref, type LicProfKey } from "@/lib/licensure";

export async function generateStaticParams() {
  return salaryParams();
}

// Only role/state pairs with a published BLS mean exist; the rest 404.
export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ role: string; state: string }>;
}): Promise<Metadata> {
  const { role, state } = await params;
  const p = salaryPage(role, state);
  if (!p) return {};
  const { r, m, d } = p;
  const L = roleLabel(r);
  return {
    title: `${titleCase(L.label)} Salary in ${m.market}: ${usd(d.annual_mean_wage)} Average`,
    description: `${L.plural} in ${marketDisplay(m)} earn a mean of ${usd(d.annual_mean_wage)} a year (median ${usd(d.annual_median_wage)}), per BLS data. Pay by metro, how ${m.market} compares, and open ${L.short} roles.`,
    alternates: { canonical: salaryHref(r, m) },
  };
}

export default async function SalaryStatePage({ params }: { params: Promise<{ role: string; state: string }> }) {
  const { role, state } = await params;
  const p = salaryPage(role, state);
  if (!p) notFound();
  const { r, m, d, rank, of } = p;
  const L = roleLabel(r);
  const disp = marketDisplay(m);
  const nat = nationalWage(r);
  const vsNat =
    nat?.annual_mean_wage != null ? ((d.annual_mean_wage! - nat.annual_mean_wage) / nat.annual_mean_wage) * 100 : null;
  const hourly = d.annual_mean_wage! / 2080;
  const supply = m.supply.active_individual_providers[r.key];
  const per100k = (m.supply.per_100k as Partial<Record<string, number>>)[r.key];
  const inflow = m.new_provider_inflow.trailing_12_months[r.key]?.trailing_12mo_total;
  const metros = metrosForState(m.market_abbr)
    .map((c) => ({ c, w: c.compensation?.[r.key] }))
    .filter((x) => x.w?.annual_mean_wage != null)
    .sort((a, b) => b.w!.annual_mean_wage! - a.w!.annual_mean_wage!);
  const jobs = jobsFor(r.profession, m.market_abbr);
  const otherRoles = SALARY_ROLES.filter((o) => o.key !== r.key && stateWage(m, o));
  const compact = COMPACTS[r.compact];
  const url = `${SITE.url}${salaryHref(r, m)}`;
  const modified = m.snapshot_date > CONTENT_UPDATED ? m.snapshot_date : CONTENT_UPDATED;

  return (
    <>
      <section className="bg-navy-600 text-white">
        <Container className="py-20 sm:py-24">
          <p className="text-sm font-semibold tracking-widest text-teal-300 uppercase">
            Salary data · {m.market}
          </p>
          <h1 className="mt-4 max-w-3xl font-heading text-4xl leading-tight font-semibold sm:text-5xl">
            {L.label} salary in {m.market}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-navy-100">
            {L.plural} in {disp} earn a mean of {usd(d.annual_mean_wage)} a year and a median of{" "}
            {usd(d.annual_median_wage)}
            {vsNat != null && (
              <>
                , {Math.abs(vsNat).toFixed(1)}% {vsNat >= 0 ? "above" : "below"} the national mean of{" "}
                {usd(nat!.annual_mean_wage)}
              </>
            )}
            . That ranks {ordinal(rank)} of the {of} states with a published estimate.
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
            <Link
              href="/job-seekers/"
              className="inline-block rounded-md bg-teal-500 px-6 py-3 font-semibold text-white transition-colors hover:bg-teal-400"
            >
              Talk to a recruiter about {m.market} roles
            </Link>
            <Link href="/jobs/" className="text-sm font-semibold text-teal-200 hover:text-white">
              See open roles →
            </Link>
          </div>
        </Container>
      </section>

      <section className="py-20">
        <Container>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <StatTile value={usd(d.annual_mean_wage)} label="Mean annual wage" sub={`about ${usd(hourly)} an hour`} />
            <StatTile value={usd(d.annual_median_wage)} label="Median annual wage" />
            <StatTile value={`${ordinal(rank)} of ${of}`} label="State rank" sub="by mean wage" />
            <StatTile value={n(d.employment)} label={`${L.short}s employed`} sub="BLS estimate" />
          </div>
          <SourceLine>
            Source: {m.compensation.source}. These are estimates for {L.plural.toLowerCase()} already
            employed in {disp}, not offers; the hourly figure divides the annual mean by 2,080 hours.
            Setting, specialty and caseload move an individual offer well above or below them.
            Updated {longDate(modified)}.
          </SourceLine>
        </Container>
      </section>

      {metros.length > 0 && (
        <section className="bg-mist-light py-20">
          <Container>
            <SectionHeading eyebrow="By metro" title={`${L.label} pay by metro in ${m.market}`}>
              Metro estimates from the same survey, highest mean first. Each city links to its full
              therapy workforce page.
            </SectionHeading>
            <div className="mt-10 overflow-x-auto">
              <table className="w-full max-w-4xl border-collapse text-left">
                <thead>
                  <tr className="border-b-2 border-navy-200 text-sm tracking-wide text-body uppercase">
                    <th className="py-3 pr-4">Metro</th>
                    <th className="py-3 pr-4">Mean</th>
                    <th className="py-3 pr-4">Median</th>
                    <th className="py-3">Employed</th>
                  </tr>
                </thead>
                <tbody>
                  {metros.map(({ c, w }) => (
                    <tr key={c.cbsa} className="border-b border-mist">
                      <td className="py-3 pr-4 font-semibold text-navy-600">
                        <Link href={metroHref(c)} className="hover:text-teal-600">
                          {c.city}
                        </Link>
                      </td>
                      <td className="py-3 pr-4 text-body">{usd(w!.annual_mean_wage)}</td>
                      <td className="py-3 pr-4 text-body">{usd(w!.annual_median_wage)}</td>
                      <td className="py-3 text-body">{n(w!.employment)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <SourceLine>Source: BLS OEWS metropolitan estimates. Suppressed cells show n/a.</SourceLine>
          </Container>
        </section>
      )}

      <section className="py-20">
        <Container>
          <SectionHeading eyebrow="The market" title={`How many ${L.plural.toLowerCase()} work in ${m.market}`}>
            {n(supply)} {L.plural.toLowerCase()} hold an active individual NPI with a practice address
            in {disp}
            {per100k != null ? `, ${per100k.toFixed(1)} per 100,000 residents` : ""}
            {inflow != null ? `, and ${n(inflow)} new ones enrolled in the last twelve months` : ""}. A
            high wage with few clinicians per capita usually means employers are competing for
            people; a low one in a crowded market means the opposite.
          </SectionHeading>
          <SourceLine>Source: {m.supply.source}, as of {supplyAsOf(m)}.</SourceLine>
          <div className="mt-10 max-w-3xl rounded-lg border border-mist bg-white p-6">
            <h2 className="font-heading text-xl font-semibold text-navy-600">Licensed in another state?</h2>
            <p className="mt-2 leading-relaxed text-body">{compactSentence(m.market, r.compact, m.compacts[r.compact])}</p>
            <Link
              href={`/licensure-compacts/${compact.slug}/`}
              className="mt-3 inline-block font-semibold text-teal-600 hover:text-teal-700"
            >
              How the {compact.shortName} works →
            </Link>
            {(r.key === "pt" || r.key === "ot" || r.key === "slp") && hasLicensureGuide(m.market_abbr, r.key as LicProfKey) && (
              <Link
                href={licensureHref(m.market_abbr, r.key as LicProfKey)}
                className="mt-2 block font-semibold text-teal-600 hover:text-teal-700"
              >
                How to get a {m.market} license, step by step →
              </Link>
            )}
          </div>
        </Container>
      </section>

      <section className="bg-mist-light py-20">
        <Container>
          <SectionHeading eyebrow="Open roles" title={`${L.short} openings in ${m.market}`}>
            {jobs.length > 0
              ? "Roles an employer has asked us to list publicly. Every search is confidential and free to the clinician."
              : `No public ${L.short} listing in ${disp} right now. Most of our searches are confidential and never posted, so tell us what you want and we will match you quietly.`}
          </SectionHeading>
          {jobs.length > 0 && (
            <ul className="mt-8 max-w-3xl space-y-3">
              {jobs.map((j) => (
                <li key={j.slug}>
                  <Link href={`/jobs/${j.slug}/`} className="font-semibold text-teal-600 hover:text-teal-700">
                    {j.title}, {j.city}
                  </Link>
                </li>
              ))}
            </ul>
          )}
          <div className="mt-10 grid gap-8 md:grid-cols-2">
            <div>
              <h2 className="font-heading text-lg font-semibold text-navy-600">Other roles in {m.market}</h2>
              <ul className="mt-3 space-y-2">
                {otherRoles.map((o) => (
                  <li key={o.key}>
                    <Link href={salaryHref(o, m)} className="text-teal-600 hover:text-teal-700">
                      {roleLabel(o).label} salary in {m.market}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="font-heading text-lg font-semibold text-navy-600">Compare</h2>
              <ul className="mt-3 space-y-2">
                <li>
                  <Link href={salaryHref(r)} className="text-teal-600 hover:text-teal-700">
                    {L.label} salary in every state
                  </Link>
                </li>
                <li>
                  <Link href={stateHref(m)} className="text-teal-600 hover:text-teal-700">
                    The {m.market} therapy workforce
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </Container>
      </section>

      <CtaBand
        title={`Thinking about a ${L.short} move in ${m.market}?`}
        body="Send a resume and a few lines on the setting, schedule and pay you want. A licensed clinician reads every one, and it stays confidential."
        label="Start a confidential conversation"
        href="/job-seekers/"
      />

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Occupation",
          name: L.label,
          occupationLocation: { "@type": "State", name: m.market },
          estimatedSalary: {
            "@type": "MonetaryAmountDistribution",
            name: "base",
            currency: "USD",
            duration: "P1Y",
            median: d.annual_median_wage ?? undefined,
          },
          mainEntityOfPage: url,
          url,
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          "@id": url,
          url,
          name: `${L.label} salary in ${m.market}`,
          dateModified: modified,
          isPartOf: { "@id": `${SITE.url}/#website` },
        }}
      />
      <Breadcrumbs
        items={[
          { name: "Home", href: `${SITE.url}/` },
          { name: "Salaries", href: `${SITE.url}/salary/` },
          { name: `${L.label} salary`, href: `${SITE.url}${salaryHref(r)}` },
          { name: m.market, href: url },
        ]}
      />
    </>
  );
}
