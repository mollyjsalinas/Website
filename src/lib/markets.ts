import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import type { RoleKey } from "@/lib/site";

// Per-state therapy market snapshots produced by scripts/market-data/ (see
// docs/DATA_CONTRACT.md and docs/DATA_NOTES.md). Pages may only publish numbers
// present in these files; every block carries its source and reference period.
// The types below mirror the contract exactly, nullable and optional where it
// says so. ⛔ Never edit data/ from the site side: fix the template.

// Rollout schedule: every page is pre-built and data-verified; a state
// publishes when the build date reaches its slot. All 51 open on launch day.
// To pause a state, move its date out. MARKETS_PUBLISH_ALL=1 overrides the
// gate (verification builds only).
export const ROLLOUT_SCHEDULE: ReadonlyArray<readonly [string, string]> = [
  ["AL", "2026-09-02"], ["AK", "2026-09-02"], ["AZ", "2026-09-02"], ["AR", "2026-09-02"],
  ["CA", "2026-09-02"], ["CO", "2026-09-02"], ["CT", "2026-09-02"], ["DE", "2026-09-02"],
  ["DC", "2026-09-02"], ["FL", "2026-09-02"], ["GA", "2026-09-02"], ["HI", "2026-09-02"],
  ["ID", "2026-09-02"], ["IL", "2026-09-02"], ["IN", "2026-09-02"], ["IA", "2026-09-02"],
  ["KS", "2026-09-02"], ["KY", "2026-09-02"], ["LA", "2026-09-02"], ["ME", "2026-09-02"],
  ["MD", "2026-09-02"], ["MA", "2026-09-02"], ["MI", "2026-09-02"], ["MN", "2026-09-02"],
  ["MS", "2026-09-02"], ["MO", "2026-09-02"], ["MT", "2026-09-02"], ["NE", "2026-09-02"],
  ["NV", "2026-09-02"], ["NH", "2026-09-02"], ["NJ", "2026-09-02"], ["NM", "2026-09-02"],
  ["NY", "2026-09-02"], ["NC", "2026-09-02"], ["ND", "2026-09-02"], ["OH", "2026-09-02"],
  ["OK", "2026-09-02"], ["OR", "2026-09-02"], ["PA", "2026-09-02"], ["RI", "2026-09-02"],
  ["SC", "2026-09-02"], ["SD", "2026-09-02"], ["TN", "2026-09-02"], ["TX", "2026-09-02"],
  ["UT", "2026-09-02"], ["VT", "2026-09-02"], ["VA", "2026-09-02"], ["WA", "2026-09-02"],
  ["WV", "2026-09-02"], ["WI", "2026-09-02"], ["WY", "2026-09-02"],
] as const;

function publishedAbbrs(): string[] {
  if (process.env.MARKETS_PUBLISH_ALL === "1") {
    return ROLLOUT_SCHEDULE.map(([abbr]) => abbr);
  }
  const today = new Date().toISOString().slice(0, 10); // UTC build date
  return ROLLOUT_SCHEDULE.filter(([, on]) => on <= today).map(([abbr]) => abbr);
}

// ---------------------------------------------------------------------------
// Contract types (docs/DATA_CONTRACT.md)

export type QcewKey =
  | "therapy_offices_naics_62134"
  | "home_health_naics_6216"
  | "nursing_facilities_naics_6231"
  | "hospitals_naics_6221";

export const QCEW_KEYS: QcewKey[] = [
  "therapy_offices_naics_62134",
  "home_health_naics_6216",
  "nursing_facilities_naics_6231",
  "hospitals_naics_6221",
];

// State QCEW block: YoY keys are ABSENT (not 0) when the prior year is missing.
export type StateQcewBlock = {
  employment: number;
  establishments: number;
  avg_weekly_wage: number;
  employment_yoy_pct?: number;
  establishments_yoy_pct?: number;
  avg_weekly_wage_yoy_pct?: number;
} | null;

// Metro QCEW block: county coverage instead of YoY.
export type MetroQcewBlock = {
  employment: number;
  establishments: number;
  avg_weekly_wage: number;
  counties_disclosed: number;
  counties_total: number;
} | null;

