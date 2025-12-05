"use client";
import { Course } from "@/lib/models/course";
import { Clock, Users, Star, BookOpen, ArrowRight } from "lucide-react";
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
      <Link href={`/courses/${course._id}`}>
        <div className="group bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 hover:border-indigo-500 dark:hover:border-indigo-500 transition-all duration-300 hover:shadow-2xl flex flex-col md:flex-row">
          {/* Image */}
          <div className="relative md:w-80 h-48 md:h-auto overflow-hidden bg-gradient-to-br from-indigo-500 to-purple-600">
            {course.thumbnail ? (
              <Image
                src={course.thumbnail}
                alt={course.title}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <BookOpen className="w-16 h-16 text-white/50" />
              </div>
            )}
            <div className="absolute top-4 left-4">
              <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-indigo-600 rounded-full text-xs font-semibold">
                {course.category || "General"}
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 p-6 flex flex-col justify-between">
            <div>
              <h3 className="text-2xl font-bold mb-3 text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                {course.title}
              </h3>
              <p className="text-slate-600 dark:text-slate-300 mb-4 line-clamp-2">
                {course.description}
              </p>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-6 text-sm text-slate-600 dark:text-slate-400">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{course.duration || "Self-paced"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  <span>{course.students || 0} students</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span>{course.rating || "New"}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-semibold group-hover:gap-4 transition-all">
                <span>View Course</span>
                <ArrowRight className="w-5 h-5" />
              </div>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link href={`/courses/${course._id}`}>
      <div className="group bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 hover:border-indigo-500 dark:hover:border-indigo-500 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
        {/* Image */}
        <div className="relative h-48 overflow-hidden bg-gradient-to-br from-indigo-500 to-purple-600">
          {course.thumbnail ? (
            <Image
              src={course.thumbnail}
              alt={course.title}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <BookOpen className="w-16 h-16 text-white/50" />
            </div>
          )}

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

          {/* Category Badge */}
          <div className="absolute top-4 left-4">
            <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-indigo-600 rounded-full text-xs font-semibold">
              {course.category || "General"}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-2">
            {course.title}
          </h3>

          <p className="text-slate-600 dark:text-slate-300 text-sm mb-4 line-clamp-2">
            {course.description}
          </p>

          {/* Stats */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-800 text-sm text-slate-600 dark:text-slate-400">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>{course.duration || "Self-paced"}</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span>{course.rating || "New"}</span>
            </div>
          </div>

          {/* CTA */}
          <button className="mt-4 w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold cursor-pointer transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 flex items-center justify-center gap-2">
            <span>Enroll Now</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </Link>
  );
}
