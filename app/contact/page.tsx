"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import {
  CheckCircle2,
  Github,
  Linkedin,
  Loader2,
  Mail,
  MapPin,
  MessageSquare,
  Twitter,
} from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setSubmitStatus("idle"), 5000);
    }, 1000);
  };

  return (
    <div className="arch-shell">
      <Navbar />

      <main className="arch-container py-16 md:py-20 space-y-10">
        <section className="arch-panel p-8 md:p-12">
          <p className="arch-kicker mb-4">Contact</p>
          <h1 className="arch-heading-lg mb-4">Let’s discuss your project</h1>
          <p className="max-w-3xl text-lg text-muted-foreground leading-8">
            I’m available for product engineering engagements, course delivery,
            and technical collaboration.
          </p>
        </section>

        <section className="grid gap-6 lg:grid-cols-3">
          <article className="arch-panel p-6">
            <Mail className="h-5 w-5 text-primary mb-3" />
            <p className="arch-kicker">Email</p>
            <Link href="mailto:ikechukwuv052@gmail.com" className="mt-2 block hover:underline">
              ikechukwuv052@gmail.com
            </Link>
          </article>
          <article className="arch-panel p-6">
            <MapPin className="h-5 w-5 text-primary mb-3" />
            <p className="arch-kicker">Location</p>
            <p className="mt-2">Port Harcourt, Nigeria</p>
          </article>
          <article className="arch-panel p-6">
            <MessageSquare className="h-5 w-5 text-primary mb-3" />
            <p className="arch-kicker">Response</p>
            <p className="mt-2">Typically within 24 hours</p>
          </article>
        </section>

        <section className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 gradient-shell-wrap">
            <div className="gradient-shell-inner p-8">
              {submitStatus === "success" ? (
                <div className="mb-6 rounded border border-primary/40 bg-primary/10 px-4 py-3 text-sm">
                  <div className="inline-flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    Message sent successfully.
                  </div>
                </div>
              ) : null}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid gap-4 md:grid-cols-2">
                  <input
                    className="arch-input"
                    placeholder="Your name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                  <input
                    className="arch-input"
                    type="email"
                    placeholder="Your email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>

                <input
                  className="arch-input"
                  placeholder="Subject"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  required
                />

                <textarea
                  className="arch-input min-h-40"
                  placeholder="Tell me about your project..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                />

                <button type="submit" disabled={isSubmitting} className="arch-button w-full">
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    "Send Message"
                  )}
                </button>
              </form>
            </div>
          </div>

          <div className="gradient-shell-wrap-red">
            <div className="gradient-shell-inner p-6 flex flex-col justify-between h-full">
              <div>
                <p className="arch-kicker mb-4">Social Connect</p>
                <p className="text-xs text-muted-foreground mb-6">Let's connect across developer channels and directories.</p>
                <div className="space-y-2.5">
                  <Link className="arch-button-secondary w-full text-xs" href="https://x.com/victor10722752" target="_blank">
                    <Twitter className="h-4 w-4 text-primary" />
                    Twitter
                  </Link>
                  <Link className="arch-button-secondary w-full text-xs" href="https://linkedin.com/in/victorikechukwu" target="_blank">
                    <Linkedin className="h-4 w-4 text-primary" />
                    LinkedIn
                  </Link>
                  <Link className="arch-button-secondary w-full text-xs" href="https://github.com/Victor070656" target="_blank">
                    <Github className="h-4 w-4 text-primary" />
                    GitHub
                  </Link>
                </div>
              </div>

              <div className="border-t border-white/10 pt-6 mt-6">
                <span className="text-[10px] text-muted-foreground font-mono block">Developer profile verification:</span>
                <span className="text-[10px] text-green-400 font-mono font-bold mt-1 block">Victor Ikechukwu · Active</span>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
