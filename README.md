# APT Recruiting website

Marketing and pSEO site for [aptrecruiting.com](https://aptrecruiting.com): a rehab-therapy
recruiting firm (PT, OT, SLP, audiology) founded by Molly James Salinas, a licensed
speech-language pathologist. Next.js 16 App Router, Tailwind 4, fully static, hosted on Vercel.

⚠️ This Next.js version differs from what most tools were trained on. Read
`node_modules/next/dist/docs/` before changing framework-level code (see `AGENTS.md`).

## Run

```bash
npm ci
cp .env.example .env.local           # fill in RESEND_API_KEY to test the forms
npm run dev                          # http://localhost:3000
```

## Build

```bash
# Windows: the Google Fonts fetch needs the system cert store.
NEXT_TURBOPACK_EXPERIMENTAL_USE_SYSTEM_TLS_CERTS=1 npm run build
npm run lint
```

The `prebuild` step runs two guards and fails the build on either:

- `scripts/check-trailing-slash.mjs`: every internal href and sitemap path must end in `/`
  (`trailingSlash: true`; an unslashed link is a 308 and an unslashed sitemap entry is an
  indexing problem).
- `scripts/check-fixtures.mjs`: no market snapshot may still be a fixture (`"fixture": true`).
  Set `ALLOW_FIXTURES=1` only for template work.

`MARKETS_PUBLISH_ALL=1` publishes every state regardless of `ROLLOUT_SCHEDULE` in
`src/lib/markets.ts` (verification builds only).

## Where things live

| What | Where |
|---|---|
| Every public claim, FAQ, profession and setting copy, `[MOLLY: ...]` placeholders | `src/lib/site.ts` |
| Market data types, loaders, cross-state metro ownership, national roll-ups | `src/lib/markets.ts` |
| Open roles (empty until Molly supplies them) | `src/lib/jobs.ts` |
| Blog registry | `src/lib/posts.ts` |
| Shared data sections (workforce tiles, pay table, QCEW cards, facilities, compacts) | `src/components/DataSections.tsx` |
| State and metro templates | `src/app/therapy-recruiters/[state]/` |
| Profession, setting and compact hubs | `src/components/{ProfessionHub,SettingHub,CompactTable}.tsx` + thin pages |
| Brand tokens (Tailwind 4 `@theme`) | `src/app/globals.css` |
| Contact and hire forms (Resend) | `src/app/api/contact/route.ts` |

## Placeholders

Every fact that is Molly's to state ships as a visible `[MOLLY: ...]` slot. Count them with
`grep -rn "\[MOLLY:" src/` and answer them from `docs/MOLLY_QUESTIONNAIRE.md`. Nothing on the
site asserts a fee, guarantee, timeline, phone number, testimonial or team member until she does.

## Data refresh

Numbers on every state, metro, hub and compact page come from `data/markets/`. The pipeline,
sources, cache locations and refresh procedure are in `docs/DATA_NOTES.md`; the exact JSON the
templates may render is `docs/DATA_CONTRACT.md`. Templates render only fields in the contract,
and omit a row, card or sentence when a nullable field is null. Never hand-edit `data/`.

## Environment

See `.env.example`. Production values are set on Vercel (`docs/LAUNCH.md`).

## Docs

- `docs/LAUNCH.md`: domain, DNS, Resend, Search Console, GA4, indexing order.
- `docs/MOLLY_QUESTIONNAIRE.md`: every placeholder as a question.
- `docs/DATA_CONTRACT.md`, `docs/DATA_NOTES.md`: the data side.
