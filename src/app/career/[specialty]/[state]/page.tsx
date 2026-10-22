import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/Container";
import { CtaBand, Breadcrumbs } from "@/components/Sections";
import { SITE } from "@/lib/site";
import { careerPage, careerParams, careerHref } from "@/lib/career-specialties";

export async function generateStaticParams() { return careerParams(); }
export const dynamicParams = false;
export async function generateMetadata({params}:{params:Promise<{specialty:string;state:string}>}):Promise<Metadata> {
 const p=careerPage((await params).specialty,(await params).state); if(!p)return {};
 return {title:`${p.role.label} Jobs in ${p.market.market}`,description:`Explore confidential ${p.role.label.toLowerCase()} opportunities in ${p.market.market}. APT Recruiting connects clinicians with roles that fit their specialty, schedule, and goals.`,alternates:{canonical:careerHref(p.role.slug,p.market.market.toLowerCase().replace(/\s+/g,"-"))}};
}
export default async function Page({params}:{params:Promise<{specialty:string;state:string}>}) {
 const q=await params; const p=careerPage(q.specialty,q.state); if(!p)notFound(); const {role,market}=p; const state=market.market.toLowerCase().replace(/\s+/g,"-"); const url=`${SITE.url}${careerHref(role.slug,state)}`;
 return <><section className="bg-navy-600 text-white"><Container className="py-20 sm:py-24"><p className="text-sm font-semibold tracking-widest text-teal-300 uppercase">Candidate careers · {market.market}</p><h1 className="mt-4 max-w-3xl font-heading text-4xl font-semibold sm:text-5xl">{role.label} jobs in {market.market}</h1><p className="mt-6 max-w-2xl text-lg leading-relaxed text-navy-100">APT Recruiting helps {role.plural.toLowerCase()} explore confidential opportunities in {role.intro}. Tell us the setting, schedule, and market you want—we will only introduce roles that fit.</p></Container></section><section className="py-20"><Container><div className="max-w-3xl space-y-5 leading-relaxed text-body"><h2 className="font-heading text-2xl font-semibold text-navy-600">A better way to look for your next role</h2><p>Many of our searches are confidential and never posted publicly. Working with APT Recruiting is free to clinicians, and we keep your search private until you choose to speak with an employer.</p><p>Whether you are seeking clinical depth, a healthier schedule, leadership potential, or a move to {market.market}, we help you compare the details that determine fit: caseload, compensation, documentation expectations, support, and growth.</p>{role.salary && <p><Link className="font-semibold text-teal-600 hover:text-teal-700" href={`/salary/${role.salary}/${state}/`}>See verified {role.salary.replace(/-/g," ")} wage data in {market.market} →</Link></p>}</div></Container></section><CtaBand title={`Considering a ${role.label} move in ${market.market}?`} body="Send a resume and a few notes on what you want next. Your conversation stays confidential." label="Talk to a recruiter" href="/job-seekers/"/><Breadcrumbs items={[{name:"Home",href:`${SITE.url}/`},{name:"Candidate careers",href:`${SITE.url}/job-seekers/`},{name:`${role.label} jobs in ${market.market}`,href:url}]}/></>;
}