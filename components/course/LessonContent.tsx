"use client";

import { useState, useEffect } from "react";
import { Lesson } from "@/lib/models/course";
import VideoPlayer from "@/components/VideoPlayer";
import {
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  FileText,
  Download,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface LessonContentProps {
  courseId: string;
  lesson: Lesson;
  nextLessonId?: string;
  prevLessonId?: string;
  onComplete: (lessonId: string) => void;
  isCompleted: boolean;
  initialProgress?: number;
}

export default function LessonContent({
  courseId,
  lesson,
  nextLessonId,
  prevLessonId,
  onComplete,
  isCompleted,
  initialProgress = 0,
}: LessonContentProps) {
  const router = useRouter();
  const [progress, setProgress] = useState(0);

  const handleProgress = async (state: {
    played: number;
    playedSeconds: number;
  }) => {
    // Update local progress state if needed
    // You might want to debounce API calls here
    if (state.played > 0.9 && !isCompleted) {
      // Auto-complete at 90%
      onComplete(lesson._id?.toString() || "");
    }

    // Save progress periodically (e.g., every 10 seconds or on pause - simplified here to every update but should be debounced in real app)
    // For now, we rely on the VideoPlayer's interval or implement a debounced save here
    // Let's implement a simple debounced save
    saveProgress(state.playedSeconds);
  };

  const saveProgress = (seconds: number) => {
    // Debounce logic would go here, for now we'll just log it or rely on a less frequent update
    // To avoid spamming the API, we can check if enough time has passed since last save
    const now = Date.now();
    if (now - lastSaveTime > 5000) {
      // Save every 5 seconds
      setLastSaveTime(now);
      fetch(`/api/courses/${courseId}/lessons/${lesson._id}/progress`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          lastPosition: seconds,
          watchTime: seconds / 60,
        }), // watchTime is approximate
      }).catch((err) => console.error("Error saving progress", err));
    }
  };

  const [lastSaveTime, setLastSaveTime] = useState(0);

  const handleVideoEnded = () => {
    if (!isCompleted) {
      onComplete(lesson._id?.toString() || "");
    }
  };

  return (
    <div className="flex-1 flex flex-col h-full overflow-y-auto bg-background">
      {/* Video Player Container */}
      <div className="w-full bg-black shrink-0 relative">
        {lesson.videoUrl ? (
          <div className="w-full max-w-6xl mx-auto relative">
            <VideoPlayer
              url={lesson.videoUrl}
              onProgress={handleProgress}
              onEnded={handleVideoEnded}
              initialProgress={initialProgress}
            />
          </div>
        ) : (
          <div className="w-full aspect-video flex items-center justify-center text-white">
            No video available for this lesson
          </div>
        )}
      </div>

      {/* Lesson Details */}
      <div className="max-w-4xl mx-auto w-full p-6 md:p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <h1 className="text-2xl font-bold text-foreground">
            {lesson.title}
          </h1>
          <button
            onClick={() => onComplete(lesson._id?.toString() || "")}
            disabled={isCompleted}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
              isCompleted
                ? "bg-secondary text-foreground cursor-default border border-border"
                : "bg-primary text-primary-foreground hover:bg-blue-500"
            }`}
          >
            {isCompleted ? (
              <>
                <CheckCircle className="w-5 h-5" />
                Completed
              </>
            ) : (
              "Mark as Complete"
            )}
          </button>
        </div>

        <div className="max-w-none mb-8 text-muted-foreground">
          <p>{lesson.description}</p>
        </div>

        {/* Resources */}
        {lesson.resources && lesson.resources.length > 0 && (
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-foreground mb-4">
              Resources
            </h3>
            <div className="grid gap-3">
              {lesson.resources.map((resource, index) => (
                <a
                  key={index}
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-lg border border-border hover:bg-muted transition-colors"
                >
                  {resource.type === "pdf" ? (
                    <FileText className="w-5 h-5 text-primary" />
                  ) : (
                    <Download className="w-5 h-5 text-primary" />
                  )}
                  <span className="text-foreground font-medium">
                    {resource.title}
                  </span>
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="flex items-center justify-between pt-6 border-t border-border">
          {prevLessonId ? (
            <Link
              href={`/courses/${courseId}/learn?lessonId=${prevLessonId}`}
              className="flex items-center gap-2 text-muted-foreground hover:text-primary font-medium"
            >
              <ChevronLeft className="w-5 h-5" />
              Previous Lesson
            </Link>
          ) : (
            <div></div>
          )}

          {nextLessonId ? (
            <Link
              href={`/courses/${courseId}/learn?lessonId=${nextLessonId}`}
              className="flex items-center gap-2 text-muted-foreground hover:text-primary font-medium"
            >
              Next Lesson
              <ChevronRight className="w-5 h-5" />
            </Link>
          ) : (
            <Link
              href={`/courses/${courseId}`}
              className="flex items-center gap-2 text-muted-foreground hover:text-primary font-medium"
            >
              Back to Course Home
              <ChevronRight className="w-5 h-5" />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
