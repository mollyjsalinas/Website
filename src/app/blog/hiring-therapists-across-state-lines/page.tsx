import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/Container";
import { JsonLd } from "@/components/JsonLd";
import { MollyByline } from "@/components/MollyByline";
import { CtaBand, Breadcrumbs, FaqSection, type Faq } from "@/components/Sections";
import { compactCounts } from "@/components/CompactTable";
import { SITE, MOLLY, CONTENT_UPDATED, COMPACTS, COMPACT_LIST, type CompactKey } from "@/lib/site";
import { postBySlug } from "@/lib/posts";
import { launchMarketsByName, nationalTotals, stateHref, type CompactStatus } from "@/lib/markets";
import { longDate, list } from "@/lib/format";

const SLUG = "hiring-therapists-across-state-lines";
const post = postBySlug(SLUG)!;

export const metadata: Metadata = {
  title: post.title,
  description: post.description,
  alternates: { canonical: `/blog/${SLUG}/` },
  openGraph: { type: "article", publishedTime: post.date, authors: [post.author] },
};

const STATUS_LABEL: Record<CompactStatus, string> = {
  issuing: "Issuing privileges",
  member: "Member, not yet issuing",
  none: "Not a member",
};

const STATUS_CLASS: Record<CompactStatus, string> = {
  issuing: "text-teal-700 font-semibold",
  member: "text-navy-600",
  none: "text-body",
};

// The disciplines an employer in this state can hire on a compact privilege today.
const HIRE_TODAY: Record<CompactKey, string> = { pt: "PT", ot: "OT", aslp: "SLP and audiology" };

