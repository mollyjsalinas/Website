import type { Metadata } from "next";
import { SettingHub } from "@/components/SettingHub";
import { SETTINGS } from "@/lib/site";

export const metadata: Metadata = {
  title: "Outpatient Rehab Recruiting: PT, OT & SLP for Clinics",
  description:
    "Therapy recruiting for outpatient clinics and private practices: ortho PTs, hand therapists, pelvic health, pediatric OTs and SLPs, clinic directors. National therapy-office employment counts, from a firm run by a licensed SLP.",
  alternates: { canonical: "/outpatient-rehab-recruiting/" },
};

export default function Page() {
  return <SettingHub s={SETTINGS["outpatient-rehab"]} />;
}
