import type { Metadata } from "next";
import { Poppins, Open_Sans } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { JsonLd } from "@/components/JsonLd";
import { Analytics } from "@/components/Analytics";
import { SITE, MOLLY } from "@/lib/site";

// On this Windows box the Google Fonts fetch at build time needs
// NEXT_TURBOPACK_EXPERIMENTAL_USE_SYSTEM_TLS_CERTS=1 (see README).
const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "Physical Therapy, OT & SLP Recruiters | APT Recruiting",
    template: "%s | APT Recruiting",
  },
  description: SITE.description,
  openGraph: {
    type: "website",
    siteName: SITE.name,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
  },
  alternates: {
    canonical: "./",
  },
};

const MOLLY_ID = `${SITE.url}/#molly`;

const personSchema = {
  "@type": "Person",
  "@id": MOLLY_ID,
  name: MOLLY.name,
  givenName: "Molly",
  jobTitle: MOLLY.jobTitle,
  email: MOLLY.email,
  image: `${SITE.url}${MOLLY.headshot}`,
  sameAs: [MOLLY.linkedin],
  honorificSuffix: MOLLY.credentialLetters,
  worksFor: { "@id": `${SITE.url}/#organization` },
  url: `${SITE.url}/about/`,
  hasOccupation: { "@type": "Occupation", name: "Speech-language pathologist" },
  hasCredential: {
    "@type": "EducationalOccupationalCredential",
    credentialCategory: "license",
    name: "Licensed speech-language pathologist",
  },
  knowsAbout: [
    "Speech-language pathology",
    "Rehabilitation therapy recruiting",
    "Physical therapist recruiting",
    "Occupational therapist recruiting",
    "Audiologist recruiting",
  ],
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE.url}/#organization`,
  name: SITE.name,
  legalName: SITE.legalName,
  url: `${SITE.url}/`,
  logo: `${SITE.url}/brand/apt-logo-original.png`,
  email: SITE.email,
  telephone: SITE.telephone,
  address: {
    "@type": "PostalAddress",
    streetAddress: SITE.mailingAddress.street,
    addressLocality: SITE.mailingAddress.city,
    addressRegion: SITE.mailingAddress.region,
    postalCode: SITE.mailingAddress.postalCode,
    addressCountry: "US",
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: SITE.telephone,
    email: SITE.email,
    contactType: "customer service",
    areaServed: "US",
  },
  founder: personSchema,
  areaServed: { "@type": "Country", name: "United States" },
  description: SITE.description,
  slogan: SITE.tagline,
  knowsAbout: [
    "Physical therapy staffing",
    "Occupational therapy recruiting",
    "Speech-language pathologist recruiting",
    "Audiologist recruiting",
    "Rehab staffing",
    "Director of rehab search",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${poppins.variable} ${openSans.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col font-sans">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-navy-600 focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to content
        </a>
        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
        <JsonLd data={organizationSchema} />
        <Analytics />
      </body>
    </html>
  );
}
