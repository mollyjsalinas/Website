import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/Container";
import { CandidateAlertForm } from "@/components/CandidateAlertForm";
import { Breadcrumbs } from "@/components/Sections";
import { SITE } from "@/lib/site";
import { CAREER_SPECIALTIES, careerSpecialtyBySlug, careerHref } from "@/lib/career-specialties";
import { launchMarkets } from "@/lib/markets";

export function generateStaticParams() { return CAREER_SPECIALTIES.map((role) => ({ specialty: role.slug })); }
export const dynamicParams = false;
export async function generateMetadata({ params }: { params: Promise<{ specialty: string }> }): Promise<Metadata> {
  const role = careerSpecialtyBySlug((await params).specialty); if (!role) return {};
  return { title: `${role.label} Jobs & Careers Nationwide`, description: `Explore confidential ${role.label.toLowerCase()} opportunities, state salary data, and career guidance from APT Recruiting.`, alternates: { canonical: `/career/${role.slug}/` } };
}
export default async function Page({ params }: { params: Promise<{ specialty: string }> }) {
  const role = careerSpecialtyBySlug((await params).specialty); if (!role) notFound();
  const markets = launchMarkets().sort((a,b) => a.market.localeCompare(b.market));
  const url = `${SITE.url}/career/${role.slug}/`;
  return <><section className="bg-navy-600 text-white"><Container className="py-20 sm:py-24"><p className="text-sm font-semibold tracking-widest text-teal-300 uppercase">Candidate careers</p><h1 className="mt-4 max-w-3xl font-heading text-4xl font-semibold sm:text-5xl">{role.label} jobs and careers nationwide</h1><p className="mt-6 max-w-2xl text-lg leading-relaxed text-navy-100">Find confidential {role.plural.toLowerCase()} opportunities that fit your preferred setting, schedule and market. APT Recruiting keeps your search private until you choose to be introduced.</p>{role.salary && <Link href={`/salary/${role.salary}/`} className="mt-7 inline-block rounded-md bg-teal-500 px-5 py-3 font-semibold text-white hover:bg-teal-400">Explore {role.label.toLowerCase()} salary data →</Link>}</Container></section><section className="py-20"><Container><h2 className="font-heading text-2xl font-semibold text-navy-600">Explore {role.label.toLowerCase()} opportunities by state</h2><p className="mt-3 max-w-3xl leading-relaxed text-body">Select a state for a confidential career guide and the local compensation picture. Compensation varies by specialty, experience, setting and responsibilities.</p><div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{markets.map(m => <Link key={m.market_abbr} href={careerHref(role.slug,m.market.toLowerCase().replace(/\s+/g,"-"))} className="rounded-lg border border-mist bg-white p-4 font-semibold text-teal-600 hover:border-teal-400">{role.label} jobs in {m.market} →</Link>)}</div></Container></section><section className="bg-mist-light py-20"><Container className="max-w-3xl"><h2 className="font-heading text-2xl font-semibold text-navy-600">Get confidential candidate updates</h2><p className="mt-3 leading-relaxed text-body">Tell us your discipline and preferred market. We will keep your information private and contact you when an appropriate search comes across our desk.</p><div className="mt-6"><CandidateAlertForm /></div></Container></section><Breadcrumbs items={[{name:"Home",href:`${SITE.url}/`},{name:"Candidate careers",href:`${SITE.url}/job-seekers/`},{name:`${role.label} careers`,href:url}]}/></>;
}