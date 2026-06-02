import Link from "next/link"
import { ArrowRight, Star } from "lucide-react"
import { Product, PRODUCT_CATEGORIES } from "@/types"
// import { Product, PRODUCT_CATEGORIES } from "@/types/product"

const CAT_ICONS: Record<string, string> = { aluminium: "🔩", metals: "⚙️", "non-ferrous": "✨", bulk: "📦" }
const CAT_BADGE_BG: Record<string, string> = {
  aluminium: "bg-green-50 text-green-800",
  metals: "bg-blue-50 text-blue-800",
  "non-ferrous": "bg-amber-50 text-amber-800",
  bulk: "bg-purple-50 text-purple-800",
}

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const cat = PRODUCT_CATEGORIES.find((c) => c.id === product.category)!

  return (
    <Link href={`/product/${product.slug}`} className="block group">
      <article className="bg-white border border-gray-200 rounded-2xl overflow-hidden transition-all duration-200 group-hover:border-green-400 group-hover:shadow-md group-hover:-translate-y-0.5">
        {/* Image */}
        <div className="h-44 bg-gradient-to-br from-gray-100 to-gray-50 flex items-center justify-center text-5xl border-b border-gray-100 relative">
          {product.images.length > 0 ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={product.images[0]}
              alt={product.title}
              className="w-full h-full object-cover"
            />
          ) : (
            CAT_ICONS[product.category]
          )}
          {product.featured && (
            <div className="absolute top-2.5 right-2.5 flex items-center gap-1 bg-amber-50 border border-amber-200 text-amber-700 text-[10px] font-semibold px-1.5 py-0.5 rounded-full">
              <Star className="w-2.5 h-2.5 fill-amber-500 text-amber-500" /> Featured
            </div>
          )}
        </div>

        {/* Body */}
        <div className="p-4">
          <span className={`inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full uppercase tracking-wide mb-2 ${CAT_BADGE_BG[product.category]}`}>
            {cat.icon} {cat.label}
          </span>
          <h3 className="text-[14px] font-semibold text-gray-900 mb-1.5 leading-snug">{product.title}</h3>
          <p className="text-[12.5px] text-gray-500 leading-relaxed line-clamp-2">{product.shortDescription}</p>
        </div>

        {/* Footer */}
        <div className="px-4 py-3 border-t border-gray-100 flex items-center justify-between">
          <div>
            {product.showPrice && product.price != null ? (
              <span className="text-[14px] font-semibold text-gray-900">
                ${product.price.toLocaleString()}
                <span className="text-[12px] font-normal text-gray-400">/MT</span>
              </span>
            ) : (
              <span className="text-[13px] font-medium text-gray-400">Request Quote</span>
            )}
          </div>
          <div className="flex items-center gap-1 text-[12.5px] font-medium text-green-700 group-hover:gap-2 transition-all">
            View Details <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </div>
      </article>
    </Link>
  )
}