// OEWS occupation: either field may be null when BLS suppresses it.
export type OccBlock = {
  employment: number | null;
  annual_mean_wage: number | null;
  annual_median_wage: number | null;
};

export type OewsKey = RoleKey; // pt, ot, slp, aud, pta, ota

export type CompensationBlock = {
  source: string;
} & Partial<Record<OewsKey, OccBlock>> & {
    national?: Partial<Record<OewsKey, OccBlock>>;
  };

export type InflowBlock = Record<RoleKey, { trailing_12mo_total: number; by_month: Record<string, number> }>;

export type CompactStatus = "issuing" | "member" | "none";

export type MarketSnapshot = {
  market: string;
  market_abbr: string;
  desk: string;
  snapshot_date: string;
  fixture?: boolean;
  population: { source: string; total: number };
  supply: {
    source: string;
    note?: string;
    active_individual_providers: Record<RoleKey, number>;
    per_100k: Record<"pt" | "ot" | "slp" | "aud", number>;
  };
  new_provider_inflow: {
    source: string;
    note?: string;
    trailing_12_months: InflowBlock;
  };
  compensation: CompensationBlock;
  sector_employment: { source: string } & Record<QcewKey, StateQcewBlock>;
  facilities: {
    source: string;
    nursing_homes: {
      count: number;
      certified_beds: number;
      avg_overall_rating: number | null;
      for_profit_pct: number;
    };
    home_health_agencies: {
      count: number;
      avg_quality_star: number | null;
      offers_pt_pct: number;
      offers_ot_pct: number;
      offers_slp_pct: number;
    };
  };
  compacts: {
    source: string;
    pt: CompactStatus;
    ot: CompactStatus;
    aslp: CompactStatus;
  };
  narrative_extra: string | null;
};

export type MetroSnapshot = {
  metro: string;
  city: string;
  city_slug: string;
  cbsa: string;
  state_abbr: string;
  state: string;
  desk: string;
  snapshot_date: string;
  fixture?: boolean;
  supply: {
    source: string;
    note?: string;
    scope?: string;
    active_individual_providers: Record<RoleKey, number>;
  };
  new_provider_inflow: {
    source: string;
    note?: string;
    trailing_12_months: InflowBlock;
  };
  // ABSENT entirely when BLS publishes no OEWS for that metro.
  compensation?: CompensationBlock;
  sector_employment: { source: string; scope?: string } & Record<QcewKey, MetroQcewBlock>;
  facilities: MarketSnapshot["facilities"];
  narrative_extra: string | null;
};

// ---------------------------------------------------------------------------
// Loading

const MARKETS_DIR = join(process.cwd(), "data", "markets");
const METROS_DIR = join(MARKETS_DIR, "metros");

function stateFile(abbr: string): string {
  return `${abbr.toLowerCase()}-therapy.json`;
}

export function stateSlug(marketName: string): string {
  return marketName.toLowerCase().replace(/\s+/g, "-");
}

// Mid-sentence display name ("therapists in the District of Columbia").
export function marketDisplay(m: MarketSnapshot | { market: string }): string {
  return m.market === "District of Columbia" ? "the District of Columbia" : m.market;
}

export function stateHref(m: MarketSnapshot | { market: string }): string {
  return `/therapy-recruiters/${stateSlug(m.market)}/`;
}

export function metroHref(c: MetroSnapshot): string {
  return `/therapy-recruiters/${stateSlug(c.state)}/${c.city_slug}/`;
}

const stateCache = new Map<string, MarketSnapshot>();

function load(abbr: string): MarketSnapshot {
  const key = abbr.toUpperCase();
  const cached = stateCache.get(key);
  if (cached) return cached;
  const raw = readFileSync(join(MARKETS_DIR, stateFile(key)), "utf-8");
  const parsed = JSON.parse(raw) as MarketSnapshot;
  stateCache.set(key, parsed);
  return parsed;
}

