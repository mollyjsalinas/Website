import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/Sections";
import { POSTS } from "@/lib/posts";
import { longDate } from "@/lib/format";

export const metadata: Metadata = {
  title: "Therapy Hiring Insights: Pay, Workforce and Licensure",
  description:
    "Data-backed guides on physical therapy, occupational therapy, speech-language pathology and audiology pay, workforce supply and licensure, written for hiring managers and therapists.",
  alternates: { canonical: "/blog/" },
};

export default function BlogIndexPage() {
  const posts = [...POSTS].sort((a, b) => b.date.localeCompare(a.date));

  return (
    <Container className="py-16">
      <SectionHeading eyebrow="Insights" title="What the therapy market is doing, in numbers">
        Guides for directors of rehab, administrators and therapists, grounded in the federal
        workforce and pay data our searches run on.
      </SectionHeading>
      <div className="mt-10 max-w-3xl space-y-8">
        {posts.map((post) => (
          <article key={post.slug} className="rounded-lg border border-mist bg-white p-8 shadow-sm">
            <p className="text-sm text-body">
              {longDate(post.date)} · {post.readingMinutes} min read
            </p>
            <h2 className="mt-2 font-heading text-2xl font-semibold text-navy-600">
              <Link href={`/blog/${post.slug}/`} className="hover:text-teal-600">
                {post.title}
              </Link>
            </h2>
            <p className="mt-3 leading-relaxed text-body">{post.description}</p>
            <p className="mt-4">
              <Link href={`/blog/${post.slug}/`} className="font-semibold text-teal-600 hover:text-teal-700">
                Read article →
              </Link>
            </p>
          </article>
        ))}
      </div>
    </Container>
  );
}
