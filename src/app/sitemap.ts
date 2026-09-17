import type { MetadataRoute } from "next";
import { SITE, CONTENT_UPDATED, PROFESSION_LIST, SETTING_LIST, COMPACT_LIST } from "@/lib/site";
import { POSTS } from "@/lib/posts";
import { liveJobs } from "@/lib/jobs";
import { launchMarkets, metrosForState, metroHref, stateHref } from "@/lib/markets";

// ⛔ Every path here ends in "/" (trailingSlash: true). The prebuild check
// fails the build on an unslashed entry; an unslashed sitemap URL is a 308.
const STATIC_PATHS = [
  "/",
  "/employers/",
  "/job-seekers/",
  "/about/",
  "/contact/",
  "/contact/hire/",
  "/jobs/",
  "/blog/",
  "/therapy-recruiters/",
  "/licensure-compacts/",
  "/privacy-policy/",
];

// A data page changes for two independent reasons: the underlying snapshot is
// re-assembled (snapshot_date), or the template and copy are edited
// (CONTENT_UPDATED). Report whichever is later.
function pageModified(snapshotDate: string): string {
  return snapshotDate > CONTENT_UPDATED ? snapshotDate : CONTENT_UPDATED;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const markets = launchMarkets();
  const dataDate = markets.length ? pageModified(markets[0].snapshot_date) : CONTENT_UPDATED;
  return [
    ...STATIC_PATHS.map((path) => ({
      url: `${SITE.url}${path}`,
      lastModified: CONTENT_UPDATED,
      changeFrequency: path === "/jobs/" || path === "/blog/" ? ("weekly" as const) : ("monthly" as const),
      priority: path === "/" ? 1 : 0.8,
    })),
    ...PROFESSION_LIST.map((p) => ({
      url: `${SITE.url}/${p.slug}/`,
      lastModified: dataDate,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    })),
    ...SETTING_LIST.map((s) => ({
      url: `${SITE.url}/${s.slug}/`,
      lastModified: s.qcew ? dataDate : CONTENT_UPDATED,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...COMPACT_LIST.map((c) => ({
      url: `${SITE.url}/licensure-compacts/${c.slug}/`,
      lastModified: dataDate,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...POSTS.map((post) => ({
      url: `${SITE.url}/blog/${post.slug}/`,
      lastModified: post.date > dataDate ? post.date : dataDate,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    ...liveJobs().map((job) => ({
      url: `${SITE.url}/jobs/${job.slug}/`,
      lastModified: job.datePosted,
      changeFrequency: "weekly" as const,
      priority: 0.6,
    })),
    ...markets.map((m) => ({
      url: `${SITE.url}${stateHref(m)}`,
      lastModified: pageModified(m.snapshot_date),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...markets.flatMap((m) =>
      metrosForState(m.market_abbr).map((c) => ({
        url: `${SITE.url}${metroHref(c)}`,
        lastModified: pageModified(c.snapshot_date),
        changeFrequency: "monthly" as const,
        priority: 0.7,
      })),
    ),
  ];
}
