"use client";

import { useEffect, useState } from "react";
import { BarChart3, Users, DollarSign, BookOpen } from "lucide-react";
import { formatPrice } from "@/lib/utils/currency";

interface AnalyticsData {
  totalStudents: number;
  totalRevenue: number;
  totalCourses: number;
  activeEnrollments: number;
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
      if (result.success) {
        setData(result.data);
      }
    } catch (error) {
      console.error("Error fetching analytics:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="animate-pulse space-y-4">
      <div className="h-32 bg-slate-100 dark:bg-slate-800 rounded-xl"></div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
         <div className="h-32 bg-slate-100 dark:bg-slate-800 rounded-xl"></div>
         <div className="h-32 bg-slate-100 dark:bg-slate-800 rounded-xl"></div>
         <div className="h-32 bg-slate-100 dark:bg-slate-800 rounded-xl"></div>
      </div>
    </div>;
  }

  if (!data) return null;

  const stats = [
    {
      label: "Total Revenue",
      value: formatPrice(data.totalRevenue),
      icon: DollarSign,
      color: "text-green-600",
      bg: "bg-green-100 dark:bg-green-900/30",
    },
    {
      label: "Total Students",
      value: data.totalStudents.toString(),
      icon: Users,
      color: "text-blue-600",
      bg: "bg-blue-100 dark:bg-blue-900/30",
    },
    {
      label: "Active Enrollments",
      value: data.activeEnrollments.toString(),
      icon: BookOpen,
      color: "text-purple-600",
      bg: "bg-purple-100 dark:bg-purple-900/30",
    },
     {
      label: "Total Courses",
      value: data.totalCourses.toString(),
      icon: BarChart3,
      color: "text-orange-600",
      bg: "bg-orange-100 dark:bg-orange-900/30",
    },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-slate-900 dark:text-white">Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
          <div
            key={index}
            className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-xl ${stat.bg}`}>
                <Icon className={`w-6 h-6 ${stat.color}`} />
              </div>
            </div>
            <div>
              <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">
                {stat.label}
              </p>
              <h3 className="text-2xl font-black text-slate-900 dark:text-white mt-1">
                {stat.value}
              </h3>
            </div>
          </div>
          );
        })}
      </div>
    </div>
  );
}
