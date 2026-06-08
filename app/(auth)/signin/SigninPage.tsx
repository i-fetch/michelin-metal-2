// app/admin/login/page.tsx  (or wherever your signin lives)
"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeOff, ArrowRight, Recycle, ShieldCheck, Globe, Package } from "lucide-react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation"
import { toast } from "sonner";

/* ─────────────────────────────────────────────────────────────
   ANIMATED LEFT PANEL — floating stat nodes
───────────────────────────────────────────────────────────── */
const STATS = [
  { icon: Package, label: "Metal Categories", value: "8+" },
  { icon: Globe,   label: "Export Markets",   value: "4+" },
  { icon: Recycle, label: "Sustainable Ops",  value: "100%" },
];

const FLOATING_WORDS = [
  "Aluminium", "Ferrous", "Non-Ferrous",
  "Export", "Recycling", "Steel", "Copper",
];

function LeftPanel() {
  return (
    <div
      className="relative hidden lg:flex flex-col justify-between p-12 xl:p-16 overflow-hidden"
      style={{ background: "linear-gradient(145deg, #0a1628 0%, #0d2010 50%, #061a0a 100%)" }}
    >
      {/* Grid texture */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(34,197,94,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(34,197,94,0.04) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      {/* Green radial */}
      <div
        className="absolute top-0 right-0 w-[500px] h-[500px] pointer-events-none"
        style={{ background: "radial-gradient(circle at 80% 20%, rgba(22,163,74,0.18) 0%, transparent 60%)" }}
      />
      <div
        className="absolute bottom-0 left-0 w-[400px] h-[400px] pointer-events-none"
        style={{ background: "radial-gradient(circle at 20% 80%, rgba(22,163,74,0.10) 0%, transparent 60%)" }}
      />

      {/* Floating animated word cloud */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {FLOATING_WORDS.map((word, i) => (
          <motion.span
            key={word}
            className="absolute text-xs font-bold uppercase tracking-widest"
            style={{
              color: `rgba(34,197,94,${0.06 + (i % 3) * 0.04})`,
              left: `${10 + (i * 13) % 75}%`,
              top: `${15 + (i * 17) % 70}%`,
            }}
            animate={{ y: [0, -12, 0], opacity: [0.4, 0.9, 0.4] }}
            transition={{
              duration: 4 + i * 0.7,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.5,
            }}
          >
            {word}
          </motion.span>
        ))}
      </div>

      {/* Top — Brand */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="flex items-center gap-3 mb-2">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{ background: "rgba(22,163,74,0.15)", border: "1px solid rgba(22,163,74,0.3)" }}
          >
            <Recycle size={18} style={{ color: "#22c55e" }} />
          </div>
          <div>
            <p className="text-white font-black text-sm tracking-widest uppercase" style={{ fontFamily: "var(--font-display)" }}>
              Mechelin
            </p>
            <p className="text-[10px] uppercase tracking-[0.2em]" style={{ color: "rgba(34,197,94,0.7)" }}>
              Metals Nigeria
            </p>
          </div>
        </div>
      </motion.div>

      {/* Middle — Big headline */}
      <div className="relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -32 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.85, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Accent line */}
          <div className="w-12 h-1 rounded-full mb-6" style={{ background: "#22c55e" }} />

          <h2
            className="font-black leading-none mb-6 text-white"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2.2rem, 3.5vw, 3.2rem)",
              letterSpacing: "-0.02em",
            }}
          >
            Nigeria&apos;s<br />
            <span style={{ color: "#22c55e" }}>Premier</span><br />
            Metals Hub
          </h2>

          <p className="text-sm leading-relaxed max-w-xs" style={{ color: "rgba(255,255,255,0.45)" }}>
            Manage your industrial metals catalogue, track inventory, and coordinate
            global export partnerships — all from one command centre.
          </p>
        </motion.div>

        {/* Stat nodes */}
        <motion.div
          className="flex gap-4 mt-10 flex-wrap"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              className="flex flex-col gap-1 px-4 py-3 rounded-xl"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(34,197,94,0.12)",
                backdropFilter: "blur(8px)",
              }}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.55 + i * 0.08 }}
            >
              <s.icon size={13} style={{ color: "#22c55e" }} />
              <p
                className="font-black leading-none mt-1"
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "1.4rem",
                  color: "#fff",
                  letterSpacing: "-0.02em",
                }}
              >
                {s.value}
              </p>
              <p className="text-[10px] uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.35)" }}>
                {s.label}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Bottom — trust */}
      <motion.div
        className="flex items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.6 }}
      >
        <ShieldCheck size={13} style={{ color: "rgba(34,197,94,0.6)" }} />
        <p className="text-[11px]" style={{ color: "rgba(255,255,255,0.25)" }}>
          Secured admin environment · Mechelin Metals Nigeria PVT LTD
        </p>
      </motion.div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   SIGN IN PAGE
