import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/Container";
import { JsonLd } from "@/components/JsonLd";
import { SectionHeading, CtaBand, Breadcrumbs } from "@/components/Sections";
import { compactSentence } from "@/components/DataSections";
import { SITE, COMPACTS } from "@/lib/site";
import { marketByAbbr, stateHref, stateSlug } from "@/lib/markets";
import { salaryHref, stateWage, jobsFor } from "@/lib/salary";
import {
  LIC_PROFESSIONS,
  FACT_KEYS,
  licensureGuides,
  licensureGuide,
  licensureHref,
  salaryRoleFor,
  sourceList,
  type Fact,
  type FactKey,
} from "@/lib/licensure";
import { usd, longDate } from "@/lib/format";

export async function generateStaticParams() {
  return licensureGuides().map(({ g, prof }) => ({ state: stateSlug(g.state), profession: LIC_PROFESSIONS[prof].slug }));
}

export const dynamicParams = false;

const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

export async function generateMetadata({
  params,
}: {
  params: Promise<{ state: string; profession: string }>;
}): Promise<Metadata> {
  const { state, profession } = await params;
  const x = licensureGuide(state, profession);
  if (!x) return {};
  const P = LIC_PROFESSIONS[x.prof];
  const words = P.discipline.replace(/(^|[\s-])([a-z])/g, (_, p: string, c: string) => p + c.toUpperCase());
  return {
    title: `${x.g.state} ${words} License: Requirements, Exams and Fees`,
    description: `How to get a ${x.g.state} ${P.discipline} license: education, exams, background check, fees, licensure by endorsement and renewal, each cited to the ${x.g.state} board's own pages.`,
    alternates: { canonical: licensureHref(x.g.abbr, x.prof) },
  };
}

// Display order, grouped into the page's sections.
const STEPS: FactKey[] = ["education", "national_exam", "state_exam", "required_courses", "background_check", "application_fee", "apply_url", "processing_time"];
const MOVING: FactKey[] = ["endorsement", "compact"];
const EARLY: FactKey[] = ["temporary_or_provisional"];
const KEEPING: FactKey[] = ["renewal", "continuing_education"];
const LABELS: Record<FactKey, string> = {
  board: "Licensing board",
  education: "Education",
  national_exam: "National exam",
  state_exam: "State law exam",
  required_courses: "Required courses",
  background_check: "Background check",
  application_fee: "Fees",
  apply_url: "Where to apply",
  processing_time: "Processing time",
  endorsement: "Licensed in another state",
  compact: "Interstate compact",
  temporary_or_provisional: "Temporary or provisional license",
  renewal: "Renewal",
  continuing_education: "Continuing education",
};

function FactRow({ k, f, n }: { k: FactKey; f: Fact; n: number | null }) {
  return (
    <div className="border-b border-mist py-5">
      <dt className="text-sm font-semibold tracking-wide text-teal-700 uppercase">{LABELS[k]}</dt>
      <dd className="mt-1 leading-relaxed text-body">
        {f.value}{" "}
        {n != null && (
          <a href={`#source-${n}`} className="align-super text-xs font-semibold text-teal-600" aria-label={`Source ${n}`}>
            [{n}]
          </a>
        )}
        {k === "apply_url" && (
          <>
            {" "}
            <a href={f.source_url} rel="nofollow noopener" target="_blank" className="font-semibold text-teal-600 hover:text-teal-700">
              Open the application →
            </a>
          </>
        )}
      </dd>
    </div>
  );
}

