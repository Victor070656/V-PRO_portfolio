import React from "react";

interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  link: string;
  technologies?: string[];
  category?: string;
  status?: string;
  featured?: boolean;
  size?: "small" | "medium" | "large";
}

export default function ProjectCard({
  title,
  description,
  image,
  link,
  technologies = [],
  category = "Project",
  status = "Live",
  featured = false,
  size = "small",
}: ProjectCardProps) {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'live':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'development':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'maintenance':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case 'full-stack':
        return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      case 'frontend':
        return 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30';
      case 'backend':
        return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const isLarge = size === "large";
  const isMedium = size === "medium";

  return (
    <div className={`group relative overflow-hidden rounded-2xl bg-[var(--secondary-color)]/50 backdrop-blur-sm border border-[var(--accent-color)]/10 transition-all duration-500 hover:border-[var(--accent-color)]/30 hover:shadow-2xl hover:shadow-[var(--accent-color)]/20 hover:-translate-y-2 ${
      isLarge ? 'min-h-[500px]' : isMedium ? 'min-h-[450px]' : 'min-h-[400px]'
    }`}>
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 via-transparent to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Featured Badge */}
      {featured && (
        <div className="absolute top-4 left-4 z-10">
          <div className="bg-[var(--accent-color)] text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
            <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
            Featured
          </div>
        </div>
      )}

      {/* Status Badge */}
      <div className="absolute top-4 right-4 z-10">
        <div className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(status)}`}>
          {status}
        </div>
      </div>

      {/* Image Container */}
      <div className={`relative overflow-hidden ${isLarge ? 'h-64' : isMedium ? 'h-56' : 'h-48'}`}>
        <div
          className="absolute inset-0 bg-center bg-cover transition-transform duration-700 group-hover:scale-110"
          style={{ backgroundImage: `url("${image}")` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        
        {/* Overlay Content */}
        <div className="absolute bottom-4 left-4 right-4">
          <div className="flex items-center gap-2 mb-2">
            <div className={`px-2 py-1 rounded-md text-xs font-medium border ${getCategoryColor(category)}`}>
              {category}
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className={`p-6 ${isLarge ? 'space-y-4' : 'space-y-3'}`}>
        <div>
          <h3 className={`font-bold text-[var(--text-primary)] mb-2 group-hover:text-[var(--accent-color)] transition-colors ${
            isLarge ? 'text-2xl' : isMedium ? 'text-xl' : 'text-lg'
          }`}>
            {title}
          </h3>
          <p className={`text-[var(--text-secondary)] leading-relaxed ${
            isLarge ? 'text-base' : 'text-sm'
          }`}>
            {description}
          </p>
        </div>

        {/* Technologies */}
        {technologies.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {technologies.slice(0, isLarge ? 6 : 4).map((tech, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-[var(--accent-color)]/10 text-[var(--accent-color)] rounded-md text-xs font-medium border border-[var(--accent-color)]/20"
              >
                {tech}
              </span>
            ))}
            {technologies.length > (isLarge ? 6 : 4) && (
              <span className="px-2 py-1 bg-[var(--text-secondary)]/10 text-[var(--text-secondary)] rounded-md text-xs font-medium">
                +{technologies.length - (isLarge ? 6 : 4)}
              </span>
            )}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex items-center gap-3 pt-2">
          <a
            href={link}
            className="group/btn relative overflow-hidden bg-[var(--accent-color)] text-white px-4 py-2 rounded-lg font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[var(--accent-color)]/30 flex items-center gap-2"
          >
            <span className="relative z-10">View Project</span>
            <svg 
              className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
          </a>
          
          <button className="group/btn relative overflow-hidden bg-transparent text-[var(--text-primary)] px-4 py-2 rounded-lg font-medium border border-[var(--accent-color)]/30 transition-all duration-300 hover:border-[var(--accent-color)] hover:bg-[var(--accent-color)]/10 flex items-center gap-2">
            <span className="relative z-10">Details</span>
            <svg 
              className="w-4 h-4 transition-transform duration-300 group-hover/btn:rotate-45" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Hover Effect Border */}
      <div className="absolute inset-0 border-2 border-[var(--accent-color)] rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
    </div>
  );
}