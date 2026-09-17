# Questions for Molly

Every `[MOLLY: ...]` placeholder on the site is one of these. Answer in plain English; each
answer drops into `src/lib/site.ts` (or one page) and the placeholder disappears. Nothing on the
site asserts any of this until you do.

## Terms (shown in the employer block on every market page and on /employers/ and /contact/hire/)

1. **Engagement model.** Do you work on contingency, retained, or both? If both, when is a
   search retained? Are retained searches exclusive?
2. **Fee.** What is the fee (a percentage of first-year salary, a flat amount, or "agreed in
   writing per search")? If you would rather not publish a number, say so and the page will read
   "agreed in writing before you see a candidate's details."
3. **Guarantee.** Is there a replacement guarantee if a hire leaves early? How long (30, 60, 90
   days)? Any conditions?
4. **Speed.** How quickly does a client typically see the first vetted candidates after the
   brief (days, one week, two weeks)?

## About you (shown on /about/, the home page and the "reviewed by" byline on every data page)

5. **Years in recruiting.** How long have you been recruiting therapists?
6. **Where you work from.** City and state.
7. **Your story, in your own words.** Two or three sentences: the settings you worked in as an
   SLP, what you saw go wrong in therapy hiring, and why you started APT Recruiting.
8. **Headshot.** A square photo, at least 800x800 px, JPG or PNG. It goes on /about/, the
   byline card on every data page and the home page.
9. **Personal LinkedIn URL** and the **APT Recruiting company page URL**, if there is one.
10. **Team.** Is anyone else on the desk? Name, title, one sentence each, and a photo if you want
    them on /about/. If it is just you, say so and the "team" section is removed.

## Contact

11. **Phone number** for the site. Until there is one, the pages show email only and the
    Organization schema carries no telephone.
12. **A separate employer mailbox** (for example hire@aptrecruiting.com)? If yes, hiring-form
    messages route there (`HIRE_TO_EMAIL`); if no, everything goes to molly@aptrecruiting.com.
13. **Legal entity name and mailing address** for the privacy policy.
14. **Where candidate records are kept** (ATS, CRM, spreadsheet) and **how long resumes are
    retained**, for the privacy policy.

## Proof

15. **Testimonials.** Two or three quotes from clients (a director of rehab, an administrator, a
    practice owner) and from placed therapists, each with a name, title and facility, and
    permission to publish. Anonymised ("Director of Rehab, SNF, Texas") is fine if that is all
    you can get.
16. **Placements or clients you may name.** Any facilities or systems you can list publicly.

## Open roles (/jobs/)

17. For each live opening you want listed publicly: title, city, state, setting, discipline,
    full-time / part-time / per diem, a paragraph describing it, the date it opened, and a
    salary range if the client allows one. Each becomes a page with JobPosting markup. Roles
    that must stay confidential should not be listed.

## Recruiters (/join-our-team/)

18. What does an independent recruiter get working with APT (split, tools, markets, roles,
    remote or not)? Any hard requirements (experience, licensure, location, hours)?

## Nice to have

19. **Anything specific to your home states.** A sentence or two of local knowledge for the
    states you know best (which systems are hiring, what SNF productivity looks like there).
    It goes into `narrative_extra` on that state's page, above the employer block.
20. **Physicians and NPs.** How much of the desk is physician / NP / medical director work? Today
    the site mentions it once per page as a secondary line; if it is a larger share, say so.

## Placement model

- Do you place permanent hires only, or travel and contract therapists too? What do you do when a client needs a 13-week fill while a permanent search runs? (fills the "Permanent, contract or both" card on /employers/ and "The roles we represent" on /job-seekers/)
