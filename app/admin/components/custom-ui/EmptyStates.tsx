import Link from "next/link"
import { Package, MessageSquare, AlertTriangle, WifiOff, SearchX } from "lucide-react"

interface EmptyStateProps {
  icon?: React.ReactNode
  title: string
  description: string
  action?: {
    label: string
    href?: string
    onClick?: () => void
  }
}

export function EmptyState({ icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
      <div className="w-14 h-14 bg-gray-100 rounded-2xl flex items-center justify-center mb-4 text-2xl">
        {icon ?? <Package className="w-6 h-6 text-gray-400" />}
      </div>
      <h3 className="text-[16px] font-semibold text-gray-900 mb-1.5">{title}</h3>
      <p className="text-[13.5px] text-gray-400 max-w-[280px] leading-relaxed mb-5">{description}</p>
      {action && (
        action.href ? (
          <Link
            href={action.href}
            className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-[13px] font-medium rounded-lg transition-colors"
          >
            {action.label}
          </Link>
        ) : (
          <button
            onClick={action.onClick}
            className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-[13px] font-medium rounded-lg transition-colors"
          >
            {action.label}
          </button>
        )
      )}
    </div>
  )
}

export function NoProductsEmpty() {
  return (
    <EmptyState
      icon={<Package className="w-6 h-6 text-gray-400" />}
      title="No products yet"
      description="Start building your catalogue by adding your first product listing."
      action={{ label: "Add First Product", href: "/admin/products/new" }}
    />
  )
}

export function NoSearchResults({ query }: { query: string }) {
  return (
    <EmptyState
      icon={<SearchX className="w-6 h-6 text-gray-400" />}
      title="No results found"
      description={`No products matched "${query}". Try a different keyword or clear filters.`}
    />
  )
}

export function NoInquiriesEmpty() {
  return (
    <EmptyState
      icon={<MessageSquare className="w-6 h-6 text-gray-400" />}
      title="No inquiries yet"
      description="Quote requests from visitors will appear here once your products are live."
    />
  )
}

interface ErrorStateProps {
  title?: string
  description?: string
  onRetry?: () => void
  type?: "error" | "offline" | "notfound"
}

export function ErrorState({
  title,
  description,
  onRetry,
  type = "error",
}: ErrorStateProps) {
  const configs = {
    error: {
      icon: <AlertTriangle className="w-6 h-6 text-red-500" />,
      bg: "bg-red-50",
      defaultTitle: "Something went wrong",
      defaultDesc: "We couldn't load this data. Please try again.",
    },
    offline: {
      icon: <WifiOff className="w-6 h-6 text-gray-500" />,
      bg: "bg-gray-100",
      defaultTitle: "You're offline",
      defaultDesc: "Check your connection and try again.",
    },
    notfound: {
      icon: <SearchX className="w-6 h-6 text-gray-400" />,
      bg: "bg-gray-100",
      defaultTitle: "Not found",
      defaultDesc: "The resource you're looking for doesn't exist.",
    },
  }

  const cfg = configs[type]

  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
      <div className={`w-14 h-14 ${cfg.bg} rounded-2xl flex items-center justify-center mb-4`}>
        {cfg.icon}
      </div>
      <h3 className="text-[16px] font-semibold text-gray-900 mb-1.5">{title ?? cfg.defaultTitle}</h3>
      <p className="text-[13.5px] text-gray-400 max-w-xs leading-relaxed mb-5">
        {description ?? cfg.defaultDesc}
      </p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-4 py-2 bg-white border border-gray-200 text-gray-700 text-[13px] font-medium rounded-lg hover:bg-gray-50 transition-colors"
        >
          Try again
        </button>
      )}
    </div>
  )
}

export function InlineError({ message }: { message: string }) {
  return (
    <div className="flex items-start gap-2.5 p-3 bg-red-50 border border-red-100 rounded-lg">
      <AlertTriangle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
      <p className="text-[13px] text-red-700">{message}</p>
    </div>
  )
}

export function InlineSuccess({ message }: { message: string }) {
  return (
    <div className="flex items-start gap-2.5 p-3 bg-green-50 border border-green-100 rounded-lg">
      <svg className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
        <path d="M20 6L9 17l-5-5" />
      </svg>
      <p className="text-[13px] text-green-800">{message}</p>
    </div>
  )
}
