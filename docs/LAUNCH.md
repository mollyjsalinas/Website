# Launch checklist

In order. Each step has a check that proves it, not a "should work".

## 0. Before DNS moves

- [ ] `data/markets/*.json` all carry `"fixture": false` and `npm run build` is green WITHOUT
      `ALLOW_FIXTURES` (the prebuild guard refuses fixtures).
- [ ] `grep -rn "\[MOLLY:" src/` count is what you expect. Placeholders are visible on the live
      site by design, but the fee / guarantee / speed slots on /employers/ should be answered
      before an employer reads them.
- [ ] `npm run lint` clean.
- [ ] Export the current WordPress site's URL list (Search Console > Pages, or the WP sitemap)
      and confirm every indexed URL either exists here or is covered by a redirect in
      `next.config.ts` (`/about-us/`, `/category/*`, `/tag/*`, `/author/*`, `/feed`, `/20xx/*`).
      Add a redirect for anything else that had impressions.

## 1. Vercel

- [ ] Import the GitHub repo as a Vercel project (framework: Next.js, root `/`).
- [ ] Environment variables (Production): `RESEND_API_KEY`, `CONTACT_TO_EMAIL`,
      `HIRE_TO_EMAIL`, `CONTACT_FROM_EMAIL`, `NEXT_PUBLIC_GA_MEASUREMENT_ID`. Do NOT set
      `ALLOW_FIXTURES` or `MARKETS_PUBLISH_ALL` in production.
- [ ] Deploy once on the `*.vercel.app` URL and click through: home, /employers/, one state,
      one metro, /licensure-compacts/pt-compact/, /jobs/, /blog/, /sitemap.xml, /robots.txt.
- [ ] Submit the hire form and the contact form on the preview URL; confirm both emails arrive
      at molly@aptrecruiting.com with the right subject line.
- [ ] Project > Settings > Domains: add `aptrecruiting.com` and `www.aptrecruiting.com`.
      Set the apex as primary. (The app also 308s www to apex itself, in `next.config.ts`.)

## 2. DNS (at the registrar / current DNS host)

- [ ] `A     @    76.76.21.21`
- [ ] `CNAME www  cname.vercel-dns.com`
- [ ] Leave MX and any mail TXT/DKIM records exactly as they are: the website change must not
      touch email delivery for molly@aptrecruiting.com.
- [ ] Wait for Vercel to show both domains as valid with a certificate.
- [ ] Check: `curl -sI https://www.aptrecruiting.com/about/` returns `308` with
      `location: https://aptrecruiting.com/about/`; `curl -sI https://aptrecruiting.com/about-us/`
      returns `308` to `/about/`.

## 3. Resend (form delivery)

- [ ] resend.com > Domains > Add `aptrecruiting.com`. Add the DKIM and Return-Path records it
      shows to DNS (these are separate from the MX records and do not affect inbound mail).
- [ ] Once verified, set `CONTACT_FROM_EMAIL="APT Recruiting Website <website@aptrecruiting.com>"`
      on Vercel and redeploy. Until then the forms send from Resend's onboarding address, which
      works but lands in spam more often.
- [ ] Submit both forms on the live domain and confirm delivery again.

## 4. Google Search Console

- [ ] Add a Domain property for `aptrecruiting.com` (DNS TXT verification) so both www and
      apex, http and https, are covered. If the old WordPress site already has a URL-prefix
      property, keep it: its history is useful for the redirect check.
- [ ] Sitemaps > submit `https://aptrecruiting.com/sitemap.xml`.
- [ ] Request indexing (URL Inspection) in this order, a few per day:
      1. `/` and `/employers/`
      2. The state pages for Molly's home states (`[MOLLY: which states]`), then their metros
      3. The four profession hubs
      4. `/licensure-compacts/` and the three compact pages
      5. The remaining states, largest therapy markets first (the home page lists the top eight)
- [ ] After two weeks: Pages report > check "Page with redirect" and "Not found (404)" for any
      legacy WordPress URL that needs a redirect added.

## 5. Analytics

- [ ] Create a GA4 property for aptrecruiting.com, copy the `G-...` measurement id into
      `NEXT_PUBLIC_GA_MEASUREMENT_ID` on Vercel, redeploy. The script only loads when the
      variable is set; IP anonymization is on.
- [ ] Confirm a real-time hit in GA4 from a visit to the live site.

## 6. Retire WordPress

- [ ] Once DNS has propagated and Search Console shows the new pages, cancel or archive the
      WordPress hosting. Keep an export of the old posts in case a legacy URL needs content.

## Ongoing

- Data refresh: `docs/DATA_NOTES.md`. After a refresh, bump nothing by hand; the sitemap reads
  `snapshot_date` from the files.
- Copy changes: bump `CONTENT_UPDATED` in `src/lib/site.ts` so the sitemap `lastmod` moves.
- New open role: add it to `src/lib/jobs.ts`; the page, index and sitemap follow.
