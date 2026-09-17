"""Hand-maintained interstate licensure compact table per state (pt / ot / aslp).

Usage: python compacts.py     -> cache/compacts.json

Values: "issuing" (the state issues compact privileges today), "member" (compact
legislation enacted, privileges not yet issued), "none" (not a member; introduced
or pending legislation still counts as none).

Verified CHECK_DATE against the live sites; re-verify before every snapshot:
  PT   https://ptcompact.org/compact-map/   ("38 Member States Actively Issuing";
       enacted-not-issuing ME MI RI; IL MA introduced only)
  OT   https://otcompact.gov/before-you-apply/  (8 accepting applications; the
       member list is the union of that page and AOTA's enacted list: 37 members)
  ASLP https://aslpcompact.com/  (37 jurisdictions = 36 states + USVI; issuing
       LA OH TN WV)
"""
import json, os

HERE = os.path.dirname(os.path.abspath(__file__))
CACHE = os.path.join(HERE, "cache")
os.makedirs(CACHE, exist_ok=True)

from states import STATES  # noqa: E402

CHECK_DATE = "2026-09-02"

PT_ISSUING = set("AL AK AZ AR CO CT DE DC GA IN IA KS KY LA MD MS MO MT NE NV NH NJ NC ND OH OK OR PA "
                 "SC SD TN TX UT VT VA WA WV WI".split())
PT_MEMBER = set("ME MI RI".split())

OT_ISSUING = set("IN MD MN OH TN VA WV WI".split())
OT_MEMBER = set("AL AK AZ AR CO DE GA IA KS KY LA ME MI MS MO MT NE NH NC ND OK PA RI SC SD UT VT WA WY".split())

ASLP_ISSUING = set("LA OH TN WV".split())
ASLP_MEMBER = set("AL AK AR AZ CO DE FL GA ID IN IA KS KY ME MD MN MS MO MT NE NV NH NC OK RI SC UT VT VA "
                  "WA WI WY".split())  # + US Virgin Islands (not a page)

def status(abbr, issuing, member):
    if abbr in issuing:
        return "issuing"
    if abbr in member:
        return "member"
    return "none"

def main():
    assert not (PT_ISSUING & PT_MEMBER) and not (OT_ISSUING & OT_MEMBER) and not (ASLP_ISSUING & ASLP_MEMBER)
    out = {
        "check_date": CHECK_DATE,
        "source": f"ptcompact.org, otcompact.gov, aslpcompact.com, checked {CHECK_DATE}",
        "counts": {
            "pt": {"issuing": len(PT_ISSUING), "member": len(PT_MEMBER)},
            "ot": {"issuing": len(OT_ISSUING), "member": len(OT_MEMBER)},
            "aslp": {"issuing": len(ASLP_ISSUING), "member": len(ASLP_MEMBER), "territories": 1},
        },
        "states": {
            abbr: {
                "pt": status(abbr, PT_ISSUING, PT_MEMBER),
                "ot": status(abbr, OT_ISSUING, OT_MEMBER),
                "aslp": status(abbr, ASLP_ISSUING, ASLP_MEMBER),
            }
            for _, abbr, _ in STATES
        },
    }
    path = os.path.join(CACHE, "compacts.json")
    json.dump(out, open(path, "w", encoding="utf-8"), indent=1)
    print("done ->", path, out["counts"])

if __name__ == "__main__":
    main()
