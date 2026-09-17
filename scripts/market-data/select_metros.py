"""Select the top metros per state from NPPES therapy counts.

Usage: python select_metros.py     (after parse_nppes_metro.py)

Selection: metropolitan CBSAs only (micro excluded), ranked by the SUM of all
six therapy roles (pt, pta, ot, ota, slp, aud) on the state's side of the
metro, floor FLOOR providers, max MAX_PER_STATE per state.

Writes cache/metro-selection.json in the shape fetch_qcew_county.py and
assemble_metros.py read:
  {"TX": [{"cbsa": "26420", "name": "Houston-The Woodlands-Sugar Land, TX",
           "providers_state_side": 12345}, ...], ...}
"""
import json, os

HERE = os.path.dirname(os.path.abspath(__file__))
CACHE = os.path.join(HERE, "cache")

FLOOR = 150
MAX_PER_STATE = 5

def select():
    data = json.load(open(os.path.join(CACHE, "nppes-metro.json"), encoding="utf-8"))
    meta = data["cbsa_meta"]
    totals = {}  # (state, cbsa) -> total providers, all six roles
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
    print(f"selected {sum(len(v) for v in selection.values())} state-metro pages, "
          f"{n_metros} unique CBSAs, {len(selection)} states -> {path}")
    return selection

if __name__ == "__main__":
    select()
