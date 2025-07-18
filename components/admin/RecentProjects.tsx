"use client";

import { MoreVertical, ExternalLink } from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";

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

export default function RecentProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await fetch("/api/projects");
      const data = await response.json();
      setProjects(data.projects?.slice(0, 4) || []);
    } catch (error) {
      console.error("Error fetching projects:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'live':
        return 'bg-green-100 text-green-800';
      case 'development':
        return 'bg-yellow-100 text-yellow-800';
      case 'maintenance':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="admin-card p-6 rounded-xl h-full">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-[var(--text-primary)]">Recent Projects</h3>
        <Link
          href="/admin/projects"
          className="text-sm text-[var(--accent-color)] hover:text-[var(--accent-color)]/80 transition-colors"
        >
          View All
        </Link>
      </div>

      {isLoading ? (
        <div className="space-y-4">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="flex items-center gap-4 animate-pulse">
              <div className="w-12 h-12 bg-[var(--secondary-color)] rounded-lg"></div>
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-[var(--secondary-color)] rounded w-2/3"></div>
                <div className="h-3 bg-[var(--secondary-color)] rounded w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      ) : projects.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-[var(--text-secondary)] mb-4">No projects yet</p>
          <Link
            href="/admin/projects"
            className="inline-flex items-center gap-2 bg-[var(--accent-color)] text-white px-4 py-2 rounded-lg text-sm hover:bg-[var(--accent-color)]/90 transition-colors"
          >
            Add Your First Project
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {projects.map((project) => (
            <div key={project._id} className="flex items-center gap-4 p-3 rounded-lg hover:bg-[var(--secondary-color)] transition-colors">
              <div className="w-12 h-12 rounded-lg overflow-hidden bg-[var(--secondary-color)] flex-shrink-0">
                <img
                  src={project.imageUrl}
                  alt={project.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm text-[var(--text-primary)] truncate">{project.name}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                    {project.status}
                  </span>
                  <span className="text-xs text-[var(--text-secondary)]">
                    {project.category}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-[var(--text-secondary)] hover:text-[var(--accent-color)] transition-colors"
                  title="View project"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
                <button className="p-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
                  <MoreVertical className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}