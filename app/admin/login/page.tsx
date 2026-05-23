// app/admin/login/page.tsx
import type { Metadata } from 'next'
import LoginForm         from '@/components/admin/LoginForm'

export const metadata: Metadata = { title: 'Admin Login' }

export default function LoginPage() {
  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden"
      style={{ background: 'var(--bg)' }}
    >
      {/* Background texture */}
      <div className="absolute inset-0 grid-dots opacity-15" />
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full opacity-[0.06] blur-3xl"
        style={{ background: 'radial-gradient(circle, #16a34a, transparent)' }}
      />

      <div className="relative z-10 w-full max-w-[400px]">
        {/* Brand mark */}
        <div className="text-center mb-10">
          <div
            className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-5"
            style={{ background: 'rgba(22,163,74,0.12)', border: '1px solid rgba(22,163,74,0.25)' }}
          >
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
                stroke="#16a34a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <h1
            className="text-4xl mb-1"
            style={{ fontFamily: 'var(--font-display)', color: 'var(--tx-primary)', letterSpacing: '0.08em' }}
          >
            MECHELIN
          </h1>
          <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: 'var(--tx-faint)' }}>
            Metals Nigeria · Admin Console
          </p>
        </div>

        {/* Card */}
        <div
          className="rounded-2xl p-8"
          style={{
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            boxShadow: '0 40px 80px rgba(0,0,0,0.5)',
          }}
        >
          <h2
            className="text-xl mb-1"
            style={{ fontFamily: 'var(--font-display)', color: 'var(--tx-primary)', letterSpacing: '0.06em' }}
          >
            SIGN IN
          </h2>
          <p className="text-sm mb-7" style={{ color: 'var(--tx-muted)' }}>
            Enter your credentials to access the dashboard.
          </p>
          <LoginForm />
        </div>

        <p className="text-center text-xs mt-6" style={{ color: 'var(--tx-faint)' }}>
          Mechelin Metals Nigeria PVT LTD © {new Date().getFullYear()}
        </p>
      </div>
    </div>
  )
}
