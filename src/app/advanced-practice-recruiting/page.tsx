import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/Container";
import { Breadcrumbs, CtaBand, SectionHeading } from "@/components/Sections";
import { JsonLd } from "@/components/JsonLd";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Nurse Practitioner & Physician Assistant Recruiters",
  description:
    "Nurse Practitioner and Physician Assistant recruiting for hospitals, medical groups, urgent care and specialty practices. APT Recruiting supports permanent advanced-practice searches nationwide.",
  alternates: { canonical: "/advanced-practice-recruiting/" },
};

const SERVICES = [
  {
    href: "/nurse-practitioner-recruiters/",
    title: "Nurse Practitioner recruiting",
    body: "Search support for primary care, urgent care, hospital, behavioral health and specialty-practice Nurse Practitioner roles.",
    cta: "Explore NP recruiting",
  },
  {
    href: "/physician-assistant-recruiters/",
    title: "Physician Assistant recruiting",
    body: "Search support for medical, surgical, urgent care, hospital and specialty-practice Physician Assistant roles.",
    cta: "Explore PA recruiting",
  },
];

export default function AdvancedPracticeRecruitingPage() {
  return (
    <>
      <section className="bg-navy-600 text-white">
        <Container className="py-20 sm:py-24">
          <p className="text-sm font-semibold tracking-widest text-teal-300 uppercase">For employers</p>
          <h1 className="mt-4 max-w-4xl font-heading text-4xl font-semibold sm:text-5xl">
            Nurse Practitioner &amp; Physician Assistant recruiting.
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-navy-100">
            APT Recruiting supports hospitals, medical groups, urgent care centers and specialty
            practices with permanent Nurse Practitioner and Physician Assistant searches. We start
            with the clinical setting, schedule, care model and patient population that make the
            role distinct.
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Link href="/contact/hire/" className="rounded-md bg-teal-500 px-6 py-3 text-center font-semibold text-white hover:bg-teal-400">
              Tell us about the role
            </Link>
            <Link href="/employers/" className="rounded-md border border-navy-200 px-6 py-3 text-center font-semibold text-white hover:border-teal-300 hover:text-teal-200">
              Explore all employer services
            </Link>
          </div>
        </Container>
      </section>

      <section className="py-20">
        <Container>
          <SectionHeading eyebrow="Advanced-practice search" title="The right search begins with the details of the clinical role.">
            Certification is only the starting point. Specialty, scope, procedures, physician
            collaboration, schedule, call expectations and compensation all shape whether a
            candidate is both qualified and genuinely interested.
          </SectionHeading>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {SERVICES.map((service) => (
              <article key={service.href} className="rounded-lg border border-mist bg-white p-7 shadow-sm">
                <h2 className="font-heading text-2xl font-semibold text-navy-600">{service.title}</h2>
                <p className="mt-3 leading-relaxed text-body">{service.body}</p>
                <Link href={service.href} className="mt-6 inline-block font-semibold text-teal-600 hover:text-teal-700">
                  {service.cta} →
                </Link>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-mist-light py-20">
        <Container className="max-w-3xl">
          <SectionHeading eyebrow="How we work" title="A clear brief creates a focused search.">
            A short conversation about the position is enough to begin. We cover the specialty,
            patient population, team structure, schedule, call, compensation and location so the
            search is aligned before candidate outreach starts.
          </SectionHeading>
          <p className="mt-8 leading-relaxed text-body">
            Looking for a role instead? Explore the{" "}
            <Link href="/career/nurse-practitioner/" className="font-semibold text-teal-600 hover:text-teal-700">
              Nurse Practitioner career hub
            </Link>{" "}
            or the{" "}
            <Link href="/career/physician-assistant/" className="font-semibold text-teal-600 hover:text-teal-700">
              Physician Assistant career hub
            </Link>{" "}
            for confidential opportunities and pay data.
          </p>
        </Container>
      </section>

      <CtaBand
        title="Need to hire an NP or PA?"
        body="Tell us the specialty, setting and market. Molly reads every brief herself."
        label="Start a search"
        href="/contact/hire/"
      />
      <Breadcrumbs
        items={[
          { name: "Home", href: `${SITE.url}/` },
          { name: "Advanced Practice Recruiting", href: `${SITE.url}/advanced-practice-recruiting/` },
        ]}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: "Nurse Practitioner and Physician Assistant recruiting",
          serviceType: "Nurse practitioner and physician assistant staffing and recruiting",
          provider: { "@id": `${SITE.url}/#organization` },
          areaServed: { "@type": "Country", name: "United States" },
          url: `${SITE.url}/advanced-practice-recruiting/`,
        }}
      />
    </>
  );
}
