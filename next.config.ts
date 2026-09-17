import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pin the workspace root to this project. On the dev laptop a stray
  // package-lock.json one directory up made Next guess the wrong root.
  turbopack: { root: process.cwd() },
  // The WordPress site this replaces used trailing slashes; keeping them means
  // every indexed URL stays identical. ⛔ Every internal href must end in "/"
  // (scripts/check-trailing-slash.mjs fails the build otherwise).
  trailingSlash: true,
  async redirects() {
    return [
      // Canonicalize www -> apex in a single 308 hop. Split root from deeper
      // paths so we can re-append the trailing slash ourselves: the destination
      // is an absolute URL, so `trailingSlash: true` normalization does NOT
      // apply to it and the :path capture drops the slash.
      {
        source: "/",
        has: [{ type: "host", value: "www.aptrecruiting.com" }],
        destination: "https://aptrecruiting.com/",
        permanent: true,
      },
      {
        source: "/:path+",
        has: [{ type: "host", value: "www.aptrecruiting.com" }],
        destination: "https://aptrecruiting.com/:path+/",
        permanent: true,
      },
      // Legacy WordPress URLs.
      { source: "/about-us", destination: "/about/", permanent: true },
      // Molly is not hiring recruiters (9/17); the page is gone.
      { source: "/join-our-team", destination: "/about/", permanent: true },
      { source: "/category/:slug*", destination: "/", permanent: true },
      { source: "/tag/:slug*", destination: "/", permanent: true },
      { source: "/author/:slug*", destination: "/", permanent: true },
      { source: "/feed", destination: "/", permanent: true },
      // WP date archives (/2024/, /2024/03/, ...).
      { source: "/:year(20\\d{2})/:path*", destination: "/", permanent: true },
      // No cross-state metro redirects: non-owner CBSA slices were never
      // published on this domain (src/lib/markets.ts metroOwnerAbbr).
    ];
  },
};

export default nextConfig;
