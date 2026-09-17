import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/Container";
import { Hero, SectionHeading, CtaBand, Breadcrumbs } from "@/components/Sections";
import { SITE, PROFESSIONS, SETTINGS } from "@/lib/site";
import { liveJobs } from "@/lib/jobs";
import { longDate } from "@/lib/format";

export const metadata: Metadata = {
  title: "Open PT, OT, SLP & Audiology Jobs",
  description:
    "Current physical therapy, occupational therapy, speech-language pathology and audiology openings represented by APT Recruiting. Confidential, free to therapists.",
  alternates: { canonical: "/jobs/" },
};

export default function JobsIndexPage() {
  const jobs = [...liveJobs()].sort((a, b) => b.datePosted.localeCompare(a.datePosted));

  return (
    <>
      <Hero
        eyebrow="Open roles"
        title="PT, OT, SLP and audiology jobs."
        primary={{ href: "/job-seekers/", label: "Send us your resume" }}
        secondary={{ href: "/contact/hire/", label: "Post a role with us" }}
      >
        Most of the searches we run are confidential and never appear here. The roles below are
        the ones an employer has asked us to list publicly.
      </Hero>

      <section className="py-20">
        <Container>
          {jobs.length === 0 ? (
            <div className="max-w-2xl">
              <SectionHeading eyebrow="Right now" title="No public listings at the moment.">
                That does not mean nothing is open. Tell us the discipline, the setting and where
                you want to work and we will match you against the searches we are running quietly.
              </SectionHeading>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link href="/job-seekers/" className="rounded-md bg-teal-500 px-6 py-3 text-center font-semibold text-white hover:bg-teal-600">
                  I&apos;m a therapist looking
                </Link>
                <Link href="/contact/hire/" className="rounded-md border border-mist px-6 py-3 text-center font-semibold text-navy-600 hover:border-teal-400">
                  I&apos;m hiring
                </Link>
              </div>
            </div>
          ) : (
            <div className="max-w-3xl space-y-6">
              {jobs.map((j) => (
                <article key={j.slug} className="rounded-lg border border-mist bg-white p-6 shadow-sm">
                  <p className="text-sm text-body">
                    {PROFESSIONS[j.profession].label} · {SETTINGS[j.setting].shortLabel} · posted {longDate(j.datePosted)}
                  </p>
                  <h2 className="mt-1 font-heading text-xl font-semibold text-navy-600">
                    <Link href={`/jobs/${j.slug}/`} className="hover:text-teal-600">
                      {j.title}
                    </Link>
                  </h2>
                  <p className="mt-1 text-body">
                    {j.city}, {j.state}
                  </p>
                </article>
              ))}
            </div>
          )}
        </Container>
      </section>

      <CtaBand title="Want the roles that never get posted?" body="Send a resume and a few lines on the setting and market you want. Everything stays confidential." label="Start a confidential conversation" href="/job-seekers/" />

      <Breadcrumbs
        items={[
          { name: "Home", href: `${SITE.url}/` },
          { name: "Open Roles", href: `${SITE.url}/jobs/` },
        ]}
      />
    </>
  );
}
