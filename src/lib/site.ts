// Single source of truth for public claims about APT Recruiting.
//
// ⛔ NO INVENTED FACTS. Everything Molly states about her business (terms,
// contact details, bio, testimonials, openings) comes from her questionnaire
// reply of 2026-09-17 (Gmail msg 1a0b0881520e4385). Anything she has not stated
// ships as a visible "[MOLLY: ...]" placeholder. Keep the "[MOLLY:" prefix
// exactly: the handoff greps for it.

// Bumped manually when page copy meaningfully changes; feeds sitemap lastModified.
export const CONTENT_UPDATED = "2026-09-25";

export const SITE = {
  name: "APT Recruiting",
  legalName: "APT Recruiting LLC",
  url: "https://aptrecruiting.com",
  email: "molly@aptrecruiting.com",
  // Employer-side inbox. Hiring inquiries route here (see /api/contact). Molly
  // asked for no separate employer mailbox (9/17), so it is the same address.
  hireEmail: "molly@aptrecruiting.com",
  phone: "(409) 225-1441",
  phoneHref: "tel:+14092251441",
  telephone: "+1-409-225-1441",
  // ⛔ City and state only. Molly gave a street address for the privacy policy,
  // but it is a home address and is deliberately not published anywhere in this
  // repo; email and phone are the contact route on /privacy-policy/.
  mailingAddress: {
    city: "Austin",
    region: "TX",
  },
  tagline:
    "Discovering apt candidates for our clients' success: our expertise, your perfect match.",
  description:
    "APT Recruiting is a rehab-therapy recruiting firm founded by a licensed speech-language pathologist. We place physical therapists, occupational therapists, speech-language pathologists and audiologists with hospitals, skilled nursing, home health, outpatient and school-based employers nationwide.",
} as const;

// The founder. Only facts she has already published about herself are asserted
// here; everything else is a placeholder.
export const MOLLY = {
  // Name and credentials as she signs her own email.
  name: "Molly Salinas",
  firstName: "Molly",
  credentialLetters: "M.S., CCC-SLP",
  jobTitle: "Founder and Recruiter",
  credential: "Licensed speech-language pathologist",
  credentialShort: "SLP",
  email: "molly@aptrecruiting.com",
  linkedin: "https://www.linkedin.com/in/james-molly/",
  headshot: "/molly-salinas.jpg",
  yearsRecruiting: "3 years",
  basedIn: "Austin, Texas",
  bio: [
    "Molly Salinas is a licensed speech-language pathologist who has worked across telehealth, schools, skilled nursing, hospitals, outpatient care and travel assignments, and founded APT Recruiting to bring a clinician's eye to healthcare hiring.",
    // Molly's positioning copy, verbatim (9/25 "Website updates" email). APT does
    // NOT recruit physicians, medical directors or administrators; NP/PA come second.
    "APT Recruiting specializes in recruiting Physical Therapists, Occupational Therapists, Speech-Language Pathologists, Audiologists, therapy assistants, and experienced therapy professionals for leadership roles. We also provide recruiting services for Nurse Practitioners and Physician Assistants. We work with skilled nursing facilities, private practices, outpatient clinics, telehealth organizations, home health agencies, schools, and other healthcare organizations nationwide.",
  ],
  // Her founder story, in her own words (first person).
  story: [
    "As a Speech-Language Pathologist, I worked across telehealth, schools, skilled nursing, hospitals, outpatient care, and travel assignments, giving me firsthand insight into what clinicians need, and what too often goes wrong in healthcare hiring.",
    "I started APT Recruiting to create a more personal, transparent approach to recruitment, connecting healthcare practices with exceptional clinicians based on more than just a résumé.",
    "Today, I use my clinical experience and understanding of both sides of the hiring process to create lasting placements where the right clinician and the right practice can truly thrive.",
  ],
} as const;

// Employer-facing terms. One place, so the employer block on every market page
// and the /employers/ page never drift. Every value here is Molly's to state.
export const EMPLOYER_TERMS = {
  models: "Contingency recruiting. There is no fee unless a successful placement is made.",
  fee: "Agreed in writing before you see a candidate's details.",
  guarantee:
    "Every direct-hire placement carries a 90-day replacement guarantee. If the candidate resigns or is terminated for cause during the first ninety calendar days of employment, APT Recruiting immediately begins a one-time search for a replacement in the same position, at no additional charge.",
  speed:
    "Clients typically receive the first vetted candidates within one to two weeks of providing the recruiting brief and search requirements.",
  placement:
    "Primarily permanent full-time and part-time placements. When a client has an immediate need, APT Recruiting can also arrange a contract placement on a flat fee, including a short-term fill while a permanent search is underway.",
  toStart: "A short call to take the brief: the role, the setting, the caseload, the schedule and the pay range. A job description helps but is optional.",
} as const;

