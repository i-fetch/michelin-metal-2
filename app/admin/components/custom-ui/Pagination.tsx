"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  totalItems?: number
  itemsPerPage?: number
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  totalItems,
  itemsPerPage,
}: PaginationProps) {
  if (totalPages <= 1) return null

  // Generate page numbers with ellipsis
  const getPageNumbers = () => {
    const pages: (number | "…")[] = []
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1)
    }
    pages.push(1)
    if (currentPage > 3) pages.push("…")
    for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
      pages.push(i)
    }
    if (currentPage < totalPages - 2) pages.push("…")
    pages.push(totalPages)
    return pages
  }

  return (
    <div className="flex items-center justify-between">
      {totalItems != null && itemsPerPage != null ? (
        <span className="text-[12px] text-gray-400">
          Showing {((currentPage - 1) * itemsPerPage) + 1}–{Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems}
        </span>
      ) : <span />}

      <div className="flex items-center gap-1">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="w-8 h-8 rounded-lg border border-gray-200 bg-white text-gray-500 flex items-center justify-center hover:border-green-400 hover:text-green-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {getPageNumbers().map((page, i) => (
          page === "…" ? (
            <span key={`ellipsis-${i}`} className="w-8 h-8 flex items-center justify-center text-[13px] text-gray-400">…</span>
          ) : (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={`w-8 h-8 rounded-lg border text-[13px] font-medium transition-colors ${
                page === currentPage
                  ? "bg-green-600 border-green-600 text-white"
                  : "bg-white border-gray-200 text-gray-600 hover:border-green-400 hover:text-green-700"
              }`}
            >
              {page}
            </button>
          )
        ))}

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="w-8 h-8 rounded-lg border border-gray-200 bg-white text-gray-500 flex items-center justify-center hover:border-green-400 hover:text-green-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}
