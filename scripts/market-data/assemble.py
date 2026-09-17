"""Assemble per-state therapy market snapshots from the pipeline caches.

Usage: python assemble.py <NST-EST2025-ALLDATA.csv>

Reads cache/{nppes,bls,oews,cms,compacts}.json and writes
data/markets/<st>-therapy.json for all 51 jurisdictions (50 states + DC),
EXACTLY in the shape of docs/DATA_CONTRACT.md. Overwrites fixtures. Carries
`narrative_extra` forward when the existing file has a non-null value.

Run after: parse_nppes.py, fetch_bls.py, parse_oews.py, fetch_cms.py, compacts.py
"""
import csv, json, os, re, sys
from datetime import datetime

HERE = os.path.dirname(os.path.abspath(__file__))
CACHE = os.path.join(HERE, "cache")
OUT_DIR = os.path.normpath(os.path.join(HERE, "..", "..", "data", "markets"))
os.makedirs(OUT_DIR, exist_ok=True)

from states import STATES  # noqa: E402

# Snapshot date: the SNAPSHOT_DATE env var when set (the monthly refresh
# workflow stamps its run date), else this constant. Never date.today(): a
# by-hand rerun must not silently move lastmod on every page.
SNAPSHOT_DATE_DEFAULT = "2026-09-02"
SNAPSHOT_DATE = os.environ.get("SNAPSHOT_DATE") or SNAPSHOT_DATE_DEFAULT
if not re.fullmatch(r"\d{4}-\d{2}-\d{2}", SNAPSHOT_DATE):
    raise SystemExit(f"SNAPSHOT_DATE must be YYYY-MM-DD, got {SNAPSHOT_DATE!r}")

def nppes_period(source_file):
    """(month label, trailing 12 full months) from the NPPES main CSV name,
    e.g. npidata_pfile_20050523-20260809.csv -> ("August 2026", 2025-08..2026-07).
    The file month is partial, so the window ends the month before it."""
    m = re.search(r"(\d{8})-(\d{8})\.csv$", source_file or "")
    if not m:
        return None, None
    end = datetime.strptime(m.group(2), "%Y%m%d")
    months = []
    for back in range(12, 0, -1):
        y, mo = end.year, end.month - back
        while mo <= 0:
            y, mo = y - 1, mo + 12
        months.append(f"{y}-{mo:02d}")
    return end.strftime("%B %Y"), months

# NPPES month and inflow window are derived from the cached parse so a refresh
# cannot stamp a new file with last month's window; the constants are the
# fallback when the cache is absent (template work) or its name is unexpected.
NPPES_MONTH = "August 2026"           # month of the NPPES dissemination file
TRAILING_12 = [f"2025-{m:02d}" for m in range(8, 13)] + [f"2026-{m:02d}" for m in range(1, 8)]
try:
    _month, _window = nppes_period(json.load(open(os.path.join(CACHE, "nppes.json"), encoding="utf-8")).get("source_file"))
    if _month:
        NPPES_MONTH, TRAILING_12 = _month, _window
except (OSError, ValueError):
    pass
NPPES_LABEL = f"NPPES monthly file, {NPPES_MONTH} (CMS, public domain)"
NPPES_INFLOW_LABEL = f"NPPES provider enumeration dates, {NPPES_MONTH} file"
# CMS facility files are pulled by the same refresh run; default to its stamp.
CMS_PULL_DATE = os.environ.get("CMS_PULL_DATE") or SNAPSHOT_DATE

ROLES = ["pt", "pta", "ot", "ota", "slp", "aud"]
PER_100K_ROLES = ["pt", "ot", "slp", "aud"]
QCEW = [("therapy_offices_naics_62134", "62134"), ("home_health_naics_6216", "6216"),
        ("nursing_facilities_naics_6231", "6231"), ("hospitals_naics_6221", "6221")]

def load(name):
    return json.load(open(os.path.join(CACHE, name), encoding="utf-8"))

def load_population(path):
    pop = {}
    with open(path, encoding="utf-8-sig", newline="") as f:
        for row in csv.DictReader(f):
            if row["SUMLEV"] == "040":
                pop[row["STATE"].zfill(2)] = int(row["POPESTIMATE2025"])
    return pop

