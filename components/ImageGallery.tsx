// components/ImageGallery.tsx
'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react'

interface Props {
  images: string[]
  title:  string
  accent: string
}

export default function ImageGallery({ images, title, accent }: Props) {
  const [active,    setActive]    = useState(0)
  const [lightbox,  setLightbox]  = useState(false)
  const [lbIndex,   setLbIndex]   = useState(0)

  const all = images.length > 0 ? images : ['/placeholder.webp']

  useEffect(() => {
    if (!lightbox) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightbox(false)
      if (e.key === 'ArrowRight') setLbIndex(i => (i + 1) % all.length)
      if (e.key === 'ArrowLeft')  setLbIndex(i => (i - 1 + all.length) % all.length)
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [lightbox, all.length])

  function openLightbox(idx: number) { setLbIndex(idx); setLightbox(true) }

  return (
    <>
      {/* Main image */}
      <div
        className="relative rounded-2xl overflow-hidden group cursor-zoom-in"
        style={{ aspectRatio: '4/3', border: '1px solid var(--border)' }}
        onClick={() => openLightbox(active)}
      >
        <div className="absolute top-0 left-0 right-0 h-0.5 z-10" style={{ background: accent }} />
        <Image
          src={all[active]}
          alt={title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-102"
          sizes="(max-width:1024px) 100vw, 60vw"
          priority
        />
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
          style={{ background: 'rgba(0,0,0,0.25)' }}>
          <div className="w-12 h-12 rounded-full flex items-center justify-center"
            style={{ background: 'rgba(0,0,0,0.6)' }}>
            <ZoomIn size={20} className="text-white" />
          </div>
        </div>
        {/* Image counter */}
        <div className="absolute bottom-3 right-3 text-xs font-semibold px-2.5 py-1 rounded-full"
          style={{ background: 'rgba(0,0,0,0.65)', color: '#fff' }}>
          {active + 1} / {all.length}
        </div>
        {/* Nav arrows if multiple */}
        {all.length > 1 && (
          <>
            <button
              onClick={e => { e.stopPropagation(); setActive(i => (i - 1 + all.length) % all.length) }}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              style={{ background: 'rgba(0,0,0,0.65)' }}
            >
              <ChevronLeft size={18} className="text-white" />
            </button>
            <button
              onClick={e => { e.stopPropagation(); setActive(i => (i + 1) % all.length) }}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              style={{ background: 'rgba(0,0,0,0.65)' }}
            >
              <ChevronRight size={18} className="text-white" />
            </button>
          </>
        )}
      </div>

      {/* Thumbnails */}
      {all.length > 1 && (
        <div className="flex gap-2.5 mt-3 overflow-x-auto pb-1" style={{ scrollbarWidth: 'none' }}>
          {all.map((src, idx) => (
            <button
              key={idx}
              onClick={() => setActive(idx)}
              className="relative flex-shrink-0 rounded-xl overflow-hidden transition-all"
              style={{
                width: 68, height: 52,
                border: `2px solid ${idx === active ? accent : 'var(--border)'}`,
                opacity: idx === active ? 1 : 0.55,
              }}
            >
              <Image src={src} alt={`${title} ${idx + 1}`} fill className="object-cover" sizes="68px" />
            </button>
          ))}
        </div>
      )}

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: 'rgba(0,0,0,0.92)' }}
          onClick={() => setLightbox(false)}
        >
          <button
            className="absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center"
            style={{ background: 'rgba(255,255,255,0.1)' }}
            onClick={() => setLightbox(false)}
          >
            <X size={20} className="text-white" />
          </button>

          {all.length > 1 && (
            <>
              <button
                className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full flex items-center justify-center"
                style={{ background: 'rgba(255,255,255,0.1)' }}
                onClick={e => { e.stopPropagation(); setLbIndex(i => (i - 1 + all.length) % all.length) }}
              >
                <ChevronLeft size={22} className="text-white" />
              </button>
              <button
                className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full flex items-center justify-center"
                style={{ background: 'rgba(255,255,255,0.1)' }}
                onClick={e => { e.stopPropagation(); setLbIndex(i => (i + 1) % all.length) }}
              >
                <ChevronRight size={22} className="text-white" />
              </button>
            </>
          )}

          <div
            className="relative w-full max-w-4xl rounded-2xl overflow-hidden"
            style={{ maxHeight: '85vh', aspectRatio: '4/3' }}
            onClick={e => e.stopPropagation()}
          >
            <Image src={all[lbIndex]} alt={title} fill className="object-contain" sizes="100vw" />
          </div>

          <p className="absolute bottom-5 text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>
            {lbIndex + 1} of {all.length} — press ESC to close
          </p>
        </div>
      )}
    </>
  )
}