// Employer FAQ for a market page or the /employers/ page. `place` is the market
// name as it should read in a sentence ("Texas", "Houston"); omit it for the
// national pages. Exactly four questions: the block emits one FAQPage per URL.
export function employerFaqs(place?: string): { q: string; a: string }[] {
  const where = place ? ` in ${place}` : "";
  const local = place ? `the ${place}` : "your";
  return [
    {
      q: `How does a therapy search with APT Recruiting work${where}?`,
      a: `It starts with a short call to take the brief: the discipline, the setting, the caseload and productivity expectations, the schedule and the pay range. Because APT is run by a licensed speech-language pathologist, the screen covers clinical fit, not just a license check. We then work ${local} market for PTs, OTs, SLPs or audiologists who match, confirm interest, and send you candidates who have already said yes to a conversation about your organization. ${EMPLOYER_TERMS.speed}`,
    },
    {
      q: "Do you work on contingency or retained?",
      a: EMPLOYER_TERMS.models,
    },
    {
      q: "What does it cost to hire through a therapy recruiter?",
      a: `${EMPLOYER_TERMS.fee} ${EMPLOYER_TERMS.guarantee}`,
    },
    {
      q: "Which roles and settings do you cover?",
      a: `Physical therapists, occupational therapists, speech-language pathologists and audiologists, including PTAs and COTAs, plus directors of rehab and other therapy leadership. Settings${where} include hospitals and acute rehab, skilled nursing, home health, outpatient clinics, schools and pediatrics, and telehealth. We also recruit nurse practitioners and physician assistants.`,
    },
  ];
}

// Candidate-side FAQ for /job-seekers/. Three questions.
export const candidateFaqs: { q: string; a: string }[] = [
  {
    q: "Does it cost a therapist anything to work with APT Recruiting?",
    a: "No. The hiring employer pays our fee. You never pay us, and nothing about your search is shared with an employer without your say-so.",
  },
  {
    q: "What kinds of therapy jobs do you place?",
    a: "Physical therapy, occupational therapy, speech-language pathology and audiology roles across hospitals, skilled nursing, home health, outpatient, schools and telehealth, plus PTA and COTA positions and rehab leadership such as director of rehab. Mostly permanent full-time and part-time positions, with contract roles when an employer has an immediate need. We also recruit nurse practitioners and physician assistants.",
  },
  {
    q: "Will you tell me the honest picture of a job before I interview?",
    a: "Yes. Our founder is a licensed speech-language pathologist and knows what caseload, productivity and documentation expectations look like in practice. We tell you what we know about the setting, the team and the pay before you spend an evening on an interview.",
  },
];

// Verbatim, with the names, titles and organizations Molly supplied for
// publication (9/17). Do not edit the substance of a quote.
export const TESTIMONIALS: { quote: string; name: string; title: string; org?: string; kind: "client" | "candidate" }[] = [
  {
    quote:
      "Molly was so helpful in finding me a PT! She kept me up to date on her progress, sent weekly updates, and made sure that my expectations were communicated to each and every candidate!",
    name: "Aashir Aggarwal",
    title: "Owner",
    org: "Fyzical Therapy and Balance Centers",
    kind: "client",
  },
  {
    quote:
      "Molly spent a lot of times speaking to me so she could be really clear on the type of SLP we were looking for. She also spent a lot of time speaking to candidates to find a right fit. She found an incredible SLP to add to our team and she is a great match. Molly has great customer service, she's easy to contact, and she really cares about finding the best fit. As a speech language pathologist herself, she really sees the importance of matching the right candidate for the job so that everyone can fulfilled in their work. I highly recommend her.",
    name: "Samara Shalom",
    title: "Speech-Language Pathologist and Practice Owner",
    org: "Speech Leap",
    kind: "client",
  },
  {
    quote:
      "I would highly recommend Molly as a recruiter! She did a fantastic job walking me through each step of the recruitment process as I explored the possibilty of working at my current company. And I'm so glad she did -- I have been thrilled with my experience working with the company so far and I can thank Molly for that! Her diligence making sure I was supported throughout each step of the interview/pre-boarding process was unmatched. Thank you for all you do, Molly. Your hard work does not go unnoticed!",
    name: "Ashley Morrow",
    title: "Speech-Language Pathologist",
    kind: "candidate",
  },
];

