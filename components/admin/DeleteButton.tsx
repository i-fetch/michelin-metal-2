'use client'
import { useState, useTransition } from 'react'
import { Trash2, Loader2 } from 'lucide-react'
import { deleteProduct } from '@/actions/products'

export default function DeleteButton({ id, title }: { id: string; title: string }) {
  const [confirming, setConfirming] = useState(false)
  const [isPending, startTransition] = useTransition()

  const handleDelete = () => {
    startTransition(async () => {
      await deleteProduct(id)
      setConfirming(false)
    })
  }

  if (confirming) {
    return (
      <div className="flex items-center gap-2">
        <span className="text-xs" style={{ color: 'var(--tx-muted)' }}>Delete?</span>
        <button
          onClick={handleDelete}
          disabled={isPending}
          className="text-xs px-2 py-1 rounded font-semibold"
          style={{ background: 'rgba(220,38,38,0.1)', color: '#ef4444' }}
        >
          {isPending ? <Loader2 size={12} className="animate-spin" /> : 'Yes'}
        </button>
        <button
          onClick={() => setConfirming(false)}
          className="text-xs px-2 py-1 rounded"
          style={{ color: 'var(--tx-faint)' }}
        >
          No
        </button>
      </div>
    )
  }

  return (
    <button
      onClick={() => setConfirming(true)}
      className="p-2 rounded-lg transition-colors hover:bg-red-50"
      style={{ color: 'var(--tx-muted)' }}
      title={`Delete ${title}`}
    >
      <Trash2 size={14} />
    </button>
  )
}
