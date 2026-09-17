"""One-pass NPPES parse: per-state therapy provider supply + enrollment inflow.

Usage: python parse_nppes.py <path-to-NPPES-monthly-zip>

Streams the ~11 GB main CSV inside the zip (no extraction, ~10-12 min).
Individual (Type 1) providers classified by EXACT primary taxonomy code
(see ROLES). Filters: in-state practice address (50 states + DC), skip NPIs
deactivated without a later reactivation. Captures ZIP3 counts per state and
enumerations by month since 2024-01. Output: cache/nppes.json
"""
import csv, io, json, os, sys, zipfile
from collections import Counter
from datetime import datetime

HERE = os.path.dirname(os.path.abspath(__file__))
CACHE = os.path.join(HERE, "cache")
os.makedirs(CACHE, exist_ok=True)

from states import BY_ABBR  # noqa: E402

# Exact taxonomy code -> role key (contract: docs/DATA_CONTRACT.md).
ROLES = {
    "225100000X": "pt",   # Physical therapist
    "225200000X": "pta",  # Physical therapist assistant
    "225X00000X": "ot",   # Occupational therapist
    "224Z00000X": "ota",  # Occupational therapy assistant
    "235Z00000X": "slp",  # Speech-language pathologist
    "231H00000X": "aud",  # Audiologist
}
ROLE_KEYS = ["pt", "pta", "ot", "ota", "slp", "aud"]

def classify(tax):
    return ROLES.get(tax)

def main(zip_path):
    zf = zipfile.ZipFile(zip_path)
    main_csv = max(
        (n for n in zf.namelist()
         if n.lower().startswith("npidata_pfile") and n.endswith(".csv")
         and "fileheader" not in n.lower()),
        key=lambda n: zf.getinfo(n).file_size)
    file_label = main_csv  # carries the date range in its name
    print("parsing", main_csv, zf.getinfo(main_csv).file_size // (1024 * 1024), "MB", flush=True)

    active = Counter()        # (state, role)
    new_by_month = Counter()  # (state, role, YYYY-MM), enumerations since 2024-01
    zip3 = Counter()          # (state, role, zip3)
    rows = 0

    with zf.open(main_csv) as raw:
        reader = csv.reader(io.TextIOWrapper(raw, encoding="utf-8", errors="replace"))
        header = next(reader)
        ix = {name: i for i, name in enumerate(header)}
        STATE = ix["Provider Business Practice Location Address State Name"]
        ZIP = ix["Provider Business Practice Location Address Postal Code"]
        ENTITY = ix["Entity Type Code"]
        TAX1 = ix["Healthcare Provider Taxonomy Code_1"]
        ENUM = ix["Provider Enumeration Date"]
        DEACT = ix["NPI Deactivation Date"]
        REACT = ix["NPI Reactivation Date"]
        for row in reader:
            rows += 1
            if rows % 2000000 == 0:
                print(f"  {rows} rows...", flush=True)
            try:
                st = row[STATE]
                if st not in BY_ABBR or row[ENTITY] != "1":
                    continue
                role = classify(row[TAX1])
                if role is None:
                    continue
                if row[DEACT] and not row[REACT]:
                    continue
                active[(st, role)] += 1
                z = row[ZIP][:3]
                if z.isdigit():
                    zip3[(st, role, z)] += 1
                ed = row[ENUM]
                if ed:
                    dt = datetime.strptime(ed, "%m/%d/%Y")
                    if dt.year >= 2024:
                        new_by_month[(st, role, dt.strftime("%Y-%m"))] += 1
            except IndexError:
                continue

    out = {
        "source_file": file_label,
        "roles": ROLES,
        "active": {f"{st}|{role}": n for (st, role), n in sorted(active.items())},
        "new_by_month": {f"{st}|{role}|{m}": n for (st, role, m), n in sorted(new_by_month.items())},
        "zip3": {f"{st}|{role}|{z}": n for (st, role, z), n in sorted(zip3.items())},
        "rows_scanned": rows,
    }
    path = os.path.join(CACHE, "nppes.json")
    json.dump(out, open(path, "w", encoding="utf-8"))
    print("done ->", path, flush=True)

if __name__ == "__main__":
    main(sys.argv[1])
