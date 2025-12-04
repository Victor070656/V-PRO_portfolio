"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Plus,
  Edit,
  Trash2,
  GripVertical,
  Video,
  FileText,
  Save,
  X,
  Loader2,
} from "lucide-react";

interface Lesson {
  _id?: string;
  title: string;
  description: string;
  videoUrl: string;
  duration: number;
  order: number;
  isPublished: boolean;
  resources?: {
    title: string;
    url: string;
    type: 'pdf' | 'link' | 'download';
  }[];
}

export default function CourseLessonsPage() {
  const params = useParams();
  const router = useRouter();
  const [course, setCourse] = useState<any>(null);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingLesson, setEditingLesson] = useState<Lesson | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);

  useEffect(() => {
    if (params.id) {
      fetchCourse();
    }
  }, [params.id]);

  const fetchCourse = async () => {
    try {
      const res = await fetch(`/api/admin/courses/${params.id}`);
      if (res.ok) {
        const data = await res.json();
        setCourse(data.course);
        setLessons(data.course.lessons || []);
      }
    } catch (error) {
      console.error("Error fetching course:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveLesson = async (lesson: Lesson) => {
    try {
      const method = lesson._id ? "PUT" : "POST";
      const url = lesson._id
        ? `/api/admin/courses/${params.id}/lessons/${lesson._id}`
        : `/api/admin/courses/${params.id}/lessons`;

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(lesson),
      });

      if (res.ok) {
        await fetchCourse();
        setEditingLesson(null);
        setIsAddingNew(false);
      } else {
        alert("Failed to save lesson");
      }
    } catch (error) {
      console.error("Error saving lesson:", error);
      alert("Error saving lesson");
    }
  };

  const handleDeleteLesson = async (lessonId: string) => {
    if (!confirm("Are you sure you want to delete this lesson?")) return;

    try {
      const res = await fetch(`/api/admin/courses/${params.id}/lessons/${lessonId}`, {
        method: "DELETE",
      });

      if (res.ok) {
        await fetchCourse();
      } else {
        alert("Failed to delete lesson");
      }
    } catch (error) {
      console.error("Error deleting lesson:", error);
      alert("Error deleting lesson");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-8 h-8 animate-spin text-orange-600" />
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Header */}
      <div className="relative overflow-hidden bg-gradient-to-br from-orange-500 via-red-500 to-pink-600 rounded-3xl p-8 shadow-2xl">
        <div className="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(0deg,transparent,black)]" />
        <div className="relative z-10">
          <Link
            href="/admin/courses"
            className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Courses
          </Link>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-black text-white mb-2">Course Lessons</h1>
              <p className="text-white/80 text-lg">{course?.title}</p>
            </div>
            <button
              onClick={() => {
                setIsAddingNew(true);
                setEditingLesson({
                  title: "",
                  description: "",
                  videoUrl: "",
                  duration: 0,
                  order: lessons.length + 1,
                  isPublished: false,
                });
              }}
              className="bg-white hover:bg-white/90 text-orange-600 px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:shadow-xl hover:scale-105 flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Add Lesson
            </button>
          </div>
        </div>
      </div>

      {/* Lessons List */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        {lessons.length === 0 && !isAddingNew ? (
          <div className="p-12 text-center">
            <Video className="w-16 h-16 text-slate-300 dark:text-slate-700 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
              No lessons yet
            </h3>
            <p className="text-slate-600 dark:text-slate-400 mb-6">
              Start building your course by adding lessons
            </p>
            <button
              onClick={() => {
                setIsAddingNew(true);
                setEditingLesson({
                  title: "",
                  description: "",
                  videoUrl: "",
                  duration: 0,
                  order: 1,
                  isPublished: false,
                });
              }}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white font-semibold rounded-xl transition-all duration-300"
            >
              <Plus className="w-5 h-5" />
              Add First Lesson
            </button>
          </div>
        ) : (
          <div className="divide-y divide-slate-200 dark:divide-slate-700">
            {lessons.map((lesson, index) => (
              <div key={lesson._id || index} className="p-6 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                {editingLesson && editingLesson._id === lesson._id ? (
                  <LessonForm
                    lesson={editingLesson}
                    onSave={handleSaveLesson}
                    onCancel={() => setEditingLesson(null)}
                  />
                ) : (
                  <div className="flex items-start gap-4">
                    <div className="flex items-center gap-3 flex-1">
                      <GripVertical className="w-5 h-5 text-slate-400 cursor-move" />
                      <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                        {lesson.order}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-1">
                          {lesson.title}
                        </h3>
                        <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                          {lesson.description}
                        </p>
                        <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
                          <div className="flex items-center gap-1">
                            <Video className="w-4 h-4" />
                            {lesson.duration} min
                          </div>
                          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                            lesson.isPublished
                              ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400'
                              : 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400'
                          }`}>
                            {lesson.isPublished ? 'Published' : 'Draft'}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setEditingLesson(lesson)}
                        className="p-2 text-slate-600 dark:text-slate-400 hover:bg-orange-100 dark:hover:bg-orange-900/20 hover:text-orange-600 dark:hover:text-orange-400 rounded-lg transition-colors"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteLesson(lesson._id!)}
                        className="p-2 text-slate-600 dark:text-slate-400 hover:bg-red-100 dark:hover:bg-red-900/20 hover:text-red-600 dark:hover:text-red-400 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
            
            {isAddingNew && editingLesson && (
              <div className="p-6 bg-slate-50 dark:bg-slate-800/50">
                <LessonForm
                  lesson={editingLesson}
                  onSave={handleSaveLesson}
                  onCancel={() => {
                    setIsAddingNew(false);
                    setEditingLesson(null);
                  }}
                />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function LessonForm({
  lesson,
  onSave,
  onCancel,
}: {
  lesson: Lesson;
  onSave: (lesson: Lesson) => void;
  onCancel: () => void;
}) {
  const [formData, setFormData] = useState(lesson);

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
          Lesson Title
        </label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="w-full px-4 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 text-slate-900 dark:text-white"
          placeholder="Introduction to the course"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
          Description
        </label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          rows={3}
          className="w-full px-4 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 text-slate-900 dark:text-white"
          placeholder="What will students learn in this lesson?"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            Video URL
          </label>
          <input
            type="url"
            value={formData.videoUrl}
            onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })}
            className="w-full px-4 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 text-slate-900 dark:text-white"
            placeholder="https://youtube.com/watch?v=..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            Duration (minutes)
          </label>
          <input
            type="number"
            value={formData.duration}
            onChange={(e) => setFormData({ ...formData, duration: parseInt(e.target.value) || 0 })}
            className="w-full px-4 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 text-slate-900 dark:text-white"
            placeholder="15"
          />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="isPublished"
          checked={formData.isPublished}
          onChange={(e) => setFormData({ ...formData, isPublished: e.target.checked })}
          className="w-4 h-4 text-orange-600 border-slate-300 rounded focus:ring-orange-500"
        />
        <label htmlFor="isPublished" className="text-sm font-medium text-slate-700 dark:text-slate-300">
          Publish this lesson
        </label>
      </div>

      <div className="flex gap-2 pt-4">
        <button
          onClick={() => onSave(formData)}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white font-semibold rounded-xl transition-all duration-300"
        >
          <Save className="w-4 h-4" />
          Save Lesson
        </button>
        <button
          onClick={onCancel}
          className="flex items-center gap-2 px-6 py-3 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-300 font-semibold rounded-xl transition-all duration-300"
        >
          <X className="w-4 h-4" />
          Cancel
        </button>
      </div>
    </div>
  );
}
