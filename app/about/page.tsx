"use client";

import Navbar from "@/components/Navbar";
import Link from "next/link";
import { 
  Mail, 
  MapPin, 
  Terminal, 
  Award, 
  Code2, 
  BookOpen, 
  Layers, 
  Cpu, 
  CheckCircle2, 
  ArrowRight,
  Github,
  Linkedin,
  Twitter
} from "lucide-react";

const principles = [
  {
    title: "Systems-first engineering",
    desc: "Structuring applications as modular, self-contained systems that are resilient under load and easy to test."
  },
  {
    title: "Readable and durable code",
    desc: "Prioritizing maintainability and clean abstractions so teams can ship features with momentum."
  },
  {
    title: "Measured performance and reliability",
    desc: "Enforcing latency budgets, database index efficiency, and rigorous error-boundary logging."
  },
  {
    title: "Teaching through practical implementation",
    desc: "Dismantling complex theoretical specs and translating them into realistic code repositories."
  }
];

const stack = [
  "Next.js",
  "React",
  "TypeScript",
  "Node.js",
  "MongoDB",
  "Tailwind CSS",
  "API Design",
  "System Architecture",
  "Mentorship"
];

const capabilities = [
  "Product engineering from scope-discovery to final deployment pipelines",
  "Dynamic business platforms with secure authentication and Flutterwave payments",
  "Structured educational materials designed for practical, production-level learning"
];

const strengths = [
  {
    title: "Product Thinking",
    description: "Aligning frontend layout hierarchies and backend routing patterns to match broader user and business outcomes."
  },
  {
    title: "Engineering Discipline",
    description: "Constructing predictable, type-safe structures that support modular extensions, clear API schemas, and scalable indices."
  },
  {
    title: "Teaching Mindset",
    description: "Explaining architectural blueprints by showcasing practical code structures, helping developers learn best practices."
  }
];

