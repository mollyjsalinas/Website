import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/Container";
import { JsonLd } from "@/components/JsonLd";
import { CtaBand, Breadcrumbs } from "@/components/Sections";
import { EmployerBlock } from "@/components/EmployerBlock";
import { MollyByline, MOLLY_ID } from "@/components/MollyByline";
import { WorkforceSection, PaySection, SectorSection, FacilitiesSection } from "@/components/DataSections";
import { SITE, CONTENT_UPDATED } from "@/lib/site";
import {
  launchMarkets,
  marketBySlug,
  metroBySlug,
  metrosForState,
  stateSlug,
  supplyAsOf,
} from "@/lib/markets";
import { n, usd, longDate } from "@/lib/format";

export async function generateStaticParams() {
  return launchMarkets().flatMap((m) =>
    metrosForState(m.market_abbr).map((c) => ({
      state: stateSlug(m.market),
      city: c.city_slug,
    })),
  );
}

// Only staged, owner-state metros build; unknown city slugs 404.
export const dynamicParams = false;

// "New York" the city and "New York" the state must not share a <title>.
// A city that shares its name with ANY state (New York, Washington, California MD)
// would otherwise publish the same <title> as that state page.
const STATE_NAMES = new Set(launchMarkets().map((m) => m.market));
function titlePlace(c: { city: string; state: string }): string {
  return STATE_NAMES.has(c.city) ? `${c.city} metro area` : c.city;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ state: string; city: string }>;
}): Promise<Metadata> {
  const { state, city } = await params;
  const c = metroBySlug(state, city);
  if (!c) return {};
  const s = c.supply.active_individual_providers;
  const ptMean = c.compensation?.pt?.annual_mean_wage;
  return {
    title: `${titlePlace(c)} Physical Therapy, OT & SLP Recruiters`,
    description: `${n(s.pt)} PTs, ${n(s.ot)} OTs and ${n(s.slp)} SLPs practice in the ${c.city}, ${c.state_abbr} metro${ptMean != null ? `; PTs average ${usd(ptMean)}` : ""}. Local workforce, pay and employer data, and a therapy recruiting firm run by a licensed SLP.`,
    alternates: { canonical: `/therapy-recruiters/${state}/${city}/` },
  };
}

export default async function MetroMarketPage({
  params,
}: {
  params: Promise<{ state: string; city: string }>;
}) {
  const { state, city } = await params;
  const c = metroBySlug(state, city);
  if (!c) notFound();

  const parent = marketBySlug(state);
  const asOf = supplyAsOf(c);
  const url = `${SITE.url}/therapy-recruiters/${state}/${city}/`;
  const stateUrl = `/therapy-recruiters/${state}/`;
  const place = titlePlace(c);
  const placeIn = `in the ${c.city} metro`;
  const reviewedOn = longDate(c.snapshot_date > CONTENT_UPDATED ? c.snapshot_date : CONTENT_UPDATED);

  return (
    <>
      <section className="bg-navy-600 text-white">
        <Container className="py-20 sm:py-24">
          <p className="text-sm font-semibold tracking-widest text-teal-300 uppercase">
            Therapy recruiting · {c.city}, {c.state_abbr}
          </p>
          <h1 className="mt-4 max-w-3xl font-heading text-4xl leading-tight font-semibold sm:text-5xl">
            {place} physical therapy, OT and SLP recruiters
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-navy-100">
            APT Recruiting fills PT, OT, SLP and audiology roles for hospitals, skilled
            nursing, home health, outpatient clinics and schools across the {c.metro} area. Below
            is the current federal picture of the local therapy workforce, the same numbers we use
            when we take a search here.
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
            <Link
              href="/contact/hire/"
              className="inline-block rounded-md bg-teal-500 px-6 py-3 font-semibold text-white transition-colors hover:bg-teal-400"
            >
              Hire a therapist in {c.city}
            </Link>
            <Link href={stateUrl} className="text-sm font-semibold text-teal-200 hover:text-white">
              See the whole {c.state} market →
            </Link>
          </div>
        </Container>
      </section>

      <WorkforceSection
        place={c.city}
        placeIn={placeIn}
        supply={c.supply.active_individual_providers}
        inflow={c.new_provider_inflow.trailing_12_months}
        asOf={asOf}
        scope={c.supply.scope}
        source={c.supply.source}
      />

      {c.compensation ? (
        <PaySection
          place={`the ${c.city} metro`}
          comp={c.compensation}
          national={parent?.compensation.national}
          extraNote={
            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-body">
              Metro figures cover the whole {c.metro} statistical area.{" "}
              <Link href={stateUrl} className="font-semibold text-teal-600 hover:text-teal-700">
                See {c.state} statewide pay →
              </Link>
            </p>
          }
        />
      ) : (
        <section className="bg-mist-light py-16">
          <Container>
            <p className="max-w-3xl leading-relaxed text-body">
              BLS does not publish metro-level therapist wage estimates for the {c.metro} area.{" "}
              <Link href={stateUrl} className="font-semibold text-teal-600 hover:text-teal-700">
                See {c.state} statewide pay for PTs, OTs, SLPs and audiologists →
              </Link>
            </p>
          </Container>
        </section>
      )}

      <SectorSection placeIn={placeIn} sector={c.sector_employment} metro />

      <FacilitiesSection placeIn={placeIn} facilities={c.facilities} />

      {c.narrative_extra && (
        <section className="py-16">
          <Container>
            <p className="max-w-3xl leading-relaxed text-body">{c.narrative_extra}</p>
          </Container>
        </section>
      )}

      <EmployerBlock place={c.city} />

      <MollyByline place={`${c.city}, ${c.state_abbr}`} reviewedOn={reviewedOn} />

      <section className="py-12">
        <Container>
          <p className="text-sm text-body">
            Licensure compacts are set at the state level.{" "}
            <Link href={stateUrl} className="font-semibold text-teal-600 hover:text-teal-700">
              See {c.state}&apos;s PT, OT and ASLP compact status →
            </Link>
          </p>
        </Container>
      </section>

      <CtaBand
        title={`Hiring in ${c.city}?`}
        body="Tell us the discipline, the setting and the pay range. We will give you an honest read on the local market before the search starts."
        label="Start a search"
      />

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          "@id": url,
          url,
          name: `${place} physical therapy, OT and SLP recruiters`,
          reviewedBy: { "@id": MOLLY_ID },
          dateModified: c.snapshot_date > CONTENT_UPDATED ? c.snapshot_date : CONTENT_UPDATED,
          isPartOf: { "@id": `${SITE.url}/#website` },
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: `Therapy recruiting in ${c.city}, ${c.state_abbr}`,
          serviceType: "Physical therapy, occupational therapy, speech-language pathology and audiology recruiting",
          provider: { "@id": `${SITE.url}/#organization` },
          areaServed: { "@type": "City", name: c.city },
          url,
        }}
      />
      <Breadcrumbs
        items={[
          { name: "Home", href: `${SITE.url}/` },
          { name: "Therapy Recruiters", href: `${SITE.url}/therapy-recruiters/` },
          ...(parent ? [{ name: parent.market, href: `${SITE.url}${stateUrl}` }] : []),
          { name: c.city, href: url },
        ]}
      />
    </>
  );
}
