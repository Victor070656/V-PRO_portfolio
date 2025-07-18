"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FolderKanban,
  Settings,
  LogOut,
  User,
  Home,
} from "lucide-react";
import { signOut } from "next-auth/react";

const sidebarItems = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Projects", href: "/admin/projects", icon: FolderKanban },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex flex-col w-64 admin-sidebar">
      {/* Logo Section */}
      <div className="flex items-center justify-center h-20 border-b border-[var(--border-color)]">
        <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <div className="w-8 h-8 bg-[var(--accent-color)] rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">V</span>
          </div>
          <div className="text-left">
            <h1 className="text-lg font-bold text-[var(--text-primary)]">V-PRO</h1>
            <p className="text-xs text-[var(--text-secondary)]">Admin Panel</p>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {sidebarItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group ${
                isActive
                  ? "bg-[var(--accent-color)] text-white shadow-md"
                  : "text-[var(--text-secondary)] hover:bg-[var(--hover-color)] hover:text-[var(--text-primary)]"
              }`}
            >
              <item.icon className={`w-5 h-5 ${isActive ? "text-white" : "text-[var(--text-secondary)] group-hover:text-[var(--text-primary)]"}`} />
              <span className="font-medium">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Quick Actions */}
      <div className="px-4 py-4 border-t border-[var(--border-color)]">
        <div className="space-y-2">
          <Link
            href="/"
            className="flex items-center gap-3 px-4 py-2 rounded-lg text-[var(--text-secondary)] hover:bg-[var(--hover-color)] hover:text-[var(--text-primary)] transition-colors text-sm"
          >
            <Home className="w-4 h-4" />
            <span>View Site</span>
          </Link>
          <Link
            href="/admin/settings"
            className="flex items-center gap-3 px-4 py-2 rounded-lg text-[var(--text-secondary)] hover:bg-[var(--hover-color)] hover:text-[var(--text-primary)] transition-colors text-sm"
          >
            <Settings className="w-4 h-4" />
            <span>Settings</span>
          </Link>
        </div>
      </div>

      {/* User Section */}
      <div className="px-4 py-4 border-t border-[var(--border-color)]">
        <div className="flex items-center gap-3 px-4 py-3 rounded-lg bg-[var(--secondary-color)] mb-3">
          <div className="w-8 h-8 bg-[var(--accent-color)] rounded-full flex items-center justify-center">
            <User className="w-4 h-4 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-medium text-sm text-[var(--text-primary)] truncate">Victor Ikechukwu</p>
            <p className="text-xs text-[var(--text-secondary)]">Administrator</p>
          </div>
        </div>
        <button
          onClick={() => signOut()}
          className="w-full flex items-center gap-3 px-4 py-2 rounded-lg text-[var(--text-secondary)] hover:bg-red-50 hover:text-red-600 transition-colors text-sm"
        >
          <LogOut className="w-4 h-4" />
          <span className="font-medium">Sign Out</span>
        </button>
      </div>
    </aside>
  );
}