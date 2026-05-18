"use client";

import Navbar from "@/components/Navbar";
import ProjectsGrid from "@/components/ProjectsGrid";

export default function ProjectPage() {
  return (
    <div className="arch-shell">
      <Navbar />

      <main className="arch-container py-16 md:py-20 space-y-12">
        <section className="arch-panel p-8 md:p-12">
          <p className="arch-kicker mb-4">Portfolio</p>
          <h1 className="arch-heading-lg mb-4">Selected engineering work</h1>
          <p className="max-w-3xl text-lg text-muted-foreground leading-8">
            A curated set of production projects focused on clean architecture,
            resilient implementation, and measurable product outcomes.
          </p>
        </section>

        <ProjectsGrid />
      </main>
    </div>
  );
}
