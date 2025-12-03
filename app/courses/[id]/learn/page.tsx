"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Navbar from "@/components/Navbar";
import VideoPlayer from "@/components/VideoPlayer";
import {
  ChevronLeft,
  ChevronRight,
  BookOpen,
  CheckCircle2,
  Circle,
  Menu,
  X,
  FileText,
  Download,
  Clock,
  Users,
  Star,
} from "lucide-react";

export default function CourseLearnPage() {
  const { id } = useParams();
  const router = useRouter();
  const { data: session } = useSession();

  const [course, setCourse] = useState<any>(null);
  const [enrollment, setEnrollment] = useState<any>(null);
  const [currentLesson, setCurrentLesson] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [progress, setProgress] = useState<any>({
    lessonProgress: [],
    overallProgress: 0,
    completedLessons: 0,
    totalLessons: 0,
  });

  useEffect(() => {
    if (id && session) {
      fetchCourseData();
    } else if (!session) {
      router.push(`/signin?callbackUrl=/courses/${id}/learn`);
    }
  }, [id, session, router]);

  const fetchCourseData = async () => {
    try {
      // Fetch course and enrollment data
      const [courseResponse, progressResponse] = await Promise.all([
        fetch(`/api/courses/${id}`),
        fetch(`/api/progress?courseId=${id}`)
      ]);

      if (courseResponse.ok && progressResponse.ok) {
        const courseData = await courseResponse.json();
        const progressData = await progressResponse.json();

        setCourse(courseData.course);
        setEnrollment({
          isEnrolled: courseData.isEnrolled,
          progress: courseData.progress || 0
        });

        if (progressData.lessonsWithProgress) {
          setProgress({
            lessonProgress: progressData.lessonsWithProgress,
            overallProgress: progressData.overallProgress || 0,
            completedLessons: progressData.completedLessons || 0,
            totalLessons: progressData.totalLessons || 0
          });

          // Find current lesson (first incomplete lesson)
          const firstIncompleteIndex = progressData.lessonsWithProgress.findIndex(
            (lesson: any) => !lesson.progress?.completed
          );
          setCurrentLesson(firstIncompleteIndex >= 0 ? firstIncompleteIndex : 0);
        }
      } else {
        setError("Failed to load course data");
      }
    } catch (err) {
      setError("Unable to load course. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const updateProgress = async (lessonId: string, progress: any) => {
    try {
      const response = await fetch('/api/progress', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          courseId: id,
          lessonId,
          completed: progress.completed,
          watchTime: progress.watchTime,
          lastPosition: progress.lastPosition,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.courseCompleted) {
          // Course completed - show certificate option
          router.push(`/courses/${id}/certificate`);
        }
      }
    } catch (err) {
      console.error('Failed to update progress:', err);
    }
  };

  const getVideoType = (url: string) => {
    if (url.includes('youtube.com') || url.includes('youtu.be')) {
      return 'youtube';
    } else if (url.includes('drive.google.com')) {
      return 'google-drive';
    } else {
      return 'direct';
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
        <Navbar />
        <div className="flex items-center justify-center h-[calc(100vh-80px)]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  if (error || !course) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
        <Navbar />
        <div className="flex items-center justify-center h-[calc(100vh-80px)]">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
              Course Not Available
            </h1>
            <p className="text-slate-600 dark:text-slate-400 mb-6">
              {error || "This course is not available or you don't have access."}
            </p>
            <button
              onClick={() => router.push('/courses')}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition-colors"
            >
              Browse Courses
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!enrollment?.isEnrolled) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
        <Navbar />
        <div className="flex items-center justify-center h-[calc(100vh-80px)]">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
              Enroll to Continue
            </h1>
            <p className="text-slate-600 dark:text-slate-400 mb-6">
              You need to enroll in this course to access the learning materials.
            </p>
            <button
              onClick={() => router.push(`/courses/${id}`)}
              className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-medium rounded-xl transition-all hover:shadow-lg"
            >
              Enroll Now
            </button>
          </div>
        </div>
      </div>
    );
  }

  const lessons = course.lessons || [];
  const currentLessonData = lessons[currentLesson];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex">
      <Navbar />

      {/* Sidebar Toggle (Mobile) */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="fixed top-24 left-4 z-50 p-2 bg-white dark:bg-slate-800 rounded-lg shadow-lg lg:hidden"
      >
        {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      <div className="flex flex-1">
        {/* Sidebar - Course Content */}
        <div className={`fixed lg:relative lg:translate-x-0 inset-y-0 left-0 z-40 w-80 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-700 transform transition-transform ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}>
          {/* Course Header */}
          <div className="p-6 border-b border-slate-200 dark:border-slate-700">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center text-white font-bold">
                {course.title.charAt(0)}
              </div>
              <div>
                <h2 className="font-semibold text-slate-900 dark:text-white line-clamp-1">
                  {course.title}
                </h2>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  {course.category} • {course.level}
                </p>
              </div>
            </div>

            {/* Progress Overview */}
            <div className="bg-slate-50 dark:bg-slate-800 rounded-xl p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  Course Progress
                </span>
                <span className="text-sm font-bold text-indigo-600 dark:text-indigo-400">
                  {progress.overallProgress}%
                </span>
              </div>
              <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2 mb-3">
                <div
                  className="bg-gradient-to-r from-indigo-500 to-purple-500 h-full rounded-full transition-all duration-500"
                  style={{ width: `${progress.overallProgress}%` }}
                />
              </div>
              <div className="text-xs text-slate-600 dark:text-slate-400">
                {progress.completedLessons} of {progress.totalLessons} lessons completed
              </div>
            </div>
          </div>

          {/* Lessons List */}
          <div className="flex-1 overflow-y-auto p-4">
            <h3 className="font-semibold text-slate-900 dark:text-white mb-4">
              Course Content
            </h3>
            <div className="space-y-2">
              {lessons.map((lesson: any, index: number) => {
                const isCompleted = (progress as any).lessonProgress[index]?.progress?.completed || false;
                const isCurrent = index === currentLesson;

                return (
                  <button
                    key={lesson._id || index}
                    onClick={() => setCurrentLesson(index)}
                    className={`w-full text-left p-4 rounded-xl border transition-all ${
                      isCurrent
                        ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20 shadow-md'
                        : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      {/* Status Icon */}
                      <div className="mt-1">
                        {isCompleted ? (
                          <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400" />
                        ) : isCurrent ? (
                          <div className="w-5 h-5 rounded-full border-2 border-indigo-500 flex items-center justify-center">
                            <div className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse"></div>
                          </div>
                        ) : (
                          <Circle className="w-5 h-5 text-slate-400 dark:text-slate-600" />
                        )}
                      </div>

                      {/* Lesson Info */}
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-slate-900 dark:text-white line-clamp-2 mb-1">
                          {lesson.title}
                        </h4>
                        <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2 mb-2">
                          {lesson.description}
                        </p>
                        <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-500">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {lesson.duration}min
                          </span>
                          {lesson.resources && lesson.resources.length > 0 && (
                            <span className="flex items-center gap-1">
                              <FileText className="w-3 h-3" />
                              {lesson.resources.length} resources
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 lg:ml-0">
          {currentLessonData && (
            <div className="h-full flex flex-col">
              {/* Video Player */}
              <div className="flex-1 p-4 lg:p-6">
                <div className="max-w-5xl mx-auto w-full">
                  <VideoPlayer
                    videoUrl={currentLessonData.videoUrl || ''}
                    videoType={getVideoType(currentLessonData.videoUrl || '')}
                    title={currentLessonData.title}
                    onProgress={(progressPercentage) => {
                      // Update local progress state
                      const updatedLessonProgress = [...(progress as any).lessonProgress] as any[];
                      updatedLessonProgress[currentLesson] = {
                        ...updatedLessonProgress[currentLesson],
                        progress: { completed: progressPercentage >= 90 }
                      };
                      setProgress((prev: any) => ({
                        ...prev,
                        lessonProgress: updatedLessonProgress
                      }));
                    }}
                    onComplete={() => {
                      // Mark lesson as complete and move to next lesson
                      updateProgress(currentLessonData._id, { completed: true });
                      if (currentLesson < lessons.length - 1) {
                        setCurrentLesson(currentLesson + 1);
                      }
                    }}
                    onWatchTime={(time) => {
                      // Track watch time
                      updateProgress(currentLessonData._id, {
                        completed: false,
                        watchTime: time
                      });
                    }}
                    onLastPosition={(position) => {
                      // Save last position
                      updateProgress(currentLessonData._id, {
                        completed: false,
                        lastPosition: position
                      });
                    }}
                  />
                </div>
              </div>

              {/* Lesson Info and Resources */}
              <div className="border-t border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-6">
                <div className="max-w-5xl mx-auto">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
                    {currentLessonData.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 mb-6">
                    {currentLessonData.description}
                  </p>

                  {/* Lesson Resources */}
                  {currentLessonData.resources && currentLessonData.resources.length > 0 && (
                    <div className="mb-6">
                      <h4 className="font-semibold text-slate-900 dark:text-white mb-3">
                        Lesson Resources
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {currentLessonData.resources.map((resource: any, index: number) => (
                          <a
                            key={index}
                            href={resource.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-3 p-4 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-xl transition-colors"
                          >
                            <div className="w-10 h-10 bg-indigo-100 dark:bg-indigo-900/50 rounded-lg flex items-center justify-center">
                              <Download className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                            </div>
                            <div>
                              <p className="font-medium text-slate-900 dark:text-white text-sm">
                                {resource.title}
                              </p>
                              <p className="text-xs text-slate-500 dark:text-slate-400 uppercase">
                                {resource.type}
                              </p>
                            </div>
                          </a>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Navigation */}
                  <div className="flex items-center justify-between pt-6 border-t border-slate-200 dark:border-slate-700">
                    <button
                      onClick={() => setCurrentLesson(Math.max(0, currentLesson - 1))}
                      disabled={currentLesson === 0}
                      className="flex items-center gap-2 px-4 py-3 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl transition-colors"
                    >
                      <ChevronLeft className="w-5 h-5" />
                      Previous Lesson
                    </button>

                    <div className="text-sm text-slate-600 dark:text-slate-400">
                      Lesson {currentLesson + 1} of {lessons.length}
                    </div>

                    <button
                      onClick={() => {
                        if (currentLesson < lessons.length - 1) {
                          setCurrentLesson(currentLesson + 1);
                        }
                      }}
                      disabled={currentLesson === lessons.length - 1}
                      className="flex items-center gap-2 px-4 py-3 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl transition-colors"
                    >
                      Next Lesson
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}