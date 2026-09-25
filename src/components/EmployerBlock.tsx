import Link from "next/link";
import { Container } from "@/components/Container";
import { FaqList, FaqSchema, SectionHeading } from "@/components/Sections";
import { SITE, EMPLOYER_TERMS, employerFaqs } from "@/lib/site";

/**
 * The employer section on every market and hub page.
 *
 * Employers search in a vocabulary ("physical therapy staffing agency",
 * "SLP recruiter", "rehab staffing", "OT headhunter") that a page has to use
 * once, plainly, or Google has nothing to match. This block says it, states
 * the terms (placeholders until Molly fills them), and carries the one FAQPage
 * the URL is allowed.
 *
 * `emitSchema` is false when the page already renders a FaqSection with
 * schema; that section then folds these FAQs in via `alsoInSchema`.
 */
export function EmployerBlock({
  place,
  emitSchema = true,
}: {
  place?: string;
  emitSchema?: boolean;
}) {
  const faqs = employerFaqs(place);
  const where = place ? ` in ${place}` : "";

  const tiles = [
    { title: "Engagement model", body: EMPLOYER_TERMS.models },
    { title: "Speed to first candidates", body: EMPLOYER_TERMS.speed },
    { title: "Guarantee", body: EMPLOYER_TERMS.guarantee },
  ];

  return (
    <section id="hiring" className="scroll-mt-24 border-y border-mist bg-mist-light py-20">
      <Container>
        <SectionHeading
          eyebrow="For employers"
          title={`Hiring${where}? Physical therapy, OT and SLP recruiting, run by a clinician.`}
        >
          Employers find us under a lot of names: physical therapy staffing agency, SLP
          recruiter, OT headhunter, rehab staffing, therapy recruiting firm. {`What we do${where} is`}{" "}
          the same under any of them. We work the whole market for PTs, OTs,
          SLPs and audiologists, screen each one with a licensed speech-language
          pathologist&apos;s eye for the setting and the caseload, and bring you clinicians
          who have already said yes to a conversation about your organization.
        </SectionHeading>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {tiles.map((t) => (
            <div key={t.title} className="rounded-lg border border-mist bg-white p-6 shadow-sm">
              <h3 className="font-heading text-lg font-semibold text-navy-600">{t.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-body">{t.body}</p>
            </div>
          ))}
        </div>

        <h3 className="mt-14 font-heading text-2xl font-semibold text-navy-600">
          Questions hiring managers and directors of rehab ask us
        </h3>
        <FaqList faqs={faqs} className="mt-6" />
        {emitSchema && <FaqSchema faqs={faqs} />}

        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
          <Link
            href="/contact/hire/"
            className="inline-block rounded-md bg-teal-500 px-6 py-3 font-semibold text-white transition-colors hover:bg-teal-600"
          >
            Tell us about the role
          </Link>
          <p className="text-sm text-body">
            Or email{" "}
            <a href={`mailto:${SITE.hireEmail}`} className="font-semibold text-navy-600 hover:text-teal-600">
              {SITE.hireEmail}
            </a>
            . Molly reads every brief herself.
          </p>
        </div>
      </Container>
    </section>
  );
}
