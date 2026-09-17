import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/Container";
import { JsonLd } from "@/components/JsonLd";
import { ContactForm } from "@/components/ContactForm";
import { SectionHeading, Breadcrumbs } from "@/components/Sections";
import { SITE, PROFESSIONS, SETTINGS } from "@/lib/site";
import { liveJobs, jobBySlug } from "@/lib/jobs";
import { longDate } from "@/lib/format";

export async function generateStaticParams() {
  return liveJobs().map((j) => ({ slug: j.slug }));
}

// Only registry jobs exist; anything else 404s.
export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const j = jobBySlug(slug);
  if (!j) return {};
  return {
    title: `${j.title} in ${j.city}, ${j.state}`,
    description: `${PROFESSIONS[j.profession].label} opening in ${j.city}, ${j.state} (${SETTINGS[j.setting].label}), represented by APT Recruiting. ${j.description.slice(0, 120)}`,
    alternates: { canonical: `/jobs/${slug}/` },
  };
}

export default async function JobPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const j = jobBySlug(slug);
  if (!j) notFound();

  const url = `${SITE.url}/jobs/${j.slug}/`;
  const paragraphs = j.description.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean);

  return (
    <>
      <section className="py-20">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr]">
            <article>
              <p className="text-sm font-semibold tracking-widest text-teal-600 uppercase">
                {PROFESSIONS[j.profession].label} · {SETTINGS[j.setting].label}
              </p>
              <h1 className="mt-2 font-heading text-4xl font-semibold text-navy-600">{j.title}</h1>
              <p className="mt-2 text-lg text-body">
                {j.city}, {j.state} · {j.employmentType.map((t) => t.replace("_", "-").toLowerCase()).join(" or ")} · posted{" "}
                {longDate(j.datePosted)}
              </p>
              {j.salary && (
                <p className="mt-2 text-body">
                  ${j.salary.min.toLocaleString("en-US")} to ${j.salary.max.toLocaleString("en-US")} per{" "}
                  {j.salary.unit === "YEAR" ? "year" : "hour"}
                </p>
              )}
              <div className="mt-8 space-y-4 leading-relaxed text-body">
                {paragraphs.map((p) => (
                  <p key={p.slice(0, 32)}>{p}</p>
                ))}
              </div>
              <p className="mt-8 text-sm text-body">
                Represented by APT Recruiting. The employer pays our fee; the therapist never does.{" "}
                <Link href={`/${PROFESSIONS[j.profession].slug}/`} className="font-semibold text-teal-600 hover:text-teal-700">
                  More {PROFESSIONS[j.profession].short} roles →
                </Link>
              </p>
            </article>
            <aside>
              <SectionHeading eyebrow="Apply" title="Ask about this role.">
                Confidential. Molly replies within one business day.
              </SectionHeading>
              <div className="mt-6">
                <ContactForm />
              </div>
            </aside>
          </div>
        </Container>
      </section>

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "JobPosting",
          title: j.title,
          description: j.description,
          datePosted: j.datePosted,
          ...(j.validThrough ? { validThrough: j.validThrough } : {}),
          employmentType: j.employmentType.length === 1 ? j.employmentType[0] : j.employmentType,
          hiringOrganization: {
            "@type": "Organization",
            name: "Confidential employer, represented by APT Recruiting",
            sameAs: `${SITE.url}/`,
          },
          jobLocation: {
            "@type": "Place",
            address: { "@type": "PostalAddress", addressLocality: j.city, addressRegion: j.state, addressCountry: "US" },
          },
          ...(j.salary
            ? {
                baseSalary: {
                  "@type": "MonetaryAmount",
                  currency: "USD",
                  value: { "@type": "QuantitativeValue", minValue: j.salary.min, maxValue: j.salary.max, unitText: j.salary.unit },
                },
              }
            : {}),
          url,
          identifier: { "@type": "PropertyValue", name: "APT Recruiting", value: j.slug },
        }}
      />
      <Breadcrumbs
        items={[
          { name: "Home", href: `${SITE.url}/` },
          { name: "Open Roles", href: `${SITE.url}/jobs/` },
          { name: j.title, href: url },
        ]}
      />
    </>
  );
}