def yoy(cur, prev):
    return round((cur - prev) / prev * 100, 2) if prev else None

def qcew_block(bls, abbr, naics):
    """Statewide block; null when missing or suppressed, YoY keys ABSENT when prior missing."""
    y_cur, y_prev = bls["qcew_years"]
    cur = bls["qcew"].get(f"{abbr}|{naics}|{y_cur}")
    prev = bls["qcew"].get(f"{abbr}|{naics}|{y_prev}")
    if not cur or cur.get("disclosure") == "N":
        return None
    block = {"employment": cur["employment"], "establishments": cur["establishments"],
             "avg_weekly_wage": cur["avg_weekly_wage"]}
    if prev and prev.get("disclosure") != "N":
        for k in ("employment", "establishments", "avg_weekly_wage"):
            v = yoy(cur[k], prev[k])
            if v is not None:
                block[f"{k}_yoy_pct"] = v
    return block

def carry_forward(path):
    if os.path.exists(path):
        try:
            old = json.load(open(path, encoding="utf-8"))
            if old.get("fixture") is not True and old.get("narrative_extra") is not None:
                return old["narrative_extra"]
        except (ValueError, OSError):
            pass
    return None

def main(pop_path):
    nppes, bls, oews, cms, compacts = (load("nppes.json"), load("bls.json"), load("oews.json"),
                                       load("cms.json"), load("compacts.json"))
    population = load_population(pop_path)
    national = {r: oews["data"][f"US|{r}"] for r in ROLES if f"US|{r}" in oews["data"]}

    count = 0
    for fips, abbr, name in STATES:
        pop = population[fips]
        supply = {r: nppes["active"].get(f"{abbr}|{r}", 0) for r in ROLES}
        per_100k = {r: round(supply[r] / pop * 100000, 1) for r in PER_100K_ROLES}
        inflow = {}
        for r in ROLES:
            series = {m: nppes["new_by_month"].get(f"{abbr}|{r}|{m}", 0) for m in TRAILING_12}
            inflow[r] = {"trailing_12mo_total": sum(series.values()), "by_month": series}
        comp = {r: oews["data"][f"{abbr}|{r}"] for r in ROLES if f"{abbr}|{r}" in oews["data"]}

        path = os.path.join(OUT_DIR, f"{abbr.lower()}-therapy.json")
        snapshot = {
            "market": name,
            "market_abbr": abbr,
            "desk": "therapy",
            "snapshot_date": SNAPSHOT_DATE,
            "fixture": False,
            "population": {"source": "Census Vintage 2025 state estimates", "total": pop},
            "supply": {
                "source": NPPES_LABEL,
                "note": "Individual (Type 1) providers with an in-state practice address, by primary taxonomy code; deactivated NPIs excluded.",
                "active_individual_providers": supply,
                "per_100k": per_100k,
            },
            "new_provider_inflow": {
                "source": NPPES_INFLOW_LABEL,
                "note": "Newly enumerated NPIs by month (trailing 12 full months); a leading indicator of workforce entry, not total hiring.",
                "trailing_12_months": inflow,
            },
            "compensation": {"source": f"BLS OEWS, {oews['period']}", **comp, "national": national},
            "sector_employment": {
                "source": f"BLS QCEW, statewide, private ownership, {bls['qcew_period']}",
                **{key: qcew_block(bls, abbr, naics) for key, naics in QCEW},
            },
            "facilities": {
                "source": f"CMS Provider Data Catalog (nursing homes 4pq5-n9py, home health 6jpm-sxkc), pulled {CMS_PULL_DATE}",
                **cms["state"][abbr],
            },
            "compacts": {"source": compacts["source"], **compacts["states"][abbr]},
            "narrative_extra": carry_forward(path),
        }
        json.dump(snapshot, open(path, "w", encoding="utf-8"), indent=2)
        count += 1
    print(f"wrote {count} state snapshots -> {OUT_DIR} (snapshot_date {SNAPSHOT_DATE}, NPPES {NPPES_MONTH}, window {TRAILING_12[0]}..{TRAILING_12[-1]})")

if __name__ == "__main__":
    main(sys.argv[1])
