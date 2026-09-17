"use client";

import { useMemo, useState } from "react";
import map from "@/lib/us-map-paths.json";
import coords from "@/lib/metro-coords.json";

// One state's outline with a dot per metro page, placed at the metro's
// principal city. The state path is the same us-atlas geometry the national
// map uses (src/lib/us-map-paths.json); the city points come from
// src/lib/metro-coords.json, projected once with the same albersUsa
// scale/translate so the two line up. A metro with no entry there gets no
// dot; the link list under the map still carries it.

export type MetroDot = { city: string; slug: string; href: string };

type Coord = { city: string; x: number; y: number };

const PAD = 0.06;

// Paths are absolute M/L/Z only, so every number is one half of an x,y pair.
function bbox(d: string): { x: number; y: number; w: number; h: number } {
  const nums = d.match(/-?\d+(?:\.\d+)?/g)?.map(Number) ?? [];
  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
  for (let i = 0; i + 1 < nums.length; i += 2) {
    const x = nums[i], y = nums[i + 1];
    if (x < minX) minX = x;
    if (x > maxX) maxX = x;
    if (y < minY) minY = y;
    if (y > maxY) maxY = y;
  }
  const w = maxX - minX, h = maxY - minY;
  const pad = Math.max(w, h) * PAD;
  const r1 = (v: number) => Math.round(v * 10) / 10;
  return { x: r1(minX - pad), y: r1(minY - pad), w: r1(w + pad * 2), h: r1(h + pad * 2) };
}

export function StateMetroMap({ abbr, name, metros }: { abbr: string; name: string; metros: MetroDot[] }) {
  const [active, setActive] = useState<string | null>(null);
  const paths = map.states as Record<string, { d: string; cx: number; cy: number }>;
  const points = coords as Record<string, Coord>;
  const state = paths[abbr];
  const box = useMemo(() => (state ? bbox(state.d) : null), [state]);

  if (!state || !box) return null;

  const dots = metros
    .map((m) => ({ ...m, at: points[`${abbr}/${m.slug}`] }))
    .filter((m): m is MetroDot & { at: Coord } => Boolean(m.at));
  if (dots.length === 0) return null;

  // Size marks against the state, not the page, so a small state reads the
  // same as a large one.
  const unit = Math.max(box.w, box.h) / 100;
  const r = 1.8 * unit;
  const font = 4.2 * unit;
  const midX = box.x + box.w / 2;

  return (
    <svg
      viewBox={`${box.x} ${box.y} ${box.w} ${box.h}`}
      role="group"
      aria-label={`Map of ${name} with a marker for each metro page. Select a city for its page.`}
      className="mx-auto h-auto w-full max-w-md"
    >
      <path d={state.d} fill="#e5eff5" stroke="#146d8e" strokeWidth={0.6 * unit} strokeLinejoin="round" />
      {dots.map((m) => {
        const isActive = active === m.slug;
        const right = m.at.x <= midX;
        return (
          <a
            key={m.slug}
            href={m.href}
            aria-label={`${m.city}: therapy recruiting in the ${m.city} metro`}
            onMouseEnter={() => setActive(m.slug)}
            onMouseLeave={() => setActive(null)}
            onFocus={() => setActive(m.slug)}
            onBlur={() => setActive(null)}
          >
            <circle
              cx={m.at.x}
              cy={m.at.y}
              r={isActive ? r * 1.35 : r}
              fill={isActive ? "#044463" : "#1a9ab8"}
              stroke="#ffffff"
              strokeWidth={0.5 * unit}
              className="transition-all duration-150"
            />
            <text
              x={right ? m.at.x + r * 1.6 : m.at.x - r * 1.6}
              y={m.at.y}
              textAnchor={right ? "start" : "end"}
              dominantBaseline="middle"
              fontSize={font}
              fontWeight={isActive ? 700 : 600}
              fill={isActive ? "#044463" : "#0a3a4d"}
              stroke="#ffffff"
              strokeWidth={0.4 * unit}
              paintOrder="stroke"
            >
              {m.city}
            </text>
          </a>
        );
      })}
    </svg>
  );
}
