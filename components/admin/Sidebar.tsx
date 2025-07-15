"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FolderKanban,
  BarChart3,
  Users,
  Settings,
  LogOut,
} from "lucide-react";

const sidebarItems = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Projects", href: "/admin/projects", icon: FolderKanban },
  { name: "Analytics", href: "/admin/analytics", icon: BarChart3 },
  { name: "Users", href: "/admin/users", icon: Users },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex flex-col w-64 bg-[var(--background-color)] border-r border-[var(--secondary-color)]">
      <div className="flex items-center justify-center h-20 border-b border-[var(--secondary-color)]">
        <Link href="/" className="flex items-center gap-2">
          <svg className="w-8 h-8 text-[var(--primary-color)]" fill="currentColor" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 4H17.3334V17.3334H30.6666V30.6666H44V44H4V4Z" />
          </svg>
          <h1 className="text-xl font-bold">V-PRO Admin</h1>
        </Link>
      </div>
      <nav className="flex-1 px-4 py-6 space-y-2">
        {sidebarItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link key={item.name} href={item.href} className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${ isActive ? "bg-[var(--primary-color)] text-white" : "text-[var(--text-secondary)] hover:bg-[var(--secondary-color)] hover:text-[var(--text-primary)]"}`}>
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.name}</span>
            </Link>
          );
        })}
      </nav>
      <div className="px-4 py-6 border-t border-[var(--secondary-color)]">
        <Link href="/admin/settings" className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${ pathname === "/admin/settings" ? "bg-[var(--primary-color)] text-white" : "text-[var(--text-secondary)] hover:bg-[var(--secondary-color)] hover:text-[var(--text-primary)]"}`}>
          <Settings className="w-5 h-5" />
          <span className="font-medium">Settings</span>
        </Link>
        <button className="w-full flex items-center gap-3 px-4 py-3 mt-2 rounded-lg text-[var(--text-secondary)] hover:bg-red-500/10 hover:text-red-500 transition-colors">
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </aside>
  );
}