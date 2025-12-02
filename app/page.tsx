"use client";

import Navbar from "@/components/Navbar";
import Link from "next/link";
import {
  ArrowRight,
  Sparkles,
  Code2,
  Palette,
  Zap,
  CheckCircle2,
  Github,
  Linkedin,
  Twitter,
  Mail,
  Download,
  Play,
  Award,
  Users,
  Briefcase,
} from "lucide-react";
import { useState, useEffect } from "react";

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 text-slate-900 dark:text-slate-100 antialiased min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 lg:pt-32 pb-32">
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 right-10 w-72 h-72 bg-purple-500/30 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
          <div className="absolute top-40 left-10 w-72 h-72 bg-indigo-500/30 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-20 left-1/2 w-72 h-72 bg-pink-500/30 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Content Section */}
            <div
              className={`space-y-8 ${
                mounted ? "animate-fade-in-up" : "opacity-0"
              }`}
            >
              {/* Status Badge */}
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500/10 to-emerald-500/10 backdrop-blur-sm border border-green-500/20 rounded-full px-4 py-2 w-fit">
                <div className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                </div>
                <span className="text-sm font-semibold text-green-700 dark:text-green-400">
                  Available for opportunities
                </span>
              </div>

              {/* Main Heading */}
              <div className="space-y-6">
                <div className="space-y-2">
                  <p className="text-indigo-600 dark:text-indigo-400 font-semibold text-lg tracking-wide flex items-center gap-2">
                    <Sparkles className="w-5 h-5" />
                    Hello, I'm
                  </p>
                  <h1 className="text-6xl md:text-7xl lg:text-8xl font-black tracking-tight leading-none">
                    Victor
                    <br />
                    <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-gradient">
                      Ikechukwu
                    </span>
                  </h1>
                </div>

                <div className="flex flex-wrap gap-3">
                  {[
                    "Software Developer",
                    "Digital Craftsman",
                    "Problem Solver",
                  ].map((tag, i) => (
                    <span
                      key={tag}
                      className="px-4 py-2 bg-slate-100 dark:bg-slate-800 rounded-xl text-sm font-medium text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
                      style={{ animationDelay: `${i * 100}ms` }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Description */}
              <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 leading-relaxed max-w-xl">
                I specialize in building{" "}
                <span className="text-indigo-600 dark:text-indigo-400 font-semibold">
                  exceptional digital experiences
                </span>{" "}
                that combine beautiful design with robust functionality.
                Passionate about modern web technologies and creating solutions
                that make a difference.
              </p>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 py-6">
                {[
                  { icon: Award, value: "3+", label: "Years Experience" },
                  { icon: Briefcase, value: "50+", label: "Projects Done" },
                  { icon: Users, value: "100%", label: "Satisfaction" },
                ].map((stat, i) => (
                  <div
                    key={stat.label}
                    className="text-center p-4 rounded-2xl bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 hover:border-indigo-500 dark:hover:border-indigo-500 transition-all duration-300 hover:shadow-lg"
                  >
                    <stat.icon className="w-6 h-6 mx-auto mb-2 text-indigo-600 dark:text-indigo-400" />
                    <div className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                      {stat.value}
                    </div>
                    <div className="text-xs text-slate-600 dark:text-slate-400 font-medium mt-1">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/projects"
                  className="group relative bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 px-8 rounded-2xl font-bold text-lg transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-500/50 hover:-translate-y-1 active:translate-y-0 overflow-hidden flex items-center justify-center gap-2"
                >
                  <span className="relative z-10">View My Work</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </Link>

                <Link
                  href="/contact"
                  className="group relative bg-white dark:bg-slate-800 text-slate-900 dark:text-white py-4 px-8 rounded-2xl font-bold text-lg border-2 border-slate-200 dark:border-slate-700 hover:border-indigo-500 dark:hover:border-indigo-500 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 active:translate-y-0 flex items-center justify-center gap-2"
                >
                  <span>Get In Touch</span>
                  <Mail className="w-5 h-5" />
                </Link>
              </div>

              {/* Social Links */}
              <div className="flex gap-4 pt-4">
                {[
                  {
                    Icon: Twitter,
                    href: "https://x.com/victor10722752",
                    label: "Twitter",
                  },
                  {
                    Icon: Linkedin,
                    href: "https://linkedin.com/in/victorikechukwu",
                    label: "LinkedIn",
                  },
                  {
                    Icon: Github,
                    href: "https://github.com/Victor070656",
                    label: "GitHub",
                  },
                ].map(({ Icon, href, label }) => (
                  <Link
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-indigo-500 dark:hover:border-indigo-500 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg"
                    aria-label={label}
                  >
                    <Icon className="w-5 h-5 text-slate-600 dark:text-slate-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors" />
                  </Link>
                ))}
              </div>
            </div>

            {/* Image Section */}
            <div
              className={`relative ${
                mounted ? "animate-fade-in-up animation-delay-200" : "opacity-0"
              }`}
            >
              {/* Decorative elements */}
              <div className="absolute -inset-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-3xl blur-3xl opacity-20 animate-pulse"></div>

              {/* Floating badges */}
              <div className="absolute -top-4 -right-4 z-20">
                <div className="bg-white dark:bg-slate-800 rounded-2xl p-4 shadow-2xl border border-slate-200 dark:border-slate-700 animate-float">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl flex items-center justify-center">
                      <CheckCircle2 className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-slate-900 dark:text-white">
                        Verified
                      </div>
                      <div className="text-xs text-slate-600 dark:text-slate-400">
                        Professional
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-4 -left-4 z-20">
                <div className="bg-white dark:bg-slate-800 rounded-2xl p-4 shadow-2xl border border-slate-200 dark:border-slate-700 animate-float animation-delay-1000">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-xl flex items-center justify-center">
                      <Zap className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-slate-900 dark:text-white">
                        Fast
                      </div>
                      <div className="text-xs text-slate-600 dark:text-slate-400">
                        Delivery
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Main image container */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white dark:border-slate-800 aspect-square max-w-lg mx-auto">
                <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/20 to-purple-500/20"></div>
                <img
                  alt="Victor Ikechukwu - Software Developer"
                  className="w-full h-full object-cover relative z-10 transition-transform duration-700 hover:scale-110"
                  src="/vic.jpg"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 via-transparent to-transparent"></div>
              </div>

              {/* Pattern overlay */}
              <div className="absolute top-8 right-8 w-32 h-32 opacity-10">
                <div className="grid grid-cols-4 gap-2">
                  {[...Array(16)].map((_, i) => (
                    <div
                      key={i}
                      className="w-2 h-2 bg-indigo-600 rounded-full"
                    ></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="flex flex-col items-center gap-2 text-slate-400">
            <span className="text-xs font-medium">Scroll to explore</span>
            <div className="w-6 h-10 border-2 border-slate-300 dark:border-slate-700 rounded-full flex justify-center p-2">
              <div className="w-1 h-3 bg-slate-400 rounded-full animate-scroll"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-20 bg-white dark:bg-slate-900/50 relative overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-indigo-100 dark:bg-indigo-900/30 px-4 py-2 rounded-full mb-4">
              <Code2 className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              <span className="text-sm font-semibold text-indigo-600 dark:text-indigo-400">
                My Expertise
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Skills &{" "}
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Technologies
              </span>
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-lg max-w-2xl mx-auto">
              Leveraging modern tools and frameworks to build scalable solutions
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: "⚛️",
                title: "Frontend Development",
                skills: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
                color: "from-blue-500 to-cyan-500",
              },
              {
                icon: "⚙️",
                title: "Backend Development",
                skills: ["Node.js", "Express", "MongoDB", "PostgreSQL"],
                color: "from-green-500 to-emerald-500",
              },
              {
                icon: "🎨",
                title: "UI/UX Design",
                skills: [
                  "Figma",
                  "Adobe XD",
                  "Responsive Design",
                  "Prototyping",
                ],
                color: "from-purple-500 to-pink-500",
              },
              {
                icon: "☁️",
                title: "Cloud & DevOps",
                skills: ["AWS", "Vercel", "Docker", "CI/CD"],
                color: "from-orange-500 to-red-500",
              },
              {
                icon: "📱",
                title: "Mobile Development",
                skills: ["React Native", "PWA", "Responsive Apps"],
                color: "from-indigo-500 to-purple-500",
              },
              {
                icon: "🔧",
                title: "Tools & Others",
                skills: ["Git", "VS Code", "Postman", "Jest"],
                color: "from-slate-500 to-slate-700",
              },
            ].map((category, i) => (
              <div
                key={category.title}
                className="group bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 hover:border-indigo-500 dark:hover:border-indigo-500 transition-all duration-300 hover:shadow-xl hover:-translate-y-2"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div
                  className={`w-14 h-14 bg-gradient-to-br ${category.color} rounded-2xl flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                >
                  {category.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white">
                  {category.title}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <span
                      key={skill}
                      className="text-xs px-3 py-1 bg-white dark:bg-slate-900 rounded-full text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600"></div>
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20"></div>

        <div className="container mx-auto px-6 relative z-10 text-center text-white">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Start Your Learning Journey?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Explore our courses and take your skills to the next level
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/courses"
                className="group bg-white text-indigo-600 py-4 px-8 rounded-2xl font-bold text-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 flex items-center justify-center gap-2"
              >
                <span>Browse Courses</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/contact"
                className="group bg-white/10 backdrop-blur-sm text-white border-2 border-white/30 py-4 px-8 rounded-2xl font-bold text-lg transition-all duration-300 hover:bg-white/20 hover:-translate-y-1 flex items-center justify-center gap-2"
              >
                <span>Contact Me</span>
                <Mail className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
