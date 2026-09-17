import Link from "next/link";
import { Container } from "@/components/Container";
import { JsonLd } from "@/components/JsonLd";
import { Hero, SectionHeading, StatTile, SourceLine, CtaBand, Breadcrumbs } from "@/components/Sections";
import { EmployerBlock } from "@/components/EmployerBlock";
import { MollyByline } from "@/components/MollyByline";
import { compactSentence } from "@/components/DataSections";
import { SITE, CONTENT_UPDATED, COMPACTS, type CompactKey } from "@/lib/site";
import { launchMarketsByName, stateHref, type CompactStatus, type MarketSnapshot } from "@/lib/markets";
import { longDate } from "@/lib/format";

const GROUPS: { status: CompactStatus; title: string; blurb: string }[] = [
  {
    status: "issuing",
    title: "Issuing compact privileges",
    blurb: "A clinician licensed in another issuing state can obtain a privilege to practice here without a new state license.",
  },
  {
    status: "member",
    title: "Member, not yet issuing",
    blurb: "The compact has been enacted but privileges are not yet available; an out-of-state hire still needs a full state license for now.",
  },
  {
    status: "none",
    title: "Not a member",
    blurb: "Every hire licensed elsewhere needs a full state license before starting. Budget the licensing time into the search.",
  },
];

export function compactCounts(markets: MarketSnapshot[], key: CompactKey): Record<CompactStatus, number> {
  const counts: Record<CompactStatus, number> = { issuing: 0, member: 0, none: 0 };
  for (const m of markets) counts[m.compacts[key]] += 1;
  return counts;
}

export function CompactPage({ compactKey }: { compactKey: CompactKey }) {
  const c = COMPACTS[compactKey];
  const markets = launchMarketsByName();
  const counts = compactCounts(markets, compactKey);
  const source = markets[0]?.compacts.source ?? "";
  const url = `${SITE.url}/licensure-compacts/${c.slug}/`;
  const reviewedOn = longDate(markets[0] && markets[0].snapshot_date > CONTENT_UPDATED ? markets[0].snapshot_date : CONTENT_UPDATED);

  return (
    <>
      <Hero
        eyebrow="Licensure compacts"
        title={`${c.name}: status in all 50 states and DC`}
        primary={{ href: "/contact/hire/", label: "Hire across state lines" }}
        secondary={{ href: "/licensure-compacts/", label: "All three therapy compacts" }}
      >
        The {c.shortName} lets {c.professions} licensed in one member state practice in other
        member states under a compact privilege instead of a second full license. For an employer
        that means a wider candidate pool and a shorter path to a start date, but only in the
        states that are actually issuing privileges. Here is where every state stands.
      </Hero>

      <section className="py-20">
        <Container>
          <div className="grid gap-6 sm:grid-cols-3">
            <StatTile value={String(counts.issuing)} label="Issuing privileges" />
            <StatTile value={String(counts.member)} label="Member, not yet issuing" />
            <StatTile value={String(counts.none)} label="Not a member" />
          </div>
          <SourceLine>Source: {source}. Status changes as legislatures act and as the commission brings states online; the state pages carry the same date.</SourceLine>
        </Container>
      </section>

      <section className="bg-mist-light py-20">
        <Container>
          <SectionHeading eyebrow="What it means for hiring" title={`How the ${c.shortName} changes a search`}>
            In an issuing state, a candidate licensed in any other issuing state can usually start
            weeks sooner, and the search can run nationally from day one. In a member state that is
            not yet issuing, and in every non-member state, an out-of-state hire needs the full state
            license first, so the search either starts with in-state clinicians or builds licensing
            time into the offer. We plan every search around the column the state sits in.
          </SectionHeading>
        </Container>
      </section>

      {GROUPS.map((g) => {
        const rows = markets.filter((m) => m.compacts[compactKey] === g.status);
        return (
          <section key={g.status} className="py-16">
            <Container>
              <h2 className="font-heading text-2xl font-semibold text-navy-600">
                {g.title} ({rows.length})
              </h2>
              <p className="mt-2 max-w-2xl text-body">{g.blurb}</p>
              {rows.length === 0 ? (
                <p className="mt-6 text-sm text-body">No states in this group.</p>
              ) : (
                <div className="mt-6 overflow-x-auto">
                  <table className="w-full max-w-4xl border-collapse text-left">
                    <thead>
                      <tr className="border-b-2 border-navy-200 text-sm tracking-wide text-body uppercase">
                        <th className="py-3 pr-4">State</th>
                        <th className="py-3">What it means for an employer</th>
                      </tr>
                    </thead>
                    <tbody>
                      {rows.map((m) => (
                        <tr key={m.market_abbr} className="border-b border-mist align-top">
                          <td className="py-3 pr-4 font-semibold whitespace-nowrap">
                            <Link href={stateHref(m)} className="text-navy-600 hover:text-teal-600">
                              {m.market}
                            </Link>
                          </td>
                          <td className="py-3 text-sm leading-relaxed text-body">
                            {compactSentence(m.market, compactKey, m.compacts[compactKey])}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </Container>
          </section>
        );
      })}

      <EmployerBlock />

      <MollyByline place="compact status" reviewedOn={reviewedOn} />

      <CtaBand title="Hiring a therapist from out of state?" body="We will tell you on the first call whether the compact shortens the path, and plan the search around the licensing time if it does not." />

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          url,
          name: `${c.name} status by state`,
          isPartOf: { "@id": `${SITE.url}/#website` },
          about: { "@type": "Thing", name: c.name, url: `https://${c.site}/` },
        }}
      />
      <Breadcrumbs
        items={[
          { name: "Home", href: `${SITE.url}/` },
          { name: "Licensure Compacts", href: `${SITE.url}/licensure-compacts/` },
          { name: c.shortName, href: url },
        ]}
      />
    </>
  );
}
