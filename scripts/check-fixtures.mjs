// Fail the build if any market snapshot is still a fixture (ALLOW_FIXTURES=1 for template work).
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

const bad = [];
function walk(d) {
  for (const f of readdirSync(d)) {
    const p = join(d, f);
    if (statSync(p).isDirectory()) walk(p);
    else if (f.endsWith(".json") && JSON.parse(readFileSync(p, "utf-8")).fixture === true) bad.push(p);
  }
}
walk(join(process.cwd(), "data", "markets"));
if (bad.length && process.env.ALLOW_FIXTURES !== "1") {
  console.error(`check-fixtures: ${bad.length} fixture snapshot(s) still present, e.g. ${bad[0]}`);
  process.exit(1);
}
console.log(`check-fixtures: ok (${bad.length} fixtures${bad.length ? ", ALLOW_FIXTURES=1" : ""})`);
