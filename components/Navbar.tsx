"use client";

import {
  LogIn,
  LogOut,
  MenuIcon,
  MoonIcon,
  SunIcon,
  X,
  User,
  LayoutDashboard,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useSession, signIn, signOut } from "next-auth/react";

export default function Navbar() {
  const { data: session } = useSession();
  const [isDark, setIsDark] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Check if dark mode is already enabled
    const isDarkMode = document.documentElement.classList.contains("dark");
    setIsDark(isDarkMode);
  }, []);

  const toggleDarkMode = () => {
    document.documentElement.classList.toggle("dark");
    setIsDark(!isDark);
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleSignOut = () => {
    signOut({ callbackUrl: "/" });
    setIsOpen(false);
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
            href="/"
          >
            Home
          </Link>
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
            href="/courses"
          >
            Courses
          </Link>
          <Link
            className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] text-sm font-medium"
            href="/contact"
          >
            Contact
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          {/* Dark Mode Toggle */}
          <button
            onClick={toggleDarkMode}
            className="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 bg-[var(--secondary-color)] text-[var(--text-primary)] gap-2 text-sm font-bold px-2.5"
            aria-label="Toggle dark mode"
          >
            <div className="text-[var(--text-primary)]">
              {isDark ? <SunIcon /> : <MoonIcon />}
            </div>
          </button>

          {/* Desktop Navigation - Authentication-aware */}
          <div className="hidden md:flex items-center gap-3">
            {session ? (
              <>
                {/* User is authenticated */}
                {session.user?.role === "admin" && (
                  <Link
                    href="/admin"
                    className="flex items-center gap-2 px-4 py-2 bg-[var(--accent-color)] hover:bg-opacity-90 text-white rounded-lg text-sm font-medium transition-colors"
                  >
                    <LayoutDashboard className="w-4 h-4" />
                    Admin
                  </Link>
                )}

                <div className="flex items-center gap-2 px-3 py-2 bg-[var(--secondary-color)] rounded-lg">
                  <User className="w-4 h-4 text-[var(--text-secondary)]" />
                  <span className="text-sm text-[var(--text-primary)]">
                    {session.user?.name || session.user?.email?.split("@")[0] || "User"}
                  </span>
                </div>

                <button
                  onClick={handleSignOut}
                  className="flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-600 text-[var(--text-primary)] hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg text-sm font-medium transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </button>
              </>
            ) : (
              <>
                {/* User is not authenticated */}
                <Link
                  className="flex items-center gap-2 px-4 py-2 border border-gray-200 dark:border-gray-600 text-[var(--text-primary)] hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg text-sm font-medium transition-colors"
                  href="/auth/signin"
                >
                  <LogIn className="w-4 h-4 mr-2" />
                  Sign In
                </Link>
                <Link className="button_secondary" href="/contact">
                  Hire Me
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={toggleMenu}
            className="flex md:hidden max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 bg-[var(--secondary-color)] text-[var(--text-primary)] gap-2 text-sm font-bold px-2.5"
            aria-label="Toggle mobile menu"
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
            className="absolute top-0 left-0 right-0 bg-[var(--secondary-color)] border-b border-gray-200 dark:border-gray-700 shadow-lg md:hidden"
          >
            <div className="px-4 py-2 space-y-1">
              {/* Navigation Links */}
              <Link
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--hover-color)] transition-colors"
                href="/"
              >
                Home
              </Link>
              <Link
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--hover-color)] transition-colors"
                href="/about"
              >
                About
              </Link>
              <Link
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--hover-color)] transition-colors"
                href="/projects"
              >
                Projects
              </Link>
              <Link
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--hover-color)] transition-colors"
                href="/courses"
              >
                Courses
              </Link>
              <Link
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--hover-color)] transition-colors"
                href="/contact"
              >
                Contact
              </Link>

              {/* Authentication-aware mobile links */}
              {session && (
                <>
                  {session.user?.role === "admin" && (
                    <Link
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 rounded-lg bg-[var(--accent-color)] text-white transition-colors"
                      href="/admin"
                    >
                      <LayoutDashboard className="w-4 h-4" />
                      Admin Dashboard
                    </Link>
                  )}

                  <div className="flex items-center gap-3 px-4 py-3 rounded-lg bg-[var(--hover-color)]">
                    <User className="w-4 h-4 text-[var(--text-secondary)]" />
                    <div className="text-left">
                      <p className="text-sm font-medium text-[var(--text-primary)]">
                        {session.user?.name || session.user?.email?.split("@")[0] || "User"}
                      </p>
                      <p className="text-xs text-[var(--text-secondary)]">
                        {session.user?.role === "admin" ? "Administrator" : "Student"}
                      </p>
                    </div>
                  </div>
                </>
              )}

              <div className="border-t border-gray-200 dark:border-gray-700 pt-2">
                {session ? (
                  <button
                    onClick={handleSignOut}
                    className="flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors w-full"
                  >
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </button>
                ) : (
                  <>
                    <Link
                      onClick={() => setIsOpen(false)}
                      className="block px-4 py-3 rounded-lg bg-[var(--accent-color)] text-white hover:bg-opacity-90 transition-colors text-center font-medium"
                      href="/auth/signin"
                    >
                      Sign In
                    </Link>
                    <Link
                      onClick={() => setIsOpen(false)}
                      className="block px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 text-[var(--text-primary)] hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-center font-medium mt-2"
                      href="/contact"
                    >
                      Hire Me
                    </Link>
                  </>
                )}
              </div>
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
