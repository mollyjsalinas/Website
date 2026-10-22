import { timingSafeEqual } from "node:crypto";
import { NextResponse } from "next/server";
import { liveJobs } from "@/lib/jobs";
import { notifyGoogleOfUpdatedUrl } from "@/lib/google-indexing";
import { SITE } from "@/lib/site";

export const dynamic = "force-dynamic";

function authorized(request: Request, secret: string): boolean {
  const supplied = request.headers.get("authorization");
  const expected = `Bearer ${secret}`;
  if (!supplied || supplied.length !== expected.length) return false;
  return timingSafeEqual(Buffer.from(supplied), Buffer.from(expected));
}

// This is intentionally not a public indexing proxy. It can only notify Google
// about a live job from our registry, and it requires a server-side trigger secret.
export async function POST(request: Request) {
  const secret = process.env.INDEXING_API_TRIGGER_SECRET;
  if (!secret) {
    return NextResponse.json({ error: "Indexing trigger is not configured." }, { status: 503 });
  }
  if (!authorized(request, secret)) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const slug = new URL(request.url).searchParams.get("slug");
  const job = slug ? liveJobs().find((candidate) => candidate.slug === slug) : undefined;
  if (!job) {
    return NextResponse.json({ error: "A live job slug is required." }, { status: 404 });
  }

  const url = `${SITE.url}/jobs/${job.slug}/`;
  try {
    await notifyGoogleOfUpdatedUrl(url);
  } catch (error) {
    console.error("Google Indexing API notification failed", error instanceof Error ? error.message : error);
    return NextResponse.json({ error: "Google could not be notified." }, { status: 502 });
  }

  return NextResponse.json({ ok: true, url, type: "URL_UPDATED" });
}
