import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/Container";
import { JsonLd } from "@/components/JsonLd";
import { MollyByline } from "@/components/MollyByline";
import { CtaBand, Breadcrumbs, FaqSection, type Faq } from "@/components/Sections";
import { SITE, MOLLY, CONTENT_UPDATED } from "@/lib/site";
import { postBySlug } from "@/lib/posts";
import { launchMarketsByName, nationalTotals, stateHref, supplyAsOf, type MarketSnapshot } from "@/lib/markets";
import { n, pct, longDate } from "@/lib/format";

const SLUG = "home-health-speech-therapy-coverage-by-state";
const post = postBySlug(SLUG)!;

export const metadata: Metadata = {
  title: post.title,
  description: post.description,
  alternates: { canonical: `/blog/${SLUG}/` },
  openGraph: { type: "article", publishedTime: post.date, authors: [post.author] },
};

type Row = {
  m: MarketSnapshot;
  agencies: number;
  slp: number;
  ot: number;
  pt: number;
  slps: number; // SLPs with an active in-state practice address
};

function row(m: MarketSnapshot): Row {
  const hh = m.facilities.home_health_agencies;
  return {
    m,
    agencies: hh.count,
    slp: hh.offers_slp_pct,
    ot: hh.offers_ot_pct,
    pt: hh.offers_pt_pct,
    slps: m.supply.active_individual_providers.slp,
  };
}

