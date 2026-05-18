"use client";

import { useEffect, useState } from "react";
import {
  Activity,
  Award,
  BarChart3,
  BookOpen,
  CheckCircle,
  DollarSign,
  TrendingUp,
  Users,
} from "lucide-react";
import { formatPrice } from "@/lib/utils/currency";

interface AnalyticsData {
  totalStudents: number;
  totalRevenue: number;
  totalCourses: number;
  activeEnrollments: number;
  publishedCourses: number;
  completionRate: number;
  averageProgress: number;
  activeStudents: number;
  recentEnrollments: number;
  recentRevenue: number;
  studentGrowth: number;
  completedEnrollments: number;
  inProgressEnrollments: number;
}

export default function AnalyticsDashboard() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const res = await fetch("/api/admin/analytics");
      const result = await res.json();
      if (result.success) setData(result.data);
    } catch (error) {
      console.error("Error fetching analytics:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="arch-panel h-28 animate-pulse bg-muted" />
        ))}
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="space-y-6">
      <section>
        <h2 className="arch-heading-md mb-4">Key Metrics</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <MetricCard icon={DollarSign} label="Total Revenue" value={formatPrice(data.totalRevenue)} />
          <MetricCard icon={Users} label="Total Students" value={data.totalStudents.toString()} />
          <MetricCard icon={BookOpen} label="Total Courses" value={data.totalCourses.toString()} />
          <MetricCard icon={BarChart3} label="Active Enrollments" value={data.activeEnrollments.toString()} />
        </div>
      </section>

      <section>
        <h2 className="arch-heading-md mb-4">Performance Insights</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <MetricCard icon={Activity} label="Active Students (7d)" value={data.activeStudents.toString()} />
          <MetricCard icon={CheckCircle} label="Completion Rate" value={`${data.completionRate}%`} />
          <MetricCard icon={TrendingUp} label="Average Progress" value={`${data.averageProgress}%`} />
          <MetricCard icon={Award} label="Certificates Issued" value={data.completedEnrollments.toString()} />
        </div>
      </section>
    </div>
  );
}

function MetricCard({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
}) {
  return (
    <article className="arch-panel p-5">
      <Icon className="w-5 h-5 text-primary mb-2" />
      <p className="arch-kicker">{label}</p>
      <p className="text-2xl font-semibold">{value}</p>
    </article>
  );
}
