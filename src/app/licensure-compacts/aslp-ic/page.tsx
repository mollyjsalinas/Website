import type { Metadata } from "next";
import { CompactPage } from "@/components/CompactTable";

export const metadata: Metadata = {
  title: "ASLP-IC States: Audiology & Speech-Language Pathology Compact Status by State",
  description:
    "Which states issue ASLP-IC privileges, which have joined but are not yet issuing, and which are not members, with what each status means when you hire an SLP or audiologist from another state.",
  alternates: { canonical: "/licensure-compacts/aslp-ic/" },
};

export default function Page() {
  return <CompactPage compactKey="aslp" />;
}
