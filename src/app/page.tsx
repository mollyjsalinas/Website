import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/Container";
import { SectionHeading, StatTile, CtaBand } from "@/components/Sections";
import { FeaturedCard, MarketLinkGrid } from "@/components/MarketDirectory";
import { EmployerBlock } from "@/components/EmployerBlock";
import { JsonLd } from "@/components/JsonLd";
import { SITE, MOLLY, EMPLOYER_TERMS, TESTIMONIALS, PROFESSION_LIST, SETTING_LIST, ROLE_LABELS } from "@/lib/site";
import { nationalTotals, topStatesByRoles, stateHref } from "@/lib/markets";
import { n } from "@/lib/format";

export const metadata: Metadata = {
  title: "Physical Therapy, OT & SLP Recruiters | APT Recruiting",
  description:
    "APT Recruiting places physical therapists, occupational therapists, speech-language pathologists and audiologists with hospitals, SNFs, home health, outpatient and school employers nationwide. Founded and run by a licensed SLP.",
  alternates: { canonical: "/" },
};

const HERO_TEXTURE = {
  backgroundImage:
    "repeating-linear-gradient(45deg, rgba(255,255,255,0.04) 0 1px, transparent 1px 18px), repeating-linear-gradient(-45deg, rgba(255,255,255,0.04) 0 1px, transparent 1px 18px)",
};

const HOW = [
  {
    step: "1",
    title: "A clinician takes the brief",
    body: "Discipline, setting, caseload, productivity, schedule, pay. Molly is a licensed speech-language pathologist, so the questions are the ones a therapist would ask before saying yes.",
  },
  {
    step: "2",
    title: "We work the whole market",
    body: "Not the applicants who happened to see your posting. We approach the PTs, OTs, SLPs and audiologists who match, in your market and, for hard seats, across the country.",
  },
  {
    step: "3",
    title: "You meet people who already said yes",
    body: "Every candidate you see has been screened for the setting and has agreed to a conversation about your organization. Interviews, feedback and the offer are handled from there.",
  },
];