───────────────────────────────────────────────────────────── */
export default function SigninPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPw, setShowPw] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const set = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm(p => ({ ...p, [e.target.name]: e.target.value }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setBusy(true);
    setError("");

    // 🔐 NextAuth login
    const res = await signIn("credentials", {
      email: form.email,
      password: form.password,
      redirect: false,
    })

    if (res?.ok) {
        toast.success("Signed in successfully")
      router.push("/admin")
    } else {
      toast.error("Invalid credentials")
      setBusy(false);
    }
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-[1fr_1fr] xl:grid-cols-[55%_45%]"
      style={{ background: "var(--bg-main)" }}>

      {/* Left brand panel */}
      <LeftPanel />

      {/* Right form panel */}
      <div className="flex flex-col justify-center items-center px-5 sm:px-10 lg:px-14 xl:px-20 py-12"
        style={{ background: "var(--bg-main)" }}>

        {/* Mobile brand (hidden on desktop) */}
        <motion.div
          className="lg:hidden flex items-center gap-3 mb-10 self-start"
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center"
            style={{ background: "var(--clr-green-alpha)", border: "1px solid rgba(22,163,74,0.2)" }}
          >
            <Recycle size={16} style={{ color: "var(--clr-green)" }} />
          </div>
          <div>
            <p className="font-black text-sm uppercase tracking-widest leading-none"
              style={{ fontFamily: "var(--font-display)", color: "var(--tx-primary)" }}>
              Mechelin
            </p>
            <p className="text-[10px] uppercase tracking-[0.18em]" style={{ color: "var(--tx-muted)" }}>
              Admin Console
            </p>
          </div>
        </motion.div>

        <div className="w-full max-w-[400px]">

          {/* Heading */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="tag mb-4">Admin Access</p>
            <h1
              className="font-black leading-none mb-2"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2rem, 4vw, 2.8rem)",
                color: "var(--tx-primary)",
                letterSpacing: "-0.025em",
              }}
            >
              Welcome back
            </h1>
            <p className="text-sm" style={{ color: "var(--tx-muted)" }}>
              Sign in to your admin dashboard
            </p>
          </motion.div>

          {/* Form */}
          <motion.form
            onSubmit={submit}
            className="flex flex-col gap-4"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Email */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold uppercase tracking-[0.14em]"
                style={{ color: "var(--tx-muted)" }}>
                Email Address
              </label>
              <input
                type="email"
                name="email"
                required
                value={form.email}
                onChange={set}
                placeholder="admin@mechelinmetals.com"
                className="w-full px-4 py-3.5 rounded-xl text-sm outline-none transition-all duration-200"
                style={{
                  background: "var(--bg-surface)",
                  border: "1.5px solid var(--border-subtle)",
                  color: "var(--tx-primary)",
                }}
                onFocus={e => (e.target.style.borderColor = "var(--clr-green)")}
                onBlur={e => (e.target.style.borderColor = "var(--border-subtle)")}
              />
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold uppercase tracking-[0.14em]"
                style={{ color: "var(--tx-muted)" }}>
                Password
              </label>
              <div className="relative">
                <input
                  type={showPw ? "text" : "password"}
                  name="password"
                  required
                  value={form.password}
                  onChange={set}
                  placeholder="••••••••••••"
                  className="w-full px-4 py-3.5 rounded-xl text-sm outline-none transition-all duration-200 pr-12"
                  style={{
                    background: "var(--bg-surface)",
                    border: "1.5px solid var(--border-subtle)",
                    color: "var(--tx-primary)",
                  }}
                  onFocus={e => (e.target.style.borderColor = "var(--clr-green)")}
                  onBlur={e => (e.target.style.borderColor = "var(--border-subtle)")}
                />
                <button
                  type="button"
                  onClick={() => setShowPw(s => !s)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 rounded-lg transition-colors"
                  style={{ color: "var(--tx-muted)" }}
                >
                  {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            {/* Error */}
            <AnimatePresence>
              {error && (
                <motion.p
                  initial={{ opacity: 0, y: -6, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: "auto" }}
                  exit={{ opacity: 0, y: -6, height: 0 }}
                  className="text-xs px-3 py-2.5 rounded-xl"
                  style={{
                    background: "rgba(239,68,68,0.07)",
                    border: "1px solid rgba(239,68,68,0.2)",
                    color: "#ef4444",
                  }}
                >
                  {error}
                </motion.p>
              )}
            </AnimatePresence>

            {/* Submit */}
            <button
              type="submit"
              disabled={busy || !form.email || !form.password}
              className="btn btn-green w-full justify-center font-bold disabled:opacity-40 disabled:cursor-not-allowed mt-1"
              style={{
                paddingTop: "0.85rem",
                paddingBottom: "0.85rem",
                borderRadius: "0.75rem",
                boxShadow: "0 0 24px rgba(22,163,74,0.25)",
              }}
            >
              {busy ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin inline-block" />
                  Signing in…
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  Sign In <ArrowRight size={15} />
                </span>
              )}
            </button>
          </motion.form>

          {/* Footer */}
          <motion.p
            className="text-center text-[11px] mt-8"
            style={{ color: "var(--tx-muted)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            Mechelin Metals Nigeria PVT LTD &copy; {new Date().getFullYear()}
          </motion.p>

        </div>
      </div>
    </div>
  );
}