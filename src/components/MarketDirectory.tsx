import Link from "next/link";

// Shared building blocks for the state/metro directory so every grid on the
// site is the same grid.

export type MarketLink = { label: string; href: string; sub?: string };

// Compact link grid for browsing many markets (states or cities) at a glance.
export function MarketLinkGrid({ items, className }: { items: MarketLink[]; className?: string }) {
  return (
    <div className={`grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 ${className ?? ""}`}>
      {items.map((it) => (
        <Link
          key={it.href}
          href={it.href}
          className="rounded-lg border border-mist bg-white px-4 py-3 transition-shadow hover:shadow-md"
        >
          <span className="block font-semibold text-navy-600">{it.label}</span>
          {it.sub && <span className="mt-0.5 block text-xs leading-snug text-body">{it.sub}</span>}
        </Link>
      ))}
    </div>
  );
}

// Richer teaser card for the handful of featured links on a landing page.
export function FeaturedCard({
  href,
  title,
  sub,
  cta = "Learn more →",
}: {
  href: string;
  title: string;
  sub: string;
  cta?: string;
}) {
  return (
    <Link
      href={href}
      className="group rounded-lg border border-mist bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
    >
      <h3 className="font-heading text-xl font-semibold text-navy-600 group-hover:text-teal-600">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-body">{sub}</p>
      <p className="mt-3 text-sm font-semibold text-teal-600">{cta}</p>
    </Link>
  );
}