export default async function LicensurePage({ params }: { params: Promise<{ state: string; profession: string }> }) {
  const { state, profession } = await params;
  const x = licensureGuide(state, profession);
  if (!x) notFound();
  const { g, prof, facts } = x;
  const P = LIC_PROFESSIONS[prof];
  const m = marketByAbbr(g.abbr);
  const board = facts.board!;
  const { urls, num } = sourceList(facts, ["board", ...FACT_KEYS]);
  const role = salaryRoleFor(prof);
  const wage = m ? stateWage(m, role) : undefined;
  const jobs = jobsFor(prof, g.abbr);
  const compact = COMPACTS[P.compact];
  const others = licensureGuides().filter((o) => o.g.abbr === g.abbr && o.prof !== prof);
  const url = `${SITE.url}${licensureHref(g.abbr, prof)}`;
  const section = (keys: FactKey[]) => keys.filter((k) => facts[k]);

  const block = (eyebrow: string, title: string, keys: FactKey[], intro?: string) =>
    section(keys).length === 0 ? null : (
      <section className="py-14">
        <Container>
          <SectionHeading eyebrow={eyebrow} title={title}>
            {intro}
          </SectionHeading>
          <dl className="mt-6 max-w-3xl">
            {section(keys).map((k) => (
              <FactRow key={k} k={k} f={facts[k]!} n={num(k)} />
            ))}
          </dl>
        </Container>
      </section>
    );

  return (
    <>
      <section className="bg-navy-600 text-white">
        <Container className="py-20 sm:py-24">
          <p className="text-sm font-semibold tracking-widest text-teal-300 uppercase">Licensure guide · {g.state}</p>
          <h1 className="mt-4 max-w-3xl font-heading text-4xl leading-tight font-semibold sm:text-5xl">
            How to get a {g.state} {P.discipline} license
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-navy-100">
            {cap(P.plural)} in {g.state} are licensed by the{" "}
            <a href={board.source_url} rel="noopener" target="_blank" className="font-semibold text-white underline">
              {board.value.replace(/\.$/, "")}
            </a>
            . Below is what the board requires, from education to renewal, with every requirement linked to the
            board page it comes from. Checked {longDate(g.researched_on)}.
          </p>
        </Container>
      </section>

      {block("Step by step", "Getting licensed", STEPS)}

      <div className="bg-mist-light">
        {block(
          "Moving to the state",
          "Already licensed somewhere else?",
          MOVING,
          m ? compactSentence(g.state, P.compact, m.compacts[P.compact]) : undefined,
        )}
      </div>

      {block("Before your full license", "New graduates and clinical fellows", EARLY)}

      <div className="bg-mist-light">
        {block("After you are licensed", "Keeping the license active", KEEPING)}
      </div>

      <section className="py-14">
        <Container>
          <SectionHeading eyebrow={`Working in ${g.state}`} title="Pay and openings">
            {wage
              ? `${cap(P.plural)} in ${g.state} earn a mean of ${usd(wage.annual_mean_wage)} a year (BLS). `
              : ""}
            {jobs.length > 0
              ? `We have ${jobs.length} public ${P.discipline} ${jobs.length === 1 ? "opening" : "openings"} in ${g.state} right now, and more searches that are never posted.`
              : `Most of our ${g.state} searches are confidential and never posted; tell us what you want and we will match you quietly.`}
          </SectionHeading>
          <ul className="mt-6 space-y-2">
            {m && wage && (
              <li>
                <Link href={salaryHref(role, m)} className="font-semibold text-teal-600 hover:text-teal-700">
                  {P.label} salary in {g.state}, by metro →
                </Link>
              </li>
            )}
            {jobs.map((j) => (
              <li key={j.slug}>
                <Link href={`/jobs/${j.slug}/`} className="font-semibold text-teal-600 hover:text-teal-700">
                  {j.title}, {j.city} →
                </Link>
              </li>
            ))}
            {m && (
              <li>
                <Link href={stateHref(m)} className="font-semibold text-teal-600 hover:text-teal-700">
                  The {g.state} therapy workforce →
                </Link>
              </li>
            )}
            <li>
              <Link href={`/licensure-compacts/${compact.slug}/`} className="font-semibold text-teal-600 hover:text-teal-700">
                How the {compact.shortName} works →
              </Link>
            </li>
          </ul>
        </Container>
      </section>

      <section className="border-t border-mist py-14">
        <Container>
          <h2 className="font-heading text-xl font-semibold text-navy-600">Sources</h2>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-body">
            Every requirement above was checked against the official page listed here on {longDate(g.researched_on)}.
            Boards change fees and rules, so confirm with the {g.state} board before you apply. This page is a guide,
            not legal advice.
          </p>
          <ol className="mt-4 max-w-3xl space-y-2 text-sm">
            {urls.map((u, i) => (
              <li key={u} id={`source-${i + 1}`} className="break-all text-body">
                [{i + 1}]{" "}
                <a href={u} rel="nofollow noopener" target="_blank" className="text-teal-600 hover:text-teal-700">
                  {u}
                </a>
              </li>
            ))}
          </ol>
          <div className="mt-10 grid gap-8 md:grid-cols-2">
              {others.length > 0 && (
                <div>
                  <h2 className="font-heading text-lg font-semibold text-navy-600">Other {g.state} licenses</h2>
                  <ul className="mt-3 space-y-2">
                    {others.map((o) => (
                      <li key={o.prof}>
                        <Link href={licensureHref(o.g.abbr, o.prof)} className="text-teal-600 hover:text-teal-700">
                          {g.state} {LIC_PROFESSIONS[o.prof].discipline} license
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              <div>
                <h2 className="font-heading text-lg font-semibold text-navy-600">{cap(P.discipline)} licenses in other states</h2>
                <p className="mt-3">
                  <Link href="/licensure/" className="text-teal-600 hover:text-teal-700">
                    State-by-state license guides →
                  </Link>
                </p>
              </div>
          </div>
        </Container>
      </section>

      <CtaBand
        title={`Getting licensed in ${g.state} for a move?`}
        body="Tell us the setting and the city you want. We will tell you which employers are hiring and how long they will wait for a license."
        label="Start a confidential conversation"
        href="/job-seekers/"
      />

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          "@id": url,
          url,
          name: `How to get a ${g.state} ${P.discipline} license`,
          dateModified: g.researched_on,
          isPartOf: { "@id": `${SITE.url}/#website` },
          citation: urls,
        }}
      />
      <Breadcrumbs
        items={[
          { name: "Home", href: `${SITE.url}/` },
          { name: "Licensure", href: `${SITE.url}/licensure/` },
          { name: `${g.state} ${P.discipline} license`, href: url },
        ]}
      />
    </>
  );
}
