"""Assemble per-metro therapy snapshots for the selected top metros per state.

Usage: python assemble_metros.py <county-cbsa.csv>

Geography rules baked into the output (every block carries source + scope):
- supply/inflow:      state-side slice of the CBSA (NPPES practice addresses)
- compensation:       WHOLE CBSA (OEWS metro rows); key ABSENT when BLS has none
- sector_employment:  sum of state-side member counties with disclosed QCEW data
- facilities:         state-side slice (CMS facility ZIPs mapped to CBSA)

Every state slice of a cross-state CBSA is written; src/lib/markets.ts decides
which slice publishes. Output: data/markets/metros/<st>/<city-slug>.json
Run after: select_metros.py, fetch_qcew_county.py (+ the state caches).
"""
import json, os, sys

HERE = os.path.dirname(os.path.abspath(__file__))
CACHE = os.path.join(HERE, "cache")
OUT_ROOT = os.path.normpath(os.path.join(HERE, "..", "..", "data", "markets", "metros"))

from states import STATES  # noqa: E402
from parse_nppes_metro import cbsa_counties  # noqa: E402
from assemble import (SNAPSHOT_DATE, NPPES_LABEL, NPPES_INFLOW_LABEL, TRAILING_12,  # noqa: E402
                      CMS_PULL_DATE, ROLES, QCEW, load, carry_forward)

FIPS_BY_ABBR = {abbr: fips for fips, abbr, _ in STATES}
NAME_BY_ABBR = {abbr: name for _, abbr, name in STATES}

# OEWS May 2025 uses the 2023 OMB delineations; the county crosswalk (and QCEW
# county membership) use 2020 codes. Three selected metros were re-coded; the
# OEWS row is the 2023 area, named in the compensation scope.
OEWS_CBSA_ALIAS = {
    "17460": "17410",  # Cleveland-Elyria, OH -> Cleveland, OH
    "39100": "28880",  # Poughkeepsie-Newburgh-Middletown, NY -> Kiryas Joel-Poughkeepsie-Newburgh, NY
    "15680": "30500",  # California-Lexington Park, MD -> Lexington Park, MD
}

# Real hyphenated city names that must not be split as multi-city CBSA titles.
HYPHEN_CITIES = ("Winston-Salem", "Wilkes-Barre")

def city_of(cbsa_name):
    cities = cbsa_name.split(",")[0].split("/")[0].strip()  # "Louisville/Jefferson County" -> Louisville
    for keep in HYPHEN_CITIES:
        if cities.startswith(keep):
            return keep
    # Multi-city titles separate principal cities with hyphens ("Dallas-Fort
    # Worth-Arlington"); the page is named for the first (principal) city.
    return cities.split("-")[0].strip()

def slugify(s):
    s = s.replace("-", " ")
    s = "".join(c if c.isalnum() or c == " " else "" for c in s)
    return "-".join(s.lower().split())

def main(crosswalk_path):
    nppes = load("nppes-metro.json")
    selection = load("metro-selection.json")
    qcew = load("qcew-county.json")
    oews = load("oews.json")
    cms = load("cms.json")
    y_cur = qcew["years"][0]

    members = cbsa_counties(crosswalk_path)  # CT: planning regions, see parse_nppes_metro

    def county_sum(counties, naics):
        emp = est = wage_weighted = 0
        disclosed = 0
        for c in counties:
            row = qcew["qcew"].get(f"{c}|{naics}|{y_cur}")
            if not row or row["employment"] == 0:
                continue
            disclosed += 1
            emp += row["employment"]
            est += row["establishments"]
            wage_weighted += row["avg_weekly_wage"] * row["employment"]
        if emp == 0:
            return None
        return {"employment": emp, "establishments": est,
                "avg_weekly_wage": round(wage_weighted / emp),
                "counties_disclosed": disclosed, "counties_total": len(counties)}

    count = 0
    for st, metros in selection.items():
        st_dir = os.path.join(OUT_ROOT, st.lower())
        os.makedirs(st_dir, exist_ok=True)
        st_fips = FIPS_BY_ABBR[st]
        state_name = NAME_BY_ABBR[st]
        for m in metros:
            cbsa, name = m["cbsa"], m["name"]
            city = city_of(name)
            slug = slugify(city)
            supply = {r: nppes["active"].get(f"{st}|{cbsa}|{r}", 0) for r in ROLES}
            inflow = {}
            for r in ROLES:
                series = {mo: nppes["new_by_month"].get(f"{st}|{cbsa}|{r}|{mo}", 0) for mo in TRAILING_12}
                inflow[r] = {"trailing_12mo_total": sum(series.values()), "by_month": series}
            oews_cbsa = OEWS_CBSA_ALIAS.get(cbsa, cbsa)
            comp = {r: oews["data"][f"{oews_cbsa}|{r}"] for r in ROLES if f"{oews_cbsa}|{r}" in oews["data"]}
            oews_area = oews["titles"].get(oews_cbsa, name)
            counties = sorted(c for c in members.get(cbsa, ()) if c.startswith(st_fips))
            facilities = cms["metro"].get(f"{st}|{cbsa}") or {
                "nursing_homes": {"count": 0, "certified_beds": 0, "avg_overall_rating": None, "for_profit_pct": None},
                "home_health_agencies": {"count": 0, "avg_quality_star": None, "for_profit_pct": None,
                                         "offers_pt_pct": None, "offers_ot_pct": None, "offers_slp_pct": None}}

            path = os.path.join(st_dir, f"{slug}.json")
            snapshot = {
                "metro": name,
                "city": city,
                "city_slug": slug,
                "cbsa": cbsa,
                "state_abbr": st,
                "state": state_name,
                "desk": "therapy",
                "snapshot_date": SNAPSHOT_DATE,
                "fixture": False,
                "supply": {
                    "source": NPPES_LABEL,
                    "note": "Individual (Type 1) providers by primary taxonomy code, practice-address ZIP mapped to county and CBSA; deactivated NPIs excluded.",
                    "scope": f"{state_name} side of the {city} metro area",
                    "active_individual_providers": supply,
                },
                "new_provider_inflow": {
                    "source": NPPES_INFLOW_LABEL,
                    "note": "Newly enumerated NPIs by month (trailing 12 full months); same state-side metro slice as supply.",
                    "trailing_12_months": inflow,
                },
            }
            if comp:
                snapshot["compensation"] = {"source": f"BLS OEWS, {oews['period']}, metropolitan area",
                                            "scope": f"whole {oews_area} metropolitan area", **comp}
            snapshot["sector_employment"] = {
                "source": f"BLS QCEW county files, private ownership, Q{qcew['quarter']} {y_cur}",
                "scope": f"{state_name}-side counties of the metro with disclosed data; wages employment-weighted",
                **{key: county_sum(counties, naics) for key, naics in QCEW},
            }
            snapshot["facilities"] = {
                "source": f"CMS Provider Data Catalog (nursing homes 4pq5-n9py, home health 6jpm-sxkc), pulled {CMS_PULL_DATE}",
                "scope": f"{state_name} side of the metro (facility ZIP mapped to CBSA)",
                **facilities,
            }
            snapshot["narrative_extra"] = carry_forward(path)
            json.dump(snapshot, open(path, "w", encoding="utf-8"), indent=2)
            count += 1
    print(f"wrote {count} metro snapshots -> {OUT_ROOT}")

if __name__ == "__main__":
    main(sys.argv[1])
