#!/usr/bin/env bash
# Monthly market-data refresh for the APT therapy market pages.
#
# Discovers the current NPPES monthly dissemination zip, downloads every
# re-fetchable input, runs the pipeline in order and re-assembles
# data/markets/. Exits non-zero on the first failure. Runs on Ubuntu (the
# GitHub Actions workflow .github/workflows/monthly-data-refresh.yml) and in
# Git Bash on Windows.
#
# NOT refreshed here (their caches are committed so a clean runner can
# assemble): OEWS (annual bulk xlsx, bls.gov blocks scripted downloads;
# cache/oews.json) and the licensure compact table (hand-maintained,
# compacts.py -> cache/compacts.json). See docs/DATA_NOTES.md, "Monthly refresh".
#
# Environment:
#   SNAPSHOT_DATE   YYYY-MM-DD stamped into every snapshot (default: the
#                   constant in assemble.py). The workflow passes the run date.
#   RAW_DIR         where inputs are downloaded to (default: a fresh temp dir).
#                   Any non-empty file already present there is reused, so a
#                   local run can point at a directory holding the 1.15 GB
#                   NPPES zip and skip that download.
#   SKIP_STEPS      comma list of pipeline steps to skip, reusing their cache
#                   files: nppes, bls, cms, compacts, select, qcew-county.
#                   Local development only; the workflow never sets it.
#   PYTHON          interpreter (default: python3, else python).
set -euo pipefail

HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT="$(cd "$HERE/../.." && pwd)"
CACHE="$HERE/cache"
log() { printf '%s %s\n' "$(date -u +%H:%M:%S)" "$*"; }
die() { log "FATAL $*"; exit 1; }
# python3 must actually run: on Windows it can be the Microsoft Store stub.
PY="${PYTHON:-}"
if [ -z "$PY" ]; then
  for cand in python3 python; do
    if "$cand" -c "import sys; assert sys.version_info >= (3, 9)" >/dev/null 2>&1; then PY="$cand"; break; fi
  done
fi
[ -n "$PY" ] || die "no working python3 found (set PYTHON=...)"
UA="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36"

NPI_PAGE="https://download.cms.gov/nppes/NPI_Files.html"
NPI_BASE="https://download.cms.gov/nppes"
GEONAMES_URL="https://download.geonames.org/export/zip/US.zip"
CROSSWALK_URL="https://raw.githubusercontent.com/WillTheGeek/simplecrosswalk/master/us_counties_crosswalk_2019.csv"
CENSUS_URL="https://www2.census.gov/programs-surveys/popest/datasets/2020-2025/state/totals/NST-EST2025-ALLDATA.csv"
# CMS Provider Data Catalog: nursing homes 4pq5-n9py, home health 6jpm-sxkc (ids in docs/DATA_NOTES.md).
CMS_NH_URL="https://data.cms.gov/provider-data/api/1/datastore/query/4pq5-n9py/0/download?format=csv"
CMS_HH_URL="https://data.cms.gov/provider-data/api/1/datastore/query/6jpm-sxkc/0/download?format=csv"

SKIP=",${SKIP_STEPS:-},"
export SNAPSHOT_DATE="${SNAPSHOT_DATE:-}"
export CMS_PULL_DATE="${CMS_PULL_DATE:-$SNAPSHOT_DATE}"

skip() { case "$SKIP" in *",$1,"*) return 0;; *) return 1;; esac; }

if [ -z "${RAW_DIR:-}" ]; then
  RAW_DIR="$(mktemp -d "${TMPDIR:-/tmp}/apt-raw.XXXXXX")"
fi
mkdir -p "$RAW_DIR" "$CACHE"
log "raw dir: $RAW_DIR"
log "snapshot date: ${SNAPSHOT_DATE:-<assemble.py default>}"

