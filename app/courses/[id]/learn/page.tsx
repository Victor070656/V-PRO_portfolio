"use client";

import { useState, useEffect } from "react";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import { Course, Lesson } from "@/lib/models/course";
import CourseSidebar from "@/components/course/CourseSidebar";
import LessonContent from "@/components/course/LessonContent";
import { Menu, X, Loader2 } from "lucide-react";
import Navbar from "@/components/Navbar";

export default function LearnPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const courseId = params.id as string;
  const lessonId = searchParams.get("lessonId");

  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);
  const [currentLesson, setCurrentLesson] = useState<Lesson | null>(null);

  useEffect(() => {
    fetchCourseData();
  }, [courseId]);

  useEffect(() => {
    if (course && course.lessons.length > 0) {
      if (!lessonId) {
        // Redirect to first lesson if no lessonId provided
        router.replace(`/courses/${courseId}/learn?lessonId=${course.lessons[0]._id}`);
      } else {
        const lesson = course.lessons.find(l => l._id?.toString() === lessonId);
        if (lesson) {
          setCurrentLesson(lesson);
        }
      }
    }
  }, [course, lessonId]);

  const fetchCourseData = async () => {
    try {
      // Fetch course details
      const courseRes = await fetch(`/api/courses/${courseId}`);
      const courseData = await courseRes.json();
      
      if (courseData.course) {
        setCourse(courseData.course);
        
        // Fetch enrollment/progress data
        // For now, we'll simulate or fetch from a separate endpoint if needed
        // Assuming the course API might return enrollment status or we fetch it separately
        // Let's fetch progress for all lessons or just rely on the enrollment object
        if (courseData.enrollment) {
           setCompletedLessons(courseData.enrollment.completedLessons || []);
        }
      }
    } catch (error) {
      console.error("Error fetching course data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch specific lesson progress
  useEffect(() => {
    if (courseId && currentLesson?._id) {
      fetchLessonProgress(currentLesson._id.toString());
    }
  }, [courseId, currentLesson]);

  const [initialProgress, setInitialProgress] = useState(0);

  const fetchLessonProgress = async (lessonId: string) => {
    try {
      const res = await fetch(`/api/courses/${courseId}/lessons/${lessonId}/progress`);
      if (res.ok) {
        const data = await res.json();
        if (data.progress?.lastPosition) {
          setInitialProgress(data.progress.lastPosition);
        } else {
          setInitialProgress(0);
        }
      }
    } catch (error) {
      console.error("Error fetching lesson progress:", error);
    }
  };

  const handleLessonComplete = async (completedLessonId: string) => {
    try {
      // Optimistic update
      if (!completedLessons.includes(completedLessonId)) {
        setCompletedLessons(prev => [...prev, completedLessonId]);
      }

      // API call to update progress
      await fetch(`/api/courses/${courseId}/lessons/${completedLessonId}/progress`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed: true }),
      });
      
    } catch (error) {
      console.error("Error updating progress:", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
        <Loader2 className="w-10 h-10 text-indigo-600 animate-spin" />
      </div>
    );
  }

  if (!course || !currentLesson) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Course Not Found</h2>
          <p className="text-slate-600">Unable to load course content.</p>
        </div>
      </div>
    );
  }

  // Find next/prev lesson IDs
  const currentIndex = course.lessons.findIndex(l => l._id?.toString() === currentLesson._id?.toString());
  const nextLessonId = currentIndex < course.lessons.length - 1 ? course.lessons[currentIndex + 1]._id?.toString() : undefined;
  const prevLessonId = currentIndex > 0 ? course.lessons[currentIndex - 1]._id?.toString() : undefined;

  return (
    <div className="h-screen flex flex-col bg-slate-50 dark:bg-slate-950 overflow-hidden">
      {/* Mobile Header */}
      <div className="md:hidden bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 p-4 flex items-center justify-between z-20">
        <h1 className="font-bold truncate mr-4">{course.title}</h1>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"
        >
          {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      <div className="flex-1 flex overflow-hidden relative">
        {/* Sidebar */}
        <div
          className={`absolute md:relative z-10 h-full transition-transform duration-300 transform ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0 md:w-0 md:overflow-hidden"
          } md:translate-x-0`}
        >
           <div className={`${sidebarOpen ? 'w-80' : 'w-0'} h-full transition-all duration-300 overflow-hidden`}>
            <CourseSidebar
                courseId={courseId}
                lessons={course.lessons}
                currentLessonId={currentLesson._id?.toString() || ""}
                completedLessonIds={completedLessons}
                title={course.title}
            />
           </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col min-w-0 relative">
            {/* Desktop Sidebar Toggle */}
            <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="hidden md:flex absolute top-4 left-4 z-20 bg-white dark:bg-slate-800 p-2 rounded-lg shadow-md border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                title={sidebarOpen ? "Collapse Sidebar" : "Expand Sidebar"}
            >
                {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            <LessonContent
                courseId={courseId}
                lesson={currentLesson}
                nextLessonId={nextLessonId}
                prevLessonId={prevLessonId}
                onComplete={handleLessonComplete}
                isCompleted={completedLessons.includes(currentLesson._id?.toString() || "")}
                initialProgress={initialProgress}
            />
        </div>
      </div>
    </div>
  );
}