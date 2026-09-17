export type Post = {
  slug: string;
  title: string;
  description: string;
  date: string; // ISO
  author: string;
  readingMinutes: number;
  // Internal links rendered under every post. Every post must link to at
  // least one service page; this is how blog traffic finds the firm.
  related: { href: string; label: string }[];
};

// Registry drives /blog index, sitemap.xml, and BlogPosting JSON-LD.
// To add a post: create src/app/blog/<slug>/page.tsx (copy an existing one)
// and add it here.
export const POSTS: Post[] = [
  {
    slug: "what-therapists-earn-by-state",
    title: "What Physical, Occupational and Speech Therapists Earn in Every State",
    description:
      "BLS mean annual wages for physical therapists, occupational therapists and speech-language pathologists in all 50 states and DC, with a link to each state's therapy workforce page.",
    date: "2026-09-02",
    author: "Molly Salinas",
    readingMinutes: 6,
    related: [
      { href: "/therapy-recruiters/", label: "Therapy recruiters by state and metro" },
      { href: "/employers/", label: "Hire PT, OT and SLP through APT Recruiting" },
      { href: "/licensure-compacts/", label: "PT, OT and ASLP licensure compacts by state" },
    ],
  },
  {
    slug: "hiring-therapists-across-state-lines",
    title: "Hiring Therapists Across State Lines: PT, OT and SLP Compact Status by State",
    description:
      "Which states let an employer hire a physical therapist, occupational therapist or speech-language pathologist licensed elsewhere today, from the PT Compact, OT Compact and ASLP-IC status of all 50 states and DC.",
    date: "2026-09-02",
    author: "Molly Salinas",
    readingMinutes: 6,
    related: [
      { href: "/licensure-compacts/", label: "PT, OT and ASLP licensure compacts by state" },
      { href: "/employers/", label: "Hire PT, OT and SLP through APT Recruiting" },
      { href: "/therapy-recruiters/", label: "Therapy recruiters by state and metro" },
    ],
  },
  {
    slug: "skilled-nursing-therapy-demand-by-state",
    title: "Skilled Nursing Therapy Demand by State: Nursing Home Beds per Therapist",
    description:
      "Medicare-certified nursing homes and beds in every state set against the PTs, OTs and SLPs practicing there, ranked by beds per therapist, with nursing facility employment where BLS publishes it.",
    date: "2026-09-02",
    author: "Molly Salinas",
    readingMinutes: 7,
    related: [
      { href: "/skilled-nursing-recruiting/", label: "Skilled nursing therapy recruiting" },
      { href: "/employers/", label: "Hire PT, OT and SLP through APT Recruiting" },
      { href: "/therapy-recruiters/", label: "Therapy recruiters by state and metro" },
    ],
  },
  {
    slug: "home-health-speech-therapy-coverage-by-state",
    title: "Home Health Speech Therapy Coverage by State: Share of Agencies Offering SLP, OT and PT",
    description:
      "The share of Medicare-certified home health agencies in each state that offer speech therapy, occupational therapy and physical therapy, ranked by SLP coverage to show where home health SLP hiring is thinnest.",
    date: "2026-09-02",
    author: "Molly Salinas",
    readingMinutes: 6,
    related: [
      { href: "/home-health-recruiting/", label: "Home health therapy recruiting" },
      { href: "/speech-language-pathologist-recruiters/", label: "Speech-language pathologist recruiters" },
      { href: "/therapy-recruiters/", label: "Therapy recruiters by state and metro" },
    ],
  },
];

export function postBySlug(slug: string): Post | undefined {
  return POSTS.find((p) => p.slug === slug);
}
