"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/authStore";
import { Eye, EyeOff, ArrowRight, Loader2, Building2 } from "lucide-react";
import Link from "next/link";

export default function RegisterPage() {
  const router = useRouter();
  const { setAuth } = useAuthStore();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, businessName, role: "CLIENT" }),
      });
      const data = await res.json();

      if (!res.ok) {
        const errMsg = typeof data.error === "string" ? data.error : "Registration failed";
        setError(errMsg);
        return;
      }

      setAuth(data.user, data.accessToken, data.refreshToken);
      router.push("/client");
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex" style={{ backgroundColor: "var(--background)" }}>
      {/* Left Branding Panel */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden items-center justify-center p-12">
        <div className="absolute inset-0"
          style={{ background: "linear-gradient(135deg, #00D2FF 0%, #0B0F1A 50%, #6C5CE7 100%)" }} />
        <div className="absolute inset-0"
          style={{ background: "radial-gradient(circle at 60% 40%, rgba(0, 210, 255, 0.25) 0%, transparent 50%)" }} />
        <div className="absolute w-72 h-72 rounded-full opacity-20 animate-pulse"
          style={{ background: "radial-gradient(circle, #00D2FF, transparent)", top: "15%", right: "20%" }} />
        <div className="absolute w-48 h-48 rounded-full opacity-15 animate-pulse"
          style={{ background: "radial-gradient(circle, #6C5CE7, transparent)", bottom: "25%", left: "15%", animationDelay: "1.5s" }} />

        <div className="relative z-10 max-w-lg text-center">
          <div className="w-20 h-20 mx-auto mb-8 rounded-2xl flex items-center justify-center"
            style={{ background: "rgba(255,255,255,0.1)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.15)" }}>
            <span className="text-white text-3xl font-bold">DG</span>
          </div>
          <h1 className="text-5xl font-bold text-white mb-4">
            Grow Your <span style={{ color: "#00D2FF" }}>Business</span>
          </h1>
          <p className="text-lg text-white/70 leading-relaxed">
            Join thousands of local businesses using DigiGrow to scale their digital marketing effortlessly.
          </p>
        </div>
      </div>

      {/* Right Register Panel */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="lg:hidden text-center mb-8">
            <div className="w-14 h-14 mx-auto mb-4 rounded-xl flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, #6C5CE7, #00D2FF)" }}>
              <span className="text-white text-xl font-bold">DG</span>
            </div>
            <h2 className="text-2xl font-bold gradient-text">DigiGrow Solutions</h2>
          </div>

          <div className="glass-card p-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold" style={{ color: "var(--foreground)" }}>
                Create your account
              </h2>
              <p className="mt-2 text-sm" style={{ color: "var(--muted-foreground)" }}>
                Start your digital marketing journey
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="px-4 py-3 rounded-xl text-sm animate-fade-in"
                  style={{ backgroundColor: "rgba(255, 82, 82, 0.1)", color: "var(--danger)", border: "1px solid rgba(255, 82, 82, 0.2)" }}>
                  {error}
                </div>
              )}

              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: "var(--foreground)" }}>Full Name</label>
                <input
                  id="register-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  required
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-200"
                  style={{ backgroundColor: "var(--muted)", color: "var(--foreground)", border: "1px solid var(--border)" }}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: "var(--foreground)" }}>Email Address</label>
                <input
                  id="register-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@business.com"
                  required
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-200"
                  style={{ backgroundColor: "var(--muted)", color: "var(--foreground)", border: "1px solid var(--border)" }}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: "var(--foreground)" }}>
                  <Building2 size={14} className="inline mr-1" />
                  Business Name
                </label>
                <input
                  id="register-business"
                  type="text"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  placeholder="Your Business Name"
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-200"
                  style={{ backgroundColor: "var(--muted)", color: "var(--foreground)", border: "1px solid var(--border)" }}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: "var(--foreground)" }}>Password</label>
                <div className="relative">
                  <input
                    id="register-password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Min 6 characters"
                    required
                    minLength={6}
                    className="w-full px-4 py-3 pr-12 rounded-xl text-sm outline-none transition-all duration-200"
                    style={{ backgroundColor: "var(--muted)", color: "var(--foreground)", border: "1px solid var(--border)" }}
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1"
                    style={{ color: "var(--muted-foreground)" }}>
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                id="register-submit"
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold transition-all duration-200 hover:opacity-90 disabled:opacity-50"
                style={{ background: "linear-gradient(135deg, #6C5CE7, #7C6CF7)", color: "#fff" }}
              >
                {loading ? <Loader2 size={18} className="animate-spin" /> : <>Create Account <ArrowRight size={16} /></>}
              </button>
            </form>

            <p className="mt-6 text-center text-sm" style={{ color: "var(--muted-foreground)" }}>
              Already have an account?{" "}
              <Link href="/login" className="font-medium transition-colors hover:underline" style={{ color: "var(--primary)" }}>
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
