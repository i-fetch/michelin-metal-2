// app/admin/loading.tsx
export default function AdminLoading() {
  return (
    <div className="p-8 space-y-6 animate-pulse">
      <div className="h-9 w-52 rounded-xl" style={{ background: 'var(--bg-3)' }} />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-28 rounded-2xl" style={{ background: 'var(--bg-3)' }} />
        ))}
      </div>
      <div className="h-80 rounded-2xl" style={{ background: 'var(--bg-3)' }} />
    </div>
  )
}
