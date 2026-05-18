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

const services = [
  {
    title: "Product Engineering",
    description:
      "Building clean, scalable web products with thoughtful architecture, strong UX, and dependable delivery.",
  },
  {
    title: "Technical Education",
    description:
      "Turning complex web concepts into practical learning paths that help developers ship with confidence.",
  },
  {
    title: "Platform Reliability",
    description:
      "Designing systems that are maintainable, performant, and ready for real-world growth.",
  },
];

const highlights = [
  "End-to-end product thinking from planning to launch",
  "Clear communication across technical and non-technical teams",
  "Modern frontend and backend delivery with maintainable code",
];

const process = [
  {
    step: "01",
    title: "Discovery",
    description:
      "Clarify the business goal, the audience, and the outcome before any implementation begins.",
  },
  {
    step: "02",
    title: "Build",
    description:
      "Translate the plan into a clean, testable system with a strong UX and dependable delivery.",
  },
  {
    step: "03",
    title: "Launch",
    description:
      "Refine the result, support handoff, and create a stable foundation for growth and iteration.",
  },
];

export default function Home() {
  return (
    <div className="arch-shell">
      <Navbar />

      <main className="arch-container py-16 md:py-24 space-y-20">
        <section className="arch-panel p-8 md:p-12">
          <p className="arch-kicker mb-5">Software Developer · Technical Educator</p>
          <h1 className="arch-heading-xl max-w-4xl">
            Designing dependable digital products and practical learning experiences.
          </h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground max-w-3xl">
            I help teams and founders turn ideas into polished, production-ready
            software while teaching developers how to build with structure,
            clarity, and confidence.
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

        <section className="grid gap-6 lg:grid-cols-3">
          {services.map((service) => (
            <article key={service.title} className="arch-panel p-8">
              <p className="arch-kicker mb-4">{service.title}</p>
              <p className="text-lg font-semibold text-foreground leading-8">
                {service.description}
              </p>
            </article>
          ))}
        </section>

        <section className="arch-panel p-8 md:p-10">
          <p className="arch-kicker mb-4">Working Style</p>
          <h2 className="arch-heading-lg mb-8">A clear process from idea to delivery</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {process.map((item) => (
              <article key={item.step} className="rounded-lg border border-border bg-muted/30 p-6">
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">
                  {item.step}
                </p>
                <h3 className="mt-3 text-xl font-semibold">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="arch-panel p-8 md:p-10">
          <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
            <div>
              <p className="arch-kicker mb-4">Core Stack</p>
              <h2 className="arch-heading-lg mb-6">Built with precision</h2>
              <p className="max-w-2xl text-lg leading-8 text-muted-foreground">
                I work with a focused stack that supports fast iteration,
                resilient delivery, and a clean developer experience from the
                first commit to the final handoff.
              </p>
            </div>

            <div className="space-y-3">
              {highlights.map((highlight) => (
                <div key={highlight} className="rounded border border-border bg-muted/40 px-4 py-3 text-sm text-muted-foreground">
                  {highlight}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
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
