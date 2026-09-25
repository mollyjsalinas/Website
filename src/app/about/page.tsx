import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/Container";
import { Hero, SectionHeading, CtaBand, Breadcrumbs } from "@/components/Sections";
import { JsonLd } from "@/components/JsonLd";
import { SITE, MOLLY, PROFESSION_LIST } from "@/lib/site";

export const metadata: Metadata = {
  title: "About APT Recruiting: A Therapy Recruiting Firm Run by an SLP",
  description:
    "APT Recruiting was founded by Molly Salinas, M.S., CCC-SLP, a licensed speech-language pathologist. Rehab therapy recruiting for PT, OT, SLP and audiology roles across hospitals, SNFs, home health, outpatient and schools.",
  alternates: { canonical: "/about/" },
};

export default function AboutPage() {
  return (
    <>
      <Hero eyebrow="About" title="A therapy recruiting firm founded by a clinician, not a salesperson.">
        {SITE.tagline}
      </Hero>

      <section className="py-20">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[280px_1fr]">
            <div>
              <Image
                src={MOLLY.headshot}
                alt={`${MOLLY.name}, founder of APT Recruiting`}
                width={560}
                height={560}
                priority
                className="aspect-square w-full max-w-[280px] rounded-lg object-cover"
              />
              <h2 className="mt-5 font-heading text-2xl font-semibold text-navy-600">
                {MOLLY.name}, {MOLLY.credentialLetters}
              </h2>
              <p className="font-medium text-teal-600">{MOLLY.credential}</p>
              <p className="mt-1 text-sm text-body">{MOLLY.jobTitle}, APT Recruiting</p>
              <p className="mt-3 text-sm">
                <a href={`mailto:${MOLLY.email}`} className="font-semibold text-navy-600 hover:text-teal-600">
                  {MOLLY.email}
                </a>
              </p>
              <p className="mt-1 text-sm text-body">
                <a href={MOLLY.linkedin} rel="noopener" className="font-semibold text-navy-600 hover:text-teal-600">
                  LinkedIn
                </a>
              </p>
            </div>
            <div className="max-w-2xl space-y-5 text-lg leading-relaxed text-body">
              {MOLLY.bio.map((p) => (
                <p key={p.slice(0, 24)}>{p}</p>
              ))}
              <p>
                Molly has recruited therapists for {MOLLY.yearsRecruiting} and works from{" "}
                {MOLLY.basedIn}, placing clinicians in every state.
              </p>
              <figure className="border-l-4 border-teal-400 pl-5">
                <p className="text-sm font-semibold tracking-widest text-teal-600 uppercase">In Molly&apos;s words</p>
                <blockquote className="mt-3 space-y-4">
                  {MOLLY.story.map((p) => (
                    <p key={p.slice(0, 24)}>{p}</p>
                  ))}
                </blockquote>
              </figure>
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-mist-light py-20">
        <Container>
          <SectionHeading eyebrow="How we work" title="What a clinician-run search looks like">
            The recruiting process most therapists and hiring managers have met is a keyword
            match and a phone screen. Ours starts from the setting.
          </SectionHeading>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {[
              {
                title: "We take the brief like a therapist would",
                body: "Caseload, productivity expectation, documentation system, supervision, weekend rotation, pay. The questions a candidate will ask on the first call are the ones we ask the employer first.",
              },
              {
                title: "We screen for the setting",
                body: "An SLP built for a school caseload is not a SNF dysphagia hire, and an outpatient ortho PT is not an acute-care one. Every candidate is matched to the setting, not just the license.",
              },
              {
                title: "We tell both sides the truth",
                body: "If an offer sits below the market line, the employer hears it. If a job's productivity target is aggressive, the candidate hears it. Placements that last come from that.",
              },
            ].map((c) => (
              <div key={c.title} className="rounded-lg border border-mist bg-white p-6 shadow-sm">
                <h3 className="font-heading text-lg font-semibold text-navy-600">{c.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-body">{c.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-20">
        <Container>
          <SectionHeading eyebrow="Who we place" title="Rehab therapy and audiology first">
            Physical therapists, occupational therapists, speech-language pathologists and
            audiologists are the core of the desk, along with therapy assistants and the therapy
            leaders who run the department. We also recruit nurse practitioners and physician
            assistants.
          </SectionHeading>
          <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm">
            {PROFESSION_LIST.map((p) => (
              <li key={p.key}>
                <Link href={`/${p.slug}/`} className="font-semibold text-teal-600 hover:text-teal-700">
                  {p.label} recruiters →
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <CtaBand
        title="Talk to Molly."
        body="Employers and therapists both start the same way: a short, confidential conversation."
        secondaryLabel="I'm a therapist"
        secondaryHref="/job-seekers/"
      />

      <Breadcrumbs
        items={[
          { name: "Home", href: `${SITE.url}/` },
          { name: "About", href: `${SITE.url}/about/` },
        ]}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "AboutPage",
          url: `${SITE.url}/about/`,
          name: "About APT Recruiting",
          mainEntity: { "@id": `${SITE.url}/#organization` },
          about: { "@id": `${SITE.url}/#molly` },
        }}
      />
    </>
  );
}
