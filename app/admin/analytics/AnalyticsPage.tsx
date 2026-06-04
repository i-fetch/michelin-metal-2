"use client";

import { useEffect, useState } from "react";

export default function AnalyticsPage() {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalUsers: 0,
    totalOrders: 0,
    revenue: 0,
  });

  useEffect(() => {
    // TODO: Fetch analytics data from your API
    // For now, setting placeholder data
    setStats({
      totalProducts: 1250,
      totalUsers: 3847,
      totalOrders: 562,
      revenue: 45680,
    });
  }, []);

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="p-6 md:p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl tracking-wider font-bold text-[var(--tx-primary)]">
            Analytics Dashboard
          </h1>
          <p className="text-[var(--tx-secondary)] mt-2">
            Track your marketplace performance and key metrics
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total Products Card */}
          <div
            className="rounded-lg p-6 shadow-sm border"
            style={{
              backgroundColor: "var(--bg-surface)",
              borderColor: "var(--border-subtle)",
            }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[var(--tx-secondary)] mb-2">
                  Total Products
                </p>
                <p className="text-3xl font-bold text-[var(--tx-primary)]">
                  {stats.totalProducts.toLocaleString()}
                </p>
              </div>
              <div
                className="w-12 h-12 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: "var(--clr-green-alpha)" }}
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="var(--clr-green)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <path d="M16 10a4 4 0 0 1-8 0" />
                </svg>
              </div>
            </div>
          </div>

          {/* Total Users Card */}
          <div
            className="rounded-lg p-6 shadow-sm border"
            style={{
              backgroundColor: "var(--bg-surface)",
              borderColor: "var(--border-subtle)",
            }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[var(--tx-secondary)] mb-2">
                  Total Users
                </p>
                <p className="text-3xl font-bold text-[var(--tx-primary)]">
                  {stats.totalUsers.toLocaleString()}
                </p>
              </div>
              <div
                className="w-12 h-12 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: "rgba(59, 130, 246, 0.1)" }}
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="rgb(59, 130, 246)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </div>
            </div>
          </div>

          {/* Total Orders Card */}
          <div
            className="rounded-lg p-6 shadow-sm border"
            style={{
              backgroundColor: "var(--bg-surface)",
              borderColor: "var(--border-subtle)",
            }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[var(--tx-secondary)] mb-2">
                  Total Orders
                </p>
                <p className="text-3xl font-bold text-[var(--tx-primary)]">
                  {stats.totalOrders.toLocaleString()}
                </p>
              </div>
              <div
                className="w-12 h-12 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: "rgba(168, 85, 247, 0.1)" }}
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="rgb(168, 85, 247)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="9" cy="21" r="1" />
                  <circle cx="20" cy="21" r="1" />
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                </svg>
              </div>
            </div>
          </div>

          {/* Total Revenue Card */}
          <div
            className="rounded-lg p-6 shadow-sm border"
            style={{
              backgroundColor: "var(--bg-surface)",
              borderColor: "var(--border-subtle)",
            }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[var(--tx-secondary)] mb-2">
                  Total Revenue
                </p>
                <p className="text-3xl font-bold text-[var(--tx-primary)]">
                  ${stats.revenue.toLocaleString()}
                </p>
              </div>
              <div
                className="w-12 h-12 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: "rgba(59, 130, 246, 0.1)" }}
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="rgb(59, 130, 246)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="12" y1="1" x2="12" y2="23" />
                  <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Placeholder for Charts Section */}
        <div
          className="rounded-lg p-6 shadow-sm border"
          style={{
            backgroundColor: "var(--bg-surface)",
            borderColor: "var(--border-subtle)",
          }}
        >
          <h2 className="text-lg font-semibold text-[var(--tx-primary)] mb-4">
            Sales Over Time
          </h2>
          <div
            className="h-64 rounded-lg flex items-center justify-center"
            style={{ backgroundColor: "var(--bg-subtle)" }}
          >
            <p className="text-[var(--tx-secondary)]">
              📊 Chart visualization coming soon...
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