export default function HomeHealthSlpCoveragePage() {
  const markets = launchMarketsByName();
  const nat = nationalTotals();
  // Thinnest SLP coverage first; ties by state name.
  const rows = markets.map(row).sort((a, b) => a.slp - b.slp || a.m.market.localeCompare(b.m.market));
  const first = markets[0];
  const facilitiesSource = first?.facilities.source ?? nat.sources.facilities;
  const supplySource = first?.supply.source ?? nat.sources.supply;
  const asOf = first ? supplyAsOf(first) : nat.snapshot_date;
  const url = `${SITE.url}/blog/${SLUG}/`;
  const modified = nat.snapshot_date > CONTENT_UPDATED ? nat.snapshot_date : CONTENT_UPDATED;

  const thinnest = rows[0];
  const fullest = rows[rows.length - 1];
  const under75 = rows.filter((r) => r.slp < 75).length;
  const slpBelowPt = rows.filter((r) => r.slp < r.pt).length;
  const slpBelowOt = rows.filter((r) => r.slp < r.ot).length;

  const faqs: Faq[] = [
    {
      q: "What does the SLP coverage percentage mean?",
      a: `It is the share of Medicare-certified home health agencies in the state that list speech therapy among the services they offer, from the CMS home health provider file. An agency that does not list it is not staffing the discipline. The figure describes how widespread the service is among agencies, not how many SLP visits are delivered or how many SLPs each agency employs.`,
    },
    {
      q: "Where is home health speech therapy coverage thinnest?",
      a: thinnest
        ? `${thinnest.m.market}, where ${pct(thinnest.slp)} of ${n(thinnest.agencies)} agencies offer speech therapy, against ${pct(thinnest.pt)} offering physical therapy. ${fullest.m.market} is at the other end at ${pct(fullest.slp)} of ${n(fullest.agencies)} agencies. ${under75} of ${rows.length} states have SLP coverage below 75%.`
        : "The table ranks every state by SLP coverage.",
    },
    {
      q: "Is speech therapy less common in home health than PT and OT?",
      a: `In this data, yes. SLP coverage is below PT coverage in ${slpBelowPt} of ${rows.length} states and below OT coverage in ${slpBelowOt}. Nationally, ${n(nat.facilities.home_health_agencies.count)} agencies are Medicare-certified and ${n(nat.supply.slp)} speech-language pathologists hold an active practice address, across every setting. For an agency adding speech therapy, the state's SLP count in the last column is the pool it recruits from.`,
    },
  ];

  return (
    <>
      <article className="py-16">
        <Container className="max-w-3xl">
          <p className="text-sm font-semibold tracking-widest text-teal-600 uppercase">Insights</p>
          <h1 className="mt-2 font-heading text-4xl font-semibold leading-tight text-navy-600">{post.title}</h1>
          <p className="mt-4 text-sm text-body">
            By {post.author}, {MOLLY.credential.toLowerCase()} · {longDate(post.date)} · {post.readingMinutes} min read
          </p>

          <div className="mt-8 space-y-5 text-lg leading-relaxed text-body">
            <p>
              Every Medicare-certified home health agency reports which therapy services it offers,
              and speech therapy is the one most often missing. The table below shows, for every
              state and DC, the share of agencies that offer speech-language pathology, occupational
              therapy and physical therapy, ranked from the thinnest SLP coverage to the fullest.
              Nationally {n(nat.facilities.home_health_agencies.count)} agencies are certified;{" "}
              {under75} states have SLP coverage below 75%, and SLP trails PT in {slpBelowPt} of{" "}
              {rows.length} states.
            </p>
            <p>
              For an agency, thin coverage cuts two ways. Where few agencies offer speech therapy,
              adding it is a differentiator with referral sources and there are fewer agencies
              bidding for the same home health SLPs; it also means fewer clinicians in the state
              already work in the visit-based model, so the search draws on SLPs from schools,
              skilled nursing and outpatient who have to choose home health on purpose. The last
              column gives the state&apos;s SLP count across all settings, the pool that search
              draws from.
            </p>
          </div>

          <div className="mt-10 overflow-x-auto">
            <table className="w-full border-collapse text-left text-sm">
              <thead>
                <tr className="border-b-2 border-navy-200 text-xs tracking-wide text-body uppercase">
                  <th className="py-3 pr-4">Rank</th>
                  <th className="py-3 pr-4">State</th>
                  <th className="py-3 pr-4 text-right">Agencies</th>
                  <th className="py-3 pr-4 text-right">Offer SLP</th>
                  <th className="py-3 pr-4 text-right">Offer OT</th>
                  <th className="py-3 pr-4 text-right">Offer PT</th>
                  <th className="py-3 text-right">SLPs in state</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r, i) => (
                  <tr key={r.m.market_abbr} className="border-b border-mist">
                    <td className="py-2.5 pr-4 text-body tabular-nums">{i + 1}</td>
                    <td className="py-2.5 pr-4 font-semibold whitespace-nowrap">
                      <Link href={stateHref(r.m)} className="text-navy-600 hover:text-teal-600">
                        {r.m.market}
                      </Link>
                    </td>
                    <td className="py-2.5 pr-4 text-right text-body tabular-nums">{n(r.agencies)}</td>
                    <td className="py-2.5 pr-4 text-right font-semibold text-navy-600 tabular-nums">{pct(r.slp)}</td>
                    <td className="py-2.5 pr-4 text-right text-body tabular-nums">{pct(r.ot)}</td>
                    <td className="py-2.5 pr-4 text-right text-body tabular-nums">{pct(r.pt)}</td>
                    <td className="py-2.5 text-right text-body tabular-nums">{n(r.slps)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-sm text-body">
            Sources: agency counts and services offered from the {facilitiesSource}; SLP counts from
            the {supplySource}, as of {asOf}, counting speech-language pathologists with an active
            in-state practice address in any setting. Coverage is the share of an area&apos;s
            Medicare-certified agencies that list the service.
          </p>

          <div className="mt-10 space-y-5 text-lg leading-relaxed text-body">
            <p>
              If your agency is in a state near the top of the table, most of the SLPs you can hire
              from are working in other settings today, and the pitch has to be about the model:
              the territory, the visit expectation, the documentation load and how the work is paid.
              Click any state for its full therapist count, pay, employer and licensure picture.
            </p>
          </div>

          <h2 className="mt-12 font-heading text-xl font-semibold text-navy-600">Related</h2>
          <ul className="mt-3 space-y-2">
            {post.related.map((r) => (
              <li key={r.href}>
                <Link href={r.href} className="font-semibold text-teal-600 hover:text-teal-700">
                  {r.label} →
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </article>

      <FaqSection faqs={faqs} title="Questions about the home health numbers" />

      <MollyByline place="home health" reviewedOn={longDate(modified)} />

      <CtaBand title="Adding or staffing speech therapy in home health?" body="Tell us the territory, the visit expectation and the pay model. We will give you an honest read on the SLP market before the search starts." />

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: post.title,
          description: post.description,
          datePublished: post.date,
          dateModified: modified,
          author: { "@id": `${SITE.url}/#molly` },
          publisher: { "@id": `${SITE.url}/#organization` },
          mainEntityOfPage: url,
          url,
        }}
      />
      <Breadcrumbs
        items={[
          { name: "Home", href: `${SITE.url}/` },
          { name: "Insights", href: `${SITE.url}/blog/` },
          { name: post.title, href: url },
        ]}
      />
    </>
  );
}
