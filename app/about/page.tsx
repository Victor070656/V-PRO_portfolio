"use client";

import Navbar from "@/components/Navbar";
import Link from "next/link";
import { Mail, MapPin } from "lucide-react";

const principles = [
  "Systems-first engineering",
  "Readable and durable code",
  "Measured performance and reliability",
  "Teaching through practical implementation",
];

const stack = [
  "Next.js",
  "React",
  "TypeScript",
  "Node.js",
  "MongoDB",
  "Tailwind CSS",
  "API Design",
  "Mentorship",
];

const capabilities = [
  "Product and feature delivery with a strong engineering process",
  "Portfolio, course, and business platforms that feel polished and clear",
  "Knowledge sharing that makes complex implementation approachable",
];

const strengths = [
  {
    title: "Product thinking",
    description:
      "I focus on how each screen, feature, and interaction supports a broader business outcome.",
  },
  {
    title: "Engineering discipline",
    description:
      "I prefer systems that are structured, maintainable, and easy for teams to extend later.",
  },
  {
    title: "Teaching mindset",
    description:
      "I explain implementation in a way that helps others adopt better practices, not just copy code.",
  },
];

export default function About() {
  return (
    <div className="arch-shell">
      <Navbar />

      <main className="arch-container py-16 md:py-20 space-y-12">
        <section className="arch-panel p-8 md:p-12">
          <p className="arch-kicker mb-4">About</p>
          <h1 className="arch-heading-lg mb-4">Victor Ikechukwu</h1>
          <p className="text-lg text-muted-foreground leading-8 max-w-3xl">
            I am a software developer and technical educator focused on building
            dependable web products, improving delivery quality, and helping
            developers understand the systems behind modern software.
          </p>
          <p className="mt-4 inline-flex items-center gap-2 text-muted-foreground">
            <MapPin className="h-4 w-4" />
            Port Harcourt, Nigeria
          </p>
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <article className="arch-panel p-8">
            <p className="arch-kicker mb-3">Professional Focus</p>
            <h2 className="arch-heading-md mb-4">What I bring to a project</h2>
            <p className="text-muted-foreground leading-8">
              My work sits at the intersection of engineering quality, product
              clarity, and practical education. I care about structure, maintainability,
              and the details that make a digital product feel credible and easy to use.
            </p>

            <div className="mt-6 space-y-3">
              {capabilities.map((item) => (
                <div key={item} className="rounded border border-border bg-muted/40 px-4 py-3 text-sm text-muted-foreground">
                  {item}
                </div>
              ))}
            </div>
          </article>

          <article className="arch-panel p-8">
            <p className="arch-kicker mb-3">Approach</p>
            <h2 className="arch-heading-md mb-4">How I work</h2>
            <ul className="space-y-3 text-muted-foreground">
              {principles.map((item) => (
                <li key={item} className="border-b border-border pb-3 last:border-none">
                  {item}
                </li>
              ))}
            </ul>
          </article>
        </section>

        <section className="arch-panel p-8 md:p-10">
          <p className="arch-kicker mb-4">Why it matters</p>
          <h2 className="arch-heading-lg mb-8">The qualities I try to bring to every engagement</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {strengths.map((item) => (
              <article key={item.title} className="rounded-lg border border-border bg-muted/30 p-6">
                <h3 className="text-xl font-semibold">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="arch-panel p-8 md:p-10">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <p className="arch-kicker mb-2">Collaboration</p>
              <h2 className="arch-heading-md">Let’s build something useful</h2>
              <p className="mt-4 text-muted-foreground leading-8">
                If you need a thoughtful engineer for product work, technical
                collaboration, or educational content, I’m open to conversations
                that value quality and momentum.
              </p>
            </div>

            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-end">
              <Link href="/contact" className="arch-button">
                <Mail className="h-4 w-4" />
                Start a conversation
              </Link>
              <Link href="/projects" className="arch-button-secondary">
                View selected work
              </Link>
            </div>
          </div>

          <div className="mt-8">
            <p className="arch-kicker mb-3">Core stack</p>
            <div className="flex flex-wrap gap-3">
              {stack.map((item) => (
                <span key={item} className="arch-chip">
                  {item}
                </span>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
