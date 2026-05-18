"use client";

import { useEffect, useState } from "react";
import { BarChart3, BookOpen, CheckCircle, FileText, TrendingUp } from "lucide-react";

interface CourseProgress {
  _id: string;
  courseTitle: string;
  totalEnrollments: number;
  avgProgress: number;
  completedCount: number;
}

interface ProgressStats {
  totalLessons: number;
  completedLessons: number;
  completionRate: number;
}

export default function ProgressPage() {
  const [stats, setStats] = useState<ProgressStats | null>(null);
  const [courseProgress, setCourseProgress] = useState<CourseProgress[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProgress();
  }, []);

  const fetchProgress = async () => {
    try {
      const res = await fetch("/api/admin/progress");
      if (res.ok) {
        const data = await res.json();
        setStats(data.stats);
        setCourseProgress(data.courseProgress || []);
      }
    } catch (error) {
      console.error("Failed to fetch progress:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <section className="arch-panel p-8">
        <p className="arch-kicker mb-3">Learning Analytics</p>
        <h1 className="arch-heading-md">Progress Tracking</h1>
        <p className="text-muted-foreground mt-2">
          Completion trends and per-course performance.
        </p>
      </section>

      {stats ? (
        <section className="grid gap-4 md:grid-cols-3">
          <div className="arch-panel p-5">
            <FileText className="h-5 w-5 text-primary mb-2" />
            <p className="arch-kicker">Tracked Lessons</p>
            <p className="text-2xl font-semibold">{stats.totalLessons}</p>
          </div>
          <div className="arch-panel p-5">
            <CheckCircle className="h-5 w-5 text-primary mb-2" />
            <p className="arch-kicker">Completed Lessons</p>
            <p className="text-2xl font-semibold">{stats.completedLessons}</p>
          </div>
          <div className="arch-panel p-5">
            <TrendingUp className="h-5 w-5 text-primary mb-2" />
            <p className="arch-kicker">Completion Rate</p>
            <p className="text-2xl font-semibold">{stats.completionRate}%</p>
          </div>
        </section>
      ) : null}

      <section className="arch-panel">
        <div className="arch-divider px-6 py-4">
          <h2 className="arch-heading-md">Course Progress Overview</h2>
        </div>

        {loading ? (
          <div className="p-10 text-center text-muted-foreground">Loading progress data...</div>
        ) : courseProgress.length === 0 ? (
          <div className="p-10 text-center text-muted-foreground">No progress data available yet.</div>
        ) : (
          <div className="p-6 space-y-4">
            {courseProgress.map((course) => (
              <article key={course._id} className="arch-panel p-5">
                <div className="flex items-center justify-between gap-4 mb-3">
                  <div className="inline-flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-primary" />
                    <h3 className="font-semibold">{course.courseTitle}</h3>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {course.completedCount} / {course.totalEnrollments} completed
                  </span>
                </div>

                <div className="mb-2 flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Average progress</span>
                  <span>{Math.round(course.avgProgress || 0)}%</span>
                </div>
                <div className="h-2 rounded bg-muted overflow-hidden">
                  <div
                    className="h-full bg-primary"
                    style={{ width: `${course.avgProgress || 0}%` }}
                  />
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
