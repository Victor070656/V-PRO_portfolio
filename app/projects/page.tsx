"use client";

import Navbar from "@/components/Navbar";
import ProjectsGrid from "@/components/ProjectsGrid";
import {
  Github,
  Linkedin,
  Twitter,
  Sparkles,
  Briefcase,
  Star,
  Code2,
} from "lucide-react";
import Link from "next/link";

export default function ProjectPage() {
  return (
    <div className="bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 text-slate-900 dark:text-slate-100 antialiased min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20"></div>

        {/* Animated Blobs */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 right-10 w-72 h-72 bg-white/10 rounded-full mix-blend-overlay filter blur-3xl animate-blob"></div>
          <div className="absolute bottom-20 left-10 w-72 h-72 bg-white/10 rounded-full mix-blend-overlay filter blur-3xl animate-blob animation-delay-2000"></div>
        </div>

        <div className="container mx-auto px-6 py-20 lg:py-32 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6 animate-fade-in">
              <div className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
              </div>
              <span className="text-sm font-medium">Portfolio Showcase</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black mb-6 animate-slide-up tracking-tight">
              My{" "}
              <span className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 to-pink-200">
                Projects
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-8 animate-slide-up animation-delay-100">
              A curated collection of projects that demonstrate my expertise in{" "}
              <span className="font-semibold text-yellow-200">
                modern web development
              </span>
              , showcasing innovative solutions and clean, scalable code.
            </p>

            {/* Stats */}
            <div className="flex flex-wrap items-center justify-center gap-8 mb-8 animate-slide-up animation-delay-200">
              <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-2xl border border-white/20">
                <div className="w-10 h-10 bg-green-500/20 rounded-full flex items-center justify-center">
                  <div className="w-4 h-4 bg-green-400 rounded-full animate-pulse"></div>
                </div>
                <div className="text-left">
                  <div className="text-sm text-white/80">Status</div>
                  <div className="font-semibold">Available for hire</div>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-2xl border border-white/20">
                <div className="w-10 h-10 bg-purple-500/20 rounded-full flex items-center justify-center">
                  <Briefcase className="w-5 h-5 text-purple-200" />
                </div>
                <div className="text-left">
                  <div className="text-sm text-white/80">Completed</div>
                  <div className="font-semibold">50+ Projects</div>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-2xl border border-white/20">
                <div className="w-10 h-10 bg-yellow-500/20 rounded-full flex items-center justify-center">
                  <Star className="w-5 h-5 text-yellow-200 fill-yellow-200" />
                </div>
                <div className="text-left">
                  <div className="text-sm text-white/80">Rating</div>
                  <div className="font-semibold">5.0 Average</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Wave Divider */}
        {/* <div className="absolute bottom-0 left-0 right-0">
          <svg
            viewBox="0 0 1440 120"
            className="w-full h-12 fill-slate-50 dark:fill-slate-950"
          >
            <path d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"></path>
          </svg>
        </div> */}
      </section>

      {/* Projects Section */}
      <main className="container mx-auto px-6 py-16 -mt-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-indigo-100 dark:bg-indigo-900/30 px-4 py-2 rounded-full mb-4">
              <Code2 className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              <span className="text-sm font-semibold text-indigo-600 dark:text-indigo-400">
                Featured Work
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Building Digital{" "}
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Experiences
              </span>
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-lg max-w-2xl mx-auto">
              Each project represents a unique challenge solved with creativity,
              technical expertise, and attention to detail.
            </p>
          </div>

          {/* Projects Grid */}
          <div className="mb-20">
            <ProjectsGrid />
          </div>

          {/* Call to Action */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-3xl blur-lg opacity-20"></div>
            <div className="relative bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-3xl p-1">
              <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 md:p-12">
                <div className="text-center mb-8">
                  <div className="inline-flex items-center gap-2 bg-indigo-100 dark:bg-indigo-900/30 px-4 py-2 rounded-full mb-6">
                    <Sparkles className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                    <span className="text-sm font-semibold text-indigo-600 dark:text-indigo-400">
                      Let's Collaborate
                    </span>
                  </div>
                  <h3 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
                    Let's Build Something Amazing Together
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 text-lg max-w-2xl mx-auto">
                    Ready to bring your ideas to life? I'm always excited to
                    work on challenging projects and collaborate with
                    forward-thinking teams.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
                  <Link
                    href="/contact"
                    className="group relative overflow-hidden bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-500/50 hover:-translate-y-1 min-w-[200px] text-center"
                  >
                    <span className="relative z-10">Get In Touch</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </Link>

                  <Link
                    href="/courses"
                    className="group bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white px-8 py-4 rounded-2xl font-bold text-lg border-2 border-slate-200 dark:border-slate-700 hover:border-indigo-500 dark:hover:border-indigo-500 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 min-w-[200px] text-center"
                  >
                    <span>View Courses</span>
                  </Link>
                </div>

                {/* Info Pills */}
                <div className="flex flex-wrap items-center justify-center gap-6 pt-8 border-t border-slate-200 dark:border-slate-800">
                  <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span>Typically responds within 24 hours</span>
                  </div>
                  <div className="w-1 h-1 bg-slate-400 rounded-full hidden sm:block"></div>
                  <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
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
      <footer className="relative bg-slate-100 dark:bg-slate-900 mt-24 border-t border-slate-200 dark:border-slate-800">
        <div className="container mx-auto px-6 py-12">
          <div className="max-w-4xl mx-auto">
            {/* Footer Content */}
            <div className="text-center mb-8">
              <h4 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
                Victor Ikechukwu
              </h4>
              <p className="text-slate-600 dark:text-slate-400 mb-6">
                Full-stack developer passionate about creating exceptional
                digital experiences
              </p>

              {/* Social Links */}
              <div className="flex items-center justify-center gap-4 mb-8">
                {[
                  {
                    Icon: Linkedin,
                    href: "https://linkedin.com/in/victorikechukwu",
                    label: "LinkedIn",
                    color: "hover:bg-blue-500",
                  },
                  {
                    Icon: Github,
                    href: "https://github.com/Victor070656",
                    label: "GitHub",
                    color: "hover:bg-slate-700",
                  },
                  {
                    Icon: Twitter,
                    href: "https://x.com/victor10722752",
                    label: "Twitter",
                    color: "hover:bg-sky-500",
                  },
                ].map(({ Icon, href, label, color }) => (
                  <Link
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group w-12 h-12 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg ${color} hover:text-white hover:border-transparent`}
                    aria-label={label}
                  >
                    <Icon className="w-5 h-5" />
                  </Link>
                ))}
              </div>
            </div>

            {/* Copyright */}
            <div className="pt-8 border-t border-slate-200 dark:border-slate-800 text-center">
              <p className="text-sm text-slate-600 dark:text-slate-400">
                © 2024 Victor Ikechukwu. All rights reserved. Built with{" "}
                <span className="text-red-500">❤️</span> and modern web
                technologies.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
