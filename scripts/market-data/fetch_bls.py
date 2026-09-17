"""Fetch QCEW statewide employment for the therapy-relevant industries, all states.

QCEW open CSV API (the ONLY bls.gov endpoint reachable from a script on this
machine; page/flat-file fetches are blocked, so never add them here):
  https://data.bls.gov/cew/data/api/{year}/{qtr}/area/{fips}000.csv

Industries (private ownership, own_code 5):
  62134 offices of PT/OT/SLP/audiologists, 6216 home health, 6231 nursing
  facilities, 6221 general hospitals. Q4 pair for YoY. If the API has no
  file yet for the current year's Q4, falls back to the latest quarter that
  exists in both years and records it in qcew_period.

~102 requests with a 1.2 s sleep (about 3 minutes). Run in the background.
Output: cache/bls.json  {"qcew": {"ST|naics|year": {...}}, "qcew_period": "..."}
"""
import csv, io, json, os, time, urllib.request

HERE = os.path.dirname(os.path.abspath(__file__))
CACHE = os.path.join(HERE, "cache")
os.makedirs(CACHE, exist_ok=True)

from states import STATES  # noqa: E402

QCEW_YEARS = ("2025", "2024")  # current, prior
NAICS = ("62134", "6216", "6231", "6221")

def get(url):
    with urllib.request.urlopen(url, timeout=60) as r:
        return r.read().decode("utf-8-sig", errors="replace")

def pick_quarter():
    """Latest quarter present for the current year (probe with Missouri)."""
    for q in ("4", "3", "2", "1"):
        try:
            get(f"https://data.bls.gov/cew/data/api/{QCEW_YEARS[0]}/{q}/area/29000.csv")
            return q
        except Exception as e:
            print(f"  probe {QCEW_YEARS[0]} Q{q}: {e}", flush=True)
    raise SystemExit("no QCEW quarter available for " + QCEW_YEARS[0])

def fetch_qcew(quarter):
    out = {}
    suppressed = []
    for fips, abbr, _name in STATES:
        for year in QCEW_YEARS:
            url = f"https://data.bls.gov/cew/data/api/{year}/{quarter}/area/{fips}000.csv"
            try:
                text = get(url)
            except Exception as e:
                print(f"  QCEW {abbr} {year}: FAIL {e}", flush=True)
                continue
            for row in csv.DictReader(io.StringIO(text)):
                if row["industry_code"] in NAICS and row["own_code"] == "5":
                    rec = {
                        "employment": int(row["month3_emplvl"]),
                        "establishments": int(row["qtrly_estabs"]),
                        "avg_weekly_wage": int(row["avg_wkly_wage"]),
                        "disclosure": row.get("disclosure_code", ""),
                    }
                    if rec["disclosure"] == "N":
                        suppressed.append(f"{abbr}|{row['industry_code']}|{year}")
                    out[f"{abbr}|{row['industry_code']}|{year}"] = rec
            time.sleep(1.2)
        print(f"  QCEW {abbr} done", flush=True)
    return out, suppressed

def main():
    quarter = pick_quarter()
    print(f"using Q{quarter} {QCEW_YEARS[1]} vs Q{quarter} {QCEW_YEARS[0]}", flush=True)
    qcew, suppressed = fetch_qcew(quarter)
    result = {
        "qcew": qcew,
        "qcew_period": f"Q{quarter} {QCEW_YEARS[1]} vs Q{quarter} {QCEW_YEARS[0]}",
        "qcew_quarter": quarter,
        "qcew_years": list(QCEW_YEARS),
        "suppressed": suppressed,
    }
    path = os.path.join(CACHE, "bls.json")
    json.dump(result, open(path, "w", encoding="utf-8"), indent=1)
    print("done ->", path, f"qcew keys={len(qcew)} suppressed={len(suppressed)}", flush=True)

if __name__ == "__main__":
    main()
