"use client";

import Navbar from "@/components/Navbar";
import {
  Linkedin,
  Mail,
  MapPin,
  Calendar,
  Award,
  Code,
  User,
  Briefcase,
  GraduationCap,
  Phone,
  Github,
  Twitter,
  Download,
  ExternalLink,
  Sparkles,
  Zap,
  Target,
  Heart,
  Coffee,
  Rocket,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function About() {
  const [activeTab, setActiveTab] = useState<"skills" | "tools">("skills");

  return (
    <div className="bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 text-slate-900 dark:text-slate-100 antialiased min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white pt-32 pb-20">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20"></div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* Profile Image */}
            <div className="mb-8 relative inline-block group">
              <div className="absolute -inset-4 bg-white/20 rounded-full blur-2xl group-hover:bg-white/30 transition-all duration-300"></div>
              <div className="absolute -inset-2 bg-gradient-to-r from-yellow-400 to-pink-400 rounded-full blur-md animate-pulse"></div>

              <div className="relative">
                <div
                  className="w-40 h-40 rounded-full bg-cover bg-center border-4 border-white/50 shadow-2xl transform group-hover:scale-105 transition-transform duration-300"
                  style={{
                    backgroundImage: `url("/vic.jpg")`,
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent rounded-full"></div>
                </div>

                {/* Status Badge */}
                <div className="absolute -bottom-2 -right-2 bg-green-500 rounded-full p-2 shadow-lg border-4 border-white">
                  <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
                </div>
              </div>
            </div>

            {/* Name & Title */}
            <div className="space-y-4 animate-fade-in-up">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-4">
                <Sparkles className="w-4 h-4" />
                <span className="text-sm font-medium">About Me</span>
              </div>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-black">
                Victor Ikechukwu
              </h1>

              <p className="text-2xl md:text-3xl text-white/90 font-light">
                Software Developer & Digital Craftsman
              </p>

              <div className="flex items-center justify-center gap-2 text-white/80">
                <MapPin className="w-5 h-5" />
                <span className="text-lg">Port Harcourt, Nigeria</span>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-6 max-w-2xl mx-auto mt-8">
                {[
                  { icon: Calendar, value: "3+", label: "Years Experience" },
                  { icon: Briefcase, value: "50+", label: "Projects" },
                  { icon: Award, value: "100%", label: "Satisfaction" },
                ].map((stat, i) => (
                  <div
                    key={stat.label}
                    className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105"
                  >
                    <stat.icon className="w-6 h-6 mx-auto mb-2" />
                    <div className="text-3xl font-bold">{stat.value}</div>
                    <div className="text-sm text-white/80">{stat.label}</div>
                  </div>
                ))}
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-4 justify-center mt-8">
                <Link
                  href="/contact"
                  className="group bg-white text-indigo-600 px-6 py-3 rounded-xl font-semibold flex items-center gap-2 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
                >
                  <Mail className="w-5 h-5" />
                  <span>Get In Touch</span>
                </Link>
                <button className="group bg-white/10 backdrop-blur-sm border-2 border-white/30 px-6 py-3 rounded-xl font-semibold flex items-center gap-2 hover:bg-white/20 hover:-translate-y-1 transition-all duration-300">
                  <Download className="w-5 h-5" />
                  <span>Download CV</span>
                </button>
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

      <div className="container mx-auto px-6 py-16 max-w-6xl">
        {/* About Me Section */}
        <section className="mb-20 animate-fade-in-up">
          <SectionHeader
            icon={<User className="w-6 h-6" />}
            title="About Me"
            subtitle="Get to know me better"
          />

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 border border-slate-200 dark:border-slate-800 hover:border-indigo-500 dark:hover:border-indigo-500 transition-all duration-300 shadow-lg">
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-lg mb-6">
                  I'm a passionate software developer with a focus on creating
                  innovative and efficient solutions. With over 3 years of
                  experience in full-stack development, I specialize in modern
                  web technologies and mobile applications.
                </p>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-lg mb-6">
                  I believe in writing clean, maintainable code and creating
                  user experiences that make a difference. My approach combines
                  technical expertise with creative problem-solving to deliver
                  solutions that exceed expectations.
                </p>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-lg">
                  When I'm not coding, you'll find me exploring new
                  technologies, contributing to open-source projects, or
                  mentoring aspiring developers.
                </p>
              </div>
            </div>

            {/* Quick Facts */}
            <div className="space-y-4">
              {[
                {
                  icon: <Target className="w-5 h-5" />,
                  label: "Focus",
                  value: "Full-Stack Development",
                  color: "from-blue-500 to-cyan-500",
                },
                {
                  icon: <Heart className="w-5 h-5" />,
                  label: "Passion",
                  value: "Building Great UX",
                  color: "from-pink-500 to-rose-500",
                },
                {
                  icon: <Coffee className="w-5 h-5" />,
                  label: "Fuel",
                  value: "Coffee & Code",
                  color: "from-amber-500 to-orange-500",
                },
                {
                  icon: <Rocket className="w-5 h-5" />,
                  label: "Goal",
                  value: "Continuous Learning",
                  color: "from-purple-500 to-indigo-500",
                },
              ].map((fact, i) => (
                <div
                  key={fact.label}
                  className="bg-white dark:bg-slate-900 rounded-2xl p-4 border border-slate-200 dark:border-slate-800 hover:border-indigo-500 dark:hover:border-indigo-500 transition-all duration-300 hover:shadow-lg group"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-12 h-12 bg-gradient-to-br ${fact.color} rounded-xl flex items-center justify-center text-white group-hover:scale-110 transition-transform shadow-lg`}
                    >
                      {fact.icon}
                    </div>
                    <div>
                      <div className="text-xs text-slate-500 dark:text-slate-400">
                        {fact.label}
                      </div>
                      <div className="font-semibold text-slate-900 dark:text-white">
                        {fact.value}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section className="mb-20 animate-fade-in-up animation-delay-200">
          <SectionHeader
            icon={<Code className="w-6 h-6" />}
            title="Skills & Technologies"
            subtitle="My technical expertise"
          />

          {/* Tab Switcher */}
          <div className="flex gap-4 mb-8">
            <button
              onClick={() => setActiveTab("skills")}
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                activeTab === "skills"
                  ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
              }`}
            >
              Core Skills
            </button>
            <button
              onClick={() => setActiveTab("tools")}
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                activeTab === "tools"
                  ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
              }`}
            >
              Tools & Frameworks
            </button>
          </div>

          {activeTab === "skills" && (
            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  name: "JavaScript",
                  level: 95,
                  color: "from-yellow-400 to-yellow-600",
                },
                {
                  name: "React",
                  level: 90,
                  color: "from-blue-400 to-blue-600",
                },
                {
                  name: "React Native",
                  level: 85,
                  color: "from-cyan-400 to-cyan-600",
                },
                {
                  name: "Node.js",
                  level: 88,
                  color: "from-green-400 to-green-600",
                },
                {
                  name: "Python",
                  level: 82,
                  color: "from-indigo-400 to-indigo-600",
                },
                {
                  name: "Django",
                  level: 80,
                  color: "from-emerald-400 to-emerald-600",
                },
                {
                  name: "SQL",
                  level: 85,
                  color: "from-orange-400 to-orange-600",
                },
                { name: "Git", level: 90, color: "from-red-400 to-red-600" },
                {
                  name: "HTML/CSS",
                  level: 95,
                  color: "from-pink-400 to-rose-600",
                },
                {
                  name: "PHP",
                  level: 75,
                  color: "from-purple-400 to-purple-600",
                },
              ].map((skill, idx) => (
                <div
                  key={skill.name}
                  className="group bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 hover:border-indigo-500 dark:hover:border-indigo-500 transition-all duration-300 hover:shadow-lg"
                  style={{ animationDelay: `${idx * 50}ms` }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-semibold text-slate-900 dark:text-white">
                      {skill.name}
                    </span>
                    <span className="text-sm font-bold bg-gradient-to-r ${skill.color} bg-clip-text text-transparent">
                      {skill.level}%
                    </span>
                  </div>
                  <div className="w-full bg-slate-200 dark:bg-slate-800 rounded-full h-3 overflow-hidden">
                    <div
                      className={`h-3 rounded-full bg-gradient-to-r ${skill.color} transition-all duration-1000 ease-out transform group-hover:scale-x-105`}
                      style={{ width: `${skill.level}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === "tools" && (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {[
                { name: "VS Code", icon: "💻" },
                { name: "Git & GitHub", icon: "🔀" },
                { name: "Docker", icon: "🐳" },
                { name: "Postman", icon: "📮" },
                { name: "Figma", icon: "🎨" },
                { name: "AWS", icon: "☁️" },
                { name: "MongoDB", icon: "🍃" },
                { name: "PostgreSQL", icon: "🐘" },
                { name: "Redis", icon: "📦" },
                { name: "Nginx", icon: "🌐" },
                { name: "Jest", icon: "🃏" },
                { name: "Webpack", icon: "📦" },
              ].map((tool, idx) => (
                <div
                  key={tool.name}
                  className="group bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 hover:border-indigo-500 dark:hover:border-indigo-500 transition-all duration-300 hover:shadow-lg hover:-translate-y-2 text-center"
                >
                  <div className="text-4xl mb-3 group-hover:scale-125 transition-transform duration-300">
                    {tool.icon}
                  </div>
                  <div className="font-semibold text-slate-900 dark:text-white text-sm">
                    {tool.name}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Experience & Education */}
        <div className="grid lg:grid-cols-2 gap-16 mb-20">
          <Experience />
          <Education />
        </div>

        {/* Contact Section */}
        <ContactSection />
      </div>
    </div>
  );
}

// Section Header Component
function SectionHeader({
  icon,
  title,
  subtitle,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="mb-12 text-center">
      <div className="inline-flex items-center gap-3 bg-indigo-100 dark:bg-indigo-900/30 px-4 py-2 rounded-full mb-4">
        <div className="text-indigo-600 dark:text-indigo-400">{icon}</div>
        <span className="text-sm font-semibold text-indigo-600 dark:text-indigo-400">
          {subtitle}
        </span>
      </div>
      <h2 className="text-4xl md:text-5xl font-bold">
        {title.split(" ").map((word, i) =>
          i === title.split(" ").length - 1 ? (
            <span
              key={i}
              className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent"
            >
              {" "}
              {word}
            </span>
          ) : (
            <span key={i}> {word}</span>
          )
        )}
      </h2>
    </div>
  );
}

function Experience() {
  const experiences = [
    {
      role: "Software Engineer",
      company: "Tech Innovators Inc.",
      period: "2020 - Present",
      description:
        "Led development of scalable web applications using React and Node.js. Implemented CI/CD pipelines and improved application performance by 40%.",
      icon: <Briefcase className="w-5 h-5" />,
      tags: ["React", "Node.js", "AWS"],
    },
    {
      role: "Freelance Web Developer",
      company: "Self-Employed",
      period: "2018 - 2020",
      description:
        "Developed custom websites and web applications for various clients. Specialized in responsive design and modern JavaScript frameworks.",
      icon: <Code className="w-5 h-5" />,
      tags: ["JavaScript", "PHP", "MySQL"],
    },
  ];

  return (
    <section className="animate-fade-in-up animation-delay-300">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center text-white shadow-lg">
          <Briefcase className="w-6 h-6" />
        </div>
        <h3 className="text-3xl font-bold text-slate-900 dark:text-white">
          Experience
        </h3>
      </div>

      <div className="relative">
        <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-indigo-500 via-purple-500 to-pink-500" />

        {experiences.map((item, idx) => (
          <div key={idx} className="relative mb-12 pl-16 group">
            <TimelineIcon icon={item.icon} />
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 hover:border-indigo-500 dark:hover:border-indigo-500 transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-1">
              <h4 className="font-bold text-slate-900 dark:text-white text-xl mb-1">
                {item.role}
              </h4>
              <p className="text-indigo-600 dark:text-indigo-400 font-semibold mb-2">
                {item.company}
              </p>
              <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 mb-3">
                <Calendar className="w-4 h-4" />
                {item.period}
              </div>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                {item.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-full text-xs font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Education() {
  return (
    <section className="animate-fade-in-up animation-delay-400">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center text-white shadow-lg">
          <GraduationCap className="w-6 h-6" />
        </div>
        <h3 className="text-3xl font-bold text-slate-900 dark:text-white">
          Education
        </h3>
      </div>

      <div className="relative">
        <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-green-500 to-emerald-500" />

        <div className="relative pl-16 group">
          <TimelineIcon icon={<Award className="w-5 h-5" />} />
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 hover:border-green-500 dark:hover:border-green-500 transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-1">
            <h4 className="font-bold text-slate-900 dark:text-white text-xl mb-1">
              Software Engineering
            </h4>
            <p className="text-green-600 dark:text-green-400 font-semibold mb-2">
              MOCTECH Imo State
            </p>
            <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 mb-3">
              <Calendar className="w-4 h-4" />
              2022
            </div>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              Focused on software development principles, algorithms, data
              structures, and modern programming practices. Completed projects
              in web development, mobile applications, and database design.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  const contacts = [
    {
      icon: <Mail className="w-5 h-5" />,
      label: "Email",
      value: "ikechukwuv052@gmail.com",
      href: "mailto:ikechukwuv052@gmail.com",
      color: "from-red-500 to-pink-500",
    },
    {
      icon: <Linkedin className="w-5 h-5" />,
      label: "LinkedIn",
      value: "linkedin.com/in/victorikechukwu",
      href: "https://linkedin.com/in/victorikechukwu",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: <Github className="w-5 h-5" />,
      label: "GitHub",
      value: "github.com/Victor070656",
      href: "https://github.com/Victor070656",
      color: "from-slate-600 to-slate-800",
    },
    {
      icon: <Twitter className="w-5 h-5" />,
      label: "Twitter",
      value: "@victor10722752",
      href: "https://x.com/victor10722752",
      color: "from-sky-500 to-blue-500",
    },
  ];

  return (
    <section className="animate-fade-in-up animation-delay-500">
      <SectionHeader
        icon={<Phone className="w-6 h-6" />}
        title="Let's Connect"
        subtitle="Get in touch"
      />

      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-3xl p-1">
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-8">
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-lg mb-8 text-center max-w-2xl mx-auto">
            I'm always open to new opportunities and collaborations. Whether you
            have a project in mind or just want to chat about technology, feel
            free to reach out!
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            {contacts.map((contact, idx) => (
              <Link
                key={idx}
                href={contact.href}
                target="_blank"
                className="group relative bg-slate-50 dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 hover:border-indigo-500 dark:hover:border-indigo-500 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`w-14 h-14 bg-gradient-to-br ${contact.color} rounded-xl flex items-center justify-center text-white group-hover:scale-110 transition-transform shadow-lg`}
                  >
                    {contact.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-slate-900 dark:text-white mb-1 flex items-center gap-2">
                      {contact.label}
                      <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400" />
                    </p>
                    <p className="text-slate-600 dark:text-slate-400 text-sm truncate">
                      {contact.value}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Download CV Button */}
          <div className="mt-8 text-center">
            <button className="group bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 inline-flex items-center gap-3">
              <Download className="w-5 h-5 group-hover:animate-bounce" />
              <span>Download Resume</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function TimelineIcon({ icon }: { icon: React.ReactNode }) {
  return (
    <div className="absolute -left-1 top-6 flex w-12 h-12 items-center justify-center rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg group-hover:scale-125 transition-transform duration-300 border-4 border-white dark:border-slate-950">
      {icon}
    </div>
  );
}
