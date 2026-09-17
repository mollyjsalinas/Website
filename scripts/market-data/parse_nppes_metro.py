"""One-pass NPPES parse aggregated to metro (CBSA) level, therapy roles.

Usage: python parse_nppes_metro.py <nppes-zip> <geonames-US.txt> <county-cbsa.csv>

zip5 -> county FIPS (GeoNames postal file) -> CBSA (county crosswalk).
Aggregates (state, cbsa, role): active provider counts + new enumerations by
month since 2024. Same filters as parse_nppes.py (Type 1, in-state practice
address, not deactivated-without-reactivation, EXACT taxonomy code).
Output: cache/nppes-metro.json
"""
import csv, io, json, os, sys, zipfile
from collections import Counter
from datetime import datetime

HERE = os.path.dirname(os.path.abspath(__file__))
CACHE = os.path.join(HERE, "cache")
os.makedirs(CACHE, exist_ok=True)

from states import STATES, BY_ABBR  # noqa: E402
from parse_nppes import ROLES, classify  # noqa: E402

FIPS_BY_ABBR = {abbr: fips for fips, abbr, _ in STATES}

# Connecticut replaced its counties with 9 planning regions (Census 2022, OMB
# Bulletin 23-01). GeoNames and the QCEW county API both use the planning-region
# FIPS (09110-09190); the county-cbsa crosswalk still carries the legacy county
# FIPS (09001-09015), so CT is bridged by hand. CBSA codes are unchanged.
CT_REGION_CBSA = {
    "09110": "25540",  # Capitol Region                -> Hartford-East Hartford-Middletown
    "09120": "14860",  # Greater Bridgeport ("Connecticut Metropolitan") -> Bridgeport-Stamford-Norwalk
    "09130": "25540",  # Lower Connecticut River Valley -> Hartford
    "09140": "35300",  # Naugatuck Valley               -> New Haven
    "09150": "49340",  # Northeastern Connecticut       -> Worcester, MA-CT
    "09160": "45860",  # Northwest Hills                -> Torrington (micro)
    "09170": "35300",  # South Central Connecticut      -> New Haven
    "09180": "35980",  # Southeastern Connecticut       -> Norwich-New London
    "09190": "14860",  # Western Connecticut            -> Bridgeport-Stamford-Norwalk
}

def cbsa_counties(crosswalk_path):
    """cbsa -> set of county-equivalent FIPS as the QCEW county API keys them
    (Connecticut: planning regions instead of the crosswalk's legacy counties)."""
    out = {}
    with open(crosswalk_path, encoding="utf-8-sig", newline="") as f:
        for row in csv.DictReader(f):
            if row["cbsa_fips"] and row["cbsa_fips"] != "NA" and not row["state_county_fips"].startswith("09"):
                out.setdefault(row["cbsa_fips"], set()).add(row["state_county_fips"])
    for region, cbsa in CT_REGION_CBSA.items():
        out.setdefault(cbsa, set()).add(region)
    return out

def load_zip_to_cbsa(geonames_path, crosswalk_path):
    county_to_cbsa = dict(CT_REGION_CBSA)
    cbsa_meta = {}
    with open(crosswalk_path, encoding="utf-8-sig", newline="") as f:
        for row in csv.DictReader(f):
            if row["cbsa_fips"] and row["cbsa_fips"] != "NA":
                county_to_cbsa[row["state_county_fips"]] = row["cbsa_fips"]
                cbsa_meta[row["cbsa_fips"]] = {
                    "name": row["cbsa_name_long"],
                    "type": row["metro_micro_sa"],
                }
    zip_to_cbsa = {}
    with open(geonames_path, encoding="utf-8") as f:
        for line in f:
            p = line.rstrip("\n").split("\t")
            if len(p) < 7:
                continue
            zip5, abbr, county3 = p[1], p[4], p[6]
            fips2 = FIPS_BY_ABBR.get(abbr)
            if not fips2 or not county3:
                continue
            cbsa = county_to_cbsa.get(fips2 + county3)
            if cbsa:
                zip_to_cbsa[zip5] = cbsa
    return zip_to_cbsa, cbsa_meta

def main(zip_path, geonames_path, crosswalk_path):
    zip_to_cbsa, cbsa_meta = load_zip_to_cbsa(geonames_path, crosswalk_path)
    print(f"zip->cbsa entries: {len(zip_to_cbsa)}, cbsas: {len(cbsa_meta)}", flush=True)

    zf = zipfile.ZipFile(zip_path)
    main_csv = max(
        (n for n in zf.namelist()
         if n.lower().startswith("npidata_pfile") and n.endswith(".csv")
         and "fileheader" not in n.lower()),
        key=lambda n: zf.getinfo(n).file_size)
    print("parsing", main_csv, flush=True)

    active = Counter()        # (state, cbsa, role)
    new_by_month = Counter()  # (state, cbsa, role, YYYY-MM)
    unmapped = Counter()      # (state, role) with a zip the crosswalk cannot place
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
                cbsa = zip_to_cbsa.get(row[ZIP][:5])
                if not cbsa:
                    unmapped[(st, role)] += 1
                    continue
                active[(st, cbsa, role)] += 1
                ed = row[ENUM]
                if ed:
                    dt = datetime.strptime(ed, "%m/%d/%Y")
                    if dt.year >= 2024:
                        new_by_month[(st, cbsa, role, dt.strftime("%Y-%m"))] += 1
            except IndexError:
                continue

    out = {
        "source_file": main_csv,
        "roles": ROLES,
        "cbsa_meta": cbsa_meta,
        "active": {f"{st}|{c}|{r}": n for (st, c, r), n in sorted(active.items())},
        "new_by_month": {f"{st}|{c}|{r}|{m}": n for (st, c, r, m), n in sorted(new_by_month.items())},
        "unmapped_zip": {f"{st}|{r}": n for (st, r), n in sorted(unmapped.items())},
        "rows_scanned": rows,
    }
    path = os.path.join(CACHE, "nppes-metro.json")
    json.dump(out, open(path, "w", encoding="utf-8"))
    print("done ->", path, flush=True)

if __name__ == "__main__":
    main(sys.argv[1], sys.argv[2], sys.argv[3])
