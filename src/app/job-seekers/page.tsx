import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/Container";
import { ContactForm } from "@/components/ContactForm";
import { Hero, SectionHeading, FaqSection, Breadcrumbs } from "@/components/Sections";
import { SITE, candidateFaqs, PROFESSION_LIST } from "@/lib/site";

export const metadata: Metadata = {
  title: "Therapy, NP & PA Jobs: Work With a Healthcare Recruiter",
  description:
    "Physical therapy, occupational therapy, speech-language pathology, audiology, nurse practitioner and physician assistant opportunities nationwide. Confidential, candidate-first recruiting.",
  alternates: { canonical: "/job-seekers/" },
};

const PROMISES = [
  {
    title: "Free, always",
    body: "The employer pays our fee. You never pay a therapy recruiter, and you never pay us.",
  },
  {
    title: "Confidential by default",
    body: "Your resume and identity go to an employer only when you say so, one employer at a time.",
  },
  {
    title: "The honest picture first",
    body: "Caseload, productivity, documentation load, weekend rotation, pay. You hear what we know before you interview, from a licensed SLP who knows what the numbers mean.",
  },
  {
    title: "The roles we represent",
    body: "Mostly permanent full-time and part-time positions. When an employer has an immediate need, we also fill contract roles.",
  },
];

export default function JobSeekersPage() {
  return (
    <>
      <Hero
        eyebrow="For clinicians"
        title="A healthcare recruiter who understands clinical work."
        primary={{ href: "#contact", label: "Start a confidential conversation" }}
        secondary={{ href: "/jobs/", label: "See open roles" }}
      >
        APT Recruiting was founded by a licensed speech-language pathologist. If you are a PT, OT, SLP, audiologist, PTA, COTA, nurse practitioner or physician assistant considering a move, you will talk to someone who knows the difference between a good setting and a good posting.
      </Hero>

      <section className="py-20">
        <Container>
          <SectionHeading eyebrow="What you get" title="Four promises to every therapist we work with" />
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {PROMISES.map((p) => (
              <div key={p.title} className="rounded-lg border border-mist bg-white p-6 shadow-sm">
                <h3 className="font-heading text-lg font-semibold text-navy-600">{p.title}</h3>
                <p className="mt-2 leading-relaxed text-body">{p.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-mist-light py-20">
        <Container>
          <SectionHeading eyebrow="Know your market" title="What therapists earn, and where the work is">
            Every state and metro page carries the federal count of therapists, mean and median
            pay by discipline, where the sector jobs are and which licensure compacts apply.
            Useful before any negotiation.
          </SectionHeading>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/therapy-recruiters/" className="rounded-md bg-navy-600 px-5 py-2.5 font-semibold text-white hover:bg-navy-500">
              Therapy workforce by state
            </Link>
            <Link href="/blog/what-therapists-earn-by-state/" className="rounded-md border border-mist bg-white px-5 py-2.5 font-semibold text-navy-600 hover:border-teal-400">
              PT, OT and SLP pay by state
            </Link>
            <Link href="/salary/" className="rounded-md border border-mist bg-white px-5 py-2.5 font-semibold text-navy-600 hover:border-teal-400">
              Salaries by role, state and metro
            </Link>
            <Link href="/licensure/" className="rounded-md border border-mist bg-white px-5 py-2.5 font-semibold text-navy-600 hover:border-teal-400">
              State license guides
            </Link>
            <Link href="/jobs/" className="rounded-md border border-mist bg-white px-5 py-2.5 font-semibold text-navy-600 hover:border-teal-400">
              Open roles
            </Link>
            <Link href="/licensure-compacts/" className="rounded-md border border-mist bg-white px-5 py-2.5 font-semibold text-navy-600 hover:border-teal-400">
              Licensure compacts
            </Link>
          </div>
          <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm">
            {PROFESSION_LIST.map((p) => (
              <li key={p.key}>
                <Link href={`/${p.slug}/`} className="font-semibold text-teal-600 hover:text-teal-700">
                  {p.label} roles →
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="py-20"><Container><SectionHeading eyebrow="Explore by specialty" title="Candidate career and salary guides by state">Use current BLS state wage estimates to benchmark your next move, then start a confidential conversation about the setting and schedule you want.</SectionHeading><div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3"><Link href="/salary/nurse-practitioner/" className="rounded-lg border border-mist bg-white p-5 font-semibold text-teal-600 hover:border-teal-400">Nurse Practitioner salaries by state →</Link><Link href="/salary/physician-assistant/" className="rounded-lg border border-mist bg-white p-5 font-semibold text-teal-600 hover:border-teal-400">Physician Assistant salaries by state →</Link><Link href="/career/certified-hand-therapist/texas/" className="rounded-lg border border-mist bg-white p-5 font-semibold text-teal-600 hover:border-teal-400">Certified Hand Therapist careers →</Link><Link href="/career/pelvic-health-therapist/texas/" className="rounded-lg border border-mist bg-white p-5 font-semibold text-teal-600 hover:border-teal-400">Pelvic Health Therapist careers →</Link><Link href="/salary/audiologist/" className="rounded-lg border border-mist bg-white p-5 font-semibold text-teal-600 hover:border-teal-400">Audiologist salaries by state →</Link></div></Container></section>\n\n      <FaqSection faqs={candidateFaqs} title="Questions clinicians ask us" />

      <section id="contact" className="scroll-mt-24 bg-lavender/40 py-20">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <SectionHeading eyebrow="Confidential" title="Tell us what you are looking for.">
                Setting, schedule, location, pay. Molly replies within one business day, and nothing
                you send goes anywhere without your say-so.
              </SectionHeading>
              <p className="mt-6 text-sm text-body">
                Prefer email?{" "}
                <a href={`mailto:${SITE.email}`} className="font-semibold text-teal-600 hover:text-teal-700">
                  {SITE.email}
                </a>
              </p>
            </div>
            <ContactForm />
          </div>
        </Container>
      </section>

      <Breadcrumbs
        items={[
          { name: "Home", href: `${SITE.url}/` },
          { name: "For Therapists", href: `${SITE.url}/job-seekers/` },
        ]}
      />
    </>
  );
}
