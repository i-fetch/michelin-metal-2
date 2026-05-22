'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { X } from 'lucide-react'

export type GalleryImage = {
  src: string
  alt: string
  label: string
}

type Props = {
  images: GalleryImage[]
}

export default function ProductGallery({ images }: Props) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const activeImage = activeIndex !== null ? images[activeIndex] : null

  useEffect(() => {
    if (activeImage === null) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setActiveIndex(null)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [activeImage])

  return (
    <section className="section" style={{ background: 'var(--bg)' }}>
      <div className="wrap px-5">
        <div className="mb-10">
          <p className="tag mb-4">Product Gallery</p>
          <h2 className="text-3xl md:text-4xl mb-3" style={{ fontFamily: 'var(--font-display)', color: 'var(--tx-primary)' }}>
            Click any image to open the viewer
          </h2>
          <p className="max-w-2xl text-sm" style={{ color: 'var(--tx-muted)' }}>
            Explore our material inventory and product handling in a dedicated gallery. Tap an image to enlarge it and inspect key details.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {images.map((image, index) => (
            <button
              key={index}
              type="button"
              aria-label={image.label}
              title={image.label}
              onClick={() => setActiveIndex(index)}
              className="group card rounded-md overflow-hidden text-left focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              style={{ padding: 0 }}
            >
              <div className="relative h-56 w-full bg-slate-100">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 33vw"
                />
              </div>
              <div className="p-5" style={{ background: 'var(--surface)' }}>
                <p className="text-sm font-semibold" style={{ color: 'var(--tx-primary)' }}>
                  {image.label}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {activeImage ? (
        <div
          className="fixed inset-0 z-50 grid place-items-center bg-black/75 p-4"
          role="dialog"
          aria-modal="true"
          onClick={() => setActiveIndex(null)}
        >
          <div className="absolute inset-0" />
          <button
            type="button"
            onClick={() => setActiveIndex(null)}
            className="absolute top-5 right-5 z-20 inline-flex items-center justify-center rounded-full bg-white p-3 text-slate-900 shadow-2xl"
          >
            <X size={18} />
          </button>

          <div className="relative z-10 w-full max-w-6xl overflow-hidden rounded-[30px] bg-black" onClick={e => e.stopPropagation()}>
            <div className="relative h-[60vh] min-h-[360px] bg-black">
              <Image
                src={activeImage.src}
                alt={activeImage.alt}
                fill
                className="object-contain"
                sizes="100vw"
              />
            </div>
            <div className="flex flex-col gap-2 p-5 text-left" style={{ background: 'var(--surface)' }}>
              <p className="text-sm font-semibold" style={{ color: 'var(--tx-primary)' }}>
                {activeImage.label}
              </p>
              <p className="text-xs" style={{ color: 'var(--tx-secondary)' }}>
                Close the viewer by clicking outside the image, pressing Escape, or using the close button.
              </p>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  )
}
