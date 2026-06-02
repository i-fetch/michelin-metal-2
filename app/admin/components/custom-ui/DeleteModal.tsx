"use client"

import { useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Trash2, X } from "lucide-react"

interface DeleteModalProps {
  open: boolean
  onClose: () => void
  onConfirm: () => void
  productTitle: string
  loading?: boolean
}

export default function DeleteModal({ open, onClose, onConfirm, productTitle, loading }: DeleteModalProps) {
  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose() }
    if (open) window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [open, onClose])

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [open])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 8 }}
            transition={{ type: "spring", damping: 30, stiffness: 400 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-[420px]"
          >
            {/* Icon */}
            <div className="w-10 h-10 bg-red-50 rounded-xl flex items-center justify-center mb-4">
              <Trash2 className="w-5 h-5 text-red-500" />
            </div>

            {/* Header */}
            <div className="flex items-start justify-between mb-2">
              <h2 className="text-[16px] font-semibold text-gray-900">Delete Product?</h2>
              <button
                onClick={onClose}
                className="p-1 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors -mt-0.5 -mr-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-[13.5px] text-gray-500 leading-relaxed mb-5">
              This will permanently delete{" "}
              <span className="font-medium text-gray-800">{productTitle}</span> and remove it
              from all public listings. This action cannot be undone.
            </p>

            {/* Actions */}
            <div className="flex gap-2.5 justify-end">
              <button
                onClick={onClose}
                disabled={loading}
                className="px-4 py-2 bg-white border border-gray-200 text-gray-600 text-[13px] font-medium rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={onConfirm}
                disabled={loading}
                className="flex items-center gap-2 px-4 py-2 bg-red-50 border border-red-200 text-red-700 text-[13px] font-medium rounded-lg hover:bg-red-100 transition-colors disabled:opacity-50"
              >
                {loading ? (
                  <svg className="animate-spin w-3.5 h-3.5" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                  </svg>
                ) : (
                  <Trash2 className="w-3.5 h-3.5" />
                )}
                {loading ? "Deleting…" : "Delete Product"}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
