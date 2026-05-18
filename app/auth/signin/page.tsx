"use client";

import { useState, Suspense } from "react";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import { AlertCircle, ArrowLeft, Eye, EyeOff, Loader2, User } from "lucide-react";
import Link from "next/link";

function SignInContent() {
  const searchParams = useSearchParams();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const callbackUrl =
      searchParams.get("callbackUrl") || "/student/dashboard";

    const result = await signIn("credentials", {
      username: formData.username,
      password: formData.password,
      callbackUrl,
      redirect: true,
      userType: "student",
    });

    if (result?.error) {
      setError("Invalid username or password");
    }

    setIsLoading(false);
  };

  return (
    <div className="arch-shell">
      <Navbar />

      <main className="arch-container py-16 md:py-20">
        <div className="mx-auto max-w-md arch-panel p-8">
          <p className="arch-kicker mb-3">Authentication</p>
          <h1 className="arch-heading-md mb-2">Sign in</h1>
          <p className="text-muted-foreground mb-6">
            Access your dashboard and continue learning.
          </p>

          {error ? (
            <div className="mb-6 rounded border border-red-500/50 bg-red-500/10 px-4 py-3 text-sm text-red-300">
              <div className="inline-flex items-center gap-2">
                <AlertCircle className="h-4 w-4" />
                {error}
              </div>
            </div>
          ) : null}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                name="username"
                type="text"
                value={formData.username}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, username: e.target.value }))
                }
                className="arch-input pl-10"
                placeholder="Username"
                required
              />
            </div>

            <div className="relative">
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, password: e.target.value }))
                }
                className="arch-input pr-10"
                placeholder="Password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>

            <button type="submit" disabled={isLoading} className="arch-button w-full">
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Signing in...
                </>
              ) : (
                "Sign in"
              )}
            </button>
          </form>

          <div className="mt-6 text-sm text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link href="/auth/signup" className="text-primary hover:underline">
              Sign up
            </Link>
          </div>

          <Link
            href="/"
            className="mt-6 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to home
          </Link>
        </div>
      </main>
    </div>
  );
}

export default function SignInPage() {
  return (
    <Suspense fallback={<div className="arch-shell" />}>
      <SignInContent />
    </Suspense>
  );
}
