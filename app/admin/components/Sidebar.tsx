"use client";
import { Database, Mail, Plus, Settings, UserCog } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

interface SidebarProps {
  collapsed: boolean;
  mobileOpen: boolean;
  onCloseMobile: () => void;
  productCount?: number;
  inquiryCount?: number;
  contactsCount?: number;
}

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export default function Sidebar({ collapsed, mobileOpen, onCloseMobile, productCount, inquiryCount , contactsCount }: SidebarProps) {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [isSigningOut, setIsSigningOut] = useState(false);
  const router = useRouter();

  const user = session?.user;
  const username = user?.name || "Admin User";
  const email = user?.email || "";
  const initials = getInitials(username);

  const handleSignOut = async () => {
    setIsSigningOut(true);
    await signOut({ redirect: true, callbackUrl: "/signin" });
  };

  // Mobile drawer always shows full labels; desktop respects collapsed prop
  const effectiveCollapsed = mobileOpen ? false : collapsed;

  // Modern Navigation Button Styler leveraging your CSS Variables
  const getLinkStyles = (hashPath: string) => {
    const isActive = pathname?.includes(hashPath) || (typeof window !== 'undefined' && window.location.hash.includes(hashPath));

    const baseClasses = "w-full text-left text-xs font-semibold px-3 py-2.5 rounded-lg flex items-center gap-3 transition-all duration-200 group relative";

    // Using your alpha values and text variables here
    const activeClasses = "bg-[var(--clr-green-alpha)] text-[var(--clr-green)]";
    const inactiveClasses = "text-[var(--tx-secondary)] hover:bg-[var(--bg-subtle)] hover:text-[var(--tx-primary)]";

    return `${baseClasses} ${isActive ? activeClasses : inactiveClasses}`;
  };

  return (
    <aside
      className={[
        "flex flex-col h-full overflow-hidden shrink-0 z-30",
        "fixed md:static inset-y-0 left-0",
        mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0",
      ].join(" ")}
      style={{
        width: effectiveCollapsed ? "72px" : "260px",
        backgroundColor: "var(--bg-surface)",
        borderRight: "1px solid var(--border-subtle)",
        transition: "width 0.2s cubic-bezier(0.4, 0, 0.2, 1), transform 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
      }}
    >
      {/* ── Logo / Brand Area ── */}
      <div
        className={`flex items-center gap-3 px-4 shrink-0 transition-all duration-200 ${effectiveCollapsed ? "justify-center" : "justify-between"
          }`}
        style={{ height: "72px", borderBottom: "1px solid var(--border-subtle)" }}
      >
        <div className="flex items-center gap-3 overflow-hidden">
          {/* Logo container wrapper matching your subtle theme */}
          <div
            className="shrink-0 rounded-lg overflow-hidden flex items-center justify-center p-1 w-9 h-9"
            style={{
              backgroundColor: "var(--bg-subtle)",
              border: "1px solid var(--border-subtle)"
            }}
          >
            <Image
              src="/logo.png"
              width={24}
              height={24}
              className="w-full h-full object-contain"
              alt="Mechelin Metals"
              priority
              unoptimized
            />
          </div>

          {/* Typography layout */}
          <div
            className="flex flex-col leading-tight select-none"
            style={{
              opacity: effectiveCollapsed ? 0 : 1,
              maxWidth: effectiveCollapsed ? 0 : "180px",
              overflow: "hidden",
              transition: "opacity 0.15s ease, max-width 0.2s ease",
            }}
          >
            <h1
              className="text-xs tracking-wider font-bold truncate"
              style={{ color: "var(--clr-green)" }}
            >
              MECHELIN METALS
            </h1>
            <span
              className="text-[9px] uppercase tracking-[0.18em] font-medium"
              style={{ color: "var(--tx-muted)" }}
            >
              NIGERIA LIMITED
            </span>
          </div>
        </div>

        {/* Close button - Mobile Drawer only */}
        <button
          onClick={onCloseMobile}
          className="md:hidden shrink-0 p-1.5 rounded-lg transition-colors"
          style={{ color: "var(--tx-secondary)" }}
          title="Close sidebar"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>

      {/* ── Nav Links Navigation Area (Scrollable Engine) ── */}
      <div className="flex-1 overflow-y-auto py-4 px-3 space-y-1">

        {/* Section 1: Catalog Auditing */}
        <div className="mb-2">
          <p
            className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest block truncate transition-opacity duration-200"
            style={{ color: "var(--tx-muted)", opacity: effectiveCollapsed ? 0 : 1 }}
          >
            {effectiveCollapsed ? "•" : "Catalog Auditing"}
          </p>

          <button
            onClick={() => router.push("/admin/products-auditing")}
            className={getLinkStyles("/admin/products-auditing")}
            title={effectiveCollapsed ? "Listings Auditing" : undefined}
          >
            <Database className="h-4 w-4 shrink-0" />
            <span className="truncate transition-opacity" style={{ opacity: effectiveCollapsed ? 0 : 1 }}>
              Listings Auditing ({productCount})
            </span>
          </button>

          <button
            onClick={() => router.push("/admin/products-auditing/new")}
            className={getLinkStyles("/admin/products-auditing/new")}
            title={effectiveCollapsed ? "Create Item Listing" : undefined}
          >
            <Plus className="h-4 w-4 shrink-0" />
            <span className="truncate transition-opacity" style={{ opacity: effectiveCollapsed ? 0 : 1 }}>
              Create Item listing
            </span>
          </button>
        </div>

        {/* Section 2: Inquiries Desk */}
        <div className="pt-1 mb-2">
          <div style={{ borderTop: "1px solid var(--border-subtle)", margin: "8px 0" }} />
          <p
            className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest block truncate transition-opacity duration-200"
            style={{ color: "var(--tx-muted)", opacity: effectiveCollapsed ? 0 : 1 }}
          >
            {effectiveCollapsed ? "•" : "Inquiries Desk"}
          </p>

          <button
            onClick={() => router.push("/admin/inquiries")}
            className={getLinkStyles("/admin/inquiries")}
            title={effectiveCollapsed ? "B2B Trade Inquiries" : undefined}
          >
            <UserCog className="h-4 w-4 shrink-0" />

            <span className="truncate transition-opacity" style={{ opacity: effectiveCollapsed ? 0 : 1 }}>
              B2B Trade Inquiries ({inquiryCount})
            </span>
          </button>
        </div>
        {/* Section 3: Contacts  */}
        <div className="pt-1 mb-2">
          <div style={{ borderTop: "1px solid var(--border-subtle)", margin: "8px 0" }} />
          <p
            className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest block truncate transition-opacity duration-200"
            style={{ color: "var(--tx-muted)", opacity: effectiveCollapsed ? 0 : 1 }}
          >
            {effectiveCollapsed ? "•" : "Contacts"}
          </p>

          <button
            onClick={() => router.push("/admin/admin-contacts")}
            className={getLinkStyles("/admin/admin-contacts")}
            title={effectiveCollapsed ? "Contacts" : undefined}
          >
            <Mail className="h-4 w-4 shrink-0" />
            <span className="truncate transition-opacity" style={{ opacity: effectiveCollapsed ? 0 : 1 }}>
              Contacts ({contactsCount})
            </span>
          </button>
        </div>

        {/* Section 4: Configuration */}
        <div className="hidden pt-1">
          <div style={{ borderTop: "1px solid var(--border-subtle)", margin: "8px 0" }} />
          <p
            className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest block truncate transition-opacity duration-200"
            style={{ color: "var(--tx-muted)", opacity: effectiveCollapsed ? 0 : 1 }}
          >
            {effectiveCollapsed ? "•" : "Configuration"}
          </p>

          <button
            onClick={() => router.push("/admin/settings")}
            className={getLinkStyles("/admin/settings")}
            title={effectiveCollapsed ? "Control Settings" : undefined}
          >
            <Settings className="h-4 w-4 shrink-0" />
            <span className="truncate transition-opacity" style={{ opacity: effectiveCollapsed ? 0 : 1 }}>
              Control Settings
            </span>
          </button>
        </div>
      </div>

      {/* ── User Footer Panel ── */}
      <div
        className="shrink-0 p-3 flex flex-col gap-1.5"
        style={{
          borderTop: "1px solid var(--border-subtle)",
          backgroundColor: effectiveCollapsed ? "transparent" : "rgba(15, 23, 42, 0.01)"
        }}
      >
        {/* User identification block */}
        <div
          className="flex items-center gap-3 p-2 rounded-xl transition-all duration-200"
          style={{
            backgroundColor: effectiveCollapsed ? "transparent" : "var(--bg-subtle)",
            justifyContent: effectiveCollapsed ? "center" : "flex-start"
          }}
          title={effectiveCollapsed ? `${username} (${email})` : undefined}
        >
          {/* Circular Initials Avatar Badge */}
          <div
            className="shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs font-bold leading-none shadow-sm"
            style={{ backgroundColor: "var(--clr-green)" }}
          >
            {initials}
          </div>

          {/* Name + email text container */}
          <div
            className="flex flex-col min-w-0"
            style={{
              opacity: effectiveCollapsed ? 0 : 1,
              maxWidth: effectiveCollapsed ? 0 : "180px",
              transition: "opacity 0.15s ease, max-width 0.2s ease"
            }}
          >
            <span
              className="text-xs font-bold leading-none truncate"
              style={{ color: "var(--tx-primary)" }}
            >
              {username}
            </span>
            <span
              className="text-[10px] font-medium leading-none truncate mt-1"
              style={{ color: "var(--tx-secondary)" }}
            >
              {email}
            </span>
          </div>
        </div>

        {/* Action button: Sign out */}
        <button
          onClick={handleSignOut}
          disabled={isSigningOut}
          title={effectiveCollapsed ? "Sign Out" : undefined}
          className={[
            "w-full flex items-center gap-3 rounded-lg transition-all duration-200 text-xs font-semibold border border-transparent",
            effectiveCollapsed ? "h-9 justify-center" : "px-3 h-9",
            isSigningOut
              ? "opacity-40 cursor-not-allowed"
              : "hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/20",
          ].join(" ")}
          style={{
            color: isSigningOut ? "var(--tx-muted)" : "var(--tx-secondary)"
          }}
        >
          <span className="shrink-0">
            {isSigningOut ? (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="animate-spin">
                <path d="M21 12a9 9 0 1 1-6.219-8.56" />
              </svg>
            ) : (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1="21" y1="12" x2="9" y2="12" />
              </svg>
            )}
          </span>

          <span
            className="whitespace-nowrap overflow-hidden text-left"
            style={{
              opacity: effectiveCollapsed ? 0 : 1,
              maxWidth: effectiveCollapsed ? 0 : "180px",
              transition: "opacity 0.15s ease, max-width 0.2s ease",
            }}
          >
            {isSigningOut ? "Signing out…" : "Sign Out"}
          </span>
        </button>
      </div>
    </aside>
  );
}