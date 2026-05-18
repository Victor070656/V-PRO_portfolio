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
    <div className="w-full md:w-80 bg-card border-r border-border flex flex-col h-full">
      <div className="p-4 border-b border-border">
        <h2 className="font-bold text-foreground truncate" title={title}>
          {title}
        </h2>
        <div className="mt-2 text-sm text-muted-foreground">
          {completedLessonIds.length} / {lessons.length} lessons completed
        </div>
        <div className="mt-2 h-1.5 w-full bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-primary rounded-full transition-all duration-300"
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
              className={`flex items-center gap-3 p-4 border-b border-border/70 transition-colors ${
                isActive
                  ? "bg-secondary border-l-4 border-l-primary"
                  : "hover:bg-muted"
              }`}
            >
              <div className="flex-shrink-0">
                {isCompleted ? (
                  <CheckCircle className="w-5 h-5 text-primary" />
                ) : isLocked ? (
                  <Lock className="w-5 h-5 text-muted-foreground" />
                ) : (
                  <PlayCircle
                    className={`w-5 h-5 ${
                      isActive ? "text-primary" : "text-muted-foreground"
                    }`}
                  />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p
                  className={`text-sm font-medium truncate ${
                    isActive
                      ? "text-foreground"
                      : "text-muted-foreground"
                  }`}
                >
                  {index + 1}. {lesson.title}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
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
