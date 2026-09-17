"""Select top metros per state from NPPES counts, then fetch QCEW for them.

Selection: metropolitan CBSAs only (micro excluded), ranked by total
physician+NP+PA count within the state's side of the metro, floor 300
providers, max 5 per state. Writes cache/metro-selection.json.

QCEW: statewide-equivalent MSA area code = "C" + first 4 digits of the CBSA
code (e.g. St. Louis 41180 -> C4118). NAICS 621/622/5411, private ownership,
Q4 pair for YoY. Writes cache/qcew-metro.json.

Run after parse_nppes_metro.py.
"""
import csv, io, json, os, time, urllib.request

HERE = os.path.dirname(os.path.abspath(__file__))
CACHE = os.path.join(HERE, "cache")

QCEW_YEARS = ("2025", "2024")
NAICS = ("621", "622", "5411")
FLOOR = 300
MAX_PER_STATE = 5

def select():
    data = json.load(open(os.path.join(CACHE, "nppes-metro.json"), encoding="utf-8"))
    meta = data["cbsa_meta"]
    totals = {}  # (state, cbsa) -> total providers
    for key, n in data["active"].items():
        st, cbsa, _role = key.split("|")
        totals[(st, cbsa)] = totals.get((st, cbsa), 0) + n
    by_state = {}
    for (st, cbsa), n in totals.items():
        if meta.get(cbsa, {}).get("type") != "metro" or n < FLOOR:
            continue
        by_state.setdefault(st, []).append((n, cbsa))
    selection = {}
    for st, lst in sorted(by_state.items()):
        lst.sort(reverse=True)
        selection[st] = [
            {"cbsa": cbsa, "name": meta[cbsa]["name"], "providers_state_side": n}
            for n, cbsa in lst[:MAX_PER_STATE]
        ]
    path = os.path.join(CACHE, "metro-selection.json")
    json.dump(selection, open(path, "w", encoding="utf-8"), indent=1)
    n_metros = len({m["cbsa"] for lst in selection.values() for m in lst})
    print(f"selected {sum(len(v) for v in selection.values())} state-metro pages, {n_metros} unique CBSAs")
    return selection

def fetch_qcew(selection):
    cbsas = sorted({m["cbsa"] for lst in selection.values() for m in lst})
    out = {}
    for i, cbsa in enumerate(cbsas, 1):
        area = "C" + cbsa[:4]
        for year in QCEW_YEARS:
            url = f"https://data.bls.gov/cew/data/api/{year}/4/area/{area}.csv"
            try:
                with urllib.request.urlopen(url, timeout=60) as r:
                    text = r.read().decode("utf-8-sig", errors="replace")
            except Exception as e:
                print(f"  QCEW {area} {year}: FAIL {e}", flush=True)
                continue
            for row in csv.DictReader(io.StringIO(text)):
                if row["industry_code"] in NAICS and row["own_code"] == "5":
                    out[f"{cbsa}|{row['industry_code']}|{year}"] = {
                        "employment": int(row["month3_emplvl"]),
                        "establishments": int(row["qtrly_estabs"]),
                        "avg_weekly_wage": int(row["avg_wkly_wage"]),
                    }
            time.sleep(1.2)
        if i % 20 == 0:
            print(f"  {i}/{len(cbsas)} metros fetched", flush=True)
    path = os.path.join(CACHE, "qcew-metro.json")
    json.dump({"qcew": out, "period": f"Q4 {QCEW_YEARS[1]} vs Q4 {QCEW_YEARS[0]}"},
              open(path, "w", encoding="utf-8"))
    print(f"done -> {path} ({len(out)} keys)")

if __name__ == "__main__":
    fetch_qcew(select())
