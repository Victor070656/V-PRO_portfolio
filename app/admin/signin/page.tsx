"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { AlertCircle, Loader2, Lock, Shield, User } from "lucide-react";
import Link from "next/link";

export default function AdminSignInPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCredentialsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const result = await signIn("credentials", {
      username,
      password,
      userType: "admin",
      redirect: false,
    });

    if (result?.error) {
      setError("Invalid admin credentials");
      setLoading(false);
      return;
    }

    router.push("/admin");
  };

  return (
    <div className="arch-shell min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md arch-panel p-8">
        <div className="mb-8">
          <p className="arch-kicker mb-3">Restricted Access</p>
          <h1 className="arch-heading-md flex items-center gap-2">
            <Shield className="w-5 h-5 text-primary" />
            Admin Sign In
          </h1>
          <p className="text-muted-foreground mt-2">
            Authenticate to access the admin control surface.
          </p>
        </div>

        {error ? (
          <div className="mb-5 rounded border border-red-500/50 bg-red-500/10 px-4 py-3 text-sm text-red-300">
            <div className="inline-flex items-center gap-2">
              <AlertCircle className="w-4 h-4" />
              {error}
            </div>
          </div>
        ) : null}

        <form onSubmit={handleCredentialsSubmit} className="space-y-4">
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              id="username"
              value={username}
              placeholder="Admin username"
              onChange={(e) => setUsername(e.target.value)}
              className="arch-input pl-10"
              required
              disabled={loading}
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="password"
              id="password"
              value={password}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              className="arch-input pl-10"
              required
              disabled={loading}
            />
          </div>

          <button type="submit" disabled={loading} className="arch-button w-full">
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Signing in...
              </>
            ) : (
              "Sign In"
            )}
          </button>
        </form>

        <p className="mt-6 text-sm text-muted-foreground">
          Not an admin?{" "}
          <Link href="/auth/signin" className="text-primary hover:underline">
            Student sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
