"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import map from "@/lib/us-map-paths.json";

// Choropleth of the therapy workforce. One hue, light to dark, five bins by
// therapists per 100k residents; identity comes from the hover card, the labels
// and the table below the map, never from color alone.

export type MapState = {
  abbr: string;
  name: string;
  href: string;
  pt: number;
  ot: number;
  slp: number;
  aud: number;
  per100k: number; // PT + OT + SLP + Aud per 100k residents
};

const BINS = ["#c5e0ee", "#93c9e2", "#4aa3c7", "#146d8e", "#0a3a4d"] as const;
// States too small to carry a label or an easy hit target on the map.
const SMALL = new Set(["CT", "DC", "DE", "MD", "MA", "NH", "NJ", "RI", "VT"]);

const fmt = (v: number) => v.toLocaleString("en-US");

function quantileBreaks(values: number[]): number[] {
  const s = [...values].sort((a, b) => a - b);
  const q = (p: number) => s[Math.min(s.length - 1, Math.floor(p * (s.length - 1)))];
  return [q(0.2), q(0.4), q(0.6), q(0.8)];
}

function binIndex(v: number, breaks: number[]): number {
  let i = 0;
  while (i < breaks.length && v > breaks[i]) i++;
  return i;
}

export function UsMap({ states }: { states: MapState[] }) {
  const [active, setActive] = useState<string | null>(null);
  const [pos, setPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const byAbbr = useMemo(() => new Map(states.map((s) => [s.abbr, s])), [states]);
  const breaks = useMemo(() => quantileBreaks(states.map((s) => s.per100k)), [states]);
  const paths = map.states as Record<string, { d: string; cx: number; cy: number }>;
  const current = active ? byAbbr.get(active) : undefined;

  const legend = [
    `${breaks[0].toFixed(0)} or fewer`,
    `${(breaks[0] + 1).toFixed(0)} to ${breaks[1].toFixed(0)}`,
    `${(breaks[1] + 1).toFixed(0)} to ${breaks[2].toFixed(0)}`,
    `${(breaks[2] + 1).toFixed(0)} to ${breaks[3].toFixed(0)}`,
    `${(breaks[3] + 1).toFixed(0)} or more`,
  ];

  return (
    <div className="relative">
      <div
        className="relative"
        onMouseMove={(e) => {
          const r = e.currentTarget.getBoundingClientRect();
          setPos({ x: e.clientX - r.left, y: e.clientY - r.top });
        }}
        onMouseLeave={() => setActive(null)}
      >
        <svg
          viewBox={map.viewBox}
          role="group"
          aria-label="Map of the United States, shaded by therapists per 100,000 residents. Select a state for its page."
          className="mx-auto h-auto w-full max-w-5xl"
        >
          {states.map((s) => {
            const p = paths[s.abbr];
            if (!p) return null;
            const isActive = active === s.abbr;
            return (
              <a
                key={s.abbr}
                href={s.href}
                aria-label={`${s.name}: ${fmt(s.pt)} physical therapists, ${fmt(s.ot)} occupational therapists, ${fmt(s.slp)} speech-language pathologists`}
                onMouseEnter={() => setActive(s.abbr)}
                onFocus={() => setActive(s.abbr)}
                onBlur={() => setActive(null)}
              >
                <path
                  d={p.d}
                  fill={isActive ? "#044463" : BINS[binIndex(s.per100k, breaks)]}
                  stroke="#ffffff"
                  strokeWidth={isActive ? 2 : 1}
                  className="transition-colors duration-150"
                />
              </a>
            );
          })}
          <path d={map.mesh} fill="none" stroke="#ffffff" strokeWidth={0.75} pointerEvents="none" />
          {states.map((s) => {
            const p = paths[s.abbr];
            if (!p || SMALL.has(s.abbr)) return null;
            const dark = binIndex(s.per100k, breaks) >= 3 || active === s.abbr;
            return (
              <text
                key={`l-${s.abbr}`}
                x={p.cx}
                y={p.cy}
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize={11}
                fontWeight={600}
                fill={dark ? "#ffffff" : "#044463"}
                pointerEvents="none"
              >
                {s.abbr}
              </text>
            );
          })}
        </svg>

        {current && (
          <div
            className="pointer-events-none absolute z-10 w-56 rounded-lg border border-mist bg-white p-3 text-sm shadow-lg"
            style={{
              left: pos.x + 14,
              top: pos.y + 14,
              transform: pos.x > 700 ? "translateX(calc(-100% - 28px))" : undefined,
            }}
            role="status"
          >
            <p className="font-heading font-semibold text-navy-600">{current.name}</p>
            <dl className="mt-1 grid grid-cols-[1fr_auto] gap-x-3 gap-y-0.5 text-body">
              <dt>Physical therapists</dt>
              <dd className="text-right font-semibold text-ink">{fmt(current.pt)}</dd>
              <dt>Occupational therapists</dt>
              <dd className="text-right font-semibold text-ink">{fmt(current.ot)}</dd>
              <dt>Speech-language pathologists</dt>
              <dd className="text-right font-semibold text-ink">{fmt(current.slp)}</dd>
              <dt>Audiologists</dt>
              <dd className="text-right font-semibold text-ink">{fmt(current.aud)}</dd>
              <dt>Per 100k residents</dt>
              <dd className="text-right font-semibold text-ink">{current.per100k.toFixed(0)}</dd>
            </dl>
            <p className="mt-2 text-xs font-semibold text-teal-600">Open the {current.name} page →</p>
          </div>
        )}
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-body">
        <span className="font-semibold tracking-wide text-navy-600 uppercase">Therapists per 100k residents</span>
        {legend.map((label, i) => (
          <span key={label} className="inline-flex items-center gap-1.5">
            <span className="inline-block h-3 w-4 rounded-sm" style={{ backgroundColor: BINS[i] }} aria-hidden="true" />
            {label}
          </span>
        ))}
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-2 text-sm">
        <span className="text-body">Smaller states:</span>
        {states
          .filter((s) => SMALL.has(s.abbr))
          .map((s) => (
            <Link
              key={s.abbr}
              href={s.href}
              onMouseEnter={() => setActive(s.abbr)}
              onMouseLeave={() => setActive(null)}
              className="rounded-full border border-mist bg-white px-3 py-1 font-semibold text-navy-600 transition-colors hover:border-teal-500 hover:text-teal-600"
            >
              {s.name}
            </Link>
          ))}
      </div>
    </div>
  );
}
