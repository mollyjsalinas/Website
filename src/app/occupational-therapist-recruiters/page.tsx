import type { Metadata } from "next";
import { ProfessionHub } from "@/components/ProfessionHub";
import { PROFESSIONS } from "@/lib/site";

export const metadata: Metadata = {
  title: "Occupational Therapist Recruiters & OT Staffing",
  description:
    "OT recruiting for hospitals, SNFs, home health, outpatient and pediatric employers. National OT and OTA counts, pay and the top-10 states, from a therapy recruiting firm run by a licensed SLP.",
  alternates: { canonical: "/occupational-therapist-recruiters/" },
};

export default function Page() {
  return <ProfessionHub p={PROFESSIONS.ot} />;
}
