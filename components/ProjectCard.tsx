import React from "react";

interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  link: string;
}

export default function ProjectCard({
  title,
  description,
  image,
  link,
}: ProjectCardProps) {
  return (
    <div className="project_card group shadow-lg shadow-slate-400">
      <div className="overflow-hidden rounded-t-lg">
        <div
          className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-t-lg transition-transform duration-300 group-hover:scale-105"
          style={{ backgroundImage: `url("${image}")` }}
        ></div>
      </div>
      <div className="p-5">
        <h3 className="project_title">{title}</h3>
        <p className="project_description">{description}</p>
        <a className="project_link font-medium mt-4 inline-block" href={link}>
          View Project →
        </a>
      </div>
    </div>
  );
}
