// components/admin/LoginForm.tsx
'use client'

import { useActionState } from 'react'
import { loginAction }    from '@/actions/auth'
import { Loader2, Mail, Lock } from 'lucide-react'

const initial = { success: false as const, error: '' }

export default function LoginForm() {
  const [state, action, pending] = useActionState(loginAction, initial)

  return (
    <form action={action} className="space-y-5">
      {/* Email */}
      <div>
        <label className="field-label" htmlFor="email">Email Address</label>
        <div className="relative">
          <Mail size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
            style={{ color: 'var(--tx-faint)' }} />
          <input
            id="email" name="email" type="email" required autoComplete="email"
            placeholder="admin@mechelinmetals.com"
            className="field pl-10"
          />
        </div>
      </div>

      {/* Password */}
      <div>
        <label className="field-label" htmlFor="password">Password</label>
        <div className="relative">
          <Lock size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
            style={{ color: 'var(--tx-faint)' }} />
          <input
            id="password" name="password" type="password" required autoComplete="current-password"
            placeholder="••••••••"
            className="field pl-10"
          />
        </div>
      </div>

      {/* Error */}
      {!state.success && state.error && (
        <div className="px-4 py-3 rounded-xl text-xs"
          style={{ background: 'rgba(239,68,68,0.1)', color: '#f87171', border: '1px solid rgba(239,68,68,0.2)' }}>
          {state.error}
        </div>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={pending}
        className="btn btn-green w-full justify-center"
        style={{ opacity: pending ? 0.7 : 1 }}
      >
        {pending ? (
          <><Loader2 size={15} className="animate-spin" /> Signing in…</>
        ) : (
          'Sign In to Dashboard'
        )}
      </button>
    </form>
  )
}
