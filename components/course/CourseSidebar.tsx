"use client";

import { Lesson } from "@/lib/models/course";
import { CheckCircle, PlayCircle, Lock } from "lucide-react";
import Link from "next/link";

interface CourseSidebarProps {
  courseId: string;
  lessons: Lesson[];
  currentLessonId: string;
  completedLessonIds: string[];
  title: string;
}

export default function CourseSidebar({
  courseId,
  lessons,
  currentLessonId,
  completedLessonIds,
  title,
}: CourseSidebarProps) {
  return (
    <div className="w-full md:w-80 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col h-full">
      <div className="p-4 border-b border-slate-200 dark:border-slate-800">
        <h2 className="font-bold text-slate-900 dark:text-white truncate" title={title}>
          {title}
        </h2>
        <div className="mt-2 text-sm text-slate-500 dark:text-slate-400">
          {completedLessonIds.length} / {lessons.length} lessons completed
        </div>
        <div className="mt-2 h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-green-500 rounded-full transition-all duration-300"
            style={{
              width: `${(completedLessonIds.length / lessons.length) * 100}%`,
            }}
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {lessons.map((lesson, index) => {
          const isCompleted = completedLessonIds.includes(lesson._id?.toString() || "");
          const isActive = currentLessonId === lesson._id?.toString();
          const isLocked = false; // Implement locking logic if needed (e.g. sequential access)

          return (
            <Link
              key={lesson._id?.toString() || index}
              href={`/courses/${courseId}/learn?lessonId=${lesson._id}`}
              className={`flex items-center gap-3 p-4 border-b border-slate-100 dark:border-slate-800 transition-colors ${
                isActive
                  ? "bg-indigo-50 dark:bg-indigo-900/20 border-l-4 border-l-indigo-600 dark:border-l-indigo-400"
                  : "hover:bg-slate-50 dark:hover:bg-slate-800"
              }`}
            >
              <div className="flex-shrink-0">
                {isCompleted ? (
                  <CheckCircle className="w-5 h-5 text-green-500" />
                ) : isLocked ? (
                  <Lock className="w-5 h-5 text-slate-400" />
                ) : (
                  <PlayCircle
                    className={`w-5 h-5 ${
                      isActive ? "text-indigo-600 dark:text-indigo-400" : "text-slate-400"
                    }`}
                  />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p
                  className={`text-sm font-medium truncate ${
                    isActive
                      ? "text-indigo-900 dark:text-indigo-100"
                      : "text-slate-700 dark:text-slate-300"
                  }`}
                >
                  {index + 1}. {lesson.title}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  {lesson.duration} min
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
