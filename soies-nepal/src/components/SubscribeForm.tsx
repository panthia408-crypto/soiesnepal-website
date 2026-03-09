"use client";

import { useState } from "react";
import { Send, Check, Loader2 } from "lucide-react";

export default function SubscribeForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;

    setStatus("loading");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (res.ok) {
        setStatus("success");
        setMessage(data.message);
        setEmail("");
      } else {
        setStatus("error");
        setMessage(data.error || "Something went wrong");
      }
    } catch {
      setStatus("error");
      setMessage("Network error. Please try again.");
    }
  }

  return (
    <div>
      <h4 className="text-slate-900 dark:text-white font-bold text-base mb-2">Keep Me Informed</h4>
      <p className="text-slate-500 dark:text-navy-400 text-xs mb-3">
        Get notified about events and announcements.
      </p>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="email"
          placeholder="your@email.com"
          value={email}
          onChange={(e) => { setEmail(e.target.value); setStatus("idle"); }}
          required
          className="flex-1 px-3 py-2 bg-white dark:bg-navy-900/50 border border-slate-200 dark:border-navy-700/50 rounded-lg text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-navy-500 focus:outline-none focus:border-gold-500/50 transition-colors"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="px-3 py-2 bg-gold-500 hover:bg-gold-400 text-navy-950 rounded-lg text-sm font-semibold transition-colors disabled:opacity-50 flex items-center gap-1"
        >
          {status === "loading" ? (
            <Loader2 size={14} className="animate-spin" />
          ) : status === "success" ? (
            <Check size={14} />
          ) : (
            <Send size={14} />
          )}
        </button>
      </form>
      {message && (
        <p className={`text-xs mt-2 ${status === "success" ? "text-green-600 dark:text-green-400" : "text-red-500"}`}>
          {message}
        </p>
      )}
    </div>
  );
}
