"""Aggregate CMS nursing-home and home-health facility files by state and (state, CBSA).

Usage: python fetch_cms.py <cms-nursing-homes.csv> <cms-home-health.csv> <geonames-US.txt> <county-cbsa.csv>

Inputs are the CMS Provider Data Catalog CSV exports (nursing homes 4pq5-n9py,
home health 6jpm-sxkc). Facility ZIP -> county FIPS (GeoNames) -> CBSA (crosswalk).

Definitions (contract: docs/DATA_CONTRACT.md):
  nursing_homes.for_profit_pct       share of homes whose Ownership Type starts "For profit"
  nursing_homes.avg_overall_rating   mean Overall Rating over rated homes only
  home_health.for_profit_pct         share of agencies with Type of Ownership PROPRIETARY,
                                     over agencies that REPORT an ownership ('-' excluded)
  home_health.offers_*_pct           share answering Yes, over agencies answering Yes/No
  home_health.avg_quality_star       mean star over rated agencies; null when none rated
Output: cache/cms.json  {"state": {"TX": {...}}, "metro": {"TX|26420": {...}}}
"""
import csv, json, os, sys
from collections import defaultdict

HERE = os.path.dirname(os.path.abspath(__file__))
CACHE = os.path.join(HERE, "cache")
os.makedirs(CACHE, exist_ok=True)

from states import STATES, BY_ABBR  # noqa: E402
from parse_nppes_metro import load_zip_to_cbsa  # noqa: E402

def pct(num, den):
    return round(num / den * 100, 1) if den else None

def avg(vals, nd=2):
    return round(sum(vals) / len(vals), nd) if vals else None

def to_float(s):
    try:
        return float(s)
    except (TypeError, ValueError):
        return None

class NH:
    def __init__(self):
        self.count = 0; self.beds = 0; self.for_profit = 0; self.ratings = []
    def add(self, row):
        self.count += 1
        self.beds += int(to_float(row["Number of Certified Beds"]) or 0)
        if row["Ownership Type"].lower().startswith("for profit"):
            self.for_profit += 1
        r = to_float(row["Overall Rating"])
        if r is not None:
            self.ratings.append(r)
    def out(self):
        return {"count": self.count, "certified_beds": self.beds,
                "avg_overall_rating": avg(self.ratings), "for_profit_pct": pct(self.for_profit, self.count)}

class HH:
    SVC = {"pt": "Offers Physical Therapy Services", "ot": "Offers Occupational Therapy Services",
           "slp": "Offers Speech Pathology Services"}
    def __init__(self):
        self.count = 0; self.own_known = 0; self.for_profit = 0; self.stars = []
        self.svc_yes = defaultdict(int); self.svc_known = defaultdict(int)
    def add(self, row):
        self.count += 1
        own = row["Type of Ownership"].strip().upper()
        if own and own != "-":
            self.own_known += 1
            if own == "PROPRIETARY":
                self.for_profit += 1
        for k, col in self.SVC.items():
            v = row[col].strip().lower()
            if v in ("yes", "no"):
                self.svc_known[k] += 1
                if v == "yes":
                    self.svc_yes[k] += 1
        s = to_float(row["Quality of patient care star rating"])
        if s is not None:
            self.stars.append(s)
    def out(self):
        return {"count": self.count, "avg_quality_star": avg(self.stars),
                "for_profit_pct": pct(self.for_profit, self.own_known),
                "offers_pt_pct": pct(self.svc_yes["pt"], self.svc_known["pt"]),
                "offers_ot_pct": pct(self.svc_yes["ot"], self.svc_known["ot"]),
                "offers_slp_pct": pct(self.svc_yes["slp"], self.svc_known["slp"])}

def main(nh_path, hh_path, geonames, crosswalk):
    zip_to_cbsa, cbsa_meta = load_zip_to_cbsa(geonames, crosswalk)
    st_nh, st_hh = defaultdict(NH), defaultdict(HH)
    me_nh, me_hh = defaultdict(NH), defaultdict(HH)
    unmapped = {"nh": 0, "hh": 0}
    for path, cls, st_agg, me_agg, tag in ((nh_path, NH, st_nh, me_nh, "nh"), (hh_path, HH, st_hh, me_hh, "hh")):
        with open(path, encoding="utf-8-sig", newline="") as f:
            for row in csv.DictReader(f):
                st = row["State"].strip()
                if st not in BY_ABBR:
                    continue
                st_agg[st].add(row)
                cbsa = zip_to_cbsa.get(row["ZIP Code"].strip()[:5].zfill(5))
                if cbsa:
                    me_agg[f"{st}|{cbsa}"].add(row)
                else:
                    unmapped[tag] += 1
    out = {
        "source": "CMS Provider Data Catalog (nursing homes 4pq5-n9py, home health 6jpm-sxkc)",
        "state": {abbr: {"nursing_homes": st_nh[abbr].out(), "home_health_agencies": st_hh[abbr].out()}
                  for _, abbr, _ in STATES},
        "metro": {k: {"nursing_homes": me_nh[k].out() if k in me_nh else NH().out(),
                      "home_health_agencies": me_hh[k].out() if k in me_hh else HH().out()}
                  for k in sorted(set(me_nh) | set(me_hh))},
        "unmapped_zip": unmapped,
    }
    p = os.path.join(CACHE, "cms.json")
    json.dump(out, open(p, "w", encoding="utf-8"), indent=1)
    tot_nh = sum(v.count for v in st_nh.values()); tot_hh = sum(v.count for v in st_hh.values())
    print(f"done -> {p}: nursing homes {tot_nh}, home health {tot_hh}, metro keys {len(out['metro'])}, unmapped {unmapped}")

if __name__ == "__main__":
    main(*sys.argv[1:5])
