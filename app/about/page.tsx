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

export default function About() {
  return (
    <div className="arch-shell">
      <Navbar />

      <main className="arch-container py-16 md:py-20 space-y-12">
        <section className="arch-panel p-8 md:p-12">
          <p className="arch-kicker mb-4">About</p>
          <h1 className="arch-heading-lg mb-4">Victor Ikechukwu</h1>
          <p className="text-lg text-muted-foreground leading-8 max-w-3xl">
            Software developer and educator focused on building dependable web
            products and helping engineers deliver with confidence.
          </p>
          <p className="mt-4 inline-flex items-center gap-2 text-muted-foreground">
            <MapPin className="h-4 w-4" />
            Port Harcourt, Nigeria
          </p>
        </section>

        <section className="grid gap-6 lg:grid-cols-2">
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

          <article className="arch-panel p-8">
            <p className="arch-kicker mb-3">Technical Profile</p>
            <h2 className="arch-heading-md mb-4">Core stack</h2>
            <div className="flex flex-wrap gap-2">
              {stack.map((item) => (
                <span key={item} className="arch-chip">
                  {item}
                </span>
              ))}
            </div>
          </article>
        </section>

        <section className="arch-panel p-8 md:p-10 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="arch-kicker mb-2">Collaboration</p>
            <h2 className="arch-heading-md">Let’s build something useful</h2>
          </div>
          <Link href="/contact" className="arch-button">
            <Mail className="h-4 w-4" />
            Start a conversation
          </Link>
        </section>
      </main>
    </div>
  );
}
