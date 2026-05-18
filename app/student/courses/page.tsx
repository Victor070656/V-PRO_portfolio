"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Award, BookOpen, Clock, Filter, Loader2, Search } from "lucide-react";
import Link from "next/link";

interface Course {
  _id: string;
  title: string;
  description: string;
  thumbnail?: string;
  duration?: string;
  category: string;
}

interface Enrollment {
  course: Course;
  progress: number;
  completedLessons: string[];
  lastAccessedAt: string;
  certificateIssued: boolean;
}

export default function MyCoursesPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState<"all" | "in-progress" | "completed">("all");

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
      }
    } catch (error) {
      console.error("Failed to fetch enrollments:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredEnrollments = enrollments.filter((enrollment) => {
    const matchesSearch = enrollment.course.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    if (filter === "completed") return matchesSearch && enrollment.progress === 100;
    if (filter === "in-progress") return matchesSearch && enrollment.progress < 100;
    return matchesSearch;
  });

  if (status === "loading" || loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="inline-flex items-center gap-2 text-muted-foreground">
          <Loader2 className="w-4 h-4 animate-spin" />
          Loading your courses...
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <section className="arch-panel p-8">
        <p className="arch-kicker mb-3">Student Courses</p>
        <h1 className="arch-heading-md">My Courses</h1>
        <p className="text-muted-foreground mt-2">
          {enrollments.length} {enrollments.length === 1 ? "course" : "courses"} enrolled.
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-[1fr_auto]">
        <div className="arch-panel p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search your courses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="arch-input pl-10"
            />
          </div>
        </div>
        <div className="arch-panel p-4">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-muted-foreground" />
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value as "all" | "in-progress" | "completed")}
              className="arch-input py-2"
            >
              <option value="all">All Courses</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </div>
      </section>

      {filteredEnrollments.length === 0 ? (
        <section className="arch-panel p-10 text-center">
          <p className="text-muted-foreground mb-4">
            {searchTerm ? "No matching courses." : "No courses enrolled yet."}
          </p>
          <Link href="/courses" className="arch-button">
            Browse Courses
          </Link>
        </section>
      ) : (
        <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredEnrollments.map((enrollment) => (
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
                    className="h-full w-full object-cover"
                  />
                ) : null}
              </div>
              <div className="p-5">
                <span className="arch-chip mb-2">{enrollment.course.category}</span>
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
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span className="inline-flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {enrollment.course.duration || "Self-paced"}
                  </span>
                  {enrollment.certificateIssued ? (
                    <span className="inline-flex items-center gap-1 text-green-300">
                      <Award className="w-3 h-3" />
                      Certificate
                    </span>
                  ) : null}
                </div>
              </div>
            </Link>
          ))}
        </section>
      )}
    </div>
  );
}
