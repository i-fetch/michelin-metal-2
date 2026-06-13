"use client"

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"
import { Globe } from "lucide-react"
import { motion } from "framer-motion"

const languages = [
  { value: "en", label: "English", short: "EN" },
  { value: "kr", label: "Korean", short: "KR" },
  { value: "fr", label: "French", short: "FR" },
  { value: "cn", label: "Chinese", short: "CN" },
]

interface Props {
  locale: string
  changeLocale: (val: string) => void
}

export default function LanguageSwitcher({ locale, changeLocale }: Props) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: -5 }} 
      animate={{ opacity: 1, y: 0 }}
      className="relative"
    >
      <Select value={locale} onValueChange={changeLocale}>
        <SelectTrigger
          className="
            w-auto
            min-w-[70px]
            h-9
            rounded-full
            border-border-subtle
            bg-[var(--bg-surface)]
            hover:bg-[var(--bg-subtle)]
            px-3
            font-bold
            text-[10px]
            tracking-tighter
            text-[var(--tx-primary)]
            transition-all
            focus:ring-1
            focus:ring-[var(--clr-green)]
          "
        >
          <div className="flex items-center gap-1.5">
            <Globe className="h-3.5 w-3.5 text-[var(--clr-green)]" />
            <span className="uppercase">{locale}</span>
          </div>
        </SelectTrigger>

        <SelectContent
          position="popper"
          className="z-[9999] min-w-[120px] rounded-xl border-border-subtle bg-white/80 backdrop-blur-xl shadow-2xl"
        >
          {languages.map((lang) => (
            <SelectItem
              key={lang.value}
              value={lang.value}
              className="text-xs font-medium py-2 focus:bg-[var(--clr-green-alpha)] focus:text-[var(--clr-green)] cursor-pointer"
            >
              {lang.label} ({lang.short})
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </motion.div>
  )
}