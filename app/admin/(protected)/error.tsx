// app/admin/error.tsx
'use client'
import { useEffect }  from 'react'
import { AlertTriangle } from 'lucide-react'

export default function AdminError({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => { console.error(error) }, [error])
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 p-8">
      <div className="w-16 h-16 rounded-2xl flex items-center justify-center"
        style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)' }}>
        <AlertTriangle size={28} style={{ color: '#f87171' }} />
      </div>
      <div className="text-center">
        <h2 className="text-2xl mb-2"
          style={{ fontFamily: 'var(--font-display)', color: 'var(--tx-primary)' }}>
          SOMETHING WENT WRONG
        </h2>
        <p className="text-sm mb-6" style={{ color: 'var(--tx-muted)' }}>
          {error.message || 'An unexpected error occurred.'}
        </p>
        <button onClick={reset} className="btn btn-green">Try Again</button>
      </div>
    </div>
  )
}
