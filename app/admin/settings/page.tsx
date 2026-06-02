"use client"

import { useState } from "react"
import { User, Bell, Globe, Shield, Palette, ChevronRight } from "lucide-react"
import AdminLayout from "../components/AdminLayout"
import Toggle from "../components/custom-ui/Toggle"

const SETTING_SECTIONS = [
  {
    id: "profile",
    icon: User,
    iconBg: "#dcfce7",
    iconColor: "#16a34a",
    title: "Profile",
    description: "Update your name, email, and account details",
  },
  {
    id: "notifications",
    icon: Bell,
    iconBg: "#fef9c3",
    iconColor: "#ca8a04",
    title: "Notifications",
    description: "Configure email alerts for new inquiries and activity",
  },
  {
    id: "storefront",
    icon: Globe,
    iconBg: "#dbeafe",
    iconColor: "#2563eb",
    title: "Storefront",
    description: "Manage public listing appearance and branding",
  },
  {
    id: "security",
    icon: Shield,
    iconBg: "#fee2e2",
    iconColor: "#dc2626",
    title: "Security",
    description: "Password, two-factor authentication, and sessions",
  },
  {
    id: "appearance",
    icon: Palette,
    iconBg: "#f3e8ff",
    iconColor: "#7c3aed",
    title: "Appearance",
    description: "Theme, density, and display preferences",
  },
]

export default function SettingsPage() {
  const [notifInquiry, setNotifInquiry] = useState(true)
  const [notifProduct, setNotifProduct] = useState(false)
  const [showPricesDefault, setShowPricesDefault] = useState(true)

  return (
    <AdminLayout breadcrumbs={[{ label: "Admin", href: "/admin" }, { label: "Settings" }]}>
      <div className="mb-6">
        <h1 className="text-[20px] font-semibold text-gray-900 tracking-tight">Settings</h1>
        <p className="text-[13px] text-gray-500 mt-0.5">Manage your account and preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-5">
        <div className="space-y-4">
          {/* Profile section */}
          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
            <div className="p-5 border-b border-gray-100">
              <h2 className="text-[14px] font-semibold text-gray-900 flex items-center gap-2">
                <User className="w-4 h-4 text-green-700" />
                Profile
              </h2>
            </div>
            <div className="p-5 space-y-3">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center text-[18px] font-bold text-white">
                  JD
                </div>
                <div>
                  <div className="text-[14px] font-medium text-gray-900">John Doe</div>
                  <div className="text-[12.5px] text-gray-400">Administrator</div>
                  <button className="text-[12px] text-green-700 font-medium hover:underline mt-0.5">Change photo</button>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[12.5px] font-medium text-gray-700 mb-1">First Name</label>
                  <input defaultValue="John" className="form-input" />
                </div>
                <div>
                  <label className="block text-[12.5px] font-medium text-gray-700 mb-1">Last Name</label>
                  <input defaultValue="Doe" className="form-input" />
                </div>
                <div className="col-span-2">
                  <label className="block text-[12.5px] font-medium text-gray-700 mb-1">Email Address</label>
                  <input defaultValue="john@scrapadmin.com" type="email" className="form-input" />
                </div>
              </div>
              <div className="pt-2">
                <button className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-[13px] font-medium rounded-lg transition-colors">
                  Save Changes
                </button>
              </div>
            </div>
          </div>

          {/* Notifications */}
          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
            <div className="p-5 border-b border-gray-100">
              <h2 className="text-[14px] font-semibold text-gray-900 flex items-center gap-2">
                <Bell className="w-4 h-4 text-green-700" />
                Notifications
              </h2>
            </div>
            <div className="p-5 space-y-3">
              {[
                {
                  title: "New Inquiry Alerts",
                  desc: "Get emailed when a visitor submits a quote request",
                  checked: notifInquiry,
                  onChange: setNotifInquiry,
                },
                {
                  title: "Product Activity",
                  desc: "Notifications for product status changes and updates",
                  checked: notifProduct,
                  onChange: setNotifProduct,
                },
              ].map((item) => (
                <div key={item.title} className="flex items-center justify-between p-3 bg-gray-50 border border-gray-200 rounded-xl">
                  <div>
                    <div className="text-[13px] font-medium text-gray-800">{item.title}</div>
                    <div className="text-[11.5px] text-gray-400 mt-0.5">{item.desc}</div>
                  </div>
                  <Toggle checked={item.checked} onChange={item.onChange} />
                </div>
              ))}
            </div>
          </div>

          {/* Storefront defaults */}
          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
            <div className="p-5 border-b border-gray-100">
              <h2 className="text-[14px] font-semibold text-gray-900 flex items-center gap-2">
                <Globe className="w-4 h-4 text-green-700" />
                Storefront Defaults
              </h2>
            </div>
            <div className="p-5 space-y-3">
              <div className="flex items-center justify-between p-3 bg-gray-50 border border-gray-200 rounded-xl">
                <div>
                  <div className="text-[13px] font-medium text-gray-800">Show Prices by Default</div>
                  <div className="text-[11.5px] text-gray-400 mt-0.5">New products will have price display enabled by default</div>
                </div>
                <Toggle checked={showPricesDefault} onChange={setShowPricesDefault} />
              </div>
              <div>
                <label className="block text-[12.5px] font-medium text-gray-700 mb-1">Company Name</label>
                <input defaultValue="ScrapCo Industrial" className="form-input" />
              </div>
              <div>
                <label className="block text-[12.5px] font-medium text-gray-700 mb-1">Contact Email (shown to visitors)</label>
                <input defaultValue="sales@scrapco.com" type="email" className="form-input" />
              </div>
              <div className="pt-2">
                <button className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-[13px] font-medium rounded-lg transition-colors">
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Quick links */}
        <div className="space-y-4">
          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
            <div className="p-4 border-b border-gray-100">
              <h3 className="text-[13.5px] font-semibold text-gray-900">Quick Links</h3>
            </div>
            <div className="divide-y divide-gray-100">
              {SETTING_SECTIONS.map((section) => (
                <button
                  key={section.id}
                  className="w-full flex items-center gap-3 p-3.5 hover:bg-gray-50 transition-colors text-left"
                >
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: section.iconBg }}>
                    <section.icon className="w-4 h-4" style={{ color: section.iconColor }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[13px] font-medium text-gray-800">{section.title}</div>
                    <div className="text-[11.5px] text-gray-400 truncate">{section.description}</div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-300 flex-shrink-0" />
                </button>
              ))}
            </div>
          </div>

          {/* Danger zone */}
          <div className="bg-white border border-red-100 rounded-xl overflow-hidden">
            <div className="p-4 border-b border-red-100">
              <h3 className="text-[13.5px] font-semibold text-red-700">Danger Zone</h3>
            </div>
            <div className="p-4 space-y-2.5">
              <p className="text-[12.5px] text-gray-500 leading-relaxed">
                Permanent actions that cannot be undone. Proceed with caution.
              </p>
              <button className="w-full px-3 py-2 border border-red-200 bg-red-50 text-red-700 text-[13px] font-medium rounded-lg hover:bg-red-100 transition-colors">
                Delete All Draft Products
              </button>
              <button className="w-full px-3 py-2 border border-red-200 bg-red-50 text-red-700 text-[13px] font-medium rounded-lg hover:bg-red-100 transition-colors">
                Reset Catalogue
              </button>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
