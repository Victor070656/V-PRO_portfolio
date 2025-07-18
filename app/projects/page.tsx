import Navbar from "@/components/Navbar";
import ProjectsGrid from "@/components/ProjectsGrid";
import { Github, Linkedin, TwitterIcon } from "lucide-react";
import Link from "next/link";

export default function ProjectPage() {
  return (
    <div className="bg-[var(--background-color)] text-[var(--text-primary)] transition-colors duration-300 min-h-screen flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-transparent to-purple-600/10 pointer-events-none" />
        <div className="relative px-4 sm:px-10 lg:px-20 py-16 sm:py-24">
          <div className="mx-auto max-w-4xl text-center">
            <div className="inline-flex items-center gap-2 bg-[var(--accent-color)]/10 text-[var(--accent-color)] px-4 py-2 rounded-full text-sm font-medium mb-6 border border-[var(--accent-color)]/20">
              <span className="w-2 h-2 bg-[var(--accent-color)] rounded-full animate-pulse"></span>
              Portfolio
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-[var(--text-primary)] tracking-tighter mb-6">
              My{" "}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Projects
              </span>
            </h1>

            <p className="text-xl sm:text-2xl text-[var(--text-secondary)] max-w-3xl mx-auto leading-relaxed mb-8">
              A curated collection of projects that demonstrate my expertise in
              <span className="text-[var(--accent-color)] font-semibold">
                {" "}
                modern web development
              </span>
              , showcasing innovative solutions and clean, scalable code.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <div className="flex items-center gap-2 text-[var(--text-secondary)]">
                <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <span className="text-sm font-medium">Available for hire</span>
              </div>
              <div className="hidden sm:block w-1 h-1 bg-[var(--text-secondary)] rounded-full"></div>
              <div className="flex items-center gap-2 text-[var(--text-secondary)]">
                <span className="text-sm font-medium">
                  50+ Projects completed
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <main className="flex-1 px-4 sm:px-10 lg:px-20 py-12">
        <div className="mx-auto max-w-7xl">
          {/* Section Header */}
          <div className="mb-16">
            <div className="flex items-center gap-4 mb-6">
              <div className="h-px bg-gradient-to-r from-transparent via-[var(--accent-color)] to-transparent flex-1"></div>
              <h2 className="text-2xl font-bold text-[var(--text-primary)] px-4">
                Featured Work
              </h2>
              <div className="h-px bg-gradient-to-r from-transparent via-[var(--accent-color)] to-transparent flex-1"></div>
            </div>

            <p className="text-center text-[var(--text-secondary)] max-w-2xl mx-auto">
              Each project represents a unique challenge solved with creativity,
              technical expertise, and attention to detail.
            </p>
          </div>

          {/* Projects Grid */}
          <div className="mb-16">
            <ProjectsGrid />
          </div>

          {/* Call to Action */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-purple-600/5 rounded-3xl"></div>
            <div className="relative bg-[var(--secondary-color)]/50 backdrop-blur-sm rounded-3xl p-8 sm:p-12 border border-[var(--accent-color)]/10">
              <div className="text-center mb-8">
                <h3 className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)] mb-4">
                  Let's Build Something Amazing Together
                </h3>
                <p className="text-[var(--text-secondary)] max-w-2xl mx-auto">
                  Ready to bring your ideas to life? I'm always excited to work
                  on challenging projects and collaborate with forward-thinking
                  teams.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/contact"
                  className="group relative overflow-hidden bg-[var(--accent-color)] text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[var(--accent-color)]/25 min-w-[200px]"
                >
                  <span className="relative z-10">Get In Touch</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </Link>
              </div>

              {/* Contact Info */}
              <div className="mt-8 pt-8 border-t border-[var(--accent-color)]/20">
                <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-[var(--text-secondary)]">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Typically responds within 24 hours</span>
                  </div>
                  <div className="hidden sm:block w-1 h-1 bg-[var(--text-secondary)] rounded-full"></div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span>Open to remote opportunities</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Enhanced Footer */}
      <footer className="relative bg-[var(--secondary-color)] mt-24">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--accent-color)]/50 to-transparent"></div>

        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            {/* Footer Content */}
            <div className="text-center mb-8">
              <h4 className="text-xl font-bold text-[var(--text-primary)] mb-4">
                Victor Ikechukwu
              </h4>
              <p className="text-[var(--text-secondary)] mb-6">
                Full-stack developer passionate about creating exceptional
                digital experiences
              </p>

              {/* Social Links Placeholder */}
              <div className="flex items-center justify-center gap-4 mb-8">
                <Link
                  href="https://linkedin.com/in/victorikechukwu"
                  className="w-10 h-10 bg-[var(--accent-color)]/10 rounded-full flex items-center justify-center border border-[var(--accent-color)]/20 hover:bg-[var(--accent-color)]/20 transition-colors cursor-pointer"
                >
                  <Linkedin className="text-[var(--accent-color)] text-sm font-bold" />
                </Link>
                <Link
                  href="https://github.com/Victor070656"
                  className="w-10 h-10 bg-[var(--accent-color)]/10 rounded-full flex items-center justify-center border border-[var(--accent-color)]/20 hover:bg-[var(--accent-color)]/20 transition-colors cursor-pointer"
                >
                  <Github className="text-[var(--accent-color)] text-sm font-bold" />
                </Link>
                <Link
                  href="https://x.com/victor10722752"
                  className="w-10 h-10 bg-[var(--accent-color)]/10 rounded-full flex items-center justify-center border border-[var(--accent-color)]/20 hover:bg-[var(--accent-color)]/20 transition-colors cursor-pointer"
                >
                  <TwitterIcon className="text-[var(--accent-color)] text-sm font-bold" />
                </Link>
              </div>
            </div>

            {/* Copyright */}
            <div className="pt-8 border-t border-[var(--accent-color)]/20 text-center">
              <p className="text-sm text-[var(--text-secondary)]">
                © 2024 Victor Ikechukwu. All rights reserved. Built with passion
                and modern web and mobile technologies.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
