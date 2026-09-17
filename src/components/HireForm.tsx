"use client";

import { useState } from "react";

type Status = "idle" | "sending" | "sent" | "error";

const inputCls =
  "w-full rounded-md border border-mist bg-white px-3 py-2.5 text-ink placeholder-body/60 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-200";

/**
 * The employer form. Same endpoint as the candidate form, but `intent=hire`
 * routes it with a hiring subject line, and there is no resume field: the
 * first thing a director of rehab sees must not be "upload your resume".
 */
export function HireForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    setStatus("sending");
    setError("");
    try {
      const res = await fetch("/api/contact", { method: "POST", body: data });
      if (!res.ok) {
        const body = (await res.json().catch(() => null)) as { error?: string } | null;
        throw new Error(body?.error ?? "Something went wrong. Please email us directly.");
      }
      setStatus("sent");
      form.reset();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  if (status === "sent") {
    return (
      <div className="rounded-lg border border-teal-200 bg-teal-50 p-8 text-center">
        <p className="font-heading text-xl font-semibold text-navy-600">Thank you. We got it.</p>
        <p className="mt-2 text-body">
          Molly will call or email within one business day to take the brief.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4 sm:grid-cols-2">
      <input type="hidden" name="intent" value="hire" />
      {/* Honeypot: hidden from humans, bots fill it in */}
      <input type="text" name="company_website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
      <div>
        <label htmlFor="firstName" className="mb-1 block text-sm font-medium text-ink">
          First name *
        </label>
        <input id="firstName" name="firstName" required maxLength={100} className={inputCls} />
      </div>
      <div>
        <label htmlFor="lastName" className="mb-1 block text-sm font-medium text-ink">
          Last name *
        </label>
        <input id="lastName" name="lastName" required maxLength={100} className={inputCls} />
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="organization" className="mb-1 block text-sm font-medium text-ink">
          Facility or organization *
        </label>
        <input id="organization" name="organization" required maxLength={200} className={inputCls} />
      </div>
      <div>
        <label htmlFor="email" className="mb-1 block text-sm font-medium text-ink">
          Work email *
        </label>
        <input id="email" name="email" type="email" required maxLength={200} className={inputCls} />
      </div>
      <div>
        <label htmlFor="phone" className="mb-1 block text-sm font-medium text-ink">
          Phone
        </label>
        <input id="phone" name="phone" type="tel" maxLength={40} className={inputCls} />
      </div>
      <div>
        <label htmlFor="market" className="mb-1 block text-sm font-medium text-ink">
          Location (city or state) *
        </label>
        <input id="market" name="market" required maxLength={120} placeholder="e.g. Houston, TX" className={inputCls} />
      </div>
      <div>
        <label htmlFor="role" className="mb-1 block text-sm font-medium text-ink">
          Role to fill *
        </label>
        <input
          id="role"
          name="role"
          required
          maxLength={200}
          placeholder="e.g. Outpatient PT, SNF SLP, Director of Rehab"
          className={inputCls}
        />
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="setting" className="mb-1 block text-sm font-medium text-ink">
          Setting
        </label>
        <select id="setting" name="setting" className={inputCls} defaultValue="">
          <option value="">Select one</option>
          <option>Hospital or acute rehab</option>
          <option>Skilled nursing or long-term care</option>
          <option>Home health</option>
          <option>Outpatient clinic or private practice</option>
          <option>School or pediatrics</option>
          <option>Telehealth</option>
          <option>Other</option>
        </select>
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="message" className="mb-1 block text-sm font-medium text-ink">
          Anything else we should know?
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          maxLength={5000}
          placeholder="Caseload, schedule, pay range, timing, what has not worked so far."
          className={inputCls}
        />
      </div>
      <div className="sm:col-span-2">
        <button
          type="submit"
          disabled={status === "sending"}
          className="w-full rounded-md bg-teal-500 px-6 py-3 font-semibold text-white transition-colors hover:bg-teal-600 disabled:opacity-60 sm:w-auto"
        >
          {status === "sending" ? "Sending..." : "Request a call"}
        </button>
        {status === "error" && <p className="mt-3 text-sm text-red-600">{error}</p>}
        <p className="mt-3 text-xs text-body">
          No cost and no commitment to have the conversation. Terms are agreed in writing before
          you see any candidate&apos;s identifying details.
        </p>
      </div>
    </form>
  );
}
