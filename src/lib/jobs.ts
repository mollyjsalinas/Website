import type { ProfessionKey, SettingKey } from "@/lib/site";

// Live openings, from Molly's questionnaire reply (2026-09-17). Each entry becomes
// /jobs/<slug>/ with JobPosting JSON-LD, and the /jobs/ index and sitemap read
// from here. ⛔ Never add a placeholder job: an invented posting with JobPosting
// schema is the one kind of placeholder Google penalises. A role with an open
// question for Molly carries `hold` and stays unpublished until she answers.
export type EmploymentType = "FULL_TIME" | "PART_TIME" | "CONTRACTOR" | "PER_DIEM";

export type Job = {
  title: string;
  slug: string;
  profession: ProfessionKey;
  setting: SettingKey;
  city: string;
  state: string; // two-letter abbreviation
  employmentType: EmploymentType[];
  description: string; // plain text, a few paragraphs separated by blank lines
  datePosted: string; // ISO date
  validThrough?: string; // ISO date; once past, the role drops out of the registry
  salary?: { min: number; max: number; unit: "YEAR" | "HOUR" };
  hold?: string; // why the role is not published yet
};

export const JOBS: Job[] = [
  {
    title: "Physical Therapist — Orthopedic & Injury Rehabilitation",
    slug: "physical-therapist-orthopedic-injury-rehabilitation-colorado",
    profession: "pt",
    setting: "outpatient-rehab",
    city: "Thornton & Fort Collins",
    state: "CO",
    employmentType: ["FULL_TIME"],
    datePosted: "2026-10-22",
    salary: { min: 130000, max: 150000, unit: "YEAR" },
    description:
      "APT Recruiting is representing a confidential, quality-focused outpatient rehabilitation practice in Colorado that is seeking a full-time Physical Therapist. This is a multi-site opportunity serving the Thornton and Fort Collins areas for a clinician who wants to pair high-level compensation with individualized, hands-on patient care.\n\nYou will treat patients with orthopedic and injury-related conditions, including spine and neck injuries, shoulder concerns, joint and soft-tissue injuries, pain, mobility limitations, and other musculoskeletal needs. Care may include manual therapy, therapeutic exercise, strengthening and stabilization, mobility and range-of-motion restoration, dry needling, shockwave therapy, and blood-flow-restriction therapy.\n\nThe practice is built around a one-on-one, patient-first care model: evaluations are approximately 60 minutes and follow-up visits are typically 30–40 minutes. You will have the clinical autonomy and pace to build strong patient relationships, deliver thoughtful treatment plans, and focus on meaningful functional outcomes rather than high-volume scheduling.\n\nCandidates need a DPT or master’s degree in Physical Therapy and current Colorado PT licensure, or eligibility for licensure. The ideal clinician is confident practicing independently, communicates clearly, and brings orthopedic, sports medicine, or injury-rehabilitation experience. Familiarity with dry needling, shockwave therapy, or BFR is especially valued.\n\nCompensation is $130,000–$150,000 annually, plus a full benefits package. This is an excellent next step for a PT looking for a polished outpatient setting, advanced treatment options, and the space to deliver personal, high-quality care.",
  },
  {
    title: "Certified Hand Therapist (OT or PT)",
    slug: "certified-hand-therapist-salem-or",
    profession: "ot",
    setting: "outpatient-rehab",
    city: "Salem",
    state: "OR",
    employmentType: ["FULL_TIME"],
    datePosted: "2026-10-22",
    salary: { min: 60, max: 68, unit: "HOUR" },
    description:
      "APT Recruiting is representing a confidential outpatient hand therapy practice in Salem, Oregon that is seeking a Certified Hand Therapist (CHT). This full-time, Monday–Friday role is open to an Occupational Therapist or Physical Therapist with CHT certification who wants to provide individualized, one-on-one care for patients with upper-extremity conditions.\n\nYou will evaluate and treat patients, build personalized treatment plans, collaborate with referring providers and fellow healthcare professionals, and contribute to a small, supportive clinical team. The practice offers a patient-centered environment, a strong referral base, and room for professional growth and future leadership.\n\nRequired qualifications include an active CHT credential and current OT or PT licensure, or eligibility for Oregon licensure. A qualifying master’s or doctoral degree is required. Two or more years of relevant clinical experience is preferred, along with sound clinical reasoning, clear communication, and the ability to practice independently.\n\nCompensation is $60–$68 per hour ($124,000–$141,440 annually, based on a full-time schedule), plus a sign-on bonus. Benefits include medical, dental and vision coverage; a monthly employer health-insurance contribution; 120 hours of annual paid time off; paid holidays; a 401(k) with up to a 4% employer match; a $2,500 continuing-education allowance; license-renewal support; and wellness benefits.",
  },
  {
    title: "Senior Physical Therapist",
    slug: "senior-physical-therapist-woodbridge-va",
    profession: "pt",
    setting: "outpatient-rehab",
    city: "Woodbridge",
    state: "VA",
    employmentType: ["FULL_TIME"],
    datePosted: "2026-08-31",
    salary: { min: 90000, max: 110000, unit: "YEAR" },
    description:
      "A new outpatient physical therapy clinic in Woodbridge, VA is seeking a motivated Physical Therapist to join its founding clinical team. This is an opportunity to help build and shape a practice from the ground up while enjoying clinical autonomy, individualized patient care, and a low-volume treatment model focused on quality rather than productivity.\n\nThe position offers $90,000–$110,000 in salary, up to $6,000 in bonus potential, benefits, paid continuing education, AI-assisted documentation, paid documentation time, no weekends, and opportunities for future leadership and specialty training. Full-time is preferred, with part-time and a four-day, 10-hour schedule potentially available for the right candidate.",
  },
  {
    title: "Entry-Level Physical Therapist",
    slug: "entry-level-physical-therapist-houston-tx",
    profession: "pt",
    setting: "outpatient-rehab",
    city: "Houston",
    state: "TX",
    employmentType: ["FULL_TIME"],
    datePosted: "",
    salary: { min: 70000, max: 90000, unit: "YEAR" },
    hold: "Molly listed the opened date as 'Always Hiring'; JobPosting needs a real datePosted.",
    description:
      "Launch your physical therapy career with a well-established outpatient clinic in Houston, TX that has been providing exceptional patient care for over 20 years. This collaborative practice offers exposure to a diverse patient population, including young athletes, post-operative, VA, and geriatric patients, while providing access to specialized services such as aquatic and sports rehabilitation, pelvic floor therapy, vestibular rehabilitation, dry needling, FSTM, and orthopedic care.\n\nThe position offers competitive compensation with performance bonuses, an optional four-day workweek, continuing education support, medical, dental and vision insurance, 401(k) with employer match, paid time off, and meaningful mentorship and long-term career growth opportunities. This position is always hiring.",
  },
  {
    title: "Physical Therapist (DPT or PTA)",
    slug: "physical-therapist-framingham-ma",
    profession: "pt",
    setting: "outpatient-rehab",
    city: "Framingham",
    state: "MA",
    employmentType: ["FULL_TIME", "PART_TIME"],
    datePosted: "2026-07-01",
    salary: { min: 80000, max: 100000, unit: "YEAR" },
    description:
      "Join a thriving, patient-centered outpatient physical therapy practice in Framingham, MA that is growing its multidisciplinary team and investing in the long-term success of its clinicians. This practice offers one-on-one treatment sessions, dedicated paid documentation time, and a collaborative environment with opportunities to work across orthopedic and sports rehabilitation, vestibular and balance therapy, pelvic health, hand therapy, and wellness services for patients of all ages.\n\nThe position offers an $80,000–$100,000 salary, performance-based bonuses, annual merit raises, 15 days of PTO plus 11 paid holidays, 401(k) match, tuition reimbursement, medical and dental insurance, continuing education support, and opportunities for mentorship, professional development, and future leadership.",
  },
  {
    title: "Senior Physical Therapist",
    slug: "senior-physical-therapist-pearland-tx",
    profession: "pt",
    setting: "outpatient-rehab",
    city: "Pearland",
    state: "TX",
    employmentType: ["FULL_TIME"],
    datePosted: "2026-08-31",
    salary: { min: 90000, max: 110000, unit: "YEAR" },
    description:
      "A new outpatient physical therapy clinic in Pearland, TX is seeking a motivated Physical Therapist to join its founding clinical team. This is an opportunity to help build and shape a practice from the ground up while enjoying clinical autonomy, individualized patient care, and a low-volume treatment model focused on quality rather than productivity.\n\nThe position offers $90,000–$110,000 in salary, up to $5,000 in bonus potential, AI-assisted documentation, paid documentation time, no weekends, and opportunities for future leadership and specialty training. Full-time is preferred, with part-time and per diem available for the right candidate.",
  },
  {
    title: "Speech-Language Pathologist",
    slug: "speech-language-pathologist-huntsville-tx",
    profession: "slp",
    setting: "outpatient-rehab",
    city: "Huntsville",
    state: "TX",
    employmentType: ["FULL_TIME"],
    datePosted: "2026-08-19",
    salary: { min: 36, max: 57, unit: "HOUR" },
    description:
      "Join a privately owned pediatric speech therapy clinic in Huntsville, TX founded by two SLPs who understand firsthand what clinicians need to thrive in their careers. This full-time opportunity offers an exceptionally flexible schedule, allowing you to choose your own hours, including the option to work four 10-hour days, while providing individualized evaluations and therapy to pediatric clients and building meaningful relationships with children and their families.\n\nThe position offers $36–$57/hour ($74,880–$118,560 annually based on experience), health, dental and vision insurance, life insurance, PTO, retirement benefits, CEU support, professional growth opportunities, and a supportive team environment focused on quality patient care and clinician flexibility.",
  },
  {
    title: "Occupational Therapist, CHT (Hand & Upper Extremity)",
    slug: "occupational-therapist-cht-campbell-ca",
    profession: "ot",
    setting: "outpatient-rehab",
    city: "Campbell",
    state: "CA",
    employmentType: ["FULL_TIME"],
    datePosted: "2026-07-28",
    salary: { min: 104000, max: 128960, unit: "YEAR" },
    hold: "Location says Campbell, CA but the description says San Jose, CA; confirm with Molly.",
    description:
      "Join a well-established and growing specialty practice in San Jose, CA focused exclusively on shoulder, elbow, wrist, and hand rehabilitation. This full-time opportunity offers primarily one-on-one patient care with no routine double-booking, the chance to work with professional athletes, and the opportunity to learn alongside experienced hand therapists and surgeons through strong mentorship and hands-on training.\n\nThe position offers $104,000–$128,960 annually, medical, dental and vision insurance, 401(k) with employer match, generous PTO, paid holidays, performance-based incentives, and an annual CE allowance with support for licensing and professional memberships.",
  },
];

export function liveJobs(today: string = new Date().toISOString().slice(0, 10)): Job[] {
  return JOBS.filter((j) => !j.hold && (!j.validThrough || j.validThrough >= today));
}

export function jobBySlug(slug: string): Job | undefined {
  return liveJobs().find((j) => j.slug === slug);
}
