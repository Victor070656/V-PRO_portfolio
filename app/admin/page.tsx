import Header from "@/components/admin/Header";
import StatCard from "@/components/admin/StatCard";
import RecentProjects from "@/components/admin/RecentProjects";
import Link from "next/link";
import { Users, BookOpen, DollarSign, CreditCard, Shield, FolderKanban } from "lucide-react";
import {  Eye, TrendingUp, Clock } from "lucide-react";
// import { authOptions } from "../api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";

export default async function AdminDashboardPage() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/signin");
  }

  return (
    <>
      <Header />
      <main className="flex-1 p-8 overflow-y-auto bg-[var(--background-color)]">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[var(--text-primary)] mb-2">Welcome back, Victor!</h1>
          <p className="text-[var(--text-secondary)]">Here's what's happening with your portfolio today.</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Projects"
            value="12"
            icon={FolderKanban}
            change="+2 this month"
            changeColor="text-green-500"
          />
          <StatCard
            title="Portfolio Views"
            value="1,234"
            icon={Eye}
            change="+15% this week"
            changeColor="text-green-500"
          />
          <StatCard
            title="Featured Projects"
            value="5"
            icon={TrendingUp}
            change="Updated recently"
            changeColor="text-blue-500"
          />
          <StatCard
            title="Last Updated"
            value="2 days ago"
            icon={Clock}
            change="Keep it fresh!"
            changeColor="text-orange-500"
          />
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="admin-card p-6 rounded-xl">
            <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-4">Quick Actions</h2>
            <div className="space-y-3">
              <Link
                href="/admin/projects"
                className="flex items-center justify-between p-4 bg-[var(--secondary-color)] rounded-lg hover:bg-[var(--hover-color)] transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[var(--accent-color)] rounded-lg flex items-center justify-center">
                    <FolderKanban className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-medium text-[var(--text-primary)]">Add New Project</p>
                    <p className="text-sm text-[var(--text-secondary)]">Showcase your latest work</p>
                  </div>
                </div>
                <span className="text-[var(--text-secondary)]">→</span>
              </Link>
              
              <Link
                href="/"
                className="flex items-center justify-between p-4 bg-[var(--secondary-color)] rounded-lg hover:bg-[var(--hover-color)] transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                    <Eye className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-medium text-[var(--text-primary)]">View Portfolio</p>
                    <p className="text-sm text-[var(--text-secondary)]">See how visitors see your work</p>
                  </div>
                </div>
                <span className="text-[var(--text-secondary)]">→</span>
              </Link>
            </div>
          </div>

          <div className="admin-card p-6 rounded-xl">
            <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-4">Portfolio Tips</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-[var(--accent-color)] rounded-full mt-2"></div>
                <div>
                  <p className="font-medium text-[var(--text-primary)] text-sm">Keep projects updated</p>
                  <p className="text-xs text-[var(--text-secondary)]">Regular updates show you're active</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                <div>
                  <p className="font-medium text-[var(--text-primary)] text-sm">Use high-quality images</p>
                  <p className="text-xs text-[var(--text-secondary)]">Visual appeal matters for first impressions</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                <div>
                  <p className="font-medium text-[var(--text-primary)] text-sm">Write clear descriptions</p>
                  <p className="text-xs text-[var(--text-secondary)]">Help visitors understand your work</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Projects */}
        <div>
          <RecentProjects />
        </div>
      </main>
    </>
  );
}