"use client";

import { useState, useEffect } from "react";
import ProjectCard from "./ProjectCard";

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
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/projects");
      const data = await response.json();
      
      if (response.ok) {
        setProjects(data.projects || []);
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

  if (isLoading) {
    return (
      <div className="space-y-8">
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--accent-color)]"></div>
          <p className="mt-4 text-[var(--text-secondary)]">Loading projects...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-8">
        <div className="text-center py-12">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative max-w-md mx-auto">
            <strong className="font-bold">Error: </strong>
            <span className="block sm:inline">{error}</span>
          </div>
          <button
            onClick={fetchProjects}
            className="mt-4 bg-[var(--accent-color)] text-white px-4 py-2 rounded-lg font-medium hover:bg-[var(--accent-color)]/90 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (projects.length === 0) {
    return (
      <div className="space-y-8">
        <div className="text-center py-12">
          <div className="bg-[var(--secondary-color)]/50 backdrop-blur-sm rounded-2xl p-8 border border-[var(--accent-color)]/10 max-w-md mx-auto">
            <h3 className="text-2xl font-bold text-[var(--text-primary)] mb-4">
              No Projects Yet
            </h3>
            <p className="text-[var(--text-secondary)] mb-6">
              Projects will appear here once they're added to the portfolio.
            </p>
            <div className="w-16 h-16 bg-[var(--accent-color)]/10 rounded-full flex items-center justify-center mx-auto">
              <svg className="w-8 h-8 text-[var(--accent-color)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const featuredProjects = projects.filter(project => project.featured);
  const regularProjects = projects.filter(project => !project.featured);

  return (
    <div className="space-y-8">
      {/* Featured Projects */}
      {featuredProjects.length > 0 && (
        <section>
          <h2 className="text-3xl font-bold mb-6 text-[var(--accent-color)]">
            Featured Projects
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProjects.map((project) => (
              <ProjectCard
                key={project._id}
                title={project.name}
                description={project.description}
                image={project.imageUrl}
                link={project.link}
                technologies={project.technologies}
                category={project.category}
                status={project.status}
                featured={project.featured}
                size="large"
              />
            ))}
          </div>
        </section>
      )}

      {/* Regular Projects */}
      {regularProjects.length > 0 && (
        <section>
          <h2 className="text-3xl font-bold mb-6 text-[var(--accent-color)]">
            {featuredProjects.length > 0 ? "Other Projects" : "My Projects"}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {regularProjects.map((project) => (
              <ProjectCard
                key={project._id}
                title={project.name}
                description={project.description}
                image={project.imageUrl}
                link={project.link}
                technologies={project.technologies}
                category={project.category}
                status={project.status}
                featured={project.featured}
                size="small"
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}