// Guard: fail the build loudly if any scheduled state's snapshot is missing
// (deterministic extraction, loud failure). Every page must be ready on day
// one, not on its publish day.
export function assertScheduleData(): void {
  const present = new Set(readdirSync(MARKETS_DIR));
  for (const [abbr] of ROLLOUT_SCHEDULE) {
    const f = stateFile(abbr);
    if (!present.has(f)) throw new Error(`markets: missing snapshot ${f}`);
  }
}

// Every state currently published, in schedule order.
export function launchMarkets(): MarketSnapshot[] {
  assertScheduleData();
  return publishedAbbrs().map(load);
}

// Same, sorted by market name for directories and tables.
export function launchMarketsByName(): MarketSnapshot[] {
  return [...launchMarkets()].sort((a, b) => a.market.localeCompare(b.market));
}

export function marketBySlug(slug: string): MarketSnapshot | undefined {
  return launchMarkets().find((m) => stateSlug(m.market) === slug);
}

export function marketByAbbr(abbr: string): MarketSnapshot | undefined {
  return launchMarkets().find((m) => m.market_abbr === abbr.toUpperCase());
}

// ---------------------------------------------------------------------------
// Cross-state metros

/**
 * A CBSA that spans state lines is sliced per state by the assembler, and every
 * slice keeps the metro's principal city. Publishing each slice would put two
 * or three near-identical "Boston" pages on the site competing for one query
 * family, so exactly one state owns each shared CBSA.
 *
 * The owner is DERIVED, not hand-listed: the metro title's state suffix names
 * the principal city's state first ("Kansas City, MO-KS" is a Missouri city;
 * "Washington-Arlington-Alexandria, DC-VA-MD-WV" is in the District), so the
 * first code wins. It is deliberately not the largest slice.
 *
 * METRO_OWNER_OVERRIDES exists for the exceptions where the Census title order
 * and the city's real home disagree; key by CBSA code, value the owning state
 * abbreviation. Empty today.
 */
export const METRO_OWNER_OVERRIDES: Readonly<Record<string, string>> = {};

export function metroOwnerAbbr(c: Pick<MetroSnapshot, "metro" | "cbsa" | "state_abbr">): string {
  const override = METRO_OWNER_OVERRIDES[c.cbsa];
  if (override) return override;
  const comma = c.metro.lastIndexOf(",");
  if (comma === -1) return c.state_abbr;
  const suffix = c.metro.slice(comma + 1).trim(); // "MO-KS", "DC-VA-MD-WV"
  const first = suffix.split("-")[0]?.trim().toUpperCase();
  return first && /^[A-Z]{2}$/.test(first) ? first : c.state_abbr;
}

// True when this state may publish a page for this metro slice.
export function ownsMetro(abbr: string, c: MetroSnapshot): boolean {
  return metroOwnerAbbr(c) === abbr.toUpperCase();
}

const metroCache = new Map<string, MetroSnapshot[]>();

// Cities for a state, by state abbreviation. States without staged metro data
// return [] so callers can render nothing. A malformed metro file throws (loud
// failure), matching assertScheduleData. Slices of a shared CBSA owned by
// another state are excluded from routing, the sitemap and state lists.
export function metrosForState(abbr: string): MetroSnapshot[] {
  const key = abbr.toUpperCase();
  const cached = metroCache.get(key);
  if (cached) return cached;
  const dir = join(METROS_DIR, abbr.toLowerCase());
  if (!existsSync(dir)) return [];
  const list = readdirSync(dir)
    .filter((f) => f.endsWith(".json"))
    .map((f) => JSON.parse(readFileSync(join(dir, f), "utf-8")) as MetroSnapshot)
    .filter((c) => ownsMetro(key, c))
    .sort((a, b) => a.city.localeCompare(b.city));
  metroCache.set(key, list);
  return list;
}

// Resolve a city within a published state; unpublished states and unknown
// cities return undefined (the city page 404s on those).
export function metroBySlug(stateSlugValue: string, citySlug: string): MetroSnapshot | undefined {
  const m = marketBySlug(stateSlugValue);
  if (!m) return undefined;
  return metrosForState(m.market_abbr).find((c) => c.city_slug === citySlug);
}