fetch() {  # fetch <url> <dest>: reuse a non-empty file already in RAW_DIR
  local url="$1" dest="$2"
  if [ -s "$dest" ]; then
    log "reuse  $(basename "$dest") ($(du -h "$dest" | cut -f1))"
    return 0
  fi
  log "fetch  $url"
  curl -fsSL --retry 3 --retry-delay 20 --retry-all-errors -A "$UA" -o "$dest.part" "$url"
  [ -s "$dest.part" ] || die "empty download: $url"
  mv "$dest.part" "$dest"
  log "saved  $(basename "$dest") ($(du -h "$dest" | cut -f1))"
}

run() {  # run <step> <cmd...>: log to cache/<step>.log, fail loudly
  local step="$1"; shift
  if skip "$step"; then
    log "skip   $step (SKIP_STEPS), reusing cache"
    return 0
  fi
  log "start  $step: $*"
  local t0; t0=$(date +%s)
  if ! "$@" 2>&1 | tee "$CACHE/$step.log"; then
    die "$step failed after $(( $(date +%s) - t0 ))s (log: cache/$step.log)"
  fi
  log "done   $step in $(( $(date +%s) - t0 ))s"
}

# ---- 1. Discover the current NPPES monthly zip ------------------------------
# The page lists the Full Replacement Monthly file (NPPES_Data_Dissemination_
# <Month>_<YYYY>[_Vn].zip) next to weekly incrementals (..._MMDDYY_MMDDYY_
# Weekly...) and the deactivation report. Only the monthly name matches.
page="$(curl -fsSL --retry 3 --retry-delay 20 --retry-all-errors -A "$UA" "$NPI_PAGE")" \
  || die "cannot fetch $NPI_PAGE"
NPPES_ZIP="$(printf '%s' "$page" | grep -oE 'NPPES_Data_Dissemination_[A-Z][a-z]+_[0-9]{4}(_V[0-9]+)?\.zip' | sort -u || true)"
n_found=$(printf '%s\n' "$NPPES_ZIP" | grep -c . || true)
[ "$n_found" -eq 1 ] || die "expected exactly one monthly NPPES zip on $NPI_PAGE, found $n_found: $NPPES_ZIP"
NPPES_MONTH="$(printf '%s' "$NPPES_ZIP" | sed -E 's/NPPES_Data_Dissemination_([A-Za-z]+)_([0-9]{4}).*/\1 \2/')"
log "NPPES monthly file: $NPPES_ZIP ($NPPES_MONTH)"

