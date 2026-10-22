"use client";

import { useState } from "react";

export function CandidateAlertForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState("");
  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); const form = e.currentTarget; const data = new FormData(form);
    setStatus("sending"); setError("");
    try { const res = await fetch("/api/contact", { method: "POST", body: data }); if (!res.ok) throw new Error((await res.json().catch(() => null))?.error ?? "Please try again."); setStatus("sent"); form.reset(); }
    catch (err) { setStatus("error"); setError(err instanceof Error ? err.message : "Please try again."); }
  }
  if (status === "sent") return <div className="rounded-lg border border-teal-200 bg-teal-50 p-5 text-body">You’re on our candidate-update list. Your preferences stay confidential.</div>;
  const input = "w-full rounded-md border border-mist bg-white px-3 py-2.5 text-ink focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-200";
  return <form onSubmit={submit} className="grid gap-3 sm:grid-cols-2">
    <input type="text" name="company_website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
    <input type="hidden" name="intent" value="alert" /><input type="hidden" name="lastName" value="Candidate" /><input type="hidden" name="message" value="Candidate job-alert signup." />
    <div><label className="mb-1 block text-sm font-medium text-ink" htmlFor="alert-name">First name</label><input id="alert-name" name="firstName" required maxLength={100} className={input} /></div>
    <div><label className="mb-1 block text-sm font-medium text-ink" htmlFor="alert-email">Email</label><input id="alert-email" name="email" type="email" required maxLength={200} className={input} /></div>
    <div><label className="mb-1 block text-sm font-medium text-ink" htmlFor="alert-discipline">Discipline</label><select id="alert-discipline" name="discipline" className={input} defaultValue=""><option value="">Select one</option><option>Physical therapist</option><option>Occupational therapist</option><option>Speech-language pathologist</option><option>Audiologist</option><option>Nurse practitioner</option><option>Physician assistant</option><option>Certified hand therapist</option><option>Pelvic health therapist</option></select></div>
    <div><label className="mb-1 block text-sm font-medium text-ink" htmlFor="alert-market">Preferred location</label><input id="alert-market" name="market" maxLength={120} placeholder="State, metro, or remote" className={input} /></div>
    <label className="sm:col-span-2 flex gap-2 text-sm text-body"><input required type="checkbox" name="consent" value="yes" />I’d like confidential candidate updates from APT Recruiting. I can unsubscribe at any time.</label>
    <div className="sm:col-span-2"><button disabled={status === "sending"} className="rounded-md bg-teal-500 px-5 py-2.5 font-semibold text-white hover:bg-teal-600 disabled:opacity-60">{status === "sending" ? "Signing up…" : "Get candidate updates"}</button>{status === "error" && <p className="mt-2 text-sm text-red-600">{error}</p>}</div>
  </form>;
}
