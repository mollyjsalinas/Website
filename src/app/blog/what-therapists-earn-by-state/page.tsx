import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/Container";
import { JsonLd } from "@/components/JsonLd";
import { MollyByline } from "@/components/MollyByline";
import { CtaBand, Breadcrumbs } from "@/components/Sections";
import { SITE, MOLLY, CONTENT_UPDATED } from "@/lib/site";
import { postBySlug } from "@/lib/posts";
import { launchMarketsByName, nationalTotals, stateHref } from "@/lib/markets";
import { usd, longDate } from "@/lib/format";

const SLUG = "what-therapists-earn-by-state";
const post = postBySlug(SLUG)!;

export const metadata: Metadata = {
  title: post.title,
  description: post.description,
  alternates: { canonical: `/blog/${SLUG}/` },
  openGraph: { type: "article", publishedTime: post.date, authors: [post.author] },
};

export default function WhatTherapistsEarnPage() {
  const markets = launchMarketsByName();
  const nat = nationalTotals();
  const natPt = nat.compensation.pt?.annual_mean_wage;
  const natOt = nat.compensation.ot?.annual_mean_wage;
  const natSlp = nat.compensation.slp?.annual_mean_wage;
  const source = markets[0]?.compensation.source ?? nat.sources.compensation;
  const url = `${SITE.url}/blog/${SLUG}/`;
  const modified = nat.snapshot_date > CONTENT_UPDATED ? nat.snapshot_date : CONTENT_UPDATED;

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
              The table below lists the mean annual wage the Bureau of Labor Statistics estimates for
              physical therapists, occupational therapists and speech-language pathologists in every
              state and the District of Columbia. They are occupational employment estimates for
              clinicians already working, not job offers, and they say nothing about what any single
              employer is paying this month. They do tell you where a given offer sits against the
              people already employed in that state, which is the question both sides of a hiring
              conversation actually want answered.
            </p>
            <p>
              Nationally, physical therapists average {usd(natPt)}, occupational therapists {usd(natOt)}{" "}
              and speech-language pathologists {usd(natSlp)}. State figures above those lines usually
              reflect cost of living or a supply gap; figures below them are worth reading next to the
              therapist counts on each state&apos;s page, because a low wage in a state with few
              therapists per capita is a different market from a low wage in a saturated one.
            </p>
            <p>
              Suppressed cells show n/a: BLS withholds an estimate when the sample is too small to
              publish. Click any state for its full workforce, employer and licensure-compact picture.
            </p>
          </div>

          <div className="mt-10 overflow-x-auto">
            <table className="w-full border-collapse text-left text-sm">
              <thead>
                <tr className="border-b-2 border-navy-200 text-xs tracking-wide text-body uppercase">
                  <th className="py-3 pr-4">State</th>
                  <th className="py-3 pr-4">PT mean wage</th>
                  <th className="py-3 pr-4">OT mean wage</th>
                  <th className="py-3">SLP mean wage</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-mist bg-mist-light font-semibold">
                  <td className="py-2.5 pr-4 text-navy-600">United States</td>
                  <td className="py-2.5 pr-4 text-navy-600">{usd(natPt)}</td>
                  <td className="py-2.5 pr-4 text-navy-600">{usd(natOt)}</td>
                  <td className="py-2.5 text-navy-600">{usd(natSlp)}</td>
                </tr>
                {markets.map((m) => (
                  <tr key={m.market_abbr} className="border-b border-mist">
                    <td className="py-2.5 pr-4 font-semibold">
                      <Link href={stateHref(m)} className="text-navy-600 hover:text-teal-600">
                        {m.market}
                      </Link>
                    </td>
                    <td className="py-2.5 pr-4 text-body">{usd(m.compensation.pt?.annual_mean_wage)}</td>
                    <td className="py-2.5 pr-4 text-body">{usd(m.compensation.ot?.annual_mean_wage)}</td>
                    <td className="py-2.5 text-body">{usd(m.compensation.slp?.annual_mean_wage)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-sm text-body">Source: {source}. Mean annual wage, all industries.</p>

          <div className="mt-10 space-y-5 text-lg leading-relaxed text-body">
            <p>
              For an employer, the practical use is simple: if the offer you are about to make sits
              below your state&apos;s median for the discipline, the vacancy is going to explain
              itself, and no recruiter can talk a good clinician into a below-market job for long.
              For a therapist, it is the number to have in hand before the pay conversation starts.
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

      <MollyByline place="wage" reviewedOn={longDate(modified)} />

      <CtaBand title="Is your offer at market?" body="Tell us the discipline, the setting and the range. We will give you an honest read before the search starts." />

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
