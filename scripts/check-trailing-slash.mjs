// Fails the build if an internal link or a sitemap path is missing its
// trailing slash.
//
// ⛔ THIS DEFECT IS SILENT IN EVERY WAY THAT MATTERS. next.config.ts sets
// `trailingSlash: true`, so /ledger answers 308 to /ledger/ and the page still
// loads. A visitor never notices. What notices is Search Console: the sitemap
// listed /ledger and /ledger/methodology, so the two pages we most wanted
// indexed were submitted as URLs that redirect, and the Ledger's own canonical
// tags named the same redirecting forms. Nothing errors, nothing 404s, the
// pages just index slowly or not at all and it reads as Google ignoring us.
//
// ⚠️ Only INTERNAL, path-style hrefs are checked. A file (/brand/logo.webp),
// an anchor, a query, a mailto/tel, and any absolute URL are all legitimate
// without a slash, so each is skipped rather than special-cased later.
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, extname } from "node:path";

const root = join(import.meta.dirname, "..", "src");

const SKIP_DIRS = new Set(["node_modules", ".next"]);

function walk(dir, found = []) {
  for (const entry of readdirSync(dir)) {
    if (SKIP_DIRS.has(entry)) continue;
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) walk(full, found);
    else if ([".ts", ".tsx"].includes(extname(entry))) found.push(full);
  }
  return found;
}

/** A path we are responsible for terminating with a slash. */
function needsSlash(value) {
  if (!value.startsWith("/")) return false; // absolute URL, anchor, mailto, tel
  if (value.startsWith("//")) return false; // protocol-relative
  if (value.endsWith("/")) return false;
  if (value.includes("#") || value.includes("?")) return false;
  if (extname(value)) return false; // a real file: /brand/logo.webp, /favicon.ico
  if (value.includes("${")) return false; // built from a template, checked at its source
  return true;
}

const offenders = [];

for (const file of walk(root)) {
  const source = readFileSync(file, "utf8");
  const lines = source.split("\n");
  lines.forEach((line, i) => {
    // Skip comment lines: several of them quote the unslashed form on purpose
    // while explaining exactly this bug.
    const trimmed = line.trim();
    if (trimmed.startsWith("*") || trimmed.startsWith("//")) return;

    for (const match of line.matchAll(/href:\s*"([^"]+)"|href="([^"]+)"/g)) {
      const value = match[1] ?? match[2];
      if (needsSlash(value)) {
        offenders.push(`${file.replace(root, "src")}:${i + 1}  href "${value}"`);
      }
    }
    // Sitemap entries are built from bare path strings in an array.
    for (const match of line.matchAll(/"(\/[a-z0-9\-/]*)"/gi)) {
      const value = match[1];
      if (value !== "/" && needsSlash(value) && /PATHS|paths/.test(source)) {
        if (line.includes("PATHS") || /^\s*"\//.test(line)) {
          offenders.push(`${file.replace(root, "src")}:${i + 1}  path "${value}"`);
        }
      }
    }
  });
}

if (offenders.length) {
  console.error(
    "✗ Internal links/paths missing a trailing slash (next.config.ts sets trailingSlash: true,\n" +
      "  so each of these costs a 308 and, in a sitemap or canonical, an indexing problem):\n" +
      offenders.map((o) => `    ${o}`).join("\n"),
  );
  process.exit(1);
}

console.log("✓ Internal links and sitemap paths all carry a trailing slash");
