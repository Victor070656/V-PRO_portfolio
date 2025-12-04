import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Plus, BookOpen, Users, TrendingUp, Sparkles, ArrowRight } from "lucide-react";
import AnalyticsDashboard from "@/components/admin/AnalyticsDashboard";

export default async function AdminDashboard() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/admin/signin");
  }

  const quickActions = [
    {
      title: "Manage Courses",
      description: "Create, edit, and organize your courses",
      href: "/admin/courses",
      icon: BookOpen,
      gradient: "from-indigo-500 to-purple-600",
      iconBg: "bg-indigo-100 dark:bg-indigo-900/30",
      iconColor: "text-indigo-600 dark:text-indigo-400"
    },
    {
      title: "View Students",
      description: "Monitor student progress and activity",
      href: "/admin/students",
      icon: Users,
      gradient: "from-blue-500 to-cyan-600",
      iconBg: "bg-blue-100 dark:bg-blue-900/30",
      iconColor: "text-blue-600 dark:text-blue-400"
    },
    {
      title: "Track Progress",
      description: "View completion rates and analytics",
      href: "/admin/progress",
      icon: TrendingUp,
      gradient: "from-green-500 to-emerald-600",
      iconBg: "bg-green-100 dark:bg-green-900/30",
      iconColor: "text-green-600 dark:text-green-400"
    },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Hero Header */}
      <div className="relative overflow-hidden bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-3xl p-8 shadow-2xl">
        <div className="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(0deg,transparent,black)]" />
        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-6 h-6 text-yellow-300 animate-pulse" />
                <span className="text-white/90 text-sm font-medium">Admin Dashboard</span>
              </div>
              <h1 className="text-4xl font-black text-white mb-2">
                Welcome back, Admin!
              </h1>
              <p className="text-white/80 text-lg">
                Here's what's happening with your learning platform today.
              </p>
            </div>
            <Link
              href="/admin/courses/create"
              className="group bg-white hover:bg-white/90 text-indigo-600 px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:shadow-xl hover:scale-105 flex items-center gap-2"
            >
              <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
              Create Course
            </Link>
          </div>
        </div>
      </div>

      {/* Analytics Dashboard */}
      <AnalyticsDashboard />

      {/* Quick Actions */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Quick Actions</h2>
          <span className="text-sm text-slate-500 dark:text-slate-400">Jump to frequently used sections</span>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {quickActions.map((action, index) => {
            const Icon = action.icon;
            return (
              <Link
                key={index}
                href={action.href}
                className="group relative overflow-hidden bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-full blur-2xl" 
                     style={{ background: `linear-gradient(to bottom right, var(--tw-gradient-stops))` }} />
                
                <div className="relative z-10">
                  <div className={`w-12 h-12 ${action.iconBg} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className={`w-6 h-6 ${action.iconColor}`} />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    {action.title}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                    {action.description}
                  </p>
                  <div className="flex items-center text-indigo-600 dark:text-indigo-400 text-sm font-medium">
                    <span>Go to {action.title.toLowerCase()}</span>
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform duration-300" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Recent Activity Placeholder */}
      <div className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 rounded-2xl p-8 border border-slate-200 dark:border-slate-700">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Recent Activity</h2>
        <p className="text-slate-600 dark:text-slate-400">
          Activity feed coming soon - track recent enrollments, payments, and course updates.
        </p>
      </div>
    </div>
  );
}