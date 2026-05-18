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
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/courses", label: "Courses" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const { data: session } = useSession();
  const [isDark, setIsDark] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains("dark"));
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const toggleDarkMode = () => {
    document.documentElement.classList.toggle("dark");
    setIsDark((current) => !current);
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

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
            {navItems.map((item) => (
              <Link
                key={item.href}
                className={`text-sm font-medium transition-colors ${
                  pathname === item.href
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
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
              className="inline-flex md:hidden h-10 items-center gap-2 rounded-full border border-border bg-secondary px-4 text-foreground transition-colors hover:bg-muted"
              aria-label="Toggle mobile menu"
              aria-expanded={isOpen}
              aria-controls="mobile-navigation"
            >
              <motion.span
                animate={{ rotate: isOpen ? 90 : 0 }}
                transition={{ duration: 0.2 }}
                className="inline-flex"
              >
                {isOpen ? <X className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
              </motion.span>
              <span className="text-sm font-semibold">{isOpen ? "Close" : "Menu"}</span>
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {isOpen ? (
          <motion.div
            className="md:hidden fixed inset-0 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
          >
            <button
              type="button"
              aria-label="Close mobile menu"
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-black/55 backdrop-blur-[2px]"
            />

            <motion.aside
              id="mobile-navigation"
              initial={{ y: -18, opacity: 0, scale: 0.98 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: -18, opacity: 0, scale: 0.98 }}
              transition={{ type: "spring", stiffness: 320, damping: 30 }}
              className="absolute left-4 right-4 top-[73px] overflow-hidden rounded-2xl border border-border bg-card shadow-2xl"
            >
              <div className="border-b border-border px-5 py-4">
                <p className="arch-kicker">Navigation</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Move through the portfolio and collaboration pages.
                </p>
              </div>

              <nav className="px-3 py-3 space-y-1">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center justify-between rounded-xl px-4 py-3 transition-colors ${
                      pathname === item.href
                        ? "bg-muted text-foreground"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    }`}
                    href={item.href}
                  >
                    <span className="font-medium">{item.label}</span>
                    <span className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
                      {pathname === item.href ? "Current" : ""}
                    </span>
                  </Link>
                ))}
              </nav>

              <div className="border-t border-border px-5 py-4">
                {session ? (
                  <div className="space-y-3">
                    <div className="rounded-xl border border-border bg-muted/40 px-4 py-3">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <User className="h-4 w-4" />
                        Signed in as{" "}
                        <span className="text-foreground">
                          {session.user?.name ||
                            session.user?.email?.split("@")[0] ||
                            "User"}
                        </span>
                      </div>
                    </div>
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
                  <div className="grid gap-3">
                    <Link
                      onClick={() => setIsOpen(false)}
                      className="arch-button w-full"
                      href="/auth/signin"
                    >
                      <LogIn className="h-4 w-4" />
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
              </div>
            </motion.aside>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
