// Number formatting shared by every data page. Every helper tolerates null and
// undefined so a suppressed BLS cell renders as "n/a", never "undefined" or "NaN".

export const n = (v: number | null | undefined): string =>
  v == null || Number.isNaN(v) ? "n/a" : Math.round(v).toLocaleString("en-US");

export const usd = (v: number | null | undefined): string =>
  v == null || Number.isNaN(v) ? "n/a" : `$${Math.round(v).toLocaleString("en-US")}`;

export const dec1 = (v: number | null | undefined): string =>
  v == null || Number.isNaN(v) ? "n/a" : v.toFixed(1);

export const pct = (v: number | null | undefined): string =>
  v == null || Number.isNaN(v) ? "n/a" : `${v.toFixed(v % 1 === 0 ? 0 : 1)}%`;

// "up 2.5%", "down 1.0%", "flat" for a year-over-year change. Null when the key
// is absent so callers can omit the sentence entirely.
export const yoy = (v: number | null | undefined): string | null => {
  if (v == null || Number.isNaN(v)) return null;
  if (v === 0) return "flat";
  return `${v > 0 ? "up" : "down"} ${Math.abs(v).toFixed(1)}%`;
};

// Weekly wage x 52, the sector payroll average across ALL occupations in the
// industry. Labelled as such wherever it is printed; it is not a therapist salary.
export const annualFromWeekly = (weekly: number | null | undefined): string =>
  weekly == null ? "n/a" : usd(weekly * 52);

export const longDate = (iso: string): string =>
  new Date(`${iso}T00:00:00`).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });

// Oxford-comma list: ["a", "b", "c"] -> "a, b and c".
export const list = (items: string[]): string =>
  items.length <= 1 ? items.join("") : `${items.slice(0, -1).join(", ")} and ${items[items.length - 1]}`;
