import type { Metadata } from "next";
import { ProfessionHub } from "@/components/ProfessionHub";
import { PROFESSIONS } from "@/lib/site";

export const metadata: Metadata = {
  title: "Speech-Language Pathologist Recruiters & SLP Staffing",
  description:
    "SLP recruiting for medical, skilled nursing, home health, school-based and telepractice roles. National SLP counts, pay and the top-10 states, from a firm founded by a licensed SLP.",
  alternates: { canonical: "/speech-language-pathologist-recruiters/" },
};

export default function Page() {
  return <ProfessionHub p={PROFESSIONS.slp} />;
}
