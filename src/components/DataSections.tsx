import Link from "next/link";
import { Container } from "@/components/Container";
import { SectionHeading, StatTile, SourceLine } from "@/components/Sections";
import { ROLE_LABELS, COMPACTS, type RoleKey, type CompactKey } from "@/lib/site";
import {
  QCEW_KEYS,
  type QcewKey,
  type CompensationBlock,
  type OccBlock,
  type StateQcewBlock,
  type MetroQcewBlock,
  type MarketSnapshot,
  type InflowBlock,
  type CompactStatus,
} from "@/lib/markets";
import { n, usd, dec1, pct, yoy, annualFromWeekly, list } from "@/lib/format";

// Sections shared by the state and metro templates. Each renders ONLY fields
// the contract guarantees, and omits itself (or the row / card / sentence)
// when a nullable field is null, so a suppressed cell never prints "undefined".

// ---------------------------------------------------------------------------
// Therapy workforce tiles + inflow paragraph

export function WorkforceSection({
  place,
  placeIn,
  supply,
  per100k,
  inflow,
  asOf,
  scope,
  source,
}: {
  place: string; // "Texas", "Houston"
  placeIn: string; // "in Texas", "in the Houston metro"
  supply: Record<RoleKey, number>;
  per100k?: Record<"pt" | "ot" | "slp" | "aud", number>;
  inflow: InflowBlock;
  asOf: string;
  scope?: string;
  source: string;
}) {
  const tiles = [
    { key: "pt" as const, sub: `+ ${n(supply.pta)} ${ROLE_LABELS.pta.short}s` },
    { key: "ot" as const, sub: `+ ${n(supply.ota)} ${ROLE_LABELS.ota.short}s` },
    { key: "slp" as const, sub: undefined },
    { key: "aud" as const, sub: undefined },
  ];
  const inflowParts = (["pt", "ot", "slp", "aud"] as const).map(
    (r) => `${n(inflow[r].trailing_12mo_total)} ${ROLE_LABELS[r].plural.toLowerCase()}`,
  );
  const assistantInflow = inflow.pta.trailing_12mo_total + inflow.ota.trailing_12mo_total;

  return (
    <section className="py-20">
      <Container>
        <SectionHeading eyebrow="Therapy workforce" title={`Who practices ${placeIn} today`}>
          Individual PTs, OTs, SLPs and audiologists with an active practice address{" "}
          {placeIn}, from the federal NPI registry ({asOf}). Assistants are shown under their
          profession.
        </SectionHeading>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {tiles.map((t) => (
            <StatTile key={t.key} value={n(supply[t.key])} label={ROLE_LABELS[t.key].plural} sub={t.sub} />
          ))}
        </div>
        {per100k && (
          <p className="mt-6 max-w-3xl leading-relaxed text-body">
            Per 100,000 residents, {place} has {dec1(per100k.pt)} physical therapists,{" "}
            {dec1(per100k.ot)} occupational therapists, {dec1(per100k.slp)} speech-language
            pathologists and {dec1(per100k.aud)} audiologists.
          </p>
        )}
        <p className="mt-3 max-w-3xl leading-relaxed text-body">
          Over the last 12 months the registry added {list(inflowParts)} with a practice
          address {placeIn}, plus {n(assistantInflow)} PTAs and OTAs. Newly enumerated
          providers are mostly new graduates and clinicians relocating in, which is the pool
          every open seat {placeIn} is competing for.
        </p>
        <SourceLine>
          Source: {source}.{scope ? ` Scope: ${scope}.` : ""}
        </SourceLine>
      </Container>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Pay table: 6 rows, local mean / median vs national mean. Skips rows with no data.

const PAY_ROWS: RoleKey[] = ["pt", "pta", "ot", "ota", "slp", "aud"];

function hasPay(b?: OccBlock): b is OccBlock {
  return !!b && (b.annual_mean_wage != null || b.annual_median_wage != null || b.employment != null);
}

export function PaySection({
  place,
  comp,
  national,
  extraNote,
}: {
  place: string;
  comp: CompensationBlock;
  // national block, read from the state file (metros do not carry one)
  national?: Partial<Record<RoleKey, OccBlock>>;
  extraNote?: React.ReactNode;
}) {
  const rows = PAY_ROWS.filter((r) => hasPay(comp[r]));
  if (rows.length === 0) return null;
  const showNational = !!national && rows.some((r) => national[r]?.annual_mean_wage != null);
  return (
    <section className="bg-mist-light py-20">
      <Container>
        <SectionHeading eyebrow="Pay" title={`What therapists earn in ${place}`}>
          Mean and median annual wages from the federal occupational employment survey, next
          to the national mean. These are estimates for employed clinicians, not offers, and an
          offer below the median explains its own vacancy.
        </SectionHeading>
        <div className="mt-10 overflow-x-auto">
          <table className="w-full max-w-4xl border-collapse text-left">
            <thead>
              <tr className="border-b-2 border-navy-200 text-sm tracking-wide text-body uppercase">
                <th className="py-3 pr-4">Role</th>
                <th className="py-3 pr-4">Employed</th>
                <th className="py-3 pr-4">Mean annual wage</th>
                <th className="py-3 pr-4">Median</th>
                {showNational && <th className="py-3">National mean</th>}
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => {
                const d = comp[r]!;
                return (
                  <tr key={r} className="border-b border-mist">
                    <td className="py-3 pr-4 font-semibold text-navy-600">{ROLE_LABELS[r].plural}</td>
                    <td className="py-3 pr-4 text-body">{n(d.employment)}</td>
                    <td className="py-3 pr-4 text-body">{usd(d.annual_mean_wage)}</td>
                    <td className="py-3 pr-4 text-body">{usd(d.annual_median_wage)}</td>
                    {showNational && <td className="py-3 text-body">{usd(national?.[r]?.annual_mean_wage)}</td>}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <SourceLine>Source: {comp.source}. Suppressed cells show n/a.</SourceLine>
        {extraNote}
      </Container>
    </section>
  );
}

// ---------------------------------------------------------------------------
// "Where therapists work": QCEW cards, 4 industries, card omitted when null.

export const QCEW_LABELS: Record<QcewKey, { title: string; blurb: string }> = {
  therapy_offices_naics_62134: {
    title: "Therapy offices and clinics",
    blurb: "Offices of physical, occupational and speech therapists and audiologists.",
  },
  home_health_naics_6216: { title: "Home health", blurb: "Home health care services." },
  nursing_facilities_naics_6231: { title: "Nursing facilities", blurb: "Skilled nursing and nursing care facilities." },
  hospitals_naics_6221: { title: "Hospitals", blurb: "General medical and surgical hospitals." },
};

export function SectorSection({
  placeIn,
  sector,
  metro = false,
}: {
  placeIn: string;
  sector: ({ source: string; scope?: string } & Record<QcewKey, StateQcewBlock | MetroQcewBlock>);
  metro?: boolean;
}) {
  const cards = QCEW_KEYS.filter((k) => sector[k] != null);
  if (cards.length === 0) return null;
  const coverage = metro
    ? cards
        .map((k) => sector[k] as NonNullable<MetroQcewBlock>)
        .filter((b) => "counties_disclosed" in b)
        .map((b) => `${b.counties_disclosed} of ${b.counties_total} counties disclosed`)
    : [];
  const firstCoverage = coverage[0];
  return (
    <section className="py-20">
      <Container>
        <SectionHeading eyebrow="Where therapists work" title={`The employers ${placeIn}`}>
          Private-sector employment and establishment counts for the four industries that hire
          most rehab therapists. The payroll figure is the sector-wide average across every
          occupation in the industry, not a therapist salary.
        </SectionHeading>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {cards.map((k) => {
            const b = sector[k]!;
            const stateBlock = b as NonNullable<StateQcewBlock>;
            const empYoy = metro ? null : yoy(stateBlock.employment_yoy_pct);
            const estYoy = metro ? null : yoy(stateBlock.establishments_yoy_pct);
            const wageYoy = metro ? null : yoy(stateBlock.avg_weekly_wage_yoy_pct);
            return (
              <div key={k} className="rounded-lg border border-mist bg-white p-6 shadow-sm">
                <h3 className="font-heading text-xl font-semibold text-navy-600">{QCEW_LABELS[k].title}</h3>
                <p className="mt-1 text-xs text-body">{QCEW_LABELS[k].blurb}</p>
                <p className="mt-3 leading-relaxed text-body">
                  {n(b.employment)} employed across {n(b.establishments)} establishments
                  {empYoy ? `, employment ${empYoy} year over year` : ""}
                  {estYoy ? ` and the establishment count ${estYoy}` : ""}.
                </p>
                <p className="mt-2 leading-relaxed text-body">
                  Average weekly wage {usd(b.avg_weekly_wage)}, about {annualFromWeekly(b.avg_weekly_wage)} a
                  year in sector payroll terms
                  {wageYoy ? `, ${wageYoy} year over year` : ""}.
                </p>
              </div>
            );
          })}
        </div>
        <SourceLine>
          Source: {sector.source}.{sector.scope ? ` Scope: ${sector.scope}.` : ""}
          {firstCoverage ? ` Coverage: ${firstCoverage}; BLS withholds counties with too few employers to disclose.` : ""}
        </SourceLine>
      </Container>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Facilities band: nursing homes + home health agencies

export function FacilitiesSection({
  placeIn,
  facilities,
}: {
  placeIn: string;
  facilities: MarketSnapshot["facilities"];
}) {
  const nh = facilities.nursing_homes;
  const hh = facilities.home_health_agencies;
  return (
    <section className="bg-navy-600 py-20 text-white">
      <Container>
        <p className="text-sm font-semibold tracking-widest text-teal-300 uppercase">Facilities</p>
        <h2 className="mt-2 max-w-2xl font-heading text-3xl font-semibold sm:text-4xl">
          {n(nh.count)} Medicare-certified nursing homes and {n(hh.count)} home health agencies {placeIn}.
        </h2>
        <div className="mt-8 grid gap-8 md:grid-cols-2">
          <div>
            <h3 className="font-heading text-lg font-semibold text-teal-200">Nursing homes</h3>
            <p className="mt-2 leading-relaxed text-navy-100">
              {n(nh.count)} facilities with {n(nh.certified_beds)} certified beds.{" "}
              {nh.avg_overall_rating != null
                ? `Average overall CMS star rating ${dec1(nh.avg_overall_rating)} of 5. `
                : ""}
              {pct(nh.for_profit_pct)} are for-profit. Every one of them bills therapy minutes, and
              every one of them is hiring PTs, OTs and SLPs in the same market you are.
            </p>
          </div>
          <div>
            <h3 className="font-heading text-lg font-semibold text-teal-200">Home health agencies</h3>
            <p className="mt-2 leading-relaxed text-navy-100">
              {n(hh.count)} agencies
              {hh.avg_quality_star != null ? `, average quality-of-care star rating ${dec1(hh.avg_quality_star)} of 5` : ""}.{" "}
              {pct(hh.offers_pt_pct)} offer physical therapy, {pct(hh.offers_ot_pct)} occupational therapy
              and {pct(hh.offers_slp_pct)} speech therapy, so most are staffing at least one
              therapy discipline and many all three.
            </p>
          </div>
        </div>
        <p className="mt-6 text-sm text-navy-200">Source: {facilities.source}.</p>
        <Link
          href="/contact/hire/"
          className="mt-8 inline-block rounded-md bg-teal-500 px-6 py-3 font-semibold text-white transition-colors hover:bg-teal-400"
        >
          Tell us about the opening
        </Link>
      </Container>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Licensure compact band, 3 statuses in plain English (state pages only)

export function compactSentence(state: string, key: CompactKey, status: CompactStatus): string {
  const c = COMPACTS[key];
  switch (status) {
    case "issuing":
      return `${state} is a ${c.shortName} member and is issuing ${c.privilegeName}s: ${c.professions} licensed in another member state can obtain a privilege to practice in ${state} without applying for a new state license.`;
    case "member":
      return `${state} has enacted the ${c.shortName} but is not yet issuing ${c.privilegeName}s, so ${c.professions} licensed elsewhere still need a ${state} license for now.`;
    default:
      return `${state} is not a member of the ${c.shortName}: ${c.professions} licensed in another state need a full ${state} license before starting.`;
  }
}

const STATUS_LABEL: Record<CompactStatus, string> = {
  issuing: "Issuing privileges",
  member: "Member, not yet issuing",
  none: "Not a member",
};

export function CompactSection({
  state,
  compacts,
}: {
  state: string;
  compacts: MarketSnapshot["compacts"];
}) {
  const keys: CompactKey[] = ["pt", "ot", "aslp"];
  const issuingCount = keys.filter((k) => compacts[k] === "issuing").length;
  return (
    <section className="bg-mist-light py-20">
      <Container>
        <SectionHeading eyebrow="Licensure compacts" title={`Hiring across state lines into ${state}`}>
          {issuingCount === 3
            ? `${state} issues privileges under all three therapy compacts, which widens the candidate pool to every other issuing state for PT, OT, SLP and audiology hires.`
            : issuingCount === 0
              ? `${state} does not yet issue privileges under any of the three therapy compacts, so every out-of-state hire needs a ${state} license in hand before a start date. Plan the search around licensing time.`
              : `${state} issues privileges under ${issuingCount} of the three therapy compacts. Where it does, an out-of-state clinician can start faster; where it does not, budget for state licensing before the start date.`}
        </SectionHeading>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {keys.map((k) => (
            <div key={k} className="rounded-lg border border-mist bg-white p-6 shadow-sm">
              <p className="text-xs font-semibold tracking-widest text-teal-600 uppercase">
                {STATUS_LABEL[compacts[k]]}
              </p>
              <h3 className="mt-1 font-heading text-lg font-semibold text-navy-600">{COMPACTS[k].name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-body">{compactSentence(state, k, compacts[k])}</p>
              <Link href={`/licensure-compacts/${COMPACTS[k].slug}/`} className="mt-3 inline-block text-sm font-semibold text-teal-600 hover:text-teal-700">
                All states on the {COMPACTS[k].shortName} →
              </Link>
            </div>
          ))}
        </div>
        <SourceLine>Source: {compacts.source}.</SourceLine>
      </Container>
    </section>
  );
}
