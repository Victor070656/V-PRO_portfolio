"use client";

import CourseForm from "@/components/admin/CourseForm";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";

export default function CreateCoursePage() {
  return (
    <div className="p-8 overflow-y-auto h-full">
      <div className="mb-8">
        <Link href="/admin/courses" className="text-[var(--text-secondary)] hover:text-[var(--accent-color)] flex items-center gap-2 mb-4">
          <FaArrowLeft /> Back to Courses
        </Link>
        <h1 className="text-3xl font-bold text-[var(--text-primary)]">Create New Course</h1>
      </div>

      <CourseForm />
    </div>
  );
}