export default function HomePage() {
  const nat = nationalTotals();
  const topStates = topStatesByRoles(["pt", "pta", "ot", "ota", "slp", "aud"], 8);

  return (
    <>
      <section className="bg-navy-600 text-white" style={HERO_TEXTURE}>
        <Container className="py-24 sm:py-32">
          <p className="text-sm font-semibold tracking-widest text-teal-300 uppercase">
            Rehab therapy recruiting, nationwide
          </p>
          <h1 className="mt-4 max-w-3xl font-heading text-4xl leading-tight font-semibold sm:text-5xl lg:text-6xl">
            Specialized Rehabilitation Therapy &amp; Audiology Recruiting,{" "}
            <span className="text-teal-300">Led by a Licensed Clinician</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-navy-100">
            APT Recruiting connects Physical Therapists, Occupational Therapists,
            Speech-Language Pathologists, and Audiologists with healthcare organizations
            nationwide. We also provide recruiting services for Nurse Practitioners and Physician
            Assistants. Every candidate we present is screened by a clinician for the setting,
            caseload, and schedule—so you receive qualified candidates who align with the needs of
            your position.
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/contact/hire/"
              className="rounded-md bg-teal-500 px-6 py-3 text-center text-base font-semibold text-white transition-colors hover:bg-teal-400"
            >
              I&apos;m hiring
            </Link>
            <Link
              href="/job-seekers/"
              className="rounded-md border border-navy-200 px-6 py-3 text-center text-base font-semibold text-white transition-colors hover:border-teal-300 hover:text-teal-200"
            >
              I&apos;m a clinician
            </Link>
          </div>
          <p className="mt-8 text-sm text-navy-200">{SITE.tagline}</p>
        </Container>
      </section>

      <section className="py-20">
        <Container>
          <SectionHeading eyebrow="Who we place" title="Four therapy professions. One recruiter who has done the clinical work.">
            Physical therapists, occupational therapists, speech-language pathologists and
            audiologists, with PTAs and COTAs alongside them, plus the therapy leaders who run
            the department. We also recruit nurse practitioners and physician assistants.
          </SectionHeading>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {PROFESSION_LIST.map((p) => (
              <FeaturedCard
                key={p.key}
                href={`/${p.slug}/`}
                title={`${p.label} recruiters`}
                sub={`${n(p.nppesRoles.reduce((s, r) => s + nat.supply[r], 0))} licensed ${p.nppesRoles.length > 1 ? `${p.short}s and ${ROLE_LABELS[p.nppesRoles[1]].short}s` : p.plural.toLowerCase()} enrolled nationwide.`}
                cta={`${p.short} recruiting →`}
              />
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-mist-light py-20">
        <Container>
          <SectionHeading eyebrow="The therapy workforce" title="We recruit from the numbers, not the job board.">
            Every state and metro page on this site carries the current federal count of
            therapists, what they are paid, where they work and which licensure compacts apply.
            The same data shapes every search we run.
          </SectionHeading>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <StatTile value={n(nat.supply.pt)} label="Physical therapists" sub={`+ ${n(nat.supply.pta)} PTAs`} />
            <StatTile value={n(nat.supply.ot)} label="Occupational therapists" sub={`+ ${n(nat.supply.ota)} OTAs`} />
            <StatTile value={n(nat.supply.slp)} label="Speech-language pathologists" />
            <StatTile value={n(nat.supply.aud)} label="Audiologists" />
          </div>
          <p className="mt-6 text-sm text-body">
            Individual providers with an active practice address, summed across {nat.states} states
            and DC. Source: {nat.sources.supply}.
          </p>
          <h3 className="mt-12 font-heading text-xl font-semibold text-navy-600">Largest therapy markets</h3>
          <MarketLinkGrid
            className="mt-4"
            items={topStates.map(({ m, count }) => ({
              label: m.market,
              href: stateHref(m),
              sub: `${n(count)} therapists and assistants`,
            }))}
          />
          <p className="mt-6">
            <Link href="/therapy-recruiters/" className="font-semibold text-teal-600 hover:text-teal-700">
              All 50 states and DC →
            </Link>
          </p>
        </Container>
      </section>

      <section className="py-20">
        <Container>
          <SectionHeading eyebrow="Settings" title="We know what the job looks like in each setting.">
            A SNF SLP, a school SLP and an acute-care SLP are three different hires. We screen for the one you need.
          </SectionHeading>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {SETTING_LIST.map((s) => (
              <Link
                key={s.key}
                href={`/${s.slug}/`}
                className="rounded-lg border border-mist bg-white p-5 transition-shadow hover:shadow-md"
              >
                <span className="block font-heading font-semibold text-navy-600">{s.label}</span>
                <span className="mt-2 block text-sm text-body">{s.roles.slice(0, 2).join(", ")}</span>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-lavender/40 py-20">
        <Container>
          <SectionHeading eyebrow="How it works" title="Three steps from open seat to signed offer.">
            {EMPLOYER_TERMS.speed}
          </SectionHeading>
          <div className="mt-10 grid gap-8 md:grid-cols-3">
            {HOW.map((h) => (
              <div key={h.step} className="rounded-lg border border-mist bg-white p-6 shadow-sm">
                <p className="font-heading text-3xl font-semibold text-teal-500">{h.step}</p>
                <h3 className="mt-2 font-heading text-lg font-semibold text-navy-600">{h.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-body">{h.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-20">
        <Container>
          <div className="grid gap-10 md:grid-cols-[1fr_2fr] md:items-start">
            <div>
              <p className="text-sm font-semibold tracking-widest text-teal-600 uppercase">The founder</p>
              <h2 className="mt-2 font-heading text-3xl font-semibold text-navy-600">{MOLLY.name}</h2>
              <p className="mt-1 font-medium text-teal-600">
                {MOLLY.credentialLetters} · {MOLLY.credential}
              </p>
            </div>
            <div className="space-y-4 leading-relaxed text-body">
              {MOLLY.bio.slice(0, 2).map((p) => (
                <p key={p.slice(0, 24)}>{p}</p>
              ))}
              <p>
                <Link href="/about/" className="font-semibold text-teal-600 hover:text-teal-700">
                  More about Molly and how APT works →
                </Link>
              </p>
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-mist-light py-16">
        <Container>
          <SectionHeading eyebrow="Results" title="What clients and placed therapists say" />
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {TESTIMONIALS.map((t) => (
              <figure key={t.name} className="flex flex-col rounded-lg border border-mist bg-white p-6 shadow-sm">
                <blockquote className="flex-1 leading-relaxed text-body">&ldquo;{t.quote}&rdquo;</blockquote>
                <figcaption className="mt-5 text-sm">
                  <span className="block font-semibold text-navy-600">{t.name}</span>
                  <span className="block text-body">
                    {t.title}
                    {t.org ? `, ${t.org}` : ""}
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        </Container>
      </section>

      <EmployerBlock />

      <CtaBand
        title="Ready to fill the seat?"
        body="Tell us the discipline, the setting and the market. Molly reads every brief herself."
        secondaryLabel="I'm a therapist"
        secondaryHref="/job-seekers/"
      />

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          "@id": `${SITE.url}/#website`,
          url: `${SITE.url}/`,
          name: SITE.name,
          publisher: { "@id": `${SITE.url}/#organization` },
        }}
      />
    </>
  );
}
