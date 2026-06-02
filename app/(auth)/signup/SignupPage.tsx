// app/admin/signup/page.tsx  (or wherever your signup lives)
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Eye, EyeOff, ArrowRight, Recycle, CheckCircle2,
  ShieldCheck, UserPlus, ArrowLeft,
} from "lucide-react";

const EASE = [0.22, 1, 0.36, 1] as const;

/* ─────────────────────────────────────────────────────────────
   PASSWORD STRENGTH METER
───────────────────────────────────────────────────────────── */
function getStrength(pw: string): { score: number; label: string; color: string } {
  if (!pw) return { score: 0, label: "", color: "transparent" };
  let score = 0;
  if (pw.length >= 8)           score++;
  if (/[A-Z]/.test(pw))        score++;
  if (/[0-9]/.test(pw))        score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;
  const map = [
    { score: 1, label: "Weak",   color: "#ef4444" },
    { score: 2, label: "Fair",   color: "#f59e0b" },
    { score: 3, label: "Good",   color: "#22c55e" },
    { score: 4, label: "Strong", color: "#16a34a" },
  ];
  return map[score - 1] ?? { score: 0, label: "", color: "transparent" };
}

function StrengthBar({ password }: { password: string }) {
  const strength = getStrength(password);
  if (!password) return null;
  return (
    <div className="flex flex-col gap-1.5 mt-2">
      <div className="flex gap-1">
        {[1, 2, 3, 4].map(i => (
          <motion.div
            key={i}
            className="flex-1 h-1 rounded-full"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            style={{
              background: i <= strength.score ? strength.color : "var(--border-subtle)",
              transformOrigin: "left",
            }}
            transition={{ duration: 0.3, delay: i * 0.05 }}
          />
        ))}
      </div>
      {strength.label && (
        <p className="text-[10px] font-semibold" style={{ color: strength.color }}>
          {strength.label} password
        </p>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   LEFT PANEL — visual / brand  (same language as Signin)
───────────────────────────────────────────────────────────── */
const PERKS = [
  { icon: ShieldCheck, text: "Secure admin access" },
  { icon: Recycle,     text: "Full catalogue management" },
  { icon: UserPlus,    text: "Create and manage listings" },
];

function LeftPanel() {
  return (
    <div
      className="relative hidden lg:flex flex-col justify-between p-12 xl:p-16 overflow-hidden"
      style={{ background: "linear-gradient(145deg, #0a1628 0%, #0d2010 50%, #061a0a 100%)" }}
    >
      {/* Grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(34,197,94,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(34,197,94,0.04) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      {/* Glows */}
      <div className="absolute top-0 left-0 w-[450px] h-[450px] pointer-events-none"
        style={{ background: "radial-gradient(circle at 20% 20%, rgba(22,163,74,0.16) 0%, transparent 60%)" }} />
      <div className="absolute bottom-0 right-0 w-[350px] h-[350px] pointer-events-none"
        style={{ background: "radial-gradient(circle at 80% 80%, rgba(22,163,74,0.10) 0%, transparent 60%)" }} />

      {/* Animated concentric rings */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        {[320, 240, 160].map((size, i) => (
          <motion.div
            key={size}
            className="absolute rounded-full"
            style={{
              width: size, height: size,
              border: "1px solid rgba(34,197,94,0.07)",
            }}
            animate={{ scale: [1, 1.04, 1], opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 4 + i * 1.2, repeat: Infinity, ease: "easeInOut", delay: i * 0.8 }}
          />
        ))}
      </div>

      {/* Brand */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: EASE }}
        className="relative z-10"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{ background: "rgba(22,163,74,0.15)", border: "1px solid rgba(22,163,74,0.3)" }}>
            <Recycle size={18} style={{ color: "#22c55e" }} />
          </div>
          <div>
            <p className="text-white font-black text-sm tracking-widest uppercase"
              style={{ fontFamily: "var(--font-display)" }}>
              Mechelin
            </p>
            <p className="text-[10px] uppercase tracking-[0.2em]" style={{ color: "rgba(34,197,94,0.7)" }}>
              Metals Nigeria
            </p>
          </div>
        </div>
      </motion.div>

      {/* Headline */}
      <div className="relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -32 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.85, delay: 0.2, ease: EASE }}
        >
          <div className="w-12 h-1 rounded-full mb-6" style={{ background: "#22c55e" }} />
          <h2
            className="font-black leading-none mb-4 text-white"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2.2rem, 3.5vw, 3.2rem)",
              letterSpacing: "-0.02em",
            }}
          >
            Join the<br />
            <span style={{ color: "#22c55e" }}>Command</span><br />
            Centre
          </h2>
          <p className="text-sm leading-relaxed max-w-xs mb-8"
            style={{ color: "rgba(255,255,255,0.45)" }}>
            Create your admin account to manage the Mechelin Metals product
            catalogue and global supply chain operations.
          </p>

          {/* Perk list */}
          <div className="flex flex-col gap-3">
            {PERKS.map((p, i) => (
              <motion.div
                key={p.text}
                className="flex items-center gap-3"
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.5 + i * 0.1, ease: EASE }}
              >
                <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
                  style={{ background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.2)" }}>
                  <p.icon size={13} style={{ color: "#22c55e" }} />
                </div>
                <p className="text-sm" style={{ color: "rgba(255,255,255,0.55)" }}>
                  {p.text}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Bottom */}
      <motion.div
        className="flex items-center gap-2 relative z-10"
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
   SIGN UP PAGE
───────────────────────────────────────────────────────────── */
export default function SignupPage() {
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const [showPw, setShowPw] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  const set = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm(p => ({ ...p, [e.target.name]: e.target.value }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (form.password !== form.confirm) {
      setError("Passwords do not match.");
      return;
    }
    if (form.password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    setBusy(true);
    // Replace with your real signup action
    await new Promise(r => setTimeout(r, 1400));
    setBusy(false);
    setDone(true);
  };

  const pwMatch = form.confirm && form.password === form.confirm;
  const pwMismatch = form.confirm && form.password !== form.confirm;

  return (
    <div
      className="min-h-screen grid lg:grid-cols-[1fr_1fr] xl:grid-cols-[55%_45%]"
      style={{ background: "var(--bg-main)" }}
    >
      {/* Left brand panel */}
      <LeftPanel />

      {/* Right form panel */}
      <div className="flex flex-col justify-center items-center px-5 sm:px-10 lg:px-14 xl:px-20 py-12"
        style={{ background: "var(--bg-main)" }}>

        {/* Mobile brand */}
        <motion.div
          className="lg:hidden flex items-center gap-3 mb-10 self-start"
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="w-9 h-9 rounded-xl flex items-center justify-center"
            style={{ background: "var(--clr-green-alpha)", border: "1px solid rgba(22,163,74,0.2)" }}>
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

        <div className="w-full max-w-[420px]">

          <AnimatePresence mode="wait">
            {done ? (
              /* ── Success state ── */
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, ease: EASE }}
                className="text-center py-8"
              >
                <motion.div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6"
                  style={{ background: "var(--clr-green-alpha)", border: "1px solid rgba(22,163,74,0.2)" }}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 220, damping: 18, delay: 0.1 }}
                >
                  <CheckCircle2 size={30} style={{ color: "var(--clr-green)" }} />
                </motion.div>
                <h2
                  className="font-black mb-2"
                  style={{ fontFamily: "var(--font-display)", fontSize: "1.8rem", color: "var(--tx-primary)", letterSpacing: "-0.02em" }}
                >
                  Account Created!
                </h2>
                <p className="text-sm mb-7 max-w-xs mx-auto leading-relaxed" style={{ color: "var(--tx-muted)" }}>
                  Welcome,{" "}
                  <span className="font-semibold" style={{ color: "var(--tx-primary)" }}>
                    {form.name}
                  </span>
                  . Your admin account is ready. Sign in to access the dashboard.
                </p>
                <Link href="/admin/login" className="btn btn-green w-full justify-center">
                  Go to Sign In <ArrowRight size={14} />
                </Link>
              </motion.div>
            ) : (
              /* ── Form state ── */
              <motion.div
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {/* Heading */}
                <motion.div
                  className="mb-7"
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.65, ease: EASE }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <Link
                      href="/admin/login"
                      className="inline-flex items-center gap-1.5 text-xs hover:underline transition-colors"
                      style={{ color: "var(--tx-muted)" }}
                    >
                      <ArrowLeft size={12} /> Back to Sign In
                    </Link>
                  </div>
                  <p className="tag mb-3">Create Account</p>
                  <h1
                    className="font-black leading-none mb-2"
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "clamp(2rem, 4vw, 2.8rem)",
                      color: "var(--tx-primary)",
                      letterSpacing: "-0.025em",
                    }}
                  >
                    Get started
                  </h1>
                  <p className="text-sm" style={{ color: "var(--tx-muted)" }}>
                    Create your Mechelin Metals admin account
                  </p>
                </motion.div>

                {/* Form fields */}
                <motion.form
                  onSubmit={submit}
                  className="flex flex-col gap-4"
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.65, delay: 0.1, ease: EASE }}
                >
                  {/* Full name */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-[0.14em]"
                      style={{ color: "var(--tx-muted)" }}>
                      Full Name
                    </label>
                    <input
                      type="text" name="name" required
                      value={form.name} onChange={set}
                      placeholder="John Adeyemi"
                      className="w-full px-4 py-3.5 rounded-xl text-sm outline-none transition-all duration-200"
                      style={{ background: "var(--bg-surface)", border: "1.5px solid var(--border-subtle)", color: "var(--tx-primary)" }}
                      onFocus={e => (e.target.style.borderColor = "var(--clr-green)")}
                      onBlur={e => (e.target.style.borderColor = "var(--border-subtle)")}
                    />
                  </div>

                  {/* Email */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-[0.14em]"
                      style={{ color: "var(--tx-muted)" }}>
                      Email Address
                    </label>
                    <input
                      type="email" name="email" required
                      value={form.email} onChange={set}
                      placeholder="admin@mechelinmetals.com"
                      className="w-full px-4 py-3.5 rounded-xl text-sm outline-none transition-all duration-200"
                      style={{ background: "var(--bg-surface)", border: "1.5px solid var(--border-subtle)", color: "var(--tx-primary)" }}
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
                        type={showPw ? "text" : "password"} name="password" required
                        value={form.password} onChange={set}
                        placeholder="Min. 8 characters"
                        className="w-full px-4 py-3.5 rounded-xl text-sm outline-none transition-all duration-200 pr-12"
                        style={{ background: "var(--bg-surface)", border: "1.5px solid var(--border-subtle)", color: "var(--tx-primary)" }}
                        onFocus={e => (e.target.style.borderColor = "var(--clr-green)")}
                        onBlur={e => (e.target.style.borderColor = "var(--border-subtle)")}
                      />
                      <button type="button" onClick={() => setShowPw(s => !s)}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 rounded-lg"
                        style={{ color: "var(--tx-muted)" }}>
                        {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
                      </button>
                    </div>
                    <StrengthBar password={form.password} />
                  </div>

                  {/* Confirm password */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-[0.14em]"
                      style={{ color: "var(--tx-muted)" }}>
                      Confirm Password
                    </label>
                    <div className="relative">
                      <input
                        type={showConfirm ? "text" : "password"} name="confirm" required
                        value={form.confirm} onChange={set}
                        placeholder="Repeat your password"
                        className="w-full px-4 py-3.5 rounded-xl text-sm outline-none transition-all duration-200 pr-12"
                        style={{
                          background: "var(--bg-surface)",
                          border: `1.5px solid ${pwMismatch ? "#ef4444" : pwMatch ? "var(--clr-green)" : "var(--border-subtle)"}`,
                          color: "var(--tx-primary)",
                        }}
                        onFocus={e => {
                          if (!pwMismatch && !pwMatch)
                            e.target.style.borderColor = "var(--clr-green)"
                        }}
                        onBlur={e => {
                          if (!pwMismatch && !pwMatch)
                            e.target.style.borderColor = "var(--border-subtle)"
                        }}
                      />
                      <button type="button" onClick={() => setShowConfirm(s => !s)}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 rounded-lg"
                        style={{ color: "var(--tx-muted)" }}>
                        {showConfirm ? <EyeOff size={15} /> : <Eye size={15} />}
                      </button>
                    </div>
                    <AnimatePresence>
                      {pwMatch && (
                        <motion.p
                          initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                          className="text-[11px] flex items-center gap-1.5 font-semibold"
                          style={{ color: "var(--clr-green)" }}
                        >
                          <CheckCircle2 size={12} /> Passwords match
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Error */}
                  <AnimatePresence>
                    {error && (
                      <motion.p
                        initial={{ opacity: 0, y: -6, height: 0 }}
                        animate={{ opacity: 1, y: 0, height: "auto" }}
                        exit={{ opacity: 0, y: -6, height: 0 }}
                        className="text-xs px-3 py-2.5 rounded-xl"
                        style={{ background: "rgba(239,68,68,0.07)", border: "1px solid rgba(239,68,68,0.2)", color: "#ef4444" }}
                      >
                        {error}
                      </motion.p>
                    )}
                  </AnimatePresence>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={busy || !form.name || !form.email || !form.password || !form.confirm}
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
                        Creating account…
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        Create Account <ArrowRight size={15} />
                      </span>
                    )}
                  </button>

                  {/* Sign in link */}
                  <p className="text-center text-xs" style={{ color: "var(--tx-muted)" }}>
                    Already have an account?{" "}
                    <Link href="/admin/login" className="font-semibold hover:underline"
                      style={{ color: "var(--clr-green)" }}>
                      Sign in
                    </Link>
                  </p>
                </motion.form>

              </motion.div>
            )}
          </AnimatePresence>

          {/* Footer */}
          <motion.p
            className="text-center text-[11px] mt-8"
            style={{ color: "var(--tx-muted)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.5 }}
          >
            Mechelin Metals Nigeria PVT LTD &copy; {new Date().getFullYear()}
          </motion.p>
        </div>
      </div>
    </div>
  );
}