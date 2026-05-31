"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, ZoomIn } from "lucide-react"

interface ProductGalleryProps {
  images: string[]
  title: string
  categoryIcon: string
}

export default function ProductGallery({ images, title, categoryIcon }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [zoomed, setZoomed] = useState(false)

  const hasRealImages = images.length > 0
  const thumbCount = hasRealImages ? Math.min(images.length, 4) : 4

  const prev = () => setActiveIndex((i) => (i === 0 ? thumbCount - 1 : i - 1))
  const next = () => setActiveIndex((i) => (i === thumbCount - 1 ? 0 : i + 1))

  return (
    <div className="space-y-2.5">
      {/* Main image */}
      <div className="relative aspect-square bg-gradient-to-br from-gray-100 to-gray-50 rounded-2xl border border-gray-200 overflow-hidden group">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="absolute inset-0 flex items-center justify-center text-7xl md:text-8xl"
          >
            {hasRealImages ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={images[activeIndex]}
                alt={`${title} — view ${activeIndex + 1}`}
                className="w-full h-full object-cover"
              />
            ) : (
              categoryIcon
            )}
          </motion.div>
        </AnimatePresence>

        {/* Controls — only show if multiple images */}
        {thumbCount > 1 && (
          <>
            <button
              onClick={prev}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/90 hover:bg-white border border-gray-200 rounded-full flex items-center justify-center shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <ChevronLeft className="w-4 h-4 text-gray-700" />
            </button>
            <button
              onClick={next}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/90 hover:bg-white border border-gray-200 rounded-full flex items-center justify-center shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <ChevronRight className="w-4 h-4 text-gray-700" />
            </button>

            {/* Dot indicators */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
              {Array.from({ length: thumbCount }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIndex(i)}
                  className={`rounded-full transition-all ${
                    i === activeIndex ? "w-4 h-1.5 bg-green-600" : "w-1.5 h-1.5 bg-gray-300"
                  }`}
                />
              ))}
            </div>
          </>
        )}

        {/* Zoom hint */}
        {hasRealImages && (
          <button
            onClick={() => setZoomed(true)}
            className="absolute top-3 right-3 w-8 h-8 bg-white/90 border border-gray-200 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <ZoomIn className="w-4 h-4 text-gray-600" />
          </button>
        )}
      </div>

      {/* Thumbnails */}
      <div className="grid grid-cols-4 gap-2">
        {Array.from({ length: thumbCount }).map((_, i) => (
          <button
            key={i}
            onClick={() => setActiveIndex(i)}
            className={`aspect-square rounded-xl border-2 flex items-center justify-center text-2xl transition-all overflow-hidden ${
              i === activeIndex
                ? "border-green-500 bg-green-50 shadow-sm"
                : "border-gray-200 bg-gray-50 hover:border-green-300"
            }`}
          >
            {hasRealImages ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={images[i]}
                alt={`Thumbnail ${i + 1}`}
                className="w-full h-full object-cover"
              />
            ) : (
              ["🔩", "🔧", "📦", "🏭"][i]
            )}
          </button>
        ))}
      </div>

      {/* Fullscreen zoom modal */}
      <AnimatePresence>
        {zoomed && hasRealImages && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setZoomed(false)}
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-8 cursor-zoom-out"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={images[activeIndex]}
              alt={title}
              className="max-w-full max-h-full object-contain rounded-xl"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
