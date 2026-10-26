import Link from "next/link";
import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/Sections";
import { CAREER_SPECIALTIES, careerHref, careerCityHref } from "@/lib/career-specialties";
import { stateSlug, type MarketSnapshot, type MetroSnapshot } from "@/lib/markets";
import { postsLinkingTo } from "@/lib/posts";

// One line under a market page's pay section, linking to the candidate career
// page for each specialty in that state (or metro). Same shape as SalaryLinks.
export function CareerLinks({ m, c }: { m?: MarketSnapshot; c?: MetroSnapshot }) {
  const place = c ? c.city : m?.market;
  if (!place) return null;
  const href = (slug: string) => (c ? careerCityHref(slug, c) : careerHref(slug, stateSlug(m!.market)));
  return (
    <p className="mt-3 max-w-3xl text-sm leading-relaxed text-body">
      Candidate career guides for {place}:{" "}
      {CAREER_SPECIALTIES.map((x, i) => (
        <span key={x.slug}>
          {i > 0 && " · "}
          <Link href={href(x.slug)} className="font-semibold text-teal-600 hover:text-teal-700">
            {x.label}
          </Link>
        </span>
      ))}
    </p>
  );
}

// The other career specialties, as a short link list. `href` picks the level
// (national hub, state or metro) so siblings link to siblings.
export function OtherSpecialties({
  current,
  title,
  href,
  label,
}: {
  current: string;
  title: string;
  href: (slug: string) => string;
  label: (x: (typeof CAREER_SPECIALTIES)[number]) => string;
}) {
  return (
    <div>
      <h2 className="font-heading text-lg font-semibold text-navy-600">{title}</h2>
      <ul className="mt-3 space-y-2">
        {CAREER_SPECIALTIES.filter((x) => x.slug !== current).map((x) => (
          <li key={x.slug}>
            <Link href={href(x.slug)} className="text-teal-600 hover:text-teal-700">
              {label(x)}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

// Articles whose own "related" list points at this page: the reverse side of
// the links every post already carries, so a hub lists the posts that cite it.
export function RelatedPosts({ hrefs, className = "py-16" }: { hrefs: string[]; className?: string }) {
  const posts = postsLinkingTo(hrefs);
  if (posts.length === 0) return null;
  return (
    <section className={className}>
      <Container>
        <SectionHeading eyebrow="Insights" title="Related reading" />
        <ul className="mt-6 max-w-3xl space-y-3">
          {posts.map((p) => (
            <li key={p.slug}>
              <Link href={`/blog/${p.slug}/`} className="font-semibold text-teal-600 hover:text-teal-700">
                {p.title}
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
