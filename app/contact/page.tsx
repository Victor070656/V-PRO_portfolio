"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import {
  Mail,
  MapPin,
  Phone,
  Send,
  CheckCircle2,
  Loader2,
  Github,
  Linkedin,
  Twitter,
  MessageSquare,
  Clock,
  Sparkles,
  User,
  FileText,
} from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });

      // Reset success message after 5 seconds
      setTimeout(() => setSubmitStatus("idle"), 5000);
    }, 2000);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 text-slate-900 dark:text-slate-100 antialiased min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white pt-32 pb-20">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20"></div>

        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 right-10 w-72 h-72 bg-white/10 rounded-full mix-blend-overlay filter blur-3xl animate-blob"></div>
          <div className="absolute bottom-20 left-10 w-72 h-72 bg-white/10 rounded-full mix-blend-overlay filter blur-3xl animate-blob animation-delay-2000"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6 animate-fade-in">
              <MessageSquare className="w-4 h-4" />
              <span className="text-sm font-medium">Let's Talk</span>
            </div>

            {/* Heading */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black mb-6 animate-slide-up tracking-tight">
              Get in{" "}
              <span className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 to-pink-200">
                Touch
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-8 animate-slide-up animation-delay-100">
              I'm always open to discussing new projects, creative ideas, or
              opportunities. Let's create something amazing together!
            </p>

            {/* Quick Stats */}
            <div className="flex flex-wrap items-center justify-center gap-6 animate-slide-up animation-delay-200">
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-2xl border border-white/20">
                <Clock className="w-5 h-5" />
                <span className="text-sm">Response within 24h</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-2xl border border-white/20">
                <CheckCircle2 className="w-5 h-5" />
                <span className="text-sm">Available for projects</span>
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

      {/* Main Content */}
      <main className="container mx-auto px-6 py-16 -mt-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8 mb-16">
            {/* Contact Info Cards */}
            <ContactInfoCard
              icon={<Mail className="w-6 h-6" />}
              title="Email Me"
              value="ikechukwuv052@gmail.com"
              href="mailto:ikechukwuv052@gmail.com"
              color="from-red-500 to-pink-500"
            />
            <ContactInfoCard
              icon={<MapPin className="w-6 h-6" />}
              title="Location"
              value="Port Harcourt, Nigeria"
              color="from-green-500 to-emerald-500"
            />
            <ContactInfoCard
              icon={<Phone className="w-6 h-6" />}
              title="Call Me"
              value="+234 XXX XXX XXXX"
              href="tel:+234XXXXXXXXXX"
              color="from-blue-500 to-cyan-500"
            />
          </div>

          {/* Contact Form & Info Grid */}
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 shadow-xl">
                <div className="mb-8">
                  <div className="inline-flex items-center gap-2 bg-indigo-100 dark:bg-indigo-900/30 px-4 py-2 rounded-full mb-4">
                    <Sparkles className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                    <span className="text-sm font-semibold text-indigo-600 dark:text-indigo-400">
                      Send a Message
                    </span>
                  </div>
                  <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
                    Let's Start a Conversation
                  </h2>
                  <p className="text-slate-600 dark:text-slate-400">
                    Fill out the form below and I'll get back to you as soon as
                    possible.
                  </p>
                </div>

                {submitStatus === "success" && <SuccessMessage />}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <FormInput
                      icon={<User className="w-5 h-5" />}
                      label="Your Name"
                      name="name"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                    <FormInput
                      icon={<Mail className="w-5 h-5" />}
                      label="Your Email"
                      name="email"
                      type="email"
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <FormInput
                    icon={<FileText className="w-5 h-5" />}
                    label="Subject"
                    name="subject"
                    placeholder="What's this about?"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                  />

                  <FormTextarea
                    icon={<MessageSquare className="w-5 h-5" />}
                    label="Message"
                    name="message"
                    placeholder="Tell me more about your project..."
                    value={formData.message}
                    onChange={handleChange}
                    required
                  />

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="group w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 px-8 rounded-2xl font-bold text-lg transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-500/50 hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-3"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <span>Send Message</span>
                        <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Why Contact Me */}
              <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-xl">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
                  Why Work With Me?
                </h3>
                <ul className="space-y-3">
                  {[
                    "Fast & reliable delivery",
                    "Clean, maintainable code",
                    "Regular communication",
                    "Flexible & adaptable",
                  ].map((item, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-3 text-slate-600 dark:text-slate-400"
                    >
                      <div className="w-6 h-6 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <CheckCircle2 className="w-4 h-4 text-white" />
                      </div>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Social Media */}
              <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-xl">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
                  Connect With Me
                </h3>
                <div className="space-y-3">
                  <SocialLink
                    Icon={Twitter}
                    label="Twitter"
                    username="@victor10722752"
                    href="https://x.com/victor10722752"
                    color="hover:bg-sky-500"
                  />
                  <SocialLink
                    Icon={Linkedin}
                    label="LinkedIn"
                    username="victorikechukwu"
                    href="https://linkedin.com/in/victorikechukwu"
                    color="hover:bg-blue-600"
                  />
                  <SocialLink
                    Icon={Github}
                    label="GitHub"
                    username="Victor070656"
                    href="https://github.com/Victor070656"
                    color="hover:bg-slate-700"
                  />
                </div>
              </div>

              {/* Availability */}
              <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-3xl p-1 shadow-xl">
                <div className="bg-white dark:bg-slate-900 rounded-3xl p-6">
                  <div className="text-center">
                    <div className="inline-flex items-center gap-2 bg-green-100 dark:bg-green-900/30 px-4 py-2 rounded-full mb-4">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-sm font-semibold text-green-700 dark:text-green-400">
                        Currently Available
                      </span>
                    </div>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      Open for new projects and collaborations
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mt-20">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-indigo-100 dark:bg-indigo-900/30 px-4 py-2 rounded-full mb-4">
                <MessageSquare className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                <span className="text-sm font-semibold text-indigo-600 dark:text-indigo-400">
                  Common Questions
                </span>
              </div>
              <h2 className="text-4xl font-bold text-slate-900 dark:text-white">
                Frequently Asked{" "}
                <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  Questions
                </span>
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <FAQCard
                question="What's your typical response time?"
                answer="I usually respond to all inquiries within 24 hours during business days."
              />
              <FAQCard
                question="Do you work on hourly or project basis?"
                answer="I'm flexible and can work on both hourly rates and fixed project pricing."
              />
              <FAQCard
                question="What technologies do you specialize in?"
                answer="I specialize in React, Next.js, Node.js, and modern web technologies."
              />
              <FAQCard
                question="Are you available for long-term projects?"
                answer="Yes! I'm open to both short-term projects and long-term collaborations."
              />
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative bg-slate-100 dark:bg-slate-900 mt-24 border-t border-slate-200 dark:border-slate-800">
        <div className="container mx-auto px-6 py-12">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h4 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
                Victor Ikechukwu
              </h4>
              <p className="text-slate-600 dark:text-slate-400 mb-6">
                Full-stack developer passionate about creating exceptional
                digital experiences
              </p>

              <div className="flex items-center justify-center gap-4">
                {[
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
                  {
                    Icon: Twitter,
                    href: "https://x.com/victor10722752",
                    label: "Twitter",
                  },
                ].map(({ Icon, href, label }) => (
                  <Link
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg hover:border-indigo-500"
                    aria-label={label}
                  >
                    <Icon className="w-5 h-5" />
                  </Link>
                ))}
              </div>
            </div>

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

// Contact Info Card Component
function ContactInfoCard({
  icon,
  title,
  value,
  href,
  color,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
  href?: string;
  color: string;
}) {
  const content = (
    <>
      <div
        className={`w-14 h-14 bg-gradient-to-br ${color} rounded-2xl flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform shadow-lg`}
      >
        {icon}
      </div>
      <h3 className="font-semibold text-slate-900 dark:text-white mb-1">
        {title}
      </h3>
      <p className="text-slate-600 dark:text-slate-400 text-sm">{value}</p>
    </>
  );

  if (href) {
    return (
      <Link
        href={href}
        className="group bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 hover:border-indigo-500 dark:hover:border-indigo-500 transition-all duration-300 hover:shadow-xl hover:-translate-y-2 text-center"
      >
        {content}
      </Link>
    );
  }

  return (
    <div className="group bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 hover:border-indigo-500 dark:hover:border-indigo-500 transition-all duration-300 hover:shadow-xl hover:-translate-y-2 text-center">
      {content}
    </div>
  );
}

// Form Input Component
function FormInput({
  icon,
  label,
  name,
  type = "text",
  placeholder,
  value,
  onChange,
  required = false,
}: {
  icon: React.ReactNode;
  label: string;
  name: string;
  type?: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}) {
  return (
    <div>
      <label className="block text-sm font-semibold text-slate-900 dark:text-white mb-2">
        {label}
      </label>
      <div className="relative">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
          {icon}
        </div>
        <input
          type={type}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
          className="w-full pl-12 pr-4 py-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-slate-900 dark:text-white placeholder:text-slate-400 transition-all"
        />
      </div>
    </div>
  );
}

// Form Textarea Component
function FormTextarea({
  icon,
  label,
  name,
  placeholder,
  value,
  onChange,
  required = false,
}: {
  icon: React.ReactNode;
  label: string;
  name: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  required?: boolean;
}) {
  return (
    <div>
      <label className="block text-sm font-semibold text-slate-900 dark:text-white mb-2">
        {label}
      </label>
      <div className="relative">
        <div className="absolute left-4 top-4 text-slate-400">{icon}</div>
        <textarea
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
          rows={6}
          className="w-full pl-12 pr-4 py-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-slate-900 dark:text-white placeholder:text-slate-400 resize-none transition-all"
        />
      </div>
    </div>
  );
}

// Success Message Component
function SuccessMessage() {
  return (
    <div className="mb-6 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-2xl p-4 flex items-start gap-3 animate-fade-in">
      <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
        <CheckCircle2 className="w-4 h-4 text-white" />
      </div>
      <div>
        <h4 className="font-semibold text-green-900 dark:text-green-100 mb-1">
          Message Sent Successfully!
        </h4>
        <p className="text-sm text-green-700 dark:text-green-300">
          Thank you for reaching out. I'll get back to you within 24 hours.
        </p>
      </div>
    </div>
  );
}

// Social Link Component
function SocialLink({
  Icon,
  label,
  username,
  href,
  color,
}: {
  Icon: any;
  label: string;
  username: string;
  href: string;
  color: string;
}) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`group flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-indigo-500 dark:hover:border-indigo-500 transition-all duration-300 ${color} hover:text-white`}
    >
      <div className="w-10 h-10 bg-white dark:bg-slate-900 rounded-lg flex items-center justify-center group-hover:bg-transparent transition-colors">
        <Icon className="w-5 h-5" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="font-semibold text-sm">{label}</div>
        <div className="text-xs opacity-80 truncate">{username}</div>
      </div>
    </Link>
  );
}

// FAQ Card Component
function FAQCard({ question, answer }: { question: string; answer: string }) {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 hover:border-indigo-500 dark:hover:border-indigo-500 transition-all duration-300 hover:shadow-lg">
      <h4 className="font-bold text-slate-900 dark:text-white mb-2">
        {question}
      </h4>
      <p className="text-slate-600 dark:text-slate-400 text-sm">{answer}</p>
    </div>
  );
}
