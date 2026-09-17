"""Write obviously-fake fixture snapshots so templates can build before real data lands.

Every file carries "fixture": true; the real assemblers overwrite them and the build
check (scripts/check-fixtures.mjs) fails if any fixture remains.
"""
import json, os

HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.normpath(os.path.join(HERE, "..", "..", "data", "markets"))
from states import STATES  # noqa: E402

ROLES = ["pt", "pta", "ot", "ota", "slp", "aud"]
MONTHS = ["2025-08", "2025-09", "2025-10", "2025-11", "2025-12", "2026-01",
          "2026-02", "2026-03", "2026-04", "2026-05", "2026-06", "2026-07"]
QKEYS = ("therapy_offices_naics_62134", "home_health_naics_6216",
         "nursing_facilities_naics_6231", "hospitals_naics_6221")


def occ(i):
    return {"employment": 1000 + i, "annual_mean_wage": 90000 + i * 100, "annual_median_wage": 88000 + i * 100}


def qcew(i):
    return {"employment": 5000 + i, "establishments": 300 + i, "avg_weekly_wage": 1200 + i,
            "employment_yoy_pct": 1.5, "establishments_yoy_pct": 2.5, "avg_weekly_wage_yoy_pct": 3.5}


def common(i):
    return {
        "supply": {"source": "FIXTURE NPPES", "note": "fixture",
                   "active_individual_providers": {r: 1000 + i * 7 + k for k, r in enumerate(ROLES)}},
        "new_provider_inflow": {"source": "FIXTURE", "note": "fixture",
                                "trailing_12_months": {r: {"trailing_12mo_total": 12 * (k + 1),
                                                           "by_month": {m: k + 1 for m in MONTHS}}
                                                       for k, r in enumerate(ROLES)}},
        "compensation": {"source": "FIXTURE OEWS", **{r: occ(k) for k, r in enumerate(ROLES)},
                         "national": {r: occ(k) for k, r in enumerate(ROLES)}},
        "sector_employment": {"source": "FIXTURE QCEW", **{k: qcew(i + j) for j, k in enumerate(QKEYS)}},
        "facilities": {"source": "FIXTURE CMS",
                       "nursing_homes": {"count": 100 + i, "certified_beds": 9000 + i, "avg_overall_rating": 3.1, "for_profit_pct": 66.6},
                       "home_health_agencies": {"count": 50 + i, "avg_quality_star": 3.4, "offers_pt_pct": 90.0, "offers_ot_pct": 80.0, "offers_slp_pct": 70.0}},
        "narrative_extra": None,
    }


os.makedirs(OUT, exist_ok=True)
for i, (fips, abbr, name) in enumerate(STATES):
    snap = {"market": name, "market_abbr": abbr, "desk": "therapy", "snapshot_date": "2026-09-02",
            "fixture": True, "population": {"source": "FIXTURE", "total": 1000000 + i}, **common(i),
            "compacts": {"source": "FIXTURE", "pt": "issuing", "ot": "member", "aslp": "none"}}
    snap["supply"]["per_100k"] = {r: 10.0 + k for k, r in enumerate(["pt", "ot", "slp", "aud"])}
    json.dump(snap, open(os.path.join(OUT, f"{abbr.lower()}-therapy.json"), "w", encoding="utf-8"), indent=2)

METROS = [("TX", "Houston", "houston", "26420", "Houston-The Woodlands-Sugar Land, TX"),
          ("TX", "Dallas", "dallas", "19100", "Dallas-Fort Worth-Arlington, TX"),
          ("MA", "Boston", "boston", "14460", "Boston-Cambridge-Newton, MA-NH"),
          ("NH", "Boston", "boston", "14460", "Boston-Cambridge-Newton, MA-NH"),
          ("MO", "Kansas City", "kansas-city", "28140", "Kansas City, MO-KS")]
NAMES = {a: n for _, a, n in STATES}
for i, (st, city, slug, cbsa, metro) in enumerate(METROS):
    d = os.path.join(OUT, "metros", st.lower())
    os.makedirs(d, exist_ok=True)
    snap = {"metro": metro, "city": city, "city_slug": slug, "cbsa": cbsa, "state_abbr": st,
            "state": NAMES[st], "desk": "therapy", "snapshot_date": "2026-09-02", "fixture": True, **common(i)}
    snap["supply"]["scope"] = f"{NAMES[st]} side of the {city} metro area"
    snap["compensation"]["source"] = "FIXTURE OEWS metro"
    snap["compensation"].pop("national")
    for k in QKEYS:
        b = snap["sector_employment"][k]
        for x in [x for x in b if x.endswith("_yoy_pct")]:
            b.pop(x)
        b.update({"counties_disclosed": 5, "counties_total": 7})
    json.dump(snap, open(os.path.join(d, f"{slug}.json"), "w", encoding="utf-8"), indent=2)
print("fixtures written")
