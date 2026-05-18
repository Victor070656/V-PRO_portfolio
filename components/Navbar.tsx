"use client";

import {
  LayoutDashboard,
  LogIn,
  LogOut,
  MenuIcon,
  MoonIcon,
  SunIcon,
  User,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { signOut, useSession } from "next-auth/react";

export default function Navbar() {
  const { data: session } = useSession();
  const [isDark, setIsDark] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains("dark"));
  }, []);

  const toggleDarkMode = () => {
    document.documentElement.classList.toggle("dark");
    setIsDark(!isDark);
  };

  const handleSignOut = () => {
    signOut({ callbackUrl: "/" });
    setIsOpen(false);
  };

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-border/80 bg-background/70 backdrop-blur-md">
        <div className="arch-container flex items-center justify-between py-4">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/logo.png"
              alt="V-PRO Services"
              width={36}
              height={36}
              className="rounded"
            />
            <div>
              <p className="arch-kicker">V-PRO</p>
              <h2 className="text-base font-semibold text-foreground leading-tight">
                Services
              </h2>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            {[
              { href: "/", label: "Home" },
              { href: "/about", label: "About" },
              { href: "/projects", label: "Projects" },
              { href: "/courses", label: "Courses" },
              { href: "/contact", label: "Contact" },
            ].map((item) => (
              <Link
                key={item.href}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                href={item.href}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={toggleDarkMode}
              className="inline-flex h-10 w-10 items-center justify-center rounded border border-border bg-secondary text-foreground"
              aria-label="Toggle dark mode"
            >
              {isDark ? (
                <SunIcon className="h-4 w-4" />
              ) : (
                <MoonIcon className="h-4 w-4" />
              )}
            </button>

            <div className="hidden md:flex items-center gap-3">
              {session ? (
                <>
                  <Link
                    href={
                      session.user?.role === "admin"
                        ? "/admin"
                        : "/student/dashboard"
                    }
                    className="arch-button"
                  >
                    <LayoutDashboard className="h-4 w-4" />
                    {session.user?.role === "admin" ? "Admin" : "Dashboard"}
                  </Link>

                  <div className="inline-flex items-center gap-2 rounded border border-border bg-card px-3 py-2">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-foreground">
                      {session.user?.name ||
                        session.user?.email?.split("@")[0] ||
                        "User"}
                    </span>
                  </div>

                  <button onClick={handleSignOut} className="arch-button-secondary">
                    <LogOut className="h-4 w-4" />
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <Link className="arch-button-secondary" href="/auth/signin">
                    <LogIn className="h-4 w-4" />
                    Sign In
                  </Link>
                  <Link className="arch-button" href="/contact">
                    Hire Me
                  </Link>
                </>
              )}
            </div>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex md:hidden h-10 w-10 items-center justify-center rounded border border-border bg-secondary text-foreground"
              aria-label="Toggle mobile menu"
            >
              {isOpen ? <X className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>

      {isOpen && (
        <div className="md:hidden border-b border-border bg-background">
          <nav className="arch-container py-3 space-y-1">
            {[
              { href: "/", label: "Home" },
              { href: "/about", label: "About" },
              { href: "/projects", label: "Projects" },
              { href: "/courses", label: "Courses" },
              { href: "/contact", label: "Contact" },
            ].map((item) => (
              <Link
                key={item.href}
                onClick={() => setIsOpen(false)}
                className="block rounded px-4 py-3 text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
                href={item.href}
              >
                {item.label}
              </Link>
            ))}

            {session ? (
              <div className="pt-3 mt-3 border-t border-border space-y-2">
                <Link
                  onClick={() => setIsOpen(false)}
                  className="arch-button w-full"
                  href={
                    session.user?.role === "admin"
                      ? "/admin"
                      : "/student/dashboard"
                  }
                >
                  <LayoutDashboard className="h-4 w-4" />
                  {session.user?.role === "admin"
                    ? "Admin Dashboard"
                    : "Student Dashboard"}
                </Link>
                <button onClick={handleSignOut} className="arch-button-secondary w-full">
                  <LogOut className="h-4 w-4" />
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="pt-3 mt-3 border-t border-border space-y-2">
                <Link
                  onClick={() => setIsOpen(false)}
                  className="arch-button w-full"
                  href="/auth/signin"
                >
                  Sign In
                </Link>
                <Link
                  onClick={() => setIsOpen(false)}
                  className="arch-button-secondary w-full"
                  href="/contact"
                >
                  Hire Me
                </Link>
              </div>
            )}
          </nav>
        </div>
      )}
    </>
  );
}
