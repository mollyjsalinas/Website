"""Fetch QCEW county files for the state-side member counties of selected metros.

MSA-level QCEW area files mark ALL employment/wages disclosure='N' (learned
2026-07-08; only establishment counts publish there). County files disclose
employment for most urban counties, so metro employment = sum of state-side
member counties, disclosure-aware.

Usage: python fetch_qcew_county.py <county-cbsa.csv>
Reads cache/metro-selection.json (select_metros.py) and cache/bls.json (for the
quarter fetch_bls.py settled on; defaults to Q4). Checkpoints every 50 counties
to cache/qcew-county-ckpt.json and resumes from it on restart.
Writes cache/qcew-county.json. ~800 counties x 2 years, 1 s sleep: ~30 min,
run it detached.
"""
import csv, io, json, os, sys, time, urllib.request

HERE = os.path.dirname(os.path.abspath(__file__))
CACHE = os.path.join(HERE, "cache")

from states import STATES  # noqa: E402
from parse_nppes_metro import cbsa_counties  # noqa: E402
FIPS_BY_ABBR = {abbr: fips for fips, abbr, _ in STATES}

QCEW_YEARS = ("2025", "2024")
NAICS = ("62134", "6216", "6231", "6221")
CKPT_EVERY = 50

def quarter():
    p = os.path.join(CACHE, "bls.json")
    if os.path.exists(p):
        return json.load(open(p, encoding="utf-8")).get("qcew_quarter", "4")
    return "4"

def main(crosswalk_path):
    q = quarter()
    selection = json.load(open(os.path.join(CACHE, "metro-selection.json"), encoding="utf-8"))
    members = cbsa_counties(crosswalk_path)

    needed = set()
    for st, metros in selection.items():
        pref = FIPS_BY_ABBR[st]
        for m in metros:
            needed.update(c for c in members.get(m["cbsa"], ()) if c.startswith(pref))
    counties = sorted(needed)
    print(f"fetching {len(counties)} counties x {len(QCEW_YEARS)} years, Q{q}", flush=True)

    # Resume: from the mid-run checkpoint, else from a finished output (so a
    # re-run after the selection grows only fetches the new counties).
    ckpt_path = os.path.join(CACHE, "qcew-county-ckpt.json")
    path = os.path.join(CACHE, "qcew-county.json")
    out = {}
    suppressed = []
    done_counties = set()
    fails = 0
    prior = None
    if os.path.exists(ckpt_path):
        prior = json.load(open(ckpt_path, encoding="utf-8"))
    elif os.path.exists(path):
        prior = json.load(open(path, encoding="utf-8"))
        prior["out"] = prior["qcew"]
        if "done" not in prior:  # older output without a done list: derive it
            prior["done"] = sorted({k.split("|")[0] for k in list(prior["qcew"]) + prior.get("suppressed", [])})
    if prior and prior.get("quarter", q) == q:
        out = prior["out"]
        suppressed = prior.get("suppressed", [])
        done_counties = set(prior["done"])
        fails = prior.get("fails", prior.get("fetch_failures", 0))
        print(f"resuming: {len(done_counties)} counties already fetched", flush=True)

    def checkpoint():
        json.dump({"out": out, "done": sorted(done_counties), "suppressed": suppressed, "fails": fails},
                  open(ckpt_path, "w", encoding="utf-8"))

    for i, fips in enumerate(counties, 1):
        if fips in done_counties:
            continue
        for year in QCEW_YEARS:
            url = f"https://data.bls.gov/cew/data/api/{year}/{q}/area/{fips}.csv"
            try:
                with urllib.request.urlopen(url, timeout=60) as r:
                    text = r.read().decode("utf-8-sig", errors="replace")
            except Exception as e:
                fails += 1
                print(f"  FAIL {fips} {year}: {e}", flush=True)
                continue
            for row in csv.DictReader(io.StringIO(text)):
                if row["industry_code"] in NAICS and row["own_code"] == "5":
                    if row["disclosure_code"] == "N":
                        suppressed.append(f"{fips}|{row['industry_code']}|{year}")
                        continue  # suppressed county-industry; sum what's disclosed
                    out[f"{fips}|{row['industry_code']}|{year}"] = {
                        "employment": int(row["month3_emplvl"]),
                        "establishments": int(row["qtrly_estabs"]),
                        "avg_weekly_wage": int(row["avg_wkly_wage"]),
                    }
            time.sleep(1.0)
        done_counties.add(fips)
        if i % CKPT_EVERY == 0:
            checkpoint()
            print(f"  {i}/{len(counties)} counties (checkpointed)", flush=True)
    json.dump({"qcew": out, "period": f"Q{q} {QCEW_YEARS[1]} vs Q{q} {QCEW_YEARS[0]}",
               "quarter": q, "years": list(QCEW_YEARS), "counties": len(counties),
               "done": sorted(done_counties), "fetch_failures": fails, "suppressed": suppressed},
              open(path, "w", encoding="utf-8"))
    if os.path.exists(ckpt_path):
        os.remove(ckpt_path)
    print(f"done -> qcew-county.json ({len(out)} keys, {len(suppressed)} suppressed, {fails} fetch failures)", flush=True)

if __name__ == "__main__":
    main(sys.argv[1])
