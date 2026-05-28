import type { ReactNode } from "react";
import Sidebar from "./admin-components/Sidebar";
import { auth } from "@/auth";

export default async function AdminLayout({
    children,
}: {
    children: ReactNode;
}) {
    const session = await auth();
    return (
        <div className="min-h-screen bg-slate-50 flex">

            {/* Sidebar */}
            <Sidebar
                user={{
                    name: session?.user?.name,
                    email: session?.user?.email,
                    role: session?.user?.role,
                }}
            />

            {/* Main */}
            <div className="flex-1 flex flex-col min-w-0">
                {/* <Topbar /> */}
                {/* Page Content */}
                <main className="flex-1 p-5 md:p-8 overflow-x-hidden">
                    {children}
                </main>
            </div>
        </div>
    );
}