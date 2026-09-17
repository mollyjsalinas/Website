import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/Sections";
import { SITE, CONTENT_UPDATED } from "@/lib/site";
import { longDate } from "@/lib/format";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How APT Recruiting handles the resumes, contact details and browsing data it receives.",
  alternates: { canonical: "/privacy-policy/" },
};

export default function PrivacyPolicyPage() {
  return (
    <section className="py-20">
      <Container className="max-w-3xl">
        <SectionHeading eyebrow="Legal" title="Privacy policy">
          Last updated {longDate(CONTENT_UPDATED)}.
        </SectionHeading>
        <div className="prose mt-10 max-w-none space-y-6 leading-relaxed text-body">
          <h2 className="font-heading text-xl font-semibold text-navy-600">What we collect</h2>
          <p>
            When you use a form on this site we receive what you type: your name, email, phone,
            discipline, location, message, and a resume if you attach one. When an employer uses
            the hiring form we receive the organization, the role and the setting. The site also
            records ordinary web-server logs and, when analytics is enabled, anonymized usage data
            through Google Analytics with IP anonymization on.
          </p>
          <h2 className="font-heading text-xl font-semibold text-navy-600">How we use it</h2>
          <p>
            To reply to you, to represent you to an employer once you have agreed, and to keep a
            record of the conversation. We do not sell personal information. A therapist&apos;s
            resume or identity is never sent to an employer without that therapist&apos;s explicit
            consent, and it goes to one employer at a time.
          </p>
          <h2 className="font-heading text-xl font-semibold text-navy-600">Who else sees it</h2>
          <p>
            Form submissions are delivered by Resend (email delivery) and the site is hosted on
            Vercel. Both process the data only to deliver the message or serve the page. We keep
            candidate records and resumes in an applicant tracking system (ATS).
          </p>
          <h2 className="font-heading text-xl font-semibold text-navy-600">How long we keep it</h2>
          <p>
            We keep candidate resumes indefinitely unless you ask us to discard your information.
            To make that request, use the contact details below.
          </p>
          <h2 className="font-heading text-xl font-semibold text-navy-600">Your choices</h2>
          <p>
            Email{" "}
            <a href={`mailto:${SITE.email}`} className="font-semibold text-teal-600 hover:text-teal-700">
              {SITE.email}
            </a>{" "}
            to see what we hold about you, to correct it, or to have it deleted. We will confirm
            within a reasonable time.
          </p>
          <h2 className="font-heading text-xl font-semibold text-navy-600">Public data on this site</h2>
          <p>
            Workforce, pay and facility figures on the market pages come from public federal
            sources (CMS NPPES, BLS OEWS and QCEW, and the CMS Provider Data Catalog). They are
            aggregate statistics and contain no personal information.
          </p>
          <h2 className="font-heading text-xl font-semibold text-navy-600">Contact</h2>
          <p>
            {SITE.legalName}, {SITE.mailingAddress.street}, {SITE.mailingAddress.city},{" "}
            {SITE.mailingAddress.region} {SITE.mailingAddress.postalCode}.{" "}
            <a href={`mailto:${SITE.email}`} className="font-semibold text-teal-600 hover:text-teal-700">
              {SITE.email}
            </a>
            , {SITE.phone}.
          </p>
        </div>
      </Container>
    </section>
  );
}
