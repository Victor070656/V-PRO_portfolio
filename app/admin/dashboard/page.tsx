import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { ArrowRight, BookOpen, Plus, TrendingUp, Users } from "lucide-react";
import AnalyticsDashboard from "@/components/admin/AnalyticsDashboard";

export default async function AdminDashboard() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/admin/signin");
  }

  const quickActions = [
    {
      title: "Manage Courses",
      description: "Create and edit course content",
      href: "/admin/courses",
      icon: BookOpen,
    },
    {
      title: "View Students",
      description: "Review student activity and growth",
      href: "/admin/students",
      icon: Users,
    },
    {
      title: "Track Progress",
      description: "Monitor completion metrics",
      href: "/admin/progress",
      icon: TrendingUp,
    },
  ];

  return (
    <div className="space-y-8">
      <section className="arch-panel p-8 md:p-10">
        <p className="arch-kicker mb-3">Admin Dashboard</p>
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="arch-heading-lg mb-2">
              Welcome back, {session.user?.name || "Admin"}.
            </h1>
            <p className="text-muted-foreground">
              Operational overview for courses, students, and learning outcomes.
            </p>
          </div>
          <Link href="/admin/courses/create" className="arch-button">
            <Plus className="w-4 h-4" />
            Create Course
          </Link>
        </div>
      </section>

      <AnalyticsDashboard />

      <section className="space-y-4">
        <h2 className="arch-heading-md">Quick Actions</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <Link
                key={action.title}
                href={action.href}
                className="arch-panel p-6 hover:border-primary transition-colors"
              >
                <Icon className="h-5 w-5 text-primary mb-3" />
                <h3 className="font-semibold mb-1">{action.title}</h3>
                <p className="text-sm text-muted-foreground">{action.description}</p>
                <span className="mt-4 inline-flex items-center gap-2 text-primary text-sm">
                  Open
                  <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}
