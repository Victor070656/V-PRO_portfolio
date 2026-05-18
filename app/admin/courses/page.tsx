"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { BookOpen, Calendar, Edit, Eye, Loader2, Plus, Search, Trash2 } from "lucide-react";

interface Course {
  _id: string;
  title: string;
  description: string;
  price: number;
  isPublished: boolean;
  createdAt: string;
  thumbnail?: string;
}

export default function AdminCoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [togglingId, setTogglingId] = useState<string | null>(null);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const res = await fetch("/api/admin/courses");
      if (res.ok) {
        const data = await res.json();
        setCourses(data.courses || []);
      }
    } catch (error) {
      console.error("Failed to fetch courses:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this course?")) return;

    try {
      const res = await fetch(`/api/admin/courses/${id}`, { method: "DELETE" });
      if (res.ok) {
        setCourses(courses.filter((c) => c._id !== id));
      } else {
        alert("Failed to delete course");
      }
    } catch (error) {
      console.error("Error deleting course:", error);
      alert("Error deleting course");
    }
  };

  const handleToggleStatus = async (id: string, currentStatus: boolean) => {
    const newStatus = !currentStatus;
    setTogglingId(id);

    try {
      const res = await fetch(`/api/admin/courses/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isPublished: newStatus }),
      });

      if (res.ok) {
        setCourses(courses.map((c) => (c._id === id ? { ...c, isPublished: newStatus } : c)));
      } else {
        alert("Failed to update course status");
      }
    } catch (error) {
      console.error("Error updating course status:", error);
      alert("Error updating course status");
    } finally {
      setTogglingId(null);
    }
  };

  const filteredCourses = courses.filter((course) =>
    course?.title?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const publishedCount = courses.filter((c) => c.isPublished).length;
  const draftCount = courses.filter((c) => !c.isPublished).length;

  return (
    <div className="space-y-6">
      <section className="arch-panel p-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="arch-kicker mb-3">Course Management</p>
            <h1 className="arch-heading-md">Courses</h1>
            <p className="text-muted-foreground mt-2">
              Create, publish, and maintain learning content.
            </p>
          </div>
          <Link href="/admin/courses/create" className="arch-button">
            <Plus className="w-4 h-4" />
            Create Course
          </Link>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <div className="arch-panel p-5">
          <BookOpen className="h-5 w-5 text-primary mb-2" />
          <p className="arch-kicker">Total</p>
          <p className="text-3xl font-semibold">{courses.length}</p>
        </div>
        <div className="arch-panel p-5">
          <Eye className="h-5 w-5 text-primary mb-2" />
          <p className="arch-kicker">Published</p>
          <p className="text-3xl font-semibold">{publishedCount}</p>
        </div>
        <div className="arch-panel p-5">
          <Edit className="h-5 w-5 text-primary mb-2" />
          <p className="arch-kicker">Drafts</p>
          <p className="text-3xl font-semibold">{draftCount}</p>
        </div>
      </section>

      <section className="arch-panel p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search courses..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="arch-input pl-10"
          />
        </div>
      </section>

      {loading ? (
        <div className="arch-panel p-10 text-center text-muted-foreground">
          <Loader2 className="w-5 h-5 animate-spin mx-auto mb-2" />
          Loading courses...
        </div>
      ) : filteredCourses.length === 0 ? (
        <div className="arch-panel p-10 text-center text-muted-foreground">
          {searchTerm ? "No courses match your search." : "No courses yet."}
        </div>
      ) : (
        <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredCourses.map((course) => (
            <article key={course._id} className="arch-panel overflow-hidden">
              <div className="h-40 bg-muted">
                {course.thumbnail ? (
                  <img src={course.thumbnail} alt={course.title} className="h-full w-full object-cover" />
                ) : null}
              </div>
              <div className="p-5 space-y-4">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-semibold line-clamp-2">{course.title}</h3>
                  <button
                    onClick={() => handleToggleStatus(course._id, course.isPublished)}
                    disabled={togglingId === course._id}
                    className={`rounded px-2 py-1 text-xs border ${
                      course.isPublished
                        ? "border-green-500/40 text-green-300"
                        : "border-yellow-500/40 text-yellow-300"
                    }`}
                  >
                    {togglingId === course._id
                      ? "..."
                      : course.isPublished
                        ? "Published"
                        : "Draft"}
                  </button>
                </div>
                <p className="text-sm text-muted-foreground line-clamp-2">{course.description}</p>
                <div className="flex items-center justify-between text-sm">
                  <span>${course.price || 0}</span>
                  <span className="inline-flex items-center gap-1 text-muted-foreground">
                    <Calendar className="w-3 h-3" />
                    {new Date(course.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <Link href={`/admin/courses/${course._id}/lessons`} className="arch-button-secondary !px-2 !py-2 text-xs">
                    Lessons
                  </Link>
                  <Link href={`/admin/courses/${course._id}/edit`} className="arch-button-secondary !px-2 !py-2 text-xs">
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(course._id)}
                    className="arch-button-secondary !px-2 !py-2 text-xs text-red-300 border-red-500/40 hover:border-red-300"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </section>
      )}
    </div>
  );
}
