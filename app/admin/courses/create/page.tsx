"use client";

import CourseForm from "@/components/admin/CourseForm";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";

export default function CreateCoursePage() {
  return (
    <div className="space-y-6">
      <div className="mb-8">
        <Link href="/admin/courses" className="text-muted-foreground hover:text-primary flex items-center gap-2 mb-4">
          <FaArrowLeft /> Back to Courses
        </Link>
        <h1 className="arch-heading-md">Create New Course</h1>
      </div>

      <CourseForm />
    </div>
  );
}
