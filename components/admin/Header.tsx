"use client";

import { Search, Bell, Menu } from "lucide-react";
import Image from "next/image";

export default function Header() {
  return (
    <header className="flex items-center justify-between h-20 px-8 bg-[var(--background-color)] border-b border-[var(--secondary-color)]">
      <div className="flex items-center gap-4">
        <button className="md:hidden text-[var(--text-secondary)]">
          <Menu className="w-6 h-6" />
        </button>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--text-secondary)]" />
          <input
            type="text"
            placeholder="Search..."
            className="w-full md:w-64 bg-[var(--secondary-color)] border border-transparent focus:border-[var(--primary-color)] rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none transition-colors"
          />
        </div>
      </div>
      <div className="flex items-center gap-6">
        <button className="relative text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
          <Bell className="w-6 h-6" />
          <span className="absolute -top-1 -right-1 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--primary-color)] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-[var(--primary-color)]"></span>
          </span>
        </button>
        <div className="flex items-center gap-3">
          <Image src="/vic.jpg" alt="User Avatar" width={40} height={40} className="rounded-full object-cover" />
          <div className="hidden md:block">
            <p className="font-semibold text-sm">Victor Ikechukwu</p>
            <p className="text-xs text-[var(--text-secondary)]">Administrator</p>
          </div>
        </div>
      </div>
    </header>
  );
}