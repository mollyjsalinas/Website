import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/Container";
import { Hero, SectionHeading, SourceLine, CtaBand, Breadcrumbs } from "@/components/Sections";
import { compactCounts } from "@/components/CompactTable";
import { SITE, COMPACT_LIST } from "@/lib/site";
import { launchMarketsByName, stateHref } from "@/lib/markets";

export const metadata: Metadata = {
  title: "PT, OT & ASLP Licensure Compacts by State: What They Mean for Hiring",
  description:
    "Which states issue privileges under the PT Compact, the OT Compact and the ASLP-IC, and what each status means when you hire a physical therapist, OT, SLP or audiologist from another state.",
  alternates: { canonical: "/licensure-compacts/" },
};

const STATUS_SHORT = { issuing: "Issuing", member: "Member", none: "No" } as const;

export default function LicensureCompactsIndex() {
  const markets = launchMarketsByName();
  const source = markets[0]?.compacts.source ?? "";

  return (
    <>
      <Hero
        eyebrow="Licensure compacts"
        title="Therapy licensure compacts by state, and what they mean for hiring."
        primary={{ href: "/contact/hire/", label: "Hire across state lines" }}
      >
        Three interstate compacts now cover the four rehab-therapy professions. Where a state is
        issuing privileges, a candidate licensed in another issuing state can start without a
        second full license. Where it is not, the search has to plan for licensing time. Pick a
        compact for the 51-row table, or a state for all three at once.
      </Hero>

      <section className="py-20">
        <Container>
          <SectionHeading eyebrow="The three compacts" title="One page per compact" />
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {COMPACT_LIST.map((c) => {
              const counts = compactCounts(markets, c.key);
              return (
                <Link
                  key={c.key}
                  href={`/licensure-compacts/${c.slug}/`}
                  className="group rounded-lg border border-mist bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
                >
                  <h3 className="font-heading text-xl font-semibold text-navy-600 group-hover:text-teal-600">{c.name}</h3>
                  <p className="mt-2 text-sm text-body">Covers {c.professions}.</p>
                  <p className="mt-4 text-sm text-body">
                    <span className="font-semibold text-navy-600">{counts.issuing}</span> issuing ·{" "}
                    <span className="font-semibold text-navy-600">{counts.member}</span> member, not yet issuing ·{" "}
                    <span className="font-semibold text-navy-600">{counts.none}</span> not a member
                  </p>
                  <p className="mt-3 text-sm font-semibold text-teal-600">Status in every state →</p>
                </Link>
              );
            })}
          </div>
          <SourceLine>Source: {source}.</SourceLine>
        </Container>
      </section>

      <section className="bg-mist-light py-20">
        <Container>
          <SectionHeading eyebrow="By state" title="All three compacts, every state">
            Issuing means privileges are available now. Member means the law is enacted but privileges
            are not yet issued. Click a state for the plain-English version and the rest of its
            therapy market.
          </SectionHeading>
          <div className="mt-10 overflow-x-auto">
            <table className="w-full max-w-4xl border-collapse text-left text-sm">
              <thead>
                <tr className="border-b-2 border-navy-200 text-xs tracking-wide text-body uppercase">
                  <th className="py-3 pr-4">State</th>
                  <th className="py-3 pr-4">PT Compact</th>
                  <th className="py-3 pr-4">OT Compact</th>
                  <th className="py-3">ASLP-IC</th>
                </tr>
              </thead>
              <tbody>
                {markets.map((m) => (
                  <tr key={m.market_abbr} className="border-b border-mist">
                    <td className="py-2.5 pr-4 font-semibold">
                      <Link href={stateHref(m)} className="text-navy-600 hover:text-teal-600">
                        {m.market}
                      </Link>
                    </td>
                    <td className="py-2.5 pr-4 text-body">{STATUS_SHORT[m.compacts.pt]}</td>
                    <td className="py-2.5 pr-4 text-body">{STATUS_SHORT[m.compacts.ot]}</td>
                    <td className="py-2.5 text-body">{STATUS_SHORT[m.compacts.aslp]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Container>
      </section>

      <CtaBand title="Hiring a therapist from out of state?" body="We will tell you on the first call whether a compact shortens the path, and plan around the licensing time if it does not." />

      <Breadcrumbs
        items={[
          { name: "Home", href: `${SITE.url}/` },
          { name: "Licensure Compacts", href: `${SITE.url}/licensure-compacts/` },
        ]}
      />
    </>
  );
}
