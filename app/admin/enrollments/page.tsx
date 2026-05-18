"use client";

import { useEffect, useState } from "react";
import { BookOpen, Calendar, GraduationCap, Search, TrendingUp } from "lucide-react";

interface Enrollment {
  _id: string;
  studentName: string;
  studentEmail: string;
  courseTitle: string;
  progress: number;
  completedLessons: number;
  enrolledAt: string;
  lastAccessedAt: string;
}

export default function EnrollmentsPage() {
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchEnrollments();
  }, []);

  const fetchEnrollments = async () => {
    try {
      const res = await fetch("/api/admin/enrollments");
      if (res.ok) {
        const data = await res.json();
        setEnrollments(data.enrollments || []);
      }
    } catch (error) {
      console.error("Failed to fetch enrollments:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredEnrollments = enrollments.filter(
    (enrollment) =>
      enrollment.studentName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      enrollment.studentEmail?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      enrollment.courseTitle?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalEnrollments = enrollments.length;
  const activeEnrollments = enrollments.filter(
    (e) => new Date(e.lastAccessedAt).getTime() > Date.now() - 7 * 24 * 60 * 60 * 1000
  ).length;
  const completedEnrollments = enrollments.filter((e) => e.progress >= 100).length;

  return (
    <div className="space-y-6">
      <section className="arch-panel p-8">
        <p className="arch-kicker mb-3">Learning Activity</p>
        <h1 className="arch-heading-md">Enrollments</h1>
        <p className="text-muted-foreground mt-2">
          Observe course participation and completion.
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <div className="arch-panel p-5">
          <GraduationCap className="h-5 w-5 text-primary mb-2" />
          <p className="arch-kicker">Total Enrollments</p>
          <p className="text-2xl font-semibold">{totalEnrollments}</p>
        </div>
        <div className="arch-panel p-5">
          <TrendingUp className="h-5 w-5 text-primary mb-2" />
          <p className="arch-kicker">Active (7 days)</p>
          <p className="text-2xl font-semibold">{activeEnrollments}</p>
        </div>
        <div className="arch-panel p-5">
          <BookOpen className="h-5 w-5 text-primary mb-2" />
          <p className="arch-kicker">Completed</p>
          <p className="text-2xl font-semibold">{completedEnrollments}</p>
        </div>
      </section>

      <section className="arch-panel p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search enrollments..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="arch-input pl-10"
          />
        </div>
      </section>

      <section className="arch-panel overflow-hidden">
        {loading ? (
          <div className="p-10 text-center text-muted-foreground">Loading enrollments...</div>
        ) : filteredEnrollments.length === 0 ? (
          <div className="p-10 text-center text-muted-foreground">
            {searchTerm ? "No matching enrollments." : "No enrollments yet."}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-border">
                <tr className="text-left">
                  <th className="px-5 py-3 arch-kicker">Student</th>
                  <th className="px-5 py-3 arch-kicker">Course</th>
                  <th className="px-5 py-3 arch-kicker">Progress</th>
                  <th className="px-5 py-3 arch-kicker">Lessons</th>
                  <th className="px-5 py-3 arch-kicker">Enrolled</th>
                  <th className="px-5 py-3 arch-kicker">Last Active</th>
                </tr>
              </thead>
              <tbody>
                {filteredEnrollments.map((enrollment) => (
                  <tr key={enrollment._id} className="border-b border-border/70 last:border-none">
                    <td className="px-5 py-4">
                      <p className="font-medium">{enrollment.studentName || "Unknown"}</p>
                      <p className="text-xs text-muted-foreground">{enrollment.studentEmail}</p>
                    </td>
                    <td className="px-5 py-4">{enrollment.courseTitle}</td>
                    <td className="px-5 py-4">{enrollment.progress || 0}%</td>
                    <td className="px-5 py-4">{enrollment.completedLessons} completed</td>
                    <td className="px-5 py-4">
                      <span className="inline-flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="w-4 h-4" />
                        {new Date(enrollment.enrolledAt).toLocaleDateString()}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-sm text-muted-foreground">
                      {new Date(enrollment.lastAccessedAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
