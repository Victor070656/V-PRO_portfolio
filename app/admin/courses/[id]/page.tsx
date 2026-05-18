"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Edit, ListOrdered } from "lucide-react";

interface Course {
  _id: string;
  title: string;
  description: string;
  category: string;
  level: string;
  price: number;
  duration: number;
  language?: string;
  isPublished?: boolean;
  lessons?: { _id: string }[];
}

export default function AdminCourseDetailPage() {
  const params = useParams();
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!params.id) return;
    fetchCourse(params.id as string);
  }, [params.id]);

  const fetchCourse = async (id: string) => {
    try {
      const res = await fetch(`/api/admin/courses/${id}`);
      if (res.ok) {
        const data = await res.json();
        setCourse(data.course || null);
      }
    } catch (error) {
      console.error("Error fetching course:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="p-8 text-muted-foreground">Loading course...</div>;
  }

  if (!course) {
    return <div className="p-8 text-muted-foreground">Course not found.</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <Link href="/admin/courses" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-4">
          <ArrowLeft className="w-4 h-4" />
          Back to Courses
        </Link>
        <h1 className="arch-heading-md">{course.title}</h1>
      </div>

      <section className="arch-panel p-6 space-y-3">
        <p className="text-muted-foreground">{course.description}</p>
        <div className="grid gap-3 md:grid-cols-3 text-sm">
          <div><span className="arch-kicker">Category</span><p>{course.category || "—"}</p></div>
          <div><span className="arch-kicker">Level</span><p>{course.level || "—"}</p></div>
          <div><span className="arch-kicker">Duration</span><p>{course.duration || 0}h</p></div>
          <div><span className="arch-kicker">Price</span><p>${course.price || 0}</p></div>
          <div><span className="arch-kicker">Language</span><p>{course.language || "—"}</p></div>
          <div><span className="arch-kicker">Status</span><p>{course.isPublished ? "Published" : "Draft"}</p></div>
        </div>
      </section>

      <div className="flex flex-wrap gap-3">
        <Link href={`/admin/courses/${course._id}/edit`} className="arch-button">
          <Edit className="w-4 h-4" />
          Edit Course
        </Link>
        <Link href={`/admin/courses/${course._id}/lessons`} className="arch-button-secondary">
          <ListOrdered className="w-4 h-4" />
          Manage Lessons ({course.lessons?.length || 0})
        </Link>
      </div>
    </div>
  );
}
