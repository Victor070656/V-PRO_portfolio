"use client";

import { useState, useEffect } from "react";
import {
  Search,
  Users,
  BookOpen,
  Clock,
  TrendingUp,
  Award,
  Mail,
  Ban,
  ArrowUpDown,
  X,
} from "lucide-react";
import Header from "@/components/admin/Header";

interface Student {
  _id: string;
  username: string;
  email: string;
  name?: string;
  role: string;
  profile?: {
    firstName?: string;
    lastName?: string;
    avatar?: string;
    phone?: string;
    country?: string;
    bio?: string;
  };
  preferences?: {
    notifications: boolean;
    emailUpdates: boolean;
    language: string;
  };
  createdAt: string;
  lastLoginAt?: string;
  totalSpent?: number;
  totalCourses?: number;
  completionRate?: number;
}

interface Course {
  _id: string;
  title: string;
  category: string;
  level: string;
  price: number;
  thumbnail?: string;
  isPublished: boolean;
}

interface Enrollment {
  _id: string;
  userId: string;
  courseId: Course;
  enrolledAt: string;
  completedAt?: string;
  progress: number;
  status: "active" | "completed" | "paused";
}

export default function StudentsManagementPage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [filteredStudents, setFilteredStudents] = useState<Student[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState("");
  const [sortBy, setSortBy] = useState("createdAt");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  // Fetch students + enrollments from API
  const fetchStudents = async () => {
    try {
      setIsLoading(true);
      setError("");

      const response = await fetch("/api/admin/students");

      if (!response.ok) {
        if (response.status === 401) {
          setError("Access denied");
        } else {
          setError("Failed to fetch students");
        }
        setIsLoading(false);
        return;
      }

      const data = await response.json();

      setStudents(data.students || []);
      setEnrollments(data.enrollments || []);
      setFilteredStudents(data.students || []);
      setIsLoading(false);
    } catch (err) {
      console.error("Error fetching students:", err);
      setError("Failed to fetch students");
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const getStudentEnrollmentCount = (studentId: string) =>
    enrollments.filter((e) => e.userId === studentId).length;

  // Filter and sort students
  useEffect(() => {
    let filtered = [...students];

    // Search filter
    if (searchTerm) {
      const lower = searchTerm.toLowerCase();
      filtered = filtered.filter((student) => {
        const fullName = `${student.profile?.firstName || ""} ${
          student.profile?.lastName || ""
        }`.toLowerCase();

        return (
          student.username.toLowerCase().includes(lower) ||
          student.email.toLowerCase().includes(lower) ||
          fullName.includes(lower)
        );
      });
    }

    // Role filter
    if (filterRole) {
      filtered = filtered.filter((student) => student.role === filterRole);
    }

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.username.localeCompare(b.username);
        case "email":
          return a.email.localeCompare(b.email);
        case "createdAt":
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
        case "lastLogin":
          return (
            (b.lastLoginAt ? new Date(b.lastLoginAt).getTime() : 0) -
            (a.lastLoginAt ? new Date(a.lastLoginAt).getTime() : 0)
          );
        case "enrollments": {
          const aCount = getStudentEnrollmentCount(a._id);
          const bCount = getStudentEnrollmentCount(b._id);
          return bCount - aCount;
        }
        case "spent":
          return (b.totalSpent ?? 0) - (a.totalSpent ?? 0);
        case "completion":
          return (b.completionRate ?? 0) - (a.completionRate ?? 0);
        default:
          return 0;
      }
    });

    setFilteredStudents(filtered);
  }, [students, searchTerm, filterRole, sortBy, enrollments]);

  const selectedStudentEnrollments = selectedStudent
    ? enrollments.filter((e) => e.userId === selectedStudent._id)
    : [];

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--background-color)]">
      <Header />

      <main className="p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Page Header */}
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-[var(--text-primary)]">
              Student Management
            </h1>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
                  <Users className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {students.length}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Total Students
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-green-100 dark:bg-green-900 rounded-lg">
                  <BookOpen className="w-8 h-8 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {enrollments.length}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Total Enrollments
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-lg">
                  <TrendingUp className="w-8 h-8 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    ₦
                    {students
                      .reduce(
                        (sum, student) => sum + (student.totalSpent ?? 0),
                        0
                      )
                      .toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Total Revenue
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-yellow-100 dark:bg-yellow-900 rounded-lg">
                  <Clock className="w-8 h-8 text-yellow-600 dark:text-yellow-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {students.length > 0
                      ? Math.round(
                          students.reduce(
                            (sum, student) =>
                              sum + (student.completionRate ?? 0),
                            0
                          ) / students.length
                        )
                      : 0}
                    %
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Avg. Completion Rate
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-red-100 dark:bg-red-900 rounded-lg">
                  <Award className="w-8 h-8 text-red-600 dark:text-red-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {
                      students.filter(
                        (s) =>
                          s.lastLoginAt &&
                          new Date(s.lastLoginAt).getTime() >
                            Date.now() - 7 * 24 * 60 * 60 * 1000
                      ).length
                    }
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Active This Week
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Search, Filters & Actions */}
          <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg">
            <div className="flex flex-col lg:flex-row lg:items-center gap-4">
              {/* Search */}
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search students..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Filters & Export */}
              <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
                <div className="relative">
                  <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <select
                    value={filterRole}
                    onChange={(e) => setFilterRole(e.target.value)}
                    className="appearance-none pl-10 pr-8 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">All Roles</option>
                    <option value="student">Students</option>
                    <option value="instructor">Instructors</option>
                    <option value="admin">Admins</option>
                  </select>
                </div>

                <div className="relative">
                  <ArrowUpDown className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="appearance-none pl-10 pr-8 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="createdAt">Join Date</option>
                    <option value="name">Name</option>
                    <option value="email">Email</option>
                    <option value="lastLogin">Last Login</option>
                    <option value="enrollments">Enrollments</option>
                    <option value="spent">Amount Spent</option>
                    <option value="completion">Completion Rate</option>
                  </select>
                </div>

                <button
                  onClick={() => {
                    /* Export functionality */
                  }}
                  className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  Export Students
                </button>
              </div>
            </div>

            <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
              {filteredStudents.length} of {students.length} students
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 p-4 rounded-lg">
              {error}
            </div>
          )}

          {/* Students Table */}
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-900">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Student
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Role
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Enrollments
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Spent
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Completion
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Last Login
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-slate-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {filteredStudents.map((student) => (
                    <tr
                      key={student._id}
                      className="hover:bg-gray-50 dark:hover:bg-gray-700"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center">
                            <span className="text-lg font-semibold text-gray-700 dark:text-gray-300">
                              {student.profile?.firstName?.[0]?.toUpperCase() ||
                                student.username[0]?.toUpperCase()}
                            </span>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900 dark:text-white">
                              {student.profile?.firstName || student.username}
                            </div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">
                              @{student.username}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900 dark:text-white">
                          {student.email}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full ${
                            student.role === "admin"
                              ? "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
                              : student.role === "instructor"
                              ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                              : "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                          }`}
                        >
                          {student.role}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900 dark:text-white">
                          {getStudentEnrollmentCount(student._id)}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900 dark:text-white">
                          ₦{(student.totalSpent ?? 0).toLocaleString()}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className="text-sm text-gray-900 dark:text-white">
                            {student.completionRate ?? 0}%
                          </div>
                          {student.completionRate &&
                            student.completionRate >= 70 && (
                              <div className="ml-2 px-2 py-1 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 text-xs rounded-full">
                                Active
                              </div>
                            )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {student.lastLoginAt
                            ? new Date(student.lastLoginAt).toLocaleDateString()
                            : "Never"}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setSelectedStudent(student)}
                            className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
                          >
                            View Profile
                          </button>

                          {student.role === "admin" ? null : (
                            <button
                              onClick={() => {
                                /* Block student functionality */
                              }}
                              className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300 font-medium"
                            >
                              <Ban className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                  {filteredStudents.length === 0 && (
                    <tr>
                      <td
                        colSpan={8}
                        className="px-6 py-8 text-center text-sm text-gray-500 dark:text-gray-400"
                      >
                        No students found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>

      {/* Student Details Modal */}
      {selectedStudent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-slate-800 rounded-xl max-w-4xl w-full max-h-[80vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-xl font-bold text-[var(--text-primary)]">
                  Student Profile
                </h2>
                <button
                  onClick={() => setSelectedStudent(null)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Profile Information */}
                <div>
                  <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-4">
                    Profile Information
                  </h3>

                  <div className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center">
                        <span className="text-xl font-bold text-gray-700 dark:text-gray-300">
                          {selectedStudent.profile?.firstName?.[0]?.toUpperCase() ||
                            selectedStudent.username[0]?.toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <div className="text-lg font-medium text-[var(--text-primary)]">
                          {selectedStudent.profile?.firstName ||
                            selectedStudent.username}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          @{selectedStudent.username}
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                          First Name
                        </label>
                        <div className="mt-1 text-sm text-gray-900 dark:text-white">
                          {selectedStudent.profile?.firstName || "-"}
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                          Last Name
                        </label>
                        <div className="mt-1 text-sm text-gray-900 dark:text-white">
                          {selectedStudent.profile?.lastName || "-"}
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Email
                      </label>
                      <div className="mt-1 text-sm text-gray-900 dark:text-white">
                        {selectedStudent.email}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Phone
                      </label>
                      <div className="mt-1 text-sm text-gray-900 dark:text-white">
                        {selectedStudent.profile?.phone || "-"}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Country
                      </label>
                      <div className="mt-1 text-sm text-gray-900 dark:text-white">
                        {selectedStudent.profile?.country || "-"}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Bio
                      </label>
                      <div className="mt-1 text-sm text-gray-900 dark:text-white">
                        {selectedStudent.profile?.bio || "-"}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Member Since
                      </label>
                      <div className="mt-1 text-sm text-gray-900 dark:text-white">
                        {new Date(
                          selectedStudent.createdAt
                        ).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Enrollments */}
                <div>
                  <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-4">
                    Enrollments
                  </h3>

                  <div className="space-y-3">
                    {selectedStudentEnrollments.length === 0 ? (
                      <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                        No enrollments found
                      </div>
                    ) : (
                      selectedStudentEnrollments.map((enrollment) => (
                        <div
                          key={enrollment._id}
                          className="border border-gray-200 dark:border-gray-700 rounded-lg p-4"
                        >
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <h4 className="text-lg font-medium text-[var(--text-primary)]">
                                {enrollment.courseId?.title || "Unknown Course"}
                              </h4>
                              <div className="text-sm text-gray-500 dark:text-gray-400">
                                {enrollment.courseId?.category} •{" "}
                                {enrollment.courseId?.level}
                              </div>
                            </div>
                            <div className="text-sm">
                              <span
                                className={`inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full ${
                                  enrollment.status === "completed"
                                    ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                                    : enrollment.status === "paused"
                                    ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                                    : "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                                }`}
                              >
                                {enrollment.status}
                              </span>
                            </div>
                          </div>

                          <div className="mb-2">
                            <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                              Enrolled:{" "}
                              {new Date(
                                enrollment.enrolledAt
                              ).toLocaleDateString()}
                            </div>
                            {enrollment.completedAt && (
                              <div className="text-sm text-gray-600 dark:text-gray-400">
                                Completed:{" "}
                                {new Date(
                                  enrollment.completedAt
                                ).toLocaleDateString()}
                              </div>
                            )}

                            <div className="text-sm text-gray-600 dark:text-gray-400">
                              Progress: {enrollment.progress || 0}%
                            </div>

                            {enrollment.progress > 0 && (
                              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-2">
                                <div
                                  className="bg-blue-600 dark:bg-blue-500 h-2 rounded-full"
                                  style={{ width: `${enrollment.progress}%` }}
                                />
                              </div>
                            )}
                          </div>

                          <div className="flex gap-2">
                            <button
                              onClick={() => {
                                /* View course details */
                              }}
                              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors"
                            >
                              View Course
                            </button>

                            {enrollment.status !== "completed" && (
                              <button
                                onClick={() => {
                                  /* Mark as completed */
                                }}
                                className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg transition-colors"
                              >
                                Mark Complete
                              </button>
                            )}
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>

                {/* Preferences */}
                <div>
                  <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-4">
                    Preferences
                  </h3>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                          Email Notifications
                        </label>
                        <div className="mt-1 text-sm text-gray-900 dark:text-white">
                          {selectedStudent.preferences?.notifications
                            ? "Enabled"
                            : "Disabled"}
                        </div>
                      </div>
                      <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm">
                        Toggle
                      </button>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                          Email Updates
                        </label>
                        <div className="mt-1 text-sm text-gray-900 dark:text-white">
                          {selectedStudent.preferences?.emailUpdates
                            ? "Enabled"
                            : "Disabled"}
                        </div>
                      </div>
                      <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm">
                        Toggle
                      </button>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Language
                      </label>
                      <div className="mt-1 text-sm text-gray-900 dark:text-white">
                        {selectedStudent.preferences?.language || "English"}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
