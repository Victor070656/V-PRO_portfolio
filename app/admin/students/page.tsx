"use client";

import { useEffect, useState } from "react";
import { BookOpen, Calendar, Mail, Search, TrendingUp, Users } from "lucide-react";

interface Student {
  _id: string;
  username: string;
  email: string;
  name: string;
  enrollmentCount: number;
  avgProgress: number;
  createdAt: string;
  lastAccessedAt: string;
}

export default function StudentsPage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const res = await fetch("/api/admin/students");
      if (res.ok) {
        const data = await res.json();
        setStudents(data.students || []);
      }
    } catch (error) {
      console.error("Failed to fetch students:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredStudents = students.filter(
    (student) =>
      student.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.username?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalStudents = students.length;
  const activeStudents = students.filter(
    (s) => new Date(s.lastAccessedAt).getTime() > Date.now() - 30 * 24 * 60 * 60 * 1000
  ).length;
  const avgEnrollments =
    students.length > 0
      ? Math.round(students.reduce((sum, s) => sum + s.enrollmentCount, 0) / students.length)
      : 0;

  return (
    <div className="space-y-6">
      <section className="arch-panel p-8">
        <p className="arch-kicker mb-3">Student Records</p>
        <h1 className="arch-heading-md">Students</h1>
        <p className="text-muted-foreground mt-2">
          Manage and monitor all registered learners.
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <div className="arch-panel p-5">
          <Users className="h-5 w-5 text-primary mb-2" />
          <p className="arch-kicker">Total Students</p>
          <p className="text-3xl font-semibold">{totalStudents}</p>
        </div>
        <div className="arch-panel p-5">
          <TrendingUp className="h-5 w-5 text-primary mb-2" />
          <p className="arch-kicker">Active (30 days)</p>
          <p className="text-3xl font-semibold">{activeStudents}</p>
        </div>
        <div className="arch-panel p-5">
          <BookOpen className="h-5 w-5 text-primary mb-2" />
          <p className="arch-kicker">Avg Enrollments</p>
          <p className="text-3xl font-semibold">{avgEnrollments}</p>
        </div>
      </section>

      <section className="arch-panel p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search students..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="arch-input pl-10"
          />
        </div>
      </section>

      <section className="arch-panel overflow-hidden">
        {loading ? (
          <div className="p-10 text-center text-muted-foreground">Loading students...</div>
        ) : filteredStudents.length === 0 ? (
          <div className="p-10 text-center text-muted-foreground">
            {searchTerm ? "No matching students." : "No students registered yet."}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-border">
                <tr className="text-left">
                  <th className="px-5 py-3 arch-kicker">Student</th>
                  <th className="px-5 py-3 arch-kicker">Email</th>
                  <th className="px-5 py-3 arch-kicker">Enrollments</th>
                  <th className="px-5 py-3 arch-kicker">Progress</th>
                  <th className="px-5 py-3 arch-kicker">Last Active</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.map((student) => (
                  <tr key={student._id} className="border-b border-border/70 last:border-none">
                    <td className="px-5 py-4">
                      <p className="font-medium">{student.name}</p>
                      <p className="text-xs text-muted-foreground">@{student.username}</p>
                    </td>
                    <td className="px-5 py-4">
                      <span className="inline-flex items-center gap-2 text-sm text-muted-foreground">
                        <Mail className="w-4 h-4" />
                        {student.email}
                      </span>
                    </td>
                    <td className="px-5 py-4">{student.enrollmentCount}</td>
                    <td className="px-5 py-4">{student.avgProgress}%</td>
                    <td className="px-5 py-4">
                      <span className="inline-flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="w-4 h-4" />
                        {new Date(student.lastAccessedAt).toLocaleDateString()}
                      </span>
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
