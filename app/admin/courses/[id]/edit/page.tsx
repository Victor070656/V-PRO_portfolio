"use client";

import { useState, useEffect } from "react";
import CourseForm from "@/components/admin/CourseForm";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";
import { useParams } from "next/navigation";

export default function EditCoursePage() {
  const params = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (params.id) {
      fetchCourse(params.id as string);
    }
  }, [params.id]);

  const fetchCourse = async (id: string) => {
    try {
      const res = await fetch(`/api/admin/courses/${id}`);
      if (res.ok) {
        const data = await res.json();
        setCourse(data.course);
      } else {
        alert("Failed to fetch course");
      }
    } catch (error) {
      console.error("Error fetching course:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="p-8 text-center">Loading...</div>;
  }

  if (!course) {
    return <div className="p-8 text-center">Course not found</div>;
  }

  return (
    <div className="p-8 overflow-y-auto h-full">
      <div className="mb-8">
        <Link href="/admin/courses" className="text-[var(--text-secondary)] hover:text-[var(--accent-color)] flex items-center gap-2 mb-4">
          <FaArrowLeft /> Back to Courses
        </Link>
        <h1 className="text-3xl font-bold text-[var(--text-primary)]">Edit Course</h1>
      </div>

      <CourseForm initialData={course} isEdit={true} />
    </div>
  );
}
