function Skel({ className = "" }: { className?: string }) {
  return (
    <div
      className={`bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 animate-[shimmer_1.5s_infinite] rounded ${className}`}
      style={{ backgroundSize: "200% 100%" }}
    />
  )
}

export function DashboardSkeleton() {
  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="bg-white border border-gray-200 rounded-xl p-4 space-y-3">
            <div className="flex justify-between">
              <Skel className="h-3 w-24" />
              <Skel className="h-8 w-8 rounded-lg" />
            </div>
            <Skel className="h-7 w-16" />
            <Skel className="h-3 w-28" />
          </div>
        ))}
      </div>
      {/* Content */}
      <div className="grid grid-cols-1 md:grid-cols-[1.5fr_1fr] gap-4">
        <div className="bg-white border border-gray-200 rounded-xl p-5 space-y-4">
          <Skel className="h-4 w-32" />
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex gap-3 items-start">
              <Skel className="w-7 h-7 rounded-lg flex-shrink-0" />
              <div className="flex-1 space-y-1.5">
                <Skel className="h-3 w-full" />
                <Skel className="h-2.5 w-20" />
              </div>
            </div>
          ))}
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-5 space-y-4">
          <Skel className="h-4 w-28" />
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex gap-3 items-center">
              <Skel className="w-8 h-8 rounded-lg flex-shrink-0" />
              <div className="flex-1 space-y-1.5">
                <Skel className="h-2.5 w-full" />
                <Skel className="h-1.5 w-full rounded-full" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export function ProductListSkeleton() {
  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
      <div className="flex items-center gap-3 p-3.5 border-b border-gray-100">
        <Skel className="h-8 w-56 rounded-lg" />
        <Skel className="h-8 w-20 rounded-lg" />
        <Skel className="h-8 w-20 rounded-lg" />
      </div>
      <div className="p-3 flex gap-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skel key={i} className="h-6 w-20 rounded-full" />
        ))}
      </div>
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-100 bg-gray-50">
            {["","Product","Category","Status","Featured","Price",""].map((_, i) => (
              <th key={i} className="p-3 text-left">
                <Skel className="h-3 w-16" />
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: 6 }).map((_, i) => (
            <tr key={i} className="border-b border-gray-100">
              <td className="p-3"><Skel className="h-3.5 w-3.5" /></td>
              <td className="p-3">
                <div className="flex items-center gap-2.5">
                  <Skel className="w-9 h-9 rounded-lg flex-shrink-0" />
                  <div className="space-y-1">
                    <Skel className="h-3 w-36" />
                    <Skel className="h-2.5 w-24" />
                  </div>
                </div>
              </td>
              <td className="p-3"><Skel className="h-5 w-20 rounded-full" /></td>
              <td className="p-3"><Skel className="h-5 w-14 rounded-full" /></td>
              <td className="p-3"><Skel className="h-4 w-8 rounded-full" /></td>
              <td className="p-3"><Skel className="h-3 w-16" /></td>
              <td className="p-3"><Skel className="h-6 w-6 rounded-md" /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export function ProductFormSkeleton() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-4">
      <div className="space-y-4">
        {Array.from({ length: 3 }).map((_, s) => (
          <div key={s} className="bg-white border border-gray-200 rounded-xl p-5 space-y-4">
            <Skel className="h-4 w-40" />
            <div className="grid grid-cols-2 gap-3">
              {Array.from({ length: 4 }).map((_, f) => (
                <div key={f} className={`space-y-1.5 ${f < 2 ? "col-span-2" : ""}`}>
                  <Skel className="h-3 w-20" />
                  <Skel className="h-9 w-full rounded-lg" />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="bg-white border border-gray-200 rounded-xl p-5 space-y-4 h-fit">
        <Skel className="h-4 w-32" />
        <Skel className="h-9 w-full rounded-lg" />
        <Skel className="h-12 w-full rounded-lg" />
        <Skel className="h-10 w-full rounded-lg" />
        <Skel className="h-10 w-full rounded-lg" />
      </div>
    </div>
  )
}

export function PublicProductGridSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
          <Skel className="h-40 rounded-none" />
          <div className="p-4 space-y-2.5">
            <Skel className="h-5 w-24 rounded-full" />
            <Skel className="h-4 w-full" />
            <Skel className="h-3.5 w-full" />
            <Skel className="h-3.5 w-3/4" />
          </div>
          <div className="px-4 py-3 border-t border-gray-100 flex justify-between">
            <Skel className="h-4 w-20" />
            <Skel className="h-4 w-24" />
          </div>
        </div>
      ))}
    </div>
  )
}

export function ProductDetailSkeleton() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="space-y-2.5">
        <Skel className="aspect-square w-full rounded-2xl" />
        <div className="grid grid-cols-4 gap-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skel key={i} className="aspect-square rounded-lg" />
          ))}
        </div>
      </div>
      <div className="space-y-4">
        <Skel className="h-5 w-32 rounded-full" />
        <Skel className="h-8 w-3/4" />
        <Skel className="h-8 w-1/2" />
        <Skel className="h-4 w-full" />
        <Skel className="h-4 w-full" />
        <Skel className="h-4 w-5/6" />
        <div className="space-y-2 mt-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex items-center gap-2">
              <Skel className="w-4 h-4 rounded-sm flex-shrink-0" />
              <Skel className="h-3.5 w-full" />
            </div>
          ))}
        </div>
        <Skel className="h-24 w-full rounded-xl" />
        <Skel className="h-11 w-full rounded-xl" />
        <Skel className="h-11 w-full rounded-xl" />
      </div>
    </div>
  )
}
