"use client";

import { ExternalLink } from "lucide-react";
import { useEffect, useState } from "react";
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

  return (
    <div className="arch-panel p-6 h-full">
      <div className="flex items-center justify-between mb-6">
        <h3 className="arch-heading-md">Recent Projects</h3>
        <Link href="/admin/projects" className="text-sm text-primary hover:underline">
          View all
        </Link>
      </div>

      {isLoading ? (
        <div className="space-y-3">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="h-14 rounded bg-muted animate-pulse" />
          ))}
        </div>
      ) : projects.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">No projects yet.</div>
      ) : (
        <div className="space-y-3">
          {projects.map((project) => (
            <div key={project._id} className="flex items-center gap-3 rounded border border-border p-3">
              <div className="w-10 h-10 rounded overflow-hidden bg-muted shrink-0">
                {project.imageUrl ? (
                  <img src={project.imageUrl} alt={project.name} className="w-full h-full object-cover" />
                ) : null}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{project.name}</p>
                <p className="text-xs text-muted-foreground">{project.status}</p>
              </div>
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                title="View project"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
