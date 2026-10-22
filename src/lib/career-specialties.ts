import { launchMarkets, marketBySlug } from "@/lib/markets";

export const CAREER_SPECIALTIES = [
  { slug: "certified-hand-therapist", label: "Certified Hand Therapist", plural: "Certified Hand Therapists", intro: "hand and upper-extremity rehabilitation", salary: "occupational-therapist" },
  { slug: "pelvic-health-therapist", label: "Pelvic Health Therapist", plural: "Pelvic Health Therapists", intro: "pelvic health rehabilitation", salary: "physical-therapist" },
  { slug: "audiologist", label: "Audiologist", plural: "Audiologists", intro: "diagnostic, dispensing, pediatric, and medical audiology", salary: "audiologist" },
  { slug: "nurse-practitioner", label: "Nurse Practitioner", plural: "Nurse Practitioners", intro: "advanced-practice patient care", salary: null },
  { slug: "physician-assistant", label: "Physician Assistant", plural: "Physician Assistants", intro: "advanced-practice patient care", salary: null },
] as const;

export function careerSpecialtyBySlug(slug: string) {
  return CAREER_SPECIALTIES.find((x) => x.slug === slug);
}
export function careerHref(slug: string, state: string) { return `/career/${slug}/${state}/`; }
export function careerParams() {
  return CAREER_SPECIALTIES.flatMap((x) => launchMarkets().map((m) => ({ specialty: x.slug, state: m.market.toLowerCase().replace(/\s+/g, "-") })));
}
export function careerPage(specialty: string, state: string) {
  const role = careerSpecialtyBySlug(specialty); const market = marketBySlug(state);
  return role && market ? { role, market } : undefined;
}