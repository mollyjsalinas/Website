import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/Container";
import { ContactForm } from "@/components/ContactForm";
import { SectionHeading } from "@/components/Sections";
import { SITE, MOLLY } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact APT Recruiting",
  description:
    "Reach APT Recruiting. Therapists: start a confidential conversation about PT, OT, SLP or audiology roles. Employers: tell us about the seat at /contact/hire/.",
  alternates: { canonical: "/contact/" },
};

export default function ContactPage() {
  return (
    <section className="py-20">
      <Container>
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow="Contact" title="Start a confidential conversation.">
              Whether you are a therapist weighing a move or just want an honest read on your
              market, Molly replies within one business day. Nothing you send is shared with an
              employer without your say-so.
            </SectionHeading>
            <dl className="mt-8 space-y-4 text-body">
              <div>
                <dt className="text-sm font-semibold tracking-wide text-body uppercase">Email</dt>
                <dd>
                  <a href={`mailto:${SITE.email}`} className="font-semibold text-teal-600 hover:text-teal-700">
                    {SITE.email}
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
              <div>
                <dt className="text-sm font-semibold tracking-wide text-body uppercase">Based in</dt>
                <dd>
                  {MOLLY.basedIn}, placing therapists nationwide
                </dd>
              </div>
            </dl>
            <p className="mt-8 text-sm text-body">
              Hiring?{" "}
              <Link href="/contact/hire/" className="font-semibold text-teal-600 hover:text-teal-700">
                Tell us about the role
              </Link>{" "}
              and skip the resume field.
            </p>
          </div>
          <ContactForm />
        </div>
      </Container>
    </section>
  );
}
