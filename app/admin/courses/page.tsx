"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Plus, Search, Edit, Users, BookOpen, Clock, Star, Award, AlertCircle } from "lucide-react";
import Link from "next/link";
import Header from "@/components/admin/Header";
import { Course, Lesson } from "@/lib/models/course";
import { formatPrice } from "@/lib/utils/currency";

interface CourseFormData {
  title: string;
  description: string;
  category: string;
  price: number;
  originalPrice?: number;
  duration?: string;
  level: "beginner" | "intermediate" | "advanced";
  language: string;
  requirements: string[];
  objectives: string[];
  thumbnail?: string;
  lessons: Lesson[];
  instructor: {
    name: string;
    bio: string;
    image?: string;
    expertise: string[];
  };
  isPublished: boolean;
}

export default function CoursesManagementPage() {
  const router = useRouter();
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [filterLevel, setFilterLevel] = useState("");
    const [showCreateModal, setShowCreateModal] = useState(false);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      setIsLoading(true);
      setError("");

      // Use admin endpoint to get ALL courses (including drafts)
      const response = await fetch("/api/admin/courses/list");
      if (!response.ok) {
        throw new Error("Failed to fetch courses");
      }

      const data = await response.json();
      setCourses(data.courses || []);
      setIsLoading(false);
    } catch (err) {
      console.error("Error fetching courses:", err);
      setError("Failed to load courses");
      setIsLoading(false);
    }
  };

  const handleCreateCourse = async (formData: CourseFormData) => {
    try {
      if (!formData.title || !formData.description || !formData.category || !formData.price) {
        setError("Please fill in all required fields");
        return;
      }

      const response = await fetch("/api/admin/courses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.error || "Failed to create course");
        return;
      }

      const newCourse = await response.json();
      if (newCourse.message) {
        setSuccess("Course created successfully!");
        setShowCreateModal(false);
        setCourses(prev => [newCourse.course, ...prev]);
      }
    } catch (err) {
      console.error("Error creating course:", err);
      setError("Failed to create course");
    }
  };

  const handleTogglePublish = async (courseId: string, isPublished: boolean) => {
    try {
      // Use the dedicated publish endpoint
      const response = await fetch(`/api/admin/courses/${courseId}/publish`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ isPublished }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.error || "Failed to update course status");
        return;
      }

      const updatedCourse = await response.json();
      if (updatedCourse.success) {
        setSuccess(`Course ${isPublished ? "published" : "unpublished"} successfully!`);
        setCourses(prev =>
          prev.map(course =>
            course._id === courseId ? updatedCourse.course : course
          )
        );
      }
    } catch (err) {
      console.error("Error updating course:", err);
      setError("Failed to update course status");
    }
  };

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !filterCategory || course.category === filterCategory;
    const matchesLevel = !filterLevel || course.level === filterLevel;
    return matchesSearch && matchesCategory && matchesLevel;
  });

  const getCourseStats = () => {
    const total = courses.length;
    const published = courses.filter(course => course.isPublished).length;
    const draft = courses.filter(course => !course.isPublished).length;
    return { total, published, draft };
  };

  const stats = getCourseStats();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[var(--background-color)]">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            <p className="text-[var(--text-secondary)] ml-4">Loading courses...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--background-color)]">
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[var(--text-primary)] mb-2">
            Course Management
          </h1>
          <p className="text-[var(--text-secondary)]">
            Create, manage, and organize your online courses
          </p>
        </div>

        {/* Error and Success Messages */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
            <div className="flex items-center">
              <AlertCircle className="w-5 h-5 text-red-600 mr-3" />
              <p className="text-red-800 dark:text-red-200">{error}</p>
            </div>
          </div>
        )}

        {success && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl">
            <div className="flex items-center">
              <Award className="w-5 h-5 text-green-600 mr-3" />
              <p className="text-green-800 dark:text-green-200">{success}</p>
            </div>
          </div>
        )}

        {/* Search and Actions */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center space-x-4 flex-1">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search courses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-slate-800 text-[var(--text-primary)] placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-slate-800 text-[var(--text-primary)] focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All Categories</option>
              <option value="programming">Programming</option>
              <option value="design">Design</option>
              <option value="business">Business</option>
              <option value="marketing">Marketing</option>
            </select>

            <select
              value={filterLevel}
              onChange={(e) => setFilterLevel(e.target.value)}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-slate-800 text-[var(--text-primary)] focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All Levels</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>

          <button
            onClick={() => setShowCreateModal(true)}
            className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
          >
            <Plus className="w-5 h-5 mr-2" />
            Create New Course
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mr-4">
                <BookOpen className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-[var(--text-primary)]">
                  {stats.total}
                </p>
                <p className="text-sm text-[var(--text-secondary)]">
                  Total Courses
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mr-4">
                <Award className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-[var(--text-primary)]">
                  {stats.published}
                </p>
                <p className="text-sm text-[var(--text-secondary)]">
                  Published
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900 rounded-full flex items-center justify-center mr-4">
                <Clock className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-[var(--text-primary)]">
                  {stats.draft}
                </p>
                <p className="text-sm text-[var(--text-secondary)]">
                  Drafts
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <div
              key={course._id}
              className="bg-white dark:bg-slate-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer group"
              onClick={() => router.push(`/admin/courses/${course._id}`)}
            >
              {/* Course Header */}
              <div className="h-48 bg-gradient-to-r from-blue-500 to-purple-600 relative overflow-hidden">
                {course.thumbnail ? (
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                    <BookOpen className="w-12 h-12 text-white opacity-50" />
                  </div>
                )}
              </div>

              {/* Course Content */}
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold text-[var(--text-primary)] flex-1">
                    {course.title}
                  </h3>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ml-2 ${
                    course.isPublished
                      ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                      : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                  }`}>
                    {course.isPublished ? 'Published' : 'Draft'}
                  </span>
                </div>

                <p className="text-[var(--text-secondary)] mb-4 line-clamp-2">
                  {course.description}
                </p>

                {/* Course Meta */}
                <div className="flex items-center justify-between text-sm text-[var(--text-secondary)] mb-4">
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-yellow-500" />
                    <span>{course.rating?.toFixed(1) || '0.0'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-blue-600" />
                    <span>{course.students || 0}</span>
                  </div>
                  <span className="text-[var(--text-primary)] font-semibold">
                    {course.price === 0 ? 'Free' : formatPrice(course.price)}
                  </span>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      router.push(`/admin/courses/${course._id}`);
                    }}
                    className="flex-1 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors"
                  >
                    <Edit className="w-4 h-4 mr-1 inline" />
                    Edit
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleTogglePublish(course._id, !course.isPublished);
                    }}
                    className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                      course.isPublished
                        ? 'bg-yellow-600 hover:bg-yellow-700 text-white'
                        : 'bg-green-600 hover:bg-green-700 text-white'
                    }`}
                  >
                    {course.isPublished ? 'Unpublish' : 'Publish'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredCourses.length === 0 && !isLoading && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <BookOpen className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-2">
              No courses found
            </h3>
            <p className="text-[var(--text-secondary)] mb-6">
              {searchTerm || filterCategory || filterLevel
                ? 'Try adjusting your search or filters'
                : 'Create your first course to get started with your LMS platform'
              }
            </p>
            <button
              onClick={() => setShowCreateModal(true)}
              className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
            >
              <Plus className="w-5 h-5 mr-2" />
              Create Your First Course
            </button>
          </div>
        )}
      </div>

      {/* Create Course Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-2xl max-w-4xl mx-4 p-8 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-[var(--text-primary)]">
                Create New Course
              </h2>
              <button
                onClick={() => setShowCreateModal(false)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form onSubmit={async (e) => {
              e.preventDefault();
              try {
                const formData = new FormData(e.target as HTMLFormElement);

                // Get current admin user info for instructor details
                const session = await fetch('/api/auth/session').then(res => res.json()).catch(() => null);

                await handleCreateCourse({
                  title: formData.get('title') as string,
                  description: formData.get('description') as string,
                  category: formData.get('category') as string,
                  price: parseFloat(formData.get('price') as string),
                  originalPrice: parseFloat(formData.get('originalPrice') as string) || undefined,
                  level: formData.get('level') as "beginner" | "intermediate" | "advanced",
                  language: formData.get('language') as string,
                  requirements: [formData.get('requirements') as string].filter(r => r.trim() !== ''),
                  objectives: [formData.get('objectives') as string].filter(o => o.trim() !== ''),
                  duration: formData.get('duration') as string,
                  thumbnail: formData.get('thumbnail') as string,
                  lessons: [],
                  instructor: {
                    name: session?.user?.name || 'Admin',
                    bio: 'Professional instructor and course creator',
                    image: '',
                    expertise: [formData.get('category') as string]
                  },
                  isPublished: false
                });
              } catch (err) {
                console.error('Form submission error:', err);
                setError("Failed to submit course creation form");
              }
            }} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                    Course Title *
                  </label>
                  <input
                    name="title"
                    type="text"
                    required
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-slate-800 text-[var(--text-primary)] focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter course title"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                    Category *
                  </label>
                  <select
                    name="category"
                    required
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-slate-800 text-[var(--text-primary)] focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select Category</option>
                    <option value="programming">Programming</option>
                    <option value="design">Design</option>
                    <option value="business">Business</option>
                    <option value="marketing">Marketing</option>
                    <option value="photography">Photography</option>
                    <option value="music">Music</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                    Level *
                  </label>
                  <select
                    name="level"
                    required
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-slate-800 text-[var(--text-primary)] focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                    Price (₦) *
                  </label>
                  <input
                    name="price"
                    type="number"
                    min="0"
                    step="0.01"
                    required
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-slate-800 text-[var(--text-primary)] focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="0.00"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                    Language *
                  </label>
                  <input
                    name="language"
                    type="text"
                    required
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-slate-800 text-[var(--text-primary)] focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="English"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                    Duration
                  </label>
                  <input
                    name="duration"
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-slate-800 text-[var(--text-primary)] focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., 10 hours"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                  Description *
                </label>
                <textarea
                  name="description"
                  rows={4}
                  required
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-slate-800 text-[var(--text-primary)] focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  placeholder="Enter course description"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                    Requirements
                  </label>
                  <textarea
                    name="requirements"
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-slate-800 text-[var(--text-primary)] focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    placeholder="No prior experience required"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                    Learning Objectives
                  </label>
                  <textarea
                    name="objectives"
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-slate-800 text-[var(--text-primary)] focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    placeholder="What students will learn"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                  Course Thumbnail URL
                </label>
                <input
                  name="thumbnail"
                  type="url"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-slate-800 text-[var(--text-primary)] focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="https://example.com/image.jpg"
                />
              </div>

              <div className="flex justify-end gap-4 pt-6">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-6 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 bg-white dark:bg-slate-800 hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
                >
                  Create Course
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}