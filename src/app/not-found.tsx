import Link from "next/link";
import { Container } from "@/components/Container";

export default function NotFound() {
  return (
    <section className="py-24">
      <Container className="max-w-2xl text-center">
        <p className="text-sm font-semibold tracking-widest text-teal-600 uppercase">404</p>
        <h1 className="mt-3 font-heading text-4xl font-semibold text-navy-600">
          That page has been discharged.
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-body">
          The page you are looking for does not exist or has moved. Here is where you probably
          want to go:
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/employers/"
            className="rounded-md border border-mist px-5 py-2.5 font-semibold text-navy-600 transition-colors hover:border-teal-400 hover:text-teal-600"
          >
            For Employers
          </Link>
          <Link
            href="/therapy-recruiters/"
            className="rounded-md border border-mist px-5 py-2.5 font-semibold text-navy-600 transition-colors hover:border-teal-400 hover:text-teal-600"
          >
            Markets by State
          </Link>
          <Link
            href="/contact/"
            className="rounded-md bg-teal-500 px-5 py-2.5 font-semibold text-white transition-colors hover:bg-teal-600"
          >
            Contact Us
          </Link>
        </div>
      </Container>
    </section>
  );
}
