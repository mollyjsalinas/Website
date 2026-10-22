import Link from "next/link";
import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/Sections";
import type { MarketSnapshot } from "@/lib/markets";
import { liveJobs } from "@/lib/jobs";
import { SALARY_ROLES, salaryHref, roleLabel, stateWage } from "@/lib/salary";

// One line under a market page's pay table, linking to the per-role salary
// page for that state (the candidate-facing version of the same numbers).
export function SalaryLinks({ m }: { m: MarketSnapshot }) {
  const roles = SALARY_ROLES.filter((r) => stateWage(m, r));
  if (roles.length === 0) return null;
  return (
    <p className="mt-3 max-w-3xl text-sm leading-relaxed text-body">
      Salary detail for {m.market}, with metro pay:{" "}
      {roles.map((r, i) => (
        <span key={r.key}>
          {i > 0 && " · "}
          <Link href={salaryHref(r, m)} className="font-semibold text-teal-600 hover:text-teal-700">
            {roleLabel(r).short}
          </Link>
        </span>
      ))}
    </p>
  );
}

// Public openings in a state, shown on its market pages. Renders nothing
// when the state has none, so empty states never show an empty box.
export function StateOpenRoles({ abbr, place }: { abbr: string; place: string }) {
  const jobs = liveJobs().filter((j) => j.state === abbr);
  if (jobs.length === 0) return null;
  return (
    <section className="py-16">
      <Container>
        <SectionHeading eyebrow="Open roles" title={`Therapy jobs we are filling in ${place}`}>
          Confidential searches an employer has asked us to list. Free to the clinician.
        </SectionHeading>
        <ul className="mt-8 max-w-3xl space-y-3">
          {jobs.map((j) => (
            <li key={j.slug}>
              <Link href={`/jobs/${j.slug}/`} className="font-semibold text-teal-600 hover:text-teal-700">
                {j.title}, {j.city}
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
