import { NextRequest, NextResponse } from "next/server";

/**
 * Older links used display names in career URLs, such as "north carolina".
 * Career pages now use stable, hyphenated slugs. Redirect only the malformed
 * legacy form so the canonical URLs retain their search equity.
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (!/%20/i.test(pathname)) return NextResponse.next();

  const decodedPathname = decodeURIComponent(pathname);
  const segments = decodedPathname.split("/");

  // The first two non-empty path segments are "career" and the specialty.
  // Normalize only state/city segments, where the legacy display-name links
  // contained spaces. This avoids changing valid specialty slugs.
  const normalizedPathname = segments
    .map((segment, index) => (index >= 3 ? segment.replace(/\s+/g, "-") : segment))
    .join("/");

  if (normalizedPathname === decodedPathname) return NextResponse.next();

  const destination = request.nextUrl.clone();
  destination.pathname = normalizedPathname;
  return NextResponse.redirect(destination, 308);
}

export const config = {
  matcher: "/career/:path*",
};
