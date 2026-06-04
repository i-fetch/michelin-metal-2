"use client";

interface TopbarProps {
  collapsed: boolean;
  onToggleCollapse: () => void;
  onToggleMobile: () => void;
}

// Hamburger / sidebar-toggle icon
function PanelIcon({ collapsed }: { collapsed: boolean }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      {collapsed ? (
        // "expand" chevrons
        <>
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <path d="M9 3v18" />
          <path d="M14 9l3 3-3 3" />
        </>
      ) : (
        // "collapse" panel icon
        <>
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <path d="M9 3v18" />
          <path d="M15 9l-3 3 3 3" />
        </>
      )}
    </svg>
  );
}

export default function Topbar({ collapsed, onToggleCollapse, onToggleMobile }: TopbarProps) {
  return (
    <header
      className="w-full flex items-center justify-between px-4 md:px-6 shrink-0"
      style={{
        height: "64px",
        backgroundColor: "var(--bg-surface)",
        borderBottom: "1px solid var(--border-subtle)",
      }}
    >
      {/* Left: toggle buttons */}
      <div className="flex items-center gap-2">
        {/* Desktop collapse toggle */}
        <button
          onClick={onToggleCollapse}
          className="hidden md:flex w-8 h-8 items-center justify-center rounded-lg transition-colors text-[var(--tx-secondary)] hover:bg-[var(--bg-subtle)] hover:text-[var(--tx-primary)]"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          <PanelIcon collapsed={collapsed} />
        </button>

        {/* Mobile hamburger */}
        <button
          onClick={onToggleMobile}
          className="flex md:hidden w-8 h-8 items-center justify-center rounded-lg transition-colors text-[var(--tx-secondary)] hover:bg-[var(--bg-subtle)] hover:text-[var(--tx-primary)]"
          aria-label="Open navigation"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="3" y1="6" x2="21" y2="6"/>
            <line x1="3" y1="12" x2="21" y2="12"/>
            <line x1="3" y1="18" x2="21" y2="18"/>
          </svg>
        </button>
      </div>

      {/* Right: status + avatar */}
      <div className="flex items-center gap-4">
        <div className="hidden sm:block text-xs text-[var(--tx-muted)] font-medium">
          System Status:{" "}
          <span className="text-[var(--clr-green)] font-semibold">Live</span>
        </div>

        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-[var(--clr-green)] text-white text-xs font-bold flex items-center justify-center shrink-0">
            A
          </div>
          <span className="hidden sm:block text-sm font-semibold text-[var(--tx-primary)]">
            Admin Panel
          </span>
        </div>
      </div>
    </header>
  );
}