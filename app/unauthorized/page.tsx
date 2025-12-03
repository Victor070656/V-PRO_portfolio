import Link from "next/link";
import { ArrowLeft, ShieldX } from "lucide-react";

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen bg-[var(--background-color)] flex items-center justify-center px-4">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 dark:bg-red-900 rounded-full mb-6">
          <ShieldX className="w-8 h-8 text-red-600 dark:text-red-400" />
        </div>

        <h1 className="text-4xl font-bold text-[var(--text-primary)] mb-4">
          Access Denied
        </h1>

        <p className="text-lg text-[var(--text-secondary)] mb-8 max-w-md">
          You don't have permission to access this page. Please contact an administrator if you think this is a mistake.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Home
          </Link>

          <Link
            href="/auth/signin"
            className="inline-flex items-center px-6 py-3 border border-gray-300 dark:border-gray-600 text-[var(--text-primary)] font-medium rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}