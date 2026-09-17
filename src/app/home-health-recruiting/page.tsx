import type { Metadata } from "next";
import { SettingHub } from "@/components/SettingHub";
import { SETTINGS } from "@/lib/site";

export const metadata: Metadata = {
  title: "Home Health Therapy Recruiting: PT, OT & SLP for Agencies",
  description:
    "Home health PT, OT and SLP recruiting, screened for territory, visit expectations and OASIS competence. National agency and sector counts, from a therapy recruiting firm run by a licensed SLP.",
  alternates: { canonical: "/home-health-recruiting/" },
};

export default function Page() {
  return <SettingHub s={SETTINGS["home-health"]} />;
}