export default function About() {
  return (
    <div className="arch-shell">
      <Navbar />

      <main className="arch-container py-16 md:py-24 space-y-12">
        
        {/* Top Overview Banner wrapped in Gradient border shell */}
        <section className="gradient-shell-wrap">
          <div className="gradient-shell-inner p-8 md:p-12">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <p className="arch-kicker text-primary">Creator Profile</p>
            </div>
            <h1 className="display-lg text-foreground tracking-tight select-none">
              Victor Ikechukwu
            </h1>
            <p className="mt-6 text-base text-muted-foreground leading-relaxed max-w-3xl font-light">
              I am a software developer and technical educator based in Port Harcourt, Nigeria. I specialize in engineering dependable web systems using Next.js and MongoDB, while designing practical learning curriculums that help developers ship software with confidence.
            </p>
            <div className="mt-8 flex flex-wrap gap-4 text-xs text-muted-foreground font-mono">
              <span className="inline-flex items-center gap-1.5 border border-white/5 bg-white/5 px-3 py-1 rounded-full">
                <MapPin className="h-3.5 w-3.5 text-primary" />
                Port Harcourt, Nigeria
              </span>
              <span className="inline-flex items-center gap-1.5 border border-white/5 bg-white/5 px-3 py-1 rounded-full">
                <Cpu className="h-3.5 w-3.5 text-primary" />
                Systems-First Engineering
              </span>
            </div>
          </div>
        </section>

        {/* Dashboard Grid Layout */}
        <div className="grid gap-8 lg:grid-cols-12">
          
          {/* Left Column: Sidebar Cards (4 Columns) */}
          <section className="lg:col-span-4 space-y-6">
            
            {/* Core Stack Card */}
            <div className="border border-white/10 bg-white/[0.02] backdrop-blur-md p-6 rounded-2xl space-y-5">
              <div className="flex items-center gap-2 border-b border-white/10 pb-3">
                <Code2 className="h-4 w-4 text-primary" />
                <h3 className="text-sm font-semibold tracking-wider uppercase font-mono">Core Stack</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {stack.map((item) => (
                  <span key={item} className="arch-chip !border-white/10 !bg-white/5 hover:border-primary/50 transition-colors">
                    {item}
                  </span>
                ))}
              </div>
            </div>

            {/* Quick Contact & Socials */}
            <div className="border border-white/10 bg-white/[0.02] backdrop-blur-md p-6 rounded-2xl space-y-4">
              <div className="flex items-center gap-2 border-b border-white/10 pb-3">
                <Terminal className="h-4 w-4 text-primary" />
                <h3 className="text-sm font-semibold tracking-wider uppercase font-mono">Connect</h3>
              </div>
              <div className="space-y-3">
                <Link 
                  href="mailto:ikechukwuv052@gmail.com" 
                  className="flex items-center gap-3 p-2.5 rounded-xl border border-white/5 bg-white/5 hover:border-primary/50 text-xs text-muted-foreground hover:text-foreground transition-all"
                >
                  <Mail className="h-4 w-4 text-primary" />
                  <span className="truncate">ikechukwuv052@gmail.com</span>
                </Link>
                <div className="grid grid-cols-3 gap-2">
                  <Link 
                    href="https://github.com/Victor070656" 
                    target="_blank"
                    className="flex flex-col items-center justify-center p-3 rounded-xl border border-white/5 bg-white/5 hover:border-primary/50 text-muted-foreground hover:text-foreground transition-all"
                  >
                    <Github className="h-4 w-4" />
                    <span className="text-[10px] font-mono mt-1.5">GitHub</span>
                  </Link>
                  <Link 
                    href="https://linkedin.com/in/victorikechukwu" 
                    target="_blank"
                    className="flex flex-col items-center justify-center p-3 rounded-xl border border-white/5 bg-white/5 hover:border-primary/50 text-muted-foreground hover:text-foreground transition-all"
                  >
                    <Linkedin className="h-4 w-4" />
                    <span className="text-[10px] font-mono mt-1.5">LinkedIn</span>
                  </Link>
                  <Link 
                    href="https://x.com/victor10722752" 
                    target="_blank"
                    className="flex flex-col items-center justify-center p-3 rounded-xl border border-white/5 bg-white/5 hover:border-primary/50 text-muted-foreground hover:text-foreground transition-all"
                  >
                    <Twitter className="h-4 w-4" />
                    <span className="text-[10px] font-mono mt-1.5">Twitter</span>
                  </Link>
                </div>
              </div>
            </div>

            {/* Quick Metrics */}
            <div className="gradient-shell-wrap-red">
              <div className="gradient-shell-inner p-6 space-y-4">
                <span className="text-xs uppercase tracking-wider font-mono text-primary font-semibold flex items-center gap-1.5">
                  <Award className="h-4 w-4" /> Platform Quality
                </span>
                <div className="space-y-3">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-muted-foreground">Mentorship Outcome</span>
                    <span className="text-foreground font-bold">100% Practical</span>
                  </div>
                  <div className="w-full bg-white/10 h-1 rounded-full overflow-hidden">
                    <div className="bg-primary h-full w-[100%]" />
                  </div>
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-muted-foreground">System Reliability</span>
                    <span className="text-foreground font-bold">99.9% Uptime</span>
                  </div>
                  <div className="w-full bg-white/10 h-1 rounded-full overflow-hidden">
                    <div className="bg-primary h-full w-[99.9%]" />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Right Column: Content Sections (8 Columns) */}
          <section className="lg:col-span-8 space-y-6">
            
            {/* Focus & Value Proposition Panel */}
            <div className="border border-white/10 bg-white/[0.02] backdrop-blur-md p-6 md:p-8 rounded-2xl space-y-5">
              <div>
                <p className="arch-kicker text-primary">Professional Focus</p>
                <h2 className="text-xl font-bold mt-2">Bridging Engineering Quality & Web Education</h2>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed font-light">
                My engineering approach is systems-first. I focus on database indexing configurations, Next.js page delivery optimizations, and role-gated authentication systems. My objective is to construct software platforms that are durable and instruct other developers on how to design them with similar structural discipline.
              </p>

              <div className="space-y-3 pt-3">
                {capabilities.map((capability, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 rounded-xl border border-white/5 bg-white/5 text-xs text-muted-foreground">
                    <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                    <span>{capability}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Principles Details Panel */}
            <div className="border border-white/10 bg-white/[0.02] backdrop-blur-md p-6 md:p-8 rounded-2xl space-y-6">
              <div>
                <p className="arch-kicker text-primary">Working Principles</p>
                <h2 className="text-xl font-bold mt-2">Durable Engineering Guidelines</h2>
              </div>
              <div className="grid gap-6 md:grid-cols-2">
                {principles.map((item, index) => (
                  <div key={index} className="space-y-2 p-4 rounded-xl border border-white/5 bg-white/5 hover:border-white/10 transition-colors">
                    <span className="text-[10px] font-mono font-bold text-primary">0{index + 1}</span>
                    <h4 className="font-bold text-sm">{item.title}</h4>
                    <p className="text-xs text-muted-foreground leading-relaxed font-light">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Strengths & Mindset Panels */}
            <div className="border border-white/10 bg-white/[0.02] backdrop-blur-md p-6 md:p-8 rounded-2xl space-y-6">
              <div>
                <p className="arch-kicker text-primary">Mindset</p>
                <h2 className="text-xl font-bold mt-2">Why Alignment Matters</h2>
              </div>
              <div className="grid gap-6 md:grid-cols-3">
                {strengths.map((item, index) => (
                  <div key={index} className="space-y-3 p-5 rounded-xl border border-white/5 bg-white/5">
                    <Layers className="h-4 w-4 text-primary" />
                    <h4 className="font-bold text-sm">{item.title}</h4>
                    <p className="text-[11px] text-muted-foreground leading-relaxed font-light">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Let's Collaborate Banner */}
            <div className="gradient-shell-wrap">
              <div className="gradient-shell-inner p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="space-y-1">
                  <h4 className="font-bold text-base">Let's build something durable</h4>
                  <p className="text-xs text-muted-foreground">Open for full-stack Next.js and lms product contracts.</p>
                </div>
                <div className="flex gap-3">
                  <Link href="/contact" className="arch-button text-xs py-2">
                    Start Conversation
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                  <Link href="/projects" className="arch-button-secondary text-xs py-2">
                    Selected Work
                  </Link>
                </div>
              </div>
            </div>
            
          </section>
        </div>

      </main>
    </div>
  );
}
