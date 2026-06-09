"use client";

import { useEffect, useState } from "react";
import { AlertTriangle } from "lucide-react";
import { toast } from "sonner";

const DEFAULT_ADMIN_SETTINGS = {
  corporationName: "Mechelin Metals Group",
  supportEmail: "support@mechelinmetal.com",
  headquarters: "Global Industrial Campus, Rotterdam",
  purityAlertThreshold: 98.5,
  autoArchiveReviewedInquiries: false,
};

type AdminSettings = typeof DEFAULT_ADMIN_SETTINGS;

export default function SettingsPage() {
  const [adminSettings, setAdminSettings] = useState<AdminSettings>(DEFAULT_ADMIN_SETTINGS);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = window.localStorage.getItem("mechelinAdminSettings");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setAdminSettings((prev) => ({ ...prev, ...parsed }));
      } catch {
        // ignore invalid values
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem("mechelinAdminSettings", JSON.stringify(adminSettings));
  }, [adminSettings]);

  const handleResetDatabase = () => {
    setAdminSettings(DEFAULT_ADMIN_SETTINGS);
    if (typeof window !== "undefined") {
      window.localStorage.removeItem("mechelinAdminSettings");
    }
    toast.success("Admin settings restored to default mock values.");
  };

  return (
    <div className="space-y-6 text-left" id="subview-admin-settings">
      <div>
        <h2 className="text-bebas text-3xl text-tx-primary tracking-wide">Mechelin Administrative Configuration</h2>
        <p className="text-xs text-tx-secondary">Tune simulation thresholds, corporation information headers, and chemical alert filters.</p>
      </div>

      <div className="bg-white rounded-xl border border-border-subtle p-6 space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-tx-secondary mb-1">Corporation Name</label>
            <input
              type="text"
              value={adminSettings.corporationName}
              onChange={(e) => setAdminSettings((prev) => ({ ...prev, corporationName: e.target.value }))}
              className="w-full rounded-lg border border-gray-200 px-3 py-2 text-xs focus:border-green-brand outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-tx-secondary mb-1">Corporate Support Line Email</label>
            <input
              type="email"
              value={adminSettings.supportEmail}
              onChange={(e) => setAdminSettings((prev) => ({ ...prev, supportEmail: e.target.value }))}
              className="w-full rounded-lg border border-gray-200 px-3 py-2 text-xs focus:border-green-brand outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-tx-secondary mb-1">Headquarters Campus Landmark</label>
            <input
              type="text"
              value={adminSettings.headquarters}
              onChange={(e) => setAdminSettings((prev) => ({ ...prev, headquarters: e.target.value }))}
              className="w-full rounded-lg border border-gray-200 px-3 py-2 text-xs focus:border-green-brand outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-tx-secondary mb-1">Alert Highlight Purity Cutoff (%)</label>
            <input
              type="number"
              step={0.1}
              value={adminSettings.purityAlertThreshold}
              onChange={(e) => setAdminSettings((prev) => ({ ...prev, purityAlertThreshold: Number(e.target.value) }))}
              className="w-full rounded-lg border border-gray-200 px-3 py-2 text-xs focus:border-green-brand outline-none font-mono-custom"
            />
          </div>
        </div>

        <div className="flex items-center space-x-2 pt-2 border-t text-xs">
          <input
            type="checkbox"
            id="auto-archive-cb"
            checked={adminSettings.autoArchiveReviewedInquiries}
            onChange={(e) => setAdminSettings((prev) => ({ ...prev, autoArchiveReviewedInquiries: e.target.checked }))}
            className="h-4 w-4 rounded text-green-brand focus:ring-green-brand"
          />
          <label htmlFor="auto-archive-cb" className="text-tx-secondary">
            Auto-archive trade requests once clicked "Mark Reviewed"
          </label>
        </div>

        <div className="border-t border-red-100 pt-6 space-y-3 bg-red-50/50 p-4 rounded-lg border">
          <div className="flex items-center space-x-2">
            <AlertTriangle className="h-5 w-5 text-red-600" />
            <h4 className="font-bebas text-sm uppercase tracking-wider text-red-900 leading-none">Database Purge & Reset</h4>
          </div>
          <p className="text-[11px] text-red-800 leading-relaxed">
            Wiping database local state will immediately discard all custom products, custom modifications, image carousels, and RFQ inquiry streams, restoring factory original defaults. This is irreversible inside the local storage cache.
          </p>
          <button
            type="button"
            onClick={handleResetDatabase}
            className="cursor-pointer px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded text-xs font-semibold uppercase tracking-wider transition-colors inline-block text-left"
          >
            Wipe & Restock Original Mechelin Mockdata
          </button>
        </div>
      </div>
    </div>
  );
}
