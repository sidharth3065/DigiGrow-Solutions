"use client";

import { useState } from "react";
import { ArrowLeft, Loader2, Mail } from "lucide-react";
import Link from "next/link";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulated — real implementation would call /api/auth/forgot-password
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setSent(true);
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4"
      style={{ backgroundColor: "var(--background)" }}>
      <div className="w-full max-w-md">
        <div className="glass-card p-8 text-center">
          {sent ? (
            <div className="animate-fade-in">
              <div className="w-16 h-16 mx-auto mb-6 rounded-2xl flex items-center justify-center"
                style={{ backgroundColor: "rgba(0, 230, 118, 0.1)", border: "1px solid rgba(0, 230, 118, 0.2)" }}>
                <Mail size={28} style={{ color: "var(--success)" }} />
              </div>
              <h2 className="text-2xl font-bold mb-2" style={{ color: "var(--foreground)" }}>
                Check your email
              </h2>
              <p className="text-sm mb-6" style={{ color: "var(--muted-foreground)" }}>
                We sent a password reset link to <strong>{email}</strong>
              </p>
              <Link href="/login"
                className="inline-flex items-center gap-2 text-sm font-medium transition-colors hover:underline"
                style={{ color: "var(--primary)" }}>
                <ArrowLeft size={14} />
                Back to login
              </Link>
            </div>
          ) : (
            <>
              <div className="w-16 h-16 mx-auto mb-6 rounded-2xl flex items-center justify-center"
                style={{ background: "linear-gradient(135deg, rgba(108,92,231,0.15), rgba(0,210,255,0.15))", border: "1px solid var(--border)" }}>
                <Mail size={28} style={{ color: "var(--primary)" }} />
              </div>
              <h2 className="text-2xl font-bold mb-2" style={{ color: "var(--foreground)" }}>
                Forgot password?
              </h2>
              <p className="text-sm mb-8" style={{ color: "var(--muted-foreground)" }}>
                Enter your email and we&apos;ll send you a reset link
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  id="forgot-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@business.com"
                  required
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
                  style={{
                    backgroundColor: "var(--muted)",
                    color: "var(--foreground)",
                    border: "1px solid var(--border)",
                  }}
                />
                <button
                  type="submit"
                  disabled={loading}
                  id="forgot-submit"
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold transition-all hover:opacity-90 disabled:opacity-50"
                  style={{ background: "linear-gradient(135deg, #6C5CE7, #7C6CF7)", color: "#fff" }}
                >
                  {loading ? <Loader2 size={18} className="animate-spin" /> : "Send Reset Link"}
                </button>
              </form>

              <p className="mt-6 text-sm" style={{ color: "var(--muted-foreground)" }}>
                <Link href="/login" className="inline-flex items-center gap-1 font-medium hover:underline"
                  style={{ color: "var(--primary)" }}>
                  <ArrowLeft size={14} />
                  Back to login
                </Link>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
