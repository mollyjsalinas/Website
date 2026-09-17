import type { Metadata } from "next";
import { ProfessionHub } from "@/components/ProfessionHub";
import { PROFESSIONS } from "@/lib/site";

export const metadata: Metadata = {
  title: "Audiologist Recruiters & Audiology Staffing",
  description:
    "Audiologist recruiting for hospitals, ENT practices, hearing clinics and pediatric programs. National audiologist counts, pay and the top-10 states, from a therapy recruiting firm run by a licensed SLP.",
  alternates: { canonical: "/audiologist-recruiters/" },
};

export default function Page() {
  return <ProfessionHub p={PROFESSIONS.aud} />;
}
