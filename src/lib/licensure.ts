import { readFileSync } from "node:fs";
import { join } from "node:path";
import type { CompactKey } from "@/lib/site";
import { marketByAbbr, stateSlug } from "@/lib/markets";
import { salaryRoleBySlug } from "@/lib/salary";

// State licensure guides: /licensure/<state>/<profession>/. Built for searches
// like "texas physical therapy license" (DataForSEO 2026-10-22: ~18k US searches
// a month across PT/OT/SLP x 51 states; FL, TX and CA lead). Every fact in
// data/licensure.json carries the board page it came from and a verbatim quote
// that scripts/check-licensure-quotes.py found on that page (110 of 110 on
// 2026-10-22; one fact was dropped by hand for overstating its quote). A fact whose quote
// was not found was dropped, never paraphrased back in.

export type Fact = { value: string; source_url: string; quote: string; verified: true };

export const FACT_KEYS = [
  "board",
  "education",
  "national_exam",
  "state_exam",
  "background_check",
  "application_fee",
  "endorsement",
  "temporary_or_provisional",
  "required_courses",
  "renewal",
  "continuing_education",
  "compact",
  "processing_time",
  "apply_url",
] as const;
export type FactKey = (typeof FACT_KEYS)[number];
export type Facts = Partial<Record<FactKey, Fact | null>>;

type StateGuide = {
  state: string;
  abbr: string;
  researched_on: string;
  professions: Partial<Record<LicProfKey, Facts>>;
};

export type LicProfKey = "pt" | "ot" | "slp";

export const LIC_PROFESSIONS: Record<
  LicProfKey,
  { key: LicProfKey; slug: string; label: string; plural: string; discipline: string; compact: CompactKey; salarySlug: string }
> = {
  pt: {
    key: "pt",
    slug: "physical-therapist",
    label: "Physical therapist",
    plural: "physical therapists",
    discipline: "physical therapy",
    compact: "pt",
    salarySlug: "physical-therapist",
  },
  ot: {
    key: "ot",
    slug: "occupational-therapist",
    label: "Occupational therapist",
    plural: "occupational therapists",
    discipline: "occupational therapy",
    compact: "ot",
    salarySlug: "occupational-therapist",
  },
  slp: {
    key: "slp",
    slug: "speech-language-pathologist",
    label: "Speech-language pathologist",
    plural: "speech-language pathologists",
    discipline: "speech-language pathology",
    compact: "aslp",
    salarySlug: "speech-language-pathologist",
  },
};

let cache: StateGuide[] | null = null;
function guides(): StateGuide[] {
  if (!cache) cache = JSON.parse(readFileSync(join(process.cwd(), "data", "licensure.json"), "utf-8")) as StateGuide[];
  return cache;
}

export function licensureHref(abbr: string, prof: LicProfKey): string {
  const m = marketByAbbr(abbr);
  return `/licensure/${stateSlug(m ? m.market : abbr)}/${LIC_PROFESSIONS[prof].slug}/`;
}

// A guide is published only when the board and at least four other facts survived verification.
const MIN_FACTS = 5;

export function licensureGuides(): { g: StateGuide; prof: LicProfKey; facts: Facts }[] {
  return guides().flatMap((g) =>
    (Object.keys(LIC_PROFESSIONS) as LicProfKey[])
      .map((prof) => ({ g, prof, facts: g.professions[prof] ?? {} }))
      .filter(({ facts }) => facts.board && Object.values(facts).filter(Boolean).length >= MIN_FACTS),
  );
}

export function licensureGuide(stateSlugValue: string, profSlug: string) {
  return licensureGuides().find(
    (x) => stateSlug(x.g.state) === stateSlugValue && LIC_PROFESSIONS[x.prof].slug === profSlug,
  );
}

// Whether a guide exists for this state and profession, for cross-links.
export function hasLicensureGuide(abbr: string, prof: LicProfKey): boolean {
  return licensureGuides().some((x) => x.g.abbr === abbr && x.prof === prof);
}

export const salaryRoleFor = (prof: LicProfKey) => salaryRoleBySlug(LIC_PROFESSIONS[prof].salarySlug)!;

// Facts cite their source by number; identical URLs share a number.
export function sourceList(facts: Facts, order: readonly FactKey[]): { urls: string[]; num: (k: FactKey) => number | null } {
  const urls: string[] = [];
  for (const k of order) {
    const f = facts[k];
    if (f && !urls.includes(f.source_url)) urls.push(f.source_url);
  }
  return { urls, num: (k) => (facts[k] ? urls.indexOf(facts[k]!.source_url) + 1 : null) };
}
