"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { AlertCircle, ArrowUpRight, CheckCircle2 } from "lucide-react";
import { profile } from "@/lib/data";
import { Reveal } from "./Motion";

const field =
  "peer w-full border-0 border-b border-ink/20 bg-transparent px-0 pb-3 pt-6 text-lg text-ink placeholder-transparent outline-none transition-colors focus:border-accent focus:ring-0";
const labelCls =
  "pointer-events-none absolute left-0 top-6 text-lg text-muted transition-all duration-300 peer-focus:top-0 peer-focus:text-xs peer-focus:text-accent peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-xs";

const topics = ["WordPress plugin", "WooCommerce", "Hacked site / malware", "Speed optimization", "Other"];

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState("");
  const [topic, setTopic] = useState(topics[0]);

  // Sends through /api/contact → Brevo (see app/api/contact/route.ts)
  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const d = Object.fromEntries(new FormData(form));
    setStatus("sending");
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ ...d, topic }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(json.error || "Something went wrong.");
      form.reset();
      setStatus("sent");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setStatus("error");
    }
  }

  return (
    <Reveal delay={0.1}>
      <form onSubmit={onSubmit} className="space-y-10">
        <div>
          <p className="mb-4 text-sm text-muted">I need help with…</p>
          <div className="flex flex-wrap gap-2">
            {topics.map((t) => (
              <button
                type="button"
                key={t}
                onClick={() => setTopic(t)}
                className={`rounded-full border px-4 py-2 text-sm transition-colors duration-300 ${
                  topic === t ? "border-ink bg-ink text-paper" : "border-ink/15 text-ink/70 hover:border-ink"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
        <div className="grid gap-10 sm:grid-cols-2">
          <label className="relative block">
            <input required name="name" placeholder="Name" className={field} />
            <span className={labelCls}>Your name</span>
          </label>
          <label className="relative block">
            <input required type="email" name="email" placeholder="Email" className={field} />
            <span className={labelCls}>Your email</span>
          </label>
        </div>
        <label className="relative block">
          <textarea required name="message" rows={4} placeholder="Message" className={`${field} resize-none`} />
          <span className={labelCls}>Tell me about your project</span>
        </label>
        {/* Honeypot for spam bots — hidden from people and screen readers */}
        <input type="text" name="company" tabIndex={-1} autoComplete="off" aria-hidden className="hidden" />
        <div className="flex flex-wrap items-center gap-6">
          <motion.button
            whileTap={{ scale: 0.97 }}
            disabled={status === "sending"}
            className="btn-primary !px-8 !py-4 text-base disabled:cursor-wait disabled:opacity-60"
          >
            {status === "sending" ? "Sending…" : "Send message"} <ArrowUpRight size={18} />
          </motion.button>
          <AnimatePresence mode="wait">
            {status === "sent" && (
              <motion.p
                key="ok"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                role="status"
                className="flex items-center gap-2 text-sm text-emerald-700"
              >
                <CheckCircle2 size={16} /> Thanks! Your message is on its way — check your inbox for a confirmation.
              </motion.p>
            )}
            {status === "error" && (
              <motion.p
                key="err"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                role="alert"
                className="flex items-center gap-2 text-sm text-red-700"
              >
                <AlertCircle size={16} /> {error}{" "}
                <a href={`mailto:${profile.email}`} className="underline">
                  {profile.email}
                </a>
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </form>
    </Reveal>
  );
}
