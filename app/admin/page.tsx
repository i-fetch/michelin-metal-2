// app/admin/page.tsx

"use client";

import { useSession, signOut } from "next-auth/react";
import {
  ShieldCheck,
  Users,
  Activity,
  LogOut,
} from "lucide-react";

export default function AdminPage() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div
      className="min-h-screen p-8"
      style={{
        background:
          "linear-gradient(145deg,#0a1628 0%,#0d2010 50%,#061a0a 100%)",
      }}
    >
      {/* Header */}

      <div className="flex justify-between items-center mb-10">
        <div>
          <p className="text-green-500 uppercase tracking-[0.2em] text-xs font-bold">
            Admin Dashboard
          </p>

          <h1 className="text-4xl font-black text-white mt-2">
            Welcome Back,
            <span className="text-green-500">
              {" "}
              {session?.user?.name}
            </span>
          </h1>

          <p className="text-white/50 mt-2">
            Manage your application.
          </p>
        </div>

        <button
          onClick={() =>
            signOut({
              callbackUrl: "/signin",
            })
          }
          className="flex items-center gap-2 bg-green-500 text-black px-5 py-3 rounded-xl font-semibold"
        >
          <LogOut size={16} />
          Logout
        </button>
      </div>

      {/* Cards */}

      <div className="grid md:grid-cols-3 gap-5">
        <Card
          title="Users"
          value="150"
          icon={<Users size={22} />}
        />

        <Card
          title="Admins"
          value="3"
          icon={<ShieldCheck size={22} />}
        />

        <Card
          title="Activity"
          value="98%"
          icon={<Activity size={22} />}
        />
      </div>

      {/* Account */}

      <div
        className="mt-8 p-6 rounded-3xl"
        style={{
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(34,197,94,0.15)",
        }}
      >
        <h2 className="text-white text-xl font-bold mb-5">
          Account Information
        </h2>

        <div className="space-y-4">
          <Info
            label="Username"
            value={session?.user?.name || ""}
          />

          <Info
            label="Email"
            value={session?.user?.email || ""}
          />

          <Info
            label="Role"
            value={session?.user?.role || ""}
          />
        </div>
      </div>
    </div>
  );
}

function Card({
  title,
  value,
  icon,
}: {
  title: string;
  value: string;
  icon: React.ReactNode;
}) {
  return (
    <div
      className="p-6 rounded-3xl"
      style={{
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(34,197,94,0.15)",
      }}
    >
      <div className="text-green-500 mb-4">
        {icon}
      </div>

      <p className="text-white/50 text-sm">
        {title}
      </p>

      <h3 className="text-white text-3xl font-black mt-1">
        {value}
      </h3>
    </div>
  );
}

function Info({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div>
      <p className="text-white/40 text-xs uppercase tracking-widest">
        {label}
      </p>

      <p className="text-white font-medium">
        {value}
      </p>
    </div>
  );
}