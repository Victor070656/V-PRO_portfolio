import Navbar from "@/components/Navbar";
import ProjectsGrid from "@/components/ProjectsGrid";

export default function ProjectPage() {
  return (
    <div className="bg-[var(--background-color)] text-[var(--text-primary)] transition-colors duration-300 min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 px-4 sm:px-10 lg:px-20 py-12">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-[var(--text-primary)] tracking-tighter">
              My Projects
            </h1>
            <p className="mt-4 text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
              A selection of projects I've worked on, showcasing my skills and
              experience in software development.
            </p>
          </div>

          <ProjectsGrid />

          <div className="mt-16 flex justify-center gap-4">
            <button className="button_secondary">View All Projects</button>
            <button className="button_primary">Contact Me</button>
          </div>
        </div>
      </main>

      <footer className="bg-[var(--secondary-color)] py-8 mt-16">
        <div className="container mx-auto px-4 text-center text-[var(--text-secondary)]">
          <p className="text-sm">
            © 2024 Victor Ikechukwu. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
