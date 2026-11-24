import { NextResponse } from "next/server";
import { ownerNotification, visitorAutoReply, type ContactData } from "@/lib/emailTemplates";

/*
 * Contact form → Brevo transactional email.
 * Needs these in .env.local (and in your hosting provider's env settings):
 *   BREVO_API_KEY        Brevo → SMTP & API → API Keys
 *   BREVO_SENDER_EMAIL   a sender you have verified in Brevo → Senders & IP
 *   CONTACT_TO_EMAIL     where messages should arrive (your inbox)
 */

export const runtime = "nodejs";

type Mail = { to: { email: string; name?: string }; replyTo: { email: string; name?: string }; subject: string; html: string; text: string };

async function sendBrevo(apiKey: string, senderEmail: string, m: Mail) {
  return fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: { "api-key": apiKey, "content-type": "application/json", accept: "application/json" },
    body: JSON.stringify({
      sender: { name: "Shubham Thakur", email: senderEmail },
      to: [m.to],
      replyTo: m.replyTo,
      subject: m.subject,
      htmlContent: m.html,
      textContent: m.text,
    }),
  });
}

export async function POST(req: Request) {
  const { BREVO_API_KEY, BREVO_SENDER_EMAIL, CONTACT_TO_EMAIL } = process.env;
  if (!BREVO_API_KEY || !BREVO_SENDER_EMAIL || !CONTACT_TO_EMAIL) {
    console.error("Contact form: missing BREVO_API_KEY / BREVO_SENDER_EMAIL / CONTACT_TO_EMAIL");
    return NextResponse.json({ error: "Email is not configured yet." }, { status: 500 });
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const str = (k: string, max: number) => String(body[k] ?? "").trim().slice(0, max);
  const data: ContactData = {
    name: str("name", 100),
    email: str("email", 200),
    topic: str("topic", 60) || "General",
    message: str("message", 5000),
  };

  // Honeypot: real visitors never see or fill this field
  if (str("company", 200)) return NextResponse.json({ ok: true });

  if (!data.name || !data.message || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    return NextResponse.json({ error: "Please fill in your name, a valid email and a message." }, { status: 400 });
  }

  // 1) Notify you — this one must succeed
  const owner = ownerNotification(data);
  const res = await sendBrevo(BREVO_API_KEY, BREVO_SENDER_EMAIL, {
    to: { email: CONTACT_TO_EMAIL },
    replyTo: { email: data.email, name: data.name },
    ...owner,
  });
  if (!res.ok) {
    console.error("Brevo error", res.status, await res.text());
    return NextResponse.json({ error: "Could not send right now. Please email me directly." }, { status: 502 });
  }

  // 2) Auto-reply to the visitor — a failure here shouldn't fail the request
  const reply = visitorAutoReply(data, CONTACT_TO_EMAIL);
  const ack = await sendBrevo(BREVO_API_KEY, BREVO_SENDER_EMAIL, {
    to: { email: data.email, name: data.name },
    replyTo: { email: CONTACT_TO_EMAIL, name: "Shubham Thakur" },
    ...reply,
  }).catch((e) => {
    console.error("Brevo auto-reply failed", e);
    return null;
  });
  if (ack && !ack.ok) console.error("Brevo auto-reply error", ack.status, await ack.text());

  return NextResponse.json({ ok: true });
}
