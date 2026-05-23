// hooks/use-toast.ts
'use client'

import { useCallback } from 'react'

type ToastOptions = {
  title:        string
  description?: string
  variant?:     'destructive' | 'default'
}

// Lightweight toast using a custom DOM element — no external dependency
function showToast(opts: ToastOptions) {
  if (typeof document === 'undefined') return

  const el = document.createElement('div')

  const isError = opts.variant === 'destructive'
  const bg      = isError ? '#1a0a0a' : '#0d1a0d'
  const border  = isError ? 'rgba(239,68,68,0.4)' : 'rgba(22,163,74,0.4)'
  const accent  = isError ? '#f87171' : '#4ade80'

  el.style.cssText = `
    position: fixed; bottom: 24px; right: 24px; z-index: 9999;
    background: ${bg}; border: 1px solid ${border};
    border-left: 3px solid ${accent};
    border-radius: 12px; padding: 14px 18px; min-width: 280px; max-width: 380px;
    box-shadow: 0 20px 60px rgba(0,0,0,0.6);
    font-family: var(--font-body, sans-serif);
    animation: toastIn 0.3s ease;
    pointer-events: none;
  `

  const style = document.createElement('style')
  style.textContent = `
    @keyframes toastIn  { from { opacity:0; transform:translateY(8px) } to { opacity:1; transform:translateY(0) } }
    @keyframes toastOut { from { opacity:1; transform:translateY(0)   } to { opacity:0; transform:translateY(8px) } }
  `
  document.head.appendChild(style)

  el.innerHTML = `
    <p style="font-size:0.8rem;font-weight:700;color:${accent};margin-bottom:${opts.description ? '3px' : '0'}">${opts.title}</p>
    ${opts.description ? `<p style="font-size:0.75rem;color:rgba(255,255,255,0.55);line-height:1.4">${opts.description}</p>` : ''}
  `

  document.body.appendChild(el)

  const dismiss = () => {
    el.style.animation = 'toastOut 0.25s ease forwards'
    setTimeout(() => { el.remove(); style.remove() }, 260)
  }

  setTimeout(dismiss, 4000)
}

export function useToast() {
  const toast = useCallback((options: ToastOptions) => {
    showToast(options)
  }, [])
  return { toast }
}
