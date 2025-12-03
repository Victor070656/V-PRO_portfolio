"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { ArrowLeft, Save, Upload, X, Plus, Trash2 } from "lucide-react";
import Link from "next/link";
import Header from "@/components/admin/Header";

interface Lesson {
  _id?: string;
  title: string;
  description: string;
  videoUrl: string;
  duration: number;
  order: number;
  resources?: {
    title: string;
    url: string;
    type: string;
  }[];
  isPublished?: boolean;
}

interface CourseFormData {
  title: string;
  description: string;
  category: string;
  level: string;
  duration: number;
  price: number;
  originalPrice?: number;
  thumbnail?: string;
  previewVideo?: string;
  tags: string[];
  language: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  lessons: Lesson[];
  isPublished: boolean;
}

const categories = [
  "Web Development",
  "Mobile Development",
  "UI/UX Design",
  "Data Science",
  "Artificial Intelligence",
  "Cloud Computing",
  "Business",
  "Marketing",
  "Photography",
  "Music Production",
  "Languages"
];

const difficulties = [
  { value: 'beginner', label: 'Beginner' },
  { value: 'intermediate', label: 'Intermediate' },
  { value: 'advanced', label: 'Advanced' }
];

export default function NewCoursePage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState<CourseFormData>({
    title: "",
    description: "",
    category: "",
    level: "beginner",
    duration: 0,
    price: 0,
    tags: [],
    language: "English",
    difficulty: "beginner",
    lessons: [],
    isPublished: false,
  });

  const [currentLesson, setCurrentLesson] = useState<number>(0);

  useEffect(() => {
    if (status === "loading") return;

    if (!session) {
      router.push("/admin/signin");
      return;
    }

    // Debug log to check what role we actually have
    console.log("User session:", session);
    console.log("User role:", session.user?.role);

    // Temporarily allow all authenticated users for debugging
    console.log("Temporarily allowing access for debugging");
  }, [session, status, router]);

  const addLesson = () => {
    const newLesson: Lesson = {
      title: "",
      description: "",
      videoUrl: "",
      duration: 0,
      order: formData.lessons.length,
      resources: [],
      isPublished: true,
    };
    setFormData({
      ...formData,
      lessons: [...formData.lessons, newLesson],
    });
  };

  const updateLesson = (index: number, field: keyof Lesson, value: any) => {
    const updatedLessons = [...formData.lessons];
    updatedLessons[index] = {
      ...updatedLessons[index],
      [field]: value,
    };
    setFormData({
      ...formData,
      lessons: updatedLessons,
    });
  };

  const removeLesson = (index: number) => {
    const updatedLessons = formData.lessons.filter((_, i) => i !== index);
    const reorderedLessons = updatedLessons.map((lesson, i) => ({
      ...lesson,
      order: i,
    }));
    setFormData({
      ...formData,
      lessons: reorderedLessons,
    });
  };

  const addResource = (lessonIndex: number) => {
    const updatedLessons = [...formData.lessons];
    const newResource = {
      title: "",
      url: "",
      type: "link",
    };

    updatedLessons[lessonIndex] = {
      ...updatedLessons[lessonIndex],
      resources: [...(updatedLessons[lessonIndex].resources || []), newResource],
    };
    setFormData({
      ...formData,
      lessons: updatedLessons,
    });
  };

  const updateResource = (lessonIndex: number, resourceIndex: number, field: 'title' | 'url' | 'type', value: string) => {
    const updatedLessons = [...formData.lessons];
    const updatedResources = [...(updatedLessons[lessonIndex].resources || [])];
    updatedResources[resourceIndex] = {
      ...updatedResources[resourceIndex],
      [field]: value,
    };

    updatedLessons[lessonIndex] = {
      ...updatedLessons[lessonIndex],
      resources: updatedResources,
    };
    setFormData({
      ...formData,
      lessons: updatedLessons,
    });
  };

  const removeResource = (lessonIndex: number, resourceIndex: number) => {
    const updatedLessons = [...formData.lessons];
    const updatedResources = (updatedLessons[lessonIndex].resources || []).filter((_, i) => i !== resourceIndex);

    updatedLessons[lessonIndex] = {
      ...updatedLessons[lessonIndex],
      resources: updatedResources,
    };
    setFormData({
      ...formData,
      lessons: updatedLessons,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("/api/admin/courses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        if (response.status === 401) {
          setError("Unauthorized");
        } else {
          const errorData = await response.json();
          setError(errorData.error || "Failed to create course");
        }
        return;
      }

      const data = await response.json();

      if (data.success) {
        setSuccess(true);
        setTimeout(() => {
          router.push("/admin/courses");
        }, 2000);
      } else {
        throw new Error("Failed to create course");
      }
    } catch (err) {
      console.error("Error creating course:", err);
      setError("Failed to create course. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageUpload = (type: 'thumbnail' | 'preview') => {
    // In a real application, this would handle file upload to a service like AWS S3
    // For now, we'll use a placeholder URL
    const placeholderUrl = type === 'thumbnail'
      ? `https://via.placeholder.com/800x600.png?text=${encodeURIComponent(formData.title)}&f=fff`
      : `https://via.placeholder.com/1280x720.png?text=${encodeURIComponent(formData.title)}+Preview&f=fff`;

    setFormData({
      ...formData,
      [type]: placeholderUrl,
    });
  };

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-[var(--background-color)] flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-[var(--accent-color)] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[var(--text-secondary)]">Loading...</p>
        </div>
      </div>
    );
  }

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--background-color)]">
        <div className="text-center">
          <div className="mb-4">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto">
              <Save className="w-8 h-8 text-white" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-2">
            Course Created Successfully!
          </h2>
          <p className="text-[var(--text-secondary)] mb-6">
            Your course has been created and is ready for students.
          </p>
          <Link
            href="/admin/courses"
            className="inline-flex items-center gap-2 bg-[var(--accent-color)] hover:bg-[var(--hover-color)] text-white px-6 py-3 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Courses
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--background-color)]">
      <Header />

      <main className="p-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-[var(--text-primary)]">Create New Course</h1>
            <Link
              href="/admin/courses"
              className="flex items-center gap-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Courses
            </Link>
          </div>

          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 p-4 rounded-lg mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Basic Information */}
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-6">Basic Information</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                    Course Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-slate-700 text-[var(--text-primary)] placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter course title"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                    Description *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-slate-700 text-[var(--text-primary)] placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter course description"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div>
                  <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                    Category *
                  </label>
                  <select
                    required
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-slate-700 text-[var(--text-primary)] focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select a category</option>
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                    Level *
                  </label>
                  <select
                    required
                    value={formData.level}
                    onChange={(e) => setFormData({ ...formData, level: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-slate-700 text-[var(--text-primary)] focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {difficulties.map(diff => (
                      <option key={diff.value} value={diff.value}>{diff.label}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                    Duration (minutes) *
                  </label>
                  <input
                    type="number"
                    required
                    min="1"
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: parseInt(e.target.value) || 0 })}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-slate-700 text-[var(--text-primary)] placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Course duration in minutes"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                    Language
                  </label>
                  <input
                    type="text"
                    value={formData.language}
                    onChange={(e) => setFormData({ ...formData, language: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-slate-700 text-[var(--text-primary)] placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Course language"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                    Price (₦) *
                  </label>
                  <input
                    type="number"
                    required
                    min="0"
                    step="100"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: parseInt(e.target.value) || 0 })}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-slate-700 text-[var(--text-primary)] placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="0"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                    Original Price (₦)
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="100"
                    value={formData.originalPrice || ""}
                    onChange={(e) => setFormData({ ...formData, originalPrice: parseInt(e.target.value) || undefined })}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-slate-700 text-[var(--text-primary)] placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Original price (optional)"
                  />
                </div>
              </div>

              <div className="mt-6">
                <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                  Tags (comma separated)
                </label>
                <input
                  type="text"
                  value={formData.tags.join(", ")}
                  onChange={(e) => setFormData({ ...formData, tags: e.target.value.split(",").map(tag => tag.trim()).filter(tag => tag) })}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-slate-700 text-[var(--text-primary)] placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., javascript, react, web development"
                />
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="isPublished"
                  checked={formData.isPublished}
                  onChange={(e) => setFormData({ ...formData, isPublished: e.target.checked })}
                  className="w-4 h-4 text-blue-600 bg-white dark:bg-slate-700 border-gray-300 dark:border-gray-600 rounded focus:ring-blue-500 focus:ring-2"
                />
                <label htmlFor="isPublished" className="ml-2 text-sm font-medium text-[var(--text-secondary)]">
                  Publish immediately
                </label>
              </div>
            </div>

            {/* Media */}
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-6">Course Media</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                    Course Thumbnail
                  </label>
                  <div className="space-y-2">
                    <input
                      type="url"
                      value={formData.thumbnail || ""}
                      onChange={(e) => setFormData({ ...formData, thumbnail: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-slate-700 text-[var(--text-primary)] placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter thumbnail URL or upload file"
                    />
                    <button
                      type="button"
                      onClick={() => handleImageUpload('thumbnail')}
                      className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors"
                    >
                      <Upload className="w-4 h-4 mr-2" />
                      Upload Image
                    </button>
                  </div>

                  {formData.thumbnail && (
                    <div className="mt-4">
                      <img
                        src={formData.thumbnail}
                        alt="Course thumbnail"
                        className="w-full h-32 object-cover rounded-lg"
                      />
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                    Preview Video
                  </label>
                  <div className="space-y-2">
                    <input
                      type="url"
                      value={formData.previewVideo || ""}
                      onChange={(e) => setFormData({ ...formData, previewVideo: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-slate-700 text-[var(--text-primary)] placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter preview video URL"
                    />
                    <button
                      type="button"
                      onClick={() => handleImageUpload('preview')}
                      className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors"
                    >
                      <Upload className="w-4 h-4 mr-2" />
                      Upload Video
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Lessons */}
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-[var(--text-primary)]">Course Lessons</h2>
                <button
                  type="button"
                  onClick={addLesson}
                  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  Add Lesson
                </button>
              </div>

              <div className="space-y-4">
                {formData.lessons.map((lesson, lessonIndex) => (
                  <div key={lessonIndex} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-medium text-[var(--text-primary)]">Lesson {lessonIndex + 1}</h3>
                      <button
                        type="button"
                        onClick={() => removeLesson(lessonIndex)}
                        className="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                          Lesson Title *
                        </label>
                        <input
                          type="text"
                          required
                          value={lesson.title}
                          onChange={(e) => updateLesson(lessonIndex, 'title', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-slate-700 text-[var(--text-primary)] placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Enter lesson title"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                          Video URL *
                        </label>
                        <input
                          type="url"
                          required
                          value={lesson.videoUrl}
                          onChange={(e) => updateLesson(lessonIndex, 'videoUrl', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-slate-700 text-[var(--text-primary)] placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="YouTube, Google Drive, or direct video URL"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                          Duration (minutes)
                        </label>
                        <input
                          type="number"
                          min="1"
                          value={lesson.duration}
                          onChange={(e) => updateLesson(lessonIndex, 'duration', parseInt(e.target.value) || 0)}
                          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-slate-700 text-[var(--text-primary)] placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Lesson duration"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                          Order
                        </label>
                        <input
                          type="number"
                          min="0"
                          value={lesson.order}
                          onChange={(e) => updateLesson(lessonIndex, 'order', parseInt(e.target.value) || 0)}
                          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-slate-700 text-[var(--text-primary)] placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Lesson order"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                        Description
                      </label>
                      <textarea
                        rows={3}
                        value={lesson.description}
                        onChange={(e) => updateLesson(lessonIndex, 'description', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-slate-700 text-[var(--text-primary)] placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter lesson description"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                          Published
                        </label>
                        <input
                          type="checkbox"
                          checked={lesson.isPublished !== false}
                          onChange={(e) => updateLesson(lessonIndex, 'isPublished', e.target.checked)}
                          className="w-4 h-4 text-blue-600 bg-white dark:bg-slate-700 border-gray-300 dark:border-gray-600 rounded focus:ring-blue-500 focus:ring-2"
                        />
                    </div>
                  </div>

                    {/* Resources */}
                    <div className="mt-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-sm font-medium text-[var(--text-primary)]">Lesson Resources</h4>
                        <button
                          type="button"
                          onClick={() => addResource(lessonIndex)}
                          className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                          Add Resource
                        </button>
                      </div>

                      {lesson.resources && lesson.resources.length > 0 && (
                        <div className="space-y-2">
                          {lesson.resources.map((resource, resourceIndex) => (
                            <div key={resourceIndex} className="grid grid-cols-1 md:grid-cols-3 gap-2">
                              <div>
                                <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1">
                                  Resource Title
                                </label>
                                <input
                                  type="text"
                                  value={resource.title}
                                  onChange={(e) => updateResource(lessonIndex, resourceIndex, 'title', e.target.value)}
                                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-slate-700 text-[var(--text-primary)] placeholder-gray-500 dark:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-transparent text-sm"
                                  placeholder="Resource title"
                                />
                              </div>

                              <div>
                                <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1">
                                  Resource URL
                                </label>
                                <input
                                  type="url"
                                  value={resource.url}
                                  onChange={(e) => updateResource(lessonIndex, resourceIndex, 'url', e.target.value)}
                                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-slate-700 text-[var(--text-primary)] placeholder-gray-500 dark:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-transparent text-sm"
                                  placeholder="Resource URL"
                                />
                              </div>

                              <div>
                                <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1">
                                  Resource Type
                                </label>
                                <select
                                  value={resource.type}
                                  onChange={(e) => updateResource(lessonIndex, resourceIndex, 'type', e.target.value)}
                                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-slate-700 text-[var(--text-primary)] focus:ring-1 focus:ring-blue-500 focus:border-transparent text-sm"
                                >
                                  <option value="link">Link</option>
                                  <option value="pdf">PDF</option>
                                  <option value="download">Download</option>
                                  <option value="video">Video</option>
                                </select>
                              </div>

                              <div>
                                <button
                                  type="button"
                                  onClick={() => removeResource(lessonIndex, resourceIndex)}
                                  className="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                                >
                                  <X className="w-4 h-4" />
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isLoading}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold px-8 py-3 rounded-lg transition-colors flex items-center gap-2"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Creating course...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  Create Course
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}