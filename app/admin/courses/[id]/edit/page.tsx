"use client";

import { useEffect, useState } from "react";
import CourseForm from "@/components/admin/CourseForm";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";
import { useParams } from "next/navigation";

export default function EditCoursePage() {
  const params = useParams();
  const [course, setCourse] = useState<any>(null);
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
    return <div className="p-8 text-center text-muted-foreground">Loading...</div>;
  }

  if (!course) {
    return <div className="p-8 text-center text-muted-foreground">Course not found</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <Link href="/admin/courses" className="text-muted-foreground hover:text-primary flex items-center gap-2 mb-4">
          <FaArrowLeft /> Back to Courses
        </Link>
        <h1 className="arch-heading-md">Edit Course</h1>
      </div>

      <CourseForm initialData={course} isEdit={true} />
    </div>
  );
}