// Every published metro across every published state (owner slices only).
export function allMetros(): MetroSnapshot[] {
  return launchMarkets().flatMap((m) => metrosForState(m.market_abbr));
}

// ---------------------------------------------------------------------------
// National roll-ups for the hub pages

export type NationalTotals = {
  states: number; // state files summed
  snapshot_date: string;
  supply: Record<RoleKey, number>;
  inflow: Record<RoleKey, number>;
  // Summed across states whose block is non-null; `states` counts contributors.
  sector: Record<QcewKey, { employment: number; establishments: number; states: number } | null>;
  facilities: {
    nursing_homes: { count: number; certified_beds: number };
    home_health_agencies: { count: number };
  };
  // BLS national OEWS, read from any state file (every file carries the same block).
  compensation: Partial<Record<OewsKey, OccBlock>>;
  sources: { supply: string; inflow: string; sector: string; facilities: string; compensation: string };
};

const ROLES: RoleKey[] = ["pt", "pta", "ot", "ota", "slp", "aud"];

let nationalCache: NationalTotals | null = null;

export function nationalTotals(): NationalTotals {
  if (nationalCache) return nationalCache;
  const markets = launchMarkets();
  const supply = Object.fromEntries(ROLES.map((r) => [r, 0])) as Record<RoleKey, number>;
  const inflow = Object.fromEntries(ROLES.map((r) => [r, 0])) as Record<RoleKey, number>;
  const sector = Object.fromEntries(
    QCEW_KEYS.map((k) => [k, { employment: 0, establishments: 0, states: 0 }]),
  ) as Record<QcewKey, { employment: number; establishments: number; states: number }>;
  const facilities = { nursing_homes: { count: 0, certified_beds: 0 }, home_health_agencies: { count: 0 } };

  for (const m of markets) {
    for (const r of ROLES) {
      supply[r] += m.supply.active_individual_providers[r] ?? 0;
      inflow[r] += m.new_provider_inflow.trailing_12_months[r]?.trailing_12mo_total ?? 0;
    }
    for (const k of QCEW_KEYS) {
      const b = m.sector_employment[k];
      if (b) {
        sector[k].employment += b.employment;
        sector[k].establishments += b.establishments;
        sector[k].states += 1;
      }
    }
    facilities.nursing_homes.count += m.facilities.nursing_homes.count;
    facilities.nursing_homes.certified_beds += m.facilities.nursing_homes.certified_beds;
    facilities.home_health_agencies.count += m.facilities.home_health_agencies.count;
  }

  const first = markets[0];
  const withNational = markets.find((m) => m.compensation.national) ?? first;
  nationalCache = {
    states: markets.length,
    snapshot_date: first.snapshot_date,
    supply,
    inflow,
    sector: Object.fromEntries(
      QCEW_KEYS.map((k) => [k, sector[k].states > 0 ? sector[k] : null]),
    ) as NationalTotals["sector"],
    facilities,
    compensation: withNational.compensation.national ?? {},
    sources: {
      supply: first.supply.source,
      inflow: first.new_provider_inflow.source,
      sector: first.sector_employment.source,
      facilities: first.facilities.source,
      compensation: withNational.compensation.source,
    },
  };
  return nationalCache;
}

// Top-N states by headcount for a set of roles (a profession plus its assistants).
export function topStatesByRoles(roles: RoleKey[], limit = 10): { m: MarketSnapshot; count: number }[] {
  return launchMarkets()
    .map((m) => ({ m, count: roles.reduce((sum, r) => sum + (m.supply.active_individual_providers[r] ?? 0), 0) }))
    .sort((a, b) => b.count - a.count)
    .slice(0, limit);
}

// "NPPES monthly file, August 2026 (CMS, public domain)" -> "August 2026".
// Falls back to the snapshot date when the source string has no month.
export function supplyAsOf(snapshot: { supply: { source: string }; snapshot_date: string }): string {
  const match = snapshot.supply.source.match(/file, ([A-Za-z]+ \d{4})/);
  return match ? match[1] : snapshot.snapshot_date;
}
