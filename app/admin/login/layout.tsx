// app/admin/login/layout.tsx
// This layout intentionally does NOT include the admin sidebar
// The middleware + auth.ts guard the other /admin/* routes
export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
