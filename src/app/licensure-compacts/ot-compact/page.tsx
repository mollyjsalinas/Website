import type { Metadata } from "next";
import { CompactPage } from "@/components/CompactTable";

export const metadata: Metadata = {
  title: "OT Compact States: Occupational Therapy Licensure Compact Status by State",
  description:
    "Which states issue OT Compact privileges, which have joined but are not yet issuing, and which are not members, with what each status means when you hire an occupational therapist or OTA from another state.",
  alternates: { canonical: "/licensure-compacts/ot-compact/" },
};

export default function Page() {
  return <CompactPage compactKey="ot" />;
}
