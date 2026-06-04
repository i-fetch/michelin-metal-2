"use client";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

interface SidebarProps {
  collapsed: boolean;
  mobileOpen: boolean;
  onCloseMobile: () => void;
}

const routes = [
  {
    name: "Products Management",
    path: "/admin/products",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
        <line x1="3" y1="6" x2="21" y2="6" />
        <path d="M16 10a4 4 0 0 1-8 0" />
      </svg>
    ),
  },
  {
    name: "Analytics",
    path: "/admin/analytics",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="2" x2="12" y2="22" />
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
  },
  {
    name: "Profile Settings",
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

export default function Sidebar({ collapsed, mobileOpen, onCloseMobile }: SidebarProps) {
  const pathname = usePathname();
  const { data: session } = useSession();
  const router = useRouter();
  const [isSigningOut, setIsSigningOut] = useState(false);

  const handleSignOut = async () => {
    setIsSigningOut(true);
    await signOut({ redirect: true, callbackUrl: "/signin" });
  };

  const user = session?.user;
  const username = user?.name || "User";
  const email = user?.email || "";

  const isMobileDrawer = mobileOpen; // true only when hamburger is open (mobile only)
  const effectiveCollapsed = isMobileDrawer ? false : collapsed;

  return (
    <aside
      className={[
        "flex flex-col h-full overflow-hidden shrink-0 z-30",
        "fixed md:static inset-y-0 left-0",
        mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0",
      ].join(" ")}
      style={{
        // On mobile drawer: always full width. On desktop: respect collapsed.
        width: effectiveCollapsed ? "72px" : "260px",
        backgroundColor: "var(--bg-surface)",
        borderRight: "1px solid var(--border-subtle)",
        transition: "width 0.25s cubic-bezier(0.4, 0, 0.2, 1), transform 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
      }}
    >
      {/* Logo / Brand */}
      <div
        className="flex items-center gap-3 px-4 overflow-hidden shrink-0"
        style={{ height: "64px", borderBottom: "1px solid var(--border-subtle)" }}
      >
        <span
          className="shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs font-black"
          style={{ backgroundColor: "var(--clr-green)" }}
        >
          M
        </span>

        <span
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
        </span>
      </div>

      {/* Nav links */}
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

      {/* Sign Out */}
      <div
        className="p-3 border-t"
        style={{ borderTopColor: "var(--border-subtle)" }}
      >
        <button
          onClick={handleSignOut}
          disabled={isSigningOut}
          title={effectiveCollapsed ? "Sign Out" : undefined}
          className={[
            "w-full flex items-center gap-3 rounded-lg transition-colors duration-150 text-sm font-medium",
            effectiveCollapsed ? "px-[13px] py-3 justify-center" : "px-3 py-3",
            isSigningOut
              ? "opacity-50 cursor-not-allowed"
              : "text-[var(--tx-secondary)] hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/30",
          ].join(" ")}
        >
          <span className="shrink-0">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
          </span>

          <span
            className="whitespace-nowrap overflow-hidden"
            style={{
              opacity: effectiveCollapsed ? 0 : 1,
              maxWidth: effectiveCollapsed ? 0 : "200px",
              transition: "opacity 0.15s ease, max-width 0.25s ease",
            }}
          >
            {isSigningOut ? "Signing out..." : "Sign Out"}
          </span>
        </button>
      </div>
    </aside>
  );
}