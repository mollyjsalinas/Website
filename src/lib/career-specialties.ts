import { launchMarkets, marketBySlug, stateSlug, type MetroSnapshot } from "@/lib/markets";

export const CAREER_SPECIALTIES = [
  { slug: "physical-therapist", label: "Physical Therapist", plural: "Physical Therapists", intro: "patient-centered rehabilitation", salary: "physical-therapist" },
  { slug: "occupational-therapist", label: "Occupational Therapist", plural: "Occupational Therapists", intro: "patient-centered rehabilitation", salary: "occupational-therapist" },
  { slug: "speech-language-pathologist", label: "Speech-Language Pathologist", plural: "Speech-Language Pathologists", intro: "communication and swallowing care", salary: "speech-language-pathologist" },
  { slug: "certified-hand-therapist", label: "Certified Hand Therapist", plural: "Certified Hand Therapists", intro: "hand and upper-extremity rehabilitation", salary: "occupational-therapist" },
  { slug: "pelvic-health-therapist", label: "Pelvic Health Therapist", plural: "Pelvic Health Therapists", intro: "pelvic health rehabilitation", salary: "physical-therapist" },
  { slug: "audiologist", label: "Audiologist", plural: "Audiologists", intro: "diagnostic, dispensing, pediatric, and medical audiology", salary: "audiologist" },
  { slug: "nurse-practitioner", label: "Nurse Practitioner", plural: "Nurse Practitioners", intro: "advanced-practice patient care", salary: "nurse-practitioner" },
  { slug: "physician-assistant", label: "Physician Assistant", plural: "Physician Assistants", intro: "advanced-practice patient care", salary: "physician-assistant" },
] as const;

export function careerSpecialtyBySlug(slug: string) {
  return CAREER_SPECIALTIES.find((x) => x.slug === slug);
}
export function careerHref(slug: string, state: string) { return `/career/${slug}/${state}/`; }
export function careerHubHref(slug: string) { return `/career/${slug}/`; }
export function careerCityHref(slug: string, c: Pick<MetroSnapshot, "state" | "city_slug">) { return `/career/${slug}/${stateSlug(c.state)}/${c.city_slug}/`; }
// Career specialties whose pay benchmark is this salary role (PT also covers pelvic health, OT covers hand therapy).
export function careerRolesForSalary(salarySlug: string) { return CAREER_SPECIALTIES.filter((x) => x.salary === salarySlug); }
export function careerParams() {
  return CAREER_SPECIALTIES.flatMap((x) => launchMarkets().map((m) => ({ specialty: x.slug, state: m.market.toLowerCase().replace(/\s+/g, "-") })));
}
export function careerPage(specialty: string, state: string) {
  const role = careerSpecialtyBySlug(specialty); const market = marketBySlug(state);
  return role && market ? { role, market } : undefined;
}