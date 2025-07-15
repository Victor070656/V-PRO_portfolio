import Header from "@/components/admin/Header";
import StatCard from "@/components/admin/StatCard";
import AnalyticsChart from "@/components/admin/AnalyticsChart";
import RecentProjects from "@/components/admin/RecentProjects";
import { DollarSign, Users, FolderKanban, ArrowUpRight } from "lucide-react";

export default function AdminDashboardPage() {
  return (
    <>
      <Header />
      <main className="flex-1 p-8 overflow-y-auto bg-[var(--secondary-color)]">
        <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

        {/* Stat Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Revenue"
            value="$45,231.89"
            icon={DollarSign}
            change="+20.1% from last month"
            changeColor="text-green-500"
          />
          <StatCard
            title="Active Users"
            value="+2350"
            icon={Users}
            change="+180.1% from last month"
            changeColor="text-green-500"
          />
          <StatCard
            title="New Projects"
            value="+12"
            icon={FolderKanban}
            change="+19% from last month"
            changeColor="text-green-500"
          />
          <StatCard
            title="Conversion Rate"
            value="12.5%"
            icon={ArrowUpRight}
            change="-2.1% from last month"
            changeColor="text-red-500"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Chart */}
          <div className="lg:col-span-2">
            <AnalyticsChart />
          </div>

          {/* Recent Projects */}
          <div>
            <RecentProjects />
          </div>
        </div>
      </main>
    </>
  );
}