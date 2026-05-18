"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Award, BookOpen, CheckCircle, Clock, Loader2, TrendingUp } from "lucide-react";
import Link from "next/link";

interface Course {
  _id: string;
  title: string;
  description: string;
  thumbnail?: string;
  duration?: string;
}

interface Enrollment {
  course: Course;
  progress: number;
  completedLessons: string[];
  lastAccessedAt: string;
  certificateIssued: boolean;
}

export default function StudentDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalCourses: 0,
    completedCourses: 0,
    totalHours: 0,
    averageProgress: 0,
  });

  useEffect(() => {
    if (status === "loading") return;
    if (!session) {
      router.push("/auth/signin");
      return;
    }
    fetchEnrollments();
  }, [session, status, router]);

  const fetchEnrollments = async () => {
    try {
      const response = await fetch("/api/student/courses");
      if (response.ok) {
        const data = await response.json();
        setEnrollments(data.enrollments || []);

        const completedCourses =
          data.enrollments?.filter((e: Enrollment) => e.progress === 100).length || 0;
        const totalProgress =
          data.enrollments?.reduce((sum: number, e: Enrollment) => sum + e.progress, 0) || 0;
        const averageProgress =
          data.enrollments?.length > 0 ? totalProgress / data.enrollments.length : 0;

        setStats({
          totalCourses: data.enrollments?.length || 0,
          completedCourses,
          totalHours: 45,
          averageProgress: Math.round(averageProgress),
        });
      }
    } catch (error) {
      console.error("Failed to fetch enrollments:", error);
    } finally {
      setLoading(false);
    }
  };

  if (status === "loading" || loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Loader2 className="w-4 h-4 animate-spin" />
          Loading your dashboard...
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <section className="arch-panel p-8">
        <p className="arch-kicker mb-3">Student Dashboard</p>
        <h1 className="arch-heading-md">
          Welcome back, {session?.user?.name?.split(" ")[0] || "Student"}.
        </h1>
        <p className="text-muted-foreground mt-2">
          Continue your learning journey and monitor outcomes.
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={BookOpen} label="Total Courses" value={stats.totalCourses.toString()} />
        <StatCard icon={CheckCircle} label="Completed" value={stats.completedCourses.toString()} />
        <StatCard icon={Clock} label="Learning Hours" value={stats.totalHours.toString()} />
        <StatCard icon={TrendingUp} label="Avg Progress" value={`${stats.averageProgress}%`} />
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="arch-heading-md">Continue Learning</h2>
          <Link href="/student/courses" className="text-primary hover:underline">
            View all
          </Link>
        </div>

        {enrollments.length === 0 ? (
          <div className="arch-panel p-10 text-center">
            <p className="text-muted-foreground mb-4">No enrolled courses yet.</p>
            <Link href="/courses" className="arch-button">
              Browse Courses
            </Link>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {enrollments.slice(0, 6).map((enrollment) => (
              <Link
                key={enrollment.course._id}
                href={`/courses/${enrollment.course._id}/learn`}
                className="arch-panel overflow-hidden hover:border-primary transition-colors"
              >
                <div className="h-40 bg-muted">
                  {enrollment.course.thumbnail ? (
                    <img
                      src={enrollment.course.thumbnail}
                      alt={enrollment.course.title}
                      className="w-full h-full object-cover"
                    />
                  ) : null}
                </div>
                <div className="p-5">
                  <h3 className="font-semibold line-clamp-2 mb-2">{enrollment.course.title}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                    {enrollment.course.description}
                  </p>
                  <div className="mb-3">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-muted-foreground">Progress</span>
                      <span>{enrollment.progress}%</span>
                    </div>
                    <div className="h-2 bg-muted rounded overflow-hidden">
                      <div className="h-full bg-primary" style={{ width: `${enrollment.progress}%` }} />
                    </div>
                  </div>
                  {enrollment.certificateIssued ? (
                    <span className="inline-flex items-center gap-1 text-xs text-green-300">
                      <Award className="w-3 h-3" />
                      Certificate issued
                    </span>
                  ) : null}
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

function StatCard({
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
      <Icon className="h-5 w-5 text-primary mb-2" />
      <p className="arch-kicker">{label}</p>
      <p className="text-2xl font-semibold">{value}</p>
    </article>
  );
}
