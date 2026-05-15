'use client'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { Moon, Sun } from 'lucide-react'

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  if (!mounted) return <div className="w-9 h-9" />

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      aria-label="Toggle theme"
      className="w-9 h-9 rounded-full border flex items-center justify-center transition-all"
      style={{
        borderColor:'var(--border-strong)',
        background:'var(--surface-2)',
        color:'var(--tx-muted)',
      }}
    >
      {theme === 'dark'
        ? <Sun size={15} className="text-yellow-400" />
        : <Moon size={15} />
      }
    </button>
  )
}
