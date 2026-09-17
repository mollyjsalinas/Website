import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/Container";
import { MOLLY, SITE } from "@/lib/site";

// The E-E-A-T byline on every data page: the numbers were reviewed by a
// licensed speech-language pathologist, with a name behind them. The Person
// schema itself lives in the root layout (Organization.founder) with @id
// `${SITE.url}/#molly`, which the data pages reference through WebPage.reviewedBy.
export const MOLLY_ID = `${SITE.url}/#molly`;

export function MollyByline({ place, reviewedOn }: { place: string; reviewedOn: string }) {
  return (
    <section className="py-16">
      <Container>
        <div className="flex max-w-3xl flex-col gap-6 rounded-lg border border-mist bg-lavender/40 p-8 sm:flex-row sm:items-start">
          <Image
            src={MOLLY.headshot}
            alt={MOLLY.name}
            width={160}
            height={160}
            className="h-20 w-20 shrink-0 rounded-full object-cover ring-2 ring-teal-200"
          />
          <div>
            <p className="text-sm font-semibold tracking-widest text-teal-600 uppercase">
              Reviewed by a licensed SLP
            </p>
            <h2 className="mt-1 font-heading text-xl font-semibold text-navy-600">
              {MOLLY.name}, {MOLLY.credentialLetters}
            </h2>
            <p className="mt-3 leading-relaxed text-body">
              The {place} figures on this page are drawn from public federal sources and
              reviewed by Molly, a licensed speech-language pathologist who has worked across
              healthcare settings and founded APT Recruiting. She has recruited therapists for{" "}
              {MOLLY.yearsRecruiting} and works from {MOLLY.basedIn}. Last reviewed {reviewedOn}.
            </p>
            <p className="mt-3 text-sm">
              <Link href="/about/" className="font-semibold text-teal-600 hover:text-teal-700">
                About Molly and APT Recruiting →
              </Link>
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
