import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/Container";
import { HireForm } from "@/components/HireForm";
import { SectionHeading, Placeholder } from "@/components/Sections";
import { SITE, EMPLOYER_TERMS } from "@/lib/site";

export const metadata: Metadata = {
  title: "Hire a PT, OT, SLP or Audiologist: Tell Us About the Role",
  description:
    "Start a physical therapy, occupational therapy, speech-language pathology or audiology search with APT Recruiting. Screened by a licensed SLP. Molly calls back within one business day.",
  alternates: { canonical: "/contact/hire/" },
};

const TERMS = [
  { label: "Engagement", body: EMPLOYER_TERMS.models },
  { label: "Fee", body: EMPLOYER_TERMS.fee },
  { label: "Guarantee", body: EMPLOYER_TERMS.guarantee },
  { label: "Speed", body: EMPLOYER_TERMS.speed },
  { label: "Placements", body: EMPLOYER_TERMS.placement },
  { label: "To start", body: EMPLOYER_TERMS.toStart },
];

export default function HireContactPage() {
  return (
    <section className="py-20">
      <Container>
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow="For employers" title="Tell us about the role.">
              Molly calls or emails within one business day to take the brief. No cost and no
              commitment to have the conversation.
            </SectionHeading>
            <dl className="mt-8 space-y-4 text-body">
              <div>
                <dt className="text-sm font-semibold tracking-wide text-body uppercase">Email</dt>
                <dd>
                  <a href={`mailto:${SITE.hireEmail}`} className="font-semibold text-teal-600 hover:text-teal-700">
                    {SITE.hireEmail}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-sm font-semibold tracking-wide text-body uppercase">Phone</dt>
                <dd>
                  <a href={SITE.phoneHref} className="font-semibold text-teal-600 hover:text-teal-700">
                    {SITE.phone}
                  </a>
                </dd>
              </div>
            </dl>
            <h2 className="mt-10 font-heading text-xl font-semibold text-navy-600">How we work</h2>
            <dl className="mt-4 space-y-3 text-sm text-body">
              {TERMS.map((t) => (
                <div key={t.label}>
                  <dt className="font-semibold text-navy-600">{t.label}</dt>
                  <dd className="mt-0.5 leading-relaxed">
                    {t.body.startsWith("[MOLLY:") ? <Placeholder>{t.body}</Placeholder> : t.body}
                  </dd>
                </div>
              ))}
            </dl>
            <p className="mt-8 text-sm text-body">
              Looking for a role yourself?{" "}
              <Link href="/contact/" className="font-semibold text-teal-600 hover:text-teal-700">
                Start a confidential conversation
              </Link>
              .
            </p>
          </div>
          <HireForm />
        </div>
      </Container>
    </section>
  );
}
