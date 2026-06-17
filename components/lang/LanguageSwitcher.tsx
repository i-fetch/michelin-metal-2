"use client"

import { useState, useRef, useEffect } from "react"
import { Globe, Check, ChevronDown } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

const languages = [
  { value: "en", label: "English", native: "English",  short: "EN", flag: "https://flagcdn.com/w40/gb.png" },
  { value: "kr", label: "Korean",  native: "한국어",    short: "KR", flag: "https://flagcdn.com/w40/kr.png" },
  { value: "fr", label: "French",  native: "Français", short: "FR", flag: "https://flagcdn.com/w40/fr.png" },
  { value: "cn", label: "Chinese", native: "中文",      short: "CN", flag: "https://flagcdn.com/w40/cn.png" },
]

interface Props {
  locale: string
  changeLocale: (val: string) => void
}

export default function LanguageSwitcher({ locale, changeLocale }: Props) {
  const [open, setOpen] = useState(false)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const current = languages.find((l) => l.value === locale) ?? languages[0]

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", handler)
    return () => document.removeEventListener("mousedown", handler)
  }, [])

  return (
    <div ref={wrapperRef} className="relative">
      {/* Trigger */}
      <motion.button
        initial={{ opacity: 0, y: -4 }}
        animate={{ opacity: 1, y: 0 }}
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className={cn(
          "flex items-center gap-1.5 h-[34px] px-2.5 rounded-[8px]",
          "border border-border/50 bg-white",
          "text-[11px] font-medium tracking-wide text-foreground uppercase",
          "hover:bg-muted/50 hover:border-border",
          "transition-colors duration-150 outline-none",
          "focus-visible:ring-2 focus-visible:ring-[var(--clr-green)]"
        )}
      >
        {/* <Globe className="h-[15px] w-[15px] text-[var(--clr-green)] shrink-0" /> */}
        <img
          src={current.flag}
          alt={`${current.label} flag`}
          className="w-5 h-[15px] rounded-[3px] object-cover border border-black/[0.08]"
        />
        <span>{current.short}</span>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 22 }}
          className="flex items-center"
        >
          <ChevronDown className="h-3 w-3 text-muted-foreground" />
        </motion.span>
      </motion.button>

      {/* Dropdown */}
      <AnimatePresence>
        {open && (
          <motion.div
            role="listbox"
            initial={{ opacity: 0, y: -6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0,  scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.97 }}
            transition={{ type: "spring", stiffness: 340, damping: 24 }}
            style={{ transformOrigin: "top right" }}
            className={cn(
              "absolute right-0 top-[calc(100%+6px)] z-[9999]",
              "min-w-[180px] rounded-xl p-1.5",
              "bg-white border border-border/40",
              "shadow-[0_4px_20px_rgba(0,0,0,0.08),0_0_0_0.5px_rgba(0,0,0,0.05)]"
            )}
          >
            {languages.map((lang, i) => {
              const isActive = lang.value === locale
              const showDivider = i === 2 // divider before last group

              return (
                <div key={lang.value}>
                  {showDivider && (
                    <div className="my-1 h-px bg-border/50 mx-1" />
                  )}
                  <motion.button
                    role="option"
                    aria-selected={isActive}
                    initial={{ opacity: 0, y: 3 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.04 }}
                    onClick={() => {
                      changeLocale(lang.value)
                      setOpen(false)
                    }}
                    className={cn(
                      "w-full flex items-center gap-2.5 px-2.5 py-2 rounded-[7px]",
                      "text-left cursor-pointer transition-colors duration-100",
                      isActive
                        ? "bg-[#f0fdf4]"
                        : "hover:bg-[#f0fdf4]"
                    )}
                  >
                    <img
                    src={lang.flag}
                    alt={`${lang.label} flag`}
                    className="w-5 h-[15px] rounded-[3px] object-cover border border-black/[0.08]"
                  />
                  <div className="flex flex-col flex-1 gap-px">
                    <span className="text-[13px] font-medium text-foreground leading-tight">
                      {lang.label}
                    </span>
                    <span className="text-[11px] text-muted-foreground leading-tight">
                      {lang.native}
                    </span>
                  </div>
                    <span className="text-[10px] font-medium tracking-wide text-muted-foreground/60 uppercase">
                      {lang.short}
                    </span>
                    
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: isActive ? 1 : 0 }}
                      transition={{ type: "spring", stiffness: 400, damping: 20 }}
                    >
                      <Check className="h-3.5 w-3.5 text-[var(--clr-green)]" />
                    </motion.span>
                  </motion.button>
                </div>
              )
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}