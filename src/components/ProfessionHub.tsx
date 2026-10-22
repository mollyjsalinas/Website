import Link from "next/link";
import { Container } from "@/components/Container";
import { JsonLd } from "@/components/JsonLd";
import { Hero, SectionHeading, StatTile, SourceLine, CtaBand, Breadcrumbs } from "@/components/Sections";
import { EmployerBlock } from "@/components/EmployerBlock";
import { MollyByline } from "@/components/MollyByline";
import { SITE, CONTENT_UPDATED, ROLE_LABELS, SETTING_LIST, type Profession } from "@/lib/site";
import { nationalTotals, topStatesByRoles, stateHref } from "@/lib/markets";
import { n, usd, longDate } from "@/lib/format";

// One template for the four profession hubs. National numbers come from
// nationalTotals(); the top-10 table links into the state pages.
export function ProfessionHub({ p }: { p: Profession }) {
  const nat = nationalTotals();
  const primary = p.nppesRoles[0];
  const assistant = p.nppesRoles[1];
  const top = topStatesByRoles(p.nppesRoles, 10);
  const comp = nat.compensation[primary];
  const assistantComp = assistant ? nat.compensation[assistant] : undefined;
  const url = `${SITE.url}/${p.slug}/`;
  const reviewedOn = longDate(nat.snapshot_date > CONTENT_UPDATED ? nat.snapshot_date : CONTENT_UPDATED);

  return (
    <>
      <Hero
        eyebrow={`${p.label} recruiting`}
        title={`${p.label} recruiters for hospitals, SNFs, home health, outpatient and schools`}
        primary={{ href: "/contact/hire/", label: `Hire a ${p.short}` }}
        secondary={{ href: "/therapy-recruiters/", label: "See your state's numbers" }}
      >
        {p.description}
      </Hero>

      <section className="py-20">
        <Container>
          <SectionHeading eyebrow="National workforce" title={`${p.plural} in the United States`}>
            Individual providers with an active practice address, summed across {nat.states} states
            and DC, and the federal wage estimate for the profession.
          </SectionHeading>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <StatTile value={n(nat.supply[primary])} label={`${ROLE_LABELS[primary].plural} enrolled`} />
            {assistant && <StatTile value={n(nat.supply[assistant])} label={`${ROLE_LABELS[assistant].plural} enrolled`} />}
            <StatTile value={n(nat.inflow[primary])} label={`New ${p.short}s, last 12 months`} />
            {comp && <StatTile value={usd(comp.annual_mean_wage)} label={`${p.short} mean annual wage`} sub={comp.annual_median_wage != null ? `median ${usd(comp.annual_median_wage)}` : undefined} />}
          </div>
          {assistantComp && (
            <p className="mt-6 max-w-3xl leading-relaxed text-body">
              {ROLE_LABELS[assistant!].plural} average {usd(assistantComp.annual_mean_wage)} a year
              nationally{assistantComp.employment != null ? ` across ${n(assistantComp.employment)} employed` : ""}.
            </p>
          )}
          <SourceLine>
            Sources: {nat.sources.supply}; {nat.sources.inflow}; {nat.sources.compensation}.
          </SourceLine>
        </Container>
      </section>

      <section className="bg-mist-light py-20">
        <Container>
          <SectionHeading eyebrow="Where they are" title={`The ten largest ${p.short} markets by state`}>
            {assistant
              ? `${p.plural} and ${ROLE_LABELS[assistant].plural.toLowerCase()} combined. Pick a state for pay, employers and licensure-compact status.`
              : "Pick a state for pay, employers and licensure-compact status."}
          </SectionHeading>
          <div className="mt-10 overflow-x-auto">
            <table className="w-full max-w-3xl border-collapse text-left">
              <thead>
                <tr className="border-b-2 border-navy-200 text-sm tracking-wide text-body uppercase">
                  <th className="py-3 pr-4">#</th>
                  <th className="py-3 pr-4">State</th>
                  <th className="py-3 pr-4">{p.short}s{assistant ? ` + ${ROLE_LABELS[assistant].short}s` : ""}</th>
                  <th className="py-3">{p.short} mean wage</th>
                </tr>
              </thead>
              <tbody>
                {top.map(({ m, count }, i) => (
                  <tr key={m.market_abbr} className="border-b border-mist">
                    <td className="py-3 pr-4 text-body">{i + 1}</td>
                    <td className="py-3 pr-4 font-semibold">
                      <Link href={stateHref(m)} className="text-navy-600 hover:text-teal-600">
                        {m.market}
                      </Link>
                    </td>
                    <td className="py-3 pr-4 text-body">{n(count)}</td>
                    <td className="py-3 text-body">{usd(m.compensation[primary]?.annual_mean_wage)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-6">
            <Link href="/therapy-recruiters/" className="font-semibold text-teal-600 hover:text-teal-700">
              All 50 states and DC →
            </Link>
          </p>
        </Container>
      </section>

      <section className="py-20">
        <Container>
          <SectionHeading eyebrow="Settings" title={`${p.short} roles we fill, by setting`}>
            The same license means a different job in each. Pick the setting for how we screen for it.
          </SectionHeading>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {SETTING_LIST.map((s) => (
              <Link key={s.key} href={`/${s.slug}/`} className="rounded-lg border border-mist bg-white p-5 transition-shadow hover:shadow-md">
                <span className="block font-heading font-semibold text-navy-600">{s.label}</span>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <EmployerBlock />

      <MollyByline place="national" reviewedOn={reviewedOn} />

      <CtaBand title={`Need a ${p.label.toLowerCase()}?`} body="Tell us the setting, the caseload and the market. A licensed clinician reads every brief." />

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: `${p.label} recruiting`,
          serviceType: p.searchTerms[0],
          provider: { "@id": `${SITE.url}/#organization` },
          areaServed: { "@type": "Country", name: "United States" },
          url,
        }}
      />
      <Breadcrumbs
        items={[
          { name: "Home", href: `${SITE.url}/` },
          { name: `${p.label} recruiters`, href: url },
        ]}
      />
    </>
  );
}
