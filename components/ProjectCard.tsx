"use client";

import { ExternalLink, Github, Star, Clock, Code2 } from "lucide-react";
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
  const statusColors = {
    completed: "from-green-400 to-emerald-500",
    "in-progress": "from-yellow-400 to-orange-500",
    planned: "from-blue-400 to-cyan-500",
  };

  const statusColor =
    statusColors[project.status as keyof typeof statusColors] ||
    "from-slate-400 to-slate-500";

  if (viewMode === "list") {
    return (
      <div className="group bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 hover:border-indigo-500 dark:hover:border-indigo-500 transition-all duration-300 hover:shadow-2xl flex flex-col md:flex-row">
        {/* Image */}
        <div className="relative md:w-80 h-48 md:h-auto overflow-hidden bg-gradient-to-br from-indigo-500 to-purple-600">
          {project.imageUrl ? (
            <Image
              src={project.imageUrl}
              alt={project.name}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <Code2 className="w-16 h-16 text-white/50" />
            </div>
          )}

          {/* Status Badge */}
          <div className="absolute top-4 left-4">
            <span
              className={`px-3 py-1 bg-gradient-to-r ${statusColor} text-white rounded-full text-xs font-semibold shadow-lg`}
            >
              {project.status}
            </span>
          </div>

          {featured && (
            <div className="absolute top-4 right-4">
              <div className="p-2 bg-yellow-500 rounded-full shadow-lg">
                <Star className="w-4 h-4 text-white fill-white" />
              </div>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors mb-2">
                  {project.name}
                </h3>
                <span className="text-sm text-indigo-600 dark:text-indigo-400 font-medium">
                  {project.category}
                </span>
              </div>
            </div>

            <p className="text-slate-600 dark:text-slate-300 mb-4 line-clamp-2">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-2 mb-4">
              {project.technologies.slice(0, 5).map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-full text-xs font-medium"
                >
                  {tech}
                </span>
              ))}
              {project.technologies.length > 5 && (
                <span className="px-3 py-1 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-full text-xs font-medium">
                  +{project.technologies.length - 5} more
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href={project.link}
              target="_blank"
              className="group/btn flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-semibold hover:gap-3 transition-all"
            >
              <span>View Project</span>
              <ExternalLink className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="group bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 hover:border-indigo-500 dark:hover:border-indigo-500 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
      {/* Image */}
      <div className="relative h-48 overflow-hidden bg-gradient-to-br from-indigo-500 to-purple-600">
        {project.imageUrl ? (
          <Image
            src={project.imageUrl}
            alt={project.name}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Code2 className="w-16 h-16 text-white/50" />
          </div>
        )}

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

        {/* Badges */}
        <div className="absolute top-4 left-4 right-4 flex items-start justify-between">
          <span
            className={`px-3 py-1 bg-gradient-to-r ${statusColor} text-white rounded-full text-xs font-semibold shadow-lg`}
          >
            {project.status}
          </span>

          {featured && (
            <div className="p-2 bg-yellow-500 rounded-full shadow-lg">
              <Star className="w-4 h-4 text-white fill-white" />
            </div>
          )}
        </div>

        {/* View Project Button (appears on hover) */}
        <Link
          href={project.link}
          target="_blank"
          className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        >
          <div className="bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 px-6 py-3 rounded-xl font-semibold flex items-center gap-2 transform scale-90 group-hover:scale-100 transition-transform shadow-xl">
            <span>View Project</span>
            <ExternalLink className="w-5 h-5" />
          </div>
        </Link>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="mb-3">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-1 mb-2">
            {project.name}
          </h3>
          <span className="text-sm text-indigo-600 dark:text-indigo-400 font-medium">
            {project.category}
          </span>
        </div>

        <p className="text-slate-600 dark:text-slate-300 text-sm mb-4 line-clamp-2">
          {project.description}
        </p>

        {/* Technologies */}
        <div className="flex flex-wrap gap-2">
          {project.technologies.slice(0, 3).map((tech) => (
            <span
              key={tech}
              className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-full text-xs font-medium"
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 3 && (
            <span className="px-3 py-1 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-full text-xs font-medium">
              +{project.technologies.length - 3}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
