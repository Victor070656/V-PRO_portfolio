"use client";

import { useState, Suspense } from "react";
import { signIn, getSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import {
  GraduationCap,
  User,
  Eye,
  EyeOff,
  Loader2,
  AlertCircle,
  ArrowLeft,
  Shield,
  BookOpen,
} from "lucide-react";
import Link from "next/link";

function SignInContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/student/dashboard";

  const [userType, setUserType] = useState<"student" | "admin">("student");
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

    try {
        // Get the callback URL from URL params or use default based on user type
        const searchParams = new URLSearchParams(window.location.search);
        const callbackUrl = searchParams.get("callbackUrl") ||
                          (userType === "admin" ? "/admin" : "/student/dashboard");

        const result = await signIn("credentials", {
          username: formData.username,
          password: formData.password,
          callbackUrl: callbackUrl, // Let NextAuth handle the redirect
          redirect: true, // Let NextAuth handle redirect
          userType: userType, // Pass user type for role assignment
        });

      if (result?.error) {
        setError("Invalid username or password");
      }
      // If successful, NextAuth will handle the redirect automatically
    } catch (err) {
      setError("An error occurred during sign in");
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    setError("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <Navbar />

      <div className="flex items-center justify-center px-6 py-20">
        <div className="w-full max-w-md">
          {/* Sign-in Card */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
            {/* User Type Selection */}
            {/* <div className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50">
              <div className="flex">
                <button
                  onClick={() => setUserType("student")}
                  className={`flex-1 px-6 py-4 text-sm font-medium transition-all border-b-2 ${
                    userType === "student"
                      ? "text-indigo-600 dark:text-indigo-400 border-indigo-600 dark:border-indigo-400 bg-white dark:bg-slate-900"
                      : "text-slate-600 dark:text-slate-400 border-transparent hover:text-slate-900 dark:hover:text-slate-200"
                  }`}
                >
                  <BookOpen className="w-4 h-4 mr-2" />
                  Student
                </button>
                <button
                  onClick={() => setUserType("admin")}
                  className={`flex-1 px-6 py-4 text-sm font-medium transition-all border-b-2 ${
                    userType === "admin"
                      ? "text-purple-600 dark:text-purple-400 border-purple-600 dark:border-purple-400 bg-white dark:bg-slate-900"
                      : "text-slate-600 dark:text-slate-400 border-transparent hover:text-slate-900 dark:hover:text-slate-200"
                  }`}
                >
                  <Shield className="w-4 h-4 mr-2" />
                  Admin
                </button>
              </div>
            </div> */}

            {/* Sign-in Form */}
            <div className="p-8">
              {/* Header */}
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full mb-4">
                  {userType === "student" ? (
                    <GraduationCap className="w-10 h-10 text-white" />
                  ) : (
                    <User className="w-10 h-10 text-white" />
                  )}
                </div>
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                  {userType === "student" ? "Welcome Back, Student!" : "Admin Sign In"}
                </h1>
                <p className="text-slate-600 dark:text-slate-400">
                  {userType === "student"
                    ? "Sign in to access your courses and continue learning"
                    : "Sign in to manage courses and view analytics"}
                </p>
              </div>

              {/* Error Message */}
              {error && (
                <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl">
                  <div className="flex items-center">
                    <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 mr-3" />
                    <p className="text-red-800 dark:text-red-200 font-medium">{error}</p>
                  </div>
                </div>
              )}

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Username Field */}
                <div>
                  <label htmlFor="username" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Username
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-slate-400" />
                    </div>
                    <input
                      id="username"
                      name="username"
                      type="text"
                      value={formData.username}
                      onChange={handleInputChange}
                      className="w-full pl-11 pr-4 py-3 border border-slate-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                      placeholder="Enter your username"
                      required
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <div className="h-5 w-5 text-slate-400">
                        {userType === "admin" ? <Shield className="w-full h-full" /> : <BookOpen className="w-full h-full" />}
                      </div>
                    </div>
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={handleInputChange}
                      className="w-full pl-11 pr-12 py-3 border border-slate-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                      placeholder="Enter your password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full py-4 px-4 rounded-xl font-semibold text-white transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none ${
                    userType === "admin"
                      ? "bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
                      : "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
                  }`}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin mr-2" />
                      Signing in...
                    </>
                  ) : (
                    <div className="inline-flex items-center">
                      
                          <GraduationCap className="w-5 h-5 mr-2" />
                          <span>Student Sign In</span>
                    </div>
                  )}
                </button>
              </form>

              {/* Footer Links */}
              <div className="mt-8 text-center space-y-4">
                {userType === "student" && (
                  <>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      Don't have an account?{" "}
                      <Link href="/auth/signup" className="font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300">
                        Sign up
                      </Link>
                    </p>
                    {/* <p className="text-sm text-slate-600 dark:text-slate-400">
                      <Link href="/auth/forgot-password" className="font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300">
                        Forgot password?
                      </Link>
                    </p> */}
                  </>
                )}

                {userType === "admin" && (
                  <p className="text-xs text-slate-500 dark:text-slate-500">
                    Admin access requires special permissions. Contact support if you need access.
                  </p>
                )}

                <div className="pt-4 border-t border-slate-200 dark:border-slate-700">
                  <Link
                    href="/"
                    className="inline-flex items-center text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Home
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Security Notice */}
          <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl">
            <div className="flex items-start">
              <Shield className="w-5 h-5 text-blue-600 dark:text-blue-400 mr-3 mt-0.5" />
              <div className="text-sm text-blue-800 dark:text-blue-200">
                <p className="font-semibold mb-1">Secure Sign In</p>
                <p>Your connection is secure and your data is protected. Never share your login credentials.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SignInPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SignInContent />
    </Suspense>
  );
}