import ProjectCard from "./ProjectCard";

const projects = [
  {
    title: "E-commerce Platform",
    description:
      "A full-featured e-commerce platform with user authentication, product catalog, shopping cart, and payment gateway integration.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBKZLfKKAci6Vlw8ydT0oY26P1iW4Yy1iVfMQk_oZUTFETukGirzE53edO7lYMFYSPekQ_qHTizBvIlimx9VW1GJp5GcHQYiRpI07Ydh0YmuVo3rJE0wtyiUW6kAY7fE3x2KBpIjHIPn9iBn9upOhosBlx7fFAhr4on2G-o1MTqXb9TGeCZOLGvzlqvL35PwL14fJlHugOO6Cq5gUu6vWEaCXxRcP5CRTssdhlIWl0jWkz5EN5f0fm1uvISbfnFB0zbxVeVRO3RhDBB",
    link: "#",
    technologies: ["React", "Node.js", "MongoDB", "Stripe"],
    category: "Full-stack",
    status: "Live",
    featured: true,
  },
  {
    title: "Social Media Dashboard",
    description:
      "A dashboard for managing social media accounts, scheduling posts, and analyzing engagement metrics.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDTl7zt9N19wLxsSOLbIxrXogluZQDjbONiFx9JCexi9AHAlvj7QsAuvna0u6F0wbz7OLyq7HrBqwN0M30imSJnyygSRVTFaWn_KAlZCzkiUQCkleKBkL_oGlU0DRrvGPox8F7efiSguqliCPGS9DdzANWE4Cyyce45PNaJUrCL9CDJLhdcUeq03WxePO1zRuzFx5ZpEqIGGl8BFdxRI52k32nEsB3P8Xk9f3m1z24z_4R2d51fDMnfMB-Ki_P3WkXRylx8nMFwkBOO",
    link: "#",
    technologies: ["Vue.js", "Firebase", "Chart.js", "Tailwind"],
    category: "Frontend",
    status: "Development",
    featured: false,
  },
  {
    title: "Task Management App",
    description:
      "A task management application with features for creating, organizing, and tracking tasks and projects.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuD-Bnj2qgi2_JVqi1_gntXVdOFpPxJnh90lyQiDdE9Z-pMH8zFLBbYwUt0B0ln1lQaZA8fJMWq5yROAMdndU7SqpRgFF_pR22B4BkIAXbpD8TfeuwT54I3KQJGabz0alC0PjQMGx9UHzxk5UwXNaEMXkHLId1B1L0f45Im5fZRdVJPwn9LqcSX6ZJYsyj-QiQHnTplQBghGYZzhVMjHKrAoZM1OS4dWCLxSBvfzGmLwIyLdsseRPW6OLvBoLlsQ0axvtpM3dHVs6kqd",
    link: "#",
    technologies: ["React", "TypeScript", "Prisma", "PostgreSQL"],
    category: "Full-stack",
    status: "Live",
    featured: true,
  },
];

export default function ProjectsGrid() {
  return (
    <div className="space-y-8">
      {/* Featured Projects */}
      <section>
        <h2 className="text-3xl font-bold mb-6 text-[var(--accent-color)]">
          Featured Projects
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects
            .filter((project) => project.featured)
            .map((project, index) => (
              <ProjectCard
                key={`featured-${index}`}
                title={project.title}
                description={project.description}
                image={project.image}
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

      {/* Regular Projects */}
      <section>
        <h2 className="text-3xl font-bold mb-6 text-[var(--accent-color)]">
          Other Projects
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects
            .filter((project) => !project.featured)
            .map((project, index) => (
              <ProjectCard
                key={`regular-${index}`}
                title={project.title}
                description={project.description}
                image={project.image}
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
    </div>
  );
}
