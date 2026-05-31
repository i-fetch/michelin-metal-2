"use client"

import { useState, useRef, KeyboardEvent } from "react"
import { X } from "lucide-react"

interface TagInputProps {
  value: string[]
  onChange: (tags: string[]) => void
  placeholder?: string
  maxTags?: number
  className?: string
}

export default function TagInput({
  value,
  onChange,
  placeholder = "Type and press Enter…",
  maxTags = 20,
  className = "",
}: TagInputProps) {
  const [input, setInput] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)

  const addTag = (raw: string) => {
    const tag = raw.trim()
    if (!tag || value.includes(tag) || value.length >= maxTags) return
    onChange([...value, tag])
    setInput("")
  }

  const removeTag = (index: number) => {
    onChange(value.filter((_, i) => i !== index))
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault()
      addTag(input)
    } else if (e.key === "Backspace" && !input && value.length > 0) {
      removeTag(value.length - 1)
    }
  }

  return (
    <div
      onClick={() => inputRef.current?.focus()}
      className={`
        flex flex-wrap gap-1.5 p-1.5 border border-gray-200 rounded-lg bg-white cursor-text min-h-[38px]
        focus-within:border-green-500 focus-within:ring-2 focus-within:ring-green-500/10 transition-all
        ${className}
      `}
    >
      {value.map((tag, i) => (
        <span
          key={tag}
          className="inline-flex items-center gap-1 bg-green-50 text-green-800 text-[12px] font-medium px-2 py-0.5 rounded-full"
        >
          {tag}
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); removeTag(i) }}
            className="text-green-700 hover:text-green-900 transition-colors"
          >
            <X className="w-3 h-3" />
          </button>
        </span>
      ))}
      {value.length < maxTags && (
        <input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={() => input && addTag(input)}
          placeholder={value.length === 0 ? placeholder : ""}
          className="flex-1 min-w-[100px] text-[12.5px] bg-transparent border-none outline-none placeholder-gray-400 py-0.5 px-1"
        />
      )}
    </div>
  )
}
