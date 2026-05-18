"use client";

import { useEffect, useState } from "react";
import ProjectCard from "./ProjectCard";
import { Filter, Grid3x3, List, Search } from "lucide-react";

interface Project {
  _id: string;
  name: string;
  imageUrl: string;
  link: string;
  status: string;
  description: string;
  technologies: string[];
  category: string;
  featured: boolean;
  createdAt: string;
  updatedAt: string;
}

export default function ProjectsGrid() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  useEffect(() => {
    fetchProjects();
  }, []);

  useEffect(() => {
    let filtered = projects;

    if (searchQuery) {
      filtered = filtered.filter(
        (project) =>
          project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          project.technologies.some((tech) =>
            tech.toLowerCase().includes(searchQuery.toLowerCase())
          )
      );
    }

    if (selectedCategory !== "all") {
      filtered = filtered.filter((project) => project.category === selectedCategory);
    }

    setFilteredProjects(filtered);
  }, [projects, searchQuery, selectedCategory]);

  const fetchProjects = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/projects");
      const data = await response.json();

      if (response.ok) {
        setProjects(data.projects || []);
        setFilteredProjects(data.projects || []);
      } else {
        setError(data.message || "Failed to fetch projects");
      }
    } catch (error) {
      console.error("Error fetching projects:", error);
      setError("Failed to fetch projects");
    } finally {
      setIsLoading(false);
    }
  };

  const categories = [
    "all",
    ...new Set(projects.map((p) => p.category).filter(Boolean)),
  ];

  if (isLoading) return <LoadingState />;
  if (error) return <ErrorState error={error} onRetry={fetchProjects} />;
  if (projects.length === 0) return <EmptyState />;

  const featuredProjects = filteredProjects.filter((project) => project.featured);
  const regularProjects = filteredProjects.filter((project) => !project.featured);

  return (
    <div className="space-y-8">
      <section className="arch-panel p-6 space-y-5">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search projects or technologies..."
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

      {featuredProjects.length > 0 && (
        <section className="space-y-4">
          <h3 className="arch-heading-md">Featured</h3>
          <div
            className={
              viewMode === "grid"
                ? "grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
                : "space-y-4"
            }
          >
            {featuredProjects.map((project) => (
              <ProjectCard key={project._id} project={project} viewMode={viewMode} featured />
            ))}
          </div>
        </section>
      )}

      {regularProjects.length > 0 ? (
        <section className="space-y-4">
          <h3 className="arch-heading-md">{featuredProjects.length ? "All Projects" : "Projects"}</h3>
          <div
            className={
              viewMode === "grid"
                ? "grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
                : "space-y-4"
            }
          >
            {regularProjects.map((project) => (
              <ProjectCard key={project._id} project={project} viewMode={viewMode} />
            ))}
          </div>
        </section>
      ) : (
        <NoResultsState
          searchQuery={searchQuery}
          onClearFilters={() => {
            setSearchQuery("");
            setSelectedCategory("all");
          }}
        />
      )}
    </div>
  );
}

function LoadingState() {
  return (
    <div className="arch-panel py-20 text-center">
      <h3 className="arch-heading-md">Loading projects...</h3>
      <p className="mt-2 text-muted-foreground">Fetching latest work.</p>
    </div>
  );
}

function ErrorState({ error, onRetry }: { error: string; onRetry: () => void }) {
  return (
    <div className="arch-panel py-20 text-center">
      <h3 className="arch-heading-md">Could not load projects</h3>
      <p className="mt-2 text-muted-foreground">{error}</p>
      <button onClick={onRetry} className="arch-button mt-6">
        Try Again
      </button>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="arch-panel py-20 text-center">
      <h3 className="arch-heading-md">No projects yet</h3>
      <p className="mt-2 text-muted-foreground">
        Projects will appear once they are published.
      </p>
    </div>
  );
}

function NoResultsState({
  searchQuery,
  onClearFilters,
}: {
  searchQuery: string;
  onClearFilters: () => void;
}) {
  return (
    <div className="arch-panel py-20 text-center">
      <h3 className="arch-heading-md">No matching projects</h3>
      <p className="mt-2 text-muted-foreground">
        {searchQuery ? `No results for "${searchQuery}".` : "Adjust filters and try again."}
      </p>
      <button onClick={onClearFilters} className="arch-button-secondary mt-6">
        Clear Filters
      </button>
    </div>
  );
}
