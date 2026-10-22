import type { CompactKey, ProfessionKey, RoleKey } from "@/lib/site";
import { ROLE_LABELS } from "@/lib/site";
import { launchMarkets, marketBySlug, type MarketSnapshot, type OccBlock } from "@/lib/markets";
import { liveJobs, type Job } from "@/lib/jobs";

// Candidate-facing salary pages: /salary/<role>/<state>/, one per role per state
// with a published BLS OEWS mean. Built for "<role> salary <state>" searches
// (DataForSEO 2026-10-22: ~23k US searches a month across the 306 combinations).
// Every number comes from the state and metro snapshots; nothing is typed by hand.

export type SalaryRole = {
  key: RoleKey;
  slug: string;
  profession: ProfessionKey; // which jobs count as "open roles" for this page
  compact: CompactKey;
};

export const SALARY_ROLES: SalaryRole[] = [
  { key: "pt", slug: "physical-therapist", profession: "pt", compact: "pt" },
  { key: "pta", slug: "physical-therapist-assistant", profession: "pt", compact: "pt" },
  { key: "ot", slug: "occupational-therapist", profession: "ot", compact: "ot" },
  { key: "ota", slug: "occupational-therapy-assistant", profession: "ot", compact: "ot" },
  { key: "slp", slug: "speech-language-pathologist", profession: "slp", compact: "aslp" },
  { key: "aud", slug: "audiologist", profession: "aud", compact: "aslp" },
];

export function salaryRoleBySlug(slug: string): SalaryRole | undefined {
  return SALARY_ROLES.find((r) => r.slug === slug);
}

export const roleLabel = (r: SalaryRole) => ROLE_LABELS[r.key];

// "Speech-language pathologist" -> "Speech-Language Pathologist", for titles.
export const titleCase = (s: string) => s.replace(/(^|[\s-])([a-z])/g, (_, p: string, c: string) => p + c.toUpperCase());

export function salaryHref(r: SalaryRole, m?: MarketSnapshot | { market: string }): string {
  return m ? `/salary/${r.slug}/${m.market.toLowerCase().replace(/\s+/g, "-")}/` : `/salary/${r.slug}/`;
}

export function stateWage(m: MarketSnapshot, r: SalaryRole): OccBlock | undefined {
  const d = m.compensation[r.key];
  return d && d.annual_mean_wage != null ? d : undefined;
}

export function nationalWage(r: SalaryRole): OccBlock | undefined {
  for (const m of launchMarkets()) {
    const d = m.compensation.national?.[r.key];
    if (d?.annual_mean_wage != null) return d;
  }
  return undefined;
}

// States with a published mean for this role, highest mean first.
export function rankedStates(r: SalaryRole): { m: MarketSnapshot; d: OccBlock }[] {
  return launchMarkets()
    .map((m) => ({ m, d: stateWage(m, r) }))
    .filter((x): x is { m: MarketSnapshot; d: OccBlock } => !!x.d)
    .sort((a, b) => b.d.annual_mean_wage! - a.d.annual_mean_wage!);
}

export function salaryParams(): { role: string; state: string }[] {
  return SALARY_ROLES.flatMap((r) =>
    rankedStates(r).map(({ m }) => ({ role: r.slug, state: m.market.toLowerCase().replace(/\s+/g, "-") })),
  );
}

export function salaryPage(roleSlug: string, stateSlugValue: string) {
  const r = salaryRoleBySlug(roleSlug);
  const m = marketBySlug(stateSlugValue);
  if (!r || !m) return undefined;
  const d = stateWage(m, r);
  if (!d) return undefined;
  const ranked = rankedStates(r);
  return { r, m, d, rank: ranked.findIndex((x) => x.m.market_abbr === m.market_abbr) + 1, of: ranked.length };
}

export function jobsFor(profession: ProfessionKey, abbr?: string): Job[] {
  return liveJobs().filter((j) => j.profession === profession && (!abbr || j.state === abbr));
}

export const ordinal = (k: number): string => {
  const s = ["th", "st", "nd", "rd"];
  const v = k % 100;
  return `${k}${s[(v - 20) % 10] || s[v] || s[0]}`;
};
