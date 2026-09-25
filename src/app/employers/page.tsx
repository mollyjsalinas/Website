import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/Container";
import { Hero, SectionHeading, CtaBand, Placeholder, Breadcrumbs } from "@/components/Sections";
import { EmployerBlock } from "@/components/EmployerBlock";
import { JsonLd } from "@/components/JsonLd";
import { SITE, EMPLOYER_TERMS, PROFESSION_LIST, SETTING_LIST } from "@/lib/site";

export const metadata: Metadata = {
  title: "Hire PT, OT & SLP Staff: Therapy Recruiting for Employers",
  description:
    "Physical therapy staffing, OT and SLP recruiting for hospitals, SNFs, home health, outpatient clinics and schools. Screened by a licensed speech-language pathologist. Tell us about the role.",
  alternates: { canonical: "/employers/" },
};

const TERMS = [
  { label: "Engagement", body: EMPLOYER_TERMS.models },
  { label: "Fee", body: EMPLOYER_TERMS.fee },
  { label: "Guarantee", body: EMPLOYER_TERMS.guarantee },
  { label: "Speed", body: EMPLOYER_TERMS.speed },
  { label: "Placements", body: EMPLOYER_TERMS.placement },
  { label: "To start", body: EMPLOYER_TERMS.toStart },
];

const DIFFERENCE = [
  {
    title: "The screen is clinical, not clerical",
    body: "A licensed SLP asks about dysphagia competencies, IEP caseloads, productivity expectations and weekend rotations because she has lived them. A license check is the start of our screen, not the end of it.",
  },
  {
    title: "We work the market, not the applicant pile",
    body: "Job boards deliver the therapists who are looking. We approach the ones who are not, in your market and across the country for hard seats, and confirm interest before you spend an interview slot.",
  },
  {
    title: "Honest reads on pay and supply",
    body: "Every state and metro page on this site carries the federal count of therapists, what they are paid and where they work. If your offer sits below the market line, we will say so before the search starts, not after it stalls.",
  },
  {
    title: "Permanent first, contract when you need it",
    body: EMPLOYER_TERMS.placement,
  },
];

export default function EmployersPage() {
  return (
    <>
      <Hero
        eyebrow="For employers"
        title="Physical therapy staffing, OT and SLP recruiting, on your terms."
        primary={{ href: "/contact/hire/", label: "Tell us about the role" }}
        secondary={{ href: "/therapy-recruiters/", label: "See your market's therapy workforce" }}
      >
        Hospitals, skilled nursing facilities, home health agencies, outpatient clinics and school
        districts hire through APT Recruiting when a PT, OT, SLP or audiology seat has stayed open
        too long. Every candidate is screened by a licensed speech-language pathologist.
      </Hero>

      <section className="py-20">
        <Container>
          <SectionHeading eyebrow="Why a clinician-run firm" title="What changes when the recruiter has held the job">
            Most therapy staffing agencies are run by salespeople who have never written a SOAP
            note. APT Recruiting is run by a speech-language pathologist.
          </SectionHeading>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {DIFFERENCE.map((d) => (
              <div key={d.title} className="rounded-lg border border-mist bg-white p-6 shadow-sm">
                <h3 className="font-heading text-lg font-semibold text-navy-600">{d.title}</h3>
                <p className="mt-2 leading-relaxed text-body">{d.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-mist-light py-20">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <SectionHeading eyebrow="Professions" title="Roles we fill">
                Staff clinicians, assistants and the leaders who run the department.
              </SectionHeading>
              <ul className="mt-8 space-y-3">
                {PROFESSION_LIST.map((p) => (
                  <li key={p.key}>
                    <Link href={`/${p.slug}/`} className="font-semibold text-navy-600 hover:text-teal-600">
                      {p.label} recruiters →
                    </Link>
                    <span className="ml-2 text-sm text-body">
                      {/* Molly: OT assistants read as COTA (the credential), not OTA. */}
                      {p.nppesRoles.length > 1 ? `${p.short} and ${p.key === "ot" ? "COTA" : `${p.short}A`}` : p.short}, all settings
                    </span>
                  </li>
                ))}
                <li className="text-body">
                  We also recruit experienced therapy professionals for leadership roles, including
                  Directors of Rehabilitation, Rehab Managers, and Clinic Directors. In addition to our
                  therapy and audiology specialties, we provide recruiting services for Nurse
                  Practitioners and Physician Assistants.
                </li>
              </ul>
            </div>
            <div>
              <SectionHeading eyebrow="Settings" title="Where we place">
                Each setting is a different hire. Pick yours for the specifics.
              </SectionHeading>
              <ul className="mt-8 space-y-3">
                {SETTING_LIST.map((s) => (
                  <li key={s.key}>
                    <Link href={`/${s.slug}/`} className="font-semibold text-navy-600 hover:text-teal-600">
                      {s.label} →
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-20">
        <Container>
          <SectionHeading eyebrow="Terms" title="How we work">
            Everything below is agreed in writing before you see a candidate&apos;s identifying details.
          </SectionHeading>
          <dl className="mt-8 grid max-w-3xl gap-5">
            {TERMS.map((t) => (
              <div key={t.label} className="grid gap-1 sm:grid-cols-[140px_1fr]">
                <dt className="font-semibold text-navy-600">{t.label}</dt>
                <dd className="leading-relaxed text-body">
                  {t.body.startsWith("[MOLLY:") ? <Placeholder>{t.body}</Placeholder> : t.body}
                </dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      <EmployerBlock />

      <CtaBand
        title="Tell us about the seat."
        body="A short call to take the brief. No cost and no commitment to have the conversation."
        label="Request a call"
      />

      <Breadcrumbs
        items={[
          { name: "Home", href: `${SITE.url}/` },
          { name: "For Employers", href: `${SITE.url}/employers/` },
        ]}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: "Rehab therapy recruiting for employers",
          serviceType: "Physical therapy, occupational therapy, speech-language pathology and audiology recruiting",
          provider: { "@id": `${SITE.url}/#organization` },
          areaServed: { "@type": "Country", name: "United States" },
          url: `${SITE.url}/employers/`,
        }}
      />
    </>
  );
}
