"use client";

import { useEffect, useState } from "react";
import { Course } from "@/lib/models/course";
import CourseCard from "@/components/CourseCard";
import Navbar from "@/components/Navbar";
import { Filter, Grid3x3, List, Search } from "lucide-react";

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchCourses() {
      try {
        const res = await fetch("/api/courses");
        const data = await res.json();
        setCourses(data.courses || []);
        setFilteredCourses(data.courses || []);
      } catch (error) {
        console.error("Error fetching courses:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchCourses();
  }, []);

  useEffect(() => {
    let filtered = courses;

    if (searchQuery) {
      filtered = filtered.filter(
        (course) =>
          course.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          course.description?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedCategory !== "all") {
      filtered = filtered.filter((course) => course.category === selectedCategory);
    }

    setFilteredCourses(filtered);
  }, [searchQuery, selectedCategory, courses]);

  const categories = [
    "all",
    ...new Set(courses.map((c) => c.category).filter(Boolean)),
  ];

  return (
    <div className="arch-shell">
      <Navbar />

      <main className="arch-container py-16 md:py-20 space-y-10">
        <section className="arch-panel p-8 md:p-12">
          <p className="arch-kicker mb-4">Learning Platform</p>
          <h1 className="arch-heading-lg mb-4">Courses for practical mastery</h1>
          <p className="text-lg text-muted-foreground leading-8 max-w-3xl">
            Structured programs with production-oriented lessons, clear progress,
            and outcomes aligned with real engineering work.
          </p>
        </section>

        <section className="arch-panel p-6 space-y-5">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search courses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="arch-input pl-11"
            />
          </div>

          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-wrap items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={
                    selectedCategory === category
                      ? "arch-button !px-4 !py-2"
                      : "arch-button-secondary !px-4 !py-2"
                  }
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
              ))}
            </div>

            <div className="flex items-center rounded border border-border bg-muted p-1">
              <button
                onClick={() => setViewMode("grid")}
                className={`rounded p-2 ${viewMode === "grid" ? "bg-card text-foreground" : "text-muted-foreground"}`}
              >
                <Grid3x3 className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`rounded p-2 ${viewMode === "list" ? "bg-card text-foreground" : "text-muted-foreground"}`}
              >
                <List className="h-4 w-4" />
              </button>
            </div>
          </div>
        </section>

        <section>
          {isLoading ? (
            <LoadingState />
          ) : filteredCourses.length === 0 ? (
            <EmptyState searchQuery={searchQuery} />
          ) : (
            <div
              className={
                viewMode === "grid"
                  ? "grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
                  : "space-y-4"
              }
            >
              {filteredCourses.map((course) => (
                <CourseCard
                  key={course._id?.toString()}
                  course={course}
                  viewMode={viewMode}
                />
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

function LoadingState() {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="arch-panel animate-pulse overflow-hidden">
          <div className="h-44 bg-muted" />
          <div className="space-y-3 p-5">
            <div className="h-4 w-3/4 rounded bg-muted" />
            <div className="h-4 w-1/2 rounded bg-muted" />
            <div className="h-4 w-full rounded bg-muted" />
          </div>
        </div>
      ))}
    </div>
  );
}

function EmptyState({ searchQuery }: { searchQuery: string }) {
  return (
    <div className="arch-panel py-20 text-center">
      <h3 className="arch-heading-md mb-2">No courses found</h3>
      <p className="text-muted-foreground">
        {searchQuery
          ? `No results for "${searchQuery}".`
          : "No courses available at the moment."}
      </p>
    </div>
  );
}