export default function HiringAcrossStateLinesPage() {
  const markets = launchMarketsByName();
  const nat = nationalTotals();
  const source = markets[0]?.compacts.source ?? "";
  const url = `${SITE.url}/blog/${SLUG}/`;
  const modified = nat.snapshot_date > CONTENT_UPDATED ? nat.snapshot_date : CONTENT_UPDATED;

  const counts = {
    pt: compactCounts(markets, "pt"),
    ot: compactCounts(markets, "ot"),
    aslp: compactCounts(markets, "aslp"),
  };
  const allThree = markets.filter((m) => m.compacts.pt === "issuing" && m.compacts.ot === "issuing" && m.compacts.aslp === "issuing");
  const noneIssuing = markets.filter((m) => m.compacts.pt !== "issuing" && m.compacts.ot !== "issuing" && m.compacts.aslp !== "issuing");

  const faqs: Faq[] = [
    {
      q: "What is a compact privilege, and how is it different from a license?",
      a: `A compact privilege is permission to practice in a member state that a clinician obtains on the strength of the license they already hold in another member state, without applying for a second full license. It is issued through the compact commission rather than the state board, and it only exists between states that have both joined the compact and started issuing. As of the source date, ${counts.pt.issuing} states issue Physical Therapy Compact privileges, ${counts.ot.issuing} issue Occupational Therapy Licensure Compact privileges and ${counts.aslp.issuing} issue privileges under the Audiology and Speech-Language Pathology Interstate Compact.`,
    },
    {
      q: "My state is a compact member but is not issuing yet. Can I hire an out-of-state therapist on a privilege?",
      a: `Not yet. Member status means the legislature has enacted the compact, but privileges are not available until the commission brings the state online. Until then an out-of-state hire needs the full state license, the same as in a non-member state. ${counts.pt.member} states sit in that column for the PT Compact, ${counts.ot.member} for the OT Compact and ${counts.aslp.member} for the ASLP-IC as of ${source.replace(/.*checked /, "")}.`,
    },
    {
      q: "Which states let an employer hire a PT, an OT and an SLP from another state on a privilege today?",
      a:
        allThree.length > 0
          ? `${allThree.length} ${allThree.length === 1 ? "state issues" : "states issue"} privileges under all three compacts as of the source date: ${list(allThree.map((m) => m.market))}. Everywhere else at least one discipline still needs a full state license.`
          : "No state issues privileges under all three compacts as of the source date. Every state still needs a full state license for at least one of the three disciplines.",
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
              Three interstate compacts now decide how fast a therapy hire from another state can
              start: the{" "}
              <Link href={`/licensure-compacts/${COMPACTS.pt.slug}/`} className="font-semibold text-teal-600 hover:text-teal-700">
                {COMPACTS.pt.name}
              </Link>{" "}
              for PTs and PTAs, the{" "}
              <Link href={`/licensure-compacts/${COMPACTS.ot.slug}/`} className="font-semibold text-teal-600 hover:text-teal-700">
                {COMPACTS.ot.name}
              </Link>{" "}
              for OTs and OTAs, and the{" "}
              <Link href={`/licensure-compacts/${COMPACTS.aslp.slug}/`} className="font-semibold text-teal-600 hover:text-teal-700">
                {COMPACTS.aslp.name}
              </Link>{" "}
              for SLPs and audiologists. In a state that is issuing, a clinician licensed in another
              issuing state can obtain a compact privilege and start without a second full license.
              Everywhere else, the state license comes first and the search waits on it.
            </p>
            <p>
              The catch for a hiring manager is the middle column. A state that has enacted a compact
              is a member, but until the commission brings it online no privileges are available, so an
              out-of-state candidate still needs the full state license. The
              table below shows all three compacts for every state and DC, plus the disciplines you
              can hire on a privilege today. As of the source date, {counts.pt.issuing} states issue
              PT privileges, {counts.ot.issuing} issue OT privileges and {counts.aslp.issuing} issue
              SLP and audiology privileges; {noneIssuing.length} issue none of the three.
            </p>
          </div>

          <div className="mt-10 overflow-x-auto">
            <table className="w-full border-collapse text-left text-sm">
              <thead>
                <tr className="border-b-2 border-navy-200 text-xs tracking-wide text-body uppercase">
                  <th className="py-3 pr-4">State</th>
                  <th className="py-3 pr-4">PT Compact</th>
                  <th className="py-3 pr-4">OT Compact</th>
                  <th className="py-3 pr-4">ASLP-IC</th>
                  <th className="py-3">Hire on a privilege today</th>
                </tr>
              </thead>
              <tbody>
                {markets.map((m) => {
                  const today = COMPACT_LIST.filter((c) => m.compacts[c.key] === "issuing").map((c) => HIRE_TODAY[c.key]);
                  return (
                    <tr key={m.market_abbr} className="border-b border-mist align-top">
                      <td className="py-2.5 pr-4 font-semibold whitespace-nowrap">
                        <Link href={stateHref(m)} className="text-navy-600 hover:text-teal-600">
                          {m.market}
                        </Link>
                      </td>
                      {COMPACT_LIST.map((c) => (
                        <td key={c.key} className={`py-2.5 pr-4 ${STATUS_CLASS[m.compacts[c.key]]}`}>
                          {STATUS_LABEL[m.compacts[c.key]]}
                        </td>
                      ))}
                      <td className="py-2.5 text-body">{today.length ? list(today) : "None"}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-sm text-body">
            Source: {source}. Status is the compact commission&apos;s listing for each state on that
            date; it changes as legislatures act and as the commissions bring states online.
          </p>

          <div className="mt-10 space-y-5 text-lg leading-relaxed text-body">
            <p>
              Read the row for the state you are hiring into, not the state the candidate lives in.
              If your state is issuing for the discipline, the search can run nationally from the
              first day and a candidate can usually start weeks sooner. If it is a member not yet
              issuing, or not a member, plan the search around in-state clinicians or build the
              full licensing time into the start date. Click any state for its therapist counts,
              pay and employer picture alongside its compact status.
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

      <FaqSection faqs={faqs} title="Compact questions employers ask" />

      <MollyByline place="compact status" reviewedOn={longDate(modified)} />

      <CtaBand title="Hiring a therapist from out of state?" body="We will tell you on the first call whether the compact shortens the path, and plan the search around the licensing time if it does not." />

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
