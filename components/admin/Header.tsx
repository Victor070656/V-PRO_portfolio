"use client";

import { LogOut, Moon, Search, Sun } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { signOut, useSession } from "next-auth/react";

export default function Header() {
  const { data: session } = useSession();
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    setIsDarkMode(document.documentElement.classList.contains("dark"));
  }, []);

  const toggleDarkMode = () => {
    document.documentElement.classList.toggle("dark");
    setIsDarkMode(!isDarkMode);
  };

  return (
    <header className="arch-panel mb-6 flex items-center justify-between px-5 py-4">
      <div className="relative w-full max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search..."
          className="arch-input pl-10 py-2"
        />
      </div>

      <div className="ml-4 flex items-center gap-2">
        <button
          onClick={toggleDarkMode}
          className="inline-flex h-9 w-9 items-center justify-center rounded border border-border bg-secondary"
          title="Toggle dark mode"
        >
          {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </button>

        <div className="hidden md:flex items-center gap-2 rounded border border-border px-3 py-2">
          <Image
            src="/vic.jpg"
            alt={session?.user?.name || "Admin User"}
            width={28}
            height={28}
            className="rounded-full object-cover"
          />
          <div className="text-xs">
            <p className="text-foreground font-medium leading-tight">
              {session?.user?.name || session?.user?.email?.split("@")[0] || "Admin User"}
            </p>
            <p className="text-muted-foreground leading-tight">Administrator</p>
          </div>
        </div>

        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className="inline-flex h-9 w-9 items-center justify-center rounded border border-border bg-secondary text-muted-foreground hover:text-red-300"
          title="Sign out"
        >
          <LogOut className="h-4 w-4" />
        </button>
      </div>
    </header>
  );
}
