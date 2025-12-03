"use client";

import { Search, Bell, Menu, Sun, Moon, LogOut } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { useSession, signOut } from "next-auth/react";

export default function Header() {
  const { data: session } = useSession();
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark");
  };

  const handleSignOut = () => {
    signOut({ callbackUrl: "/" });
  };

  return (
    <header className="flex items-center justify-between h-20 px-8 admin-header">
      <div className="flex items-center gap-4">
        <button className="md:hidden text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
          <Menu className="w-6 h-6" />
        </button>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--text-secondary)]" />
          <input
            type="text"
            placeholder="Search projects..."
            className="w-full md:w-80 admin-input rounded-lg pl-10 pr-4 py-2.5 text-sm focus:outline-none transition-all duration-200"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        {/* Dark Mode Toggle */}
        <button
          onClick={toggleDarkMode}
          className="relative p-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--hover-color)] rounded-lg transition-colors"
          title="Toggle dark mode"
        >
          {isDarkMode ? (
            <Sun className="w-5 h-5" />
          ) : (
            <Moon className="w-5 h-5" />
          )}
        </button>

        {/* Notifications */}

        {/* User Profile */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-3 px-3 py-2 rounded-lg admin-card">
            <div className="relative">
              <Image
                src="/vic.jpg"
                alt={session?.user?.name || "Admin User"}
                width={36}
                height={36}
                className="rounded-full object-cover border-2 border-[var(--border-color)]"
              />
              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-[var(--card-background)]"></div>
            </div>
            <div className="hidden md:block">
              <p className="font-semibold text-sm text-[var(--text-primary)]">
                {session?.user?.name || session?.user?.email?.split("@")[0] || "Admin User"}
              </p>
              <p className="text-xs text-[var(--text-secondary)]">
                {session?.user?.role === "admin" ? "Administrator" : session?.user?.role || "User"}
              </p>
            </div>
          </div>

          {/* Sign Out Button */}
          <button
            onClick={handleSignOut}
            className="p-2 text-[var(--text-secondary)] hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
            title="Sign out"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  );
}
