import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/Container";
import { JsonLd } from "@/components/JsonLd";
import { MollyByline } from "@/components/MollyByline";
import { CtaBand, Breadcrumbs, FaqSection, type Faq } from "@/components/Sections";
import { SITE, MOLLY, CONTENT_UPDATED } from "@/lib/site";
import { postBySlug } from "@/lib/posts";
import { launchMarketsByName, nationalTotals, stateHref, supplyAsOf, type MarketSnapshot } from "@/lib/markets";
import { n, dec1, longDate } from "@/lib/format";

const SLUG = "skilled-nursing-therapy-demand-by-state";
const post = postBySlug(SLUG)!;

export const metadata: Metadata = {
  title: post.title,
  description: post.description,
  alternates: { canonical: `/blog/${SLUG}/` },
  openGraph: { type: "article", publishedTime: post.date, authors: [post.author] },
};

type Row = {
  m: MarketSnapshot;
  homes: number;
  beds: number;
  therapists: number; // PT + OT + SLP
  bedsPerTherapist: number | null; // null when a state has no therapists on file
  snfEmployment: number | null; // QCEW nursing facilities, all occupations; null when not published
};

function row(m: MarketSnapshot): Row {
  const s = m.supply.active_individual_providers;
  const therapists = s.pt + s.ot + s.slp;
  const beds = m.facilities.nursing_homes.certified_beds;
  return {
    m,
    homes: m.facilities.nursing_homes.count,
    beds,
    therapists,
    bedsPerTherapist: therapists > 0 ? beds / therapists : null,
    snfEmployment: m.sector_employment.nursing_facilities_naics_6231?.employment ?? null,
  };
}

