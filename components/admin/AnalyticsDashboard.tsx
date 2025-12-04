"use client";

import { useEffect, useState } from "react";
import { BarChart3, Users, DollarSign, BookOpen, TrendingUp, CheckCircle, Activity, Award } from "lucide-react";
import { formatPrice } from "@/lib/utils/currency";

interface AnalyticsData {
  // Main metrics
  totalStudents: number;
  totalRevenue: number;
  totalCourses: number;
  activeEnrollments: number;
  
  // Additional metrics
  publishedCourses: number;
  completionRate: number;
  averageProgress: number;
  activeStudents: number;
  
  // Growth metrics
  recentEnrollments: number;
  recentRevenue: number;
  studentGrowth: number;
  
  // Detailed stats
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
    return <div className="animate-pulse space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
         <div className="h-32 bg-slate-100 dark:bg-slate-800 rounded-2xl"></div>
         <div className="h-32 bg-slate-100 dark:bg-slate-800 rounded-2xl"></div>
         <div className="h-32 bg-slate-100 dark:bg-slate-800 rounded-2xl"></div>
         <div className="h-32 bg-slate-100 dark:bg-slate-800 rounded-2xl"></div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
         <div className="h-32 bg-slate-100 dark:bg-slate-800 rounded-2xl"></div>
         <div className="h-32 bg-slate-100 dark:bg-slate-800 rounded-2xl"></div>
         <div className="h-32 bg-slate-100 dark:bg-slate-800 rounded-2xl"></div>
         <div className="h-32 bg-slate-100 dark:bg-slate-800 rounded-2xl"></div>
      </div>
    </div>;
  }

  if (!data) return null;

  const mainStats = [
    {
      label: "Total Revenue",
      value: formatPrice(data.totalRevenue),
      icon: DollarSign,
      gradient: "from-green-500 to-emerald-600",
      iconBg: "bg-green-100 dark:bg-green-900/30",
      iconColor: "text-green-600 dark:text-green-400",
      change: data.recentRevenue > 0 ? `+${formatPrice(data.recentRevenue)} this month` : null,
      changeColor: "text-green-600 dark:text-green-400"
    },
    {
      label: "Total Students",
      value: data.totalStudents.toString(),
      icon: Users,
      gradient: "from-blue-500 to-indigo-600",
      iconBg: "bg-blue-100 dark:bg-blue-900/30",
      iconColor: "text-blue-600 dark:text-blue-400",
      change: data.studentGrowth > 0 ? `+${data.studentGrowth}% growth` : null,
      changeColor: "text-blue-600 dark:text-blue-400"
    },
    {
      label: "Total Courses",
      value: data.totalCourses.toString(),
      icon: BookOpen,
      gradient: "from-orange-500 to-red-600",
      iconBg: "bg-orange-100 dark:bg-orange-900/30",
      iconColor: "text-orange-600 dark:text-orange-400",
      change: `${data.publishedCourses} published`,
      changeColor: "text-orange-600 dark:text-orange-400"
    },
    {
      label: "Active Enrollments",
      value: data.activeEnrollments.toString(),
      icon: BarChart3,
      gradient: "from-purple-500 to-pink-600",
      iconBg: "bg-purple-100 dark:bg-purple-900/30",
      iconColor: "text-purple-600 dark:text-purple-400",
      change: data.recentEnrollments > 0 ? `+${data.recentEnrollments} this month` : null,
      changeColor: "text-purple-600 dark:text-purple-400"
    },
  ];

  const secondaryStats = [
    {
      label: "Active Students (7 days)",
      value: data.activeStudents.toString(),
      icon: Activity,
      gradient: "from-cyan-500 to-blue-600",
      iconBg: "bg-cyan-100 dark:bg-cyan-900/30",
      iconColor: "text-cyan-600 dark:text-cyan-400",
      subtitle: `${Math.round((data.activeStudents / Math.max(data.totalStudents, 1)) * 100)}% of total`
    },
    {
      label: "Completion Rate",
      value: `${data.completionRate}%`,
      icon: CheckCircle,
      gradient: "from-green-500 to-teal-600",
      iconBg: "bg-green-100 dark:bg-green-900/30",
      iconColor: "text-green-600 dark:text-green-400",
      subtitle: `${data.completedEnrollments} completed`
    },
    {
      label: "Average Progress",
      value: `${data.averageProgress}%`,
      icon: TrendingUp,
      gradient: "from-yellow-500 to-orange-600",
      iconBg: "bg-yellow-100 dark:bg-yellow-900/30",
      iconColor: "text-yellow-600 dark:text-yellow-400",
      subtitle: `${data.inProgressEnrollments} in progress`
    },
    {
      label: "Certificates Issued",
      value: data.completedEnrollments.toString(),
      icon: Award,
      gradient: "from-indigo-500 to-purple-600",
      iconBg: "bg-indigo-100 dark:bg-indigo-900/30",
      iconColor: "text-indigo-600 dark:text-indigo-400",
      subtitle: "Total achievements"
    },
  ];

  return (
    <div className="space-y-6">
      {/* Main Metrics */}
      <div>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Key Metrics</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {mainStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
            <div
              key={index}
              className="group bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl ${stat.iconBg} group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className={`w-6 h-6 ${stat.iconColor}`} />
                </div>
              </div>
              <div>
                <p className="text-sm text-slate-500 dark:text-slate-400 font-medium mb-1">
                  {stat.label}
                </p>
                <h3 className={`text-3xl font-black bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent mb-2`}>
                  {stat.value}
                </h3>
                {stat.change && (
                  <p className={`text-xs font-medium ${stat.changeColor} flex items-center gap-1`}>
                    <TrendingUp className="w-3 h-3" />
                    {stat.change}
                  </p>
                )}
              </div>
            </div>
            );
          })}
        </div>
      </div>

      {/* Secondary Metrics */}
      <div>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Performance Insights</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {secondaryStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
            <div
              key={index}
              className="group bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl ${stat.iconBg} group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className={`w-6 h-6 ${stat.iconColor}`} />
                </div>
              </div>
              <div>
                <p className="text-sm text-slate-500 dark:text-slate-400 font-medium mb-1">
                  {stat.label}
                </p>
                <h3 className={`text-3xl font-black bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent mb-2`}>
                  {stat.value}
                </h3>
                {stat.subtitle && (
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {stat.subtitle}
                  </p>
                )}
              </div>
            </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
