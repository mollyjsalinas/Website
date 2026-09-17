import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/Container";
import { JsonLd } from "@/components/JsonLd";
import { SectionHeading, CtaBand, Breadcrumbs } from "@/components/Sections";
import { EmployerBlock } from "@/components/EmployerBlock";
import { MollyByline, MOLLY_ID } from "@/components/MollyByline";
import { MarketLinkGrid } from "@/components/MarketDirectory";
import { StateMetroMap } from "@/components/StateMetroMap";
import {
  WorkforceSection,
  PaySection,
  SectorSection,
  FacilitiesSection,
  CompactSection,
} from "@/components/DataSections";
import { SITE, CONTENT_UPDATED } from "@/lib/site";
import {
  launchMarkets,
  marketBySlug,
  marketDisplay,
  metrosForState,
  metroHref,
  stateSlug,
  supplyAsOf,
} from "@/lib/markets";
import { n, usd, longDate } from "@/lib/format";

export async function generateStaticParams() {
  return launchMarkets().map((m) => ({ state: stateSlug(m.market) }));
}

// Only scheduled states exist; unknown slugs 404 rather than render thin.
export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ state: string }>;
}): Promise<Metadata> {
  const { state } = await params;
  const m = marketBySlug(state);
  if (!m) return {};
  const s = m.supply.active_individual_providers;
  const ptMean = m.compensation.pt?.annual_mean_wage;
  return {
    title: `${m.market} Physical Therapy, OT & SLP Recruiters`,
    description: `${n(s.pt)} PTs, ${n(s.ot)} OTs and ${n(s.slp)} SLPs practice in ${marketDisplay(m)}${ptMean != null ? `; PTs average ${usd(ptMean)}` : ""}. Workforce, pay, employer and licensure-compact data, and a therapy recruiting firm run by a licensed SLP.`,
    alternates: { canonical: `/therapy-recruiters/${state}/` },
  };
}

export default async function StateMarketPage({
  params,
}: {
  params: Promise<{ state: string }>;
}) {
  const { state } = await params;
  const m = marketBySlug(state);
  if (!m) notFound();

  const disp = marketDisplay(m);
  const asOf = supplyAsOf(m);
  const metros = metrosForState(m.market_abbr);
  const url = `${SITE.url}/therapy-recruiters/${state}/`;
  const reviewedOn = longDate(m.snapshot_date > CONTENT_UPDATED ? m.snapshot_date : CONTENT_UPDATED);

  return (
    <>
      <section className="bg-navy-600 text-white">
        <Container className="py-20 sm:py-24">
          <p className="text-sm font-semibold tracking-widest text-teal-300 uppercase">
            Therapy recruiting · {m.market}
          </p>
          <h1 className="mt-4 max-w-3xl font-heading text-4xl leading-tight font-semibold sm:text-5xl">
            {m.market} physical therapy, OT and SLP recruiters
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-navy-100">
            APT Recruiting fills PT, OT, SLP and audiology roles for hospitals, skilled
            nursing, home health, outpatient clinics and schools in {disp}. Below is the current
            federal picture of the {m.market} therapy workforce, what it is paid, where it works
            and how licensing across state lines applies, the same numbers we use when we take a
            search.
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
            <Link
              href="/contact/hire/"
              className="inline-block rounded-md bg-teal-500 px-6 py-3 font-semibold text-white transition-colors hover:bg-teal-400"
            >
              Hire a therapist in {m.market}
            </Link>
            <Link href="/employers/" className="text-sm font-semibold text-teal-200 hover:text-white">
              How our therapy recruiting works →
            </Link>
          </div>
        </Container>
      </section>

      <WorkforceSection
        place={disp}
        placeIn={`in ${disp}`}
        supply={m.supply.active_individual_providers}
        per100k={m.supply.per_100k}
        inflow={m.new_provider_inflow.trailing_12_months}
        asOf={asOf}
        source={m.supply.source}
      />

      <PaySection place={disp} comp={m.compensation} national={m.compensation.national} />

      <SectorSection placeIn={`in ${disp}`} sector={m.sector_employment} />

      <FacilitiesSection placeIn={`in ${disp}`} facilities={m.facilities} />

      <CompactSection state={m.market} compacts={m.compacts} />

      {m.narrative_extra && (
        <section className="py-16">
          <Container>
            <p className="max-w-3xl leading-relaxed text-body">{m.narrative_extra}</p>
          </Container>
        </section>
      )}

      <EmployerBlock place={disp} />

      <MollyByline place={m.market} reviewedOn={reviewedOn} />

      {metros.length > 0 && (
        <section className="bg-mist-light py-20">
          <Container>
            <SectionHeading eyebrow="Metros" title={`Therapy recruiting by metro in ${m.market}`}>
              Therapist supply, pay and employers down to the metro level. Pick a city for its
              local numbers.
            </SectionHeading>
            <div className="mt-10">
              <StateMetroMap
                abbr={m.market_abbr}
                name={m.market}
                metros={metros.map((c) => ({ city: c.city, slug: c.city_slug, href: metroHref(c) }))}
              />
            </div>
            <MarketLinkGrid
              className="mt-10"
              items={metros.map((c) => ({
                label: c.city,
                href: metroHref(c),
                sub: `${n(c.supply.active_individual_providers.pt)} PTs, ${n(c.supply.active_individual_providers.slp)} SLPs`,
              }))}
            />
          </Container>
        </section>
      )}

      <CtaBand
        title={`Hiring in ${disp}?`}
        body="Tell us the discipline, the setting and the pay range. We will give you an honest read on the market before the search starts."
        label="Start a search"
      />

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          "@id": url,
          url,
          name: `${m.market} physical therapy, OT and SLP recruiters`,
          reviewedBy: { "@id": MOLLY_ID },
          dateModified: m.snapshot_date > CONTENT_UPDATED ? m.snapshot_date : CONTENT_UPDATED,
          isPartOf: { "@id": `${SITE.url}/#website` },
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: `Therapy recruiting in ${m.market}`,
          serviceType: "Physical therapy, occupational therapy, speech-language pathology and audiology recruiting",
          provider: { "@id": `${SITE.url}/#organization` },
          areaServed: { "@type": "State", name: m.market },
          url,
        }}
      />
      <Breadcrumbs
        items={[
          { name: "Home", href: `${SITE.url}/` },
          { name: "Therapy Recruiters", href: `${SITE.url}/therapy-recruiters/` },
          { name: m.market, href: url },
        ]}
      />
    </>
  );
}
