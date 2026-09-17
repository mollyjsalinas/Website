# Market-data pipeline notes (therapy desk)

Companion to `DATA_CONTRACT.md`. Scripts live in `scripts/market-data/`, caches in
`scripts/market-data/cache/` (gitignored via `cache/.gitignore`). Snapshot 2026-09-02.

## Sources and periods

| Block | Source | Period | Script |
|---|---|---|---|
| supply, new_provider_inflow | NPPES monthly dissemination `NPPES_Data_Dissemination_August_2026_V2.zip` (npidata through 2026-08-09) | trailing 12 full months = 2025-08..2026-07 | `parse_nppes.py`, `parse_nppes_metro.py` |
| population | Census `NST-EST2025-ALLDATA.csv`, `POPESTIMATE2025`, SUMLEV 040 | Vintage 2025 | `assemble.py` |
| compensation | BLS OEWS `oesm25all.zip` -> `all_data_M_2025.xlsx` | May 2025 | `parse_oews.py` |
| sector_employment (state) | BLS QCEW open CSV API, statewide, own_code 5 | Q4 2024 vs Q4 2025 | `fetch_bls.py` |
| sector_employment (metro) | BLS QCEW open CSV API, county files, own_code 5 | Q4 2025 (no YoY) | `fetch_qcew_county.py` |
| facilities | CMS PDC nursing homes `4pq5-n9py`, home health `6jpm-sxkc` | pulled 2026-09-02 | `fetch_cms.py` |
| compacts | ptcompact.org, otcompact.gov, aslpcompact.com | checked 2026-09-02 | `compacts.py` (hand table) |
| geography | GeoNames `US.txt` (zip -> county), WillTheGeek `county-cbsa.csv` (county -> CBSA) | 2020 delineations | shared helper in `parse_nppes_metro.py` |

Roles are classified by EXACT primary taxonomy code (pt 225100000X, pta 225200000X,
ot 225X00000X, ota 224Z00000X, slp 235Z00000X, aud 231H00000X), Type 1 only, practice
address in the 50 states + DC, NPIs deactivated without a later reactivation dropped.

## Gotchas hit

- **bls.gov blocks script fetches** of pages and flat files from this machine. Only the
  QCEW open CSV API (`data.bls.gov/cew/data/api/{year}/{qtr}/area/{area}.csv`) works.
  OEWS therefore comes from the manually downloaded `oesm25all.zip`, not the BLS API.
- **QCEW 2025 Q4 exists** (verified 2026-09-02); `fetch_bls.py` probes and falls back to
  the newest quarter present, recording it in `qcew_period`.
- **QCEW suppression (statewide, hospitals 6221):** AK 2025, VT 2024+2025, WY 2024+2025
  carry disclosure `N`. The assembler emits `null` for those blocks (and omits YoY keys
  when only the prior year is suppressed). Every other state x industry is disclosed.
- **Connecticut has no counties any more.** GeoNames and the QCEW county API use the 9
  planning regions (FIPS 09110-09190); the crosswalk still carries legacy counties. The
  bridge is `CT_REGION_CBSA` in `parse_nppes_metro.py`, used by the NPPES metro parse,
  CMS metro aggregation, the county QCEW fetch and the metro assembler. Without it CT
  had zero metro pages.
- **OEWS gaps (state level):** RI aud, VT ota, WY aud have no row at all (key absent);
  AK/MS/NV/VT aud have a row with a suppressed field (`null`). Wage values `*`, `**`,
  `#` are treated as suppressed. Metro compensation uses whole-CBSA rows; the key is
  absent when BLS publishes none for that CBSA.
- **OEWS metro rows use the 2023 OMB delineations**, the crosswalk uses 2020. Three selected
  CBSAs were re-coded: Cleveland-Elyria 17460 -> Cleveland 17410, Poughkeepsie 39100 ->
  Kiryas Joel-Poughkeepsie-Newburgh 28880, California-Lexington Park 15680 -> Lexington
  Park 30500. `OEWS_CBSA_ALIAS` in `assemble_metros.py` bridges them and the compensation
  `scope` names the BLS area. All other 191 selected CBSAs match on code and principal city.
