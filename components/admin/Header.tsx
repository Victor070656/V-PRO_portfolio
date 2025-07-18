"use client";

import { Search, Bell, Menu, Sun, Moon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export default function Header() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
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
        <button className="relative p-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--hover-color)] rounded-lg transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--accent-color)] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-[var(--accent-color)] items-center justify-center">
              <span className="text-white text-xs font-bold">3</span>
            </span>
          </span>
        </button>

        {/* User Profile */}
        <div className="flex items-center gap-3 px-3 py-2 rounded-lg admin-card">
          <div className="relative">
            <Image 
              src="/vic.jpg" 
              alt="Victor Ikechukwu" 
              width={36} 
              height={36} 
              className="rounded-full object-cover border-2 border-[var(--border-color)]"
            />
            <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-[var(--card-background)]"></div>
          </div>
          <div className="hidden md:block">
            <p className="font-semibold text-sm text-[var(--text-primary)]">Victor Ikechukwu</p>
            <p className="text-xs text-[var(--text-secondary)]">Administrator</p>
          </div>
        </div>
      </div>
    </header>
  );
}