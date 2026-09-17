import type { Metadata } from "next";
import { SettingHub } from "@/components/SettingHub";
import { SETTINGS } from "@/lib/site";

export const metadata: Metadata = {
  title: "Hospital Rehab Recruiting: Acute Care & Inpatient PT, OT & SLP",
  description:
    "Acute care and inpatient rehab recruiting: PTs, OTs, medical SLPs with MBSS and FEES, hospital audiologists and rehab directors. National hospital employment counts, from a therapy recruiting firm run by a licensed SLP.",
  alternates: { canonical: "/hospital-rehab-recruiting/" },
};

export default function Page() {
  return <SettingHub s={SETTINGS["hospital-rehab"]} />;
}