- **City slugs** follow the CBSA title's principal city: text before the first `-`, `,` or
  `/` (`Louisville/Jefferson County` -> `louisville`), `Winston-Salem` / `Wilkes-Barre`
  kept whole, periods dropped (`St. Louis` -> `st-louis`). Official titles are kept even
  when odd: `urban-honolulu`, `barnstable-town`, `boise-city`, `md/california`
  (California-Lexington Park). Cross-state CBSAs are written for every state slice
  (`ma/boston` + `nh/boston`, `mo/kansas-city` + `ks/kansas-city`, `il/st-louis`, ...).
- **CMS home-health ownership** is `-` (unreported) for ~17% of agencies; `for_profit_pct`
  and `offers_*_pct` are computed over agencies that report the field. Ratings average
  over rated rows only; `avg_quality_star` is `null` when nobody in the area is rated.
- **ZIPs outside any CBSA** (rural) never map to a metro; ~4.5% of NPPES therapy
  providers and ~14% of nursing homes fall there. State totals are unaffected.
- **The MSA-level QCEW area files suppress employment**, so metro sector employment is
  the disclosure-aware sum of state-side member counties (`counties_disclosed` /
  `counties_total` say how much is covered). County-level suppression is heavy for
  hospitals: in the 2026-09-02 snapshot `hospitals_naics_6221` is `null` in 99 of 210
  metro files (nursing 8, home health 6, therapy offices 3); no metro has all four null.
  Metro QCEW carries NO YoY keys by design.
- Never run the NPPES parses or the county QCEW fetch inside a foreground tool call;
  they take 6-70 minutes. Launch detached and poll the `cache/*.log` files.

## How to rerun (order matters)

Raw inputs are expected in one directory (`$RAW`): the NPPES zip, `US.txt` (unzipped
GeoNames), `county-cbsa.csv`, `NST-EST2025-ALLDATA.csv`, `cms-nursing-homes.csv`,
`cms-home-health.csv`, and `oews/oesm25all/all_data_M_2025.xlsx`.

```
cd scripts/market-data
python parse_nppes.py $RAW/NPPES_....zip                                   # ~6 min, background
python parse_nppes_metro.py $RAW/NPPES_....zip $RAW/US.txt $RAW/county-cbsa.csv   # ~6 min, background
python fetch_bls.py                                                        # ~3 min, background
python parse_oews.py $RAW/oews/oesm25all/all_data_M_2025.xlsx              # ~1 min
python fetch_cms.py $RAW/cms-nursing-homes.csv $RAW/cms-home-health.csv $RAW/US.txt $RAW/county-cbsa.csv
python compacts.py                     # after re-verifying the three compact sites; bump CHECK_DATE
python select_metros.py                # needs nppes-metro.json
python fetch_qcew_county.py $RAW/county-cbsa.csv    # ~60 min, background; checkpoints every 50, resumes
python assemble.py $RAW/NST-EST2025-ALLDATA.csv     # 51 state files
python assemble_metros.py $RAW/county-cbsa.csv      # metro files (delete data/markets/metros first if slugs changed)
node ../check-fixtures.mjs             # from repo root: node scripts/check-fixtures.mjs
```

`refresh.sh` runs everything above except `parse_oews.py` and the manual compact check
(see "Monthly refresh"). `SNAPSHOT_DATE` comes from the env var of that name (default: the
constant in `assemble.py`); `NPPES_MONTH` and `TRAILING_12` are derived from the parsed
file's name in `cache/nppes.json`; `CMS_PULL_DATE` defaults to the snapshot date. Still
hand-bumped: `QCEW_YEARS` in `fetch_bls.py` / `fetch_qcew_county.py`; `CHECK_DATE` and the
state sets in `compacts.py`; the OEWS period string in `parse_oews.py`.

## Monthly refresh

