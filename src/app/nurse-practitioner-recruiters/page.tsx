import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/Container";
import { CtaBand, Breadcrumbs, SectionHeading } from "@/components/Sections";
import { JsonLd } from "@/components/JsonLd";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Nurse Practitioner Recruiters & NP Staffing Agency",
  description:
    "Nurse practitioner recruiters for hospitals, medical groups, primary care, urgent care and specialty practices. APT Recruiting helps employers hire NPs nationwide for permanent roles.",
  alternates: { canonical: "/nurse-practitioner-recruiters/" },
};

const SETTINGS = [
  "Primary care and family practice",
  "Urgent care and walk-in clinics",
  "Hospitals and hospital medicine",
  "Specialty practices and outpatient care",
  "Behavioral health and telehealth",
  "Post-acute and community-based care",
];

const BRIEF_DETAILS = [
  ["Clinical fit", "Population, specialty, procedures, autonomy and physician collaboration."],
  ["Practical fit", "Schedule, call expectations, documentation, location and compensation."],
  ["Candidate readiness", "Licensure or eligibility, certification, relevant experience and interest in the specific role."],
];

export default function NursePractitionerRecruitersPage() {
  return (
    <>
      <section className="bg-navy-600 text-white">
        <Container className="py-20 sm:py-24">
          <p className="text-sm font-semibold tracking-widest text-teal-300 uppercase">For employers</p>
          <h1 className="mt-4 max-w-4xl font-heading text-4xl font-semibold sm:text-5xl">
            Nurse practitioner recruiters for the roles that shape patient access.
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-navy-100">
            APT Recruiting helps hospitals, medical groups and healthcare practices hire Nurse
            Practitioners for permanent positions nationwide. We start with the clinical details
            that matter, then introduce candidates who are interested in your specific setting.
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Link href="/contact/hire/" className="rounded-md bg-teal-500 px-6 py-3 text-center font-semibold text-white hover:bg-teal-400">
              Hire a Nurse Practitioner
            </Link>
            <Link href="/salary/nurse-practitioner/" className="rounded-md border border-navy-200 px-6 py-3 text-center font-semibold text-white hover:border-teal-300 hover:text-teal-200">
              Review NP salary data
            </Link>
          </div>
        </Container>
      </section>

      <section className="py-20">
        <Container>
          <SectionHeading eyebrow="NP staffing" title="A focused search for a role that is not interchangeable.">
            The right Nurse Practitioner depends on more than certification. Patient population,
            specialty, prescribing expectations, physician collaboration, schedule and clinical
            autonomy all influence whether a candidate will accept and stay.
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
          <SectionHeading eyebrow="Where we recruit" title="Nurse Practitioner recruiting across care settings.">
            Share the setting and the needs of the role. We tailor the search conversation to the
            clinical environment rather than sending a generic stack of résumés.
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
          <SectionHeading eyebrow="How to start" title="Tell us what makes this NP seat different.">
            A short conversation about the specialty, patient population, schedule, call, care
            model and compensation gives the search a useful foundation. A job description helps,
            but it is not required to start the conversation.
          </SectionHeading>
          <p className="mt-8 leading-relaxed text-body">
            Looking for a role instead? Visit our{" "}
            <Link href="/career/nurse-practitioner/" className="font-semibold text-teal-600 hover:text-teal-700">
              Nurse Practitioner career hub
            </Link>{" "}
            for confidential opportunities and state-by-state pay data.
          </p>
        </Container>
      </section>

      <CtaBand
        title="Need to hire a Nurse Practitioner?"
        body="Tell us the specialty, setting and market. Molly reads every brief herself."
        label="Start an NP search"
        href="/contact/hire/"
      />
      <Breadcrumbs
        items={[
          { name: "Home", href: `${SITE.url}/` },
          { name: "Nurse Practitioner Recruiters", href: `${SITE.url}/nurse-practitioner-recruiters/` },
        ]}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: "Nurse Practitioner recruiting",
          serviceType: "Nurse practitioner staffing and recruiting",
          provider: { "@id": `${SITE.url}/#organization` },
          areaServed: { "@type": "Country", name: "United States" },
          url: `${SITE.url}/nurse-practitioner-recruiters/`,
        }}
      />
    </>
  );
}
