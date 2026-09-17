import type { Metadata } from "next";
import { SettingHub } from "@/components/SettingHub";
import { SETTINGS } from "@/lib/site";

export const metadata: Metadata = {
  title: "School-Based Therapy Recruiting: SLP, OT & PT for Districts",
  description:
    "School-based SLP, OT and PT recruiting for districts, charter networks and pediatric providers, screened for caseload, evaluation load and CFY supervision by a licensed SLP.",
  alternates: { canonical: "/school-based-therapy-recruiting/" },
};

export default function Page() {
  return <SettingHub s={SETTINGS["school-based"]} />;
}
