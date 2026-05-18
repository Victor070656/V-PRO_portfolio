"use client";
import { Course } from "@/lib/models/course";
import { ArrowRight, Clock, Star } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface CourseCardProps {
  course: Course;
  viewMode?: "grid" | "list";
}

export default function CourseCard({
  course,
  viewMode = "grid",
}: CourseCardProps) {
  if (viewMode === "list") {
    return (
      <Link href={`/courses/${course._id}`} className="block">
        <article className="arch-panel overflow-hidden transition-colors hover:border-primary">
          <div className="flex flex-col md:flex-row">
            <div className="relative h-48 md:h-auto md:w-72 bg-muted">
              {course.thumbnail ? (
                <Image src={course.thumbnail} alt={course.title} fill className="object-cover" />
              ) : null}
            </div>

            <div className="flex-1 p-6">
              <p className="arch-kicker">{course.category || "General"}</p>
              <h3 className="mt-2 text-2xl font-semibold line-clamp-2">{course.title}</h3>
              <p className="mt-3 text-muted-foreground line-clamp-2">{course.description}</p>

              <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <span className="inline-flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  {course.duration || "Self-paced"}
                </span>
                <span className="inline-flex items-center gap-2">
                  <Star className="h-4 w-4 text-primary" />
                  {course.rating || "New"}
                </span>
              </div>

              <span className="mt-5 inline-flex items-center gap-2 text-primary">
                View Course
                <ArrowRight className="h-4 w-4" />
              </span>
            </div>
          </div>
        </article>
      </Link>
    );
  }

  return (
    <Link href={`/courses/${course._id}`} className="block">
      <article className="arch-panel overflow-hidden transition-colors hover:border-primary">
        <div className="relative h-48 bg-muted">
          {course.thumbnail ? (
            <Image src={course.thumbnail} alt={course.title} fill className="object-cover" />
          ) : null}
        </div>

        <div className="p-5">
          <p className="arch-kicker">{course.category || "General"}</p>
          <h3 className="mt-2 text-xl font-semibold line-clamp-2">{course.title}</h3>
          <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{course.description}</p>

          <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-2">
              <Clock className="h-4 w-4" />
              {course.duration || "Self-paced"}
            </span>
            <span className="inline-flex items-center gap-2">
              <Star className="h-4 w-4 text-primary" />
              {course.rating || "New"}
            </span>
          </div>

          <span className="mt-5 inline-flex items-center gap-2 text-primary">
            Enroll
            <ArrowRight className="h-4 w-4" />
          </span>
        </div>
      </article>
    </Link>
  );
}
