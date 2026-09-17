import type { Metadata } from "next";
import { CompactPage } from "@/components/CompactTable";

export const metadata: Metadata = {
  title: "PT Compact States: Physical Therapy Licensure Compact Status by State",
  description:
    "Which states issue PT Compact privileges, which have joined but are not yet issuing, and which are not members, with what each status means when you hire a physical therapist or PTA from another state.",
  alternates: { canonical: "/licensure-compacts/pt-compact/" },
};

export default function Page() {
  return <CompactPage compactKey="pt" />;
}
