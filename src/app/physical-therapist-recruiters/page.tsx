import type { Metadata } from "next";
import { ProfessionHub } from "@/components/ProfessionHub";
import { PROFESSIONS } from "@/lib/site";

export const metadata: Metadata = {
  title: "Physical Therapist Recruiters & PT Staffing Agency",
  description:
    "Physical therapy staffing for hospitals, SNFs, home health, outpatient clinics and schools. National PT and PTA counts, pay and the top-10 states, from a therapy recruiting firm run by a licensed SLP.",
  alternates: { canonical: "/physical-therapist-recruiters/" },
};

export default function Page() {
  return <ProfessionHub p={PROFESSIONS.pt} />;
}
