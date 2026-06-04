"use client";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

interface SidebarProps {
  collapsed: boolean;
  mobileOpen: boolean;
  onCloseMobile: () => void;
}

const routes = [
    {
    name: "Overview",
    path: "/admin/analytics",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="2" x2="12" y2="22" />
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
  },
  {
    name: "Products Auditing",
    path: "/admin/products-auditing",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
        <line x1="3" y1="6" x2="21" y2="6" />
        <path d="M16 10a4 4 0 0 1-8 0" />
      </svg>
    ),
  },

  {
    name: "Settings",
    path: "/admin/settings",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3" />
        <path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14" />
        <path d="M12 2v2M12 20v2M2 12h2M20 12h2" />
      </svg>
    ),
  },
];

// Derives initials from a display name
function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export default function Sidebar({ collapsed, mobileOpen, onCloseMobile }: SidebarProps) {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [isSigningOut, setIsSigningOut] = useState(false);

  const handleSignOut = async () => {
    setIsSigningOut(true);
    await signOut({ redirect: true, callbackUrl: "/signin" });
  };

  const user = session?.user;
  const username = user?.name || "Admin User";
  const email = user?.email || "";
  const initials = getInitials(username);

  // Mobile drawer always shows full labels; desktop respects collapsed prop
  const effectiveCollapsed = mobileOpen ? false : collapsed;

  return (
    <aside
      className={[
        "flex flex-col py-5 h-full overflow-hidden shrink-0 z-30",
        "fixed md:static inset-y-0 left-0",
        mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0",
      ].join(" ")}
      style={{
        width: effectiveCollapsed ? "72px" : "260px",
        backgroundColor: "var(--bg-surface)",
        borderRight: "1px solid var(--border-subtle)",
        transition:
          "width 0.25s cubic-bezier(0.4, 0, 0.2, 1), transform 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
      }}
    >
      {/* ── Logo / Brand ── */}
      <div
        className="flex items-center justify-between gap-3 px-4 overflow-hidden shrink-0"
        style={{ height: "64px", borderBottom: "1px solid var(--border-subtle)" }}
      >
        {/* Logo and label */}
        <div className="flex items-center gap-3 overflow-hidden">
          {/* <span
            className="shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs font-black"
            style={{ backgroundColor: "var(--clr-green)" }}
          >
            M
          </span> */}

          <span className="shrink-0 w-8 h-8  rounded-md overflow-hidden flex items-center justify-center">
          {/* <span className="w-16 h-16 rounded-md overflow-hidden flex items-center justify-center"> */}
            <Image
              src="/logo.png"
              width={20}
              height={20}
              className="w-full h-full object-cover"
              alt="Mechelin Metals"
              priority
              unoptimized
            />
          </span>
          {/* <span
            className="font-bold text-sm tracking-wide whitespace-nowrap"
            style={{
              color: "var(--clr-green)",
              opacity: effectiveCollapsed ? 0 : 1,
              maxWidth: effectiveCollapsed ? 0 : "200px",
              overflow: "hidden",
              transition: "opacity 0.18s ease, max-width 0.25s ease",
            }}
          >
            MARKETPLACE ADMIN
          </span> */}
          <span className="flex flex-col leading-none"
          style={{
              color: "var(--clr-green)",
              opacity: effectiveCollapsed ? 0 : 1,
              maxWidth: effectiveCollapsed ? 0 : "200px",
              overflow: "hidden",
              transition: "opacity 0.18s ease, max-width 0.25s ease",
            }}
          >
              <h1
                className="text-lg sm:text-2xl tracking-wider font-bold transition-colors duration-300"
                style={{ color: 'var(--clr-green)', fontFamily: 'var(--font-display)' }}
              >
                MECHELIN METALS
              </h1>
              <span
                className="text-[8px] sm:text-xs uppercase tracking-[0.22em] font-semibold transition-colors duration-300"
                style={{ color: 'var(--tx-faint)' }}
              >
                NIGERIA LIMITED
              </span>
            </span>
        </div>

        {/* Close button - mobile only */}
        <button
          onClick={onCloseMobile}
          className="md:hidden shrink-0 p-1.5 rounded-lg hover:bg-[var(--bg-subtle)] transition-colors"
          title="Close sidebar"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>

      {/* ── Nav links ── */}
      <nav className="flex flex-col gap-1 p-3 flex-1 overflow-y-auto overflow-x-hidden">
        {routes.map((route) => {
          const isActive = pathname === route.path;
          return (
            <Link
              key={route.path}
              href={route.path}
              onClick={onCloseMobile}
              title={effectiveCollapsed ? route.name : undefined}
              className={[
                "flex items-center gap-3 rounded-lg transition-colors duration-150 text-sm font-medium",
                effectiveCollapsed ? "px-[13px] py-3 justify-center" : "px-3 py-3",
                isActive
                  ? "bg-[var(--clr-green-alpha)] text-[var(--clr-green)]"
                  : "text-[var(--tx-secondary)] hover:bg-[var(--bg-subtle)] hover:text-[var(--tx-primary)]",
              ].join(" ")}
            >
              <span className="shrink-0">{route.icon}</span>
              <span
                className="whitespace-nowrap overflow-hidden"
                style={{
                  opacity: effectiveCollapsed ? 0 : 1,
                  maxWidth: effectiveCollapsed ? 0 : "200px",
                  transition: "opacity 0.15s ease, max-width 0.25s ease",
                }}
              >
                {route.name}
              </span>
            </Link>
          );
        })}
      </nav>

      {/* ── User footer ── */}
      <div
        className="shrink-0 p-3"
        style={{ borderTop: "1px solid var(--border-subtle)" }}
      >
        {/* User info card — hidden when collapsed, shown as compact strip */}
        <div
          className="overflow-hidden"
          style={{
            opacity: effectiveCollapsed ? 0 : 1,
            maxHeight: effectiveCollapsed ? 0 : "80px",
            marginBottom: effectiveCollapsed ? 0 : "6px",
            transition: "opacity 0.18s ease, max-height 0.25s ease, margin-bottom 0.25s ease",
          }}
        >
          <div
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg"
            style={{ backgroundColor: "var(--bg-subtle)" }}
          >
            {/* Avatar */}
            <div
              className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold leading-none"
              style={{ backgroundColor: "var(--clr-green)" }}
            >
              {initials}
            </div>

            {/* Name + email */}
            <div className="flex flex-col min-w-0">
              <span
                className="text-sm font-semibold leading-tight truncate"
                style={{ color: "var(--tx-primary)" }}
              >
                {username}
              </span>
              <span
                className="text-xs leading-tight truncate mt-0.5"
                style={{ color: "var(--tx-muted)" }}
              >
                {email}
              </span>
            </div>
          </div>
        </div>

        {/* Sign out button */}
        <button
          onClick={handleSignOut}
          disabled={isSigningOut}
          title={effectiveCollapsed ? "Sign Out" : undefined}
          className={[
            "w-full flex items-center gap-3 rounded-lg transition-colors duration-150 text-sm font-medium",
            effectiveCollapsed ? "px-[13px] py-3 justify-center" : "px-3 py-2.5",
            isSigningOut
              ? "opacity-50 cursor-not-allowed text-[var(--tx-secondary)]"
              : "text-[var(--tx-secondary)] hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/30",
          ].join(" ")}
        >
          {/* Sign out icon */}
          <span className="shrink-0">
            {isSigningOut ? (
              /* Spinner */
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="animate-spin">
                <path d="M21 12a9 9 0 1 1-6.219-8.56" />
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1="21" y1="12" x2="9" y2="12" />
              </svg>
            )}
          </span>

          <span
            className="whitespace-nowrap overflow-hidden"
            style={{
              opacity: effectiveCollapsed ? 0 : 1,
              maxWidth: effectiveCollapsed ? 0 : "200px",
              transition: "opacity 0.15s ease, max-width 0.25s ease",
            }}
          >
            {isSigningOut ? "Signing out…" : "Sign Out"}
          </span>
        </button>
      </div>
    </aside>
  );
}