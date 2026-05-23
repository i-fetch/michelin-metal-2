// components/admin/DeleteButton.tsx
'use client'

import { useState, useTransition } from 'react'
import { Trash2, Loader2 }         from 'lucide-react'
import { deleteProduct }           from '@/actions/products'
import { useToast }                from '@/hooks/use-toast'

interface Props { id: string; title: string }

export default function DeleteButton({ id, title }: Props) {
  const [confirm, setConfirm] = useState(false)
  const [pending, start]      = useTransition()
  const { toast }             = useToast()

  function handleDelete() {
    start(async () => {
      const result = await deleteProduct(id)
      if (result.success) {
        toast({ title: 'Deleted', description: `"${title}" removed from catalogue.` })
      } else {
        toast({ title: 'Error', description: result.error, variant: 'destructive' })
      }
      setConfirm(false)
    })
  }

  if (confirm) {
    return (
      <div className="flex items-center gap-1.5">
        <button
          onClick={handleDelete}
          disabled={pending}
          className="flex items-center gap-1 text-xs px-2.5 py-1.5 rounded-lg"
          style={{ background: 'rgba(239,68,68,0.15)', color: '#f87171', border: '1px solid rgba(239,68,68,0.3)' }}
        >
          {pending ? <Loader2 size={11} className="animate-spin" /> : <Trash2 size={11} />}
          Yes
        </button>
        <button
          onClick={() => setConfirm(false)}
          className="text-xs px-2.5 py-1.5 rounded-lg"
          style={{ background: 'var(--bg-3)', color: 'var(--tx-faint)', border: '1px solid var(--border)' }}
        >
          No
        </button>
      </div>
    )
  }

  return (
    <button
      onClick={() => setConfirm(true)}
      className="flex items-center gap-1 text-xs px-2.5 py-1.5 rounded-lg transition-colors"
      style={{ color: '#f87171', border: '1px solid rgba(239,68,68,0.2)' }}
      onMouseEnter={e => { e.currentTarget.style.background = 'rgba(239,68,68,0.08)' }}
      onMouseLeave={e => { e.currentTarget.style.background = 'transparent' }}
    >
      <Trash2 size={11} /> Delete
    </button>
  )
}
