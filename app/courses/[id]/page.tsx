"use client";
import { useState, useEffect } from "react";
import { Course } from "@/lib/models/course";
import { useParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import BuyButton from "@/components/BuyButton";
import Link from "next/link";
import {
  Clock,
  Users,
  Star,
  BookOpen,
  Award,
  PlayCircle,
  CheckCircle2,
  Globe,
  BarChart3,
  Download,
  Share2,
  Heart,
  Sparkles,
  Calendar,
  Target,
  TrendingUp,
  Loader2,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

export default function CoursePage() {
  const [course, setCourse] = useState<Course | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<
    "overview" | "curriculum" | "reviews"
  >("overview");
  const [expandedModule, setExpandedModule] = useState<number | null>(0);
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      async function fetchCourse() {
        try {
          const res = await fetch(`/api/courses/${id}`);
          const data = await res.json();
          setCourse(data);
        } catch (error) {
          console.error("Error fetching course:", error);
        } finally {
          setIsLoading(false);
        }
      }
      fetchCourse();
    }
  }, [id]);

  if (isLoading) {
    return <LoadingState />;
  }

  if (!course) {
    return <ErrorState />;
  }

  return (
    <div className="bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 text-slate-900 dark:text-slate-100 antialiased min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white pt-32 pb-20">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20"></div>

        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 right-10 w-72 h-72 bg-white/10 rounded-full mix-blend-overlay filter blur-3xl animate-blob"></div>
          <div className="absolute bottom-20 left-10 w-72 h-72 bg-white/10 rounded-full mix-blend-overlay filter blur-3xl animate-blob animation-delay-2000"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm text-white/80 mb-6 animate-fade-in">
              <Link
                href="/courses"
                className="hover:text-white transition-colors"
              >
                Courses
              </Link>
              <span>/</span>
              <span className="text-white">{course.title}</span>
            </nav>

            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6 animate-fade-in">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-medium">
                {course.category || "Featured Course"}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 animate-slide-up tracking-tight">
              {course.title}
            </h1>

            {/* Description */}
            <p className="text-xl text-white/90 mb-8 animate-slide-up animation-delay-100 max-w-3xl">
              {course.description}
            </p>

            {/* Meta Info */}
            <div className="flex flex-wrap gap-6 mb-8 animate-slide-up animation-delay-200">
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                <span className="font-semibold">{course.rating || "4.8"}</span>
                <span className="text-white/80">
                  ({course.students || "1,234"} students)
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                <span>{course.duration || "8 weeks"}</span>
              </div>
              <div className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                <span>{course.level || "Intermediate"}</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="w-5 h-5" />
                <span>{course.language || "English"}</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 animate-slide-up animation-delay-300">
              <div className="flex items-center gap-4">
                <div className="text-3xl font-black">
                  ${course.price}
                  {course.originalPrice && (
                    <span className="text-lg line-through text-white/60 ml-2">
                      ${course.originalPrice}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            viewBox="0 0 1440 120"
            className="w-full h-12 fill-slate-50 dark:fill-slate-950"
          >
            <path d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"></path>
          </svg>
        </div>
      </section>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-16 -mt-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Course Preview Card */}
              <div className="bg-white dark:bg-slate-900 rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-xl">
                <div className="relative aspect-video bg-gradient-to-br from-indigo-500 to-purple-600">
                  {course.thumbnail ? (
                    <img
                      src={course.thumbnail}
                      alt={course.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <PlayCircle className="w-24 h-24 text-white/50" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center group cursor-pointer hover:bg-black/40 transition-colors">
                    <div className="w-20 h-20 bg-white/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform shadow-2xl">
                      <PlayCircle className="w-10 h-10 text-indigo-600" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Tabs */}
              <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden">
                {/* Tab Headers */}
                <div className="flex border-b border-slate-200 dark:border-slate-800">
                  {[
                    { id: "overview", label: "Overview", icon: BookOpen },
                    { id: "curriculum", label: "Curriculum", icon: PlayCircle },
                    { id: "reviews", label: "Reviews", icon: Star },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as any)}
                      className={`flex-1 px-6 py-4 font-semibold transition-all flex items-center justify-center gap-2 ${
                        activeTab === tab.id
                          ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white"
                          : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800"
                      }`}
                    >
                      <tab.icon className="w-5 h-5" />
                      <span>{tab.label}</span>
                    </button>
                  ))}
                </div>

                {/* Tab Content */}
                <div className="p-8">
                  {activeTab === "overview" && <OverviewTab course={course} />}
                  {activeTab === "curriculum" && (
                    <CurriculumTab
                      expandedModule={expandedModule}
                      setExpandedModule={setExpandedModule}
                    />
                  )}
                  {activeTab === "reviews" && <ReviewsTab />}
                </div>
              </div>

              {/* What You'll Learn */}
              <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 shadow-xl">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center text-white shadow-lg">
                    <Target className="w-6 h-6" />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                    What You'll Learn
                  </h2>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  {[
                    "Master the fundamentals and advanced concepts",
                    "Build real-world projects from scratch",
                    "Best practices and industry standards",
                    "Problem-solving and critical thinking",
                    "Work with modern tools and frameworks",
                    "Career-ready skills and portfolio pieces",
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-3 p-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
                    >
                      <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <CheckCircle2 className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-slate-700 dark:text-slate-300">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Requirements */}
              <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 shadow-xl">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
                  Requirements
                </h2>
                <ul className="space-y-3">
                  {[
                    "Basic understanding of programming concepts",
                    "A computer with internet connection",
                    "Willingness to learn and practice",
                    "No prior experience required",
                  ].map((req, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 text-slate-600 dark:text-slate-400"
                    >
                      <div className="w-2 h-2 bg-indigo-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right Column - Sidebar */}
            <div className="space-y-6">
              {/* Purchase Card */}
              <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-3xl p-1 shadow-xl sticky top-24">
                <div className="bg-white dark:bg-slate-900 rounded-3xl p-6">
                  <div className="mb-6">
                    <div className="text-4xl font-black text-slate-900 dark:text-white mb-2">
                      ${course.price}
                    </div>
                    {course.originalPrice && (
                      <div className="flex items-center gap-2">
                        <span className="text-lg line-through text-slate-400">
                          ${course.originalPrice}
                        </span>
                        <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full text-sm font-semibold">
                          Save{" "}
                          {Math.round(
                            ((course.originalPrice - course.price) /
                              course.originalPrice) *
                              100
                          )}
                          %
                        </span>
                      </div>
                    )}
                  </div>

                  <BuyButton course={course} />

                  <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-800 space-y-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-600 dark:text-slate-400">
                        30-Day Money-Back Guarantee
                      </span>
                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-600 dark:text-slate-400">
                        Lifetime Access
                      </span>
                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-600 dark:text-slate-400">
                        Certificate of Completion
                      </span>
                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                    </div>
                  </div>

                  <div className="mt-6 flex gap-3">
                    <button className="flex-1 py-3 px-4 rounded-xl border-2 border-slate-200 dark:border-slate-700 hover:border-indigo-500 dark:hover:border-indigo-500 transition-all font-semibold flex items-center justify-center gap-2">
                      <Heart className="w-5 h-5" />
                      <span>Save</span>
                    </button>
                    <button className="flex-1 py-3 px-4 rounded-xl border-2 border-slate-200 dark:border-slate-700 hover:border-indigo-500 dark:hover:border-indigo-500 transition-all font-semibold flex items-center justify-center gap-2">
                      <Share2 className="w-5 h-5" />
                      <span>Share</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Course Includes */}
              <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-xl">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
                  This Course Includes
                </h3>
                <ul className="space-y-3">
                  {[
                    { icon: PlayCircle, text: "12 hours video content" },
                    { icon: Download, text: "Downloadable resources" },
                    { icon: Award, text: "Certificate of completion" },
                    { icon: Users, text: "Access to community" },
                    { icon: Clock, text: "Lifetime access" },
                    { icon: Globe, text: "Access on mobile & desktop" },
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <item.icon className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                      <span className="text-slate-600 dark:text-slate-400 text-sm">
                        {item.text}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Instructor Card */}
              <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-xl">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
                  Your Instructor
                </h3>
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex-shrink-0"></div>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white mb-1">
                      Victor Ikechukwu
                    </h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
                      Full-Stack Developer
                    </p>
                    <div className="flex items-center gap-4 text-sm text-slate-600 dark:text-slate-400">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span>4.8</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        <span>5K+</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

// Overview Tab Component
function OverviewTab({ course }: { course: Course }) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
          About This Course
        </h3>
        <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
          {course.description}
        </p>
      </div>

      <div>
        <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
          This comprehensive course is designed to take you from beginner to
          advanced level. You'll learn through hands-on projects, real-world
          examples, and practical exercises that will help you master the
          concepts and apply them in your own work.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-4 pt-6">
        {[
          { icon: TrendingUp, label: "Skill Level", value: "All Levels" },
          { icon: Users, label: "Students", value: "1,234" },
          { icon: Calendar, label: "Last Updated", value: "Dec 2024" },
        ].map((stat, i) => (
          <div
            key={i}
            className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-center"
          >
            <stat.icon className="w-8 h-8 mx-auto mb-2 text-indigo-600 dark:text-indigo-400" />
            <div className="text-sm text-slate-600 dark:text-slate-400 mb-1">
              {stat.label}
            </div>
            <div className="font-bold text-slate-900 dark:text-white">
              {stat.value}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Curriculum Tab Component
function CurriculumTab({
  expandedModule,
  setExpandedModule,
}: {
  expandedModule: number | null;
  setExpandedModule: (index: number | null) => void;
}) {
  const modules = [
    {
      title: "Getting Started",
      lessons: 5,
      duration: "45 min",
      items: [
        {
          title: "Introduction to the Course",
          duration: "5:30",
          type: "video",
        },
        {
          title: "Setting Up Your Environment",
          duration: "10:15",
          type: "video",
        },
        { title: "Course Resources", duration: "3:45", type: "reading" },
        { title: "First Assignment", duration: "15:00", type: "assignment" },
        { title: "Module Quiz", duration: "10:30", type: "quiz" },
      ],
    },
    {
      title: "Core Concepts",
      lessons: 8,
      duration: "2h 15min",
      items: [
        { title: "Fundamentals Overview", duration: "12:30", type: "video" },
        { title: "Working with Data", duration: "18:45", type: "video" },
        { title: "Best Practices", duration: "15:20", type: "video" },
      ],
    },
    {
      title: "Advanced Topics",
      lessons: 10,
      duration: "3h 30min",
      items: [
        { title: "Advanced Patterns", duration: "20:15", type: "video" },
        { title: "Performance Optimization", duration: "25:30", type: "video" },
      ],
    },
  ];

  return (
    <div className="space-y-4">
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
          Course Curriculum
        </h3>
        <p className="text-slate-600 dark:text-slate-400">
          {modules.length} modules •{" "}
          {modules.reduce((acc, m) => acc + m.lessons, 0)} lessons • 6h 30min
          total
        </p>
      </div>

      {modules.map((module, index) => (
        <div
          key={index}
          className="border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden"
        >
          <button
            onClick={() =>
              setExpandedModule(expandedModule === index ? null : index)
            }
            className="w-full p-6 flex items-center justify-between bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-750 transition-colors"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg flex items-center justify-center">
                <span className="font-bold text-indigo-600 dark:text-indigo-400">
                  {index + 1}
                </span>
              </div>
              <div className="text-left">
                <h4 className="font-bold text-slate-900 dark:text-white mb-1">
                  {module.title}
                </h4>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  {module.lessons} lessons • {module.duration}
                </p>
              </div>
            </div>
            {expandedModule === index ? (
              <ChevronUp className="w-5 h-5 text-slate-400" />
            ) : (
              <ChevronDown className="w-5 h-5 text-slate-400" />
            )}
          </button>

          {expandedModule === index && (
            <div className="border-t border-slate-200 dark:border-slate-700">
              {module.items.map((item, itemIndex) => (
                <div
                  key={itemIndex}
                  className="p-4 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors border-b border-slate-100 dark:border-slate-800 last:border-b-0"
                >
                  <div className="flex items-center gap-3">
                    <PlayCircle className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                    <span className="text-slate-700 dark:text-slate-300">
                      {item.title}
                    </span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-slate-500 dark:text-slate-400">
                      {item.duration}
                    </span>
                    <span className="px-2 py-1 bg-slate-100 dark:bg-slate-700 rounded text-xs text-slate-600 dark:text-slate-400">
                      {item.type}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

// Reviews Tab Component
function ReviewsTab() {
  const reviews = [
    {
      name: "John Doe",
      rating: 5,
      date: "2 weeks ago",
      comment:
        "Excellent course! Very detailed and well-structured. The instructor explains everything clearly.",
    },
    {
      name: "Jane Smith",
      rating: 5,
      date: "1 month ago",
      comment:
        "Best course I've taken on this platform. Highly recommend to anyone looking to learn.",
    },
    {
      name: "Mike Johnson",
      rating: 4,
      date: "2 months ago",
      comment:
        "Great content, though some sections could be more in-depth. Overall very satisfied!",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Rating Summary */}
      <div className="grid md:grid-cols-2 gap-6 p-6 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
        <div className="text-center">
          <div className="text-5xl font-black text-slate-900 dark:text-white mb-2">
            4.8
          </div>
          <div className="flex items-center justify-center gap-1 mb-2">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className="w-5 h-5 fill-yellow-400 text-yellow-400"
              />
            ))}
          </div>
          <p className="text-slate-600 dark:text-slate-400">Course Rating</p>
        </div>
        <div className="space-y-2">
          {[5, 4, 3, 2, 1].map((rating) => (
            <div key={rating} className="flex items-center gap-3">
              <span className="text-sm text-slate-600 dark:text-slate-400 w-12">
                {rating} star
              </span>
              <div className="flex-1 h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-yellow-400 to-orange-500"
                  style={{ width: `${rating === 5 ? 80 : rating * 10}%` }}
                ></div>
              </div>
              <span className="text-sm text-slate-600 dark:text-slate-400 w-12">
                {rating === 5 ? "80%" : `${rating * 10}%`}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Individual Reviews */}
      <div className="space-y-4">
        <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
          Student Reviews
        </h3>
        {reviews.map((review, i) => (
          <div
            key={i}
            className="p-6 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/50"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full"></div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white">
                    {review.name}
                  </h4>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    {review.date}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                {[...Array(review.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>
            </div>
            <p className="text-slate-600 dark:text-slate-400">
              {review.comment}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

// Loading State Component
function LoadingState() {
  return (
    <div className="bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 min-h-screen">
      <Navbar />
      <div className="container mx-auto px-6 py-32">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-indigo-100 dark:bg-indigo-900/30 rounded-full mb-6">
            <Loader2 className="w-10 h-10 text-indigo-600 dark:text-indigo-400 animate-spin" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
            Loading Course...
          </h2>
          <p className="text-slate-600 dark:text-slate-400">
            Please wait while we fetch the course details
          </p>
        </div>
      </div>
    </div>
  );
}

// Error State Component
function ErrorState() {
  return (
    <div className="bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 min-h-screen">
      <Navbar />
      <div className="container mx-auto px-6 py-32">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-red-100 dark:bg-red-900/30 rounded-full mb-6">
            <svg
              className="w-10 h-10 text-red-600 dark:text-red-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
            Course Not Found
          </h2>
          <p className="text-slate-600 dark:text-slate-400 mb-8">
            We couldn't find the course you're looking for
          </p>
          <Link
            href="/courses"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg hover:-translate-y-1 transition-all"
          >
            Browse All Courses
          </Link>
        </div>
      </div>
    </div>
  );
}
