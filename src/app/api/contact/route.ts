import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

const MAX_RESUME_BYTES = 8 * 1024 * 1024; // Resend caps total message size at 40MB; 8MB is plenty for a resume
const ALLOWED_RESUME_TYPES = new Set([
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
]);

// Naive in-memory rate limit: fine on a single serverless instance; a determined
// spammer is stopped by the honeypot + Resend's own limits, not this.
const recent = new Map<string, number[]>();
function rateLimited(ip: string): boolean {
  const now = Date.now();
  const hits = (recent.get(ip) ?? []).filter((t) => now - t < 60_000);
  hits.push(now);
  recent.set(ip, hits);
  return hits.length > 5;
}

function clean(value: FormDataEntryValue | null, max: number): string {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

export async function POST(req: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  const candidateTo = process.env.CONTACT_TO_EMAIL ?? "molly@aptrecruiting.com";
  // Hiring inquiries can go to their own inbox (a hire@ mailbox, once one
  // exists). Falls back to the candidate inbox until HIRE_TO_EMAIL is set on
  // Vercel, so an employer's message is never sent to a mailbox that does not
  // exist yet.
  const hireTo = process.env.HIRE_TO_EMAIL ?? candidateTo;
  if (!apiKey) {
    return NextResponse.json(
      { error: "Form delivery is not configured yet. Please email molly@aptrecruiting.com." },
      { status: 503 },
    );
  }

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (rateLimited(ip)) {
    return NextResponse.json({ error: "Too many requests. Please try again in a minute." }, { status: 429 });
  }

  const form = await req.formData();

  // Honeypot: humans never see this field
  if (clean(form.get("company_website"), 200)) {
    return NextResponse.json({ ok: true });
  }

  const isHire = clean(form.get("intent"), 20) === "hire";
  const firstName = clean(form.get("firstName"), 100);
  const lastName = clean(form.get("lastName"), 100);
  const email = clean(form.get("email"), 200);
  const phone = clean(form.get("phone"), 40);
  const message = clean(form.get("message"), 5000);
  const organization = clean(form.get("organization"), 200);
  const market = clean(form.get("market"), 120);
  const role = clean(form.get("role"), 200);
  const setting = clean(form.get("setting"), 120);
  const discipline = clean(form.get("discipline"), 120);

  const complete = isHire
    ? firstName && lastName && email && organization && market && role
    : firstName && lastName && email && message;
  if (!complete) {
    return NextResponse.json({ error: "Please fill in all required fields." }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  }

  const attachments: { filename: string; content: Buffer }[] = [];
  const resume = form.get("resume");
  if (resume instanceof File && resume.size > 0) {
    if (resume.size > MAX_RESUME_BYTES) {
      return NextResponse.json({ error: "Resume must be under 8 MB." }, { status: 400 });
    }
    if (resume.type && !ALLOWED_RESUME_TYPES.has(resume.type)) {
      return NextResponse.json({ error: "Resume must be a PDF or Word document." }, { status: 400 });
    }
    attachments.push({
      filename: resume.name || "resume",
      content: Buffer.from(await resume.arrayBuffer()),
    });
  }

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    // Until aptrecruiting.com is verified in Resend, send from Voll's verified domain.
    // Replies go to the visitor; the inbox that RECEIVES is molly@ (CONTACT_TO_EMAIL).
    from: process.env.CONTACT_FROM_EMAIL ?? "APT Recruiting Website <apt@vollrecruiting.com>",
    to: (isHire ? hireTo : candidateTo).split(",").map((t) => t.trim()),
    replyTo: email,
    subject: isHire
      ? `Hiring inquiry: ${role} at ${organization} (${market})`
      : `Website inquiry from ${firstName} ${lastName}`,
    text: [
      isHire ? "HIRING INQUIRY (from /contact/hire/)" : null,
      `Name: ${firstName} ${lastName}`,
      isHire ? `Organization: ${organization}` : null,
      `Email: ${email}`,
      phone ? `Phone: ${phone}` : null,
      market ? `${isHire ? "Location" : "Wants to work in"}: ${market}` : null,
      isHire ? `Role: ${role}` : null,
      isHire && setting ? `Setting: ${setting}` : null,
      !isHire && discipline ? `Discipline: ${discipline}` : null,
      isHire ? null : attachments.length ? `Resume: ${attachments[0].filename} (attached)` : "Resume: none",
      "",
      message || "(no message)",
    ]
      .filter((line) => line !== null)
      .join("\n"),
    attachments,
  });

  if (error) {
    console.error("contact form send failed:", error);
    return NextResponse.json(
      { error: "We couldn't send your message. Please email molly@aptrecruiting.com directly." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