# ---- 2. Inputs ---------------------------------------------------------------
fetch "$NPI_BASE/$NPPES_ZIP" "$RAW_DIR/$NPPES_ZIP"
"$PY" - "$RAW_DIR/$NPPES_ZIP" <<'PYEOF' || die "NPPES zip is not a valid dissemination file"
import sys, zipfile
zf = zipfile.ZipFile(sys.argv[1])
names = [n for n in zf.namelist() if n.lower().startswith("npidata_pfile") and n.endswith(".csv") and "fileheader" not in n.lower()]
assert names, "no npidata_pfile csv inside the zip"
print("zip ok:", names[0], zf.getinfo(names[0]).file_size // (1024 * 1024), "MB")
PYEOF

fetch "$GEONAMES_URL" "$RAW_DIR/US.zip"
if [ ! -s "$RAW_DIR/US.txt" ]; then
  "$PY" -c "import sys, zipfile; zipfile.ZipFile(sys.argv[1]).extract('US.txt', sys.argv[2])" "$RAW_DIR/US.zip" "$RAW_DIR" \
    || die "cannot extract US.txt from GeoNames US.zip"
  log "saved  US.txt"
fi
fetch "$CROSSWALK_URL" "$RAW_DIR/county-cbsa.csv"
fetch "$CENSUS_URL" "$RAW_DIR/NST-EST2025-ALLDATA.csv"
fetch "$CMS_NH_URL" "$RAW_DIR/cms-nursing-homes.csv"
fetch "$CMS_HH_URL" "$RAW_DIR/cms-home-health.csv"

# Cheap shape checks so a changed export fails here, not deep in a parser.
head -c 4096 "$RAW_DIR/county-cbsa.csv" | head -n 1 | grep -q 'state_county_fips' || die "crosswalk header changed"
head -c 4096 "$RAW_DIR/NST-EST2025-ALLDATA.csv" | head -n 1 | grep -q 'POPESTIMATE2025' || die "Census header changed"
head -c 4096 "$RAW_DIR/cms-nursing-homes.csv" | head -n 1 | grep -q 'Number of Certified Beds' || die "CMS nursing-home header changed"
head -c 4096 "$RAW_DIR/cms-home-health.csv" | head -n 1 | grep -q 'Offers Physical Therapy Services' || die "CMS home-health header changed"
for f in oews.json compacts.json; do
  [ -s "$CACHE/$f" ] || die "cache/$f is missing; it is committed on purpose (see docs/DATA_NOTES.md)"
done

# ---- 3. Pipeline (order matters) ---------------------------------------------
cd "$HERE"
# The two NPPES parses each stream the ~11 GB CSV once; they are independent,
# so they run side by side.
if skip nppes; then
  log "skip   nppes + nppes-metro (SKIP_STEPS), reusing cache"
else
  run nppes "$PY" parse_nppes.py "$RAW_DIR/$NPPES_ZIP" &
  p_state=$!
  run nppes-metro "$PY" parse_nppes_metro.py "$RAW_DIR/$NPPES_ZIP" "$RAW_DIR/US.txt" "$RAW_DIR/county-cbsa.csv" &
  p_metro=$!
  wait "$p_state" || die "parse_nppes.py failed"
  wait "$p_metro" || die "parse_nppes_metro.py failed"
fi
run bls "$PY" fetch_bls.py
run cms "$PY" fetch_cms.py "$RAW_DIR/cms-nursing-homes.csv" "$RAW_DIR/cms-home-health.csv" "$RAW_DIR/US.txt" "$RAW_DIR/county-cbsa.csv"
run compacts "$PY" compacts.py
run select "$PY" select_metros.py
run qcew-county "$PY" fetch_qcew_county.py "$RAW_DIR/county-cbsa.csv"

# ---- 4. Assemble -------------------------------------------------------------
run assemble "$PY" assemble.py "$RAW_DIR/NST-EST2025-ALLDATA.csv"
run assemble-metros "$PY" assemble_metros.py "$RAW_DIR/county-cbsa.csv"

# Metro slices that dropped out of the selection would otherwise linger with
# last month's numbers; remove them and say so.
"$PY" - "$ROOT/data/markets/metros" <<'PYEOF'
import glob, json, os, sys
root = sys.argv[1]
files = sorted(glob.glob(os.path.join(root, "*", "*.json")))
dates = {}
for p in files:
    dates.setdefault(json.load(open(p, encoding="utf-8")).get("snapshot_date"), []).append(p)
newest = max(dates) if dates else None
stale = [p for d, ps in dates.items() if d != newest for p in ps]
for p in stale:
    os.remove(p)
    print(f"PRUNED stale metro slice (not in this month's selection): {os.path.relpath(p, root)}")
print(f"metro slices: {len(files) - len(stale)} current ({newest}), {len(stale)} pruned")
PYEOF

# ---- 5. Summary for the workflow commit message ------------------------------
"$PY" - "$CACHE" "$NPPES_ZIP" "$NPPES_MONTH" "$ROOT" <<'PYEOF'
import glob, json, os, sys
cache, nppes_zip, nppes_month, root = sys.argv[1:5]
bls = json.load(open(os.path.join(cache, "bls.json"), encoding="utf-8"))
states = sorted(glob.glob(os.path.join(root, "data", "markets", "*-therapy.json")))
metros = glob.glob(os.path.join(root, "data", "markets", "metros", "*", "*.json"))
stamp = json.load(open(states[0], encoding="utf-8"))["snapshot_date"]
out = {"snapshot_date": stamp, "nppes_zip": nppes_zip, "nppes_month": nppes_month,
       "qcew_period": bls["qcew_period"], "state_files": len(states), "metro_files": len(metros)}
json.dump(out, open(os.path.join(cache, "refresh-summary.json"), "w", encoding="utf-8"), indent=1)
print("summary:", json.dumps(out))
PYEOF
log "refresh complete"
