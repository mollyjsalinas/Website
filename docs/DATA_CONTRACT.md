# APT market-data contract

Every number on a state or metro page comes from `data/markets/`. Templates may only render
fields listed here. Pipeline scripts live in `scripts/market-data/`; caches are gitignored.

Snapshot date comes from the `SNAPSHOT_DATE` env var when set (the monthly refresh
workflow stamps its run date), else the constant in `assemble.py` (`SNAPSHOT_DATE_DEFAULT`);
never `date.today()`. Hand-written prose lives ONLY in `narrative_extra` (assemblers carry it forward).

Roles (NPPES primary taxonomy, Type 1 only, in-state practice address, not deactivated):

| key | taxonomy | label |
|---|---|---|
| pt | 225100000X | Physical therapists |
| pta | 225200000X | Physical therapist assistants |
| ot | 225X00000X | Occupational therapists |
| ota | 224Z00000X | Occupational therapy assistants |
| slp | 235Z00000X | Speech-language pathologists |
| aud | 231H00000X | Audiologists |

OEWS occupations (May 2025, from `oesm25all.zip`; `all_data` sheet, state rows AREA_TYPE=2,
metro rows AREA_TYPE=4 keyed by AREA = CBSA code; fields TOT_EMP, A_MEAN, A_MEDIAN):

| key | SOC |
|---|---|
| pt | 29-1123 |
| ot | 29-1122 |
| slp | 29-1127 |
| aud | 29-1181 |
| pta | 31-2021 |
| ota | 31-2011 |

QCEW industries (private ownership, own_code 5, Q4 2025 vs Q4 2024): `therapy_offices_naics_62134`,
`home_health_naics_6216`, `nursing_facilities_naics_6231`, `hospitals_naics_6221`.

## State file `data/markets/<st>-therapy.json`

```json
{
  "market": "Texas", "market_abbr": "TX", "desk": "therapy", "snapshot_date": "2026-09-02",
  "fixture": false,
  "population": { "source": "Census Vintage 2025 state estimates", "total": 31290831 },
  "supply": {
    "source": "NPPES monthly file, August 2026 (CMS, public domain)",
    "note": "...",
    "active_individual_providers": { "pt": 0, "pta": 0, "ot": 0, "ota": 0, "slp": 0, "aud": 0 },
    "per_100k": { "pt": 0.0, "ot": 0.0, "slp": 0.0, "aud": 0.0 }
  },
  "new_provider_inflow": {
    "source": "NPPES provider enumeration dates, August 2026 file",
    "note": "...",
    "trailing_12_months": { "pt": { "trailing_12mo_total": 0, "by_month": { "2025-08": 0 } }, "pta": {}, "ot": {}, "ota": {}, "slp": {}, "aud": {} }
  },
  "compensation": {
    "source": "BLS OEWS, May 2025 estimates",
    "pt": { "employment": 0, "annual_mean_wage": 0, "annual_median_wage": 0 }, "ot": {}, "slp": {}, "aud": {}, "pta": {}, "ota": {},
    "national": { "pt": { "employment": 0, "annual_mean_wage": 0, "annual_median_wage": 0 } }
  },
  "sector_employment": {
    "source": "BLS QCEW, statewide, private ownership, Q4 2024 vs Q4 2025",
    "therapy_offices_naics_62134": { "employment": 0, "establishments": 0, "avg_weekly_wage": 0, "employment_yoy_pct": 0.0, "establishments_yoy_pct": 0.0, "avg_weekly_wage_yoy_pct": 0.0 },
    "home_health_naics_6216": {}, "nursing_facilities_naics_6231": {}, "hospitals_naics_6221": {}
  },
  "facilities": {
    "source": "CMS Provider Data Catalog (nursing homes 4pq5-n9py, home health 6jpm-sxkc), pulled 2026-09-02",
    "nursing_homes": { "count": 0, "certified_beds": 0, "avg_overall_rating": 0.0, "for_profit_pct": 0.0 },
    "home_health_agencies": { "count": 0, "avg_quality_star": 0.0, "offers_pt_pct": 0.0, "offers_ot_pct": 0.0, "offers_slp_pct": 0.0 }
  },
  "compacts": {
    "source": "ptcompact.org, otcompact.gov, aslpcompact.com, checked 2026-09-02",
    "pt": "issuing", "ot": "member", "aslp": "none"
  },
  "narrative_extra": null
}
```

Any QCEW block may be `null` (not fetched / suppressed); YoY keys are ABSENT (not 0) when the
prior year is missing. Any compensation occupation may be absent (`employment` or a wage may be
`null` when BLS suppresses one of them). `avg_quality_star` may be `null` when no agency in the
area has a rating. `compacts.*` is one of `"issuing" | "member" | "none"`.

## Metro file `data/markets/metros/<st>/<city-slug>.json`

Same as state minus `population` and `compacts`, plus:

```json
{
  "metro": "Kansas City, MO-KS", "city": "Kansas City", "city_slug": "kansas-city", "cbsa": "28140",
  "state_abbr": "MO", "state": "Missouri",
  "supply": { "scope": "Missouri side of the Kansas City metro area" },
  "compensation": { "source": "BLS OEWS, May 2025 estimates, metropolitan area", "pt": {} },
  "sector_employment": { "source": "BLS QCEW county files ...", "scope": "...", "therapy_offices_naics_62134": { "employment": 0, "establishments": 0, "avg_weekly_wage": 0, "counties_disclosed": 0, "counties_total": 0 } },
  "facilities": { "nursing_homes": {}, "home_health_agencies": {} }
}
```

Metro `supply` has no `per_100k`. Metro `compensation` holds whole-CBSA OEWS figures and is
ABSENT entirely when BLS publishes none for that metro; metro QCEW blocks carry
`counties_disclosed`/`counties_total` and no YoY keys.

Metro selection: metropolitan CBSAs only, ranked by total therapist count (all six roles) on the
state's side, floor 150, max 5 per state. Cross-state CBSAs: every state slice is written to disk;
`src/lib/markets.ts` `METRO_CBSA_OWNER` decides which slice publishes (owner = principal city's state).
