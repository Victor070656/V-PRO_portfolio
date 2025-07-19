"use client";

import {
  Hamburger,
  LogIn,
  LogOut,
  MenuIcon,
  MoonIcon,
  SunIcon,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";

export default function Navbar() {
  const { data: session } = useSession();
  const [isDark, setIsDark] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const toggleDarkMode = () => {
    document.documentElement.classList.toggle("dark");
    setIsDark(!isDark);
  };
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-gray-200 dark:border-gray-700 px-10 py-4 shadow-sm">
        <Link href={"/"} className="flex items-center gap-4">
          <div className="size-6 text-[var(--primary-color)]">
            <Image
              src={"/logo.png"}
              alt=""
              width={50}
              height={50}
              className="rounded-lg"
            />
          </div>
          <h2 className="text-[var(--text-primary)] text-xl font-bold leading-tight tracking-[-0.015em]">
            V-PRO Services
          </h2>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          <Link
            className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] text-sm font-medium"
            href="/about"
          >
            About
          </Link>
          <Link
            className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] text-sm font-medium"
            href="/projects"
          >
            Projects
          </Link>
          <Link
            className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] text-sm font-medium"
            href="/contact"
          >
            Contact
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <button
            onClick={toggleDarkMode}
            className="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 bg-[var(--secondary-color)] text-[var(--text-primary)] gap-2 text-sm font-bold px-2.5"
          >
            <div className="text-[var(--text-primary)]">
              {isDark ? <SunIcon /> : <MoonIcon />}
            </div>
          </button>

          <Link className="button_primary hidden sm:flex" href="/contact">
            Hire Me
          </Link>
          <button
            onClick={toggleMenu}
            className="flex md:hidden max-w-[480px]  cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 bg-[var(--secondary-color)] text-[var(--text-primary)] gap-2 text-sm font-bold px-2.5"
          >
            <div className="text-[var(--text-primary)]">
              {isOpen ? <X /> : <MenuIcon />}
            </div>
          </button>
        </div>
      </header>

      {isOpen && (
        <div className="relative" style={{ zIndex: 10000 }}>
          <nav
            style={{ zIndex: 300000 }}
            className="absolute top-0 w-full transition-all block md:hidden text-center gap-8"
          >
            <Link
              className="text-slate-300 font-semibold block p-3 bg-slate-800 border-b border-slate-400 hover:text-white text-sm"
              href="/about"
            >
              About
            </Link>
            <Link
              className="text-slate-300 font-semibold block p-3 bg-slate-800 border-b border-slate-400 hover:text-white text-sm"
              href="/projects"
            >
              Projects
            </Link>
            <Link
              className="text-slate-300 font-semibold block p-3 bg-slate-800 border-b border-slate-400 hover:text-white text-sm"
              href="/contact"
            >
              Contact
            </Link>
          </nav>
        </div>
      )}
    </>
  );
}
