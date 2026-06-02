"use client"

import { useState, useRef, DragEvent } from "react"
import { Upload, X, ImageIcon } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface ImageUploadProps {
  value: string[]           // existing image URLs (for edit mode)
  onChange: (files: File[]) => void
  maxFiles?: number
}

export default function ImageUpload({ value = [], onChange, maxFiles = 8 }: ImageUploadProps) {
  const [previews, setPreviews] = useState<{ file: File; url: string }[]>([])
  const [isDragging, setIsDragging] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const processFiles = (files: FileList | null) => {
    if (!files) return
    const newFiles = Array.from(files).slice(0, maxFiles - previews.length - value.length)
    const newPreviews = newFiles.map((file) => ({
      file,
      url: URL.createObjectURL(file),
    }))
    setPreviews((prev) => [...prev, ...newPreviews])
    onChange([...previews.map((p) => p.file), ...newFiles])
  }

  const removePreview = (index: number) => {
    const updated = previews.filter((_, i) => i !== index)
    setPreviews(updated)
    onChange(updated.map((p) => p.file))
  }

  const handleDrop = (e: DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    processFiles(e.dataTransfer.files)
  }

  const totalCount = value.length + previews.length
  const canAdd = totalCount < maxFiles

  return (
    <div className="space-y-3">
      {/* Drop zone */}
      {canAdd && (
        <div
          onDragOver={(e) => { e.preventDefault(); setIsDragging(true) }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
          className={`
            border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all
            ${isDragging
              ? "border-green-500 bg-green-50"
              : "border-gray-200 bg-gray-50 hover:border-green-400 hover:bg-green-50/50"
            }
          `}
        >
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={(e) => processFiles(e.target.files)}
          />
          <div className={`mx-auto mb-2 w-10 h-10 rounded-xl flex items-center justify-center ${isDragging ? "bg-green-100" : "bg-gray-100"}`}>
            <Upload className={`w-5 h-5 ${isDragging ? "text-green-600" : "text-gray-400"}`} />
          </div>
          <p className="text-[13px] font-medium text-gray-600">
            {isDragging ? "Drop to upload" : "Drop images here or click to browse"}
          </p>
          <p className="text-[11.5px] text-gray-400 mt-1">
            PNG, JPG, WebP up to 5MB each · Max {maxFiles} images · {totalCount}/{maxFiles} used
          </p>
        </div>
      )}

      {/* Previews grid */}
      {(value.length > 0 || previews.length > 0) && (
        <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
          {/* Existing server images */}
          {value.map((url, i) => (
            <div
              key={`existing-${i}`}
              className="relative group aspect-square rounded-lg overflow-hidden border border-gray-200 bg-gray-50"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={url} alt="" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
              {i === 0 && (
                <span className="absolute bottom-1 left-1 text-[9px] font-semibold bg-black/60 text-white px-1.5 py-0.5 rounded">
                  Cover
                </span>
              )}
            </div>
          ))}

          {/* New file previews */}
          <AnimatePresence>
            {previews.map((p, i) => (
              <motion.div
                key={p.url}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="relative group aspect-square rounded-lg overflow-hidden border border-green-200 bg-gray-50"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={p.url} alt="" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors" />
                <button
                  type="button"
                  onClick={() => removePreview(i)}
                  className="absolute top-1 right-1 w-4.5 h-4.5 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="w-2.5 h-2.5" />
                </button>
                {value.length === 0 && i === 0 && (
                  <span className="absolute bottom-1 left-1 text-[9px] font-semibold bg-black/60 text-white px-1.5 py-0.5 rounded">
                    Cover
                  </span>
                )}
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Add more button */}
          {canAdd && totalCount > 0 && (
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="aspect-square rounded-lg border-2 border-dashed border-gray-200 bg-white flex items-center justify-center text-gray-300 hover:border-green-400 hover:text-green-500 transition-colors"
            >
              <ImageIcon className="w-5 h-5" />
            </button>
          )}
        </div>
      )}
    </div>
  )
}
