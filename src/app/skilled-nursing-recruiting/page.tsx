import type { Metadata } from "next";
import { SettingHub } from "@/components/SettingHub";
import { SETTINGS } from "@/lib/site";

export const metadata: Metadata = {
  title: "Skilled Nursing Therapy Recruiting: PT, OT & SLP for SNFs",
  description:
    "Rehab staffing for skilled nursing facilities: directors of rehab, staff PTs, OTs, SLPs and assistants who understand PDPM and productivity. National nursing home and sector counts, from a firm run by a licensed SLP.",
  alternates: { canonical: "/skilled-nursing-recruiting/" },
};

export default function Page() {
  return <SettingHub s={SETTINGS["skilled-nursing"]} />;
}
