"use client"

import { motion } from "framer-motion"

interface ToggleProps {
  checked: boolean
  onChange: (val: boolean) => void
  disabled?: boolean
  size?: "sm" | "md"
}

export default function Toggle({ checked, onChange, disabled = false, size = "md" }: ToggleProps) {
  const dimensions = size === "sm"
    ? { track: "w-7 h-3.5", thumb: "w-2.5 h-2.5", translate: 14 }
    : { track: "w-8 h-[18px]", thumb: "w-3.5 h-3.5", translate: 16 }

  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => !disabled && onChange(!checked)}
      className={`
        relative inline-flex flex-shrink-0 rounded-full transition-colors duration-200 ease-in-out focus:outline-none
        focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-1
        ${dimensions.track}
        ${checked ? "bg-green-500" : "bg-gray-200"}
        ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
      `}
    >
      <motion.span
        layout
        animate={{ x: checked ? dimensions.translate : 2 }}
        transition={{ type: "spring", stiffness: 700, damping: 40 }}
        className={`
          inline-block rounded-full bg-white shadow-sm absolute top-[2px]
          ${dimensions.thumb}
        `}
      />
    </button>
  )
}
