// Build src/lib/us-map-paths.json from us-atlas (US Census, public domain) once.
// states-10m.json is pre-projected (geoAlbersUsa, 975x610), so a null projection works.
import { readFileSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";
import * as topojson from "topojson-client";
import { geoPath } from "d3-geo";
import { presimplify, simplify, quantile } from "topojson-simplify";
const require = createRequire(import.meta.url);
let topo = JSON.parse(readFileSync(require.resolve("us-atlas/states-albers-10m.json"), "utf-8"));
topo = presimplify(topo);
topo = simplify(topo, quantile(topo, 0.6));
const fc = topojson.feature(topo, topo.objects.states);
const path = geoPath(null);
const FIPS = {"01":"AL","02":"AK","04":"AZ","05":"AR","06":"CA","08":"CO","09":"CT","10":"DE","11":"DC","12":"FL","13":"GA","15":"HI","16":"ID","17":"IL","18":"IN","19":"IA","20":"KS","21":"KY","22":"LA","23":"ME","24":"MD","25":"MA","26":"MI","27":"MN","28":"MS","29":"MO","30":"MT","31":"NE","32":"NV","33":"NH","34":"NJ","35":"NM","36":"NY","37":"NC","38":"ND","39":"OH","40":"OK","41":"OR","42":"PA","44":"RI","45":"SC","46":"SD","47":"TN","48":"TX","49":"UT","50":"VT","51":"VA","53":"WA","54":"WV","55":"WI","56":"WY"};
const out = {};
for (const f of fc.features) {
  const abbr = FIPS[f.id]; if (!abbr) continue;
  const d = path(f); const [cx, cy] = path.centroid(f);
  out[abbr] = { d: d.replace(/(\d+\.\d)\d+/g, "$1"), cx: +cx.toFixed(1), cy: +cy.toFixed(1) };
}
const mesh = path(topojson.mesh(topo, topo.objects.states, (a, b) => a !== b)).replace(/(\d+\.\d)\d+/g, "$1");
writeFileSync("src/lib/us-map-paths.json", JSON.stringify({ viewBox: "0 0 975 610", states: out, mesh }));
console.log(Object.keys(out).length, "states; bytes", JSON.stringify({ states: out, mesh }).length);
