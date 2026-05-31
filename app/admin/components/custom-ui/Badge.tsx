import { ProductCategory } from "@/types/product"

type BadgeVariant = "green" | "yellow" | "gray" | "blue" | "red" | "purple"

interface BadgeProps {
  variant: BadgeVariant
  children: React.ReactNode
  dot?: boolean
  className?: string
}

const VARIANT_CLASSES: Record<BadgeVariant, string> = {
  green: "bg-green-50 text-green-800 before:bg-green-500",
  yellow: "bg-yellow-50 text-yellow-800 before:bg-yellow-500",
  gray: "bg-gray-100 text-gray-600 before:bg-gray-400",
  blue: "bg-blue-50 text-blue-800 before:bg-blue-500",
  red: "bg-red-50 text-red-700 before:bg-red-500",
  purple: "bg-purple-50 text-purple-800 before:bg-purple-500",
}

export function Badge({ variant, children, dot = true, className = "" }: BadgeProps) {
  return (
    <span
      className={`
        inline-flex items-center gap-1 text-[11.5px] font-medium px-2 py-0.5 rounded-full whitespace-nowrap
        ${dot ? "before:content-[''] before:w-[5px] before:h-[5px] before:rounded-full before:flex-shrink-0" : ""}
        ${VARIANT_CLASSES[variant]}
        ${className}
      `}
    >
      {children}
    </span>
  )
}

export function StatusBadge({ status }: { status: "active" | "draft" | "archived" }) {
  const map: Record<string, { variant: BadgeVariant; label: string }> = {
    active: { variant: "green", label: "Active" },
    draft: { variant: "yellow", label: "Draft" },
    archived: { variant: "gray", label: "Archived" },
  }
  const { variant, label } = map[status]
  return <Badge variant={variant}>{label}</Badge>
}

export function CategoryBadge({ category, label, icon }: { category: ProductCategory; label: string; icon: string }) {
  const map: Record<ProductCategory, BadgeVariant> = {
    aluminium: "green",
    metals: "blue",
    "non-ferrous": "yellow",
    bulk: "purple",
  }
  return (
    <Badge variant={map[category]} dot={false}>
      {icon} {label}
    </Badge>
  )
}
