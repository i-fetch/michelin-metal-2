'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'

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
      if (event.key === 'Escape') {
        setActiveIndex(null)
      }
      if (event.key === 'ArrowLeft') {
        setActiveIndex(prev => {
          if (prev === null) return 0
          return (prev - 1 + images.length) % images.length
        })
      }
      if (event.key === 'ArrowRight') {
        setActiveIndex(prev => {
          if (prev === null) return 0
          return (prev + 1) % images.length
        })
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [activeImage, images.length])

  function handleNext() {
    setActiveIndex(prev => {
      if (prev === null) return 0
      return (prev + 1) % images.length
    })
  }

  function handlePrevious() {
    setActiveIndex(prev => {
      if (prev === null) return images.length - 1
      return (prev - 1 + images.length) % images.length
    })
  }

  function openImage(index: number) {
    setActiveIndex(index)
  }

  if (images.length === 0) {
    return (
      <section className="section" style={{ background: 'var(--bg)' }}>
        <div className="wrap px-5">
          <div
            className="rounded-3xl p-12 text-center"
            style={{ background: 'var(--surface)', border: '1px dashed var(--border)', color: 'var(--tx-muted)' }}
          >
            No gallery images are available for this product.
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="section" style={{ background: 'var(--bg)' }}>
      <div className="wrap px-5">
        <div className="mb-10">
          <p className="tag mb-4">Product Gallery</p>
          <h2 className="text-3xl md:text-4xl mb-3" style={{ fontFamily: 'var(--font-display)', color: 'var(--tx-primary)' }}>
            Explore product visuals
          </h2>
          <p className="max-w-2xl text-sm" style={{ color: 'var(--tx-muted)' }}>
            {images.length === 1
              ? 'View the product image in full detail.'
              : `Browse ${images.length} high-quality product views in the gallery.`}
          </p>
        </div>

        <div className={`grid ${images.length === 1 ? 'grid-cols-1' : 'sm:grid-cols-2 lg:grid-cols-3'} gap-5`}>
          {images.map((image, index) => (
            <button
<<<<<<< HEAD
              key={index}
              type="button"
              aria-label={image.label}
              title={image.label}
              onClick={() => setActiveIndex(index)}
              className="group card rounded-md overflow-hidden text-left focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              style={{ padding: 0 }}
=======
              key={`${image.src}-${index}`}
              type="button"
              aria-label={image.label}
              title={image.label}
              onClick={() => openImage(index)}
              className="group overflow-hidden rounded-[30px] border border-slate-800/30 bg-surface transition hover:-translate-y-1 hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
>>>>>>> 7ef21dc694fba76255b9941494ec1bbebc6c853b
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
            className="absolute top-5 right-5 z-20 inline-flex items-center justify-center rounded-full bg-white p-3 text-slate-900 shadow-2xl hover:bg-slate-100 transition-colors"
            aria-label="Close gallery"
          >
            <X size={18} />
          </button>

          {images.length > 1 && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                handlePrevious()
              }}
              className="absolute left-5 top-1/2 -translate-y-1/2 z-20 inline-flex items-center justify-center rounded-full bg-white p-3 text-slate-900 shadow-2xl hover:bg-slate-100 transition-colors"
              aria-label="Previous image"
            >
              <ChevronLeft size={20} />
            </button>
          )}

          {images.length > 1 && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                handleNext()
              }}
              className="absolute right-5 top-1/2 -translate-y-1/2 z-20 inline-flex items-center justify-center rounded-full bg-white p-3 text-slate-900 shadow-2xl hover:bg-slate-100 transition-colors"
              aria-label="Next image"
            >
              <ChevronRight size={20} />
            </button>
          )}

          <div
            className="relative z-10 w-full max-w-6xl overflow-hidden rounded-[30px] bg-black"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative h-[60vh] min-h-90 bg-black">
              <Image
                src={activeImage.src}
                alt={activeImage.alt}
                fill
                className="object-contain"
                sizes="100vw"
                priority
              />
            </div>

            <div className="flex flex-col gap-4 p-5" style={{ background: 'var(--surface)' }}>
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold" style={{ color: 'var(--tx-primary)' }}>
                    {activeImage.label}
                  </p>
                  <p className="text-xs" style={{ color: 'var(--tx-secondary)' }}>
                    Image {activeIndex !== null ? activeIndex + 1 : 1} of {images.length}
                  </p>
                </div>
                <span className="rounded-full bg-green-500 px-3 py-1 text-xs font-semibold text-white">
                  {images.length} images
                </span>
              </div>

              {images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={(e) => {
                        e.stopPropagation()
                        openImage(idx)
                      }}
                      className={`relative shrink-0 overflow-hidden rounded-2xl border transition ${
                        idx === activeIndex ? 'border-green-500 ring-2 ring-green-500/30' : 'border-slate-800/30 opacity-70 hover:opacity-100'
                      }`}
                      style={{ width: '64px', height: '64px' }}
                      aria-label={`Show image ${idx + 1}`}
                    >
                      <Image src={img.src} alt={img.alt} fill className="object-cover" sizes="64px" />
                    </button>
                  ))}
                </div>
              )}

              <p className="text-xs" style={{ color: 'var(--tx-secondary)' }}>
                {images.length > 1
                  ? 'Use arrows, thumbnails, or swipe for fast browsing. Close with Escape or by clicking outside.'
                  : 'Close the viewer with Escape, the close button, or by clicking outside.'}
              </p>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  )
}