export default function SkilledNursingDemandPage() {
  const markets = launchMarketsByName();
  const nat = nationalTotals();
  const rows = markets
    .map(row)
    .sort((a, b) => (b.bedsPerTherapist ?? -1) - (a.bedsPerTherapist ?? -1) || a.m.market.localeCompare(b.m.market));
  const first = markets[0];
  const facilitiesSource = first?.facilities.source ?? nat.sources.facilities;
  const supplySource = first?.supply.source ?? nat.sources.supply;
  const sectorSource = first?.sector_employment.source ?? nat.sources.sector;
  const asOf = first ? supplyAsOf(first) : nat.snapshot_date;
  const url = `${SITE.url}/blog/${SLUG}/`;
  const modified = nat.snapshot_date > CONTENT_UPDATED ? nat.snapshot_date : CONTENT_UPDATED;

  const natTherapists = nat.supply.pt + nat.supply.ot + nat.supply.slp;
  const natBeds = nat.facilities.nursing_homes.certified_beds;
  const natRatio = natTherapists > 0 ? natBeds / natTherapists : null;
  const top = rows[0];
  const bottom = rows[rows.length - 1];
  const withEmployment = rows.filter((r) => r.snfEmployment != null).length;

  const faqs: Faq[] = [
    {
      q: "What does beds per therapist measure, and what does it not?",
      a: `It divides a state's Medicare-certified nursing home beds by the physical therapists, occupational therapists and speech-language pathologists with an active practice address in that state, all settings combined. It is a ratio of skilled nursing capacity to the whole therapy workforce a facility competes for, not a count of therapists working in nursing homes, and it says nothing about vacancies or wages. A high ratio means many beds share each therapist in the state; a low ratio means the pool is deep relative to the beds.`,
    },
    {
      q: "Which state has the most nursing home beds per therapist?",
      a: top
        ? `${top.m.market}, with ${n(top.beds)} certified beds across ${n(top.homes)} nursing homes and ${n(top.therapists)} PTs, OTs and SLPs, or ${dec1(top.bedsPerTherapist)} beds per therapist. ${bottom.m.market} sits at the other end at ${dec1(bottom.bedsPerTherapist)}. Nationally the ratio is ${dec1(natRatio)} beds per therapist across ${n(natBeds)} beds and ${n(natTherapists)} therapists.`
        : "The table lists every state by that ratio.",
    },
    {
      q: "What is the nursing facility employment column?",
      a: `It is the Bureau of Labor Statistics QCEW private-sector employment count for NAICS 6231, nursing care facilities, in the latest quarter of the source. It covers every occupation in those facilities, nursing and dietary and administration included, not therapists alone, so read it as the size of the skilled nursing employer base in the state. ${withEmployment === rows.length ? `Every state has a published figure in this snapshot.` : `${withEmployment} of ${rows.length} states have a published figure; the rest show n/a because BLS did not publish one.`}`,
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
              A director of rehab hiring for a skilled nursing facility is competing for the same
              PTs, OTs and SLPs as every hospital, clinic and home health agency in the state. The
              table below puts the two sides of that competition next to each other for every state
              and DC: the Medicare-certified nursing homes and beds on one side, the therapists with
              an active practice address in the state on the other, and the ratio between them.
              Nationally there are {n(natBeds)} certified beds and {n(natTherapists)} PTs, OTs and
              SLPs, or {dec1(natRatio)} beds per therapist.
            </p>
            <p>
              States are ranked from the most beds per therapist to the fewest. A high ratio means
              each therapist in the state is spread across more skilled nursing capacity, which is
              the market an administrator feels as slow requisitions and agency spend; a low ratio
              means a deeper pool relative to the beds. The therapist count covers every setting,
              not only nursing homes, so the ratio describes the pool a facility recruits from, not
              its own staffing. Where BLS publishes it, the last column adds total private
              employment in nursing care facilities, all occupations, as a measure of the size of
              the skilled nursing employer base.
            </p>
          </div>

          <div className="mt-10 overflow-x-auto">
            <table className="w-full border-collapse text-left text-sm">
              <thead>
                <tr className="border-b-2 border-navy-200 text-xs tracking-wide text-body uppercase">
                  <th className="py-3 pr-4">Rank</th>
                  <th className="py-3 pr-4">State</th>
                  <th className="py-3 pr-4 text-right">Nursing homes</th>
                  <th className="py-3 pr-4 text-right">Certified beds</th>
                  <th className="py-3 pr-4 text-right">PT, OT and SLP</th>
                  <th className="py-3 pr-4 text-right">Beds per therapist</th>
                  <th className="py-3 text-right">Nursing facility employment</th>
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
                    <td className="py-2.5 pr-4 text-right text-body tabular-nums">{n(r.homes)}</td>
                    <td className="py-2.5 pr-4 text-right text-body tabular-nums">{n(r.beds)}</td>
                    <td className="py-2.5 pr-4 text-right text-body tabular-nums">{n(r.therapists)}</td>
                    <td className="py-2.5 pr-4 text-right font-semibold text-navy-600 tabular-nums">{dec1(r.bedsPerTherapist)}</td>
                    <td className="py-2.5 text-right text-body tabular-nums">{n(r.snfEmployment)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-sm text-body">
            Sources: nursing homes and certified beds from the {facilitiesSource}; therapists from
            the {supplySource}, as of {asOf}, counting PTs, OTs and SLPs with an active in-state
            practice address; nursing facility employment from {sectorSource}, NAICS 6231, all
            occupations, latest quarter. Beds per therapist is certified beds divided by PT + OT +
            SLP. n/a means BLS did not publish the figure.
          </p>

          <div className="mt-10 space-y-5 text-lg leading-relaxed text-body">
            <p>
              For an administrator, the ratio is a starting point for the pay and search
              conversation: a facility in a state near the top of the table is hiring from a
              thinner pool per bed than one near the bottom, and the offer, the schedule and the
              productivity expectation have to reflect that. Click any state for its full therapist
              count by discipline, pay, employer and licensure-compact picture.
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

      <FaqSection faqs={faqs} title="Questions about the skilled nursing numbers" />

      <MollyByline place="skilled nursing" reviewedOn={longDate(modified)} />

      <CtaBand title="Hiring therapists for a skilled nursing facility?" body="Tell us the discipline, the building and the pay range. We will give you an honest read on the market before the search starts." />

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
