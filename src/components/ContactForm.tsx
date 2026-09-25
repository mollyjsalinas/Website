"use client";

import { useState } from "react";

type Status = "idle" | "sending" | "sent" | "error";

const inputCls =
  "w-full rounded-md border border-mist bg-white px-3 py-2.5 text-ink placeholder-body/60 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-200";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [fileName, setFileName] = useState("");

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
      setFileName("");
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
          Molly will reach out within one business day. Everything you sent stays confidential.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4 sm:grid-cols-2">
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
      <div>
        <label htmlFor="email" className="mb-1 block text-sm font-medium text-ink">
          Email *
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
        <label htmlFor="discipline" className="mb-1 block text-sm font-medium text-ink">
          Discipline
        </label>
        <select id="discipline" name="discipline" className={inputCls} defaultValue="">
          <option value="">Select one</option>
          <option>Physical therapist</option>
          <option>Physical therapist assistant</option>
          <option>Occupational therapist</option>
          <option>Occupational therapy assistant</option>
          <option>Speech-language pathologist</option>
          <option>Audiologist</option>
          <option>Rehab leadership</option>
          <option>Nurse practitioner or physician assistant</option>
          <option>Other</option>
        </select>
      </div>
      <div>
        <label htmlFor="market" className="mb-1 block text-sm font-medium text-ink">
          Where do you want to work?
        </label>
        <input id="market" name="market" maxLength={120} placeholder="e.g. Houston, TX or remote" className={inputCls} />
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="resume" className="mb-1 block text-sm font-medium text-ink">
          Resume (PDF or Word, optional)
        </label>
        <input
          id="resume"
          name="resume"
          type="file"
          accept=".pdf,.doc,.docx"
          className="sr-only"
          onChange={(e) => setFileName(e.target.files?.[0]?.name ?? "")}
        />
        <div className="flex items-center gap-3">
          <label
            htmlFor="resume"
            className="inline-flex cursor-pointer items-center gap-2 rounded-md border border-mist bg-white px-4 py-2.5 text-sm font-medium text-ink transition-colors hover:border-teal-400 hover:text-teal-700 focus-within:ring-2 focus-within:ring-teal-200"
          >
            {fileName ? "Change file" : "Upload resume"}
          </label>
          <span className="min-w-0 flex-1 truncate text-sm text-body" aria-live="polite">
            {fileName || "No file selected"}
          </span>
        </div>
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="message" className="mb-1 block text-sm font-medium text-ink">
          What are you looking for? *
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          maxLength={5000}
          placeholder="Setting, schedule, pay range, anything that would make a move worth it."
          className={inputCls}
        />
      </div>
      <div className="sm:col-span-2">
        <button
          type="submit"
          disabled={status === "sending"}
          className="w-full rounded-md bg-teal-500 px-6 py-3 font-semibold text-white transition-colors hover:bg-teal-600 disabled:opacity-60 sm:w-auto"
        >
          {status === "sending" ? "Sending..." : "Send (it's confidential)"}
        </button>
        {status === "error" && <p className="mt-3 text-sm text-red-600">{error}</p>}
        <p className="mt-3 text-xs text-body">
          We never share your resume or identity with any employer without your explicit consent.
        </p>
      </div>
    </form>
  );
}