// NPPES role keys as they appear in data/markets (docs/DATA_CONTRACT.md).
export type RoleKey = "pt" | "pta" | "ot" | "ota" | "slp" | "aud";

export const ROLE_LABELS: Record<RoleKey, { label: string; plural: string; short: string }> = {
  pt: { label: "Physical therapist", plural: "Physical therapists", short: "PT" },
  pta: { label: "Physical therapist assistant", plural: "Physical therapist assistants", short: "PTA" },
  ot: { label: "Occupational therapist", plural: "Occupational therapists", short: "OT" },
  ota: { label: "Occupational therapy assistant", plural: "Occupational therapy assistants", short: "OTA" },
  slp: { label: "Speech-language pathologist", plural: "Speech-language pathologists", short: "SLP" },
  aud: { label: "Audiologist", plural: "Audiologists", short: "AuD" },
};

export type ProfessionKey = "pt" | "ot" | "slp" | "aud";

export type Profession = {
  key: ProfessionKey;
  label: string;
  plural: string;
  short: string;
  slug: string; // hub page path segment, e.g. physical-therapist-recruiters
  soc: string;
  // Employer-side description, one paragraph.
  description: string;
  // NPPES role keys that roll up into this profession on the hub pages.
  nppesRoles: RoleKey[];
  // Search vocabulary the SERP rewards, used in titles and H2s.
  searchTerms: string[];
};

export const PROFESSIONS: Record<ProfessionKey, Profession> = {
  pt: {
    key: "pt",
    label: "Physical therapist",
    plural: "Physical therapists",
    short: "PT",
    slug: "physical-therapist-recruiters",
    soc: "29-1123",
    description:
      "Physical therapists carry the heaviest caseloads in most rehab departments, and a vacant PT seat shows up in missed visits and lost revenue within weeks. APT Recruiting works as a physical therapy staffing agency for roles: outpatient orthopedics, acute and inpatient rehab, skilled nursing, home health and pediatrics, along with PTAs and the directors of rehab who lead them. Every candidate is screened for the setting, the caseload and the productivity expectation before you see a name.",
    nppesRoles: ["pt", "pta"],
    searchTerms: ["physical therapy staffing agency", "PT recruiter", "physical therapist headhunter"],
  },
  ot: {
    key: "ot",
    label: "Occupational therapist",
    plural: "Occupational therapists",
    short: "OT",
    slug: "occupational-therapist-recruiters",
    soc: "29-1122",
    description:
      "Occupational therapists are scarcer than PTs in most markets and harder to replace when they leave, especially in skilled nursing, home health and pediatrics. APT Recruiting recruits OTs and certified occupational therapy assistants for positions, and screens each one for the population they want to treat, the documentation load they can carry and the schedule that will keep them past the first year.",
    nppesRoles: ["ot", "ota"],
    searchTerms: ["OT headhunter", "occupational therapy recruiter", "OT staffing"],
  },
  slp: {
    key: "slp",
    label: "Speech-language pathologist",
    plural: "Speech-language pathologists",
    short: "SLP",
    slug: "speech-language-pathologist-recruiters",
    soc: "29-1127",
    description:
      "Speech-language pathology is the discipline APT Recruiting's founder practiced, and it is the one where a generalist recruiter does the most damage: an SLP hired for dysphagia in a SNF is not interchangeable with one built for a school caseload. We recruit SLPs for medical, skilled nursing, home health, outpatient, pediatric, school-based and telepractice roles, and we screen for the actual caseload, the CFY supervision question and the swallow-study competencies before a resume reaches you.",
    nppesRoles: ["slp"],
    searchTerms: ["SLP recruiter", "speech-language pathologist staffing", "speech therapy recruiting"],
  },
  aud: {
    key: "aud",
    label: "Audiologist",
    plural: "Audiologists",
    short: "AuD",
    slug: "audiologist-recruiters",
    soc: "29-1181",
    description:
      "Audiologists are the smallest of the four therapy professions and the hardest to source locally: most states license only a few hundred, and a hearing clinic, ENT practice or hospital that loses one often waits months for a replacement. APT Recruiting recruits audiologists for diagnostic, dispensing, pediatric, cochlear implant and hospital-based roles, and works the whole country rather than the local job board.",
    nppesRoles: ["aud"],
    searchTerms: ["audiologist recruiter", "audiology staffing", "audiologist headhunter"],
  },
};

