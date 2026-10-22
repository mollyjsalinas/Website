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
  remote?: boolean;
  hold?: string; // why the role is not published yet
};

export const JOBS: Job[] = [
  {
    title: "Physical Therapist — Outpatient Orthopedics",
    slug: "physical-therapist-outpatient-orthopedics-salt-lake-city-ut",
    profession: "pt",
    setting: "outpatient-rehab",
    city: "Salt Lake City",
    state: "UT",
    employmentType: ["FULL_TIME", "PART_TIME"],
    datePosted: "2026-10-22",
    salary: { min: 95000, max: 115000, unit: "YEAR" },
    description:
      "APT Recruiting is representing a confidential outpatient rehabilitation practice in Salt Lake City, UT that is seeking a Physical Therapist. The practice specializes in individualized orthopedic and work-injury rehabilitation, with a strong emphasis on hands-on care, clinical collaboration, and meaningful patient outcomes rather than high-volume productivity.\n\nYou will evaluate and treat a broad range of acute and chronic musculoskeletal conditions using manual therapy, therapeutic exercise, strengthening, and functional rehabilitation. Patient care is exclusively one-on-one: treatment sessions are 60 minutes, evaluations typically range from 30–90 minutes, and there is no double-booking or overlap. You will collaborate with medical providers and other clinical team members, educate patients on recovery and injury prevention, and supervise or partner with PTAs when appropriate.\n\nFull-time and part-time options are available. The standard schedule is Monday–Thursday, creating a four-day workweek with Fridays and weekends off. Part-time schedules can be highly flexible—even as little as one day per week—making this a strong fit whether you are seeking a primary role or additional income.\n\nFull-time compensation is $95,000–$115,000 annually, based on experience. Part-time pay is $45–$60 per hour. The role includes annual compensation increases, additional bonus opportunities, a 401(k) with up to a 4% employer match, separate holiday benefits, negotiable PTO for full-time clinicians, and potential continuing-education reimbursement. Compensation remains consistent when patients cancel or do not attend.\n\nCandidates need active PT licensure in Utah, or eligibility for licensure. New graduates and experienced therapists are encouraged to apply. The ideal clinician has strong assessment and treatment-planning skills, communicates clearly, enjoys hands-on outpatient care, and thrives in a collaborative, patient-centered environment.",
  },
  {
    title: "Physical Therapist — Outpatient Orthopedics",
    slug: "physical-therapist-outpatient-orthopedics-st-george-ut",
    profession: "pt",
    setting: "outpatient-rehab",
    city: "St. George",
    state: "UT",
    employmentType: ["FULL_TIME", "PART_TIME"],
    datePosted: "2026-10-22",
    salary: { min: 95000, max: 115000, unit: "YEAR" },
    description:
      "APT Recruiting is representing a confidential outpatient rehabilitation practice in St. George, UT that is seeking a Physical Therapist. The practice specializes in individualized orthopedic and work-injury rehabilitation, with a strong emphasis on hands-on care, clinical collaboration, and meaningful patient outcomes rather than high-volume productivity.\n\nYou will evaluate and treat a broad range of acute and chronic musculoskeletal conditions using manual therapy, therapeutic exercise, strengthening, and functional rehabilitation. Patient care is exclusively one-on-one: treatment sessions are 60 minutes, evaluations typically range from 30–90 minutes, and there is no double-booking or overlap. You will collaborate with medical providers and other clinical team members, educate patients on recovery and injury prevention, and supervise or partner with PTAs when appropriate.\n\nFull-time and part-time options are available. The standard schedule is Monday–Thursday, creating a four-day workweek with Fridays and weekends off. Part-time schedules can be highly flexible—even as little as one day per week—making this a strong fit whether you are seeking a primary role or additional income.\n\nFull-time compensation is $95,000–$115,000 annually, based on experience. Part-time pay is $45–$60 per hour. The role includes annual compensation increases, additional bonus opportunities, a 401(k) with up to a 4% employer match, separate holiday benefits, negotiable PTO for full-time clinicians, and potential continuing-education reimbursement. Compensation remains consistent when patients cancel or do not attend.\n\nCandidates need active PT licensure in Utah, or eligibility for licensure. New graduates and experienced therapists are encouraged to apply. The ideal clinician has strong assessment and treatment-planning skills, communicates clearly, enjoys hands-on outpatient care, and thrives in a collaborative, patient-centered environment.",
  },
  {
    title: "Physical Therapist — Outpatient Orthopedics",
    slug: "physical-therapist-outpatient-orthopedics-reno-nv",
    profession: "pt",
    setting: "outpatient-rehab",
    city: "Reno",
    state: "NV",
    employmentType: ["FULL_TIME", "PART_TIME"],
    datePosted: "2026-10-22",
    salary: { min: 95000, max: 115000, unit: "YEAR" },
    description:
      "APT Recruiting is representing a confidential outpatient rehabilitation practice in Reno, NV that is seeking a Physical Therapist. This is an upcoming clinic opportunity for a clinician interested in helping establish PT services in a growing market. The practice specializes in individualized orthopedic and work-injury rehabilitation, with a strong emphasis on hands-on care, clinical collaboration, and meaningful patient outcomes rather than high-volume productivity.\n\nYou will evaluate and treat a broad range of acute and chronic musculoskeletal conditions using manual therapy, therapeutic exercise, strengthening, and functional rehabilitation. Patient care is exclusively one-on-one: treatment sessions are 60 minutes, evaluations typically range from 30–90 minutes, and there is no double-booking or overlap. You will collaborate with medical providers and other clinical team members, educate patients on recovery and injury prevention, and supervise or partner with PTAs when appropriate.\n\nFull-time and part-time options are available. The standard schedule is Monday–Thursday, creating a four-day workweek with Fridays and weekends off. Part-time schedules can be highly flexible—even as little as one day per week—making this a strong fit whether you are seeking a primary role or additional income.\n\nFull-time compensation is $95,000–$115,000 annually, based on experience. Part-time pay is $45–$60 per hour. The role includes annual compensation increases, additional bonus opportunities, a 401(k) with up to a 4% employer match, separate holiday benefits, negotiable PTO for full-time clinicians, and potential continuing-education reimbursement. Compensation remains consistent when patients cancel or do not attend.\n\nCandidates need active PT licensure in Nevada, or eligibility for licensure. New graduates and experienced therapists are encouraged to apply. The ideal clinician has strong assessment and treatment-planning skills, communicates clearly, enjoys hands-on outpatient care, and thrives in a collaborative, patient-centered environment.",
  },
  {
    title: "Pediatric Occupational Therapist",
    slug: "pediatric-occupational-therapist-kansas-city-ks",
    profession: "ot",
    setting: "outpatient-rehab",
    city: "Kansas City",
    state: "KS",
    employmentType: ["FULL_TIME", "PART_TIME"],
    datePosted: "2026-10-22",
    salary: { min: 80000, max: 130000, unit: "YEAR" },
    description:
      "APT Recruiting is representing a confidential pediatric therapy practice in the Kansas City, Kansas metro area that is seeking an Occupational Therapist. This is an excellent opportunity for an OT who enjoys working with young children, values flexibility, and wants to step into an established caseload rather than build one from scratch.\n\nYou will provide individualized occupational therapy for children ages 3–6, including many children with autism spectrum disorder and developmental needs. Care is one-on-one, with 30–60-minute treatment sessions and approximately 90-minute evaluations. You will collaborate with a multidisciplinary pediatric team, manage your daily caseload within clinic hours, and deliver child-centered treatment that supports meaningful progress.\n\nBoth full-time and part-time schedules are available, with the freedom to choose your hours, shape daily patient volume, and align your caseload with your professional and income goals. The clinic operates weekdays with no weekend requirement, and streamlined systems are designed to reduce unnecessary documentation burden.\n\nCompensation is $80,000–$130,000+ annually, depending on schedule, experience, and caseload. The role also offers annual compensation increases, ongoing professional development, and the potential to grow into clinical leadership as the program expands.\n\nCandidates need OT licensure in Kansas, or eligibility for licensure. The ideal clinician is passionate about pediatric care, comfortable working with children with autism, communicates clearly, collaborates well, and is excited to provide individualized therapy in a supportive environment.",
  },
  {
    title: "Pediatric Occupational Therapist",
    slug: "pediatric-occupational-therapist-kansas-city-mo",
    profession: "ot",
    setting: "outpatient-rehab",
    city: "Kansas City",
    state: "MO",
    employmentType: ["FULL_TIME", "PART_TIME"],
    datePosted: "2026-10-22",
    salary: { min: 80000, max: 130000, unit: "YEAR" },
    description:
      "APT Recruiting is representing a confidential pediatric therapy practice in the Kansas City, Missouri metro area that is seeking an Occupational Therapist. This is an excellent opportunity for an OT who enjoys working with young children, values flexibility, and wants to step into an established caseload rather than build one from scratch.\n\nYou will provide individualized occupational therapy for children ages 3–6, including many children with autism spectrum disorder and developmental needs. Care is one-on-one, with 30–60-minute treatment sessions and approximately 90-minute evaluations. You will collaborate with a multidisciplinary pediatric team, manage your daily caseload within clinic hours, and deliver child-centered treatment that supports meaningful progress.\n\nBoth full-time and part-time schedules are available, with the freedom to choose your hours, shape daily patient volume, and align your caseload with your professional and income goals. The clinic operates weekdays with no weekend requirement, and streamlined systems are designed to reduce unnecessary documentation burden.\n\nCompensation is $80,000–$130,000+ annually, depending on schedule, experience, and caseload. The role also offers annual compensation increases, ongoing professional development, and the potential to grow into clinical leadership as the program expands.\n\nCandidates need Missouri OT licensure, or eligibility for licensure. The ideal clinician is passionate about pediatric care, comfortable working with children with autism, communicates clearly, collaborates well, and is excited to provide individualized therapy in a supportive environment.",
  },
  {
    title: "Pediatric Speech-Language Pathologist (SLP) / SLPA",
    slug: "pediatric-speech-language-pathologist-kansas-city-ks",
    profession: "slp",
    setting: "outpatient-rehab",
    city: "Kansas City",
    state: "KS",
    employmentType: ["FULL_TIME", "PART_TIME"],
    datePosted: "2026-10-22",
    salary: { min: 80000, max: 130000, unit: "YEAR" },
    description:
      "APT Recruiting is representing a confidential pediatric therapy practice in the Kansas City, Kansas metro area that is seeking a Speech-Language Pathologist or Speech-Language Pathology Assistant. This is an excellent opportunity for a pediatric clinician who values flexibility, individualized care, and the ability to join an established caseload.\n\nYou will provide one-on-one speech-language therapy for children ages 3–6, including many children with autism spectrum disorder and developmental needs. Care includes 30–60-minute treatment sessions, approximately 90-minute evaluations, and close collaboration with a multidisciplinary pediatric team. You will manage your daily caseload within clinic hours and deliver thoughtful, child-centered intervention.\n\nBoth full-time and part-time schedules are available, with the freedom to choose your hours, shape daily patient volume, and align your caseload with your professional and income goals. The clinic operates weekdays with no weekend requirement, and streamlined systems are designed to reduce unnecessary documentation burden.\n\nCompensation is $80,000–$130,000+ annually, depending on schedule, experience, and caseload. The role also offers annual compensation increases, ongoing professional development, and potential leadership opportunities as the program expands.\n\nCandidates need Kansas SLP licensure, or eligibility for licensure; qualified SLPAs are also welcome. The ideal clinician has an interest in pediatric care, is comfortable supporting children with autism, communicates clearly, collaborates well, and is committed to individualized, family-centered therapy.",
  },
  {
    title: "Pediatric Speech-Language Pathologist",
    slug: "pediatric-speech-language-pathologist-yulee-fl",
    profession: "slp",
    setting: "outpatient-rehab",
    city: "Yulee",
    state: "FL",
    employmentType: ["FULL_TIME"],
    datePosted: "2026-10-22",
    description:
      "APT Recruiting is representing a confidential pediatric therapy practice in Yulee, Florida that is seeking a dedicated Speech-Language Pathologist. This is an excellent opportunity for a clinician who is passionate about pediatric care and wants a stable, collaborative environment with clinical autonomy and a genuine focus on work-life balance.\n\nYou will provide individualized speech-language services to children and work alongside an interdisciplinary therapy team to support meaningful progress for patients and their families. Pediatric and early-intervention experience is preferred, and the ideal candidate communicates clearly, collaborates well, and brings a compassionate, family-centered approach to care.\n\nThe practice uses a one-on-one care model with a consistent caseload and strong attendance. Full-time is defined as 36 hours per week, typically Monday–Thursday from 8:00 AM to 5:30 PM with a 30-minute lunch. Clinicians may choose an additional Friday morning shift to reach 40 hours, creating flexibility around the schedule that best supports their life and practice.\n\nThe role includes a $100 weekly documentation stipend and paid time designated for preparing treatment spaces, so important clinical work is recognized beyond direct patient visits. Benefits include a 401(k) with employer match, a $200 annual CEU credit, and license reimbursement.\n\nCandidates need a master's degree in Speech-Language Pathology and active Florida SLP licensure. This is a strong fit for an SLP who wants to grow in a supportive pediatric setting while providing quality, relationship-centered care.",
  },
  {
    title: "Occupational Therapist or Physical Therapist — Manual Therapy",
    slug: "occupational-therapist-physical-therapist-manual-therapy-keene-nh",
    profession: "pt",
    setting: "outpatient-rehab",
    city: "Keene",
    state: "NH",
    employmentType: ["PART_TIME"],
    datePosted: "2026-10-22",
    salary: { min: 45, max: 60, unit: "HOUR" },
    description:
      "APT Recruiting is representing a confidential specialized outpatient manual-therapy practice in Keene, New Hampshire that is seeking an Occupational Therapist or Physical Therapist. This part-time opportunity is ideal for a clinician who loves hands-on treatment and wants to step away from a rushed, high-volume setting in favor of individualized, quality-focused care.\n\nYou will provide one-on-one manual therapy and myofascial release treatment in private rooms, with 50–60-minute visits that give you the time to connect with patients and personalize care. Experience with myofascial release is welcomed but not required: clinicians with a genuine interest in developing these skills will receive hands-on mentorship and training from an experienced practitioner.\n\nThe position starts at approximately 20 hours per week with a flexible daytime and evening schedule, including a preference for one or two evenings weekly. There are no required weekends, and the role may grow into full-time employment as the caseload develops. You will work independently while collaborating with a small, supportive clinical team.\n\nCompensation is $45–$60 per hour based on experience and qualifications. Benefits include annual raises, license-renewal assistance, a 401(k) with employer match, and opportunities to earn CEUs through in-house training. Health and dental coverage are available for part-time staff with employee-paid premiums; clinicians who move into a qualifying full-time schedule receive an employer contribution plus PTO eligibility and additional continuing-education support.\n\nCandidates need OT or PT licensure in New Hampshire, or eligibility for licensure. Manual-therapy or myofascial-release experience is preferred, but newer therapists with strong hands-on skills and an eagerness to learn are encouraged to apply. The ideal clinician is comfortable working independently, values individualized patient care, and enjoys collaborating with a supportive team.",
  },
  {
    title: "Pediatric Occupational Therapist",
    slug: "pediatric-occupational-therapist-chandler-az",
    profession: "ot",
    setting: "outpatient-rehab",
    city: "Chandler",
    state: "AZ",
    employmentType: ["FULL_TIME"],
    datePosted: "2026-10-22",
    salary: { min: 90000, max: 115000, unit: "YEAR" },
    description:
      "APT Recruiting is representing a confidential, family-centered pediatric therapy practice in Chandler, Arizona that is seeking a full-time Occupational Therapist. This is a rare opportunity for a clinician who wants to make a meaningful difference for children while enjoying realistic productivity expectations, paid time for nonclinical work, and a real voice in an expanding OT service.\n\nYou will provide engaging, individualized occupational therapy for children and adolescents with needs that may include autism spectrum disorder, developmental challenges, and functional skill development. Services are delivered primarily in an outpatient setting, with occasional community-based school visits. You will collaborate with families and fellow therapists to support each child's progress and create thoughtful, individualized plans of care.\n\nThe role is intentionally designed around sustainable practice: only 50% productivity is expected, or about 20 hours of direct patient care each week. The remaining time is paid and reserved for documentation, treatment planning, care coordination, and program-building work—so you can focus on quality without a packed back-to-back schedule.\n\nCompensation is $90,000–$115,000 annually, negotiable based on experience. Benefits include health, dental, and vision insurance; a 401(k); paid holidays; PTO and additional sick time; paid CEUs; license-renewal support; professional training; and opportunities for specialty certification. The schedule is primarily Monday–Friday, with potential for a four-day workweek or another flexible arrangement.\n\nCandidates need Arizona OT licensure, or eligibility for licensure. Pediatric experience is preferred, but confident, motivated new graduates are encouraged to apply. The ideal clinician is a clear communicator, works well with children and families, takes initiative, and is excited to help grow a patient-centered pediatric OT program.",
  },
  {
    title: "Speech-Language Pathologist / Clinical Fellow",
    slug: "speech-language-pathologist-clinical-fellow-batesville-ar",
    profession: "slp",
    setting: "outpatient-rehab",
    city: "Batesville",
    state: "AR",
    employmentType: ["FULL_TIME", "PART_TIME", "PER_DIEM", "CONTRACTOR"],
    datePosted: "2026-10-22",
    salary: { min: 45, max: 69, unit: "HOUR" },
    description:
      "APT Recruiting is representing a confidential pediatric early-intervention and developmental day-treatment program in Batesville, Arkansas that is seeking Speech-Language Pathologists and Clinical Fellows. This distinctive setting combines individualized therapy with a preschool-style environment, giving clinicians the opportunity to support children throughout meaningful daily routines instead of relying solely on traditional appointment-based care.\n\nYou will provide evidence-based pediatric speech-language services for children with developmental delays and complex communication needs. Clinical work may include receptive and expressive language, articulation and speech-sound disorders, AAC, feeding therapy, functional communication, and social participation. Treatment is primarily one-on-one and can be integrated into classroom activities and natural daily environments, helping skills carry over beyond the therapy room.\n\nThe care model is relationship-centered and neuroaffirming, with an emphasis on sensory integration, understanding the reasons behind behavior, and adapting the environment to support each child. You will collaborate with caregivers, educators, nurses, and fellow rehabilitation professionals while retaining the clinical reasoning and flexibility to tailor interventions to individual needs.\n\nCompensation is $45–$69 per billable-hour equivalent, based on pediatric experience, selected weekly billable-hours target, and annual work schedule. Additional evaluation pay, productivity bonuses, a potential sign-on bonus, and individualized relocation assistance may be available. Eligible full-time clinicians receive employer-subsidized medical coverage, optional dental and vision insurance, elective life and disability benefits, professional liability coverage, license-renewal reimbursement, and continuing-education support.\n\nThe weekday schedule is flexible, with full-time, part-time, PRN, and contract options available and no weekend requirement. Clinicians have input into their daily hours, billable-hours target, and annual work schedule, with possible condensed-workweek arrangements. Salaried clinicians maintain established pay during patient absences, subject to agreed productivity expectations.\n\nCandidates need a master's degree in Speech-Language Pathology or Communication Sciences and Disorders and active Arkansas licensure, or eligibility for licensure. Pediatric experience is preferred, particularly with developmental disabilities, autism, feeding, AAC, or early intervention. New graduates and Clinical Fellows are welcome: experienced SLPs provide supervision, mentorship, and clinical support. This is an excellent fit for a compassionate, collaborative clinician who wants to grow in pediatric practice while making a tangible difference for children and families.",
  },
  {
    title: "Pediatric Speech-Language Pathologist",
    slug: "pediatric-speech-language-pathologist-pelham-al",
    profession: "slp",
    setting: "outpatient-rehab",
    city: "Pelham",
    state: "AL",
    employmentType: ["FULL_TIME", "CONTRACTOR"],
    datePosted: "2026-10-22",
    salary: { min: 65000, max: 70000, unit: "YEAR" },
    description:
      "APT Recruiting is representing a confidential pediatric outpatient therapy practice in the Birmingham area that is seeking an experienced Speech-Language Pathologist. This role is a rewarding fit for an SLP who values individualized care, meaningful family relationships, clinical independence, and a stable, supportive setting. Full-time W-2 employment is preferred, with contract consideration for the right clinician.\n\nYou will conduct comprehensive pediatric speech-language evaluations, create evidence-based treatment plans, provide intervention for speech, language, and communication needs, monitor progress, and partner with caregivers to help children reach functional goals. Treatment is entirely one-on-one, with no co-treatment, so each child receives your full attention.\n\nThe practice offers a predictable weekday schedule with no weekends, including an early Friday finish. A typical day is capped at 12 patients, with 30-minute visits, built-in breaks, and 60–90-minute evaluations. Dedicated documentation time is scheduled each week, and salaried clinicians receive consistent pay when patients cancel or caseloads fluctuate. Administrative staff handle scheduling, insurance verification, and authorizations, letting you focus on clinical care.\n\nCompensation starts at $65,000–$70,000+ annually depending on experience, with a substantial sign-on bonus available for qualified candidates. Eligible salaried employees receive medical, dental, and vision coverage with an employer premium contribution; a retirement plan with employer match; employer-paid life and disability insurance; generous vacation and sick leave; paid holidays and seasonal closure time; CEU support and professional-development days; licensure and ASHA reimbursement; and resources for specialty training and therapy materials.\n\nCandidates need a master's degree in Speech-Language Pathology, active Alabama SLP licensure, and pediatric SLP experience. The ideal clinician brings strong clinical reasoning, communicates warmly with children and families, works independently, and contributes positively to a collaborative team.",
  },
  {
    title: "Physical Therapist — Outpatient Orthopedics",
    slug: "physical-therapist-outpatient-orthopedics-mountlake-terrace-wa",
    profession: "pt",
    setting: "outpatient-rehab",
    city: "Mountlake Terrace",
    state: "WA",
    employmentType: ["FULL_TIME", "PART_TIME"],
    datePosted: "2026-10-22",
    salary: { min: 88000, max: 110000, unit: "YEAR" },
    description:
      "APT Recruiting is representing a confidential outpatient orthopedic practice in the North Seattle area that is seeking a Physical Therapist. This opportunity is designed for a clinician who wants exceptional patient care, clinical autonomy, and a sustainable workweek without double-booking or high-volume productivity pressure. Full-time is preferred, with part-time consideration for the right candidate.\n\nYou will evaluate and treat primarily active adult patients with musculoskeletal injuries and orthopedic conditions. Your work will include individualized treatment planning, manual therapy, therapeutic exercise, strength training, functional movement, patient education, and progress monitoring. Visits are one-on-one, including 45-minute evaluations and treatment sessions, so you can focus fully on each patient and their functional goals.\n\nThe preferred schedule is four 10-hour days, with a consistent weekday off; alternative eight-hour shifts may be considered. Each 10-hour day includes a full hour of paid administrative and documentation time, and dedicated administrative staff manage scheduling, insurance verification, and authorizations.\n\nCompensation is $88,000–$110,000 annually based on experience, plus a $2,000 sign-on bonus and quarterly productivity-bonus opportunities of up to $6,000 annually. Benefits include medical, dental, and vision insurance; a 401(k) with up to a 3.5% employer match; paid vacation and sick leave; employer-paid license renewal; unlimited director-approved continuing education; a professional education platform subscription; and financial support for approved specialty certifications, including a bonus for certifications earned during employment.\n\nNew graduates will receive a gradual caseload ramp-up, weekly mentorship, monthly group mentoring, and guidance from experienced clinicians. Experienced PTs will have the autonomy to practice independently, opportunities to mentor others, support for advanced training, and potential pathways into clinic leadership. Candidates need a DPT or master's degree in Physical Therapy and current Washington licensure, or eligibility for licensure. Dry-needling experience is welcome but not required.",
  },
  {
    title: "Remote Speech-Language Pathologist",
    slug: "remote-speech-language-pathologist-texas",
    profession: "slp",
    setting: "outpatient-rehab",
    city: "Remote",
    state: "TX",
    remote: true,
    employmentType: ["FULL_TIME"],
    datePosted: "2026-10-22",
    salary: { min: 45, max: 55, unit: "HOUR" },
    description:
      "APT Recruiting is representing a confidential, fully virtual specialty practice that is seeking an experienced Speech-Language Pathologist licensed in Texas. This W-2, work-from-home opportunity is ideal for a clinically curious SLP who wants to provide highly individualized care while deepening expertise in orofacial myofunctional, oral-motor, feeding, and airway-focused therapy.\n\nYour work may include orofacial myofunctional therapy; oral-motor and feeding therapy; speech treatment; tongue-tie, breathing, and airway-related concerns; TMJ-related needs; sleep and airway health; and early-intervention care. You will use your knowledge of anatomy, physiology, and muscle function to develop thoughtful treatment plans and help patients and families understand the reasoning behind recommendations.\n\nThe practice offers true remote flexibility alongside strong clinical support: weekly team meetings for case collaboration, extensive digital treatment resources, AI-assisted documentation, and the autonomy to apply your clinical judgment. Paid onboarding, observation, and documentation time help you get established and keep your focus on patient care.\n\nCompensation is $45–$55 per hour, based on experience, plus a $2,000 sign-on bonus for full-time clinicians. You will be paid for scheduled time when patients cancel or do not attend. Benefits include PTO, a $200 monthly wellness stipend, up to $1,000 per year in CEU reimbursement, paid state licenses and renewals, and financial support for approved specialty certifications.\n\nCandidates need Texas SLP licensure, or eligibility for licensure, as well as experience in orofacial myofunctional and oral-motor/feeding therapy. The ideal clinician is a clear communicator, independent and dependable, comfortable with remote technology, and interested in a long-term role with a growing specialty practice. Multi-state licensure is a plus.",
  },
  {
    title: "Pediatric Occupational Therapist",
    slug: "pediatric-occupational-therapist-tumwater-wa",
    profession: "ot",
    setting: "outpatient-rehab",
    city: "Tumwater",
    state: "WA",
    employmentType: ["FULL_TIME"],
    datePosted: "2026-10-22",
    salary: { min: 50, max: 65, unit: "HOUR" },
    description:
      "APT Recruiting is representing a confidential outpatient pediatric therapy practice in Tumwater, Washington that is seeking a full-time Occupational Therapist. This is a thoughtful, clinician-centered opportunity for a pediatric OT who wants exceptional support, flexibility, and the time to provide meaningful care to children and their families.\n\nYou will deliver individualized occupational therapy for children from birth through age 21, with occasional adult care. Your caseload may include autism spectrum disorder, ADHD, sensory-processing needs, fine-motor and developmental delays, visual-motor concerns, and functional-skill development. You will work in a well-equipped treatment environment and collaborate with experienced OT and speech-language pathology colleagues, including interdisciplinary co-treatment when it benefits the child.\n\nThe schedule is built for genuine work-life balance. This is a 40-hour role with the option of four 10-hour days, five 8-hour days, or another mutually agreeable arrangement. Documentation time and special-project time are intentionally built into the schedule, and hourly pay is guaranteed even when a patient cancels or does not attend.\n\nCompensation is $50–$65 per hour ($104,000–$135,200 annually based on a full-time schedule), plus productivity-bonus opportunities. Benefits include employer coverage of 90% of health-insurance premiums, dental and vision insurance, a 401(k), PTO that grows with tenure, continuing-education assistance, and support for professional-license renewals.\n\nApplicants need current Washington OT licensure, or eligibility for licensure, along with pediatric therapy experience. Both seasoned clinicians and new graduate pediatric OTs are encouraged to apply. The ideal candidate is a clear communicator, collaborates well with families and teammates, and is excited to bring creativity and clinical expertise to a quality-first pediatric setting.",
  },
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
    title: "Occupational Therapist — Hand & Upper Extremity Therapy",
    slug: "occupational-therapist-hand-upper-extremity-campbell-ca",
    profession: "ot",
    setting: "outpatient-rehab",
    city: "Campbell",
    state: "CA",
    employmentType: ["FULL_TIME"],
    datePosted: "2026-10-22",
    salary: { min: 104000, max: 128000, unit: "YEAR" },
    description:
      "APT Recruiting is representing a confidential, established specialty outpatient practice in Campbell, California that is seeking a full-time Occupational Therapist. This is a strong opportunity for an OT who wants to build a long-term career in hand therapy and complex upper-extremity rehabilitation while delivering individualized, high-quality care.\n\nYou will focus on shoulder, elbow, wrist, and hand rehabilitation in a specialty clinical environment. Care is primarily one-on-one, with no routine double-booking, giving you the time to apply sound clinical reasoning, build strong patient relationships, and develop thoughtful treatment plans.\n\nThe practice offers a collaborative learning environment with experienced hand-therapy colleagues, robust mentorship, and hands-on training for clinicians who want to deepen their expertise. This role is well suited to an OT who values both clinical growth and a team-oriented setting.\n\nCompensation is $104,000–$128,000 annually, based on experience and skills, with performance-based incentive opportunities. Benefits include medical, dental, and vision insurance; a 401(k) with employer match; paid holidays; PTO that grows with tenure; an annual continuing-education allowance of $1,000 or more; and support for licensure and professional memberships.\n\nCandidates need active California OT licensure. One or more years of hand-therapy experience is preferred, but motivated OTs with relevant fieldwork and a strong interest in hand and upper-extremity therapy are encouraged to apply. The ideal clinician is communicative, team-oriented, and eager to keep growing in this specialty.",
  }
];

export function liveJobs(today: string = new Date().toISOString().slice(0, 10)): Job[] {
  return JOBS.filter((j) => !j.hold && (!j.validThrough || j.validThrough >= today));
}

export function jobBySlug(slug: string): Job | undefined {
  return liveJobs().find((j) => j.slug === slug);
}
