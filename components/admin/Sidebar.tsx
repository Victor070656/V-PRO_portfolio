"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import {
  BookOpen,
  CreditCard,
  FileText,
  FolderKanban,
  GraduationCap,
  Home,
  LayoutDashboard,
  LogOut,
  Menu,
  Settings,
  Users,
  X,
} from "lucide-react";
import { signOut } from "next-auth/react";
import { useEffect, useState } from "react";

const sidebarItems = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Courses", href: "/admin/courses", icon: BookOpen },
  { name: "Students", href: "/admin/students", icon: Users },
  { name: "Enrollments", href: "/admin/enrollments", icon: GraduationCap },
  { name: "Payments", href: "/admin/payments", icon: CreditCard },
  { name: "Progress", href: "/admin/progress", icon: FileText },
  { name: "Projects", href: "/admin/projects", icon: FolderKanban },
  { name: "Settings", href: "/admin/settings", icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  const SidebarContent = () => (
    <>
      <div className="flex items-center justify-between border-b border-border px-4 py-4">
        <Link href="/" className="flex items-center gap-2">
          <span className="arch-kicker">V-PRO</span>
          <span className="text-sm font-semibold">Admin</span>
        </Link>
        <button
          onClick={() => setIsMobileMenuOpen(false)}
          className="md:hidden rounded border border-border p-2"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <nav className="flex-1 space-y-1 px-3 py-4 overflow-y-auto">
        {sidebarItems.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href !== "/admin" && pathname.startsWith(item.href));
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 rounded px-3 py-2 text-sm transition-colors ${
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground"
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-border p-3 space-y-2">
        <Link href="/" className="arch-button-secondary w-full !py-2">
          <Home className="w-4 h-4" />
          View Site
        </Link>
        {session ? (
          <button onClick={() => signOut({ callbackUrl: "/" })} className="arch-button-secondary w-full !py-2">
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        ) : null}
      </div>
    </>
  );

  return (
    <>
      <button
        onClick={() => setIsMobileMenuOpen(true)}
        className="md:hidden fixed top-4 left-4 z-40 rounded border border-border bg-card p-2"
      >
        <Menu className="w-5 h-5" />
      </button>

      {isMobileMenuOpen ? (
        <div className="md:hidden fixed inset-0 bg-black/40 z-40" onClick={() => setIsMobileMenuOpen(false)} />
      ) : null}

      <aside className="hidden md:flex w-64 flex-col border-r border-border bg-card">
        <SidebarContent />
      </aside>

      <aside
        className={`md:hidden fixed top-0 left-0 bottom-0 w-64 z-50 flex flex-col border-r border-border bg-card transition-transform ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <SidebarContent />
      </aside>
    </>
  );
}
