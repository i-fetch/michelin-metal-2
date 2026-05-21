'use client'
import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'
import { Lock, Mail, Eye, EyeOff, AlertCircle } from 'lucide-react'

export default function AdminLogin() {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [showPass, setShowPass] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({ email: '', password: '' })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    startTransition(async () => {
      const res = await signIn('credentials', {
        email: form.email,
        password: form.password,
        redirect: false,
      })
      if (res?.error) {
        setError('Invalid email or password')
      } else {
        router.push('/admin/dashboard')
        router.refresh()
      }
    })
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center px-5"
      style={{ background: 'var(--bg)' }}
    >
      {/* Card */}
      <div
        className="w-full max-w-md rounded-2xl p-8 sm:p-10"
        style={{ background: 'var(--bg-2)', border: '1.5px solid var(--border)' }}
      >
        {/* Header */}
        <div className="mb-8 text-center">
          <div
            className="w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-4"
            style={{ background: 'rgba(22,163,74,0.1)' }}
          >
            <Lock size={24} style={{ color: 'var(--clr-green)' }} />
          </div>
          <h1
            className="text-2xl font-bold mb-1"
            style={{ fontFamily: 'var(--font-display)', color: 'var(--tx-primary)' }}
          >
            ADMIN LOGIN
          </h1>
          <p className="text-sm" style={{ color: 'var(--tx-muted)' }}>
            Mechelin Metals — Restricted Area
          </p>
        </div>

        {/* Error */}
        {error && (
          <div
            className="flex items-center gap-2 rounded-lg px-4 py-3 mb-6 text-sm"
            style={{ background: 'rgba(220,38,38,0.08)', border: '1px solid rgba(220,38,38,0.2)', color: '#ef4444' }}
          >
            <AlertCircle size={15} />
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: 'var(--tx-faint)' }}>
              Email Address
            </label>
            <div className="relative">
              <Mail size={15} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--tx-faint)' }} />
              <input
                type="email"
                required
                value={form.email}
                onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                placeholder="admin@mechelinmetals.com"
                className="field pl-9"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: 'var(--tx-faint)' }}>
              Password
            </label>
            <div className="relative">
              <Lock size={15} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--tx-faint)' }} />
              <input
                type={showPass ? 'text' : 'password'}
                required
                value={form.password}
                onChange={e => setForm(p => ({ ...p, password: e.target.value }))}
                placeholder="••••••••"
                className="field pl-9 pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPass(s => !s)}
                className="absolute right-3 top-1/2 -translate-y-1/2"
                style={{ color: 'var(--tx-faint)' }}
              >
                {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="btn btn-green w-full justify-center disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isPending ? 'Signing in…' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  )
}
