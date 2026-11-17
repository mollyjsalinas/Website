import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/Container";
import { CtaBand, Breadcrumbs, SectionHeading } from "@/components/Sections";
import { JsonLd } from "@/components/JsonLd";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Physician Assistant Recruiters & PA Staffing Agency",
  description:
    "Physician assistant recruiters for hospitals, medical groups, urgent care, surgical teams and specialty practices. APT Recruiting helps employers hire PAs nationwide for permanent roles.",
  alternates: { canonical: "/physician-assistant-recruiters/" },
};

const SETTINGS = [
  "Primary care and internal medicine",
  "Urgent care and same-day care",
  "Hospitals and inpatient teams",
  "Surgical and procedural specialties",
  "Orthopedics, cardiology and other specialty practices",
  "Outpatient and community-based care",
];

const BRIEF_DETAILS = [
  ["Clinical fit", "Specialty experience, patient population, procedures and physician collaboration."],
  ["Practical fit", "Schedule, call expectations, documentation, location and compensation."],
  ["Candidate readiness", "Licensure or eligibility, relevant experience and interest in the specific practice model."],
];

export default function PhysicianAssistantRecruitersPage() {
  return (
    <>
      <section className="bg-navy-600 text-white">
        <Container className="py-20 sm:py-24">
          <p className="text-sm font-semibold tracking-widest text-teal-300 uppercase">For employers</p>
          <h1 className="mt-4 max-w-4xl font-heading text-4xl font-semibold sm:text-5xl">
            Physician assistant recruiters for the clinical roles your organization depends on.
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-navy-100">
            APT Recruiting helps hospitals, medical groups and healthcare practices hire Physician
            Assistants for permanent positions nationwide. We learn the operational and clinical
            realities of your opening before bringing you candidates interested in that exact role.
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Link href="/contact/hire/" className="rounded-md bg-teal-500 px-6 py-3 text-center font-semibold text-white hover:bg-teal-400">
              Hire a Physician Assistant
            </Link>
            <Link href="/salary/physician-assistant/" className="rounded-md border border-navy-200 px-6 py-3 text-center font-semibold text-white hover:border-teal-300 hover:text-teal-200">
              Review PA salary data
            </Link>
          </div>
        </Container>
      </section>

      <section className="py-20">
        <Container>
          <SectionHeading eyebrow="PA staffing" title="A better brief produces a better Physician Assistant search.">
            Specialty, procedural requirements, care model, supervision structure, schedule and
            compensation determine whether a PA role is competitive. Those details guide our
            screening and the conversations we have with prospective candidates.
          </SectionHeading>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {BRIEF_DETAILS.map(([title, body]) => (
              <div key={title} className="rounded-lg border border-mist bg-white p-6 shadow-sm">
                <h2 className="font-heading text-lg font-semibold text-navy-600">{title}</h2>
                <p className="mt-2 leading-relaxed text-body">{body}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-mist-light py-20">
        <Container>
          <SectionHeading eyebrow="Where we recruit" title="Physician Assistant recruiting across care settings.">
            We work from the demands of the practice, service line or care team—not a generic job
            title—to help employers connect with the right kind of Physician Assistant.
          </SectionHeading>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {SETTINGS.map((setting) => (
              <li key={setting} className="rounded-lg border border-mist bg-white p-5 font-semibold text-navy-600">
                {setting}
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="py-20">
        <Container className="max-w-3xl">
          <SectionHeading eyebrow="How to start" title="Give us the real picture of the PA opening.">
            A short conversation about the specialty, procedures, team structure, schedule, call
            and compensation is enough to begin. A job description is useful, but it is not
            required before you reach out.
          </SectionHeading>
          <p className="mt-8 leading-relaxed text-body">
            Looking for a role instead? Visit our{" "}
            <Link href="/career/physician-assistant/" className="font-semibold text-teal-600 hover:text-teal-700">
              Physician Assistant career hub
            </Link>{" "}
            for confidential opportunities and state-by-state pay data.
          </p>
        </Container>
      </section>

      <CtaBand
        title="Need to hire a Physician Assistant?"
        body="Tell us the specialty, setting and market. Molly reads every brief herself."
        label="Start a PA search"
        href="/contact/hire/"
      />
      <Breadcrumbs
        items={[
          { name: "Home", href: `${SITE.url}/` },
          { name: "Physician Assistant Recruiters", href: `${SITE.url}/physician-assistant-recruiters/` },
        ]}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: "Physician Assistant recruiting",
          serviceType: "Physician assistant staffing and recruiting",
          provider: { "@id": `${SITE.url}/#organization` },
          areaServed: { "@type": "Country", name: "United States" },
          url: `${SITE.url}/physician-assistant-recruiters/`,
        }}
      />
    </>
  );
}