export const PROFESSION_LIST: Profession[] = [PROFESSIONS.pt, PROFESSIONS.ot, PROFESSIONS.slp, PROFESSIONS.aud];

// Care settings with a hub page each. `qcew` names the sector_employment block
// and `facilities` the CMS block that hub can draw national numbers from; the
// school-based hub has neither and is copy plus a CTA.
export type SettingKey = "skilled-nursing" | "home-health" | "outpatient-rehab" | "school-based" | "hospital-rehab";

export type Setting = {
  key: SettingKey;
  slug: string;
  label: string;
  shortLabel: string;
  title: string; // H1
  intro: string;
  qcew: "therapy_offices_naics_62134" | "home_health_naics_6216" | "nursing_facilities_naics_6231" | "hospitals_naics_6221" | null;
  qcewLabel: string | null;
  facilities: "nursing_homes" | "home_health_agencies" | null;
  roles: string[]; // typical titles we fill there
  pains: { title: string; body: string }[];
};

export const SETTINGS: Record<SettingKey, Setting> = {
  "skilled-nursing": {
    key: "skilled-nursing",
    slug: "skilled-nursing-recruiting",
    label: "Skilled nursing and long-term care",
    shortLabel: "Skilled nursing",
    title: "Skilled Nursing Therapy Recruiting: PT, OT & SLP for SNFs",
    intro:
      "Skilled nursing facilities run on therapy minutes, and an open PT, OT or SLP seat is a daily census and reimbursement problem. APT Recruiting is a rehab staffing partner for SNF hires: staff therapists, assistants and directors of rehab who understand PDPM, section GG and the productivity math.",
    qcew: "nursing_facilities_naics_6231",
    qcewLabel: "Nursing and residential care facilities",
    facilities: "nursing_homes",
    roles: ["Director of Rehab", "Staff PT, OT and SLP", "PTA and COTA", "Regional rehab director", "Dysphagia-focused SLP"],
    pains: [
      { title: "Productivity is the honest conversation", body: "We tell candidates the productivity expectation up front, because a therapist who learns it on day one leaves by month three." },
      { title: "Contract therapy vs in-house", body: "Whether you run your own department or a contract therapy company staffs it, we place clinicians into either model." },
      { title: "SLPs who can run a swallow program", body: "A founder who practiced as an SLP screens dysphagia experience directly instead of trusting a resume keyword." },
    ],
  },
  "home-health": {
    key: "home-health",
    slug: "home-health-recruiting",
    label: "Home health",
    shortLabel: "Home health",
    title: "Home Health Therapy Recruiting: PT, OT & SLP for Agencies",
    intro:
      "Home health therapists work alone, drive between visits and document at night, and the ones who stay are the ones who chose the model on purpose. APT Recruiting recruits home health PTs, OTs, SLPs and assistants who want the autonomy, and screens for the territory, the visit expectation and the OASIS load before you meet them.",
    qcew: "home_health_naics_6216",
    qcewLabel: "Home health care services",
    facilities: "home_health_agencies",
    roles: ["Home health PT, OT and SLP", "PTA and COTA (visit-based)", "Rehab manager", "Clinical supervisor", "Per-visit and salaried models"],
    pains: [
      { title: "Territory is the first screen", body: "A therapist who will not drive your territory is not a candidate. We confirm it before the first interview." },
      { title: "Per-visit vs salaried", body: "We present your pay model plainly, so the candidate who reaches you already accepts how the work is paid." },
      { title: "OASIS and start-of-care competence", body: "Experienced home health clinicians are screened for the assessments your agency depends on." },
    ],
  },
  "outpatient-rehab": {
    key: "outpatient-rehab",
    slug: "outpatient-rehab-recruiting",
    label: "Outpatient rehab and private practice",
    shortLabel: "Outpatient",
    title: "Outpatient Rehab Recruiting: PT, OT & SLP for Clinics",
    intro:
      "Outpatient clinics hire on volume and lose therapists on burnout. APT Recruiting works as a therapy recruiting firm for private practices, hospital outpatient departments and multi-site rehab groups: orthopedic and sports PTs, hand therapists, pelvic health, pediatric OTs and SLPs, and the clinic directors who keep a schedule full.",
    qcew: "therapy_offices_naics_62134",
    qcewLabel: "Offices of physical, occupational and speech therapists and audiologists",
    facilities: null,
    roles: ["Outpatient PT and OT", "Certified hand therapist", "Pelvic health PT", "Pediatric OT and SLP", "Clinic director"],
    pains: [
      { title: "Patients-per-day, stated plainly", body: "We tell candidates the visit expectation, the double-booking policy and the aide support before they interview." },
      { title: "Specialty credentials verified", body: "CHT, OCS, SCS, pelvic health and vestibular certifications are confirmed, not assumed." },
      { title: "Owners hire differently", body: "A practice owner needs a clinician who will build a caseload, not just cover one. We screen for that." },
    ],
  },
  "school-based": {
    key: "school-based",
    slug: "school-based-therapy-recruiting",
    label: "Schools and pediatrics",
    shortLabel: "School-based",
    title: "School-Based Therapy Recruiting: SLP, OT & PT for Districts",
    intro:
      "School districts, charter networks and pediatric providers compete for the same speech-language pathologists and occupational therapists every August. APT Recruiting recruits school-based SLPs, OTs and PTs, and the founder's own SLP background means IEP caseloads, evaluation timelines and the CFY question are screened by someone who has lived them.",
    qcew: null,
    qcewLabel: null,
    facilities: null,
    roles: ["School-based SLP", "School OT and PT", "Early intervention therapists", "Bilingual SLP", "Lead therapist and coordinator"],
    pains: [
      { title: "Caseload numbers, not adjectives", body: "We present your caseload size, the number of buildings and the evaluation load in numbers, so the candidate who says yes means it." },
      { title: "CFY and supervision", body: "If you can host a clinical fellow, we say so and screen for the supervision structure. If you cannot, we do not send one." },
      { title: "Timing around the school calendar", body: "Searches are started with the contract date in mind, not the day the resignation lands." },
    ],
  },
  "hospital-rehab": {
    key: "hospital-rehab",
    slug: "hospital-rehab-recruiting",
    label: "Hospitals and acute rehab",
    shortLabel: "Hospital",
    title: "Hospital Rehab Recruiting: Acute Care & Inpatient PT, OT & SLP",
    intro:
      "Acute care and inpatient rehabilitation units need therapists who are comfortable with lines, ventilators, modified barium swallows and a discharge-driven pace. APT Recruiting recruits hospital PTs, OTs, SLPs and audiologists, along with rehab managers and directors, and screens for the acuity and the competencies your unit actually requires.",
    qcew: "hospitals_naics_6221",
    qcewLabel: "General medical and surgical hospitals",
    facilities: null,
    roles: ["Acute care PT, OT and SLP", "Inpatient rehab (IRF) therapists", "Medical SLP with MBSS and FEES", "Rehab manager and director", "Hospital audiologist"],
    pains: [
      { title: "Acuity is screened by a clinician", body: "ICU early mobility, neuro and trauma experience are confirmed in conversation with a licensed SLP, not scanned for on a resume." },
      { title: "Weekend and holiday rotation", body: "We present the rotation up front. A candidate who reaches you already accepts it." },
      { title: "Leadership searches", body: "Directors and managers of rehab are recruited from the whole country, not the local applicant pool." },
    ],
  },
};

