"use client";

import Navbar from "@/components/Navbar";
import Link from "next/link";
import { ArrowRight, BookOpen, Briefcase, Code2, Mail } from "lucide-react";

const skills = [
  "Next.js",
  "TypeScript",
  "Node.js",
  "MongoDB",
  "System Design",
  "Technical Education",
];

export default function Home() {
  return (
    <div className="arch-shell">
      <Navbar />

      <main className="arch-container py-16 md:py-24 space-y-20">
        <section className="arch-panel p-8 md:p-12">
          <p className="arch-kicker mb-5">Software Developer · Educator</p>
          <h1 className="arch-heading-xl max-w-4xl">
            Architecting reliable software and practical learning experiences.
          </h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground max-w-3xl">
            I build production-ready products with clean systems, and teach
            developers how to ship confidently with modern web stacks.
          </p>

          <div className="mt-10 flex flex-wrap gap-3">
            <Link href="/projects" className="arch-button">
              View Projects
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/courses" className="arch-button-secondary">
              Browse Courses
              <BookOpen className="w-4 h-4" />
            </Link>
            <Link href="/contact" className="arch-button-secondary">
              Contact
              <Mail className="w-4 h-4" />
            </Link>
          </div>
        </section>

        <section className="grid gap-6 md:grid-cols-3">
          {[
            {
              title: "Projects Delivered",
              value: "50+",
              icon: Briefcase,
            },
            {
              title: "Years of Practice",
              value: "3+",
              icon: Code2,
            },
            {
              title: "Learning Outcome",
              value: "High Trust",
              icon: BookOpen,
            },
          ].map((item) => (
            <article key={item.title} className="arch-panel p-6">
              <item.icon className="w-5 h-5 text-primary mb-3" />
              <p className="arch-kicker">{item.title}</p>
              <p className="mt-2 text-3xl font-semibold">{item.value}</p>
            </article>
          ))}
        </section>

        <section className="arch-panel p-8 md:p-10">
          <p className="arch-kicker mb-4">Core Stack</p>
          <h2 className="arch-heading-lg mb-8">Built with precision</h2>
          <div className="flex flex-wrap gap-3">
            {skills.map((skill) => (
              <span key={skill} className="arch-chip">
                {skill}
              </span>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