`.github/workflows/monthly-data-refresh.yml` runs `scripts/market-data/refresh.sh` on the
15th of every month at 12:00 UTC (cron `0 12 15 * *`; the NPPES monthly file lands in the
second week) and on manual dispatch (`gh workflow run monthly-data-refresh.yml -R
jj5288/apt-website`, optional `snapshot_date` input, default today UTC). Timeout 90 min;
a normal run is about an hour, most of it the county QCEW fetch (1.0 s sleep) and the
statewide fetch (1.2 s sleep), both kept as BLS rate-limit courtesy.

What one run does:

1. Scrapes `download.cms.gov/nppes/NPI_Files.html` with a browser User-Agent for the
   single Full Replacement Monthly zip (`NPPES_Data_Dissemination_<Month>_<YYYY>[_Vn].zip`;
   weekly and deactivation files never match) and downloads it (1.15 GB) plus GeoNames
   `US.zip`, the WillTheGeek crosswalk, Census `NST-EST2025-ALLDATA.csv` and the two CMS
   PDC CSVs (`4pq5-n9py`, `6jpm-sxkc`) into a temp dir. Header checks fail fast if an
   export changes shape.
2. Runs, in order: both NPPES parses (side by side), `fetch_bls.py`, `fetch_cms.py`,
   `compacts.py`, `select_metros.py`, `fetch_qcew_county.py` (checkpoint every 50
   counties), `assemble.py`, `assemble_metros.py`. Any failure exits non-zero. Metro slices
   that fell out of the top-5 selection are pruned (the run log says which).
3. `node scripts/check-fixtures.mjs`, then a guard: no `"fixture": true` anywhere under
   `data/markets/`, and at least 51 state files changed `snapshot_date` (so a run stamped
   with the already-committed date fails instead of committing nothing new).
4. Commits `data/` as `jj5288 <125397311+jj5288@users.noreply.github.com>` (Vercel rejects
   deploys from non-team authors) with "Monthly data refresh: NPPES <Month YYYY>, QCEW
   <period>", rebases on main and pushes. Vercel auto-deploys; the sitemap `lastmod` moves
   with `snapshot_date`.

Committed caches (`cache/.gitignore` allow-lists them) because a clean runner cannot
re-fetch them: `oews.json` and `compacts.json`. Everything else in `cache/` is rebuilt
each run.

Still manual:

- **OEWS, each May/June** when BLS publishes the new May estimates: download
  `oesm<yy>all.zip` by hand from bls.gov/oes/tables.htm (scripted downloads are blocked),
  `python parse_oews.py <all_data_M_20yy.xlsx>`, bump the period string in `parse_oews.py`,
  commit `cache/oews.json`. Check `OEWS_CBSA_ALIAS` in `assemble_metros.py` if delineations
  moved again.
- **Compacts, quarterly:** re-verify ptcompact.org, otcompact.gov, aslpcompact.com; edit the
  state sets and `CHECK_DATE` in `compacts.py`; `python compacts.py`; commit
  `cache/compacts.json`. The workflow reruns `compacts.py`, so the committed file always
  matches the code.
- **QCEW year pair:** `fetch_bls.py` already falls back to the newest quarter present for
  the current year, but the pair itself (`QCEW_YEARS` in `fetch_bls.py` and
  `fetch_qcew_county.py`) is bumped by hand when a new Q4 pair exists (Q4 2026 lands around
  June 2027).
- **Census vintage:** `NST-EST2026-ALLDATA.csv` (around December 2026): update `CENSUS_URL`
  in `refresh.sh`, the `POPESTIMATE` column and source label in `assemble.py`.

Local run (Git Bash): `RAW_DIR=<dir holding the NPPES zip> SNAPSHOT_DATE=YYYY-MM-DD
SKIP_STEPS=nppes,bls,qcew-county bash scripts/market-data/refresh.sh` reuses the present
inputs and the slow caches and re-downloads only what is missing. The workflow never sets
`SKIP_STEPS`.
