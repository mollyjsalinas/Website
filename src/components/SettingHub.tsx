import Link from "next/link";
import { Container } from "@/components/Container";
import { JsonLd } from "@/components/JsonLd";
import { Hero, SectionHeading, StatTile, SourceLine, CtaBand, Breadcrumbs } from "@/components/Sections";
import { EmployerBlock } from "@/components/EmployerBlock";
import { MollyByline } from "@/components/MollyByline";
import { SITE, CONTENT_UPDATED, PROFESSION_LIST, type Setting } from "@/lib/site";
import { nationalTotals } from "@/lib/markets";
import { n, longDate } from "@/lib/format";

// One template for the five setting hubs. National QCEW and CMS facility
// numbers render where the contract has them; the school-based hub has no
// data block and is copy plus a CTA.
export function SettingHub({ s }: { s: Setting }) {
  const nat = nationalTotals();
  const sector = s.qcew ? nat.sector[s.qcew] : null;
  const url = `${SITE.url}/${s.slug}/`;
  const reviewedOn = longDate(nat.snapshot_date > CONTENT_UPDATED ? nat.snapshot_date : CONTENT_UPDATED);
  const hasData = !!sector || !!s.facilities;

  return (
    <>
      <Hero
        eyebrow={s.label}
        title={s.title}
        primary={{ href: "/contact/hire/", label: "Tell us about the role" }}
        secondary={{ href: "/therapy-recruiters/", label: "See your state's numbers" }}
      >
        {s.intro}
      </Hero>

      {hasData && (
        <section className="py-20">
          <Container>
            <SectionHeading eyebrow="The employer base" title={`${s.label} employers in the United States`}>
              National counts summed from the federal employment census and the CMS provider catalog.
            </SectionHeading>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {sector && (
                <>
                  <StatTile value={n(sector.employment)} label={`Employed, ${s.qcewLabel ?? "sector"}`} sub={`private sector, ${sector.states} states reporting`} />
                  <StatTile value={n(sector.establishments)} label="Establishments" />
                </>
              )}
              {s.facilities === "nursing_homes" && (
                <>
                  <StatTile value={n(nat.facilities.nursing_homes.count)} label="Medicare-certified nursing homes" />
                  <StatTile value={n(nat.facilities.nursing_homes.certified_beds)} label="Certified beds" />
                </>
              )}
              {s.facilities === "home_health_agencies" && (
                <StatTile value={n(nat.facilities.home_health_agencies.count)} label="Medicare-certified home health agencies" />
              )}
            </div>
            <SourceLine>
              Sources: {sector ? `${nat.sources.sector}; ` : ""}
              {s.facilities ? `${nat.sources.facilities}.` : ""}
              {!s.facilities && sector ? "employment is all occupations in the industry, not therapists alone." : ""}
            </SourceLine>
          </Container>
        </section>
      )}

      <section className={hasData ? "bg-mist-light py-20" : "py-20"}>
        <Container>
          <SectionHeading eyebrow="How we screen" title={`What a ${s.shortLabel.toLowerCase()} hire needs that a resume does not show`} />
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {s.pains.map((p) => (
              <div key={p.title} className="rounded-lg border border-mist bg-white p-6 shadow-sm">
                <h3 className="font-heading text-lg font-semibold text-navy-600">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-body">{p.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-20">
        <Container>
          <div className="grid gap-12 md:grid-cols-2">
            <div>
              <SectionHeading eyebrow="Roles" title={`${s.shortLabel} roles we fill`} />
              <ul className="mt-6 space-y-2 text-body">
                {s.roles.map((r) => (
                  <li key={r} className="flex items-start gap-2">
                    <span className="mt-1 text-teal-500" aria-hidden="true">
                      +
                    </span>
                    {r}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <SectionHeading eyebrow="Professions" title="By discipline" />
              <ul className="mt-6 space-y-2">
                {PROFESSION_LIST.map((p) => (
                  <li key={p.key}>
                    <Link href={`/${p.slug}/`} className="font-semibold text-teal-600 hover:text-teal-700">
                      {p.label} recruiters →
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      <EmployerBlock />

      {hasData && <MollyByline place="national" reviewedOn={reviewedOn} />}

      <CtaBand title={`Hiring for a ${s.shortLabel.toLowerCase()} setting?`} body="Tell us the discipline, the caseload and the market. A licensed clinician reads every brief." />

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: s.title,
          serviceType: `${s.label} therapy recruiting`,
          provider: { "@id": `${SITE.url}/#organization` },
          areaServed: { "@type": "Country", name: "United States" },
          url,
        }}
      />
      <Breadcrumbs
        items={[
          { name: "Home", href: `${SITE.url}/` },
          { name: s.label, href: url },
        ]}
      />
    </>
  );
}
