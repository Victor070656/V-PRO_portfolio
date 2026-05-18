"use client";

import { ExternalLink, Star } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface ProjectCardProps {
  project: {
    _id: string;
    name: string;
    imageUrl: string;
    link: string;
    status: string;
    description: string;
    technologies: string[];
    category: string;
  };
  viewMode?: "grid" | "list";
  featured?: boolean;
}

export default function ProjectCard({
  project,
  viewMode = "grid",
  featured = false,
}: ProjectCardProps) {
  if (viewMode === "list") {
    return (
      <div className="arch-panel overflow-hidden">
        <div className="flex flex-col md:flex-row">
          <div className="relative h-52 md:h-auto md:w-72 bg-muted">
            {project.imageUrl ? (
              <Image src={project.imageUrl} alt={project.name} fill className="object-cover" />
            ) : null}
          </div>

          <div className="flex-1 p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="arch-kicker mb-1">{project.category || "General"}</p>
                <h3 className="text-2xl font-semibold">{project.name}</h3>
              </div>
              {featured ? <Star className="h-4 w-4 text-primary" /> : null}
            </div>

            <p className="mt-3 text-muted-foreground line-clamp-2">{project.description}</p>

            <div className="mt-4 flex flex-wrap gap-2">
              {project.technologies.slice(0, 5).map((tech) => (
                <span key={tech} className="arch-chip">
                  {tech}
                </span>
              ))}
            </div>

            <Link
              href={project.link}
              target="_blank"
              className="mt-6 inline-flex items-center gap-2 text-primary hover:underline"
            >
              View Project
              <ExternalLink className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <article className="arch-panel overflow-hidden transition-colors hover:border-primary">
      <div className="relative h-48 bg-muted">
        {project.imageUrl ? (
          <Image src={project.imageUrl} alt={project.name} fill className="object-cover" />
        ) : null}
      </div>

      <div className="p-5">
        <div className="mb-2 flex items-start justify-between gap-2">
          <p className="arch-kicker">{project.category || "General"}</p>
          {featured ? <Star className="h-4 w-4 text-primary" /> : null}
        </div>
        <h3 className="text-xl font-semibold line-clamp-1">{project.name}</h3>
        <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{project.description}</p>

        <div className="mt-4 flex flex-wrap gap-2">
          {project.technologies.slice(0, 3).map((tech) => (
            <span key={tech} className="arch-chip">
              {tech}
            </span>
          ))}
        </div>

        <Link
          href={project.link}
          target="_blank"
          className="mt-5 inline-flex items-center gap-2 text-primary hover:underline"
        >
          View Project
          <ExternalLink className="h-4 w-4" />
        </Link>
      </div>
    </article>
  );
}
