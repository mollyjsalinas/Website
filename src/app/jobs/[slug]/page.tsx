import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/Container";
import { JsonLd } from "@/components/JsonLd";
import { ContactForm } from "@/components/ContactForm";
import { SectionHeading, Breadcrumbs } from "@/components/Sections";
import { SITE, PROFESSIONS } from "@/lib/site";
import { liveJobs, jobBySlug, jobProfessionLabel, jobSettingLabel } from "@/lib/jobs";
import { longDate } from "@/lib/format";
import { marketByAbbr, metrosForState, metroHref, stateHref } from "@/lib/markets";
import { SALARY_ROLES, salaryHref, roleLabel, stateWage } from "@/lib/salary";

// Google Jobs reads only <p>, <ul> and <li> in a JobPosting description, and
// requires the description to be HTML.
const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

function payLine(s: NonNullable<ReturnType<typeof jobBySlug>>["salary"]): string {
  if (!s) return "";
  return `$${s.min.toLocaleString("en-US")} to $${s.max.toLocaleString("en-US")} per ${s.unit === "YEAR" ? "year" : "hour"}`;
}

export async function generateStaticParams() {
  return liveJobs().map((j) => ({ slug: j.slug }));
}

// Only registry jobs exist; anything else 404s.
export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const j = jobBySlug(slug);
  if (!j) return {};
  const location = j.remote ? `Remote · ${j.state}` : `${j.city}, ${j.state}`;
  const setting = jobSettingLabel(j);
  return {
    title: `${j.title} in ${location}`,
    description: [
      `${j.title} opening in ${location}`,
      j.salary ? `paying ${payLine(j.salary)}` : "",
      `${setting.toLowerCase()}. Confidential and free to candidates; apply through APT Recruiting.`,
    ]
      .filter(Boolean)
      .join(", "),
    alternates: { canonical: `/jobs/${slug}/` },
  };
}

export default async function JobPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const j = jobBySlug(slug);
  if (!j) notFound();

  const location = j.remote ? `Remote · ${j.state}` : `${j.city}, ${j.state}`;
  const url = `${SITE.url}/jobs/${j.slug}/`;
  const paragraphs = j.description.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean);
  const profession = jobProfessionLabel(j);
  const setting = jobSettingLabel(j);
  const market = marketByAbbr(j.state);
  const metro = metrosForState(j.state).find((c) => c.city.toLowerCase() === j.city.toLowerCase());
  const salaryRoles = market && j.profession ? SALARY_ROLES.filter((r) => r.key === j.profession && stateWage(market, r)) : [];

  return (
    <>
      <section className="py-20">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr]">
            <article>
              <p className="text-sm font-semibold tracking-widest text-teal-600 uppercase">
                {profession} · {setting}
              </p>
              <h1 className="mt-2 font-heading text-4xl font-semibold text-navy-600">{j.title}</h1>
              <p className="mt-2 text-lg text-body">
                {location} · {j.employmentType.map((t) => t.replace("_", "-").toLowerCase()).join(" or ")} · posted{" "}
                {longDate(j.datePosted)}
              </p>
              <p className="mt-2 font-semibold text-teal-600">Active opening · accepting qualified candidates</p>
              {j.salary && (
                <p className="mt-2 text-body">
                  ${j.salary.min.toLocaleString("en-US")}{j.salary.min !== j.salary.max ? ` to $${j.salary.max.toLocaleString("en-US")}` : ""} per{" "}
                  {j.salary.unit === "YEAR" ? "year" : "hour"}
                </p>
              )}
              <div className="mt-8 space-y-4 leading-relaxed text-body">
                {paragraphs.map((p) => (
                  <p key={p.slice(0, 32)}>{p}</p>
                ))}
              </div>
              <p className="mt-8 text-sm text-body">
                Represented by APT Recruiting. The employer pays our fee; candidates never do.{" "}
                {j.profession ? (
                  <Link href={`/${PROFESSIONS[j.profession].slug}/`} className="font-semibold text-teal-600 hover:text-teal-700">
                    More {PROFESSIONS[j.profession].short} roles →
                  </Link>
                ) : (
                  <Link href="/jobs/" className="font-semibold text-teal-600 hover:text-teal-700">
                    View all open roles →
                  </Link>
                )}
              </p>
              {market && (
                <div className="mt-8 rounded-lg border border-mist bg-white p-6">
                  <h2 className="font-heading text-lg font-semibold text-navy-600">How this pay compares</h2>
                  <ul className="mt-3 space-y-2">
                    {salaryRoles.map((r) => (
                      <li key={r.key}>
                        <Link href={salaryHref(r, market)} className="text-teal-600 hover:text-teal-700">
                          What {roleLabel(r).plural.toLowerCase()} earn in {market.market}
                        </Link>
                      </li>
                    ))}
                    <li>
                      <Link href={metro ? metroHref(metro) : stateHref(market)} className="text-teal-600 hover:text-teal-700">
                        The {metro ? metro.city : market.market} therapy job market
                      </Link>
                    </li>
                  </ul>
                </div>
              )}
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
          description: paragraphs.map((p) => `<p>${esc(p)}</p>`).join(""),
          datePosted: j.datePosted,
          ...(j.validThrough ? { validThrough: j.validThrough } : {}),
          employmentType: j.employmentType.length === 1 ? j.employmentType[0] : j.employmentType,
          hiringOrganization: {
            "@type": "Organization",
            name: "confidential",
          },
          ...(j.remote
            ? {
                jobLocationType: "TELECOMMUTE",
                applicantLocationRequirements: { "@type": "AdministrativeArea", name: `${j.state}, US` },
              }
            : {
                jobLocation: {
                  "@type": "Place",
                  address: { "@type": "PostalAddress", addressLocality: j.city, addressRegion: j.state, addressCountry: "US" },
                },
              }),
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
