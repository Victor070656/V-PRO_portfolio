// app/admin/layout.tsx
import type { Metadata } from "next";
import Sidebar from "@/components/admin/Sidebar";
import AdminAuthGuard from "./AdminAuthGuard";

export const metadata: Metadata = {
  title: "Admin Dashboard | V-PRO",
  description: "Admin dashboard for V-PRO services.",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-[var(--secondary-color)] text-[var(--text-primary)] min-h-screen flex">
      <AdminAuthGuard>
        <Sidebar />
      </AdminAuthGuard>
      <div className="flex-1 flex flex-col overflow-hidden">{children}</div>
    </div>
  );
}
