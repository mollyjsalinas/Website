import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/Container";
import { JsonLd } from "@/components/JsonLd";
import { Hero, SectionHeading, CtaBand, Breadcrumbs } from "@/components/Sections";
import { UsMap, type MapState } from "@/components/UsMap";
import { SITE } from "@/lib/site";
import { launchMarketsByName, metrosForState, metroHref, stateHref, nationalTotals } from "@/lib/markets";
import { n } from "@/lib/format";

export const metadata: Metadata = {
  title: "Therapy Recruiters by State and Metro: PT, OT & SLP Workforce Data",
  description:
    "Physical therapy, OT, SLP and audiology recruiting in all 50 states and DC, with the federal therapist count, pay, employers and licensure-compact status for each market.",
  alternates: { canonical: "/therapy-recruiters/" },
};

export default function TherapyRecruitersDirectory() {
  const markets = launchMarketsByName();
  const nat = nationalTotals();

  const rows = markets.map((m) => {
    const s = m.supply.active_individual_providers;
    const pop = m.population.total;
    const per100k = pop ? ((s.pt + s.ot + s.slp + s.aud) / pop) * 100000 : 0;
    return {
      m,
      metros: metrosForState(m.market_abbr),
      map: {
        abbr: m.market_abbr,
        name: m.market,
        href: stateHref(m),
        pt: s.pt,
        ot: s.ot,
        slp: s.slp,
        aud: s.aud,
        per100k,
      } satisfies MapState,
    };
  });
  const metroCount = rows.reduce((acc, r) => acc + r.metros.length, 0);

  return (
    <>
      <Hero
        eyebrow="Markets"
        title="Physical therapy, OT and SLP recruiters in every state."
        primary={{ href: "/contact/hire/", label: "Hire a therapist" }}
      >
        {n(nat.supply.pt)} physical therapists, {n(nat.supply.ot)} occupational therapists,{" "}
        {n(nat.supply.slp)} speech-language pathologists and {n(nat.supply.aud)} audiologists hold
        an active practice address in the federal registry. Pick a state on the map, or a metro
        from the table, for its workforce, pay, employer and licensing picture.
      </Hero>

      <section className="py-16 sm:py-20">
        <Container>
          <SectionHeading eyebrow="By state" title="Where the therapists are">
            Shaded by PTs, OTs, SLPs and audiologists per 100,000 residents. Hover for the counts;
            select a state to open its page.
          </SectionHeading>
          <div className="mt-10">
            <UsMap states={rows.map((r) => r.map)} />
          </div>
          <p className="mt-4 text-sm text-body">
            Source: {markets[0].supply.source}; population from {markets[0].population.source}.
          </p>
        </Container>
      </section>

      <section className="bg-mist-light py-16 sm:py-20">
        <Container>
          <SectionHeading eyebrow="Every market" title={`51 states and ${metroCount} metro areas`}>
            Metro pages cover the largest therapy markets in each state, ranked by therapist count on
            the state&apos;s side of the metro.
          </SectionHeading>
          <div className="mt-10 overflow-x-auto rounded-lg border border-mist bg-white">
            <table className="w-full border-collapse text-left text-sm">
              <thead>
                <tr className="border-b-2 border-mist text-xs tracking-wide text-body uppercase">
                  <th scope="col" className="px-4 py-3">State</th>
                  <th scope="col" className="px-4 py-3 text-right">PTs</th>
                  <th scope="col" className="px-4 py-3 text-right">OTs</th>
                  <th scope="col" className="px-4 py-3 text-right">SLPs</th>
                  <th scope="col" className="px-4 py-3 text-right">Per 100k</th>
                  <th scope="col" className="px-4 py-3">Metro pages</th>
                </tr>
              </thead>
              <tbody>
                {rows.map(({ m, metros, map }) => (
                  <tr key={m.market_abbr} className="border-b border-mist align-top last:border-b-0">
                    <th scope="row" className="px-4 py-3 font-semibold whitespace-nowrap">
                      <Link href={map.href} className="text-navy-600 hover:text-teal-600">
                        {m.market}
                      </Link>
                    </th>
                    <td className="px-4 py-3 text-right text-body tabular-nums">{n(map.pt)}</td>
                    <td className="px-4 py-3 text-right text-body tabular-nums">{n(map.ot)}</td>
                    <td className="px-4 py-3 text-right text-body tabular-nums">{n(map.slp)}</td>
                    <td className="px-4 py-3 text-right text-body tabular-nums">{map.per100k.toFixed(0)}</td>
                    <td className="px-4 py-3 text-body">
                      {metros.length === 0
                        ? "State page only"
                        : metros.map((c, i) => (
                            <span key={c.city_slug}>
                              {i > 0 && <span aria-hidden="true"> · </span>}
                              <Link href={metroHref(c)} className="whitespace-nowrap text-teal-600 hover:underline">
                                {c.city}
                              </Link>
                            </span>
                          ))}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Container>
      </section>

      <CtaBand />

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          url: `${SITE.url}/therapy-recruiters/`,
          name: "Therapy recruiters by state and metro",
          isPartOf: { "@id": `${SITE.url}/#website` },
          hasPart: markets.map((m) => ({
            "@type": "WebPage",
            name: `${m.market} physical therapy, OT and SLP recruiters`,
            url: `${SITE.url}${stateHref(m)}`,
          })),
        }}
      />
      <Breadcrumbs
        items={[
          { name: "Home", href: `${SITE.url}/` },
          { name: "Therapy Recruiters", href: `${SITE.url}/therapy-recruiters/` },
        ]}
      />
    </>
  );
}
