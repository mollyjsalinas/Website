import Link from "next/link";
import { type ReactNode } from "react";
import { Container } from "@/components/Container";
import { JsonLd } from "@/components/JsonLd";

export function SectionHeading({
  eyebrow,
  title,
  children,
  as: Tag = "h2",
}: {
  eyebrow?: string;
  title: string;
  children?: ReactNode;
  as?: "h1" | "h2";
}) {
  return (
    <div className="max-w-2xl">
      {eyebrow && (
        <p className="text-sm font-semibold tracking-widest text-teal-600 uppercase">{eyebrow}</p>
      )}
      <Tag className="mt-2 font-heading text-3xl font-semibold text-navy-600 sm:text-4xl">{title}</Tag>
      {children && <div className="mt-4 text-lg leading-relaxed text-body">{children}</div>}
    </div>
  );
}

// Big number + label tile used on every data page. `sub` carries the assistant
// line under a profession count ("+ 1,302 PTAs").
export function StatTile({ value, label, sub }: { value: string; label: string; sub?: string }) {
  return (
    <div className="rounded-lg border border-mist bg-white p-6 text-center">
      <p className="font-heading text-4xl font-semibold text-navy-600">{value}</p>
      <p className="mt-2 text-sm font-semibold tracking-wide text-body uppercase">{label}</p>
      {sub && <p className="mt-1 text-xs text-body">{sub}</p>}
    </div>
  );
}

export function SourceLine({ children }: { children: ReactNode }) {
  return <p className="mt-6 max-w-3xl text-sm leading-relaxed text-body">{children}</p>;
}

// A visible "[MOLLY: ...]" slot, styled so nobody mistakes it for finished copy.
export function Placeholder({ children }: { children: string }) {
  return (
    <span className="rounded bg-blush px-1.5 py-0.5 font-mono text-[0.85em] text-navy-700">{children}</span>
  );
}

export function CtaBand({
  title = "Hiring a therapist?",
  body = "Tell us about the role and the setting. A licensed clinician, not an autoresponder, reads every brief.",
  label = "Tell us about the role",
  href = "/contact/hire/",
  secondaryLabel,
  secondaryHref,
}: {
  title?: string;
  body?: string;
  label?: string;
  href?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
}) {
  return (
    <section className="bg-navy-600">
      <Container className="flex flex-col items-start gap-6 py-16 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="font-heading text-3xl font-semibold text-white">{title}</h2>
          <p className="mt-3 max-w-xl text-navy-100">{body}</p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Link
            href={href}
            className="rounded-md bg-teal-500 px-6 py-3 text-center text-base font-semibold text-white transition-colors hover:bg-teal-400"
          >
            {label}
          </Link>
          {secondaryLabel && secondaryHref && (
            <Link
              href={secondaryHref}
              className="rounded-md border border-navy-200 px-6 py-3 text-center text-base font-semibold text-white transition-colors hover:border-teal-300 hover:text-teal-200"
            >
              {secondaryLabel}
            </Link>
          )}
        </div>
      </Container>
    </section>
  );
}

export type Faq = { q: string; a: string };

// The visible Q&A list without schema, so a page can show FAQs in more than one
// place and still emit ONE FAQPage.
export function FaqList({ faqs, className = "" }: { faqs: Faq[]; className?: string }) {
  return (
    <div className={`max-w-3xl divide-y divide-mist border-y border-mist ${className}`}>
      {faqs.map((f) => (
        <details key={f.q} className="group py-5">
          <summary className="flex cursor-pointer list-none items-center justify-between font-semibold text-navy-600">
            {f.q}
            <span className="ml-4 text-teal-500 transition-transform group-open:rotate-45">+</span>
          </summary>
          <p className="mt-3 leading-relaxed text-body">{f.a}</p>
        </details>
      ))}
    </div>
  );
}

export function FaqSchema({ faqs }: { faqs: Faq[] }) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      }}
    />
  );
}

// ⛔ One FAQPage per URL. A page that renders EmployerBlock must NOT also render
// this with schema; pass the employer FAQs through `alsoInSchema` here and set
// emitSchema={false} on the block, or leave the block as the only emitter.
export function FaqSection({
  faqs,
  title = "Frequently asked questions",
  alsoInSchema = [],
  emitSchema = true,
}: {
  faqs: Faq[];
  title?: string;
  alsoInSchema?: Faq[];
  emitSchema?: boolean;
}) {
  return (
    <section className="py-20">
      <Container>
        <SectionHeading eyebrow="FAQ" title={title} />
        <FaqList faqs={faqs} className="mt-8" />
        {emitSchema && <FaqSchema faqs={[...faqs, ...alsoInSchema]} />}
      </Container>
    </section>
  );
}

// Simple hero used by the non-data pages.
export function Hero({
  eyebrow,
  title,
  children,
  primary,
  secondary,
}: {
  eyebrow: string;
  title: string;
  children?: ReactNode;
  primary?: { href: string; label: string };
  secondary?: { href: string; label: string };
}) {
  return (
    <section className="bg-navy-600 text-white">
      <Container className="py-20 sm:py-24">
        <p className="text-sm font-semibold tracking-widest text-teal-300 uppercase">{eyebrow}</p>
        <h1 className="mt-4 max-w-3xl font-heading text-4xl leading-tight font-semibold sm:text-5xl">{title}</h1>
        {children && <div className="mt-6 max-w-2xl text-lg leading-relaxed text-navy-100">{children}</div>}
        {(primary || secondary) && (
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
            {primary && (
              <Link
                href={primary.href}
                className="inline-block rounded-md bg-teal-500 px-6 py-3 text-center font-semibold text-white transition-colors hover:bg-teal-400"
              >
                {primary.label}
              </Link>
            )}
            {secondary && (
              <Link href={secondary.href} className="text-sm font-semibold text-teal-200 hover:text-white">
                {secondary.label} →
              </Link>
            )}
          </div>
        )}
      </Container>
    </section>
  );
}

export function Breadcrumbs({ items }: { items: { name: string; href: string }[] }) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items.map((it, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: it.name,
          item: it.href,
        })),
      }}
    />
  );
}
