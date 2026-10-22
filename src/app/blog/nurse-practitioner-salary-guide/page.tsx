import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/Container";
import { JsonLd } from "@/components/JsonLd";
import { CtaBand, Breadcrumbs } from "@/components/Sections";
import { SITE } from "@/lib/site";
import { postBySlug } from "@/lib/posts";
import { salaryRoleBySlug, rankedStates, salaryHref, roleLabel } from "@/lib/salary";
import { usd } from "@/lib/format";

const SLUG = "nurse-practitioner-salary-guide";
const post = postBySlug(SLUG)!;
const role = salaryRoleBySlug("nurse-practitioner")!;
export const metadata: Metadata = { title: post.title, description: post.description, alternates: { canonical: `/blog/${SLUG}/` }, openGraph: { type: "article", publishedTime: post.date, authors: [post.author] } };

export default function Page() {
  const ranked = rankedStates(role);
  const top = ranked.slice(0, 5);
  const url = `${SITE.url}/blog/${SLUG}/`;
  const label = roleLabel(role);
  return <><article className="py-16"><Container className="max-w-3xl"><p className="text-sm font-semibold tracking-widest text-teal-600 uppercase">Candidate guide</p><h1 className="mt-2 font-heading text-4xl font-semibold leading-tight text-navy-600">{post.title}</h1><p className="mt-4 text-sm text-body">By {post.author} · October 22, 2026 · {post.readingMinutes} min read</p><div className="mt-8 space-y-5 text-lg leading-relaxed text-body"><p>Compensation is one useful starting point, not a complete picture of a career decision. The figures below are BLS estimates for people already employed in each state—not promises from a specific employer. Use them to frame a conversation about base pay, schedule, call, productivity expectations, benefits, staffing and growth.</p><p>When you compare opportunities, ask for the details that change the real value of the role: patient volume, administrative time, coverage model, onboarding, paid time off, credentialing support and whether the stated range is base compensation or total compensation.</p></div><h2 className="mt-12 font-heading text-2xl font-semibold text-navy-600">Highest mean pay by state</h2><div className="mt-6 overflow-x-auto"><table className="w-full border-collapse text-left"><thead><tr className="border-b-2 border-navy-200 text-sm uppercase text-body"><th className="py-3 pr-4">State</th><th className="py-3 pr-4">Mean annual wage</th><th className="py-3">Median annual wage</th></tr></thead><tbody>{top.map(({m,d})=><tr key={m.market_abbr} className="border-b border-mist"><td className="py-3 pr-4 font-semibold"><Link className="text-teal-600 hover:text-teal-700" href={salaryHref(role,m)}>{m.market}</Link></td><td className="py-3 pr-4">{usd(d.annual_mean_wage)}</td><td className="py-3">{usd(d.annual_median_wage)}</td></tr>)}</tbody></table></div><p className="mt-4 text-sm text-body">Source: U.S. Bureau of Labor Statistics Occupational Employment and Wage Statistics (OEWS), May 2025 state estimates.</p><div className="mt-10 space-y-5 text-lg leading-relaxed text-body"><p>A recruiter can help you evaluate the parts a salary table cannot show: how a team operates, what success looks like in the first year, and whether the work fits the life you want outside the clinic or hospital.</p></div><h2 className="mt-12 font-heading text-xl font-semibold text-navy-600">Explore every state</h2><p className="mt-3"><Link className="font-semibold text-teal-600 hover:text-teal-700" href={salaryHref(role)}>{label.label} salary data by state →</Link></p><ul className="mt-5 space-y-2">{post.related.map(x=><li key={x.href}><Link href={x.href} className="font-semibold text-teal-600 hover:text-teal-700">{x.label} →</Link></li>)}</ul></Container></article><CtaBand title="Considering a move?" body="Tell us the setting, schedule and compensation priorities that matter to you. The conversation is confidential." label="Talk to a recruiter" href="/job-seekers/"/><JsonLd data={{"@context":"https://schema.org","@type":"BlogPosting",headline:post.title,description:post.description,datePublished:post.date,author:{"@type":"Person",name:post.author},mainEntityOfPage:url,url}}/><Breadcrumbs items={[{name:"Home",href:`${SITE.url}/`},{name:"Insights",href:`${SITE.url}/blog/`},{name:post.title,href:url}]}/></>;
}