export const SETTING_LIST: Setting[] = [
  SETTINGS["hospital-rehab"],
  SETTINGS["skilled-nursing"],
  SETTINGS["home-health"],
  SETTINGS["outpatient-rehab"],
  SETTINGS["school-based"],
];

// Licensure compacts, keyed as they appear in data/markets `compacts`.
export type CompactKey = "pt" | "ot" | "aslp";

export const COMPACTS: Record<
  CompactKey,
  { key: CompactKey; slug: string; name: string; shortName: string; professions: string; site: string; privilegeName: string }
> = {
  pt: {
    key: "pt",
    slug: "pt-compact",
    name: "Physical Therapy Compact",
    shortName: "PT Compact",
    professions: "physical therapists and physical therapist assistants",
    site: "ptcompact.org",
    privilegeName: "compact privilege",
  },
  ot: {
    key: "ot",
    slug: "ot-compact",
    name: "Occupational Therapy Licensure Compact",
    shortName: "OT Compact",
    professions: "occupational therapists and occupational therapy assistants",
    site: "otcompact.gov",
    privilegeName: "compact privilege",
  },
  aslp: {
    key: "aslp",
    slug: "aslp-ic",
    name: "Audiology and Speech-Language Pathology Interstate Compact",
    shortName: "ASLP-IC",
    professions: "audiologists and speech-language pathologists",
    site: "aslpcompact.com",
    privilegeName: "compact privilege",
  },
};

export const COMPACT_LIST = [COMPACTS.pt, COMPACTS.ot, COMPACTS.aslp];
