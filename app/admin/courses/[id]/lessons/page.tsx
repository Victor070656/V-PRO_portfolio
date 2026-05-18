"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Edit, Loader2, Plus, Save, Trash2, X } from "lucide-react";

interface Lesson {
  _id?: string;
  title: string;
  description: string;
  videoUrl: string;
  duration: number;
  order: number;
  isPublished: boolean;
}

export default function CourseLessonsPage() {
  const params = useParams();
  const [course, setCourse] = useState<any>(null);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingLesson, setEditingLesson] = useState<Lesson | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);

  useEffect(() => {
    if (params.id) fetchCourse();
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
      if (res.ok) await fetchCourse();
      else alert("Failed to delete lesson");
    } catch (error) {
      console.error("Error deleting lesson:", error);
      alert("Error deleting lesson");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] text-muted-foreground">
        <Loader2 className="w-5 h-5 animate-spin mr-2" />
        Loading lessons...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <section className="arch-panel p-8">
        <Link href="/admin/courses" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-4">
          <ArrowLeft className="w-4 h-4" />
          Back to Courses
        </Link>
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="arch-kicker mb-2">Course Curriculum</p>
            <h1 className="arch-heading-md">Lessons</h1>
            <p className="text-muted-foreground mt-2">{course?.title}</p>
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
            className="arch-button"
          >
            <Plus className="w-4 h-4" />
            Add Lesson
          </button>
        </div>
      </section>

      <section className="arch-panel overflow-hidden">
        {lessons.length === 0 && !isAddingNew ? (
          <div className="p-10 text-center">
            <p className="text-muted-foreground mb-4">No lessons yet.</p>
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
              className="arch-button"
            >
              <Plus className="w-4 h-4" />
              Add First Lesson
            </button>
          </div>
        ) : (
          <div className="divide-y divide-border/70">
            {lessons.map((lesson, index) => (
              <div key={lesson._id || index} className="p-5">
                {editingLesson && editingLesson._id === lesson._id ? (
                  <LessonForm lesson={editingLesson} onSave={handleSaveLesson} onCancel={() => setEditingLesson(null)} />
                ) : (
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="arch-kicker mb-1">Lesson {lesson.order}</p>
                      <h3 className="font-semibold">{lesson.title}</h3>
                      <p className="text-sm text-muted-foreground mt-1">{lesson.description}</p>
                      <p className="text-xs text-muted-foreground mt-2">
                        {lesson.duration} min · {lesson.isPublished ? "Published" : "Draft"}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => setEditingLesson(lesson)} className="arch-button-secondary !px-3 !py-2">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => lesson._id && handleDeleteLesson(lesson._id)}
                        className="arch-button-secondary !px-3 !py-2 text-red-300 border-red-500/40"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}

            {isAddingNew && editingLesson ? (
              <div className="p-5 bg-muted/40">
                <LessonForm
                  lesson={editingLesson}
                  onSave={handleSaveLesson}
                  onCancel={() => {
                    setIsAddingNew(false);
                    setEditingLesson(null);
                  }}
                />
              </div>
            ) : null}
          </div>
        )}
      </section>
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
      <input
        type="text"
        value={formData.title}
        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        className="arch-input"
        placeholder="Lesson title"
      />

      <textarea
        value={formData.description}
        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        rows={3}
        className="arch-input"
        placeholder="Lesson description"
      />

      <div className="grid gap-4 md:grid-cols-2">
        <input
          type="url"
          value={formData.videoUrl}
          onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })}
          className="arch-input"
          placeholder="Video URL"
        />
        <input
          type="number"
          value={formData.duration}
          onChange={(e) => setFormData({ ...formData, duration: parseInt(e.target.value) || 0 })}
          className="arch-input"
          placeholder="Duration (minutes)"
        />
      </div>

      <label className="inline-flex items-center gap-2 text-sm text-muted-foreground">
        <input
          type="checkbox"
          checked={formData.isPublished}
          onChange={(e) => setFormData({ ...formData, isPublished: e.target.checked })}
        />
        Publish this lesson
      </label>

      <div className="flex gap-2">
        <button onClick={() => onSave(formData)} className="arch-button">
          <Save className="w-4 h-4" />
          Save Lesson
        </button>
        <button onClick={onCancel} className="arch-button-secondary">
          <X className="w-4 h-4" />
          Cancel
        </button>
      </div>
    </div>
  );
}
